---
title: "What a dependency change means for your application"
description: "Seven documented changes to retrieval, extraction, workflow, and web tooling, with a concrete design question for each."
teaser: "A changed parser can move the passage behind a citation. A new index can change which record reaches the reader. Here is what seven engineering teams made worth testing."
---

# What a dependency change means for your application {#recent-developments}

A dependency can change even when your own code stays the same. Each case below pairs an identifiable release, paper revision, or documentation change with something you can test in your own app. For a project decision, check the upstream source against the version you actually run.

## Can readers follow a citation back to its source?

### Docling improves document structure and OCR recovery

**Type: software release, v2.144.0.** The release adds heading-hierarchy processing and an OCR path for replacing broken PDF text layers. It also includes reading-order and concurrent OCR fixes. These are relevant to the extraction stage before chunking, NER, and entity disambiguation. [Release notes](https://github.com/docling-project/docling/releases/tag/v2.144.0), [Docling project](https://github.com/docling-project/docling)

For our DAG, parser versions must be dependencies of chunks and extracted claims. A conversion change can alter section boundaries, text, and evidence anchors even when the source file is unchanged. Include malformed text layers, multi-column pages, and tables in parser regression fixtures. These fixes do not establish that every PDF is extracted correctly or that OCR confidence measures relationship accuracy.

For a citation fixture, use an unchanged two-column sample PDF whose second page says “Submit by noon” under *Equipment returns*. Before upgrading, save the PDF digest, parser version, extracted words and page/span anchor. Parse those same bytes with the candidate version and click its citation. Record whether it still selects the correct sentence on page 2, even if its internal block ID changed. Fill the comparison after both runs.

### Microsoft GraphRAG adds a maintenance-mode notice

**Type: merged repository/documentation change.** Pull request 2486 added a README notice stating that the project is largely in maintenance mode, with bug fixes and dependency updates continuing as appropriate, while new features and contributions are restricted. [Merged change](https://github.com/microsoft/graphrag/pull/2486), [Current project notice](https://github.com/microsoft/graphrag)

GraphRAG remains useful as a reference pipeline and evaluation implementation for extraction, graph organization, and evidence retrieval. Its upstream roadmap should not be assumed to supply our entity-resolution corrections, streaming service, or incremental publication semantics. This maintenance decision concerns that implementation; it does not establish that graph-assisted retrieval as a technique is obsolete or ineffective.

## Which eligible passage reaches the reader?

### SQLite documents its own ANN extension

**Documentation update.** SQLite’s Vec1 overview describes version 0.8. It documents approximate nearest-neighbor search using IVFADC/OPQ, cosine and L2 distance, and SIMD support. Vec1 is an extension, not a capability to assume in every installed SQLite build. [Extension overview](https://sqlite.org/vec1.html), [User manual](https://sqlite.org/vec1doc.html)

This broadens our unified SQLite retrieval evaluation beyond exact vector scans. Benchmark Vec1 against an exact baseline and a dedicated retrieval service using the same eligible documents. Filter behavior, recall, index training, updates, and deletion costs matter. The documentation date does not show when each feature first shipped; an ANN index also does not remove SQLite's write-concurrency or deployment constraints.

### UnWeaver offers an entity-centric retrieval baseline

**Type: arXiv paper revision, v3.** UnWeaver extracts entity descriptions, aggregates them, searches their vector representations, and follows links back to original passages. It offers a lighter alternative to full relationship-graph construction. [Paper and history](https://arxiv.org/abs/2603.29875), [Method explanation](https://arxiv.org/html/2603.29875v3), [Author-linked code](https://github.com/SamsungLabs/UnWeaver)

Our evaluation should include an entity-to-passage baseline alongside BM25/vector fusion and typed graph expansion. That isolates whether explicit edges improve our questions enough to justify their extraction and maintenance. The paper's name-based entity grouping does not satisfy our contextual disambiguation requirement by itself. Its reported results do not establish that graphs are unnecessary across domains, and we have not reproduced its experiments.

### sqlite-vec introduces ANN indexes in an alpha

**Type: prerelease, v0.1.10-alpha.1.** The release introduces rescore and DiskANN paths and describes IVF as experimental and disabled. This is a version-specific development: it makes a blanket claim that sqlite-vec cannot perform ANN inaccurate, while retaining an important prerelease qualification. [Initial alpha release](https://github.com/asg017/sqlite-vec/releases/tag/v0.1.10-alpha.1), [Project releases](https://github.com/asg017/sqlite-vec/releases)

For our candidate matrix, keep a stable exact-search baseline separate from experimental ANN builds. Pin versions and test filtered recall, deletion, replacement, portability, and ingestion contention before selecting one. The presence of an ANN implementation does not establish production suitability, sufficient metadata filtering, or a latency advantage for our data. It is also distinct from SQLite's Vec1 extension.

## What survives a workflow restart?

### Temporal's Rust SDK reaches general availability

**Type: GA announcement in the product changelog.** Temporal’s changelog and engineering announcement describe general availability for its Rust SDK. The SDK supports Rust workflows, activities, and workers, with recorded execution history and recovery. [GA changelog](https://temporal.io/changelog/rust-sdk-generally-available), [Detailed announcement](https://temporal.io/blog/build-durable-applications-rust-temporal-rust-sdk-now-generally-available), [Rust documentation](https://docs.temporal.io/develop/rust)

Rust-native orchestration is therefore a current candidate rather than a hypothetical custom scheduler. Compare it with Dagster against our dependency tracking, backfills, cancellation, and artifact-publication requirements. Whichever engine wins should own workflow progression. NATS can carry system events at its boundaries. GA status does not establish end-to-end exactly-once database/model effects or prove better throughput than the alternatives; our idempotent commits and revision guards remain necessary.

## What changes in the build artifact?

### Vite 8 adopts Rolldown

**Type: stable-release announcement.** Vite 8 moves to the Rust-based Rolldown bundler and documents associated tooling and migration changes. The announcement concerns the build toolchain used by frontend frameworks. [Vite announcement](https://vite.dev/blog/announcing-vite8), [Migration documentation](https://vite.dev/guide/migration)

This is relevant when selecting compatible tooling for the proposed SvelteKit application. The VitePress documentation site has its own dependency constraints, so a major Vite upgrade should follow framework compatibility rather than be forced independently. Build-speed claims do not establish faster token delivery, lower input delay, or smoother Markdown rendering in the deployed browser. Those remain browser-benchmark questions.

For a compatible Vite upgrade, run the same clean build before and after the change. Record the lockfile revision, build status and whether the generated page at the deployment subpath can load its scripts and styles. This check examines the released assets. Token-delivery timing requires a separate browser experiment.

## What to evaluate next

Begin with a fixture small enough to inspect by hand. Save the expected source span and the version that produced it. If a dependency update changes the answer, you now have a starting point for finding out why.

Prioritize filtered SQLite retrieval comparisons, an entity-centric retrieval baseline, and a short durable-workflow recovery exercise. Use parser fixtures to verify evidence anchors across upgrades. Preserve the existing separation between ingestion, live answer serving, and frontend rendering: these developments expand our options without proving that additional stages or services improve the experience.
