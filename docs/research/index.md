# Research library

<span class="status-label">PRIMARY SOURCES CHECKED · NOVEMBER 5, 2026</span>

Study existing approaches before fixing our specification. These resources were selected for their relevance to hybrid retrieval, AI-extracted knowledge, durable ingestion, and streaming interfaces. Each collection explains what a resource contributes and which design questions still need our own tests.

## Choose a collection

| Collection | Find here | Start with |
| --- | --- | --- |
| [Similar projects](/research/similar-projects) | Eight systems and frameworks, teams, repositories, design overlap, and differences | LightRAG, Graphiti, LlamaIndex, Microsoft GraphRAG |
| [Implementation resources](/research/implementation-resources) | Twelve concrete repositories and documentation paths grouped by subsystem | SQLite candidates, Docling, spaCy, Rust adapters, orchestration |
| [Concept reading guide](/research/concepts) | Fourteen annotated explanations connected to our own architecture | BM25, ANN, RRF, entity linking, DAGs, SSE |
| [Recent developments](/research/recent-developments) | Seven dated releases, research updates, and project changes | Dependency status, vector indexing, extraction, Rust workflows |

Use the site's search to find a project or term such as “entity resolution,” “DiskANN,” “Graphiti,” or “replay.” Each collection links to original project material and deeper explanations.

## A useful first reading session

1. Read our [system overview](/architecture/overview) to identify the boundaries we are evaluating.
2. Study [similar projects](/research/similar-projects) and record one useful idea and one important difference for each serious candidate.
3. Follow the [concept guide](/research/concepts) for unfamiliar mechanisms.
4. Examine [implementation resources](/research/implementation-resources) at the actual repository and release level.
5. Check [recent developments](/research/recent-developments) for maintenance status, prerelease features, and changed assumptions.
6. Turn the comparison into a bounded [decision record](/decisions/) and an observable [validation question](/validation).

## Research questions to answer

| Decision | Useful evidence |
| --- | --- |
| Does a graph help our corpus? | Compare entity-to-passage retrieval and bounded relationship expansion with the same lexical/vector baseline. |
| Can SQLite serve our workload? | Check exact/ANN behavior, eligible filtering, update rate, memory, and concurrent ingestion. |
| Which extraction pipeline fits? | Inspect parser source fidelity, domain entity types, entity resolution, provenance, and correction paths. |
| Which workflow engine owns progression? | Compare recovery, dependency invalidation, cancellation, and backfills on the same document workflow. |
| What makes chat feel immediate? | Separate startup, first grounded text, steady rendering, cancellation, and reconnect behavior. |

## From research to a portfolio

Save the question, original sources, alternatives, decision, and a planned check. During construction, connect that decision to a real change. During testing, connect it to actual results and limitations. These records become credible case-study evidence for the career portfolio. The [IS373 assignment roadmap](/course-roadmap) shows what belongs at each course milestone.

Release dates and document-update dates are labeled separately. Linked projects and their claims are reference material, not proof that our proposed system is faster or that a dependency satisfies our requirements.
