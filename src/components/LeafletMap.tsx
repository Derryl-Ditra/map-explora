"use client";

import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { ChargingStation } from "@/constants/stations";
import { calculateDistance } from "@/utils/geo";

interface LeafletMapProps {
  center: [number, number];
  stations: ChargingStation[];
  activeId: string | null;
  userPos: [number, number] | null;
  mapMode: 'dark' | 'light' | 'streets';
  onStationSelect: (id: string) => void;
  onRouteFound?: (distance: number, duration: number) => void;
}

export default function LeafletMap({
  center,
  stations,
  activeId,
  userPos,
  mapMode,
  onStationSelect,
  onRouteFound,
}: LeafletMapProps) {
  const mapRef = useRef<L.Map | null>(null);
  const markersRef = useRef<{ [key: string]: L.Marker }>({});
  const routeLineRef = useRef<L.Polyline | null>(null);
  const userMarkerRef = useRef<L.Marker | null>(null);
  const lastRouteParams = useRef<{ activeId: string; userPos: [number, number] } | null>(null);

  const tileLayerRef = useRef<L.TileLayer | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    if (!mapRef.current) {
      mapRef.current = L.map("map-container", {
        zoomControl: false,
        attributionControl: false,
      }).setView(center, 13);
    }

    // Update Tile Layer based on mapMode
    if (tileLayerRef.current) {
      mapRef.current.removeLayer(tileLayerRef.current);
    }

    const layers = {
      dark: "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png",
      light: "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png",
      streets: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
    };

    tileLayerRef.current = L.tileLayer(layers[mapMode], {
      attribution: '&copy; OpenStreetMap'
    }).addTo(mapRef.current);

    return () => {
      // Cleanup on unmount
    };
  }, [mapMode]);

  useEffect(() => {
    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, []);

  // Unified State Sync (Markers, Route, UserPos)
  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;

    // 1. Update Stations/Markers (Optimized)
    stations.forEach((s) => {
      const isActive = s.id === activeId;
      const markerHtml = isActive 
        ? `
          <div class="animate-marker-pulse flex items-center justify-center" style="z-index: 1000;">
            <svg width="32" height="42" viewBox="0 0 24 32" fill="none" xmlns="http://www.w3.org/2000/svg" style="filter: drop-shadow(0 4px 6px rgba(0,0,0,0.5));">
              <path d="M12 32C12 32 24 20 24 12C24 5.37258 18.6274 0 12 0C5.37258 0 0 5.37258 0 12C0 20 12 32 12 32Z" fill="#3B82F6" stroke="white" stroke-width="2"/>
              <circle cx="12" cy="12" r="4" fill="white"/>
            </svg>
          </div>
        `
        : `
          <div class="w-4 h-4 bg-zinc-700 border border-zinc-900 rounded-sm flex items-center justify-center transition-colors hover:bg-zinc-600">
            <div class="w-1.5 h-1.5 bg-zinc-400 rounded-full"></div>
          </div>
        `;

      if (markersRef.current[s.id]) {
        markersRef.current[s.id].setIcon(L.divIcon({
          className: "",
          html: markerHtml,
          iconSize: isActive ? [32, 42] : [16, 16],
          iconAnchor: isActive ? [16, 42] : [8, 8],
        }));
        if (isActive) markersRef.current[s.id].setZIndexOffset(1000);
        else markersRef.current[s.id].setZIndexOffset(0);
      } else {
        const marker = L.marker([s.lat, s.lng], {
          icon: L.divIcon({
            className: "",
            html: markerHtml,
            iconSize: isActive ? [32, 42] : [16, 16],
            iconAnchor: isActive ? [16, 42] : [8, 8],
          }),
          zIndexOffset: isActive ? 1000 : 0
        })
        .addTo(map)
        .on("click", () => onStationSelect(s.id));
        markersRef.current[s.id] = marker;
      }
    });

    // Remove markers that are no longer in the stations list
    const stationIds = new Set(stations.map(s => s.id));
    Object.keys(markersRef.current).forEach(id => {
      if (!stationIds.has(id)) {
        map.removeLayer(markersRef.current[id]);
        delete markersRef.current[id];
      }
    });

    // 2. Update User Position
    if (userMarkerRef.current) map.removeLayer(userMarkerRef.current);
    if (userPos) {
      userMarkerRef.current = L.marker(userPos, {
        icon: L.divIcon({
          className: "",
          html: `<div class="w-4 h-4 bg-blue-600 border-2 border-white rounded-full animate-user-glow flex items-center justify-center">
            <div class="w-1.5 h-1.5 bg-white rounded-full"></div>
          </div>`,
          iconSize: [16, 16],
          iconAnchor: [8, 8],
        }),
      }).addTo(map);
    }

    // 3. Update Route (Follow Road with 1km Threshold)
    if (!activeId || !userPos) {
      if (routeLineRef.current) {
        map.removeLayer(routeLineRef.current);
        routeLineRef.current = null;
      }
      lastRouteParams.current = null;
      return;
    }

    const station = stations.find(s => s.id === activeId);
    if (!station) return;

    // Check if we need to re-fetch
    const hasActiveIdChanged = lastRouteParams.current?.activeId !== activeId;
    let hasUserMovedSignificantly = true;

    if (lastRouteParams.current && !hasActiveIdChanged) {
      const distMoved = calculateDistance(
        lastRouteParams.current.userPos[0],
        lastRouteParams.current.userPos[1],
        userPos[0],
        userPos[1]
      );
      hasUserMovedSignificantly = distMoved > 1; // 1km threshold
    }

    if (hasActiveIdChanged || hasUserMovedSignificantly) {
      if (routeLineRef.current) map.removeLayer(routeLineRef.current);
      
      const url = `https://router.project-osrm.org/route/v1/driving/${userPos[1]},${userPos[0]};${station.lng},${station.lat}?overview=full&geometries=geojson`;
      
      fetch(url)
        .then(res => res.json())
        .then(data => {
          if (data.routes && data.routes.length > 0) {
            const route = data.routes[0];
            const coordinates = route.geometry.coordinates.map((coord: [number, number]) => [coord[1], coord[0]]);
            routeLineRef.current = L.polyline(coordinates, {
              color: '#2563eb',
              weight: 4,
              opacity: 0.9,
            }).addTo(map);

            if (onRouteFound) {
              onRouteFound(route.distance / 1000, route.duration);
            }
            
            lastRouteParams.current = { activeId, userPos: [...userPos] };

            // Automatically show the entire route with comfortable padding
            const routePolyline = L.polyline(coordinates);
            map.fitBounds(routePolyline.getBounds(), { padding: [100, 100] });
          }
        })
        .catch(err => console.error("Routing error:", err));
    }
  }, [stations, activeId, userPos]);

  return <div id="map-container" className="h-full w-full bg-zinc-900" />;
}
