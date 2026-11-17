# Branch-first capture - 17 November 2026

Draft method change. No deployment or automatic venue imports.

## The bottleneck

The former selection hashes activity URLs. Its first12 on the218-leaf regional corpus contain two free parks, therapy/massage/daycare, a craft product and a riding photo ticket. It does not prioritise explicit toddler class ages or distinct providers. It emits generic FAQ ages as `ageClaim`; real class-description clues are buried in `terms`. A temporary snapshot is the only resume key, so a new environment rereads old pages. Counting fetched leaves hides all of this.

## Finished change

1. Persist the218 URL/provider/title index,25 sanitized source snapshots and held decisions in project docs. Preserve source-visible dates as null when unstated. The index is history, not current-state proof.
2. `prepare-review.mjs` produces distinct-provider first-pass work, prioritising title-age leads then sensory/playdate clues. Same-brand records remain in an expansion lane, not discarded. All218 rows remain in named lanes. A provider bucket is NOT a merged physical branch.
3. `capture-review.mjs` captures at most20 selected targets (12 default), sequentially at least3s apart, with the existing robots, size, host, quarantine and challenge stops. It never backfills low-priority pages merely because priority pages are cached. Warm resume uses persisted snapshots with zero requests. Packets explicitly label captures as historical and require a fresh operating check; they never claim the cached page is current.
4. Surface activity-description age excerpts separately from untrusted generic FAQ claims. Package months and lesson minutes are rejected. No parser claim ever becomes provider-confirmed or publishable.
5. Spend the next work block validating packets, not collecting another100leaves. Check pin, operation/closure, class vs daycare/therapy, government exclusion, age conflicts, dates, red flags and price units. Hold missing facts explicitly. Mark each resolved URL `reviewed` (or unresolved risky URL `hold`) in capture-decisions.json so the next activity/provider advances. Store checked decisions, preserve all alternatives, propose a data PR, get independent QC and fresh user approval before merge.

## Reproduce

```sh
npm ci --no-audit --no-fund
node scripts/harvest/prepare-review.mjs --out .harvest/review
node scripts/harvest/capture-review.mjs --out .harvest/review
node scripts/harvest/benchmark-review.mjs
npm test
npm run lint
npm run build
```

The queue defaults to the actual current VENUES inventory. Do not run the discovery harvester as the nightly main loop again until existing priority packets have received a clear disposition. Use `run.mjs` only to find new URLs; it now skips the durable index unless explicitly refreshed. Carry every siteStop/block from local quarantine.json into the durable capture-quarantine.json before handing off; do not clear it on a timer or use a new output folder to retry. Commit reviewed snapshots and decisions in the daily draft so the next environment can resume. Never commit reviewer/family names or images. No faster Google account revisits: hourly maximum remains.

## Test result

Fixed first12 per strategy on the same218 indexed leaves.25 source leaves were read live sequentially on17November, one request at least3s apart. Manual labels are committed for audit.

|Metric|Before hash queue|After branch-first queue|
|---|---:|---:|
|Activity leaves in test batch|12|12|
|Distinct provider names|11|12|
|Non-care under5 age stated in actual class description, ready for exact-branch check|0|3|
|New confirmed/published application venues from this method test|0|0|

The three are Majiku, Precious and Kidzero. Kinderra was initially counted as a fourth packet, then caught as an already-live provider under the shorter name Kinderra Play. The queue now uses a source-grounded provider binding, and moves all three Kinderra activity leaves to the existing-brand lane. This is more useful verification work per12pages, not three verified venues or a general forecast. ABC Playpals stays held because the event says6September with no clear current session/year. Kindercenter and KIDDIES88 have useful title clues but no precise class-body age claim, so they do not inflate the result. Damay has a3-12year description but is a therapy provider, not a clean non-care candidate.

Warm-restart executable test returns zero network requests and the cached packets. Prior runs without persisted cache could reread12of12 selected pages. During implementation, an earlier prototype selected11 additional low-priority leaves while trying to fill a warm batch; that bug was caught and fixed by bounding targets BEFORE cache filtering. One of those11leaves became the replacement test target after an existing-brand alias was caught. The final corpus contains25unique leaves,35total live activity reads during development (25retained plus10extra), plus robots requests. None of the extra reads is claimed as venue growth. A regression test now requires zero warm requests.

## Bounded branch follow-through

- Kinderra Cakung: live partner class body explicitly3-5years,90-minute weekend class, not the full-day daycare product. Maps normal opening hours and same provider in Asya/JakartaGardenCity, pin about67mfrom partner. Manual packet can use Maps pin, confirm exact unit/current weekend date. Partner source undated.
- Precious Depok: partner playdate body1-5years atGrandDepokCity; Maps normal hours, same school and phone082223282800 as preciouspreschool.id. That operator-style page gives a different age8months-4.5years and duration90minutes, versus partner1-5years/60minutes. Do not merge ranges or silently pick the wider one. Current exact program and domain link need final review.
- Majiku: exact provider/address/pin match atJemsGarden, but Maps has no hours/phone/website; no fresh operation claim based on aggregate ratings. Held.
- Kidzero: activity description6months-7years vs generic FAQ0-3years; exact live Maps operation still unresolved. Held.

No application data was changed by this method patch. The remaining limit is manual branch validation, not request speed. Next nightly work starts with the three new-provider packets, not a Kinderra duplicate. If validation fails, hold rather than relaxing the standard.

## Source ledger

All25exact leaf URLs, retrievedAt, description text and non-publishable status: capture-snapshot.json. All218 URLs/title/provider and prior report provenance: capture-index.json. Human test judgements: capture-benchmark-labels.json. Prior100and118source ledgers:2026-11-16-branch-depth.md and2026-11-17-branch-depth.md.

Additional live sources read17November:
- https://happykamper.io/id/providers/majiku-kids-531 - single Larangan site, two classes; not official age confirmation.
- https://happykamper.io/id/providers/kinderra-play-early-learning-center-921 - childcare operator also has separate weekend classes; no inference from full-day package.
- https://happykamper.io/id/providers/precious-montessori-school-216 - one Depok location/playdate; imported reviews not treated as fresh.
- https://preciouspreschool.id/ - playdate age8months-4.5years and GrandDepokCity phone/address; undated operator-style source, final domain/program scope review remains.
- https://www.google.com/maps/search/?api=1&query=Majiku+Learning+Center&query_place_id=ChIJOcA7WQD7aS4Ruq3DKmjcxbY - same JemsGarden pin, no hours/phone/website observed.
- https://www.google.com/maps/search/?api=1&query=Precious+Montessori+School&query_place_id=ChIJJXQIzhnpaS4RoKoiDuGBcvI - normal hours,46ratings, same phone. Website preciousmontessori.id failed fetch; failure is not closure evidence.
- https://www.google.com/maps/search/?api=1&query=Kinderra+Play+Early+Learning+Center&query_place_id=ChIJj6QlaxjuyK4Rp11ciyoADHk - open/closes5pm,5ratings, no closure label. No newest-review/trend claim made.

Searches were run in Bahasa and English-bearing provider names/class titles. Search highlights locate sources only. No paid APIs, outreach, verification bypass or government venue imports.
