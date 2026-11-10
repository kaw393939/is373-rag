"""Original SQLite transaction lab, not the application backend or a full ontology.

Uses synthetic records and an in-memory database. Review authentication, media storage,
canonical entity resolution and crash/disk-failure recovery are intentionally out of scope.
"""
from copy import deepcopy
import hashlib
import json
import sqlite3
import unittest


def digest(proposal: dict) -> str:
    # A defined Python fixture encoding, NOT a claim of cross-language canonical JSON.
    encoded = json.dumps(proposal, sort_keys=True, separators=(",", ":"),
                         ensure_ascii=False, allow_nan=False).encode("utf-8")
    return hashlib.sha256(encoded).hexdigest()


def database() -> sqlite3.Connection:
    db = sqlite3.connect(":memory:", isolation_level=None)
    db.execute("PRAGMA foreign_keys = ON")
    db.executescript("""
      CREATE TABLE graph_state(id INTEGER PRIMARY KEY CHECK(id=1), revision INTEGER NOT NULL);
      INSERT INTO graph_state VALUES(1,0);
      CREATE TABLE entities(id TEXT PRIMARY KEY, kind TEXT NOT NULL);
      CREATE TABLE aliases(entity_id TEXT REFERENCES entities(id), name TEXT, scope TEXT,
                           PRIMARY KEY(entity_id,name,scope));
      CREATE TABLE claims(id TEXT PRIMARY KEY, subject TEXT REFERENCES entities(id),
                          predicate TEXT, object_text TEXT, qualifiers TEXT);
      CREATE TABLE evidence(id TEXT PRIMARY KEY, claim_id TEXT REFERENCES claims(id),
                            source_id TEXT, locator TEXT,
                            UNIQUE(claim_id,source_id,locator));
      CREATE TABLE publications(request_key TEXT PRIMARY KEY, digest TEXT, revision INTEGER);
      CREATE TABLE events(cursor INTEGER PRIMARY KEY AUTOINCREMENT, revision INTEGER, kind TEXT);
    """)
    return db


TABLES = {
    "entities": ("id", "kind"),
    "claims": ("id", "subject", "predicate", "object_text", "qualifiers"),
    "evidence": ("id", "claim_id", "source_id", "locator"),
}


def insert_or_verify(db: sqlite3.Connection, table: str, row: dict) -> None:
    fields = TABLES[table]
    values = tuple(row[field] for field in fields)
    existing = db.execute(f"SELECT {','.join(fields)} FROM {table} WHERE id=?", (row["id"],)).fetchone()
    if existing is not None:
        if tuple(existing) != values:
            raise ValueError("stable ID conflicts with different content")
        return
    db.execute(f"INSERT INTO {table} ({','.join(fields)}) VALUES ({','.join('?' for _ in fields)})", values)


def publish(db: sqlite3.Connection, proposal: dict, reviewed_digest: str,
            request_key: str, *, inject_failure: bool = False) -> int:
    current_digest = digest(proposal)
    if current_digest != reviewed_digest:
        raise ValueError("review no longer matches the proposal")
    if not request_key.strip():
        raise ValueError("request key required")
    db.execute("BEGIN IMMEDIATE")
    try:
        previous = db.execute("SELECT digest,revision FROM publications WHERE request_key=?",
                              (request_key,)).fetchone()
        if previous:
            if previous[0] != current_digest:
                raise ValueError("request key conflicts with a different request")
            db.execute("COMMIT")
            return previous[1]
        revision = db.execute("SELECT revision FROM graph_state WHERE id=1").fetchone()[0]
        if revision != proposal["base_revision"]:
            raise ValueError("stale graph revision; review again")
        for row in proposal["entities"]:
            insert_or_verify(db, "entities", row)
        for alias in proposal["aliases"]:
            db.execute("INSERT OR IGNORE INTO aliases VALUES(?,?,?)", tuple(alias))
        for row in proposal["claims"]:
            insert_or_verify(db, "claims", row)
        if inject_failure:
            raise RuntimeError("synthetic fault after claim insertion")
        for row in proposal["evidence"]:
            insert_or_verify(db, "evidence", row)
        next_revision = revision + 1
        db.execute("UPDATE graph_state SET revision=? WHERE id=1", (next_revision,))
        db.execute("INSERT INTO publications VALUES(?,?,?)", (request_key, current_digest, next_revision))
        db.execute("INSERT INTO events(revision,kind) VALUES(?,?)", (next_revision, "graph.published"))
        db.execute("COMMIT")
        return next_revision
    except Exception:
        db.execute("ROLLBACK")
        raise


