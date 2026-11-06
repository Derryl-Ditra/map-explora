import { verifiedPrograms } from "./ageMatch";
import { shortVenueId } from "./venueLink";
import { Venue } from "@/types/venue";

export const SITE_URL = "https://derryl-ditra.github.io/map-explora/";
export const SHARE_TEXT_BUDGET = 440; // 60 characters below a single Threads post.

export function buildVenueUrl(venue: Pick<Venue, "id">): string {
  return `${SITE_URL}?v=${shortVenueId(venue.id)}`;
}

// Preserve exact program boundaries; no rounding years or filling age gaps.
export function buildClassLines(venue: Venue, limit = 4): string {
  const programs = verifiedPrograms(venue);
  const lines = programs.slice(0, limit).map(p => `${p.name} ${p.age.minMonths}-${p.age.maxMonths}mo`);
  if (programs.length > limit) lines.push(`+${programs.length - limit} more`);
  return lines.join(", ");
}

function ageSummary(venue: Venue): string {
  const ranges = verifiedPrograms(venue).map(p => [p.age.minMonths!, p.age.maxMonths!]).sort((a,b) => a[0]-b[0]);
  const merged: number[][] = [];
  for (const [lo,hi] of ranges) {
    const last = merged.at(-1);
    if (last && lo <= last[1]) last[1] = Math.max(last[1], hi);
    else merged.push([lo,hi]);
  }
  return merged.length ? `Class ages: ${merged.map(([lo,hi]) => `${lo}-${hi}mo`).join(', ')}` : '';
}

export function conciseAddress(address: string): string {
  const parts = address.split(',').map(p => p.trim());
  const street = parts.find(p => /\b(?:jl\.?|jalan)\s/i.test(p));
  const line = street ?? parts.find(p => p && !/\b(?:RT\.?\s*\d|RW\.?\s*\d|Indonesia|Kec\.|Kecamatan|Kabupaten|Daerah Khusus|\d{5})\b/i.test(p)) ?? '';
  return line.split(/\bRT\.?\s*\d|\bRW\.?\s*\d|\b(?:LG|UG|\d+(?:st|nd|rd|th))\s+Floor|\bLantai\b|\bLt\.?\s*\d|\s*\(Google Maps/i)[0].trim();
}

export function buildShareText(venue: Venue): string {
  const name = `${venue.chain ? `${venue.chain} ` : ''}${venue.branchName} (${venue.area})`;
  const address = conciseAddress(venue.address);
  const reviews = venue.reviews && venue.reviews.rating !== null
    ? `${venue.reviews.source}: ${venue.reviews.rating.toFixed(1)}${venue.reviews.reviewCount !== null ? ` (${venue.reviews.reviewCount} reviews)` : ''}` : '';
  const format = (classes: string, location = address) => [name, location, classes, reviews, 'Via Map Explora', buildVenueUrl(venue)].filter(Boolean).join('\n');
  const classes = buildClassLines(venue);
  const detailed = format(classes ? `Classes: ${classes}` : '');
  if (detailed.length <= SHARE_TEXT_BUDGET) return detailed;
  // Long program lists become a truthful union of verified ranges, not a
  // min/max span that could wrongly fill a gap. Full classes remain at the link.
  const compact = format(ageSummary(venue));
  return compact.length <= SHARE_TEXT_BUDGET ? compact : format(ageSummary(venue), '');
}
