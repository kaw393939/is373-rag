---
title: Libraries for RAG and AI applications
description: A student-friendly comparison of LangChain, LlamaIndex, Haystack, DSPy, LangGraph, LiteLLM and direct SDKs without extra requirements.
---

# AI libraries: what they do, and when to use them

**You do not need to install any library on this page.** This is a comparison handout for the existing IS373 RAG assignment—not another deliverable. Build a small hosted application using tools you already have. Research before adding dependencies.

A **library** provides reusable functions or classes. A **framework** organizes how several components work together. An **SDK** helps your code call an external service. A **model** generates or classifies content. A **database** stores records and indexes. These are different layers; a RAG framework is not itself a vector database, a language model or a hosted server.

## The problem that motivates these tools

Imagine answering five questions using five approved club documents. Without a framework, your program must load sources, split text, create embeddings if selected, store and retrieve evidence, assemble context, call a model, and return sources. Those steps are valuable to understand. As a project grows, reusable libraries may eliminate repetitive integration code.

```text
source documents → chunks and metadata → search/index → retrieved evidence
                                                      ↓
reader's question → query representation → retrieval → model → cited answer
```

No framework verifies citations automatically. Your code and evaluation still need to prove that cited passages support the answer.

## Six useful library families

| Option | Main problem it solves | When it may help | What to watch out for |
| --- | --- | --- | --- |
| **Direct model SDK + ordinary Python** | Call one model/provider and write your own retrieval logic | A small, transparent FastAPI app with one corpus | You must implement document/index interfaces and quality checks |
| **[LangChain](https://docs.langchain.com/oss/python/learn)** | Reusable model, document, retriever and tool integrations | You need to swap providers/components or reuse supported connectors | Abstractions and package versions can hide the exact data flow |
| **[LlamaIndex](https://developers.llamaindex.ai/python/framework/module_guides/indexing/)** | Data ingestion, chunks/nodes, indexing and querying over documents | The main challenge is searching and asking questions over a collection | Defaults may obscure index persistence, source IDs and retrieval choices |
| **[Haystack](https://docs.haystack.deepset.ai/docs/concepts-overview)** | Explicit components and wired document/AI pipelines | You want inspectable ETL and RAG stages with interchangeable retrievers | More pipeline configuration than a tiny application may need |
| **[LangGraph](https://docs.langchain.com/oss/python/learn)** | Stateful, multi-step agent/workflow orchestration | Long-running workflows with branches, interruptions or human review | Unnecessary for a simple retrieve-then-generate request |
| **[DSPy](https://dspy.ai/getting-started/program-dont-prompt/)** | Structured model tasks, metrics and program/prompt optimization | You have an evaluation set and want to improve extraction or answer quality | Optimization needs reliable examples, metrics and repeatable experiments |

**Related, but not a RAG framework:** [LiteLLM](https://docs.litellm.ai/docs/python_sdk) standardizes calls to many model providers and can help compare or route models. It does **not** supply a complete document ingestion, indexing and citation workflow. Microsoft's [Semantic Kernel](https://learn.microsoft.com/en-us/semantic-kernel/) is another option to research for enterprise AI integrations, especially in C#/.NET environments.

## What should an IS373 student choose?

**Start with the app and server you already have.** Your existing FastAPI app, SQLite or chosen database, and an authorized model API can be enough. Add a library only if you can name the repetitive work it removes, identify its new dependencies, and prove the output is still correct.

- If you have **five short documents and one question endpoint**, direct code often makes the retrieval trace easier to see.
- If you need **document loaders, splitters and vector-store adapters**, inspect LangChain or LlamaIndex components rather than adopting a whole agent system.
- If you need **several explicit processing stages**, investigate Haystack.
- If you want to **optimize a repeated extraction or generation task against a measured metric**, investigate DSPy.
- If you need **stateful tool-using agents**, look at LangGraph later; it is not required for this assignment.

A production system may combine pieces from several libraries. You are **not required to choose one framework for the whole application**.

## A tiny experiment for learning

Choose one question whose expected source passage you already know. Compare *the same input and output contract* using your own retrieval code and one optional library component.

Record the real query, selected source IDs, relevant passage, whether it supports the claim, number of dependencies, and what a classmate can explain from the code. Do not claim one is faster, cheaper or more accurate without measuring. Avoid changing providers, embedding models and chunking choices simultaneously: that makes comparisons hard to interpret.

### Copyable AI research prompt

```text
I'm an IS373 student. I already have [FastAPI app/database/model access].
My reader asks [question] about [permitted sources].
Compare direct Python with LangChain, LlamaIndex and Haystack for this task.
For each, show the smallest components needed, what code becomes hidden,
extra dependencies, persistence and citation responsibilities, and one
objective test. Link the CURRENT official docs for any suggested API.
Do not install libraries, rewrite my app, or claim a benchmark ran.
Finish by asking which tradeoff matters most to me.
```

### A note from the AI

> I can generate working-looking framework code very quickly. But if you cannot tell what text was retrieved, where it came from, or whether the model relied on it, the abstraction has hidden a lesson you need to learn. Ask me to show the **actual evidence objects and outputs**, not just a green test summary.

## What still belongs to you

Regardless of library: explain your source permissions, chunk/graph representation, retrieval method, model/provider, access controls, persistence, missing-evidence behavior, costs and test results. Compare a simple keyword/structured baseline with your chosen vector or graph approach. The [course brief](https://github.com/kaw393939/is373-studio/blob/main/docs/projects/individual.md) and Canvas are authoritative.

*Primary documentation reviewed November 11, 2026. Library APIs and versions change: check official documentation and pin compatible dependencies before implementing anything.*

[Start with your existing FastAPI application](from-app-studio.md) · [Compare database approaches](data-choices.md) · [Evaluate your RAG](check.md)
