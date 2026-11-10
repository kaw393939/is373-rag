# Local folder and documentation publishing

This procedure affects only the project checkout and documentation. It does not install the application or change portfolio DNS.

## Make the real local folder

On your Mac or Linux computer, choose a parent directory. The example uses your home Projects directory and does not assume a particular account name.

```sh
mkdir -p "$HOME/Projects"
cd "$HOME/Projects"
git clone https://github.com/kaw393939/is373-rag.git
cd is373-rag
npm ci
npm run dev
```

Use an existing checkout instead of cloning over it. Inspect `git status` and preserve uncommitted work. An assistant sandbox folder is not proof that this folder exists on your computer.

The development URL includes the configured base path, normally `/is373-rag/`. Node.js 22+ is required. No API key is needed.

## Validate before publishing

```sh
npm run build
node scripts/check-pages.mjs
npm run preview
```

VitePress checks source links. The extra checker validates generated local targets, project-subpath assets and required project pages. These checks do not replace keyboard, screen-reader or real-device review.

## Enable GitHub Pages once

In this repository, open **Settings → Pages → Build and deployment → Source → GitHub Actions**. Then run **Actions → Documentation → Run workflow** on `main`.

The configured build publishes `dist/`, not the source tree or an application server. The workflow reports a skipped deployment when Pages is not enabled rather than claiming success. Read the deployment job's actual URL and verify a page before calling the site live.

The intended repository address is `https://kaw393939.github.io/is373-rag/`. An account-level custom domain may change the hostname; preserve `/is373-rag/` for a project site unless the Pages configuration explicitly changes it. This repo does not set a custom `CNAME`.

## Publishing parameters

`DOCS_BASE` defaults to `/is373-rag/`; `DOCS_ORIGIN` defaults to `https://kaw393939.github.io`. The Pages workflow sets them explicitly. For an approved alternative host, set both deliberately and validate links again; no external domain is presumed live.

The `source-checkout` Actions artifact contains a Git bundle. It can create a complete offline checkout:

```sh
git clone -b main /path/to/is373-rag.bundle "$HOME/Projects/is373-rag"
cd "$HOME/Projects/is373-rag"
git remote set-url origin https://github.com/kaw393939/is373-rag.git
```

A bundle produced on an unmerged PR may not contain the latest main changes. Use the artifact from the relevant successful main build for the published checkout.

## Repository safety

Do not commit credentials, real environment files, databases, private research inputs, student records or generated runtime artifacts. The public documentation describes operational controls without copying private inventories. Keep dependencies pinned through the existing lockfile and review upgrades separately.

References: [VitePress deployment](https://vitepress.dev/guide/deploy) and [GitHub custom Pages workflows](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages).
