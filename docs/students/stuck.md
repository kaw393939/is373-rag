---
title: Troubleshoot your RAG project
description: Find the first broken link in your RAG app, from document import to hosted answers. Use a repeatable check before changing the model, database, or server.
teaser: If an answer cites the wrong policy, first ask what the search returned. One source ID can narrow a confusing problem to a single part of your app.
---

# Stuck? Find the first broken step

Take one question that got a wrong answer. Open the first passage your search returned and read it beside the source you expected.

- **The needed words are missing.** Check that the original made it into the index, then inspect the chunks the search returned.
- **The passage contains the answer.** Check whether those words reached the model. If they did, inspect the model’s response.
- **The answer is supported but the link opens elsewhere.** Follow the returned source and chunk IDs to the location your app displays.

Use the table below for the first step that failed. [Optional debugging prompt](prompts.md#debug-prompt)

| What you see | Try this first | If that check fails |
| --- | --- | --- |
| A source is missing after import | Count imported rows and look for its stable ID. | Check the file path, permission to read it, parser, and importer error. |
| A second import creates duplicates | Compare IDs and counts before and after repeating the import. | Check how the importer recognizes an existing version. |
| Search finds nothing | Inspect the stored text or graph and query the index directly. | Check the chunk boundaries, tokenization, and whether the model/index is ready. |
| Vector results look unrelated | Compare the embedding model/version for documents and questions. Open the passages behind the scores. | Compare with a keyword baseline, then test one change in chunking or filters. |
| A graph points to the wrong person or fact | Follow one relationship back to its source passage. | Check whether two entities were merged or a relationship was extracted incorrectly. |
| The answer ignores the documents | Inspect a redacted copy of the passages actually sent to the model. | Fix the search or context selection if the expected passage is missing. |
| A citation opens the wrong passage | Compare the source ID and text with the claim on screen. | Check how the app maps IDs to links and add a test for this case. |
| The model call fails | Check service readiness and the returned status. Keep credentials out of logs. | Confirm the provider configuration, account access, and resource limits. |
| The app works locally but fails online | Compare the active configuration and health of the two environments. | Check HTTPS, proxy, bind address, and database persistence. |
| Everything disappears after a restart | Restart a test instance and look for the same source ID. | Check whether the data lives in a durable volume or store. |

## Diagnostic order

Follow one source through five places: **original document → stored record → retrieved passage or path → model context and answer → hosted result**. If the expected sentence is already missing at retrieval, changing the response wording cannot bring it back.

## Two safe fallbacks

**Retrieval is blocked.** Use a keyword search on the same source to see whether import and IDs work. Label it as a baseline and return to your chosen vector or graph implementation once you’ve isolated the problem.

**The model is unavailable.** Demonstrate the real import and search that you can run. Mark generation as incomplete. Check your existing local, shared, or provider access. If you use a fixed response to test a button, label it as a mock.

## What to bring to class or office hours

Bring the repo and URL, one action you tried, the source ID or query, what you expected, and the actual result or redacted error. Include the checks you already ran. Remove API keys, passwords, full environment files, and private student information.

[Small build path](build.md) · [Verification worksheet](check.md) · [Official course brief](https://github.com/kaw393939/is373-studio/blob/main/docs/projects/individual.md)
