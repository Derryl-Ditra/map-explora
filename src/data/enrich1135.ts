// Price re-read 2026-11-28. Only listings whose stored amount matched the source page today get a new checkedAt.
// No amount, label or note changes. Anak Air: registration fee Rp 275.000 on all five branch pages.
// Buumi Pacific Place (partner listing on Happy Kamper): 1 kid + 1 adult Rp 225.000. Morning Nest: Monthly Nest Beginners Rp 1.200.000.
// Not re-dated: Membumi (take.app now shows other products), Kinderra (page shows only a from-price), Sociable (price not on the page),
// Gavrila (Traveloka) and Kiddies88 (Drive files) cannot be read by plain fetch.
import type { Venue } from "../types/venue";

const CONFIRMED: Array<[string, string, number]> = [
  ["anak-air-grand-cibubur", "cabang-cibubur", 275000],
  ["anak-air-kemang", "cabang-kemang", 275000],
  ["anak-air-limo", "cabang-limo", 275000],
  ["anak-air-pondok-indah", "cabang-pondok-indah", 275000],
  ["anak-air-kebagusan", "cabang-tb-simatupang", 275000],
  ["buumi-playscape-pacific-place", "happykamper.io/en/activities/buumi-playscape-pacific-place", 225000],
  ["morning-nest-preschool-bojongsari", "nest-beginner-2-4-yo", 1200000],
];

export default function enrich1135(venues: Venue[]) {
  for (const [id, urlPart, amount] of CONFIRMED) {
    const v = venues.find((x) => x.id === id);
    if (!v?.priceListings) continue;
    for (const p of v.priceListings) {
      if (p.amountIdr === amount && p.sourceUrl.includes(urlPart)) p.checkedAt = "2026-11-28";
    }
  }
}
