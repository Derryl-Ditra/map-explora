import {readFileSync} from 'node:fs';
import test from 'node:test';
import assert from 'node:assert/strict';
import {importTs} from './loadTs.mjs';
const {VENUES}=await importTs('../src/data/venues.ts');
const {isVerifiedAgeClaim,verifiedPrograms,hasVerifiedAgeEvidence,venueConfirmedForAge}=await importTs('../src/utils/ageMatch.ts');
const shown=VENUES.filter(v=>v.operatingStatus?.state==='official-listed');
const claim={level:'branch',verification:'provider-confirmed',minMonths:6,maxMonths:18,providerAgeUrl:'https://provider.example/ages'};
test('UI evidence rejects conflicts, ambiguity, missing bounds, missing sources and catalog claims',()=>{
 assert.equal(isVerifiedAgeClaim(claim),true);
 for(const change of [{sourceConflict:true},{maxMonths:null},{minMonths:null},{maxMonths:5},{providerAgeUrl:undefined},{level:'brand'},{verification:'listed-unconfirmed'}])assert.equal(isVerifiedAgeClaim({...claim,...change}),false);
 assert.equal(isVerifiedAgeClaim(claim,'upper-bound inclusivity ambiguous'),false);
});
test('dataset impact stays explicit without deleting public places',()=>{
 assert.equal(shown.length,136);
 assert.equal(shown.flatMap(verifiedPrograms).length,49);
 assert.equal(shown.filter(v=>!verifiedPrograms(v).length).length,125);
 assert.equal(shown.filter(v=>!hasVerifiedAgeEvidence(v)).length,124);
 assert.equal(shown.filter(v=>venueConfirmedForAge(v,59)).length,1);
});
test('every confirmed place at all 60 stepper months has visible evidence covering that month',()=>{
 for(let m=0;m<60;m++)for(const v of shown){
  const ages=[...(v.branchAge&&isVerifiedAgeClaim(v.branchAge)?[v.branchAge]:[]),...verifiedPrograms(v).map(p=>p.age)];
  assert.equal(venueConfirmedForAge(v,m),ages.some(a=>a.minMonths<=m&&m<=a.maxMonths));
 }
});
test('hidden class never confirms even away from its ambiguous boundary',()=>{
 const v={programs:[{name:'hidden',offering:'offered',age:claim,note:'upper-bound ambiguous'}]};
 assert.equal(verifiedPrograms(v).length,0);assert.equal(venueConfirmedForAge(v,12),false);
});

test('guide class rows and branch statements share the verified evidence gate',()=>{
 const s=readFileSync(new URL('../src/app/activities/[slug]/page.tsx',import.meta.url),'utf8');
 assert.match(s,/isVerifiedAgeClaim\(v.branchAge\)/);assert.match(s,/verifiedPrograms\(v\)/);assert.doesNotMatch(s,/v.programs.filter|Confirm class/);
});


test('Membumi and Genesis exact classes remain separate from conflicting and year-based claims',()=>{
 const m=VENUES.find(v=>v.id==='membumi-playspace-cibubur');const g=VENUES.find(v=>v.id==='genesis-baby-toddler-swim-pejaten');
 assert.deepEqual(verifiedPrograms(m).map(p=>p.name),['Musik & Cerita Bayi']);
 assert.deepEqual(verifiedPrograms(g).map(p=>p.name),['Baby Class']);
 assert.equal(m.programs.find(p=>p.name==='GYM Bayi').age.sourceConflict,true);
 for(const [v,min,max] of [[m,6,18],[g,4.5,18]]){assert.equal(venueConfirmedForAge(v,min),true);assert.equal(venueConfirmedForAge(v,max),true);assert.equal(venueConfirmedForAge(v,min-0.5),false);assert.equal(venueConfirmedForAge(v,max+1),false);}
 assert.equal(venueConfirmedForAge(g,4),false);assert.equal(venueConfirmedForAge(g,5),true);
});
