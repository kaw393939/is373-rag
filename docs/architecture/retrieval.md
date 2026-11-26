---
title: "Hybrid retrieval and evidence"
description: "Compare exact names, related meanings, and graph links in one retrieval plan, then evaluate SQLite against a dedicated service with the same workload."
teaser: "A student remembers a quotation. A researcher remembers the report number. Both should be able to reach the same original passage."
---

# Hybrid retrieval and evidence

<span class="status-label">DRAFT · SQLITE UNDER EVALUATION</span>

Search for an exact report number, then try again using only a paraphrase of its conclusion. The first query rewards precise text matching. The second may need a vector search. Once you find a passage, a relationship can take you to its definition or a competing account.

This draft evaluates keeping those operations together in SQLite using FTS5 BM25, a vector extension, and indexed graph relationships. Locality could save network round trips. Compare SQLite with a dedicated service using the same relevance targets, access filters, ingestion load, and latency measurements before selecting either.

## Three complementary signals

| Signal | Proposed role | Implementation candidate |
| --- | --- | --- |
| Lexical | Names, identifiers, exact terminology | FTS5 BM25 |
| Semantic | Related meaning and paraphrases | Versioned vector extension |
| Relationships | Definitions, dependencies, related evidence | Typed graph tables with forward/reverse indexes |

FTS5 supplies BM25 ranking; numerically lower scores are better matches. Its tokenizer and document granularity need corpus-specific evaluation. [FTS5 documentation](https://sqlite.org/fts5.html)

## Vector capability decision

Compare exact and approximate search using an exact reference set. SQLite's own Vec1 extension offers ANN and exhaustive modes. Its ANN mode uses trained index structures, supports qualifying metadata predicates, and has query-shape considerations for filtered joins. It is a separately compiled/loaded extension, not an assumed feature of every SQLite binary. [Vec1 overview](https://www.sqlite.org/vec1.html), [Vec1 manual](https://www.sqlite.org/vec1doc.html)

`sqlite-vec` is a separate candidate. Its release stream includes different stable and prerelease capabilities; inspect the pinned release before claiming ANN support. [sqlite-vec releases](https://github.com/asg017/sqlite-vec/releases)

The retrieval adapter must declare exact/ANN behavior, supported metrics, filtering semantics, snapshot identity, interruption behavior, and incremental-update behavior. Unsupported capabilities are explicit errors or documented fallbacks. Hiding these differences behind one unconstrained `search()` call would weaken correctness.

Check filtering with a difficult case. If the closest overall matches are all outside the reader’s permitted scope, filtering only after a global top-k search can discard them and miss relevant eligible material. Test restrictive filters against an exact eligible reference set. Check filters inside candidate generation, overfetch behavior, selective tenants, empty subsets, and query plans. Measure recall and latency as the candidate budget changes. Enforce authorization before evidence reaches a model or browser, including passages found by following graph links.

## Candidate composition

```mermaid
flowchart LR
  accTitle: How retrieval produces cited evidence
  accDescr: Lexical and vector searches start with the same access scope. Their results are combined, deduplicated, expanded through selected graph edges, and optionally reranked before the reader sees versioned source evidence.
  Q["Question and access scope"] --> L["BM25 candidates"]
  Q --> EMB["Query embedding"]
  EMB --> V["Eligible vector candidates"]
  L --> F["Rank fusion and deduplication"]
  V --> F
  F --> G["Bounded typed graph expansion"]
  G --> R["Optional reranking"]
  R --> C["Versioned source evidence"]
```

Use reciprocal rank fusion as an initial baseline, then evaluate candidate windows and weights. Raw BM25 scores and vector distances do not share a useful common scale. Graph expansion follows selected seeds with hop, edge-type, result-count, and deadline limits. Always fetch original supporting passages.

## Evidence model

| Record | Required information |
| --- | --- |
| Document revision | Stable document ID, content hash, revision, source metadata, access scope |
| Chunk | Revision, parent section, original text, normalized view, source anchors |
| Mention | Surface form, source span, local context, extraction version |
| Entity resolution | Candidate IDs, selected/unresolved identity, decision version |
| Claim | Subject/predicate/object or event structure, polarity, modality, relevant time |
| Evidence | Claim-to-source link, source revision and span, extraction provenance |
| Augmentation | Generated content, dependencies, processing version, ranking role |

The graph is a derived view of source-backed assertions. Two documents can disagree. Deleting one revision retracts its evidence; another current source may still support the claim. Similar names and embeddings do not by themselves justify an entity merge. Recursive SQL supports graph traversal, but large high-fanout analytics need independent evaluation. [SQLite graph queries](https://sqlite.org/lang_with.html)

## SQLite operating boundary

Standard WAL mode permits readers alongside a writer, with one writer at a time per database. Processes sharing that WAL must be on one host. Long reads can delay checkpoint progress. [SQLite WAL](https://sqlite.org/wal.html)

Use a local publication owner, short transactions, bounded database threads, and precomputed ingestion artifacts. Release retrieval snapshots before waiting on model output. Keep database calls off Tokio's asynchronous execution threads. Multiple hosts must use explicit shard ownership or an evaluated replication design; NATS notifications do not replicate database files.

## Selection gates

Measure filtered p95/p99 retrieval latency during concurrent ingestion, ANN recall, relevance, graph contribution, memory, checkpoint behavior, and update-to-searchable delay. Keep canonical IDs and evidence contracts independent of the vector extension. See [ADR 002](/decisions/002-retrieval-storage).

## Study and compare

Use the [concept guide](/research/concepts) for BM25, ANN, and rank fusion, [implementation resources](/research/implementation-resources) for concrete SQLite candidates, and [similar projects](/research/similar-projects) for alternative graph-retrieval designs.
