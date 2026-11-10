# Delivery roadmap: harvest, prove, then extend

**Status: implementation plan, not delivered runtime.** Each slice is deliberately bounded. A slice closes only against its own code, tests and evidence; the documentation exercises do not close application acceptance.

The source audit changed the ordering: durable job/state contracts should precede the live chat shell. We already have relevant historical Rust code, so we should not first create an in-memory system that later needs replacement.

## Dependency map

```text
S0 · evidence and contract review
  → S1 · clean workspace and durable kernel
  → S2 · sources, claims and identity proposals
  → S3 · reviewed atomic publication
  → S4 · evidence retrieval and evaluation
  → S5 · streaming research interface
  → S6 · portable export and native-worker boundary
  → S7 · verified QA release and bounded public demonstration
```

Independent workstreams: portfolio DNS and documentation Pages activation. Neither authorizes changing the application server. Native acceleration research may proceed separately, but no backend enters a release without the common contract tests.

## S0 · Approve what we are reusing

**Inputs:** [source audit](../reuse/source-audit.md), [harvest plan](../reuse/harvest-plan.md), requirements and twelve-factor matrix.

**Deliver:** applicable source-license/notice review; exact donor symbols and dependency inventory; versioned contract sketches; synthetic fixture set; selected application toolchain and supported initial platform. Distinguish current rebuild, historical daemon and owner-only source.

**Exit:** R-15/A-15 evidence; no private dependency needed for public CI. Record accepted architecture decisions, including hosted store separation and local exceptions. Stop if reuse rights, source identity or an authority boundary remain unclear. This documentation update advances S0; it does not complete the whole gate.

## S1 · Clean workspace and durable kernel

**Depends on:** S0. **Donors:** H-01 job kernel, H-02 event log; C-03 contract shapes.

**Deliver:** minimal Cargo workspace, typed IDs/configuration, schema migrations, transaction-owned store commands, plan validation, idempotent job creation, bounded task claiming and scoped event replay. Separate domain logic from Axum/SQLite adapters. Public CI builds without model keys.

**Exit:** A-01/A-06/A-10; TF-01/02/03/06/08. Race two independent clients; reject expired and stale-epoch results even with the same worker name; detect corrupt stored JSON; roll back state and its event together. A skipped required validation stage cannot advance publication. Do not begin a bespoke broker or generic workflow-builder UI.

## S2 · Evidence, claims and identity proposals

**Depends on:** S1. **Donors:** H-03 candidate lifecycle; owner-reviewed E extraction/artifact steps.

**Deliver:** immutable source artifacts and acquisition records, typed text/media locations, mentions, stable entity IDs, many-to-many aliases, qualified claims/assertions and a review queue. Use deterministic synthetic extractors first.

**Exit:** A-02/A-03/A-04/A-05. Include two people with one name, one incident with multiple aliases, a vessel/incident naming trap, a copied report and contradictory testimony. A new source cannot create a new canonical entity solely because the candidate hash changed. Prove a merge can be reversed without deleting the previous decision. No automatic name-only canonical merge.

## S3 · Reviewed, atomic publication

**Depends on:** S2. **Donors:** H-03 promotion records, E staging ideas; replace their assumptions where necessary.

**Deliver:** immutable proposal bundle, review bound to its digest and base revision, authenticated approval command, all-endpoint validation, publication transaction and scoped event. Create an explicit published revision; publication is not a boolean sprinkled across unrelated tables.

