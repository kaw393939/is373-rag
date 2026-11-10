import fs from 'node:fs'
import path from 'node:path'

const root = path.resolve('dist')
const base = process.env.DOCS_BASE || '/is373-rag/'
const origin = new URL(process.env.DOCS_ORIGIN || 'https://kaw393939.github.io').origin
if (!base.startsWith('/') || !base.endsWith('/')) throw new Error('DOCS_BASE must start and end with /')
if (!fs.existsSync(root)) throw new Error('Run npm run build first')
const required = ['index.html', 'project/index.html', 'project/system.html', 'project/knowledge.html', 'project/streaming.html', 'project/plugins.html', 'project/hosting.html', 'project/acceptance.html', 'project/roadmap.html', 'project/decisions.html', 'project/setup.html', 'project/sources.html', 'reuse/index.html', 'reuse/source-audit.html', 'reuse/harvest-plan.html', 'engineering/twelve-factor.html', 'engineering/clean-build.html', 'engineering/examples.html', 'source-ledger.json']
const failures = []
for (const relative of required) if (!fs.existsSync(path.join(root, relative))) failures.push(`Missing required page/asset: ${relative}`)
function walk(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap(e => e.isDirectory() ? walk(path.join(dir, e.name)) : [path.join(dir, e.name)])
}
function targetFile(relative) {
  const absolute = path.resolve(root, relative || '.')
  if (absolute !== root && !absolute.startsWith(root + path.sep)) return undefined
  return [absolute, absolute + '.html', path.join(absolute, 'index.html')].find(p => fs.existsSync(p) && fs.statSync(p).isFile())
}
const pages = walk(root).filter(file => file.endsWith('.html'))
const anchorCache = new Map()
function hasAnchor(file, fragment) {
  if (!file.endsWith('.html')) return true
  if (!anchorCache.has(file)) anchorCache.set(file, new Set([...fs.readFileSync(file, 'utf8').matchAll(/\bid="([^"]+)"/g)].map(match => match[1])))
  return anchorCache.get(file).has(fragment)
}
for (const file of pages) {
  const html = fs.readFileSync(file, 'utf8')
  const route = base + path.relative(root, file).split(path.sep).join('/')
  const page = new URL(route, 'https://docs.invalid')
  for (const match of html.matchAll(/\b(?:href|src)="([^"\s]+)"/g)) {
    const value = match[1].replaceAll('&amp;', '&')
    if (/^(?:https?:|mailto:|tel:|data:|\/\/)/.test(value)) continue
    if (/^[a-z][a-z0-9+.-]*:/i.test(value)) continue
    const target = new URL(value, page)
    const pathname = decodeURIComponent(target.pathname)
    if (!pathname.startsWith(base)) {
      failures.push(`${path.relative(root, file)}: URL escapes project base: ${value}`)
      continue
    }
    const resolved = targetFile(pathname.slice(base.length))
    if (!resolved) failures.push(`${path.relative(root, file)}: missing target ${value}`)
    else if (target.hash && !hasAnchor(resolved, decodeURIComponent(target.hash.slice(1)))) failures.push(`${path.relative(root, file)}: missing fragment ${value}`)
  }
  if (/^(architecture|decisions|reviews|research)\//.test(path.relative(root, file)) && !html.includes('Reference material, not the current implementation plan.')) {
    failures.push(`${path.relative(root, file)}: missing earlier-reference notice`)
  }
}
const sitemapPath = path.join(root, 'sitemap.xml')
if (!fs.existsSync(sitemapPath)) failures.push('Missing sitemap.xml')
else {
  const locations = [...fs.readFileSync(sitemapPath, 'utf8').matchAll(/<loc>([^<]+)<\/loc>/g)]
  if (!locations.length) failures.push('Sitemap has no locations')
  for (const [, location] of locations) {
    const url = new URL(location.replaceAll('&amp;', '&'))
    if (url.origin !== origin || !url.pathname.startsWith(base)) failures.push(`Sitemap escapes configured origin/base: ${location}`)
    else if (!targetFile(decodeURIComponent(url.pathname.slice(base.length)))) failures.push(`Missing sitemap target: ${location}`)
  }
}
if (failures.length) {
  console.error([...new Set(failures)].join('\n'))
  process.exit(1)
}
console.log(`PASS: ${pages.length} generated pages; local targets/fragments, project-path assets, reference notices and sitemap are valid under ${base}`)
console.log('Scope: generated targets only; external URLs, browser behavior, accessibility and live deployment are not verified.')
