import type { StyleSpecification } from "maplibre-gl";
import bright from "../../data/map-style-light.json";
import region from "../../data/map-region.json";

// One pastel-light basemap. TileJSON resolves the current versioned tile URL.
export function getMapStyle(): Promise<StyleSpecification> {
  const style = structuredClone(bright) as StyleSpecification;
  // MapLibre renders labels locally when glyphs is omitted. Font weight/style
  // still comes from each layer; no remote glyph ranges are needed.
  delete style.glyphs;
  // Request only source tiles intersecting the service rectangle. Edge tiles
  // can include neighboring areas because a tile is indivisible.
  for (const source of Object.values(style.sources)) {
    if (source.type === "vector" || source.type === "raster") {
      source.bounds = [...region.bounds] as [number, number, number, number];
    }
  }
  return Promise.resolve(style);
}
