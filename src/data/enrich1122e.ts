import type { Venue } from "@/types/venue";

// 2026-11-22 enrichment round E: phones for the Buumi Playscape and Baby
// Jumper Gym branches that had none. Data only, no UI changes.
// Source checked 2026-11-22: each branch's live Google Maps listing
// (the listing each venue record already cites as its source):
// - Buumi Playscape Plaza Senayan: +62 811-1540-678
// - Playclub by Buumi Urban Forest: +62 21 51400557 (the same landline Maps
//   lists for Pacific Place, so marked shared-enquiry)
// - Baby Jumper Gym Gading Serpong: +62 21 29014746 (corroborated by a 2015
//   Gading Serpong preschool directory at the same Ruko Paramount Center II
//   Blok B1-2 address)
// Pacific Place (+62 21 51400557) and Baby Jumper Pluit (+62 21 66606297)
// already carry exactly the numbers their Maps listings show today; the round
// E pin test locks that match without touching the data.

const FILLS: Record<string, { phone: string; shared?: boolean }> = {
  "buumi-playscape-plaza-senayan": { phone: "0811-1540-678" },
  "buumi-playscape-urban-forest-cipete": {
    phone: "(021) 5140 0557",
    shared: true,
  },
  "baby-jumper-gym-gading-serpong": { phone: "(021) 2901 4746" },
};

export default function enrich1122e(venues: Venue[]) {
  let filled = 0;
  for (const v of venues) {
    const f = FILLS[v.id];
    if (f && !v.phone) {
      v.phone = f.phone;
      if (f.shared) v.phoneScope = "shared-enquiry";
      filled += 1;
    }
  }
  if (filled !== 3) {
    throw new Error(`enrich1122e: expected 3 phone fills, got ${filled}`);
  }
}
