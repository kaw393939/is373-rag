# Portable knowledge and identity

**Proposed format and invariants.** The historical graph supplies candidate/review patterns, not a finished research ontology. See H-03 in the [source audit](../reuse/source-audit.md).

## Records and their identities

| Record | Identity and invariant |
| --- | --- |
| Artifact | Exact immutable bytes and cryptographic digest; metadata fingerprints are separate |
| Acquisition/source version | Where/when/how material was acquired, rights, source ID/version and artifact link |
| Mention | A precise reference in an immutable text/media artifact |
| Canonical entity | Stable opaque ID independent of display name, evidence count or extraction model |
| Qualified claim | Subject, controlled predicate, object/value, polarity, modality and time qualifiers |
| Assertion/evidence | A source's support, contradiction or reported statement about a claim |
| Resolution/review decision | Actor/method, candidate set, evidence, reason and base/published revision |

Identical bytes may have distinct acquisition records. Repeated imports may be deduplicated without counting copied articles as independent corroboration. A single relationship projection can represent several assertions without erasing their differences.

## Resolution is not name deduplication

Name normalization and embeddings generate candidates. They do not authorize identity changes. Aliases are many-to-many and scoped by language, type, time or context. External identifiers are unique only within their declared authority and entity scope.

Example: two people named Alex Lee remain two entities. Two names for one incident can resolve to one incident. A vessel named in a report must not merge with the incident. Persist negative matches and unresolved decisions so later extraction does not repeat a known false match.

Canonical IDs survive new evidence. Candidate hashes may change with provenance; that is a new proposal, not necessarily a new person. Merges/splits create versioned decisions and assignments; old mentions and published revisions remain inspectable.

## Evidence locations

A text span identifies the immutable extracted-text artifact, parser/version and a defined offset convention such as a half-open UTF-8 byte range. The text artifact links back to the original document; extracted offsets must not pretend to be original PDF byte positions.

Media evidence identifies the source hash, track and interval in an explicit rational time base. Preserve extraction receipts and selected frames where needed. Narration, visual detection and calibrated measurement are different assertion kinds.

## Confidence and disagreement

Separate extraction quality, identity score, source quality, dependence/corroboration and claim assessment. A fixed heuristic score is not a probability of truth. Record the scoring method/version and its calibration evidence when available.

Use reviewable assessments such as reported, disputed or unresolved. Preserve both sides of a contradiction. The system can know exactly who reported a statement without asserting that the statement is established fact.

## Atomic publication

An approved proposal is immutable and digest-bound. The publish command checks authenticated review authority, expected base revision, scope/rights, evidence existence and integrity, all endpoints and ontology constraints before committing canonical changes, review receipt, revision and publication event together.

A worker success or a CLI approval flag alone cannot publish truth. The [transaction lab](../engineering/examples.md#atomic-publication) demonstrates a limited rollback/digest/revision contract; it does not implement the full publisher.

## Portable package

```text
research.knowledge/
  manifest.json
  library.sqlite
  objects/sha256/...
  workflows/...
  models/manifests/...
```

The manifest records format version, revision, hashes and required features. Credentials, executable auto-start behavior, machine paths and GPU handles are not portable evidence. Model weights are included only under explicit rights and size policy; model manifests are not proof that a model exists on the receiving machine.

Embedding-space identity includes immutable model and tokenizer/preprocessing identity, dimensions, normalization and similarity metric. Same dimensions do not establish interoperability. Preserve vectors when their compatible query encoder is missing and expose the narrower available search capability.

## Export, import and retention

Use a supported consistent SQLite snapshot operation and include every referenced immutable object. Do not copy only a live database's main file and ignore its WAL. Validate package schema and object hashes before activation. [SQLite backup API](https://sqlite.org/backup.html), [WAL](https://sqlite.org/wal.html), [file portability](https://sqlite.org/onefile.html).

A public export is newly constructed from approved records and objects, including safe search indexes. It is not a whole authoring database with draft rows hidden in the interface. Check bytes, manifests and indexes for private content; deleted rows or rebuilt UI filters do not prove removal from a copied file.

Import never executes bundled code or resumes external actions automatically. Keep old revisions/artifacts while answer citations require them, according to an explicit retention policy. Synchronizing concurrent authoring copies is a later reconciliation feature, not a filesystem-copy operation.
