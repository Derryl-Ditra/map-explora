import type { Venue } from "@/types/venue";

// 2026-11-24 depth batch 3 (owner-approved data-depth upgrade): official-page
// sweeps for non-fee depth on English 1, I Can Read and Bright Little Stars.
// Sources re-read 2026-11-24: english1.co.id homepage, /program/smallstars/ and
// /school/{jakarta,tangerang,depok,bekasi,bogor}/; icanread.co.id homepage,
// /program/, /program/discovery/ and /location/; icanread.asia LocateUs;
// brightlittlestarsedu.com homepage and /preschool.
// - English 1: official FAQ states a free trial class is available (chain-level
//   statement, read on /school/jakarta/); recorded as a trial cardNote. No fees
//   published. Small Stars age range re-verified on the program page: 3-6 years
//   (the school-page FAQ's "3-5" is rounded down; program page and homepage
//   both state 3-6, so the recorded 36-71 months stands).
// - I Can Read: Discovery program page re-verified (2.5-7 years). The official
//   /location/ page lists centres but renders only 6 of ~50 statically; no
//   per-branch changes beyond re-verification.
// - Bright Little Stars: the official /preschool page lists classes per branch.
//   Kemang gains Toddler / Nursery / K1 & K2 (it previously carried baby
//   classes only). BSD Preschool's class source is upgraded from the opening
//   blog post to the canonical /preschool page. All four venues gain the
//   official website link. The BSD Learning Center and Bintaro branches are
//   not listed with preschool classes on /preschool, so they keep their
//   baby-class records unchanged.

function venue(venues: Venue[], id: string): Venue {
  const v = venues.find((x) => x.id === id);
  if (!v) throw new Error(`enrich1126: missing venue ${id}`);
  return v;
}

const TODAY = "2026-11-24";

const E1_TRIAL_NOTE =
  "Official FAQ (read 24 Nov 2026): free trial class available; booking via English 1 hotline 1500 947 or the center. No fees published. / FAQ resmi (dibaca 24 Nov 2026): tersedia free trial class; pendaftaran lewat hotline English 1 1500 947 atau center. Biaya tidak dipublikasikan.";

const E1_REREAD_OS =
  /^https:\/\/english1\.co\.id\/(school\/(jakarta|tangerang|depok|bekasi|bogor)\/)?$/;
const ICR_REREAD_OS =
  /^https:\/\/(icanread\.co\.id\/(location\/)?|icanread\.asia\/indonesia\/english\/LocateUs)$/;

export default function enrich1126(venues: Venue[]) {
  // English 1: chain-level trial note + re-verification stamps.
  for (const v of venues.filter((x) => x.chain === "English 1")) {
    v.lastCheckedAt = TODAY;
    if (!v.cardNote) v.cardNote = E1_TRIAL_NOTE;
    const os = v.operatingStatus;
    if (os && os.source && E1_REREAD_OS.test(os.source)) os.checkedAt = TODAY;
    for (const p of v.programs) {
      if (
        p.age &&
        p.age.providerAgeUrl === "https://english1.co.id/program/smallstars/"
      )
        p.age = { ...p.age, sourceCheckedAt: TODAY };
    }
  }

  // I Can Read: re-verification stamps only; no new claims.
  for (const v of venues.filter((x) => x.chain === "I Can Read")) {
    v.lastCheckedAt = TODAY;
    const os = v.operatingStatus;
    if (os && os.source && ICR_REREAD_OS.test(os.source)) os.checkedAt = TODAY;
    for (const p of v.programs) {
      if (
        p.age &&
        p.age.providerAgeUrl === "https://icanread.co.id/program/discovery/"
      )
        p.age = { ...p.age, sourceCheckedAt: TODAY };
    }
  }

  // Bright Little Stars: official website link on all four branches
  // (brightlittlestarsedu.com re-read and live 2026-11-24).
  for (const id of [
    "bright-little-stars-kemang",
    "bright-little-stars-bintaro",
    "bright-little-stars-bsd-learning-center",
    "bright-little-stars-bsd-preschool",
  ]) {
    const v = venue(venues, id);
    v.website = "https://www.brightlittlestarsedu.com/";
    v.lastCheckedAt = TODAY;
    const os = v.operatingStatus;
    if (
      os &&
      os.source &&
      /^https:\/\/www\.brightlittlestarsedu\.com\/(contact-us)?$/.test(os.source)
    )
      os.checkedAt = TODAY;
  }

  // Kemang: /preschool lists Toddler (2-3 yo), Nursery (3-4 yo) and
  // K1 & K2 (4-6 yo) classes for Kemang explicitly; add them branch-confirmed.
  {
    const v = venue(venues, "bright-little-stars-kemang");
    const PRESCHOOL = "https://www.brightlittlestarsedu.com/preschool";
    const mk = (
      name: string,
      minMonths: number,
      maxMonths: number,
    ): Venue["programs"][number] => ({
      name,
      offering: "offered",
      age: {
        minMonths,
        maxMonths,
        level: "branch",
        verification: "provider-confirmed",
        providerAgeUrl: PRESCHOOL,
        sourceCheckedAt: TODAY,
      },
    });
    v.programs.push(
      mk("Toddler Class", 24, 35),
      mk("Nursery Class", 36, 47),
      mk("Kindergarten 1 & 2", 48, 71),
    );
  }

  // BSD Preschool: same three classes already recorded from the opening blog
  // post; upgrade their source to the canonical /preschool page, re-read today.
  {
    const v = venue(venues, "bright-little-stars-bsd-preschool");
    for (const p of v.programs) {
      if (
        p.age &&
        p.age.providerAgeUrl &&
        p.age.providerAgeUrl.startsWith(
          "https://www.brightlittlestarsedu.com/blog/bright-little-stars-preschool",
        )
      )
        p.age = {
          ...p.age,
          providerAgeUrl: "https://www.brightlittlestarsedu.com/preschool",
          sourceCheckedAt: TODAY,
        };
    }
  }
}
