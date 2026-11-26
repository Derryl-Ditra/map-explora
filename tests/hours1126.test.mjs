import test from 'node:test';
import assert from 'node:assert/strict';
import {importTs} from './loadTs.mjs';
const {VENUES}=await importTs('../src/data/venues.ts');
const {isShownToUsers}=await importTs('../src/utils/visibility.ts');
const withHours=VENUES.filter(v=>v.openingHours);
test('opening hours: 4 official branch-level captures, all visible venues, well-formed',()=>{
 assert.deepEqual(withHours.map(v=>v.id).sort(),['bintaro-inline-skate','bumi-nusantara-montessori-bsd','golden-baby-school-jakarta-garden-city','kimi-friends-montessori-gading-serpong']);
 for(const v of withHours){
  assert.ok(isShownToUsers(v));
  assert.match(v.openingHours.text,/^(Mon|Tue|Wed|Thu|Fri|Sat|Sun)[A-Za-z, -]* \d\d:\d\d-\d\d:\d\d(, (Mon|Tue|Wed|Thu|Fri|Sat|Sun)[A-Za-z-]* \d\d:\d\d-\d\d:\d\d)*$/);
  assert.match(v.openingHours.sourceUrl,/^https:\/\//);
  assert.equal(v.openingHours.checkedAt,'2026-11-26');
 }
 assert.equal(VENUES.find(v=>v.id==='kimi-friends-montessori-gading-serpong').openingHours.text,'Mon-Sat 08:30-15:00');
});

const {hoursTextId,hoursLabel}=await importTs('../src/utils/openingHours.ts');
test('opening hours: Bahasa weekdays and school label',()=>{
 assert.equal(hoursTextId('Mon-Sat 08:30-15:00'),'Sen-Sab 08:30-15:00');
 assert.equal(hoursTextId('Mon-Fri 07:30-14:30'),'Sen-Jum 07:30-14:30');
 assert.equal(hoursLabel('school','en'),'School hours');
 assert.equal(hoursLabel('school','id'),'Jam sekolah');
 assert.equal(hoursLabel(undefined,'id'),'Jam buka');
 assert.deepEqual(withHours.filter(v=>v.openingHours.kind==='school').map(v=>v.id),['golden-baby-school-jakarta-garden-city']);
});
