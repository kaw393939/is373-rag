---
title: "A research walkthrough"
description: "Follow three fictional harbor reports through source tracing, identity review, publication, an interrupted answer, and portable export."
teaser: "Three reports describe a light near a harbor. How many independent witnesses saw it move? Give a classmate the line that supports your count."
---

# One incident. Several accounts.

Open the [ten-minute source-check exercise (.txt)](/kits/three-report-source-check.txt) and read reports A, B, and C. Before you reach the discussion notes, write down how many independent witnesses saw the light move. Quote one line, include its ID, and name one thing these fictional reports leave open.

<details class="source-check-answer">
<summary>Compare your witness count and quoted line</summary>

One witness describes movement. In A2, Alex Lee says, “I saw a white light move from the crane toward the east pier.” B1 identifies the harbor log as the bulletin’s source. C2 describes a light that stayed still. C3 leaves open whether the witnesses saw the same object.

</details>

The rest of the walkthrough follows the design for a future Ordo application. Use the same three reports to ask what the software would need to preserve.

## 1. Import three reports

Give the harbor log, the bulletin, and the dispatch note their own records. For a second test, imagine that two reports use different names for the incident and two people share the name Alex Lee.

Preserve each acquisition and source version. Identical bytes can share an artifact without erasing where each copy was obtained.

## 2. Review the proposals

Underline the exact words about movement on each card. Draw a line from B to A and write “quotes.” Before joining the two people named Alex Lee, identify what evidence would justify that decision.

Approve the incident alias only when context supports it. Keep the two people separate unless evidence establishes identity. Record the copied report's dependence. Preserve both movement descriptions instead of averaging them into a new story.

## 3. Publish a revision

Review an immutable proposal against a known base revision. Publication validates identity assignments, evidence references, rights and permissions, then commits changes and their event together.

A later source or changed proposal requires a new review. No half-published result should survive a failed transaction.

## 4. Ask a research question

> Which independent accounts describe movement, and where do their descriptions conflict?

Chat retrieves authorized evidence from one published revision. Its answer streams with citations opening exact passages. The evidence panel identifies source dependence and unresolved assessments.

Compare the draft with your own answer. Can you open each passage and see which report quoted another?

## 5. Test an interruption

Stop a run or disconnect the browser. Committed partial text and the recorded outcome remain inspectable. Reconnection does not silently start another paid generation.

Reimport the same material: accepted records should not multiply. Correct a mistaken merge: the earlier decision should remain auditable.

## 6. Move the library

Export the approved revision and open it on Linux without the Mac worker. Evidence remains readable. Missing capabilities are reported; unavailable semantic query encoding produces a clearly narrower search mode.

## What students should explain

Hand a classmate your three cards. Can they trace a statement to its source, count independent observations, and name one question the evidence leaves open? Then ask an engineering question: what should still be visible if the application crashes halfway through publishing your review?

Use the [requirements](../project/acceptance.md) for acceptance criteria and the [executable labs](../engineering/examples.md) for runnable, narrower contracts.

## From the journal

What happens when a search returns six articles that all quote one interview? In <JournalLink class="journal-article-link" to="/research/systems/provenance-knowledge-graphs">Six Articles, One Witness</JournalLink>, I explain how I would trace those articles back to the interview and keep a conflicting account visible.
