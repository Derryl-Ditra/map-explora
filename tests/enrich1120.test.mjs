import test from 'node:test';
import assert from 'node:assert/strict';
import {importTs} from './loadTs.mjs';
const {VENUES}=await importTs('../src/data/venues.ts');
const {canRouteVenue}=await importTs('../src/utils/mapsLink.ts');
const {placeText}=await importTs('../src/utils/placeLanguage.ts');
const {hasVerifiedAgeEvidence,verifiedPrograms}=await importTs('../src/utils/ageMatch.ts');
const {isShownToUsers}=await importTs('../src/utils/visibility.ts');

test('Nov20 Sparks official-address discrepancies resolved: pins verified against live Maps listings, losing units kept in notes',()=>{
 for(const id of ['sparks-sports-academy-taman-palem','sparks-sports-academy-tangerang-city']){
  const v=VENUES.find(v=>v.id===id);assert.ok(v,id);assert.equal(v.caution,undefined,id);
  assert.equal(canRouteVenue(v),true,id);assert.ok(isShownToUsers(v),id);
 }
 const palem=VENUES.find(v=>v.id==='sparks-sports-academy-taman-palem');
 assert.match(palem.notes,/Citra 3 No\.3A blok A13/);
 const city=VENUES.find(v=>v.id==='sparks-sports-academy-tangerang-city');
 assert.match(city.notes,/Perintis Kemerdekaan 42/);
});

test('Nov20 BLS BSD Preschool gains official branch address binding and class ages',()=>{
 const v=VENUES.find(v=>v.id==='bright-little-stars-bsd-preschool');assert.ok(v);
 assert.deepEqual(verifiedPrograms(v).map(p=>[p.name,p.age.minMonths,p.age.maxMonths]),[['Toddler',24,35],['Nursery',36,47],['Kindergarten 1 & 2',48,71]]);
 for(const p of v.programs){
  assert.equal(p.offering,'offered');assert.equal(p.age.level,'branch');assert.equal(p.age.verification,'provider-confirmed');
  // 2026-11-24: enrich1126 upgrades the class source from the opening blog post
  // to the canonical /preschool page (same classes, listed per branch there).
  assert.equal(p.age.providerAgeUrl,'https://www.brightlittlestarsedu.com/preschool');
  assert.equal(p.age.sourceCheckedAt,'2026-11-24');assert.ok(placeText(p.note,'id'));
 }
 assert.equal(v.operatingStatus.state,'official-listed');
 assert.equal(v.operatingStatus.source,'https://www.brightlittlestarsedu.com/contact-us');
 // 2026-11-24: enrich1126 re-read the official site and re-stamps both dates.
 assert.equal(v.operatingStatus.checkedAt,'2026-11-24');assert.equal(v.lastCheckedAt,'2026-11-24');
 assert.match(v.notes,/Daikanyama Blok A16/);assert.ok(!v.caution);
 assert.ok(hasVerifiedAgeEvidence(v));
});

test('Nov20 Rockstar Grand Bekasi stays official-listed with the current-term PDF evidence',()=>{
 const v=VENUES.find(v=>v.id==='rockstar-academy-grand-metropolitan-bekasi');assert.ok(v);
 assert.equal(v.operatingStatus.state,'official-listed');
 // 2026-11-24: enrich1124 depth batch moves the operating source to the branch page and re-checks against the Winter W5 PDF.
 assert.equal(v.operatingStatus.source,'https://www.rockstaracademy.com/schedules-and-locations/grand-metropolitan-mall');
 assert.equal(v.operatingStatus.checkedAt,'2026-11-24');
 assert.match(v.notes,/Floor LG2 Unit #2C/);assert.match(v.notes,/updated 15 November 2026/);
 // 2026-11-24: enrich1124 adds the branch's under-5 program set. Year-labelled classes (Baby Ballet,
 // Baby Dance, Move & Groove, Pre-Ballet 3-5, Smartology 3, Sports U4/5) keep their cards but stay
 // outside the verified layer because the rounded year labels leave boundary inclusivity ambiguous.
 assert.deepEqual(verifiedPrograms(v).map(p=>[p.name,p.age.minMonths,p.age.maxMonths]),[['Crawler',6,18],['Walker',12,23],['Jumper',24,35],['Learn & Play 1',6,18],['Learn & Play 2',19,35],['Smartology 4',48,59],['Sports U3',24,36],['Tots Gym U4',36,48]]);
});

test('Nov20 inventory counts move only on the BLS age upgrade',()=>{
 assert.equal(VENUES.length,179); // 2026-11-25 PR #125 audit fix: 4 of the 19 HK venues dropped; total 183 -> 179.
 assert.equal(VENUES.filter(isShownToUsers).length,167); // 2026-11-25 PR #125 audit fix: 4 of the 19 HK venues dropped; shown 171 -> 167.
 assert.equal(VENUES.filter(isShownToUsers).filter(hasVerifiedAgeEvidence).length,52);
 // 2026-11-22 round F: Buumi Urban Forest priced via dated tiket.com listings.
 // 2026-11-22 round H: aquababies-bintaro and aquababies-menteng priced via the official shop page.
 // 2026-11-22 round I: kiddiegym-bogor-siliwangi priced via the official school-fees page.
 assert.equal(VENUES.filter(isShownToUsers).filter(v=>v.priceListings?.length).length,39); // 2026-11-25 PR #125 audit fix: dropped 4 priced HK venues; 43 -> 39.
});
