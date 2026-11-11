---
title: Build a small RAG system
description: A bounded implementation path from permitted documents to real retrieval, generation, citations and hosted verification.
---

# Build one complete source-to-answer path

**Aim for a small, working system before adding features.** If retrieval vocabulary is unfamiliar, read [embeddings](embeddings.md) and [chunking](chunking.md) first. [Already have IS373 App Studio? Follow the FastAPI-to-RAG bridge](from-app-studio.md). [LangChain and other libraries are optional](library-survey.md). Reuse your current FastAPI application, Docker/HTTPS deployment and repository when possible. Do not replace existing services or pay for a new server simply to follow a tutorial.

## Seven small steps

1. **Import** around five permitted short documents. Assign stable source IDs, keep originals and record versions. Verify what the importer actually stores.
2. **Prepare** text and source locations. Try heading/paragraph chunks versus a fixed-size split; inspect one broken boundary. If using a graph, define entities and typed edges with source passages.
3. **Index** your chosen representation. For vectors, generate real embeddings with a recorded model version and compatible question encoder. For graphs, store real sourced relationships. A keyword baseline is useful but not a substitute for your chosen architecture.
4. **Retrieve** from a real question. Display the returned source/chunk IDs, passages or graph paths before asking a model to answer.
5. **Generate** with an actual accessible model/provider. Pass only authorized retrieved passages as context and show the answer with links to source locations. Model text is not automatically verified by a citation.
6. **Handle insufficient evidence.** Include one question the documents cannot answer. Show an honest missing-evidence response and inspect whether the model invented details.
7. **Host and verify.** Put the working app behind HTTPS, keep credentials and database services private, bound public use and demonstrate persistence after a process restart. Save the revision and actual check results.

Work in **one issue or small change at a time**. Ask AI for the smallest patch and an explanation; inspect the code, run the tests yourself, then link a commit/PR and note what changed.

## What to show at each checkpoint

| Stage | Evidence to retain |
| --- | --- |
| Import | Manifest, actual stored records and repeat-import result |
| Retrieval | Query, returned source IDs or graph paths and expected relevance |
| Generation | Actual prompt/context, model/provider identification and answer |
| Source support | Openable source location and a missing-evidence example |
| Hosted operation | Working HTTPS URL, database persistence, logs without secrets and chosen source revision |
| Improvement | Real peer observation, changed code/issue and retest |

For Nov 24 Build, the [course guide](https://github.com/kaw393939/is373-studio/blob/main/docs/course/milestones.md) expects a small **hosted** import → retrieval → chat journey. For Dec 3, strengthen persistence, repeatable setup, evaluation and references. Canvas remains authoritative.

## Start with what you have

If your existing app already has login, a dashboard or a working server, **do not rewrite those parts**. Add a tiny permitted corpus and inspect the import/retrieval path first. Use the [optional local reference](reference.md) for source IDs, SQLite/FTS and an Ollama-backed vector/generation exercise; it is **not** a hosted assignment solution or a mandatory technology choice.

If a model is unavailable, develop the import and retrieval stages against fixed expected results, but label the unfinished generation stage accurately. Never claim a mock response proves RAG. See [debugging help](stuck.md) and [verification](check.md).

