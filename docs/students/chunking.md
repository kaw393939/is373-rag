---
title: Chunking, source structure and retrieval
description: Learn how to divide documents without losing meaning, compare two strategies, and evaluate evidence using existing IS373 sources.
---

# Chunking: where should we cut a document?

A company has an employee handbook. An assistant must answer: **“Who approves a travel reimbursement?”** The answer is in one paragraph, but the word **“approves”** is on one page and the approving job title is on the next. A careless split can separate the question from its answer.

**Chunking means dividing source material into manageable, retrievable pieces.** Each piece should carry its original source ID and location. We chunk to fit processing limits, improve retrieval granularity, and avoid passing entire documents to every model call.

There is no universally best chunk size: good boundaries depend on the document, the questions and the embedding/retrieval method. [Pinecone's technical overview](https://www.pinecone.io/learn/chunking-strategies/) discusses these tradeoffs.

## One fictional example

\`\`\`text
SOURCE: S-events — Harbor Club bulletin, section "Events"
[Paragraph 1] The Events Committee organizes monthly workshops.
[Paragraph 2] Visitors must sign in at the welcome desk.
[Paragraph 3] The date of the next annual meeting has not been announced.
\`\`\`

**Option A: fixed-size character chunks.** Easy to implement, but a boundary could split “Events Committee organizes” across two chunks. *Characters and model tokens are not interchangeable units.*

**Option B: paragraph/heading chunks.** Keeps each statement together and helps preserve the section title, but a paragraph can be too long or need neighboring context.

Both methods must preserve source metadata. **Chunk S-events-C02 is not a separate publication or verified fact.** It is a slice of source S-events.

## Choose a boundary deliberately

| Strategy | Why developers use it | Common failure |
| --- | --- | --- |
| Fixed length | Simple, predictable processing limits | Breaks sentences, tables, names or claims |
| Sliding window/overlap | Carries some context across boundaries | Duplicates content, increases cost and may skew rankings |
| Paragraph or heading | Respects the author's structure | Oversized paragraphs, uneven chunk lengths |
| Recursive splitting | Tries larger boundaries then smaller ones | Still depends on length limits and separators |
| Semantic splitting | Tries to keep related ideas together | Requires extra modeling, cost and tuning |
| Parent-child retrieval | Search small units, return a larger parent section | More complex indexing and source mapping |

**Start simple.** An exact, verified example beats a sophisticated algorithm whose outputs you cannot inspect.

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

We deliberately do not provide a “magic 500-token” rule. The right experiment specifies **characters or tokens, a tokenizer when relevant, source and version, chunk count, retrieved IDs, and the query**. Larger chunks can hide precise answers; tiny chunks can lose context.

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

> I might retrieve a passage that sounds relevant while leaving out its exception on the next line. Before trusting the answer, inspect **what the chunk includes and what it excludes**. Retrieval is a software design choice, not an oracle.

## More to explore

- [Embeddings handout](embeddings.md): numerical representations are computed **after** you select an input unit.
- [AI library survey](library-survey.md): optional splitters and pipelines, including LangChain.
- [Original IS373 RAG research handout](https://github.com/kaw393939/is373-studio/blob/main/docs/handouts/database-rag-research.md): assignment-aligned comparison.
- [Pinecone chunking strategies](https://www.pinecone.io/learn/chunking-strategies/): practical tradeoffs and advanced methods.

*Fictional scenario and proposed experiments. No example claims a model was run or a benchmark was measured.*
