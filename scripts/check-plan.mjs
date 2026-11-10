import fs from 'node:fs';
import assert from 'node:assert/strict';
const read = path => fs.readFileSync(path, 'utf8');
const ledger = JSON.parse(read('docs/public/source-ledger.json'));
assert.equal(ledger.schemaVersion, 1);
assert.ok(ledger.scope.includes('Donor tests not executed'));
const ids = new Set();
const audit = read('docs/reuse/source-audit.md');
for (const source of ledger.sources) {
  assert.ok(!ids.has(source.id), `Duplicate source ID: ${source.id}`);
  ids.add(source.id);
  assert.match(source.repository, /^[A-Za-z0-9_.-]+\/[A-Za-z0-9_.-]+$/);
  for (const field of ['commit', 'blob']) assert.match(source[field], /^[a-f0-9]{40}$/, `${source.id}: invalid ${field}`);
  assert.ok(source.path && !source.path.startsWith('/') && !source.path.split('/').includes('..'));
  assert.ok(source.inspected && source.decision && Array.isArray(source.symbols));
  assert.ok(['public', 'owner-only'].includes(source.visibility));
  if (source.visibility === 'public') {
    const url = `https://github.com/${source.repository}/blob/${source.commit}/${source.path}`;
    assert.ok(audit.includes(url), `Audit lacks pinned public source: ${source.id}`);
  }
}
assert.ok(ids.has('H-01') && ids.has('H-02') && ids.has('H-03') && ids.has('W-01'));
const factors = read('docs/engineering/twelve-factor.md');
const actualFactors = [...factors.matchAll(/^\| (TF-\d{2}) \|/gm)].map(match => match[1]);
const expectedFactors = Array.from({ length: 12 }, (_, i) => `TF-${String(i + 1).padStart(2, '0')}`);
assert.deepEqual(actualFactors, expectedFactors, 'All twelve factor rows must be present once, in order');
const acceptance = read('docs/project/acceptance.md');
for (let i = 1; i <= 15; i++) {
  const n = String(i).padStart(2, '0');
  assert.ok(acceptance.includes(`| R-${n} |`), `Missing R-${n}`);
  assert.ok(acceptance.includes(`**A-${n} ·`), `Missing scenario A-${n}`);
}
const roadmap = read('docs/project/roadmap.md');
for (let i = 0; i <= 7; i++) assert.ok(roadmap.includes(`## S${i} ·`), `Missing slice S${i}`);
const examples = read('docs/engineering/examples.md');
for (const file of ['lease.rs', 'stream.mjs', 'stream.test.mjs', 'publication.py']) {
  assert.ok(fs.statSync(`docs/examples/${file}`).isFile());
  assert.ok(examples.includes(`<<< @/examples/${file}`), `Example not linked to source: ${file}`);
}
assert.ok(read('docs/status.md').includes('## Not implemented here'));
console.log(`PASS: ${ids.size} pinned source records, 12 factor gates, 15 requirements/scenarios, 8 roadmap slices and 4 example source inclusions.`);
console.log('Scope: structural consistency only; no remote hash verification, donor test execution, runtime acceptance or live deployment is inferred.');
