"use client";

import { useEffect, useRef, useState } from "react";
import {
  Map as MapLibreMap,
  Marker,
  NavigationControl,
  LngLatBounds,
  GeoJSONSource,
} from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import { ChargingStation } from "@/types/station";
import { RouteData } from "@/types/route";

interface VectorMapProps {
  stations: ChargingStation[];
  activeStationId: string | null;
  onSelectStation: (station: ChargingStation) => void;
  userPos: [number, number] | null; // [lat, lng]
  route: RouteData | null;
  mapStyle?: "dark" | "bright" | "liberty";
}

const STYLE_URLS = {
  dark: "https://tiles.openfreemap.org/styles/dark",
  bright: "https://tiles.openfreemap.org/styles/bright",
  liberty: "https://tiles.openfreemap.org/styles/liberty",
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
  const [mapLoaded, setMapLoaded] = useState(false);

  // Initialize map
  useEffect(() => {
    if (!mapContainerRef.current) return;

    const map = new MapLibreMap({
      container: mapContainerRef.current,
      style: STYLE_URLS[mapStyle],
      center: [106.8271, -6.1751], // Jakarta center in [lng, lat]
      zoom: 12,
      attributionControl: false,
    });

    map.addControl(new NavigationControl({ showCompass: true }), "top-right");

    map.on("load", () => {
      mapRef.current = map;
      setMapLoaded(true);

      // Add route GeoJSON source and layer
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
          "line-opacity": 0.35,
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
    });

    return () => {
      map.remove();
      mapRef.current = null;
    };
  }, [mapStyle]);

  // Update user position marker
  useEffect(() => {
    if (!mapRef.current || !userPos) return;

    const [lat, lng] = userPos;

    if (!userMarkerRef.current) {
      const el = document.createElement("div");
      el.className = "relative flex items-center justify-center w-6 h-6";
      el.innerHTML = `
        <div class="absolute w-6 h-6 rounded-full bg-cyan-400/20 animate-ping"></div>
        <div class="relative w-3.5 h-3.5 rounded-full bg-cyan-400 border-2 border-white shadow-lg"></div>
      `;

      userMarkerRef.current = new Marker({ element: el })
        .setLngLat([lng, lat])
        .addTo(mapRef.current);
    } else {
      userMarkerRef.current.setLngLat([lng, lat]);
    }
  }, [userPos, mapLoaded]);

  // Update station markers
  useEffect(() => {
    if (!mapRef.current || !mapLoaded) return;

    const currentMap = mapRef.current;
    const currentMarkerIds = new Set(stations.map((s) => s.id));

    // Remove markers that are no longer in the filtered list
    markersRef.current.forEach((marker, id) => {
      if (!currentMarkerIds.has(id)) {
        marker.remove();
        markersRef.current.delete(id);
      }
    });

    // Add or update markers
    stations.forEach((station) => {
      const isActive = station.id === activeStationId;
      const isDenza = station.denza_approved;
      const isFast = station.kw >= 100;

      let marker = markersRef.current.get(station.id);

      if (!marker) {
        const el = document.createElement("button");
        el.type = "button";
        el.className = `group transition-transform active:scale-95 cursor-pointer select-none focus:outline-none`;

        marker = new Marker({ element: el })
          .setLngLat([station.lng, station.lat])
          .addTo(currentMap);

        el.addEventListener("click", (e) => {
          e.stopPropagation();
          onSelectStation(station);
        });

        markersRef.current.set(station.id, marker);
      }

      // Update marker element styling
      const el = marker.getElement();
      el.innerHTML = `
        <div class="relative flex items-center gap-1.5 px-2 py-1 rounded-full text-[11px] font-semibold tracking-tight shadow-2xl transition-all ${
          isActive
            ? "bg-white text-zinc-950 ring-4 ring-cyan-400/50 scale-110 z-30"
            : isDenza
            ? "bg-zinc-900/90 text-cyan-300 border border-cyan-500/40 hover:border-cyan-400 hover:scale-105"
            : "bg-zinc-900/80 text-zinc-400 border border-zinc-700/50 hover:text-white"
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
  }, [stations, activeStationId, onSelectStation, mapLoaded]);

  // Update Route Polyline
  useEffect(() => {
    if (!mapRef.current || !mapLoaded) return;

    const source = mapRef.current.getSource("route-source") as GeoJSONSource;
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
      mapRef.current.fitBounds(bounds, {
        padding: { top: 80, bottom: 260, left: 40, right: 40 },
        maxZoom: 15,
        duration: 1200,
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
  }, [route, mapLoaded]);

  return (
    <div className="relative w-full h-full bg-zinc-950">
      <div ref={mapContainerRef} className="w-full h-full" />
    </div>
  );
}
