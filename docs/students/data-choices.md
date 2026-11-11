---
title: Databases, retrieval and useful evidence
description: Compare SQL, document, key-value, vector and graph approaches, including Weaviate and the build-versus-buy discussion.
---

# Choosing data tools: better evidence, fewer wasted tokens

A good AI application does not send everything it knows to a model. It finds the evidence needed for this question, then sends enough context to answer honestly.

Think of a library: a catalog helps find the right book; it does not replace reading the relevant page. Databases and indexes play different parts in that process.

::: tip Start small
These are options to understand, not five databases you must install. For a small class project, start with the provided SQLite/lexical-search baseline. Add complexity only when a test shows what it improves. A keyword-only baseline is a learning step, not a complete RAG submission; follow the [student guide](index.md) and Canvas requirements.
:::

## Five useful ways to organize information

*On a narrow screen, swipe tables sideways to see every column.*

| Approach | Think of it as… | Good question to ask | Common machinery | Main tradeoff |
| --- | --- | --- | --- | --- |
| Relational / SQL | Related tables with explicit rules | “Which orders are overdue, and what is their total?” | B-tree indexes, joins, filters and aggregation | Excellent for precise facts; schema and queries require design. |
| Document | A collection of structured records, often JSON | “Show products with these nested attributes.” | Field/compound indexes; document filtering and aggregation | Flexible record shapes; duplicated information needs careful updates. |
| Key–value | A labeled locker: key → value | “Get the session with this exact ID.” | Key lookup; hash tables or ordered storage, depending on engine | Simple access; exploratory questions may need additional indexes. |
| Vector | A map of numerical similarity | “Find passages about this idea, even with different wording.” | Exact distance search; approximate indexes such as HNSW or IVF | Similarity is useful, but is not proof, identity or factual correctness. |
| Graph | Entities connected by named relationships | “Which suppliers connect this product to that incident?” | Relationship traversal, path finding and graph analytics | Makes connections explicit; extracting and maintaining trustworthy relationships takes work. |

**These categories overlap.** SQL is a query language, not an indexing algorithm. PostgreSQL can hold tables, JSON and vectors; Apache AGE adds graph capabilities. A vector index does not require a separate vector-database service.

## What the algorithms actually do

