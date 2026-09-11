export interface RouteStep {
  instruction: string;
  distance_m: number;
  duration_s: number;
}

export interface RouteData {
  geometry: [number, number][]; // [lng, lat]
  distance_km: number;
  duration_min: number;
  steps?: RouteStep[];
}
