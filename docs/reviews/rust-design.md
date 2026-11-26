---
title: "Rust design review through historical priorities"
description: "An independent design review of the proposed Rust backend that asks who owns work after a failure, where resources are bounded, and how evidence stays current."
teaser: "A Rust lock can coordinate a process. A restarted worker still needs a way to tell whether its old result is allowed to reach somebody’s screen."
---

# Rust design review through historical priorities

A worker loses its connection, waits, and comes back carrying a completed answer. Another worker has already taken over. The safety question is whether that late answer can change the record now. Local ownership inside a Rust process resolves only part of the problem.

This review examines the proposed backend through historical Rust design priorities. It identifies guarantees to specify and demonstrate. No application implementation was inspected.

## Attribution and method

Graydon Hoare created Rust's initial design and implementation, as the Rust project's own alumni page records. Rust subsequently evolved through a wider project and community; its current design must not be attributed entirely to one person. Hoare's author-published archive describes the personal project and later Mozilla work. [Rust attribution](https://rust-lang.org/governance/people/graydon/), [Hoare's archive](https://github.com/graydon/rust-prehistory)

This is our analysis through documented priorities, not a simulated review, quotation, or endorsement by Hoare. His early design presentation emphasizes safety, concurrency, isolation, controlled mutation, auditable departures from safety, and established techniques. It also describes supervision and task ownership. These are historical positions, not evidence that he endorses Axum, Tokio, a particular database, or the modern Rust feature set. [Hoare's primary presentation, slides 3–6 and 13–19](https://venge.net/graydon/talks/intro-talk-2.pdf)

Use the early presentation to understand the historical priorities. Use modern Rust and Tokio documentation when a conclusion depends on what the current language or runtime actually does. The distinction matters when a design review becomes a test plan.

## Assessment

The architecture has useful isolation boundaries: one run owner, narrow adapters, direct streaming, and asynchronous enrichment. It remains a proposal until failure behavior and resource bounds are demonstrated. Rust's ownership/type system prevents important classes of memory and concurrency errors; it does not prove authorization, distributed ownership, claim truth, correct cancellation, or durable publication. Safe Rust can still deadlock, exhaust memory, serve stale evidence, or execute a paid request twice. [Modern Rust concurrency](https://doc.rust-lang.org/book/ch16-00-concurrency.html)

```mermaid
flowchart TD
  INPUT[Validated and authorized command] --> OWN[Acquire run ownership and epoch]
  OWN --> WORK[Bounded child tasks]
  WORK --> CHECK{Owner epoch still current?}
  CHECK -->|Yes| COMMIT[Commit state and event intent]
  CHECK -->|No| DISCARD[Discard stale publication]
  CANCEL[Stop or shutdown] --> SIGNAL[Signal cancellation]
  SIGNAL --> JOIN[Join tasks within deadline]
  JOIN --> TERM[Record terminal outcome]
```

## P1: Make ownership a persistent invariant

An `Arc<Mutex<Run>>` coordinates one process, not replicas after a partition. Specify the authoritative store, atomic claim operation, monotonic fencing epoch, renewal rules, and write-time validation before enabling multiple run owners. Check ownership at event/transcript publication, not only when work starts. Keep terminal transitions conditional and monotonic. Acceptance evidence: delay an old owner past lease expiry, allow takeover, then verify that the old attempt cannot commit or contaminate the current stream.

## P1: Bound blocking work and cancellation leakage

SQLite calls and CPU-heavy parsing must not occupy Tokio execution workers. A blocking pool alone is insufficient if its queue can grow indefinitely. Reserve database/chat permits, bound queued bytes and jobs, and give ingestion a separate budget. Already-started `spawn_blocking` work cannot be aborted through its join handle; shutdown timeouts stop waiting rather than stop that work. Define connection-scoped interruption and late-result disposal. [Tokio blocking behavior](https://docs.rs/tokio/latest/tokio/task/fn.spawn_blocking.html)

Every spawned task needs an owner, join path, and cancellation contract. Do not hold shared locks over network awaits. Review each `select!` branch for cancellation safety around partial reads/writes and side effects. Treat provider cancellation as best effort unless its API establishes stronger semantics. Test disconnect, explicit Stop, provider stalls, and shutdown during each stage. [Tokio select](https://tokio.rs/tokio/tutorial/select), [shutdown](https://tokio.rs/tokio/topics/shutdown)

## P1: Define a finite resource policy

Specify limits for concurrent runs, provider requests, request bodies, prompt/context size, subscriber buffers, retained events, graph depth/fanout, and retry budgets. Queue bounds need byte limits as well as item counts. Define the exact overload and slow-consumer outcome; avoid silently dropping text while signaling completion. Test a stalled reader, huge source document, high-degree entity, and retrying dependency together. Memory safety does not supply an application memory budget.

## P1: Preserve evidence and version consistency

Use immutable source revisions and explicit published projection versions. A late ETL completion must not replace newer chunks or restore deleted evidence. An authorization filter must apply to lexical, vector, graph, and source-fetch paths; a final filter after global vector top-k is not sufficient for correct eligible retrieval. Keep mentions, canonical identity decisions, and source-backed relation claims distinct.

Avoid retaining a database transaction during model generation. SQLite WAL has one active writer and requires same-host access; long readers can hinder checkpoints. If independent read connections must see one retrieval generation, specify the publication/version strategy rather than assuming concurrent queries share a snapshot. Validate revision replacement, ACL changes, entity splits, and deletes while chat and ingestion compete. [SQLite WAL](https://www.sqlite.org/wal.html)

## P1: Close durability gaps explicitly

JetStream can redeliver work. Use deterministic operation identities and idempotent database commits, then acknowledge. Persist outbox intent with the state change and tolerate duplicate publication. Keep broker acknowledgment, database commit, and external model execution as separate failure boundaries; do not label the combined system exactly once. Test crashes before/after each boundary. [JetStream delivery](https://docs.nats.io/learn/jetstream/delivery-and-acknowledgment)

A reconnect has two possible effects worth testing separately. It can replay an output already accepted by the store, or a user can explicitly start another generation attempt. Decide whether displayed deltas must survive a crash. Asynchronous persistence leaves a loss window that the interface must describe. A reconnect alone must never silently start a second attempt.

## P1: Audit the native extension boundary

Safe Rust wrappers do not prove the soundness of SQLite or C vector extensions. Pin and record native versions, review thread/connection ownership, validate vector dimensions and blob sizes, and disable unneeded extension loading. Concentrate any application `unsafe` in a small adapter with documented preconditions. Exercise malformed data and cancellation at the boundary; consider process isolation when a native crash must not take down chat. The Rustonomicon explains why foreign interfaces require caller-verified contracts. [Rust FFI](https://doc.rust-lang.org/nomicon/ffi.html)

## P2: Prefer explicit, measured simplicity

Use typed identifiers, small state enums, and concrete error variants to encode local invariants. Keep ports limited to genuine boundaries. Do not invent a durable scheduler while Dagster/Temporal remains undecided, or distribute a local function merely to use NATS. Choose vector indexes using filtered recall and concurrent latency measurements. Accept the design only after fault-injection and workload evidence; language selection alone establishes neither correctness nor a performance lead.
