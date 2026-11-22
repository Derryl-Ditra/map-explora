import type { Venue } from '../types/venue';
import { isVerifiedAgeClaim, verifiedPrograms, mergeAgeRanges } from './ageMatch';
import { decidedAgeSummary } from './decideAge';

export function cardAgeSummary(venue: Venue): string {
  const claims = [
    ...(venue.branchAge && isVerifiedAgeClaim(venue.branchAge) ? [venue.branchAge] : []),
    ...verifiedPrograms(venue).map(program => program.age),
  ];
  const sorted = claims.slice().sort((a, b) => a.minMonths! - b.minMonths! || a.maxMonths! - b.maxMonths!);
  const ranges = [...new Map(sorted.map(age => [`${age.minMonths}:${age.maxMonths}`, age])).values()];
  // Owner rule 2026-11-22 (follow-up): never undecided. When nothing is
  // verified, show the decided best-available range with a confirm-by-phone
  // note instead of shrugging.
  if (!ranges.length) return decidedAgeSummary(venue);
  if (ranges.length === 1) return `Verified ages: ${ranges[0].minMonths} to ${ranges[0].maxMonths} months`;
  const merged = mergeAgeRanges(ranges.map(age => [age.minMonths!, age.maxMonths!]));
  const visible = merged.slice(0, 2).map(([lo, hi]) => `${lo}-${hi} mo`).join(', ');
  return `By class: ${visible}${merged.length > 2 ? ` +${merged.length - 2} more` : ''}`;
}

export function cardRatingSummary(venue: Venue): string {
  const review = venue.reviews;
  if (!review || review.rating === null || !Number.isFinite(review.rating)) return 'Rating not available';
  const count = review.reviewCount;
  return `${review.source}: ${review.rating.toFixed(1)}/5${count !== null ? ` (${count} ${count === 1 ? 'review' : 'reviews'})` : ''}`;
}

export function phoneHref(phone?: string): string | null {
  if (!phone || !/^\+?[\d\s().-]+$/.test(phone.trim())) return null;
  const number = phone.trim().replace(/[\s().-]/g, '');
  return /\d{5}/.test(number) ? `tel:${number}` : null;
}
