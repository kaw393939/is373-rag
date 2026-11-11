---
title: Status and evidence
description: What exists, what is planned, and what each verification result establishes.
---

# Status and evidence

**Review baseline: November 11, 2026.** Software availability and publication are separate claims.

## Available in this repository

| Deliverable | Scope |
| --- | --- |
| VitePress documentation | Vision, guides, current design, build roadmap and reference library |
| IS373 student support | Original-assignment-aligned guides, AI prompts, checking worksheet and optional local retrieval lab (not a hosted submission) |
| Ordo source audit | Exact inspected revisions, reuse decisions and known gaps—not donor test results |
| Synthetic contract labs | Seven Rust, ten JavaScript and eight SQLite/Python tests |
| Static Svelte welcome scaffold | A separately tested container-ready landing page; no research backend |
| Validation and CI | Plan traceability, documentation build, links, anchors, assets, sitemap and navigation |

Use actual workflow logs for execution results. Lab counts describe the suites; a passing run does not establish the full application's behavior. [Example scope](engineering/examples.md).

## Not implemented here

The research Rust workspace, production schema, plugin host, interactive Svelte research interface, canonical resolution service, durable hosted store and model adapters remain planned. Donor code was not bulk imported; donor runtime suites were not executed by this audit. Native hardware quality, retrieval quality and production capacity remain unmeasured.

## Public documentation mirror and project Pages

The VitePress documentation is hosted as a [pinned portfolio Pages mirror](https://kaw393939.github.io/knowledge-lab/). The portfolio publication is an independently tested release of the same source, not a second set of docs. It makes the current IS373 student-support pages accessible without requiring a new Pages site. Actual portfolio Pages deployment should be checked against the source revision manifest.

The [standalone project Pages site](https://kaw393939.github.io/is373-rag/) is now enabled with GitHub Actions and serves this repository's documentation. Confirm a particular release using its deployed source revision and workflow result; the portfolio mirror remains independently pinned. [Mirror and standalone setup](project/setup.md).

## Publication is a separate gate

The Documentation workflow builds previews on PRs. On main it requires Pages activation, deploys and verifies actual public responses against the source revision. A blocked publication job does not invalidate a successful static build, but it does mean the site is not verified live. [Enable and publish Pages](project/setup.md).

Docker Hub publication, live application deployment, portfolio DNS and account settings require independent evidence. The welcome scaffold does not establish any of them. [Application hosting](project/hosting.md).

## Which plan takes precedence?

[Start](guide/index.md) explains intent; [Design](design/index.md) and [Build](build/index.md) lead to the current contracts. The authoritative material remains in `project/`, `reuse/` and `engineering/`. Entry pages summarize and link, not replace it.

The S0–S7 roadmap supersedes the earlier G-series ordering. Older architecture, reviews and research retain visible reference notices. Reuse the historical Rust kernel, repair its gaps, defer a broker, and separate the hosted API from the private stateful store. Local embedded storage remains an explicit twelve-factor exception.

## Next implementation gate

Complete S0's rights, dependency and contract decisions; then extract the bounded S1 job/event behavior. Carry requirement IDs, donor symbols and actual receipts into each issue and PR. Do not close runtime work because a page describes it.

