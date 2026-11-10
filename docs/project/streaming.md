# Streaming research interface

**Proposed product behavior.** VitePress is the documentation interface. SvelteKit/TypeScript remains the proposed application client, with a Rust API and leased model workers.

## Four connected views

**Chat** streams answers and preserves clear outcomes. **Evidence** opens exact spans, source independence and claim assessments. **Jobs** shows queue, progress, blocked capabilities and review state. **Review** compares an immutable proposal with published knowledge and requires explicit authorization.

Published knowledge is the default. Authorization applies before retrieval and evidence selection, not just after generation. A model never authorizes its own tools, draft access or publication.

## Durable work, direct browser stream

The API admits a run through the private store and obtains a durable run identity before provider work starts. A leased worker performs bounded retrieval/generation and records output batches and outcomes. The API delivers authorized committed events over SSE. The browser connection is not the only owner of the run.

Keep transactions short. Do not hold one open during inference. Batching should reduce overhead, with latency measured rather than promised. Explicitly distinguish committed/replayable answer text from transient UI progress; never claim an uncommitted tail survived a crash.

Proposed full event vocabulary:

```text
run.started
retrieval.evidence_selected
answer.delta / answer.citation
run.ended { outcome: complete | incomplete | refused | failed | cancelled | interrupted }
job.progress / review.required / library.published
```

Versioned envelopes carry run/job identity, sequence/cursor, schema and library revision where applicable. The [small stream lab](../engineering/examples.md#stream-framing) uses abbreviated started/delta/completed names only to test framing; it is not the final application schema.

## Required lifecycle

A request key prevents duplicate admission; changed input with the same key is a conflict. Reconnect requests stored state/events for the existing run, not a new generation. Each subscription and evidence fetch is reauthorized. Expired history returns a scoped snapshot/resynchronization response.

Stop is an explicit cancellation command independent of a blocked output send. Preserve committed partial text. Worker/API termination may leave a run interrupted; a paid inference that already produced output is not silently restarted. A user-approved retry creates a distinguishable new attempt/run and provenance trail.

Provider outcomes are normalized before reaching the browser. A stream sentinel, socket close or EOF is not proof of a complete answer. Length limits and refusals remain visible outcomes. Local canned/mock behavior is explicitly selected and labelled.

## Correctness and safety

Incremental UTF-8 decoding must preserve characters split across reads. Buffer only within configured bounds and parse complete frames. Reject invalid event order, identity changes, unsupported terminal states and malformed payloads. Preserve the workshop's session/view ownership checks when adapting it to Svelte.

Render model text as untrusted content: constrain Markdown, leave raw HTML inert and restrict link schemes. Do not expose private source text, raw provider errors, credentials or administrative state through progress events. Authorized projections include limitations and durable cursor semantics.

## Reuse and proof

The [source audit](../reuse/source-audit.md) identifies exact gateway functions and workshop consumer code. Keep Ordo's provider separation and timed batching; repair separate-chunk lossy decoding and serial receive/generation handling. The workshop's incremental decoder is a behavior reference, not a reason to adopt its entire backend.

Test through actual HTTPS: first-event delivery, idle heartbeats, slow clients, cancellation during blocked sends, malformed Unicode, reconnect, account changes, duplicate requests and citations after a new library publication. A synthetic decoder pass is not proxy or browser proof. [SSE protocol reference](https://html.spec.whatwg.org/multipage/server-sent-events.html).
