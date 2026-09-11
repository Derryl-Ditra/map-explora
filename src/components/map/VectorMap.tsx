"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import {
  Map as MapLibreMap,
  Marker,
  NavigationControl,
  LngLatBounds,
  GeoJSONSource,
} from "maplibre-gl";
import { ChargingStation } from "@/types/station";
import { RouteData } from "@/types/route";

interface VectorMapProps {
  stations: ChargingStation[];
  activeStationId: string | null;
  onSelectStation: (station: ChargingStation) => void;
  userPos: [number, number] | null; // [lat, lng]
  route: RouteData | null;
  mapStyle?: "dark" | "bright";
}

// Carto vector styles (Reliable, high uptime, zero API key)
const PRIMARY_STYLES = {
  dark: "https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json",
  bright: "https://basemaps.cartocdn.com/gl/positron-gl-style/style.json",
};

// OpenFreeMap fallback vector style
const FALLBACK_STYLES = {
  dark: "https://tiles.openfreemap.org/styles/dark",
  bright: "https://tiles.openfreemap.org/styles/bright",
};

export default function VectorMap({
  stations,
  activeStationId,
  onSelectStation,
  userPos,
  route,
  mapStyle = "dark",
}: VectorMapProps) {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<MapLibreMap | null>(null);
  const markersRef = useRef<Map<string, Marker>>(new Map());
  const userMarkerRef = useRef<Marker | null>(null);
  const [isReady, setIsReady] = useState(false);
  const isReadyRef = useRef(false);

  const initMapLayers = useCallback((map: MapLibreMap) => {
    if (!map.getSource("route-source")) {
      map.addSource("route-source", {
        type: "geojson",
        data: {
          type: "Feature",
          properties: {},
          geometry: {
            type: "LineString",
            coordinates: [],
          },
        },
      });

      map.addLayer({
        id: "route-glow",
        type: "line",
        source: "route-source",
        layout: {
          "line-join": "round",
          "line-cap": "round",
        },
        paint: {
          "line-color": "#38bdf8",
          "line-width": 8,
          "line-opacity": 0.4,
          "line-blur": 3,
        },
      });

      map.addLayer({
        id: "route-line",
        type: "line",
        source: "route-source",
        layout: {
          "line-join": "round",
          "line-cap": "round",
        },
        paint: {
          "line-color": "#0284c7",
          "line-width": 4,
          "line-opacity": 0.95,
        },
      });
    }
  }, []);

  // Initialize Map
  useEffect(() => {
    const container = mapContainerRef.current;
    if (!container) return;

    let isDisposed = false;
    isReadyRef.current = false;
    let hasFallenBack = false;

    const map = new MapLibreMap({
      container,
      style: PRIMARY_STYLES[mapStyle],
      center: [106.8271, -6.1751], // Jakarta [lng, lat]
      zoom: 12,
      attributionControl: false,
      trackResize: true,
    });

    map.addControl(new NavigationControl({ showCompass: true }), "top-right");

    const onStyleReady = () => {
      if (isDisposed) return;
      initMapLayers(map);
      isReadyRef.current = true;
      setIsReady(true);
      map.resize();
    };

    // style.load fires fast as soon as the style JSON is parsed
    map.on("style.load", onStyleReady);
    map.on("load", onStyleReady);

    // Fallback if primary tile server fails
    map.on("error", (e) => {
      console.warn("MapLibre tile/style warning:", e);
      if (!hasFallenBack && !isDisposed && e.error) {
        hasFallenBack = true;
        try {
          map.setStyle(FALLBACK_STYLES[mapStyle]);
          map.once("style.load", () => {
            if (!isDisposed) initMapLayers(map);
          });
        } catch {
          // Ignore fallback errors
        }
      }
    });

    // Handle container resize & orientation changes
    const resizeObserver = new ResizeObserver(() => {
      if (!isDisposed && mapRef.current) {
        mapRef.current.resize();
      }
    });
    resizeObserver.observe(container);

    // Force map resize at intervals to guarantee canvas sizing
    const timers = [
      setTimeout(() => map.resize(), 50),
      setTimeout(() => map.resize(), 200),
      setTimeout(() => map.resize(), 600),
      setTimeout(() => map.resize(), 1200),
    ];

    mapRef.current = map;

    return () => {
      isDisposed = true;
      timers.forEach(clearTimeout);
      resizeObserver.disconnect();
      map.remove();
      mapRef.current = null;
    };
  }, [mapStyle, initMapLayers]);

  // Update User Location Marker
  useEffect(() => {
    const map = mapRef.current;
    if (!map || !userPos) return;

    const [lat, lng] = userPos;

    if (!userMarkerRef.current) {
      const el = document.createElement("div");
      el.className = "relative flex items-center justify-center w-7 h-7";
      el.innerHTML = `
        <div class="absolute w-7 h-7 rounded-full bg-cyan-400/25 animate-ping"></div>
        <div class="relative w-4 h-4 rounded-full bg-cyan-400 border-2 border-white shadow-xl"></div>
      `;

      userMarkerRef.current = new Marker({ element: el })
        .setLngLat([lng, lat])
        .addTo(map);
    } else {
      userMarkerRef.current.setLngLat([lng, lat]);
    }
  }, [userPos, isReady]);

  // Update Station Markers
  useEffect(() => {
    const map = mapRef.current;
    if (!map || !isReady) return;

    const currentMarkerIds = new Set(stations.map((s) => s.id));

    // Remove markers that are filtered out
    markersRef.current.forEach((marker, id) => {
      if (!currentMarkerIds.has(id)) {
        marker.remove();
        markersRef.current.delete(id);
      }
    });

    // Add or update visible markers
    stations.forEach((station) => {
      const isActive = station.id === activeStationId;
      const isDenza = station.denza_approved;
      const isFast = station.kw >= 100;

      let marker = markersRef.current.get(station.id);

      if (!marker) {
        const el = document.createElement("button");
        el.type = "button";
        el.className = "group transition-transform active:scale-95 cursor-pointer select-none focus:outline-none";

        marker = new Marker({ element: el })
          .setLngLat([station.lng, station.lat])
          .addTo(map);

        el.addEventListener("click", (e) => {
          e.stopPropagation();
          onSelectStation(station);
        });

        markersRef.current.set(station.id, marker);
      }

      // Marker element styling
      const el = marker.getElement();
      el.innerHTML = `
        <div class="relative flex items-center gap-1.5 px-2 py-1 rounded-full text-[11px] font-semibold tracking-tight shadow-2xl transition-all ${
          isActive
            ? "bg-white text-zinc-950 ring-4 ring-cyan-400/50 scale-110 z-30 font-bold"
            : isDenza
            ? "bg-zinc-900/95 text-cyan-300 border border-cyan-500/50 hover:border-cyan-400 hover:scale-105"
            : "bg-zinc-900/85 text-zinc-400 border border-zinc-700/60 hover:text-white"
        }">
          <span class="w-1.5 h-1.5 rounded-full ${
            isFast ? "bg-cyan-400 animate-pulse" : isDenza ? "bg-emerald-400" : "bg-zinc-500"
          }"></span>
          <span>${station.kw}kW</span>
          ${
            isDenza
              ? `<span class="text-[9px] px-1 py-0.2 rounded bg-cyan-950 text-cyan-400 uppercase font-mono font-bold">D9</span>`
              : ""
          }
        </div>
      `;
    });
  }, [stations, activeStationId, onSelectStation, isReady]);

  // Update Route Polyline
  useEffect(() => {
    const map = mapRef.current;
    if (!map || !isReady) return;

    const source = map.getSource("route-source") as GeoJSONSource;
    if (!source) return;

    if (route && route.geometry && route.geometry.length > 0) {
      source.setData({
        type: "Feature",
        properties: {},
        geometry: {
          type: "LineString",
          coordinates: route.geometry,
        },
      });

      // Fit bounds to show route
      const bounds = new LngLatBounds();
      route.geometry.forEach((coord) => bounds.extend(coord));
      map.fitBounds(bounds, {
        padding: { top: 70, bottom: 260, left: 30, right: 30 },
        maxZoom: 15,
        duration: 900,
      });
    } else {
      source.setData({
        type: "Feature",
        properties: {},
        geometry: {
          type: "LineString",
          coordinates: [],
        },
      });
    }
  }, [route, isReady]);

  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "#09090b",
      }}
    >
      <div
        ref={mapContainerRef}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
        }}
      />
    </div>
  );
}
