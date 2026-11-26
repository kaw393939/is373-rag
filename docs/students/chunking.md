---
title: Chunking, source structure and retrieval
description: "See how a document split can separate a rule from its exception. Compare two chunking strategies in an offline lab using source IDs and real questions."
teaser: "The right paragraph can lose its meaning at a page break. Two small experiments show which cuts preserve the evidence a reader needs."
---

# Chunking: where should we cut a document?

A travel handbook says, “Your manager approves reimbursements,” then adds an exception on the next page. An assistant retrieves only the first page. It can quote every word correctly and still send an employee to the wrong person.

**Chunking** divides documents into pieces your search system can return. A useful piece carries enough context to interpret the claim and a source ID and location that let the reader check it. Choose a boundary by trying questions your users will ask. Document structure, model limits and the cost of retrieving extra text all matter. [Technical overview of chunking strategies](https://www.pinecone.io/learn/chunking-strategies/)

Start with the [club bulletin](#one-fictional-example), then [try two splits without an API key](#two-experiments-you-can-do-without-an-api-key).

## One fictional example

\`\`\`text
SOURCE: S-events — Harbor Club bulletin, section "Events"
[Paragraph 1] The Events Committee organizes monthly workshops.
[Paragraph 2] Visitors must sign in at the welcome desk.
[Paragraph 3] The date of the next annual meeting has not been announced.
\`\`\`

**Option A: fixed-size character chunks.** Easy to implement, but a boundary could split “Events Committee organizes” across two chunks. *Characters and model tokens are not interchangeable units.*

**Option B: paragraph/heading chunks.** Keeps each statement together and helps preserve the section title, but a paragraph can be too long or need neighboring context.

**What should the citation say?** Keep the parent source and the location with each piece. The ID `S-events-C02` directs a reader back to one slice of `S-events`. It lets them recover the surrounding paragraph and check the meaning.

## Choose a boundary deliberately

| Strategy | Why developers use it | Common failure |
| --- | --- | --- |
| Fixed length | Simple, predictable processing limits | Breaks sentences, tables, names or claims |
| Sliding window/overlap | Carries some context across boundaries | Duplicates content, increases cost and may skew rankings |
| Paragraph or heading | Respects the author's structure | Oversized paragraphs, uneven chunk lengths |
| Recursive splitting | Tries larger boundaries then smaller ones | Still depends on length limits and separators |
| Semantic splitting | Tries to keep related ideas together | Requires extra modeling, cost and tuning |
| Parent-child retrieval | Search small units, return a larger parent section | More complex indexing and source mapping |

**Start with a paragraph.** Inspect one result where it works and one where a needed name, table header or exception falls outside the boundary. Those observations give you a reason to try a different split.

## The metadata that makes retrieval trustworthy

Each stored chunk should identify:

\`\`\`text
source_id          S-events
source_version     2026-11-11-teaching-fixture
chunk_id           S-events-C02
ordinal            2
source_location    section: Events / paragraph: 2
text               Visitors must sign in at the welcome desk.
chunk_method       paragraph
\`\`\`

This is an illustrative record, not proof that every field exists in our teaching script. If a source changes, decide what to reprocess and how outdated chunks/vectors stop being returned. Stable source identity and source version are more important than pretending generated chunk numbers never change.

## Two experiments you can do without an API key

**Experiment A — inspect the actual importer.** Open the [reference code](https://github.com/kaw393939/is373-rag/blob/main/student-reference/rag_lab.py). Find the \`paragraphs()\` function, then inspect one [fictional source file](https://github.com/kaw393939/is373-rag/blob/main/student-reference/fixtures/events.txt). Predict how many chunks it creates. Run the [15-minute lab](reference.md#your-first-15-minutes) and inspect real chunk text and \`ordinal\`.

**Experiment B — compare a proposed different split.** In a copied test fixture, place a key sentence across an artificial 60-character boundary. Ask an AI coding agent to propose a fixed-character splitter and a paragraph splitter as **separate experiments**. Compare what each returns to **“Who organizes workshops?”** Keep the original fixture unchanged, save actual outputs and decide which split better preserves support.

Record **the unit you counted** (characters or tokens), tokenizer where relevant, source version, chunk count, retrieved IDs and question. If several hits repeat the same sentence, inspect overlap. If the answer is spread across two adjacent hits, try returning the parent section. Rerun the same question after one change.

## Evaluate the result before changing your design

For one supported, one paraphrased, and one unanswerable question, record:

1. **Expected source/passage** before execution.
2. **Retrieved chunk IDs and text**, not just the model's explanation.
3. Whether the boundary preserved the entire fact or relationship.
4. Whether the actual answer's citations support each claim.
5. One change and a repeat run. Is retrieval better, worse or merely different?

When a citation fails, investigate retrieval and source boundaries **before** asking the model to sound more certain.

### Ask an AI coding partner

\`\`\`text
Read my existing importer and my permitted source fixture. Show me its
actual chunking rule; don't assume it uses tokens. Predict, then run the
import and display source IDs, chunk IDs, text and source locations.
Compare paragraph/heading boundaries with a second small strategy
without replacing the first. Use the same three evaluation questions.
Show any split claim, duplication or lost context, and record actual results.
Do not install a framework or change my production import until I approve.
Ask me which strategy I prefer and what evidence supports that choice.
\`\`\`

### A note from the AI

> If my answer sounds too general, ask me to display the retrieved text beside the paragraph that follows it. You may find the exception one line beyond the cut.

## More to explore

- [Embeddings handout](embeddings.md): numerical representations are computed **after** you select an input unit.
- [AI library survey](library-survey.md): optional splitters and pipelines, including LangChain.
- [Original IS373 RAG research handout](https://github.com/kaw393939/is373-studio/blob/main/docs/handouts/database-rag-research.md): assignment-aligned comparison.
- [Pinecone chunking strategies](https://www.pinecone.io/learn/chunking-strategies/): practical tradeoffs and advanced methods.

*Fictional scenario and proposed experiments. No example claims a model was run or a benchmark was measured.*
