import test from 'node:test';
import assert from 'node:assert/strict';
import { build } from 'esbuild';
import { fileURLToPath } from 'node:url';
import { importTs } from './loadTs.mjs';

const { outputFiles } = await build({
  entryPoints: [fileURLToPath(new URL('../src/app/venues.json/route.ts', import.meta.url))],
  bundle: true,
  platform: 'node',
  format: 'esm',
  write: false,
});
const route = await import(`data:text/javascript;base64,${Buffer.from(outputFiles[0].text).toString('base64')}`);
const { VENUES } = await importTs('../src/data/venues.ts');
const { publicInventory } = await importTs('../src/utils/discovery.ts');

test('public JSON labels provenance metadata as dataNotice, not description', async () => {
  assert.equal(route.dynamic, 'force-static');
  const response = route.GET();
  assert.match(response.headers.get('content-type'), /application\/json/);
  const payload = await response.json();
  assert.deepEqual(Object.keys(payload).sort(), ['dataNotice', 'venues']);
  assert.equal(typeof payload.dataNotice, 'string');
  assert.ok(payload.dataNotice.length > 0);
  assert.match(payload.dataNotice, /Historical source snapshots/);
  assert.equal(Object.hasOwn(payload, 'description'), false);
  assert.deepEqual(payload.venues, JSON.parse(JSON.stringify(publicInventory(VENUES))));
});
