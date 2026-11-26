---
title: Plan your individual RAG
description: Plan an IS373 RAG app around one reader, five permitted documents, a retrieval choice, and questions you can use later to check whether the app works.
teaser: Could you point to a passage that answers your reader’s first question? Find it before you choose a database or ask an agent to write code.
---

# Plan one useful source-backed question

For the Plan review, bring a design you can explain and test. You’ll build the working app later. Reuse your existing portfolio, FastAPI app, server, and Git workflow where they fit.

## 1. Define the reader and the question

Complete this sentence: **“My application helps [reader] answer [type of question] using [permitted content].”** For example, a new club member might need to know how to sign up for an event. What document would a person open to answer them?

Use a small, checkable collection such as your own tutorials, fictional club policies, or product instructions you have permission to use. Keep confidential material, including private student records, out of the corpus.

## 2. Select about five documents

Keep one row per source with its stable ID, title, origin or URL, author or owner, version/date, permission, and the questions it can answer. Mark synthetic documents as fictional. Check permission to reuse or redistribute a public document before choosing it.

## 3. Compare retrieval approaches before choosing

| Approach | A reason to try it | A case to test |
| --- | --- | --- |
| Keyword/SQL baseline | Find an exact name or phrase. | What if the reader uses different words? |
| Vector | Find passages with related meanings. | Does a similar passage actually answer this question? |
| Graph | Follow a named relationship between entities. | Does each link point back to evidence? |
| Hybrid | Combine different kinds of evidence. | Does the combination fix a failure worth the added work? |

Research **both vector and graph approaches**. Implement vector, graph, or both based on your question. Explain what your choice adds beyond a keyword baseline and which result might cause you to reconsider.

## 4. Sketch the path

Trace one document into storage, then trace one question back out.

```text
permitted source → import/clean → chunk or graph representation
                 → persistent retrieval → question → context
                 → real model → answer + checkable references
```

Mark where the source ID and location survive each step. For vectors, identify the embedding model/version and compatible question encoder. For a graph, name the entities, relationship types, and supporting passages.

## 5. Write expected behavior before implementation

Prepare five questions: an exact term, a paraphrase, a relationship where relevant, an ordinary practical question, and one your documents cannot answer. Write the expected evidence before running anything.

Also decide how you’ll check repeat import. If importing the same document twice doubles the stored passages, you’ve found a problem worth fixing. If the model supplies a made-up date for a question with missing evidence, that’s a separate failure.

## 6. Record one decision and one next experiment

Record two plausible approaches, your choice, and one cost or constraint that affected it. Name a small experiment that could change your mind. Until you run the experiment, label the outcome *planned*.

Use the existing [project record](https://github.com/kaw393939/is373-studio/blob/main/docs/templates/project-record.md) under **2. Individual RAG app + technical research**. [Optional Plan prompt](prompts.md#plan-prompt)
