<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted } from 'vue'
import { useData, withBase } from 'vitepress'
import DefaultTheme from 'vitepress/theme-without-fonts'
const { Layout } = DefaultTheme
const { page, theme } = useData()
type Section = { text: string, link: string, activeMatch: string }
const route = computed(() => '/' + page.value.relativePath.replace(/(^|\/)index\.md$/, '$1').replace(/\.md$/, ''))
const section = computed(() => (theme.value.nav as Section[]).find(item => new RegExp(item.activeMatch).test(route.value)))

const plan = { text: 'Plan a small RAG', link: '/students/plan' }
const build = { text: 'Build one complete path', link: '/students/build' }
const check = { text: 'Check your evidence', link: '/students/check' }
const studentNext: Record<string, { text: string, link: string }> = {
  '/students/': { text: 'Research a reader’s question', link: '/students/research' },
  '/students/research': plan,
  '/students/reference': plan,
  '/students/build': check,
  '/students/from-app-studio': check,
  '/students/stuck': check,
  '/students/check': { text: 'Rehearse your demo', link: '/students/prompts#demo-prompt' }
}
const nextAction = computed(() => {
  if (section.value?.link === '/students/') return studentNext[route.value] || build
  if (route.value !== '/status') return { text: 'Research runtime planned', link: '/status' }
})

function dismissMobileMenu(event: KeyboardEvent) {
  if (event.key !== 'Escape' || event.defaultPrevented || document.querySelector('.VPLocalSearchBox')) return
  const toggle = document.querySelector<HTMLButtonElement>('button[aria-controls="VPNavScreen"][aria-expanded="true"]')
  if (!toggle) return
  event.preventDefault()
  toggle.click()
  toggle.focus({ preventScroll: true })
}

onMounted(() => document.addEventListener('keydown', dismissMobileMenu))
onBeforeUnmount(() => document.removeEventListener('keydown', dismissMobileMenu))

const reference = computed(() => /^(architecture|decisions|reviews|research)\//.test(page.value.relativePath)
  || ['course-roadmap.md', 'validation.md', 'sources.md'].includes(page.value.relativePath))
</script>

<template>
  <Layout>
    <template #nav-bar-content-before>
      <JournalLink class="lab-journal-return" aria-label="Back to Keith Williams’s journal">
        <span aria-hidden="true">←</span> Journal
      </JournalLink>
    </template>
    <template #layout-bottom>
      <div class="lab-publication-footer">
        <span>Search runs in your browser using this guide’s index.</span>
        <nav aria-label="Publication information">
          <JournalLink to="/site-notes">Site notes</JournalLink>
          <a href="https://github.com/kaw393939" rel="me">
            <img :src="withBase('/icons/github.svg')" width="18" height="18" alt="">Keith Williams on GitHub
          </a>
          <a href="https://www.linkedin.com/in/keithwilliams5/" rel="me">
            <img :src="withBase('/icons/linkedin-in.svg')" width="18" height="18" alt="">Keith Williams on LinkedIn
          </a>
        </nav>
      </div>
    </template>
    <template #doc-before>
      <div v-if="section" class="doc-context">
        <span v-if="route === section.link" aria-current="page">{{ section.text }}</span>
        <a v-else :href="withBase(section.link)">{{ section.text }}</a>
        <a v-if="nextAction" class="context-action" :href="withBase(nextAction.link)">{{ nextAction.text }}</a>
      </div>
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
.doc-context a:first-child{color:var(--vp-c-brand-1);font-weight:600}.doc-context .context-action{border:1px solid var(--vp-c-divider);padding:3px 8px;border-radius:4px;font-size:11px}
.doc-context a:hover{text-decoration:underline}.doc-context a:focus-visible{outline:3px solid var(--vp-c-brand-1);outline-offset:3px}
.reference-notice{margin:0 0 24px;padding:16px 20px;border:1px solid var(--vp-c-divider);border-radius:8px;background:var(--vp-c-bg-soft);color:var(--vp-c-text-1);font-size:14px;line-height:1.7}
.reference-notice strong{display:block;margin-bottom:4px}.reference-notice a{color:var(--vp-c-brand-1);text-decoration:underline}
.doc-context { flex-wrap: wrap; justify-content: flex-start; gap: .4rem 1rem; font-size: .875rem; }
.doc-context a { display: inline-flex; align-items: center; min-height: 2.75rem; }
.doc-context .context-action { margin-inline-start: auto; padding: .35rem .6rem; font-size: .8rem; }
.lab-publication-footer { display: flex; align-items: center; flex-wrap: wrap; justify-content: center; column-gap: 1.2rem; padding: .65rem 1.25rem; border-top: 1px solid var(--vp-c-divider); color: var(--vp-c-text-2); text-align: center; font-size: .875rem; line-height: 1.6; }
.lab-publication-footer nav { display: flex; flex-wrap: wrap; align-items: center; justify-content: center; column-gap: 1rem; }
.lab-publication-footer img { flex: none; width: 18px; height: 18px; }
:global(.dark) .lab-publication-footer img { filter: invert(1); }
.lab-publication-footer a { display: inline-flex; gap: .38em; align-items: center; min-height: 2.75rem; color: var(--vp-c-brand-1); text-decoration: underline; text-underline-offset: .18em; }
@media (max-width: 420px) { .doc-context { gap: .25rem .6rem; } .doc-context .context-action { margin-inline-start: 0; } }
@media (min-width: 960px) { :global(.VPContent.has-sidebar) ~ .lab-publication-footer { padding-inline-start: var(--vp-sidebar-width); } }
</style>
