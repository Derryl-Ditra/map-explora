# Bing visibility via IndexNow (2026-11-20)

Map traffic item 2: Bing visibility and per-place page traffic. Per-place
pages already exist and are in the sitemap (149 English + 149 Bahasa place
pages, plus guides and comparison pages, 377 URLs total). robots.txt already
allows bingbot. The missing piece was telling Bing when pages change.

## What this adds

- `public/3fb0d905cb00a889acdd21f7d0092f78.txt` - the IndexNow key file,
  served at `/map-explora/3fb0d905cb00a889acdd21f7d0092f78.txt` after deploy.
  The key is public by design; it only proves the ping comes from someone who
  can deploy the site.
- `scripts/ping-indexnow.mjs` - reads the live sitemap and submits all URLs
  to `https://api.indexnow.org/indexnow` (Bing's shared IndexNow endpoint;
  Yandex honors the same protocol). No account, no paid API.
- `tests/traffic1120-bing-indexnow.test.mjs` - locks the key file, payload
  shape and sitemap parsing.

## How to use

After a deploy is live:

    node scripts/ping-indexnow.mjs          # dry run, prints payload summary
    node scripts/ping-indexnow.mjs --send   # verifies the key URL, then POSTs

The script refuses to send before the key file is live, so a ping cannot
outrun its deploy.

## Baseline and follow-up

- GoatCounter shows www.bing.com referred 14 visits in the Nov 10-19 range
  (of 103 total visits), so Bing indexes at least some pages. Public `site:`
  queries did not return a reliable count, so the exact indexed-page baseline
  is unknown.
- After the first ping, watch GoatCounter Bing referrers and, when available,
  Bing Webmaster Tools for crawl and index movement. Bing Webmaster Tools
  needs a Microsoft account and was not set up; that remains an option, not
  part of this change.
