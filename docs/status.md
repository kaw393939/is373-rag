# Status and scope

<span class="status-label">DRAFT · NOVEMBER 5, 2026</span>

The goal is an excellent streaming text chat experience grounded in documents. Implementation convenience and familiarity do not decide the stack. Correctness, relevance, measured latency, resource use, and recovery behavior do.

## Confirmed requirements

- Streaming text chat is the primary interaction.
- Retrieve from documents with keyword, vector, and useful relationship information.
- Extract graph relationships with AI, including NER, entity disambiguation, and augmentation.
- Treat ingestion as a dependency-aware pipeline with parallel work and staged availability.
- Document the architecture and critique it through published design principles.

## Proposed baseline

| Area | Draft choice | Status |
| --- | --- | --- |
| Product UI | Svelte 5, SvelteKit, TypeScript | Recommended; representative browser validation pending |
| Chat serving | Rust, Axum, Tokio | Recommended; workload validation pending |
| Browser output | Direct SSE from Rust; HTTP commands | Proposed default |
| Event backbone | NATS with JetStream where durability is needed | Preferred candidate |
| Ingestion | Versioned artifact DAG with one durable orchestration owner | Design direction |
| Retrieval | SQLite with FTS5, vector extension, indexed graph tables | Candidate under evaluation |
| NLP workers | Python where parsing and model tooling justify it | Proposed boundary |
| Documentation | VitePress 1.6.4 | Implemented in this repository |

## Open decisions

The corpus formats, languages, size, vector dimensions, concurrent chats, update rate, tenant boundaries, retention policies, and inference hosting are unspecified. These inputs determine database topology and capacity. Dagster versus Temporal remains unresolved. Exact versus approximate vector search and the specific extension remain unresolved.

No fixed vector-count limit, latency promise, or framework speed ranking is established. The [validation plan](/validation) defines how to decide.

## Scope of this repository

The current deliverable is a documentation site, architecture drafts, decision records, and analytical reviews. Rust services, Svelte application code, model integrations, databases, brokers, and workflow deployments are future implementation work. Example API envelopes and schemas are design proposals.

This repository is the versioned technical draft. The [decision register](/decisions/) records the current recommendations, and the [IS373 roadmap](/course-roadmap) connects research and implementation evidence to the course milestones.
