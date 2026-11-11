---
title: Optional runnable retrieval lab
description: Run a small local source-and-retrieval example without paid APIs, then try real Ollama embeddings and generation if available.
---

# Inspect a source-to-answer pipeline locally

The optional [student-reference folder](https://github.com/kaw393939/is373-rag/tree/main/student-reference) is a **teaching lab**, not a ready-to-submit hosted RAG application. It introduces stable source IDs, paragraph chunks, persisted SQLite FTS search, real Ollama embeddings and actual model generation.

The offline commands below need Python 3.10+ with SQLite FTS5 and **no model, paid key or network**:

```sh
python3 student-reference/rag_lab.py import --db /tmp/is373-reference.sqlite
python3 student-reference/rag_lab.py search --db /tmp/is373-reference.sqlite --question "Who organizes events?"
python3 -m unittest discover -s student-reference -p "test_*.py"
```

The search output contains **retrieved source IDs and text**, not a generated answer. Keyword retrieval alone is a **baseline**, not the assigned vector/graph implementation.

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

