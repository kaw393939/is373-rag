---
title: Plan your individual RAG
description: Select a user, five permitted sources, a justified retrieval method and questions you can evaluate.
---

# Plan one useful source-backed question

You do **not** need a working RAG application for the Plan review. You need a small, defensible design that you can build next. Reuse the portfolio, FastAPI app, server and Git workflow you already have where practical.

## 1. Define the reader and the question

Complete: **“My application helps [reader] answer [type of question] using [permitted content].”**

Good source domains are small and verifiable: fictional club policies, public product instructions with permitted use, your own tutorials, or synthetic help-center articles. Avoid private student records and other confidential information.

## 2. Select about five documents

Keep one row per source: stable ID, title, origin/URL, author or owner, version/date, permission, and intended questions. Label synthetic content explicitly. A publicly readable document is not automatically licensed for redistribution.

## 3. Compare retrieval approaches before choosing

| Method | Good for | What to investigate |
| --- | --- | --- |
| Keyword/SQL baseline | Exact names, codes and phrases | Paraphrases can be missed |
| Vector | Semantically related passages | Similarity is not proof or identity |
| Graph | Named entities and typed relationships | Wrong/missing edges distort answers |
| Hybrid | Combining evidence types | Additional complexity needs justification |

**The assignment asks you to research vector and graph approaches, but you may implement vector, graph or both.** Do not build an unused database to satisfy a diagram. Document which retrieval method you selected and why a simpler baseline might fail.

## 4. Sketch the path

```text
permitted source → import/clean → chunk or graph representation
                 → persistent retrieval → question → context
                 → real model → answer + checkable references
```

Specify how source IDs and locations survive each step. For vector retrieval, include embedding model/version and the query's compatible encoder. For graph retrieval, include entity types, relationship types and supporting passages.

## 5. Write expected behavior before implementation

Begin with five questions: exact-term, paraphrase, relationship (when relevant), ordinary useful, and intentionally unanswerable. Record the expected supporting sources **before** running the model.

Two essential checks: repeat import should not create unintended duplicates; missing evidence should not result in an invented answer.

## 6. Record one decision and one next experiment

Name two plausible approaches, your choice, costs or constraints, and a small experiment that might change your mind. Keep planned evidence labeled *planned* rather than claiming the test passed.

Use the existing [project record](https://github.com/kaw393939/is373-studio/blob/main/docs/templates/project-record.md) under **2. Individual RAG app + technical research**. [Copy the Plan agent prompt](prompts.md#plan-prompt).

