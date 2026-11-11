"use client";

import { useEffect, useRef, useState } from "react";
import * as maplibregl from "maplibre-gl";

// Turbopack's worker bundling breaks under static export; serve the worker as a static asset.
if (typeof window !== "undefined") {
  const base = process.env.NODE_ENV === "production" ? "/map-explora" : "";
  maplibregl.setWorkerUrl(`${base}/maplibre-worker.js`);
}
import "maplibre-gl/dist/maplibre-gl.css";
import { Venue } from "@/types/venue";
import { getMapStyle } from "./vectorStyle";

interface VectorMapProps {
  venues: Venue[];
  activeVenueId: string | null;
  onSelectVenue: (venue: Venue) => void;
  userPos: [number, number] | null; // [lat, lng]
  showUserMarker?: boolean; // only with a real location fix, never the default center
  userAccuracy: number | null;      // meters
  recenterTick?: number;
  fitTick?: number; // bump to frame all currently matching venues (area/activity filter)
}

const JAKARTA: [number, number] = [106.8456, -6.2088]; // maplibre is lng,lat

// Cached dark nameplates keep venue labels readable on the pastel-light map.
const labelSpriteCache = new Map<string, ImageData>();

const LABEL_SOURCE = "venue-labels";
const LABEL_LAYER = "venue-labels";

function accuracyPolygon(lat: number, lng: number, meters: number): GeoJSON.Feature {
  const points: [number, number][] = [];
  const earth = 6378137;
  const latRad = (lat * Math.PI) / 180;
  for (let i = 0; i <= 48; i++) {
    const angle = (i / 48) * 2 * Math.PI;
    const dx = (meters * Math.cos(angle)) / (earth * Math.cos(latRad));
    const dy = (meters * Math.sin(angle)) / earth;
    points.push([lng + (dx * 180) / Math.PI, lat + (dy * 180) / Math.PI]);
  }
  return {
    type: "Feature",
    properties: {},
    geometry: { type: "Polygon", coordinates: [points] },
  };
}

