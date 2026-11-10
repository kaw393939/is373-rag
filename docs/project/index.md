# Project brief

**Ordo Knowledge Lab · IS373 · documentation and contract-review phase.**

Build a portable research library that gains processing capabilities without losing control of its evidence. UFO reports are the first teaching domain, not a permanent restriction on the engine. Build from carefully selected Ordo behaviors rather than importing the entire business platform or starting without its useful code.

## User experience

An instructor imports sources, reviews ambiguous identities and claims, and publishes a revision. A learner asks a question in a streaming interface and opens the exact evidence behind the answer. The same published library opens on another machine even when a processing plugin is unavailable.

The central principle is **canonical identity, not canonical truth**. One incident may have conflicting accounts. Resolving its identity does not authorize erasing disagreement.

## Current direction

Rust owns state and coordination. Workers use language-neutral contracts and may be Rust, Swift or another appropriate implementation. CPU/NVIDIA/Apple capabilities are optional. The data is portable; jobs are durable and observable. Identity resolution, provenance, review and recovery take precedence over infrastructure complexity.

The hosted API and workers follow [twelve-factor requirements](../engineering/twelve-factor.md), with a private Rust store as their durable backing service. Local authoring may embed that store as an explicitly stateful appliance. We do not call a database stateless merely because it runs in a container.

## What to review first

[Reuse map](../reuse/index.md) → [source audit](../reuse/source-audit.md) → [system](system.md) → [knowledge](knowledge.md) → [factor matrix](../engineering/twelve-factor.md) → [roadmap](roadmap.md).

The [executable examples](../engineering/examples.md) make specific failure contracts testable. The [requirements](acceptance.md) describe broader application acceptance that those small labs do not satisfy on their own.

## First complete demonstration

Import synthetic reports containing aliases, two people sharing a name, copied testimony and a contradiction. Repeat the import without duplicate acceptance. Resolve ambiguity, publish a reviewed revision, stream a cited answer, and open the library on Linux without the Mac worker. Inspect what a stopped worker or disconnected browser did and did not preserve.

## Boundaries

This repository currently contains documentation, checks and synthetic examples—not the running application. No multi-writer library sync, unrestricted public ingestion, automatic canonical merges, plugin marketplace or production-scale claim is required for the first release. Native video comes later as a bounded capability.

Portfolio DNS, documentation Pages and the future application host are distinct operations. See [hosting](hosting.md), [decisions](decisions.md), [source rules](sources.md) and [status](../status.md). This instructor example does not alter course grading or require students to adopt every proposed technology.
