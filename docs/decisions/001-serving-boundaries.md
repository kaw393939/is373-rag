---
title: "ADR 001 · Serving boundaries"
description: "An architecture decision record on the proposed SvelteKit and Rust boundary, with alternatives and concrete measurements for streaming, cancellation, and recovery."
teaser: "A reader gets the first line of an answer and then loses the connection. The design of that handoff matters more than the framework names."
---

# ADR 001 · Serving boundaries

*Architecture decision record · Proposed baseline.*

This record asks where live chat should run after the first page loads. It sets out a starting architecture and the measurements that could change the choice.

## Context

A useful comparison starts with the reader’s experience. How long until a cited answer appears? Can the reader keep typing while it arrives, stop it, and recover after a disconnect? Measure browser responsiveness, retrieval, inference, cancellation, and recovery together. Developer familiarity alone cannot settle the choice.

## Proposed decision

Use Svelte 5, SvelteKit, and TypeScript for the product interface. Use Rust with Axum/Tokio for the live chat service. Let SvelteKit render initial routes and bounded snapshots where useful, then deliver active answer events directly from Rust over SSE. HTTP commands create and cancel runs.

Keep run policies and evidence handling in application/domain modules with focused ports. Axum, model protocols, NATS, and SQLite are adapters. This is a dependency rule, not a mandate for multiple services or one abstraction per function.

## Alternatives

React with Vite or Next.js remains viable. Go or a carefully isolated FastAPI backend may perform similarly when external model work dominates. Svelte's reactive model and Rust's resource control motivate the starting choice; no comparative application benchmark has established a winner.

## Consequences

The split gives the UI responsibility for its event client, state reducer, snapshot cursor, replay gaps, and cancellation protocol. Initial page rendering and live answer delivery follow separate paths. Add retained output fanout when independent generation or multiple viewers create a need for it.

## Validation

Use one recorded sequence containing a source event, the first supported sentence, more text and a terminal event. Fix the history, device and event timing. Cancel at the same event boundary in each trial.

| Comparison | Hold fixed | Record for each run |
| --- | --- | --- |
| Compare the two browser clients | Serving path and event recording | Time from the start command until grounded text is visible. Record which text remains when cancellation wins and which terminal state the client shows. |
| Compare direct Rust SSE with a frontend relay | Browser client and event recording | Repeat the same timings and cancellation. Compare the displayed result with the run owner’s terminal record, including any deltas that arrived late. |

Compare first visible grounded text, input responsiveness, chunk gaps, memory, long tasks, and cancellation under realistic histories. Test slow devices and concurrent streams. Confirm one terminal state and safe replay under reconnects. See [frontend](/architecture/frontend), [backend](/architecture/backend), and [contracts](/architecture/contracts).
