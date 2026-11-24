import test from 'node:test';
import assert from 'node:assert/strict';
import {importTs} from './loadTs.mjs';
const {VENUES}=await importTs('../src/data/venues.ts');
const {placeText}=await importTs('../src/utils/placeLanguage.ts');
const {verifiedPrograms,hasVerifiedAgeEvidence}=await importTs('../src/utils/ageMatch.ts');
const {isShownToUsers}=await importTs('../src/utils/visibility.ts');
const {canRouteVenue}=await importTs('../src/utils/mapsLink.ts');
const {placeCode}=await importTs('../src/utils/placeShortLink.ts');
const ids=['bumi-nusantara-montessori-bsd','kimi-friends-montessori-gading-serpong','highfive-preschool-graha-raya'];
test('Nov20 independents: three official-sourced under-5 places, shown, routable, coded',()=>{
 for(const id of ids){
  const v=VENUES.find(v=>v.id===id);assert.ok(v,id);assert.equal(v.chain,null);
  assert.ok(isShownToUsers(v));assert.ok(hasVerifiedAgeEvidence(v));assert.ok(canRouteVenue(v));assert.ok(placeCode(id));
  assert.equal(v.operatingStatus.state,'official-listed');assert.equal(v.lastCheckedAt,'2026-11-20');
  for(const p of v.programs){assert.equal(p.age.level,'branch');assert.ok(p.age.providerAgeUrl.startsWith('https://'));assert.ok(placeText(p.note,'id'),'id note '+id);}
  assert.equal(verifiedPrograms(v).length,v.programs.length);
  assert.ok(!v.priceListings);
 }
});
test('Nov20 independents: exact official age bands',()=>{
 const b=VENUES.find(v=>v.id===ids[0]);
 assert.deepEqual(b.programs.map(p=>[p.age.minMonths,p.age.maxMonths]),[[10,24],[24,36],[36,48]]);
 const k=VENUES.find(v=>v.id===ids[1]);
 assert.deepEqual(k.programs.map(p=>[p.age.minMonths,p.age.maxMonths]),[[12,36]]);
 const h=VENUES.find(v=>v.id===ids[2]);
 assert.deepEqual(h.programs.map(p=>[p.age.minMonths,p.age.maxMonths]),[[9,24],[24,36],[36,48],[48,60]]);
 assert.equal(h.lat,-6.2448765);assert.equal(h.lng,106.6739842);
 for(const id of ids)assert.ok(VENUES.find(v=>v.id===id).programs.every(p=>p.age.maxMonths<=72&&p.age.minMonths<60));
 assert.ok(!VENUES.find(v=>v.id===ids[0]).programs.some(p=>p.age.maxMonths>60));
 assert.equal(VENUES.filter(isShownToUsers).length,171); // 2026-11-24 batch 4 (HK_VENUES): +19 partner-listed venues; shown 152 -> 171, total 164 -> 183.
});
