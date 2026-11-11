# Ordo Knowledge Lab · IS373

**Knowledge you can inspect, correct, move and publish.** A Rust-first research workspace built by selectively reusing Ordo, with evidence-backed knowledge, reviewed publication and streaming chat.

**Available:** documentation, validation scripts, synthetic contract labs and a static Svelte welcome scaffold. **Planned:** the research application runtime. See [status](docs/status.md).

## Current IS373 students

**Start with the [IS373 student RAG guide](docs/students/index.md)** for the original individual assignment: small Plan/Build/Release steps, [copy-ready AI coding prompts](docs/students/prompts.md), [debugging](docs/students/stuck.md), [evaluation](docs/students/check.md), and an [optional local retrieval lab](student-reference/README.md). The [original course brief](https://github.com/kaw393939/is373-studio/blob/main/docs/projects/individual.md) and Canvas remain authoritative. This guide adds no graded work or required stack.

**Before choosing an API:** [Compare Groq, Gemini, OpenAI, Anthropic and DeepSeek](docs/students/ai-costs.md), with dated prices, free-tier caveats and worked token budgets. Then explore [database choices, Weaviate and build versus buy](docs/students/data-choices.md).

## Documentation

| Start | Design | Build | Reference |
| --- | --- | --- | --- |
| [Vision](docs/guide/vision.md) | [System](docs/design/index.md) | [Build guide](docs/build/index.md) | [Reference library](docs/reference/index.md) |
| [Capabilities](docs/guide/capabilities.md) | [Knowledge rules](docs/project/knowledge.md) | [Roadmap](docs/project/roadmap.md) | [Source audit](docs/reuse/source-audit.md) |
| [Walkthrough](docs/guide/walkthrough.md) | [Streaming](docs/project/streaming.md) | [Twelve factors](docs/engineering/twelve-factor.md) | [Glossary](docs/reference/glossary.md) |

**Public documentation:** [Ordo Knowledge Lab on GitHub Pages](https://kaw393939.github.io/knowledge-lab/), published as a verified-source VitePress mirror through the [portfolio repository](https://github.com/kaw393939/kaw393939.github.io). The [standalone project site](https://kaw393939.github.io/is373-rag/) is also enabled and publishes from this repository. The portfolio build pins this repository's source commit rather than copying or diverging the textbook. [Publishing and verification](docs/project/setup.md).

## Run locally

Use Node.js 22+; Python 3.10+ is also needed for `npm test`.

```sh
npm ci
npm test
node scripts/check-ia.mjs
npm run dev
```

Open the displayed URL with `/is373-rag/`. The build writes `dist/`. No GPU, model credential or private repository is needed. Seven Rust example tests run separately in CI; [local commands and verification scope](docs/engineering/clean-build.md).

## Scope and evidence

The [source ledger](docs/public/source-ledger.json) pins inspected donor files. The [acceptance register](docs/project/acceptance.md) owns requirement IDs; the [S0–S7 roadmap](docs/project/roadmap.md) owns delivery order. Historical architecture and research are labelled reference material. The [documentation map](docs/reference/documentation-map.md) explains editing and navigation.

Synthetic labs test selected contracts, not the full application or donor runtime suites. Keep source → issue → atomic commit → test → evidence traceability. No private code was bulk imported.

## Separate deployment surfaces

Pages hosts these static docs only. The portfolio is independent. The [Svelte welcome scaffold](welcome/README.md) and [application hosting plan](docs/project/hosting.md) target `dev-rag.keithwilliams.org` and `rag.keithwilliams.org`; neither enables chat nor establishes live deployment. Do not change DNS, account settings or the server merely to build documentation.
