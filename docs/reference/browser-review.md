---
title: Browser verification
description: "Read a Chrome CI receipt, inspect documentation screenshots and distinguish a successful browser check from a live publication or an accessibility audit."
teaser: "Chrome can verify that a page opened and its navigation worked. The review artifact lets you inspect the result and say exactly what the check covered."
---

# Review the rendered site

If a student says a page is unreadable on a narrow screen, begin with the specific route and viewport. Find the corresponding receipt and image, check the recorded browser version, and look at the actual line wrapping and navigation. A local screenshot helps diagnose the issue even when publication is a separate question.

The **Documentation browser review** workflow builds VitePress and serves its static output over isolated loopback HTTP in CI. It uses the runner's installed Chrome and records the exact browser version in the receipt. There is no provider credential or new application dependency.

## Automated checks

Chrome visits the homepage, project guides, reference material and student labs in desktop and mobile layouts. It also checks the desktop dark theme. Each page in the run must have one main heading, identify the source revision and fit the screen without making the whole page scroll sideways. On selected chapters, smaller phone and tablet checks cover wide tables, diagrams and keyboard scrolling.

The review tries tasks a reader might actually do. It opens local search, follows a citation, navigates the mobile menu by keyboard and checks that copying a command or article link puts the right text on the clipboard. It also checks the LinkedIn sharing address and reports JavaScript exceptions. The `documentation-browser-review` artifact contains screenshots and a JSON receipt listing the exact routes and viewports tested.

## Inspect the artifact

Pick one task before examining a screenshot: can a reader find the next section, recognize the page title, or read a table without moving the entire page sideways? Record what you observed at that viewport alongside the automated assertions.

Review the home screenshots in desktop, mobile and dark layouts and the vision-page screenshot. Automated layout checks do not judge whether a visual hierarchy or reading path is useful. Record that human/assistant inspection separately.

## Limits

This is not a Safari test, a screen-reader audit, production HTTPS validation or universal accessibility certification. The runner browser is recorded, not claimed to be identical across future runs. Static source/build checks, browser review and live Pages publication are different gates.

The [publishing workflow](../project/setup.md) separately verifies public responses and the deployed revision. [Documentation map](documentation-map.md).
