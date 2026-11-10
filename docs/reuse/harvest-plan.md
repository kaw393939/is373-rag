# Harvest plan for a clean build

**Goal:** preserve tested behaviors from Ordo while creating a small, comprehensible research system. This is a plan for subsequent implementation, not a claim that the application already builds.

## Extraction order

| Slice | Donor | New boundary | Keep out |
| --- | --- | --- | --- |
| 1. Contracts | Current executor/projection types; historical event types | `contracts/` schemas and Rust domain types | UI framework objects, business persona text, arbitrary JSON authority |
| 2. Durable kernel | H-01 `kernel.rs`; H-02 `events.rs` | `lab-store` and `lab-workflows` | Process-local event files; global public replay; unfenced completion |
| 3. Evidence review | H-03 graph candidate and promotion concepts | `lab-knowledge` commands inside store transactions | Hash-derived canonical identities; automatic endpoint approval; one confidence number for everything |
| 4. Processing | Owner-reviewed executor steps | `lab-worker` capability implementations | Private research inputs, absolute user paths, generic public shell execution |
| 5. Conversation | C-01 gateway; W-01 stream consumer behavior | `lab-api`, model adapters and Svelte UI | Client-supplied permissions, silent fallback, transport-coupled domain state |
| 6. Operations | Hosting studio/release patterns | Immutable release and isolated QA | Blind server reinstall, shared production secrets, builds on the live host |

See [source audit](source-audit.md) for exact code and [roadmap](../project/roadmap.md) for dependencies.

## A bounded extraction procedure

For each candidate, record the source commit, blob, path, symbol, license and intended behavior. Read the function's callers, schema migrations and tests before extracting it. The audit above is a starting map, not a complete transitive dependency analysis.

Create a donor characterization test around the behavior that matters. Then reproduce that behavior against a small target interface and add the missing negative tests. Keep the donor test result separate from the target result. A failing donor test is evidence to investigate, not an instruction to weaken the test.

Transfer one behavior per issue/PR. Preserve attribution and notices where source is copied. When the boundary needs a fresh implementation, document which donor behavior it preserves and which assumptions it deliberately changes. Do not call this a legal clean-room process; it is an evidence-based engineering rebuild informed by existing code.

## Proposed Rust dependency direction

```text
lab-domain       IDs, states, qualifiers, policy decisions; no HTTP or SQLite
lab-contracts    versioned wire schemas and validation
lab-store        SQLite transactions, artifacts, migrations and export
lab-workflows    DAG planning and state transitions through store commands
lab-knowledge    identity, claims, review and retrieval planning
lab-api          authorization, HTTP/SSE and conversation orchestration
lab-worker       capability execution; no direct canonical-table access
```

These are proposed modules, not a requirement to create seven deployable services. Start with a Cargo workspace; share domain libraries rather than copy them between binaries. The hosted profile separates the stateless API from the stateful backing store. Local authoring may embed the store explicitly. The [twelve-factor page](../engineering/twelve-factor.md) defines the difference.

## Example: move the historical job kernel

`create_job_from_template_with_idempotency` currently depends on capability registration, template variables, compiled plans, diagnostics and events. Extract those as explicit inputs and narrow collaborators, not by copying the entire daemon.

The target command should receive an authenticated actor scope, a versioned plan, normalized inputs and a request key. Its store transaction must reject changed inputs for an existing key, insert job/tasks/dependencies, and append the creation events together. External inference and filesystem decoding happen outside that transaction.

The target result-acceptance command receives a lease receipt containing job/task, worker, epoch and expiry, plus the input digest and output manifest. It validates artifact bytes and scope before a conditional acceptance update. Lease checks must occur in the same transaction as acceptance; checking a lease in memory and writing later creates a race.

## Example: replace candidate IDs without losing provenance

Retain the old candidate ID and origin as import provenance. Assign stable canonical entity IDs independently. Mention-to-entity decisions are versioned records. A change in source wording, evidence count or extraction model creates a new proposal or derivation, not automatically a new entity.

For edges, distinguish a qualified proposition from each source's assertion about it. A repeated source import may be deduplicated; independent testimony must remain independent. Aliases are scoped many-to-many lookup records, not global uniqueness keys.

## Admission checklist for every transferred module

| Check | Required evidence |
| --- | --- |
| Rights and exposure | Source pin, applicable notices, approved public/private disposition |
| Dependency control | Minimal crate/API dependencies; declared external tools and model manifests |
| Behavioral compatibility | Characterization fixtures plus documented intentional differences |
| Fault handling | Cancellation, bounded inputs, corruption, retries and recovery tests |
| Persistence | One transaction owner; no hidden writes in presentation or worker code |
| Documentation | Requirement, donor symbol, target module, issue and actual test receipt linked |

No task closes because an AI says the implementation looks correct. It closes when the scoped acceptance evidence is present. Application PRs need their own review; this documentation PR does not authorize importing the whole Ordo product.
