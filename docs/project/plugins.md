# Capability workers and realtime jobs

Status: proposed contracts. Native workers and accelerator support are not implemented here.

## Capabilities belong to the machine

A workflow requests `speech.transcribe.v1`, `embedding.text.v1` or `media.inspect.v1`. An available worker implements that contract using CPU, NVIDIA or Mac-native facilities. Shared capability names do not guarantee identical models or compatible embedding spaces.

Keep the portable core independent of Apple frameworks. Swift can implement a native Mac worker; its Apple-dependent implementation is not expected to execute on Linux. Rust is the default for core coordination and suitable plugins, not a requirement to rewrite proven codecs or databases.

## Language-neutral execution contract

A worker announces its identity, version, capability versions, models, resource needs and readiness. A task includes input artifact references/hashes, parameters, deadline, cancellation identity and bounded output permissions. A result includes artifacts, source locations, execution receipt, limitations and a typed success/failure outcome.

Start by reviewing the existing Ordo HTTP/JSON envelope against these requirements. A later Protobuf transport is an alternative, not an approved replacement. Avoid exposing Rust trait-object ABI as a public plugin boundary; Rust's native ABI does not provide stability guarantees ([Rust reference](https://doc.rust-lang.org/reference/items/external-blocks.html)).

Workers do not write canonical SQLite state. The core verifies outputs and advances jobs. Separate processes isolate crashes but are not automatically security sandboxes. Untrusted workers require an explicit isolation and permissions design.

## Missing capability is a state, not corruption

Distinguish missing tool, missing model, unsupported host, unbound input, missing credentials, policy block and operator disablement. The library remains readable. Never silently swap an incompatible embedder to make a readiness check pass.

Keep control messages small. Large media travels through artifacts or negotiated local buffers. GPU handles are ephemeral and never the only representation of evidence.

## Durable execution

Use bounded queues, concurrency/resource admission, task leases, heartbeats, cancellation and retry classes. An old worker's lease/fencing identity must not commit after a replacement worker has taken ownership. Accept output once per task/result key; a replayed external computation is still possible.

Human review is durable waiting state, not an open transaction or blocked worker. Source ingestion, publication events and consumer cursors survive restart. Add a broker only when measured multi-host requirements justify it.

## Future video

Process bounded segments with source hash, track and presentation-time intervals. Distinguish narrated claims from visual detections and later inferences. Record skipped intervals and sampling policy. Under load, pause or spool within quotas; do not silently discard evidence while claiming full analysis.
