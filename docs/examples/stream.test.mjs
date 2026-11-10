import test from 'node:test';
import assert from 'node:assert/strict';
import { decodeRun } from './stream.mjs';
const encoder = new TextEncoder();
const frame = (kind, sequence, payload = {}, newline = '\n') =>
  `event: ${kind}${newline}data: ${JSON.stringify({ schemaVersion: 1, runId: 'run_1', sequence, ...payload })}${newline}${newline}`;
const fixture = (status = 'complete', newline = '\n') => encoder.encode(
  frame('started', 1, {}, newline) + frame('delta', 2, { text: 'Café 🛸' }, newline) +
  frame('completed', 3, { status }, newline));

test('all byte split points preserve Unicode and framing', () => {
  const bytes = fixture();
  for (let split = 0; split <= bytes.length; split++) {
    const result = decodeRun([bytes.slice(0, split), bytes.slice(split)]);
    assert.equal(result.text, 'Café 🛸');
    assert.equal(result.outcome, 'complete');
  }
});
test('one byte chunks and CRLF delimiters work', () => {
  assert.equal(decodeRun([...fixture('complete', '\r\n')].map(b => Uint8Array.of(b))).text, 'Café 🛸');
});
test('independent lossy chunk decoding demonstrates the donor failure mode', () => {
  const bytes = encoder.encode('é');
  const wrong = new TextDecoder().decode(bytes.slice(0, 1)) + new TextDecoder().decode(bytes.slice(1));
  assert.notEqual(wrong, 'é');
});
test('EOF is not success', () => {
  assert.throws(() => decodeRun([encoder.encode(frame('started', 1))]), /terminal completion/);
});
test('incomplete and refused remain distinct terminal outcomes', () => {
  for (const status of ['incomplete', 'refused', 'cancelled', 'interrupted', 'failed']) {
    assert.equal(decodeRun([fixture(status)]).outcome, status);
  }
});
test('a second completion is rejected', () => {
  assert.throws(() => decodeRun([fixture(), encoder.encode(frame('completed', 4, { status: 'complete' }))]), /sequence/);
});
test('another run cannot append text', () => {
  const value = frame('delta', 2, { text: 'other', runId: 'run_2' });
  assert.throws(() => decodeRun([encoder.encode(frame('started', 1) + value)]), /Run changed/);
});
test('malformed UTF-8 is rejected, not replaced', () => {
  assert.throws(() => decodeRun([Uint8Array.of(255)]));
});
test('size limits are enforced', () => {
  assert.throws(() => decodeRun([fixture()], { maxBytes: 4 }), /byte limit/);
  assert.throws(() => decodeRun([encoder.encode('data: too-long')], { maxFrameChars: 4 }), /Frame limit/);
});
test('missing sequence and unknown outcome are rejected', () => {
  assert.throws(() => decodeRun([encoder.encode(frame('started', 2))]), /envelope/);
  assert.throws(() => decodeRun([fixture('maybe')]), /terminal/);
});
