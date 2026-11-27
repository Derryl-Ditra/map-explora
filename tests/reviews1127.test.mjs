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
test('2026-11-27 refresh: ratingReadAt set on refreshed venues only, other review fields unchanged', ()=>{
  const ids=['sparks-swim-bintaro-utown','english-1-pajajaran','anak-air-kemang','sparks-swim-harapan-indah'];
  for(const id of ids){
    const r=VENUES.find(x=>x.id===id).reviews;
    assert.equal(r.ratingReadAt,'2026-11-27');
    assert.ok(r.checkedAt<'2026-11-27');
  }
  const h=VENUES.find(x=>x.id==='sparks-swim-harapan-indah').reviews;
  assert.equal(h.reviewCount,24);
  const untouched=VENUES.filter(x=>x.reviews&&!x.reviews.ratingReadAt);
  assert.ok(untouched.length>0&&untouched.length<VENUES.length);
  for(const x of untouched) assert.equal(x.reviews.ratingReadAt,undefined);
});
test('pinned ratings and counts for refreshed venues', ()=>{
  const pin={'sparks-swim-bintaro-utown':[4.8,16],'english-1-pajajaran':[5,1400],'anak-air-kemang':[4.8,23],'sparks-swim-harapan-indah':[4.9,24]};
  for(const [id,[rt,n]] of Object.entries(pin)){ const r=VENUES.find(x=>x.id===id).reviews; assert.equal(r.rating,rt); assert.equal(r.reviewCount,n); }
});
