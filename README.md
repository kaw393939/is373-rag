# IS373 RAG

Draft architecture and independent design reviews for a streaming text RAG system. This repository currently contains the VitePress documentation site; application services are not implemented.

- Proposed product frontend: Svelte 5, SvelteKit, TypeScript.
- Proposed serving backend: Rust, Axum, Tokio.
- Retrieval candidate: SQLite FTS5 BM25, vector extension, evidence-backed graph relationships.
- Ingestion: durable DAG for parsing, chunking, NLP, NER, entity resolution, claim extraction, and augmentation.
- Messaging: NATS/JetStream for appropriate system events and durable work; direct SSE for active answers.

## Documentation

The documentation generator uses Vue through VitePress. That does not change the proposed Svelte product frontend.

```sh
npm ci
npm run dev
```

```sh
npm run build
npm run preview
```

Node.js 22 or newer is required. Production assets are generated in `dist/`. The build checks documentation links. GitHub Actions builds the documentation on pushes and pull requests; publication uses Sites and preserves the configured audience.

VitePress is pinned to its stable 1.6.4 release. Vite 6.4.5 and KaTeX 0.18.2 are explicit transitive overrides to avoid advisories in the original dependency ranges; validate these overrides when upgrading the documentation toolchain.

Start with [the overview](docs/architecture/overview.md), [decision register](docs/decisions/index.md), and [review findings](docs/reviews/index.md). Reviews apply published principles of Robert C. Martin, the Gang of Four, and Rust design. None of those people participated or endorsed this design.

The [research library](docs/research/index.md) contains similar projects, implementation repositories, concept explanations, and dated developments. The [IS373 assignment roadmap](docs/course-roadmap.md) connects research → planning/specification → construction → testing and improvement to the actual course reviews. It is an instructor reference, not a completed student deliverable or a mandatory technology stack.

## Status

Architecture draft dated November 5, 2026. Database extension, workflow engine, model hosting, corpus scale, and service-level objectives remain open. See [status](docs/status.md) and [validation](docs/validation.md). No application benchmark results are claimed.
