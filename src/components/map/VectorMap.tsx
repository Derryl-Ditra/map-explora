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

  function markerElement(venue: Venue, isActive: boolean): HTMLButtonElement {
    const el = document.createElement("button");
    el.type = "button";
    const approximate = venue.coordinateSource === "area-approximate";
    el.className = "flex items-center gap-1.5 px-2.5 py-1.5 rounded-full text-[0.875rem] font-semibold tracking-tight transition-all cursor-pointer select-none focus:outline-none border max-w-[160px] " + (
      isActive
        ? "bg-[#1a7a4a] text-white border-[#1a7a4a] scale-110 font-bold"
        : approximate
        ? "bg-white/90 text-[#6d675f] border-[#6d675f] border-dashed hover:text-[#221d18]"
        : "bg-white/95 text-[#221d18] border-[#e7e0d4] hover:border-[#1a7a4a]"
    );
    el.style.boxShadow = "0 1px 4px rgba(34,29,24,0.25)";
    const dot = document.createElement("span");
    dot.className = "w-2 h-2 rounded-full shrink-0 " + (isActive ? "bg-white" : approximate ? "bg-[#6d675f]" : "bg-[#1a7a4a]");
    const label = document.createElement("span");
    label.className = "truncate";
    label.textContent = venue.chain && venue.chain !== venue.branchName ? `${venue.chain} ${venue.branchName}` : venue.branchName;
    el.appendChild(dot);
    el.appendChild(label);
    return el;
  }

  function renderMarkers(map: maplibregl.Map) {
    // A full rebuild per change is cheap at this dataset size and keeps state simple.
    markersRef.current.forEach((m) => m.remove());
    markersRef.current.clear();
    venuesRef.current.forEach((venue) => {
      const el = markerElement(venue, venue.id === activeRef.current);
      el.addEventListener("click", (e) => {
        e.stopPropagation();
        onSelectRef.current(venue);
      });
      const m = new maplibregl.Marker({ element: el })
        .setLngLat([venue.lng, venue.lat])
        .addTo(map);
      markersRef.current.set(venue.id, m);
    });
  }

  // Venue markers
  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;
    if (!map.isStyleLoaded()) {
      map.once("load", () => renderMarkers(map));
      return;
    }
    renderMarkers(map);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [venues, activeVenueId]);

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
        map.fitBounds(bounds, {
          padding: isNavigating
            ? { top: 110, bottom: 150, left: 24, right: 24 }
            : { top: 80, bottom: 300, left: 40, right: 40 },
          maxZoom: 16,
          duration: 600,
        });
      } else {
        src.setData({ type: "FeatureCollection", features: [] });
      }
    };
    if (map.isStyleLoaded() && map.getSource("route")) apply();
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
