---
title: Documentation map
description: Information architecture and editing rules for the documentation site.
---

# One question, one authoritative home

The site follows a reader's task rather than the repository's history.

| Section | Reader's question | Owns |
| --- | --- | --- |
| Start | Why does this exist, and what could I do? | Vision, capabilities and a fictional walkthrough |
| Design | What are the system's boundaries? | Modules, knowledge, streaming and workers |
| Build | What do I implement and verify next? | Reuse, roadmap, clean builds, twelve factors and labs |
| Reference | Where is the supporting detail? | Source audit, vocabulary and earlier alternatives |

## Single sources of truth

[Requirements](../project/acceptance.md) own acceptance IDs. The [roadmap](../project/roadmap.md) owns implementation order. The [source audit](../reuse/source-audit.md) owns donor findings. [Status](../status.md) distinguishes delivered artifacts from future work. Other pages link to these instead of copying their tables.

## Writing rules

Lead with the answer. Keep entry pages short; send deeper detail to its canonical page. Explain a term before using its abbreviation. Give one realistic example and one meaningful limitation. Code blocks contain executable commands or clearly labelled design examples.

Use **Available**, **Planned**, **Reference**, or an explicit verification statement where status matters. A mock is not a working model, a build is not a deployment, and an authored test is not a test result.

## Navigation and accessibility

Four primary items lead to short section hubs. Sidebars show the current section, not the entire archive. Search, outlines and status remain available. Preserve old URLs when reorganizing content.

Use descriptive links, one page H1, sequential headings, visible focus and responsive content. Tables may scroll; the whole page should not. Do not encode status by color alone.

## Change verification

Run `npm test` and `node scripts/check-ia.mjs` after a build. Review desktop, narrow-screen and dark-mode rendering separately. Keep Pages publication evidence distinct from build checks. See [publishing](../project/setup.md).
