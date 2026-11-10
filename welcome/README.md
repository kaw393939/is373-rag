# Svelte welcome preview

A small, static Svelte 5 page for the first application endpoint. This is a **deployment scaffold**, not the research frontend, chat API or model service. The planned SvelteKit/TypeScript product remains on the roadmap. Keeping the welcome screen static avoids adding a temporary application server or database.

## Build and test

Use Node 24 (Node >=22.17 is accepted), from this directory:

```sh
npm ci --ignore-scripts
npm test
```

The build compiles `src/Welcome.svelte` on the server into HTML and external CSS. There is no hydration script, analytics, form submission, browser storage or provider request. Documentation links point to the repository until a Pages deployment is actually verified. `build/` and `.build/` are disposable outputs. No environment-specific address is baked into the image.

## Container

`base-images.json` records exact builder/runtime image digests. Build with those values, not guessed tags:

```sh
NODE_IMAGE=$(node -p "require('./base-images.json').builder")
WEB_IMAGE=$(node -p "require('./base-images.json').runtime")
docker build --build-arg NODE_IMAGE="$NODE_IMAGE" --build-arg WEB_IMAGE="$WEB_IMAGE" \
  --build-arg SOURCE_REVISION="$(git rev-parse HEAD)" -t ordo-rag-welcome:local .
docker run --rm --read-only --cap-drop ALL --security-opt no-new-privileges \
  --tmpfs /tmp:rw,noexec,nosuid,nodev,size=16m --memory 64m --pids-limit 64 \
  -p 127.0.0.1:8080:8080 ordo-rag-welcome:local
```

`/healthz` only establishes that this static server responds. It says nothing about the future Rust backend. The first tested container platform is Linux amd64; no ARM or native-worker pass is implied.

## Publication

The Welcome workflow builds and tests an image without Docker Hub credentials. Its image archive is the candidate release. The separate **Publish welcome image** workflow accepts a successful main-branch build run, verifies the archive hash/image ID, and pushes that exact tested image. It does not rebuild for production or deploy a host.

Docker Hub repository creation and credentials require the owner's authenticated account. Create `is373-rag` as **public** under the verified namespace; do not assume that its namespace matches the GitHub username. Set `DOCKERHUB_USERNAME` as a repository variable and `DOCKERHUB_TOKEN` as a secret using a scoped push credential. Never put it in chat, files or workflow output. Configure owner approval on the `dockerhub-release` GitHub environment before the first registry publication.

See [the hosting runbook](../docs/project/hosting.md) and [environment definitions](../deploy/README.md). A source commit is not a registry push, DNS change or live deployment.
