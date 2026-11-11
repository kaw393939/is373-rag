---
title: Troubleshoot your RAG project
description: Diagnose missing documents, irrelevant retrieval, model failures, bad citations and deployment without destructive resets.
---

# Stuck? Find the first broken step

You do not need to debug the entire application at once. Trace **one source and one question** from import to visible answer. Record expected versus actual behavior. Use [the debugging agent prompt](prompts.md#debug-prompt) with redacted output.

| What you see | First safe check | Likely next action |
| --- | --- | --- |
| No source in the database | Count imported rows and source IDs | Inspect path, permissions, parser and importer error |
| Duplicate rows after reimport | Import twice, compare IDs/counts | Add stable IDs and an update/skip rule |
| Search finds nothing | Query the index directly, inspect stored text | Check chunking, tokenization, model/index readiness |
| Irrelevant vector results | Confirm corpus/query embedding model IDs, inspect scores | Compare a keyword baseline; improve corpus/chunks/filters |
| Graph traversal gives wrong facts | Inspect stored edges and supporting passages | Repair extraction/identity decisions and provenance |
| Model responds but ignores documents | Print the **redacted** retrieved context before the model call | Fix retrieval or context selection before rewriting prompts |
| Citation does not match answer | Open source ID and passage, compare claim | Correct citation wiring, add grounded evaluation |
| Model refuses or endpoint fails | Check server logs for status and readiness, not tokens | Confirm configured provider, access and resource limit |
| Local app works but hosted app fails | Compare runtime config/health without exposing secrets | Check proxy, HTTPS, bind address, environment and persistence |
| Works until restart | Restart a test instance and read persistent state | Move durable data outside disposable container storage |

## Diagnostic order

1. **Source:** Can you open the original document and see its stable ID?
2. **Stored representation:** Can you inspect real chunks/metadata or graph edges?
3. **Retrieval:** Can you run one question without generation and see actual evidence IDs?
4. **Generation:** Is a real configured model called, and what authorized context did it receive?
5. **Browser and deployment:** Can the hosted UI show the source and answer after a restart?

Do not solve a retrieval problem by asking the model to be more confident.

## Two safe fallbacks

If advanced retrieval is blocked, demonstrate a **keyword baseline** to identify whether import and source mapping work, then return to the selected vector/graph implementation. Label the baseline; it is not a finished substitute for the assigned method.

If your model is blocked, demonstrate real import/retrieval and mark generation as incomplete. Investigate existing supported local/shared/provider access rather than buying hardware or silently inserting canned answers. A mock can test UI wiring but must remain labeled.

## What to bring to class or office hours

Your repo and URL, the **single action** you attempted, expected result, actual redacted error, source ID or query, and what you tried. Never share passwords, API keys, full .env files or private student material.

[Small build path](build.md) · [Verification worksheet](check.md) · [Official course brief](https://github.com/kaw393939/is373-studio/blob/main/docs/projects/individual.md)

