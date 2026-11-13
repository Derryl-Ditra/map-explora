import type { Venue } from "@/types/venue";

// Nov14 source snapshots. No coordinate, age-fit or review changes.
export default function enrich1114(venues: Venue[]) {
  const music = venues.find(v => v.id === "music-wonderworld-bsd");
  if (music) {
    music.phone = "+62 851-9592-7078";
    music.notes = "Official contact page links WhatsApp +62 851-9592-7078. The same number appears in the provider's 6 November 2026 post offering trial enquiries. Read 2026-11-14. The official site still gives toddler-to-adult classes without exact toddler month boundaries. The Serpong directory's 1-4-year Toddler Music Class claim is not provider-confirmed and is not used for age matching. Existing Maps pin, review snapshot and age claims remain unchanged.";
  }
  const buumi = venues.find(v => v.id === "buumi-playscape-pacific-place");
  if (buumi) {
    buumi.priceListings = [{
      sourceKind: "partner",
      amountIdr: 225000,
      unit: "per 2-hour public-play ticket",
      label: "Public play: 1 child + 1 adult, not class tuition",
      source: "Happy Kamper",
      sourceUrl: "https://happykamper.io/en/activities/buumi-playscape-pacific-place-playground",
      checkedAt: "2026-11-14",
      note: "Selected date only; confirm public-play slots before visiting. No refund or rescheduling. Anti-slip socks required. The listing says playground equipment is for ages 12 months to 12 years, with an adult aged at least 18. This is not a baby-class price or confirmed class eligibility. Other channels may quote different prices; confirm the final fee and any extras."
    }];
  }
}
