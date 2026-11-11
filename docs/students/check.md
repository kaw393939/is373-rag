---
title: Evaluate and explain your RAG
description: Five source-grounded evaluation questions, meaningful checks and a simple human peer-review routine.
---

# Check the system, not just the chatbot

A fluent answer is not proof of a good retrieval system. Write what evidence you expect *before* generating answers. Record actual outputs and compare them with the original sources.

## Five questions to prepare

| Kind | Example using fictional club policies | What you inspect |
| --- | --- | --- |
| Exact term | What is the membership fee? | Can retrieval find the named policy? |
| Paraphrase | How does a new member ask for help? | Can retrieval find equivalent wording? |
| Relationship | Which committee organizes events? | Does your chosen representation preserve the relationship? |
| Practical | What should a visitor do before attending? | Are all important claims supported? |
| **Unanswerable** | What is the date of next year's annual meeting? | Does the system admit missing evidence rather than invent it? |

Replace these with **your own domain's** questions; the examples are not an answer key. A relationship question may be answered from text even without a graph. Don't pretend a tiny evaluation set measures general product quality.

## Record one row per question

| Field | Write down |
| --- | --- |
| Question and expected source IDs | Prediction made before querying |
| Retrieved source/chunk IDs or graph paths | Actual observed output, not a screenshot of an AI explanation |
| Generated answer and model/provider | Real execution, identifiable version where available |
| Citation quality | Did the cited passage actually support the particular claim? |
| Failure and change | What broke? What did you change and retest? |

**Test import twice.** Check stored IDs/counts after repeated identical sources and after one edited source. **Test access.** A public visitor should not be able to import, delete, inspect secrets or use administrative endpoints.

## Peer walkthrough

Ask a real classmate to open the hosted app without a narrated tour. Have them ask one supported question and one missing-evidence question, then open a reference. Record their actual confusion or failure, make a bounded change, and rerun the same test. An AI role-play can prepare you but is **not** real peer review.

## Explain your choices

Be able to say why you chose vector, graph or hybrid retrieval; what chunking, identity and source metadata mean; what an embedding represents; what the database stores; what a model generates; and how you know an answer is or isn't supported.

At Demo Day, show **problem → real app → source/retrieval/answer trace → actual checks → individual contribution**. The [course milestones](https://github.com/kaw393939/is373-studio/blob/main/docs/course/milestones.md) and Canvas control official submissions and grading.

[Copy an evaluation agent prompt](prompts.md#8-rehearse-the-actual-course-demo) · [Back to student guide](index.md)

