# Requirements and acceptance

Application scenarios below are **planned, not yet verified in a runtime**. The [documentation labs](../engineering/examples.md) cover selected rules only. Each future implementation issue must link actual evidence, not merely this page.

## Requirements

| ID | Requirement | Scenario |
| --- | --- | --- |
| R-01 | Rust owns authoritative state; workers cannot bypass validation | A-01 |
| R-02 | Published claims resolve to immutable evidence or explicit derivation | A-02 |
| R-03 | Ambiguity remains unresolved; aliases are not globally unique | A-03 |
| R-04 | Merges/splits remain auditable and reversible | A-04 |
| R-05 | Draft/private content cannot leak into published retrieval or export | A-05 |
| R-06 | Repeated ingestion and result delivery do not duplicate acceptance | A-06 |
| R-07 | Exports are consistent, integrity-checked and portable | A-07 |
| R-08 | Missing capabilities degrade operations, not access to stored evidence | A-08 |
| R-09 | Streaming distinguishes completion, refusal, cancellation and interruption | A-09 |
| R-10 | Jobs recover without accepting expired or stale-attempt results | A-10 |
| R-11 | Answers preserve revision-pinned citations and session/library ownership | A-11 |
| R-12 | Public deployment is bounded and separate from authoring | A-12 |
| R-13 | Hosted releases follow tested twelve-factor boundaries; local exceptions are explicit | A-13 |
| R-14 | Publication binds approved content, base revision and actor within an atomic command | A-14 |
| R-15 | Reused source has immutable lineage, reviewed dependencies and reuse rights | A-15 |

## Acceptance scenarios

**A-01 · Worker boundary.** Submit a wrong artifact hash, mismatched input receipt and proposal outside granted scope. None becomes canonical; rejection is auditable. Arbitrary paths and worker-supplied permissions are not authority.

**A-02 · Evidence integrity.** Publish sourced and derived claims; resolve each to immutable inputs, typed spans and execution receipts. Reject dangling, tampered and inaccessible evidence. Keep a speaker's statement separate from a sensor measurement.

**A-03 · Identity traps.** Two people share a name; an event has aliases; a vessel and incident share words. Preserve distinct identities and unresolved candidates. New evidence must not duplicate the canonical entity merely because a candidate hash changes.

**A-04 · Undo a bad merge.** Merge and then split fixtures. Original mentions, prior decisions and revised assignments remain inspectable. Old published revisions and citations remain reproducible under retention policy.

**A-05 · Draft isolation.** Put a unique fixture phrase in a draft/private source. Public lexical/vector/graph queries, answer text, caches, facets and edge endpoints must not disclose it. Inspect public export files, indexes and metadata—not just UI filters.

**A-06 · Retry.** Import the same source version twice and deliver a task result twice. Accepted records remain stable; attempts remain visible. Reusing a request key with changed inputs produces conflict rather than accidental reuse.

**A-07 · Portable snapshot.** Export during writes through a supported snapshot operation. Verify every referenced object, package version and migration compatibility. Open on another OS; missing/tampered objects fail explicitly. Import never starts bundled executables or external jobs automatically.

**A-08 · Missing worker/model.** Open a Mac-created library on Linux. Existing evidence remains readable. Query embeddings require a compatible embedding space; unsupported generation is blocked with a reason. Deterministic mock output is visibly labelled and never masquerades as real inference.

**A-09 · Streaming faults.** Split bytes/frames at every boundary, omit completion, send invalid provider outcomes, disconnect and cancel during blocked sends. Verify durable partial text, explicit terminal outcome and no silent paid restart through the real HTTPS proxy.

**A-10 · Crash recovery.** Terminate workers/API/store at controlled boundaries. Reclaim expired leases, then deliver an old result from the same worker name. Reject stale epochs and deadline-expired results even before reclamation. Bound retries and queues; disk-full is not success.

**A-11 · Revision and session.** Publish a newer library while a conversation exists; old citations open their original evidence. Switch accounts/tabs/views during a stream. Authorize every replay/evidence request before exposing identifiers or payloads. Retention gaps trigger scoped resynchronization.

**A-12 · Hosted limits.** Public sessions cannot ingest, install workers, run commands or approve drafts. Enforce resource/output quotas and test restricted admin operations. Demonstrate restore and rollback with disposable data before production.

**A-13 · Operational profile.** Execute TF-01–TF-12 from the [factor matrix](../engineering/twelve-factor.md). Replace the API with empty local storage while retaining backing services. Promote the same tested artifact with changed deployment config. Document the local embedded-store exception rather than calling it stateless.

**A-14 · Publication transaction.** Require an authenticated approver, exact proposal digest and expected revision. Tamper with the proposal, change the base, hide an endpoint and inject faults between write categories. Either all accepted records/review/event/revision commit or none do. No implicit endpoint promotion can bypass the review.

**A-15 · Reuse review.** For each imported module, record pinned source and blob, symbols/callers, applicable notices, dependency boundary, characterization tests and intentional changes. Public CI must not need a private donor checkout, live credentials or private fixture data.

## Evidence levels

A static source observation, a synthetic lab pass, an application test pass, a browser check and a production observation are separate claims. Record platform/tool versions, fixture revision, command, expected/observed result and limitations. Do not turn historical donor test names into current pass counts.

Quality evaluation tracks false merges, unresolved cases, evidence relevance, source independence, latency, recovery and memory. Choose numerical targets after a reproducible baseline; no universal confidence score or unmeasured capacity promise is asserted here.
