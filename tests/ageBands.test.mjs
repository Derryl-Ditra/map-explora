import test from 'node:test';
import assert from 'node:assert/strict';
import {importTs} from './loadTs.mjs';
let api={};try{api=await importTs('../src/utils/ageBands.ts')}catch{}
const claim=(min,max,extra={})=>({minMonths:min,maxMonths:max,level:'branch',verification:'provider-confirmed',providerAgeUrl:'https://example.org',...extra});
const venue=(age)=>({programs:[{name:'Class',offering:'offered',age}]});
test('approved bands are non-overlapping and cover every month under5',()=>{
 assert.deepEqual(api.AGE_BANDS.map(b=>[b.min,b.max]),[[0,5],[6,11],[12,17],[18,23],[24,35],[36,59]]);
});
test('partial overlap matches without requiring the entire band and rejects unknown/conflict',()=>{
 assert.equal(api.venueOverlapsBand(venue(claim(18,24)),'12-17'),false);
 assert.equal(api.venueOverlapsBand(venue(claim(18,24)),'18-23'),true);
 assert.equal(api.venueOverlapsBand(venue(claim(18,24)),'24-35'),true);
 assert.equal(api.venueOverlapsBand(venue(claim(null,24)),'18-23'),false);
 assert.equal(api.venueOverlapsBand(venue(claim(18,24,{sourceConflict:true})),'18-23'),false);
 assert.equal(api.venueOverlapsBand(venue(claim(18,24,{level:'brand'})),'18-23'),false);
});
test('row ranges come only from verified evidence overlapping the selection',()=>{
 assert.deepEqual(api.matchingAgeRanges(venue(claim(18,24)),'18-23'),['18 to 24 months']);
});
