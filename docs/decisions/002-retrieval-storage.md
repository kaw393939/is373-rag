---
title: "ADR 002 · Retrieval storage"
description: "An architecture decision record on evaluating SQLite for hybrid retrieval, including the workload, eligibility filters, and recovery tests that should drive selection."
teaser: "A single database can simplify deployment. The test is whether it still returns the right permitted passage while another document is being indexed."
---

# ADR 002 · Retrieval storage

*Architecture decision record · Storage selection under evaluation.*

The candidate is a local SQLite database that holds text, vectors, and relationships. The decision depends on a representative workload and on what happens to search when the index changes.

## Context

One reader searches by a case number. Another describes the same case in their own words. A third follows a relationship to a source. Compare BM25, vector similarity, and bounded graph retrieval on all three. Corpus size, update rate, and required concurrency still need to be specified.

## Candidate design

Co-locate SQLite retrieval with a Rust service. Use ordinary tables for source revisions, chunks, identities, claims, and provenance; FTS5 for BM25; an evaluated vector extension; and indexed relationships for bounded graph traversal.

Expose vector/search capabilities explicitly. Preserve canonical IDs and evidence contracts so a dedicated vector or search service can replace an adapter without changing answer policy.

## Alternatives

A dedicated service offers different indexing, filtering, replication, and scaling choices. A mixed deployment could keep canonical metadata in SQLite and move one measured bottleneck. Run the comparison at equivalent retrieval quality and permitted scope. Otherwise a faster result may simply reflect a different question.

## Consequences

Standard SQLite WAL has one writer per database and same-host sharing requirements. The deployment needs a local index-publication owner, short transactions, bounded database work, checkpoint policy, and an explicit backup/recovery design. Multiple hosts need evaluated ownership and replication behavior. Broker events are notifications, not file replication.

## Selection gates

Fill out one row per storage candidate before recording a selection. Unfilled entries are measurements to collect. The reference ranking comes from exact search over the passages each query is authorized to see.

| Workload and result field | Value for this run |
| --- | --- |
| Engine and extension versions, CPU, RAM and storage medium | Pending |
| Source documents, chunks, vector count and dimensions | Pending |
| Access scope and fraction of passages eligible per query | Pending |
| Reader concurrency and writes per second during measurement | Pending |
| Recall at chosen k against exact eligible results | Pending |
| Filtered p95 and p99 latency during those same writes | Pending |

Test filtered recall and latency, exact-versus-ANN behavior, simultaneous ingestion and chat, graph fanout, memory, crash recovery, extension migrations, and source-version consistency. Pin and validate the extension's native build and transactional behavior. See [hybrid retrieval](/architecture/retrieval).
