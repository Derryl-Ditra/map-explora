import type { Venue } from "@/types/venue";

// Round I (2026-11-22): official KiddieGym Bogor from-price.
// Evidence read 22 Nov 2026 from the provider's own school-fees page:
// https://montessorischoolbogor.com/id/admissions/school-fees/ states
// "KiddieGym Tuition Fee ... Starts from Rp 45.000/session" with 4x, 8x,
// 12x or unlimited monthly packages; enrollment fee is extra. The page is
// undated (same as the Nov13 official-price precedent), so the note says so.

const checkedAt = "2026-11-22";
const feesUrl = "https://montessorischoolbogor.com/id/admissions/school-fees/";

export default function enrich1122i(venues: Venue[]) {
  const v = venues.find((x) => x.id === "kiddiegym-bogor-siliwangi");
  if (!v) throw new Error("enrich1122i: missing venue kiddiegym-bogor-siliwangi");
  if ((v.priceListings || []).some((p) => p.sourceUrl === feesUrl)) return;
  v.priceListings = [
    ...(v.priceListings || []),
    {
      sourceKind: "official" as const,
      amountIdr: 45000,
      unit: "per session (from-price)",
      label: "KiddieGym tuition from-price, babies and toddlers 6 months - 3.5 years",
      source: "montessorischoolbogor.com",
      sourceUrl: feesUrl,
      checkedAt,
      note: "Undated official school-fees page, read 22 Nov 2026: KiddieGym starts from Rp 45,000 per session; packages 4x, 8x, 12x or unlimited monthly; one-time enrollment fee is extra; full fee details come from the admissions team. Confirm the current price before paying.",
    },
  ];
  v.lastCheckedAt = checkedAt;
}
