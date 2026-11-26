---
title: "System architecture"
description: "Follow one question and one document revision through the proposed RAG architecture, from browser request to evidence retrieval and index publication."
teaser: "One reader wants an answer now. Someone else has just uploaded a corrected report. Follow those two requests to see why chat and ingestion need different owners."
---

# System architecture

<span class="status-label">DRAFT · DESIGN BASELINE</span>

There are two clocks in this design. A reader is waiting for a cited answer. In the background, a new document may take minutes to parse, link, and index. The system should answer using an eligible, published revision and switch to newer evidence only when the declared retrieval capabilities are ready.

Trace the live conversation first, then follow a source through ingestion. The design makes both paths measurable. Model time, retrieval, queueing, network travel, and browser rendering all contribute to what the reader experiences.

## System boundaries

```mermaid
flowchart TB
  accTitle: Chat and publication paths
  accDescr: The browser exchanges commands and streamed answers with Rust. Rust retrieves published evidence and calls the model. In a separate path, source revisions go through parsing and publication, which updates the index and emits an event.
  UI["SvelteKit browser interface"] <-->|"HTTP commands / SSE"| CHAT["Rust chat service"]
  SSR["SvelteKit initial rendering"] --> UI
  CHAT --> RET["Retrieval application boundary"]
  RET --> DB["SQLite candidate: FTS5 / vectors / graph"]
  CHAT <-->|"Generation / cancellation where supported"| MODEL["Model endpoint"]
  ORCH["One durable DAG orchestrator"] --> NLP["Parsing and NLP workers"]
  NLP --> WRITER["Index publication owner"]
  WRITER --> DB
  WRITER --> EVENTS["NATS / JetStream domain events"]
  EVENTS --> CHAT
  SOURCE["Document revisions"] --> ORCH
```

Use the boxes to find the owner of a failure. If the browser receives a stale completion, start with run ownership. If search returns a superseded source, start with publication and retrieval. Several boxes can share one process. Add a process boundary only after checking resource isolation, failure ownership, database locality, and model placement.

## Conversation path

The browser submits an idempotent message command. Rust authorizes access, creates a run, retrieves eligible evidence, builds bounded context, and streams model output as structured events. One authoritative run owner decides ordering, cancellation, completion, and failure. UI event order is scoped by run and attempt.

SvelteKit may render the initial page and a bounded history snapshot. Active tokens travel directly from Rust to the browser. No frontend server proxy is required in that path. The snapshot includes a checkpoint per resumable run so the client can catch up without a replay/live subscription gap; cursors are scoped to that run and attempt.

Direct SSE is the default. A retained run-output log and separate generation workers are justified if independent generation, multiple viewers, or cross-device catch-up become required. Replaying recorded text does not resume a failed inference process.

## Knowledge path

BM25 and vector retrieval produce candidates over eligible document revisions. Combine ranks, expand selected graph relationships within explicit bounds, optionally rerank, and fetch original evidence. Every result carries document version and source anchors. Entity linking and graph traversal complement lexical and semantic search.

SQLite is a candidate for local retrieval, not an approved distributed database. [Retrieval storage](/architecture/retrieval) describes extension capabilities, single-writer constraints, filtering correctness, and replacement seams.

## Ingestion path

A source revision creates a durable workflow. Parsing preserves structure and source locations. Retrieval chunks and larger extraction windows support different tasks. Embeddings and lexical indexing can progress independently of entity resolution, claim validation, and augmentation.

The orchestrator owns dependencies, retries, and readiness. NATS carries appropriate boundary events; it does not become a second scheduler. If the chosen orchestrator provides task queues, use its own execution protocol for those activities.

## Principles carried into this draft

1. Core evidence and run policies do not import Axum, SQLite, NATS, or an orchestration SDK.
2. Adapter contracts expose filtering, approximate-search, cancellation, and snapshot limitations.
3. One owner governs each state machine and one publication rule selects current artifacts.
4. Buffers, retrieval fanout, graph expansion, background compute, and retry budgets are bounded.
5. Source claims, resolution decisions, and generated augmentations remain distinguishable.

These constraints respond to the [three design reviews](/reviews/). They are requirements for implementation and future tests, rather than evidence that an implementation already satisfies them.
