import test from 'node:test';
import assert from 'node:assert/strict';
import {importTs} from './loadTs.mjs';
const {VENUES}=await importTs('../src/data/venues.ts');
const {isShownToUsers}=await importTs('../src/utils/visibility.ts');
test('Maps topic tags: praise only, counted, dated, complaint themes untouched', async()=>{
  const tagged=VENUES.filter(v=>v.reviews?.praiseTagsReadAt);
  assert.ok(tagged.length>=125&&tagged.length<=132);
  const {praiseTagText}=await importTs('../src/utils/praiseTags.ts');
  const bad=['be patient','comfort (','wide (','communicative tool','kind miss'];
  for(const v of tagged){
    assert.ok(isShownToUsers(v));
    assert.ok(v.reviews.praiseThemes.length>=1&&v.reviews.praiseThemes.length<=3);
    const cs=[];
    for(const t of v.reviews.praiseThemes){ const m=t.match(/\((\d+) reviews\)$/); assert.ok(m&&+m[1]>=2,t); cs.push(+m[1]); for(const b of bad) assert.ok(!t.startsWith(b),t); assert.ok(praiseTagText(t,'id'),'no Bahasa for '+t); }
    assert.deepEqual(cs,[...cs].sort((a,b)=>b-a));
    assert.equal(new Set(v.reviews.praiseThemes.map(t=>t.replace(/ \(\d+ reviews\)$/,''))).size,cs.length);
  }
  const g=VENUES.find(v=>v.id==='rockstar-academy-gandaria-city');
  assert.equal(g.reviews.complaintThemes[0],'coach quality/favoritism');
  assert.equal(g.reviews.praiseThemes.length,1);
});
test('duplicate Maps topics keep the larger count; emptied venues show no tags', ()=>{
  assert.deepEqual(VENUES.find(v=>v.id==='rockstar-academy-tsm-cibubur').reviews.praiseThemes,['patient coach (4 reviews)']);
  for(const id of ['aquatic-baby-bintaro','sparks-swim-bintaro-utown']) assert.equal(VENUES.find(v=>v.id===id).reviews.praiseTagsReadAt,undefined);
});
