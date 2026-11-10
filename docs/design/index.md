---
title: System design
description: The architecture and boundaries that protect knowledge, identity and publication.
---

# Design around the evidence

**Rust owns durable state. Workers propose results. The interface exposes authorized views.** The research application is planned; these pages define its contracts.

## The system at a glance

```text
Sources → workers → draft proposals → review → published library
                                                   ↓
Browser ← streamed answer + citations ← authorized retrieval
```

A private Rust store owns transactions. The hosted API and compute workers are replaceable processes attached to that store. Local authoring may embed it. This is a small deployment with clear boundaries, not seven mandatory microservices.

## Read by responsibility

| Concern | Canonical document |
| --- | --- |
| Modules, process roles and state ownership | [System breakdown](../project/system.md) |
| Artifacts, identities, claims and portable packages | [Knowledge and identity](../project/knowledge.md) |
| Chat, evidence, cancellation and reconnect | [Streaming interface](../project/streaming.md) |
| Leases, capabilities, native workers and permissions | [Workers and jobs](../project/plugins.md) |
| Chosen directions and open alternatives | [Decision register](../project/decisions.md) |
| Observable requirements | [Acceptance register](../project/acceptance.md) |

## Two profiles, one set of rules

**Authoring:** import, extract, resolve, review and publish on an authorized workstation.

**Hosted demonstration:** serve an approved snapshot and separate conversation records. Do not independently edit the research graph in version one.

Export/import connects the profiles. It is not concurrent synchronization of a live database file.

## Non-negotiable boundaries

Names and vectors generate candidates; they do not authorize merges. Source confidence is separate from claim assessment. Publication is a reviewed transaction. Model output cannot grant access. Public export physically excludes private records and artifacts.

The [twelve-factor matrix](../engineering/twelve-factor.md) explains hosted process requirements and the local-appliance exception.

**Next:** [Read the system breakdown →](../project/system.md)
