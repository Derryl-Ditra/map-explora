# Google Maps directions QA

Scope: replace in-app navigation with a plain Google Maps directions link. No merge or deploy until review.

## Applied references

- obra/superpowers, MIT, commit 22f0b463e7a5e579904dd6211a520321035526f7. Fresh pull, TDD and verification-before-completion guidance read. Wrote destination/origin and uncertain-pin regression tests; observed failure before implementation, then passed all 15 tests. Typecheck and production build pass. Published files compared byte-for-byte with the tested candidate.
- pbakaus/impeccable, Apache-2.0, commit 5af4319c4e7a7ee3e5e2b9fe899bcfb21c6190cb. Fresh clone, current context, audit and Operate guidance read. Scoped existing-interface audit applied, not a redesign. Mechanical detector found no issues on the three changed UI targets. No package dependency added. Metadata checked 5 November 2026: both repos active, not archived; Impeccable 102,788 stars, Superpowers 312,427. Recent substantive Impeccable changes fix live variant selection and Vue preview CSS; Superpowers v7.0.2 updates workflow guidance.

## Checks

- 320px with denied location: Directions remains available. No overflow. Button readable and keyboard-focusable.
- 390px with location: directions destination matches selected Aquababies Bintaro pin; straight-line distance remains labelled.
- 1440px: destination link correct; Locate requests another one-time fix.
- Across those states: zero location-watch calls, zero OSRM requests, no JavaScript errors. One initial location request; two only after explicit Locate.
- Directions touch target exceeds 44px, text contrast exceeds 4.5:1. Existing palette and panel layout preserved.
- Before/after mobile and desktop screenshots captured and reviewed. Map tile loading was inconsistent in the capture environment; this is not a tile-service availability test.
- Unit tests cover approximate and cautioned pins opening named search rather than coordinate directions.
- Full lint is not clean on main: existing any types, state-in-effect and filter component rules remain. This change reduces baseline findings; it does not claim a repo-wide lint cleanup.

## Limits

Chrome emulation only. Physical iOS/Android app handoff, touch gestures and Google account settings remain manual QA. No claim that odd-even restrictions are always available or correctly applied. Full map-card path was not visually exercised in this pass; its link uses the same tested helper as details.

## Official contract

https://developers.google.com/maps/documentation/urls/guide

Omitted origin uses Google's most relevant origin, including device location. If location is unavailable, Google can ask for a starting point. No origin coordinates are sent by this app. No travelmode, avoid or dir_action is set. The guide documents highways/tolls/ferries avoidance, but no license-plate parameter. Settings and restrictions remain the user's responsibility in Google Maps.
