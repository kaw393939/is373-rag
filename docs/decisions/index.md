---
title: "Decision register"
description: "Read the proposed serving, storage, and workflow decisions, then see the evidence that would justify adopting, revisiting, or rejecting each one."
teaser: "Read the status column before the technology column. A promising database, an adopted design rule, and an unanswered product question call for different next steps."
---

# Decision register

This register records an earlier architecture draft. Use it to see how a decision was framed, which alternatives were considered, and what evidence was still missing. A proposed baseline gives the team somewhere to start testing. An adopted design constraint determines what every candidate must preserve.

| ID | Decision | Draft status | Evidence needed |
| --- | --- | --- | --- |
| [001](/decisions/001-serving-boundaries) | SvelteKit UI, Rust chat, direct SSE | Proposed baseline | Browser workload, service latency, recovery prototype |
| [002](/decisions/002-retrieval-storage) | SQLite unified retrieval candidate | Under evaluation | Filter correctness, ANN recall, concurrent ingestion, topology |
| [003](/decisions/003-workflow-ownership) | One durable ingestion progression owner | Design constraint; engine open | Dagster/Temporal recovery and operational comparison |
| Pending | Output replay and displayed-text durability | Open | Required retention, latency, and crash behavior |
| Pending | Model and inference hosting | Open | Answer quality, first-token latency, concurrency and capacity |
| Pending | Corpus and isolation model | Open | Formats, languages, access scope, update rate, size |

## Recording a decision

Write down the concrete problem, the alternatives, the chosen behavior, the cost of the choice, and the evidence still needed. Name a result that could change your mind. If a later test changes the decision, publish a replacement record and link back to the reason the earlier choice was made.

The [review findings](/reviews/) are constraints for implementation. They do not imply that the future system already passes those checks.
