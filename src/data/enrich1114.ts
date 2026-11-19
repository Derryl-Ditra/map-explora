import type { Venue } from "@/types/venue";
import enrich1115 from "./enrich1115";
import enrich1118 from "./enrich1118";

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
  // The existing data entry point applies the next dated source patch last.
  enrich1115(venues);
  if (!venues.some(v => v.id === "kiddies88-maspen-cimuning")) enrich1118(venues);

  // Nov19 official-address discrepancies: keep pins, disable exact routing.
  for (const patch of [
  {
    "id": "english-1-puri-indah",
    "caution": "The current official Puri Indah listing gives Puri Niaga Blok J1 No.3 T-U, while the stored map address says M8-1. Confirm the current unit and entrance with the branch before visiting. This pin is not verified for the current official address.",
    "notes": "Official FAQ: ages 3 to 18; Small Stars program ages 3-6. Official Jakarta branch list read 19 November 2026 gives Jalan Puri Kencana Ruko Puri Niaga Blok J1 No.3 T-U. Stored Maps address has M8-1. Do not relocate coordinates or infer closure. Search-only routing until current entrance is resolved."
  },
  {
    "id": "english-1-cinere-depok",
    "caution": "The official Cinere listing gives Blok A No.28-29, while the stored map address says No.28-30. Confirm the correct unit and entrance before visiting.",
    "notes": "Official FAQ: ages 3 to 18; Small Stars program ages 3-6. Official Depok branch list read 19 November 2026: Cinere Blok A No.28-29 rather than the stored No.28-30. Unit range unresolved; no coordinate move."
  }
]) {
    const venue = venues.find(v=>v.id===patch.id);
    if (venue) { venue.caution=patch.caution; venue.notes=patch.notes; }
  }
}
