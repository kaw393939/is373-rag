# Decision register

The draft separates requirements, recommended technology, and decisions that still need workload evidence. An architecture recommendation is not a measured performance result.

| ID | Decision | Draft status | Evidence needed |
| --- | --- | --- | --- |
| [001](/decisions/001-serving-boundaries) | SvelteKit UI, Rust chat, direct SSE | Proposed baseline | Browser workload, service latency, recovery prototype |
| [002](/decisions/002-retrieval-storage) | SQLite unified retrieval candidate | Under evaluation | Filter correctness, ANN recall, concurrent ingestion, topology |
| [003](/decisions/003-workflow-ownership) | One durable ingestion progression owner | Design constraint; engine open | Dagster/Temporal recovery and operational comparison |
| Pending | Output replay and displayed-text durability | Open | Required retention, latency, and crash behavior |
| Pending | Model and inference hosting | Open | Answer quality, first-token latency, concurrency and capacity |
| Pending | Corpus and isolation model | Open | Formats, languages, access scope, update rate, size |

## Recording a decision

Document the concrete problem, alternatives, selected behavior, consequences, and validation required. Supersede a decision explicitly when it changes; retain the reason for the change. Avoid freezing an extension, provider, or service split before its capabilities and failure semantics are known.

The [review findings](/reviews/) are constraints for implementation. They do not imply that the future system already passes those checks.
