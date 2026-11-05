# ADR 001 · Serving boundaries

**Status:** Proposed baseline. **Date:** November 5, 2026.

## Context

The primary interaction is streaming text chat. Developer familiarity is not a selection criterion. Retrieval and inference latency, browser responsiveness, cancellation, and recovery must be measured together.

## Proposed decision

Use Svelte 5, SvelteKit, and TypeScript for the product interface. Use Rust with Axum/Tokio for the live chat service. Let SvelteKit render initial routes and bounded snapshots where useful, then deliver active answer events directly from Rust over SSE. HTTP commands create and cancel runs.

Keep run policies and evidence handling in application/domain modules with focused ports. Axum, model protocols, NATS, and SQLite are adapters. This is a dependency rule, not a mandate for multiple services or one abstraction per function.

## Alternatives

React with Vite or Next.js remains viable. Go or a carefully isolated FastAPI backend may perform similarly when external model work dominates. Svelte's reactive model and Rust's resource control motivate the starting choice; no comparative application benchmark has established a winner.

## Consequences

The UI needs an explicit event client, snapshot cursor, state reducer, replay/gap policy, and cancellation protocol. Initial rendering and active token delivery are separate paths. Retained output fanout is added when independent generation or multiple-viewer requirements justify it.

## Validation

Compare first visible grounded text, input responsiveness, chunk gaps, memory, long tasks, and cancellation under realistic histories. Test slow devices and concurrent streams. Confirm one terminal state and safe replay under reconnects. See [frontend](/architecture/frontend), [backend](/architecture/backend), and [contracts](/architecture/contracts).
