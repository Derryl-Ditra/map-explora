# Lightweight preview-map experiment

Draft,2026-11-12. Baseline merged main0163bca. No change to interactive map
coverage, POIs, venues, source bounds, north-up lock or map load-ready event.

## What changes

A low-resolution dated Jakarta map snapshot appears before the engine loads,
explicitly labeled "Map preview - Jakarta" and "Loading map for pan, zoom and
place taps...". It is not interactive, a location fix, or current filtered results.
Same-origin WebP: mobile10,748B,desktop25,706B. Only the matching viewport asset
is preloaded. It carries OpenFreeMap/OpenMapTiles/OpenStreetMap attribution.
Generated from the existing map, no external private location or data source.
The full interactive map and all141 public venues replace it at real map load.
An engine failure removes the preview and shows the existing honest error state.
The snapshot is intentionally soft, not a replacement for readable live labels.
It is a dated snapshot and needs regeneration when its dataset/visuals change.

## Measurements

390x844,DPR2,4x page CPU, fresh Chrome/context for each run, normal cache within
one navigation. Three runs per variant/profile. Preview measured with Element
Timing of the decoded image, not fetch completion. Interactive uses the same
map-ready/marker observation as baseline. Preview is not counted as interactive.

### Single shared-link proxy

All page AND worker HTTP/HTTPS traffic passes through one local forward/CONNECT
proxy. One global downstream byte queue limits total throughput. No per-target
network emulation. Proxy adds half-latency to upstream/downstream relay chunks;
TLS framing and other browser requests share the byte queue. This is a synthetic
proxy, not a faithful cellular-radio model. Upstream CDN/server variance remains.
Do not compare its absolute times to another harness as if they were equivalent.

|Profile|Baseline full runs|Baseline median|Preview paint runs|Preview median|Candidate full runs|Full median|
|---|---|---:|---|---:|---|---:|
|1.6Mbps/150ms|10.128/10.426/10.503s|10.426s|0.772/0.720/0.744s|0.744s|10.205/10.568/10.109s|10.205s|
|400kbps/400ms|33.780/34.111/33.789s|33.789s|2.472/2.144/2.468s|2.468s|34.058/34.289/34.049s|34.058s|

Conclusion: visible map preview much earlier than full map. No meaningful full-map
speed gain.400kbps candidate median is0.269s slower, consistent with added bytes.
Under2s preview target is met in this1.6Mbps simulation, NOT at400kbps. Full
interactive under2s is not met in either profile. Baseline first content paints
its controls/loading shell before its map, so first-contentful-paint alone is
not a map metric. No claim of preview making the engine itself faster.

### Earlier per-target CDP harness

Preview medians0.804s/2.592s; full7.368s/26.176s. Baseline widened main measured
7.367s/26.020s. These are separate page/worker-target throttle results, not one
aggregate link. A separate review harness previously measured about17.7s on
slow4G for main. This variation is why all figures must be labeled simulated and
harness-dependent. Real iOS/Safari and real phone networking remain untested.

## QC

158 tests pass, lint and production build pass locally. Inspected390x844 and
1280x800 preview pixels, then actual handoff pixels. Preview gone at map-ready;
mobile single pin opens detail, back returns map, list/search opens the right
venue; no page errors. Simulated engine failure removes preview and shows error.
No user-location dot on the snapshot. Desktop uses a separate aspect ratio;
other screen shapes crop it with object-cover and can visibly jump at handoff.
Preview labels are not tappable and don't follow live filters or geolocation
while loading. The prominent preview/loading label must stay. Fresh independent
review is required before deciding whether this experiment is worth shipping.

## Sources

- https://derryl-ditra.github.io/map-explora/ : actual existing map source visual.
- https://openfreemap.org/tos/ : tile-use terms, previously fetched asset audit.
- https://github.com/hyperknot/openfreemap/blob/main/LICENSE.md : attribution and
  style/icon/font licensing distinctions, retained on preview and real map.
- Baseline docs/jabodetabek-bounds-2026-11-12.md and asset audit document the full
  map's byte floor and why bounds don't reduce the initial6 viewport tiles.
