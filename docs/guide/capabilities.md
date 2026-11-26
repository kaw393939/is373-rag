---
title: "Capabilities"
description: "See what the proposed Ordo system would do, which checks would establish each capability, and where to find the contracts that define it."
teaser: "Open a citation, correct an identity, or move a library to another machine. Each proposed capability needs a check a reader can repeat."
---

# What the system is designed to do

Pick a row and read it as a request from a user. What would that person need to see before accepting the feature? The table describes the proposed system. The [status page](../status.md) lists the deliverables you can try today.

| Capability | What you would do | Design contract |
| --- | --- | --- |
| Acquire evidence | Import supported material; preserve its bytes, origin and processing history | [Knowledge records](../project/knowledge.md) |
| Resolve identities | Review aliases and possible matches without name-only merges | [Identity rules](../project/knowledge.md#resolution-is-not-name-deduplication) |
| Maintain claims | Keep qualified statements, supporting evidence and contradictions | [Confidence and disagreement](../project/knowledge.md#confidence-and-disagreement) |
| Publish deliberately | Approve a draft, then change one word. Publication should reject the changed draft and leave the prior revision intact | [Atomic publication](../project/knowledge.md#atomic-publication) |
| Ask with evidence | Combine available lexical, vector and graph retrieval; stream a cited answer | [Research interface](../project/streaming.md) |
| Observe work | Inspect progress, missing capabilities, retries and review requests | [Durable jobs](../project/plugins.md#durable-task-state) |
| Move the library | Export a verified package and reopen it without the original machine | [Portable package](../project/knowledge.md#portable-package) |
| Extend processing | Add compatible Rust or Swift workers for models, audio or media | [Worker contracts](../project/plugins.md) |

## Four useful distinctions

| When you see… | Ask this before accepting the result |
| --- | --- |
| A name in two documents | What connects those mentions to the same person? Keep them separate if the evidence is thin. |
| Several sources saying the same thing | Did the authors observe it independently, or did they quote each other? |
| An approved statement | Which version was reviewed? Can a reader find the passage that supported it at that time? |
| An answer that stops halfway through | Did the model finish, did the reader cancel, or did the connection drop? The interface should show which occurred. |

## First release versus later

The first complete release targets a small text/structured-data collection, reviewed publication, evidence-backed retrieval, streaming chat and portable export. Deterministic fixtures make contracts testable before real model adapters are enabled.

Native video, broader connectors and multi-machine authoring reconciliation come later. A plugin interface does not mean every backend exists or produces equivalent results.

**Next:** [Walk through one research case →](walkthrough.md)
