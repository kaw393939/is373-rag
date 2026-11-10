---
title: Browser verification
description: What the automated documentation browser review checks and what it cannot prove.
---

# Review the rendered site

The **Documentation browser review** workflow builds VitePress and serves its static output over isolated loopback HTTP in CI. It uses the runner's installed Chrome and records the exact browser version in the receipt. There is no provider credential or new application dependency.

## Automated checks

Seven routes are inspected at desktop and narrow-screen sizes and in dark mode: homepage, vision, walkthrough, design, build, glossary and twelve-factor guidance. Each must have one H1, a source-revision marker and no page-level horizontal overflow.

The review also opens local search, checks results remain under the repository path, opens mobile navigation and rejects reported JavaScript exceptions. It captures screenshots and a JSON receipt in the `documentation-browser-review` artifact.

## Inspect the artifact

Review the home screenshots in desktop, mobile and dark layouts and the vision-page screenshot. Automated layout checks do not judge whether a visual hierarchy or reading path is useful. Record that human/assistant inspection separately.

## Limits

This is not a Safari test, a screen-reader audit, production HTTPS validation or universal accessibility certification. The runner browser is recorded, not claimed to be identical across future runs. Static source/build checks, browser review and live Pages publication are different gates.

The [publishing workflow](../project/setup.md) separately verifies public responses and the deployed revision. [Documentation map](documentation-map.md).
