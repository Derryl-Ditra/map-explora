# Sharing preview replacement draft

Draft only. Replaces the unmerged PR76 direction, built on merged PR77. No automatic deployment approval.

## Design

The image is a map thumbnail, not a compressed details sheet. It uses the existing Bright map and actual UI rocking-horse mark/green. No essential text, badges, age/rating lists or invented photos. Each place crop is centered on its stored coordinates; that is not a fresh pin or street-address verification. Home uses the Jabodetabek map. Stored basemap captured 13 November 2026 at center 106.81,-6.35, zoom 9.7, viewport 2800x2000, without symbol labels. Generator projects stored pins using Web Mercator. OpenStreetMap/OpenFreeMap attribution retained. Raster source is encoded in scripts/preview-map.base64 for a reproducible build. Sources: https://tiles.openfreemap.org/styles/bright and https://openfreemap.org/ and https://www.openstreetmap.org/copyright . Map assets have their original licenses; this capture creates no ownership claim.

1200x630 PNG, under 300KB; central subject survives 320px, 100px and centered square/3:2/16:9/2:1 stress crops. These are simulations, not actual WhatsApp/Threads/LinkedIn client captures or Google Search results. Generic logo/map art may not be selected by Google; no search-image placement guarantee. No dedicated real client was accessed or post sent.

OG/Twitter metadata is English on all pages, including /id/, as requested. SEO page language remains local. Title is the full place name with no appended app brand; longest proper names remain intact rather than cut to a target. Preview descriptions are one short sentence under 80 characters. Both image-alt variants describe the actual map/horse image. Old og.png and per-place image URLs remain generated; new images have v2 paths. Cache refresh is not guaranteed by changing a path.

## Share text and controls

Name, area, one age line, blank line, one clean first-party link. No rating, count, field labels or Via footer. One-class text preserves its class name and exact range; multi-class text merges only overlapping verified ranges, never bridges gaps. Branch statements stay explicitly distinct. Unknown ages ask the branch. Generic native Share/Copy details is plain; WhatsApp copy variant adds asterisks around the name only. Active-page-language copy is a draft decision for review, not a confirmed standing user preference. Native Share gets URL once, status says app handoff rather than Sent. Copy link/details are in a compact disclosure. Failed clipboard writes expose selectable text. No UTM or inferred channel tracking.

## Short URLs

/id/places/{code}/ uses 3 characters, mixed case with a digit. Alphabet excludes 0/O/o/I/l/1:56^3=175,616strings; requiring one digit, one uppercase, one lowercase leaves6*8*24*24=27,648. Registry is committed and append-only; never change/reuse an issued code. Initial allocation is deterministic SHA256 over permanent ID and retry nonce, collision-checked against existing codes and legacy slugs. All 141 public places get codes; hidden records have none. No data record/pin changes. Case-sensitive: wrong case is not silently corrected to another place. Legacy slug and ?v= links work.

The short HTML serves full static OG/Twitter tags identical to its long destination, canonical to that long page, visible branch title and no-JS destination link. Client navigation lands on the full page without a server redirect or a meta refresh. Long and short pages use the same OG URL identity. Registry length is a single constant for future allocation, but changing it must never rewrite issued entries. Adding future places requires appending a new checked code; withdrawn codes must not be recycled.

## Release gate

- Tests/lint/static build, 141 short/long metadata parity, collision and static fallback audits.
- Actual local JS navigation and no-JS short-page link.
- Fresh independent pixel QC before user review.
- Explicit user yes before merge/deploy.
- After deploy, check exact short URL, long URL, image status/MIME/dimensions and canonical parity. Check native composers without posting where available. Real clients remain unverified otherwise.
- LinkedIn Post Inspector affects future posts; existing posts can retain old preview. No verified public WhatsApp purge/TTL. A query string or Facebook scrape is not a dependable WhatsApp refresh.

Research sources: https://developer.apple.com/documentation/technotes/tn3156-create-rich-previews-for-messages.md ; https://developers.facebook.com/documentation/business-messaging/whatsapp/link-previews ; https://www.linkedin.com/help/lms/answer/a1689427 ; https://developers.google.com/search/docs/appearance/google-images ; https://developer.mozilla.org/en-US/docs/Web/API/Navigator/share ; https://developers.facebook.com/docs/sharing/webmasters/getting-started/versioned-link/ .
