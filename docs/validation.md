---
title: "Validation and delivery"
description: "Plan a repeatable evaluation of retrieval, cited answers, response times and failure recovery while keeping documentation checks distinct from runtime experiments."
teaser: "A fast answer can cite the wrong passage. A correct answer can vanish after reconnect. The validation plan makes room for both failures."
---

# Validation and delivery

Imagine comparing two retrieval systems on the same question. One is faster because its corpus is smaller; the other cites a document from a different release. Record the corpus, target revision, hardware, model and relevance goal before comparing times. Otherwise the difference is difficult to interpret.

The architecture is a hypothesis to test against relevance, responsiveness, consistency, and recovery. The documentation site is the current implementation; the application validation below is planned.

## Representative workload

Assemble permission-scoped documents with headings, tables, code, OCR where applicable, ambiguous entity names, acronyms, negated and hypothetical claims, conflicting sources, updates, and deletions. Include exact-identifier and paraphrased questions, relationship questions, unanswerable questions, and long conversations.

Define corpus size, vector dimensions, update rate, simultaneous chats, hardware, region placement, and model configuration before recording results. Preserve the same relevance target when comparing systems.

For a hypothetical comparison, freeze the synthetic harbor records at a revision called `harbor-v1`. Give both methods the same question about the moving light, the same accessible passages, and the same machine. Before running either, mark A2 as direct evidence of motion and B2 as the bulletin quoting that observation.

| Candidate | Check on the same fixture | Observed |
| --- | --- | --- |
| Lexical search | Record whether A2 appears in the first three passages, how B2 ranks and how long retrieval takes. | Pending run |
| Lexical and vector search | Use the same three-result cutoff, collect the same evidence and record the model and preprocessing revision. | Pending run |

If both methods return A2, inspect whether the answering step counts B2 as an independent witness. A correct search result can still lead to an unsupported answer.

## Measurements

| Surface | Measurements |
| --- | --- |
| Chat | First grounded answer token; p50/p95/p99 latency; output gaps; error and interruption rate |
| Browser | First useful content; input latency; long tasks; dropped frames; memory; stable scrolling |
| Retrieval | Filtered latency and recall; fusion quality; graph contribution; reranking cost |
| Ingestion | Stage throughput; source-to-search delay; graph readiness; resource contention |
| Knowledge | Entity-link precision; false merges; relation grounding; supported citations |
| Recovery | Duplicate suppression; stale-attempt rejection; replay gaps; update/delete propagation |

Set numeric budgets after baseline measurements and product requirements. A fast status acknowledgment does not substitute for first grounded text. Node/edge counts do not establish knowledge quality.

## Failure exercises

Choose one interruption and state the expected durable outcome before running it. For example, after a browser reconnects, a reviewer should be able to identify the original run and tell whether its answer completed or stopped early. Record the observed state as well as the elapsed time.

- Disconnect and reconnect between snapshot and live subscription; expire retained events.
- Cancel while retrieval or generation completes; restart a gateway; fence an obsolete owner.
- Kill ingestion workers before/after commit; redeliver jobs; replay boundary events.
- Replace a document while extraction is still running; delete its evidence; correct an entity merge.
- Saturate ingestion CPU, model quota, and the database writer while maintaining chat load.
- Exercise long SQLite reads, checkpoint pressure, native-extension failures, and restored backups.

## Implementation sequence

The [delivery roadmap](project/roadmap.md) sets the implementation order. Design the comparison above before implementation. Run it against the application during [S4, retrieval and evidence](project/roadmap.md#s4). Use [S5](project/roadmap.md#s5) to repeat the question through the streaming interface, then [S6](project/roadmap.md#s6) to reopen the published evidence on a second machine.

## Documentation delivery gates

Run `npm ci` and `npm run build`; VitePress validates generated page links. Preview representative desktop/mobile routes, rendered Mermaid diagrams, search, navigation, color themes, and interactive architecture paths. CI builds the site on pushes and pull requests. Publish source and static output from the same commit, preserving the site's access policy.
