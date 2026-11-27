import test from 'node:test';
import assert from 'node:assert/strict';
import {importTs} from './loadTs.mjs';
const {VENUES}=await importTs('../src/data/venues.ts');
const {isShownToUsers}=await importTs('../src/utils/visibility.ts');
const withHours=VENUES.filter(v=>v.openingHours&&!v.openingHours.source);
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

const {hoursTextId,hoursLabel}=await importTs('../src/utils/openingHours.ts');
test('opening hours: Bahasa weekdays and school label',()=>{
 assert.equal(hoursTextId('Mon-Sat 08:30-15:00'),'Sen-Sab 08:30-15:00');
 assert.equal(hoursTextId('Mon-Fri 07:30-14:30'),'Sen-Jum 07:30-14:30');
 assert.equal(hoursLabel('school','en'),'School hours');
 assert.equal(hoursLabel('school','id'),'Jam sekolah');
 assert.equal(hoursLabel(undefined,'id'),'Jam buka');
 assert.deepEqual(withHours.filter(v=>v.openingHours.kind==='school').map(v=>v.id),['golden-baby-school-jakarta-garden-city']);
});

test('opening hours from Google Maps: labelled, dated, well-formed, never over official hours',()=>{
 const maps=VENUES.filter(v=>v.openingHours?.source==='google-maps');
 assert.ok(maps.length>=140);
 for(const v of maps){
  assert.ok(isShownToUsers(v));
  assert.equal(v.openingHours.checkedAt,'2026-11-27');
  assert.match(v.openingHours.sourceUrl,/^https:\/\/www\.google\.com\/maps\//);
  assert.match(v.openingHours.text,/^((Mon|Tue|Wed|Thu|Fri|Sat|Sun)(-(Mon|Tue|Wed|Thu|Fri|Sat|Sun))? (closed|\d\d:\d\d-\d\d:\d\d))(, (Mon|Tue|Wed|Thu|Fri|Sat|Sun)(-(Mon|Tue|Wed|Thu|Fri|Sat|Sun))? (closed|\d\d:\d\d-\d\d:\d\d))*$/);
  for(const m of v.openingHours.text.matchAll(/(\d\d):(\d\d)-(\d\d):(\d\d)/g)) assert.ok(+m[1]*60+ +m[2] < +m[3]*60+ +m[4]);
 }
 assert.equal(VENUES.find(v=>v.id==='kimi-friends-montessori-gading-serpong').openingHours.source,undefined);
 assert.equal(hoursTextId('Mon closed, Tue-Fri 08:30-17:00'),'Sen tutup, Sel-Jum 08:30-17:00');
});

test('Maps hours: venue-hours label and class-time caption; host-club and school hours skipped',async()=>{
 const {hoursLabel,hoursCaption}=await importTs('../src/utils/openingHours.ts');
 assert.equal(hoursLabel(undefined,'en','google-maps'),'Venue hours');
 assert.equal(hoursLabel(undefined,'id','google-maps'),'Jam buka tempat');
 assert.equal(hoursLabel(undefined,'en'),'Opening hours');
 assert.equal(hoursCaption('google-maps','id'),'Jadwal kelas bisa beda. Konfirmasi lewat telepon.');
 assert.equal(hoursCaption(undefined,'en'),'');
 for(const id of ['harahap-jagakarsa','kiddies88-havana-setiamekar']) assert.equal(VENUES.find(v=>v.id===id).openingHours,undefined);
 // split-shift rows (two ranges for one day group) never match the stored format
 for(const v of VENUES.filter(v=>v.openingHours?.source==='google-maps')) assert.ok(!/\d\d:\d\d-\d\d:\d\d[,;]? ?\d\d:\d\d/.test(v.openingHours.text));
});
