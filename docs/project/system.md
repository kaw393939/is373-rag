# System breakdown

**Proposed application architecture.** The documentation site and synthetic contract labs exist; the runtime below does not yet exist in this repository. The [reuse map](../reuse/index.md) identifies the implementation starting points.

## Seven modules, a small number of process roles

| Module | Owns | Starting point |
| --- | --- | --- |
| Research interface | Chat, evidence, library, jobs and review | SvelteKit/TypeScript; workshop protocol behavior |
| API | Authenticated commands, sessions, HTTP/SSE delivery | Rust/Axum/Tokio; current Ordo adapter boundaries |
| Retrieval | Lexical/vector candidates, authorized graph expansion and citation packets | Rust adapters; explicit evaluation before semantic claims |
| Knowledge library | Sources, identities, claims, review and revisions | Rust/SQLite; historical graph lifecycle, redesigned invariants |
| Ingestion | Parsing, extraction and identity proposals | Bounded capability workers; reviewed executor steps |
| Workflow engine | Plans, tasks, leases, idempotency and replay | Historical Rust kernel/event log with identified repairs |
| Capability workers | Models, speech, OCR, media and native acceleration | Rust/Swift processes with versioned contracts |

## Hosted process boundary

```text
Browser: Chat / Evidence / Library / Jobs / Review
                         |
          Stateless Rust API + built web assets
                         |
       Private Rust store / command + event boundary
               |                         |
       Durable operational DB    Published library + objects
               |
       Leased bounded workers → validated results
```

The private store owns transactions; it does not expose arbitrary SQL. The API and workers access it through authenticated, scoped commands. Their local caches and temporary buffers are not the only copy of accepted state. This is a small same-codebase deployment, not a mandate for seven microservices.

The store is a stateful backing resource. It is not horizontally replicated by starting more SQLite writers on shared network storage. Scale bounded compute workers first; measure contention and memory before redesigning storage. [Twelve-factor decisions](../engineering/twelve-factor.md) document the hosted boundary and local exception.

## One authority per kind of state

Only the Rust store can commit canonical changes. A worker returns a result envelope and artifacts; permission-bearing identity, library scope and review decisions come from the server, not model text or browser context. The UI renders authorized projections.

Within a writable library, publication records and publication events share one transaction. Within operational state, run admission and its events share one transaction. No atomic transaction is assumed across independent databases: a run references an already published immutable library revision, which is retained while citations depend on it.

Task execution is at least once. Result acceptance is idempotent and lease-fenced. External providers and side effects are not automatically exactly once. Retry policy distinguishes safe deterministic work from paid generation that has already produced output.

## Two deployment profiles

**Local authoring:** a Mac or Linux workstation owns source imports, drafts and review. It may embed the store in one process for convenience. This is an explicit stateful appliance profile, not strict stateless hosting. The same domain and schema contracts apply.

**Hosted demonstration:** a private store serves an approved research snapshot and separate operational conversation/job records. It does not independently author the canonical research graph in v1. Public chat cannot ingest arbitrary files, install workers or approve drafts.

Publish revisions through verified export/import. Retain evidence needed by older conversations. Mac processing capability is optional: the hosted library must still open when the Mac is offline. Inference/query capabilities that are unavailable are reported honestly rather than silently replaced.

## First vertical slice

A synthetic source becomes an artifact and mention, an unresolved identity becomes a review decision, and an approved changeset becomes a published revision. Retrieval selects authorized evidence; a worker produces an answer; the API streams recorded outcomes and citations. Each transition can be inspected without reading an entire business platform.

See [knowledge](knowledge.md), [workers](plugins.md), [streaming](streaming.md), [acceptance](acceptance.md) and the [dependency-ordered roadmap](roadmap.md).
