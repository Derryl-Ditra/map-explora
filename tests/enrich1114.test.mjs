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
 assert.equal(b.priceListings.length,1);
 const p=b.priceListings[0];
 assert.equal(p.amountIdr,225000);assert.equal(p.sourceKind,'partner');
 assert.equal(p.checkedAt,'2026-11-14');
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
  assert.deepEqual(actual,expected,input[i].id);
 }
});
