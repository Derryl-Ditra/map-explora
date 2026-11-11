import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import vm from 'node:vm';
const bright = JSON.parse(readFileSync(new URL('../src/data/map-style-light.json', import.meta.url), 'utf8'));
const source = readFileSync(new URL('../src/components/map/vectorStyle.ts', import.meta.url), 'utf8');
// Execute the function body against a fresh style, not just a source-text assertion.
const body = source.slice(source.indexOf('{', source.indexOf('export function getMapStyle')) + 1, source.lastIndexOf('}')).replace(/ as StyleSpecification/g, '');
const getStyle = vm.runInNewContext(`(function() { ${body} })`, { bright, structuredClone, Promise });
test('local glyph rendering removes remote font downloads without changing layers or source', async () => {
  const style = await getStyle();
  assert.equal(style.glyphs, undefined);
  const expected = structuredClone(bright);
  delete expected.glyphs;
  assert.deepEqual(style, expected);
  assert.ok(bright.glyphs, 'do not mutate the checked-in provider style');
  assert.notEqual(style, await getStyle(), 'each map owns its style');
});
