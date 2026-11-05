# Map Explora - Under 5 Activities

Map of baby, toddler and preschool classes (under 5 years) across Jakarta, Bintaro and Jabodetabek, with branch-confirmed age eligibility. Mobile-first, installable as a PWA where the browser allows it.

Live: https://derryl-ditra.github.io/map-explora/

## What it does

- Dark and light vector map with places for children aged 0 to 59 months.
- Filters for age, activity, area and search; optional straight-line nearby sorting.
- Directions opens Google Maps from its current location to the selected place. No in-app routing, ETA, arrival detection or live tracking.
- Approximate or cautioned pins open a named Google Maps search instead of coordinate directions.
- Share a place with the live map link. Report-a-problem notes stay on your device.

## Data honesty

- Only officially listed places are shown. Other records remain in the dataset but are hidden.
- Brand age claims do not confirm a branch. Branch-confirmed ages and unconfirmed claims are labelled separately.
- Distances in the app are straight-line estimates, not driving distance.
- Sources, check dates and uncertainty notes are shown where recorded. Confirm the branch and class before visiting.

## Stack

Next.js 16 static export, React 19, Tailwind CSS 4, MapLibre GL 6, OpenFreeMap vector tiles. Directions open Google Maps; no routing server or API key is needed.

## Development

```bash
npm install
npm run dev
```

Build and export:

```bash
npm run build   # static export lands in out/
```

Deployment runs through GitHub Actions on push to `main`.

## Privacy

Location is read once on opening the app, and again when you tap Locate. The latest fix is cached on your device for nearby sorting; there is no live location tracking or position history. Map tiles come from OpenFreeMap, which sees the map area requested. Directions sends only the selected destination to Google Maps; Google Maps obtains the starting location itself. Its route settings, traffic and restrictions apply there, not in this app. Check tolls and ganjil/genap settings before travelling. Report-a-problem notes stay in localStorage on your device.

## Icon credit

The app icon uses the "horse-toy" outline from [Tabler Icons](https://github.com/tabler/tabler-icons), MIT License, Copyright (c) 2020-2026 Pawel Kuna. See `public/ICON-LICENSE.txt`. PNG and ico files are generated into `public/` by `scripts/decode-icons.mjs` before dev and build.
