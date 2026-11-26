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
// Both deployments share one preferred public edition; readers follow assets on their current deployment.
const preferred = 'https://keithwilliams.org/knowledge-lab/'
const sourceRoot = path.resolve('docs')
const descriptions = new Map()
const teasers = new Map()
const checkedCovers = new Map()
const contentRoutes = new Set()

function humanText(value) {
  return (value || '').replace(/<[^>]*>/g, '').replace(/&(?:amp|lt|gt|quot|apos|#39|#x27|nbsp);/gi,
    match => ({ '&amp;': '&', '&lt;': '<', '&gt;': '>', '&quot;': '"', '&apos;': "'", '&#39;': "'", '&#x27;': "'", '&nbsp;': ' ' })[match.toLowerCase()])
    .replace(/\s+/g, ' ').trim()
}

function attribute(tag, name) {
  return (tag || '').match(new RegExp('(?:^|\\s)' + name + '="([^"]*)"'))?.[1]
}

function fmText(frontmatter, field) {
  const line = frontmatter.match(new RegExp('^' + field + ':\\s*(.*?)\\s*$', 'm'))?.[1] || ''
  if (line.startsWith('"') && line.endsWith('"')) return JSON.parse(line)
  return line.startsWith("'") && line.endsWith("'") ? line.slice(1, -1).replaceAll("''", "'") : line
}

function jpegSize(file) {
  if (checkedCovers.has(file)) return checkedCovers.get(file)
  const bytes = fs.readFileSync(file)
  if (bytes.length < 10 || bytes.readUInt16BE(0) !== 0xffd8) throw Error('Invalid JPEG: ' + file)
  for (let i = 2; i + 9 < bytes.length;) {
    if (bytes[i] !== 0xff) break
    while (bytes[i] === 0xff) i++
    const marker = bytes[i++]
    if ([0xc0, 0xc1, 0xc2].includes(marker)) {
      const dimensions = [bytes.readUInt16BE(i + 5), bytes.readUInt16BE(i + 3)]
      checkedCovers.set(file, dimensions)
      return dimensions
    }
    if (marker === 0xda || marker === 0xd9) break
    const length = bytes.readUInt16BE(i)
    if (length < 2) break
    i += length
  }
  throw Error('Missing JPEG frame dimensions: ' + file)
}

function checkEditorial(file, html) {
  const relative = path.relative(root, file).split(path.sep).join('/')
  const isHome = relative === 'index.html'
  const head = html.match(/<head\b[^>]*>([\s\S]*?)<\/head>/)?.[1] || ''
  const tags = head.match(/<meta\b[^>]*>/g) || []
  const canonical = (head.match(/<link\b[^>]*>/g) || []).filter(tag => attribute(tag, 'rel') === 'canonical')
  function meta(name) {
    const matches = tags.filter(tag => attribute(tag, 'name') === name || attribute(tag, 'property') === name)
    if (matches.length > 1) failures.push(relative + ': duplicate ' + name)
    return humanText(attribute(matches[0], 'content'))
  }
  function expect(condition, message) {
    if (!condition) failures.push(relative + ': ' + message)
  }
  if (relative === '404.html') {
    expect(meta('robots').split(',').map(item => item.trim()).includes('noindex'), '404 needs noindex')
    expect(!canonical.length && !meta('og:url') && !head.includes('application/ld+json'), '404 must not be advertised as a canonical page')
    return
  }
  const doc = relative.replace(/\.html$/, '.md')
  const original = path.join(sourceRoot, doc)
  expect(fs.existsSync(original), 'missing editable Markdown source ' + doc)
  if (!fs.existsSync(original)) return
  const fm = fs.readFileSync(original, 'utf8').match(/^---\r?\n([\s\S]+?)\r?\n---(?:\n|\r)/)?.[1] || ''
  const description = fmText(fm, 'description')
  const teaser = fmText(fm, 'teaser')
  expect(description && teaser && description !== teaser, 'write separate search copy and reader teaser')
  for (const [text, set, label] of [[description, descriptions, 'description'], [teaser, teasers, 'teaser']]) {
    expect(!set.has(text), 'duplicate ' + label + ' also on ' + set.get(text))
    set.set(text, relative)
  }
  const destination = new URL(relative.replace(/\.html$/, '').replace(/(^|\/)index$/, '$1'), preferred).href
  expect(canonical.length === 1 && attribute(canonical[0], 'href') === destination, 'canonical URL must be ' + destination)
  expect(meta('og:url') === destination && meta('og:type') === (isHome ? 'website' : 'article'), 'incorrect Open Graph identity')
  expect(meta('description') === description && meta('og:description') === teaser && meta('twitter:description') === teaser, 'SEO or sharing copy differs from source')
  expect(meta('og:title') && meta('og:title') === meta('twitter:title'), 'missing or mismatched social title')
  expect(meta('twitter:card') === 'summary_large_image', 'large Twitter card required')
  const shareImage = meta('og:image')
  const imageAlt = meta('og:image:alt')
  expect(shareImage.startsWith(preferred) && shareImage === meta('twitter:image'), 'sharing image must use the preferred public edition')
  expect(imageAlt && imageAlt === meta('twitter:image:alt'), 'missing or mismatched image descriptions')
  expect(meta('og:image:type') === 'image/jpeg' && meta('og:image:width') === '1200' && meta('og:image:height') === '630', 'incorrect JPEG sharing dimensions')
  const coverPath = shareImage.slice(preferred.length)
  const builtImage = targetFile(coverPath)
  const sourceImage = path.join(sourceRoot, 'public', coverPath)
  expect(builtImage && fs.existsSync(sourceImage), 'missing source or deployed image ' + coverPath)
  if (builtImage && fs.existsSync(sourceImage)) {
    expect(jpegSize(builtImage).join('x') === '1200x630', 'share artwork must actually be 1200 by 630')
    expect(fs.readFileSync(builtImage).equals(fs.readFileSync(sourceImage)), 'deployed image differs from its source')
  }
  const structured = [...head.matchAll(/<script\b[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)]
    .map(match => JSON.parse(match[1])).find(data => data['@type'] === (isHome ? 'WebSite' : 'Article'))
  expect(structured?.url === destination && structured?.description === description && structured?.image === shareImage, 'incorrect or missing page schema')
  expect(structured?.publisher?.name === 'Keith Williams', 'missing publisher')
  if (!isHome) expect(structured?.author?.name === 'Keith Williams' && structured?.abstract === teaser, 'incorrect Article author or abstract')

  const deckClass = isHome ? 'lab-lead' : 'lab-page-deck'
  const deckPattern = new RegExp('<p\\b[^>]*class="' + deckClass + '"[^>]*>([\\s\\S]*?)<\\/p>', 'g')
  const decks = [...html.matchAll(deckPattern)]
  expect(decks.length === 1 && humanText(decks[0][1]) === teaser, 'missing, duplicate, or stale visible teaser')
  expect(html.includes(isHome ? 'class="lab-home"' : 'class="lab-article-entry"'), 'wrong page layout')
  expect((html.match(/<h1\b/g) || []).length === 1, 'expected one page heading')
  const visible = (html.match(/<img\b[^>]*>/g) || []).find(tag => attribute(tag, 'src') === base + coverPath)
  expect(visible && humanText(attribute(visible, 'alt')) === imageAlt && attribute(visible, 'width') === '1200' && attribute(visible, 'height') === '630', 'missing sized, described base-aware illustration')
  expect(html.includes('class="lab-page-share"') && html.includes('href="https://www.linkedin.com/sharing/share-offsite/?url=' + encodeURIComponent(destination) + '"'), 'missing canonical LinkedIn sharing control')
  contentRoutes.add(file)
}

for (const file of pages) {
  try { checkEditorial(file, fs.readFileSync(file, 'utf8')) }
  catch (error) { failures.push(path.relative(root, file) + ': ' + error.message) }
}

const sitemapPath = path.join(root, 'sitemap.xml')
if (!fs.existsSync(sitemapPath)) failures.push('Missing sitemap.xml')
else {
  const locations = [...fs.readFileSync(sitemapPath, 'utf8').matchAll(/<loc>([^<]+)<\/loc>/g)]
  if (!locations.length) failures.push('Sitemap has no locations')
  const mappedFiles = new Set()
  for (const [, location] of locations) {
    const url = new URL(location.replaceAll('&amp;', '&'))
    if (url.origin !== origin || !url.pathname.startsWith(base)) failures.push(`Sitemap escapes configured origin/base: ${location}`)
    else {
      const mapped = targetFile(decodeURIComponent(url.pathname.slice(base.length)))
      if (!mapped || !contentRoutes.has(mapped)) failures.push(`Missing or non-indexable sitemap target: ${location}`)
      else mappedFiles.add(mapped)
    }
  }
  for (const file of contentRoutes) if (!mappedFiles.has(file)) failures.push('Missing sitemap entry: ' + path.relative(root, file))
}
if (failures.length) {
  console.error([...new Set(failures)].join('\n'))
  process.exit(1)
}
console.log(`PASS: ${pages.length} generated pages; local targets/fragments, project-path assets, reference notices and sitemap are valid under ${base}`)
console.log(`PASS: ${contentRoutes.size} canonical pages, distinct descriptions and teasers, visible sharing, and ${checkedCovers.size} verified JPEG covers.`)
console.log('Scope: generated targets only; external URLs, browser behavior, accessibility and live deployment are not verified.')
