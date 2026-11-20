import type { Venue } from '../types/venue';
import { placePageInventory } from './placePages';

// Only public, non-government records can enter a comparison, including via URL.
export function comparisonInventory(venues: Venue[]) {
  return placePageInventory(venues).slice().sort((a,b) =>
    `${a.chain || ''} ${a.branchName}`.localeCompare(`${b.chain || ''} ${b.branchName}`));
}
export function comparisonSelection(venues: Venue[], a: string | null, b: string | null): [string,string] {
  const ids = new Set(comparisonInventory(venues).map(v=>v.id));
  const first = a && ids.has(a) ? a : '';
  const second = b && ids.has(b) && b !== first ? b : '';
  return first ? [first, second] : [second, ''];
}
export function comparisonPath(lang: 'en'|'id', a = '', b = '') {
  const q = new URLSearchParams();
  if(a) q.set('a',a);
  if(b && b!==a) q.set('b',b);
  return `${lang==='id'?'/id':''}/compare/${q.size?'?'+q.toString():''}`;
}
export function hasRecordedPrice(v: Venue) { return !!v.priceListings?.length; }
export function coverage(venues: Venue[]) {
  const visible = comparisonInventory(venues);
  return { visible:visible.length, priced:visible.filter(hasRecordedPrice).length,
    reviewed:visible.filter(v=>v.reviews && v.reviews.rating!==null).length };
}
