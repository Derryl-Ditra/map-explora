import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
test('styles stay monochrome and use rotating TileJSON rather than pinned tile templates', () => {
 for (const mode of ['light','dark']) {
  const s=JSON.parse(readFileSync(new URL(`../src/data/map-style-${mode}.json`,import.meta.url),'utf8'));
  assert.equal(s.version,8);assert.equal(s.sources.openmaptiles.url,'https://tiles.openfreemap.org/planet');assert.ok(s.layers.length>0);
  assert.doesNotMatch(JSON.stringify(s),/planet\/\d{8}_/);
 }
});
test('map waits for idle, reports errors and starts at wider zoom', () => {
 const s=readFileSync(new URL('../src/components/map/VectorMap.tsx',import.meta.url),'utf8');
 assert.match(s,/once\("idle"/);assert.match(s,/map\.on\("error"/);assert.match(s,/zoom: 11/);assert.doesNotMatch(s,/FALLBACK_STYLE_URL/);
});
