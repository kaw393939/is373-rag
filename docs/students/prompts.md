---
title: Prompts for AI coding partners
description: Use eight copyable prompts to plan, build, debug, and rehearse an IS373 RAG project. Each one limits the agent’s scope and asks for evidence you can check.
teaser: When an agent says it fixed your project, which result would convince you? Start with one job and ask for the smallest change you can inspect.
---

# Ask an AI coding agent for one small result

Which two terms could you use in a sentence but still have trouble telling apart? Start with those and one passage you’re allowed to share. If you already know what you want to build or debug, skip to the prompt for that task. Replace its brackets with your own files, question and observations.

Working in your existing FastAPI app? Open the [walkthrough](from-app-studio.md) first. Considering a new framework? The [library survey](library-survey.md) can help you decide whether you need one.

**Before you paste a prompt**, decide what would count as success. Give your agent only the approved repository or files it needs. Remove API keys, private records, and credentials. Have it inspect first, propose a small change, and tell you what it actually ran. You choose the design and check the result.

## 1. Help me understand without doing it for me

Use this when you can name what confuses you but still want to make the decision yourself.

```text
I keep mixing up [term A] and [term B]. Here is a passage from my project:
[permitted passage and source ID]. Here is what I think each term means:
[my explanation]. Use this passage to show the difference. Ask me to
identify each one in a second example. Wait for my answer before explaining it.
Keep this a discussion and leave my files alone.
```

## 2. Make a bounded Plan {#plan-prompt}

```text
Help me plan a small, individual RAG app for [reader] using [five permitted sources].
I must research vector and graph retrieval but may implement either or both.
First ask what my reader needs, what I have already built and where I host.
Then compare a keyword baseline, vector and graph for my five questions.
Produce: one-sentence scope, source manifest, source-to-answer diagram,
selected architecture and reason, two alternatives, five expected-evidence
questions including an unanswerable one, and three small acceptance tests.
Label all experiments PLANNED. Do not add extra requirements or a new stack.
```

## 3. Add the smallest import and inspect it

First confirm which file the agent may read. Compare the stored IDs after the first and second import.

```text
Read my existing project before editing. My authorized input corpus is [path].
Add only a small importer with source ID, origin, version and repeat-import
handling. Prefer my existing framework/database. Write a test proving that
importing the same source twice doesn't multiply records and a test for a
changed source. Explain every table and mutation. Run tests and show exact
commands and results. Stop before adding embeddings or chat.
```

## 4. Implement real retrieval, not a convincing-looking mock

```text
My selected retrieval design is [vector/graph/both], because [reason].
My five expected-evidence questions and source IDs are [list].
Implement one real end-to-end retrieval slice using my existing storage.
Expose the retrieved IDs/passages or supported graph paths before generation.
For vectors, use an actual configured embedding model for BOTH corpus and
query and record its version; do not invent vectors. Add a keyword baseline
and tests for missing/irrelevant evidence. Show the limitations. Do not
replace my hosting or implement an unused second database.
```

## 5. Add generation and source references

Use this after a test can already show the expected retrieved passage. That way you can check generation separately.

```text
Connect my real retrieval result to an available model through server-side
configuration [my existing model/provider]. Never put credentials in browser
code or logs. Feed only authorized evidence with stable IDs/locations.
Present the answer and clickable original references. Include one question
my documents cannot answer; report insufficient evidence rather than
fabricating a source. Distinguish source retrieval from verified support for
each claim. Run actual integration checks, explain untested provider behavior,
and avoid reworking unrelated code.
```

## 6. Diagnose a failure without restarting everything {#debug-prompt}

```text
Help me find ONE failure in my existing project.
Goal: [expected behavior]. Actual: [redacted error/output].
Relevant command: [command]. Environment: [local/CI/hosted].
Before editing, propose the most likely cause, the smallest inspection,
and how we can prove a fix. Do not delete my database, recreate my server,
reset credentials or change DNS. After a bounded fix, rerun the failing
check and one related regression check. State what remains unverified.
```

## 7. Make me read and defend my AI-generated code

```text
Review these specific files: [paths]. Ask me to explain how a source
becomes retrieved evidence and reaches the model. Identify the function
that owns each database write, how errors propagate, the security boundary,
and what happens on a repeat import or failed model call.
Give me three code-reading questions and one failing edge case to test.
Do not grade my understanding from code alone or claim a check ran unless
you actually executed it.
```

## 8. Rehearse the actual course demo {#demo-prompt}

```text
Act as a skeptical but kind IS373 demo reviewer. I will show my own
portfolio and individual RAG app, then explain my group contribution.
For the RAG: ask me to show one permitted source, a real retrieval trace,
a real generated answer with reference, and an unanswerable question.
Ask which vector/graph architecture I chose and why, and what my peer's
feedback changed. Ask ONE question at a time; never invent my test output.
Give constructive feedback using only evidence I actually provide.
```

## Agent safety and ownership

When you finish, open one file the agent changed, reproduce one result, and describe what the check establishes. Attribute the help you used. Keep your own reflections, actual peer feedback, source permissions, commit history, citations, and test logs grounded in what happened. If you cannot explain a change, ask for a smaller patch. Keep credentials out of the conversation.

[Return to the student path](index.md) · [Check the work](check.md)

