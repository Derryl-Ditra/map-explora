import type {Venue} from '../types/venue';
import {isVerifiedAgeClaim,verifiedPrograms} from './ageMatch';
export const AGE_BANDS=[
 {id:'0-5',min:0,max:5,label:'0-5 mo',stage:'Early exploration'},
 {id:'6-11',min:6,max:11,label:'6-11 mo',stage:'Sitting and moving'},
 {id:'12-17',min:12,max:17,label:'12-17 mo',stage:'First steps'},
 {id:'18-23',min:18,max:23,label:'18-23 mo',stage:'Words and pretend play'},
 {id:'24-35',min:24,max:35,label:'2 yrs',stage:'Running and talking'},
 {id:'36-59',min:36,max:59,label:'3-4 yrs',stage:'Preschool play'},
] as const;
export type AgeBandId=typeof AGE_BANDS[number]['id'];
export const ageBandLabel=(id:AgeBandId|null)=>AGE_BANDS.find(b=>b.id===id)?.label??'Any age';
function overlappingClaims(v:Venue,id:AgeBandId) {
 const band=AGE_BANDS.find(b=>b.id===id);if(!band)return [];
 const claims=[...(v.branchAge&&isVerifiedAgeClaim(v.branchAge)?[v.branchAge]:[]),...verifiedPrograms(v).map(p=>p.age)];
 return claims.filter(a=>a.minMonths!<=band.max&&a.maxMonths!>=band.min);
}
export function venueOverlapsBand(v:Venue,id:AgeBandId) {return overlappingClaims(v,id).length>0;}
export function matchingAgeRanges(v:Venue,id:AgeBandId) {return [...new Set(overlappingClaims(v,id).map(a=>`${a.minMonths} to ${a.maxMonths} months`))];}
