import assert from 'node:assert/strict'
import fs from 'node:fs'
import path from 'node:path'
import { nav, sidebar, entryPages } from '../docs/.vitepress/navigation.mjs'

const base = process.env.DOCS_BASE || '/is373-rag/'
assert.deepEqual(nav.map(item => item.text), ['Students', 'Research overview', 'Design', 'Build', 'Reference'])
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
// Check the actual HTML so a correct route model cannot hide a broken or self-linking header.
const studentSteps = {
  '/students/': '/students/plan',
  '/students/plan': '/students/build',
  '/students/build': '/students/check',
  '/students/check': '/students/prompts#demo-prompt'
}
for (const route of routes) {
  if (!route.startsWith('/students/')) continue
  const output = route.endsWith('/') ? route + 'index.html' : route + '.html'
  const html = fs.readFileSync(path.join('dist', output.slice(1)), 'utf8')
  const context = html.match(/<div class="doc-context"[^>]*>([\s\S]*?)<\/div>/)?.[1]
  assert.ok(context, `Missing student navigation on ${route}`)
  const links = [...context.matchAll(/<a\b[^>]*href="([^"]+)"/g)].map(match => match[1])
  const isHub = route === '/students/'
  assert.equal(links.length, isHub ? 1 : 2, `Student hub link and next action on ${route}`)
  assert.ok(!links.includes(base + route.slice(1)), `Self-link on ${route}`)
  assert.equal(new Set(links).size, links.length, `Duplicate link on ${route}`)
  if (!isHub) assert.equal(links[0], base + 'students/', `Missing student hub on ${route}`)
  if (studentSteps[route]) assert.equal(links.at(-1), base + studentSteps[route].slice(1))
  const [target, anchor] = links.at(-1).split('#')
  assert.ok(target.startsWith(base + 'students/'), `Next step left the student guide on ${route}`)
  const destination = fs.readFileSync(path.join('dist', target.slice(base.length) + '.html'), 'utf8')
  if (anchor) assert.ok(destination.includes(`id="${anchor}"`), `Missing target ${anchor}`)
}
const overview = fs.readFileSync('dist/guide/index.html', 'utf8')
assert.match(overview, /<h1\b[^>]*id="start-here"[^>]*>Research overview/, 'Research overview keeps its original heading link')
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
const journal = base === '/knowledge-lab/' ? '' : 'https://keithwilliams.org'
const walkthrough = fs.readFileSync('dist/guide/walkthrough.html', 'utf8')
const answer = walkthrough.match(/<details class="source-check-answer"[^>]*>[\s\S]*?<\/details>/)?.[0]
assert.ok(answer && !/^<details[^>]*\sopen\b/.test(answer) && answer.includes('One witness describes movement.'),
  'Give readers the worked answer in a closed disclosure')
assert.ok(walkthrough.split(answer)[0].includes('Quote one line, include its ID'),
  'Ask the reader to supply evidence before revealing the answer')
function checkJournalLink(html, className, route) {
  const tag = [...html.matchAll(/<a\b[^>]*>/g)].map(match => match[0])
    .find(tag => tag.includes(`class="${className}"`))
  assert.ok(tag?.includes(`href="${journal}${route}"`) && tag.includes('target="_self"'),
    `Expected a same-tab journal link to ${journal}${route}`)
}
for (const html of [home, overview, walkthrough]) checkJournalLink(html, 'lab-journal-return', '/')
assert.ok(home.includes(`href="${journal}/site-notes" target="_self"`), 'Site notes opens in the journal')
checkJournalLink(walkthrough, 'journal-article-link', '/research/systems/provenance-knowledge-graphs')
const readerPaths = home.match(/<ul class="lab-reader-paths"[^>]*>([\s\S]*?)<\/ul>/)?.[1]
assert.ok(readerPaths?.includes(`href="${base}guide/walkthrough"`) && readerPaths.includes(`href="${base}guide/"`),
  'The homepage must give instructors the exercise and practitioners the research overview')
assert.equal((home.match(/<h1\b/g) || []).length, 1, 'Homepage needs one H1')
for (const text of ['explain.', 'Start your IS373 project', 'Future research vision', 'Fictional', 'not live', 'Find your next step.', 'contract labs']) {
  assert.ok(home.includes(text), `Homepage missing ${text}`)
}
for (const route of ['/students/', '/students/plan', '/students/build', '/students/check', '/students/check#explain-your-choices', '/guide/vision', '/guide/walkthrough', '/students/reference', '/students/reference#your-first-15-minutes', '/status']) {
  assert.ok(home.includes(`href="${base}${route.slice(1)}"`), `Homepage route is not base-aware: ${route}`)
}
assert.ok(home.indexOf('Find your next step.') < home.indexOf('Future research vision'), 'Student path must precede future research')
for (const text of ['Plan', 'Build', 'Test', 'Explain', 'ONE COMPLETE RAG EXAMPLE', 'RETRIEVED PASSAGE', 'EXAMPLE ANSWER', 'CHECK THE SOURCE', 'not a live chatbot', 'Choose a model. Understand the cost.']) {
  assert.ok(home.includes(text), `Homepage missing ${text}`)
}
assert.ok(home.includes('href="#club-handbook-source"'), 'Example answer must link to its source')
assert.ok(home.includes('id="club-handbook-source"'), 'Example source must exist')
assert.match(home, /name="lab-docs-revision" content="[^\"]+"/)
assert.ok(!fs.existsSync('dist/CNAME'), 'This docs change must not claim a custom domain')
console.log(`PASS: five navigation sections, ${routes.size} unique targets, ${entryPages.length} concise entry pages, homepage structure and project-base links.`)
console.log('Scope: static IA checks, not live hosting, user testing or full accessibility certification.')
