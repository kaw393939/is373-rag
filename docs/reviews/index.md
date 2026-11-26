---
title: "Independent design reviews"
description: "Compare three independent reviews of the proposed Ordo architecture and trace their recommendations to practical checks for streaming, storage, and review."
teaser: "One design diagram can hide three different questions. Who owns a rule? Which parts genuinely vary? What happens when a worker disappears?"
---

# Independent design reviews

Start with the failure you want to examine, then choose the review below. Clean Architecture asks where a rule belongs. Design patterns ask what can vary without changing that rule. The Rust review asks who owns work and how a stale result is prevented from taking effect.

These are the project’s independent readings of published ideas. Robert C. Martin, Erich Gamma, Richard Helm, Ralph Johnson, John Vlissides, and Graydon Hoare did not take part in or endorse these reviews.

## Three perspectives

| Lens | Primary question | Read the review |
| --- | --- | --- |
| Robert C. Martin's architecture principles | Do source dependencies protect application policies from infrastructure? | [Clean Architecture review](/reviews/clean-architecture) |
| Gang of Four design patterns | Which variation points and collaborations justify a pattern? | [Design patterns review](/reviews/design-patterns) |
| Rust design and Graydon Hoare's early work | Are ownership, failure, resource bounds, and native boundaries explicit? | [Rust design review](/reviews/rust-design) |

Rust began with Hoare's initial design and implementation and subsequently evolved through a large community. The Rust review separates historical primary material from modern Rust/Tokio behavior.

## Findings carried into the architecture

A **P1** finding is a design or implementation question to resolve before relying on the affected behavior. A **P2** finding is a refinement due in the first vertical slice. Use those priorities to plan tests. They describe open questions in a draft design. No deployed defect was observed.

| Priority | Finding | Draft response | Remaining proof |
| --- | --- | --- | --- |
| P1 | Ambiguous run ownership permits stale completion | One owner, attempt fencing, ordered terminal transitions | The [lease exercise](/engineering/examples#lease-ownership) checks one receipt in one process. The remaining test races two independent clients against the same store and inspects the accepted completion. |
| P1 | Generic search adapters can hide changed semantics | Capability and evidence contracts | Run the [restricted top-three comparison](/architecture/retrieval#vector-capability-decision) on each adapter and record which eligible passage it returns. |
| P1 | Generated claims can lose evidence and uncertainty | Source spans, revision, qualifiers, derived-view separation | Use the [name-correction case](/architecture/ingestion#readiness-and-corrections). Inspect which claims and citations change after a source edit and after a reviewer changes a link. |
| P1 | Competing workflow schedulers create inconsistent retries | One progression owner; broker role explicit | Run the [interrupted publication](/decisions/003-workflow-ownership#validation) on each engine. Check which revision is searchable after restart. |
| P1 | Blocking and unbounded work can stall chat | Bounded database/CPU workers, admission and buffer limits | Apply the [load plan](/validation#measurements). Measure reader delay and buffer growth during ingestion with a stalled subscriber. |
| P1 | Native extensions introduce an FFI trust boundary | Pin builds, validate compatibility, test recovery | Use the [storage selection gates](/decisions/002-retrieval-storage#selection-gates). Test a pinned extension under concurrent ingestion and record what happens after a crash. |
| P2 | Displayed text durability is unspecified | Explicit policy decision in stream contract | The [stream fixture](/engineering/examples#stream-framing) checks framing. Terminate a real server after text appears and compare the recovered snapshot with what the reader saw. |
| P2 | Abstractions and services may outgrow actual variation | Focused ports; deployment split justified by measurements | Use the [serving comparison](/decisions/001-serving-boundaries#validation) to measure the change in grounded-text latency and inspect cancellation across both routes. |

The main drafts include the recommended constraints. Their implementation remains future work. Read [contracts](/architecture/contracts) for protocol obligations and [validation](/validation) for the verification plan.
