# Project brief

**Working name:** Ordo Knowledge Lab. **Teaching context:** IS373. **Phase:** documentation and design review.

Build a portable research library that can acquire new processing capabilities without losing control of its evidence. UFO reports are the first example, not a permanent restriction on the engine.

## The user experience

An instructor imports source material, reviews ambiguous identities and claims, and publishes an approved revision. A learner asks questions in a streaming interface and can inspect the passages behind each answer. The same published library opens on another machine even when some processing plugins are missing.

The core principle is **canonical identity, not canonical truth**. One incident can have several contradictory accounts. Their shared identity must not collapse their testimony into a single unquestioned fact.

## Confirmed direction

Rust owns core state and coordination. Plugins use language-neutral contracts and may use Rust, Swift or other suitable implementations. Mac-native and NVIDIA/CPU capabilities are optional. Data is portable. Processing is durable and continuously observable. Identity resolution, provenance, review and recoverability take priority over a large technology stack.

The present deliverable is a **documentation-only GitHub Pages site**. Product implementation comes after plan review.

## First complete demonstration

Use synthetic reports with an alias, two distinct people sharing a name, a copied report, and a conflicting observation. Import twice without duplicate accepted records. Review the ambiguous cases, publish one revision, stream a cited answer, and reopen the library on Linux with a Mac worker unavailable.

## Out of scope for the first release

No distributed consensus, multi-writer database synchronization, unrestricted public uploads, autonomous canonical merges, plugin marketplace, continuous video ingestion, or production-scale claims. Native video processing is a later bounded capability.

## Reading path

[System](system.md) → [knowledge model](knowledge.md) → [streaming](streaming.md) → [plugins](plugins.md) → [requirements](acceptance.md) → [roadmap](roadmap.md).

[Hosting](hosting.md) separates portfolio, documentation and application infrastructure. [Decisions](decisions.md) records alternatives. [Sources](sources.md) links existing work without copying private code or treating an old audit as current server evidence.
