# Decisions and open questions

Current planning baseline: November 10, 2026. Confirmed direction comes from the project brief; implementation choices below remain proposed until review. Earlier ADRs and research are retained.

| ID | Decision | Status / consequence |
| --- | --- | --- |
| D-01 | This site and current repository work are documentation only | Confirmed scope; no app services or DNS changes |
| D-02 | Rust owns state and orchestration | Confirmed direction; reuse proven libraries rather than rewrite them |
| D-03 | SQLite + immutable artifacts form the library | Proposed; package compatibility and export tests required |
| D-04 | Separate worker processes use language-neutral contracts | Confirmed direction; protocol details still open |
| D-05 | Review existing HTTP/JSON envelopes before choosing Protobuf | Proposed; do not conflate transport with capability semantics |
| D-06 | SvelteKit/TypeScript frontend; Axum/Tokio backend | Proposed, consistent with earlier RAG design; VitePress remains docs-only |
| D-07 | Local transactional jobs/events before NATS/JetStream | Proposed revision of earlier architecture; broker deferred, not prohibited |
| D-08 | HTTPS commands + SSE for initial chat and progress | Proposed; separate durable replay from transient updates |
| D-09 | Local authoring publishes immutable cloud snapshots | Proposed; no two-writer synchronization in v1 |
| D-10 | Uncertain identity is unresolved, not an automatic merge | Confirmed quality direction; calibration/evaluation still required |
| D-11 | Reuse `is373-rag` as the dedicated planning repository | Working repository choice; preserve related repositories unchanged |
| D-12 | Keep portfolio, documentation and application hosting distinct | Confirmed scope; actual domain choice and cutover remain separate |

## Differences from earlier pages

The earlier architecture uses NATS/JetStream in its proposed execution model. For the first local-first slice, this plan instead proposes durable SQLite jobs and an event ledger. Earlier review pages remain useful critique, not proof that the revised design passed those reviews.

The existing chat workshop is a protocol/test reference, not a decision to adopt its React/Python/PostgreSQL stack. Existing private executor code must undergo a license, secret and test review before reuse in a public example.

## Questions that block implementation decisions

Specify corpus size/media mix and measured resource budgets. Choose the initial embedding model and compatible query path. Define the portable format version/migration policy and the confidence-calibration dataset. Decide session/authentication and draft visibility boundaries. Review worker authentication, path permissions and stale-lease fencing. Select a hosted generation policy that does not silently rely on a sleeping laptop.

## Questions that do not block writing the docs

Final brand/domain, paid hosting capacity, video acceleration backend and a distributed broker. Keep them visible, but do not invent account facts or defer the small fixture example until every future feature is decided.

Each future accepted decision should link its issue, rationale, rejected alternative and evidence. Supersede decisions explicitly rather than deleting the history.
