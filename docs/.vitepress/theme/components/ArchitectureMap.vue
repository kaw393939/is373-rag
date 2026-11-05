<script setup lang="ts">
import { computed, ref } from 'vue'
import { withBase } from 'vitepress'

const active = ref<'chat' | 'ingest'>('chat')
const paths = {
  chat: {
    label: 'Live conversation',
    note: 'The live path stays short. Published evidence is retrieved before grounded answer text streams back to the browser.',
    nodes: [
      { tag: '01 / INTERFACE', title: 'SvelteKit', detail: 'Initial rendering and reactive conversation state', href: '/architecture/frontend' },
      { tag: '02 / SERVING', title: 'Rust + Axum', detail: 'Run ownership, retrieval, and direct answer streaming', href: '/architecture/backend' },
      { tag: '03 / KNOWLEDGE', title: 'Hybrid retrieval', detail: 'BM25, vectors, and source-backed relationships', href: '/architecture/retrieval' },
      { tag: '04 / RESPONSE', title: 'Grounded answer', detail: 'Model output with ordered events and source citations', href: '/architecture/contracts' },
    ],
  },
  ingest: {
    label: 'Document ingestion',
    note: 'A durable DAG owns progression. Search can become ready while deeper graph extraction and augmentation continue.',
    nodes: [
      { tag: '01 / SOURCE', title: 'Parse + chunk', detail: 'Preserve structure, document revision, and source anchors', href: '/architecture/ingestion' },
      { tag: '02 / ENRICH', title: 'NLP + resolution', detail: 'Mentions, canonical entities, and qualified claims', href: '/architecture/ingestion' },
      { tag: '03 / PUBLISH', title: 'Versioned artifacts', detail: 'Commit current indexes and publish readiness events', href: '/architecture/contracts' },
      { tag: '04 / RETRIEVE', title: 'Search ready', detail: 'Independent lexical, vector, and graph capabilities', href: '/architecture/retrieval' },
    ],
  },
}
const path = computed(() => paths[active.value])
</script>

<template>
  <section class="architecture-map" aria-labelledby="path-title">
    <div class="map-header">
      <div><span class="eyebrow">ONE SYSTEM, TWO PATHS</span><h2 id="path-title">Follow the work.</h2></div>
      <div class="path-switch" role="group" aria-label="Architecture path">
        <button v-for="key in (['chat', 'ingest'] as const)" :key="key" type="button" :aria-pressed="active === key" @click="active = key">{{ paths[key].label }}</button>
      </div>
    </div>
    <p class="map-description" aria-live="polite">{{ path.note }}</p>
    <div class="path-nodes">
      <a v-for="node in path.nodes" :key="node.tag" class="path-node" :href="withBase(node.href)">
        <span class="node-tag">{{ node.tag }}</span><h3>{{ node.title }}</h3><p>{{ node.detail }}</p><span class="node-link" aria-hidden="true">↗</span>
      </a>
    </div>
    <div class="map-bottom"><span class="map-dot"></span>Draft design · Technology choices remain subject to validation<a :href="withBase('/decisions/')">View decisions →</a></div>
  </section>
</template>
