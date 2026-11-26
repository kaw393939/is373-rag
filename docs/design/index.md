---
title: "Design around the evidence"
description: "Choose the right Ordo design contract for source identity, review, publication, or streaming, and understand what a hosted demonstration is allowed to change."
teaser: "Follow one proposed claim from a worker to a reader. The interesting handoff is the moment it becomes eligible for publication."
---

# Design around the evidence

In the proposed application, a worker might find two people with similar names and suggest a match. The store records the proposal. An authorized decision determines what enters a published library. The interface lets a reader inspect only the material they are permitted to see.

Use this guide to find the contract for the step you own. The research application is planned. The documentation and teaching examples are available now.

## The system at a glance

```text
Sources → workers → draft proposals → review → published library
                                                   ↓
Browser ← streamed answer + citations ← authorized retrieval
```

The private Rust store owns durable transactions. A hosted API or compute worker can be replaced while the store retains the record. A local authoring workstation may embed the same store. Start with those responsibilities, then decide how many processes the deployment needs.

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

A name or vector match can put two records on a reviewer's desk. A merge needs a recorded decision. Keep source reliability separate from the assessment of an individual claim. Publish in a reviewed transaction, enforce access outside the model, and construct public exports using only the approved records and artifacts.

The [twelve-factor matrix](../engineering/twelve-factor.md) explains hosted process requirements and the local-appliance exception.

**Next:** [Read the system breakdown →](../project/system.md)
