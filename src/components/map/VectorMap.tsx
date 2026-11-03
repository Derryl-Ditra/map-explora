"use client";

import { useEffect, useRef } from "react";
import * as maplibregl from "maplibre-gl";

// Turbopack's worker bundling breaks under static export; serve the worker as a static asset.
if (typeof window !== "undefined") {
  const base = process.env.NODE_ENV === "production" ? "/map-explora" : "";
  maplibregl.setWorkerUrl(`${base}/maplibre-worker.js`);
}
import "maplibre-gl/dist/maplibre-gl.css";
import { Venue } from "@/types/venue";
import { RouteData } from "@/types/route";
import { getMonoStyle, FALLBACK_STYLE_URL } from "./vectorStyle";

interface VectorMapProps {
  venues: Venue[];
  activeVenueId: string | null;
  onSelectVenue: (venue: Venue) => void;
  userPos: [number, number] | null; // [lat, lng]
  showUserMarker?: boolean; // only with a real location fix, never the default center
  userAccuracy: number | null;      // meters
  userHeading: number | null;       // degrees, when the device provides it
  route: RouteData | null;
  mapStyle?: "dark" | "light";
  recenterTick?: number;
  isNavigating?: boolean;
  followUser?: boolean;
  onUserPan?: () => void;
}

