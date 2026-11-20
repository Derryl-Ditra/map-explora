import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import { parseSitemapLocs, buildPayload } from '../scripts/ping-indexnow.mjs';

const KEY = '3fb0d905cb00a889acdd21f7d0092f78';
const publicDir = new URL('../public/', import.meta.url).pathname;

test('IndexNow key file exists in public/ and contains exactly the key', () => {
  const files = readdirSync(publicDir).filter((f) => f.endsWith('.txt') && f !== 'ICON-LICENSE.txt');
  assert.ok(files.includes(`${KEY}.txt`), `missing public/${KEY}.txt`);
  const body = readFileSync(join(publicDir, `${KEY}.txt`), 'utf8').trim();
  assert.equal(body, KEY);
});

test('IndexNow key is 32 lowercase hex chars (protocol shape)', () => {
  assert.match(KEY, /^[a-f0-9]{32}$/);
});

test('parseSitemapLocs extracts every loc entry', () => {
  const xml = `<?xml version="1.0"?><urlset><url><loc>https://derryl-ditra.github.io/map-explora/</loc></url><url><loc>https://derryl-ditra.github.io/map-explora/places/x/</loc></url></urlset>`;
  assert.deepEqual(parseSitemapLocs(xml), [
    'https://derryl-ditra.github.io/map-explora/',
    'https://derryl-ditra.github.io/map-explora/places/x/',
  ]);
});

test('buildPayload points at the hosted key file on the Pages base path', () => {
  const payload = buildPayload(['https://derryl-ditra.github.io/map-explora/']);
  assert.equal(payload.host, 'derryl-ditra.github.io');
  assert.equal(payload.key, KEY);
  assert.equal(payload.keyLocation, `https://derryl-ditra.github.io/map-explora/${KEY}.txt`);
  assert.equal(payload.urlList.length, 1);
});

test('buildPayload rejects an empty URL list instead of pinging nothing', () => {
  assert.throws(() => buildPayload([]), /no URLs/);
});

test('live sitemap URL count stays under the IndexNow per-request limit', async () => {
  const res = await fetch('https://derryl-ditra.github.io/map-explora/sitemap.xml', { cache: 'no-store' });
  assert.ok(res.ok, `sitemap fetch HTTP ${res.status}`);
  const urls = parseSitemapLocs(await res.text());
  assert.ok(urls.length > 300, `expected the full sitemap, got ${urls.length}`);
  assert.ok(urls.length <= 10000);
});
