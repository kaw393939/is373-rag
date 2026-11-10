# Status and evidence

**Review baseline: November 10, 2026.**

## Present in this repository

A VitePress documentation site; a pinned, scoped Ordo source audit; an extraction roadmap; twelve-factor decisions and gates; and original synthetic Rust, JavaScript and SQLite transaction examples. The Documentation workflow runs example checks, plan consistency checks, the site build and generated-path checks.

Use actual workflow logs for execution results. The Rust lab has seven tests, the stream lab ten and the transaction lab eight. Their scope is documented in [examples](engineering/examples.md); even a passing run does not establish application implementation or live service behavior.

## Not implemented here

The application Rust workspace, production schema, plugin host, Svelte research interface, canonical entity-resolution service, durable hosted store, model adapters and DigitalOcean deployment remain planned. Donor code was inspected at pinned revisions; donor runtime suites were not executed or bulk imported. Native hardware processing, retrieval quality and production capacity have not been measured by this documentation change.

## Plan precedence

Read [Project plan](project/index.md), [Reuse](reuse/index.md) and [Engineering](engineering/twelve-factor.md) together. The newer S-series roadmap supersedes the earlier G-series sequence. Earlier architecture/review/research pages remain historical reference and carry a reference notice.

Key reconciliations: reuse the historical Rust kernel before writing a new scheduler; repair its identified gaps; defer a broker; separate the hosted stateless API from its private stateful store; keep the local appliance exception explicit. A prior design review does not automatically certify the revised design.

## Publication and workspace

GitHub Pages publication still requires the repository's actual Pages source to be enabled for GitHub Actions and a successful deployment. The workflow records readiness and the real deployment URL. A green build or a skipped deploy action is not a live-site claim. [Setup](project/setup.md).

An assistant checkout under `/mnt/data` is an isolated working environment, not the owner's Mac. A Mac checkout, local preview and platform-specific tests require observations from that machine. No DNS, portfolio, server, account credential or donor repository is changed by this documentation review.

## Next implementation gate

Complete S0's rights/dependency/contract decisions, then begin the bounded S1 job/event extraction. Carry [requirement IDs](project/acceptance.md), pinned donor symbols and actual evidence into every implementation/test-plan issue. The public documentation must remain buildable without private source or real provider credentials.
