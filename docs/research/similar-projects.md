---
title: Similar projects
description: Eight primary-source references for graph retrieval, document enrichment, temporal knowledge, and pipeline design.
---

# Similar projects

**Sources checked: November 5, 2026.** These projects overlap with parts of our system; they are study references and possible integration candidates. They have not been benchmarked against our Rust streaming service, SQLite retrieval proposal, or document corpus. Project descriptions do not establish equivalent correctness, latency, or operational guarantees.

Use these references alongside our [ingestion DAG](/architecture/ingestion), [retrieval design](/architecture/retrieval), and [service contracts](/architecture/contracts).

## Comparison at a glance

| Project and team | Kind | Closest overlap | Best idea to investigate |
| --- | --- | --- | --- |
| [Microsoft GraphRAG](https://github.com/microsoft/graphrag) | Research indexing/query implementation | AI-extracted entities, relationships, and summaries | Explicit graph artifacts and local versus corpus-wide retrieval |
| [LightRAG — HKUDS](https://github.com/HKUDS/LightRAG) | Graph-RAG framework with an API server | Graph/vector retrieval and incremental document processing | Retrieval modes, storage boundaries, and deletion reconstruction |
| [RAG-Anything — HKUDS](https://github.com/HKUDS/RAG-Anything) | Multimodal research framework related to LightRAG | Structured parsing and cross-modal extraction | Keep tables, figures, and equations connected to surrounding text |
| [R2R — SciPhi](https://github.com/SciPhi-AI/R2R) | Retrieval application/platform | Ingestion, hybrid retrieval, graph extraction, document APIs | Product-level API and collection boundaries |
| [Haystack — deepset](https://github.com/deepset-ai/haystack) | Python component/pipeline framework | Explicit processing dependencies and retrieval composition | Typed component inputs, branching, and inspectable pipelines |
| [LlamaIndex PropertyGraphIndex](https://github.com/run-llama/llama_index) | Component within a Python data framework | Schema-guided graph extraction and combined retrievers | Separate extractors, graph stores, and retrieval methods |
| [Cognee](https://github.com/topoteretes/cognee) | Self-hosted memory engine/platform | Document enrichment, provenance, and graph/vector search | Storage responsibilities and ontology grounding |
| [Graphiti — Zep](https://github.com/getzep/graphiti) | Temporal graph construction/retrieval framework | Entity resolution, evolving claims, and incremental graphs | Source episodes, temporal validity, and fact invalidation |

## Microsoft GraphRAG

Study the [indexing dataflow](https://microsoft.github.io/graphrag/index/default_dataflow/) for the transition from text units to extracted entities, relationships, communities, reports, and embeddings. The [query overview](https://microsoft.github.io/graphrag/query/overview/) distinguishes local retrieval combining graph information with source chunks from global retrieval over community reports.

This is useful for defining our intermediate artifacts and deciding which summaries deserve their own indexes. Global report-based answering is a separate workload from our ordinary low-latency grounded chat path. The repository currently describes itself as largely in maintenance mode and as a research demonstration, so its methodology is a stronger reason to study it than an assumed future feature roadmap. [Repository status](https://github.com/microsoft/graphrag#graphrag)

## LightRAG

Read the [query modes](https://github.com/HKUDS/LightRAG#selecting-query-modes) and [storage configuration](https://github.com/HKUDS/LightRAG#selecting-backend-storage). Its local, global, naive, hybrid, and mix modes provide useful retrieval ablations. Its use of the word “hybrid” combines local/global retrieval; this should not be assumed to mean our specific BM25-plus-vector fusion.

Study how document deletion affects derived entities and relationships, and how extraction caches support reconstruction. Its separate key-value, vector, graph, and document-status responsibilities are relevant even if our experiment places them in one SQLite database. Reusing the Python framework or server would be a different deployment decision from implementing a Rust retrieval adapter.

## RAG-Anything

The [core algorithm](https://github.com/HKUDS/RAG-Anything#core-algorithm) describes document parsing, modality-specific analysis, graph construction, and retrieval. This is especially relevant if our documents contain tables, diagrams, or equations whose meaning disappears when flattened into plain text.

Study how parsed content retains hierarchy and how multimodal elements link to nearby text. We would still attach generated descriptions to exact source locations and distinguish them from source evidence. LightRAG's current README reports integrated multimodal processing starting with v1.5; treat the standalone RAG-Anything package and integrated LightRAG release as distinct compatibility targets before selecting dependencies. [Integrated multimodal processing](https://github.com/HKUDS/LightRAG#multimodal-capability-upgrades)

## R2R

R2R's [API examples](https://github.com/SciPhi-AI/R2R#using-the-api) and [feature overview](https://github.com/SciPhi-AI/R2R#key-features) combine document operations, citation-bearing RAG, semantic/keyword retrieval with rank fusion, and automatic entity/relationship extraction. This makes it a useful application-level comparison, rather than only an extraction library.

Study which operations the API exposes independently and how document/collection management relates to retrieval. Adopting the complete platform would replace substantial backend responsibilities; our current design keeps those contracts in Rust. The hosted documentation root linked by the repository returned 404 during this check, so the links here use the verified repository README. Validate current deployment instructions before evaluating it as a runnable baseline.

## Haystack

The [pipeline documentation](https://docs.haystack.deepset.ai/docs/pipelines) explains components connected as directed multigraphs, including branches, simultaneous flows, and loops. Its component-oriented approach is a useful reference for the contracts between parsing, extraction, retrieval, routing, and generation.

Our ingestion workflow deliberately uses acyclic dependencies with bounded repair stages. A component execution graph also does not, by itself, establish the durable ownership, revision checks, and crash-recovery guarantees required by our orchestrator. Haystack is worth studying or using inside a Python worker; adopting it for live chat orchestration would change the Rust serving boundary. Keep component execution and workflow durability explicit during comparison.

## LlamaIndex PropertyGraphIndex

The [property-graph guide](https://developers.llamaindex.ai/python/framework/module_guides/indexing/lpg_index_guide/) separates graph extraction, storage, and retrieval. Its `SchemaLLMPathExtractor` validates paths against allowed entity types, relationship types, and permitted connections. It also shows combining several graph retrievers.

This is a concrete reference for our ontology and extraction-schema design. Test schema-constrained extraction against a more permissive baseline to measure rejected useful claims and invalid accepted claims. Its Python interfaces and graph-store integrations are useful adapter examples; they do not establish compatibility with our proposed SQLite graph representation. Schema-valid triples still need evidence locations, disambiguation decisions, temporal qualifiers, and revision-aware retraction in our model.

## Cognee

Cognee's [architecture](https://docs.cognee.ai/core-concepts/architecture) assigns different responsibilities to relational provenance, vector similarity, and graph relationships. Its [ontology guide](https://docs.cognee.ai/guides/ontology-support) shows grounding extracted entities and types to an OWL ontology, including a mode that retains unmatched entities.

Study this separation of responsibilities and the treatment of unmatched concepts. It is a useful counterpoint to our unified SQLite experiment: co-locating indexes must preserve the same distinctions in data ownership and provenance. Cognee also addresses persistent agent memory across sessions, a broader scope than our initial document-grounded chat system. Its ontology grounding is a specific mechanism to evaluate, rather than automatic proof of correct entity resolution.

## Graphiti

The [Graphiti overview](https://help.getzep.com/graphiti/getting-started/overview) explains temporal context graphs, entity/edge extraction, fact invalidation, and hybrid retrieval. The [repository's graph model](https://github.com/getzep/graphiti#what-is-a-context-graph) connects derived facts to source episodes and describes validity windows.

This is the closest reference for correcting evolving relationships while preserving their history. Study the distinction between when a statement was recorded and when it applies, and how contradictory information affects current retrieval. Graphiti supplies a Python framework around supported graph backends; it is not a drop-in SQLite extension or our SSE gateway. Its published comparative performance claims require independent testing on our corpus and access filters.

## Four projects to study first

1. **LightRAG:** build retrieval-mode and deletion-reconstruction experiments for the [retrieval design](/architecture/retrieval).
2. **Graphiti:** refine evidence, temporal validity, and correction rules in the [contracts](/architecture/contracts).
3. **LlamaIndex PropertyGraphIndex:** prototype typed extraction and measure schema adherence plus grounding in the [ingestion pipeline](/architecture/ingestion).
4. **Microsoft GraphRAG:** use its artifact model and local/global split to decide whether community summaries improve our actual questions.

Any reuse decision should pin a revision, inspect that revision's license and dependencies, and run a small representative corpus through ingestion, restricted retrieval, update/deletion, and citation checks. These references inform the design; our measured relevance, freshness, and streaming behavior will decide adoption.
