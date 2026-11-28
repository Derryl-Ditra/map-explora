import test from 'node:test';
import assert from 'node:assert/strict';
import {importTs} from './loadTs.mjs';
const {VENUES}=await importTs('../src/data/venues.ts');
test('2026-11-28 price re-read: only confirmed listings re-dated, amounts unchanged', ()=>{
  const get=id=>VENUES.find(v=>v.id===id).priceListings;
  for(const id of ['anak-air-grand-cibubur','anak-air-kemang','anak-air-limo','anak-air-pondok-indah','anak-air-kebagusan']){
    const reg=get(id).find(p=>p.amountIdr===275000); assert.equal(reg.checkedAt,'2026-11-28');
  }
  assert.equal(get('buumi-playscape-pacific-place').find(p=>p.amountIdr===225000).checkedAt,'2026-11-28');
  assert.equal(get('morning-nest-preschool-bojongsari').find(p=>p.amountIdr===1200000).checkedAt,'2026-11-28');
  assert.equal(get('membumi-playspace-cibubur')[0].checkedAt,'2026-11-13'); // take.app no longer shows these prices
  assert.equal(get('kinderra-play-cakung')[0].checkedAt,'2026-11-11'); // page only shows a from-price
});
