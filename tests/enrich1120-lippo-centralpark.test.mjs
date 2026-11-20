import test from 'node:test';
import assert from 'node:assert/strict';
import {importTs} from './loadTs.mjs';
const {VENUES}=await importTs('../src/data/venues.ts');

test('Nov20 Lippo Mall Puri vs Central Park 2 naming is clear and sourced',()=>{
 const cp=VENUES.find(v=>v.id==='rockstar-academy-central-park-2');assert.ok(cp);
 assert.match(cp.branchName,/Neo Soho/);
 assert.match(cp.notes,/renamed Neo Soho mall/);assert.match(cp.notes,/different mall from Lippo Mall Puri/);
 assert.equal(cp.operatingStatus.state,'official-listed');assert.equal(cp.lastCheckedAt,'2026-11-20');
 const lp=VENUES.find(v=>v.id==='rockstar-academy-lippo-mall-puri');assert.ok(lp);
 assert.match(lp.notes,/separate mall from Central Park/);assert.equal(lp.lastCheckedAt,'2026-11-20');
});
