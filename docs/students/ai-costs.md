---
title: AI models, tokens and your budget
description: Compare Groq, Gemini, OpenAI, Anthropic and DeepSeek, understand token bills, and build a small RAG app without surprise costs.
---

# Good answers. Small budget. No surprises.

**Start with Groq for a small public-data experiment. Keep Gemini as another free-tier option.** Then compare results, not just prices. The cheapest answer is not useful if its citations are wrong.

This is optional project help, not a requirement to buy a subscription or change your assignment. You can [test retrieval locally](reference.md) without any key. Hosted generation is a separate step; this page does not claim that every provider is already implemented in the local lab.

## Choose a starting point

- **Groq:** a useful first stop for fast interactive experiments with a free API allowance. Groq hosts models; `openai/gpt-oss-20b` on Groq is not a ChatGPT subscription or an OpenAI API bill.
- **Gemini:** another free API starting point for permitted public or synthetic material. Check the data terms before uploading anything.
- **OpenAI, Anthropic and DeepSeek:** useful comparison candidates when you have API access and a small approved budget. Don't assume that a free chatbot account supplies free API calls.

Try the same five source-backed questions with two models. Record citation correctness, unsupported claims, latency and **cost per acceptable answer**. A higher price alone does not prove higher quality.

## Compare actual models, not company names

**Official prices checked November 11, 2026. USD per 1 million tokens.** These are selected examples, not an exhaustive catalog or a ranking of equal capabilities. Standard text generation, uncached input, no batch discount; taxes, hosting, embedding and tool charges excluded. Confirm the live pricing and model availability before enabling billing.

*On a narrow screen, swipe the table sideways to see all prices.*

