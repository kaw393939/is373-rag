---
title: Implementation resources
description: Annotated primary repositories and guides for retrieval, document enrichment, durable execution, and streaming adapters.
---

# Implementation resources

**Reviewed November 5, 2026.** These twelve resources map to concrete implementation boundaries in the [retrieval design](/architecture/retrieval), [ingestion DAG](/architecture/ingestion), and [Rust backend](/architecture/backend). Reuse and evaluation recommendations below are our assessment; project documentation is evidence of capabilities, not comparative performance results. Pin the chosen release or commit before implementation because live documentation and default branches change.

## Retrieval and SQLite adapters

### 1. SQLite core: FTS5 and bounded graph queries

**Source:** [official Fossil repository](https://sqlite.org/src), with an [official Git mirror](https://github.com/sqlite/sqlite). **Read:** [FTS5 BM25 and ranking](https://www.sqlite.org/fts5.html), [recursive CTE graph examples](https://www.sqlite.org/lang_with.html), and [WAL concurrency](https://www.sqlite.org/wal.html).

Reuse FTS5 for the lexical baseline and indexed relational edge tables for bounded graph expansion. FTS5's best BM25 matches have lower numeric scores; `rank` is useful for ordered retrieval. Keep chunk IDs and source evidence in ordinary tables. Evaluate tokenizer behavior, repeated terms, technical identifiers, graph fanout, and concurrent publication. WAL still has one writer at a time and a same-host operating boundary; a broker does not change those constraints.

### 2. SQLite Vec1: the SQLite project's ANN candidate

**Source:** [SQLite source repository](https://sqlite.org/src). **Read:** [Vec1 overview/build instructions](https://www.sqlite.org/vec1.html) and [the usage manual](https://www.sqlite.org/vec1doc.html).

Evaluate Vec1 as a separately compiled extension; do not assume stock SQLite includes it. The overview identifies release **0.8**. The manual distinguishes exhaustive modes from trained IVFADC/OPQ ANN and explains candidate reranking, metadata predicates, and streaming post-filter queries. Reuse those examples to test our eligibility filters against an exact reference set. ANN training, update behavior, recall, and query shape belong in the adapter evaluation. Vec1's SQL streaming candidates are unrelated to browser SSE or resumable model generation.

### 3. sqlite-vec: exact baseline and a separate prerelease experiment

**Source:** [asg017/sqlite-vec](https://github.com/asg017/sqlite-vec). **Read:** [release notes](https://github.com/asg017/sqlite-vec/releases), [KNN queries](https://alexgarcia.xyz/sqlite-vec/features/knn.html), and [metadata/partition keys](https://alexgarcia.xyz/sqlite-vec/features/vec0.html).

The reviewed release page marks **v0.1.9** as the latest stable release and **v0.1.10-alpha.4** as a prerelease. Preserve that distinction in experiments:

| Channel | Study purpose |
| --- | --- |
| v0.1.9 stable | Flat/exact KNN baseline and supported filtering |
| v0.1.10 alpha series | DiskANN/rescore experiment; initial IVF support was described as experimental and not enabled |

Reuse `vec0` examples and partition-aware queries. Do not extrapolate flat-index filtering behavior to an ANN release without checking it. Metadata operators and auxiliary columns have documented restrictions. The project remains pre-v1, and release notes acknowledge stale documentation, so release-specific tests must settle behavior.

### 4. SQLite-Vector: ordinary-table and quantized-scan alternative

**Source:** [sqliteai/sqlite-vector](https://github.com/sqliteai/sqlite-vector). **Read:** [API reference](https://github.com/sqliteai/sqlite-vector/blob/main/API.md) and [quantization/recall examples](https://github.com/sqliteai/sqlite-vector/blob/main/QUANTIZATION.md).

Keep this as a secondary comparison if ordinary `BLOB` columns, compact representations, or scan memory become useful. It exposes exact scans and quantized scans, including low-bit options. Quantized approximate distances are a different tradeoff from a graph-based ANN index; compare recall and filtered query behavior explicitly. Its quantization guide includes exact-versus-approximate recall measurement. The repository's [license](https://github.com/sqliteai/sqlite-vector/blob/main/LICENSE.md) is Apache-2.0. Do not carry its promotional speed or memory figures into our capacity plan without reproducing them on our corpus.

## Parsing, linguistic annotation, and entity candidates

### 5. Docling: structured conversion and contextual chunking

**Source:** [docling-project/docling](https://github.com/docling-project/docling). **Read:** [chunking concepts](https://docling-project.github.io/docling/concepts/chunking/), [hybrid chunking example](https://docling-project.github.io/docling/_generated/examples/hybrid_chunking/), and [optional enrichments](https://docling-project.github.io/docling/usage/enrichments/).

Evaluate `DoclingDocument` and `HybridChunker` for the first parser adapter. The chunker refines structural chunks against a supplied tokenizer and can include contextual metadata; table headers can be preserved across chunks. Reuse the example's separation of chunk content and contextualized serialization, while retaining original source anchors. Test actual PDFs, tables, headings, OCR, and code. Optional enrichment adds model work and should have independent readiness/budgets. The repository states that code is MIT-licensed and individual models have their own licenses.

### 6. spaCy: linguistic pipeline plus explicit entity-linking contracts

**Source:** [explosion/spaCy](https://github.com/explosion/spaCy). **Read:** [linguistic annotations and named entities](https://spacy.io/usage/linguistic-features) and [EntityLinker requirements](https://spacy.io/api/entitylinker).

Reuse sentence/token annotations, domain rules, and span-based NER as one baseline. The linker is particularly relevant to our data model: it requires a knowledge base, plausible candidate generation, and a context-based selection model. This makes a useful adapter contract for canonical entity resolution, rather than treating an extracted name as an identity. Evaluate language/model fit, ambiguous acronyms, unseen entities, and abstention. Preserve offsets through normalization and keep mention detection, coreference, and canonical identity decisions distinct.

### 7. GLiNER: schema-selected mention extraction

**Source:** [urchade/GLiNER](https://github.com/urchade/GLiNER). **Read:** [quickstart with inference-time labels](https://urchade.github.io/GLiNER/quickstart.html) and [current framework documentation](https://urchade.github.io/GLiNER/).

Evaluate GLiNER against spaCy's baseline for domain concepts that fixed general NER labels miss. Reuse the text-plus-labels extraction interface, persist spans and model/version information, and measure precision/recall on annotated corpus samples. Current documentation also covers relation extraction and streaming architectures; these are optional experiments, not a requirement to replace every ingestion stage. Entity extraction output still needs our identity-resolution and evidence-validation process. The code [license is Apache-2.0](https://github.com/urchade/GLiNER/blob/main/LICENSE); select and record the particular checkpoint separately.

## Rust serving and event adapters

### 8. async-nats: JetStream publication and consumer examples

**Source:** [nats-io/nats.rs](https://github.com/nats-io/nats.rs). **Read:** [JetStream examples](https://docs.rs/async-nats/latest/async_nats/jetstream/index.html), [publish acknowledgment API](https://docs.rs/async-nats/latest/async_nats/jetstream/context/struct.Context.html#method.publish), and [delivery/redelivery guide](https://docs.nats.io/learn/jetstream/delivery-and-acknowledgment).

Reuse the asynchronous client behind an event-publication adapter. A concrete detail to retain: `publish(...).await` returns an acknowledgment future; awaiting the server acknowledgment is a separate step. Consumers commit idempotently before acknowledging and tolerate redelivery. Study connection loss, bounded pulls, acknowledgment deadlines, and outbox reconciliation. JetStream delivery guarantees do not make database writes and external inference one atomic operation. Internal DAG scheduling remains owned by the selected orchestrator.

### 9. Axum/Tokio: direct SSE and supervised request work

**Source:** [tokio-rs/axum](https://github.com/tokio-rs/axum), alongside [tokio-rs/tokio](https://github.com/tokio-rs/tokio). **Read:** [Axum SSE example](https://docs.rs/axum/latest/axum/response/sse/index.html), [Tokio shutdown](https://tokio.rs/tokio/topics/shutdown), and [blocking-task constraints](https://docs.rs/tokio/latest/tokio/task/fn.spawn_blocking.html).

Reuse SSE event/keepalive primitives and cancellation/task-tracking patterns for the first browser-to-Rust slice. Add our versioned event schema, authenticated commands, run sequencing, and bounded buffers around them. The SSE helper does not supply replay or durable run ownership. SQLite work needs bounded database threads; already-started blocking tasks cannot be aborted simply by aborting their join handle. Test partial delivery, slow clients, cancellation, and proxy buffering before connecting a model provider.

## Durable DAG execution: evaluate one owner

### 10. Dagster: assets, dependencies, and selective reprocessing

**Source:** [dagster-io/dagster](https://github.com/dagster-io/dagster). **Read:** [modeling ETL as assets](https://dagster.io/docs/guides/build/assets/modeling-etl-pipelines) and [partitioning assets](https://dagster.io/docs/guides/build/partitions-and-backfills/partitioning-assets).

Prototype source revision, parsed document, chunks, annotations, and published projections as assets. Reuse dependency and partition examples to study lineage and backfills. The ETL guide explicitly discusses the tradeoff between one operation and independently materializable phases; schedule meaningful artifacts or batches. Asset metadata is not automatically our source-of-truth publication transaction. Evaluate correction/reprocessing behavior, partition cardinality, operational storage, and recovery before selecting Dagster.

### 11. Temporal Python SDK: recoverable per-document execution

**Source:** [temporalio/sdk-python](https://github.com/temporalio/sdk-python). **Read:** [workflow basics](https://docs.temporal.io/develop/python/workflows/basics) and [SDK guide](https://docs.temporal.io/develop/python).

Prototype a document-revision workflow with parsing, NLP, embedding, and publication as activities. Study cancellation, retries, workflow versioning, and worker restarts. Workflow code must remain deterministic; model calls, file access, and other external work belong in activities. Activity retries still require our idempotency/version checks. Keep large artifacts in artifact storage and pass references. Temporal needs its service and workflow-state infrastructure, separate from retrieval SQLite. Compare the same failure scenarios with Dagster; the architecture has not selected either engine.

## Browser adapter

### 12. SvelteKit: initial state and independently updated chat panels

**Source:** [sveltejs/kit](https://github.com/sveltejs/kit), with [sveltejs/svelte](https://github.com/sveltejs/svelte). **Read:** [rendering options](https://svelte.dev/docs/kit/page-options), [server/client state guidance](https://svelte.dev/docs/kit/state-management), and [granular state updates](https://svelte.dev/docs/svelte/$state).

Reuse routing, per-route rendering choices, and request-scoped SSR state. Implement the [frontend design](/architecture/frontend) against our Rust event contract: authorized snapshot, sequence/attempt validation, incremental answer, and independent source/status panels. Rendering helpers do not provide a resumable chat protocol. Keep streaming Markdown, graph exploration, and document viewers behind separate interfaces and performance tests; this resource does not settle those library choices.

## First implementation study order

1. **Prove the chat boundary:** Axum SSE plus SvelteKit, using deterministic fixture events to test sources, Stop, disconnect, duplicate sequences, and resynchronization.
2. **Prove evidence locations:** Docling conversion/chunking on representative source formats; inspect anchors before adding generated augmentation.
3. **Establish retrieval truth:** FTS5 plus exact vector search, with tenant/ACL filters, canonical IDs, and fixed relevance examples.
4. **Measure alternatives:** Vec1 ANN, sqlite-vec's separate alpha experiment, and SQLite-Vector only where justified; compare recall, filtered latency, concurrent ingestion, and native failure behavior.
5. **Evaluate enrichment independently:** spaCy versus GLiNER mentions, then KB candidate generation/linking, source-backed claims, and reversible corrections.
6. **Choose execution semantics:** run the same document update, crash, retry, deletion, and backfill scenario in Dagster and Temporal; choose one progression owner, then integrate committed boundary events through async-nats.

Record versions, configuration, corpus, correctness results, and timings for each experiment. These studies are planned work; no package installation, integration, or comparative benchmark is represented as completed here.
