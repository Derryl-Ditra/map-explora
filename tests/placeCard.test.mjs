import test from 'node:test';
import assert from 'node:assert/strict';
import { importTs } from './loadTs.mjs';
const {VENUES}=await importTs('../src/data/venues.ts');
const {placeCardFacts}=await importTs('../src/utils/placeCard.ts');
const byId=id=>VENUES.find(v=>v.id===id);
test('preview keeps conflicts out of named class ages',()=>{
 for(const id of ['bloom-space-kota-wisata','membumi-playspace-cibubur']){
  const f=placeCardFacts(byId(id));assert.equal(f.conflict,true);assert.equal(f.classes.length,1);
 }
 assert.deepEqual(placeCardFacts(byId('bloom-space-kota-wisata')).classes,[{name:'Little Sprouts',min:12,max:19}]);
 assert.deepEqual(placeCardFacts(byId('membumi-playspace-cibubur')).classes,[{name:'Musik & Cerita Bayi',min:6,max:18}]);
});
test('preview supports 1,2,several classes, branch-age fallback and unknown ages',()=>{
 assert.equal(placeCardFacts(byId('golden-baby-school-jakarta-garden-city')).classes.length,1);
 assert.equal(placeCardFacts(byId('buumi-playscape-pacific-place')).classes.length,2);
 assert.equal(placeCardFacts(byId('the-funtastic-gym-pondok-indah')).classes.length,4);
 assert.equal(placeCardFacts(byId('anak-air-limo')).classes.length,0);
 const base={...byId('anak-air-limo'),programs:[],branchAge:{level:'branch',verification:'provider-confirmed',providerAgeUrl:'https://example.com',minMonths:1,maxMonths:4}};
 assert.deepEqual(placeCardFacts(base).classes,[{name:'',min:1,max:4}]);
});
test('rating needs usable score, count, source URL and evidence date',()=>{
 const v=byId('golden-baby-school-jakarta-garden-city');assert.deepEqual(placeCardFacts(v).rating,{rating:4.9,count:108,source:'Google Maps',date:'2026-11-03'});
 for(const patch of [{rating:null},{rating:0},{rating:5.1},{rating:NaN},{reviewCount:null},{reviewCount:0},{reviewCount:1.2},{sourceUrl:undefined},{checkedAt:''}])assert.equal(placeCardFacts({...v,reviews:{...v.reviews,...patch}}).rating,null);
 assert.equal(placeCardFacts({...v,reviews:undefined}).rating,null);
});
