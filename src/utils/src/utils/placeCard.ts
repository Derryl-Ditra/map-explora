import type { Venue } from '../types/venue';
import { verifiedPrograms, isVerifiedAgeClaim } from './ageMatch';
export function placeCardFacts(v: Venue) {
 const programs=verifiedPrograms(v);
 const uncertain=v.programs.filter(p=>p.offering!=='not-offered'&&!programs.includes(p));
 const classes=programs.map(p=>({name:p.name,min:p.age.minMonths!,max:p.age.maxMonths!}));
 if(!classes.length&&v.branchAge&&isVerifiedAgeClaim(v.branchAge))classes.push({name:'',min:v.branchAge.minMonths!,max:v.branchAge.maxMonths!});
 const r=v.reviews;
 const rating=r&&r.sourceUrl&&r.checkedAt&&Number.isFinite(r.rating)&&r.rating!>=1&&r.rating!<=5&&Number.isInteger(r.reviewCount)&&r.reviewCount!>0?{rating:r.rating!,count:r.reviewCount!,source:r.source,date:r.checkedAt}:null;
 return {classes,uncertain:uncertain.length,conflict:uncertain.some(p=>!!p.age.sourceConflict),rating};
}