export default function VectorMap({
  venues,
  activeVenueId,
  onSelectVenue,
  userPos,
  showUserMarker = true,
  userAccuracy,
  recenterTick,
  fitTick,
}: VectorMapProps) {
  const [mapStatus, setMapStatus] = useState<"loading" | "ready" | "error">("loading");
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<maplibregl.Map | null>(null);
  const markersRef = useRef<Map<string, maplibregl.Marker>>(new Map());
  const userMarkerRef = useRef<maplibregl.Marker | null>(null);
  const readyRef = useRef(false);
  const recenterRef = useRef({ userPos, recenterTick });
  recenterRef.current = { userPos, recenterTick };
  const venuesRef = useRef(venues);
  venuesRef.current = venues;
  const activeRef = useRef(activeVenueId);
  activeRef.current = activeVenueId;
  const onSelectRef = useRef(onSelectVenue);
  onSelectRef.current = onSelectVenue;

  // Create map once
  useEffect(() => {
    const container = containerRef.current;
    if (!container || mapRef.current) return;

    const initialMarkers = markersRef.current;
    let cancelled = false;
    let failed = false;
    const initial = userPos ? [userPos[1], userPos[0]] as [number, number] : JAKARTA;

    const start = (style: maplibregl.StyleSpecification) => {
      if (cancelled || mapRef.current) return;
      const map = new maplibregl.Map({
        container,
        style,
        center: initial,
        zoom: 11,
        attributionControl: { compact: true },
      });

      map.on("error", () => { failed = true; if (!cancelled) setMapStatus("error"); });
      map.on("load", () => {
        // The basemap has rendered. Do not keep it covered while the extra
        // venue-label source loads and the map waits for its first idle event.
        if (!cancelled && !failed) setMapStatus("ready");
        readyRef.current = true;
        const requested = recenterRef.current;
        if (requested.recenterTick && requested.userPos) {
          map.easeTo({ center: [requested.userPos[1], requested.userPos[0]], zoom: 15, duration: 800 });
        }
        map.addSource("user-accuracy", {
          type: "geojson",
          data: { type: "FeatureCollection", features: [] },
        });
        map.addLayer({
          id: "user-accuracy-fill",
          type: "fill",
          source: "user-accuracy",
          paint: { "fill-color": "#2563eb", "fill-opacity": 0.10 },
        });
        map.addLayer({
          id: "user-accuracy-edge",
          type: "line",
          source: "user-accuracy",
          paint: { "line-color": "#2563eb", "line-width": 1, "line-opacity": 0.3 },
        });
        ensureLabelAssets(map);
        map.on("click", LABEL_LAYER, (e) => {
          const id = e.features?.[0]?.properties?.venueId;
          const v = id ? venuesRef.current.find((x) => x.id === id) : undefined;
          if (v) onSelectRef.current(v);
        });
        map.on("mouseenter", LABEL_LAYER, () => {
          map.getCanvas().style.cursor = "pointer";
        });
        map.on("mouseleave", LABEL_LAYER, () => {
          map.getCanvas().style.cursor = "";
        });
        renderMarkers(map);
      });

      map.on("moveend", () => renderMarkers(map));
      mapRef.current = map;
    };

    getMapStyle().then(start).catch(() => { if (!cancelled) setMapStatus("error"); });

    return () => {
      cancelled = true;
      initialMarkers.forEach((m) => m.remove());
      initialMarkers.clear();
      userMarkerRef.current?.remove();
      userMarkerRef.current = null;
      mapRef.current?.remove();
      mapRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const venueName = (venue: Venue) =>
    venue.chain && venue.chain !== venue.branchName ? `${venue.chain} ${venue.branchName}` : venue.branchName;

  const labelKey = (name: string, approximate: boolean) =>
    `${approximate ? "a" : "p"}:${name}`;

  function labelSprite(name: string, approximate: boolean): { key: string; image: ImageData } {
    const key = labelKey(name, approximate);
    const cached = labelSpriteCache.get(key);
    if (cached) return { key, image: cached };
    const scale = 2; // retina rendering via addImage pixelRatio
    const font = '600 11px ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, sans-serif';
    const measure = document.createElement("canvas").getContext("2d")!;
    measure.font = font;
    const MAX_TEXT = 168;
    let text = name;
    if (measure.measureText(text).width > MAX_TEXT) {
      // Truncate at a word boundary, never mid-word.
      let cut = text;
      while (cut.length > 1 && measure.measureText(cut + "\u2026").width > MAX_TEXT) {
        cut = cut.slice(0, -1);
      }
      const lastSpace = cut.lastIndexOf(" ");
      text = (lastSpace > 3 ? cut.slice(0, lastSpace) : cut) + "\u2026";
    }
    const textW = measure.measureText(text).width;
    const dotR = 2.5, padX = 7, gap = 5, padY = 3.5;
    const w = Math.ceil(padX + dotR * 2 + gap + textW + padX) + 2;
    const h = Math.ceil(11 + padY * 2) + 2;
    const c = document.createElement("canvas");
    c.width = w * scale;
    c.height = h * scale;
    const ctx = c.getContext("2d")!;
    ctx.scale(scale, scale);
    ctx.beginPath();
    ctx.roundRect(1, 1, w - 2, h - 2, (h - 2) / 2);
    ctx.fillStyle = "#1c1917";
    ctx.fill();
    ctx.lineWidth = 1;
    ctx.strokeStyle = approximate ? "#a8a29e" : "#1c1917";
    if (approximate) ctx.setLineDash([2, 2]);
    ctx.stroke();
    ctx.setLineDash([]);
    ctx.beginPath();
    ctx.arc(1 + padX + dotR, h / 2, dotR, 0, Math.PI * 2);
    ctx.fillStyle = "#34d399";
    ctx.fill();
    ctx.font = font;
    ctx.fillStyle = "#ffffff";
    ctx.textBaseline = "middle";
    ctx.fillText(text, 1 + padX + dotR * 2 + gap, h / 2 + 0.5);
    const image = ctx.getImageData(0, 0, c.width, c.height);
    labelSpriteCache.set(key, image);
    return { key, image };
  }

  // Adds the venue sprites, source and layer.
  function ensureLabelAssets(map: maplibregl.Map) {
    labelSpriteCache.forEach((image, key) => {
      if (!map.hasImage(key)) map.addImage(key, image, { pixelRatio: 2 });
    });
    if (!map.getSource(LABEL_SOURCE)) {
      map.addSource(LABEL_SOURCE, {
        type: "geojson",
        data: { type: "FeatureCollection", features: [] },
      });
    }
    if (!map.getLayer(LABEL_LAYER)) {
      map.addLayer({
        id: LABEL_LAYER,
        type: "symbol",
        source: LABEL_SOURCE,
        layout: {
          "icon-image": ["get", "icon"],
          // Per-label pixel offset clamps every nameplate inside the
          // viewport (recomputed on moveend), so panning never clips one.
          "icon-offset": ["get", "offset"],
          "icon-allow-overlap": false,
          "icon-padding": 6,
          "symbol-z-order": "viewport-y",
        },
        paint: { "icon-opacity": 1 },
      });
    }
  }

  // Selected place: full label. Everything else: a quiet dot.
  function labelElement(venue: Venue): HTMLButtonElement {
    const el = document.createElement("button");
    el.type = "button";
    el.className =
      "flex items-center gap-1.5 px-2.5 py-1.5 rounded-full text-[0.875rem] font-bold tracking-tight cursor-pointer select-none focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#2563eb] border bg-[#1a7a4a] text-white border-[#1a7a4a]";
    el.style.boxShadow = "0 1px 4px rgba(34,29,24,0.25)";
    el.style.maxWidth = "220px";
    const dot = document.createElement("span");
    dot.className = "w-2 h-2 rounded-full shrink-0 bg-white";
    const label = document.createElement("span");
    label.className = "truncate";
    label.textContent = venueName(venue);
    el.appendChild(dot);
    el.appendChild(label);
    return el;
  }

  function clusterElement(count: number, dimmed: boolean): HTMLButtonElement {
    const el = document.createElement("button");
    el.type = "button";
    el.setAttribute("aria-label", `${count} places, zoom in`);
    el.className =
      "w-11 h-11 rounded-full bg-white border-2 border-[#1a7a4a] text-[#14532d] text-[0.9375rem] font-bold flex items-center justify-center cursor-pointer select-none focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#2563eb]";
    el.style.boxShadow = "0 1px 4px rgba(34,29,24,0.3)";
    el.style.opacity = dimmed ? "0.4" : "1";
    el.textContent = String(count);
    return el;
  }

  function addMarker(map: maplibregl.Map, el: HTMLElement, lng: number, lat: number, key: string) {
    const m = new maplibregl.Marker({ element: el }).setLngLat([lng, lat]).addTo(map);
    markersRef.current.set(key, m);
  }

  function renderMarkers(map: maplibregl.Map) {
    // A full rebuild per change is cheap at this dataset size and keeps state simple.
    markersRef.current.forEach((m) => m.remove());
    markersRef.current.clear();
    const activeId = activeRef.current;
    const dimmed = !!activeId;
    const CLUSTER_PX = 36;
    const clusterable = map.getZoom() < 17;

    type Group = { x: number; y: number; members: Venue[] };
    const groups: Group[] = [];
    venuesRef.current.forEach((venue) => {
      if (venue.id === activeId) return;
      const p = map.project([venue.lng, venue.lat]);
      const near = clusterable
        ? groups.find((g) => Math.hypot(g.x - p.x, g.y - p.y) < CLUSTER_PX)
        : undefined;
      if (near) {
        const n = near.members.length;
        near.x = (near.x * n + p.x) / (n + 1);
        near.y = (near.y * n + p.y) / (n + 1);
        near.members.push(venue);
      } else {
        groups.push({ x: p.x, y: p.y, members: [venue] });
      }
    });

    const labelFeatures: GeoJSON.Feature[] = [];
    const vw = map.getContainer().clientWidth;
    const vh = map.getContainer().clientHeight;
    // Keep nameplates clear of the chrome that floats over the map: the
    // sidebar on desktop (left) and the locate/reset buttons (top-right).
    const isDesktop = window.innerWidth >= 768;
    const EDGE_L = isDesktop ? 472 : 8;
    const EDGE_R = 64;
    const EDGE_T = 8;
    const EDGE_B = 8;
    groups.forEach((g, i) => {
      if (g.members.length === 1) {
        const venue = g.members[0];
        const { key, image } = labelSprite(venueName(venue), venue.coordinateSource === "area-approximate");
        if (!map.hasImage(key)) map.addImage(key, image, { pixelRatio: 2 });
        const p = map.project([venue.lng, venue.lat]);
        const halfW = image.width / 4; // sprite is 2x, anchored center
        const halfH = image.height / 4;
        let ox = 0;
        let oy = 0;
        if (p.x + halfW > vw - EDGE_R) ox = vw - EDGE_R - (p.x + halfW);
        if (p.x - halfW < EDGE_L) ox = EDGE_L - (p.x - halfW);
        if (p.y + halfH > vh - EDGE_B) oy = vh - EDGE_B - (p.y + halfH);
        if (p.y - halfH < EDGE_T) oy = EDGE_T - (p.y - halfH);
        labelFeatures.push({
          type: "Feature",
          properties: { icon: key, venueId: venue.id, offset: [ox, oy] },
          geometry: { type: "Point", coordinates: [venue.lng, venue.lat] },
        });
      } else {
        const lng = g.members.reduce((s, v) => s + v.lng, 0) / g.members.length;
        const lat = g.members.reduce((s, v) => s + v.lat, 0) / g.members.length;
        const el = clusterElement(g.members.length, dimmed);
        el.addEventListener("click", (e) => {
          e.stopPropagation();
          const bounds = g.members.reduce(
            (b, v) => b.extend([v.lng, v.lat]),
            new maplibregl.LngLatBounds([g.members[0].lng, g.members[0].lat], [g.members[0].lng, g.members[0].lat])
          );
          map.fitBounds(bounds, { padding: 90, maxZoom: 15, duration: 500 });
        });
        addMarker(map, el, lng, lat, `cluster-${i}`);
      }
    });

    const labelSrc = map.getSource(LABEL_SOURCE) as maplibregl.GeoJSONSource | undefined;
    if (labelSrc) labelSrc.setData({ type: "FeatureCollection", features: labelFeatures });
    if (map.getLayer(LABEL_LAYER)) {
      // Selection focus: other names fade so the chosen branch stands out.
      map.setPaintProperty(LABEL_LAYER, "icon-opacity", dimmed ? 0.3 : 1);
    }

    const active = venuesRef.current.find((v) => v.id === activeId);
    if (active) {
      const el = labelElement(active);
      el.addEventListener("click", (e) => e.stopPropagation());
      addMarker(map, el, active.lng, active.lat, active.id);
    }
  }

  // Venue markers. The venues prop gets a new array identity on every
  // parent render (spread into VectorMap), so guard on the visible id set:
  // a GPS tick or hover re-render must not rebuild every marker.
  const renderedKeyRef = useRef<string>("");
  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;
    // Before the first load, the load handler renders the markers.
    if (!readyRef.current) return;
    const key = venues.map((v) => v.id).join("|") + "#" + (activeVenueId ?? "");
    if (key === renderedKeyRef.current) return;
    renderedKeyRef.current = key;
    renderMarkers(map);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [venues, activeVenueId]);

  // Selecting a place on a phone: keep the pin clear of the bottom card.
  const savedViewRef = useRef<{ center: [number, number]; zoom: number } | null>(null);
  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;
    if (!activeVenueId) {
      // Back: return to the overview the user left, not the street.
      const saved = savedViewRef.current;
      savedViewRef.current = null;
      map.easeTo({ padding: { top: 0, bottom: 0, left: 0, right: 0 }, ...(saved ? { center: saved.center, zoom: saved.zoom } : {}), duration: 400 });
      return;
    }
    if (!savedViewRef.current) {
      const c = map.getCenter();
      savedViewRef.current = { center: [c.lng, c.lat], zoom: map.getZoom() };
    }
    const v = venuesRef.current.find((x) => x.id === activeVenueId);
    if (!v) return;
    const phone = window.innerWidth < 768;
    map.easeTo({
      center: [v.lng, v.lat],
      zoom: Math.max(map.getZoom(), 14),
      // Center within the visible map area: clear of the bottom card on
      // phones, clear of the 440px side panel on desktop.
      padding: phone ? { top: 0, bottom: 200, left: 0, right: 0 } : { top: 0, bottom: 0, left: 440, right: 0 },
      duration: 500,
    });
  }, [activeVenueId]);

  // Area/activity filter change: frame every matching place, clear of the panel.
  useEffect(() => {
    const map = mapRef.current;
    if (!map || !readyRef.current || !fitTick) return;
    const vs = venuesRef.current;
    if (vs.length === 0) return;
    const bounds = new maplibregl.LngLatBounds([vs[0].lng, vs[0].lat], [vs[0].lng, vs[0].lat]);
    vs.forEach((v) => bounds.extend([v.lng, v.lat]));
    const desktop = window.innerWidth >= 768;
    map.fitBounds(bounds, {
      // Labels clamp inside the viewport on their own, so padding only
      // clears real chrome: the desktop panel and the mobile peek sheet.
      padding: desktop
        ? { top: 60, right: 60, bottom: 60, left: 464 }
        : { top: 76, bottom: 176, left: 28, right: 28 },
      maxZoom: 15,
      duration: 800,
    });
  }, [fitTick]);

  // User position marker + accuracy
  useEffect(() => {
    const map = mapRef.current;
    if (!map || !userPos) return;
    if (!showUserMarker) {
      // No real fix: no "you are here" dot at the default center.
      if (userMarkerRef.current) {
        userMarkerRef.current.remove();
        userMarkerRef.current = null;
      }
      const accSrc0 = readyRef.current ? (map.getSource("user-accuracy") as maplibregl.GeoJSONSource | undefined) : undefined;
      if (accSrc0) accSrc0.setData({ type: "FeatureCollection", features: [] });
      return;
    }
    const [lat, lng] = userPos;

    const applyUser = () => {
      const accSrc = map.getSource("user-accuracy") as maplibregl.GeoJSONSource | undefined;
      if (accSrc) {
        if (userAccuracy && userAccuracy > 20 && userAccuracy < 2000) {
          accSrc.setData(accuracyPolygon(lat, lng, userAccuracy));
        } else {
          accSrc.setData({ type: "FeatureCollection", features: [] });
        }
      }

      if (!userMarkerRef.current) {
        const el = document.createElement("div");
        el.className = "relative flex items-center justify-center w-7 h-7";
        const dot = document.createElement("div");
        dot.className = "relative w-4 h-4 rounded-full bg-[#2563eb] border-2 border-white";
        dot.style.boxShadow = "0 1px 4px rgba(34,29,24,0.4)";
        el.appendChild(dot);
        userMarkerRef.current = new maplibregl.Marker({ element: el }).setLngLat([lng, lat]).addTo(map);
      } else {
        userMarkerRef.current.setLngLat([lng, lat]);
      }
    };

    if (readyRef.current) applyUser();
    else map.once("load", applyUser);
    return () => { map.off("load", applyUser); };
  }, [userPos, showUserMarker, userAccuracy, mapStatus]);

  // Manual recenter
  useEffect(() => {
    const map = mapRef.current;
    if (!map || !readyRef.current || !userPos || !recenterTick) return;
    map.easeTo({ center: [userPos[1], userPos[0]], zoom: 15, duration: 800 });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [recenterTick]);

  return (
    <div
      style={{ position: "absolute", inset: 0, backgroundColor: "#f5f5f4" }}
    >
      <div ref={containerRef} style={{ position: "absolute", inset: 0 }} />
      {mapStatus !== "ready" && (
        <div role={mapStatus === "error" ? "alert" : "status"} className="absolute inset-0 flex items-center justify-center pointer-events-none bg-[#f6f3ec]" style={{ backgroundColor: "#f6f3ec", color: "#51483d" }}>
          <div className="text-center px-6 pb-64">
            {mapStatus === "loading" ? <><span className="inline-block w-6 h-6 border-2 border-current border-t-transparent rounded-full animate-spin" /><p>Loading map. You can browse the place list.</p></> : <p>Map could not load. You can still browse places and open Directions.</p>}
          </div>
        </div>
      )}
    </div>
  );
}

// Trailing sentinel: absorbs the web editor last-line indent artifact.