**Exit:** A-06/A-14 and relevant A-05/A-11. Inject failures between every durable write category. Check no half-published entity/edge/evidence/revision/event survives. Reject stale review, changed proposal, hidden endpoint and cross-library approval. The [publication lab](../engineering/examples.md#atomic-publication) specifies a small subset, not the full implementation.

## S4 · Retrieval that can expose its evidence

**Depends on:** S3. **Donors:** corpus/vector staging patterns, not a claim that the lexical placeholder is a semantic index.

**Deliver:** lexical baseline, graph filtering/expansion, immutable citation packets, optional compatible embedding adapter and a small reviewed evaluation set. Filter access before retrieval, ranking and caching. Record library revision and embedding-space identity.

**Exit:** A-02/A-05/A-08/A-11. Evaluate false matches, unresolved identities and evidence relevance against fixed fixtures. Missing compatible query embeddings produce a declared lexical/graph-only mode. Public results must not leak hidden identifiers, source text, facets or cached private evidence. Numerical quality targets are chosen from a measured baseline, not invented in this plan.

## S5 · Streaming research interface

**Depends on:** S1, S3 and S4. **Donors:** C-01 gateway adapter/batching, W-01 browser protocol/session behavior, C-03 projections.

**Deliver:** Svelte chat/evidence/jobs/review views; Rust API; durable run admission; normalized model outcomes; bounded SSE delivery and explicit cancellation. Provider execution belongs to a leased bounded worker; an API connection is not the owner of durable conversation truth.

**Exit:** A-09/A-11/A-12; TF-06/07/09. Test all byte boundaries, premature EOF, refusal, length-limited output, slow clients, disconnect/reconnect, server termination and account changes through real HTTPS. An interrupted paid generation is not silently rerun. A citation opens the exact pinned evidence, including after a newer library is published.

## S6 · Portable library and capability substitution

**Depends on:** S3; interface inspection from S5. **Donors:** artifact manifests and host-worker design, reviewed separately from implementations.

**Deliver:** package format v1, supported consistent snapshot/export, safe import/preflight, integrity verification, public-only export construction, worker readiness/permissions and one minimal native worker contract demonstration.

**Exit:** A-07/A-08 and TF-04/10/12. Open a Mac-created package on Linux without Apple plugins. Tampered/missing objects fail validation; unbound inputs stay disabled. Inspect the exported bytes and indexes for draft/private material. No credentials, executable auto-start, absolute home paths or opaque device handles are needed to read evidence. Selectively importing a historical library is not copying an entire private live database.

## S7 · Verified hosted release

**Depends on:** S1–S6 plus a separately verified host inventory. **Donors:** hosting studio and chat release practices as operational references.

**Deliver:** isolated QA, immutable per-platform artifacts, release manifest, explicit production approval, usage/admission limits, off-host backups and restore/rollback procedures. Only approved public data enters the demonstration. No heavy inference placement is assumed from an old Droplet inventory.

**Exit:** all applicable A-01–A-15 and TF-01–TF-12 have actual evidence or an explicitly accepted local-profile exception. Test production-path proxy streaming, empty-disk API replacement, schema compatibility and restore into an isolated target. A failed deployment must not require deleting the only library or production volume. Pages serves documentation, not this application.

## Work packaging and review

Each implementation issue contains: slice and requirement IDs, pinned donor symbols, proposed target module, scope/non-goals, tests, dependencies, public/private boundary and rollback considerations. Link a test-plan issue, atomic commits, PR and command receipts. A merge should not close a requirement whose evidence is still only a design paragraph.

Suggested first issue after S0: **Extract DAG validation and idempotent job creation with transactional events.** Its non-goals are model calls, a frontend, graph inference and live deployment. Follow it with lease fencing/scoped replay, then the evidence schema. Keep those changes separately reviewable.

## Earlier roadmap reconciliation

This S-series supersedes the earlier G-series ordering, not its goals. G0/G1 map to S0; G5 moves forward into S1; G3 maps to S2/S3; G4 to S4/S6; G2 to S5; G6/G7 to S7. Earlier architecture and research pages remain clearly labelled reference material.

## IS373 demonstration

A learner predicts a failure, reproduces it, explains the relevant source, proposes a bounded repair and identifies what the test does not prove. The final walkthrough imports conflicting reports, reviews identities, publishes a revision, streams a cited answer and reopens the library on a machine with a capability missing. This is an instructor example, not a new grading policy.
