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
 assert.equal(shown.flatMap(verifiedPrograms).length,47);
 assert.equal(shown.filter(v=>!verifiedPrograms(v).length).length,127);
 assert.equal(shown.filter(v=>!hasVerifiedAgeEvidence(v)).length,126);
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
