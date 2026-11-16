import test from 'node:test';
import assert from 'node:assert/strict';
import {importTs} from './loadTs.mjs';
const {VENUES}=await importTs('../src/data/venues.ts');
const {verifiedPrograms,hasVerifiedAgeEvidence}=await importTs('../src/utils/ageMatch.ts');
const {placeText}=await importTs('../src/utils/placeLanguage.ts');
test('Nov16 two reviewed partner branches do not become verified age matches',()=>{
 for(const id of ['sociable-inclusive-learning-meruya','morning-nest-preschool-bojongsari']){
  const v=VENUES.find(v=>v.id===id);assert.ok(v);assert.equal(v.operatingStatus.state,'partner-listed');assert.equal(v.coordinateSource,'maps-pin');
  assert.equal(verifiedPrograms(v).length,0);assert.equal(hasVerifiedAgeEvidence(v),false);assert.equal(v.reviews,undefined);
  for(const p of v.priceListings){assert.equal(p.sourceKind,'partner');assert.equal(p.checkedAt,'2026-11-16');for(const k of ['label','unit','note'])assert.ok(placeText(p[k],'id'));}
 }
});
test('Nov16 excludes unresolved red-flag or identity leads',()=>{
 for(const name of ['bright-cubs-pik','harahap-swimming-jagakarsa','scuola-bogor'])assert.equal(VENUES.some(v=>v.id===name),false);
});

test('Nov16 QC cautions and specialist focus remain visible and translated',()=>{
 const m=VENUES.find(v=>v.id==='morning-nest-preschool-bojongsari');assert.match(m.caution,/440 m/);assert.ok(placeText(m.caution,'id'));
 const s=VENUES.find(v=>v.id==='sociable-inclusive-learning-meruya');assert.match(s.programs[0].note,/special-needs/);assert.match(s.programs[0].note,/3-16/);assert.ok(placeText(s.programs[0].note,'id'));
});
