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
      // 2026-11-22 QC price-note cut: keeper facts only, one "; "-separated row each.
      note: "Selected date only; No refund or rescheduling; Anti-slip socks required; Equipment ages 12 mo-12 yr"
    }];
  }
  // The existing data entry point applies the next dated source patch last.
  enrich1115(venues);
  if (!venues.some(v => v.id === "kiddies88-maspen-cimuning")) enrich1118(venues);

  // Nov19 official-address discrepancies: keep pins, disable exact routing.
  // Nov20 wider existing-record verification. Sparks address discrepancies keep
  // pins with search-only routing; no coordinate move, no closure claim.
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
  },
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

  // Nov20 Rockstar Grand Metropolitan Bekasi: official locations page lists
  // the branch (Floor LG2 Unit #2C); operating evidence refreshed to the
  // current-term schedule PDF updated 15 November 2026.
  const rockGb = venues.find(v => v.id === "rockstar-academy-grand-metropolitan-bekasi");
  if (rockGb) {
    rockGb.operatingStatus = { state: "official-listed", source: "https://www.rockstaracademy.com/lib/upload/files/club/GB_Schedule_Winter_2026_W5.pdf", checkedAt: "2026-11-20" };
    rockGb.notes = (rockGb.notes || "") + " Read 20 November 2026: the official Schedules & Locations page lists this branch as Grand Metropolitan Mall, Floor LG2 Unit #2C, and the official Winter Term schedule PDF updated 15 November 2026 (term 19 Oct 2026 to 17 Jan 2027) lists its classes. Operating evidence refreshed to the current-term document. Confirm session availability before visiting.";
  }
}
