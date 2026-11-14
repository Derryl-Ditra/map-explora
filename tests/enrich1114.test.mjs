import test from 'node:test';
import assert from 'node:assert/strict';
import {importTs} from './loadTs.mjs';
const {VENUES}=await importTs('../src/data/venues.ts');
const {default:enrich}=await importTs('../src/data/enrich1114.ts');
const {placeText}=await importTs('../src/utils/placeLanguage.ts');

test('Nov14 adds an official contact and a narrowly labelled partner play ticket',()=>{
 const music=VENUES.find(v=>v.id==='music-wonderworld-bsd');
 assert.equal(music.phone,'+62 851-9592-7078');
 assert.equal(music.programs.length,0);
 const b=VENUES.find(v=>v.id==='buumi-playscape-pacific-place');
 assert.equal(b.priceListings.length,1);
 const p=b.priceListings[0];
 assert.equal(p.amountIdr,225000);assert.equal(p.sourceKind,'partner');
 assert.equal(p.checkedAt,'2026-11-14');
 assert.match(p.sourceUrl,/pacific-place-playground$/);
 assert.match(p.label,/not class tuition/);assert.match(p.note,/No refund or rescheduling/);
 assert.match(p.note,/12 months to 12 years/);assert.match(p.note,/Other channels/);
 for(const text of [p.unit,p.label,p.note])assert.ok(placeText(text,'id').length>0);
 assert.match(placeText(p.note,'id'),/bukan biaya kelas bayi/);
});

test('Nov14 leaves pins, classes, reviews and listing dates untouched',()=>{
 const input=structuredClone(VENUES);
 for(const v of input){delete v.phone;delete v.priceListings;delete v.notes;}
 const before=structuredClone(input);enrich(input);
 for(let i=0;i<input.length;i++){
  const actual={...input[i]},expected={...before[i]};
  for(const k of ['phone','priceListings','notes']){delete actual[k];delete expected[k];}
  assert.deepEqual(actual,expected,input[i].id);
 }
});
