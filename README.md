# map-explora

Minimal Leaflet proof-of-concept for route optimization. This repository contains a single-file demo (index.html) and a Netlify serverless function scaffold to proxy optimization requests to a third-party optimization provider.

## Quick start (local)

1. Clone the repo

   git clone git@github.com:Derryl-Ditra/map-explora.git
   cd map-explora

2. Serve the static demo

   python3 -m http.server 8000
   # open http://localhost:8000/index.html

3. (Optional) Run Netlify dev to test serverless functions locally

   - Install Netlify CLI: `npm i -g netlify-cli` or `npx netlify-cli`
   - Copy `.env.example` -> `.env` and set your `OPTIMIZER_API_KEY`
   - Start dev server:
     ```sh
     netlify dev
     ```
   - Open http://localhost:8888

## Deploy to Netlify

- Connect this GitHub repository to Netlify (New site from Git → select repo `Derryl-Ditra/map-explora`).
- In Site settings → Build & deploy → Environment, add `OPTIMIZER_API_KEY` (do NOT commit keys to git).
- The included `netlify/functions/optimize.js` implements a small proxy that forwards optimization requests to your configured endpoint (adjust endpoint if needed).

## Notes

- The client UI includes two optimization modes:
  - Mock optimizer (client-side, instant) — good for demos.
  - Serverless optimizer (POSTs to `/.netlify/functions/optimize`) — proxies to a configured optimization provider when deployed with `OPTIMIZER_API_KEY`.

- You should review the serverless function payload mapping and adjust fields to match the provider's live API (field names in this scaffold are intentionally generic).

## Next steps

- Break the single file into modules (map, UI, optimizer).
- Add tests and linting.
- Add authentication and a simple moderation UI for user-contributed stops.
