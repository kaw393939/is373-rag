<script setup lang="ts">
import { computed } from 'vue'
import { useData, withBase } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
const { Layout } = DefaultTheme
const { page } = useData()
const reference = computed(() => /^(architecture|decisions|reviews|research)\//.test(page.value.relativePath)
  || ['course-roadmap.md', 'validation.md', 'sources.md'].includes(page.value.relativePath))
</script>

<template>
  <Layout>
    <template #doc-before>
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
.reference-notice { margin: 0 0 24px; padding: 16px 20px; border: 1px solid var(--vp-c-divider); border-radius: 8px; background: var(--vp-c-bg-soft); color: var(--vp-c-text-1); font-size: 14px; line-height: 1.7; }
.reference-notice strong { display: block; margin-bottom: 4px; }
.reference-notice a { color: var(--vp-c-brand-1); text-decoration: underline; }
</style>
