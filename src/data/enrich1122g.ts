import type { Venue } from "@/types/venue";

// Round G (2026-11-22): dated Winter Term evidence for the 15 Rockstar
// Academy branches that already had branch-confirmed ages but no term.
// Evidence read 22 Nov 2026 from each branch's own official schedule PDF,
// linked from https://www.rockstaracademy.com/schedules-and-locations/<branch>:
// 14 of 15 PDFs are the branch "Winter Term Schedule" stating
// "19 Oct 2026 until 17 Jan 2027", stamped "UPDATED 16 NOVEMBER 2026", and
// still listing the Crawler, Walker and Jumper classes these branches carry.
// Hampton Square's W5 PDF link returns an error page; its live schedule page
// shows "Current Term: Winter Term 2026", and the term window matches the
// other 14 branch PDFs (and the 5 branches already enriched on 3-4 Nov).
// fitStatus moves to branch-confirmed-dated-term; lastCheckedAt re-dated.
// No prices touched.

const checkedAt = "2026-11-22";
const TERM = "19 Oct 2026 until 17 Jan 2027";

const branches = [
  "rockstar-academy-aeon-mall-sentul-city",
  "rockstar-academy-aeon-mall-deltamas",
  "rockstar-academy-central-park-2",
  "rockstar-academy-gajah-mada-plaza",
  "rockstar-academy-grand-metropolitan-bekasi",
  "rockstar-academy-hampton-square",
  "rockstar-academy-lippo-mall-kemang",
  "rockstar-academy-lippo-mall-puri",
  "rockstar-academy-lippo-plaza-ekalokasari",
  "rockstar-academy-living-world-alam-sutera",
  "rockstar-academy-mall-of-indonesia",
  "rockstar-academy-pik-avenue",
  "rockstar-academy-pesona-square",
  "rockstar-academy-pluit-village",
  "rockstar-academy-tsm-cibubur",
];

export default function enrich1122g(venues: Venue[]) {
  for (const id of branches) {
    const v = venues.find((x) => x.id === id);
    if (!v) throw new Error(`enrich1122g: missing venue ${id}`);
    for (const p of v.programs) {
      if (!p.term) p.term = TERM;
    }
    v.fitStatus = "branch-confirmed-dated-term";
    v.lastCheckedAt = checkedAt;
  }
}
