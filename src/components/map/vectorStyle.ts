import type { StyleSpecification } from "maplibre-gl";
import bright from "../../data/map-style-light.json";

// One pastel-light basemap. TileJSON resolves the current versioned tile URL.
export function getMapStyle(): Promise<StyleSpecification> {
  return Promise.resolve(structuredClone(bright) as StyleSpecification);
}
