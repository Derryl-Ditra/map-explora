import { publicLocation, withoutMapCodes } from "./publicLocation";
import { verifiedPrograms, isVerifiedAgeClaim } from "./ageMatch";
import { shortPlacePath } from "./placeShortLink";
import { shortVenueId } from "./venueLink";
import { Venue } from "@/types/venue";

export const SITE_URL = "https://derryl-ditra.github.io/map-explora/";
export const SHARE_TEXT_BUDGET = 320;

export function buildVenueUrl(venue: Pick<Venue, "id">): string {
  const path=shortPlacePath(venue.id);
  return path ? SITE_URL.replace(/\/$/,'')+path : `${SITE_URL}?v=${shortVenueId(venue.id)}`;
}

// Preserve exact program boundaries; no rounding years or filling age gaps.
export function buildClassLines(venue: Venue, limit = 4): string {
  const programs = verifiedPrograms(venue);
  const lines = programs.slice(0, limit).map(p => `${p.name} ${p.age.minMonths}-${p.age.maxMonths}mo`);
  if (programs.length > limit) lines.push(`+${programs.length - limit} more`);
  return lines.join(", ");
}

export function ageSummary(venue: Venue,lang:'id'|'en'='en'): string {
 const p=verifiedPrograms(venue),id=lang==='id';
 if(p.length===1)return `${p[0].name} · ${p[0].age.minMonths}-${p[0].age.maxMonths} ${id?'bulan':'months'}`;
 const ranges=p.map(p=>[p.age.minMonths!,p.age.maxMonths!]).sort((a,b)=>a[0]-b[0]);const merged:number[][]=[];
 for(const[lo,hi]of ranges){const last=merged.at(-1);if(last&&lo<=last[1])last[1]=Math.max(last[1],hi);else merged.push([lo,hi]);}
 if(merged.length)return `${id?'Usia':'Ages'} ${merged.map(([lo,hi])=>`${lo}-${hi}`).join(', ')} ${id?'bulan, tergantung kelas':'months, by class'}`;
 if(venue.branchAge&&isVerifiedAgeClaim(venue.branchAge))return `${venue.branchAge.minMonths}-${venue.branchAge.maxMonths} ${id?'bulan, menurut cabang':'months, branch statement'}`;
 return id?'Tanyakan usia kelas ke cabang':'Ask the branch about class ages';
}

export function conciseAddress(address: string): string {
  const parts = withoutMapCodes(address).split(',').map(p => p.trim());
  const street = parts.find(p => /\b(?:jl\.?|jalan)\s/i.test(p));
  const line = street ?? parts.find(p => p && !/^(?:Ground Floor|Outdoor Area|(?:LG|UG|\d+(?:st|nd|rd|th)) Floor)$/i.test(p) && !/\b(?:RT\.?\s*\d|RW\.?\s*\d|Indonesia|Kec\.|Kecamatan|Kabupaten|Daerah Khusus|\d{5})\b/i.test(p)) ?? '';
  return line.split(/\bRT\.?\s*\d|\bRW\.?\s*\d|\b(?:LG|UG|\d+(?:st|nd|rd|th))\s+Floor|\bLantai\b|\bLt\.?\s*\d|\s*\(Google Maps/i)[0].trim();
}

export function buildShareText(venue: Venue,lang:'id'|'en'='en',variant:'plain'|'whatsapp'='plain'): string {
 const name=`${venue.chain?venue.chain+' ':''}${venue.branchName}`;
 const l=publicLocation(venue);
 const area=l.storedName?`${l.share} (${lang==='id'?'catatan tersimpan':'stored record'})`:l.conflict?l.share!.replace(/^Area: /,''):venue.area||venue.city;
 return [variant==='whatsapp'?`*${name}*`:name,area,ageSummary(venue,lang),'',buildVenueUrl(venue)].join('\n');
}

// Explicit place-page origin wins. Direct map visits use the document language.
export function shareLanguage(params: URLSearchParams,documentLang: string): 'id'|'en' {
 const origin=params.get('shareLang');
 return origin==='id'||origin==='en'?origin:documentLang==='id'?'id':'en';
}
