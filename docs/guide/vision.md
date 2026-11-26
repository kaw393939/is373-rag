---
title: "Project vision"
description: "Follow the design of a research library that keeps source passages, disputed claims, and review decisions together as evidence changes."
teaser: "Three reports tell the same story. How many independent observations do you have? A useful research library lets you find out."
---

# Knowledge you can stand behind

Suppose six articles repeat a witness’s description. A list of six citations looks persuasive. Opening those citations might reveal one observation and five retellings.

Ordo’s proposed local-first research workspace would keep that relationship visible. AI could identify the repeated passage. A reviewer could accept or correct the link. Later readers could inspect both the passage and the decision.

## The problem

A reader should be able to open the evidence behind a sentence, see which reports are independent, and discover what changed after a correction. A name shared by two people is a particularly revealing test.

The design records source versions, identity links, and review decisions so another person can repeat the check.

## The promise

**Every accepted claim has a trail.** Keep source locations, extraction receipts, review decisions and revision history. A reader can inspect the evidence rather than trust fluent wording.

**Uncertainty stays visible.** Preserve conflicting testimony, unresolved identities and scoring limitations. A well-extracted statement is not automatically a true statement.

**Knowledge outlives its tools.** A library created with a Mac worker must remain readable on Linux. Missing models disable particular operations, not access to existing evidence.

**Automation has boundaries.** Rust owns state and publication. Workers propose results through versioned contracts; model text cannot grant permissions or merge identities.

## Who it serves

Researchers need to correct a library without losing earlier decisions. Students can practice a smaller version now: trace one answer to a passage, find a reason to doubt it, and explain which check would settle that doubt.

UFO reports are the first teaching domain. The engine should support other evidence-heavy collections without embedding UFO-specific assumptions in its core.

## The first meaningful success

Import conflicting synthetic reports. Resolve one alias without merging two people who share a name. Publish a reviewed revision. Stream an answer whose citations open the exact evidence. Move the library to a machine with a processing capability missing.

That sequence defines a proposed demonstration. The current labs verify narrower pieces of it. [Follow one case through the design](walkthrough.md).

## Deliberate limits

We are not building an autonomous truth engine, universal scraper or distributed platform first. Version one does not require simultaneous editing of one library on multiple machines, unrestricted public uploads, or advanced video processing.

Reuse useful Ordo code, repair its known gaps, and prove a small end-to-end workflow before adding infrastructure. [See the build strategy](../build/index.md).
