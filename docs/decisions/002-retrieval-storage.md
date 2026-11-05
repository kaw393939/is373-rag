# ADR 002 · Retrieval storage

**Status:** Under evaluation. **Date:** November 5, 2026.

## Context

The system needs BM25, vector similarity, and relationship-guided evidence retrieval over a changing corpus. The desired scale and write rate are not yet specified.

## Candidate design

Co-locate SQLite retrieval with a Rust service. Use ordinary tables for source revisions, chunks, identities, claims, and provenance; FTS5 for BM25; an evaluated vector extension; and indexed relationships for bounded graph traversal.

Expose vector/search capabilities explicitly. Preserve canonical IDs and evidence contracts so a dedicated vector or search service can replace an adapter without changing answer policy.

## Alternatives

A dedicated retrieval service can provide a different scaling, indexing, filtering, and replication model. A mixed deployment may retain SQLite metadata while externalizing a measured bottleneck. Compare at equivalent retrieval quality and access scope; local storage alone does not establish superiority.

## Consequences

Standard SQLite WAL has one writer per database and same-host sharing requirements. The deployment needs a local index-publication owner, short transactions, bounded database work, checkpoint policy, and an explicit backup/recovery design. Multiple hosts need evaluated ownership and replication behavior. Broker events are notifications, not file replication.

## Selection gates

Test filtered recall and latency, exact-versus-ANN behavior, simultaneous ingestion and chat, graph fanout, memory, crash recovery, extension migrations, and source-version consistency. Pin and validate the extension's native build and transactional behavior. See [hybrid retrieval](/architecture/retrieval).
