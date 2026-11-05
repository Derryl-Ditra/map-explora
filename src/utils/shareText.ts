import { verifiedPrograms } from "./ageMatch";
import { Venue } from "@/types/venue";

// The live app. Any shared text must carry this so recipients know where it came from.
export const SITE_URL = "https://derryl-ditra.github.io/map-explora/";

function fmtMonths(m: number): string {
  return m <= 36 ? `${m} mo` : `${m / 12} yr`;
}

export function buildVenueUrl(venue: Pick<Venue, "id">): string {
  return `${SITE_URL}?venue=${encodeURIComponent(venue.id)}`;
}

export function buildClassLines(venue: Venue): string {
  return verifiedPrograms(venue)
    .slice(0, 4)
    .map((p) => {
      const lo = p.age.minMonths !== null ? fmtMonths(p.age.minMonths) : "?";
      const hi = p.age.maxMonths !== null ? fmtMonths(p.age.maxMonths) : "?";
      return `${p.name} (${lo} to ${hi})`;
    })
    .join(", ");
}

export function buildShareText(venue: Venue): string {
  const classLines = buildClassLines(venue);
  const distanceText = venue.distance != null ? `${venue.distance} km` : null;
  const lines = [
    `Under-5 class spot: ${venue.chain ? `${venue.chain} ` : ""}${venue.branchName} (${venue.area})`,
    venue.address,
    classLines ? `Classes: ${classLines}` : null,
    venue.reviews && venue.reviews.rating !== null
      ? `Parent reviews: ${venue.reviews.rating.toFixed(1)} on ${venue.reviews.source}${
          venue.reviews.reviewCount !== null ? ` (${venue.reviews.reviewCount} reviews)` : ""
        }`
      : null,
    distanceText ? `Straight-line distance: ${distanceText}` : null,
    "",
    "Found via Map Explora (under-5 class map, Jabodetabek)",
    buildVenueUrl(venue),
  ].filter((l): l is string => l !== null);
  return lines.join("\n");
}
