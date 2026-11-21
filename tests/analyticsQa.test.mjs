import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { importTs } from './loadTs.mjs';

const { analyticsAllowed, applyQaParam, QA_STORAGE_KEY, GOATCOUNTER_SKIP_KEY } = await importTs('../src/utils/analytics.ts');

function store(entries = {}) {
  const map = new Map(Object.entries(entries));
  return {
    map,
    get: (k) => (map.has(k) ? map.get(k) : null),
    set: (k, v) => map.set(k, v),
    remove: (k) => map.delete(k),
  };
}

test('normal visits keep analytics on', () => {
  const s = store();
  assert.equal(analyticsAllowed('', s.get), true);
  assert.equal(analyticsAllowed('?venue=rockstar-academy-aeon-mall-sentul-city', s.get), true);
});

test('qa=1 in the URL blocks analytics', () => {
  const s = store();
  assert.equal(analyticsAllowed('?qa=1', s.get), false);
  assert.equal(analyticsAllowed('?venue=x&qa=true', s.get), false);
});

test('the QA flag persists across navigations until qa=0 clears it', () => {
  const s = store();
  applyQaParam('?qa=1', s.set, s.remove);
  assert.equal(s.map.get(QA_STORAGE_KEY), '1');
  assert.equal(analyticsAllowed('', s.get), false); // later page, clean URL
  applyQaParam('?qa=0', s.set, s.remove);
  assert.equal(s.map.has(QA_STORAGE_KEY), false);
  assert.equal(analyticsAllowed('', s.get), true);
});

test("GoatCounter's own browser opt-out flag blocks loading before any request", () => {
  const s = store({ [GOATCOUNTER_SKIP_KEY]: 't' });
  assert.equal(analyticsAllowed('', s.get), false);
  assert.equal(analyticsAllowed('?venue=x', s.get), false);
});

test('the document loads the counter only through the gated Analytics component', () => {
  const doc = readFileSync(new URL('../src/components/RootDocument.tsx', import.meta.url), 'utf8');
  assert.ok(doc.includes('<Analytics />'), 'RootDocument must render <Analytics />');
  assert.ok(!doc.includes('gc.zgo.at'), 'RootDocument must not load the counter directly');
  assert.ok(!doc.includes('next/script'), 'no unconditional script loader left');
  const component = readFileSync(new URL('../src/components/Analytics.tsx', import.meta.url), 'utf8');
  assert.ok(component.includes('analyticsAllowed('), 'component must gate on analyticsAllowed');
  assert.ok(component.includes('dataset.goatcounter'), 'component must keep the GoatCounter endpoint');
});
