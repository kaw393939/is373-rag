<script setup lang="ts">
import { computed, nextTick, onMounted, ref, useId } from 'vue'
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
const help = useId()

onMounted(() => {
  ready.value = true
  supportsShare.value = typeof navigator.share === 'function'
})

async function selectLink() {
  manual.value = true
  status.value = 'Copy the selected address using your device’s copy command.'
  await nextTick()
  field.value?.focus()
  field.value?.select()
}

async function copy() {
  status.value = ''
  await nextTick()
  try {
    await navigator.clipboard.writeText(url.value)
    manual.value = false
    status.value = 'Link copied.'
  } catch {
    await selectLink()
  }
}

async function share() {
  try {
    await navigator.share({ title: page.value.title, url: url.value })
  } catch (error) {
    if (!(error instanceof Error && error.name === 'AbortError')) await selectLink()
  }
}
</script>

<template>
  <div class="lab-page-share" role="group" aria-label="Share this page" :aria-describedby="help">
    <div class="lab-sharing-actions">
      <a :href="linkedIn">Share on LinkedIn</a>
      <button v-if="ready" type="button" @click="copy">Copy link</button>
      <button v-if="supportsShare" type="button" @click="share">More sharing options</button>
    </div>
    <p :id="help" class="lab-share-help">LinkedIn opens a draft you can review before posting.</p>
    <p role="status" aria-live="polite" aria-atomic="true" class="lab-share-status">{{ status }}</p>
    <label v-if="manual">Page link <input ref="field" :value="url" type="url" readonly @focus="field?.select()"></label>
  </div>
</template>

<style scoped>
.lab-page-share { margin-block: .65rem; }
.lab-sharing-actions { display: flex; flex-wrap: wrap; gap: .2rem 1rem; align-items: center; }
.lab-page-share button, .lab-page-share a { display: inline-flex; align-items: center; min-height: 2.75rem; padding: 0; border: 0; color: var(--vp-c-brand-1); background: transparent; font: 600 .94rem/1.45 var(--vp-font-family-base); text-decoration: underline; text-underline-offset: .2em; cursor: pointer; }
.lab-page-share :is(a, button, input):focus-visible { outline: 3px solid var(--vp-c-brand-1); outline-offset: 3px; }
.lab-page-share p, .lab-page-share label { margin: 0; color: var(--vp-c-text-2); font: .875rem/1.5 var(--vp-font-family-base); }
.lab-share-status:not(:empty) { margin-top: .3rem; color: var(--vp-c-text-1); }
.lab-page-share label { display: block; margin-top: .4rem; }
.lab-page-share input { display: block; width: min(100%, 31rem); min-height: 2.75rem; margin-top: .2rem; border: 1px solid var(--vp-c-divider); background: var(--vp-c-bg); padding: .5rem; border-radius: .15rem; color: var(--vp-c-text-1); }
</style>
