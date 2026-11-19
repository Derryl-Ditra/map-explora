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

  // Nov20 wider existing-record verification. Sparks address discrepancies keep
  // pins with search-only routing; no coordinate move, no closure claim.
  for (const patch of [
  {
    "id": "sparks-sports-academy-taman-palem",
    "caution": "The current official Jakarta listing gives Jl. Palem Raja Barat Citra 3 No.3A blok A13, while the stored map address says No.10. Confirm the current unit and entrance with the branch before visiting. This pin is not verified for the current official address.",
    "notes": "Official city page: 'Kelas olahraga & sensori untuk anak usia 6 bulan-7 tahun'. Booking routes: WhatsApp +62 813-9000-6606 (all schedule CTAs) and a Loket organizer page https://loket.com/o/lkt-dWhw (no current events listed). No per-branch time schedule published online (checked 2026-11-03). Official Jakarta branch list read 20 November 2026 gives Jl. Palem Raja Barat Citra 3 No.3A blok A13, RT.2/RW.13 rather than the stored No.10, RT.5/RW.13. Unit and entrance unresolved; no coordinate move. Search-only routing until the current entrance is confirmed."
  },
  {
    "id": "sparks-sports-academy-tangerang-city",
    "caution": "The current official Tangerang listing gives Jl. Perintis Kemerdekaan 42, while the stored map address says Ruko Citypark No.17 Blok G. Confirm the current unit and entrance with the branch before visiting. This pin is not verified for the current official address.",
    "notes": "Official city page: 'Kelas olahraga & sensori untuk anak usia 6 bulan-7 tahun'. Booking routes: WhatsApp +62 813-9000-6606 (all schedule CTAs) and a Loket organizer page https://loket.com/o/lkt-dWhw (no current events listed). No per-branch time schedule published online (checked 2026-11-03). Official Tangerang branch list read 20 November 2026 gives Jl. Perintis Kemerdekaan 42 rather than the stored Ruko Citypark Jl. Perintis Kemerdekaan No.17 Blk G. Unit and entrance unresolved; no coordinate move. Search-only routing until the current entrance is confirmed."
  }
]) {
    const venue = venues.find(v=>v.id===patch.id);
    if (venue) { venue.caution=patch.caution; venue.notes=patch.notes; }
  }

  // Nov20 BLS BSD Preschool: official contact page binds the exact unit, and
  // the official BSD branch opening announcement lists branch class ages.
  const blsBsd = venues.find(v => v.id === "bright-little-stars-bsd-preschool");
  if (blsBsd) {
    blsBsd.programs = [
      { name: "Toddler", category: "Preschool", offering: "offered",
        age: { minMonths: 24, maxMonths: 35, level: "branch", verification: "provider-confirmed",
          providerAgeUrl: "https://www.brightlittlestarsedu.com/blog/bright-little-stars-preschool-now-open-in-bsd", sourceCheckedAt: "2026-11-20" },
        note: "Official BSD branch opening announcement, 12 December 2025: Toddler class ages 2-3. Program label from the announcement, not a dated class schedule. Confirm current class days with the branch." },
      { name: "Nursery", category: "Preschool", offering: "offered",
        age: { minMonths: 36, maxMonths: 47, level: "branch", verification: "provider-confirmed",
          providerAgeUrl: "https://www.brightlittlestarsedu.com/blog/bright-little-stars-preschool-now-open-in-bsd", sourceCheckedAt: "2026-11-20" },
        note: "Official BSD branch opening announcement, 12 December 2025: Nursery class ages 3-4. Program label from the announcement, not a dated class schedule. Confirm current class days with the branch." },
      { name: "Kindergarten 1 & 2", category: "Preschool", offering: "offered",
        age: { minMonths: 48, maxMonths: 71, level: "branch", verification: "provider-confirmed",
          providerAgeUrl: "https://www.brightlittlestarsedu.com/blog/bright-little-stars-preschool-now-open-in-bsd", sourceCheckedAt: "2026-11-20" },
        note: "Official BSD branch opening announcement, 12 December 2025: Kindergarten 1 & 2 ages 4-6. Program label from the announcement, not a dated class schedule. Confirm current class days with the branch." }
    ];
    blsBsd.operatingStatus = { state: "official-listed", source: "https://www.brightlittlestarsedu.com/contact-us", checkedAt: "2026-11-20" };
    blsBsd.lastCheckedAt = "2026-11-20";
    blsBsd.notes = "Official contact page read 20 November 2026 confirms BSD Preschool at Daikanyama Blok A16, The Zora Commercial Business Living, Lengkong Kulon, Pagedangan. Official opening announcement (12 December 2025) lists Toddler (ages 2-3), Nursery (ages 3-4) and Kindergarten 1 & 2 (ages 4-6) with a Montessori + EYLF curriculum for this branch. Two distinct BSD listings remain on Maps; pin unchanged. Ages are program labels from the official announcement, not dated class schedules.";
  }

  // Nov20 Rockstar Grand Metropolitan Bekasi: the locations page read
  // 20 November 2026 omits this branch, but the official current-term schedule
  // PDF updated 16 November 2026 keeps it operating. Not a closure claim.
  const rockGb = venues.find(v => v.id === "rockstar-academy-grand-metropolitan-bekasi");
  if (rockGb) {
    rockGb.operatingStatus = { state: "official-listed", source: "https://www.rockstaracademy.com/lib/upload/files/club/GB_Schedule_Winter_2026_W5.pdf", checkedAt: "2026-11-20" };
    rockGb.notes = (rockGb.notes || "") + " Read 20 November 2026: the branch no longer appears on the official Schedules & Locations page, but the official Winter Term schedule PDF updated 16 November 2026 (term 19 Oct 2026 to 17 Jan 2027) still lists its classes. Treated as operating on the current-term document, not as a closure. Confirm before visiting.";
  }
}
