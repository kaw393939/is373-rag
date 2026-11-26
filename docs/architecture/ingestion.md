---
title: "Ingestion and enrichment DAG"
description: "Trace how a revised document moves through parsing, chunking, and entity extraction, and see which outputs should be rebuilt after a source correction."
teaser: "A corrected page arrives while the old version is still being indexed. The important question is which version a reader can actually retrieve."
---

# Ingestion and enrichment DAG

<span class="status-label">DRAFT · EXECUTION ENGINE OPEN</span>

Suppose a report arrives with a corrected name while a worker is extracting relationships from the previous edition. A successful worker can still produce an obsolete result. Before publication, the system needs to check exactly which source revision each piece of work used.

The draft represents those dependencies as a directed acyclic graph (DAG). The graph records which outputs depend on which inputs. One durable orchestrator owns retries and execution state. Parsing has separate CPU, GPU, model quotas, and database publication capacity so chat can keep serving readers.

## Artifact dependencies

```mermaid
flowchart TD
  SOURCE["Immutable source revision"] --> PARSE["Structured document and source anchors"]
  PARSE --> NORMAL["Normalization and linguistic annotations"]
  NORMAL --> CHUNKS["Retrieval chunks"]
  CHUNKS --> FTS["Lexical index"]
  CHUNKS --> EMB["Embeddings and vector index"]
  FTS --> SEARCH["Search readiness policy"]
  EMB --> SEARCH
  NORMAL --> WINDOWS["Extraction windows and context"]
  WINDOWS --> MENTIONS["Mentions, coreference, relation candidates"]
  MENTIONS --> RESOLVE["Entity resolution and validated claims"]
  RESOLVE --> GRAPH["Published graph projection"]
  GRAPH --> AUG["Grounded augmentation"]
```

Read the diagram as a map of artifacts. A parser can process a document or a useful batch in one job. The output records its source revision, relevant context, and input fingerprint. That record tells the next worker what it can reuse when one page changes.

## Parsing and chunking

Preserve the original file and a structured representation of headings, paragraphs, tables, captions, lists, and code. OCR and normalization retain mappings to source locations and document revisions. Retrieval chunks link to larger parent sections. Extraction windows include the context needed for pronouns, aliases, and relationships spanning boundaries.

Docling is a candidate for structure-aware and token-aware chunking. Parser accuracy and source-anchor fidelity require tests on the actual formats. [Docling chunking](https://docling-project.github.io/docling/concepts/chunking/)

## NLP and entity extraction

Start with a passage that contains a pronoun, an acronym, and a domain term. Choose sentence boundaries, entity recognition, coreference, and relationship extraction for the language and task. Keep each annotation alongside the original wording. Then check which domain concepts a general-purpose named-entity recognizer misses.

Entity linking is a separate decision from mention detection. Candidate generation can use identifiers, aliases, types, dates, surrounding entities, and semantic context. Resolve when supported; preserve unresolved local identities otherwise. Record merge and split decisions so corrections can be reversed. spaCy documents context-based linking to canonical IDs as a distinct component. [spaCy entity linking](https://spacy.io/api/entitylinker)

## Claims and augmentation

Store claims with evidence spans, negation, modality, time, document revision, and extraction provenance. For example, a possible future acquisition remains a possibility attributed to a source. It is not automatically an established ownership relationship.

Build grounded entity descriptions, section context, aliases, table descriptions, or summaries as separate derived artifacts. Synthetic questions are optional and must improve measured retrieval. An augmentation does not become an independent source or a second corroborating citation. Microsoft GraphRAG provides a reference separation of graph extraction, augmentation, summaries, and embeddings. [GraphRAG indexing](https://microsoft.github.io/graphrag/index/default_dataflow/)

## Durable execution contract

An artifact fingerprint includes input hashes, source revision, relevant entity-resolution snapshot, stage implementation, schema, model, prompt, and configuration versions. A successfully committed output can be reused only when those dependencies match.

The orchestrator owns attempts, leases, timeouts, bounded retries, and readiness. Outputs commit idempotently before task acknowledgment. External model calls can have ambiguous completion after failure; persisted output reuse reduces duplication without promising exactly-once inference. Check current revision and attempt authority before publishing.

NATS can deliver source-change and committed-readiness events. If Dagster or Temporal owns internal activities, use that engine's scheduling semantics. Do not create a competing retry loop in broker consumers. Store an outbox entry with the committed output, then publish boundary events with deduplication and reconciliation.

## Readiness and corrections

Track lexical, vector, graph, and augmentation readiness separately, per revision. `search_ready` is a defined policy over the capabilities required by a given search route. Optional enrichment failures do not remove already usable source text.

When a revision changes, invalidate affected descendants. An entity-resolution correction rebuilds affected claims and derived profiles; embeddings change only if they depend on those modified artifacts. A deleted revision retracts its supporting evidence. Late work cannot promote an obsolete revision.

The knowledge graph may contain cycles. Refinement uses a bounded extraction/validation/repair sequence or an explicitly bounded task, with new output versions. It must have a stopping rule.

## Orchestrator decision

Evaluate Dagster's asset/dependency model for ETL lineage and backfills and Temporal's durable workflows for long-lived per-document execution. Select one progression owner. Workflow state storage is an operational decision separate from SQLite retrieval storage. [Dagster ETL](https://dagster.io/docs/guides/build/assets/modeling-etl-pipelines), [Temporal workflows](https://docs.temporal.io/workflow-execution)

## Study and compare

The [implementation resources](/research/implementation-resources) link parsing, extraction, and orchestration repositories. The [concept guide](/research/concepts) explains entity linking and workflow durability. Read the [dated developments](/research/recent-developments) before choosing an upstream dependency or assuming a release is stable.
