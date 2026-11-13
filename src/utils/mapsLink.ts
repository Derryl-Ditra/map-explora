import { publicLocation } from "./publicLocation";
import { Venue } from "@/types/venue";

// Omit origin: Google Maps uses its current device location, not our cached fix.
// Leave travel mode and route preferences to Google Maps. Never auto-start driving.
export function canRouteVenue(venue: Venue): boolean {
 return venue.coordinateSource !== "area-approximate" && !venue.caution && !publicLocation(venue).areaOnly;
}
export function buildMapsLink(venue: Venue): string {
  const location=publicLocation(venue);
  const uncertain = !canRouteVenue(venue);
  const url = new URL(uncertain ? "https://www.google.com/maps/search/" : "https://www.google.com/maps/dir/");
  url.searchParams.set("api", "1");
  url.searchParams.set(uncertain ? "query" : "destination", uncertain
    ? `${venue.chain ?? ""} ${venue.branchName} ${location.address}`.trim()
    : `${venue.lat},${venue.lng}`);
  return url.toString();
}
