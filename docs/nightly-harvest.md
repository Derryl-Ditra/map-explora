# Nightly public-source harvest (draft)

Status: candidate collection only. No data import, automatic PR, deployment, booking or outreach. Requires review before any inventory change.

## Run

Node 20+; no new packages, keys, accounts or paid APIs.

```sh
# First small live batch. Resume discovers unseen URLs on each invocation.
node scripts/harvest/run.mjs --limit 60
# Full first pass, or refresh all known leaf activities on later nights.
node scripts/harvest/run.mjs --limit 2500 --refresh
# Reproducible offline integration check with a sanitized live-page fixture.
node scripts/harvest/run.mjs --out .harvest/replay --replay tests/fixtures/harvest-buumi.json
node --test tests/harvest.test.mjs
```

Outputs, all ignored by git:
- `.harvest/happykamper/snapshot.json`: whitelisted JSON-LD fields, checkpointed after every page. No raw HTML, reviewer names, reviews, photos or account data.
- `report.json`: this invocation's counts, added/changed URLs, manual-review location groups, exclusion reasons, and sitemap omissions. A group is NOT a verified branch.
- Preserve the prior snapshot to compare later runs. Do not commit full harvested datasets. Review changed/new evidence, not the raw page count.

Default pacing is one request at a time, at least one second between completed requests. The default 60-page batch is intentionally bounded. The full-night command must be run explicitly. Every live invocation checks robots first; any non-empty Disallow stops for manual review. HTTP failures, redirects, challenges, timeouts and oversized responses stop the batch without retries or bypasses. Resolve a challenge through a supported alternative, not another automatic crawl.

Offline replay reads only the named fixture and previous snapshot. It does not check robots or make network requests. Use a different output folder for replay and live runs.

## Meaning of the data

Every row is `partner-listed-unverified`, `publishable: false`. This does not mean the app's publishable `operatingStatus: partner-listed`, which separately requires branch-matched Maps evidence.

- Activity URL, provider name and approximate source coordinates are leads. A provider may use one address for several classes or branches. The exact provider-name + rounded-pin grouping is only conservative candidate grouping, not entity resolution.
- The initial rectangle covers the broad Jakarta region. Explicit surrounding-city exclusions reduce noise, but it is not an administrative boundary. Confirm city and category manually.
- Free/government-space listings, care/therapy, daycare-only packages and clear out-of-region records are excluded from the review queue. Other government links, formal schooling, retail, ages outside under-5 and stale pop-up events still require manual exclusion. No automatic filter proves eligibility.
- FAQ ages remain `unverified-template`; they never become provider-confirmed ages. Terms are preserved separately, not parsed into confirmed class ages.
- An IDR aggregate offer is an activity/package price lead. Zero is preserved if explicitly listed. It is not tuition or a branch-wide fee. Read actual package options, inclusions and date before creating a partner price listing.
- No rating, latest-review date, sentiment or review trend is imported.
- Retrieval time is not source publication time. `sourceDate` stays null. Render-day `dateModified` and sitemap `lastmod` are ignored. A semantic hash compares claims; a missing URL never means closed or deleted.

## Measured baseline and trial (15 November 2026)

Released inventory at `5bbbc913e9581d3d2e2f277458235e70fc150394`:

| Metric | Before | After this draft |
|---|---:|---:|
| Stored physical venue records | 153 | 153 |
| Visible operating-source-qualified venues | 141 | 141 |
| Visible with app-verified branch-age evidence | 42 | 42 |
| Above plus Maps pin and no identity caution | 41 | 41 |
| Visible with at least one sourced price listing | 13 | 13 |
| Newly verified/published branches | 0 | 0 |

The age/pin counts are existing data-coverage proxies, not a new live audit or an assertion that all these branches are fully strong today. A current closure, identity, age, offering and red-flag audit is required for a stronger claim.

Current sitemap: 1,830 unique English `/en/activities/<slug>` leaf URLs after area/age/category paths are removed. This is activities across Indonesia, not providers or branches. The count can change.

Trial: first 200 URLs in deterministic SHA-256 URL order, five 40-page batches. Each batch took 62.2-62.9 seconds including pacing. This is a measured sample, not a whole-sitemap performance claim. No HTTP/parse errors or challenges in those batches.

