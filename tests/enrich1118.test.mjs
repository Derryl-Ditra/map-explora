import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {importTs} from './loadTs.mjs';
const {VENUES}=await importTs('../src/data/venues.ts');
const {KIDDIES88_20261118,default:enrich}=await importTs('../src/data/enrich1118.ts');
const {verifiedPrograms,hasVerifiedAgeEvidence}=await importTs('../src/utils/ageMatch.ts');
const {isShownToUsers}=await importTs('../src/utils/visibility.ts');
const {placeText,publicProgramNote}=await importTs('../src/utils/placeLanguage.ts');
const ids=['kiddies88-maspen-cimuning','kiddies88-waterland-transyogi','kiddies88-havana-setiamekar','kiddies88-wijaya-wisma-jaya'];

test('Nov18 adds exactly four reviewed branches without changing the previous inventory',()=>{
 assert.deepEqual(KIDDIES88_20261118.map(v=>v.id),ids);
 assert.equal(VENUES.length,161);
 assert.equal(VENUES.filter(isShownToUsers).length,149);
 assert.equal(VENUES.filter(isShownToUsers).filter(hasVerifiedAgeEvidence).length,49);
 assert.equal(VENUES.filter(isShownToUsers).filter(v=>v.priceListings?.length).length,20);
 const old=structuredClone(VENUES.filter(v=>!ids.includes(v.id))),before=structuredClone(old);
 enrich(old);assert.deepEqual(old.slice(0,before.length),before);
 assert.equal(old.length,before.length+4);
 assert.throws(()=>enrich(old),/Duplicate branch/);
});

test('Nov18 ages and prices come from exact branch brochures, not a partner FAQ or holiday offer',()=>{
 const sourceUrls=new Set();
 for(const id of ids){
  const v=VENUES.find(v=>v.id===id);assert.ok(v);
  assert.equal(v.operatingStatus.state,'official-listed');assert.equal(v.coordinateSource,'maps-pin');
  assert.match(v.operatingStatus.source,/DfXN1WrH2h_/);
  assert.equal(v.lastCheckedAt,'2026-11-18');
  assert.deepEqual(verifiedPrograms(v).map(p=>[p.age.minMonths,p.age.maxMonths]),[[3,18],[18,36]]);
  for(const p of v.programs){assert.equal(p.age.providerAgeUrl,v.sourceUrl);assert.equal(p.age.sourceCheckedAt,'2026-11-18');assert.match(p.note,/undated/);assert.match(p.note,/parent must accompany/i);assert.ok(publicProgramNote(p.note,'id'));}
  sourceUrls.add(v.sourceUrl);
  assert.deepEqual(v.priceListings.map(p=>p.amountIdr),[800000,1200000,2100000,150000]);
  assert.equal(v.priceListings.some(p=>p.amountIdr===250000),false);
  for(const p of v.priceListings){assert.equal(p.sourceKind,'official');assert.equal(p.sourceUrl,v.sourceUrl);assert.equal(p.checkedAt,'2026-11-18');for(const key of ['label','unit','note'])assert.ok(placeText(p[key],'id'),id+' '+key);}
  for(const p of v.priceListings.slice(0,3)){assert.match(p.note,/150,000 registration is extra/);assert.match(p.note,/two companions/);assert.match(p.note,/expiry/);}
  assert.equal(v.reviews.trend,undefined);assert.equal(v.reviews.latestReview,undefined);
  assert.match(v.reviews.sampleNote,id.includes('wijaya')?/only two reviews/:/pool-wide Maps ratings, not ratings of the baby class/);
 }
 assert.equal(sourceUrls.size,4);
 assert.equal(VENUES.find(v=>v.id==='kiddies88-waterland-transyogi').phone,'+62 851-1760-8806');
});

test('Nov18 pool concerns remain visible in English and Bahasa, with bounded attribution',()=>{
 for(const [id,pattern] of [['kiddies88-waterland-transyogi',/cleanliness/],['kiddies88-havana-setiamekar',/privacy/]]){
  const v=VENUES.find(v=>v.id===id);for(const p of v.programs){assert.match(p.note,pattern);assert.match(p.note,/customer/);assert.match(p.note,/not .*safety finding/);assert.match(placeText(p.note,'id'),/pengunjung/);assert.match(placeText(p.note,'id'),/bukan kesimpulan soal keamanan/);assert.equal(p.noteUrl,v.reviews.sourceUrl);}
 }
 const ui=readFileSync(new URL('../src/components/PlacePage.tsx',import.meta.url),'utf8');assert.match(ui,/publicProgramNote\(p.note,lang\)/);
});

test('Nov18 closure, pin conflicts, historical events and home-visit leads are not promoted',()=>{
 for(const fragment of ['kidzero','biruuu','jiico','majiku','pearls','mosart','ben-belajar','clavora'])assert.equal(VENUES.some(v=>v.id.includes(fragment)),false,fragment);
 const decisions=JSON.parse(readFileSync(new URL('../docs/research/capture-decisions.json',import.meta.url),'utf8'));
 const closed=decisions.find(d=>d.sourceUrl.endsWith('/24-sesi-sensory-class'));assert.equal(closed.state,'hold');assert.match(closed.reason,/temporarily closed/);
 const pin=decisions.find(d=>d.sourceUrl.endsWith('/sensory-class-2'));assert.equal(pin.state,'hold');assert.match(pin.reason,/640 m/);
});
