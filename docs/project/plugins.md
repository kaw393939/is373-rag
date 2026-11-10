# Capability workers and durable jobs

**Proposed contracts.** Existing Ordo executor behavior is a donor, not evidence that native plugins are already implemented here.

## Capability versus implementation

A workflow requests a versioned capability, not an Apple class or CUDA library. CPU, NVIDIA and native Mac workers can implement that capability with declared model and resource requirements. Compatible interface shape does not guarantee equal inference quality or embedding compatibility.

Rust owns coordination and state. Swift is useful for Apple-native frameworks; such a worker is not expected to execute unchanged on Linux. Keep the application usable without a GPU through deterministic fixtures, structured imports, manual review and available retrieval paths.

## One result contract

Reconcile the historical Rust envelope, current TypeScript envelope and private executor envelope before importing any of them. They currently differ in statuses, identity and output shape. The target contract needs these fields:

| Group | Required information |
| --- | --- |
| Version/identity | Schema, capability/backend, job/task, worker, attempt/lease epoch |
| Inputs | Immutable artifact IDs/hashes, parameter/model fingerprints and scope |
| Execution | Deadline, cancellation, bounded resources, tool/model versions and outcome |
| Outputs | Byte-verified artifacts, typed source locations, evidence links and limitations |
| Acceptance | Authenticated worker identity, current lease, allowed outputs and idempotency receipt |

Do not fill a missing byte digest from an artifact label. Failed/blocked outcomes may have diagnostics without successful output evidence; successful evidence-producing capabilities must meet their explicit evidence contract. A worker cannot grant itself permission by setting a field in its result.

## State and transport boundary

Workers never write canonical tables. In the hosted profile they call the private Rust store's scoped acceptance command; in local mode the same contract may use an embedded adapter. The store checks the receipt and commits state/events in one transaction.

Review the existing HTTP/JSON host-worker proposal before choosing a different serialization transport. Language-neutral contracts matter more than Protobuf versus JSON. Do not expose Rust's native trait-object ABI as a stable public plugin interface. [Rust ABI reference](https://doc.rust-lang.org/reference/items/external-blocks.html).

Native process isolation is not a sandbox by itself. Define permitted directories/artifact handles, device access, network egress, executable identity and cancellation limits. Remote worker attachment requires explicit authorization; it is not an arbitrary public command runner.

## Durable task state

Plans are versioned snapshots. Validate dependency cycles, missing keys and required stages before creating a job. Human review is durable waiting state, not a worker holding an open transaction.

Claims carry an epoch and deadline. Completion checks job, task, worker, epoch, expiry, input digest and expected status atomically. Retry classes distinguish safe deterministic processing from paid generation with partial output. A stale result cannot regain authority just because its worker name matches a newer attempt.

Bound queue depth, attempts, concurrency, output size and temporary storage. Use heartbeats and explicit blocked/dead-letter inspection. Preserve diagnostic failure events without converting corrupt evidence into an empty successful result. Historical kernel/event symbols and their missing tests are mapped in the [audit](../reuse/source-audit.md).

## Readiness and large media

Report missing tool/model, unsupported host, unbound source, missing credential, policy block and user disablement separately. No compatible encoder means no compatible semantic query—not permission to silently switch vector spaces.

Control messages refer to durable artifacts; large media uses files or negotiated local buffers. GPU handles and shared memory are ephemeral execution details. Future video runs use bounded segments, source hashes and explicit timestamps. Record sampling/skipped intervals, and pause or spool within quotas under overload. Never claim full analysis of intervals that were dropped.

See the [lease lab](../engineering/examples.md#lease-ownership), [factor gates](../engineering/twelve-factor.md) and S1/S6 in the [roadmap](roadmap.md).
