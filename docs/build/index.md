---
title: "Reuse, repair, prove, extend"
description: "Start with an existing Ordo behavior, record its source, and build the smallest independently verifiable change before expanding the research application."
teaser: "Before moving a useful-looking file, identify one behavior worth keeping and the test that will tell you whether it survived the move."
---

# Reuse, repair, prove, extend

A working function in an older project can save a team days. It can also carry an assumption that the new system cannot afford. Start with one behavior from Ordo, trace its source, and decide which observation would justify reusing it. Each stage below builds something small enough for a teammate to verify.

## Start with evidence

The [reuse map](../reuse/index.md) separates the historical Rust/SQLite daemon, current rebuild, executor lab and streaming workshop. The [source audit](../reuse/source-audit.md) pins files and symbols to exact revisions. The [extraction plan](../reuse/harvest-plan.md) defines the boundary before code moves.

Record the donor revision and the exact command you ran in your checkout. A test included with the donor tells you what someone intended to check. Your own run establishes what passed in this environment. Check reuse rights before taking any material from a private repository into a public lesson.

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

Build an identifiable artifact once. Run the tests against that artifact, then promote the same artifact with reviewed configuration. Record application release, library publication, and documentation deployment as separate outcomes so a successful site build cannot accidentally certify the application.

## First implementation target

Extract DAG validation and idempotent job creation with transactional events. Exclude model calls, frontend work and live deployment. Follow with lease fencing and scoped replay before adding evidence extraction.

**Next:** [Follow S0–S7 →](../project/roadmap.md)
