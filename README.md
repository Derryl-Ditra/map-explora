# Map Explora — Jakarta EV Navigator

Find EV charging stations (SPKLU) in Jakarta that actually fit a large electric MPV like the Denza D9, then route to them. Mobile-first, installable as a PWA where the browser allows it.

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

Location is used locally in the browser while the app is in the foreground. No position history is stored or shared. When a route is calculated, your current position and the station coordinates are sent to the OSRM demo server (router.project-osrm.org) to compute it; that is the only time location data leaves the device, and nothing is retained by the app itself. Report-a-problem notes stay in localStorage on your device.
