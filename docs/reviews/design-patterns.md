---
title: Design patterns review
description: A draft architecture review applying the Gang of Four's published patterns to retrieval, streaming, and ingestion.
---

# Design patterns review

**Status: draft review, with implementation gates open.** This is our analysis of the proposed architecture using ideas from Erich Gamma, Richard Helm, Ralph Johnson, and John Vlissides. The original authors did not review, participate in, or endorse this project. No application implementation or performance results exist yet.

The review favors explicit responsibilities and interchangeable mechanisms where the system has a real reason to vary. The authors' own retrospective emphasizes the consequences of patterns and their adaptation to different languages. This supports applying their intent through Rust traits, enums, functions, and composition rather than recreating a class hierarchy. [Gang of Four retrospective](https://www.informit.com/articles/article.aspx?p=1404056)

## Pattern fit

The following mappings are proposed applications to this system, rather than statements made by the book's authors about RAG. The original catalog includes these patterns. [Design Patterns catalog](https://www.informit.com/store/design-patterns-elements-of-reusable-object-oriented-9780321770462)

| Pattern | Proposed application | Boundary and tradeoff |
| --- | --- | --- |
| Adapter | Convert SQLite/vector-extension, model-provider, broker, and document-parser interfaces into application contracts. | Preserve provider-specific capabilities explicitly; converting types alone cannot make different behavior equivalent. |
| Strategy | Select retrieval fusion, entity-resolution policy, or reranking algorithms. | Introduce substitution where we will evaluate alternatives; keep a single straightforward implementation elsewhere. |
| Observer | Notify local UI or service subscribers about run-state changes. | Distributed pub/sub adds delivery, authorization, retention, and failure semantics beyond local notification. |
| State | Constrain conversation runs and individual ingestion tasks to legal transitions. | Separate run state from the independent readiness of text, vectors, graph, and augmentation. |
| Composite | Traverse the tree-shaped parsed document: sections contain blocks and subsections. | The workflow DAG has shared dependencies and requires node identities; treating it as a tree would duplicate work. |

## P1: Define adapter behavior before selecting providers

The separation of Rust use cases from Axum, NATS, SQLite, and model APIs is a strong starting point. Adapter is appropriate when an existing interface differs from the interface its client needs. [Original Adapter excerpt](https://www.informit.com/articles/article.aspx?p=1398600)

**Finding:** a generic `search()` or `generate()` interface would hide differences that affect correctness. Exact and approximate vector search have different recall properties. Metadata filtering may happen during candidate selection or afterward. Closing a model connection may stop local delivery while remote generation continues.

**Draft contract:** retrieval requests carry corpus scope, access constraints, index revision, candidate limit, and deadline. Results carry canonical chunk IDs, document revisions, ranking method, and evidence locations. Adapters report supported filtering and search modes; unsupported requirements fail explicitly. Model adapters expose streaming, cancellation capability, partial-output behavior, and terminal errors. Domain code receives application records rather than SQL rows, broker messages, or provider SDK objects.

**Gate:** run the same contract cases against each adapter, including restrictive filters, deleted revisions, deadlines, and interrupted streams. Compare approximate retrieval with an exact baseline.

## P1: Give execution state one authoritative owner

**Finding:** callbacks from HTTP, broker delivery, timers, and workers can race. A notification must not independently advance workflow state, and an old attempt must not publish over a newer document revision.

**Draft contract:** a run owner applies legal transitions from accepted through retrieval and generation to completion, cancellation, or failure. Terminal transitions are controlled by that owner. An ingestion orchestrator owns dependency completion and task attempts. Durable records identify source revision, input fingerprint, stage version, and attempt. Output publication checks the expected revision and ownership before committing.

Events identify run, attempt, sequence, and schema version. Duplicate events can be ignored safely. Cancellation is an authenticated command to the owner. Text, vector, graph, and augmentation readiness remain independent milestones.

**Gate:** exercise duplicate completion, cancellation during generation, worker restart, and revision replacement. Each case must leave one explainable authoritative state without duplicated published artifacts.

## P1: Specify notification lifetime and delivery

**Finding:** calling every notification an Observer risks concealing loss and buffering behavior. A local subscriber, browser SSE connection, durable job consumer, and replay reader have different responsibilities.

**Draft contract:** local subscriptions have explicit lifetimes and bounded buffers. Ordinary token delivery remains direct from the Rust run owner to the browser. NATS distributes cross-service events and selected durable work. Retained output replay, if required, has a defined cursor, retention window, and deduplication policy. A slow viewer catches up or reconnects according to policy; it cannot accumulate unlimited memory or stall unrelated viewers.

**Gate:** verify unsubscribe cleanup, a stalled subscriber, reconnect overlap, missing sequence detection, and the chosen disconnect-versus-cancellation behavior.

## P2: Keep algorithm substitution narrow

Use Strategy for alternatives that share a declared result contract: rank fusion or an entity candidate scorer are useful examples. Keep ranking explanations, model versions, and resolution evidence with their outputs so changing a strategy remains auditable. Runtime selection can use a trait where needed; a function or enum is sufficient when the options are fixed.

Avoid a universal processor interface spanning parsers, retrievers, entity resolvers, and generators. Their inputs, failure modes, and resource requirements differ. A configuration switch should select a valid algorithm, rather than change hidden semantics behind a uniform method name.

## P2: Model the DAG as dependencies

The ETL workflow branches, joins, retries, and publishes versioned artifacts. Chain of Responsibility routes a request among potential handlers until one handles it; it does not describe this dependency execution model. [Original Chain of Responsibility excerpt](https://www.informit.com/articles/article.aspx?p=1398601)

Use one durable orchestration authority, with bounded repair passes and explicit dependencies. Dagster versus Temporal remains an open decision. NATS delivery should not become a second independent workflow scheduler. Construct dependencies at application startup instead of accessing database connections or providers through global singletons.

**Acceptance:** each abstraction must protect a demonstrated variation, ownership rule, or failure boundary. Measure its effect on latency and allocation when relevant; pattern coverage is not a project success metric.
