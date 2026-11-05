import type { Venue } from "../types/venue";

// Every query token must occur somewhere in the place's searchable fields.
// Token order is free; no fuzzy expansion or hidden/eligibility changes.
export function venueMatchesSearch(venue: Venue, query: string): boolean {
  const tokens = query.toLowerCase().trim().split(/\s+/).filter(Boolean);
  const hay = [venue.branchName, venue.chain ?? "", venue.address, venue.area, venue.city, ...venue.categories]
    .join(" ").toLowerCase();
  // A numeric token must be a whole number, not the 1 inside address 13.
  const numbers: string[] = hay.match(/\d+/g) ?? [];
  return tokens.every(token => /^\d+$/.test(token) ? numbers.includes(token) : hay.includes(token));
}
