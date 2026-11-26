---
title: Embeddings, similarity and the evidence they miss
description: "Learn how embeddings match differently worded questions and passages. Walk through cosine similarity, then check an answer against its source."
teaser: "A club guide calls it application assistance. A visitor calls it help joining. How can a search find the right passage when the words barely overlap?"
---

# Embeddings: how can a computer find related ideas?

A visitor types **“Where can I get help joining?”** The club guide says **“Contact the club secretary for application assistance.”** Which words would an exact search match? Which passage would you want a reader to see?

An **embedding** is a list of numbers a model produces to represent an input such as a question or passage. Many text-retrieval models learn to place related inputs near one another. A search uses those numbers to choose passages to read. You still need the original sentence to tell the visitor where to go.

**Try it first.** Predict the source, then run the [offline exercise](#short-student-exercise). You can test keyword retrieval without an account. The [two-number example](#a-geometric-thought-experiment-not-a-model-output) explains what a similarity score measures.

## The people and the question

Researchers had the *document matching* problem long before modern LLMs. Gerard Salton and colleagues' information-retrieval work explored representing documents in mathematical spaces. [Read the Cornell paper](https://ecommons.cornell.edu/entities/publication/dc340f22-1c38-4f0a-921e-27706685b1bf). The vector-space concept evolved over time; don't confuse early term-weighted document vectors with neural embeddings.

**Tomas Mikolov and colleagues** published [efficient neural word representations](https://arxiv.org/abs/1301.3781). **Nils Reimers and Iryna Gurevych** introduced [Sentence-BERT](https://aclanthology.org/D19-1410/) for useful sentence representations in similarity search. For retrieval, one practical advantage is that a system can encode documents ahead of time and compare a new question with the stored vectors.

## Word, sentence, paragraph and chunk

| Level | Example input | What the representation can help compare |
| --- | --- | --- |
| Word | “membership” | Terms (especially with older word-embedding methods) |
| Sentence | “Ask the secretary for help.” | One statement or intent |
| Paragraph | Several sentences describing applications | A coherent passage and its context |
| Chunk | A section of a long policy with a source ID | A retrievable passage with traceable provenance |

The same model may accept several input lengths within its documented limit. **A chunk is the text you chose to keep together. Its embedding is the vector the model computed from that text.** Save the passage and its source ID alongside the vector so a reader can inspect the match.

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

A quick diagnostic is to look at the retrieved passage before reading the generated answer. If the correct passage is missing, inspect the query, the chunk boundaries and the embedding model. If the correct passage is present but the answer reverses the rule, check the answer against that passage before changing your search.

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

> Ask me to point to the original words, version and source location. If I return a score of 0.8, ask what was compared and which model produced the vectors before deciding what the score tells you.

## Go deeper, when ready

- [OpenAI embeddings guide](https://developers.openai.com/api/docs/guides/embeddings) — model vectors, applications, similarity and limitations.
- [Sentence Transformers semantic search](https://sbert.net/examples/sentence_transformer/applications/semantic-search/) — query and corpus embeddings, similarity and retrieval.
- [Sentence-BERT paper](https://aclanthology.org/D19-1410/) — a historical research milestone.
- [Chunking handout](chunking.md) — how you choose the text units to embed.
- [How to evaluate](check.md) — accuracy and references, not just a plausible response.

*The numerical examples illustrate the geometry. To evaluate a specific model, run the same questions against your own sources.*
