---
title: "Source audit and reuse decisions"
description: "Read pinned Ordo source findings, exact inspection ranges and explicit reuse decisions, including which donor behaviors still need independent tests."
teaser: "A line of code can show how a job was leased. Only a run can show what happened when a worker stopped. This audit records which form of evidence exists."
---

# Source audit and reuse decisions

Read an audit entry beside its pinned source. Locate the named function, check the claim against the cited range, then read the proposed changes before adopting it. The pinned-source inspection identifies candidates and gaps; direct execution of the donor suites was outside its scope.

The execution notes below refer only to this repository’s synthetic fixtures. In a local run, seven lease checks passed with Rust 1.94.0, ten JavaScript stream checks passed, and eight Python/SQLite publication checks passed. The [clean-build guide](../engineering/clean-build.md) gives the reproduction commands and CI’s Rust 1.90.0 pin. The donor suites and application integration checks still need separate runs.

## Source register

| Key | Repository and pinned commit | Inspection |
| --- | --- | --- |
| H | `StudioOrdo/ordo` · `39138562f112bed79babf5824d887dfef1b8ace6` | Historical Rust daemon; job, event and graph paths below |
| C | `StudioOrdo/ordo` · `cea316ac18bdac70e83a6b63bb60ff5459f8f4be` | Current rebuild; gateway and TypeScript contracts below |
| E | `kaw393939/ordo_executor` · `c417ab21e390796e1e57b534488deca13d866b10` | Owner-only executor review; no source copied into this repository |
| W | `kaw393939/is373-ai-chat` · `aea8dc003975d11dfb978f637887400ff646b55d` | Browser stream decoding and session ownership |

The [machine-readable ledger](/source-ledger.json) records blob identities and inspection scope. Commit pins establish which source was reviewed; they do not establish correctness, execution results or permission to relicense it.

<span id="h-01"></span>

## H-01 · Durable task kernel — adapt first

