# Age validation round, 7 November 2026

Status: candidate, not deployed. Wider research remains in progress.

## This change

15 public Rockstar branches gain 45 exact-month classes from their individual current-term PDFs. No places are added or removed. Public places remain 138. Verified branch-age coverage rises from 18 to 33, leaving 105 without a clear branch-age match. Verified offered programs rise from 65 to 110.

Each PDF is linked by that branch's official page with Current Term selected and Winter Term 2026 displayed. Each PDF names the branch and runs from 19 October 2026 through 17 January 2027. The PDF, not the HTML timetable's rounded year labels, supplies these bands:

|Class|Exact months|
|---|---|
|Crawler|6 to 18|
|Walker|12 to 23|
|Jumper|24 to 35|

Each branch was checked individually in both text and rendered PDF pixels. All three classes were visible in each. Pesona Square's classes are on PDF page 2; the other branches are on page 1. Other programs are not exhaustively transcribed. Current session availability and price remain unverified.

## Sources

- rockstar-academy-aeon-mall-sentul-city: https://www.rockstaracademy.com/lib/upload/files/club/AS_Schedule_Winter_20261.pdf
- rockstar-academy-aeon-mall-deltamas: https://www.rockstaracademy.com/lib/upload/files/club/AD_Schedule_Winter_20261.pdf
- rockstar-academy-central-park-2: https://www.rockstaracademy.com/lib/upload/files/club/CP_Schedule_Winter_Term_2026.pdf
- rockstar-academy-gajah-mada-plaza: https://www.rockstaracademy.com/lib/upload/files/club/GM_Schedule_Winter_20261.pdf
- rockstar-academy-grand-metropolitan-bekasi: https://www.rockstaracademy.com/lib/upload/files/club/GB_Schedule_Winter_20261.pdf
- rockstar-academy-hampton-square: https://www.rockstaracademy.com/lib/upload/files/club/HS_Schedule_Winter_2026%C2%A0W3.pdf
- rockstar-academy-lippo-mall-kemang: https://www.rockstaracademy.com/lib/upload/files/club/KV_Schedule_Winter_20261.pdf
- rockstar-academy-lippo-mall-puri: https://www.rockstaracademy.com/lib/upload/files/club/LP_Schedule_Winter_20261.pdf
- rockstar-academy-lippo-plaza-ekalokasari: https://www.rockstaracademy.com/lib/upload/files/club/LE_Schedule_Winter_20261.pdf
- rockstar-academy-living-world-alam-sutera: https://www.rockstaracademy.com/lib/upload/files/club/LW_Schedule_Winter_2026%C2%A0W3.pdf
- rockstar-academy-mall-of-indonesia: https://www.rockstaracademy.com/lib/upload/files/club/MI_Schedule_WInter_20262.pdf
- rockstar-academy-pik-avenue: https://www.rockstaracademy.com/lib/upload/files/club/PA_Schedule_Winter_20261.pdf
- rockstar-academy-pesona-square: https://www.rockstaracademy.com/lib/upload/files/club/PS_Schedule_Winter_20261.pdf
- rockstar-academy-pluit-village: https://www.rockstaracademy.com/lib/upload/files/club/PV_Schedule_Winter_20261.pdf
- rockstar-academy-tsm-cibubur: https://www.rockstaracademy.com/lib/upload/files/club/TC_Schedule_Winter_20261.pdf

## Conflicts retained, not promoted

English1 branch FAQ pages commonly say Small Stars 3 to 5 years, while https://english1.co.id/program/smallstars/ says 3 to 6 years. This round does not invent a resolution or mark those branches verified.

Aquababies Instagram profile https://www.instagram.com/aquababiesindonesia/ says 0 months to 4 years. Its Facebook and Threads profiles say 0 months to 3 years. None establishes a current class age for Menteng or Bintaro.

## Review-date scope

All 138 public places still lack verified newest-sorted review dates and sufficient recent-trend samples. Aggregate rating/count checks are not latest-review checks. No newest-review date or trend is added by this change.

## Verification

98 tests passed, lint passed, and the static production build passed locally on 7 November 2026. A new regression test checks all 15 source URLs and exact month bands. The pre-existing impact test now expects 110 verified programs, 106 places without verified programs, and 105 without verified program or branch-age evidence.

Independent QC and owner merge approval are still required. The broader 120-place research attempt ledger is being completed separately and must not be described as finished by this PR.
