---
title: Capabilities
description: The proposed research workflow and the limits of its first release.
---

# What the system is designed to do

**These are target capabilities, not implemented features.** Current deliverables are on the [status page](../status.md).

| Capability | What you would do | Design contract |
| --- | --- | --- |
| Acquire evidence | Import supported material; preserve its bytes, origin and processing history | [Knowledge records](../project/knowledge.md) |
| Resolve identities | Review aliases and possible matches without name-only merges | [Identity rules](../project/knowledge.md#resolution-is-not-name-deduplication) |
| Maintain claims | Keep qualified statements, supporting evidence and contradictions | [Confidence and disagreement](../project/knowledge.md#confidence-and-disagreement) |
| Publish deliberately | Approve an exact proposal and produce a traceable revision | [Atomic publication](../project/knowledge.md#atomic-publication) |
| Ask with evidence | Combine available lexical, vector and graph retrieval; stream a cited answer | [Research interface](../project/streaming.md) |
| Observe work | Inspect progress, missing capabilities, retries and review requests | [Durable jobs](../project/plugins.md#durable-task-state) |
| Move the library | Export a verified package and reopen it without the original machine | [Portable package](../project/knowledge.md#portable-package) |
| Extend processing | Add compatible Rust or Swift workers for models, audio or media | [Worker contracts](../project/plugins.md) |

## Four useful distinctions

**A mention is not an entity.** A name in a report needs contextual resolution.

**A copy is not an independent confirmation.** Repeated copies of one account do not become separate witnesses.

**A draft is not published knowledge.** Public retrieval uses an approved revision; draft access is explicit.

**A disconnected stream is not a finished answer.** Completion, refusal, cancellation and interruption remain distinct outcomes.

## First release versus later

The first complete release targets a small text/structured-data collection, reviewed publication, evidence-backed retrieval, streaming chat and portable export. Deterministic fixtures make contracts testable before real model adapters are enabled.

Native video, broader connectors and multi-machine authoring reconciliation come later. A plugin interface does not mean every backend exists or produces equivalent results.

**Next:** [Walk through one research case →](walkthrough.md)
