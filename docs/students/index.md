---
title: IS373 student RAG guide
description: Finish the existing individual RAG assignment with a small source-backed application, guided steps and AI coding prompts.
---

# Build a small RAG system you can explain

**Start with one useful question, around five permitted documents, and a visible source-to-answer trace.** You do not need to build Ordo Knowledge Lab or train a model to finish your IS373 independent project.

This is **optional help**, not a new assignment, grade, submission or required stack. The authoritative instructions are the [IS373 individual RAG brief](https://github.com/kaw393939/is373-studio/blob/main/docs/projects/individual.md), [research handout](https://github.com/kaw393939/is373-studio/blob/main/docs/handouts/database-rag-research.md), and Canvas.

**New here?** [Spend your first 15 minutes finding a real source passage](reference.md#your-first-15-minutes). No API key or model download needed.

**Choosing an AI provider?** [Compare Groq, Gemini, OpenAI, Claude and DeepSeek, and learn to budget tokens](ai-costs.md).

## Choose your next step

| Where you are | Go here |
| --- | --- |
| Unsure what to build | [Plan one question and small source set](plan.md) |
| Ready to implement | [Build the smallest complete source-to-answer path](build.md) |
| Want AI coding help | [Copy a bounded agent prompt](prompts.md) |
| Something doesn't work | [Diagnose one failure at a time](stuck.md) |
| Have an answer and need evidence | [Run five evaluation questions](check.md) |
| Want a safe, inspectable example | [Optional local retrieval lab](reference.md) |

## The five things your demo should show

1. **Import:** where the permitted sources came from and what was stored.
2. **Represent:** how text becomes chunks/vectors or graph relationships with source IDs.
3. **Retrieve:** which source IDs or graph paths a real question returned.
4. **Generate:** how a real model used that evidence, with usable source references.
5. **Check:** what happened on a missing-evidence question and what you improved.

Research **both vector and graph approaches**, then justify implementing vector, graph or both. A keyword-only baseline or a mocked model is helpful for learning but is **not** the finished RAG application.

## Keep your three deliverables separate

Your **portfolio** presents your professional direction and showcases the app. Your **individual RAG app** is this technical product. Your **group system** is a separate shared content workflow. Keep the existing individual and group project records; do not create another weekly report for this guide.

## Pacing from the course guide

| Stage | Course guide date (2026, Eastern) | Useful next result |
| --- | --- | --- |
| Plan | Nov 17, 1 p.m. | Reader, sources, chosen retrieval approach, evaluation questions |
| Build | Nov 24, 1 p.m. | Hosted small real import → retrieval → chat |
| Checked Release | Dec 3, 1 p.m. | Persistent hosted app, sources, actual checks, repeatable setup |
| Improve | Dec 10, 11:59 p.m. | Peer feedback, meaningful fix and retest |
| Demo | Dec 18 | Explain the system and show your real evidence |

Use [course milestones](https://github.com/kaw393939/is373-studio/blob/main/docs/course/milestones.md) and Canvas for official instructions. Dates here summarize the published guide, not a Canvas update.

**Start small. Show one working path. Be able to explain it.**

