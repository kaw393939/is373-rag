---
title: Embeddings, similarity and the evidence they miss
description: Learn why numerical representations help retrieve text, inspect cosine similarity, and verify model output without treating similarity as truth.
---

# Embeddings: how can a computer find related ideas?

Imagine someone asks a club's assistant, **“Where can I get help joining?”** The membership guide might say **“Contact the club secretary for application assistance.”** The words are different, but the meaning is related. Keyword search can miss paraphrases. Embeddings give us another way to search.

**An embedding is a numerical representation produced by a model.** For many text-retrieval models, it is a fixed-length vector of real numbers. The model is trained so related texts tend to be closer under a selected similarity measure. An embedding does **not** store an authoritative fact or prove two claims are true.

## The people and the question

Researchers had the *document matching* problem long before modern LLMs. Gerard Salton and colleagues' information-retrieval work explored representing documents in mathematical spaces. [Read the 1974 Cornell paper](https://ecommons.cornell.edu/entities/publication/dc340f22-1c38-4f0a-921e-27706685b1bf). The vector-space concept evolved over time; don't confuse early term-weighted document vectors with today's neural embeddings.

In 2013, **Tomas Mikolov and colleagues** published [efficient neural word representations](https://arxiv.org/abs/1301.3781). In 2019, **Nils Reimers and Iryna Gurevych** introduced [Sentence-BERT](https://aclanthology.org/D19-1410/) for useful sentence representations in similarity search. Their shared problem: *How can we compare language without checking every possible text pair with an expensive model?*

## Word, sentence, paragraph and chunk

| Level | Example input | What the representation can help compare |
| --- | --- | --- |
| Word | “membership” | Terms (especially with older word-embedding methods) |
| Sentence | “Ask the secretary for help.” | One statement or intent |
| Paragraph | Several sentences describing applications | A coherent passage and its context |
| Chunk | A section of a long policy with a source ID | A retrievable passage with traceable provenance |

One modern embedding model may encode all of these input lengths, subject to its documented limits. **A chunk is an input unit; an embedding is the vector computed from it.** Their meanings are different.

## A geometric thought experiment (not a model output)

Picture two feature directions: one for *membership* and one for *events*. We invent tiny vectors:

- Question about joining: **q = (1, 0)**
- Membership passage: **a = (0.8, 0.6)**
- Events passage: **b = (0, 1)**

Using **cosine similarity**, compare the directions rather than just the sizes:

\[
\operatorname{cos}(q,a)=\frac{q\cdot a}{\lVert q\rVert\lVert a\rVert}=0.8,
\qquad
\operatorname{cos}(q,b)=0.
\]

So passage **a** ranks higher for this *invented* comparison. Real embeddings usually have many dimensions learned by a model; their individual coordinates generally do **not** correspond to human-named topics. **These toy numbers were chosen for teaching and were never returned by an embedding API.**

An embedding workflow is:

\`\`\`text
Original document (S-membership)
    ↓ split into traceable chunks
S-membership-C01 + its real text + source location
    ↓ configured embedding model
Vector + model/version + chunk ID → stored index

Question → compatible query embedding → compare / rank vectors
    → retrieve the original text and source ID → give evidence to a model
\`\`\`

Never compare vectors from incompatible embedding models as if they shared a coordinate system. Some retrieval models have different query/document input modes; follow the specific model's instructions.

## When embeddings help—and fail

Semantic retrieval may find paraphrases where exact-term search struggles. But it can also retrieve **the wrong person with a similar biography**, a near-opposite policy statement, or an old version of a rule. Cosine similarity is **not a confidence probability**, and a high score is not a source citation.

For your IS373 project, compare the same question with a **keyword baseline** and your **chosen vector/graph retrieval**. Inspect returned passage IDs, not only a generated answer. Record whether the cited original supports the specific claim.

### Short student exercise

1. Predict which fictional club source answers **“Who helps new applicants?”** and write its expected source ID before searching.
2. Run the [offline lexical lab](reference.md#your-first-15-minutes). Inspect the returned passage; explain any missed paraphrase.
3. If your local environment already supports an embedding model, follow the [optional real vector commands](reference.md#optional-add-a-real-model), with the model ID recorded. Otherwise, **label the vector comparison planned**; no subscription is required for the offline step.
4. Compare one wrong or irrelevant result and explain how you would improve retrieval: source scope, metadata, chunking, an exact-term baseline, or a different model. Do not invent similarity scores.

### Ask an AI coding partner

\`\`\`text
Teach me embeddings using one of my permitted documents and a real question.
First distinguish word, sentence, paragraph and chunk representations.
Show the original source ID, chunk boundaries and the retrieval result.
If you use numeric vectors, say exactly which configured model generated
them; label any invented vectors as illustrative. Explain cosine similarity,
why the query/document embeddings must be compatible, and one failure case.
Do not install packages or generate embeddings until I approve the plan.
Ask me to check whether the retrieved passage really answers the question.
\`\`\`

### A note from the AI

> I can rank passages by apparent relatedness. But I cannot turn a similarity score into evidence that a claim is true. When I return a passage, ask to see **the original words, version and source location**. Your judgment—and your tests—still matter.

## Go deeper, when ready

- [OpenAI embeddings guide](https://developers.openai.com/api/docs/guides/embeddings) — model vectors, applications, similarity and limitations.
- [Sentence Transformers semantic search](https://sbert.net/examples/sentence_transformer/applications/semantic-search/) — query and corpus embeddings, similarity and retrieval.
- [Sentence-BERT paper](https://aclanthology.org/D19-1410/) — a historical research milestone.
- [Chunking handout](chunking.md) — how you choose the text units to embed.
- [How to evaluate](check.md) — accuracy and references, not just a plausible response.

*Educational examples, not measurements of any specific embedding model. References checked November 11, 2026.*
