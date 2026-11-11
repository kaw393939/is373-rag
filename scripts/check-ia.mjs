import assert from 'node:assert/strict'
import fs from 'node:fs'
import path from 'node:path'
import { nav, sidebar, entryPages } from '../docs/.vitepress/navigation.mjs'

const base = process.env.DOCS_BASE || '/is373-rag/'
assert.deepEqual(nav.map(item => item.text), ['Students', 'Start', 'Design', 'Build', 'Reference'])
const routes = new Set()
function collect(items) {
  for (const item of items) {
    if (item.link) routes.add(item.link)
    if (item.items) collect(item.items)
  }
}
collect(nav)
for (const items of Object.values(sidebar)) collect(items)
for (const route of routes) {
  const relative = route.replace(/^\//, '')
  const candidates = [path.join('docs', `${relative}.md`), path.join('docs', relative, 'index.md')]
  assert.ok(candidates.some(file => fs.existsSync(file)), `Navigation target missing: ${route}`)
}
for (const file of entryPages) {
  const text = fs.readFileSync(path.join('docs', file), 'utf8')
  const words = text.split(/\s+/).filter(Boolean).length
  assert.ok(words <= 650, `${file}: ${words} words; move detail to its authoritative page`)
  assert.equal((text.match(/^# /gm) || []).length, 1, `${file}: one H1 required`)
  assert.match(text, /^description: .+$/m, `${file}: description required`)
  const target = path.join('dist', file.replace(/\.md$/, '.html'))
  assert.ok(fs.existsSync(target), `Missing built guide: ${target}`)
}
const home = fs.readFileSync('dist/index.html', 'utf8')
assert.equal((home.match(/<h1\b/g) || []).length, 1, 'Homepage needs one H1')
for (const text of ['explain.', 'Start your IS373 project', 'Future research vision', 'Fictional', 'not live', 'Find your next step.', 'Canonical identity.', 'contract labs']) {
  assert.ok(home.includes(text), `Homepage missing ${text}`)
}
for (const route of ['/students/', '/guide/', '/design/', '/build/', '/reference/', '/guide/vision', '/guide/walkthrough', '/students/reference', '/status']) {
  assert.ok(home.includes(`href="${base}${route.slice(1)}"`), `Homepage route is not base-aware: ${route}`)
}
assert.match(home, /name="lab-docs-revision" content="[^\"]+"/)
assert.ok(!fs.existsSync('dist/CNAME'), 'This docs change must not claim a custom domain')
console.log(`PASS: five navigation sections, ${routes.size} unique targets, ${entryPages.length} concise entry pages, homepage structure and project-base links.`)
console.log('Scope: static IA checks, not live hosting, user testing or full accessibility certification.')
