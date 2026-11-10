# Build from Ordo, not from scratch

**Decision guide · reviewed November 10, 2026 · application implementation remains pending.**

The clean build should preserve Ordo's useful behavior while replacing the assumptions that would undermine a portable, evidence-backed research library. A new folder is not a reason to discard working ideas; an existing function is not proof that it is safe to transplant.

## The important discovery

There are two substantially different implementations in `StudioOrdo/ordo`. The current rebuild contains a small Rust realtime gateway and TypeScript contracts. An accessible historical commit contains the larger Rust/SQLite daemon: DAG validation, transactional job creation, task leases, durable event replay, graph candidates and promotion records. **Inspect both generations before implementing a replacement.** Exact commits, paths and inspection ranges are in the [source audit](source-audit.md).

| Subsystem | Best starting point | Action |
| --- | --- | --- |
| Durable jobs | Historical `kernel.rs`: DAG validation, compiled plan, idempotent creation, claims | Extract a narrow Rust module; strengthen lease fencing and failure tests |
| Durable events | Historical `events.rs`: transactional append and cursor replay | Adapt with authorization, retention and corruption handling |
| Knowledge review | Historical `knowledge_graph.rs`: candidates, evidence, promotion records | Preserve the lifecycle; redesign identity, claims and atomic publication |
| Worker contract | Current `lib/ordo/executor.ts` plus owner-only executor lab | Specify one versioned contract; do not copy inconsistent envelopes unchanged |
| Live interface | Current Rust gateway plus the streaming workshop | Keep adapter boundaries and batching; repair byte framing, termination and cancellation |
| UI projections | Current `lib/ordo/projection.ts` | Keep explicit schema, visibility and limitations; replace timestamp/count cursors |
| Media and import steps | Owner-only executor lab | Review specific executors for later extraction; no private source in this public site |
| Hosting | Existing server studio and application release lessons | Reuse operational tests; do not reinstall over an uninspected host |

## Read in this order

1. [Source audit](source-audit.md): what exists, what was inspected, and why it matters.
2. [Harvest plan](harvest-plan.md): how to turn those sources into small, maintainable modules.
3. [Twelve-factor design](../engineering/twelve-factor.md): operational boundaries and explicit exceptions.
4. [Executable examples](../engineering/examples.md): small, synthetic failure cases that clarify the contracts.
5. [Delivery roadmap](../project/roadmap.md): dependency-ordered slices and acceptance evidence.

## Keep, adapt, replace, defer

**Keep** means preserve a behavior and its tests after confirming dependencies and reuse rights. **Adapt** means retain the idea but change a boundary or invariant. **Replace** means the existing mechanism conflicts with this project's requirements. **Defer** means useful later, not required to prove the first workflow.

The priorities are not a wholesale rewrite of Ordo's business product. We do not import payments, CRM, growth accounting, public marketing shells, or broad autonomous command execution. The first useful result remains: import reports, resolve ambiguous mentions, review claims, publish a library, and answer with inspectable evidence.

## Evidence levels

This audit is a scoped static inspection, not a production security assessment or a claim that all donor tests passed. A source file containing a test is different from a test executed in this project. The new documentation examples exercise selected invariants; they are not the application runtime. [Status](../status.md) and actual CI runs distinguish those claims.

Private donor paths are owner-only references. Public CI must work without private repositories, provider credentials or the owner's research data. No license change, private-code publication, DNS cutover or server deployment is authorized by this audit.
