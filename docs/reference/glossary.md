---
title: Glossary
description: "Translate Ordo terminology into plain language and see how an artifact, a claim, a lease and a published revision fit together."
teaser: "A file, a statement in that file and a decision to publish that statement are three different records. The vocabulary below lets a team discuss each one precisely."
---

# Shared vocabulary

Look up the word at the point where you have to make a decision. Which words came from the source? Which passage can a reader find? Which worker still owns the job?

## Evidence and review

| Term | Meaning here |
| --- | --- |
| Artifact | Immutable source or derived bytes with a cryptographic digest. |
| Acquisition | Where, when and how someone obtained the material. |
| Mention | A name or reference at a precise source location. |
| Entity and alias | An entity is a stable identity. An alias is a name it uses in a particular context. |
| Resolution | A reviewable decision about which identity a mention refers to. It can remain unresolved. |
| Claim and assertion | A claim is a proposition with its qualifications. An assertion records what a particular source says about it. |
| Provenance | The trail from source through processing and review to publication. |
| Draft or proposal | A candidate change waiting for review or publication. |
| Revision | A published state retained so a reader can reopen the evidence cited at that point. |
| Graph | A record of typed relationships among identities, claims and evidence. |
| Augmentation | Generated context linked to, and kept distinguishable from, original evidence. |
| NER | Named-entity recognition identifies mentions in a passage. Identity resolution is a separate decision. |

## Retrieval and delivery

| Term | Meaning here |
| --- | --- |
| Embedding space | A vector representation defined by a model and its preprocessing rules. |
| BM25 | A lexical ranking method available through SQLite FTS5. |
| ANN | Approximate nearest-neighbor search. Compare it with an exact reference to measure recall. |
| RRF | Reciprocal rank fusion combines positions in different ranked result lists. |
| Hybrid retrieval | Combining available lexical, vector or graph results. |
| RAG | Retrieval-augmented generation supplies selected evidence to a model before it answers. |
| SSE | Server-sent events deliver incremental updates from a server to a browser. |
| Projection | An authorized view that can be rebuilt from durable records. |

## Jobs and releases

Suppose the same worker name receives an extraction job twice. Attempt 1’s lease expires. Attempt 2 has a new epoch and returns on time. The store checks the epoch and accepts the eligible result once, even if the worker resends it. Try the [lease exercise](../engineering/examples.md#lease-ownership).

| Term | Meaning here |
| --- | --- |
| DAG | A directed acyclic graph of task dependencies. |
| Lease | A time-limited assignment of one task to a worker attempt. |
| Fencing epoch | An attempt identifier that allows the store to reject an older worker’s result. |
| Idempotency | Repeating an accepted request leaves its durable effect unchanged. |
| Outbox | A record committed with a change so a corresponding event can be delivered reliably. |
| Capability | A versioned operation a worker implements. |
| Release | A tested software artifact with approved configuration and compatibility information. |

The [knowledge rules](../project/knowledge.md) and [worker contract](../project/plugins.md) state the proposed system invariants.
