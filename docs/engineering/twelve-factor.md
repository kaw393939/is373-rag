# Twelve-factor design, with explicit storage boundaries

The [Twelve-Factor App](https://12factor.net/) describes deployable services. We apply it to the hosted API and workers without pretending that a portable research database is stateless. These are **design requirements, not a compliance certificate**. Runtime gates remain pending until the application exists and is tested.

## Two profiles, one codebase

**Hosted:** the API and compute workers are replaceable processes. A private Rust store process owns SQLite and durable artifacts as an attached backing service. Sessions, runs, leases, review decisions and replay cursors survive replacing an API process. The browser has one public origin; the store is not publicly exposed.

**Local appliance:** the same domain/storage modules may run together with an explicitly selected library directory. This stateful convenience is a documented exception to strict process disposability and horizontal scale. It must still pass backup, recovery, configuration and provenance tests.

A volume is not a magic statelessness switch. The hosted store remains stateful and single-writer per writable library; it needs its own backup/restore contract. We do not mount a live SQLite WAL database over a network filesystem. SQLite documents that WAL processes must operate on the same host. [SQLite WAL](https://sqlite.org/wal.html).

## Verification matrix

| Gate | Factor and project decision | Falsifiable acceptance evidence |
| --- | --- | --- |
| TF-01 | [Codebase](https://12factor.net/codebase): one application workspace, many deployments; donor history recorded, not separate environment forks | QA and production identify the same source revision and selected artifact; no production-only source patches |
| TF-02 | [Dependencies](https://12factor.net/dependencies): commit lockfiles; pin toolchains, base images, OS tools and model/tokenizer manifests | Clean checkout builds using declared inputs; removing an undeclared tool causes an explicit readiness failure, not hidden fallback |
| TF-03 | [Configuration](https://12factor.net/config): deployment values supplied independently of code; strict typed parsing; secrets server-only | Same built artifact accepts different endpoint/limits configuration; malformed supplied values fail startup; secret scan/log tests show no disclosure |
| TF-04 | [Backing services](https://12factor.net/backing-services): hosted API attaches to a private state service and model endpoints through contracts | Replace the store endpoint or inference provider configuration without recompiling the API; incompatible contracts are rejected |
| TF-05 | [Build, release, run](https://12factor.net/build-release-run): immutable artifacts, configuration-bound release manifest, no build at startup | Promote the tested digest without rebuilding; startup runs with no compiler or package registry access; retain schema/library compatibility evidence |
| TF-06 | [Processes](https://12factor.net/processes): hosted API/workers keep no sole durable truth in memory or writable process files | Replace an API with an empty ephemeral filesystem; history, ownership and committed replay remain correct; local embedded-store exception is declared |
| TF-07 | [Port binding](https://12factor.net/port-binding): the server binds a configured address and port; proxy is external | Run behind a different approved proxy without changing application source; health/readiness and actual HTTPS streams pass |
| TF-08 | [Concurrency](https://12factor.net/concurrency): scale explicit process roles and bounded worker slots, not uncontrolled threads | Two workers race for one task; one acceptance succeeds; stale epoch fails; queue/memory limits hold; no claim of horizontally replicated SQLite writers |
| TF-09 | [Disposability](https://12factor.net/disposability): fast readiness, graceful shutdown and crash recovery | SIGTERM stops admission and drains within a configured grace; SIGKILL does not duplicate accepted work; interrupted runs and lease recovery remain visible |
| TF-10 | [Development/production parity](https://12factor.net/dev-prod-parity): same storage engine, protocol and release path; platform capabilities vary explicitly | Linux QA runs the production image and schema; Mac/Swift workers pass common contract fixtures; mock inference is not presented as model-quality validation |
| TF-11 | [Logs](https://12factor.net/logs): structured event output to stdout/stderr, aggregated by the environment | No application-managed production log rotation; logs carry request/run IDs but omit credentials, raw sensitive inputs and provider payloads |
| TF-12 | [Admin processes](https://12factor.net/admin-processes): one-off migration, import, verification and export use the same release and policy | Run a scoped admin operation with target guard and least privilege; retain an audit receipt; reject incompatible schema or production target in destructive tests |

## Configuration contract

Proposed runtime variables are granular, validated settings, not a single opaque `production` switch:

| Variable | Meaning and boundary |
| --- | --- |
| `LAB_BIND_ADDR`, `LAB_PORT` | HTTP bind location; local defaults may be loopback, container deployment explicitly binds an approved interface |
| `LAB_STORE_URL` | Private store endpoint for hosted API/workers |
| `LAB_LIBRARY_PATH` | Store/local-authoring process only; never a browser-selected filesystem path |
| `LAB_MODEL_MODE` | Explicit `mock`, `local` or `remote`; absence is not silent permission to call a provider |
| `LAB_MODEL_ENDPOINT` | Operator-controlled, allowlisted model service |
| `LAB_MAX_CONCURRENT_RUNS`, `LAB_MAX_OUTPUT_BYTES` | Positive bounded limits; parsed on startup |
| `LAB_SHUTDOWN_GRACE_SECONDS` | Grace budget coordinated with the process supervisor |

Secrets use the deployment's credential injection mechanism and are never committed, returned in public configuration or printed. A variable carrying a secret-file reference is a deliberate injection choice, not permission to put its contents into a release manifest.

The Svelte frontend should use relative `/api` paths and a sanitized runtime configuration endpoint when needed. Environment-specific URLs baked into JavaScript at build time would prevent promoting exactly the same frontend artifact. Public runtime configuration is an allowlist, not a dump of the process environment.

## State and release rules

The canonical store transaction owns graph changes and their events. The hosted conversation store is operational state, separate from the immutable published research snapshot. No cross-database atomic transaction is assumed: each answer pins an already published library revision and records that reference durably in its own run transaction.

A release manifest records source revision, application artifact digest, schema compatibility range, selected library revision, embedding-space identities and enabled worker/model versions. Configuration fingerprints exclude secret values. A schema-changing release may require a forward repair or a restore; switching an image tag alone is not a safe rollback plan.

Operational logs and the evidence audit ledger are different. Stdout logs support diagnosis; the audit ledger is durable, access-controlled application data and must participate in the relevant transaction and retention policy.

## Explicit exceptions and nonclaims

The local embedded store does not meet strict stateless-process scaling. The hosted private store is a stateful backing resource, not an API replica. CUDA and Apple implementations need compatible contracts but need not produce bit-identical floating-point output. Multi-architecture images require separately built and tested artifacts; an OCI index alone does not prove parity.

Do not claim twelve-factor compliance because the project uses Docker, Rust or environment variables. Claim each tested property separately. The [clean-build plan](clean-build.md), [examples](examples.md) and [roadmap](../project/roadmap.md) turn these gates into work.
