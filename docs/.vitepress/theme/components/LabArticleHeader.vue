<script setup lang="ts">
import { computed } from 'vue'
import { useData, withBase } from 'vitepress'
import { editorialImage } from '../../publication'
import LabShare from './LabShare.vue'
const { page, frontmatter } = useData()
const art = computed(() => editorialImage(page.value.relativePath))
</script>
<template>
  <div class="lab-article-entry">
    <div class="lab-deck-row">
      <p class="lab-page-deck">{{ frontmatter.teaser || page.description }}</p>
      <img :src="withBase('/' + art.path)" :alt="art.alt" :width="art.width" :height="art.height" decoding="async">
    </div>
    <LabShare :key="page.relativePath" />
  </div>
</template>
<style scoped>
.lab-article-entry { margin: 1.2rem 0 1.65rem; padding-bottom: .55rem; border-bottom: 1px solid var(--vp-c-divider); }
.lab-deck-row { display: grid; grid-template-columns: minmax(0, 1fr) minmax(8rem, 30%); align-items: center; gap: 1.25rem; }
.lab-deck-row img { width: 100%; height: auto; }
.vp-doc p.lab-page-deck { margin: 0; font: 400 clamp(1.2rem, 1.1rem + .4vw, 1.45rem)/1.44 var(--lab-font-editorial); font-optical-sizing: auto; color: var(--vp-c-text-1); }
.lab-article-entry .lab-page-share { margin-top: .45rem; }
@media (max-width: 600px) {
 .lab-deck-row { grid-template-columns: minmax(0, 1fr); gap: 1rem; }
 .lab-deck-row img { max-width: 28rem; }

}
</style>
