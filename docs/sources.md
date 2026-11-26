---
title: "Sources and terminology"
description: "Find primary references for serving, retrieval, data models and evaluation, with guidance on what each source can support about the proposed Knowledge Lab."
teaser: "Does a quoted source support the design, or does it only document an available feature? A source is easier to use once the technical question is explicit."
---

# Sources and terminology

Start with a concrete claim. A server-sent event reference can explain how a browser receives frames. It cannot establish that a particular installation recovers a disconnected reader’s session. Use the sources below to understand the building blocks, then look to the project’s own tests and release records for implementation evidence.

Primary documentation supports technical capabilities and attribution. Technology selection and review findings are our analysis. Links on each architecture page attach evidence to the relevant claim.

## Product interface and serving

| Design question | Primary references |
| --- | --- |
| Can the browser update one answer as events arrive, and where should request-specific state live? | [Svelte reactivity](https://svelte.dev/docs/svelte/$state), [SvelteKit page options](https://svelte.dev/docs/kit/page-options), [SvelteKit state management](https://svelte.dev/docs/kit/state-management) |
| When the reader cancels a run, which work can stop promptly and which blocking work may continue? | [Tokio cancellation](https://tokio.rs/tokio/tutorial/select), [Tokio blocking tasks](https://docs.rs/tokio/latest/tokio/task/fn.spawn_blocking.html) |
| How would a broker retain events and track acknowledgments if a later deployment needed it? | [NATS JetStream](https://docs.nats.io/concepts/jetstream). The initial job design is in the [current decision register](project/decisions.md). |

## Retrieval and enrichment

| Design question | Primary references |
| --- | --- |
| How can exact terms and ranked lexical matches form a retrieval baseline? | [SQLite FTS5](https://sqlite.org/fts5.html) |
| Which vector queries and filters does the particular adapter version support? | [SQLite Vec1](https://www.sqlite.org/vec1.html), its [manual](https://www.sqlite.org/vec1doc.html), and [sqlite-vec releases](https://github.com/asg017/sqlite-vec/releases) for the separate extension |
| What happens to readers during updates, and how could a query traverse stored relationships? | [SQLite WAL](https://sqlite.org/wal.html), [SQLite recursive queries](https://sqlite.org/lang_with.html) |
| How can a chunk retain its document structure, and how might a detected name be linked to an identity? | [Docling chunking](https://docling-project.github.io/docling/concepts/chunking/), [spaCy entity linking](https://spacy.io/api/entitylinker) |
| What intermediate products can an extraction or enrichment pipeline expose? | [Microsoft GraphRAG dataflow](https://microsoft.github.io/graphrag/index/default_dataflow/) |
| What does each orchestration candidate persist when a multi-step task is interrupted? | [Dagster ETL modeling](https://dagster.io/docs/guides/build/assets/modeling-etl-pipelines), [Temporal workflow execution](https://docs.temporal.io/workflow-execution). Compare their behavior on a common fixture before selecting an engine. |

## Review foundations

| Review question | Source |
| --- | --- |
| Could the publication rule be tested independently of its database adapter? | [Robert C. Martin on Clean Architecture](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html) |
| What responsibility does a proposed design pattern encapsulate? | [Design Patterns](https://www.informit.com/store/design-patterns-elements-of-reusable-object-oriented-software-9780201633610), [authors’ retrospective](https://www.informit.com/articles/article.aspx?p=1404056) |
| What historical design goals can a reviewer attribute to early Rust? | [Rust project attribution](https://rust-lang.org/governance/people/graydon/), [Graydon Hoare’s early presentation](https://venge.net/graydon/talks/intro-talk-2.pdf) and [author-published archive](https://github.com/graydon/rust-prehistory) |

## Terms

The [glossary](reference/glossary.md) groups evidence, retrieval and job terminology. For example, [retrieval and delivery](reference/glossary.md#retrieval-and-delivery) explains the differences among BM25, ANN and RRF.
