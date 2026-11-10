# Streaming research interface

Status: proposed product behavior. VitePress is the docs interface, not the research application.

## Four connected views

**Chat** streams answers and supports stop/retry. **Evidence** opens exact source spans and claim assessments. **Jobs** shows queued, running, blocked and review states. **Review** compares proposals with published knowledge and requires explicit authorization.

Published knowledge is the default query scope. Draft access is explicit and permission-checked before retrieval, not merely hidden after generation.

## Two streams

An answer stream carries evidence selections, answer deltas, citations and terminal outcomes. A workflow stream carries durable job events and recorded progress. Both use versioned payloads with an event ID, run/job ID, sequence, timestamp and schema version.

Use HTTPS commands and SSE initially. A browser Fetch reader for an authenticated POST does not inherit EventSource's automatic reconnection behavior. Define replay and recovery explicitly. WebSockets remain an option for a later bidirectional-media requirement.

Proposed event names:

```text
run.started
retrieval.evidence_selected
answer.delta
answer.citation
run.completed / run.cancelled / run.failed / run.interrupted
job.progress / review.required / library.published
```

These are draft contracts, not existing endpoints. A transport terminal and a complete model answer are separate outcomes; represent incomplete and refused provider results explicitly.

## Required behavior

Commit admission and run identity before starting provider work. Use request idempotency keys. Do not hold a database transaction open for the duration of generation.

Stop requests cancellation and preserves committed partial output. Reconnecting recovers the recorded run; it must not silently regenerate a paid answer. After a crash, show interruption and the durable prefix rather than claiming an unrecorded tail survived.

Incrementally decode Unicode and buffer complete frames. EOF is not successful completion. Ignore stale responses from another session or selected conversation. Escape raw HTML, reject unsafe URL schemes, and treat model text as untrusted.

For replay, persist sequenced deltas or periodic snapshots before acknowledging them as durable. Transient progress is labelled non-replayable. Expired event history returns an explicit snapshot/resynchronization path. Reauthorization applies on every subscription and evidence fetch.

## Delivery checks

Test through the actual HTTPS proxy: first-event delivery, idle heartbeat, bounded output, disconnect, cancellation, duplicate requests and revision-pinned citations. A localhost demo is not proxy proof.

Use the existing [chat workshop's stream contracts](https://github.com/kaw393939/is373-ai-chat/blob/main/book/05-streaming.md) as a reviewed reference, not a mandate to retain its Python/PostgreSQL stack. Protocol background: [HTML SSE standard](https://html.spec.whatwg.org/multipage/server-sent-events.html).
