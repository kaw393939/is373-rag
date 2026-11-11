<script setup lang="ts">
import { withBase } from 'vitepress'
const sections = [
  { number: '01', title: 'Plan', text: 'Choose one useful question and a small set of documents you can trust.', link: '/students/plan', label: 'Choose your starting point' },
  { number: '02', title: 'Build', text: 'Connect your sources, retrieval and answer. Get one small path working first.', link: '/students/build', label: 'Build a working slice' },
  { number: '03', title: 'Test', text: 'Try questions your sources can answer, and one they cannot. Check the citations.', link: '/students/check', label: 'Check what really works' },
  { number: '04', title: 'Explain', text: 'Show your app, trace an answer to its source and explain the choices you made.', link: '/students/check#explain-your-choices', label: 'Prepare your walkthrough' },
]
const steps = ['Ask a question', 'Retrieve a passage', 'Write an answer', 'Check the source']
</script>

<template>
  <div class="lab-home">
    <div class="lab-status"><span class="lab-status-dot" aria-hidden="true"></span><span>PROJECT DOCUMENTATION · IS373</span><a :href="withBase('/status')">What exists today <span aria-hidden="true">↗</span></a></div>
    <section class="lab-hero" aria-labelledby="lab-title">
      <div class="lab-intro">
        <p class="lab-kicker">IS373 · START SMALL. SHOW YOUR EVIDENCE.</p>
        <h1 id="lab-title">Build answers you<br>can <em>explain.</em></h1>
        <p class="lab-lead">Give your app a few trusted documents. Ask a useful question. Show where the answer came from.</p>
        <p class="lab-summary">Start your IS373 individual RAG project with small steps, examples and prompts that help you understand what you build. No new assignment or required stack.</p>
        <div class="lab-actions"><a class="lab-primary" :href="withBase('/students/')">Start your IS373 project <span aria-hidden="true">→</span></a><a class="lab-secondary" :href="withBase('/students/reference')">Try the first 15 minutes</a></div>
        <p class="lab-scope">Your assignment and Canvas remain the source of truth.<br>This guide is optional help, not extra graded work.</p>
      </div>
      <aside class="lab-evidence" aria-label="Illustrated RAG example with a fictional club handbook">
        <div class="lab-evidence-head"><span>ONE COMPLETE RAG EXAMPLE</span><span class="lab-tag">Fictional</span></div>
        <h2>A question.<br>An answer you can check.</h2>
        <ol class="lab-example">
          <li class="lab-report"><span class="lab-report-id">01 · QUESTION</span><p>“Can I bring a friend to the club?”</p></li>
          <li class="lab-report"><span class="lab-report-id">02 · RETRIEVED PASSAGE</span><p>“Members may bring one guest. Register your guest before the meeting.”</p><span class="lab-report-note">Retrieved from Club handbook · §2</span></li>
          <li class="lab-report"><span class="lab-report-id">03 · EXAMPLE ANSWER</span><p>Yes, you can bring one friend. Register them before the meeting. <a href="#club-handbook-source" aria-label="Check source 1: Club handbook section 2">[1]</a></p></li>
          <li class="lab-report" id="club-handbook-source" tabindex="-1"><span class="lab-report-id">04 · CHECK THE SOURCE</span><p><strong>[1] Club handbook · §2: Guests</strong></p><p>Members may bring one guest. Register your guest before the meeting.</p><span class="lab-report-note">This is the complete fictional source for this example. It says nothing about guest fees, so the answer should not invent one.</span></li>
        </ol>
        <div class="lab-verdict"><strong>Retrieval finds evidence. Generation writes the answer.</strong><span>This is a written illustration, not a live chatbot or measured model output. A citation helps only when its source supports the claim.</span></div>
        <a class="lab-case-link" :href="withBase('/students/reference')">Try real retrieval locally <span aria-hidden="true">→</span></a>
      </aside>
    </section>

    <section class="lab-student" aria-labelledby="ai-budget-title"><div><p class="lab-kicker">AI WITHOUT SURPRISE BILLS</p><h2 id="ai-budget-title">Choose a model. Understand the cost.</h2><p>Start with Groq, compare Gemini and other APIs, and learn what tokens mean for your project budget.</p></div><a :href="withBase('/students/ai-costs')">Compare models and budgets →</a></section>
    <section class="lab-flow" aria-labelledby="lab-flow-title">
      <div class="lab-flow-label"><p class="lab-kicker">THE BASIC RAG LOOP</p><h2 id="lab-flow-title">From source to answer.</h2></div>
      <ol><li v-for="(step, index) in steps" :key="step"><span class="lab-step-number">0{{ index + 1 }}</span><span>{{ step }}</span></li></ol>
    </section>
    <section class="lab-explore" aria-labelledby="lab-explore-title">
      <div class="lab-section-heading"><div><p class="lab-kicker">YOUR STUDENT PROJECT</p><h2 id="lab-explore-title">Find your next step.</h2></div><p>Four ways to move forward, not four new assignments.</p></div>
      <div class="lab-cards"><a v-for="section in sections" :key="section.number" :href="withBase(section.link)" class="lab-card"><span class="lab-card-number">{{ section.number }}</span><h3>{{ section.title }}</h3><p>{{ section.text }}</p><span class="lab-card-link">{{ section.label }} <span aria-hidden="true">↗</span></span></a></div>
    </section>
    <section class="lab-student" aria-labelledby="lab-student-title"><div><p class="lab-kicker">LOOKING BEYOND THIS SEMESTER</p><h2 id="lab-student-title">Future research vision</h2><p>Explore the planned Rust-first knowledge workspace, reviewable AI workflows and streaming answers. This larger system is not your current assignment, and the research application is not live.</p></div><a :href="withBase('/guide/vision')">Explore the future vision <span aria-hidden="true">→</span></a></section>
    <details class="lab-research">
      <summary>Optional deeper reading: the research system</summary>
      <p>These proposed designs and small contract labs explore a larger knowledge workspace. They are not requirements for your student RAG app.</p>
      <div class="lab-practice-links"><a :href="withBase('/guide/walkthrough')">A fictional research workflow <span aria-hidden="true">→</span></a><a :href="withBase('/project/knowledge')">Identity, evidence and disagreement <span aria-hidden="true">→</span></a><a :href="withBase('/engineering/examples')">Run the contract labs <span aria-hidden="true">→</span></a></div>
    </details>
    <p class="lab-ending">Start small. Keep your sources visible. Explain what your app can and cannot do. <a href="https://github.com/kaw393939/is373-rag">View the repository <span aria-hidden="true">↗</span></a></p>
  </div>
