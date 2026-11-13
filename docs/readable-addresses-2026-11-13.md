# Readable address draft, 13 November 2026

Draft only. No merge or deploy without owner approval and QC.

Audit: all153 records,141 public place pages, current share formatter. Four public Share lines were not useful locations. Two have plus codes; one was a floor only; one was an unnamed-road placeholder. Public full pages had2plus codes and1unnamed road. Other readable venue/area-only lines remain unchanged. No full street-address verification is claimed for the remaining inventory.

| Place | Before Share line | After Share line |
| --- | --- | --- |
| Sparks Bintaro Utown | PP4G+MF5 | Area: Sawah Baru, Ciputat |
| Sparks Cibinong | Jl. Tegar Beriman (GR9H+956) | Jl. Tegar Beriman |
| Funtastic Pondok Indah | Ground Floor | Pondok Indah Mall 1 |
| Rockstar Living World Alam Sutera | Jl. Nn No.42 | Living World Alam Sutera |

Sparks Bintaro: official source read13November now says PP4G+G9M, Sawah Baru, Ciputat, South Tangerang City, Banten15413. Stored Maps record says PP4G+MF5, Sawah Lama. Do not invent a street or silently relocate the pin. The area-only line is explicit, the place page warns about the source mismatch and says its pin has not been re-verified. Source: https://academy.sparks-edu.com/tangerang/

Sparks Cibinong: official source currently gives GR9H+956, Jl.Tegar Beriman, Tengah, Cibinong. Remove the code, retain the sourced street. Source: https://academy.sparks-edu.com/bogor/

Funtastic: official location is Ground Floor, Outdoor Area Pondok Indah Mall1, Jakarta Selatan. Full page already retained this; only Share incorrectly chose Ground Floor. Source: https://thefuntasticgym.com/our-locations/

Rockstar: use the known venue name, not the stored Jl.Nn placeholder. Source names Living World under Tangerang: https://www.rockstaracademy.com/schedules-and-locations . Existing branch identity is Living World Alam Sutera. Do not manufacture a street number; page labels this as area/venue and asks for full address confirmation.

Implementation is display-only. Raw research addresses, ratings, ages and map coordinates stay untouched. All153 Share texts omit plus codes and unnamed roads. Public place pages and minimal Place schema use the same cleaned location. No language default change. Place-schema address remains a string, with no coordinates or new precision implied.

Self-QA:167tests, lint, static build and282page export audit pass. Four changed Share lines only. Mobile390px Share dialogs inspected for all4; Bintaro page warning checked. Independent QC pending.

## Independent QC fixes

The shared public location now drives activity and job-guide lists, map Details, homepage/activity ItemList JSON-LD and place pages. Incomplete locations have the same explanatory note, including the Bintaro source conflict. Area-only locations no longer emit precise geo coordinates in ItemList schema or a direct routing destination: their Maps action is a venue/area search, not a silent pin move. Raw pin data is preserved.

Living World copy explicitly says Alam Sutera is stored-record-derived. The current official listing only confirms Living World, not that full branch name or a street address. Deltamas is flagged as area-only. Gymboree PIM is area-only but stays hidden/not-confirmed. AEON Sentul has a stored named street (Jl.MH.Thamrin), so it is not falsely labeled area-only.

A complete built-output scan found no old plus codes or unnamed street in any HTML page. The following raw machine-readable files still contain the original research strings by design. This is not a claim that the raw export has been corrected:

* `venues.json`: PP4G+MF5, GR9H+956, Jl. Nn No.42.
* `_next/static/chunks/0rnkosia6lx-u.js`: PP4G+MF5, GR9H+956, Jl. Nn No.42.

The raw source dataset is untouched. `/venues.json/` and its Next route payload remain historical exports, not current address validation. The JS data bundle also preserves raw source strings for the local map data.169tests, lint, build and282place export audit pass after these fixes.
