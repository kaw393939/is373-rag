import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vitepress'
import { withMermaid } from 'vitepress-plugin-mermaid'
import { nav, sidebar } from './navigation.mjs'

const base = process.env.DOCS_BASE || '/is373-rag/'
const origin = process.env.DOCS_ORIGIN || 'https://kaw393939.github.io'
if (!base.startsWith('/') || !base.endsWith('/')) throw new Error('DOCS_BASE must start and end with /')
if (!/^https?:$/.test(new URL(origin).protocol)) throw new Error('DOCS_ORIGIN must be HTTP(S)')

export default withMermaid(defineConfig({
  title: 'Ordo Knowledge Lab',
  description: 'Portable, evidence-backed knowledge. A Rust-first IS373 research system built from Ordo: vision, design, implementation roadmap and executable contracts.',
  lang: 'en-US', base, cleanUrls: true, lastUpdated: true,
  outDir: fileURLToPath(new URL('../../dist', import.meta.url)),
  head: [
    ['link', { rel: 'icon', type: 'image/svg+xml', href: `${base}mark.svg` }],
    ['meta', { name: 'theme-color', content: '#244c3e' }],
    ['meta', { name: 'lab-docs-revision', content: process.env.GITHUB_SHA || 'local' }],
  ],
  sitemap: { hostname: new URL(base, origin).href },
  themeConfig: {
    logo: '/mark.svg', siteTitle: 'Ordo Knowledge Lab', nav, sidebar,
    search: { provider: 'local' },
    outline: { level: [2, 3], label: 'On this page' },
    sidebarMenuLabel: 'Explore this section',
    returnToTopLabel: 'Back to top',
    docFooter: { prev: 'Previous', next: 'Next' },
    socialLinks: [{ icon: 'github', link: 'https://github.com/kaw393939/is373-rag' }],
    editLink: { pattern: 'https://github.com/kaw393939/is373-rag/edit/main/docs/:path', text: 'Improve this page on GitHub' },
    footer: { message: 'IS373 · Documentation and contract labs available · Research runtime planned', copyright: 'Source → requirement → test → evidence' },
  },
  mermaid: { securityLevel: 'strict', theme: 'neutral' },
  vite: { optimizeDeps: { include: ['fastdom', 'fastdom/extensions/fastdom-promised.js'] } },
}))
