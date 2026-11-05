# Validation and delivery

The architecture is a hypothesis to test against relevance, responsiveness, consistency, and recovery. The documentation site is the current implementation; the application validation below is planned.

## Representative workload

Assemble permission-scoped documents with headings, tables, code, OCR where applicable, ambiguous entity names, acronyms, negated and hypothetical claims, conflicting sources, updates, and deletions. Include exact-identifier and paraphrased questions, relationship questions, unanswerable questions, and long conversations.

Define corpus size, vector dimensions, update rate, simultaneous chats, hardware, region placement, and model configuration before recording results. Preserve the same relevance target when comparing systems.

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

- Disconnect and reconnect between snapshot and live subscription; expire retained events.
- Cancel while retrieval or generation completes; restart a gateway; fence an obsolete owner.
- Kill ingestion workers before/after commit; redeliver jobs; replay boundary events.
- Replace a document while extraction is still running; delete its evidence; correct an entity merge.
- Saturate ingestion CPU, model quota, and the database writer while maintaining chat load.
- Exercise long SQLite reads, checkpoint pressure, native-extension failures, and restored backups.

## Implementation sequence

1. Fix scope, artifact schemas, evidence contracts, and terminal-state semantics.
2. Build one document-to-chat vertical slice with lexical/vector retrieval and source citations.
3. Qualify the SQLite/vector adapter and select a durable workflow engine.
4. Add source-backed graph extraction, resolution, corrections, and selective expansion.
5. Add useful augmentation and optional retained multi-viewer output based on evaluated requirements.
6. Revisit deployment topology only when measurements justify additional boundaries.

## Documentation delivery gates

Run `npm ci` and `npm run build`; VitePress validates generated page links. Preview representative desktop/mobile routes, rendered Mermaid diagrams, search, navigation, color themes, and interactive architecture paths. CI builds the site on pushes and pull requests. Publish source and static output from the same commit, preserving the site's access policy.
