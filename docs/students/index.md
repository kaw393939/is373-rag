---
title: IS373 student RAG guide
description: Build a small hosted RAG app for IS373, starting with documents you can use and ending with an answer a classmate can trace to a real passage.
teaser: Pick a question that matters to one reader. A small set of sources is enough to test how your app finds an answer and what it does when the answer is missing.
---

# Build a small RAG system you can explain

Imagine a new club member asking who organizes events. Can your app find the relevant line in a handbook, use it to answer, and let the reader open it? What happens if the member asks for a date the handbook leaves out?

That’s the idea behind **retrieval-augmented generation (RAG)**. Your system retrieves relevant material, then gives that material to a model to help it answer. Start with one reader, one useful question, and about five short documents you have permission to use.

**If this is your first RAG project**, [run the club example](reference.md#your-first-15-minutes). You’ll ask who organizes events and open the passage your search returns. Python and the included documents are enough to start.

**If you already have a topic**, [write one question for your reader](plan.md) and point to the sentence in your own documents that should answer it. That prediction will give you a first test.

These pages are optional project support. Use the [individual assignment](https://github.com/kaw393939/is373-studio/blob/main/docs/projects/individual.md), [research handout](https://github.com/kaw393939/is373-studio/blob/main/docs/handouts/database-rag-research.md), and Canvas for the actual requirements. You can use a model you already have access to.

## Choose your next step

| If you want to… | Start here |
| --- | --- |
| Understand how search works | [Try embeddings](embeddings.md), [compare ways to split a document](chunking.md), or [compare databases and retrieval methods](data-choices.md) |
| Use software you’ve already built | [Extend your FastAPI app and Docker deployment](from-app-studio.md) |
| Get a complete question-to-answer path working | [Build one small feature at a time](build.md) |
| Compare tools and costs | [Check which libraries help](library-survey.md) and [compare AI providers and token budgets](ai-costs.md) |
| Ask a coding assistant for help | [Choose a prompt for your next step](prompts.md) |
| Find out why an answer is wrong | [Trace one failure](stuck.md) or [compare the result with an expected source](check.md) |

## The five things your demo should show

1. Open a permitted original document and the record your importer actually stored.
2. Show how a passage became a chunk or a sourced graph relationship.
3. Ask a question. Inspect the source IDs, passages, or graph paths the search returned.
4. Show the answer from a real model and open a reference that supports a particular claim.
5. Try a question the sources cannot answer. Show what happened and one improvement you checked.

Research both vector and graph retrieval. Your app can implement either approach or a combination you can justify. Keyword search helps establish a baseline. A mock response can help you build the interface. The finished individual project needs real retrieval and model generation. [Inspect the optional local lab](reference.md).

## Keep your three deliverables separate

Your **individual RAG app** answers questions from your chosen sources. Your **portfolio** presents your professional direction and provides a place to show that work. The **group content system** is a shared workflow with identifiable contributions from each member. Use the existing project records.

## Pacing from the course guide

At **Plan**, show your reader, sources, retrieval choice, and expected evidence. At **Build**, show a small hosted journey from import through retrieval to an answer. At **Checked Release**, verify persistence, citations, and repeatable setup. At **Improve**, use real peer feedback, make a change, and try the same check again.

Individual and group projects finish in the **final week of class**. Use Canvas for the dates and demo slots. The [course roadmap](../course-roadmap.md) links to each Canvas assignment and explains the exception for extenuating circumstances. [Course milestone guide](https://github.com/kaw393939/is373-studio/blob/main/docs/course/milestones.md)
