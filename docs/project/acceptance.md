# Requirements and acceptance

Application requirements below are **planned and not yet tested**. Documentation build checks are a separate concern. Each future issue should cite a requirement and scenario ID, then link actual test evidence.

## Requirements

| ID | Requirement | Acceptance scenario |
| --- | --- | --- |
| R-01 | Rust owns authoritative state; workers cannot bypass validation | A-01 |
| R-02 | Every published claim resolves to evidence or explicit derivation | A-02 |
| R-03 | Ambiguous identity stays unresolved; aliases are not globally unique | A-03 |
| R-04 | Merges/splits are auditable and reversible | A-04 |
| R-05 | Drafts cannot leak into ordinary published retrieval | A-05 |
| R-06 | Repeated ingestion and result delivery do not duplicate acceptance | A-06 |
| R-07 | Exports are consistent, integrity-checked and portable | A-07 |
| R-08 | Missing workers/models degrade explicit capabilities, not evidence access | A-08 |
| R-09 | Streaming distinguishes completion, cancellation and interruption | A-09 |
| R-10 | Jobs recover from crashes without accepting stale worker results | A-10 |
| R-11 | Answers preserve revision-pinned citations and access control | A-11 |
| R-12 | Public deployment is bounded and separated from authoring | A-12 |

## Acceptance scenarios

**A-01 · Worker boundary.** Submit an artifact with the wrong hash and a proposal outside the granted scope. Neither becomes canonical state; an auditable rejection is recorded.

**A-02 · Evidence integrity.** Publish a sourced and a derived claim; follow each to immutable inputs and derivation receipts. A dangling source reference blocks promotion.

**A-03 · Identity traps.** Two people share a name; one event has two aliases; a report names a vessel and an incident similarly. Correct identities stay distinct and uncertain matches enter review.

**A-04 · Undo a bad merge.** Merge two fixtures, then split them. Original mentions, prior decisions, and affected claim assignments remain inspectable.

**A-05 · Draft isolation.** Add a distinctive secret-free fixture phrase only to a draft. Published lexical/vector/graph retrieval and chat cannot surface it. Authorized draft retrieval can.

**A-06 · Retry.** Import the same source version twice and deliver one task result twice. Accepted counts and published relationships remain stable while attempts remain recorded.

**A-07 · Portable snapshot.** Export during active writes using the supported snapshot path, verify all referenced objects, then import on another OS. A missing/tampered object is rejected, not silently ignored.

**A-08 · Missing Mac worker.** Open a Mac-created library on Linux. Existing evidence remains accessible; incompatible generation/embedding operations show an actionable state and never fabricate substitute results.

**A-09 · Streaming faults.** Fragment Unicode/frames, omit terminal completion, disconnect and stop a run. Verify recorded partial output, no silent paid restart, and explicit terminal semantics through the HTTPS proxy.

**A-10 · Crash recovery.** Stop workers before/after output submission and restart the runtime. Expired leases are reclaimed; stale workers cannot commit; disk-full failures do not masquerade as successful publication.

**A-11 · Revision and session.** Publish a new library during a conversation; old citations still open the original evidence. Switch accounts/tabs during a stream; stale content cannot cross the ownership boundary.

**A-12 · Hosted limits.** A public session cannot ingest, install workers or approve drafts. Enforce concurrency/output quotas. Demonstrate restoration and rollback using disposable data before production.

## Quality evidence

Record platform, fixture revision, command, expected/observed outcome and limitations. Measure false merges, unresolved cases, retrieval relevance, streaming latency, restart recovery and memory usage. Numerical targets remain open until a reproducible baseline exists; do not invent benchmark results or universal confidence thresholds.
