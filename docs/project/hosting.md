---
title: "Portfolio, documentation and dev/prod application hosting"
description: "Read the intended portfolio, documentation, development and production hosting layout, including the independent checks that establish a live release."
teaser: "A public textbook can be working while its proposed research service is still on the drawing board. Each hostname here has a specific job and a separate release check."
---

# Portfolio, documentation and dev/prod application hosting

First identify the thing you want to publish. A change to this textbook goes through its static documentation workflow. A release of the proposed interactive research application needs a verified application host and a separate review of its configuration. The address list below records the intended arrangement.

**Owner-selected layout.** Configuration/code preparation is separate from account changes, registry publication and live deployment. No DNS or server change is established by this document.

## Selected addresses

| Surface | Address | Target |
| --- | --- | --- |
| Portfolio | `keithwilliams.org` | `kaw393939/kaw393939.github.io` on GitHub Pages |
| Portfolio alternate | `www.keithwilliams.org` | GitHub Pages, redirect to the chosen apex |
| Research application production | `rag.keithwilliams.org` | Verified DigitalOcean application host |
| Research application development | `dev-rag.keithwilliams.org` | Isolated, access-controlled development route |
| Project documentation | `kaw393939.github.io/is373-rag/` initially | This repository's static Pages output |

Use `dev-rag`, not `dev_rag`, as the HTTPS hostname. Hostname syntax uses letters, digits and hyphens; DNS underscores used for service/TXT labels do not make an underscore a suitable web hostname. [RFC 1123](https://www.rfc-editor.org/rfc/rfc1123#section-2.1).

This replaces earlier `ordo` / `ordo-qa` recommendations for this project. A portfolio custom domain may also change the inherited project-Pages origin; verify the actual documentation URL before changing `DOCS_ORIGIN` or public links. Keep `/is373-rag/` as the project base. Never point the interactive application subdomains at GitHub Pages.

## Current execution boundary

The infrastructure planning review could not inspect authenticated GoDaddy, Docker Hub or DigitalOcean account state. It did not verify a DNS edit, registry publication, server access or deployment. The reviewer’s environment could not resolve the public records, leaving their status unverified. Use current provider records and a public HTTPS check when recording a later release.

The private server manual holds the previous provider inventory and recovery procedure. It does not prove current authenticated shell access or spare host capacity. Do not reset root, change boot mode or modify SSH/firewalls merely to work around the connection limitation.

## Portfolio cutover

Capture the authoritative zone and current GitHub Pages configuration first. Domain registration at GoDaddy does not establish which provider currently hosts DNS. Preserve MX, SPF, DKIM, DMARC, other TXT/service records and unrelated subdomains. Review conflicting A/AAAA/CNAME records and CAA restrictions without changing them blindly.

1. Verify ownership of `keithwilliams.org` in the GitHub account using GitHub's generated TXT name/value. Do not invent the verification token. Retain this record after verification.
2. Inspect the portfolio publisher. It currently builds into a `gh-pages` branch; source changes alone do not publish it. Prepare `docs/public/CNAME` containing only `keithwilliams.org` so future builds preserve the domain. Update `docs/.vitepress/site.ts` and canonical/sitemap checks at cutover.
3. Set the portfolio repository's Pages custom domain to `keithwilliams.org` before pointing DNS at Pages. Preserve its branch/source setting.
4. Apply only the reviewed website record changes in the authoritative zone. Do not change nameservers or buy hosting.
5. Verify DNS, HTTPS, `www` redirect, portfolio assets, contact link and existing project URLs. Enable Enforce HTTPS when its certificate is available. Publish again and prove the CNAME survived.

### Desired records — not an exported current zone

| Type | Name | Desired value | Gate |
| --- | --- | --- | --- |
| A | `@` | `185.199.108.153` | Verified portfolio Pages setup |
| A | `@` | `185.199.109.153` | Same |
| A | `@` | `185.199.110.153` | Same |
| A | `@` | `185.199.111.153` | Same |
| CNAME | `www` | `kaw393939.github.io` | No conflicting `www` record |
| TXT | GitHub-provided name | GitHub-provided verification token | Obtain from authenticated GitHub |
| A | `dev-rag` | Reverified application-server IPv4 | Isolated route, access and TLS plan ready |
| A | `rag` | Reverified application-server IPv4 | Accepted production candidate and rollback ready |

Do not apply the server IP from a historical inventory without rechecking it. Do not add wildcard DNS. For rollback, record prior values/TTLs before editing; reverse only this change set. DNS propagation is not instantaneous.

## Welcome image and environment separation

The [Svelte welcome package](https://github.com/kaw393939/is373-rag/tree/main/welcome) is a deployment scaffold with repository/docs links and an explicit **Backend not connected** notice. It does not implement or simulate a working research assistant. The eventual product remains the SvelteKit/TypeScript client and Rust services described in [system](system.md).

The [deployment definitions](https://github.com/kaw393939/is373-rag/tree/main/deploy) use separate Compose projects and exact host rules, a non-root read-only container, limited resources, and the existing proxy. Development requires a verified access-control middleware. No database, model credential or user data is needed for this first welcome image.

The Welcome CI workflow tests source and a Linux amd64 image. A separate manual publish workflow pushes the **same tested image** to a confirmed public Docker Hub repository. Source commit, CI artifact, registry push, host deployment and public HTTPS verification are distinct receipts. Docker Hub credentials remain in GitHub secrets; no credentials go in documentation or browser bundles.

## Research publication boundary

A reachable landing page can answer “Does this hostname serve a page?” Reviewing research data requires a different check. Trace one authorized published revision through to the exact source evidence a reader can open, and confirm the application is using the intended environment.

Local authoring publishes a validated immutable library revision. The future cloud application reads that snapshot and stores conversations/run state separately. It does not sync live SQLite files or become a second canonical graph writer. Real hosted generation needs a selected provider/worker, data policy and usage controls. Missing capabilities must be visible.

## Official references

[GitHub custom domains](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site), [domain verification](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/verifying-your-custom-domain-for-github-pages), [GoDaddy DNS](https://www.godaddy.com/help/manage-dns-records-680), [Docker Hub repository creation](https://docs.docker.com/docker-hub/repos/create/), [Docker build actions](https://docs.docker.com/build/ci/github-actions/), [Svelte compiler](https://svelte.dev/docs/svelte/svelte-compiler), [twelve-factor build/release/run](https://12factor.net/build-release-run).

Recheck the provider UI at execution time. The [hosting studio](https://github.com/kaw393939/373_hosting) is an existing-host reference, not permission to overwrite infrastructure. Account-wide billing/domain-renewal changes remain in the private operations record, not this public teaching site.
