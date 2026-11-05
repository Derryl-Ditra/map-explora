import type { Venue } from '@/types/venue';

export const SITE_URL = 'https://derryl-ditra.github.io/map-explora';
export const venueName = (v: Venue) => [v.chain, v.branchName].filter(Boolean).join(" ");
export const publicInventory = (venues: Venue[]) => venues.filter(v => v.operatingStatus?.state === 'official-listed');
export type AnswerGroup = { slug: string; title: string; area: string; activity?: string; venues: Venue[] };
const regions = ['Jakarta', 'Bogor', 'Depok', 'Bekasi', 'Tangerang'];
const activities: { category: string; slug: string; label: string }[] = [
  { category: 'English & Language', slug: 'language', label: 'English and language classes' },
  { category: 'Gym & Movement', slug: 'movement', label: 'Gym and movement classes' },
  { category: 'Swim', slug: 'swimming', label: 'Swimming classes' },
  { category: 'Sensory', slug: 'sensory', label: 'Sensory classes' },
  { category: 'Dance', slug: 'dance', label: 'Dance classes' },
  { category: 'Literacy', slug: 'literacy', label: 'Literacy classes' },
];
export function buildAnswerGroups(venues: Venue[]): AnswerGroup[] {
  const visible = publicInventory(venues);
  const groups: AnswerGroup[] = [];
  const seen = new Set<string>();
  const add = (g: AnswerGroup) => {
    const signature = g.venues.map(v => v.id).sort().join('|');
    if (g.venues.length >= 4 && !seen.has(signature)) { seen.add(signature); groups.push(g); }
  };
  for (const area of regions) add({ slug: area.toLowerCase(), title: `Classes for under 5s in ${area}`, area, venues: visible.filter(v => `${v.city} ${v.area}`.includes(area)) });
  for (const a of activities) {
    add({ slug: a.slug, title: `${a.label} for under 5s in Jabodetabek`, area: 'Jabodetabek', activity: a.category, venues: visible.filter(v => v.categories.includes(a.category)) });
    for (const area of regions) add({ slug: `${a.slug}-${area.toLowerCase()}`, title: `${a.label} for under 5s in ${area}`, area, activity: a.category, venues: visible.filter(v => `${v.city} ${v.area}`.includes(area) && v.categories.includes(a.category)) });
  }
  return groups;
}
export function answerSummary(g: AnswerGroup) {
  return `${g.venues.length} provider-listed ${g.activity ? g.activity.toLowerCase() + " " : "class "}options in ${g.area} include ${g.venues.slice(0, 3).map(venueName).join(', ')}. Compare the branch age evidence below, then confirm the class with the provider.`;
}
export function itemListSchema(g: AnswerGroup) {
  return { '@context': 'https://schema.org', '@type': 'ItemList', name: g.title, url: `${SITE_URL}/activities/${g.slug}/`, numberOfItems: g.venues.length, itemListOrder: 'https://schema.org/ItemListUnordered', itemListElement: g.venues.map((v, i) => ({ '@type': 'ListItem', position: i + 1, item: { '@type': 'Place', name: venueName(v), url: `${SITE_URL}/activities/${g.slug}/#${v.id}`, address: v.address, ...(v.coordinateSource !== "area-approximate" && !v.caution && v.lat != null && v.lng != null ? { geo: { '@type': 'GeoCoordinates', latitude: v.lat, longitude: v.lng } } : {}) } })) };
}
