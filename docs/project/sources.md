# Reference map

The authoritative reuse map is the [pinned source audit](../reuse/source-audit.md), not a moving README. It separates historical Rust implementation, current rebuild contracts and owner-only executor work. No donor runtime test-pass claim is made by the audit.

## Project sources

| Source | Use |
| --- | --- |
| [Historical Ordo daemon](https://github.com/StudioOrdo/ordo/tree/39138562f112bed79babf5824d887dfef1b8ace6/crates/ordo-daemon) | Transactional jobs, leases, events and candidate/review code to adapt |
| [Current Ordo rebuild](https://github.com/StudioOrdo/ordo/tree/cea316ac18bdac70e83a6b63bb60ff5459f8f4be) | Gateway, result/projection contracts and bounded product modules |
| [Pinned chat workshop](https://github.com/kaw393939/is373-ai-chat/tree/aea8dc003975d11dfb978f637887400ff646b55d) | Stream, session and cancellation behavior; software stack is not the target |
| [Hosting studio](https://github.com/kaw393939/373_hosting) | Operational teaching reference; inspect actual host before reuse |
| [Production hosting course](https://github.com/kaw393939/production-web-hosting-course) | Background lessons; Caddy examples do not establish current Traefik configuration |
| [Portfolio](https://github.com/kaw393939/kaw393939.github.io) | Separate professional identity site; not this docs deployment target |
| [Earlier architecture](../architecture/overview.md) | Preserved alternatives, superseded where current decisions differ |

The private executor lab and server manual remain owner-only sources. They are not build dependencies, required student access or content to copy into a public fixture archive.

## Primary technical sources

The [twelve-factor matrix](../engineering/twelve-factor.md) links each original factor separately. Other primary references are [SQLite portability](https://sqlite.org/onefile.html), [backup API](https://sqlite.org/backup.html), [WAL](https://sqlite.org/wal.html), [Rust ABI](https://doc.rust-lang.org/reference/items/external-blocks.html), [Cargo builds](https://doc.rust-lang.org/cargo/commands/cargo-build.html), [SSE](https://html.spec.whatwg.org/multipage/server-sent-events.html), [VitePress deployment](https://vitepress.dev/guide/deploy) and [GitHub Pages workflows](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages).

Use current official instructions when changing dependencies, infrastructure or account settings. A reference link is not evidence of an executed deployment.

## Evidence policy

A source inspection, authored example, executed test, published artifact and live observation are different levels of evidence. Preserve the commit, command, fixture, platform and limitations for each. New examples are synthetic. UFO testimony is recorded as testimony; neither an LLM score nor agreement among copied reports establishes scientific truth.
