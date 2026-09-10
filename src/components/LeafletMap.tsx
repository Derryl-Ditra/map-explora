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
  const markerActiveStates = useRef<{ [key: string]: boolean }>({});
  const routeLineRef = useRef<L.Polyline | null>(null);
  const userMarkerRef = useRef<L.Marker | null>(null);
  const lastRouteParams = useRef<{ activeId: string; userPos: [number, number] } | null>(null);
  const osmLayerRef = useRef<L.TileLayer | null>(null);
  const streetsLayerRef = useRef<L.TileLayer | null>(null);

  // Initialize Map and create cached tile layers once (Zero API keys required)
  useEffect(() => {
    if (typeof window === "undefined") return;

    if (!mapRef.current) {
      const map = L.map("map-container", {
        zoomControl: false,
        attributionControl: true,
      }).setView(center, 13);
      mapRef.current = map;

      // 1. High-speed base OpenStreetMap layer (used for clean dark & clean light)
      const osmLayer = L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        subdomains: ["a", "b", "c"],
        maxZoom: 19,
        keepBuffer: 6,
        className: "map-tiles-dark",
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noreferrer">OpenStreetMap</a> contributors',
      });
      osmLayerRef.current = osmLayer;

      // 2. Humanitarian OpenStreetMap layer (used for rich street view - untouched)
      const streetsLayer = L.tileLayer("https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png", {
        subdomains: ["a", "b"],
        maxZoom: 19,
        keepBuffer: 6,
        className: "map-tiles-streets",
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noreferrer">OpenStreetMap</a> contributors, Tiles by <a href="https://www.hotosm.org/" target="_blank" rel="noreferrer">HOT</a>',
      });
      streetsLayer.on("tileerror", () => {
        streetsLayer.setUrl("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png");
      });
      streetsLayerRef.current = streetsLayer;

      // Attach initial layer
      osmLayer.addTo(map);
    }
  }, [center]);

  // Instant mode switcher (Zero network reload when toggling styles)
  useEffect(() => {
    const map = mapRef.current;
    const osmLayer = osmLayerRef.current;
    const streetsLayer = streetsLayerRef.current;
    if (!map || !osmLayer || !streetsLayer) return;

    if (mapMode === 'streets') {
      if (map.hasLayer(osmLayer)) map.removeLayer(osmLayer);
      if (!map.hasLayer(streetsLayer)) map.addLayer(streetsLayer);
      const container = streetsLayer.getContainer();
      if (container) {
        container.className = "leaflet-layer map-tiles-streets";
      }
    } else {
      if (map.hasLayer(streetsLayer)) map.removeLayer(streetsLayer);
      if (!map.hasLayer(osmLayer)) map.addLayer(osmLayer);
      const container = osmLayer.getContainer();
      if (container) {
        container.className = `leaflet-layer ${mapMode === 'dark' ? 'map-tiles-dark' : 'map-tiles-light'}`;
      }
    }
  }, [mapMode]);

  // Teardown map on unmount
  useEffect(() => {
    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, []);

  // Sync Markers, User Position, and Routing
  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;

    // 1. Update Stations & Markers
    stations.forEach((s) => {
      const isActive = s.id === activeId;
      const existingMarker = markersRef.current[s.id];
      const previousActive = markerActiveStates.current[s.id];

      if (!existingMarker || previousActive !== isActive) {
        const markerHtml = isActive 
          ? `
            <div class="animate-marker-pulse flex items-center justify-center" style="z-index: 1000;">
              <svg width="32" height="42" viewBox="0 0 24 32" fill="none" xmlns="http://www.w3.org/2000/svg" style="filter: drop-shadow(0 4px 6px rgba(0,0,0,0.5));" aria-hidden="true">
                <path d="M12 32C12 32 24 20 24 12C24 5.37258 18.6274 0 12 0C5.37258 0 0 5.37258 0 12C0 20 12 32 12 32Z" fill="#3B82F6" stroke="white" stroke-width="2"/>
                <circle cx="12" cy="12" r="4" fill="white"/>
              </svg>
            </div>
          `
          : `
            <div class="w-4 h-4 bg-zinc-700 border border-zinc-900 rounded-sm flex items-center justify-center transition-colors hover:bg-zinc-600" aria-hidden="true">
              <div class="w-1.5 h-1.5 bg-zinc-400 rounded-full"></div>
            </div>
          `;

        const icon = L.divIcon({
          className: "",
          html: markerHtml,
          iconSize: isActive ? [32, 42] : [16, 16],
          iconAnchor: isActive ? [16, 42] : [8, 8],
        });

        if (existingMarker) {
          existingMarker.setIcon(icon);
          existingMarker.setZIndexOffset(isActive ? 1000 : 0);
        } else {
          const marker = L.marker([s.lat, s.lng], {
            icon,
            title: `${s.name} (${s.power})`,
            alt: `${s.name} charging station`,
            zIndexOffset: isActive ? 1000 : 0,
          })
          .addTo(map)
          .on("click", () => onStationSelect(s.id));
          markersRef.current[s.id] = marker;
        }

        markerActiveStates.current[s.id] = isActive;
      }
    });

    // Remove markers that are no longer in the stations list
    const stationIds = new Set(stations.map(s => s.id));
    Object.keys(markersRef.current).forEach(id => {
      if (!stationIds.has(id)) {
        map.removeLayer(markersRef.current[id]);
        delete markersRef.current[id];
        delete markerActiveStates.current[id];
      }
    });

    // 2. Update User Position
    if (userMarkerRef.current) map.removeLayer(userMarkerRef.current);
    if (userPos) {
      userMarkerRef.current = L.marker(userPos, {
        title: "Your Location",
        alt: "Current user location",
        icon: L.divIcon({
          className: "",
          html: `<div class="w-4 h-4 bg-blue-600 border-2 border-white rounded-full animate-user-glow flex items-center justify-center" aria-hidden="true">
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

    const hasActiveIdChanged = lastRouteParams.current?.activeId !== activeId;
    let hasUserMovedSignificantly = true;

    if (lastRouteParams.current && !hasActiveIdChanged) {
      const distMoved = calculateDistance(
        lastRouteParams.current.userPos[0],
        lastRouteParams.current.userPos[1],
        userPos[0],
        userPos[1]
      );
      hasUserMovedSignificantly = distMoved > 1;
    }

    if (hasActiveIdChanged || hasUserMovedSignificantly) {
      if (routeLineRef.current) map.removeLayer(routeLineRef.current);
      
      const url = `https://router.project-osrm.org/route/v1/driving/${userPos[1]},${userPos[0]};${station.lng},${station.lat}?overview=full&geometries=geojson`;
      
      const timeoutId = setTimeout(() => {
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

              const routePolyline = L.polyline(coordinates);
              map.fitBounds(routePolyline.getBounds(), { padding: [100, 100] });
            }
          })
          .catch(err => console.error("Routing error:", err));
      }, 300);

      return () => clearTimeout(timeoutId);
    }
  }, [stations, activeId, userPos, onRouteFound, onStationSelect]);

  return (
    <div 
      id="map-container" 
      role="region"
      aria-label="Interactive EV charging station map"
      tabIndex={0}
      className={`h-full w-full transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 ${
        mapMode === 'dark' ? 'bg-[#121216]' : 'bg-[#e5e7eb]'
      }`} 
    />
  );
}
