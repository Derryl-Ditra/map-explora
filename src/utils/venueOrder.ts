type Orderable = { area: string; branchName: string; distance?: number };

// With a location fix the list is strictly nearest first, so a verified-age place far away
// can never sit above an unverified place next door. Without one, verified-age places lead,
// then area and name so the list can be scanned.
export function compareVenueOrder<T extends Orderable>(a: T, b: T, hasLocation: boolean, isVerified: (v: T) => boolean): number {
  if (hasLocation) return (a.distance ?? Infinity) - (b.distance ?? Infinity);
  return Number(isVerified(b)) - Number(isVerified(a)) || a.area.localeCompare(b.area) || a.branchName.localeCompare(b.branchName);
}
