---
title: Optional runnable retrieval lab
description: Run the Knowledge Lab’s free offline retrieval exercise with Python and SQLite, inspect a cited passage, and optionally try real embeddings and generation.
teaser: Five fictional documents are enough to see search work. Run the importer twice, ask who organizes events, and open the exact passage you got back.
---

# Inspect a source-to-answer pipeline locally

The [student-reference folder](https://github.com/kaw393939/is373-rag/tree/main/student-reference) is a runnable local exercise. You can finish the first four steps with Python, SQLite, and the included fictional documents. The optional model extension comes afterward.

Your individual assignment uses your own hosted app and sources. This lab lets you see what import and retrieval look like before you connect them to a model.

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

**What just ran?** SQLite searched for text and returned a stored passage. You supplied no model and asked it to generate nothing. Keep that distinction when you explain this keyword baseline or compare it with your chosen vector or graph method.

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

A passing test here checks local data handling. You still need to verify model quality, authentication, the web interface, public deployment, and your chosen retrieval workflow in your own app. Keep public accounts and remote inference credentials in that app’s appropriate configuration. Use the [original assignment](https://github.com/kaw393939/is373-studio/blob/main/docs/projects/individual.md) as your project checklist.

[Read the build steps](build.md) · [Try the agent prompts](prompts.md)

