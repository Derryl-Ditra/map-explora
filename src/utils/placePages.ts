import type { Venue } from '../types/venue';
import { publicInventory, venueName, SITE_URL } from './discovery';
import { publicAddress } from './placeLanguage';
import { shortVenueId } from './venueLink';
export type PlaceLang = 'en' | 'id';
// Explicit sourcing exclusion, independent of ordinary map visibility. Do not
// mistake private branches in Taman-named malls/neighborhoods for public parks.
export function governmentRelated(v: Venue): boolean {
 const name=[v.id,v.chain,v.branchName].filter(Boolean).join(' ');
 const sources=[v.website,v.sourceUrl,v.operatingStatus?.source].filter(Boolean).join(' ');
 return /\b(rptra|rpksa|pemkot|pemda|dinas|government|pemerintah|negeri)\b/i.test(name.replace(/-/g,' ')) || /(?:https?:\/\/)[^/]*\.go\.id(?:[/:]|$)/i.test(sources);
}
export function placePageInventory(venues: Venue[]) { return publicInventory(venues).filter(v=>!governmentRelated(v)); }
export function placePath(v: Pick<Venue,'id'>,lang: PlaceLang) { return `${lang==='id'?'/id':''}/places/${v.id}/`; }
export function placeUrl(v: Pick<Venue,'id'>,lang: PlaceLang) { return SITE_URL+placePath(v,lang); }
export function placeMapUrl(v: Pick<Venue,'id'>) { return `${SITE_URL}/?v=${shortVenueId(v.id)}`; }
export function placeDescription(v: Venue,lang: PlaceLang) { const name=venueName(v);return lang==='id'?`${name} di ${v.area || v.city}: cek sumber usia kelas, harga yang tercatat dan syaratnya, alamat serta kontak. Konfirmasi langsung sebelum datang.`:`${name} in ${v.area || v.city}: check class age evidence, recorded prices and conditions, address and contact links. Confirm with the branch before visiting.`; }
export function placeMetadata(v: Venue,lang: PlaceLang) {
 const title=`${venueName(v)} | ${lang==='id'?'Kelas anak':"Children's classes"} | Map Explora`;
 const description=placeDescription(v,lang),url=placeUrl(v,lang);
 const image=`${SITE_URL}/place-cards/${lang}/${v.id}.png`;
 return {title,description,alternates:{canonical:url,languages:{en:placeUrl(v,'en'),id:placeUrl(v,'id'),'x-default':placeUrl(v,'en')}},openGraph:{title,description,url,type:'website' as const,locale:lang==='id'?'id_ID':'en_US',images:[{url:image,width:1200,height:630,alt:venueName(v)}]},twitter:{card:'summary_large_image' as const,title,description,images:[image]}};
}
export function placeSchema(v: Venue,lang: PlaceLang) {
 // No Offers, rating, opening hours, geo, age eligibility or live availability.
 return {'@context':'https://schema.org','@type':'Place',name:venueName(v),url:placeUrl(v,lang),address:publicAddress(v.address,lang)};
}
