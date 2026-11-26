---
title: "Decisions and open questions"
description: "Which Ordo decisions are settled, which alternatives were considered, and what evidence would justify choosing an implementation?"
teaser: "The direction to keep state in Rust is settled. The choice of a storage package still needs tests. This register makes the difference visible."
---

# Decisions and open questions

Use the **status** column before treating any row as an implementation instruction. For example, the team can design a worker interface around Rust-owned state. Committing to a particular portable package requires the transaction and export checks attached to that choice.

The project owner selected the directions marked confirmed. Detailed implementation choices remain proposed until the corresponding review gates pass. Earlier ADRs remain reference material.

| ID | Decision | Status / consequence |
| --- | --- | --- |
| D-01 | Current work is documentation and synthetic contract examples only | Confirmed scope; no runtime deployment or DNS changes |
| D-02 | Rust owns state and coordination | Confirmed direction; use established libraries rather than rewrite codecs/databases |
| D-03 | SQLite plus immutable objects form the portable library | Proposed; package, transaction and export tests required |
| D-04 | Workers use language-neutral process contracts | Confirmed direction; native acceleration is optional |
| D-05 | Review HTTP/JSON envelopes before choosing Protobuf | Proposed; capability semantics matter more than transport branding |
| D-06 | SvelteKit/TypeScript client; Rust Axum/Tokio service | Proposed; VitePress remains documentation-only |
| D-07 | Transactional local jobs/events before a broker | Proposed revision; historical Rust kernel is the extraction starting point |
| D-08 | HTTPS commands and SSE for chat/progress | Proposed; explicit terminal outcomes and authorized replay |
| D-09 | Local authoring publishes immutable cloud revisions | Proposed; no two-writer library synchronization in v1 |
| D-10 | Ambiguous identity stays unresolved | Confirmed quality direction; no name-only or vector-only merge |
| D-11 | `is373-rag` is the planning/build home | Working repository choice; donor repositories stay unchanged |
| D-12 | Portfolio, docs and application hosting are separate | Confirmed direction; actual domain cutover is a separate operation |
| D-13 | Harvest pinned historical and current Ordo behavior, not whole products | User-requested reuse direction; rights/dependency tests gate each import |
| D-14 | Hosted API/workers are replaceable; a private Rust store owns durability | Proposed twelve-factor boundary; local embedded store is an explicit exception |
| D-15 | Immutable release promotion, typed config and explicit model mode | Required operational direction; verify each TF gate before a compliance claim |
| D-16 | Candidate identity, canonical identity and byte integrity are different | Required data invariant; replace metadata-derived content hashes and label-keyed identity policy |

## Reconciled alternatives

The earlier architecture proposes NATS/JetStream. The revised first slice uses the recovered SQLite job/event kernel, after repair, rather than introducing a broker to mimic a larger deployment. A broker remains an option when measured multi-host needs justify it.

The current rebuild's JSON event store is not the selected durability adapter. Historical Rust transactions provide a better starting point. Current projection and executor types remain useful contract references even where their persistence and hashing mechanisms are replaced.

The workshop's React/Python/PostgreSQL application is a behavior/test donor, not the target stack. The historical graph is a review-lifecycle donor, not a complete canonical identity or scientific-confidence model. [Source-specific rationale](../reuse/source-audit.md).

## Decisions still required before implementation

For a review, state the decision in one sentence, name the alternative, and identify an observation that would change the choice. A portable export that loses the source of a claim would reopen a storage decision even if the package copies quickly.

At S0 choose the runtime toolchain, initial corpus/media budget, authentication approach and exact wire/schema versioning policy. At S4 choose an embedding model and evaluation set; lexical baseline work need not wait for an unselected model. At S6 choose format migration/retention policy and native worker authentication/isolation. At S7 select hosting capacity and model egress policy from verified inventory and measurements.

The public application cannot depend silently on a sleeping Mac. Missing model capability is a reported state. Hardware backend substitution must preserve contract and provenance, not imply bit-identical output or compatible vectors without verification.

Domain naming, paid infrastructure and distributed execution do not block the documentation labs. Record accepted decisions with rationale, rejected alternatives, issue and evidence. Supersede prior choices explicitly; do not erase their history.
