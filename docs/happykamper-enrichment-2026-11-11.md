# Happy Kamper + booking-site enrichment, 2026-11-11

Daily 01:00 WIB run. Sources checked this pass: Happy Kamper (new standing source), Traveloka re-screen, tiket.com, Klook, KKday, Google Maps (personal account, 2 place lookups + 3 searches, well under hourly limit).

## New source: Happy Kamper (happykamper.io)

A Jakarta kids-activity booking platform with provider pages that show ages, prices and locations. Its web category pages are crawlable; some listings need the app for full detail. Added to the standing booking-site source list (Traveloka, tiket.com, Klook, KKday) from the 2026-11-10 instruction.

## Added: Kinderra Play - Cakung (Jakarta Garden City)

- Single-branch early learning center that also runs bookable weekend classes for ages 1-5.
- Branch-count evidence: Maps search "Kinderra Jakarta" returns only this location; Happy Kamper provider page lists only "Kinderra Cakung Pusat". No official brand website found. Count: 1 branch.
- Verification: Google Maps place active, 5.0 (5 reviews, all 5-star, all read 2026-11-11, none concerning; two reviewers mention attending the weekend class). Only 5 ratings, too few to judge trend. "Nothing concerning found" means nothing surfaced in the sources checked, not a guarantee of safety.
- Recorded as `maps-listed`, so it stays hidden until a brand-published list or stronger evidence appears. Partner-listed (Happy Kamper) ages and prices carry source URL and check date.
- Hours conflict noted in the record: Maps opens 7:30 AM; Happy Kamper lists Mon-Fri 06:30-17:30, Sat-Sun closed, yet weekend classes run.

## Closed lead: My Gym AEON BSD

- Google Maps (checked 2026-11-11): the My Gym branch at Jl. BSD Raya Utama 03A (AEON Mall BSD) is flagged **Permanently closed**. No reviews on the closed listing.
- No other My Gym children's-fitness branch exists in Jabodetabek on Maps; the other "My Gym" hits (Klender, Duren Sawit) are adult gyms.
- The cached Traveloka product "Children Fitness at My Gym AEON BSD" (3 months - 8 years, "Sold Out") is a dead listing. Not added.

## tiket.com / Klook / KKday direct pass

- tiket.com (search read 2026-11-11; its site search ignores URL queries, so domain-scoped web search was used): only play venues (Wonderlab, Jolly Fields, Playtopia, Kidzlandia, TamTem, Buumi). Buumi branches already in inventory. No new under-5 structured-class providers.
- Klook (2026-11-11): play venues plus "Motion, Splat, Slime & Bear Brick Art Painting" (Pondok Indah) - an art-jamming studio aimed at stress relief, no under-5 class evidence. Nothing added.
- KKday (2026-11-11): no Jabodetabek under-5 class listings surfaced.
- Traveloka re-screen (2026-11-11): the two Gavrila products are unchanged and already in data (PR #60). No new under-5 class listings found.

## Leads for the next run

- Happy Kamper under-5 listings whose providers were not yet identified (category pages omit provider names; activity pages need individual fetches): Early Stimulation Class - Toddler 13-36m (Duren Sawit, from Rp 200.000), Toddler Class: Practical Skills for Little Ones 1-3 yrs (Kembangan, from Rp 175.000), Weekdays Sensory Class 1-5 yrs (Penjaringan, from Rp 250.000), Sensory class 0-2 yrs (Pesanggrahan, from Rp 700.000), swim classes from age 4 (Jagakarsa/Condet/Ciracas/Bulungan branches, from Rp 62.500-80.000), futsal classes ages 2-7 (Tibi Futsal, Pasar Minggu; Rinjani Futsal, Makasar; from Rp 125.000).
- Gavrila Mampang: on the official site, no Traveloka page; still unverified.

## Policy update 2026-11-11 (owner decision)

Question put to the owner with PR #62: is partner + Maps evidence enough to publish small brands? Answer: "Yes. And merge please." Implemented as a new operatingStatus state "partner-listed" (booking-platform provider page AND an active Google Maps listing, no official brand list found). `isShownToUsers` and `publicInventory` publish official-listed and partner-listed; maps-listed alone stays hidden. Kinderra Play Cakung is the first record with this state, moving the public count from 140 to 141.
