---
title: "Backend architecture draft"
description: "Review the proposed Rust chat backend, the worker responsible for each run, and the conditions under which one answer may finish or fail."
teaser: "A reader clicks Cancel just as the last answer arrives. Which part of the system gets to decide what the conversation records?"
---

# Backend architecture draft

A student opens a question, starts receiving a cited answer, and hits Cancel. At almost the same moment, the model sends its final response. The browser and the worker have seen different events. One owner has to decide which outcome becomes part of the record.

This design draft assigns that responsibility and describes the failure cases a future implementation must pass. The services and performance measurements remain proposed.

## Serving and enrichment boundaries

In the draft, Rust with Axum/Tokio handles authenticated chat, retrieves evidence, and owns the lifecycle of a streamed answer. Python workers parse and enrich documents in a separate dependency graph. NATS JetStream carries durable background events. SQLite remains a candidate for retrieval. Splitting chat from enrichment is a way to test whether a slow import can stop delaying a reader’s answer. End-to-end measurements would establish the effect.

```mermaid
flowchart LR
  accTitle: Run ownership and index publication
  accDescr: Axum passes browser commands to the run owner, which retrieves evidence, calls the model, and streams events. A separate ingestion workflow publishes searchable projections and records event intent in an outbox.
  UI[Browser] -->|HTTP commands| API[Axum adapters]
  API --> UC[Chat use cases and run owner]
  UC -->|Direct SSE| UI
  UC --> RP[Retrieval port]
  RP --> DB[Local SQLite candidate]
  UC --> MP[Model provider port]
  UC --> RS[Run store and optional replay log]
  SRC[Source revisions] --> WF[ETL orchestrator: unresolved]
  WF --> PY[Python NLP workers]
  PY --> PUB[Versioned projection publisher]
  PUB --> DB
  PUB --> OUT[Transactional outbox]
  OUT --> JS[NATS JetStream]
  JS --> WF
```

