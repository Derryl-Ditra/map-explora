import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {importTs} from './loadTs.mjs';
const {VENUES}=await importTs('../src/data/venues.ts');
const {canRouteVenue}=await importTs('../src/utils/mapsLink.ts');
const {publicCaution,placeText}=await importTs('../src/utils/placeLanguage.ts');
const {hasVerifiedAgeEvidence,verifiedPrograms}=await importTs('../src/utils/ageMatch.ts');
const {isShownToUsers}=await importTs('../src/utils/visibility.ts');

test('Nov20 Sparks official-address discrepancies stay visible and cannot route to stale pins',()=>{
 for(const id of ['sparks-sports-academy-taman-palem','sparks-sports-academy-tangerang-city']){
  const v=VENUES.find(v=>v.id===id);assert.ok(v,id);assert.ok(v.caution,id);assert.ok(publicCaution(v.caution,'id'),id);
  assert.equal(canRouteVenue(v),false,id);assert.ok(isShownToUsers(v),id);
 }
 const palem=VENUES.find(v=>v.id==='sparks-sports-academy-taman-palem');
 assert.match(palem.caution,/Citra 3 No\.3A blok A13/);assert.match(palem.caution,/No\.10/);
 const city=VENUES.find(v=>v.id==='sparks-sports-academy-tangerang-city');
 assert.match(city.caution,/Perintis Kemerdekaan 42/);assert.match(city.caution,/No\.17 Blok G/);
 const translations=readFileSync('src/utils/placeLanguage.ts','utf8');
 assert.ok(translations.includes(palem.caution));assert.ok(translations.includes(city.caution));
});

test('Nov20 BLS BSD Preschool gains official branch address binding and class ages',()=>{
 const v=VENUES.find(v=>v.id==='bright-little-stars-bsd-preschool');assert.ok(v);
 assert.deepEqual(verifiedPrograms(v).map(p=>[p.name,p.age.minMonths,p.age.maxMonths]),[['Toddler',24,35],['Nursery',36,47],['Kindergarten 1 & 2',48,71]]);
 for(const p of v.programs){
  assert.equal(p.offering,'offered');assert.equal(p.age.level,'branch');assert.equal(p.age.verification,'provider-confirmed');
  assert.equal(p.age.providerAgeUrl,'https://www.brightlittlestarsedu.com/blog/bright-little-stars-preschool-now-open-in-bsd');
  assert.equal(p.age.sourceCheckedAt,'2026-11-20');assert.ok(placeText(p.note,'id'));
 }
 assert.equal(v.operatingStatus.state,'official-listed');
 assert.equal(v.operatingStatus.source,'https://www.brightlittlestarsedu.com/contact-us');
 assert.equal(v.operatingStatus.checkedAt,'2026-11-20');assert.equal(v.lastCheckedAt,'2026-11-20');
 assert.match(v.notes,/Daikanyama Blok A16/);assert.ok(!v.caution);
 assert.ok(hasVerifiedAgeEvidence(v));
});

test('Nov20 Rockstar Grand Bekasi stays listed on the current-term official PDF, not closed',()=>{
 const v=VENUES.find(v=>v.id==='rockstar-academy-grand-metropolitan-bekasi');assert.ok(v);
 assert.equal(v.operatingStatus.state,'official-listed');
 assert.equal(v.operatingStatus.source,'https://www.rockstaracademy.com/lib/upload/files/club/GB_Schedule_Winter_2026_W5.pdf');
 assert.equal(v.operatingStatus.checkedAt,'2026-11-20');
 assert.match(v.notes,/updated 16 November 2026/);assert.match(v.notes,/not as a closure/);
 assert.deepEqual(verifiedPrograms(v).map(p=>[p.name,p.age.minMonths,p.age.maxMonths]),[['Crawler',6,18],['Walker',12,23],['Jumper',24,35]]);
});

test('Nov20 inventory counts move only on the BLS age upgrade',()=>{
 assert.equal(VENUES.length,161);
 assert.equal(VENUES.filter(isShownToUsers).length,149);
 assert.equal(VENUES.filter(isShownToUsers).filter(hasVerifiedAgeEvidence).length,49);
 assert.equal(VENUES.filter(isShownToUsers).filter(v=>v.priceListings?.length).length,19);
});
