---
title: "Research library"
description: "Find primary sources on retrieval, evidence processing, workflow engines, and streaming interfaces, then turn a reading question into a small test."
teaser: "A library name is easy to put in a proposal. Use these readings to find a design choice you can actually test."
---

# Research library

<span class="status-label">PRIMARY SOURCE READING GUIDE</span>

Suppose an answer cites an old version of a handbook. The model may have written a perfectly clear sentence. The failure could still be in retrieval, the version record, or a stale index. Choose the collection below that can help you distinguish those explanations.

## Choose a collection

| Collection | Find here | Start with |
| --- | --- | --- |
| [Similar projects](/research/similar-projects) | Eight systems and frameworks, teams, repositories, design overlap, and differences | LightRAG, Graphiti, LlamaIndex, Microsoft GraphRAG |
| [Implementation resources](/research/implementation-resources) | Twelve concrete repositories and documentation paths grouped by subsystem | SQLite candidates, Docling, spaCy, Rust adapters, orchestration |
| [Concept reading guide](/research/concepts) | Fourteen annotated explanations connected to our own architecture | BM25, ANN, RRF, entity linking, DAGs, SSE |
| [Engineering lessons from releases](/research/recent-developments) | Seven changes with lessons for engineering decisions | Dependency status, vector indexing, extraction, Rust workflows |

For a short first session, follow one claim from a project’s documentation to one example you could try. Search terms such as “entity resolution,” “DiskANN,” “Graphiti,” and “replay” take you to narrower questions.

## A useful first reading session

Trace the outdated handbook answer first. In this example, revision 1 sends readers to Room 6 and revision 2 corrects the location to Room 8.

1. Open the [citation’s evidence record](/project/knowledge#evidence-locations). Record its revision, anchor and exact words. Does it lead to Room 6 or Room 8?
2. Inspect the [published revision](/project/knowledge#atomic-publication). Record which handbook revision is active in the queried library and which search indexes are ready for it. A newer file on disk may still be awaiting publication.
3. Run the same current-location question through [lexical and vector retrieval](/architecture/retrieval#three-complementary-signals). When revision 2 is active and eligible, both are being judged against the Room 8 passage. Record each branch’s returned revision, anchor and rank, including an empty result.

The first disagreement narrows the investigation to the citation, publication or retrieval step. For a broader technology choice, use the readings in this order.

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

A useful portfolio entry can be one paragraph and a link. Name the choice you faced, link the primary source, show the test you ran, and explain the result that would change your recommendation. The [IS373 assignment roadmap](/course-roadmap) connects that evidence to the project milestones.

Each entry distinguishes a release, a paper revision, or a change in documentation. Linked projects and their claims are reference material, not proof that our proposed system is faster or that a dependency satisfies our requirements.
