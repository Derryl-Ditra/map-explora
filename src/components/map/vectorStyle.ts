import type { StyleSpecification } from "maplibre-gl";
import bright from "../../data/map-style-light.json";

// One pastel-light basemap. TileJSON resolves the current versioned tile URL.
export function getMapStyle(): Promise<StyleSpecification> {
  const style = structuredClone(bright) as StyleSpecification;
  // MapLibre renders labels locally when glyphs is omitted. Font weight/style
  // still comes from each layer; no remote glyph ranges are needed.
  delete style.glyphs;
  return Promise.resolve(style);
}
