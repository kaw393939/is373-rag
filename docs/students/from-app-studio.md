---
title: From App Studio to your hosted RAG
description: Extend the FastAPI app you already deployed. Add import, real retrieval, a model response, and a source link, then test the same path on your server.
teaser: You already have a server and an app. Follow one document through the new feature while keeping the accounts, routes, and deployment that work.
---

# From your existing FastAPI app to a small hosted RAG

Start in your own working repository. [App Studio](https://github.com/kaw393939/is373-app-studio) supplied the FastAPI app, accounts, and permissions. [Server Studio](https://github.com/kaw393939/373_hosting) supplied the Docker, Traefik, and HTTPS setup. This optional walkthrough adds a single feature to that foundation.

Choose a permitted document, a question it answers, and a model you can access. Your finished path needs real retrieval and generation. If those pieces are unfamiliar, try the [local retrieval lab](reference.md), [embeddings](embeddings.md), or [chunking](chunking.md). Add a [library](library-survey.md) only when you can name the job you need it to do.

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

**Check your starting point.** Find one existing route, the function that registers it, the code that writes to the database, and the settings that hold secrets. If a part is unclear, bring that file and one question to class.

## Checkpoint 2 — Trace one original source

Choose one permitted short document and one useful question. Give the source a stable ID, title, origin, version/date and permission note. Prepare a chunk with a source location, or a graph entity/relationship that points back to an actual passage. First inspect this with the [15-minute offline lab](reference.md#your-first-15-minutes) if that helps.

**Try it twice.** Import the same document again and compare the stored IDs and counts. Then edit a copy, import the new version, and check that retrieval can find the changed passage. Keep any unrun checks marked as planned.

## Checkpoint 3 — Add one narrow retrieval feature

Ask your AI coding partner to help add a **small feature router** to your existing FastAPI app (for example, `app/features/rag.py`), with one `POST /api/rag/ask` route and separate import/retrieval/generation functions. These are example names, **not** required file or endpoint names.

Give ordinary visitors access to the question flow. Restrict import to an authorized account or a trusted command-line tool. Have the retrieval stage return evidence IDs in test or debug output. Keyword search gives you a baseline, then implement the vector or graph retrieval you chose.

**Check the feature in isolation.** Ask a supported question and inspect the actual IDs, passages, or graph paths returned. Try a question with no supporting passage. Run the existing App Studio checks, including APP-001–003, along with focused checks for the new feature.

## Checkpoint 4 — Generate a grounded answer

Use a model/provider you can actually access. Send only relevant **authorized** retrieved evidence to the model through server-side configuration. Keep provider credentials out of JavaScript, commits, screenshots and logs.

Display both the answer **and independently openable references**. Ask the model to abstain when evidence is missing, but don't trust the prompt alone: test an unanswerable question, inspect output and explain what remains uncertain.

**Check:** Save the actual retrieval results, the redacted context supplied to the model, the actual model response, and which claims the cited sources support. Canned text is a UI mock, not completed RAG.

## Checkpoint 5 — Deploy the same app you tested

Reuse the existing student server and Docker/Traefik/HTTPS setup. Put persistent data in an appropriate Docker volume or other durable store. Keep database services private, restrict administrative routes, and bound usage/cost for a public demo. **Don't change DNS or discard a working calculator service without checking first.**

**Check:** Open the HTTPS app as a visitor, ask a supported and unsupported question, click a cited source, then restart the app and confirm the stored sources remain. Preserve the exact working source revision and a safe deployment procedure.

## What to show in class

For **Plan**, bring the source plan, vector/graph comparison, sketch, and expected evidence. For **Build**, show a small hosted journey from import through retrieval to generation. At **Checked Release**, demonstrate persistence, usable citations, repeatable setup, and evaluation. For **Improve**, act on a real peer observation and retest. Use Canvas for deadlines and demo arrangements.

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
