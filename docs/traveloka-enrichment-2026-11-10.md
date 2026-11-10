# Booking-site enrichment pass - 2026-11-10 (draft)

Source rule: partner-listed means a booking site's own product page. It is labeled partner-listed in the data, never provider-confirmed. Prices and schedules below are NOT in the app (the Venue model has no price or schedule field; adding one needs Derryl's approval). Prices are as shown on the page on 2026-11-10 and can change.

## Reach and limits
- Traveloka Xperience pages fetched as public pages (no login). The Traveloka site and app listing/search pages sit behind a DataDome captcha for the cloud browser; it was not bypassed. Discovery was therefore by web search, so this is a sample of Traveloka's Jabodetabek listings, not a full crawl. About 150 Traveloka product URLs were found, about 106 judged Jabodetabek, and every one was fetched and screened.
- Most listings are playgrounds, water parks, attractions or adult classes. Under-5 class listings reached: 3 (below).

## Under-5 class listings found on Traveloka
| Provider / branch | Ages on page | Schedule on page | Price on page | Already in data? |
|---|---|---|---|---|
| Gavrila Gymnastics Kelapa Gading | Kinder from 3.5 yrs, Kid 6+ | Weekdays 14:00, 15:30, 17:00 (page text); open 11:00-19:00; admin 0819-0540-1140 | Rp 250.000 per 60-min session (strike-through Rp 300.000) | New (added as partner-listed) |
| Gavrila Gymnastics Serpong | Kinder from 3.5 yrs with companion, Kid 6+ | Daily 11:00-19:00 | Rp 250.000 per session; private online class Rp 510.000 per 60 min | New (added as partner-listed) |
| My Gym Children's Fitness, AEON Mall BSD | "3 months to 8 years" per cached page | none | none; page cached from April 2025 and shows "Sold Out" | New lead, NOT added: current operation not verified |

Gavrila Mampang (official site lists it) has no Traveloka page found; not added.
Source URLs:
- https://www.traveloka.com/id-id/activities/indonesia/product/gymnastics-training-by-gavrila-kelapa-gading-5200228399300
- https://www.traveloka.com/id-id/activities/indonesia/product/gymnastics-training-by-gavrila-serpong-9054937517250
- https://www.traveloka.com/en-id/activities/indonesia/product/children-fitness-at-my-gym-aeon-bsd-2001470388419

## Listings with no stated under-5 age (not added)
Kids Pizza Making class (Pizza Marzano Kemang, Kota Kasablanka), ABC Cooking Studio Central Park (kids classes, no age), Kina Art Studio Senayan Park and Lippo Mall Puri (pottery), Buntari ceramic BSD, RuangQu, Koningsplein classes: no age on the page.

## Play venues seen (not classes, not added)
Kidzooona, Kid's Box, KidCity, Kidzilla, Kidzlandia, Playlandia, Jolly Fields, Playtopia, Play N Learn, Fun & Fit, Cocoland, Kiztopia, Buumi Playscape and Play Club (Buumi is already tracked), SuperPark, KidZania, Trans Studio Mini.

## Other sites, first pass (search only, 2026-11-10)
- tiket.com: kids play venues, slime lab, Buumi Play Club. No under-5 class found.
- Klook: play venues (Playtopia, Kidzooona, Kidzlandia, Buumi, Fun & Fit). No class found.
- KKday: Wolfoo World playground, a culinary class, BXSea. No under-5 class found.
- Tokopedia, Shopee: product shops and blog articles only. No class listings.
- GoPlay / Gojek: blog posts only. Fita: no results.
- Not yet checked: direct site browsing of tiket.com and Klook listing pages, KKday kids category, Traveloka captcha-blocked listing pages. Each site's terms were not reviewed in this pass.
