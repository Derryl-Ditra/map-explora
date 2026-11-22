import type { Venue, VenueProgram } from "@/types/venue";

// 2026-11-22 enrichment round B: ages for the venues that had no
// provider-confirmed age, researched live on 2026-11-22.
// Data rules followed (map-explora-data-rules): every age row carries a
// verifiable source URL and a check date; partner/blog claims stay
// "listed-unconfirmed"; only the provider's own pages upgrade to
// "provider-confirmed". No pricing data touched in this round.
// Sources checked 2026-11-22:
// - Sparks: https://academy.sparks-edu.com/kelas-gymnastic-anak/ states
//   gymnastics classes for "usia 1-7 tahun" (12-84 months), brand level.
//   No dedicated Multi Sports or Dance age page exists on the site, so
//   those two programs keep their regional-page listed-unconfirmed rows.
// - Anak Air: official site has no age text (FAQ ages live in photos
//   without text). Class-level ages come from a third-party profile
//   (lifehacks.id) and stay listed-unconfirmed.
// - Gavrila: https://gavrilagym.online/kelas lists Toddler 2.5-3.5 yr,
//   Kinder 3.5-5.0 yr, Kid 6.0+ yr. This replaces the earlier reading
//   that the brand only recommended age 6+.
// - Sociable: https://www.sociablegrouplearning.com/faq states
//   "Kami menerima anak usia 3 sampai 16 tahun" (3-16 years).
// - Morning Nest: Happy Kamper provider page adds a Weekend Pop-up
//   Class for ages 0-5 alongside the existing Nest Beginners 2-4 row.

const checkedAt = "2026-11-22";
const SPARKS_GYM_URL = "https://academy.sparks-edu.com/kelas-gymnastic-anak/";
const ANAK_AIR_URL = "https://lifehacks.id/anak-air-swim-school/";
const GAVRILA_URL = "https://gavrilagym.online/kelas";
const SOCIABLE_URL = "https://www.sociablegrouplearning.com/faq";
const MORNING_NEST_URL =
  "https://happykamper.io/id/providers/morning-nest-preschool-955";

function venue(venues: Venue[], id: string): Venue {
  const v = venues.find((x) => x.id === id);
  if (!v) throw new Error(`enrich1122b: missing venue ${id}`);
  return v;
}

function program(v: Venue, name: string): VenueProgram {
  const p = v.programs.find((x) => x.name === name);
  if (!p) throw new Error(`enrich1122b: missing program ${v.id}/${name}`);
  return p;
}

function addProgram(v: Venue, entry: VenueProgram) {
  if (v.programs.some((x) => x.name === entry.name)) {
    throw new Error(`enrich1122b: duplicate program ${v.id}/${entry.name}`);
  }
  v.programs.push(entry);
}

