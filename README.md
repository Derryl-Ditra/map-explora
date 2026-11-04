# Map Explora - Under 5 Activities

Map of baby, toddler and preschool classes (under 5 years) across Jakarta, Bintaro and Jabodetabek, with branch-confirmed age eligibility. Mobile-first, installable as a PWA where the browser allows it.

Live: https://derryl-ditra.github.io/map-explora/

## What it does

- Monochrome vector map (MapLibre GL + OpenFreeMap, dark and light) tuned for glanceable navigation.
- Select a station and the route draws immediately, with real road distance, drive ETA and the next-turn instruction in the banner.
- Live position tracking while the app is open (browser geolocation watch). Background or locked-screen updates are not reliable or guaranteed on mobile browsers.
- Filters for Denza-fit reports, indoor parking and connector type.
- Arrival detection: the route clears when you get within about 150 m of the destination.
- Report-a-problem notes are saved on your device only (localStorage). Nothing is sent anywhere.

## Data honesty

- Station fit, bay and clearance data is reported, not independently verified. Stations without a verified source show as unverified.
- Tariffs come from the listed per-kWh fee for each station.
- Distances before a route loads are straight-line estimates and labelled as such.

## Stack

Next.js 16 static export, React 19, Tailwind CSS 4, MapLibre GL 6, OpenFreeMap vector tiles, OSRM demo server for routing (rate-limited to at most 1 request per second).

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

Location is used in the browser while the app is in the foreground. Map tiles come from OpenFreeMap and routes from the OSRM demo server; those services see the requests needed to serve them (the map area you view, and for a route your current position and the station coordinates). The app itself stores no position history and sends it nowhere else. Report-a-problem notes stay in localStorage on your device.

## Icon credit

The app icon uses the "horse-toy" outline from [Tabler Icons](https://github.com/tabler/tabler-icons), MIT License, Copyright (c) 2020-2026 Pawel Kuna. See `public/ICON-LICENSE.txt`. PNG and ico files are generated into `public/` by `scripts/decode-icons.mjs` before dev and build.
