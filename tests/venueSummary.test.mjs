import test from 'node:test';
import assert from 'node:assert/strict';
import { importTs } from './loadTs.mjs';
const { cardAgeSummary, cardRatingSummary, phoneHref } = await importTs('../src/utils/venueSummary.ts');
const claim = {level:'branch',verification:'provider-confirmed',minMonths:6,maxMonths:18,providerAgeUrl:'https://provider.example/ages',sourceCheckedAt:'2026-11-08'};
const venue = {programs:[{name:'Baby',offering:'offered',age:claim}],reviews:{rating:4.8,reviewCount:123,source:'Google Maps'}};
test('card age overview counts separate checked ranges without filling gaps',()=>{
 assert.equal(cardAgeSummary(venue),'Verified ages: 6-18 mo');
 assert.equal(cardAgeSummary({...venue,programs:[...venue.programs,{name:'Toddler',offering:'offered',age:{...claim,minMonths:30,maxMonths:48}}]}),'Verified ages: 6-18 mo, 30-48 mo');
});
test('dense overlapping claims merge and duplicate claims stay compact',()=>{
 const programs = [6,12,18,24,30,36].map(minMonths=>({name:'Class',offering:'offered',age:{...claim,minMonths,maxMonths:minMonths+11}}));
 assert.equal(cardAgeSummary({programs}), 'Verified ages: 6-47 mo');
 assert.equal(cardAgeSummary({...venue,branchAge:claim,programs:[...venue.programs,...venue.programs]}),'Verified ages: 6-18 mo');
});
test('age overview sorts by lower bound before choosing two ranges',()=>{
 const programs = [30,6,18].map(minMonths=>({name:'Class',offering:'offered',age:{...claim,minMonths,maxMonths:minMonths+5}}));
 assert.equal(cardAgeSummary({programs}),'Verified ages: 6-11 mo, 18-23 mo +1 more');
});
test('card ages decide from the best available tier, always with confirm-by-phone below verified',()=>{
 // Owner rule 2026-11-22 (follow-up): no undecided cases. Brand, listed and
 // conflicted claims still yield a decided range; only the confidence label
 // and the confirm-by-phone note change.
 assert.equal(cardAgeSummary({programs:[{...venue.programs[0],age:{...claim,level:'brand'}}]}),'Ages from brand site: 6-18 mo. Confirm by phone first.');
 assert.equal(cardAgeSummary({programs:[{...venue.programs[0],age:{...claim,sourceConflict:true}}]}),'Ages from provider listing: 6-18 mo. Confirm by phone first.');
 assert.equal(cardAgeSummary({programs:[{...venue.programs[0],note:'ambiguous age boundary'}]}),'Ages from provider listing: 6-18 mo. Confirm by phone first.');
 assert.equal(cardAgeSummary({programs:[{...venue.programs[0],offering:'unknown'}]}),'Ages not published. Confirm by phone first.');
});
test('card rating includes source and sample count, not fabricated missing values',()=>{
 assert.equal(cardRatingSummary(venue),'Google Maps: 4.8/5 (123 reviews)');
 assert.equal(cardRatingSummary({}),'Rating not available');
 assert.equal(cardRatingSummary({reviews:{rating:null,reviewCount:0,source:'Google Maps'}}),'Rating not available');
 assert.equal(cardRatingSummary({reviews:{rating:4,reviewCount:null,source:'Google Maps'}}),'Google Maps: 4.0/5');
});
test('phone links preserve digits and international prefix, reject non-number data',()=>{
 assert.equal(phoneHref('+62 21 39724242'),'tel:+622139724242');
 assert.equal(phoneHref('(021) 123-4567'),'tel:0211234567');
 assert.equal(phoneHref(undefined),null);
 assert.equal(phoneHref('ask admin'),null);
});
