# Jabodetabek-only map and under-2s target

2026-11-12, draft update to #68. No merge or deploy authorized.

## Result

The map is now constrained to a mainland Jabodetabek service rectangle:
west106.30, south-6.85, east107.35, north-5.85. All141 public venue coordinates
are inside. This is a product viewport, not an exact administrative polygon;
it includes margin and some adjoining land/sea. It is not the whole world.
The geography includes Jakarta, Bogor, Depok, Tangerang and Bekasi, following
the metropolitan scope documented by the West Java planning dataset below.
Northern offshore Thousand Islands are not a venue-coverage claim.

- maxBounds constrains the camera and minZoom9 prevents world-level zoom-out.
  MapLibre raises the effective minimum as needed to keep the viewport inside
  the rectangle: measured9.204 on390x844 and9.743 on1280x800.
- renderWorldCopies:false prevents repeated world copies.
- Lock north-up/flat while preserving pan and pinch zoom. Extra QA found that
  rotated/pitched corners escaped the camera rectangle, so rotation/pitch
  gestures and keyboard rotation are disabled and camera updates clamp both.
- bounds on every vector/raster source filter out non-intersecting tile requests.
  Explicit source bounds override the worldwide TileJSON bounds, as verified
  in installed MapLibre6.16.0 load_tilejson.ts and tile_bounds.ts.
- The map retains its roads, POIs, transit icons, labels, colors and all141 venues.
  Initial zoom11 is unchanged. No list-first, static preview, or fake ready event.

Tiles are indivisible rectangular files. An edge tile that intersects the
service rectangle can include neighboring territory. This does not download
only polygons inside an exact Jabodetabek administrative border. Exact clipping
would need regional tiles generated/hosted separately, not just client bounds.
The small worldwide TileJSON metadata is still fetched to follow the provider's
rotating tile version; it is metadata, not a worldwide map download.

## Same-profile measurements

390x844,DPR2,4x CPU, fresh context each navigation, normal HTTP caching within
that context.3 runs per final variant. Baseline is the existing #68 shared-vendor
build before this bounds change, not the deployed #67 baseline.

| Profile | Before bounds median | With bounds runs | Median | Initial tiles |
| --- | ---: | --- | ---: | --- |
|1.6Mbps,150ms|7.350s|7.320/7.298/7.372s|7.320s|6,442,316B compressed|
|400kbps,400ms|25.958s|26.031/26.039/26.072s|26.039s|6,442,316B compressed|

Conclusion: no meaningful first-load speed gain. The initial6 tiles were already
inside Jabodetabek. The change prevents later navigation outside the service
area and its tile traffic; it does not eliminate existing in-region requests.

Rejected one-run experiments, not shipping:
- Closer initial zoom12:6 denser tiles,791,562B;9.129s/32.877s, worse.
- Wider initial zoom10:6 tiles,423,809B;7.301s/25.379s. Small change, different
  first-view scale, and only one run. No reliable win claimed; keep zoom11.

The original shared-vendor improvement versus deployed #67 still stands:
8.371s to7.350s on1.6Mbps and28.546s to25.958s on400kbps before the bounds addition.
Do not add that gain to the effectively-zero bounds gain.

## Under2seconds: measured best and hard byte floor

Best final run is7.298s/26.031s; medians7.320s/26.039s. This does not meet2s.
These are simulated Chromium map-ready times, not real-phone measurements.

The shared engine alone is333,926 compressed bytes. At400kbps, bytes alone need
6.68s; at1.6Mbps they need1.67s. This excludes latency, HTML, app code, CSS,
map tiles, sprite, layout and GPU work. The initial tiles alone are442,316B,
another8.85s at400kbps or2.21s at1.6Mbps. Engine+tiles are776,242B, with an ideal
single-link transfer floor15.52s/3.88s before all other work. These are calculated
lower bounds, not separately measured loads. The actual shared-link timing is
not perfectly modeled by separate CDP page/worker throttles.

A2s total budget can carry at most100KB on400kbps or400KB on1.6Mbps before latency.
The current engine+tiles alone exceeds both. Bounds or icons cannot close that.
The next serious path is a separate lean map entry with a much smaller renderer
and regional tile payload, with heavier evidence/details lazy-loaded. That is
an architecture experiment requiring its own coverage/interaction tests, not a
promised under2s fix. A preview could paint sooner but cannot honestly be counted
as the full interactive map being ready. Browser repeat-visit caches help but
are not a cold-first-load solution.

## QC

156/156 tests, lint and production build pass locally. Tests execute getMapStyle
and confirm regional bounds on every tile source, unchanged provider layers and
sprite, local glyph behavior, minZoom/maxBounds configuration and fresh clones.

Chromium390x844 and1280x800: initial and zoom-out pixels inspected. Local-only
QA capture exposed the map instance in the browser response, not in source or
production output. Tried zoom0 with centers at[0,0],[110,-8],[105,-7],[107,-5]:
all clamped to the region. Observed tile requests all intersected the source
rectangle. No page errors. Mobile single-pin tap opens correct detail; back to
map, list/search, single result and detail remain usable. All141 venue pins
remain reachable by panning; they need not all fit simultaneously on a portrait
screen at the constrained zoom. No real iOS/Safari or live Pages candidate test.
Fresh independent review is pending through main.

## Sources

- https://wargi.jabarprov.go.id/petav2/dataset/detil/7 : official regional scope,
  ATR/BPN2020 spatial-planning dataset, includes Jabodetabek-Punjur. Does not
  supply this product rectangle's exact coordinates.
- https://en.wikipedia.org/wiki/Jakarta_metropolitan_area : secondary scope
  corroboration. The rectangle is an explicit product choice, not copied bounds.
- https://maplibre.org/maplibre-gl-js/docs/API/type-aliases/MapOptions/ : camera
  maxBounds,minZoom,renderWorldCopies semantics.
- https://maplibre.org/maplibre-style-spec/sources/ : source bounds semantics.
- https://tiles.openfreemap.org/planet : rotating source metadata and tile host.
- Installed MapLibre6.16.0 source load_tilejson.ts, vector_tile_source.ts and
  tile_bounds.ts verify explicit options precedence and tile intersection tests.
- Existing asset/source audit: docs/map-first-asset-audit-2026-11-11.md.
