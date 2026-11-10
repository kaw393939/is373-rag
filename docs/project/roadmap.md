# Delivery roadmap

Status: planning. These gates are not time estimates or claims of completed implementation.

| Gate | Deliverable | Exit evidence |
| --- | --- | --- |
| G0 · Documentation workspace | Dedicated folder, specifications and docs-only Pages workflow | Build/link checks; real publication or recorded account-setting blocker |
| G1 · Design review | Storage, identity, plugin and streaming contracts | Requirements mapped to decisions and accepted test plans |
| G2 · Streaming shell | Rust API + proposed frontend + deterministic provider | Stop, reconnect, Unicode framing and session-isolation evidence |
| G3 · Knowledge slice | Synthetic sources → mentions → draft → reviewed revision | Evidence integrity, deduplication and reversible identity decisions |
| G4 · Portable retrieval | Lexical/vector/graph retrieval and verified exports | Pinned citations; Mac-to-Linux open with missing capability |
| G5 · Durable processing | Leases, retries, replay, review waiting and resource limits | Crash, duplicate-result and disk-full tests |
| G6 · Protected hosted demo | Verified host + isolated QA + approved snapshot | HTTPS stream test, capacity measurement, backup restore and rollback |
| G7 · Public teaching example | Bounded chat and evidence browser linked from portfolio | Reviewed release, access controls and instructor walkthrough |

The portfolio domain change is an independent infrastructure workstream. Do not block local design and fixture work on DNS, or change production merely to complete G0.

## First vertical slice

Use a tiny synthetic dataset. Show one ambiguous identity and one contradiction, not a large unreviewed import. A student follows a question from browser through retrieval to a particular claim and source, then explains what an interruption did and did not preserve.

## Work discipline

Create one behavior issue per bounded change with requirement IDs, non-goals and a test plan. Link atomic commits and review evidence. Never close an implementation issue because the document describes the feature.

Suggested first implementation issues after G1: portable manifest/schema; claim/evidence integrity; resolution draft lifecycle; mock streaming lifecycle; snapshot import/export; worker readiness contract. These are backlog proposals, not issues already created.

## Later capabilities

Native Swift media, NVIDIA acceleration, richer semantic models, multi-host dispatch and a broker are later increments. Cross-machine concurrent authoring requires a separate reconciliation design. No continuous video, autonomous merge policy or distributed queue is required to demonstrate the first research workflow.

## IS373 use

This is an instructor example, not a new grading policy or mandatory stack. Ask students to explain boundaries, reproduce a failure and defend a repair. The documentation should make it easy to distinguish a proposal, source code, a passing check and a verified deployment.