**Inspected at** `39138562f1`. **Executed here** — [Synthetic lease predicate](../engineering/examples.md#lease-ownership), including rejection of an old receipt when the same worker name is reused. **Still to demonstrate** — Race two independent store clients. Verify that only the current attempt commits and emits a completion.

Source: [`crates/ordo-daemon/src/kernel.rs`](https://github.com/StudioOrdo/ordo/blob/39138562f112bed79babf5824d887dfef1b8ace6/crates/ordo-daemon/src/kernel.rs), inspected lines 1–620 and 1120–1340.

`validate_task_dag` checks duplicate keys, missing dependencies and cycles. `create_job_from_template_with_idempotency` fingerprints the request and compiled plan, returns the existing job for an equivalent request, rejects a conflicting request key, and inserts jobs, tasks, dependencies and events within one transaction. This is substantially closer to the desired engine than a new in-memory scheduler.

`claim_ready_task` uses a guarded update, increments `attempt_count`, records a lease and appends an event. Keep those behaviors. The completion path calls `ensure_task_lease_owner`, whose inspected query checks a running task and matching worker ID, but not the lease deadline or a specific attempt/epoch. A late result from an earlier attempt could match a reused worker identity. **Require job, task, worker, attempt/epoch, unexpired lease and expected status in the result-acceptance transaction.**

Also review the meaning of `skipped`: `ready_task_keys` and progress calculation treat it as satisfied. A skipped required evidence-validation stage must not accidentally authorize publication.

**Transfer tests:** duplicate DAG key; cycle; missing dependency; same request/key replay; same key with changed request; two competing claims; expired result before reclamation; stale result after the same worker name receives a new lease; required-stage skip. See the [lease lab](../engineering/examples.md#lease-ownership).

<span id="h-02"></span>

## H-02 · Durable event log — adapt, do not expose raw replay

**Inspected at** `39138562f1`. **Executed here** — No donor replay test or local equivalent. **Still to demonstrate** — Roll back a state change with its event, replay under two viewer scopes, and check retention expiry and corrupt rows.

Source: [`crates/ordo-daemon/src/events.rs`](https://github.com/StudioOrdo/ordo/blob/39138562f112bed79babf5824d887dfef1b8ace6/crates/ordo-daemon/src/events.rs), entire file inspected.

`append_realtime_event_tx` shares the caller's SQLite transaction and assigns a database cursor. `replay_events` orders after a cursor and caps page size. Existing tests include `serializes_job_event_shape` and `replay_after_cursor_returns_reconnect_gap`.

The replay helper has no viewer or library argument. Its use behind a public endpoint therefore requires a new access-scoped query boundary; upstream authorization is not established by this file. `event_from_row` replaces malformed payload JSON with `{}`. In a durable evidence system, corruption must produce a diagnostic or an explicit quarantined record, not silently normal-looking data.

**Transfer tests:** rollback leaves neither state nor event; unauthorized run/library cursors reveal no payload; reconnect fetches each committed event once at the consumer; retention gap requests a fresh authorized snapshot; corrupt stored payload is reported. Cursor monotonicity does not imply a gap-free global sequence, nor does a cursor confer permission.

<span id="h-03"></span>

## H-03 · Candidate graph — preserve review, redesign canonical identity

**Inspected at** `39138562f1`. **Executed here** — [Synthetic publication transaction](../engineering/examples.md#atomic-publication), including rollback after a forced failure. **Still to demonstrate** — Exercise the target graph command with authenticated review, endpoint visibility and persistent recovery.

Source: [`crates/ordo-daemon/src/knowledge_graph.rs`](https://github.com/StudioOrdo/ordo/blob/39138562f112bed79babf5824d887dfef1b8ace6/crates/ordo-daemon/src/knowledge_graph.rs), inspected lines 1–290 and 510–790.

Useful structures include node/edge candidates, evidence references, provenance, visibility ceilings, promotion outcomes and one-hop traversal. The file uses SHA-256. Its deterministic extraction assigns illustrative confidence values and derives an edge from selected extracted labels; this is not a calibrated entity-resolution model.

Candidate hashes incorporate labels, evidence and provenance. That can identify an extraction proposal, but must not define a canonical person's or event's identity. The same entity in a new source should not acquire a new canonical ID merely because its evidence changed.

`promote_edge_candidate` calls endpoint promotions and then writes edges, evidence, candidate state, promotion history and events. It accepts `&Connection` and does not itself establish the enclosing transaction. A caller could pass a transaction; **atomicity must be made explicit and tested at the command boundary**, not inferred from the function name. Require an authenticated reviewer, approved proposal digest and expected graph revision before any canonical write.

`graph_one_hop_neighborhood` filters edges and nodes separately. The new projection must suppress an edge unless both endpoints and its evidence are visible. Do not leak concealed endpoint identifiers through an otherwise visible edge.

**Transfer tests:** partial promotion fault rolls back every write; endpoint rejection blocks the edge; new source does not duplicate canonical identity; qualifiers distinguish claims; public traversal reveals no hidden endpoints. See the [publication lab](../engineering/examples.md#atomic-publication).

<span id="c-01"></span>

## C-01 · Rust realtime gateway — reuse the boundary, repair the transport

**Inspected at** `cea316ac18`. **Executed here** — [Synthetic JavaScript stream fixture](../engineering/examples.md#stream-framing), including split UTF-8 bytes and terminal handling. **Still to demonstrate** — Stream through the Rust gateway and proxy, cancel during generation and verify the stored outcome.

Sources: [`app.rs`](https://github.com/StudioOrdo/ordo/blob/cea316ac18bdac70e83a6b63bb60ff5459f8f4be/crates/ordo-realtime-gateway/src/app.rs), [`session.rs`](https://github.com/StudioOrdo/ordo/blob/cea316ac18bdac70e83a6b63bb60ff5459f8f4be/crates/ordo-realtime-gateway/src/session.rs), [`provider.rs`](https://github.com/StudioOrdo/ordo/blob/cea316ac18bdac70e83a6b63bb60ff5459f8f4be/crates/ordo-realtime-gateway/src/provider.rs), and [`sse.rs`](https://github.com/StudioOrdo/ordo/blob/cea316ac18bdac70e83a6b63bb60ff5459f8f4be/crates/ordo-realtime-gateway/src/sse.rs), entire files inspected.

Keep typed command/event boundaries, the separate provider adapter and bounded-time delta batching. Existing SSE tests cover LF/CRLF framing and multiline data. They do not prove correctness when network chunks split a UTF-8 character.

| Observation in inspected source | Required change |
| --- | --- |
| `String::from_utf8_lossy` is applied independently to byte chunks | Incremental UTF-8 decoding or complete-byte-frame assembly; test every split point |
| `[DONE]` produces completed output while finish reasons are not normalized | Map provider outcomes to complete/incomplete/refused/failed; transport termination alone is not success |
| EOF before the marker already raises an error | Preserve this protection; do not regress it |
| Receive loop awaits generation serially | Cancellation must remain responsive while generation is active |
| Provider absent means canned local fallback | Explicit `mock` mode and visible limitations; never silently label canned output as model inference |
| Gateway routes show permissive CORS and no local authentication guard | Establish authenticated run ownership and origin policy for hosted use; upstream defenses were not inspected |
| Bind address is loopback and invalid port falls back silently | Typed deployment configuration; invalid supplied values fail startup |

The business-specific system prompt and client-supplied UI capability descriptions must not become the research service's authorization system. Preserve the idea of context, but derive permission-bearing context on the server.

<span id="c-02"></span>

## C-02 · Prototype event storage — replace the adapter

**Inspected at** `cea316ac18`. **Executed here** — No prototype file-store test. **Still to demonstrate** — Show that two clients can write through the replacement transaction owner and that malformed stored data produces a diagnostic.

Source: [`lib/workflow/event-store.ts`](https://github.com/StudioOrdo/ordo/blob/cea316ac18bdac70e83a6b63bb60ff5459f8f4be/lib/workflow/event-store.ts), entire file inspected.

It serializes writes through a process-local Promise queue, rewrites `.data/workflow-events.json`, and renames a temporary file. This is not cross-process coordination or a transaction across application records. Its reader catches all errors and starts empty, conflating a missing development file with malformed data or denied access.

Retain event vocabulary if useful. Replace persistence with the transaction-owned store. A corrupt library should fail visibly; startup must not erase history by treating corruption as a fresh installation.

<span id="c-03"></span>

## C-03 · Result envelopes and projections — retain explicit limitations

**Inspected at** `cea316ac18`. **Executed here** — No donor envelope or projection test. **Still to demonstrate** — Verify artifact bytes against their digests and prove that replay cannot cross a viewer’s authorized scope.

Sources: [`lib/ordo/executor.ts`](https://github.com/StudioOrdo/ordo/blob/cea316ac18bdac70e83a6b63bb60ff5459f8f4be/lib/ordo/executor.ts) and [`lib/ordo/projection.ts`](https://github.com/StudioOrdo/ordo/blob/cea316ac18bdac70e83a6b63bb60ff5459f8f4be/lib/ordo/projection.ts), entire files inspected.

The invocation, provider mode, artifacts, evidence and limitations fields are good contract material. But `createTaskResultEnvelope` fills a missing `contentHash` with an FNV-1a digest of labels and references, not artifact bytes. **Separate metadata fingerprints from cryptographic artifact digests; never manufacture byte-integrity evidence.**

Projection schema versions and explicit visibility/capability fields are useful. Timestamp plus event-count comparisons are not a replacement for a durable authorized cursor. Regex text filters are defense-in-depth only, not complete secret removal or access control.

<span id="e-01"></span>

## E-01 · Owner-only executor lab — review, not automatic publication

**Inspected at** `c417ab21e3`. **Executed here** — No owner-only donor code executed in this audit. **Still to demonstrate** — Check ambiguous same-name matches, review binding, byte integrity, and the retrieval baseline against approved fixtures.

Owner-only source: `kaw393939/ordo_executor` at the pinned E commit. Relevant paths are `src/executor.rs`, `src/entity_disambiguate.rs`, `src/graph_promote.rs` and `src/vector_index.rs`.

The result-envelope validator checks outcome shape, evidence presence, lengths and forbidden output keys. It is not a complete secret-value classifier. The entity-hint reader keys a single hint by normalized name, and later inserts can replace an earlier same-name hint. The classifier's fixed confidence floors are heuristics, not calibrated identity probabilities. Use name-to-many candidate generation with type, time, geography and authority scope instead.

Graph promotion writes reviewed local artifacts after an explicit approval flag. That is useful staging behavior, not transactional publication into the new canonical graph. Bind approval to exact proposal content and a base revision. The vector index is explicitly a hashed lexical baseline, not semantic embeddings or ANN search.

Private code stays private unless a later, explicitly scoped extraction authorizes publication and completes the reuse review. The public documentation examples are newly written synthetic fixtures, not copies from that lab.

<span id="w-01"></span>

## W-01 · Streaming workshop — transfer behavior and tests

**Inspected at** `aea8dc0039`. **Executed here** — [Synthetic framing fixture](../engineering/examples.md#stream-framing), including missing terminal events. **Still to demonstrate** — Switch sessions during a live stream and reconnect from a scoped cursor. Confirm the old session cannot update the new view.

Source: [`frontend/src/api.ts`](https://github.com/kaw393939/is373-ai-chat/blob/aea8dc003975d11dfb978f637887400ff646b55d/frontend/src/api.ts), entire file inspected.

`consume` incrementally decodes bytes, validates frame order and rejects missing terminal completion. `parseEvent` distinguishes complete, failed, cancelled, interrupted, incomplete and refused outcomes. `sessionStamp`/`ownsSession` prevent obsolete account work from being accepted by the current view.

Transfer those requirements to the Svelte client. Add bounded buffers, run/library-scoped replay and revision-pinned evidence. Do not copy the React/Python stack merely to reuse a protocol. Referenced donor test suites require their own execution evidence before claiming reuse validation.

## Reuse rights and limits

A useful handoff can say “inspect this function at this commit” even when redistribution rights are unresolved. Before a transfer, record the license or owner decision, the exact code considered, what was adapted, and the new test. Private material stays within its approved boundary.

The historical Ordo snapshot includes an [AGPL license file](https://github.com/StudioOrdo/ordo/blob/39138562f112bed79babf5824d887dfef1b8ace6/LICENSE). Before importing source, record the exact applicable license, notices, ownership and dependency obligations. Do not assume current and historical trees have identical licensing or that code can be relicensed because repositories share an owner. The initial documentation change imports no donor implementation.
