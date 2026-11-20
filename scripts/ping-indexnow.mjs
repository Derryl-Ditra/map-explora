#!/usr/bin/env node
// Ping IndexNow (Bing, Yandex) with the live sitemap URLs after a deploy.
// No account or paid API needed: the key file is hosted on the site itself.
//
// Usage:
//   node scripts/ping-indexnow.mjs            dry run: prints the payload, sends nothing
//   node scripts/ping-indexnow.mjs --send     POSTs the payload to api.indexnow.org
//
// Run this only after the matching deploy is live, so the keyLocation URL
// already serves the key.

import { pathToFileURL } from 'node:url';

const HOST = 'derryl-ditra.github.io';
const BASE = `https://${HOST}/map-explora`;
const KEY_FILE = '3fb0d905cb00a889acdd21f7d0092f78';
const KEY_LOCATION = `${BASE}/${KEY_FILE}.txt`;
const ENDPOINT = 'https://api.indexnow.org/indexnow';
const MAX_URLS = 10000; // IndexNow protocol limit per request

export function parseSitemapLocs(xml) {
  return [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1].trim());
}

export function buildPayload(urls) {
  if (urls.length === 0) throw new Error('no URLs parsed from sitemap');
  if (urls.length > MAX_URLS) throw new Error(`too many URLs: ${urls.length}`);
  return {
    host: HOST,
    key: KEY_FILE,
    keyLocation: KEY_LOCATION,
    urlList: urls,
  };
}

async function main() {
  const send = process.argv.includes('--send');
  const res = await fetch(`${BASE}/sitemap.xml`, { cache: 'no-store' });
  if (!res.ok) throw new Error(`sitemap fetch failed: HTTP ${res.status}`);
  const xml = await res.text();
  const urls = parseSitemapLocs(xml);
  const payload = buildPayload(urls);
  console.log(`parsed ${urls.length} URLs from ${BASE}/sitemap.xml`);
  console.log(`keyLocation: ${KEY_LOCATION}`);
  if (!send) {
    console.log('dry run (pass --send to POST):');
    console.log(JSON.stringify({ ...payload, urlList: [`...${urls.length} urls...`] }));
    return;
  }
  const keyCheck = await fetch(KEY_LOCATION, { cache: 'no-store' });
  const keyBody = (await keyCheck.text()).trim();
  if (!keyCheck.ok || keyBody !== KEY_FILE) {
    throw new Error(`keyLocation does not serve the key yet (HTTP ${keyCheck.status}); is the deploy live?`);
  }
  const post = await fetch(ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
    body: JSON.stringify(payload),
  });
  console.log(`IndexNow response: HTTP ${post.status}`);
  if (!post.ok) throw new Error(`IndexNow rejected the ping: HTTP ${post.status}`);
  console.log(`submitted ${urls.length} URLs`);
}

const isMain = process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href;
if (isMain) main().catch((err) => { console.error(err.message); process.exit(1); });
