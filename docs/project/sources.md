# Reference map

This map explains why each source matters. Repository documentation describes its own state; it is not a live test result. Existing private code and infrastructure records are not copied into this public site.

## Existing project work

| Source | Use in this project |
| --- | --- |
| [Earlier IS373 RAG architecture](../architecture/overview.md) | Starting architecture; current differences are recorded in the decision register |
| [IS373 chat workshop](https://github.com/kaw393939/is373-ai-chat) | Streaming lifecycle, cancellation, session ownership and test scenarios |
| [Streaming chapter](https://github.com/kaw393939/is373-ai-chat/blob/main/book/05-streaming.md) | Separating transport EOF, provider completion and durable state |
| [IS373 hosting studio](https://github.com/kaw393939/373_hosting) | Existing-server inspection, deployment evidence and teaching workflow |
| [Production hosting course](https://github.com/kaw393939/production-web-hosting-course) | Background concepts; its Caddy examples are not automatically appropriate for an existing Traefik host |
| [StudioOrdo/ordo](https://github.com/StudioOrdo/ordo) | Product context and governance concepts; not this example's implemented backend |
| [Professional portfolio](https://github.com/kaw393939/kaw393939.github.io) | Separate public identity site, not the documentation deployment target |

## Primary technical references

[SQLite portable format](https://sqlite.org/onefile.html), [backup API](https://sqlite.org/backup.html), [WAL](https://sqlite.org/wal.html), [Rust external ABI reference](https://doc.rust-lang.org/reference/items/external-blocks.html), [SSE specification](https://html.spec.whatwg.org/multipage/server-sent-events.html), [VitePress Pages deployment](https://vitepress.dev/guide/deploy), and [GitHub Pages workflows](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages).

## Evidence rules

Use dated, revision-specific evidence for implementation claims. A README, diagram or historical audit cannot establish current deployment, security posture or test results. Preserve model/input/plugin versions in future execution receipts. Identify synthesized examples as synthetic. Do not portray uncalibrated scores as scientific truth or UFO testimony as independently verified observations.

External documentation can change. Recheck setup details when performing an actual deployment or dependency upgrade.
