import type { Venue } from "@/types/venue";

// Round H (2026-11-22): official Aquababies course-package prices.
// Evidence read 22 Nov 2026 from the provider's own shop:
// https://aquababiesindonesia.id/product-category/aquababies/ lists
// "Jakarta & Surabaya - New Student" at Rp 3,715,000 and the product page
// https://aquababiesindonesia.id/shop/jakarta-surabaya-new-student/
// confirms the same price today. The page does not state the session count;
// existing-student packages run Rp 3,350,000 - 13,400,000 (option range).
// Both enriched branches are Jakarta branches, so the Jakarta & Surabaya
// product applies. No other prices touched.

const checkedAt = "2026-11-22";
const shopUrl = "https://aquababiesindonesia.id/shop/jakarta-surabaya-new-student/";

const branches = ["aquababies-bintaro", "aquababies-menteng"];

export default function enrich1122h(venues: Venue[]) {
  for (const id of branches) {
    const v = venues.find((x) => x.id === id);
    if (!v) throw new Error(`enrich1122h: missing venue ${id}`);
    if ((v.priceListings || []).some((p) => p.sourceUrl === shopUrl)) continue;
    v.priceListings = [
      ...(v.priceListings || []),
      {
        sourceKind: "official" as const,
        amountIdr: 3715000,
        unit: "per course package (new student)",
        label: "Aquababies course package, new student (Jakarta & Surabaya)",
        source: "aquababiesindonesia.id",
        sourceUrl: shopUrl,
        checkedAt,
        note: "Confirm package contents before paying.",
      },
    ];
    v.lastCheckedAt = checkedAt;
  }
}
