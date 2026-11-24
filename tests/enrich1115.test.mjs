import test from 'node:test';
import assert from 'node:assert/strict';
import {importTs} from './loadTs.mjs';
const {VENUES}=await importTs('../src/data/venues.ts');
const {default:enrich}=await importTs('../src/data/enrich1115.ts');
const {placeText}=await importTs('../src/utils/placeLanguage.ts');
const {isShownToUsers}=await importTs('../src/utils/visibility.ts');

test('Nov15 exposes four shared official enquiry numbers, not inferred branch lines',()=>{
 for(const [ids,phone,source] of [
  [['aquababies-bintaro','aquababies-menteng'],'+62 819-2844-3322','https://aquababiesindonesia.id/contact/'],
  [['aquatic-baby-bintaro','aquatic-baby-rumabona-cikini-bintaro'],'+62 811-1698-740','https://aquatic-baby.com/lokasi']
 ]) for(const id of ids){
  const v=VENUES.find(v=>v.id===id);assert.equal(v.phoneScope,'shared-enquiry');assert.equal(v.phone,phone);assert.equal(v.operatingStatus.source,source);
  // 2026-11-24: enrich1125 re-read the official aquatic-baby.com/lokasi page (both Bintaro locations still listed); aquababies keeps its 2026-11-15 check.
  assert.equal(v.operatingStatus.checkedAt,id.startsWith('aquatic-baby-')?'2026-11-24':'2026-11-15');assert.match(v.notes,/shared|Shared/);assert.match(v.notes,/branch.*desk/);
 }
});
test('Plaza Senayan partner ticket is a priced range, not class tuition',()=>{
 const v=VENUES.find(v=>v.id==='buumi-playscape-plaza-senayan');assert.equal(v.priceListings.length,2); // 2026-11-22 round F: dated tiket.com from-price appended
 const p=v.priceListings[0];assert.equal(p.amountIdr,195000);assert.equal(p.amountIdrMax,225000);assert.equal(p.sourceKind,'partner');
 assert.equal(p.checkedAt,'2026-11-15');assert.equal(p.sourceUrl,'https://happykamper.io/id/activities/buumi-playscape-plaza-senayan');
 // 2026-11-22 QC price-note cut: range lives in amountIdr/Max, note is keeper rows only.
 assert.doesNotMatch(p.unit,/starting price/);assert.doesNotMatch(p.note,/Rp195|remaining playtime|at least 18|baby-class tuition/);
 assert.match(p.label,/not class tuition/);
 assert.match(p.note,/confirm ticket and price apply to Plaza Senayan/);assert.match(p.note,/No refund or rescheduling/);assert.match(p.note,/13:00-14:00/);assert.match(p.note,/Equipment ages 12 mo-12 yr/);
 for(const field of [p.unit,p.label])assert.ok(placeText(field,'id'));
 for(const row of p.note.split('; '))assert.ok(placeText(row,'id'),`untranslated note row: ${row}`);
});
test('Nov15 patch does not alter ages, pins, review snapshots, fit or broad check dates',()=>{
 const input=structuredClone(VENUES),before=structuredClone(input);enrich(input);
 for(let i=0;i<input.length;i++){
  const a={...input[i]},b={...before[i]};for(const k of ['phone','phoneScope','notes','operatingStatus','priceListings']){delete a[k];delete b[k];}
  assert.deepEqual(a,b,input[i].id);
 }
});
test('only the five intended records are patched',()=>{
 const input=structuredClone(VENUES),before=structuredClone(input);enrich(input);
 const allowed=new Set(['aquababies-bintaro','aquababies-menteng','aquatic-baby-bintaro','aquatic-baby-rumabona-cikini-bintaro','buumi-playscape-plaza-senayan']);
 for(let i=0;i<input.length;i++)if(!allowed.has(input[i].id))assert.deepEqual(input[i],before[i]);
 assert.equal(VENUES.filter(isShownToUsers).length,171); // 2026-11-24 batch 4 (HK_VENUES): +19 partner-listed venues; shown 152 -> 171, total 164 -> 183.
 assert.equal(VENUES.some(v=>v.id.startsWith('kid-castle')),false);
 assert.equal(isShownToUsers(VENUES.find(v=>v.id==='baby-jumper-gym-gading-serpong')),false);
});

import {readFileSync} from 'node:fs';
test('map and bilingual place page distinguish a shared enquiry number',()=>{
 const map=readFileSync(new URL('../src/components/ui/VenueDetails.tsx',import.meta.url),'utf8');
 const page=readFileSync(new URL('../src/components/PlacePage.tsx',import.meta.url),'utf8');
 assert.match(map,/venue.phoneScope === "shared-enquiry"/);assert.match(map,/Shared enquiry number/);
 assert.match(page,/v.phoneScope==='shared-enquiry'/);assert.match(page,/Nomor informasi bersama/);
});
