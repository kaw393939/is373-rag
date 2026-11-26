---
title: Documentation map
description: "Find the authoritative home for a requirement, design choice, roadmap slice or source finding, and keep reader-facing navigation consistent as the site evolves."
teaser: "A requirement changes. Which page should you edit so a student, reviewer and maintainer all read the same rule?"
---

# One question, one authoritative home

For a change to what counts as an accepted result, start with the requirement. For a change to when a feature gets built, start with the roadmap. Link summaries back to their owner so that a promise made on one page does not survive an amendment on another.

Each section answers a different reader question.

| Section | Reader's question | Owns |
| --- | --- | --- |
| Students | How do I plan, build and check my IS373 project? | Student RAG guide and optional exercises |
| Research overview | Why does this exist, and what could I do? | Vision, capabilities and a fictional walkthrough |
| Design | What are the system's boundaries? | Modules, knowledge, streaming and workers |
| Build | What do I implement and verify next? | Reuse, roadmap, clean builds, twelve factors and labs |
| Reference | Where is the supporting detail? | Source audit, vocabulary and earlier alternatives |

## Single sources of truth

[Requirements](../project/acceptance.md) own acceptance IDs. The [roadmap](../project/roadmap.md) owns implementation order. The [source audit](../reuse/source-audit.md) owns donor findings. [Status](../status.md) distinguishes delivered artifacts from future work. Other pages link to these instead of copying their tables.

## Writing rules

Lead with the answer. Keep entry pages short; send deeper detail to its canonical page. Explain a term before using its abbreviation. Give one realistic example and one meaningful limitation. Code blocks contain executable commands or clearly labelled design examples.

Use **Available**, **Planned**, **Reference**, or an explicit verification statement where status matters. A mock is not a working model, a build is not a deployment, and an authored test is not a test result.

## Navigation and accessibility

Five primary links lead to the student guide and four research sections. Sidebars show the current section, not the entire archive. Search, outlines and status remain available. Preserve old URLs when reorganizing content.

Use descriptive links, one page H1, sequential headings, visible focus and responsive content. Tables may scroll; the whole page should not. Do not encode status by color alone.

## Change verification

Try a reader’s route after editing. Start at a section hub, follow its link to the owning page, and locate the exact requirement, decision or source. The route should still work from a narrow screen and from a direct link shared before the edit.

Run `npm test` and `node scripts/check-ia.mjs` after a build. Review desktop, narrow-screen and dark-mode rendering separately. Keep Pages publication evidence distinct from build checks. See [publishing](../project/setup.md).
