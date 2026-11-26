---
title: Status and evidence
description: "Check the status of Ordo documentation, teaching labs, public mirrors and proposed application components against the evidence that actually exists."
teaser: "The student guide is public. The proposed research application has a different status. Here is how to verify which deliverable someone is talking about."
---

# Status and evidence

Ask one short question before relying on a status claim: which artifact? The published documentation, a synthetic contract lab and a proposed Rust service require different evidence. This page records the reviewed baseline and shows where to verify a release.

**Review scope.** Software availability and publication are separate claims.

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

| Publication | Release evidence |
| --- | --- |
| [Portfolio edition](https://keithwilliams.org/knowledge-lab/) | The [public mirror manifest](https://keithwilliams.org/knowledge-lab/mirror-manifest.json) names the Lab source revision. Check it against the [portfolio publish run](https://github.com/kaw393939/kaw393939.github.io/actions/workflows/publish.yml) and the `lab-docs-revision` tag on the lesson you opened. |
| Standalone Lab Pages | Open the intended commit’s successful deployment in the [Lab Documentation workflow](https://github.com/kaw393939/is373-rag/actions/workflows/docs.yml). Its deployment URL and HTTPS check identify the standalone build and revision it verified. |

Both builds use [the Lab repository](https://github.com/kaw393939/is373-rag). A portfolio promotion can lag the standalone release. If an older project URL redirects, identify the edition from its final address and revision marker. [Local and public release checks](project/setup.md).

## Publication is a separate gate

For a welcome scaffold build, inspect the [Welcome workflow](https://github.com/kaw393939/is373-rag/actions/workflows/welcome.yml). Registry publication has a [separate workflow](https://github.com/kaw393939/is373-rag/actions/workflows/publish-welcome.yml). A public research application would also need a host deployment receipt and a check of the research service over HTTPS. [Application hosting plan](project/hosting.md).

## Which plan takes precedence?

[Research overview](guide/index.md) explains intent; [Design](design/index.md) and [Build](build/index.md) lead to the current contracts. The authoritative material remains in `project/`, `reuse/` and `engineering/`. Entry pages summarize and link, not replace it.

The S0–S7 roadmap supersedes the earlier G-series ordering. Older architecture, reviews and research retain visible reference notices. Reuse the historical Rust kernel, repair its gaps, defer a broker, and separate the hosted API from the private stateful store. Local embedded storage remains an explicit twelve-factor exception.

## Next implementation gate

The next unverified milestone is [S0, approval to reuse selected donor code](project/roadmap.md#s0). For one selected job operation, attach the exact donor revision, dependency boundary, reuse decision and characterization results required by [A-15](project/acceptance.md#a-15). Once that gate passes, [S1](project/roadmap.md#s1) calls for a durable job that survives restart and rejects a stale worker result in the application store.
