import type { Venue } from '../types/venue';

// Stable from the permanent venue ID, never from the dataset's order.
// Collision and round-trip checks cover the full dataset before every build.
export function shortVenueId(id: string): string {
  let hash = 2166136261;
  for (let i = 0; i < id.length; i++) hash = Math.imul(hash ^ id.charCodeAt(i), 16777619);
  return (hash >>> 0).toString(36);
}

export function resolveVenueId(params: URLSearchParams, venues: Pick<Venue, 'id'>[]): string | null {
  const longId = params.get('venue');
  if (longId) return venues.find(v => v.id === longId)?.id ?? null;
  const shortId = params.get('v');
  if (!shortId) return null;
  const matches = venues.filter(v => shortVenueId(v.id) === shortId);
  return matches.length === 1 ? matches[0].id : null;
}
