"use client";

import { useEffect, useRef } from "react";
import * as maplibregl from "maplibre-gl";

// Turbopack's worker bundling breaks under static export; serve the worker as a static asset.
if (typeof window !== "undefined") {
  const base = process.env.NODE_ENV === "production" ? "/map-explora" : "";
  maplibregl.setWorkerUrl(`${base}/maplibre-worker.js`);
}
import "maplibre-gl/dist/maplibre-gl.css";
import { ChargingStation } from "@/types/station";
import { RouteData } from "@/types/route";
import { getMonoStyle, FALLBACK_STYLE_URL } from "./vectorStyle";

interface VectorMapProps {
  stations: ChargingStation[];
  activeStationId: string | null;
  onSelectStation: (station: ChargingStation) => void;
  userPos: [number, number] | null; // [lat, lng]
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
  stations,
  activeStationId,
  onSelectStation,
  userPos,
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
  const stationsRef = useRef(stations);
  stationsRef.current = stations;
  const activeRef = useRef(activeStationId);
  activeRef.current = activeStationId;
  const onSelectRef = useRef(onSelectStation);
  onSelectRef.current = onSelectStation;
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
          paint: { "line-color": "#22d3ee", "line-width": 8, "line-opacity": 0.35 },
        });
        map.addLayer({
          id: "route-line",
          type: "line",
          source: "route",
          layout: { "line-cap": "round", "line-join": "round" },
          paint: { "line-color": "#0891b2", "line-width": 4, "line-opacity": 0.95 },
        });
        map.addSource("user-accuracy", {
          type: "geojson",
          data: { type: "FeatureCollection", features: [] },
        });
        map.addLayer({
          id: "user-accuracy-fill",
          type: "fill",
          source: "user-accuracy",
          paint: { "fill-color": "#22d3ee", "fill-opacity": 0.12 },
        });
        map.addLayer({
          id: "user-accuracy-edge",
          type: "line",
          source: "user-accuracy",
          paint: { "line-color": "#22d3ee", "line-width": 1, "line-opacity": 0.3 },
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
            map.addLayer({ id: "route-glow", type: "line", source: "route", layout: { "line-cap": "round", "line-join": "round" }, paint: { "line-color": "#22d3ee", "line-width": 8, "line-opacity": 0.35 } });
            map.addLayer({ id: "route-line", type: "line", source: "route", layout: { "line-cap": "round", "line-join": "round" }, paint: { "line-color": "#0891b2", "line-width": 4, "line-opacity": 0.95 } });
          }
          if (!map.getSource("user-accuracy")) {
            map.addSource("user-accuracy", { type: "geojson", data: { type: "FeatureCollection", features: [] } });
            map.addLayer({ id: "user-accuracy-fill", type: "fill", source: "user-accuracy", paint: { "fill-color": "#22d3ee", "fill-opacity": 0.12 } });
            map.addLayer({ id: "user-accuracy-edge", type: "line", source: "user-accuracy", paint: { "line-color": "#22d3ee", "line-width": 1, "line-opacity": 0.3 } });
          }
        });
      })
      .catch(() => {
        styleModeRef.current = mapStyle;
        map.setStyle(FALLBACK_STYLE_URL[mapStyle]);
      });
    return () => { cancelled = true; };
  }, [mapStyle]);

  function markerElement(station: ChargingStation, isActive: boolean): HTMLButtonElement {
    const el = document.createElement("button");
    el.type = "button";
    const isFast = station.kw >= 100;
    el.className = "flex items-center gap-1.5 px-2 py-1 rounded-full text-[11px] font-semibold tracking-tight transition-all cursor-pointer select-none focus:outline-none border " + (
      isActive
        ? "bg-white text-zinc-950 border-white scale-110 font-bold"
        : "bg-zinc-950/90 text-zinc-300 border-zinc-700 hover:text-white hover:border-zinc-400"
    );
    el.style.boxShadow = "0 1px 4px rgba(0,0,0,0.45)";
    const dot = document.createElement("span");
    dot.className = "w-1.5 h-1.5 rounded-full " + (isFast ? "bg-cyan-400" : "bg-zinc-500");
    const label = document.createElement("span");
    label.textContent = `${station.kw}kW`;
    el.appendChild(dot);
    el.appendChild(label);
    if (station.denza_approved) {
      const tag = document.createElement("span");
      tag.className = "text-[9px] px-1 rounded bg-zinc-800 text-zinc-300 uppercase font-mono font-bold";
      tag.textContent = "D9";
      el.appendChild(tag);
    }
    return el;
  }

  function renderMarkers(map: maplibregl.Map) {
    // 19 stations: a full rebuild per change is cheap and keeps state simple.
    markersRef.current.forEach((m) => m.remove());
    markersRef.current.clear();
    stationsRef.current.forEach((station) => {
      const el = markerElement(station, station.id === activeRef.current);
      el.addEventListener("click", (e) => {
        e.stopPropagation();
        onSelectRef.current(station);
      });
      const m = new maplibregl.Marker({ element: el })
        .setLngLat([station.lng, station.lat])
        .addTo(map);
      markersRef.current.set(station.id, m);
    });
  }

  // Station markers
  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;
    if (!map.isStyleLoaded()) {
      map.once("load", () => renderMarkers(map));
      return;
    }
    renderMarkers(map);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stations, activeStationId]);

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
        dot.className = "relative w-4 h-4 rounded-full bg-cyan-400 border-2 border-white";
        dot.style.boxShadow = "0 1px 4px rgba(0,0,0,0.5)";
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
  }, [userPos, userAccuracy, userHeading, isNavigating, followUser]);

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
