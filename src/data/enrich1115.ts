import type { Venue } from "@/types/venue";

// Narrow Nov15 source checks. Contact numbers are shared provider enquiries,
// not independently verified local desk lines. Do not re-date ages or reviews.
export default function enrich1115(venues: Venue[]) {
  for (const id of ["aquababies-bintaro", "aquababies-menteng"]) {
    const v = venues.find(v => v.id === id);
    if (!v) continue;
    v.phoneScope = "shared-enquiry";
    v.phone = "+62 819-2844-3322";
    v.notes = `${v.notes ?? ""} Shared Aquababies enquiry WhatsApp from https://aquababiesindonesia.id/contact/, read 2026-11-15. The contact page lists both Menteng and Bintaro. Not a separately verified branch desk number.`.trim();
    v.operatingStatus = { state: "official-listed", source: "https://aquababiesindonesia.id/contact/", checkedAt: "2026-11-15" };
  }
  for (const id of ["aquatic-baby-bintaro", "aquatic-baby-rumabona-cikini-bintaro"]) {
    const v = venues.find(v => v.id === id);
    if (!v) continue;
    v.phoneScope = "shared-enquiry";
    v.phone = "+62 811-1698-740";
    const days = id === "aquatic-baby-bintaro" ? "Tuesday, Thursday, Saturday and Sunday" : "Saturday";
    v.notes = `${v.notes ?? ""} Official location page https://aquatic-baby.com/lokasi, read 2026-11-15, lists ${days} at this venue and shared Aquatic Baby enquiry WhatsApp +62 811-1698-740. These are listed days, not confirmed class slots or a branch-specific desk number. Confirm the class and age before visiting.`.trim();
    v.operatingStatus = { state: "official-listed", source: "https://aquatic-baby.com/lokasi", checkedAt: "2026-11-15" };
  }
  const plaza = venues.find(v => v.id === "buumi-playscape-plaza-senayan");
  if (plaza) {
    plaza.priceListings = [{
      sourceKind: "partner",
      amountIdr: 195000,
      unit: "starting price per 2-hour public-play ticket",
      label: "Public play: 1 child + 1 adult, not class tuition",
      source: "Happy Kamper",
      sourceUrl: "https://happykamper.io/id/activities/buumi-playscape-plaza-senayan",
      checkedAt: "2026-11-15",
      note: "The listing shows Rp195,000-Rp225,000. The provider title also names Urban Forest; confirm this ticket and price apply to Plaza Senayan before booking. Selected date only; confirm the final price and public-play slots. No refund or rescheduling. Playground closes for cleaning 13:00-14:00; remaining playtime can continue afterward. Anti-slip socks required. Equipment is listed for ages 12 months to 12 years with an adult aged at least 18. Not baby-class tuition or confirmed class eligibility."
    }];
  }
}
