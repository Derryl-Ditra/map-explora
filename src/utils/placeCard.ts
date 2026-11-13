import type { Venue } from '../types/venue';
import { verifiedPrograms, isVerifiedAgeClaim } from './ageMatch';
function validDate(value:string):boolean {
 if(!/^\d{4}-\d{2}-\d{2}$/.test(value))return false;
 const date=new Date(value+'T00:00:00Z');return Number.isFinite(date.getTime())&&date.toISOString().slice(0,10)===value;
}
function mapsSource(url:string):boolean {
 try{const u=new URL(url);return u.protocol==='https:'&&((['google.com','www.google.com','maps.google.com'].includes(u.hostname)&&u.pathname.startsWith('/maps'))||u.hostname==='maps.app.goo.gl');}catch{return false;}
}
export function placeCardFacts(v: Venue) {
 const programs=verifiedPrograms(v);
 const uncertain=v.programs.filter(p=>p.offering!=='not-offered'&&!programs.includes(p));
 // Only named classes, never a generic branch range in the class preview.
 const classes=programs.map(p=>({name:p.name,min:p.age.minMonths!,max:p.age.maxMonths!}));
 const r=v.reviews;
 const rating=r&&r.source==='Google Maps'&&r.sourceUrl&&mapsSource(r.sourceUrl)&&validDate(r.checkedAt)&&Number.isFinite(r.rating)&&r.rating!>=1&&r.rating!<=5&&Number.isInteger(r.reviewCount)&&r.reviewCount!>0?{rating:r.rating!,count:r.reviewCount!,source:r.source,date:r.checkedAt}:null;
 const branchAge=v.branchAge&&isVerifiedAgeClaim(v.branchAge)?{min:v.branchAge.minMonths!,max:v.branchAge.maxMonths!}:null;
 const notice=!classes.length&&!branchAge?'unknown':uncertain.some(p=>!!p.age.sourceConflict)?'conflict':uncertain.length?'uncertain':'verified';
 return {classes,branchAge,uncertain:uncertain.length,conflict:uncertain.some(p=>!!p.age.sourceConflict),notice,rating};
}
