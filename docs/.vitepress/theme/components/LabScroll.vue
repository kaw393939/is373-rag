<script setup lang="ts">
import { nextTick, onBeforeUnmount, onMounted, ref } from 'vue'

const props = defineProps<{ kind: 'table' | 'diagram', label: string }>()
const viewport = ref<HTMLElement>()
const overflows = ref(false)
let size: ResizeObserver
let content: MutationObserver | undefined

function measure() {
  const el = viewport.value
  if (!el) return
  if (props.kind === 'diagram') {
    const svg = el.querySelector('svg')
    const naturalWidth = svg?.viewBox.baseVal.width
    if (svg && naturalWidth) svg.style.minWidth = Math.ceil(naturalWidth * 0.8) + 'px'
  }
  overflows.value = el.scrollWidth > el.clientWidth + 2
}

onMounted(async () => {
  await nextTick()
  const el = viewport.value
  if (!el) return
  size = new ResizeObserver(measure)
  size.observe(el)
  if (el.firstElementChild) size.observe(el.firstElementChild)
  if (props.kind === 'diagram') {
    // Mermaid inserts its SVG after Vue mounts and redraws it when the theme changes.
    content = new MutationObserver(measure)
    content.observe(el, { childList: true, subtree: true })
  }
  measure()
})
onBeforeUnmount(() => { size?.disconnect(); content?.disconnect() })
</script>

<template>
  <div class="lab-scroll-block">
    <p v-if="overflows" class="lab-scroll-hint">Scroll sideways to explore this {{ kind }}.</p>
    <div ref="viewport" class="lab-scroll" :class="'lab-scroll-' + kind" :tabindex="overflows ? 0 : undefined"
      :role="overflows ? 'region' : undefined" :aria-label="overflows ? label : undefined">
      <slot />
    </div>
  </div>
</template>
