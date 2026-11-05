import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {importTs} from './loadTs.mjs';
const {AGE_GROUPS,venueConfirmedForGroup}=await importTs('../src/utils/ageMatch.ts');
const v=(min,max,level='branch')=>({programs:[],branchAge:{minMonths:min,maxMonths:max,level,verification:'provider-confirmed'}});
test('groups cover 0 to 59 exactly without overlap and no slider',()=>{
 assert.deepEqual(AGE_GROUPS.flatMap(g=>Array.from({length:g.max-g.min+1},(_,i)=>g.min+i)),Array.from({length:60},(_,i)=>i));
 const source=readFileSync(new URL('../src/components/ui/FilterBar.tsx',import.meta.url),'utf8');assert.doesNotMatch(source,/type="range"/);
});
test('overlapping ages match but brand claims and unknown bounds do not confirm',()=>{
 assert.equal(venueConfirmedForGroup(v(18,30),24),true);assert.equal(venueConfirmedForGroup(v(18,30),36),true);assert.equal(venueConfirmedForGroup(v(18,30),12),false);
 assert.equal(venueConfirmedForGroup(v(18,30,'brand'),24),false);assert.equal(venueConfirmedForGroup(v(null,30),24),false);
 assert.equal(venueConfirmedForGroup(v(60,72),59),false);assert.equal(venueConfirmedForGroup(v(59,59),59),true);
});
