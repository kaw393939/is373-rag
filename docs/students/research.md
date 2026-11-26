---
title: Research a reader’s question
description: Investigate a reader’s question with a permitted source, compare keyword, vector, and graph retrieval, and carry your findings into the IS373 project plan.
teaser: Before you choose how your app will search, find the answer yourself. What did you learn from the source that should change your design?
---

# Research a reader’s question

Imagine a new club member asks, “Who organizes the workshops, and when is the next annual meeting?” Open the [fictional club bulletin](https://github.com/kaw393939/is373-rag/blob/main/student-reference/fixtures/events.txt). Find the words that answer each part. Where would a confident answer go beyond the document?

## Read as your user

Try the same investigation with a reader and a question from your project. Choose a source you have permission to use. Keep its title, version or date, and the location of the passage beside your notes. If the passage answers only part of the question, write down what else you would need to learn. This gives you something concrete to look for when you test the app.

## Compare ways to find the evidence

Consider how a reader might ask the bulletin question using different words. Keyword search gives you a simple baseline. Vector retrieval could help match a paraphrase. A graph could connect the Events Committee to the workshops it organizes, with the bulletin as evidence for that link. Which approach would help with your question? What would each miss? Use the [database and RAG research handout](https://github.com/kaw393939/is373-studio/blob/main/docs/handouts/database-rag-research.md) to investigate both vector and graph retrieval before choosing what to build.

## Carry one finding into Plan

In your existing project record, keep the reader’s question, the passage you found, and one design decision it suggests. For the bulletin, you might write, “I want to keep the committee’s name beside the action it performs. I’ll compare what search returns when a document split separates those words and when it keeps them together.” The [chunking exercise](chunking.md) shows how to try that comparison.

Take your finding into [Plan](plan.md). Sketch how the reader will reach the passage and predict what your app should do when the source leaves part of the question open.
