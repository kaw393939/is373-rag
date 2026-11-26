import { fileURLToPath } from 'node:url'
import { defineConfig, type HeadConfig } from 'vitepress'
import { withMermaid } from 'vitepress-plugin-mermaid'
import { nav, sidebar } from './navigation.mjs'
import { canonicalUrl, editorialImage, publication } from './publication'

const base = process.env.DOCS_BASE || '/is373-rag/'
const origin = process.env.DOCS_ORIGIN || 'https://kaw393939.github.io'
if (!base.startsWith('/') || !base.endsWith('/')) throw new Error('DOCS_BASE must start and end with /')
if (!/^https?:$/.test(new URL(origin).protocol)) throw new Error('DOCS_ORIGIN must be HTTP(S)')

export default withMermaid(defineConfig({
  title: 'Ordo Knowledge Lab',
  description: 'Portable, evidence-backed knowledge. A Rust-first IS373 research system built from Ordo: vision, design, implementation roadmap and executable contracts.',
  lang: 'en-US', base, cleanUrls: true, lastUpdated: false,
  outDir: fileURLToPath(new URL('../../dist', import.meta.url)),
  head: [
    ['link', { rel: 'icon', type: 'image/svg+xml', href: `${base}mark.svg` }],
    ['meta', { name: 'theme-color', content: '#244c3e' }],
    ['meta', { name: 'lab-docs-revision', content: process.env.GITHUB_SHA || 'local' }],
  ],
  markdown: {
    preConfig(md) {
      // Preserve native tables and Mermaid output inside separately scrollable regions.
      md.core.ruler.after('inline', 'lab-reading-regions', state => {
        const wrapped = []
        let section = ''
        const html = (markup: string) => {
          const token = new state.Token('html_block', '', 0)
          token.content = markup + '\n'
          return token
        }
        for (let i = 0; i < state.tokens.length; i++) {
          const token = state.tokens[i]
          if (token.type === 'heading_open') section = state.tokens[i + 1]?.content || section
          const diagram = token.type === 'fence' && token.info.trim() === 'mermaid'
          if (token.type === 'table_open' || diagram) {
            const kind = diagram ? 'diagram' : 'table'
            const label = md.utils.escapeHtml(section ? kind + ' for ' + section : kind)
            wrapped.push(html('<LabScroll kind="' + kind + '" label="' + label + '">'))
          }
          if (token.type === 'th_open') token.attrSet('scope', 'col')
          wrapped.push(token)
          if (token.type === 'table_close' || diagram) wrapped.push(html('</LabScroll>'))
        }
        state.tokens = wrapped
      })
      md.core.ruler.after('inline', 'lab-article-teaser', state => {
        const path = state.env.relativePath
        if (!path || path === 'index.md' || path === '404.md') return
        const h1 = state.tokens.findIndex(token => token.type === 'heading_close' && token.tag === 'h1')
        if (h1 < 0) return
        const entry = new state.Token('html_block', '', 0)
        entry.content = '<LabArticleHeader />\n'
        state.tokens.splice(h1 + 1, 0, entry)
      })
    }
  },
  sitemap: {
    hostname: new URL(base, origin).href,
    transformItems: items => items
      .filter(item => !/(^|\/)404(?:\.html)?\/?$/.test(item.url))
      .map(({ lastmod, ...item }) => item)
  },
  transformPageData(page) {
    // Keep editorial dates out of the client-side navigation payload as well as the page itself.
    for (const key of ['date', 'dateLabel', 'datePublished', 'dateModified', 'lastUpdated']) {
      delete page.frontmatter[key]
    }
    delete page.lastUpdated
  },
  transformHead({ pageData }) {
    const path = pageData.relativePath
    if (path === '404.md') return [['meta', { name: 'robots', content: 'noindex,follow' }]]
    const home = path === 'index.md'
    const pageUrl = canonicalUrl(path)
    const title = pageData.title
    const description = pageData.description || pageData.frontmatter.teaser
    const teaser = pageData.frontmatter.teaser || description
    const image = editorialImage(path)
    const imageUrl = new URL(image.path, publication).href
    const author = {
      '@type': 'Person', '@id': 'https://keithwilliams.org/#keith-williams',
      name: 'Keith Williams', url: 'https://keithwilliams.org/about'
    }
    const structured = home ? {
      '@type': 'WebSite', '@id': publication + '#website', name: 'Ordo Knowledge Lab',
      url: pageUrl, description, image: imageUrl, publisher: author
    } : {
      '@type': 'Article', '@id': pageUrl + '#article', headline: title,
      url: pageUrl, description, abstract: teaser, articleSection: image.section,
      image: imageUrl, author, publisher: author, mainEntityOfPage: pageUrl,
      isPartOf: { '@id': publication + '#website' }
    }
    const head: HeadConfig[] = [
      ['link', { rel: 'canonical', href: pageUrl }],
      ['meta', { property: 'og:type', content: home ? 'website' : 'article' }],
      ['meta', { property: 'og:site_name', content: 'Ordo Knowledge Lab' }],
      ['meta', { property: 'og:locale', content: 'en_US' }],
      ['meta', { property: 'og:title', content: title }],
      ['meta', { property: 'og:description', content: teaser }],
      ['meta', { property: 'og:url', content: pageUrl }],
      ['meta', { property: 'og:image', content: imageUrl }],
      ['meta', { property: 'og:image:alt', content: image.alt }],
      ['meta', { property: 'og:image:type', content: 'image/jpeg' }],
      ['meta', { property: 'og:image:width', content: String(image.width) }],
      ['meta', { property: 'og:image:height', content: String(image.height) }],
      ['meta', { name: 'twitter:card', content: 'summary_large_image' }],
      ['meta', { name: 'twitter:title', content: title }],
      ['meta', { name: 'twitter:description', content: teaser }],
      ['meta', { name: 'twitter:image', content: imageUrl }],
      ['meta', { name: 'twitter:image:alt', content: image.alt }],
      ['script', { type: 'application/ld+json' }, JSON.stringify({
        '@context': 'https://schema.org', inLanguage: 'en-US', ...structured
      }).replace(/</g, '\\u003c')]
    ]
    if (!home) head.push(
      ['meta', { name: 'author', content: author.name }],
      ['meta', { property: 'article:author', content: author.url }],
      ['meta', { property: 'article:section', content: image.section }]
    )
    return head
  },
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
