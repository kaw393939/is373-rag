---
title: "ADR 003 · Workflow ownership"
description: "An architecture decision record on retrying document enrichment safely, committing current results once, and comparing Dagster with Temporal for workflow recovery."
teaser: "A worker finishes just after its source is replaced. Who can accept the result, retry the job, or show the reader the last valid version?"
---

# ADR 003 · Workflow ownership

*Architecture decision record · November 5, 2026 · Single-owner rule adopted for the draft. Execution engine open.*

This decision assigns responsibility for moving background work forward. Dagster and Temporal remain candidates. Both must be compared on the same recovery cases.

## Context

A corrected source can invalidate an entity match while leaving useful text search intact. Parsing, chunking, language processing, named-entity recognition, entity resolution, relationship extraction, indexing, and augmentation each depend on different inputs. Track those inputs so the system can recover an interrupted job without replacing valid work with stale output.

## Decision

Model ingestion as a DAG over versioned artifacts. One durable orchestrator owns readiness, retries, attempts, timeouts, cancellation, and dependency progression. Evaluate Dagster and Temporal before selecting a runtime. NATS/JetStream carries relevant system events and durable work only where that does not duplicate orchestration ownership.

## Consequences

The workflow engine may use its own task queues and state database. SQLite retrieval storage does not automatically become workflow control storage. Jobs reference artifacts and fingerprints rather than transporting entire documents in broker messages.

Commit the output before announcing readiness. Combine idempotent writes, an input-version check, an outbox record, and reconciliation so the stored state can settle a dispute. A broker acknowledgment tells you about message delivery. It cannot prove that an external model executed a request exactly once.

## Alternatives and tradeoffs

Pure event choreography distributes dependency logic across consumers and makes joins, cancellation, and recovery harder to inspect. A custom scheduler would require implementing durable leases, fencing, retries, dependency joins, and upgrades. It needs a concrete justification before adoption.

## Validation

Kill a worker before and after commit; redeliver a task; replace or delete a source mid-run; correct an entity merge; interrupt a model call; and verify that completed independent artifacts remain usable. Compare operational recovery and incremental reprocessing with representative document workloads. See [ingestion](/architecture/ingestion).
