# Review pulse 2026-11-08

All 148 branches checked on Google Maps, sort=newest, read-only, 2026-11-08. No CAPTCHA, challenge or lock was hit during collection.

## Coverage: why 136 cards, not 148

- 148 branches were checked.
- 4 listings have no review list at their exact verified address and were flagged, not collected: baby-jumper-gym-gading-serpong, gymboree-play-music-kelapa-gading, sparks-sports-academy-cibubur, sparks-sports-academy-sawangan.
- 144 branches returned a review list.
- Of those 144, 136 match a venue in this repo and their pulse is merged. 8 collected branches are not venues in this repo (no map entry): i-can-read-bsd2, i-can-read-cikarang, i-can-read-cikupa, i-can-read-galaxy, i-can-read-grandwisata, i-can-read-karawaci, i-can-read-modernland, music-wonderworld-bsd.

## Trend rule

Current 3 months vs prior 3 months, inside a window of up to 6 months for smaller branches. The data file stores only evidence: per-half review counts, per-half average ratings, per-half sentiment counts (positive = 4-5 stars, negative = 1-3 stars) and the pulse collection day.

The label is derived in code (reviewPulse.ts), never trusted from storage:

- diff = (current 3 months average) - (prior 3 months average)
- diff >= +0.3: improving
- diff <= -0.3: worsening
- otherwise: steady

Minimum before any label: 10+ dated reviews in the window AND 3+ in each 3-month half. Anything below the minimum stores no evidence and the card shows "Not enough recent reviews to judge a trend."

Result across the 144 collected branches: 7 improving, 31 steady, 8 worsening, 98 insufficient.

Dates stay month precision. Google shows relative labels ("3 weeks ago", "5 months ago"), so evidence bounds are ISO months marked approximate, never invented exact days. Labels of 6 months or older fall outside both halves. The UI re-verifies every stored evidence block through the guard in reviewPulse.ts before showing a label (method "maps-window-3m-3m").

## Complaint themes

Themes come from real customer comment text only (owner responses never count as customer reviews): the top 3 recurring keywords among reviews rated 3 stars or lower in the collected sample, each stored with its reviewer count (complaintThemeReviewers). The card shows "Concerns (from N reviews rated 3 stars or lower)" with N the total low-rated reviews for that branch.

## Card

A small badge gives the state at a glance: Improving, Steady, Worsening, or "Not enough data". Under it one plain line: "Last 3 months: avg X (N reviews) vs prior 3 months: avg Y (M reviews)". Latest review shows month precision in plain words ("Nov 2026"), with the months-approximate note once in the evidence line under it, together with the sample size, source (Google Maps) and the 2026-11-08 pulse collection day. Theme dates are honest: when a branch kept older themes because the pulse collected none, the review checkedAt stays at the older collection day; the pulse's own day lives on trendEvidence.checkedAt.

Draft only, not merged.
