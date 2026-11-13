import type { Venue } from '../types/venue';
import { publicAddress } from './placeLanguage';
// Display-only corrections. Preserve the raw research record and map pin.
// A city/area or mall name is never promoted to a verified street address.
const corrections: Record<string,{address:string;share:string;areaOnly:boolean;source:string;checkedAt:string;conflict?:boolean;storedName?:boolean}> = {
 'sparks-sports-academy-bintaro-utown':{
  address:'Sawah Baru, Ciputat, Tangerang Selatan, Banten 15413',
  share:'Area: Sawah Baru, Ciputat',areaOnly:true,
  source:'https://academy.sparks-edu.com/tangerang/',checkedAt:'2026-11-13',conflict:true,
 },
 'rockstar-academy-living-world-alam-sutera':{
  address:'Living World Alam Sutera, Tangerang Selatan',share:'Living World Alam Sutera',areaOnly:true,
  source:'https://www.rockstaracademy.com/schedules-and-locations',checkedAt:'2026-11-13',storedName:true,
 },
};
export function withoutMapCodes(address:string):string {
 return address.replace(/\b[23456789CFGHJMPQRVWX]{4,8}\+[23456789CFGHJMPQRVWX]{2,3}\b/gi,'').replace(/\(\s*\)/g,'').replace(/\s+,/g,',').replace(/^\s*,\s*/,'').replace(/,\s*,/g,',').replace(/\s{2,}/g,' ').trim();
}
export function publicLocation(v:Pick<Venue,'id'|'address'>,lang:'en'|'id'='en') {
 const correction=corrections[v.id];
 const areaOnly=correction?.areaOnly ?? ['rockstar-academy-aeon-mall-deltamas','gymboree-play-music-pondok-indah-mall-1'].includes(v.id);
 const notices=[];
 if(areaOnly)notices.push(lang==='id'?'Area atau nama tempat saja. Tanyakan alamat lengkap ke cabang sebelum datang.':'Area or venue name only. Confirm the full address with the branch before visiting.');
 if(correction?.conflict)notices.push(lang==='id'?'Sumber resmi menyebut Sawah Baru, catatan Maps lama menyebut Sawah Lama. Pin peta belum dicek ulang.':'The official source says Sawah Baru; an older Maps record says Sawah Lama. The map pin has not been re-verified.');
 if(correction?.storedName)notices.push(lang==='id'?'Nama Alam Sutera berasal dari catatan tersimpan. Halaman resmi yang dibaca hanya menyebut Living World, belum mengonfirmasi nama lengkap atau alamat jalan.':'Alam Sutera is from the stored record. The official page read names Living World only, not the full branch name or street address.');
 return {...correction,address:publicAddress(correction?.address ?? withoutMapCodes(v.address),lang),areaOnly,notice:notices.join(' ')};
}
