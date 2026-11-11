---
title: Optional runnable retrieval lab
description: Run a small local source-and-retrieval example without paid APIs, then try real Ollama embeddings and generation if available.
---

# Inspect a source-to-answer pipeline locally

The optional [student-reference folder](https://github.com/kaw393939/is373-rag/tree/main/student-reference) is a **teaching lab**, not a ready-to-submit hosted RAG application. It introduces stable source IDs, paragraph chunks, persisted SQLite FTS search, real Ollama embeddings and actual model generation.

## Your first 15 minutes

**Goal:** find a passage and explain why it answers your question. This is a suggested pace, not a timed task or submission.

### 1. Get the example (about 3 minutes)

You need Python 3.10+ with SQLite FTS5. No API key or model is needed. In a terminal:

```sh
git clone https://github.com/kaw393939/is373-rag.git
cd is373-rag
python3 --version
```

Already downloaded this repository? Open a terminal in its folder instead. Without Git, use **Code → Download ZIP** on GitHub, extract it, and open that folder. You should see a folder named `student-reference`.

### 2. Import the five fictional documents (about 3 minutes)

```sh
python3 student-reference/rag_lab.py import --db student-reference/lab.sqlite
```

Expect five imported sources on the first run. Run it again: expect five **unchanged** sources rather than duplicates. The database stays on your computer.

### 3. Ask for a passage (about 4 minutes)

```sh
python3 student-reference/rag_lab.py search --db student-reference/lab.sqlite --question "Who organizes events?"
```

Look at the returned source ID, filename and passage. Open the matching file in `student-reference/fixtures` and read it yourself. Can you point to the words that answer the question?

This output is **retrieved text, not a generated answer**. Keyword search is a useful baseline, not the assignment's finished vector/graph RAG implementation.

### 4. Check your setup and explain it (about 5 minutes)

```sh
python3 -m unittest discover -s student-reference -p "test_*.py"
```

A successful test run ends with **OK**. Try another question and compare the passages. Explain the path in your own words: document → chunk → search result. No extra report is required.

If `python3` is unavailable on Windows, try `py -3` in its place. If Python reports a missing file, return to the repository folder. If it reports a missing FTS5 module, use a Python installation with SQLite FTS5; do not buy an API subscription to fix an offline database problem.

**Next:** [build a small complete application](build.md). Keep your own topic and sources; these fictional fixtures are just practice.

## Optional: add a real model

If Ollama and compatible local models are already available, follow the [lab README](https://github.com/kaw393939/is373-rag/blob/main/student-reference/README.md) to generate **real embeddings** and run a model with visible evidence. Do not claim those features work on your machine until you run them.

## How to use the lab

1. Predict which permitted fictional document should answer a question.
2. Import twice and inspect unchanged source/chunk counts.
3. Run lexical search and inspect its source IDs.
4. Compare real vector search **only if** your model backend is available.
5. Test a missing-evidence question and inspect what the model actually says.
6. Adapt small ideas to your existing FastAPI/server project instead of copying the whole reference as your individual app.

The lab deliberately omits public authentication, user accounts, web UI, remote inference credentials and deployment. Its tests exercise local data handling, **not** a complete hosted system or model quality. Keep the [original assignment](https://github.com/kaw393939/is373-studio/blob/main/docs/projects/individual.md) as your checklist.

[Read the build steps](build.md) · [Try the agent prompts](prompts.md)

