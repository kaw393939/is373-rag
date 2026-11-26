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
| P1 | Ambiguous run ownership permits stale completion | One owner, attempt fencing, ordered terminal transitions | Race and failure tests |
| P1 | Generic search adapters can hide changed semantics | Capability and evidence contracts | Exact/ANN and filtered conformance tests |
| P1 | Generated claims can lose evidence and uncertainty | Source spans, revision, qualifiers, derived-view separation | Grounding and correction evaluation |
| P1 | Competing workflow schedulers create inconsistent retries | One progression owner; broker role explicit | Recovery prototype |
| P1 | Blocking and unbounded work can stall chat | Bounded database/CPU workers, admission and buffer limits | Concurrent-load measurements |
| P1 | Native extensions introduce an FFI trust boundary | Pin builds, validate compatibility, test recovery | Extension qualification |
| P2 | Displayed text durability is unspecified | Explicit policy decision in stream contract | Crash/latency comparison |
| P2 | Abstractions and services may outgrow actual variation | Focused ports; deployment split justified by measurements | First vertical slice review |

The main drafts include the recommended constraints. Their implementation remains future work. Read [contracts](/architecture/contracts) for protocol obligations and [validation](/validation) for the verification plan.
