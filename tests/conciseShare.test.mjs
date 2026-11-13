import test from 'node:test';
import assert from 'node:assert/strict';
import {importTs} from './loadTs.mjs';
const {VENUES}=await importTs('../src/data/venues.ts');
const {buildShareText,conciseAddress,SHARE_TEXT_BUDGET}=await importTs('../src/utils/shareText.ts');
const {shortVenueId,resolveVenueId}=await importTs('../src/utils/venueLink.ts');

test('every dataset share fits 440 characters, including longest name/list/link',()=>{
 const texts=VENUES.map(buildShareText);
 assert.ok(texts.every(t=>t.length<=SHARE_TEXT_BUDGET));
 assert.ok(Math.max(...texts.map(t=>t.length))<=320);
 const longestName=VENUES.toSorted((a,b)=>(`${b.chain??''} ${b.branchName}`).length-(`${a.chain??''} ${a.branchName}`).length)[0];
 assert.equal(longestName.id,'gogrow-tanjung-duren');
 assert.ok(buildShareText(longestName).length<440);
 for(const v of VENUES) assert.doesNotMatch(conciseAddress(v.address),/RT\.?\s*\d|RW\.?\s*\d|Indonesia|\b\d{5}\b/);
});

test('short codes are unique, stable and old and new links resolve every venue',()=>{
 assert.equal(new Set(VENUES.map(v=>shortVenueId(v.id))).size,VENUES.length);
 for(const venue of VENUES){
  assert.equal(resolveVenueId(new URLSearchParams({v:shortVenueId(venue.id)}),VENUES),venue.id);
  assert.equal(resolveVenueId(new URLSearchParams({venue:venue.id}),VENUES),venue.id);
  assert.equal(resolveVenueId(new URLSearchParams({v:shortVenueId(venue.id)}),[...VENUES].reverse()),venue.id);
 }
 assert.equal(shortVenueId('rockstar-academy-gandaria-city'),'4kdidz');
 assert.equal(resolveVenueId(new URLSearchParams('v=unknown'),VENUES),null);
 assert.equal(resolveVenueId(new URLSearchParams('venue=missing'),VENUES),null);
 assert.equal(resolveVenueId(new URLSearchParams('v=4kdidz'),[]),null);
 assert.equal(resolveVenueId(new URLSearchParams('v=4kdidz'),[VENUES.find(v=>v.id==='rockstar-academy-gandaria-city'),VENUES.find(v=>v.id==='rockstar-academy-gandaria-city')]),null);
});

test('street only; no district, postal, country or RT/RW',()=>{
 assert.equal(conciseAddress('Gandaria City, Jl. Sultan Iskandar Muda LG Floor Unit #01, RT.10/RW.6, Kota Jakarta Selatan 12240, Indonesia'),'Jl. Sultan Iskandar Muda');
 assert.equal(conciseAddress('Jl. Test No.8 RT.01/RW.02, Jakarta 12345, Indonesia'),'Jl. Test No.8');
});

test('long lists fall back to verified age union without bridging gaps',()=>{
 const v=VENUES.find(v=>v.id==='rockstar-academy-gandaria-city');
 const age=v.programs.find(p=>p.age.minMonths===12).age;
 const programs=[[6,12],[10,18],[24,35]].map(([minMonths,maxMonths])=>({name:'Very long class name '.repeat(10),offering:'offered',age:{...age,minMonths,maxMonths}}));
 const text=buildShareText({...v,programs});
 assert.ok(text.length<=440);assert.match(text,/Ages 6-18, 24-35 months, by class/);assert.doesNotMatch(text,/6-35mo/);
 const conflict=buildShareText({...v,programs:[{...programs[0],age:{...age,sourceConflict:true}},{...programs[1],age:{...age,level:'brand'}}]});
 assert.match(conflict,/Ask the branch about class ages/);
});
