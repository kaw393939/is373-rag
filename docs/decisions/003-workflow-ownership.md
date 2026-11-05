# ADR 003 · Workflow ownership

**Status:** Single-owner rule adopted for the draft; execution engine open. **Date:** November 5, 2026.

## Context

Parsing, chunking, NLP, NER, entity resolution, relationship extraction, indexing, and augmentation have different dependencies and resource requirements. Work must recover from failures without promoting stale artifacts or blocking usable search.

## Decision

Model ingestion as a DAG over versioned artifacts. One durable orchestrator owns readiness, retries, attempts, timeouts, cancellation, and dependency progression. Evaluate Dagster and Temporal before selecting a runtime. NATS/JetStream carries relevant system events and durable work only where that does not duplicate orchestration ownership.

## Consequences

The workflow engine may use its own task queues and state database. SQLite retrieval storage does not automatically become workflow control storage. Jobs reference artifacts and fingerprints rather than transporting entire documents in broker messages.

Publish readiness after committed outputs. Use idempotent writes, current-version checks, outbox publication, and reconciliation. Acknowledgments and exactly-once messaging features do not imply exactly-once model execution.

## Alternatives and tradeoffs

Pure event choreography distributes dependency logic across consumers and makes joins, cancellation, and recovery harder to inspect. A custom scheduler would require implementing durable leases, fencing, retries, dependency joins, and upgrades. It needs a concrete justification before adoption.

## Validation

Kill a worker before and after commit; redeliver a task; replace or delete a source mid-run; correct an entity merge; interrupt a model call; and verify that completed independent artifacts remain usable. Compare operational recovery and incremental reprocessing with representative document workloads. See [ingestion](/architecture/ingestion).
