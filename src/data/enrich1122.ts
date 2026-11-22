import type { Venue, VenueProgram } from "@/types/venue";
import enrich1122b from "./enrich1122b";

// 2026-11-22 owner rules (WhatsApp 07:04 and 07:05):
// "capture more data and i see minor data conflict like 6-11 months vs 6-12
// months. Just solve the difference. Look for general data. And mark the data
// as best quality data we could get" plus "small minor gap just use best
// expert data... expert child growth data as 2nd opinion".
// Applied here:
// - small source gaps (about a month at a boundary) settle with expert
//   child-development references (CDC/WHO/AAP) as the second opinion;
// - larger conflicts need the venue's own dated evidence (latest dated
//   official source wins);
// - general brand-level data from official pages fills branch-level gaps,
//   clearly kept at level "brand" so it never confirms an exact age match;
// - every settled or general claim carries the bestAvailable marker with its
//   basis, reference and check date.
// No pricing was touched in this round.

const checkedAt = "2026-11-22";
const CDC = "https://www.cdc.gov/act-early/milestones/index.html";
const WHO = "https://www.who.int/tools/child-growth-standards/standards/motor-development-milestones";
const AAP = "https://www.healthychildren.org/English/safety-prevention/at-play/Pages/Swim-Lessons.aspx";

function venue(venues: Venue[], id: string): Venue {
  const v = venues.find((x) => x.id === id);
  if (!v) throw new Error(`enrich1122: missing venue ${id}`);
  return v;
}

function program(v: Venue, name: string): VenueProgram {
  const p = v.programs.find((x) => x.name === name);
  if (!p) throw new Error(`enrich1122: missing program ${v.id}/${name}`);
  return p;
}

