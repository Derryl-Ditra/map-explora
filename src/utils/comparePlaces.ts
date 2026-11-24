import type { Venue } from '../types/venue';
import { placePageInventory } from './placePages';
import {shortVenueId} from './venueLink';
import {calculateDistance} from './geo';

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

// Compact links contain only public venue codes; never carry location or browsing state.
export function compactComparisonPath(lang: 'en'|'id', ids: [string,string]) {
 const codes=ids.filter(Boolean).map(shortVenueId);
 const params=codes.length?new URLSearchParams({c:codes.join('.')}):new URLSearchParams({compare:'1'});
 if(lang==='id')params.set('shareLang','id');
 return `/?${params}`;
}
export function comparisonFromParams(venues: Venue[], params: URLSearchParams): [string,string] {
 if(!params.has('c')) return comparisonSelection(venues,params.get('a'),params.get('b'));
 const parts=(params.get('c')||'').split('.');
 if(parts.length>2||parts.some(p=>!p||!/^[a-z0-9]+$/.test(p))) return ['',''];
 const ids=parts.map(code=>{const matches=comparisonInventory(venues).filter(v=>shortVenueId(v.id)===code);return matches.length===1?matches[0].id:'';});
 if(ids.some(id=>!id)||new Set(ids).size!==ids.length)return ['',''];
 return comparisonSelection(venues,ids[0]||null,ids[1]||null);
}
export type CompareFix={lat:number;lng:number;at:number;accuracy:number};
export function freshCompareFix(fix: CompareFix|null, now=Date.now()): CompareFix|null {
 return fix&&Number.isFinite(fix.lat)&&Math.abs(fix.lat)<=90&&Number.isFinite(fix.lng)&&Math.abs(fix.lng)<=180&&Number.isFinite(fix.at)&&now>=fix.at&&now-fix.at<15*60*1000 ? fix:null;
}
export function nearbyComparisonVenues(venues:Venue[],fix:CompareFix|null){
 const current=freshCompareFix(fix);
 return venues.map(v=>({...v,distance:current&&v.coordinateSource!=='area-approximate'&&!v.caution?calculateDistance(current.lat,current.lng,v.lat,v.lng):undefined}))
 .sort((a,b)=>current?((a.distance??Infinity)-(b.distance??Infinity)||venueNameForSort(a).localeCompare(venueNameForSort(b))):venueNameForSort(a).localeCompare(venueNameForSort(b)));
}
function venueNameForSort(v:Venue){return `${v.chain||''} ${v.branchName}`;}
