# Slow-mobile map loading - 2026-11-11

Draft experiment, not permission to deploy. Built on the #66 readiness change.

## Repeatable improvement: local map fonts

MapLibre 6.16 supports local glyph rendering when the style's glyphs URL is
omitted. This removes three remote font range downloads on this initial view:
Noto Sans Regular 76,580 bytes, Italic 79,907 bytes and Bold 81,170 bytes
(237,657 response-body bytes total). It keeps all 119 style layers, POIs,
roads, initial zoom, tiles, sprites and venue markers. No font files are added.

Tradeoff: map text uses fonts installed on the visitor's device, so exact
letter shapes and collision/layout can differ across Android, iOS and desktop.
Layer font weight/style still passes through MapLibre's local renderer. Our
venue nameplates already use system fonts and are unchanged. This is a real
byte reduction, not just hiding the loading cover sooner. It does not solve
the remaining roughly 27-second load on a very slow link.

## Controlled cold-load comparison

Production static builds served over local gzip HTTP. Chrome, 390x844, 4x CPU
slowdown, cache disabled, fresh context each run. Profiles: 1.6Mbps down /
150ms latency, and 400kbps down / 400ms latency. Worker targets were attached
before execution and received the same network throttling. Worker tile
responses were captured. CDP applies conditions per target; one shared
aggregate radio bandwidth was NOT independently verified. These are controlled
lab comparisons, not exact phone forecasts. Upstream CDN caches were not
controlled. Baseline includes #66, so do not add these savings to #66's
unthrottled result or compare them as if the conditions matched.

Measurement: navigation to the cover disappearing with venue markers present.
The trigger is a DOM MutationObserver, not an instrumented shipping bundle.
Both builds use the same readiness condition. The complete map is visible in
captured screenshots, including roads, place labels and venue markers.

| Profile | Baseline runs (s) | Local fonts runs (s) | Median saving |
|---|---|---|---|
| Slow 4G | 8.884 / 8.794 / 8.929 | 7.958 / 8.016 / 7.858 | 0.926s (10.4%) |
| 400kbps | 30.434 / 30.489 / 30.464 | 27.207 / 27.276 / 27.122 | 3.257s (10.7%) |

Initial contentful paint was roughly 0.75s / 2.6s and was not materially changed.
Largest first-party downloads remain MapLibre ~295KB gzip, its worker ~147KB,
and the venue-data/application chunk ~60KB. Reducing those is a separate job.

## Ranked ideas and rejected experiments

1. Local fonts: measured, small code change, saves ~238KB on this view, but
   cross-device font/layout variation needs approval and independent QC.
2. Explicit lightweight/list-first mode: highest potential reduction in time
   to useful information because it can avoid MapLibre, worker, sprites and
   tiles until Map is requested. NOT implemented or measured here. It changes
   map-first behavior and needs a separate design decision. Existing List
   remains usable before the basemap finishes; it does not stop map downloads.
3. Split full venue evidence/details from initial map data: promising next
   investigation. Current venue chunk is ~60KB gzip. Must preserve search,
   age matching, evidence rules and deep links. No numerical gain claimed.
4. HTTP caching already exists on provider assets: tiles have a long cache
   lifetime and font ranges one week. A service worker mostly helps repeat
   visits, not this cold-load problem; it also creates stale-data/update risk.
   Do not ship one just to improve a synthetic score.
5. Marker/cluster work: not the main bottleneck in this trace. Initial map has
   modest clustered DOM marker count; network transfers dominate. No speedup
   claimed from replacing markers.
6. Preconnect is already present. Adding it again cannot help.

Rejected, not shipped:
- Static eager map import plus worker preload: ~9.43s / 33.03s versus the
  initial baseline ~8.99s / 30.48s. Preload fetched the worker twice with cache
  disabled and competed with app JS. Do not call this a real-world universal
  regression, but it failed this cold-load test.
- Static eager import plus one regular map font: 8.20s / 27.68s; local fonts
  performs better without flattening the layer fonts to one weight.
- Wider initial zoom 10: ~8.57s / 30.01s in one trial, too small to justify
  changing the default framing.

## Sources

- https://maplibre.org/maplibre-style-spec/glyphs/ : local-font behavior supported
  since MapLibre GL JS 5.11.0.
- https://github.com/maplibre/maplibre-gl-js/pull/4564 : implementation, fallback
  behavior and explicit cross-platform typography caveat.
- Installed MapLibre 6.16.0 type declarations and production request traces.

## Remaining QC

Run all tests, lint, build; compare branch file readback to tested local files.
Inspect desktop/mobile pixels and exercise list, filter, venue detail and back.
Independent review is required before proposing merge. Real Android/iOS font
and thermal/CPU behavior remains unverified. No merge/deploy without owner yes.
