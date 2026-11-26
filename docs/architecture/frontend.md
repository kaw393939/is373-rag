---
title: "Frontend architecture"
description: "Inspect a proposed SvelteKit chat interface that keeps typing, cancellation, and source inspection usable while answers arrive a piece at a time."
teaser: "While an answer streams, open an earlier source and start typing the next question. That ordinary interaction is a demanding frontend test."
---

# Frontend architecture

A reader scrolls back to check a citation while the assistant is still writing. The cursor jumps to the bottom and the sentence they were reading disappears. A fast stream can still deliver a slow reading experience.

This draft proposes Svelte 5, SvelteKit, and TypeScript for the future chat client. VitePress serves the documentation you are reading. The chat application remains a design.

Judge the proposed frontend by actions a reader can repeat: type while text arrives, keep a source passage in view, cancel a run, and reconnect to the right answer. Compare those actions on the same browser workload before drawing a conclusion about framework performance.

## Rendering and network boundaries

SvelteKit renders the initial application shell and authorized conversation snapshot when server rendering improves startup. Public, identical pages may be prerendered. Interactive chat then connects to Rust over HTTP commands and SSE. An edge proxy can provide one public origin while routing API traffic directly to Rust, without passing answer chunks through the SvelteKit rendering server.

SvelteKit supports page-level rendering choices and hydration. Its state-management guidance also requires care with long-lived server processes: conversation state must remain request-scoped during SSR. [Page options](https://svelte.dev/docs/kit/page-options), [Server state guidance](https://svelte.dev/docs/kit/state-management)

```mermaid
flowchart LR
  accTitle: Initial navigation and live updates
  accDescr: SvelteKit requests an authorized snapshot from Rust for initial navigation. The browser then sends commands directly to Rust and receives streamed events. A browser worker can handle expensive view processing.
    Browser[Browser] -->|Initial navigation| Kit[SvelteKit rendering]
    Kit -->|Authorized snapshot| API[Rust HTTP API]
    Browser -->|Start and cancel commands| API
    API -->|SSE events| Browser
    Browser --> View[Message and evidence components]
    View -->|Heavy processing| Worker[Browser worker]
```

The browser receives application events, not internal NATS subjects or database rows. A versioned wire schema defines identifiers, event payloads, source references, and errors. Runtime validation complements TypeScript types at this boundary.

## State and component ownership

Normalize state by conversation, run, message, and source identifiers. Each active run tracks its attempt, last applied sequence, status, text segments, and source references. The composer owns its draft locally. The active answer, source panel, and ingestion-status panel subscribe to their own state.

Svelte's reactive object properties support granular updates. That mechanism is a fit for independent panels; it does not prove an end-to-end speed advantage over another framework. [Svelte state](https://svelte.dev/docs/svelte/$state)

| Component | Owns | Avoids |
| --- | --- | --- |
| Conversation view | Message order and history window | Reconstructing all message content for each delta |
| Active answer | Current run's incremental text | Owning unrelated source or ingestion state |
| Evidence panel | Structured citations and source locations | Treating generated prose as the source of citation identity |
| Composer | Draft, submission state, keyboard interaction | Waiting for Markdown or graph computation |
| Graph explorer | Visible graph subset and selection | Running layout while hidden |

## Stream lifecycle

The proposed interaction creates a run through an HTTP command, then subscribes to its event stream. Cancellation is a separate authenticated, idempotent command. A browser disconnect follows an explicit server policy; it does not implicitly establish cancellation.

Initial rendered state includes a `{run_id, attempt, cursor}` checkpoint for each resumable run. After hydration, the client attaches to each selected run stream using its own checkpoint, deduplicates overlap, and verifies run/attempt identifiers before applying deltas. A new start command returns its run checkpoint; cursors never transfer between runs. Missing sequences trigger replay when retained history exists. If replay is unavailable, the server returns an explicit resynchronization response and the client loads a current snapshot. Reconnect support is a server/client protocol feature, not an automatic consequence of using SSE.

Proposed event categories are run status, retrieval progress, sources, text delta, terminal completion, cancellation, and error. A terminal event closes that attempt's transition path; late events from an older attempt cannot append to a replacement answer.

## Rendering work and reading behavior

Display the first meaningful text promptly, then coalesce visual updates around display frames. Use a streaming-aware Markdown renderer with stable blocks and a provisional trailing region. Reference links and other constructs can affect earlier output, so the renderer must preserve those dependencies rather than assuming every completed paragraph is immutable.

Load document viewers, graph exploration, math rendering, and syntax grammars independently. Move expensive parsing or graph layout to a browser worker when profiling justifies it; DOM changes remain on the main thread. Keep executable document content outside the application origin and render source/model text through restricted rendering paths.

Keep text selection and the reader’s scroll anchor stable. Follow new output while the reader is already at the end. If they move up to inspect a source, keep them there and offer a way back to the latest text. For long histories, test windowing with measured message heights and an accessible way to load older messages. Check keyboard navigation, visible focus, clear source labels, and the reader’s reduced-motion preference. A screen reader should announce useful status changes without reading every token.

## Acceptance evidence and open decisions

1. Open a citation in an earlier message. Select a sentence in the source and record the passage and the first visible line.
2. Deliver several answer events, including a new citation. The selection and first visible line should stay where the reader left them.
3. Focus the composer and type while more events arrive. The caret and draft should stay in the composer and the transcript should hold its scroll position. Moving focus may change the browser’s selection highlight. Check selection stability while the source still has focus in step 2.
4. Activate the control for returning to the latest answer using the keyboard. Only this action should resume following the answer. Check that focus remains on a usable control and that reopening the earlier citation returns to its passage.

The browser benchmark must combine long history, streamed Markdown with incomplete fences and tables, late citations, typing, cancellation, and an open graph panel. Measure startup, first visible answer text, input delay, long tasks, frame stability, memory, and reconnect correctness on a slower device. No numeric performance result is claimed yet.

Before implementation, resolve the snapshot/replay contract, retention policy, document-viewer isolation, Markdown renderer, history-windowing behavior, and which routes benefit from SSR. The first vertical slice should prove one cited answer, interruption, and reconnect before adding graph exploration.