export default function enrich1122(venues: Venue[]) {
  // ---- 1. Bloom Space Kota Wisata: two small gaps -------------------------
  // Re-read 22 Nov 2026: baby-gym page says Seedlings 6-11 months, homepage
  // says 6-12 months (both live today). Both pages say Growing Explorer
  // 19 months - 3 years; only a third-party school listing said 20 months.
  const bloom = venue(venues, "bloom-space-kota-wisata");
  const seedlings = program(bloom, "Seedlings");
  seedlings.age = {
    minMonths: 6,
    maxMonths: 11,
    level: "branch",
    verification: "provider-confirmed",
    providerAgeUrl: "https://bloomspace.id/baby-gym",
    sourceCheckedAt: checkedAt,
    bestAvailable: true,
    bestAvailableUrl: CDC,
    bestAvailableNote:
      "Two official Bloom pages disagreed by one month: the baby-gym program page says 6-11 months, the homepage says 6-12 months. Settled at 6-11 months with CDC child-development milestones as the second opinion: 12 months is the next milestone stage and belongs to the next class, Little Sprouts (12-19 months). Best available data, checked 22 Nov 2026.",
  };
  seedlings.note =
    "Official baby-gym program page: 6-11 months. The homepage rounds the same class to 6-12 months; the one-month gap is settled (see best-available note).";
  delete seedlings.noteUrl;
  delete seedlings.noteLabel;

  const explorer = program(bloom, "Growing Explorer");
  explorer.age = {
    minMonths: 19,
    maxMonths: 36,
    level: "branch",
    verification: "provider-confirmed",
    providerAgeUrl: "https://bloomspace.id/baby-gym",
    sourceCheckedAt: checkedAt,
    bestAvailable: true,
    bestAvailableNote:
      "Both official Bloom pages (baby-gym program page and homepage) state 19 months - 3 years, re-read 22 Nov 2026; only a third-party school listing said 20 months, so the provider's own pages win. Best available data, checked 22 Nov 2026.",
  };
  explorer.note =
    "Official Bloom pages (program page and homepage) agree: 19 months - 3 years. An earlier third-party school listing said 20 months; the provider's own pages win.";
  delete explorer.noteUrl;
  delete explorer.noteLabel;

  bloom.notes =
    "Official contact page lists the address and WhatsApp. Official Instagram has a Seedlings activity post dated 10 Nov 2026, but it gives no age range. Seedlings and Growing Explorer boundaries were settled on 22 Nov 2026 from the provider's own pages, with CDC milestone data as the second opinion for the one-month gap (see per-class notes). Maps pin and reviews are unchanged; the contact page map embeds Selera Klasik, not a verified Bloom entrance.";
  bloom.lastCheckedAt = checkedAt;

  // ---- 2. Membumi Playspace Cibubur: GYM Bayi 8-19 vs 8-18 ----------------
  // Re-read 22 Nov 2026: the current November 2026 timetable image says
  // Gym Bayi 8-18 bulan; the take.app product page still says 8-19 bulan.
  const membumi = venue(venues, "membumi-playspace-cibubur");
  const gymBayi = program(membumi, "GYM Bayi");
  gymBayi.age = {
    minMonths: 8,
    maxMonths: 18,
    level: "branch",
    verification: "provider-confirmed",
    providerAgeUrl: "https://cdn3.take.app/media/cmvnxk8dp000309l24yqmhues.jpg?width=3840",
    sourceCheckedAt: checkedAt,
    bestAvailable: true,
    bestAvailableUrl: CDC,
    bestAvailableNote:
      "The product page said 8-19 months; the dated November 2026 timetable says 8-18 months. The one-month gap settles to 8-18: the dated current timetable is the venue's newest evidence and the 18-month boundary matches the CDC 18-month milestone stage. Best available data, checked 22 Nov 2026.",
  };
  gymBayi.note =
    "Current November 2026 Cibubur timetable (re-read 22 Nov 2026): Gym Bayi 8-18 bulan. The product page's 8-19 months is superseded. The product thumbnail is an older 2-5-year Gym Class poster.";
  delete gymBayi.noteUrl;
  delete gymBayi.noteLabel;
  membumi.notes = (membumi.notes ?? "").replace(
    "GYM Bayi stays unconfirmed because product 8-19 and timetable 8-18 conflict.",
    "Gym Bayi was settled at 8-18 months on 22 Nov 2026 from the dated November 2026 timetable; the product page's 8-19 months is superseded."
  );
  membumi.lastCheckedAt = checkedAt;

  // ---- 3. Rockstar Academy Gandaria City: dated PDF vs undated web grid ---
  // Larger gaps, so the venue's own dated evidence decides (owner rule). The
  // Winter term PDF (19 Oct 2026 - 17 Jan 2027) was re-verified live on
  // 22 Nov 2026 and still states these month bands.
  const gc = venue(venues, "rockstar-academy-gandaria-city");
  const gcPdf = "https://www.rockstaracademy.com/lib/upload/files/club/GC_Schedule_Winter_20261.pdf";
  const lp1 = program(gc, "Learn & Play 1");
  lp1.age = {
    minMonths: 6,
    maxMonths: 18,
    level: "branch",
    verification: "provider-confirmed",
    providerAgeUrl: gcPdf,
    sourceCheckedAt: checkedAt,
    bestAvailable: true,
    bestAvailableNote:
      "The venue's own sources disagreed: the dated Winter term PDF says 6-18 months, the undated web grid says 0-2 years. A gap this large needs the venue's own dated evidence, so the current-term PDF wins. Best available data, checked 22 Nov 2026.",
  };
  lp1.note =
    "6-18 months from the current branch Winter term PDF (19 Oct 2026 - 17 Jan 2027), re-verified 22 Nov 2026. The undated web grid still shows 0-2 yrs and is superseded for this term.";
  const lp2 = program(gc, "Learn & Play 2");
  lp2.age = {
    minMonths: 19,
    maxMonths: 35,
    level: "branch",
    verification: "provider-confirmed",
    providerAgeUrl: gcPdf,
    sourceCheckedAt: checkedAt,
    bestAvailable: true,
    bestAvailableNote:
      "The venue's own sources disagreed: the dated Winter term PDF says 19-35 months, the undated web grid says 1-3 years. A gap this large needs the venue's own dated evidence, so the current-term PDF wins. Best available data, checked 22 Nov 2026.",
  };
  lp2.note =
    "19-35 months from the current branch Winter term PDF (19 Oct 2026 - 17 Jan 2027), re-verified 22 Nov 2026. The undated web grid still shows 1-3 yrs and is superseded for this term.";
  gc.lastCheckedAt = checkedAt;

  // ---- 4. Aquatic Baby Bintaro: 3 vs 6 month lower bound ------------------
  // Re-read 22 Nov 2026: summary card says 6 bulan - 2 tahun, class detail
  // text says 3 bulan - 2 tahun and mentions a Newborn level. Conservative
  // settle at the provider's summary bound, with AAP as the second opinion.
  const ab = venue(venues, "aquatic-baby-bintaro");
  const abBaby = program(ab, "Baby Class");
  abBaby.age = {
    ...abBaby.age,
    minMonths: 6,
    maxMonths: 24,
    level: "brand",
    verification: "provider-confirmed",
    providerAgeUrl: "https://aquatic-baby.com/program-1",
    sourceCheckedAt: checkedAt,
    bestAvailable: true,
    bestAvailableUrl: AAP,
    bestAvailableNote:
      "The provider's own pages disagree on the lower bound (3 vs 6 months). Settled at the more conservative 6 months, consistent with AAP guidance that formal swim lessons start from age 1 and younger babies join parent-child water classes. Babies under 6 months: confirm with Aquatic Baby. Best available data, checked 22 Nov 2026.",
  };
  delete abBaby.age.sourceConflict;
  abBaby.note =
    "Provider summary card: 6 bulan - 2 tahun; the class detail text says 3 bulan - 2 tahun and mentions a Newborn level. Settled at the summary bound of 6 months (see best-available note).";
  ab.lastCheckedAt = checkedAt;

  // ---- 5. Kiddiegym Bogor Siliwangi: vague 6-48 lump replaced -------------
  // Re-read 22 Nov 2026: the official classes page names three baby gym
  // classes: Kiddiebabes 6 months - walking age, Kiddiewalker walking - 2
  // years, Kiddiejumper 2 - 4 years. "Walking age" is read as about 12
  // months using the WHO window of achievement for walking alone (about
  // 8-17 months) as the expert second opinion.
  const kg = venue(venues, "kiddiegym-bogor-siliwangi");
  const kgUrl = "https://montessorischoolbogor.com/id/programs/classes/";
  const kgIdx = kg.programs.findIndex((p) => p.name === "Kiddiegym: Baby Gym");
  if (kgIdx < 0) throw new Error("enrich1122: missing Kiddiegym: Baby Gym");
  const kiddiebabes: VenueProgram = {
    name: "Kiddiegym: Kiddiebabes",
    category: "Gym & Movement",
    offering: "offered",
    age: {
      minMonths: 6,
      maxMonths: 12,
      level: "branch",
      verification: "provider-confirmed",
      providerAgeUrl: kgUrl,
      sourceCheckedAt: checkedAt,
      bestAvailable: true,
      bestAvailableUrl: WHO,
      bestAvailableNote:
        "Official classes page says 6 months - walking age. Walking age is read as about 12 months using the WHO window of achievement for walking alone (about 8-17 months) as the expert second opinion. Best available data, checked 22 Nov 2026.",
    },
    note: "Gym and sensory classes share the school building. A June 2025 parent review questioned the school's Montessori materials and cleanliness; this is one parent's account, not a safety finding. Visit and ask about the class before enrolling.",
    noteUrl: "https://viaverborum.wordpress.com/2025/06/27/review-walker-kiddieland-kiddiegym-montessori-bogor/",
    noteKind: "parent-review",
    noteLabel: "Parent review, June 2025",
  };
  const kiddiewalker: VenueProgram = {
    name: "Kiddiegym: Kiddiewalker",
    category: "Gym & Movement",
    offering: "offered",
    age: {
      minMonths: 12,
      maxMonths: 24,
      level: "branch",
      verification: "provider-confirmed",
      providerAgeUrl: kgUrl,
      sourceCheckedAt: checkedAt,
      bestAvailable: true,
      bestAvailableUrl: WHO,
      bestAvailableNote:
        "Official classes page says walking - 2 years old; walking age read as about 12 months per the WHO window of achievement for walking alone (about 8-17 months). Best available data, checked 22 Nov 2026.",
    },
    note: "Official classes page: walking - 2 years old.",
  };
  const kiddiejumper: VenueProgram = {
    name: "Kiddiegym: Kiddiejumper",
    category: "Gym & Movement",
    offering: "offered",
    age: {
      minMonths: 24,
      maxMonths: 48,
      level: "branch",
      verification: "provider-confirmed",
      providerAgeUrl: kgUrl,
      sourceCheckedAt: checkedAt,
    },
    note: "Official classes page: 2 - 4 years old.",
  };
  kg.programs.splice(kgIdx, 1, kiddiebabes, kiddiewalker, kiddiejumper);
  kg.lastCheckedAt = checkedAt;

  // ---- 6. General brand-level data for branches with no age data ----------
  // Official brand program pages, re-read 22 Nov 2026. Level stays "brand"
  // so these never confirm an exact branch age match; each carries the
  // bestAvailable marker. Only branches that currently have no offered
  // program with ages receive these.
  const brandNote = "(brand-level; this branch has not published its own ages)";
  const addBrandPrograms = (chainName: string, make: () => VenueProgram[]) => {
    let added = 0;
    for (const v of venues) {
      if (v.chain !== chainName) continue;
      const hasOfferedAges = v.programs.some((p) => p.offering === "offered" && p.age.minMonths != null);
      if (hasOfferedAges) continue;
      const fresh = make().filter((np) => !v.programs.some((p) => p.name === np.name));
      if (!fresh.length) continue;
      v.programs.push(...fresh);
      added += fresh.length;
    }
    return added;
  };
  const brandClaim = (
    minMonths: number,
    maxMonths: number,
    providerAgeUrl: string,
    bestAvailableNote: string
  ) => ({
    minMonths,
    maxMonths,
    level: "brand" as const,
    verification: "provider-confirmed" as const,
    providerAgeUrl,
    sourceCheckedAt: checkedAt,
    bestAvailable: true,
    bestAvailableUrl: providerAgeUrl,
    bestAvailableNote,
  });

  addBrandPrograms("I Can Read", () => [
    {
      name: "I Can Read Discovery",
      category: "English & Language",
      offering: "offered",
      age: brandClaim(
        30,
        83,
        "https://icanread.co.id/program/discovery/",
        "General brand data from the official I Can Read program page (Discovery 1-3, ages 2.5-7 years); no branch-level ages are published. Best available data, checked 22 Nov 2026."
      ),
      note: `Official brand program page: Discovery 1-3 for ages 2.5-7 years ${brandNote}.`,
    },
  ]);

  addBrandPrograms("English 1", () => [
    {
      name: "Small Stars",
      category: "English & Language",
      offering: "offered",
      age: brandClaim(
        36,
        71,
        "https://english1.co.id/program/smallstars/",
        "General brand data from the official English 1 program page (Small Stars, ages 3-6 years); no branch-level ages are published. Best available data, checked 22 Nov 2026."
      ),
      note: `Official brand program page: Small Stars for ages 3-6 years ${brandNote}.`,
    },
  ]);

  addBrandPrograms("Aquababies", () => [
    {
      name: "Baby Swim",
      category: "Swim",
      offering: "offered",
      age: brandClaim(
        0,
        35,
        "https://aquababiesindonesia.id/",
        "General brand data from the official Aquababies site (baby swimming, 0 months to 3 years); no branch-level ages are published. Best available data, checked 22 Nov 2026."
      ),
      note: `Official site: baby swimming from 0 months to 3 years ${brandNote}.`,
    },
  ]);

  addBrandPrograms("Music Wonderworld", () => [
    {
      name: "Music class (baby and toddler)",
      category: "Music",
      offering: "offered",
      age: brandClaim(
        6,
        47,
        "https://musicwonderworld.com/id/about-music-wonderworld/",
        "General brand data from the official Music Wonderworld about page (students from 6 months; private instrument classes start at 4 years); no branch-level ages are published. Best available data, checked 22 Nov 2026."
      ),
      note: `Official about page: students from 6 months to adult; private instrument classes start at 4 years ${brandNote}.`,
    },
  ]);

  const sparksSwimBa =
    "General brand data from the official Sparks Swim homepage (Baby Swim 6-18 months, Tiny Swim 1.5-3 years, Little Swim 3-5 years); no branch-level ages are published. Best available data, checked 22 Nov 2026.";
  addBrandPrograms("Sparks Swim", () => [
    {
      name: "Baby Swim",
      category: "Swim",
      offering: "offered",
      age: brandClaim(6, 18, "https://sparks-swim.com/", sparksSwimBa),
      note: `Official homepage: Baby Swim for ages 6-18 months ${brandNote}.`,
    },
    {
      name: "Tiny Swim",
      category: "Swim",
      offering: "offered",
      age: brandClaim(18, 36, "https://sparks-swim.com/", sparksSwimBa),
      note: `Official homepage: Tiny Swim for ages 1.5-3 years ${brandNote}.`,
    },
    {
      name: "Little Swim",
      category: "Swim",
      offering: "offered",
      age: brandClaim(36, 60, "https://sparks-swim.com/", sparksSwimBa),
      note: `Official homepage: Little Swim for ages 3-5 years ${brandNote}.`,
    },
  ]);

  // Round B (2026-11-22): provider-confirmed and listed ages for Sparks,
  // Anak Air, Gavrila, Sociable and Morning Nest. Kept in its own file and
  // wired here so the large venues.ts registry stays untouched.
  enrich1122b(venues);

}
