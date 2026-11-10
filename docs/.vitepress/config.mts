import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vitepress'
import { withMermaid } from 'vitepress-plugin-mermaid'

const base = process.env.DOCS_BASE || '/is373-rag/'
const origin = process.env.DOCS_ORIGIN || 'https://kaw393939.github.io'
if (!base.startsWith('/') || !base.endsWith('/')) throw new Error('DOCS_BASE must start and end with /')

export default withMermaid(defineConfig({
  title: 'Ordo Knowledge Lab · IS373',
  description: 'A code-grounded Ordo reuse roadmap: portable research knowledge, streaming chat and twelve-factor deployment boundaries.',
  lang: 'en-US', base, cleanUrls: true, lastUpdated: true,
  outDir: fileURLToPath(new URL('../../dist', import.meta.url)),
  head: [
    ['link', { rel: 'icon', type: 'image/svg+xml', href: `${base}mark.svg` }],
    ['meta', { name: 'theme-color', content: '#244c3e' }],
  ],
  sitemap: { hostname: new URL(base, origin).href },
  themeConfig: {
    logo: '/mark.svg', siteTitle: 'Ordo Knowledge Lab',
    nav: [
      { text: 'Start here', link: '/project/' },
      { text: 'Reuse Ordo', link: '/reuse/' },
      { text: 'Twelve factors', link: '/engineering/twelve-factor' },
      { text: 'Roadmap', link: '/project/roadmap' },
      { text: 'Reference', items: [
        { text: 'Earlier architecture', link: '/architecture/overview' },
        { text: 'Design reviews', link: '/reviews/' },
        { text: 'Research library', link: '/research/' },
      ] },
    ],
    sidebar: [
      { text: 'Read first', items: [
        { text: 'Project brief', link: '/project/' },
        { text: 'Reuse map', link: '/reuse/' },
        { text: 'Pinned source audit', link: '/reuse/source-audit' },
        { text: 'Harvest plan', link: '/reuse/harvest-plan' },
        { text: 'Implementation status', link: '/status' },
      ] },
      { text: 'Build and verify', items: [
        { text: 'Twelve-factor matrix', link: '/engineering/twelve-factor' },
        { text: 'Clean builds and releases', link: '/engineering/clean-build' },
        { text: 'Executable examples', link: '/engineering/examples' },
        { text: 'Requirements and acceptance', link: '/project/acceptance' },
        { text: 'Delivery roadmap', link: '/project/roadmap' },
      ] },
      { text: 'System design', items: [
        { text: 'System breakdown', link: '/project/system' },
        { text: 'Knowledge and identity', link: '/project/knowledge' },
        { text: 'Streaming interface', link: '/project/streaming' },
        { text: 'Workers and durable jobs', link: '/project/plugins' },
        { text: 'Hosting boundaries', link: '/project/hosting' },
        { text: 'Decisions', link: '/project/decisions' },
        { text: 'Local folder and Pages', link: '/project/setup' },
        { text: 'Reference map', link: '/project/sources' },
      ] },
      { text: 'Earlier architecture · reference', collapsed: true, items: [
        { text: 'System overview', link: '/architecture/overview' },
        { text: 'Frontend', link: '/architecture/frontend' },
        { text: 'Backend', link: '/architecture/backend' },
        { text: 'Hybrid retrieval', link: '/architecture/retrieval' },
        { text: 'Ingestion DAG', link: '/architecture/ingestion' },
        { text: 'Contracts', link: '/architecture/contracts' },
        { text: 'Original decisions', link: '/decisions/' },
        { text: 'Serving boundaries', link: '/decisions/001-serving-boundaries' },
        { text: 'Retrieval storage', link: '/decisions/002-retrieval-storage' },
        { text: 'Workflow ownership', link: '/decisions/003-workflow-ownership' },
        { text: 'Original validation', link: '/validation' },
        { text: 'IS373 assignment roadmap', link: '/course-roadmap' },
      ] },
      { text: 'Design reviews · reference', collapsed: true, items: [
        { text: 'Review findings', link: '/reviews/' },
        { text: 'Robert C. Martin principles', link: '/reviews/clean-architecture' },
        { text: 'Gang of Four patterns', link: '/reviews/design-patterns' },
        { text: 'Rust design', link: '/reviews/rust-design' },
      ] },
      { text: 'Research · reference', collapsed: true, items: [
        { text: 'Research hub', link: '/research/' },
        { text: 'Similar projects', link: '/research/similar-projects' },
        { text: 'Implementation resources', link: '/research/implementation-resources' },
        { text: 'Concept guide', link: '/research/concepts' },
        { text: 'Dated developments', link: '/research/recent-developments' },
        { text: 'Sources and terminology', link: '/sources' },
      ] },
    ],
    search: { provider: 'local' }, outline: { level: [2, 3] },
    socialLinks: [{ icon: 'github', link: 'https://github.com/kaw393939/is373-rag' }],
    editLink: { pattern: 'https://github.com/kaw393939/is373-rag/edit/main/docs/:path', text: 'Edit this document' },
    footer: { message: 'Docs and synthetic labs · Runtime pending · Source → requirement → test → evidence' },
  },
  mermaid: { securityLevel: 'strict', theme: 'neutral' },
  vite: { optimizeDeps: { include: ['fastdom', 'fastdom/extensions/fastdom-promised.js'] } },
}))
