# Independent design reviews

These are original analyses applying published principles. Robert C. Martin, Erich Gamma, Richard Helm, Ralph Johnson, John Vlissides, and Graydon Hoare did not participate, review this repository, or endorse it. The reviews do not imitate their voices or invent their opinions.

## Three perspectives

| Lens | Primary question | Read the review |
| --- | --- | --- |
| Robert C. Martin's architecture principles | Do source dependencies protect application policies from infrastructure? | [Clean Architecture review](/reviews/clean-architecture) |
| Gang of Four design patterns | Which variation points and collaborations justify a pattern? | [Design patterns review](/reviews/design-patterns) |
| Rust design and Graydon Hoare's early work | Are ownership, failure, resource bounds, and native boundaries explicit? | [Rust design review](/reviews/rust-design) |

Rust began with Hoare's initial design and implementation and subsequently evolved through a large community. The Rust review separates historical primary material from modern Rust/Tokio behavior.

## Findings carried into the architecture

P1 means a design or implementation gate before depending on the affected behavior. P2 means a required refinement during the first vertical slice. These are priorities for a draft, not reports of deployed defects.

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
