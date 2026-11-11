import assert from 'node:assert/strict'
import fs from 'node:fs'
const guide = fs.readFileSync('docs/students/ai-costs.md', 'utf8')
const rows = guide.split('\n').filter(line => /^\| \[/.test(line))
assert.equal(rows.length, 7, 'Expected seven dated pricing examples')
for (const row of rows) {
  const [, model, input, output, estimate] = row.split('|').map(x => x.trim())
  const number = text => Number(text.replace('$', ''))
  assert.ok(Math.abs(3 * number(input) + 0.5 * number(output) - number(estimate)) < 1e-9, `Incorrect worked estimate: ${model}`)
}
assert.ok(guide.includes('November 11, 2026'))
assert.ok(guide.includes('total billed output'))
console.log('PASS: seven provider example budgets match 3M input + 0.5M billed output tokens; date and scope present.')
