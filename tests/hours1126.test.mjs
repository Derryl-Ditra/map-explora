import test from 'node:test';
import assert from 'node:assert/strict';
import {importTs} from './loadTs.mjs';
const {VENUES}=await importTs('../src/data/venues.ts');
const {isShownToUsers}=await importTs('../src/utils/visibility.ts');
const withHours=VENUES.filter(v=>v.openingHours);
test('opening hours: 3 official branch-level captures, all visible venues, well-formed',()=>{
 assert.deepEqual(withHours.map(v=>v.id).sort(),['bumi-nusantara-montessori-bsd','golden-baby-school-jakarta-garden-city','kimi-friends-montessori-gading-serpong']);
 for(const v of withHours){
  assert.ok(isShownToUsers(v));
  assert.match(v.openingHours.text,/^(Mon|Tue|Wed|Thu|Fri|Sat|Sun)[A-Za-z, -]* \d\d:\d\d-\d\d:\d\d$/);
  assert.match(v.openingHours.sourceUrl,/^https:\/\//);
  assert.equal(v.openingHours.checkedAt,'2026-11-26');
 }
 assert.equal(VENUES.find(v=>v.id==='kimi-friends-montessori-gading-serpong').openingHours.text,'Mon-Sat 08:30-15:00');
});