| Provider and example model | Input / 1M | Output / 1M | 1,000 example answers* |
| --- | ---: | ---: | ---: |
| [Groq: `openai/gpt-oss-20b`](https://console.groq.com/docs/models) | $0.075 | $0.30 | $0.375 |
| [Groq: `openai/gpt-oss-120b`](https://console.groq.com/docs/models) | $0.15 | $0.60 | $0.75 |
| [Google: `gemini-2.5-flash-lite`](https://aistudio.google.com/docs/pricing#gemini-2.5-flash-lite) | $0.10 | $0.40 | $0.50 |
| [OpenAI: `gpt-5.4-mini`](https://developers.openai.com/api/docs/models/gpt-5.4-mini) | $0.75 | $4.50 | $4.50 |
| [Anthropic: `claude-haiku-5-5`](https://platform.claude.com/docs/en/about-claude/pricing) | $0.10 | $0.50 | $0.55 |
| [DeepSeek: `deepseek-flash`, peak](https://api-docs.deepseek.com/quick_start/pricing/) | $0.30 | $1.20 | $1.50 |
| [DeepSeek: `deepseek-flash`, off-peak](https://api-docs.deepseek.com/quick_start/pricing/) | $0.15 | $0.60 | $0.75 |

\*Each answer uses **3,000 input + 500 total billed output tokens**. This is a calculation, not measured performance or a promise about how many visible words you receive. Different tokenizers can count the same text differently; measure real usage when comparing providers.

**Conditions matter.** Haiku 5.5's row applies to prompts up to 100,000 tokens; above that its base input/output rates are $0.50/$2.50. DeepSeek's current `deepseek-flash` resolves to V4.1-Flash-1017. Its peak window is weekdays 01:00–04:00 and 06:00–10:00 UTC, excluding Chinese public holidays; other hours are off-peak. Use peak rates when budgeting conservatively. OpenAI regional processing has an additional uplift. Cached input, cache writes/storage, search and other tools can change every provider's bill. Don't price an entire application from its cheapest cached-token headline.

## What does “free” actually mean?

**Groq:** the [published free limits](https://console.groq.com/docs/rate-limits) for both GPT-OSS examples are 30 requests/minute, 1,000/day, 8,000 tokens/minute and 200,000/day, applied at the organization level. Your console is authoritative. A 3,500-token request can exhaust the token allowance well before the request allowance. Queue calls; respect `429` and retry guidance rather than creating accounts to bypass limits.

**Gemini:** the selected Flash-Lite model lists free input/output with rate limits. Google's pricing page says free-tier content can be used to improve products, while paid-tier content is not used for that purpose, subject to its terms. Free access is not permission to upload classmates' work or private records.

**OpenAI:** the selected model lists no free API tier. ChatGPT is the user-facing app; the API powers your code. Treat billing separately. Some eligible subscriptions have a limited [API-credit benefit](https://help.openai.com/en/articles/20001626-api-credits-benefit-for-eligible-chatgpt-subscriptions); check eligibility and activation rather than assuming your plan covers it.

**Anthropic and DeepSeek:** budget for paid API usage unless your account explicitly shows usable credits. Trials, grants or subscriber benefits are not a permanent free allowance. Check credit expiry and what happens when it runs out.

For **every** provider, review age/region eligibility, account permissions and current terms. Groq's [data policy](https://console.groq.com/docs/your-data) distinguishes default inference handling from retention for certain features, reliability and abuse monitoring. “Not used for training” and “never stored” are different promises. Use public/synthetic documents for this lab.

## Read your bill before you grow it

A token is a small piece of text, not necessarily a word. Code, punctuation and different languages tokenize differently. Use the provider's tokenizer or response usage counts, not a word-count guess.

- **Input:** instructions + question + conversation history + retrieved passages + tool schemas/results.
- **Output:** generated tokens, including billed reasoning/thinking where applicable. A short visible reply can still consume more.
- **Context window:** how much a request can hold, not a free allowance or a target to fill.
- **Rate limit:** how quickly you can call the service. A low price does not prevent throttling.

```text
cost = input_tokens / 1,000,000 × input_price
     + billed_output_tokens / 1,000,000 × output_price
     + separately billed tools, storage and other services
```

For Groq 20B, one example costs `3000/1M × $0.075 + 500/1M × $0.30 = $0.000375`. That is **0.0375 cents**, not 0.375 dollars. At 1,000 calls, it is **$0.375** before other charges. Free-tier eligibility may reduce the actual generation bill to zero, but not remove quotas.

A class of 30 students testing 100 times each makes 3,000 calls: **$1.125** at that paid rate. Three model calls per answer triples the estimate to **$3.375**; doubling again for retries and evaluation makes it **$6.75**. This is planning math, not a shared-key recommendation.

For a product, start with `active users × answers/user × calls/answer`. Add embeddings, hosting, storage, support and payment fees. A $10 hosting bill may exceed token costs in a small demo. Track cost per successful answer and reserve room for failures before choosing a selling price.

## Can graphs or vectors lower the token bill?

**Yes, by helping you select better evidence, not by making information magically free.** A vector is a numeric representation used to find similar content; a graph stores entities and relationships you can traverse. Usually the model receives selected text or serialized facts, not the entire database or its vector index. That text still becomes input tokens.

Think of **useful evidence per token**, rather than a universal “density of meaning” score. A compact graph fact such as `Course A → requires → Course B` can replace a long irrelevant passage, but may omit the exception, date or source that makes the fact true. Keep provenance and retrieve the supporting passage when needed. Graph construction, summaries and embeddings can themselves cost money; stale or incorrect summaries can make cheap answers worse.

**Illustrative comparison:** suppose a long-context approach sends 20,000 input tokens per question, while targeted retrieval sends 3,000. At Groq 20B's listed paid input rate, that is $1.50 versus $0.225 for 1,000 questions: **$1.275 saved on input**, holding output fixed. These are assumed token counts, not a benchmark proving graph search beats vector search. A good SQL filter may save just as much. If building the index costs more than the savings, a tiny demo may never break even.

Compare SQL filters, keyword search, vector search, graph traversal and combinations on the **same questions and source snapshot**. Measure retrieval quality, citation accuracy, input/output tokens, indexing cost, latency and abstention when evidence is missing. Count only correct, adequately supported answers as successes. [Choose a database and retrieval approach](data-choices.md).

## Keep the budget and the key under control

1. Start with a tiny request and inspect its actual usage. Set a small spending limit where supported and alerts before it. An alert is not necessarily a hard stop.
2. Enforce server-side limits on prompt size, retrieved chunks, output tokens, concurrent requests and calls per user. Limit agent iterations and retries. Require authentication and abuse controls before exposing a paid generation endpoint. Never silently switch from free to paid.
3. Keep keys on your server in ignored environment files or deployment secrets. Ignore secret files using both `.gitignore` and `.dockerignore`; a Git ignore rule does not stop Docker `COPY`. Never put them in Git, screenshots, frontend JavaScript, `VITE_*` variables, Docker images or Pages. Rotate an exposed key immediately.
4. Keep one provider adapter behind your application's interface. Configure provider/model on the server. Test differences in streaming, tools, JSON, token accounting and errors; “OpenAI-compatible” does not mean identical.
5. Log model/version, usage, latency and estimated cost, not secrets or sensitive prompt text. Compare logs with the billing dashboard.

**Try it:** run five questions, calculate the actual cost, then halve your retrieved context. Did the bill fall? Did citation quality survive? Keep the improvement only if both the evidence and the budget make sense. This is a learning exercise, not another graded deliverable.
