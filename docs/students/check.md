---
title: Evaluate and explain your RAG
description: Test five kinds of questions against your RAG app, check what each cited passage supports, and use a classmate’s observation to verify one improvement.
teaser: An answer can sound right and cite the wrong page. Predict where the evidence should be, then open the passage your app actually returned.
---

# Check the system, not just the chatbot

Write your question and expected source ID before you ask the model. Run the question, open the citation, and point to the words that support the claim. A link that opens is a working link. Reading the passage tells you whether the answer is supported.

## Five questions to prepare

| Kind | Example using fictional club policies | What to look for |
| --- | --- | --- |
| Exact term | What is the membership fee? | The policy names the fee. |
| Paraphrase | How does a new member ask for help? | The passage gives the right instructions even if it uses different words. |
| Relationship | Which committee organizes events? | A passage or sourced graph relationship connects the committee and events. |
| Practical | What should a visitor do before attending? | Each important step appears in the sources. |
| Unanswerable | What is the date of next year’s annual meeting? | If the date is missing, the answer says so. |

Use questions from your own domain and include a missing-evidence case you have checked yourself. A text passage can support a relationship even if your project uses vector search. Five questions give you a small, repeatable check for this project.

## Record one row per question

| Put in the row | Why it matters |
| --- | --- |
| Question and predicted evidence | Keeps your expectation visible before the result arrives. |
| Actual source/chunk IDs or graph paths | Shows what retrieval found, even if the model later answered incorrectly. |
| Generated answer and model/provider | Identifies the response and model version where available. |
| Citation and claim it supports | Lets a second reader inspect the same words. |
| Failure, change, and retest | Shows whether your change affected the case that broke. |

Test repeat import with the same source and again with one edited version. Compare stored IDs and counts. Then try the hosted app as an ordinary visitor and verify that importing, deleting, viewing credentials, and administration stay restricted.

## Peer walkthrough

Give a classmate the hosted URL and a question the documents answer. Let them work without a narrated tour. Then ask them to try a question with missing evidence and open a reference. Where did they expect to click? What did they think the answer claimed? Pick one observed problem, change it, and ask them to retry the same step. An AI rehearsal can help you prepare for this real peer review.

## Explain your choices

Walk through your demo in this order: the reader’s problem, the real app, one source-to-answer trace, an actual check, and your contribution. Explain where the database stores the evidence, how your vector or graph search finds it, what the model generates, and where the citation leads. If a choice did not work, show the result and what you learned from it.

Canvas and the [course milestones](https://github.com/kaw393939/is373-studio/blob/main/docs/course/milestones.md) govern submissions and grading. [Rehearse the demo with an optional prompt](prompts.md#demo-prompt) · [Back to the student guide](index.md)
