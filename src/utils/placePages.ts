import type { Venue } from '../types/venue';
import { publicInventory, venueName, SITE_URL } from './discovery';
import { publicLocation } from './publicLocation';
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
export function placeDescription(v: Venue,lang: PlaceLang) {
 const suffix=lang==='id'?': cek lokasi dan usia kelas.':': see location and class ages.';
 const full=venueName(v)+suffix;return full.length<=80?full:venueName(v)+(lang==='id'?': lokasi dan usia.':': location and ages.');
}
export function placeMetadata(v: Venue,lang: PlaceLang) {
 const title=venueName(v);
 const description=placeDescription(v,lang),previewDescription='See class ages and location details. Confirm with the branch before visiting.',url=placeUrl(v,lang);
 const image=`${SITE_URL}/place-cards/v2/${lang}/${v.id}.png`;
 return {title,description,alternates:{canonical:url,languages:{en:placeUrl(v,'en'),id:placeUrl(v,'id'),'x-default':placeUrl(v,'en')}},openGraph:{siteName:'Map Explora',title,description:previewDescription,url,type:'website' as const,locale:'en_US',images:[{url:image,width:1200,height:630,alt:`Map Explora rocking horse on a map near ${venueName(v)}`}]},twitter:{card:'summary_large_image' as const,title,description:previewDescription,images:[{url:image,alt:`Map Explora rocking horse on a map near ${venueName(v)}`}]}};
}
export function placeSchema(v: Venue,lang: PlaceLang) {
 // No Offers, rating, opening hours, geo, age eligibility or live availability.
 return {'@context':'https://schema.org','@type':'Place',name:venueName(v),url:placeUrl(v,lang),address:publicLocation(v,lang).address};
}
