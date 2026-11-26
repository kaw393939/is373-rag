<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { withBase } from 'vitepress'
import manifest from '../../narration.json'

const props = defineProps<{ route: string; kind: 'article' | 'chapter' }>()
const recordings: Record<string, { src: string; seconds: number }> = manifest
const refreshed = ref<Record<string, { src: string; seconds: number }> | null>(null)
onMounted(async () => {
  try {
    const res = await fetch('https://keithwilliams.org/listen/lab.json', { credentials: 'omit' })
    if (res.ok) refreshed.value = await res.json()
  } catch {
    // The last published edition remains available offline.
  }
})
const recording = computed(() => (refreshed.value || recordings)[props.route])
const failed = ref(false)

const source = computed(() => {
  const path = recording.value?.src
  if (!path) return ''
  if (/^https:\/\//i.test(path)) return path
  return withBase('/' + path.replace(/^\/+/, ''))
})

const duration = computed(() => {
  const seconds = Math.round(recording.value?.seconds || 0)
  const minutes = Math.floor(seconds / 60)
  const remainder = seconds % 60
  return [minutes && minutes + ' min', remainder && remainder + ' sec'].filter(Boolean).join(' ')
})
</script>

<template>
  <div v-if="source" class="article-narration">
    <div class="narration-heading">
      <strong id="narration-title">Listen to the {{ kind }}</strong>
      <span id="narration-details">AI-narrated<span v-if="duration"> · {{ duration }}</span></span>
    </div>
    <audio
      controls
      preload="none"
      :src="source"
      aria-labelledby="narration-title"
      aria-describedby="narration-details narration-text"
      @error="failed = true"
      @playing="failed = false"
    ></audio>
    <span id="narration-text">Read the full text below.</span>
    <span v-if="failed" role="status">The audio could not be played.</span>
  </div>
</template>

<style scoped>
.article-narration {
  margin-block: .9rem .35rem;
  padding-block: .7rem .4rem;
  border-top: 1px solid var(--vp-c-divider, var(--line));
  color: var(--vp-c-text-2, var(--muted));
  font: 400 .925rem/1.45 var(--vp-font-family-base, var(--sans));
}
.narration-heading {
  display: flex;
  flex-wrap: wrap;
  gap: .1rem .8rem;
  align-items: baseline;
}
.narration-heading strong {
  color: var(--vp-c-text-1, var(--ink));
  font-size: 1.06rem;
  font-weight: 650;
}
.article-narration audio {
  display: block;
  inline-size: min(100%, 31rem);
  min-inline-size: 0;
  margin-block: .35rem;
}
.article-narration audio:focus-visible {
  outline: 3px solid var(--vp-c-brand-1, var(--accent));
  outline-offset: 2px;
}
.article-narration > span { display: block; }
:global(.dark) .article-narration audio { color-scheme: dark; }
@media print {
  .article-narration { display: none; }
}
</style>