| Trial observation | Count |
|---|---:|
| Activity pages parsed | 200 |
| Valid geographic coordinates | 187 |
| FAQ age text, all unverified | 200 |
| IDR aggregate price leads | 181 |
| Activities in broad region rectangle | 107 |
| Excluded activities after scope triage | 126 |
| Remaining exact provider+pin review groups | 59 |
| Review groups with a price lead | 58 |
| New strong/verified branches proved | 0 |

The 59 groups still include duplicates, out-of-age/category leads and potentially stale events. Eight are within 150 metres of an existing inventory pin, a duplicate warning only. The other 51 are unmatched leads, not 51 new branches. Nearest-pin comparison used the released inventory and must be rerun after data changes.

Live checks show why automatic promotion would be wrong:
- [Fav Swimming Course activity](https://happykamper.io/id/activities/toddler-class-location-at-villa-srimanganti): title names Villa Srimanganti, body says Vadeva; header ages 3-10, body 3-8. Hold identity/age conflict.
- [Mosart Dancing Ball](https://happykamper.io/id/activities/dancing-ball): body describes a May 2025 event. Being listed now does not prove a current class.
- [Petit Marche playground](https://happykamper.io/id/activities/playground-2): useful admission/package lead, not automatically a verified sensory-class age range.

Primary collection sources: [robots](https://happykamper.io/robots.txt), [sitemap](https://happykamper.io/sitemap.xml), [sanitized fixture's activity](https://happykamper.io/en/activities/buumi-playscape-plaza-senayan).

## Nightly work lanes, not one-source enrichment

The harvest is preparation. The output that matters is evidence-complete branches, not a bigger cache.

| WIB window | Work | Required output |
|---|---|---|
| 01:00-02:00 | Full public sitemap pass, checkpoint/diff, scope triage and dedupe against inventory | Separate activity/group/branch counts; changed and new queues |
| 02:00-03:00 | Official chain branch/schedule lane plus Bahasa discovery | Closure fixes first; chain branches missing from partner inventory |
| 03:00-05:30 | New small-provider verification plus deepen existing age/price gaps | Branch evidence packets, unresolved conflicts kept out |
| 05:30-06:15 | Full tests, lint/build, provenance audit, independent review and fixes | Exact draft candidate, no merge or deployment |
| By 07:00 | Report | Strong-data proxy before/after, verified branches added, candidates separate, blockers and draft link |

Discovery matrix: Jakarta, Tangerang, Tangerang Selatan, Bekasi, Depok, Bogor and Cibubur, each paired with `kelas bayi`, `sensory play`, `les renang balita`, `gym anak`, `musik balita`, and `montessori playgroup`. This gives 42 public-search seeds, not 42 verified places. Rotate neighborhoods and search terms once saturated. Include providers with only one to three locations; do not concentrate on chains.

Parallel official lane: Rockstar, Genesis, Aquababies, Aquatic Baby, GymnAdemics, Sparks, Buumi and Anak Air. Read exact branch lists and current dated schedules, then their linked Instagram/Threads/TikTok/Facebook. Website presence alone does not refresh every field. Check Bahasa source posts and actual date/branch scope. Never infer each branch offers every brand program.

Browser lane: use the available browser for public identity checks and sources not readable otherwise. Ordinary public web search/discovery can cover the matrix without a signed-in Google account. Signed-in Google/Maps checks default to no more than hourly per site; do not automate faster account browsing without explaining account-flag risk and obtaining explicit agreement. Stop throttling/challenges. Keep personal account details out of artifacts.

Priorities: unresolved closures or bad pins, new under-5 small providers, then missing branch ages/classes/prices, then review freshness. Attempt up to 40 candidate evidence packets in a night, but report actual completed packets rather than promise 40 additions. If evidence is poor, switch to existing-branch depth instead of padding the pin count. A provider, activity, class, location group and physical branch are different counts.

## Manual promotion gate

For each physical branch, store exact source URLs, retrieval date and visible source date separately. Match name, branch/address and Maps pin; check closure signals, category, under-5 relevance, government links and red flags. Bind ages and class offerings to the exact source scope. Partner-only ages keep "confirm with provider" labels, never exact-age verification. Record losing/conflicting values. Only then prepare an inventory diff for independent QC and approval. This script cannot promote, merge or deploy it.
