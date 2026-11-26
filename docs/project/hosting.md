---
title: "Portfolio, documentation and dev/prod application hosting"
description: "Read the intended portfolio, documentation, development and production hosting layout, including the independent checks that establish a live release."
teaser: "A public textbook can be working while its proposed research service is still on the drawing board. Each hostname here has a specific job and a separate release check."
---

# Portfolio, documentation and dev/prod application hosting

<span id="selected-addresses"></span>

## Published documentation

| Surface | How to identify the release |
| --- | --- |
| [Ordo Knowledge Lab on the portfolio](https://keithwilliams.org/knowledge-lab/) | Open the [mirror manifest](https://keithwilliams.org/knowledge-lab/mirror-manifest.json). Its `revision` identifies the Lab source the portfolio built for `/knowledge-lab/`. Match it to the [portfolio publish run](https://github.com/kaw393939/kaw393939.github.io/actions/workflows/publish.yml). |
| Standalone Lab documentation | Open the deployment URL in the successful [Lab Documentation workflow](https://github.com/kaw393939/is373-rag/actions/workflows/docs.yml). The deploy job checks that the homepage, vision and glossary carry that commit in the `lab-docs-revision` meta tag. |

The portfolio also ships redirects for older `/is373-rag/` links. If a request follows one of these to `/knowledge-lab/`, you reached the mirror. The [setup guide](setup.md) explains how to check the release actually served.

## Proposed application addresses

| Surface | Intended address | Evidence needed before calling it live |
| --- | --- | --- |
| Research application development | `dev-rag.keithwilliams.org` | Verify the isolated host, approved access controls, TLS and the exact candidate served. |
| Research application production | `rag.keithwilliams.org` | Verify the accepted release on the intended host over HTTPS and record the rollback procedure. |

The owner's intended portfolio domain is `keithwilliams.org`, with `www.keithwilliams.org` as the alternate. The application hostnames above are reserved in the design. The [release status](../status.md) lists the available artifacts.

## Current execution boundary

The infrastructure planning review could not inspect authenticated GoDaddy, Docker Hub or DigitalOcean account state. It did not verify a DNS edit, registry publication, server access or deployment. The reviewer’s environment could not resolve the public records, leaving their status unverified. Use current provider records and a public HTTPS check when recording a later release.

The private server manual holds the previous provider inventory and recovery procedure. It does not prove current authenticated shell access or spare host capacity. Do not reset root, change boot mode or modify SSH/firewalls merely to work around the connection limitation.

<span id="portfolio-cutover"></span>

## Portfolio domain recovery checklist

Capture the authoritative zone and current GitHub Pages configuration first. Domain registration at GoDaddy does not establish which provider currently hosts DNS. Preserve MX, SPF, DKIM, DMARC, other TXT/service records and unrelated subdomains. Review conflicting A/AAAA/CNAME records and CAA restrictions without changing them blindly.

1. Verify ownership of `keithwilliams.org` in the GitHub account using GitHub's generated TXT name/value. Do not invent the verification token. Retain this record after verification.
2. Inspect the portfolio publisher. It publishes a `gh-pages` branch. Check that `docs/public/CNAME` contains only `keithwilliams.org` so the next build preserves the domain. Update `docs/.vitepress/site.ts` and canonical/sitemap checks at cutover.
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
