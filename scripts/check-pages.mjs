import fs from 'node:fs'
import path from 'node:path'

const root = path.resolve('dist')
const base = process.env.DOCS_BASE || '/is373-rag/'
if (!base.startsWith('/') || !base.endsWith('/')) throw new Error('DOCS_BASE must start and end with /')
const required = ['index.html', 'project/index.html', 'project/system.html', 'project/knowledge.html', 'project/streaming.html', 'project/plugins.html', 'project/hosting.html', 'project/acceptance.html', 'project/roadmap.html', 'project/decisions.html', 'project/setup.html']
const failures = []
for (const relative of required) if (!fs.existsSync(path.join(root, relative))) failures.push(`Missing required page: ${relative}`)
function walk(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap(e => e.isDirectory() ? walk(path.join(dir, e.name)) : [path.join(dir, e.name)])
}
if (!fs.existsSync(root)) throw new Error('Run npm run build first')
const pages = walk(root).filter(file => file.endsWith('.html'))
for (const file of pages) {
  const html = fs.readFileSync(file, 'utf8')
  const route = base + path.relative(root, file).split(path.sep).join('/')
  const page = new URL(route, 'https://docs.invalid')
  for (const match of html.matchAll(/\b(?:href|src)="([^"\s]+)"/g)) {
    const value = match[1].replaceAll('&amp;', '&')
    if (/^(?:https?:|mailto:|tel:|data:|#|\/\/)/.test(value)) continue
    if (/^[a-z][a-z0-9+.-]*:/i.test(value)) continue
    const target = new URL(value, page)
    const pathname = decodeURIComponent(target.pathname)
    if (!pathname.startsWith(base)) {
      failures.push(`${path.relative(root, file)}: URL escapes project base: ${value}`)
      continue
    }
    const relative = pathname.slice(base.length)
    const absolute = path.resolve(root, relative || '.')
    if (absolute !== root && !absolute.startsWith(root + path.sep)) {
      failures.push(`${path.relative(root, file)}: path escapes output: ${value}`)
      continue
    }
    const candidates = [absolute, absolute + '.html', path.join(absolute, 'index.html')]
    if (!candidates.some(p => fs.existsSync(p) && fs.statSync(p).isFile())) failures.push(`${path.relative(root, file)}: missing target ${value}`)
  }
}
if (failures.length) {
  console.error([...new Set(failures)].join('\n'))
  process.exit(1)
}
console.log(`PASS: ${pages.length} generated pages; required project pages and local href/src targets are valid under ${base}`)
console.log('Scope: generated local targets only; this does not verify external URLs, browser behavior, accessibility or a live deployment.')
