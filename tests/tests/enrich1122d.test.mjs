import test from 'node:test';
import assert from 'node:assert/strict';
import { importTs } from './loadTs.mjs';
const { VENUES } = await importTs('../src/data/venues.ts');

// 2026-11-22 round D pins: I Can Read shared enquiry phone.
// Source: official FAQ icanread.co.id/faq/ lists (021) 2258 0629 (checked 2026-11-22).
test('all I Can Read branches carry the shared enquiry line from the official FAQ', () => {
  const icr = VENUES.filter((x) => x.chain === 'I Can Read');
  assert.equal(icr.length, 27);
  for (const x of icr) assert.ok(x.phone, `${x.id} has no phone`);
  const filled = icr.filter((x) => x.phone === '(021) 2258 0629');
  assert.equal(filled.length, 8);
  for (const x of filled) assert.equal(x.phoneScope, 'shared-enquiry');
  // Branch-specific lines collected earlier keep their own numbers and stay unscoped.
  assert.equal(VENUES.find((x) => x.id === 'i-can-read-bintaro').phone, '+62 21 22214122');
  assert.equal(VENUES.find((x) => x.id === 'i-can-read-bintaro').phoneScope, undefined);
});
