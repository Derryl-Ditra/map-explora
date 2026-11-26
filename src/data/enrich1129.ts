// 2026-11-26 data capture (owner yes 14:04): opening hours printed on each provider's own
// page for this branch. Only branch-specific official text; nothing from Maps or partners.
import type { Venue } from "../types/venue";

const CHECKED = "2026-11-26";
const HOURS: Record<string, { text: string; sourceUrl: string; kind?: "school" }> = {
  "bumi-nusantara-montessori-bsd": { text: "Mon-Fri 08:00-15:00", sourceUrl: "https://buminusantaramontessori.sch.id/" },
  // Montessori Studio entry (the site also lists a separate salon with other hours)
  "kimi-friends-montessori-gading-serpong": { text: "Mon-Sat 08:30-15:00", sourceUrl: "https://www.kimiandfriends.id/" },
  "golden-baby-school-jakarta-garden-city": { text: "Mon-Fri 07:30-14:30", sourceUrl: "https://goldenschool.id/", kind: "school" },
};

export default function enrich1129(venues: Venue[]) {
  for (const v of venues) {
    const h = HOURS[v.id];
    if (h && !v.openingHours) v.openingHours = { ...h, checkedAt: CHECKED };
  }
}
