---
title: Glossary
description: "Translate Ordo terminology into plain language and see how an artifact, a claim, a lease and a published revision fit together."
teaser: "A file, a statement in that file and a decision to publish that statement are three different records. The vocabulary below lets a team discuss each one precisely."
---

# Shared vocabulary

Read down the table as you encounter an unfamiliar term. For example, an *artifact* is the acquired material; a *mention* points to a location in it. If a worker proposes that two mentions refer to the same person, the proposal still needs the review appropriate to its use.

| Term | Meaning here |
| --- | --- |
| Artifact | Immutable source or derived bytes, identified by a cryptographic digest. |
| Acquisition | Where, when and how material was obtained. |
| Mention | A specific name or reference at an exact source location. |
| Entity | A stable identity such as a person, place or incident. |
| Alias | A context-dependent name; not globally unique. |
| Claim | A qualified proposition, including relevant time, polarity or modality. |
| Assertion | What a particular source says about a claim. |
| Provenance | The trail from source through processing and review to published knowledge. |
| Resolution | A reviewable decision connecting mentions to identities. |
| Draft / proposal | Candidate changes not yet published. |
| Revision | An identified published state retained for reproducible evidence references. |
| Graph | Typed relationships between identities, claims and evidence. |
| Embedding space | Vector representation defined by a model and preprocessing contract. |
| Hybrid retrieval | Combining available lexical search, vector candidates and graph relationships. |
| RAG | Retrieval-augmented generation: providing selected evidence to a model before it answers. |
| NER | Named-entity recognition: identifying mentions, not proving canonical identity. |
| DAG | A task dependency graph with no cycles. |
| Lease | A time-bounded assignment authorizing a worker attempt. |
| Fencing epoch | An attempt identity that lets the store reject an older result. |
| Idempotency | Repeating an accepted request does not repeat its durable effect. |
| Capability | A versioned operation, independent of its implementation. |
| SSE | Server-sent event framing for incremental browser delivery. |
| Projection | An authorized, rebuildable view of durable records. |
| Release | A tested software artifact plus approved configuration and compatibility information. |

The [knowledge rules](../project/knowledge.md) and [worker contract](../project/plugins.md) define the invariants behind these terms.

Try the same distinction on a job that returns twice. Its lease says which worker may act now, the fencing epoch identifies the attempt, and idempotency lets the store accept a repeated delivery without repeating its effect.
