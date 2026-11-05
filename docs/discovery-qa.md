# Inventory discovery QA

## Scope

29 answer guides and one hub generated from the same 128 provider-listed records as the map. Minimum four records per guide; identical venue sets are deduplicated. Areas combine city/region variants for Jakarta, Bogor, Depok, Bekasi and Tangerang. Six activity groups have sufficient inventory. No empty location pages or per-venue pages. Hidden records are excluded from public JSON and all guides. Future data changes regenerate the groups at build.

Branch age evidence and brand age policy remain distinct. Categories do not prove an individual class runs at a branch. Unknown program ages, source conflicts, offering status, evidence links and check dates are visible. No inferred schedules, prices, availability, rankings or reviews are added to schema.

## Auditor applied

AgriciDaniel/claude-seo, MIT, revision 6be93f45064ffbadced572b5d5c95f55fd263af0. Selected programmatic, GEO, schema and sitemap checks were applied to the implementation, not included as a dependency. Its metadata_template.py checked exported title/description pairs. The umbrella launcher requires Python 3.11+; this environment has 3.10, so the standalone compatible metadata script was run and rendered HTML/schema/sitemap checks were performed separately. No readiness score or measured citation lift is claimed.

Applied findings: initial HTML has all guide content and JSON-LD; real inventory instead of city-name swaps; internal hub/related links; unique titles, descriptions and self canonicals; absolute schema URLs; one unordered ItemList per guide matching the rendered records; no fabricated lastmod; search crawler names are distinct from training crawlers. Optional llms.txt was skipped because no demonstrated benefit justifies another file here.

## Checks

18 node tests passed, including new inventory, group uniqueness and schema tests. TypeScript and production static export passed. Export contains 30 guide HTML pages, 29 ItemLists and 31 sitemap URLs. Public venues.json contains 128 official-listed records. Each schema entry resolves to a visible venue anchor. Source records, maps Directions logic and GoatCounter are unchanged.

Mobile 390px hub and answer page inspected as pixels: readable heading, summary, caveats and branch evidence; no horizontal overflow. Map entry link checked in the existing mobile UI. Static export uses trailing slashes so canonical guide URLs resolve to index.html on GitHub Pages.

## Hosting limitation

This project lives at https://derryl-ditra.github.io/map-explora/. The generated robots file is at /map-explora/robots.txt, but robots.txt rules are authoritative only at the host root. Do not claim these project-level declarations configure crawler permissions. No changes were made to a separate root repository or hosting. The sitemap is directly linked from public content and can be submitted manually through the site's search webmaster account. Search crawling, indexing and citations remain unverified until after an approved deployment.

## Review gate and follow-up

Draft PR only. No merge or deployment. Verify deployed guide, JSON and sitemap URLs after approval. Monthly manual replay: ask the same under-5 Jabodetabek question with search enabled, record the date, system, exact prompt, cited URLs and errors. Compare with the prior run; no dashboards or guaranteed citation outcome. No recurring automation was added.

Primary references:
- https://developers.google.com/search/docs/crawling-indexing/robots/intro
- https://platform.openai.com/docs/bots
- https://nextjs.org/docs/app/api-reference/file-conventions/metadata/robots
- https://nextjs.org/docs/app/api-reference/file-conventions/metadata/sitemap
- https://schema.org/ItemList
- https://github.com/AgriciDaniel/claude-seo

## Follow-up review

Shortened the opening to two direct sentences and place entries to address, one labeled age example, source and essential caveats. The JSON retains all programs. No fixed word count is claimed as an AI citation requirement. Broad area guides still have more entries than narrow guides; navigation and headings let readers choose the useful group. Homepage ItemList, README discovery links, plain-language age states and non-self hub navigation added. Optional Bahasa-first copy and IndexNow with keyLocation remain proposals only.
