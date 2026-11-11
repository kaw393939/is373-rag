# IS373 optional local source/retrieval lab

**This lab is not the student's hosted RAG application and does not satisfy the entire individual assignment.** It is a small, inspectable reference for source IDs, paragraph chunking, SQLite/FTS5 search, optional *real* vector embeddings and optional *real* model generation. Five documents are fictional synthetic club policies. Python 3.10+ with SQLite FTS5 is required; all mandatory offline tests need no API key, model or paid infrastructure.

## First successful result (offline)

New to the repository? Start with the [first-15-minute walkthrough](../docs/students/reference.md#your-first-15-minutes), including download, expected output and troubleshooting.

Clone and enter the project (or download and extract its ZIP from GitHub):

```sh
git clone https://github.com/kaw393939/is373-rag.git
cd is373-rag
python3 --version
```

Run from this **repository root**, the folder containing `student-reference`:

```sh
python3 student-reference/rag_lab.py import --db student-reference/lab.sqlite
python3 student-reference/rag_lab.py search --db student-reference/lab.sqlite --question "Who organizes events?"
python3 -m unittest discover -s student-reference -p 'test_*.py'
```

Inspect the returned chunk IDs, source IDs, filenames, ordinal positions and actual passage text. Repeat import; the result should report five `unchanged` sources and no new chunks. Change one *copy* of a fixture with `--sources path-to-copy`, reimport, and observe one updated source. The lab uses paragraph chunks without overlap; source locations here are paragraph ordinals, not verified PDF offsets.

This is **lexical** retrieval. It is the baseline for a vector/graph comparison, not proof of a completed vector/graph RAG application.

## Optional: real Ollama embeddings and model generation

Only if you already have [Ollama](https://ollama.com/) and sufficient hardware locally:

```sh
ollama pull nomic-embed-text
ollama pull llama3.2
python3 student-reference/rag_lab.py embed --db student-reference/lab.sqlite --embedding-model nomic-embed-text
python3 student-reference/rag_lab.py search --db student-reference/lab.sqlite --mode vector --embedding-model nomic-embed-text --question "Who organizes events?"
python3 student-reference/rag_lab.py ask --db student-reference/lab.sqlite --mode vector --question "Which committee runs workshops?"
```

The code calls the **actual local** Ollama `/api/embed` and `/api/generate` endpoints. It does not inject canned text, fabricate embeddings or call a provider unless you explicitly run `embed`, vector `search`, or `ask`. Failures clearly report missing models/endpoints. No compatible query encoder means vector search cannot run. Local URL handling disallows remote model endpoints in this teaching lab.

Try a question unsupported by the corpus, e.g. `What is the next annual meeting date?`. Check the generated response against original sources. A model can still hallucinate even after receiving instructions to abstain. The displayed passages are **retrieval candidates**; citation IDs in the generated answer are **not automatically verified**.

## Architecture and limits

```text
.txt fixtures → SHA-256 source versions → paragraph chunks → SQLite / FTS5
                                                   ↓
                                      optional real Ollama embeddings
                                                   ↓
                              exact cosine similarity across local vectors
                                                   ↓
                              retrieved passages → local Ollama generation
```

- Source rows and chunk IDs are stable across repeated identical imports. Changed sources replace their chunks and invalidate old embeddings.
- FTS5 provides lexical ranking. The vector baseline stores JSON vectors in SQLite and scans them exactly. It is not an ANN index, a vector database product benchmark or large-scale deployment.
- The embedding model is identified by an Ollama model *name/tag*, not a verified immutable model digest. Production systems need stronger model fingerprints, migration/re-embed policies and quality evaluation.
- It has no HTTP server, user accounts, permission service, graph database, audit-grade publication, deployment, or complete production safety boundary.
- The in-memory comparison function is tested; actual model quality and LoRA/DoRA are not tested.
- Source files can contain adversarial instructions. A local prompt warning is not a full prompt-injection defense; treat model outputs as untrusted.
- The `ask` command prints model text with a **warning** rather than asserting that source support was verified.

To complete the actual course requirement, **justify and implement** vector, graph or both, then integrate real retrieval + generation into your **own hosted application** with protected server-side configuration, source references, evaluation and peer feedback. Reuse existing FastAPI/server work when appropriate rather than converting this CLI into an exposed service.

[Student success guide](../docs/students/index.md) · [Official individual brief](https://github.com/kaw393939/is373-studio/blob/main/docs/projects/individual.md)
