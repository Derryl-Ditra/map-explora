import type { Venue } from "@/types/venue";

// 2026-11-22 enrichment round C: shared enquiry phone numbers for the two
// chains whose branches had no phone at all. Data only, no UI changes.
// Sources checked 2026-11-22:
// - Sparks (Sports Academy + Swim): the official regional pages
//   (academy.sparks-edu.com/jakarta/, /depok/, /tangerang/) all show the
//   same central line 081390006606. Shared enquiry, not a branch phone.
// - English 1: the official FAQ (english1.co.id/faq/) lists hotline
//   1500-947 and WhatsApp 0855-1500-553; per-school pages (e.g.
//   /school/jakarta/cipete/) show the same 1500 947 number. Shared
//   enquiry, not a branch phone. English 1 publishes no course prices
//   ("biaya bervariasi, hubungi hotline"), so no price data was added.

const checkedAt = "2026-11-22";

export default function enrich1122c(venues: Venue[]) {
  let sparks = 0;
  let english1 = 0;
  for (const v of venues) {
    if (
      (v.id.startsWith("sparks-sports-academy-") ||
        v.id.startsWith("sparks-swim-")) &&
      !v.phone
    ) {
      v.phone = "081390006606";
      v.phoneScope = "shared-enquiry";
      sparks += 1;
    }
    if (v.chain === "English 1" && !v.phone) {
      v.phone = "1500 947";
      v.phoneScope = "shared-enquiry";
      english1 += 1;
    }
  }
  if (sparks !== 30) {
    throw new Error(`enrich1122c: expected 30 Sparks phone fills, got ${sparks}`);
  }
  if (english1 !== 35) {
    throw new Error(
      `enrich1122c: expected 35 English 1 phone fills, got ${english1}`
    );
  }
  void checkedAt;
}
