import test from 'node:test';
import assert from 'node:assert/strict';
import {importTs} from './loadTs.mjs';
const {VENUES}=await importTs('../src/data/venues.ts');
const {verifiedPrograms,venueConfirmedForAge}=await importTs('../src/utils/ageMatch.ts');
// 2026-11-24: enrich1124 depth batch re-pins every Rockstar branch to its Winter Term 2026 W5 PDF
// (exact month bands from the PDF class key; live branch grid read 24 Nov 2026).
const expected={
  "rockstar-academy-aeon-mall-bsd-city": {source: "https://www.rockstaracademy.com/lib/upload/files/club/AB_Schedule_Winter_2026_Week_5.pdf", programs: [['Learn & Play 1',6,18],['Learn & Play 2',19,35],['Crawler',6,18],['Walker',12,23],['Jumper',24,35],['Baby Jam',6,18],['Sports U3',24,36],['Tots Gym U4',36,48],['Smartology 4',48,59],['TouchTennis 3-6 yrs',36,71]]},
  "rockstar-academy-aeon-mall-sentul-city": {source: "https://www.rockstaracademy.com/lib/upload/files/club/AS_Schedule_Winter_2026_W5.pdf", programs: [['Crawler',6,18],['Walker',12,23],['Jumper',24,35],['Baby Jam',6,18],['Learn & Play 1',6,18],['Learn & Play 2',19,35],['Smartology 4',48,59],['Sports U3',24,36],['Tots Gym U4',36,48]]},
  "rockstar-academy-aeon-mall-deltamas": {source: "https://www.rockstaracademy.com/lib/upload/files/club/AD_Schedule_Winter_2026_W5.pdf", programs: [['Crawler',6,18],['Walker',12,23],['Jumper',24,35],['Baby Jam',6,18],['Learn & Play 1',6,18],['Learn & Play 2',19,35],['Smartology 4',48,59],['Sports U3',24,36],['Tots Gym U4',36,48],['TouchTennis 3-6 yrs',36,71]]},
  "rockstar-academy-central-park-2": {source: "https://www.rockstaracademy.com/lib/upload/files/club/CP_Schedule_Winter_2026_W5.pdf", programs: [['Crawler',6,18],['Walker',12,23],['Jumper',24,35],['Learn & Play 1',6,18],['Learn & Play 2',19,35],['Smartology 4',48,59],['Sports U3',24,36],['Tots Gym U4',36,48],['TouchTennis 3-6 yrs',36,71]]},
  "rockstar-academy-gajah-mada-plaza": {source: "https://www.rockstaracademy.com/lib/upload/files/club/GM_Schedule_Winter_2026_W5.pdf", programs: [['Crawler',6,18],['Walker',12,23],['Jumper',24,35],['Learn & Play 1',6,18],['Learn & Play 2',19,35],['Smartology 4',48,59],['Sports U3',24,36],['Tots Gym U4',36,48],['TouchTennis 3-6 yrs',36,71]]},
  "rockstar-academy-gandaria-city": {source: "https://www.rockstaracademy.com/lib/upload/files/club/GC_Schedule_Winter_2026_W5.pdf", programs: [['Learn & Play 1',6,18],['Learn & Play 2',19,35],['Walker',12,23],['Jumper',24,35],['Crawler',6,18],['Baby Jam',6,18],['Tots Gym U4',36,48],['Sports U3',24,36],['Smartology 4',48,59]]},
  "rockstar-academy-grand-metropolitan-bekasi": {source: "https://www.rockstaracademy.com/lib/upload/files/club/GB_Schedule_Winter_2026_W5.pdf", programs: [['Crawler',6,18],['Walker',12,23],['Jumper',24,35],['Learn & Play 1',6,18],['Learn & Play 2',19,35],['Smartology 4',48,59],['Sports U3',24,36],['Tots Gym U4',36,48]]},
  "rockstar-academy-hampton-square": {source: "https://www.rockstaracademy.com/lib/upload/files/club/HS_Schedule_Winter_2026%C2%A0W5.pdf", programs: [['Crawler',6,18],['Walker',12,23],['Jumper',24,35],['Baby Jam',6,18],['Learn & Play 1',6,18],['Learn & Play 2',19,35],['Smartology 4',48,59],['Sports U3',24,36],['Tots Gym U4',36,48],['TouchTennis 3-6 yrs',36,71]]},
  "rockstar-academy-kota-kasablanka": {source: "https://www.rockstaracademy.com/lib/upload/files/club/KK_Schedule_Winter_2026_W51.pdf", programs: [['Learn & Play 1',6,18],['Learn & Play 2',19,35],['Crawler',6,18],['Walker',12,23],['Jumper',24,35],['Baby Jam',6,18],['Sports U3',24,36],['Tots Gym U4',36,48],['Smartology 4',48,59],['TouchTennis 3-6 yrs',36,71]]},
  "rockstar-academy-lippo-mall-kemang": {source: "https://www.rockstaracademy.com/lib/upload/files/club/KV_Schedule_Winter_2026_W5.pdf", programs: [['Crawler',6,18],['Walker',12,23],['Jumper',24,35],['Baby Jam',6,18],['Learn & Play 1',6,18],['Learn & Play 2',19,35],['Smartology 4',48,59],['Sports U3',24,36],['Tots Gym U4',36,48],['TouchTennis 3-6 yrs',36,71]]},
  "rockstar-academy-lippo-mall-puri": {source: "https://www.rockstaracademy.com/lib/upload/files/club/LP_Schedule_Winter_2026_W5.pdf", programs: [['Crawler',6,18],['Walker',12,23],['Jumper',24,35],['Learn & Play 1',6,18],['Learn & Play 2',19,35],['Smartology 4',48,59],['Sports U3',24,36],['Tots Gym U4',36,48]]},
  "rockstar-academy-lippo-plaza-ekalokasari": {source: "https://www.rockstaracademy.com/lib/upload/files/club/LE_Schedule_Winter_2026_W5.pdf", programs: [['Crawler',6,18],['Walker',12,23],['Jumper',24,35],['Baby Jam',6,18],['Learn & Play 1',6,18],['Learn & Play 2',19,35],['Smartology 4',48,59],['Sports U3',24,36],['Tots Gym U4',36,48],['TouchTennis 3-6 yrs',36,71]]},
  "rockstar-academy-living-world-alam-sutera": {source: "https://www.rockstaracademy.com/lib/upload/files/club/LW_Schedule_Winter_2026_W5.pdf", programs: [['Crawler',6,18],['Walker',12,23],['Jumper',24,35],['Baby Jam',6,18],['Learn & Play 1',6,18],['Learn & Play 2',19,35],['Smartology 4',48,59],['Sports U3',24,36],['Tots Gym U4',36,48]]},
  "rockstar-academy-lotte-mart-bintaro": {source: "https://www.rockstaracademy.com/lib/upload/files/club/LB_Schedule_Winter_2026_W5.pdf", programs: [['Learn & Play 1',6,18],['Learn & Play 2',19,35],['Crawler',6,18],['Walker',12,23],['Jumper',24,35],['Baby Jam',6,18],['Sports U3',24,36],['Tots Gym U4',36,48],['Smartology 4',48,59],['TouchTennis 3-6 yrs',36,71]]},
  "rockstar-academy-mall-of-indonesia": {source: "https://www.rockstaracademy.com/lib/upload/files/club/MI_Schedule_WInter_2026_Week_5.pdf", programs: [['Crawler',6,18],['Walker',12,23],['Jumper',24,35],['Baby Jam',6,18],['Learn & Play 1',6,18],['Learn & Play 2',19,35],['Smartology 4',48,59],['Sports U3',24,36],['Tots Gym U4',36,48]]},
  "rockstar-academy-pik-avenue": {source: "https://www.rockstaracademy.com/lib/upload/files/club/PA_Schedule_Winter_2026_W5.pdf", programs: [['Crawler',6,18],['Walker',12,23],['Jumper',24,35],['Learn & Play 1',6,18],['Learn & Play 2',19,35],['Smartology 4',48,59],['Sports U3',24,36],['Tots Gym U4',36,48]]},
  "rockstar-academy-pesona-square": {source: "https://www.rockstaracademy.com/lib/upload/files/club/PS_Schedule_Winter_2026_W5.pdf", programs: [['Crawler',6,18],['Walker',12,23],['Jumper',24,35],['Baby Jam',6,18],['Learn & Play 1',6,18],['Learn & Play 2',19,35],['Smartology 4',48,59],['Sports U3',24,36],['Tots Gym U4',36,48],['TouchTennis 3-6 yrs',36,71]]},
  "rockstar-academy-pluit-village": {source: "https://www.rockstaracademy.com/lib/upload/files/club/PV_Schedule_Winter_2026_W5.pdf", programs: [['Crawler',6,18],['Walker',12,23],['Jumper',24,35],['Learn & Play 1',6,18],['Learn & Play 2',19,35],['Smartology 4',48,59],['Sports U3',24,36],['Tots Gym U4',36,48]]},
  "rockstar-academy-tsm-cibubur": {source: "https://www.rockstaracademy.com/lib/upload/files/club/TC_Schedule_Winter_2026_Week_5.pdf", programs: [['Crawler',6,18],['Walker',12,23],['Jumper',24,35],['Baby Jam',6,18],['Learn & Play 1',6,18],['Learn & Play 2',19,35],['Smartology 4',48,59],['Sports U3',24,36],['Tots Gym U4',36,48]]},
  "rockstar-academy-the-park-pejaten": {source: "https://www.rockstaracademy.com/lib/upload/files/club/PP_Schedule_Winter_2026%C2%A0W3.pdf", programs: [['Learn & Play 1',6,18],['Learn & Play 2',19,35],['Crawler',6,18],['Walker',12,23],['Jumper',24,35],['Baby Jam',6,18],['Sports U3',24,36],['Tots Gym U4',36,48],['Smartology 4',48,59]]},
};
test('current Rockstar branch PDFs provide exact month bands, not rounded HTML ranges',()=>{
 for(const [id,exp] of Object.entries(expected)){
  const v=VENUES.find(v=>v.id===id);assert.ok(v,id);
  const ps=verifiedPrograms(v);
  assert.deepEqual(ps.map(p=>[p.name,p.age.minMonths,p.age.maxMonths]),exp.programs,id);
  for(const p of ps){assert.equal(p.age.providerAgeUrl,exp.source);assert.equal(p.age.sourceCheckedAt,'2026-11-24');}
  // every branch now confirms ages 6-59 months from its own PDF; 5 months and 60 months stay unconfirmed
  assert.equal(venueConfirmedForAge(v,5),false);assert.equal(venueConfirmedForAge(v,6),true);
  assert.equal(venueConfirmedForAge(v,35),true);assert.equal(venueConfirmedForAge(v,36),true);
  assert.equal(venueConfirmedForAge(v,59),true);
  // month 60 varies by branch: covered only where a PDF program band (e.g. 36-71) spans it
 }
});
