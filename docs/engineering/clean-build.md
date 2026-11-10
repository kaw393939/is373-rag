# Clean builds and release evidence

There are two distinct deliverables: the documentation site that exists now, and the application planned here. Their commands, test results and deployment claims must not be mixed.

## Documentation: runnable now

From a clean checkout with Node.js 22 or newer:

```sh
npm ci
node --test docs/examples/stream.test.mjs
python3 docs/examples/publication.py
node scripts/check-plan.mjs
npm run build
node scripts/check-pages.mjs
```

The lease example uses an explicitly selected Rust compiler in CI:

```sh
rustup toolchain install 1.90.0 --profile minimal
rustc +1.90.0 --edition=2021 --test docs/examples/lease.rs -o /tmp/ordo-lease-tests
/tmp/ordo-lease-tests
```

This compiler pin applies to a dependency-free documentation exercise, not a decision about the future runtime's supported toolchain. The application toolchain must be selected and security-reviewed at its own setup gate. The examples use synthetic data, no model credentials, no private donor checkout and no external service calls.

The site build checks Markdown links; the repository checker also checks generated targets, the repository subpath and sitemap. These checks do not prove responsive design, keyboard access, real browser streaming or live Pages publication.

## Application: proposed commands, not available yet

The future workspace should expose a small process/administration interface, for example:

```text
lab api       # stateless public HTTP/SSE service
lab store     # private transaction owner and attached durable state
lab worker    # bounded capability execution
lab admin     # scoped migration, import, export, verify or repair
lab local     # explicit embedded-store authoring profile
```

These names are design examples. Running them in the present docs-only repository will not start an application.

Before implementation, pin the Rust toolchain and commit `Cargo.lock`; pin frontend dependencies and commit its lockfile. Declare ffmpeg/ffprobe and other external tools separately from Cargo dependencies. Each model manifest needs weights, tokenizer/preprocessing identity, dimensions where relevant, license/distribution policy and content hashes. A model name without an immutable identity is insufficient replay evidence.

For Rust builds, `--locked` requires the lockfile to remain unchanged; `--frozen` additionally requires offline operation. An offline build needs an intentionally prepared dependency cache or vendor source. Neither flag alone proves bit-for-bit reproducibility. [Cargo build options](https://doc.rust-lang.org/cargo/commands/cargo-build.html).

## Build → release → run

**Build:** verify source and dependency inputs, run unit/contract/integration tests, compile frontend and Rust binaries, produce a versioned image per supported architecture, record SBOM and scan results, then identify artifacts by digest.

**Release:** combine an approved artifact with deployment configuration, schema compatibility, the published library revision and capability/model manifests. Validate migrations on a disposable copy and bind QA acceptance to that exact selection. Record a rollback or forward-repair procedure.

**Run:** start the existing artifact. Do not install packages, compile source, download an unpinned model or migrate implicitly on every web-process startup. Readiness should report whether required storage/schema/capabilities are compatible without leaking credentials.

A failed release leaves the previous selection intact. Library publication and software deployment are separately versioned operations: updating the UI must not silently rewrite research evidence.

## Required evidence before a hosted release

| Evidence | What it establishes | What it does not establish |
| --- | --- | --- |
| Locked clean build | Declared inputs can produce the artifact in that build environment | Universal bit-identical output on every platform |
| Unit and contract tests | Covered rules hold for their fixtures | Production authorization or capacity by themselves |
| SQLite integration tests | Transaction/constraint behavior on the selected engine | Correct remote filesystem behavior or distributed writer support |
| Fault injection | Covered shutdown, replay and publication failures recover as designed | Every possible hardware fault |
| Proxy/browser tests | Real framing, cancellation, session isolation and citations through HTTPS | Long-term service availability |
| Restore rehearsal | Selected backup restores into an isolated compatible environment | That an untested provider snapshot is application-consistent |
| Retrieval evaluation | Quality on a fixed reviewed set, including false matches | A universal confidence threshold |

## Platform matrix

Use Linux QA with the production storage engine and deployment configuration shape. Test macOS authoring/export separately. Both consume the same schema/contract fixtures; the macOS run also tests missing-capability behavior when reopening its output on Linux.

Native acceleration is a separately qualified backend. Keep CPU/deterministic fixtures for protocol tests, but evaluate real embedding and media quality independently. Never replace an embedding model with a different model merely because the vector dimensions match.

## Review and public-data boundaries

Public examples contain synthetic data only. Public exports must be physically constructed from approved records and objects; a full database with hidden UI filters is not a public-safe export. Search indexes, deleted-page remnants, logs and manifests can also contain private content. Test export contents, not just the visible web page.

A clean checkout must not require the owner's `.env`, local home paths or private source repository. Imported source carries its provenance and applicable notices. The [harvest checklist](../reuse/harvest-plan.md) is part of the build gate, not optional housekeeping.
