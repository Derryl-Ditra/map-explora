# Technical & Product Specification: Map Explora (Heavy EV & Van Navigator)

---

## 1. Product Vision & Niche Scope

### 1.1 Primary Target Audience
- **Vehicle Class**: Executive and Luxury Electric MPVs (BYD Denza D9, Maxus MIFA 9, Zeekr 009, Kia EV9, Hyundai Ioniq 5/6).
- **Driver Persona**: Professional chauffeurs, executive drivers, and premium EV owners in Greater Jakarta (Jabodetabek).
- **Brand Vibe**: Silverbird / Early Uber Black executive minimalism. Crisp monochrome dark-mode UI with precision spatial density. No cheap gamification banners or clutter.

### 1.2 Core Problem Statement
Standard passenger EV navigation apps do not account for large commercial EVs and oversized MPVs:
1. **Bay Size Constraints**: Standard SPKLU parking bays cannot accommodate vehicles longer than 5.2 meters.
2. **Charging Speed Requirements**: Commercial fleets and heavy packs require high-output DC Fast Chargers (≥ 60 kW to 200 kW) with CCS2 connectors.
3. **Maneuvering & Clearance**: Low ceiling heights in underground mall basements block electric vans and trucks.
4. **Data Transparency**: Many proprietary networks hide station specifications behind closed apps. We only show stations with open, verified technical specifications.

### 1.3 Data Policy & Operator Scope
- **Open Data Rule**: Include only SPKLU stations with publicly accessible data (PLN open dataset, OpenStreetMap verified EV infrastructure, and open registries).
- **Excluded Operators**: Exclude closed proprietary networks that restrict public station specifications and connector power data.

### 1.4 Key Functional Capabilities
- **Heavy-EV Station Filtering**:
  - Filter stations by parking bay clearance (Curbside / Open Surface vs. Basement).
  - Filter by minimum charger power (≥ 50 kW, ≥ 100 kW, ≥ 150 kW).
  - Connector types: CCS2 (Heavy DC), Type 2 (AC), CHAdeMO.
- **Truck & Van Turn-by-Turn Routing**:
  - OSRM route calculations optimized for surface transit.
  - Visual elevation and route distance summaries.
- **Mobile-Web First Experience**:
  - Optimized for Android mobile web browsers (Chrome / Samsung Internet).
  - Progressive Web App (PWA) manifest for home-screen installation.

---

## 2. Map Engine & Vector Architecture

### 2.1 Engine Selection: MapLibre GL JS
- **Library**: `maplibre-gl` (Open-source fork of Mapbox GL).
- **Cost**: **100% Free**. Zero API keys, zero credit card requirements, zero usage billing.
- **Tile Provider**: OpenFreeMap / Protomaps vector tiles.
- **Rendering Advantages**:
  - Native client-side WebGL/WebGPU rendering.
  - Native dark vector style with custom color tokens (no CSS invert filters).
  - 60 frames per second pan, pinch-zoom, and smooth rotation.
  - Dynamic station layer clustering with hardware acceleration.

### 2.2 Vector Style Configuration (Silverbird / Executive Aesthetic)
- **Base Canvas**: Deep Obsidian (`#080808` to `#0d0d0d`).
- **Road Network**: Muted graphite (`#1f1f23` for local streets, `#3f3f46` for tollways and major arteries).
- **Water & Greenery**: Subdued charcoal water (`#121215`) and minimal dark forestry.
- **Accents**: Pure White (`#FFFFFF`), Titanium Gray (`#A1A1AA`), and Precision Cyan/Sapphire (`#00F0FF` / `#3B82F6`) for active fast-charging hubs.
- **Borders & Dividers**: 1px sharp zinc borders (`#27272a`). No rounded toy-like bubbles.
- **Typography**: Geometric clean typography with tight tracking (`-0.02em`).
- **Grid Discipline**: Strict 8px spatial grid alignment (`spatial-logic`). Zero clutter (`anti-slop-vibe`).

---

## 3. Application Architecture & State Management

### 3.1 Component Decoupling
Replace monolithic components with modular primitives:

```text
src/
├── app/
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── map/
│   │   ├── VectorMap.tsx         # MapLibre GL container & viewport controller
│   │   ├── StationMarkers.tsx    # GeoJSON layer & clustering
│   │   └── RouteLayer.tsx        # Polyline rendering for active route
│   ├── ui/
│   │   ├── MobileDrawer.tsx      # Draggable bottom sheet for mobile viewports
│   │   ├── FilterBar.tsx         # Power and connector selector pills
│   │   ├── StationDetails.tsx    # Bay dimensions, power output, amenities
│   │   └── ShareCard.tsx         # Meta Threads share graphic generator
│   └── common/
├── hooks/
│   ├── useGeolocation.ts         # User coordinate tracking & compass orientation
│   ├── useStationFilters.ts      # Active filter state (kW, connector, access)
│   ├── useRouting.ts             # OSRM routing with abort controller & debounce
│   └── useStationData.ts         # Station fetcher and local cache
└── types/
    ├── station.ts                # Strict TypeScript definitions for SPKLU
    └── route.ts
```

### 3.2 State Management & Hooks Contract
1. **`useGeolocation`**:
   - Manages HTML5 Geolocation API with exponential backoff on error.
   - Outputs: `coords: [lng, lat]`, `heading`, `accuracy`, `permissionStatus`.
2. **`useRouting`**:
   - Endpoint: OSRM public routing API (`https://router.project-osrm.org`).
   - Network safety: Uses `AbortController` to cancel in-flight queries when target changes.
   - Debounce interval: 350 ms for interactive coordinate dragging.
3. **`useStationFilters`**:
   - Manages active filters: minimum power rating, connector types, bay access type.
   - Computes real-time distance and estimated battery consumption.

---

## 4. Mobile Ergonomics & Go-To-Market (GTM)

### 4.1 Mobile-First Interaction Design
- **One-Thumb Interaction**: All critical controls sit in the bottom 40% of the screen.
- **Gesture Drawer**:
  - Snap Point 1 (Collapsed): Current destination summary and quick toggle.
  - Snap Point 2 (Half): Nearest heavy-capable charging stations list.
  - Snap Point 3 (Expanded): Detailed station specifications and filter controls.
- **Haptic & Visual Feedback**: Touch-optimized touch targets (minimum 48×48 px).

### 4.2 Meta Threads GTM Engine
- **One-Click Share Graphic**:
  - Users can generate a clean visual card showing:
    - Route efficiency for heavy vehicles.
    - Charging station profile with bay suitability rating for Denza / vans.
  - Pre-filled text formatted for Meta Threads (e.g., `#JakartaEV #DenzaD9 #SPKLU #EVTrucks`).
- **Viral Utility Angle**:
  - "Is this SPKLU big enough for a Denza D9 or Commercial Van?"
  - Community crowdsourced bay length verification.

---

## 5. Verification & Mobile Testing Plan

### 5.1 Automated Quality Checks
- TypeScript strict compilation: `npm run build`.
- ESLint verification: `npm run lint`.

### 5.2 Mobile Live Validation (Android)
- **Deployment**: Automatic GitHub Actions workflow on branch `main` pushing to GitHub Pages.
- **Live URL**: `https://derryl-ditra.github.io/map-explora/`
- **Physical Device Test Script**:
  1. Open the live URL on an Android device (Chrome or Samsung Internet).
  2. Grant geolocation permissions.
  3. Filter stations by "≥ 100 kW" and "Open Bay".
  4. Select a station and verify 60fps route calculation.
  5. Test touch drag gestures on the bottom drawer.
