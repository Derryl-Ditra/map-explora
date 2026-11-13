import {readFileSync} from 'node:fs';
import test from 'node:test';
import assert from 'node:assert/strict';
import {importTs} from './loadTs.mjs';
const {VENUES}=await importTs('../src/data/venues.ts');
const {isVerifiedAgeClaim,verifiedPrograms,hasVerifiedAgeEvidence,venueConfirmedForAge}=await importTs('../src/utils/ageMatch.ts');
const shown=VENUES.filter(v=>v.operatingStatus?.state==='official-listed'||v.operatingStatus?.state==='partner-listed');
const claim={level:'branch',verification:'provider-confirmed',minMonths:6,maxMonths:18,providerAgeUrl:'https://provider.example/ages'};
test('UI evidence rejects conflicts, ambiguity, missing bounds, missing sources and catalog claims',()=>{
 assert.equal(isVerifiedAgeClaim(claim),true);
 for(const change of [{sourceConflict:true},{maxMonths:null},{minMonths:null},{maxMonths:5},{providerAgeUrl:undefined},{level:'brand'},{verification:'listed-unconfirmed'}])assert.equal(isVerifiedAgeClaim({...claim,...change}),false);
 assert.equal(isVerifiedAgeClaim(claim,'upper-bound inclusivity ambiguous'),false);
});
test('dataset impact stays explicit without deleting public places',()=>{
 assert.equal(shown.length,141);
 assert.equal(shown.flatMap(verifiedPrograms).length,117);
 assert.equal(shown.filter(v=>!verifiedPrograms(v).length).length,100);
 assert.equal(shown.filter(v=>!hasVerifiedAgeEvidence(v)).length,99);
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
 const s=readFileSync(new URL('../src/components/GuideContent.tsx',import.meta.url),'utf8');
 assert.match(s,/isVerifiedAgeClaim\(v.branchAge\)/);assert.match(s,/verifiedPrograms\(v\)/);assert.doesNotMatch(s,/v.programs.filter/);
});

test('Buumi exact baby classes are branch-bound and older holiday claim stays hidden',()=>{
 const expected={ 'buumi-playscape-pacific-place':2,'buumi-playscape-plaza-senayan':2,'buumi-playscape-urban-forest-cipete':1 };
 for(const [id,count] of Object.entries(expected)){const v=VENUES.find(v=>v.id===id);assert.ok(v);const ps=verifiedPrograms(v);assert.equal(ps.length,count);for(const p of ps){assert.equal(p.age.minMonths,6);assert.equal(p.age.maxMonths,18);assert.equal(p.term,'November 2026');assert.match(p.age.providerAgeUrl,/instagram.com\/buumiplayscape\/p\//);}assert.equal(venueConfirmedForAge(v,5),false);assert.equal(venueConfirmedForAge(v,6),true);assert.equal(venueConfirmedForAge(v,18),true);assert.equal(venueConfirmedForAge(v,19),false);}
});

test('Membumi and Genesis exact classes remain separate from conflicting and year-based claims',()=>{
 const m=VENUES.find(v=>v.id==='membumi-playspace-cibubur');const g=VENUES.find(v=>v.id==='genesis-baby-toddler-swim-pejaten');
 assert.deepEqual(verifiedPrograms(m).map(p=>p.name),['Musik & Cerita Bayi']);
 assert.deepEqual(verifiedPrograms(g).map(p=>p.name),['Baby Class']);
 assert.equal(m.programs.find(p=>p.name==='GYM Bayi').age.sourceConflict,true);
 for(const [v,min,max] of [[m,6,18],[g,4.5,18]]){assert.equal(venueConfirmedForAge(v,min),true);assert.equal(venueConfirmedForAge(v,max),true);assert.equal(venueConfirmedForAge(v,min-0.5),false);assert.equal(venueConfirmedForAge(v,max+1),false);}
 assert.equal(venueConfirmedForAge(g,4),false);assert.equal(venueConfirmedForAge(g,5),true);
});

test('BLS exact sensory class ages stay bound to the published learning centers',()=>{
 const rows={'bright-little-stars-kemang':[['Baby Blossoms',6,12],['Giggles and Glows',12,18],['Cuddle Bugs',18,24]],'bright-little-stars-bintaro':[['Incredible Infant',3,6],['Brilliant Baby',6,12],['Thriving Toddler',12,18],['Talented Toddler',18,24]],'bright-little-stars-bsd-learning-center':[['Incredible Infant',3,6],['Brilliant Baby',6,12],['Thriving Toddler',12,18],['Talented Toddler',18,24]]};
 for(const [id,expected] of Object.entries(rows)){const v=VENUES.find(v=>v.id===id);assert.deepEqual(verifiedPrograms(v).map(p=>[p.name,p.age.minMonths,p.age.maxMonths]),expected);for(const p of verifiedPrograms(v)){assert.match(p.age.providerAgeUrl,/brightlittlestarsedu.com\/programs\//);assert.equal(p.age.sourceCheckedAt,'2026-11-05');}}
 assert.equal(verifiedPrograms(VENUES.find(v=>v.id==='bright-little-stars-bsd-preschool')).length,0);
 assert.equal(VENUES.find(v=>v.id==='rockstar-academy-gandaria-city').programs.find(p=>p.name==='Learn & Play 1').age.sourceConflict,true);
 assert.equal(VENUES.find(v=>v.id==='aquatic-baby-bintaro').programs.find(p=>p.name==='Baby Class').age.sourceConflict,true);
});
