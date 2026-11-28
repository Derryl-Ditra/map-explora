// Membumi Playspace Cibubur: the 13 Nov take.app prices (734,000 per 2 weeks, 1,174,000 per month)
// no longer match the storefront (28 Nov shows Rp 185,000 and Rp 200,000 items). Owner approved
// hiding them until they are re-read. The venue stays; only its price listings are removed.
import type { Venue } from "../types/venue";

export default function enrich1136(venues: Venue[]) {
  const v = venues.find((x) => x.id === "membumi-playspace-cibubur");
  if (v) delete v.priceListings;
}
