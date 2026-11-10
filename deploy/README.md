# Isolated development and production

**Prepared configuration, not an installed service.** Inspect the existing host, proxy and backups first. This package creates no proxy, DNS records, firewall rule, SSH key, database or volume. It exposes only the static welcome image to an existing Traefik network. No host port or Docker socket is mounted.

| Environment | Host | Compose project | Suggested host directory |
| --- | --- | --- | --- |
| Development | `dev-rag.keithwilliams.org` | `ordo-rag-dev` | `/opt/ordo-rag-dev` |
| Production | `rag.keithwilliams.org` | `ordo-rag-prod` | `/opt/ordo-rag-prod` |

These are independent of the existing `dev.firehose360.com` and `qa.firehose360.com` applications. Do not rename or restart those projects. Never run fresh Caddy/Traefik installation over the existing host.

## Release procedure

1. Create the public Docker Hub repository under the verified account. Push the exact tested CI image using the manual publication workflow. Record the registry digest, source revision, platform and CI run; an image ID is not a registry manifest digest.
2. Inspect the proxy's network, HTTPS entrypoint and certificate resolver. Establish an authentication or IP-allowlist middleware for development; record its verified name. The supplied middleware reference does not itself implement access control.
3. Copy the relevant `.env.example` outside source control as `deploy.env`; supply the real image digest and proxy names. Do not copy production credentials or data into development. This welcome page requires neither.
4. Validate before an authorized install. From a checkout of this repository:

```sh
python3 deploy/check-env.py /opt/ordo-rag-dev/deploy.env dev
docker compose --env-file /opt/ordo-rag-dev/deploy.env -f deploy/compose.yaml -f deploy/compose.dev.yaml config --quiet
# Only after host, access and capacity checks:
docker compose --env-file /opt/ordo-rag-dev/deploy.env -f deploy/compose.yaml -f deploy/compose.dev.yaml pull
docker compose --env-file /opt/ordo-rag-dev/deploy.env -f deploy/compose.yaml -f deploy/compose.dev.yaml up -d --wait
```

5. Verify private routing and access middleware, then add the specific development DNS record and validate certificate issuance. Depending on the existing ACME challenge, certificate issuance may require the DNS record first; avoid traffic cutover until TLS checks succeed. Do not remove existing working routes. Record HTTPS checks, links, health, actual image digest and host resource use.
6. Promote **the same image digest** to the production env file after acceptance. Production uses only `compose.yaml`, not the development overlay. Validate with `check-env.py ... prod`. Preserve the previous digest and config.

```sh
python3 deploy/check-env.py /opt/ordo-rag-prod/deploy.env prod
docker compose --env-file /opt/ordo-rag-prod/deploy.env -f deploy/compose.yaml config --quiet
```

The limits are starting ceilings, not capacity evidence. CI tests Linux amd64 only. No live DNS, TLS, authentication or host load test is implied by `compose config`.

## Rollback

Before each change, save the previous environment file and record values privately. Set the prior approved digest and run `up -d --wait` for **only** that environment. For a first install with no prior release, stop only `ordo-rag-dev` or `ordo-rag-prod` using its exact compose/env files. Restore prior DNS records from the captured zone when needed. Do not use global prune, delete volumes, reset SSH or restart the shared proxy as routine recovery.

## Future application

The Rust API, data service, models and SvelteKit interactive client are not provided by this image. Add them through the existing roadmap, with separate runtime state, tested migrations, authenticated streaming and backups. GitHub Pages remains documentation-only.
