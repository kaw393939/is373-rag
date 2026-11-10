# Source audit and reuse decisions

**Snapshot: November 10, 2026.** This is a targeted inspection of the paths and ranges below. It does not certify either Ordo generation as production-ready. Donor tests were not executed in this review. All links identify immutable commits rather than moving default branches.

## Source register

| Key | Repository and pinned commit | Inspection |
| --- | --- | --- |
| H | `StudioOrdo/ordo` · `39138562f112bed79babf5824d887dfef1b8ace6` | Historical Rust daemon; job, event and graph paths below |
| C | `StudioOrdo/ordo` · `cea316ac18bdac70e83a6b63bb60ff5459f8f4be` | Current rebuild; gateway and TypeScript contracts below |
| E | `kaw393939/ordo_executor` · `c417ab21e390796e1e57b534488deca13d866b10` | Owner-only executor review; no source copied into this repository |
| W | `kaw393939/is373-ai-chat` · `aea8dc003975d11dfb978f637887400ff646b55d` | Browser stream decoding and session ownership |

The [machine-readable ledger](../public/source-ledger.json) records blob identities and inspection scope. Commit pins establish which source was reviewed; they do not establish correctness, execution results or permission to relicense it.

## H-01 · Durable task kernel — adapt first

Source: [`crates/ordo-daemon/src/kernel.rs`](https://github.com/StudioOrdo/ordo/blob/39138562f112bed79babf5824d887dfef1b8ace6/crates/ordo-daemon/src/kernel.rs), inspected lines 1–620 and 1120–1340.

`validate_task_dag` checks duplicate keys, missing dependencies and cycles. `create_job_from_template_with_idempotency` fingerprints the request and compiled plan, returns the existing job for an equivalent request, rejects a conflicting request key, and inserts jobs, tasks, dependencies and events within one transaction. This is substantially closer to the desired engine than a new in-memory scheduler.

`claim_ready_task` uses a guarded update, increments `attempt_count`, records a lease and appends an event. Keep those behaviors. The completion path calls `ensure_task_lease_owner`, whose inspected query checks a running task and matching worker ID, but not the lease deadline or a specific attempt/epoch. A late result from an earlier attempt could match a reused worker identity. **Require job, task, worker, attempt/epoch, unexpired lease and expected status in the result-acceptance transaction.**

Also review the meaning of `skipped`: `ready_task_keys` and progress calculation treat it as satisfied. A skipped required evidence-validation stage must not accidentally authorize publication.

**Transfer tests:** duplicate DAG key; cycle; missing dependency; same request/key replay; same key with changed request; two competing claims; expired result before reclamation; stale result after the same worker name receives a new lease; required-stage skip. See the [lease lab](../engineering/examples.md#lease-ownership).

## H-02 · Durable event log — adapt, do not expose raw replay

Source: [`crates/ordo-daemon/src/events.rs`](https://github.com/StudioOrdo/ordo/blob/39138562f112bed79babf5824d887dfef1b8ace6/crates/ordo-daemon/src/events.rs), entire file inspected.

`append_realtime_event_tx` shares the caller's SQLite transaction and assigns a database cursor. `replay_events` orders after a cursor and caps page size. Existing tests include `serializes_job_event_shape` and `replay_after_cursor_returns_reconnect_gap`.

The replay helper has no viewer or library argument. Its use behind a public endpoint therefore requires a new access-scoped query boundary; upstream authorization is not established by this file. `event_from_row` replaces malformed payload JSON with `{}`. In a durable evidence system, corruption must produce a diagnostic or an explicit quarantined record, not silently normal-looking data.

**Transfer tests:** rollback leaves neither state nor event; unauthorized run/library cursors reveal no payload; reconnect fetches each committed event once at the consumer; retention gap requests a fresh authorized snapshot; corrupt stored payload is reported. Cursor monotonicity does not imply a gap-free global sequence, nor does a cursor confer permission.

## H-03 · Candidate graph — preserve review, redesign canonical identity

Source: [`crates/ordo-daemon/src/knowledge_graph.rs`](https://github.com/StudioOrdo/ordo/blob/39138562f112bed79babf5824d887dfef1b8ace6/crates/ordo-daemon/src/knowledge_graph.rs), inspected lines 1–290 and 510–790.

Useful structures include node/edge candidates, evidence references, provenance, visibility ceilings, promotion outcomes and one-hop traversal. The file uses SHA-256. Its deterministic extraction assigns illustrative confidence values and derives an edge from selected extracted labels; this is not a calibrated entity-resolution model.

Candidate hashes incorporate labels, evidence and provenance. That can identify an extraction proposal, but must not define a canonical person's or event's identity. The same entity in a new source should not acquire a new canonical ID merely because its evidence changed.

`promote_edge_candidate` calls endpoint promotions and then writes edges, evidence, candidate state, promotion history and events. It accepts `&Connection` and does not itself establish the enclosing transaction. A caller could pass a transaction; **atomicity must be made explicit and tested at the command boundary**, not inferred from the function name. Require an authenticated reviewer, approved proposal digest and expected graph revision before any canonical write.

`graph_one_hop_neighborhood` filters edges and nodes separately. The new projection must suppress an edge unless both endpoints and its evidence are visible. Do not leak concealed endpoint identifiers through an otherwise visible edge.

**Transfer tests:** partial promotion fault rolls back every write; endpoint rejection blocks the edge; new source does not duplicate canonical identity; qualifiers distinguish claims; public traversal reveals no hidden endpoints. See the [publication lab](../engineering/examples.md#atomic-publication).

## C-01 · Rust realtime gateway — reuse the boundary, repair the transport

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

## C-02 · Prototype event storage — replace the adapter

Source: [`lib/workflow/event-store.ts`](https://github.com/StudioOrdo/ordo/blob/cea316ac18bdac70e83a6b63bb60ff5459f8f4be/lib/workflow/event-store.ts), entire file inspected.

It serializes writes through a process-local Promise queue, rewrites `.data/workflow-events.json`, and renames a temporary file. This is not cross-process coordination or a transaction across application records. Its reader catches all errors and starts empty, conflating a missing development file with malformed data or denied access.

Retain event vocabulary if useful. Replace persistence with the transaction-owned store. A corrupt library should fail visibly; startup must not erase history by treating corruption as a fresh installation.

## C-03 · Result envelopes and projections — retain explicit limitations

Sources: [`lib/ordo/executor.ts`](https://github.com/StudioOrdo/ordo/blob/cea316ac18bdac70e83a6b63bb60ff5459f8f4be/lib/ordo/executor.ts) and [`lib/ordo/projection.ts`](https://github.com/StudioOrdo/ordo/blob/cea316ac18bdac70e83a6b63bb60ff5459f8f4be/lib/ordo/projection.ts), entire files inspected.

The invocation, provider mode, artifacts, evidence and limitations fields are good contract material. But `createTaskResultEnvelope` fills a missing `contentHash` with an FNV-1a digest of labels and references, not artifact bytes. **Separate metadata fingerprints from cryptographic artifact digests; never manufacture byte-integrity evidence.**

Projection schema versions and explicit visibility/capability fields are useful. Timestamp plus event-count comparisons are not a replacement for a durable authorized cursor. Regex text filters are defense-in-depth only, not complete secret removal or access control.

## E-01 · Owner-only executor lab — review, not automatic publication

Owner-only source: `kaw393939/ordo_executor` at the pinned E commit. Relevant paths are `src/executor.rs`, `src/entity_disambiguate.rs`, `src/graph_promote.rs` and `src/vector_index.rs`.

The result-envelope validator checks outcome shape, evidence presence, lengths and forbidden output keys. It is not a complete secret-value classifier. The entity-hint reader keys a single hint by normalized name, and later inserts can replace an earlier same-name hint. The classifier's fixed confidence floors are heuristics, not calibrated identity probabilities. Use name-to-many candidate generation with type, time, geography and authority scope instead.

Graph promotion writes reviewed local artifacts after an explicit approval flag. That is useful staging behavior, not transactional publication into the new canonical graph. Bind approval to exact proposal content and a base revision. The vector index is explicitly a hashed lexical baseline, not semantic embeddings or ANN search.

Private code stays private unless a later, explicitly scoped extraction authorizes publication and completes the reuse review. The public documentation examples are newly written synthetic fixtures, not copies from that lab.

## W-01 · Streaming workshop — transfer behavior and tests

Source: [`frontend/src/api.ts`](https://github.com/kaw393939/is373-ai-chat/blob/aea8dc003975d11dfb978f637887400ff646b55d/frontend/src/api.ts), entire file inspected.

`consume` incrementally decodes bytes, validates frame order and rejects missing terminal completion. `parseEvent` distinguishes complete, failed, cancelled, interrupted, incomplete and refused outcomes. `sessionStamp`/`ownsSession` prevent obsolete account work from being accepted by the current view.

Transfer those requirements to the Svelte client. Add bounded buffers, run/library-scoped replay and revision-pinned evidence. Do not copy the React/Python stack merely to reuse a protocol. Referenced donor test suites require their own execution evidence before claiming reuse validation.

## Reuse rights and limits

The historical Ordo snapshot includes an [AGPL license file](https://github.com/StudioOrdo/ordo/blob/39138562f112bed79babf5824d887dfef1b8ace6/LICENSE). Before importing source, record the exact applicable license, notices, ownership and dependency obligations. Do not assume current and historical trees have identical licensing or that code can be relicensed because repositories share an owner. The initial documentation change imports no donor implementation.
