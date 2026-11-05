# Mobile UX draft QA

Base: main 8554ef7 (approved PRs 30 and 31 merged). No data edits.

- Map Age pill opens exact-month panel and resets list scroll so the controls are visible. No preset chips.
- Cluster fit zoom capped at 15.
- Pin opens details directly. Back restores the saved center/zoom.
- Green Map button in a persistent list bottom bar. Detail Back and primary Directions persist outside scrolling content, reusing PR 27 e43d88c while retaining PR 29 origin-aware Back behavior. Share remains bordered. No Directions without a selected place.
- No-GPS list sorts by area/name; unknown distances remain unknown.
- Zero-confirmed copy offers a next step.
- Light map default is a reviewable choice, not an approved preference change.

66 tests, TypeScript and production build pass. Actual 390px browser test clicked the rendered English 1 Cempaka Putih pin, opened details, scrolled, checked visible bottom actions, then used Back. All rendered marker transforms match before/after exactly. Green Map remained visible after list scroll. Age opened at scrollTop 0. No horizontal overflow or page errors. Real iPhone untested.

Independent QC and fresh user yes required before merge.
