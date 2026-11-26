---
title: Local docs and Pages
description: "Preview and verify the VitePress documentation locally, then trace a standalone Pages or portfolio-mirror release to the source revision it serves."
teaser: "You fixed a page locally. How do you know your students can read that exact revision? Follow the change through a build, a deployment and the public URL."
---

# Run and publish the documentation

Edit the textbook in [the Lab repository](https://github.com/kaw393939/is373-rag). That repository can publish standalone documentation. The portfolio builds a separately pinned copy from the same files. A change reaches readers of each edition through its own workflow.

## Local preview

Use Node.js 22+ and Python 3.10+ with SQLite. From a directory where you keep your projects, run:

```sh
git clone https://github.com/kaw393939/is373-rag.git
cd is373-rag
npm ci
npm run dev
```

If you already have the checkout, start in its directory. Open the displayed address with the `/is373-rag/` base. Model credentials are unnecessary.

## Verify the site

Stop the development server, then run:

```sh
npm test
npm run preview
```

Open the changed lesson in the preview and follow its next link. Record `git rev-parse HEAD` and `git status --short` in your review so a colleague can identify local edits beyond that commit. A local build normally marks its pages `local`. The [clean-build instructions](../engineering/clean-build.md) include the separate Rust exercise.

## Standalone project Pages configuration

For a new fork or recovery, select **GitHub Actions** as the publishing source in the [Pages settings](https://github.com/kaw393939/is373-rag/settings/pages). In the configured Lab repository, pull requests build previews. The [Documentation workflow](https://github.com/kaw393939/is373-rag/actions/workflows/docs.yml) builds and publishes accepted changes on `main`. It reads Pages metadata for the deployed origin and base.

## What standalone publication verifies

Open the successful deployment job for the source commit and follow its reported Pages URL. It checks the public homepage, vision, glossary and a stylesheet. At the final address of the page you edited, inspect the HTML tag named `lab-docs-revision` and compare its content with the workflow commit. If you land under `/knowledge-lab/` through a compatibility redirect, use the mirror check below.

## Public GitHub Pages mirror

The [portfolio edition](https://keithwilliams.org/knowledge-lab/) has its own [build script](https://github.com/kaw393939/kaw393939.github.io/blob/main/scripts/build-knowledge-lab.mjs). It checks out an approved Lab commit, sets the base to `/knowledge-lab/`, validates the generated site and embeds it in the portfolio.

To promote a Lab release, update the revision in the portfolio’s shared release configuration. After its [publish workflow](https://github.com/kaw393939/kaw393939.github.io/actions/workflows/publish.yml) succeeds, open the changed lesson at the public address. Compare the `revision` in the [mirror manifest](https://keithwilliams.org/knowledge-lab/mirror-manifest.json) and the page’s `lab-docs-revision` with the approved **Lab** commit. The portfolio commit identifies the publishing change.

## Ongoing updates

Keep one Markdown source in the Lab repository and preserve links to the owning requirements. Release records should identify the final page URL, the Lab revision and the publishing workflow. [Documentation editing rules](../reference/documentation-map.md).

## Boundaries

These workflows publish static teaching materials. The proposed research service has a separate [application hosting plan](hosting.md). Use synthetic examples and public source material in documentation and release artifacts.
