import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {importTs} from './loadTs.mjs';
const {VENUES}=await importTs('../src/data/venues.ts');
const {estimatedPrograms}=await importTs('../src/data/age-estimates.ts');
const {isVerifiedAgeClaim,verifiedPrograms}=await importTs('../src/utils/ageMatch.ts');
test('planning estimates preserve conflicts and never enter verified classes',()=>{
 const rows=VENUES.flatMap(v=>estimatedPrograms(v).map(e=>({v,p:v.programs.find(p=>p.name===e.name),e})));
 assert.equal(rows.length,5);
 for(const {v,p,e} of rows){assert.ok(e.sources.length>=2);assert.ok(e.minMonths<=e.maxMonths);assert.equal(isVerifiedAgeClaim(p.age,p.note),false);assert.equal(verifiedPrograms(v).includes(p),false);}
 assert.deepEqual(rows.map(({p,e})=>[p.name,e.minMonths,e.maxMonths]),[['Learn & Play 1',6,18],['Learn & Play 2',19,35],['Funny Bugs',36,47],['GYM Bayi',8,18],['Baby Class',6,24]]);
});
test('estimates are visibly separate from confirmed ages and retain sources',()=>{
 const s=readFileSync(new URL('../src/components/ui/VenueDetails.tsx',import.meta.url),'utf8');
 assert.match(s,/Estimated ages/);assert.match(s,/Eligibility is not verified/);assert.match(s,/not a safety assessment/);assert.match(s,/estimate.sources.map/);
 for(const id of ['aquababies-bintaro','aquababies-menteng'])assert.equal(VENUES.find(v=>v.id===id).programs.length,0);
 assert.equal(estimatedPrograms(VENUES.find(v=>v.id==='sparks-sports-academy-teras-kota-bsd')).length,0);
});
