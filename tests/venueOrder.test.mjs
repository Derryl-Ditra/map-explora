import test from 'node:test';
import assert from 'node:assert/strict';
import { importTs } from './loadTs.mjs';
const { compareVenueOrder } = await importTs('../src/utils/venueOrder.ts');
const v = (branchName, area, distance, verified) => ({ branchName, area, distance, verified });
const ok = (x) => x.verified;
test('with location the list is nearest first regardless of age evidence', () => {
  const list = [v('far verified', 'Bogor', 41, true), v('mid verified', 'Bekasi', 54.8, true), v('near unverified', 'Tangsel', 1.1, false), v('near verified', 'Tangsel', 1.3, true)];
  const d = list.sort((a, b) => compareVenueOrder(a, b, true, ok)).map((x) => x.distance);
  assert.deepEqual(d, [...d].sort((a, b) => a - b));
});
test('without location verified-age places lead, then area and name', () => {
  const list = [v('b', 'Z', undefined, false), v('a', 'A', undefined, false), v('c', 'M', undefined, true)];
  assert.deepEqual(list.sort((a, b) => compareVenueOrder(a, b, false, ok)).map((x) => x.branchName), ['c', 'a', 'b']);
});
