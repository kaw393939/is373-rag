<script>
  const links = {
    repository: 'https://github.com/kaw393939/is373-rag',
    docs: 'https://github.com/kaw393939/is373-rag/blob/main/docs/project/index.md',
    roadmap: 'https://github.com/kaw393939/is373-rag/blob/main/docs/project/roadmap.md',
    portfolio: 'https://kaw393939.github.io'
  };
  const capabilities = [
    ['01', 'Preserve the evidence', 'Sources, precise citations and provenance belong to the library.'],
    ['02', 'Review before publishing', 'Propose identities and claims without erasing uncertainty or disagreement.'],
    ['03', 'Ask better questions', 'A planned streaming research interface connects answers to inspectable evidence.']
  ];
</script>
<svelte:head>
  <title>Ordo Knowledge Lab · IS373</title>
  <meta name="description" content="Ordo Knowledge Lab: a portable, evidence-backed research system. Welcome preview and implementation roadmap." />
  <meta name="robots" content="noindex, nofollow" />
</svelte:head>
<a class="skip" href="#main">Skip to content</a>
<header class="shell">
  <a class="wordmark" href={links.repository} aria-label="Ordo Knowledge Lab source repository"><span class="mark" aria-hidden="true">O</span><span>ORDO <span class="muted">/ KNOWLEDGE LAB</span></span></a>
  <nav aria-label="Main navigation"><a href={links.docs}>Documentation</a><a href={links.repository}>GitHub <span aria-hidden="true">↗</span></a></nav>
