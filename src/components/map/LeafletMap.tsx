"use client";

import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { ChargingStation } from "@/types/station";
import { RouteData } from "@/types/route";

interface LeafletMapProps {
  stations: ChargingStation[];
  activeStationId: string | null;
  onSelectStation: (station: ChargingStation) => void;
  userPos: [number, number] | null; // [lat, lng]
  route: RouteData | null;
  mapStyle?: "dark" | "bright";
  locateTrigger?: number;
  isNavigating?: boolean;
}

export default function LeafletMap({
  stations,
  activeStationId,
  onSelectStation,
  userPos,
  route,
  mapStyle = "dark",
  locateTrigger,
  isNavigating = false,
}: LeafletMapProps) {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<L.Map | null>(null);
  const tileLayerRef = useRef<L.TileLayer | null>(null);
  const markersRef = useRef<Map<string, L.Marker>>(new Map());
  const userMarkerRef = useRef<L.Marker | null>(null);
  const routeLineRef = useRef<L.Polyline | null>(null);
  const routeGlowRef = useRef<L.Polyline | null>(null);

  useEffect(() => {
    const container = mapContainerRef.current;
    if (!container || mapRef.current) return;

    const map = L.map(container, {
      center: userPos || [-6.2088, 106.8456],
      zoom: 13,
      zoomControl: false,
      attributionControl: false,
    });

    // CartoDB Dark Matter / Positron - 100% Free, Clean, Minimalist, Zero Garish Colors
    const tileUrl =
      mapStyle === "dark"
        ? "https://{s}.basemaps.cartocdn.com/rastertiles/dark_all/{z}/{x}/{y}{r}.png"
        : "https://{s}.basemaps.cartocdn.com/rastertiles/light_all/{z}/{x}/{y}{r}.png";

    const tileLayer = L.tileLayer(tileUrl, {
      subdomains: ["a", "b", "c", "d"],
      maxZoom: 20,
      keepBuffer: 6,
      attribution: "&copy; OpenStreetMap &copy; CARTO",
    });

    tileLayer.addTo(map);
    tileLayerRef.current = tileLayer;
    mapRef.current = map;

    // Force invalidateSize to guarantee rendering in dynamic Next.js containers
    const timers = [
      setTimeout(() => map.invalidateSize(), 50),
      setTimeout(() => map.invalidateSize(), 200),
      setTimeout(() => map.invalidateSize(), 600),
      setTimeout(() => map.invalidateSize(), 1200),
    ];

    const resizeObserver = new ResizeObserver(() => {
      map.invalidateSize();
    });
    resizeObserver.observe(container);

    return () => {
      timers.forEach(clearTimeout);
      resizeObserver.disconnect();
      map.remove();
      mapRef.current = null;
    };
  }, []);

  // Update Tile Layer URL on Theme Switch
  useEffect(() => {
    const tileLayer = tileLayerRef.current;
    if (!tileLayer) return;

    const nextUrl =
      mapStyle === "dark"
        ? "https://{s}.basemaps.cartocdn.com/rastertiles/dark_all/{z}/{x}/{y}{r}.png"
        : "https://{s}.basemaps.cartocdn.com/rastertiles/light_all/{z}/{x}/{y}{r}.png";

    tileLayer.setUrl(nextUrl);
  }, [mapStyle]);

  // Update User Location
  useEffect(() => {
    const map = mapRef.current;
    if (!map || !userPos) return;

    const [lat, lng] = userPos;
    if (!userMarkerRef.current) {
      const icon = L.divIcon({
        className: "bg-transparent",
        html: `
          <div class="relative flex items-center justify-center w-7 h-7">
            <div class="absolute w-7 h-7 rounded-full bg-cyan-400/25 animate-ping"></div>
            <div class="relative w-4 h-4 rounded-full bg-cyan-400 border-2 border-white shadow-xl"></div>
          </div>
        `,
        iconSize: [28, 28],
        iconAnchor: [14, 14],
      });
      userMarkerRef.current = L.marker([lat, lng], { icon }).addTo(map);
    } else {
      userMarkerRef.current.setLatLng([lat, lng]);
    }
  }, [userPos]);

  // Pan to User Position when locate button is clicked
  useEffect(() => {
    const map = mapRef.current;
    if (!map || !userPos) return;

    if (locateTrigger && locateTrigger > 0) {
      map.flyTo(userPos, 15, { duration: 1 });
    }
  }, [locateTrigger, userPos]);

  // Update Stations
  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;

    const currentMarkerIds = new Set(stations.map((s) => s.id));

    markersRef.current.forEach((marker, id) => {
      if (!currentMarkerIds.has(id)) {
        marker.remove();
        markersRef.current.delete(id);
      }
    });

    stations.forEach((station) => {
      const isActive = station.id === activeStationId;
      const isDenza = station.denza_approved;
      const isFast = station.kw >= 100;

      const html = `
        <button type="button" class="group relative flex items-center gap-1.5 px-2 py-1 rounded-full text-[11px] font-semibold tracking-tight shadow-2xl transition-all cursor-pointer select-none focus:outline-none ${
          isActive
            ? "bg-white text-zinc-950 ring-4 ring-cyan-400/50 scale-110 z-[1000] font-bold"
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
              ? '<span class="text-[9px] px-1 py-0.2 rounded bg-cyan-950 text-cyan-400 uppercase font-mono font-bold">D9</span>'
              : ""
          }
        </button>
      `;

      let marker = markersRef.current.get(station.id);
      if (!marker) {
        const icon = L.divIcon({
          className: "bg-transparent",
          html,
          iconSize: [80, 24],
          iconAnchor: [40, 12],
        });

        marker = L.marker([station.lat, station.lng], { icon }).addTo(map);
        marker.on("click", (e: any) => {
          L.DomEvent.stopPropagation(e);
          onSelectStation(station);
        });
        markersRef.current.set(station.id, marker);
      } else {
        const icon = L.divIcon({
          className: "bg-transparent",
          html,
          iconSize: [80, 24],
          iconAnchor: [40, 12],
        });
        marker.setIcon(icon);
        if (isActive) {
          marker.setZIndexOffset(1000);
        } else {
          marker.setZIndexOffset(0);
        }
      }
    });
  }, [stations, activeStationId, onSelectStation]);

  // Update In-App Route Polyline
  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;

    if (routeGlowRef.current) {
      routeGlowRef.current.remove();
      routeGlowRef.current = null;
    }
    if (routeLineRef.current) {
      routeLineRef.current.remove();
      routeLineRef.current = null;
    }

    if (route && route.geometry && route.geometry.length > 0) {
      const latLngs = route.geometry.map(([lng, lat]) => [lat, lng] as [number, number]);

      // Cyan neon glow line
      routeGlowRef.current = L.polyline(latLngs, {
        color: "#38bdf8",
        weight: isNavigating ? 8 : 6,
        opacity: isNavigating ? 0.5 : 0.3,
        lineCap: "round",
        lineJoin: "round",
      }).addTo(map);

      // Core crisp driving line
      routeLineRef.current = L.polyline(latLngs, {
        color: "#0284c7",
        weight: isNavigating ? 5 : 4,
        opacity: 0.95,
        lineCap: "round",
        lineJoin: "round",
      }).addTo(map);

      // Fit bounds appropriately
      const bounds = routeLineRef.current.getBounds();
      map.fitBounds(bounds, {
        paddingTopLeft: isNavigating ? [20, 100] : [30, 70],
        paddingBottomRight: isNavigating ? [20, 140] : [30, 260],
        maxZoom: 16,
      });
    }
  }, [route, isNavigating]);

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