</template>

<style scoped>
.lab-home{max-width:1184px;margin:0 auto;padding:28px 32px 48px;color:var(--vp-c-text-1)}
.lab-home a:focus-visible{outline:3px solid var(--vp-c-brand-1);outline-offset:5px;border-radius:4px}
.lab-status{display:flex;align-items:center;gap:9px;font-size:11px;letter-spacing:.08em;color:var(--vp-c-text-2);padding:0 0 25px;border-bottom:1px solid var(--vp-c-divider)}
.lab-status a{margin-left:auto;letter-spacing:0;font-size:13px;color:var(--vp-c-brand-1);text-decoration:underline;text-underline-offset:4px}
.lab-status-dot{width:7px;height:7px;background:var(--vp-c-brand-1);border-radius:50%;flex-shrink:0}
.lab-hero{display:grid;grid-template-columns:minmax(0,1.25fr) minmax(0,1fr);gap:64px;align-items:center;padding:64px 0 66px}
.lab-kicker{font-size:11px;font-weight:650;letter-spacing:.13em;color:var(--vp-c-brand-1);margin:0 0 18px;line-height:1.7}
.lab-intro h1{font-size:clamp(40px,4.7vw,64px);line-height:1.07;letter-spacing:-.055em;font-weight:650;margin:0 0 24px}
.lab-intro h1 em{font-style:normal;color:var(--vp-c-brand-1)}
.lab-lead{font-size:21px;line-height:1.55;letter-spacing:-.018em;max-width:500px;margin:0 0 16px}
.lab-summary{font-size:16px;line-height:1.75;color:var(--vp-c-text-2);max-width:490px;margin:0 0 26px}
.lab-actions{display:flex;gap:12px;flex-wrap:wrap;align-items:center}
.lab-actions a{display:inline-flex;align-items:center;gap:18px;padding:12px 17px;border-radius:5px;font-weight:600;font-size:14px;line-height:1.5}
.lab-primary{background:var(--vp-c-brand-1);color:var(--vp-c-bg)}
.lab-secondary{border:1px solid var(--vp-c-divider);color:var(--vp-c-text-1)}
.lab-primary:hover{background:var(--vp-c-brand-2)}.lab-secondary:hover{border-color:var(--vp-c-brand-1)}
.lab-scope{font-size:12px;line-height:1.75;color:var(--vp-c-text-2);margin:20px 0 0}
.lab-evidence{padding:25px;border:1px solid var(--vp-c-divider);border-radius:10px;background:var(--vp-c-bg-alt);box-shadow:0 12px 45px rgba(20,45,30,.04)}
.lab-evidence-head{display:flex;align-items:center;justify-content:space-between;gap:10px;font-size:9px;letter-spacing:.09em;color:var(--vp-c-text-2)}
.lab-tag{font-size:10px;border:1px solid var(--vp-c-divider);padding:3px 7px;border-radius:4px;letter-spacing:0}
.lab-evidence h2{font-size:29px;line-height:1.18;letter-spacing:-.035em;font-weight:600;margin:22px 0}
.lab-example{list-style:none;padding:0;margin:0}.lab-example a{color:var(--vp-c-brand-1);text-decoration:underline}.lab-report:target{outline:2px solid var(--vp-c-brand-1);outline-offset:6px;scroll-margin-top:90px}.lab-research{margin:10px 0 35px;padding:20px 24px;border:1px solid var(--vp-c-divider);border-radius:8px}.lab-research summary{cursor:pointer;font-weight:600;font-size:15px}.lab-research summary:focus-visible{outline:3px solid var(--vp-c-brand-1);outline-offset:5px}.lab-research>p{font-size:14px;color:var(--vp-c-text-2);line-height:1.7;margin-top:14px}
.lab-report{padding:12px 0;border-top:1px solid var(--vp-c-divider)}
.lab-report-id{font-family:var(--vp-font-family-mono);font-size:10px;letter-spacing:.09em;color:var(--vp-c-brand-1)}
.lab-report p{font-size:14px;line-height:1.6;margin:4px 0 2px}
.lab-report-note{font-size:11px;color:var(--vp-c-text-2);line-height:1.6}
.lab-verdict{padding:13px 14px;background:var(--vp-c-brand-soft);border-left:3px solid var(--vp-c-brand-1);margin:10px 0 14px}
.lab-verdict strong,.lab-verdict span{display:block;font-size:12px;line-height:1.7}.lab-verdict span{color:var(--vp-c-text-2);font-size:11px}
.lab-case-link{font-size:12px;color:var(--vp-c-brand-1);text-decoration:underline;text-underline-offset:4px}
.lab-student{display:flex;justify-content:space-between;align-items:center;gap:24px;padding:24px;margin:0 0 22px;border:1px solid var(--vp-c-divider);border-radius:8px;background:var(--vp-c-bg-alt)}.lab-student .lab-kicker{margin-bottom:5px}.lab-student h2{font-size:21px;font-weight:600;letter-spacing:-.025em}.lab-student p:not(.lab-kicker){font-size:13px;color:var(--vp-c-text-2);line-height:1.6;max-width:700px;margin:7px 0 0}.lab-student a{color:var(--vp-c-brand-1);font-size:14px;font-weight:600;white-space:nowrap;text-decoration:underline;text-underline-offset:4px}
.lab-flow{display:grid;grid-template-columns:1fr 2fr;gap:30px;align-items:center;border-top:1px solid var(--vp-c-divider);border-bottom:1px solid var(--vp-c-divider);padding:26px 0}
.lab-flow .lab-kicker{margin-bottom:7px;font-size:9px}.lab-flow h2{font-size:22px;letter-spacing:-.03em;font-weight:600}
.lab-flow ol{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:20px;margin:0;list-style:none;padding:0}
.lab-flow li{font-size:12px;line-height:1.6}.lab-step-number{display:block;font-family:var(--vp-font-family-mono);color:var(--vp-c-brand-1);margin-bottom:6px;font-size:10px}
.lab-explore{padding:60px 0}.lab-section-heading{display:flex;align-items:flex-end;justify-content:space-between;gap:26px;margin-bottom:24px}
.lab-section-heading .lab-kicker{margin-bottom:10px}.lab-section-heading h2,.lab-practice h2{font-size:32px;line-height:1.2;letter-spacing:-.04em;font-weight:600}
.lab-section-heading>p{font-size:14px;color:var(--vp-c-text-2);max-width:245px;line-height:1.65;margin:0}
.lab-cards{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:14px}
.lab-card{padding:22px 19px;border:1px solid var(--vp-c-divider);border-radius:7px;display:flex;flex-direction:column;min-height:235px;transition:border-color .15s}
.lab-card:hover{border-color:var(--vp-c-brand-1)}.lab-card-number{font-family:var(--vp-font-family-mono);font-size:11px;color:var(--vp-c-text-2)}
.lab-card h3{font-size:19px;line-height:1.3;font-weight:600;letter-spacing:-.025em;margin:18px 0 12px}.lab-card p{font-size:13px;line-height:1.75;color:var(--vp-c-text-2);margin:0 0 20px}
.lab-card-link{margin-top:auto;font-size:12px;color:var(--vp-c-brand-1);font-weight:600;display:flex;justify-content:space-between;gap:8px}
.lab-practice-links a{display:flex;justify-content:space-between;gap:18px;padding:16px 0;border-bottom:1px solid var(--vp-c-divider);font-size:14px;color:var(--vp-c-brand-1)}
.lab-ending{border-top:1px solid var(--vp-c-divider);padding-top:24px;font-size:12px;line-height:1.8;color:var(--vp-c-text-2)}.lab-ending a{color:var(--vp-c-brand-1);text-decoration:underline;margin-left:6px}
@media(max-width:960px){.lab-hero{gap:32px}.lab-cards{grid-template-columns:repeat(2,minmax(0,1fr))}.lab-card{min-height:210px}.lab-flow{grid-template-columns:1fr}.lab-principle,.lab-practice{gap:32px}}
@media(max-width:640px){.lab-student{display:block}.lab-student a{display:inline-block;margin-top:12px}.lab-home{padding:22px 22px 32px}.lab-status{flex-wrap:wrap;font-size:9px;gap:7px;padding-bottom:18px}.lab-status a{font-size:11px}.lab-hero{grid-template-columns:1fr;padding:38px 0;gap:32px}.lab-intro h1{font-size:42px}.lab-lead{font-size:19px}.lab-evidence{padding:21px}.lab-flow ol{grid-template-columns:repeat(2,minmax(0,1fr));gap:16px}.lab-section-heading{display:block}.lab-section-heading>p{margin-top:12px;max-width:none}.lab-cards{grid-template-columns:1fr}.lab-card{min-height:0}.lab-card h3{margin-top:12px}.lab-explore{padding:38px 0}.lab-principle,.lab-practice{grid-template-columns:1fr;gap:22px}.lab-principle{padding:25px}.lab-principle h2,.lab-section-heading h2{font-size:29px}.lab-practice{padding:38px 0}.lab-ending a{display:block;margin:6px 0 0}}
@media(prefers-reduced-motion:reduce){.lab-card{transition:none}}
</style>
