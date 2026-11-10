<script setup lang="ts">
import { computed } from 'vue'
import { useData, withBase } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
const { Layout } = DefaultTheme
const { page } = useData()
const reference = computed(() => /^(architecture|decisions|reviews|research)\//.test(page.value.relativePath)
  || ['course-roadmap.md', 'validation.md', 'sources.md'].includes(page.value.relativePath))
const section = computed(() => {
  const path = page.value.relativePath
  if (/^(guide\/|status|project\/index)/.test(path)) return { label: 'Start', href: '/guide/' }
  if (/^(design\/|project\/(system|knowledge|streaming|plugins|decisions))/.test(path)) return { label: 'Design', href: '/design/' }
  if (/^(build\/|engineering\/|reuse\/|project\/(roadmap|acceptance|setup|hosting))/.test(path)) return { label: 'Build', href: '/build/' }
  return { label: 'Reference', href: '/reference/' }
})
</script>

<template>
  <Layout>
    <template #doc-before>
      <div class="doc-context"><a :href="withBase(section.href)">{{ section.label }}</a><a :href="withBase('/status')">Research runtime planned</a></div>
      <aside v-if="reference" class="reference-notice" aria-label="Reference material">
        <strong>Reference material, not the current implementation plan.</strong>
        Earlier choices and reviews are preserved for context. Follow the
        <a :href="withBase('/reuse/')">Ordo reuse audit</a>,
        <a :href="withBase('/engineering/twelve-factor')">twelve-factor decisions</a> and
        <a :href="withBase('/project/roadmap')">current roadmap</a> where they differ.
      </aside>
    </template>
  </Layout>
</template>

<style scoped>
.doc-context{display:flex;align-items:center;justify-content:space-between;gap:16px;margin-bottom:22px;font-size:12px;color:var(--vp-c-text-2)}
.doc-context a:first-child{color:var(--vp-c-brand-1);font-weight:600}.doc-context a:last-child{border:1px solid var(--vp-c-divider);padding:3px 8px;border-radius:4px;font-size:11px}
.doc-context a:hover{text-decoration:underline}.doc-context a:focus-visible{outline:3px solid var(--vp-c-brand-1);outline-offset:3px}
.reference-notice{margin:0 0 24px;padding:16px 20px;border:1px solid var(--vp-c-divider);border-radius:8px;background:var(--vp-c-bg-soft);color:var(--vp-c-text-1);font-size:14px;line-height:1.7}
.reference-notice strong{display:block;margin-bottom:4px}.reference-notice a{color:var(--vp-c-brand-1);text-decoration:underline}
</style>
