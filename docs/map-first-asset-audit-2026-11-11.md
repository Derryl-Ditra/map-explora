# Map-first loading audit - November 11, 2026

## Finding

This is a small application with a large vector-map engine, not an application
waiting on many custom icon downloads. The main app, MapLibre engine, worker,
CSS, venue data and app icons are already served from Derryl's GitHub Pages.
The map style is already in the repository and bundled into JavaScript.
The external basemap sprite and vector tiles remain on OpenFreeMap.

The current main includes approved #66 and #67. Local glyph rendering removed
three remote font ranges. This draft does not change the map design, initial
zoom, POIs, fonts, filtering, venue evidence or map-first behavior.

## Measured asset inventory

Measured from the live Pages responses and local production builds. KB here
means decimal bytes/1000. Compressed lengths differ slightly by gzip settings.
Do not add raw and compressed sizes together.

| Asset | Current host / source | Measured transfer/body size | Finding |
|---|---|---|---|
| MapLibre main JS | GitHub Pages, bundled npm6.16.0 | live299KB gzip; local295KB | Largest single script |
| MapLibre worker | GitHub Pages, public/maplibre-worker.js | live149KB gzip; local147KB; raw519KB | Duplicates code in main |
| App/venue-data chunk | GitHub Pages | live62.5KB gzip; local60.5KB | Includes full evidence; no payload split claimed |
| React/framework JS | GitHub Pages | largest chunks71KB and40KB gzip | Already local, still real cold-load bytes |
| Map style | src/data/map-style-light.json in repository | ~4.3KB gzip inside JS;119 layers | Not fetched remotely at runtime |
| Basemap sprite JSON | tiles.openfreemap.org/sprites/ofm_f384/ofm | raw27.7KB; gzip~2.4KB | General basemap icons, not venue logos |
| Basemap sprite PNG | Same OpenFreeMap versioned path | 1x49.5KB;2x118.9KB | Retina phone uses the larger image |
| Glyph ranges | None after approved #67 | zero remote font requests verified live | Previously~238KB raw across3 ranges |
| Venue names/cluster markers | Canvas images/DOM built on device | no HTTP image downloads | 43 clustered marker buttons in initial390px test |
| App icon SVG/favicon | GitHub Pages |477B SVG;4.1KB favicon | Not the load bottleneck |
| PWA app-icon PNGs | GitHub Pages, generated from repository icon data |19-55KB each | Not all downloaded on ordinary first load |
| Vector TileJSON | https://tiles.openfreemap.org/planet | small metadata request | Resolves current dated tile URL |
| Visible vector tiles | OpenFreeMap dated version | 6 initial viewport tiles,442,316 compressed bytes total in the measured view | Not the full planet downloaded |
| Low-zoom Natural Earth raster | OpenFreeMap | Not requested at initialzoom11 | Used at source maxzoom6 |
| GoatCounter script | gc.zgo.at | asynchronous analytics request | Not required for map readiness |

The measured6 tiles were zoom11, x1631/1632 and y1058/1059/1060. TileJSON advertises
zoom0-14 and worldwide bounds. The map starts atJakarta zoom11; there is no
Jabodetabek maxBounds restriction. Restricting pan/zoom would not remove these
same6 initial viewport tiles, so it is not a first-load fix. A zoom10 experiment
had little benefit and changed framing, so was rejected. A custom regional
simplified tile set might reduce bytes but adds map-data hosting, update and
license work; it is not implemented or measured here.

## Compression and caching

Live Pages responses for HTML, JS and worker have Content-Encoding:gzip and
Cache-Control:max-age=600. Gzip is already working; adding .gz files alone is
not a proven further improvement. OpenFreeMap TileJSON had max-age3600, and
versioned tiles/sprites had long cache lifetimes. No service worker exists.
A service worker mainly changes repeat visits, not the first-ever download,
and adds stale-data/update risk. No cache-policy or hosting migration is in
this draft. Do not promise Brotli from Pages without verifying support.

## Draft change: share MapLibre code between main and worker

The installed package publishes standalone engine and worker bundles. Building
both source entrypoints in a single esbuild context extracts their common code.
The browser downloads that module once and the worker reuses it from HTTP cache.
The build produces three content-hashed files on the same Pages origin:
main164,163B + shared162,820B + worker6,943B gzip =333,926B. Baseline engine295KB
plus worker147KB is about442KB. This removes about108KB of duplicate compressed
JavaScript. Homepage modulepreloads avoid introducing a serial import waterfall.
Other guide/contact pages do not preload the map engine.

The source build and exact pinned dependencies are in the repository. Prebuild
emits the executable assets into public/vendor/maplibre for Pages deployment;
no runtime CDN import is used. They are generated rather than manually checked
in. MapLibre's BSD license and bundled dependency license comments are kept.

