/** Original synchronous transport lab. It does not open a socket or implement replay/auth. */
export function decodeRun(chunks, { maxBytes = 1024 * 1024, maxFrameChars = 32768 } = {}) {
  if (!Number.isSafeInteger(maxBytes) || maxBytes <= 0 ||
      !Number.isSafeInteger(maxFrameChars) || maxFrameChars <= 0) throw Error('Invalid limits');
  const decoder = new TextDecoder('utf-8', { fatal: true });
  const events = [];
  const outcomes = new Set(['complete', 'failed', 'cancelled', 'interrupted', 'incomplete', 'refused']);
  let buffer = '', bytes = 0, runId, sequence = 0, terminal = false, text = '';
  function drain() {
    let boundary;
    while ((boundary = /\r?\n\r?\n/.exec(buffer))) {
      const raw = buffer.slice(0, boundary.index);
      buffer = buffer.slice(boundary.index + boundary[0].length);
      if (raw.length > maxFrameChars) throw Error('Frame limit exceeded');
      let kind;
      const data = [];
      for (const line of raw.split(/\r?\n/)) {
        if (line.startsWith('event:')) kind = line.slice(6).replace(/^ /, '');
        if (line.startsWith('data:')) data.push(line.slice(5).replace(/^ /, ''));
      }
      if (!kind && !data.length) continue;
      if (!kind || !data.length) throw Error('Malformed frame');
      const value = JSON.parse(data.join('\n'));
      if (!value || typeof value !== 'object' || Array.isArray(value) ||
          value.schemaVersion !== 1 || typeof value.runId !== 'string' ||
          !/^[A-Za-z0-9_-]{1,64}$/.test(value.runId) || value.sequence !== sequence + 1) {
        throw Error('Invalid envelope');
      }
      if (terminal || (!runId && kind !== 'started') || (runId && kind === 'started')) {
        throw Error('Invalid sequence');
      }
      if (runId && value.runId !== runId) throw Error('Run changed');
      runId = value.runId;
      if (kind === 'delta') {
        if (typeof value.text !== 'string') throw Error('Invalid delta');
        text += value.text;
      } else if (kind === 'completed') {
        if (!outcomes.has(value.status)) throw Error('Invalid terminal');
        terminal = true;
      } else if (kind !== 'started') throw Error('Unknown event');
      sequence = value.sequence;
      events.push({ ...value, kind });
    }
    if (buffer.length > maxFrameChars) throw Error('Frame limit exceeded');
  }
  for (const chunk of chunks) {
    if (!(chunk instanceof Uint8Array)) throw Error('Expected bytes');
    bytes += chunk.byteLength;
    if (bytes > maxBytes) throw Error('Run byte limit exceeded');
    buffer += decoder.decode(chunk, { stream: true });
    drain();
  }
  buffer += decoder.decode();
  drain();
  if (buffer.trim() || !terminal) throw Error('Stream ended before terminal completion');
  return { events, text, outcome: events.at(-1).status };
}
