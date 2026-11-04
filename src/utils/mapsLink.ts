import { Venue } from "@/types/venue";

// Omit origin: Google Maps uses its current device location, not our cached fix.
// Leave travel mode and route preferences to Google Maps. Never auto-start driving.
export function buildMapsLink(venue: Venue): string {
  const uncertain = venue.coordinateSource === "area-approximate" || !!venue.caution;
  const url = new URL(uncertain ? "https://www.google.com/maps/search/" : "https://www.google.com/maps/dir/");
  url.searchParams.set("api", "1");
  url.searchParams.set(uncertain ? "query" : "destination", uncertain
    ? `${venue.chain ?? ""} ${venue.branchName} ${venue.address}`.trim()
    : `${venue.lat},${venue.lng}`);
  return url.toString();
}
