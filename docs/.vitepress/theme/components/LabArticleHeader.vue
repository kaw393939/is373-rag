<script setup lang="ts">
import { computed } from 'vue'
import { useData, withBase } from 'vitepress'
import { canonicalUrl, editorialImage, publication } from '../../publication'
import LabShare from './LabShare.vue'
import AudioNarration from './AudioNarration.vue'
const { page, frontmatter } = useData()
const pageUrl = computed(() => canonicalUrl(page.value.relativePath))
const route = computed(() => '/' + pageUrl.value.slice(publication.length))
const art = computed(() => editorialImage(page.value.relativePath))
</script>
<template>
  <div class="lab-article-entry">
    <p class="lab-credit">
      By <a href="https://keithwilliams.org/about" rel="author">Keith Williams</a>
      <span aria-hidden="true"> · </span><span>Ordo Knowledge Lab</span>
    </p>
    <p class="lab-print-source">Chapter online: <a :href="pageUrl">{{ pageUrl }}</a></p>
    <div class="lab-deck-row">
      <p class="lab-page-deck">{{ frontmatter.teaser || page.description }}</p>
      <img :src="withBase('/' + art.path)" :alt="art.alt" :width="art.width" :height="art.height" decoding="async">
    </div>
    <AudioNarration :key="route" :route="route" kind="chapter" />
    <LabShare :key="page.relativePath" />
  </div>
</template>
<style scoped>
.lab-article-entry { margin: 1.2rem 0 1.65rem; padding-bottom: .55rem; border-bottom: 1px solid var(--vp-c-divider); }
.vp-doc .lab-credit { margin: 0 0 .75rem; font: .94rem/1.5 var(--vp-font-family-base); color: var(--vp-c-text-2); }
.lab-credit a { color: var(--vp-c-brand-1); font-weight: 600; text-underline-offset: .18em; }
.lab-print-source { display: none; }
.lab-deck-row { display: grid; grid-template-columns: minmax(0, 1fr) minmax(8rem, 30%); align-items: center; gap: 1.25rem; }
.lab-deck-row img { width: 100%; height: auto; }
.vp-doc p.lab-page-deck { margin: 0; font: 400 clamp(1.2rem, 1.1rem + .4vw, 1.45rem)/1.44 var(--lab-font-editorial); font-optical-sizing: auto; color: var(--vp-c-text-1); }
.lab-article-entry .lab-page-share { margin-top: .45rem; }
@media (max-width: 600px) {
 .lab-deck-row { grid-template-columns: minmax(0, 1fr); gap: 1rem; }
 .lab-deck-row img { max-width: 28rem; }
}
@media print {
  .vp-doc .lab-credit { margin: 0; color: #171c19; font-size: 10pt; break-after: avoid; }
  .vp-doc .lab-print-source { display: block; margin: .1rem 0 .75rem; font-size: 9pt; line-height: 1.45; }
  .lab-print-source a { color: inherit; overflow-wrap: anywhere; }
}
</style>
