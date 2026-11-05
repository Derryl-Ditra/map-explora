import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {importTs} from './loadTs.mjs';
const {claimCovers}=await importTs('../src/utils/ageMatch.ts');
test('59 months is selectable and five years is not a preset',()=>{
 const source=readFileSync(new URL('../src/components/ui/FilterBar.tsx',import.meta.url),'utf8');
 assert.match(source,/max=\{59\}/);assert.match(source,/label: "59 mo", months: 59/);assert.doesNotMatch(source,/months: 60/);
});
test('exact eligibility still distinguishes 59 from 60 months',()=>{
 const age={minMonths:48,maxMonths:59,level:'branch',verification:'provider-confirmed'};
 assert.equal(claimCovers(age,59),true);assert.equal(claimCovers(age,60),false);
});
