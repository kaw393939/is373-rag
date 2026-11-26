---
title: Build a small RAG system
description: Add one hosted RAG feature to the app you already have. Verify each step from document import to search, model output, and a citation a reader can open.
teaser: Before you add chat to the interface, ask one question and look at what your search actually found. That one passage is your first useful checkpoint.
---

# Build one complete source-to-answer path

Choose a question that one of your documents answers. Write down its source ID and the words you expect to find. You now have a way to tell whether each part of the application works. If your FastAPI app and Docker/HTTPS setup already run, start there. [App Studio walkthrough](from-app-studio.md)

## Seven small steps

1. **Import.** Gather about five permitted documents. Give each one a stable ID and version. Keep the originals. Import a document twice and inspect what is actually stored.
2. **Prepare.** For text, compare splitting by paragraph or heading with splitting at a fixed size. Open a passage that broke in an awkward place. For a graph, link each entity and relationship to the passage that supports it. [Chunking guide](chunking.md)
3. **Index.** If you chose vectors, generate real embeddings, record the model version, and use a compatible encoder for questions. For a graph, store the actual relationships you found. Use keyword search as a baseline for comparison. [Embeddings guide](embeddings.md)
4. **Retrieve.** Ask the original question with generation turned off. Look at the returned passages or graph paths. Can you see the expected evidence and its source ID?
5. **Generate.** Give a real model the relevant passages it is authorized to see. Display its answer and a link to the source location. Open the link and check which words support the claim.
6. **Try missing evidence.** Ask about a detail the documents leave out. Can the system tell the reader what it cannot establish? If it supplies a detail anyway, inspect the retrieved passages and model output separately.
7. **Host and verify.** Open the HTTPS URL as a visitor. Keep credentials and database services private, limit public usage, and confirm that records survive a process restart. Save the working revision and your actual results.

Work in one issue or small change at a time. If AI helps, ask for the smallest patch, read the important code, run the test yourself, and link the commit or pull request.

## What to show at each checkpoint

| Stage | Something a classmate can check |
| --- | --- |
| Import | Source manifest, stored record, and what happened on repeat import |
| Retrieval | Question, expected evidence, and the passages or graph paths actually returned |
| Generation | Model/provider, the redacted context you supplied, and its actual response |
| Source support | One citation a reader can open, plus one question with insufficient evidence |
| Hosted operation | Working HTTPS link, durable data, safe logs, and the source revision |
| Improvement | A peer’s observation, the change you made, and the result of the same check |

For **Build**, demonstrate the small hosted import, retrieval, and chat path. For **Checked Release**, strengthen persistence, repeatable setup, evaluation, and citations. Canvas gives the official dates and instructions. [Course milestones](https://github.com/kaw393939/is373-studio/blob/main/docs/course/milestones.md)

## Start with what you have

Use your existing login, dashboard, repository, and server if they work. A [local reference lab](reference.md) lets you inspect source IDs and SQLite search before trying optional Ollama embeddings and generation. [RAG libraries](library-survey.md) are tools you can compare when you have a specific problem.

If your model is unavailable, keep building and testing real import and retrieval. Mark generation as unfinished. A fixed response can test how the page renders, but you still need to observe what a real model does with the evidence. [Troubleshooting](stuck.md) · [Evaluation guide](check.md)
