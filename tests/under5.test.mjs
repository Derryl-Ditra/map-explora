import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {importTs} from './loadTs.mjs';
const {venueConfirmedForAge}=await importTs('../src/utils/ageMatch.ts');
const v=(min,max,level='branch')=>({programs:[],branchAge:{minMonths:min,maxMonths:max,level,verification:'provider-confirmed',providerAgeUrl:'https://provider.example/ages'}});
test('age UI uses the approved dropdown instead of the exact-month stepper',()=>{
 const source=readFileSync(new URL('../src/components/ui/FilterBar.tsx',import.meta.url),'utf8');assert.match(source,/<select ref=\{ageSelect\} aria-label="Child age range"/);assert.doesNotMatch(source,/type="number"|type="range"|Increase age by one month/);
});
test('exact month preserves 0 and 59 boundaries, open bounds stay unknown',()=>{
 assert.equal(venueConfirmedForAge(v(0,0),0),true);assert.equal(venueConfirmedForAge(v(0,0),1),false);
 assert.equal(venueConfirmedForAge(v(59,59),59),true);assert.equal(venueConfirmedForAge(v(60,72),59),false);
 assert.equal(venueConfirmedForAge(v(null,59),0),false);assert.equal(venueConfirmedForAge(v(0,null),59),false);
 assert.equal(venueConfirmedForAge(v(0,59,'brand'),24),false);assert.equal(venueConfirmedForAge(v(null,null),24),false);
 assert.equal(venueConfirmedForAge(v(18,23),23),true);assert.equal(venueConfirmedForAge(v(18,23),24),false);
});
