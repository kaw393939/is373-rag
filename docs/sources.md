# Sources and terminology

Primary documentation supports technical capabilities and attribution. Technology selection and review findings are our analysis. Links on each architecture page attach evidence to the relevant claim.

## Product interface and serving

- [Svelte reactivity](https://svelte.dev/docs/svelte/$state): granular state updates.
- [SvelteKit page options](https://svelte.dev/docs/kit/page-options): route rendering choices.
- [SvelteKit state management](https://svelte.dev/docs/kit/state-management): server/client state boundaries.
- [Tokio cancellation](https://tokio.rs/tokio/tutorial/select): local future cancellation and background work.
- [Tokio blocking tasks](https://docs.rs/tokio/latest/tokio/task/fn.spawn_blocking.html): blocking-work execution and limitations.
- [NATS JetStream](https://docs.nats.io/concepts/jetstream): retained events and consumer acknowledgments.

## Retrieval and enrichment

- [SQLite FTS5](https://sqlite.org/fts5.html): keyword search and BM25.
- [SQLite Vec1](https://www.sqlite.org/vec1.html) and [manual](https://www.sqlite.org/vec1doc.html): vector modes and filtered queries.
- [sqlite-vec releases](https://github.com/asg017/sqlite-vec/releases): version-specific vector capabilities.
- [SQLite WAL](https://sqlite.org/wal.html): concurrency and checkpointing.
- [SQLite recursive queries](https://sqlite.org/lang_with.html): hierarchical and graph traversal.
- [Docling chunking](https://docling-project.github.io/docling/concepts/chunking/): structural and token-aware chunks.
- [spaCy entity linking](https://spacy.io/api/entitylinker): linking mentions to canonical identifiers.
- [Microsoft GraphRAG dataflow](https://microsoft.github.io/graphrag/index/default_dataflow/): extraction and enrichment pipeline reference.
- [Dagster ETL modeling](https://dagster.io/docs/guides/build/assets/modeling-etl-pipelines) and [Temporal workflows](https://docs.temporal.io/workflow-execution): orchestration candidates.

## Review foundations

- [Robert C. Martin: The Clean Architecture](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html).
- [Gang of Four: Design Patterns](https://www.informit.com/store/design-patterns-elements-of-reusable-object-oriented-software-9780201633610).
- [Gang of Four retrospective](https://www.informit.com/articles/article.aspx?p=1404056).
- [Rust's attribution of Graydon Hoare](https://rust-lang.org/governance/people/graydon/).
- [Hoare's early Rust presentation](https://venge.net/graydon/talks/intro-talk-2.pdf) and [author-published archive](https://github.com/graydon/rust-prehistory).

## Terms

| Term | Meaning in this design |
| --- | --- |
| DAG | A directed acyclic dependency graph of processing artifacts |
| NER | Detection of named entity mentions in text |
| Entity resolution | Choosing which canonical identity a mention refers to, or preserving uncertainty |
| Claim | An attributed assertion with evidence and qualifiers |
| Augmentation | Generated, source-linked context kept separate from original evidence |
| BM25 | A lexical ranking function provided here by FTS5 |
| ANN | Approximate nearest-neighbor retrieval, evaluated against an exact reference |
| SSE | HTTP event framing for incremental server-to-browser delivery |
| Fencing | Rejecting writes from an obsolete run/worker authority |
| Outbox | A committed record used to reliably publish a corresponding boundary event |
| RRF | Reciprocal rank fusion, combining result ranks from different retrieval signals |
