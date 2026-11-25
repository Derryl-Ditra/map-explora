import type { Venue } from '../types/venue';

// One category list per branch. Program-level categories landed later than
// the venue list, so the stored list alone can miss a class a branch actually
// runs (2026-11-25 audit: offered programs whose category was absent from the
// venue list, which broke category filters and guide groups). Offered
// programs only: an unknown or excluded offering never adds a category.
export function venueCategories(v: Venue): string[] {
  const cats = new Set(v.categories);
  for (const p of v.programs) {
    if (p.offering === 'offered' && p.category) cats.add(p.category);
  }
  return [...cats].sort();
}
