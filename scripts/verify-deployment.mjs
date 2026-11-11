import assert from 'node:assert/strict'
const url = new URL(process.env.PAGE_URL || '')
assert.equal(url.protocol, 'https:', 'Pages must report an HTTPS URL')
if (!url.pathname.endsWith('/')) url.pathname += '/'
const revision = process.env.EXPECTED_REVISION || ''
assert.match(revision, /^[a-f0-9]{40}$/)
const expected = `name="lab-docs-revision" content="${revision}"`
let last
for (let attempt = 1; attempt <= 6; attempt++) {
  try {
    for (const [route, needle] of [['', 'Give your app a few trusted documents.'], ['guide/vision.html', 'Knowledge you can stand behind'], ['reference/glossary.html', 'Shared vocabulary']]) {
      const response = await fetch(new URL(route, url), { signal: AbortSignal.timeout(15000), cache: 'no-store' })
      assert.equal(response.status, 200, `${route || '/'} HTTP status`)
      assert.match(response.headers.get('content-type') || '', /text\/html/)
      const html = await response.text()
      assert.ok(html.includes(expected), `${route || '/'} does not serve this revision`)
      assert.ok(html.includes(needle), `${route || '/'} content mismatch`)
      const css = html.match(/href="([^"]+\.css)"/)
      assert.ok(css, 'No stylesheet link')
      const asset = await fetch(new URL(css[1], response.url), { signal: AbortSignal.timeout(15000) })
      assert.equal(asset.status, 200, 'Stylesheet HTTP status')
      assert.match(asset.headers.get('content-type') || '', /text\/css/)
    }
    console.log(`LIVE VERIFIED: ${url.href} at ${revision}; homepage, vision, glossary and CSS.`)
    process.exit(0)
  } catch (error) {
    last = error
    console.error(`Public-site check ${attempt}/6: ${error.message}`)
    if (attempt < 6) await new Promise(resolve => setTimeout(resolve, 5000))
  }
}
throw last
