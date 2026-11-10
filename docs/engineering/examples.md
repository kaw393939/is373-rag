# Executable contract examples

These are newly written, synthetic teaching specifications. They are **not** imported private Ordo source and **not** the application backend. They make three repairs concrete before implementation. The CI run is the evidence for which examples passed; a code listing is not a test result.

| Lab | Requirement | Related donor observation | What is deliberately missing |
| --- | --- | --- | --- |
| Lease ownership · Rust | A-10; TF-03/TF-08 | Historical completion guard lacks an attempt/expiry comparison | Database acceptance race, real workers and clock failure handling |
| Stream framing · JavaScript | A-09 | Current gateway decodes separate byte chunks; workshop uses incremental decoding | HTTP/proxy, authenticated reconnect, persistence and live cancellation |
| Atomic publication · SQLite/Python harness | A-03/A-06/A-14 | Candidate review needs exact content binding and a transaction-owned publication | Complete ontology, real source objects, reviewer authentication and disk/crash durability |

Python is only a dependency-free harness for exercising SQLite transaction behavior. The planned application remains Rust-first. The browser example is JavaScript because the client must interpret transport bytes. No fixture calls a model or contacts a server.

## Lease ownership

**Question:** what happens when `worker-a` finishes attempt 1 after attempt 2 has already been assigned to that same worker name?

A worker name alone cannot distinguish those claims. The original Rust example below compares the job, task, worker, monotonic epoch, deadline, input digest and running state. Expiry is exclusive: a result at the deadline is too late. A successful predicate is not sufficient by itself; the eventual store must perform this comparison and the conditional state update in the same transaction.

::: details Inspect the Rust specification and its seven tests
<<< @/examples/lease.rs
:::

Run it with the commands in [clean builds](clean-build.md). Deliberately remove the epoch comparison: the stale-attempt test should fail. This mutation is a classroom exercise in a disposable branch, not a change to the accepted contract.

**Transfer gate:** race two real store clients, reuse a worker identity, reclaim an expired claim and deliver the old receipt. Exactly one attempt may be accepted. Clock representation and skew policy need explicit design; this lab's integer timestamps are synthetic.

## Stream framing

**Question:** is receiving half of a multibyte character a provider failure?

No. Network boundaries and text/protocol boundaries are different. The fixture contains `Café` and an emoji, tries every byte split point, and also sends one byte per chunk. It tests LF/CRLF frames, explicit terminal outcomes, a missing completion, a changed run ID, invalid UTF-8 and size limits.

```sh
node --test docs/examples/stream.test.mjs
```

::: details Inspect the bounded synthetic stream decoder
<<< @/examples/stream.mjs{javascript}
:::

::: details Inspect the ten transport tests
<<< @/examples/stream.test.mjs{javascript}
:::

This intentionally narrow wire example uses `schemaVersion`, `runId` and a contiguous per-run `sequence`. It is not a general-purpose SSE parser or a resumable subscriber. An authorized replay protocol may begin from a later cursor and must use an explicit snapshot/resume contract rather than pretending this from-start test covers reconnection.

The lab validates our normalized terminal event. A real provider adapter must still distinguish success, length-limited output, refusal and failure before producing that event; `[DONE]` alone does not perform that translation. Partial output persistence, cancellation during blocked sends, slow clients and session changes require additional integration/browser tests.

## Atomic publication

**Question:** can a promotion leave new entities behind when writing the evidence or publication event fails?

The transaction lab creates an in-memory SQLite database and binds a review to a SHA-256 digest of the exact synthetic proposal. Publication checks the base revision, records canonical rows and evidence, advances the revision, stores an idempotency receipt, and appends an event in one transaction. An injected exception after claim insertion must roll all of it back.

```sh
python3 docs/examples/publication.py
```

::: details Inspect the SQLite harness and its eight tests
<<< @/examples/publication.py
:::

The two people named Alex Lee deliberately have distinct IDs and the same alias. Their names do not determine identity. A second delivery of one request does not append another publication event. The same request key with changed content is a conflict; changed proposal content invalidates its old review.

This fixture's JSON encoding is explicitly Python-defined; it is not a cross-language canonicalization standard. A production wire contract needs test vectors for its chosen encoding and hash rules. The minimal evidence rows use synthetic source IDs and locators; they do not prove source-object existence or integrity. The real publisher must additionally verify rights, visibility, immutable source objects, all endpoints, actor permissions, schema versions and publication scope.

## How an IS373 review uses these examples

Predict the failure, run the test, inspect the corresponding pinned donor function, make one justified repair, and explain what the test cannot prove. Record the source commit, requirement, command, observed outcome and limitation. Do not replace an honest pending integration test with a passing toy test.

The [roadmap](../project/roadmap.md) assigns each remaining proof to a specific implementation slice. These examples are maintained documentation: CI compiles/runs them alongside the site build.