- **B-tree:** keeps ordered keys, useful for equality, ranges and sorting. A hash index supports equality rather than ordered ranges. Indexes cost storage and update work; the query planner may still choose a scan. [PostgreSQL index guide](https://www.postgresql.org/docs/current/indexes-types.html)
- **Inverted / full-text index:** connects words to matching documents. Ranking such as BM25 helps order results. Keep this baseline: exact names, identifiers and technical terms can matter more than semantic resemblance. [SQLite FTS5](https://sqlite.org/fts5.html)
- **Document indexes:** indexing is not exclusive to tables. CouchDB, for example, uses B-trees for document IDs and other indexed views. Flexible documents do not remove the need for query design. [CouchDB overview](https://docs.couchdb.org/en/stable/intro/overview.html)
- **Vector search:** exact search compares candidate vectors using a chosen distance/similarity measure. HNSW uses a navigable layered proximity graph; IVFFlat partitions vectors into lists and searches selected lists. Approximation can improve speed while missing some nearest neighbors. Exact vector recall still does not mean a correct answer. [pgvector](https://github.com/pgvector/pgvector)
- **Graph traversal:** follows relationships to answer connection questions. Breadth-first search explores in layers; other algorithms find weighted shortest paths or rank connectivity. Unbounded traversals can grow expensive. A proximity graph inside HNSW is not the same thing as a knowledge graph of people, products and claims. [Graph concepts](https://neo4j.com/docs/getting-started/appendix/graphdb-concepts/)

## Real products to explore

| Approach | Open-source / local example | Commercial or managed example |
| --- | --- | --- |
| Relational | PostgreSQL; SQLite (public domain) | Amazon RDS for PostgreSQL |
| Document | Apache CouchDB | MongoDB Atlas |
| Key–value | Valkey (BSD licensed) | Amazon DynamoDB |
| Vector | PostgreSQL + pgvector | Pinecone managed service |
| Graph | Apache AGE for PostgreSQL | Neo4j AuraDB |

These are examples, not equivalent replacements or free-service promises. Open-source software still needs hosting and operations; commercial providers may offer limited free tiers. Licensing, features and billing differ by edition.

Sources: [PostgreSQL](https://www.postgresql.org/), [SQLite](https://sqlite.org/copyright.html), [RDS](https://aws.amazon.com/rds/postgresql/), [CouchDB](https://couchdb.apache.org/), [Atlas](https://www.mongodb.com/products/platform/atlas-database), [Valkey](https://valkey.io/), [DynamoDB](https://aws.amazon.com/dynamodb/), [pgvector](https://github.com/pgvector/pgvector), [Pinecone](https://www.pinecone.io/), [AGE](https://age.apache.org/), [AuraDB](https://neo4j.com/product/auradb/).

## Can graphs increase “meaning density”?

That is a useful intuition. A more testable goal is **more relevant, supported evidence per context token**. It is not a universal information-density score.

A graph can select a small set of relevant relationships rather than sending many documents. SQL can calculate a total before the model sees it. Vector search can locate relevant passages. None automatically reduces the model bill: the text actually sent, the generated output and the number of model calls determine token usage.

Embeddings are not miniature readable documents. Usually the application uses them to find text, then sends that text to the model. Remote embedding creation may have its own fee; local embeddings use compute instead. Graph extraction and summaries may also require paid model calls. Microsoft GraphRAG, for example, builds community reports and can combine them through multiple calls for whole-dataset questions. [Indexing](https://microsoft.github.io/graphrag/index/methods/) · [Global search](https://microsoft.github.io/graphrag/query/global_search/)

A compact graph can omit uncertainty, dates, exceptions or conflicting evidence. Verbose triples can even exceed concise prose. Keep source links, provenance and access controls; do not trade correctness for a smaller prompt.

## A small experiment, not a promised saving

Suppose a baseline sends 10 passages of 500 tokens: **5,000 evidence tokens**. A tested retriever sends four passages of 250 tokens: **1,000 evidence tokens**. That is 80% less evidence text, **not necessarily 80% less total cost**. Instructions, questions, history, output, embeddings, reranking and graph construction still count where applicable. These are illustrative assumptions, not benchmark results.

Try both on the same small question set. Include exact-fact, paraphrase and relationship questions. Record actual tokens, latency, correct answers, citation support and missing evidence. Compare total cost per satisfactory answer, including indexing amortized across queries. The best design is the simplest one that reliably answers the questions your users actually ask.

## Does AI-assisted coding change build versus buy?

It makes custom solutions worth discussing, not automatically better. AI assistance can speed prototypes, glue code and experiments tailored to your workflow. Building can also teach you how retrieval works and give you control over data formats and portability.

But generating code is only part of ownership: someone must verify correctness, prevent data leaks, test migrations, handle backups, monitor failures and maintain dependencies. A convincing demo does not prove production reliability. Compare that ongoing work and opportunity cost with a managed product's price and constraints.

A sensible middle path is a **custom application on a reliable existing database**, not writing a new database engine. Build the parts that make your project distinctive; reuse the parts responsible for durability and security. For discussion: what would you build yourself, what would you buy, and what evidence would change your choice?

## Where does Weaviate fit?

[Weaviate](https://docs.weaviate.io/weaviate) is an open-source vector database that stores objects alongside embeddings. You can self-host the database or use the managed Weaviate Cloud service. Self-hosting gives operational control, not zero operating cost; managed hosting trades some operational work for service charges.

Its [hybrid search](https://docs.weaviate.io/weaviate/search/hybrid) combines vector results with BM25F keyword results, with configurable weighting and fusion. That is useful when a question needs both conceptual similarity and exact product names or technical terms. It is a reasonable candidate when a project needs a dedicated retrieval service and structured filtering. For a small, single-machine class demo, SQLite or PostgreSQL may be simpler.

Weaviate does not inherently shrink an LLM prompt. You still choose which retrieved evidence to send, measure answer quality and account separately for embedding, generation and hosting costs. Compare it with your baseline before adding another service. [Source code](https://github.com/weaviate/weaviate)


[Compare model prices and token budgets](ai-costs.md). Product references reviewed November 11, 2026; check current licenses, editions and service terms before adopting a tool.

## Chroma, Pinecone or a graph-and-vector combination?

[Chroma](https://docs.trychroma.com/docs/overview/introduction) is Apache-2.0-licensed retrieval infrastructure: run locally, self-host, or use Chroma Cloud. It stores documents, embeddings and metadata and supports dense, sparse and hybrid search. It is a useful option for exploring retrieval without committing immediately to a hosted service. Check which features your chosen deployment supports.

[Pinecone](https://docs.pinecone.io/guides/get-started/overview) is a commercial managed option. Its current Documents API combines full-text, semantic and sparse-vector retrieval, metadata filters and optional integrated embedding. It can reduce infrastructure work, but service charges, provider dependence, data export and feature limits remain design decisions. Do not confuse an SDK or local testing facility with an open-source production database.

**Two meanings of hybrid:** keyword + vector search combines exact terms with semantic similarity. Graph + vector retrieval also follows explicit entity relationships. They can coexist, but they are not the same technique.

For an illustrative question, “Which projects depend on the library affected by this security advisory?” a graph-and-vector pipeline could:

1. Use semantic search to find the advisory despite different wording.
2. Resolve the exact library ID and affected version range from cited evidence.
3. Traverse verified `project → depends on → library version` relationships, with bounded depth and access controls.
4. Retrieve the relevant manifests and advisory passages, then ask the model to explain the result with citations.

That can outperform similarity search alone when the answer requires connecting multiple records. It can also fail if names are merged incorrectly, dependencies are stale, or relationships were invented during extraction. SQL joins may already handle this example well. A separate graph service is not mandatory; one database can support multiple representations.

**Our practical view:** for a small document Q&A app, start with filtered keyword/vector retrieval and reliable citations. Add explicit relationships when your evaluation questions demonstrate a connection problem that this baseline misses. Compare the improvement against graph extraction, synchronization, debugging and operating costs. Hybrid is a tool to test, not an automatic upgrade or token discount. [Example vector-plus-graph retrieval pattern](https://neo4j.com/docs/neo4j-graphrag-python/current/user_guide_rag.html)

## Learn from real GraphRAG projects

This is an established family of approaches, not a new invention unique to this class. These projects solve different problems; “GraphRAG” is not one interchangeable implementation.

- **[Microsoft GraphRAG](https://microsoft.github.io/graphrag/):** extracts graph structure and community reports from source text. Its global search helps explore corpus-wide themes. Student question: can a whole-collection question be answered from a few nearest passages, or does it need broader synthesis? Measure indexing and multiple-call costs, not just the final answer.
- **[Neo4j GraphRAG for Python](https://neo4j.com/docs/neo4j-graphrag-python/current/):** a first-party library for building retrieval pipelines around Neo4j, including graph construction and vector/graph retrieval patterns. Student experiment: compare vector-only evidence with evidence expanded through verified relationships. It is a framework and database choice, not a ready-made guarantee of accurate answers.
- **[LightRAG](https://github.com/HKUDS/LightRAG):** combines knowledge-graph structure and vector embeddings with retrieval of detailed facts and broader concepts. Student experiment: compare a cross-document question against your simple baseline. Treat its speed and quality claims as hypotheses to test on your documents, not universal outcomes.
- **[Graphiti](https://github.com/getzep/graphiti):** builds temporal context graphs with evolving facts and source provenance, combining semantic, keyword and graph retrieval. Student experiment: use synthetic facts that change over time and ask both “what is true now?” and “what was true before?” You still supply and operate the surrounding service and enforce access controls.

Choose **one** small comparison that helps your existing project. You are not expected to install all four. Preserve original evidence, verify extracted relationships, document versions and evaluate incorrect or missing answers as carefully as successful ones.
