<script setup lang="ts">
import { computed, onMounted, ref, nextTick } from 'vue'
import { useData } from 'vitepress'
import { canonicalUrl } from '../../publication'

const { page } = useData()
const url = computed(() => canonicalUrl(page.value.relativePath))
const linkedIn = computed(() => 'https://www.linkedin.com/sharing/share-offsite/?url=' + encodeURIComponent(url.value))
const ready = ref(false)
const supportsShare = ref(false)
const status = ref('')
const field = ref<HTMLInputElement>()
const manual = ref(false)
onMounted(() => {
  ready.value = true
  supportsShare.value = typeof navigator.share === 'function'
})

async function selectLink() {
  status.value = 'Select and copy this page link.'
  manual.value = true
  await nextTick()
  field.value?.focus()
  field.value?.select()
}
async function copy() {
  try {
    await navigator.clipboard.writeText(url.value)
    manual.value = false
    status.value = 'Link copied.'
  } catch { await selectLink() }
}
async function share() {
  try { await navigator.share({ title: page.value.title, url: url.value }) }
  catch (error) { if (!(error instanceof Error && error.name === 'AbortError')) await selectLink() }
}
</script>
<template>
  <div class="lab-page-share" role="group" aria-label="Share this page">
    <a :href="linkedIn">Share on LinkedIn</a>
    <button v-if="ready" type="button" @click="copy">Copy link</button>
    <button v-if="supportsShare" type="button" @click="share">More sharing options</button>
    <span role="status" aria-live="polite">{{ status }}</span>
    <label v-if="manual">Page link <input ref="field" :value="url" type="url" readonly @focus="field?.select()"></label>
  </div>
</template>
<style scoped>
.lab-page-share { display: flex; gap: .3rem 1rem; flex-wrap: wrap; align-items: center; }
.lab-page-share button, .lab-page-share a { display: inline-flex; align-items: center; min-height: 2.65rem; padding: 0; border: 0; color: var(--vp-c-brand-1); background: transparent; font: 600 .89rem/1.45 var(--vp-font-family-base); text-decoration: underline; text-underline-offset: .2em; cursor: pointer; }
.lab-page-share :is(a, button, input):focus-visible { outline: 3px solid var(--vp-c-brand-1); outline-offset: 3px; }
.lab-page-share span, .lab-page-share label { color: var(--vp-c-text-2); font-size: .9rem; }
.lab-page-share span:empty { display: none; }
.lab-page-share label { width: 100%; }
.lab-page-share input { width: min(100%, 31rem); border: 1px solid var(--vp-c-divider); background: var(--vp-c-bg); padding: .5rem; border-radius: .15rem; color: var(--vp-c-text-1); }
</style>
