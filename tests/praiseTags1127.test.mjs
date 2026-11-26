import test from 'node:test';
import assert from 'node:assert/strict';
import {importTs} from './loadTs.mjs';
const {VENUES}=await importTs('../src/data/venues.ts');
const {isShownToUsers}=await importTs('../src/utils/visibility.ts');
test('Maps topic tags: praise only, counted, noted, complaint themes untouched', ()=>{
  const tagged=VENUES.filter(v=>v.reviews?.sampleNote?.includes('Google Maps topic tags'));
  assert.ok(tagged.length>=125);
  for(const v of tagged){
    assert.ok(isShownToUsers(v));
    assert.ok(v.reviews.praiseThemes.length>=1&&v.reviews.praiseThemes.length<=3);
    for(const t of v.reviews.praiseThemes){ const m=t.match(/\((\d+) reviews\)$/); assert.ok(m&&+m[1]>=2,t); }
  }
  const g=VENUES.find(v=>v.id==='rockstar-academy-gandaria-city');
  assert.equal(g.reviews.complaintThemes[0],'coach quality/favoritism');
  assert.equal(g.reviews.praiseThemes.length,1);
});
