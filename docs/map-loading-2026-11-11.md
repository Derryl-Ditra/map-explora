# Map loading cover measurement - 2026-11-11

Draft only. No tile provider or map style change.

The old code waits for the first `idle` event after adding the venue-label
source in the `load` callback. That hides an already rendered basemap while
additional labels settle. The change removes the cover on `load` instead.
Error handling is unchanged. Venue markers and labels still initialize in the
same load callback.

## Controlled comparison

Production static build, same local HTTP server, same headless installed Chrome,
1280x900, three fresh browser contexts per version, no network/CPU throttling.
External OpenFreeMap service and network path shared; upstream caches were not
controlled. These are lab figures, not predictions for a user's phone.
Temporary performance marks recorded constructor, first render, load, idle;
a MutationObserver recorded the loading cover removal. Marks were removed from
shipping code. First render includes background-only frames, not usable tiles.
`load` is MapLibre's initially rendered map signal, not every future tile request.

| Metric (seconds) | Before, runs 1 / 2 / 3 | After, runs 1 / 2 / 3 |
|---|---|---|
| First contentful paint | 0.13 / 0.10 / 0.12 | 0.14 / 0.09 / 0.11 |
| Initial basemap load | 1.61 / 1.54 / 1.28 | 1.30 / 1.31 / 1.55 |
| Loading cover removed | 3.20 / 3.04 / 2.88 | 1.54 / 1.55 / 1.82 |

Median loading cover: 3.04s to 1.55s (1.49s earlier, about 49%).
Initial basemap load is not materially accelerated by this small change.
All six runs had no page errors; screenshots show roads and venue markers.

A separate live remote-browser check initially took much longer, then loaded.
That delay was not reproduced in this lab comparison. This change removes the
unnecessary final wait; it does not prove a fix for every slow network/device.

## QC

Regression test ensures readiness happens at load before venue-label setup,
not at idle. Existing error and cancellation guards remain. Run tests, lint,
build and inspect real desktop/mobile rendering before merge.
