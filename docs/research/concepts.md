---
title: "Concept reading guide"
description: "Learn the mechanics behind keyword and vector search, entity linking, durable work, and streaming answers through fourteen annotated explanations."
teaser: "Start with a phrase nobody paraphrases, a sentence everyone paraphrases, and two people with the same name. Each exposes a different retrieval problem."
---

# Concept reading guide

Use one small document collection while you read. Ask for an exact identifier first, then paraphrase a sentence, then ask about an ambiguous name. Which passage comes back in each case? The annotated readings explain why the three results can differ.

## Suggested reading order

1. Start with **BM25, vectors, and rank fusion** to understand how passages become answer candidates.
2. Read **chunking, NER, linking, and graph search** to see how documents become structured evidence.
3. Study **dependencies, retries, messaging, and WAL** before deciding how ingestion runs and publishes updates.
4. Finish with **reactivity, SSE, and recovery**, then trace one document upload and one interrupted answer through the [system overview](/architecture/overview).

## Retrieval foundations

Use three fictional records. They are a practice collection, with no bearing on NJIT courses or policies.

| Record | Source text |
| --- | --- |
| A, equipment handbook | “LAB-417 meets in the instrument room. Return loaned sensors by noon on Friday. Coordinator Lee Park handles equipment.” |
| B, exhibition program | “Curator Lee Park selected photographs for the exhibit.” |
| C, unsigned minutes | “Lee Park approved the display.” |

Search for `LAB-417` and check whether the result cites A’s first sentence. Then ask “When do I have to bring the borrowed gear back?” A’s second sentence is the expected passage even though the question uses different words. Record the top passage and its rank for each method. They can perform differently on the two questions.

For the minutes, “Lee Park” is a mention with two candidate identities. A role, a linked document, or a reliable identifier could support a match. C supplies none of them. Keep the mention unresolved and retain the words that prompted the question.

### BM25 and full-text search

**Learn here:** [SQLite FTS5 and its BM25 function](https://sqlite.org/fts5.html#the_bm25_function). It explains lexical matching and relevance ranking; FTS5 assigns better matches lower scores. Our keyword branch needs this behavior for useful literal matches and correct result ordering. **Related:** [Three retrieval signals](/architecture/retrieval#three-complementary-signals).

### Exact and approximate vector search

**Learn here:** [SQLite Vec1 user manual](https://sqlite.org/vec1doc.html). Compare exhaustive nearest-neighbor search with trained approximate indexes, filtering, and reranking. Our vector selection must measure eligible-result recall alongside latency rather than assume all semantic indexes behave alike. **Related:** [Vector capability decision](/architecture/retrieval#vector-capability-decision).

### Reciprocal rank fusion

**Learn here:** [Elastic's RRF explanation and formula](https://www.elastic.co/docs/reference/elasticsearch/rest-apis/reciprocal-rank-fusion). RRF combines positions in ranked lists rather than requiring identical score scales. Our initial hybrid baseline can therefore combine keyword and semantic candidates without adding incompatible raw scores. **Related:** [Candidate composition](/architecture/retrieval#candidate-composition).

## Documents and extracted knowledge

### Structure-aware chunking

**Learn here:** [Docling chunking concepts](https://docling-project.github.io/docling/concepts/chunking/). Study document structure, token budgets, and contextualized chunk representations. Our pipeline needs retrieval-sized passages while preserving parent sections and source locations for extraction and citations. **Related:** [Parsing and chunking](/architecture/ingestion#parsing-and-chunking).

### Named entity recognition

**Learn here:** [spaCy's named-entity guide](https://spacy.io/usage/linguistic-features#named-entities). NER identifies spans and categories in text. Our mention records must preserve those spans separately from canonical identities; detecting a name alone does not resolve which entity it denotes. **Related:** [NLP and entity extraction](/architecture/ingestion#nlp-and-entity-extraction).

### Entity linking and disambiguation

**Learn here:** [spaCy EntityLinker](https://spacy.io/api/entitylinker). It describes knowledge-base candidates and contextual selection. Our resolver needs stable identifiers, supporting context, and an unresolved outcome so ambiguous names do not force destructive merges. **Related:** [Evidence model](/architecture/retrieval#evidence-model).

### Local and global graph retrieval

**Learn here:** GraphRAG's [local search](https://microsoft.github.io/graphrag/query/local_search/) and [global search](https://microsoft.github.io/graphrag/query/global_search/). Compare entity-focused evidence with corpus-level community summaries. Our design should evaluate these question types separately and keep generated summaries linked to their underlying sources. **Related:** [Claims and augmentation](/architecture/ingestion#claims-and-augmentation).

## Workflow and storage behavior

### Assets and dependency graphs

**Learn here:** [Dagster assets](https://dagster.io/docs/guides/build/assets). An asset describes a persistent result and how it depends on other results. This helps model our chunks, embeddings, and claims as versioned outputs with explicit recomputation dependencies. **Related:** [Artifact dependencies](/architecture/ingestion#artifact-dependencies).

### Retries and durable work

**Learn here:** [Temporal retry policies](https://docs.temporal.io/encyclopedia/retry-policies). Read the distinction between workflow logic and failure-prone activities. Our ingestion stages need bounded retry policies and idempotent publication even when execution infrastructure can recover progress. **Related:** [Durable execution contract](/architecture/ingestion#durable-execution-contract).

### Ephemeral messaging and retained streams

**Learn here:** [NATS JetStream concepts](https://docs.nats.io/concepts/jetstream). Core messaging and retained, acknowledged streams provide different delivery behavior. Our jobs and replay requirements need deliberate retention and duplicate handling; transient notifications can use lighter delivery. **Related:** [ETL durability](/architecture/backend#etl-durability-and-decision-gates).

### SQLite WAL and checkpoints

**Learn here:** [SQLite write-ahead logging](https://sqlite.org/wal.html). Readers can overlap a writer, while long read transactions can delay checkpoint progress. Our retrieval transactions should finish before answer streaming, and ingestion must account for the single-writer boundary. **Related:** [SQLite operating boundary](/architecture/retrieval#sqlite-operating-boundary).

## Frontend and streaming contracts

A student closes a laptop halfway through an answer. On reopening it, they need to know whether the old run finished, stopped, or can be resumed. These three readings separate what the screen shows from what the service can actually recover.

### Granular reactive state

**Learn here:** [Svelte's reactive state](https://svelte.dev/docs/svelte/$state). Read how property changes trigger updates. Our active message, composer, and source panel should have independent state ownership so streaming work does not unnecessarily disturb other interactions. **Related:** [Component ownership](/architecture/frontend#state-and-component-ownership).

### SSE framing and reconnection

**Learn here:** [MDN's server-sent events guide](https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events/Using_server-sent_events). Study event fields, blank-line framing, identifiers, and reconnection behavior. Our stream decoder must assemble complete events across network reads and distinguish transport reconnection from answer recovery. **Related:** [Event envelope](/architecture/contracts#event-envelope).

### Snapshot and replay

**Learn here:** our proposed [ordering and recovery invariants](/architecture/contracts#ordering-and-recovery-invariants) and [frontend stream lifecycle](/architecture/frontend#stream-lifecycle). This is our application protocol: snapshots carry cursors, retained events support catch-up, and gaps require explicit resynchronization. SSE itself does not provide event retention or restore failed model inference.
