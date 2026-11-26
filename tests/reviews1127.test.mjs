import test from 'node:test';
import assert from 'node:assert/strict';
import {importTs} from './loadTs.mjs';
const {VENUES}=await importTs('../src/data/venues.ts');
test('2026-11-27 aggregate refresh: harapan-indah updated, themes and checkedAt untouched', ()=>{
  const v=VENUES.find(x=>x.id==='sparks-swim-harapan-indah');
  assert.equal(v.reviews.rating,4.9);
  assert.equal(v.reviews.reviewCount,24);
  assert.equal(v.reviews.checkedAt,'2026-11-05');
  for(const x of VENUES){ if(!x.reviews) continue; assert.ok(x.reviews.reviewCount===null||x.reviews.reviewCount>=0); assert.ok(x.reviews.rating===null||(x.reviews.rating>=1&&x.reviews.rating<=5)); }
});
