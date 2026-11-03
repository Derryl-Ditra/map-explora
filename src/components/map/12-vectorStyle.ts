/**
 * Monochrome map styles built from OpenFreeMap's Positron style
 * (OpenStreetMap data, free, no API key: https://openfreemap.org).
 *
 * Light mode = Positron with saturation forced to zero.
 * Dark mode = the same style with saturation zero and lightness inverted,
 * giving a true monochrome dark map instead of a CSS invert filter.
 */

const POSITRON_URL = "https://tiles.openfreemap.org/styles/positron";

let positronPromise: Promise<any> | null = null;

function loadPositron(): Promise<any> {
  if (!positronPromise) {
    positronPromise = fetch(POSITRON_URL).then((r) => {
      if (!r.ok) throw new Error(`style fetch failed: ${r.status}`);
      return r.json();
    });
  }
  return positronPromise;
}

function parseColor(c: string): { h: number; s: number; l: number; a: number } | null {
  c = c.trim();
  let r = 0, g = 0, b = 0, a = 1;
  let m = c.match(/^#([0-9a-f]{3,8})$/i);
  if (m) {
    const hex = m[1];
    if (hex.length === 3 || hex.length === 4) {
      r = parseInt(hex[0] + hex[0], 16);
      g = parseInt(hex[1] + hex[1], 16);
      b = parseInt(hex[2] + hex[2], 16);
      if (hex.length === 4) a = parseInt(hex[3] + hex[3], 16) / 255;
    } else if (hex.length === 6 || hex.length === 8) {
      r = parseInt(hex.slice(0, 2), 16);
      g = parseInt(hex.slice(2, 4), 16);
      b = parseInt(hex.slice(4, 6), 16);
      if (hex.length === 8) a = parseInt(hex.slice(6, 8), 16) / 255;
    } else return null;
  } else {
    m = c.match(/^rgba?\(([^)]+)\)$/i);
    if (m) {
      const parts = m[1].split(",").map((x) => parseFloat(x));
      [r, g, b] = parts;
      if (parts.length > 3) a = parts[3];
    } else {
      m = c.match(/^hsla?\(([^)]+)\)$/i);
      if (!m) return null;
      const parts = m[1].split(",").map((x) => parseFloat(x));
      const hh = parts[0], ss = parts[1] / 100, ll = parts[2] / 100;
      const aa = parts.length > 3 ? parts[3] : 1;
      return { h: hh, s: ss, l: ll, a: aa };
    }
  }
  // rgb -> hsl
  const rn = r / 255, gn = g / 255, bn = b / 255;
  const max = Math.max(rn, gn, bn), min = Math.min(rn, gn, bn);
  const l = (max + min) / 2;
  let h = 0, s = 0;
  const d = max - min;
  if (d !== 0) {
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case rn: h = (gn - bn) / d + (gn < bn ? 6 : 0); break;
      case gn: h = (bn - rn) / d + 2; break;
      default: h = (rn - gn) / d + 4;
    }
    h *= 60;
  }
  return { h, s, l, a };
}

function hslToRgbString(h: number, s: number, l: number, a: number): string {
  const c = (1 - Math.abs(2 * l - 1)) * s;
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  const m0 = l - c / 2;
  let r = 0, g = 0, b = 0;
  if (h < 60) [r, g, b] = [c, x, 0];
  else if (h < 120) [r, g, b] = [x, c, 0];
  else if (h < 180) [r, g, b] = [0, c, x];
  else if (h < 240) [r, g, b] = [0, x, c];
  else if (h < 300) [r, g, b] = [x, 0, c];
  else [r, g, b] = [c, 0, x];
  const R = Math.round((r + m0) * 255);
  const G = Math.round((g + m0) * 255);
  const B = Math.round((b + m0) * 255);
  return a >= 1 ? `rgb(${R},${G},${B})` : `rgba(${R},${G},${B},${Math.round(a * 1000) / 1000})`;
}

function toMono(color: string, dark: boolean): string {
  const parsed = parseColor(color);
  if (!parsed) return color;
  const l = dark ? 1 - parsed.l : parsed.l;
  return hslToRgbString(parsed.h, 0, l, parsed.a);
}

function transformValue(v: any, dark: boolean): any {
  if (typeof v === "string") {
    return /^#|^rgb|^hsl/i.test(v.trim()) ? toMono(v, dark) : v;
  }
  if (Array.isArray(v)) return v.map((x) => transformValue(x, dark));
  if (v && typeof v === "object") {
    const out: any = {};
    for (const k of Object.keys(v)) out[k] = transformValue(v[k], dark);
    return out;
  }
  return v;
}

function transformStyle(style: any, dark: boolean): any {
  const clone = JSON.parse(JSON.stringify(style));
  for (const layer of clone.layers ?? []) {
    if (layer.paint) layer.paint = transformValue(layer.paint, dark);
  }
  return clone;
}

const styleCache: Record<string, Promise<any>> = {};

/** Resolved MapLibre style object for the given mode, monochrome. */
export function getMonoStyle(mode: "dark" | "light"): Promise<any> {
  if (!styleCache[mode]) {
    styleCache[mode] = loadPositron().then((s) => transformStyle(s, mode === "dark"));
  }
  return styleCache[mode];
}

/** Plain fallback style URLs if the transform cannot run. */
export const FALLBACK_STYLE_URL = {
  light: POSITRON_URL,
  dark: "https://tiles.openfreemap.org/styles/dark",
};