export default function enrich1122b(venues: Venue[]) {
  // ---- 1. Sparks: gymnastics 12-84 months upgraded to provider-confirmed
  // Every Sparks Sports Academy branch carries the same brand-level
  // gymnastics row (12-84 months) that pointed at a regional page. The
  // official class page states the same range, so upgrade all rows.
  // 2026-11-23: 24 -> 25 with the Pondok Pinang branch added.
  const sparksGymnastics = venues.filter(
    (v) =>
      v.id.startsWith("sparks-sports-academy-") &&
      v.programs.some(
        (p) =>
          p.name === "Gymnastics" &&
          p.age?.minMonths === 12 &&
          p.age?.maxMonths === 84 &&
          p.age?.level === "brand" &&
          p.age?.verification === "listed-unconfirmed"
      )
  );
  for (const v of sparksGymnastics) {
    const gym = program(v, "Gymnastics");
    gym.offering = "offered";
    gym.age = {
      ...gym.age!,
      providerAgeUrl: SPARKS_GYM_URL,
      sourceCheckedAt: checkedAt,
      verification: "provider-confirmed",
    };
    gym.note =
      "Official class page (checked 2026-11-22): gymnastics for ages 1-7 years (12-84 months), brand level. Multi Sports and Dance stay listed-unconfirmed; the site has no dedicated age page for them.";
  }
  if (sparksGymnastics.length !== 25) {
    throw new Error(
      `enrich1122b: expected 25 Sparks gymnastics rows, found ${sparksGymnastics.length}`
    );
  }

  // ---- 2. Anak Air: class-level ages from a dated third-party profile
  // The official site publishes no age text. lifehacks.id profiles the
  // school with a level table: Tadpole 1-3 yr; Minnow, Sea Otter and
  // Leapfrog 3-6 yr; Starfish, Salamander and Seahorse 6-9 yr;
  // Sea Turtle 9-12 yr. Secondary source, so listed-unconfirmed.
  const anakAirLevels: Array<{
    name: string;
    minMonths: number;
    maxMonths: number;
    note: string;
  }> = [
    {
      name: "Tadpole class",
      minMonths: 12,
      maxMonths: 36,
      note: "Third-party profile (lifehacks.id, checked 2026-11-22): Tadpole level for ages 1-3 years. Not on the official site; confirm with the branch.",
    },
    {
      name: "Minnow / Sea Otter / Leapfrog classes",
      minMonths: 36,
      maxMonths: 72,
      note: "Third-party profile (lifehacks.id, checked 2026-11-22): Minnow, Sea Otter and Leapfrog levels for ages 3-6 years. Not on the official site; confirm with the branch.",
    },
    {
      name: "Starfish / Salamander / Seahorse classes",
      minMonths: 72,
      maxMonths: 108,
      note: "Third-party profile (lifehacks.id, checked 2026-11-22): Starfish, Salamander and Seahorse levels for ages 6-9 years. Not on the official site; confirm with the branch.",
    },
    {
      name: "Sea Turtle class",
      minMonths: 108,
      maxMonths: 144,
      note: "Third-party profile (lifehacks.id, checked 2026-11-22): Sea Turtle level for ages 9-12 years. Not on the official site; confirm with the branch.",
    },
  ];
  for (const id of [
    "anak-air-kebagusan",
    "anak-air-pondok-indah",
    "anak-air-kemang",
    "anak-air-grand-cibubur",
    "anak-air-limo",
  ]) {
    const v = venue(venues, id);
    for (const lvl of anakAirLevels) {
      addProgram(v, {
        name: lvl.name,
        offering: "offered",
        age: {
          minMonths: lvl.minMonths,
          maxMonths: lvl.maxMonths,
          level: "brand",
          verification: "listed-unconfirmed",
          providerAgeUrl: ANAK_AIR_URL,
          sourceCheckedAt: checkedAt,
        },
        note: lvl.note,
      });
    }
  }

  // ---- 3. Gavrila: provider-confirmed brand rows from the /kelas page
  // Official page (checked 2026-11-22): Toddler 2.5-3.5 yr (30-42 mo),
  // Kinder 3.5-5.0 yr (42-60 mo), Kid 6.0+ yr (72+ mo). The existing
  // Traveloka Kinder row stays as the branch-level partner listing; its
  // note no longer needs the "brand site only recommends 6+" caveat.
  for (const id of [
    "gavrila-gymnastics-kelapa-gading",
    "gavrila-gymnastics-serpong",
  ]) {
    const v = venue(venues, id);
    const kinder = program(v, "Kinder gymnastics class (Recreational Hall)");
    kinder.note =
      "Partner-listed (Traveloka Xperience, checked 2026-11-10): Kinder class from 3.5 years; Kid class 6 years and up. The brand's own class page (gavrilagym.online/kelas, checked 2026-11-22) now confirms the same structure at brand level: Toddler 2.5-3.5, Kinder 3.5-5.0, Kid 6.0+. Confirm the Kinder slot with the branch before going.";
    addProgram(v, {
      name: "Toddler gymnastics class",
      category: "Gym & Movement",
      offering: "offered",
      age: {
        minMonths: 30,
        maxMonths: 42,
        level: "brand",
        verification: "provider-confirmed",
        providerAgeUrl: GAVRILA_URL,
        sourceCheckedAt: checkedAt,
      },
      note: "Official class page (checked 2026-11-22): Toddler Class for ages 2.5-3.5 years, 1.0-hour sessions.",
    });
    addProgram(v, {
      name: "Kinder gymnastics class (brand page)",
      category: "Gym & Movement",
      offering: "offered",
      age: {
        minMonths: 42,
        maxMonths: 60,
        level: "brand",
        verification: "provider-confirmed",
        providerAgeUrl: GAVRILA_URL,
        sourceCheckedAt: checkedAt,
      },
      note: "Official class page (checked 2026-11-22): Kinder Class for ages 3.5-5.0 years, 1.0-hour sessions.",
    });
    addProgram(v, {
      name: "Kid gymnastics class",
      category: "Gym & Movement",
      offering: "offered",
      age: {
        minMonths: 72,
        maxMonths: null,
        level: "brand",
        verification: "provider-confirmed",
        providerAgeUrl: GAVRILA_URL,
        sourceCheckedAt: checkedAt,
      },
      note: "Official class page (checked 2026-11-22): Kid Class from age 6, 1.5-hour sessions, separate programs for girls and boys.",
    });
  }

  // ---- 4. Sociable Meruya: provider FAQ confirms 3-16 years
  const sociable = venue(venues, "sociable-inclusive-learning-meruya");
  addProgram(sociable, {
    name: "Inclusive education program (general)",
    offering: "offered",
    age: {
      minMonths: 36,
      maxMonths: 192,
      level: "brand",
      verification: "provider-confirmed",
      providerAgeUrl: SOCIABLE_URL,
      sourceCheckedAt: checkedAt,
    },
    note: "Official FAQ (checked 2026-11-22): the school accepts children aged 3 to 16 years. The partner-listed toddler class (18-36 months) is a narrower class inside that range; confirm support needs and the next session with the provider.",
  });

  // ---- 5. Morning Nest: partner-listed Weekend Pop-up Class, ages 0-5
  const nest = venue(venues, "morning-nest-preschool-bojongsari");
  addProgram(nest, {
    name: "Weekend Pop-up Class",
    offering: "offered",
    age: {
      minMonths: 0,
      maxMonths: 60,
      level: "branch",
      verification: "listed-unconfirmed",
      providerAgeUrl: MORNING_NEST_URL,
      sourceCheckedAt: checkedAt,
    },
    note: "Partner-listed (Happy Kamper, checked 2026-11-22): Weekend Pop-up Class for ages 0-5. Confirm the age fit and next session with the provider.",
  });
}
