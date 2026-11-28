import test from 'node:test';
import assert from 'node:assert/strict';
import {importTs} from './loadTs.mjs';
const {VENUES}=await importTs('../src/data/venues.ts');
const {default:enrich}=await importTs('../src/data/enrich1114.ts');
const {placeText}=await importTs('../src/utils/placeLanguage.ts');

test('Nov14 adds an official contact and a narrowly labelled partner play ticket',()=>{
 const music=VENUES.find(v=>v.id==='music-wonderworld-bsd');
 assert.equal(music.phone,'+62 851-9592-7078');
 // 2026-11-22: one brand-level program added (Music class 6-47 months).
 assert.equal(music.programs.length,1);
 const b=VENUES.find(v=>v.id==='buumi-playscape-pacific-place');
 // 2026-11-22 round F: two dated tiket.com partner tickets appended after this row.
 assert.equal(b.priceListings.length,3);
 const p=b.priceListings[0];
 assert.equal(p.amountIdr,225000);assert.equal(p.sourceKind,'partner');
 assert.equal(p.checkedAt,'2026-11-28');
 assert.match(p.sourceUrl,/pacific-place-playground$/);
 assert.match(p.label,/not class tuition/);assert.match(p.note,/No refund or rescheduling/);
 // 2026-11-22 QC price-note cut: keeper rows only, translated per row.
 assert.match(p.note,/Equipment ages 12 mo-12 yr/);assert.doesNotMatch(p.note,/Other channels|at least 18|baby-class/);
 for(const text of [p.unit,p.label])assert.ok(placeText(text,'id').length>0);
 for(const row of p.note.split('; '))assert.ok(placeText(row,'id').length>0,`untranslated note row: ${row}`);
});

test('Nov14 leaves pins, classes, reviews and listing dates untouched',()=>{
 const input=structuredClone(VENUES);
 for(const v of input){delete v.phone;delete v.priceListings;delete v.notes;}
 const before=structuredClone(input);enrich(input);
 for(let i=0;i<input.length;i++){
  const actual={...input[i]},expected={...before[i]};
  // caution intentionally excluded: enrich1120pins resolves the Nov19/20 cautions downstream of this patch
  for(const k of ['phone','priceListings','notes','caution']){delete actual[k];delete expected[k];}
  // 2026-11-24: enrich1124 (Rockstar depth batch) supersedes this patch's operatingStatus
  // for every rockstar-academy-* branch with branch-page + Winter W5 PDF evidence.
  if(input[i].id.startsWith('rockstar-academy-')){delete actual.operatingStatus;delete expected.operatingStatus;}
  // 2026-11-24: enrich1125 (depth batch 2) adds cardNote + lastCheckedAt and re-verifies
  // sources for these chains; this patch must not overwrite them when re-applied.
  if(/^(sparks-sports-academy-|sparks-swim-|studiorenang-|aquatic-baby-)/.test(input[i].id))for(const k of ['cardNote','lastCheckedAt','operatingStatus']){delete actual[k];delete expected[k];}
  // 2026-11-24: enrich1126 (depth batch 3) adds trial cardNotes, official website
  // links, new branch-confirmed classes and re-verification stamps for these
  // chains; this patch must not overwrite them when re-applied.
  if(/^(english-1-|i-can-read-|bright-little-stars-)/.test(input[i].id))for(const k of ['cardNote','lastCheckedAt','operatingStatus','website','programs']){delete actual[k];delete expected[k];}
  assert.deepEqual(actual,expected,input[i].id);
 }
});
