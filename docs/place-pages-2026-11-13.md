# Per-place static landing pages

Draft only. No promise of search ranking, indexing, booking availability or current tuition.

## Before / after

- Before:141 public places exist as map selections. Place links share one generic preview. No dedicated place HTML routes.
- After:141 public, non-government records each have an Indonesian `/id/places/[permanent-id]/` page and an English `/places/[permanent-id]/` alternate.282 static HTML pages,282 branch/language PNGs. Canonical/language tags and minimal Place JSON-LD are in initial HTML.282 entries added to the existing73-URL sitemap.
- Map remains the primary experience and primary CTA. Existing map Share behavior is unchanged in the core implementation. Guide listings link to place detail pages.
- No data mutations. Government-related records are excluded before route, sitemap and share-image generation. The current141 public records span23 private brands; hidden/maps-only records are not exposed. Private operators Buumi and Playclub by Buumi remain.
- Class matching uses the existing branch-level official evidence gate. Unknown, conflicted, ambiguous and brand-only claims do not become confirmed ages. They appear in a separate confirmation block when recorded.
- Prices retain official/partner provenance, unit, program, conditions, schedule and original read date. Missing fees remain missing. Dates are per claim, not a new global freshness stamp.
- Location cautions stay above the page columns. Funtastic's entrance conflict and Bloom/Membumi age conflicts remain visible.
- Place JSON-LD contains only type, name, address and page URL. No speculative Offers, geo, rating, hours or eligibility.

## Build / checks

`npm run build` generates the PNGs before the Next static export. Generated `public/place-cards` is ignored; the PNG generator uses sharp already pinned in the existing Next dependency lock; esbuild was already pinned. No dependency versions change.

`npm test`:164 tests. `npm run lint`: no warnings/errors. `npm run build`: success. `node scripts/check-place-export.mjs`:282 initial HTML documents, unique metadata, canonical/language tags, minimal Place schema,282 sitemap URLs and282 1200x630 PNGs checked. No-JavaScript page body also checked.

Real Chromium render checks at320/390/1280 for Golden (one class), Membumi (two recorded programs with one disputed), Funtastic (many), Bloom (conflicted boundaries) and Anak Air Limo (unknown class age, separate registration). No horizontal overflow. Actual PNG card pixels inspected, not a simulated WhatsApp screenshot. WhatsApp unfurl is not proven before deployment.

Independent QC and explicit owner merge approval required. Do not merge based on this document.

Bahasa pages use reviewed translations for every current price unit, label, condition and schedule. Raw English class notes are hidden unless a reviewed translation exists; original sources remain linked. Exact Bloom/Membumi age-conflict notes and Funtastic location warning are translated. Region labels are deduplicated.

Research-only matching/boundary annotations are removed from public program notes in both languages. Region deduplication applies to both languages.
