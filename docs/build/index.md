---
title: Build guide
description: Reuse Ordo deliberately through small, verifiable implementation slices.
---

# Reuse, repair, prove, extend

**Do not import all of Ordo. Do not ignore the useful code we already have.** Extract bounded behaviors, repair identified gaps, and connect them through tested contracts.

## Start with evidence

The [reuse map](../reuse/index.md) separates the historical Rust/SQLite daemon, current rebuild, executor lab and streaming workshop. The [source audit](../reuse/source-audit.md) pins files and symbols to exact revisions. The [extraction plan](../reuse/harvest-plan.md) defines the boundary before code moves.

A source file's tests are not a current pass receipt. Private source is not automatically public teaching material.

## Build in this order

| Stage | Result |
| --- | --- |
| S0 | Review reuse rights, dependencies and contracts |
| S1 | Establish durable jobs, leases and events |
| S2–S3 | Preserve evidence, resolve proposals and publish atomically |
| S4–S5 | Retrieve evidence and stream cited answers |
| S6–S7 | Prove portability, then release a bounded hosted demonstration |

The [delivery roadmap](../project/roadmap.md) owns dependencies and exit criteria. This table is a reading aid, not another backlog.

## Work you can run now

From a checkout with Node.js 22+ and Python 3.10+:

```sh
npm ci
npm test
npm run dev
```

These commands validate and serve documentation plus synthetic examples. They do not start the research backend. The separate Rust example command and compiler pin are in [clean builds](../engineering/clean-build.md).

## What every change carries

A requirement, a bounded issue, relevant donor references, tests, atomic commits and a review receipt. Use the [acceptance register](../project/acceptance.md) for stable IDs and the [twelve-factor matrix](../engineering/twelve-factor.md) for operating properties.

Build once; test the artifact; promote that artifact with reviewed configuration. Keep application release, library publication and documentation deployment separate.

## First implementation target

Extract DAG validation and idempotent job creation with transactional events. Exclude model calls, frontend work and live deployment. Follow with lease fencing and scoped replay before adding evidence extraction.

**Next:** [Follow S0–S7 →](../project/roadmap.md)
