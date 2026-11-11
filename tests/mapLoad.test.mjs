import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
const source = readFileSync(new URL('../src/components/map/VectorMap.tsx', import.meta.url), 'utf8');
test('basemap loading cover ends at load, before adding venue labels, not at idle', () => {
  const load = source.slice(source.indexOf('map.on("load", () => {'), source.indexOf('map.on("moveend"'));
  const ready = load.indexOf('setMapStatus("ready")');
  assert.ok(ready >= 0);
  assert.ok(ready < load.indexOf('ensureLabelAssets(map)'));
  assert.ok(ready < load.indexOf('renderMarkers(map)'));
  assert.ok(!/map\.once\("idle"/.test(source));
  assert.ok(source.includes('!cancelled && !failed'));
  assert.ok(source.includes('setMapStatus("error")'));
});
