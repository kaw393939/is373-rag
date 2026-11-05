---
layout: home
title: Architecture field guide
hero:
  name: IS373 RAG
  text: Fast answers. Traceable knowledge.
  tagline: A working architecture for streaming conversations, hybrid retrieval, and an evidence-backed knowledge graph.
  image:
    src: /architecture.svg
    alt: Three connected layers for conversation, knowledge, and ingestion
  actions:
    - theme: brand
      text: Explore the architecture
      link: /architecture/overview
    - theme: alt
      text: Browse the research
      link: /research/
features:
  - title: Conversation
    details: A reactive Svelte interface and a direct Rust stream, designed around grounded first text and responsive interruption.
    link: /architecture/frontend
    linkText: Frontend and streaming
  - title: Knowledge
    details: Keyword, semantic, and relationship retrieval with document versions, source evidence, and explicit uncertainty.
    link: /architecture/retrieval
    linkText: Hybrid retrieval
  - title: Enrichment
    details: A durable ingestion DAG for parsing, NLP, entity resolution, and augmentation that can progress independently of chat.
    link: /architecture/ingestion
    linkText: Ingestion workflow
---

<ArchitectureMap />

<div class="home-note">
<span class="status-label">ARCHITECTURE DRAFT · 05 NOV 2026</span>

This is a design repository. The documentation site works; the RAG application has not been built. Proposed choices and unresolved decisions are recorded explicitly. The three design reviews are independent analyses applying published ideas, with no author participation or endorsement.

[IS373 assignment roadmap](/course-roadmap) · [Decision register](/decisions/) · [Review findings](/reviews/) · [Validation gates](/validation)
</div>
