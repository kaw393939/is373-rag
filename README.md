# Ordo Knowledge Lab · IS373

A code-grounded plan for a portable Rust knowledge library, streaming research chat and governed AI workflows, built by selectively reusing Ordo rather than importing its entire product.

**Implemented here: documentation, validation scripts and synthetic teaching examples. Application runtime: pending.** No donor code was bulk imported and no production system was changed by this documentation review.

## Read first

- [Ordo reuse map](docs/reuse/index.md) and [pinned source audit](docs/reuse/source-audit.md)
- [Harvest plan](docs/reuse/harvest-plan.md)
- [Twelve-factor matrix](docs/engineering/twelve-factor.md) and [clean-build plan](docs/engineering/clean-build.md)
- [Executable examples](docs/engineering/examples.md)
- [Dependency-ordered roadmap](docs/project/roadmap.md)
- [Requirements](docs/project/acceptance.md), [system](docs/project/system.md) and [status](docs/status.md)

The audit distinguishes the historical Rust/SQLite daemon from the current Ordo rebuild and the owner-only executor lab. It records source commits, symbols, observed limitations and tests needed before reuse. A test present in a donor file is not a current pass result.

## Run the documentation

Use Node.js 22 or newer and npm. No model, GPU, provider credential or private repository is required.

```sh
npm ci
npm run dev
```

Open the VitePress URL, including `/is373-rag/`. Build output is `dist/` and is not committed.

```sh
npm test
npm run preview
```

`npm test` needs Python 3.10+ as well as Node. It runs plan checks, ten synthetic JavaScript stream tests, eight in-memory SQLite/Python tests, the site build and generated-path checks. The seven Rust lease/config tests run separately in CI with compiler 1.90.0; see the [exact local commands](docs/engineering/clean-build.md). Python is only a SQLite teaching harness, not a choice of application backend.

The examples test selected contracts, not authenticated HTTP, real concurrency, native hardware, a complete ontology or production recovery. Those proofs belong to the application acceptance gates.

## Documentation site

GitHub Actions builds/checks the docs and publishes only when Pages is enabled with GitHub Actions as its source. A skipped deploy is not a live site. Intended default address: `https://kaw393939.github.io/is373-rag/`; the actual deployment URL is authoritative. [Pages/local setup](docs/project/setup.md).

Pages runs no chat API, model or scheduler. The professional portfolio and future DigitalOcean application are independent sites. No custom domain, DNS or server setting is changed by this project setup.

## Repository boundaries

`docs/project/`, `docs/reuse/` and `docs/engineering/` form the current baseline. `docs/examples/` contains original synthetic specifications. `docs/public/source-ledger.json` records inspected source identities; it is not a private source dump. Earlier research/reviews remain clearly labelled reference material.

Future Rust modules and the Svelte client will be added only through reviewed implementation slices. The hosted API/workers are designed to be replaceable processes attached to a private durable Rust store; the local embedded-store appliance is an explicit twelve-factor exception.

Work records: [reuse review #3](https://github.com/kaw393939/is373-rag/issues/3), [test plan #4](https://github.com/kaw393939/is373-rag/issues/4), and [remaining workspace/Pages setup #1](https://github.com/kaw393939/is373-rag/issues/1). Link each implementation issue, atomic commit and acceptance receipt to its requirement. Do not close runtime work because a document describes it.
