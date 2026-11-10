# Portfolio, docs and application hosting

Status: proposed layout. No domain, DNS or server change is authorized or completed by publishing these docs.

## Three separate surfaces

| Surface | Proposed host | Responsibility |
| --- | --- | --- |
| Professional portfolio | Existing `kaw393939.github.io` repository / GitHub Pages | Professional identity and project links |
| This documentation site | `is373-rag` / GitHub Pages | Specifications, architecture, decisions and teaching reference |
| Future research application | A verified application host, initially DigitalOcean | Streaming chat, authorized API and published library |

`keithwilliams.org` and `ordo.keithwilliams.org` are working recommendations from planning, not confirmed live destinations. The docs site initially uses its repository Pages address and has no custom-domain `CNAME` file.

## Publication boundary

Mac/local authoring publishes a validated immutable library revision. The cloud deployment reads that snapshot and stores its own conversations and run state separately. It does not synchronize a live SQLite file or become a second graph writer.

The hosted service must state which query capabilities are available. Laptop offline does not prevent evidence browsing. Real hosted model generation requires an explicitly selected provider/worker, data policy and usage limits; use labelled deterministic fixtures before enabling it.

## Before any DNS change

Inspect authoritative nameservers and existing website, email and verification records. Record exact proposed edits, prior values, TTLs and rollback. Verify ownership in GitHub and the actual application route/TLS before cutover. Avoid wildcard DNS and avoid changing unrelated email records.

Keep sensitive server inventories and backup records in the existing private operating manual, not this public site. Historical repository audits do not establish current server access, capacity or service health.

## Deployment gate

Inspect the existing host before installing anything. Preserve the current working reverse proxy; do not mix Caddy course instructions and Traefik deployment instructions blindly. The [IS373 hosting studio](https://github.com/kaw393939/373_hosting) is an existing-host reference, not permission to overwrite infrastructure.

Use a tested image, isolated QA data/secrets, explicit promotion, host-scoped application credentials and revisioned library exports. Public chat does not authorize uploads, shell execution, plugin installation or graph publication. Test backup restoration and rollback before exposing the service.

## Official setup references

[Pages publishing sources](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site), [custom domains](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site), and [VitePress deployment](https://vitepress.dev/guide/deploy). Recheck provider instructions at change time.
