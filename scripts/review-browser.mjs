// Built-site browser checks in CI, using the runner's installed Chrome.
// No application dependency, provider credential or external site is required.
import assert from 'node:assert/strict'
import fs from 'node:fs/promises'
import path from 'node:path'
import os from 'node:os'
import http from 'node:http'
import { spawn } from 'node:child_process'

const root = path.resolve('dist')
const base = process.env.DOCS_BASE || '/is373-rag/'
const output = path.resolve(process.env.BROWSER_REVIEW_DIR || 'browser-review')
await fs.mkdir(output, { recursive: true })
const mime = { '.html':'text/html', '.css':'text/css', '.js':'text/javascript', '.json':'application/json', '.svg':'image/svg+xml', '.woff2':'font/woff2', '.png':'image/png' }
const server = http.createServer(async (req, res) => {
  try {
    const pathname = decodeURIComponent(new URL(req.url, 'http://local').pathname)
    if (!pathname.startsWith(base)) { res.writeHead(404).end(); return }
    let file = path.resolve(root, pathname.slice(base.length) || '.')
    if (file !== root && !file.startsWith(root + path.sep)) { res.writeHead(403).end(); return }
    let stat = await fs.stat(file).catch(() => null)
    if (stat?.isDirectory()) file = path.join(file, 'index.html')
    else if (!stat && !path.extname(file)) file += '.html'
    const bytes = await fs.readFile(file)
    res.writeHead(200, { 'content-type': mime[path.extname(file)] || 'application/octet-stream' }).end(bytes)
  } catch { res.writeHead(404).end() }
})
await new Promise(resolve => server.listen(0, '127.0.0.1', resolve))
const origin = `http://127.0.0.1:${server.address().port}`
const profile = await fs.mkdtemp(path.join(os.tmpdir(), 'lab-docs-chrome-'))
const chrome = spawn(process.env.BROWSER_EXECUTABLE || 'google-chrome', ['--headless', '--no-sandbox', '--disable-dev-shm-usage', '--no-first-run', '--remote-debugging-port=0', `--user-data-dir=${profile}`], { stdio: ['ignore','ignore','pipe'] })
let socket
try {
  const address = await new Promise((resolve, reject) => {
    let text = ''; const timer = setTimeout(() => reject(Error('Chrome startup timed out')), 15000)
    chrome.once('error', error => { clearTimeout(timer); reject(error) })
    chrome.stderr.on('data', data => {
      text += data
      const match = text.match(/DevTools listening on (ws:\/\/[^\s]+)/)
      if (match) { clearTimeout(timer); resolve(match[1]) }
    })
  })
  socket = new WebSocket(address)
  await new Promise((resolve, reject) => { socket.addEventListener('open', resolve, { once:true }); socket.addEventListener('error', reject, { once:true }) })
  let id = 0
  const pending = new Map(), listeners = new Map(), errors = []
  socket.addEventListener('message', ({ data }) => {
    const msg = JSON.parse(data)
    if (msg.id && pending.has(msg.id)) {
      const waiter = pending.get(msg.id); pending.delete(msg.id); clearTimeout(waiter.timer)
      msg.error ? waiter.reject(Error(JSON.stringify(msg.error))) : waiter.resolve(msg.result)
    }
    const key = `${msg.sessionId}:${msg.method}`
    if (listeners.has(key)) { const fn = listeners.get(key); listeners.delete(key); fn(msg.params) }
    if (msg.method === 'Runtime.exceptionThrown') errors.push(msg.params.exceptionDetails.text)
  })
  const send = (method, params = {}, sessionId) => new Promise((resolve, reject) => {
    const key = ++id
    const timer = setTimeout(() => { pending.delete(key); reject(Error(`CDP timeout: ${method}`)) }, 15000)
    pending.set(key, { resolve, reject, timer })
    socket.send(JSON.stringify({ id:key, method, params, ...(sessionId ? { sessionId } : {}) }))
  })
  const target = await send('Target.createTarget', { url:'about:blank' })
  const { sessionId } = await send('Target.attachToTarget', { targetId:target.targetId, flatten:true })
  const call = (method, params = {}) => send(method, params, sessionId)
  const evaluate = async expression => {
    const result = await call('Runtime.evaluate', { expression, returnByValue:true, awaitPromise:true })
    if (result.exceptionDetails) throw Error(JSON.stringify(result.exceptionDetails))
    return result.result.value
  }
  await call('Page.enable'); await call('Runtime.enable')
  const navigate = async route => {
    const loaded = new Promise((resolve, reject) => {
      const key = `${sessionId}:Page.loadEventFired`
      const timer = setTimeout(() => { listeners.delete(key); reject(Error(`Page load timeout: ${route}`)) }, 15000)
      listeners.set(key, () => { clearTimeout(timer); resolve() })
    })
    const response = await call('Page.navigate', { url: origin + base + route })
    if (response.errorText) throw Error(response.errorText)
    await loaded
    await evaluate('document.fonts.ready.then(() => true)')
  }
  const screenshot = async name => {
    const { cssContentSize } = await call('Page.getLayoutMetrics')
    const image = await call('Page.captureScreenshot', { format:'png', captureBeyondViewport:true, clip:{ x:0, y:0, width:cssContentSize.width, height:Math.min(cssContentSize.height,12000), scale:1 } })
    await fs.writeFile(path.join(output, name + '.png'), Buffer.from(image.data,'base64'))
  }
  const receipt = { scope:'Built static documentation on local CI HTTP; not live Pages, Safari or full accessibility certification.', browser:await send('Browser.getVersion'), routes:[], interactions:[] }
  for (const [name, width, height, scheme] of [['desktop',1440,1000,'light'],['mobile',390,844,'light'],['dark',1440,1000,'dark']]) {
    await call('Emulation.setDeviceMetricsOverride', { width,height,deviceScaleFactor:1,mobile:false })
    await call('Emulation.setEmulatedMedia', { features:[{ name:'prefers-color-scheme',value:scheme }] })
    for (const route of ['', 'guide/vision', 'guide/walkthrough', 'design/', 'build/', 'reference/glossary', 'engineering/twelve-factor', 'students/', 'students/plan', 'students/build', 'students/prompts', 'students/stuck', 'students/check', 'students/reference', 'students/ai-costs', 'students/data-choices']) {
      await navigate(route)
      const state = await evaluate('({h1:document.querySelectorAll("h1").length, overflow:document.documentElement.scrollWidth>innerWidth+1, revision:document.querySelector("meta[name=lab-docs-revision]")?.content, dark:document.documentElement.classList.contains("dark")})')
      assert.equal(state.h1,1,`${name}/${route}: H1`)
      assert.equal(state.overflow,false,`${name}/${route}: page overflow`)
      assert.ok(state.revision,`${name}/${route}: revision`)
      assert.equal(state.dark,scheme==='dark',`${name}/${route}: color scheme`)
      receipt.routes.push({ viewport:name, route:route||'/', ...state })
      if (!route) await screenshot('home-' + name)
      if (route === 'students/ai-costs' || route === 'students/data-choices') await screenshot(route.replace('/', '-') + '-' + name)
      if (name==='desktop' && route==='guide/vision') await screenshot('vision-desktop')
    }
  }
  await call('Emulation.setDeviceMetricsOverride', { width:1440,height:1000,deviceScaleFactor:1,mobile:false })
  await navigate('')
  await evaluate('document.querySelector(".VPNavBarSearch button").click()')
  await evaluate('new Promise((resolve,reject)=>{let n=0;const t=setInterval(()=>{const input=document.querySelector("#localsearch-input");if(input){clearInterval(t);input.value="portable";input.dispatchEvent(new Event("input",{bubbles:true}));resolve(true)}else if(++n>100){clearInterval(t);reject(Error("Search did not open"))}},50)})')
  const results = await evaluate('new Promise((resolve,reject)=>{let n=0;const t=setInterval(()=>{const list=document.querySelectorAll("[role=option] a.result");if(list.length){clearInterval(t);resolve([...list].map(a=>a.getAttribute("href")))}else if(++n>100){clearInterval(t);reject(Error("Search returned no results"))}},50)})')
  assert.ok(results.every(href=>href.startsWith(base)), 'Search escaped project path')
  receipt.interactions.push({ search:'portable', resultCount:results.length, allResultsWithinBase:true })
  await call('Input.dispatchKeyEvent', { type:'keyDown',key:'Escape',code:'Escape',windowsVirtualKeyCode:27 })
  await call('Input.dispatchKeyEvent', { type:'keyUp',key:'Escape',code:'Escape',windowsVirtualKeyCode:27 })
  await call('Emulation.setDeviceMetricsOverride', { width:390,height:844,deviceScaleFactor:1,mobile:false })
  await navigate('')
  const expanded = await evaluate('new Promise(resolve=>{const button=document.querySelector(".VPNavBarHamburger");button.click();requestAnimationFrame(()=>resolve(button.getAttribute("aria-expanded")))})')
  assert.equal(expanded,'true','Mobile menu must open')
  receipt.interactions.push({ mobileMenu:'opened' })
  await navigate('students/reference')
  await call('Browser.grantPermissions', { origin, permissions:['clipboardReadWrite','clipboardSanitizedWrite'] })
  const copied = await evaluate(`new Promise((resolve,reject)=>{
    let n=0;const timer=setInterval(async()=>{
      const button=document.querySelector('div[class*="language-"] button.copy');
      if(button){clearInterval(timer);button.click();setTimeout(async()=>{
        try{resolve(await navigator.clipboard.readText())}catch(error){reject(error)}
      },300)}else if(++n>100){clearInterval(timer);reject(Error('Copy button missing'))}
    },50)
  })`)
  assert.ok(copied.includes('git clone https://github.com/kaw393939/is373-rag.git'),'Mobile copy must preserve setup command')
  receipt.interactions.push({ mobileLabCopy:'verified clipboard contents' })
  await screenshot('student-lab-mobile')

  assert.equal(errors.length,0,`Browser exceptions: ${errors.join('; ')}`)
  await fs.writeFile(path.join(output,'receipt.json'), JSON.stringify(receipt,null,2))
  console.log(`PASS: ${receipt.routes.length} viewport/route checks; light/dark, no page overflow, local search and mobile navigation. Screenshots: ${output}`)
} finally {
  socket?.close(); chrome.kill('SIGTERM'); server.close()
  await fs.rm(profile,{ recursive:true,force:true }).catch(()=>{})
}
