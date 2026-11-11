"""Offline, independent checks: no Ollama access or generated answer claims."""
import tempfile
import unittest
from pathlib import Path

from rag_lab import (FIXTURES, import_sources, lexical_search, local_ollama_url,
                     open_store, similarity, vector_search)


class ReferenceLabTests(unittest.TestCase):
    def setUp(self):
        self.work = tempfile.TemporaryDirectory()
        self.addCleanup(self.work.cleanup)
        self.db = open_store(Path(self.work.name) / "test.sqlite")
        self.addCleanup(self.db.close)

    def test_import_preserves_five_sources(self):
        result = import_sources(self.db)
        self.assertEqual(result["new"], 5)
        self.assertEqual(self.db.execute("SELECT count(*) FROM sources").fetchone()[0], 5)
        self.assertGreater(result["chunks"], 5)

    def test_repeat_import_has_stable_chunk_ids(self):
        import_sources(self.db)
        before = [r[0] for r in self.db.execute("SELECT id FROM chunks ORDER BY id")]
        result = import_sources(self.db)
        after = [r[0] for r in self.db.execute("SELECT id FROM chunks ORDER BY id")]
        self.assertEqual(result["unchanged"], 5)
        self.assertEqual(result["chunks"], 0)
        self.assertEqual(before, after)

    def test_changed_source_rebuilds_its_index(self):
        folder = Path(self.work.name) / "docs"
        folder.mkdir()
        for p in FIXTURES.glob("*.txt"):
            (folder / p.name).write_bytes(p.read_bytes())
        import_sources(self.db, folder)
        target = folder / "events.txt"
        target.write_text(target.read_text() + "\n\nUnique origami exhibit.", encoding="utf-8")
        result = import_sources(self.db, folder)
        self.assertEqual(result["updated"], 1)
        self.assertEqual(result["unchanged"], 4)
        self.assertTrue(lexical_search(self.db, "origami"))
        self.assertEqual(self.db.execute("SELECT count(*) FROM sources").fetchone()[0], 5)

    def test_lexical_search_traces_source(self):
        import_sources(self.db)
        found = lexical_search(self.db, "Who organizes events?")
        self.assertGreater(len(found), 0)
        self.assertTrue(any(e["source_id"] == "S-events" for e in found))
        self.assertTrue(all(e["filename"].endswith(".txt") for e in found))

    def test_missing_keyword_returns_no_fake_evidence(self):
        import_sources(self.db)
        self.assertEqual(lexical_search(self.db, "unobtainium"), [])

    def test_query_syntax_is_not_sql(self):
        import_sources(self.db)
        lexical_search(self.db, 'events" OR DELETE FROM sources; --')
        self.assertEqual(self.db.execute("SELECT count(*) FROM sources").fetchone()[0], 5)

    def test_cosine_basics(self):
        self.assertAlmostEqual(similarity([1, 0], [1, 0]), 1.0)
        self.assertAlmostEqual(similarity([1, 0], [0, 1]), 0.0)

    def test_invalid_vectors_rejected(self):
        for a, b in [([1], [1, 2]), ([0, 0], [1, 0]), ([float("nan")], [1])]:
            with self.assertRaises(ValueError):
                similarity(a, b)

    def test_vector_requires_real_index(self):
        import_sources(self.db)
        with self.assertRaisesRegex(ValueError, "Run 'embed'"):
            vector_search(self.db, "http://127.0.0.1:11434",
                          "nomic-embed-text", "events")

    def test_only_local_endpoint_allowed(self):
        self.assertEqual(local_ollama_url("http://localhost:11434", "/api/embed"),
                         "http://localhost:11434/api/embed")
        for target in ["https://example.com", "http://169.254.169.254", "file:///tmp/a",
                       "http://user:password@localhost:11434"]:
            with self.assertRaises(ValueError):
                local_ollama_url(target, "/api/embed")


if __name__ == "__main__":
    unittest.main()
