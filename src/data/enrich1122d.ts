import type { Venue } from "@/types/venue";

// 2026-11-22 enrichment round D: shared enquiry phone for the eight I Can
// Read branches that had no phone at all. Data only, no UI changes.
// Source checked 2026-11-22: the official FAQ (icanread.co.id/faq/) lists
// (021) 2258 0629 in the chain contact block. Shared enquiry, not a branch
// phone.

export default function enrich1122d(venues: Venue[]) {
  let icr = 0;
  for (const v of venues) {
    if (v.chain === "I Can Read" && !v.phone) {
      v.phone = "(021) 2258 0629";
      v.phoneScope = "shared-enquiry";
      icr += 1;
    }
  }
  if (icr !== 8) {
    throw new Error(`enrich1122d: expected 8 I Can Read phone fills, got ${icr}`);
  }
}
