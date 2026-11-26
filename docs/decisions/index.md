---
title: "Decision register"
description: "Read the proposed serving, storage, and workflow decisions, then see the evidence that would justify adopting, revisiting, or rejecting each one."
teaser: "Read the status column before the technology column. A promising database, an adopted design rule, and an unanswered product question call for different next steps."
---

# Decision register

This register records an earlier architecture draft. Use it to see how a decision was framed, which alternatives were considered, and what evidence was still missing. A proposed baseline gives the team somewhere to start testing. An adopted design constraint determines what every candidate must preserve.

| ID | Decision | Where this stands now | Evidence needed |
| --- | --- | --- | --- |
| [001](/decisions/001-serving-boundaries) | SvelteKit UI, Rust chat, direct SSE | Proposed serving baseline. The [deployment profiles](/project/system#two-deployment-profiles) define the current hosted API and local storage boundaries. | First grounded text, cancellation and recovery on identical events |
| [002](/decisions/002-retrieval-storage) | SQLite retrieval indexes | Storage engine selection remains open. The [retrieval evaluation](/architecture/retrieval#selection-gates) defines the comparison. | Eligible recall and latency under concurrent ingestion |
| [003](/decisions/003-workflow-ownership) | One owner advances each ingestion workflow | Single ownership is a design constraint. The [delivery roadmap](/project/roadmap) puts the durable kernel first. The engine remains open. | Repeated recovery trace against both engines |
| Q-Replay | Replay and displayed-text durability | Open in the [stream contract](/architecture/contracts#durability-policy-to-decide). | Retention, crash recovery and latency |
| Q-Model | Inference hosting | Open pending the [representative workload](/validation#representative-workload). | Answer quality, first-token latency and capacity |
| Q-Corpus | Corpus and isolation model | Open pending the [workload definition](/validation#representative-workload). | Formats, languages, access scope, update rate and size |

## Recording a decision

Write down the concrete problem, the alternatives, the chosen behavior, the cost of the choice, and the evidence still needed. Name a result that could change your mind. If a later test changes the decision, publish a replacement record and link back to the reason the earlier choice was made.

The [review findings](/reviews/) are constraints for implementation. They do not imply that the future system already passes those checks.
