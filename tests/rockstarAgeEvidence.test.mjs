import test from 'node:test';
import assert from 'node:assert/strict';
import {importTs} from './loadTs.mjs';
const {VENUES}=await importTs('../src/data/venues.ts');
const {verifiedPrograms,venueConfirmedForAge}=await importTs('../src/utils/ageMatch.ts');
const expected={
  "rockstar-academy-aeon-mall-sentul-city": "https://www.rockstaracademy.com/lib/upload/files/club/AS_Schedule_Winter_20261.pdf",
  "rockstar-academy-aeon-mall-deltamas": "https://www.rockstaracademy.com/lib/upload/files/club/AD_Schedule_Winter_20261.pdf",
  "rockstar-academy-central-park-2": "https://www.rockstaracademy.com/lib/upload/files/club/CP_Schedule_Winter_Term_2026.pdf",
  "rockstar-academy-gajah-mada-plaza": "https://www.rockstaracademy.com/lib/upload/files/club/GM_Schedule_Winter_20261.pdf",
  "rockstar-academy-grand-metropolitan-bekasi": "https://www.rockstaracademy.com/lib/upload/files/club/GB_Schedule_Winter_20261.pdf",
  "rockstar-academy-hampton-square": "https://www.rockstaracademy.com/lib/upload/files/club/HS_Schedule_Winter_2026%C2%A0W3.pdf",
  "rockstar-academy-lippo-mall-kemang": "https://www.rockstaracademy.com/lib/upload/files/club/KV_Schedule_Winter_20261.pdf",
  "rockstar-academy-lippo-mall-puri": "https://www.rockstaracademy.com/lib/upload/files/club/LP_Schedule_Winter_20261.pdf",
  "rockstar-academy-lippo-plaza-ekalokasari": "https://www.rockstaracademy.com/lib/upload/files/club/LE_Schedule_Winter_20261.pdf",
  "rockstar-academy-living-world-alam-sutera": "https://www.rockstaracademy.com/lib/upload/files/club/LW_Schedule_Winter_2026%C2%A0W3.pdf",
  "rockstar-academy-mall-of-indonesia": "https://www.rockstaracademy.com/lib/upload/files/club/MI_Schedule_WInter_20262.pdf",
  "rockstar-academy-pik-avenue": "https://www.rockstaracademy.com/lib/upload/files/club/PA_Schedule_Winter_20261.pdf",
  "rockstar-academy-pesona-square": "https://www.rockstaracademy.com/lib/upload/files/club/PS_Schedule_Winter_20261.pdf",
  "rockstar-academy-pluit-village": "https://www.rockstaracademy.com/lib/upload/files/club/PV_Schedule_Winter_20261.pdf",
  "rockstar-academy-tsm-cibubur": "https://www.rockstaracademy.com/lib/upload/files/club/TC_Schedule_Winter_20261.pdf"
};
test('current Rockstar branch PDFs provide exact month bands, not rounded HTML ranges',()=>{
 for(const [id,source] of Object.entries(expected)){
  const v=VENUES.find(v=>v.id===id);assert.ok(v,id);
  const ps=verifiedPrograms(v);
  assert.deepEqual(ps.map(p=>[p.name,p.age.minMonths,p.age.maxMonths]),[['Crawler',6,18],['Walker',12,23],['Jumper',24,35]],id);
  for(const p of ps){assert.equal(p.age.providerAgeUrl,source);assert.equal(p.age.sourceCheckedAt,'2026-11-07');assert.match(p.note,/19 Oct 2026 to 17 Jan 2027/);}
  assert.equal(venueConfirmedForAge(v,5),false);assert.equal(venueConfirmedForAge(v,6),true);
  assert.equal(venueConfirmedForAge(v,35),true);assert.equal(venueConfirmedForAge(v,36),false);
 }
});