def fixture() -> dict:
    return {
        "base_revision": 0,
        "entities": [{"id": "person-a", "kind": "person"}, {"id": "person-b", "kind": "person"}],
        "aliases": [["person-a", "Alex Lee", "en"], ["person-b", "Alex Lee", "en"]],
        "claims": [{"id": "claim-1", "subject": "person-a", "predicate": "reported_color",
                    "object_text": "red", "qualifiers": '{"status":"reported"}'}],
        "evidence": [{"id": "evidence-1", "claim_id": "claim-1", "source_id": "synthetic-report-1",
                      "locator": "chars:0:26"}],
    }


class PublicationTests(unittest.TestCase):
    def setUp(self):
        self.db = database()
        self.addCleanup(self.db.close)
        self.proposal = fixture()

    def test_alias_is_not_globally_unique(self):
        publish(self.db, self.proposal, digest(self.proposal), "request-1")
        self.assertEqual(self.db.execute("SELECT count(*) FROM aliases WHERE name='Alex Lee'").fetchone()[0], 2)

    def test_repeated_delivery_does_not_repeat_publication(self):
        self.assertEqual(publish(self.db, self.proposal, digest(self.proposal), "request-1"), 1)
        self.assertEqual(publish(self.db, self.proposal, digest(self.proposal), "request-1"), 1)
        self.assertEqual(self.db.execute("SELECT count(*) FROM events").fetchone()[0], 1)

    def test_changed_request_key_is_rejected(self):
        publish(self.db, self.proposal, digest(self.proposal), "request-1")
        changed = deepcopy(self.proposal)
        changed["claims"][0]["object_text"] = "blue"
        with self.assertRaisesRegex(ValueError, "request key conflicts"):
            publish(self.db, changed, digest(changed), "request-1")

    def test_review_is_bound_to_exact_fixture_content(self):
        reviewed = digest(self.proposal)
        self.proposal["claims"][0]["object_text"] = "blue"
        with self.assertRaisesRegex(ValueError, "review no longer"):
            publish(self.db, self.proposal, reviewed, "request-1")

    def test_stale_revision_requires_review(self):
        publish(self.db, self.proposal, digest(self.proposal), "request-1")
        with self.assertRaisesRegex(ValueError, "stale graph"):
            publish(self.db, self.proposal, digest(self.proposal), "request-2")

    def test_failure_rolls_back_records_revision_and_event(self):
        with self.assertRaisesRegex(RuntimeError, "synthetic fault"):
            publish(self.db, self.proposal, digest(self.proposal), "request-1", inject_failure=True)
        for table in ["entities", "aliases", "claims", "evidence", "publications", "events"]:
            self.assertEqual(self.db.execute(f"SELECT count(*) FROM {table}").fetchone()[0], 0)
        self.assertEqual(self.db.execute("SELECT revision FROM graph_state").fetchone()[0], 0)

    def test_new_review_does_not_duplicate_existing_evidence(self):
        publish(self.db, self.proposal, digest(self.proposal), "request-1")
        changed = deepcopy(self.proposal)
        changed["base_revision"] = 1
        publish(self.db, changed, digest(changed), "request-2")
        self.assertEqual(self.db.execute("SELECT count(*) FROM evidence").fetchone()[0], 1)

    def test_same_entity_id_cannot_change_kind_silently(self):
        publish(self.db, self.proposal, digest(self.proposal), "request-1")
        changed = deepcopy(self.proposal)
        changed["base_revision"] = 1
        changed["entities"][0]["kind"] = "vessel"
        with self.assertRaisesRegex(ValueError, "stable ID conflicts"):
            publish(self.db, changed, digest(changed), "request-2")


if __name__ == "__main__":
    unittest.main(verbosity=2)
