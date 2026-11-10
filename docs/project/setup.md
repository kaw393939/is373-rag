---
title: Local docs and Pages
description: Run the VitePress site locally and publish it to GitHub Pages without changing application infrastructure.
---

# Run and publish the documentation

This procedure affects only documentation. It does not deploy the research application or change portfolio DNS.

## Local preview

Use Node.js 22+; Python 3.10+ is also needed for `npm test`. Preserve existing checkout changes rather than cloning over them.

```sh
mkdir -p "$HOME/Projects"
git clone https://github.com/kaw393939/is373-rag.git "$HOME/Projects/is373-rag"
cd "$HOME/Projects/is373-rag"
npm ci
npm run dev
```

Open the displayed address, including `/is373-rag/`. No model or API key is required. An assistant checkout under `/mnt/data` is not a folder on your Mac.

## Verify the site

```sh
npm test
npm run preview
```

The checks cover synthetic examples, plan consistency, the VitePress build, generated links/anchors/assets/sitemap and documentation navigation. The separate Rust lab command is in [clean builds](../engineering/clean-build.md). Browser, keyboard and assistive-technology checks are additional evidence.

## Enable GitHub Pages once

Open [this repository's Pages settings](https://github.com/kaw393939/is373-rag/settings/pages). Under **Build and deployment → Source**, select **GitHub Actions**. Then open the [Documentation workflow](https://github.com/kaw393939/is373-rag/actions/workflows/docs.yml) and run it on `main`.

The workflow needs an already enabled Pages site. GitHub's ordinary Actions token cannot perform first-time administrative enablement. Do not paste a personal token into a chat or commit one to work around that boundary.

## What publication verifies

Pull requests build previews without deploying. A main-branch run builds, tests, uploads only `dist/`, deploys to Pages and checks the actual public homepage, vision, glossary and stylesheet. The response must identify the expected source revision.

An unavailable or incorrectly configured Pages source **fails the publication job**. It no longer produces a green skipped deployment. The successful build artifact remains available even when publication is blocked.

Default address: `https://kaw393939.github.io/is373-rag/`. The Pages action's actual URL is authoritative. The workflow reads an existing Pages address before building, so a later account-level domain change does not require hard-coded origin edits. This repository does not create a `CNAME` or change DNS.

## Ongoing updates

Edit Markdown, retain canonical requirement links, run tests and merge a reviewed PR. Successful main updates publish automatically after activation. [Documentation editing rules](../reference/documentation-map.md).

`DOCS_BASE` defaults to `/is373-rag/`; `DOCS_ORIGIN` defaults to `https://kaw393939.github.io` for local and not-yet-enabled previews. CI overrides them from existing Pages metadata when available. The `source-checkout` artifact contains a Git bundle; use the matching main-run artifact when an offline checkout is needed.

## Boundaries

Never commit credentials, private source data, student records or generated runtime state. Pages serves static docs—not the chat API, scheduler or model. Application hosting remains a [separate operation](hosting.md).

References: [VitePress deployment](https://vitepress.dev/guide/deploy), [GitHub Pages workflows](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages), [first-time enablement permissions](https://github.com/actions/configure-pages/blob/v5/action.yml).
