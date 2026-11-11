---
title: From App Studio to your hosted RAG
description: A gentle bridge from the current FastAPI template and Docker server to the original IS373 individual RAG requirements.
---

# From your existing FastAPI app to a small hosted RAG

**Do not rebuild your server or replace your existing app.** [IS373 App Studio](https://github.com/kaw393939/is373-app-studio) teaches FastAPI, accounts and permissions; [Server Studio](https://github.com/kaw393939/373_hosting) covers Docker, Traefik and HTTPS. This walkthrough connects them to your **own** individual RAG project.

This is an optional pathway, not new Canvas work. A working hosted RAG demonstration still needs actual **retrieval and model generation**. The [local retrieval lab](reference.md) is preparation, not a submission. LangChain and similar [libraries](library-survey.md) are choices to research, not requirements.

## Picture the smallest complete product

```text
Five permitted source documents
  → importer → source IDs + chunks (or sourced graph relationships)
  → persistent index
  → question in YOUR FastAPI app
  → real retrieval: source IDs and passages/paths
  → real model call with selected evidence
  → answer and openable source references
```

If you choose vectors, use **real compatible embeddings** for both corpus and query. If you choose a graph, trace real relationships to original passages. You must research both approaches but implement only the one(s) you justify.

## Checkpoint 1 — Understand your own starting point

Open **your student repository**, not the instructor's template. Locate `app/main.py` and `create_app()`. Find the existing feature routers (`app/features/`), persistence/configuration, templates and tests. Identify your actual server URL and working Docker/HTTPS deployment. Don't alter accounts, roles, domains or unrelated services.

**Explain:** Which function registers a route? Which part controls a database write? Which settings hold secrets? Bring one specific blocker to class, not a vague request to start everything over.

## Checkpoint 2 — Trace one original source

Choose one permitted short document and one useful question. Give the source a stable ID, title, origin, version/date and permission note. Prepare a chunk with a source location, or a graph entity/relationship that points back to an actual passage. First inspect this with the [15-minute offline lab](reference.md#your-first-15-minutes) if that helps.

**Check:** Import the same data twice without duplicate records. Change a copied source and prove the updated representation can be found. Mark planned checks as planned until executed.

## Checkpoint 3 — Add one narrow retrieval feature

Ask your AI coding partner to help add a **small feature router** to your existing FastAPI app (for example, `app/features/rag.py`), with one `POST /api/rag/ask` route and separate import/retrieval/generation functions. These are example names, **not** required file or endpoint names.

Keep ingestion restricted to an authorized account or trusted CLI; don't expose arbitrary import to visitors. Retrieval should expose traceable evidence IDs in debug/test output. Start with a keyword baseline, then build the chosen **real vector or graph retrieval**. Don't send the entire document collection to a model and call that retrieval.

**Check:** A question produces actual retrieved IDs/passages or graph paths; an unsupported question can be recognized. Run existing App Studio checks and add focused tests without weakening APP-001–003 behavior.

## Checkpoint 4 — Generate a grounded answer

Use a model/provider you can actually access. Send only relevant **authorized** retrieved evidence to the model through server-side configuration. Keep provider credentials out of JavaScript, commits, screenshots and logs.

Display both the answer **and independently openable references**. Ask the model to abstain when evidence is missing, but don't trust the prompt alone: test an unanswerable question, inspect output and explain what remains uncertain.

**Check:** Save the actual retrieval results, the redacted context supplied to the model, the actual model response, and which claims the cited sources support. Canned text is a UI mock, not completed RAG.

## Checkpoint 5 — Deploy the same app you tested

Reuse the existing student server and Docker/Traefik/HTTPS setup. Put persistent data in an appropriate Docker volume or other durable store. Keep database services private, restrict administrative routes, and bound usage/cost for a public demo. **Don't change DNS or discard a working calculator service without checking first.**

**Check:** Open the HTTPS app as a visitor, ask a supported and unsupported question, click a cited source, then restart the app and confirm the stored sources remain. Preserve the exact working source revision and a safe deployment procedure.

## What to show in class

At **Plan (Nov 17)** bring the source plan, vector/graph comparison, a sketch and expected-evidence questions. A working RAG app is **not required yet**. At **Build (Nov 24)** demonstrate a **small real hosted import → retrieval → generation journey**. By **Checked Release (Dec 3)** improve persistence, source citations, repeatability and actual evaluation; by **Improve (Dec 10)** address real peer feedback. Follow Canvas for official deadlines.

## Copyable AI coding-agent request

```text
I'm extending MY existing IS373 App Studio repo for the individual RAG
assignment. Read README.md, AGENTS.md, SPEC.md, app/main.py and the current
routers/settings/tests. First tell me what already works and ask me to
confirm my permitted corpus and model access. Do not edit yet.

I need ONE small import → retrieval → model answer path with traceable
sources, using my existing FastAPI, auth, persistence and server setup.
Research vector and graph but implement only the justified choice.
Propose the next smallest issue, a 3–5-step plan and observable checks.
When I approve, make a bounded change and run REAL tests; don't claim a
mock is generation or a keyword baseline is a vector/graph system.
Never reset my app, server, database, DNS or permissions to make progress.
Show me code paths, actual outputs and one question to check my understanding.
```

The [original assignment](https://github.com/kaw393939/is373-studio/blob/main/docs/projects/individual.md) is the grading authority. The goal is a result students can **understand, defend and improve**, not the largest framework.

[Back to student guide](index.md) · [Library survey](library-survey.md) · [AI coding prompts](prompts.md) · [Five evaluation questions](check.md)