Axum provides SSE response primitives, including event streams and keepalives. The browser reaches this endpoint directly through a streaming-capable ingress; no frontend application server or broker is required to relay ordinary token deltas. [Axum SSE](https://docs.rs/axum/latest/axum/response/sse/index.html)

## Domain and application contracts

A tenant, conversation, run, generation attempt, source revision, chunk, and evidence record each need distinct identifiers. Validate those identifiers at the boundary. An evidence reference must lead back to immutable source bytes, the revision, and a location a reviewer can inspect. Preserve polarity, time qualifiers, and extraction history when a relationship becomes a graph claim.

Use cases include starting a run, retrieving evidence, streaming events, canceling a run, and publishing an enrichment revision. Their ports cover authorization, retrieval, model generation, run persistence, artifact storage, and event publication. Axum, SQLite, provider HTTP clients, and NATS implement adapters. Keep domain rules independent of transport DTOs and database rows; introduce traits at real substitution or testing boundaries rather than wrapping every function.

Expected outcomes use explicit errors: invalid input, unauthorized access, conflict, overload, unavailable dependency, deadline, and cancellation. Provider failures remain distinguishable from empty retrieval. HTTP mappings and sanitized diagnostic fields belong in adapters.

## Runs, streaming, and ownership

A start command accepts an idempotency key and returns a run identifier. A run has one authoritative owner and an increasing attempt epoch. Before multiple serving replicas are enabled, the run-store adapter must support atomic ownership acquisition, lease renewal, and fencing checks on every authoritative write. A lease alone cannot prevent an expired owner from publishing stale results.

Run states are accepted, retrieving, generating, and one terminal outcome: completed, canceled, failed, or interrupted. Events carry run ID, attempt epoch, sequence number, type, and payload. Sources, status changes, text deltas, and terminal outcomes are separate event types. Stop is an authenticated HTTP command; the browser closing an SSE connection is a transport event. The disconnect continuation/grace policy remains an explicit product decision.

Direct streaming is the default. Cross-device continuation, multiple viewers, and reconnect replay require an optional retained per-run output log with a specified retention and durability policy. Resume reads after a sequence and deduplicates overlap with live delivery. Replaying stored output cannot resume a lost model inference state. A failed generation worker produces an interrupted attempt or an explicitly new continuation attempt, never silent regeneration presented as the same stream.

## Deadlines and resource ownership

Propagate one request budget into stage deadlines for retrieval, reranking, provider connection, first output, and idle streaming. Independent retrieval operations may overlap. Avoid mandatory serial model-based query rewriting for ordinary requests.

Each run owns its child-task handles and cancellation token. Cancellation stops local work, closes provider streams, and invokes a provider cancellation facility when supported; remote computation or billing may continue. Dropping a future does not automatically stop independently spawned tasks. Shutdown stops admission, signals cancellation, then joins tracked tasks within an operational deadline. [Tokio cancellation](https://tokio.rs/tokio/tutorial/select), [shutdown](https://tokio.rs/tokio/topics/shutdown)

Set bounded admission queues, concurrent-run permits, provider permits, event-buffer bytes, payload sizes, and graph-expansion limits. Slow subscribers receive a resumable disconnect when retention permits, or a defined failure. They cannot accumulate unlimited output. Separate ingestion and chat capacity. Numeric limits and latency objectives require representative load tests.

## Retrieval and publication

SQLite can colocate canonical chunks, FTS5 BM25, vector indexes, and typed adjacency tables. Fuse independently ranked lexical/vector candidates; evaluate bounded graph expansion against the same baseline. FTS5 relevance sorts ascending, so lower BM25 values are better. [FTS5](https://www.sqlite.org/fts5.html)

Vector selection remains open: stable sqlite-vec exact search, its prerelease DiskANN path, and SQLite's distinct Vec1 ANN extension require recall, filtering, update, and latency comparisons. Do not assume arbitrary SQL filters execute inside a vector index. [sqlite-vec releases](https://github.com/asg017/sqlite-vec/releases), [Vec1](https://www.sqlite.org/vec1.html)

The initial SQLite topology is a local retrieval owner with serialized writes and a bounded pool of database threads/read connections. WAL permits concurrent readers and a writer, but only one writer at a time, and requires same-host access. Long reads can delay checkpoints. Do not mount one writable WAL database across hosts. End retrieval transactions before waiting on model output; carry immutable evidence/version references forward. [SQLite WAL](https://www.sqlite.org/wal.html)

Synchronous queries run outside Tokio execution workers. Bound both queued work and active operations; a timeout around a future cannot abort an already-running blocking task. Use supported database interruption/progress mechanisms where appropriate and prevent a late cancellation from interrupting the next borrower of a connection. [Tokio blocking work](https://docs.rs/tokio/latest/tokio/task/fn.spawn_blocking.html)

## ETL durability and decision gates

The DAG publishes separate text, vector, and graph readiness milestones. Its artifacts record source revision, input hashes, parser/chunker versions, model/prompt/schema versions, and dependency identities. Publication checks that the source revision remains current; deletes retract obsolete evidence. Authorization applies to every retrieval branch and evidence fetch.

Dagster versus Temporal remains unresolved. No custom durable scheduler is promised. The selected orchestrator owns dependencies and workflow recovery; JetStream owns event transport. Consumers tolerate redelivery, commit idempotently, and acknowledge afterward. A transactional outbox closes the database-commit/event-publication gap; it does not create exactly-once external model execution. [JetStream acknowledgments](https://docs.nats.io/learn/jetstream/delivery-and-acknowledgment)

Before implementation, settle ownership storage, disconnect/replay guarantees, orchestration, vector extension, and deployment durability. Validate first-useful-token latency, token gaps, cancellation, saturation, filtered recall, ingestion freshness, checkpoint behavior, and crash recovery together.
