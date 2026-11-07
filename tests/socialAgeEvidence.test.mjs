import test from 'node:test';
import assert from 'node:assert/strict';
import {importTs} from './loadTs.mjs';
const {VENUES}=await importTs('../src/data/venues.ts');
const {verifiedPrograms,venueConfirmedForAge}=await importTs('../src/utils/ageMatch.ts');
const expected={
  "sparks-sports-academy-pajajaran-bogor": ["Sensory Crawler",6,11,"https://www.instagram.com/sparks_sportsacademy/p/DbMzKUxDARb/"],
  "sparks-sports-academy-bintaro-utown": [
    "Sensory Crawler",
    6,
    11,
    "https://www.instagram.com/sparks_sportsacademy/p/DbMzKUxDARb/"
  ],
  "sparks-sports-academy-harapan-indah-bekasi": [
    "Sensory Crawler",
    6,
    11,
    "https://www.instagram.com/sparks_sportsacademy/p/DbMzKUxDARb/"
  ],
  "sparks-sports-academy-kemang-ampera": [
    "Sensory Crawler",
    6,
    11,
    "https://www.instagram.com/sparks_sportsacademy/p/DbMzKUxDARb/"
  ],
  "sparks-sports-academy-siliwangi": [
    "Sensory Crawler",
    6,
    11,
    "https://www.instagram.com/sparks_sportsacademy/p/DbMzKUxDARb/"
  ],
  "sparks-sports-academy-sunter": [
    "Sensory Crawler",
    6,
    11,
    "https://www.instagram.com/sparks_sportsacademy/p/DbMzKUxDARb/"
  ],
  "sparks-sports-academy-taman-palem": [
    "Sensory Crawler",
    6,
    11,
    "https://www.instagram.com/sparks_sportsacademy/p/DbMzKUxDARb/"
  ],
  "sparks-sports-academy-teras-kota-bsd": [
    "Sensory Crawler",
    6,
    11,
    "https://www.instagram.com/sparks_sportsacademy/p/DbMzKUxDARb/"
  ],
  "gogrow-tanjung-duren": [
    "Baby Music Class",
    8,
    23,
    "https://www.instagram.com/letsgogrow.id/p/Da2InNgiXIk/?img_index=4"
  ]
};
test('dated official social announcements bind exact ages only to named branches',()=>{
 for(const [id,[name,min,max,url]] of Object.entries(expected)){
  const v=VENUES.find(v=>v.id===id);const p=verifiedPrograms(v).find(p=>p.name===name);assert.ok(p,id);
  assert.equal(p.age.minMonths,min);assert.equal(p.age.maxMonths,max);assert.equal(p.age.providerAgeUrl,url);
  assert.match(p.note,/not a current timetable/);assert.equal(p.age.sourceCheckedAt,'2026-11-07');
  assert.equal(venueConfirmedForAge(v,min),true);assert.equal(venueConfirmedForAge(v,max),true);
  assert.equal(venueConfirmedForAge(v,min-1),false);assert.equal(venueConfirmedForAge(v,max+1),false);
 }
 for(const id of ['sparks-sports-academy-bsd-tangerang','sparks-sports-academy-cibinong']){
  assert.equal(verifiedPrograms(VENUES.find(v=>v.id===id)).length,0,id);
 }
});

test('Pajajaran omits disputed street number and retains the verified Maps pin',()=>{
 const v=VENUES.find(v=>v.id==='sparks-sports-academy-pajajaran-bogor');
 assert.equal(v.address,'Jl. Raya Pajajaran, RT.02/RW.04, Babakan, Kecamatan Bogor Tengah, Kota Bogor, Jawa Barat 16128, Indonesia');
 assert.equal(v.lat,-6.590537);assert.equal(v.lng,106.804468);
 assert.equal(v.coordinateSource,'maps-pin');
});
