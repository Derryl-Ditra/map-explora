import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {importTs} from './loadTs.mjs';
const {venueConfirmedForAge}=await importTs('../src/utils/ageMatch.ts');
const v=(min,max,level='branch')=>({programs:[],branchAge:{minMonths:min,maxMonths:max,level,verification:'provider-confirmed'}});
test('age UI uses a 0 to 59 number stepper, not a slider or bands',()=>{
 const source=readFileSync(new URL('../src/components/ui/FilterBar.tsx',import.meta.url),'utf8');assert.match(source,/type="number" min=\{0\} max=\{59\} step=\{1\}/);assert.doesNotMatch(source,/type="range"|AGE_PRESETS|ageGroup/);
});
test('exact month preserves 0 and 59 boundaries, open bounds stay unknown',()=>{
 assert.equal(venueConfirmedForAge(v(0,0),0),true);assert.equal(venueConfirmedForAge(v(0,0),1),false);
 assert.equal(venueConfirmedForAge(v(59,59),59),true);assert.equal(venueConfirmedForAge(v(60,72),59),false);
 assert.equal(venueConfirmedForAge(v(null,59),0),false);assert.equal(venueConfirmedForAge(v(0,null),59),false);
 assert.equal(venueConfirmedForAge(v(0,59,'brand'),24),false);assert.equal(venueConfirmedForAge(v(null,null),24),false);
 assert.equal(venueConfirmedForAge(v(18,23),23),true);assert.equal(venueConfirmedForAge(v(18,23),24),false);
});
