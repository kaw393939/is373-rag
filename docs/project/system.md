# System breakdown

Status: proposed application architecture. None of these services is implemented by the documentation site.

## Seven modules, not seven deployments

| Module | Owns | Proposed implementation |
| --- | --- | --- |
| Research interface | Chat, evidence, library, jobs and review | SvelteKit + TypeScript |
| API | Sessions, authorization, commands and event streams | Rust + Axum + Tokio |
| Retrieval | Lexical/vector candidates, graph expansion, evidence selection | Rust adapters |
| Knowledge library | Sources, mentions, identities, claims, revisions and provenance | SQLite + immutable objects |
| Ingestion | Parsing, extraction and identity proposals | Rust orchestration + plugins |
| Workflow engine | Durable tasks, dependencies, leases, retries and checkpoints | Rust + transactional records |
| Capability workers | Models, speech, OCR, media and native acceleration | Separate Rust/Swift processes |

Start as a modular application with optional worker processes. Do not introduce a broker or separate vector server merely to reproduce an enterprise diagram.

```text
Browser: Chat / Evidence / Library / Jobs / Review
                         |
                 Rust API and policy
                         |
         Retrieval + workflows + publication
                         |
         SQLite records + immutable artifacts
                         |
       Optional capability worker processes
```

## One authority per kind of state

The Rust core validates and commits knowledge changes. Workers return artifacts and proposals; they cannot directly mutate canonical tables. The browser renders authorized projections, not database internals. LLM output is untrusted input, not permission to call arbitrary tools.

Durable events and accepted state changes commit together. Task execution is at least once; accepted results use idempotency keys. Do not promise exactly-once external inference or side effects.

## Two deployment profiles

**Local authoring:** the Mac or Linux workstation owns source ingestion, drafts, review and the working library.

**Hosted demonstration:** a service opens a verified published snapshot and serves retrieval and chat. Its conversation/run database is separate from the immutable research snapshot. It does not become a competing canonical writer.

Publish library revisions through validated exports. Each answer pins its evidence to a revision. A library switch must not invalidate citations in older conversations; retain referenced artifacts under a documented retention policy.

## Design gates

Benchmark actual writer contention, search latency, recovery and memory use before changing storage or adding distributed components. One short transactional write path is the initial design, not an unmeasured throughput claim.

See [knowledge invariants](knowledge.md), [capability contracts](plugins.md), and [acceptance scenarios](acceptance.md).
