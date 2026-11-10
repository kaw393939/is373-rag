import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vitepress'
import { withMermaid } from 'vitepress-plugin-mermaid'

const base = process.env.DOCS_BASE || '/is373-rag/'
const origin = process.env.DOCS_ORIGIN || 'https://kaw393939.github.io'
if (!base.startsWith('/') || !base.endsWith('/')) throw new Error('DOCS_BASE must start and end with /')

export default withMermaid(defineConfig({
  title: 'Ordo Knowledge Lab · IS373',
  description: 'Documentation for a portable Rust-first knowledge library, streaming research chat and evidence-backed AI workflows.',
  lang: 'en-US',
  base,
  cleanUrls: true,
  lastUpdated: true,
  outDir: fileURLToPath(new URL('../../dist', import.meta.url)),
  head: [
    ['link', { rel: 'icon', type: 'image/svg+xml', href: `${base}mark.svg` }],
    ['meta', { name: 'theme-color', content: '#244c3e' }],
  ],
  sitemap: { hostname: new URL(base, origin).href },
  themeConfig: {
    logo: '/mark.svg',
    siteTitle: 'Ordo Knowledge Lab',
    nav: [
      { text: 'Project plan', link: '/project/' },
      { text: 'Requirements', link: '/project/acceptance' },
      { text: 'Roadmap', link: '/project/roadmap' },
      { text: 'Reference', items: [
        { text: 'Earlier architecture', link: '/architecture/overview' },
        { text: 'Design reviews', link: '/reviews/' },
        { text: 'Research library', link: '/research/' },
      ] },
    ],
    sidebar: [
      { text: 'Current project plan', items: [
        { text: 'Project brief', link: '/project/' },
        { text: 'System breakdown', link: '/project/system' },
        { text: 'Knowledge and identity', link: '/project/knowledge' },
        { text: 'Streaming interface', link: '/project/streaming' },
        { text: 'Workers and durable jobs', link: '/project/plugins' },
        { text: 'Hosting boundaries', link: '/project/hosting' },
        { text: 'Requirements and acceptance', link: '/project/acceptance' },
        { text: 'Delivery roadmap', link: '/project/roadmap' },
        { text: 'Decisions and open questions', link: '/project/decisions' },
        { text: 'Local folder and Pages', link: '/project/setup' },
        { text: 'Reference map', link: '/project/sources' },
        { text: 'Implementation status', link: '/status' },
      ] },
      { text: 'Earlier architecture · reference', collapsed: true, items: [
        { text: 'System overview', link: '/architecture/overview' },
        { text: 'Frontend', link: '/architecture/frontend' },
        { text: 'Backend', link: '/architecture/backend' },
        { text: 'Hybrid retrieval', link: '/architecture/retrieval' },
        { text: 'Ingestion DAG', link: '/architecture/ingestion' },
        { text: 'Contracts', link: '/architecture/contracts' },
        { text: 'Original decision register', link: '/decisions/' },
        { text: 'Serving boundaries', link: '/decisions/001-serving-boundaries' },
        { text: 'Retrieval storage', link: '/decisions/002-retrieval-storage' },
        { text: 'Workflow ownership', link: '/decisions/003-workflow-ownership' },
        { text: 'Original validation plan', link: '/validation' },
        { text: 'IS373 assignment roadmap', link: '/course-roadmap' },
      ] },
      { text: 'Design reviews · reference', collapsed: true, items: [
        { text: 'Review findings', link: '/reviews/' },
        { text: 'Robert C. Martin principles', link: '/reviews/clean-architecture' },
        { text: 'Gang of Four patterns', link: '/reviews/design-patterns' },
        { text: 'Rust design', link: '/reviews/rust-design' },
      ] },
      { text: 'Research library', collapsed: true, items: [
        { text: 'Research hub', link: '/research/' },
        { text: 'Similar projects', link: '/research/similar-projects' },
        { text: 'Implementation resources', link: '/research/implementation-resources' },
        { text: 'Concept guide', link: '/research/concepts' },
        { text: 'Dated developments', link: '/research/recent-developments' },
        { text: 'Sources and terminology', link: '/sources' },
      ] },
    ],
    search: { provider: 'local' },
    outline: { level: [2, 3] },
    socialLinks: [{ icon: 'github', link: 'https://github.com/kaw393939/is373-rag' }],
    editLink: { pattern: 'https://github.com/kaw393939/is373-rag/edit/main/docs/:path', text: 'Edit this document' },
    footer: { message: 'Documentation only · Proposed application · Evidence before claims' },
  },
  mermaid: { securityLevel: 'strict', theme: 'neutral' },
  vite: { optimizeDeps: { include: ['fastdom', 'fastdom/extensions/fastdom-promised.js'] } },
}))
