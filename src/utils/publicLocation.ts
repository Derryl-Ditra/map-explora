import type { Venue } from '../types/venue';
import { publicAddress } from './placeLanguage';
// Display-only corrections. Preserve the raw research record and map pin.
// A city/area or mall name is never promoted to a verified street address.
const corrections: Record<string,{address:string;share:string;areaOnly:boolean;source:string;checkedAt:string;conflict?:boolean}> = {
 'sparks-sports-academy-bintaro-utown':{
  address:'Sawah Baru, Ciputat, Tangerang Selatan, Banten 15413',
  share:'Area: Sawah Baru, Ciputat',areaOnly:true,
  source:'https://academy.sparks-edu.com/tangerang/',checkedAt:'2026-11-13',conflict:true,
 },
 'rockstar-academy-living-world-alam-sutera':{
  address:'Living World Alam Sutera, Tangerang Selatan',share:'Living World Alam Sutera',areaOnly:true,
  source:'https://www.rockstaracademy.com/schedules-and-locations',checkedAt:'2026-11-13',
 },
};
export function withoutMapCodes(address:string):string {
 return address.replace(/\b[23456789CFGHJMPQRVWX]{4,8}\+[23456789CFGHJMPQRVWX]{2,3}\b/gi,'').replace(/\(\s*\)/g,'').replace(/\s+,/g,',').replace(/^\s*,\s*/,'').replace(/,\s*,/g,',').replace(/\s{2,}/g,' ').trim();
}
export function publicLocation(v:Pick<Venue,'id'|'address'>,lang:'en'|'id'='en') {
 const correction=corrections[v.id];
 return {...correction,address:publicAddress(correction?.address ?? withoutMapCodes(v.address),lang),areaOnly:correction?.areaOnly ?? false};
}
