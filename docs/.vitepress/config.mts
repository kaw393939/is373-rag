import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vitepress'
import { withMermaid } from 'vitepress-plugin-mermaid'

export default withMermaid(defineConfig({
  title: 'IS373 RAG',
  description: 'A draft architecture for fast, grounded conversations and evidence-backed knowledge.',
  lang: 'en-US',
  cleanUrls: true,
  lastUpdated: true,
  outDir: fileURLToPath(new URL('../../dist', import.meta.url)),
  head: [
    ['link', { rel: 'icon', type: 'image/svg+xml', href: '/mark.svg' }],
    ['meta', { name: 'theme-color', content: '#244c3e' }],
  ],
  sitemap: { hostname: 'https://is373-rag-architecture.keithw5454.chatgpt.site' },
  themeConfig: {
    logo: '/mark.svg',
    siteTitle: 'IS373 RAG',
    nav: [
      { text: 'Architecture', link: '/architecture/overview' },
      { text: 'Decisions', link: '/decisions/' },
      { text: 'Design reviews', link: '/reviews/' },
    ],
    sidebar: [
      { text: 'Start here', items: [
        { text: 'System overview', link: '/architecture/overview' },
        { text: 'Status and scope', link: '/status' },
      ] },
      { text: 'Architecture', items: [
        { text: 'Frontend', link: '/architecture/frontend' },
        { text: 'Backend', link: '/architecture/backend' },
        { text: 'Hybrid retrieval', link: '/architecture/retrieval' },
        { text: 'Ingestion and enrichment DAG', link: '/architecture/ingestion' },
        { text: 'Contracts and event lifecycle', link: '/architecture/contracts' },
      ] },
      { text: 'Decisions and validation', items: [
        { text: 'Decision register', link: '/decisions/' },
        { text: 'ADR 001 · Serving boundaries', link: '/decisions/001-serving-boundaries' },
        { text: 'ADR 002 · Retrieval storage', link: '/decisions/002-retrieval-storage' },
        { text: 'ADR 003 · Workflow ownership', link: '/decisions/003-workflow-ownership' },
        { text: 'Validation and delivery', link: '/validation' },
      ] },
      { text: 'Independent design reviews', items: [
        { text: 'Review findings', link: '/reviews/' },
        { text: 'Robert C. Martin principles', link: '/reviews/clean-architecture' },
        { text: 'Gang of Four patterns', link: '/reviews/design-patterns' },
        { text: 'Rust design and Graydon Hoare', link: '/reviews/rust-design' },
      ] },
      { text: 'References', items: [{ text: 'Sources and terminology', link: '/sources' }] },
    ],
    search: { provider: 'local' },
    outline: { level: [2, 3] },
    socialLinks: [{ icon: 'github', link: 'https://github.com/kaw393939/is373-rag' }],
    editLink: { pattern: 'https://github.com/kaw393939/is373-rag/edit/main/docs/:path', text: 'Edit this document' },
    footer: { message: 'Draft architecture · Evidence before claims · Updated November 5, 2026' },
  },
  mermaid: { securityLevel: 'strict', theme: 'neutral' },
  vite: {
    optimizeDeps: { include: ['fastdom', 'fastdom/extensions/fastdom-promised.js'] },
  },
}))
