---
title: "Build from Ordo, not from scratch"
description: "Compare two generations of Ordo and decide which durable job, review, event and streaming behaviors are worth carrying into the proposed Knowledge Lab."
teaser: "A newer repository snapshot has a smaller gateway. An older one contains durable jobs and replay. The right starting point depends on which behavior you need."
---

# Build from Ordo, not from scratch

Suppose the next slice must recover a queued task after restart. The current gateway at first glance looks like the natural starting point. The earlier daemon contains the durable kernel worth inspecting. Choosing between the two revisions is a question about behavior, contracts and proof.

**Decision guide.** Application implementation remains pending.

The clean build should preserve Ordo's useful behavior while replacing the assumptions that would undermine a portable, evidence-backed research library. A new folder is not a reason to discard working ideas; an existing function is not proof that it is safe to transplant.

## The important discovery

There are two substantially different implementations in `StudioOrdo/ordo`. The current rebuild contains a small Rust realtime gateway and TypeScript contracts. An accessible historical commit contains the larger Rust/SQLite daemon: DAG validation, transactional job creation, task leases, durable event replay, graph candidates and promotion records. **Inspect both generations before implementing a replacement.** Exact commits, paths and inspection ranges are in the [source audit](source-audit.md).

| Behavior | Donor or reference | Decision |
| --- | --- | --- |
| Validate plans, create jobs idempotently and claim tasks | [H-01, historical kernel](source-audit.md#h-01) | **Adapt** the claim so completion checks the lease epoch and deadline. |
| Retain job event names and meanings | [H-02, event log](source-audit.md#h-02) and [C-02, event storage](source-audit.md#c-02) | **Keep** vocabulary that still describes the same state change. |
| Append events and replay from a cursor | [H-02, transactional events](source-audit.md#h-02) | **Adapt** replay for viewer authorization, expiry and malformed records. |
| Persist events on disk | [C-02, prototype file store](source-audit.md#c-02) | **Replace** the process-local file adapter with the transaction-owned store. |
| Review graph candidates and promote claims | [H-03, graph review](source-audit.md#h-03) | **Adapt** identity and publication while preserving evidence and review history. |
| Describe worker outputs and UI projections | [C-03, envelopes and projections](source-audit.md#c-03) and [E-01, executor](source-audit.md#e-01) | **Keep** explicit limitations. **Replace** metadata-derived artifact hashes and timestamp/count cursors. |
| Read and deliver a live answer | [C-01, Rust gateway](source-audit.md#c-01) and [W-01, stream consumer](source-audit.md#w-01) | **Adapt** batching and incremental decoding. Test termination and cancellation through the actual transport. |
| Import media and run additional executors | [E-01, owner-only review](source-audit.md#e-01) | **Defer** extraction until each capability has a scoped review. |
| Release and recover the service | [Hosting plan](../project/hosting.md) and [release checks](../engineering/clean-build.md) | **Defer** changes to the host until the release and restore checks can be run. |

## Read in this order

1. [Source audit](source-audit.md): what exists, what was inspected, and why it matters.
2. [Harvest plan](harvest-plan.md): how to turn those sources into small, maintainable modules.
3. [Twelve-factor design](../engineering/twelve-factor.md): operational boundaries and explicit exceptions.
4. [Executable examples](../engineering/examples.md): small, synthetic failure cases that clarify the contracts.
5. [Delivery roadmap](../project/roadmap.md): dependency-ordered slices and acceptance evidence.

## Keep, adapt, replace, defer

Make the decision for one behavior at a time. Reusing how a donor claims a job can be sensible while replacing how it stores events. Record the part to keep, the changed assumption and the test that would demonstrate the behavior in the new application.

**Keep** means preserve a behavior and its tests after confirming dependencies and reuse rights. **Adapt** means retain the idea but change a boundary or invariant. **Replace** means the existing mechanism conflicts with this project's requirements. **Defer** means useful later, not required to prove the first workflow.

The priorities are not a wholesale rewrite of Ordo's business product. We do not import payments, CRM, growth accounting, public marketing shells, or broad autonomous command execution. The first useful result remains: import reports, resolve ambiguous mentions, review claims, publish a library, and answer with inspectable evidence.

## Evidence levels

This audit is a scoped static inspection, not a production security assessment or a claim that all donor tests passed. A source file containing a test is different from a test executed in this project. The new documentation examples exercise selected invariants; they are not the application runtime. [Status](../status.md) and actual CI runs distinguish those claims.

Private donor paths are owner-only references. Public CI must work without private repositories, provider credentials or the owner's research data. No license change, private-code publication, DNS cutover or server deployment is authorized by this audit.
