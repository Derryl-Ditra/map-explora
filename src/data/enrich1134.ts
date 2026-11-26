// Price re-read 2026-11-27 of official pages. Only listings whose stored amount matched the page today get a new
// checkedAt. No amount, label or note changes. Anak Air: per-branch fee flyer, 4 lessons x 30 min row.
// Deen Haus: single visit 150,000, 4 sessions 590,000, 8 sessions 1,000,000. Golden Baby: 100,000 per session.
// GymnAdemics Gading Serpong: 5 trial sessions 1,000,000.
import type { Venue } from "../types/venue";

const CONFIRMED: Array<[string, string, number]> = [
  ["anak-air-grand-cibubur", "Harga-Cibubur", 715000],
  ["anak-air-kemang", "Harga-Kemang", 825000],
  ["anak-air-limo", "Harga-Limo", 605000],
  ["anak-air-pondok-indah", "Harga-Pondok-Indah", 825000],
  ["anak-air-kebagusan", "Harga-TB-Simatupang", 715000],
  ["deen-haus-alkahf-bintaro", "deenhaus.com/baby-class", 150000],
  ["deen-haus-alkahf-bintaro", "deenhaus.com/baby-class", 590000],
  ["deen-haus-alkahf-bintaro", "deenhaus.com/baby-class", 1000000],
  ["golden-baby-school-jakarta-garden-city", "goldenschool.id", 100000],
  ["gymnademics-gading-serpong", "gymnademics.id", 1000000],
];

export default function enrich1134(venues: Venue[]) {
  for (const [id, urlPart, amount] of CONFIRMED) {
    const v = venues.find((x) => x.id === id);
    if (!v?.priceListings) continue;
    for (const p of v.priceListings) {
      if (p.amountIdr === amount && p.sourceUrl.includes(urlPart)) p.checkedAt = "2026-11-27";
    }
  }
}