This is more build complexity, not a free config switch. Upstream tried shared
bundles and reverted them because of cache/version problems. All main, shared
and worker filenames in this draft are content-hashed and referenced by a
build manifest. That prevents a stale shared filename silently mixing versions.
It does not remove the general static-site stale-HTML window: old cached HTML
can reference a removed asset after deployment. An error/reload fallback remains.
Real iOS/Safari and a live deployment of this draft have not been tested.

## Controlled comparison

Current approved main versus draft, production static builds, gzip HTTP with
max-age600, fresh browser context per run, viewport390x844, device pixel ratio2,
CPU4x slowdown. Slow4G=1.6Mbps/150ms; very slow=400kbps/400ms. Both use the same
map and #66/#67 readiness/typography behavior. Metric is cover gone with venue
markers present, verified against actual map screenshots.

Normal browser caching is enabled inside each cold context so the worker can
reuse a module fetched earlier in that same navigation. Disabling all cache
would artificially force that module to download twice. Page and worker targets
received CDP network throttling; a single shared aggregate radio bandwidth was
not independently verified. Upstream caches and real-phone CPU/GPU are not
controlled. These are lab comparisons, not predicted phone load times.

| Profile | Baseline runs(s) | Final draft runs(s) | Median gain |
|---|---|---|---|
| Slow4G |8.418/8.338/8.371|7.373/7.332/7.350|8.371→7.350,1.021s,12.2%|
|400kbps|28.621/28.546/28.498|26.006/25.838/25.958|28.546→25.958,2.588s,9.1%|

Earlier DPR1 trials also improved, but they are not mixed with these DPR2
figures. Retina sprites add real bytes, which is why this audit now includes
DPR2. Still~26 seconds on a very slow link. This is an improvement, not a cure.

## Other trials / ranked next work

1. Shared engine/worker build: measured improvement above. Draft only, needs
   independent source-build/cache/version and browser review.
2. Sprite self-hosting: safe license route exists for Maki CC0 icons. Trial
   copying all1x/2x sprite files to the local origin preserved icon requests
   but was not materially faster:7.32s/25.74s in one trial versus draft medians
   7.35s/25.96s. Same119KB retina PNG still downloads. Not shipping it as a
   claimed speed fix. An earlier invalid relative-URL trial loaded without
   sprite icons and was discarded, not counted as an improvement.
3. Sprite subset/packing: potentially cuts PNG bytes, but must keep transit,
   road shields, airports and POIs across zoom levels. Unimplemented, no gain
   claimed. Removing icons or POIs to get a better score is not acceptable.
4. Full venue-evidence payload splitting: investigate next, preserving search,
   age truth, details and deep links. Current chunk~62KB gzip, less than engine
   or initial tiles. No gain claimed yet.
5. Custom regional/simplified tiles: higher effort and maintenance. Do not copy
   the planet into GitHub Pages or prefetch thousands of tiles. OpenFreeMap
   imposes offline-download limits and requires attribution.
6. Extra preconnect: already present. No gain from adding it again.
7. List-first: explicitly rejected by the owner; not part of this plan.

## QC and open caveats

154 tests, lint and production build pass locally. Generated vendor manifest
and module references are tested, including bundle-size bounds, hashed paths,
shared imports, correct TypeScript class-field semantics and license presence.
Independent reviewer reproduced the gain and returned SHIP with caveats:
stale HTML can404 after deploy until reload; real iOS/Safari and live Pages not
tested; single-pin tap not reproduced. The unused legacy standalone worker has been removed from this draft. No merge without the owner's yes.

## Sources and provenance

- Live project: https://derryl-ditra.github.io/map-explora/
- Repository: https://github.com/Derryl-Ditra/map-explora
- Tile metadata: https://tiles.openfreemap.org/planet
- https://github.com/maplibre/maplibre-gl-js/pull/7745 : shared-code rationale and
  bundler differences. Later reverted, not treated as current default behavior.
- https://github.com/maplibre/maplibre-gl-js/pull/8672 : reverted due caching;
  empty shared file retained, so its mere presence proves no sharing.
- https://github.com/maplibre/maplibre-gl-js/pull/2130 : worker preload discussion,
  including cache-disabled double-download pitfall. Historic, not a speed claim.
- https://openfreemap.org/quick_start/ : customization and hosting guidance.
- https://openfreemap.org/tos/ : offline limits, last updated October14,2026.
- https://github.com/hyperknot/openfreemap/blob/main/LICENSE.md : icon/style/font
  license distinctions. Attribution stays on the map.
- https://plainvanillaweb.com/blog/articles/2024-12-16-caching-vanilla-sites/ :
  cache explanations; current project headers were measured independently.
- src/components/map/VectorMap.tsx, current npm6.16.0 source, production request
  traces and response Content-Length headers support the project-specific table.
