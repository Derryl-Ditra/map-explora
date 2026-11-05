# Map loading QA

Separate from search and lint/pulse changes. Wider initial zoom11 chosen after curl comparison of nine Jakarta tiles: z11 684993 encoded bytes, z12 1202259, z13 1330838. Live TileJSON currently points to20261101_080013_pt, but styles retain https://tiles.openfreemap.org/planet indirection, so no dated tile URL is pinned.

Build preprocessor generates both monochrome styles with checked-in fallback on network failure. Keeps existing color transform, sprites, glyphs and attribution. Client style JSON fetch and transform removed; adds tile-host preconnect/dns-prefetch. Loading overlay survives dynamic map mount until first idle, with error state rather than silent style fallback. Idle cannot overwrite a source error. Lists stay usable.

Same audit script, cold cache,390x844 DPR2 Pixel6 UA,150ms latency,204800B/s download,93750B/s upload,4x CPU. Local gzip server used for both baseline e39923b and after; external tiles unchanged. Baseline33 requests825482 encoded bytes, after32/824009. LCP1.692s versus1.744s, both spinner, not map readiness. Baseline map black at10s and rendered by20s; after rendered by10s. Screenshot intervals only, not exact first-paint timing. Single run each, no claim of statistically reliable LCP gain. CDP omits worker tile requests; tile comparison measured separately with curl.

33 tests/typecheck/build pass; loading, ready and forced source-error screenshots390px inspected. Existing16 lint errors are outside this PR. Draft only, no deploy.