</header>
<main id="main" class="shell">
  <div class="eyebrow">IS373 · AI + EDUCATION · LOCAL-FIRST</div>
  <section class="hero" aria-labelledby="hero-title">
    <div>
      <div class="badge"><span class="dot" aria-hidden="true"></span>Welcome preview</div>
      <h1 id="hero-title">Research with<br /><em>evidence.</em></h1>
      <p class="lead">A portable knowledge library. A clearer path from raw sources to reviewed claims and grounded conversations.</p>
      <div class="actions"><a class="primary" href={links.docs}>Explore the plan <span aria-hidden="true">→</span></a><a class="secondary" href={links.repository}>View source</a></div>
    </div>
    <aside class="note" aria-label="Project status">
      <p class="note-label">THE FOUNDATION</p>
      <h2>Canonical identity.<br />Not canonical truth.</h2>
      <p>Keep one identity for an incident while preserving different accounts of what happened.</p>
      <div class="status"><strong>Backend not connected</strong><span>This is a static Svelte welcome page. Chat, ingestion, review and model execution are not enabled here.</span></div>
    </aside>
  </section>
  <section class="cards" aria-label="Planned capabilities">
    {#each capabilities as [number, title, description]}
      <article><span class="number">{number}</span><h2>{title}</h2><p>{description}</p></article>
    {/each}
  </section>
  <section class="next" aria-labelledby="next-title"><div><p class="note-label">BUILD FROM WHAT EXISTS</p><h2 id="next-title">Small releases. Visible proof.</h2><p>Rust-first core, portable data and native workers behind explicit contracts.</p></div><a href={links.roadmap}>Read the implementation roadmap <span aria-hidden="true">↗</span></a></section>
</main>
<footer class="shell"><a href={links.portfolio}>Keith Williams · AI & education</a><p>Documentation is separate from this application preview. No analytics, models or accounts run on this page.</p></footer>
<style>
  :global(*){box-sizing:border-box}:global(html){color-scheme:light;scroll-behavior:smooth}:global(body){margin:0;background:#f5f4ee;color:#172e2a;font:16px/1.65 system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif}:global(a){color:inherit;text-underline-offset:4px}:global(a:focus-visible){outline:3px solid #85620c;outline-offset:5px}:global(.shell){width:min(1160px,calc(100% - 64px));margin-inline:auto}.skip{position:fixed;top:-100px;left:16px;z-index:9;background:white;padding:10px}.skip:focus{top:16px}header{display:flex;justify-content:space-between;align-items:center;padding:26px 0;border-bottom:1px solid #cbd1c4;gap:24px}.wordmark{display:flex;align-items:center;gap:12px;font-size:13px;font-weight:750;letter-spacing:.07em;text-decoration:none}.mark{display:grid;place-items:center;width:35px;height:35px;background:#244c3e;color:white;font:700 24px Georgia,serif;border-radius:50%}.muted{font-weight:500;color:#4e655b}nav{display:flex;gap:28px;font-size:14px}nav a{text-decoration:none}nav a:hover{text-decoration:underline}.eyebrow{font-size:11px;letter-spacing:.2em;font-weight:700;margin-top:52px;color:#4e655b}.hero{display:grid;grid-template-columns:1.3fr 1fr;gap:76px;align-items:center;padding:35px 0 68px}.badge{display:inline-flex;align-items:center;gap:9px;font-size:12px;border:1px solid #b8c9bc;border-radius:20px;padding:5px 12px}.dot{width:6px;height:6px;border-radius:50%;background:#52715d}h1{font-size:clamp(46px,6.5vw,78px);font-weight:650;line-height:1.08;letter-spacing:-.055em;margin:23px 0}h1 em{font-family:Georgia,serif;font-weight:500;color:#356348;letter-spacing:-.04em}.lead{font-size:19px;color:#43594e;max-width:540px;line-height:1.65}.actions{display:flex;align-items:center;gap:18px;margin-top:29px}.actions a{text-decoration:none;font-size:14px;font-weight:650}.primary{background:#244c3e;color:#fff;padding:12px 20px;border-radius:6px;display:flex;gap:20px}.primary:hover{background:#163a2e}.secondary{padding:12px 8px;border-bottom:1px solid #8f9d91}.note{background:#e7ecdf;border:1px solid #c9d3c0;padding:35px;border-radius:10px}.note-label{font-size:10px;letter-spacing:.2em;font-weight:750;color:#4e655b;margin:0 0 12px}.note h2{font:500 29px/1.3 Georgia,serif;margin:0 0 18px}.note>p:not(.note-label){font-size:14px;color:#43594e}.status{display:grid;gap:5px;border-top:1px solid #bdcaba;padding-top:19px;margin-top:27px;font-size:12px}.status strong{font-size:13px}.status span{color:#43594e}.cards{display:grid;grid-template-columns:repeat(3,1fr);gap:30px;border-top:1px solid #cbd1c4;padding:30px 0 40px}.number{font:italic 22px Georgia,serif;color:#526d57}.cards h2{font-size:17px;line-height:1.4;margin:15px 0 8px}.cards p{font-size:14px;color:#43594e;margin:0;max-width:300px}.next{display:flex;align-items:center;justify-content:space-between;gap:30px;background:#fffdf7;border:1px solid #d6dbcf;border-radius:8px;padding:26px 30px;margin-bottom:48px}.next h2{font-size:22px;margin:0}.next p:not(.note-label){font-size:14px;color:#43594e;margin:6px 0 0}.next a{font-size:13px;font-weight:650;max-width:220px}footer{border-top:1px solid #cbd1c4;display:flex;gap:30px;align-items:center;justify-content:space-between;padding:22px 0 30px;font-size:12px;color:#4e655b}footer p{max-width:490px;margin:0}footer a{white-space:nowrap}@media(max-width:760px){:global(.shell){width:calc(100% - 36px)}header{padding:20px 0;align-items:flex-start}.wordmark{font-size:10px;gap:7px}.muted{display:block}nav{gap:14px;font-size:12px}.eyebrow{margin-top:34px;font-size:9px}.hero{grid-template-columns:1fr;gap:35px;padding-bottom:40px}.lead{font-size:17px}.note{padding:26px}.cards{grid-template-columns:1fr;gap:25px}.cards article{display:grid;grid-template-columns:35px 1fr;column-gap:10px}.cards h2{margin:0}.cards p{grid-column:2;max-width:none}.next{align-items:flex-start;flex-direction:column;padding:24px}.next a{max-width:none}footer{flex-direction:column;align-items:flex-start;gap:12px}}@media(prefers-reduced-motion:reduce){:global(html){scroll-behavior:auto}}
</style>