const JAKARTA: [number, number] = [106.8456, -6.2088]; // maplibre is lng,lat

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
  userHeading,
  route,
  mapStyle = "dark",
  recenterTick,
  isNavigating = false,
  followUser = false,
  onUserPan,
}: VectorMapProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<maplibregl.Map | null>(null);
  const markersRef = useRef<Map<string, maplibregl.Marker>>(new Map());
  const userMarkerRef = useRef<maplibregl.Marker | null>(null);
  const readyRef = useRef(false);
  const styleModeRef = useRef<"dark" | "light" | null>(null);
  const venuesRef = useRef(venues);
  venuesRef.current = venues;
  const activeRef = useRef(activeVenueId);
  activeRef.current = activeVenueId;
  const onSelectRef = useRef(onSelectVenue);
  onSelectRef.current = onSelectVenue;
  const onUserPanRef = useRef(onUserPan);
  onUserPanRef.current = onUserPan;

  // Create map once
  useEffect(() => {
    const container = containerRef.current;
    if (!container || mapRef.current) return;

    let cancelled = false;
    const initial = userPos ? [userPos[1], userPos[0]] as [number, number] : JAKARTA;

    const start = (style: any) => {
      if (cancelled || mapRef.current) return;
      const map = new maplibregl.Map({
        container,
        style,
        center: initial,
        zoom: 13,
        attributionControl: { compact: true },
      });
      styleModeRef.current = mapStyle;

      map.on("load", () => {
        readyRef.current = true;
        map.addSource("route", {
          type: "geojson",
          data: { type: "FeatureCollection", features: [] },
        });
        map.addLayer({
          id: "route-glow",
          type: "line",
          source: "route",
          layout: { "line-cap": "round", "line-join": "round" },
          paint: { "line-color": "#2563eb", "line-width": 8, "line-opacity": 0.25 },
        });
        map.addLayer({
          id: "route-line",
          type: "line",
          source: "route",
          layout: { "line-cap": "round", "line-join": "round" },
          paint: { "line-color": "#2563eb", "line-width": 4.5, "line-opacity": 0.95 },
        });
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
        renderMarkers(map);
      });

      map.on("zoomend", () => renderMarkers(map));
      map.on("dragstart", () => onUserPanRef.current?.());
      mapRef.current = map;
    };

    getMonoStyle(mapStyle).then(start).catch(() => start(FALLBACK_STYLE_URL[mapStyle]));

    return () => {
      cancelled = true;
      markersRef.current.forEach((m) => m.remove());
      markersRef.current.clear();
      userMarkerRef.current?.remove();
      userMarkerRef.current = null;
      mapRef.current?.remove();
      mapRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Switch monochrome style on mode toggle
  useEffect(() => {
    const map = mapRef.current;
    if (!map || styleModeRef.current === mapStyle) return;
    let cancelled = false;
    getMonoStyle(mapStyle)
      .then((style) => {
        if (cancelled) return;
        styleModeRef.current = mapStyle;
        map.setStyle(style);
        map.once("styledata", () => {
          // Re-add custom sources/layers after style swap
          if (!map.getSource("route")) {
            map.addSource("route", { type: "geojson", data: { type: "FeatureCollection", features: [] } });
            map.addLayer({ id: "route-glow", type: "line", source: "route", layout: { "line-cap": "round", "line-join": "round" }, paint: { "line-color": "#2563eb", "line-width": 8, "line-opacity": 0.25 } });
            map.addLayer({ id: "route-line", type: "line", source: "route", layout: { "line-cap": "round", "line-join": "round" }, paint: { "line-color": "#2563eb", "line-width": 4.5, "line-opacity": 0.95 } });
          }
          if (!map.getSource("user-accuracy")) {
            map.addSource("user-accuracy", { type: "geojson", data: { type: "FeatureCollection", features: [] } });
            map.addLayer({ id: "user-accuracy-fill", type: "fill", source: "user-accuracy", paint: { "fill-color": "#2563eb", "fill-opacity": 0.10 } });
            map.addLayer({ id: "user-accuracy-edge", type: "line", source: "user-accuracy", paint: { "line-color": "#2563eb", "line-width": 1, "line-opacity": 0.3 } });
          }
        });
      })
      .catch(() => {
        styleModeRef.current = mapStyle;
        map.setStyle(FALLBACK_STYLE_URL[mapStyle]);
      });
    return () => { cancelled = true; };
  }, [mapStyle]);

  const venueName = (venue: Venue) =>
    venue.chain && venue.chain !== venue.branchName ? `${venue.chain} ${venue.branchName}` : venue.branchName;

  // Selected place: full label. Everything else: a quiet dot.
  function labelElement(venue: Venue): HTMLButtonElement {
    const el = document.createElement("button");
    el.type = "button";
    el.className =
      "flex items-center gap-1.5 px-2.5 py-1.5 rounded-full text-[0.875rem] font-bold tracking-tight cursor-pointer select-none focus:outline-none border bg-[#1a7a4a] text-white border-[#1a7a4a]";
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

  function dotElement(venue: Venue, dimmed: boolean): HTMLButtonElement {
    const el = document.createElement("button");
    el.type = "button";
    el.setAttribute("aria-label", venueName(venue));
    const approximate = venue.coordinateSource === "area-approximate";
    // 32 px tap target around a 14 px dot.
    el.className = "w-8 h-8 flex items-center justify-center cursor-pointer select-none focus:outline-none";
    el.style.opacity = dimmed ? "0.4" : "1";
    const dot = document.createElement("span");
    dot.className =
      "w-3.5 h-3.5 rounded-full border-2 " +
      (approximate ? "bg-white border-[#6d675f] border-dashed" : "bg-[#1a7a4a] border-white");
    dot.style.boxShadow = "0 1px 4px rgba(34,29,24,0.4)";
    el.appendChild(dot);
    return el;
  }

  function clusterElement(count: number, dimmed: boolean): HTMLButtonElement {
    const el = document.createElement("button");
    el.type = "button";
    el.setAttribute("aria-label", `${count} places, zoom in`);
    el.className =
      "w-10 h-10 rounded-full bg-white border-2 border-[#1a7a4a] text-[#14532d] text-[0.9375rem] font-bold flex items-center justify-center cursor-pointer select-none focus:outline-none";
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

    groups.forEach((g, i) => {
      if (g.members.length === 1) {
        const venue = g.members[0];
        const el = dotElement(venue, dimmed);
        el.addEventListener("click", (e) => {
          e.stopPropagation();
          onSelectRef.current(venue);
        });
        addMarker(map, el, venue.lng, venue.lat, venue.id);
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
          map.fitBounds(bounds, { padding: 90, maxZoom: 17, duration: 500 });
        });
        addMarker(map, el, lng, lat, `cluster-${i}`);
      }
    });

    const active = venuesRef.current.find((v) => v.id === activeId);
    if (active) {
      const el = labelElement(active);
      el.addEventListener("click", (e) => e.stopPropagation());
      addMarker(map, el, active.lng, active.lat, active.id);
    }
  }

  // Venue markers
  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;
    // Before the first load, the load handler renders the markers.
    if (!readyRef.current) return;
    renderMarkers(map);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [venues, activeVenueId]);

  // Selecting a place on a phone: keep the pin clear of the bottom card.
  useEffect(() => {
    const map = mapRef.current;
    if (!map || isNavigating) return;
    if (!activeVenueId) {
      map.easeTo({ padding: { top: 0, bottom: 0, left: 0, right: 0 }, duration: 300 });
      return;
    }
    const v = venuesRef.current.find((x) => x.id === activeVenueId);
    if (!v) return;
    const phone = window.innerWidth < 768;
    map.easeTo({
      center: [v.lng, v.lat],
      zoom: Math.max(map.getZoom(), 14),
      padding: phone ? { top: 0, bottom: 200, left: 0, right: 0 } : { top: 0, bottom: 0, left: 0, right: 0 },
      duration: 500,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeVenueId, isNavigating]);

  // Route line
  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;
    const apply = () => {
      const src = map.getSource("route") as maplibregl.GeoJSONSource | undefined;
      if (!src) return;
      if (route && route.geometry.length > 0) {
        src.setData({
          type: "Feature",
          properties: {},
          geometry: { type: "LineString", coordinates: route.geometry },
        });
        const bounds = route.geometry.reduce(
          (b, [lng, lat]) => b.extend([lng, lat]),
          new maplibregl.LngLatBounds(route.geometry[0], route.geometry[0])
        );
        // Fit only while navigating: after Exit the selection effect recenters.
        if (isNavigating) map.fitBounds(bounds, {
          padding: isNavigating
            ? { top: 190, bottom: 150, left: 110, right: 110 }
            : { top: 80, bottom: 300, left: 110, right: 110 },
          maxZoom: 16,
          duration: 600,
        });
      } else {
        src.setData({ type: "FeatureCollection", features: [] });
      }
    };
    if (map.getSource("route")) apply();
    else map.once("load", apply);
  }, [route, isNavigating]);

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
      const accSrc0 = map.isStyleLoaded() ? (map.getSource("user-accuracy") as maplibregl.GeoJSONSource | undefined) : undefined;
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
        const cone = document.createElement("div");
        cone.className = "user-heading-cone";
        const dot = document.createElement("div");
        dot.className = "relative w-4 h-4 rounded-full bg-[#2563eb] border-2 border-white";
        dot.style.boxShadow = "0 1px 4px rgba(34,29,24,0.4)";
        el.appendChild(cone);
        el.appendChild(dot);
        userMarkerRef.current = new maplibregl.Marker({ element: el }).setLngLat([lng, lat]).addTo(map);
      } else {
        userMarkerRef.current.setLngLat([lng, lat]);
      }

      const cone = userMarkerRef.current.getElement().querySelector<HTMLElement>(".user-heading-cone");
      if (cone) {
        if (userHeading !== null) {
          cone.style.display = "block";
          cone.style.transform = `rotate(${userHeading}deg)`;
        } else {
          cone.style.display = "none";
        }
      }
    };

    if (map.isStyleLoaded()) applyUser();
    else map.once("load", applyUser);

    if (isNavigating && followUser) {
      map.easeTo({ center: [lng, lat], duration: 500 });
    }
  }, [userPos, showUserMarker, userAccuracy, userHeading, isNavigating, followUser]);

  // Manual recenter
  useEffect(() => {
    const map = mapRef.current;
    if (!map || !userPos || !recenterTick) return;
    map.easeTo({ center: [userPos[1], userPos[0]], zoom: 15, duration: 800 });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [recenterTick]);

  return (
    <div
      style={{ position: "absolute", inset: 0, backgroundColor: mapStyle === "dark" ? "#0d0d0d" : "#f5f5f4" }}
    >
      <div ref={containerRef} style={{ position: "absolute", inset: 0 }} />
    </div>
  );
}
