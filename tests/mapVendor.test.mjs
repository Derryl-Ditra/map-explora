import test from 'node:test';
import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { readFileSync, existsSync } from 'node:fs';
import { gzipSync } from 'node:zlib';

test('same-origin MapLibre build shares content-hashed code between main and worker', () => {
  execFileSync(process.execPath, ['scripts/build-map-vendor.mjs']);
  const manifest = JSON.parse(readFileSync('src/data/map-vendor.json', 'utf8'));
  const paths = [manifest.entry, manifest.worker, ...manifest.shared];
  for (const path of paths) {
    assert.match(path, /^\/vendor\/maplibre\/[a-z]+-[A-Z0-9]+\.js$/);
    assert.ok(existsSync(`public${path}`));
  }
  const entry = readFileSync(`public${manifest.entry}`, 'utf8');
  const worker = readFileSync(`public${manifest.worker}`, 'utf8');
  for (const shared of manifest.shared) {
    const name = shared.split('/').at(-1);
    assert.ok(entry.includes(name));
    assert.ok(worker.includes(name));
  }
  assert.ok(paths.reduce((sum, path) => sum + gzipSync(readFileSync(`public${path}`)).length, 0) < 360000);
  assert.ok(gzipSync(worker).length < 10000);
  assert.ok(existsSync('public/vendor/maplibre/LICENSE.txt'));
  const build = readFileSync('scripts/build-map-vendor.mjs', 'utf8');
  assert.match(build, /useDefineForClassFields: false/);
  const document = readFileSync('src/app/(english)/page.tsx', 'utf8');
  assert.match(document, /modulepreload/);
  assert.match(document, /vendor\.shared/);
  const vector = readFileSync('src/components/map/VectorMap.tsx', 'utf8');
  assert.match(vector, /webpackIgnore: true/);
  assert.match(vector, /vendor\.worker/);
  assert.doesNotMatch(vector, /import \* as maplibregl from/);
});
