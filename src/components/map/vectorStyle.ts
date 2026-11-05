import type { StyleSpecification } from "maplibre-gl";
import light from "../../data/map-style-light.json";
import dark from "../../data/map-style-dark.json";

// Generated at build time. TileJSON resolves the current versioned tile URL;
// no dated template or invalid unversioned /planet/{z}/{x}/{y} URL is pinned.
export function getMonoStyle(mode: "dark" | "light"): Promise<StyleSpecification> {
  return Promise.resolve(structuredClone(mode === "dark" ? dark : light) as StyleSpecification);
}
