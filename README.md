# Ordo Knowledge Lab · IS373

A documentation-first project for a portable, Rust-first knowledge library with graph/vector retrieval, evidence-backed streaming chat, and governed ingestion.

**This repository currently implements the documentation site only.** The application, datastore, workers, and deployment described here are proposed work, not delivered capabilities.

## Start here

- [Project brief](docs/project/index.md)
- [System breakdown](docs/project/system.md)
- [Requirements and acceptance](docs/project/acceptance.md)
- [Roadmap](docs/project/roadmap.md)
- [Decisions and open questions](docs/project/decisions.md)
- [Local workspace and Pages setup](docs/project/setup.md)

The current planning baseline lives in `docs/project/`. Earlier architecture, design reviews and research remain available for reference. The decision register explains differences rather than silently rewriting that history.

## Local documentation

Use Node.js 22 or newer and npm. No Rust toolchain, GPU, model key or database is required for the documentation site.

```sh
git clone https://github.com/kaw393939/is373-rag.git
cd is373-rag
npm ci
npm run dev
```

Open the local URL printed by VitePress, including `/is373-rag/` when shown.

```sh
npm run build
node scripts/check-pages.mjs
npm run preview
```

The generated static site is `dist/`. Do not commit `node_modules/` or `dist/`.

## GitHub Pages

The Documentation workflow builds and checks the static site. On `main`, it publishes only when GitHub Pages is enabled with **GitHub Actions** as its source. Otherwise the run records the missing account-setting step without claiming a live deployment.

Planned default address: `https://kaw393939.github.io/is373-rag/`. The verified deployment URL in the Actions run is authoritative; an account-level custom domain can change the public hostname.

Pages hosts **documentation only**. It does not run the planned chat API, models or jobs. No custom domain, DNS, server or portfolio setting is changed by this repository setup.

## Repository boundaries

`docs/` owns the readable plan. `scripts/` and `.github/workflows/` contain documentation checks and publishing support. Application modules will be added only after specifications are reviewed. The Vue-based VitePress docs do not choose the application frontend; SvelteKit remains a proposed application choice.

Related work: [IS373 RAG research](docs/research/index.md), [streaming chat workshop](https://github.com/kaw393939/is373-ai-chat), [hosting studio](https://github.com/kaw393939/373_hosting).

Track work in [issue #1](https://github.com/kaw393939/is373-rag/issues/1). Keep commits small and link later implementation issues to requirement and acceptance IDs.
