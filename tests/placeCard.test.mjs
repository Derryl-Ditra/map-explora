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
test('preview supports 1,2,several named classes and never relabels branch age as a class',()=>{
 assert.equal(placeCardFacts(byId('golden-baby-school-jakarta-garden-city')).classes.length,1);
 assert.equal(placeCardFacts(byId('buumi-playscape-pacific-place')).classes.length,2);
 assert.equal(placeCardFacts(byId('the-funtastic-gym-pondok-indah')).classes.length,4);
 assert.equal(placeCardFacts(byId('anak-air-limo')).classes.length,0);
 const base={...byId('anak-air-limo'),programs:[],branchAge:{level:'branch',verification:'provider-confirmed',providerAgeUrl:'https://example.com',minMonths:1,maxMonths:4}};
 assert.deepEqual(placeCardFacts(base).classes,[]);
 assert.deepEqual(placeCardFacts(base).branchAge,{min:1,max:4});
 assert.equal(placeCardFacts(base).notice,'verified');
});
test('rating needs usable score, count, source URL and evidence date',()=>{
 const v=byId('golden-baby-school-jakarta-garden-city');assert.deepEqual(placeCardFacts(v).rating,{rating:4.9,count:108,source:'Google Maps',date:'2026-11-03'});
 for(const patch of [{rating:null},{rating:0},{rating:5.1},{rating:NaN},{reviewCount:null},{reviewCount:0},{reviewCount:1.2},{sourceUrl:undefined},{checkedAt:''},{checkedAt:'not-a-date'},{checkedAt:'2026-02-30'},{source:''},{source:'Other'},{sourceUrl:'https://evil.example/maps'},{sourceUrl:'https://www.google.com.evil.example/maps'},{sourceUrl:'http://www.google.com/maps'},{sourceUrl:'https://www.google.com/search?q=Maps'}])assert.equal(placeCardFacts({...v,reviews:{...v.reviews,...patch}}).rating,null);
 assert.equal(placeCardFacts({...v,reviews:undefined}).rating,null);
});

test('unknown class ages never receive the verified-source footer',()=>{ for(const v of VENUES){const f=placeCardFacts(v);if(!f.classes.length&&!f.branchAge)assert.equal(f.notice,'unknown');}assert.deepEqual(placeCardFacts(byId('gymnademics-gading-serpong')).branchAge,{min:3,max:72});});

// Keep this preview in the existing map sheet's visual world.
test('renderer reuses map UI tokens and rows instead of the rejected split panels',async()=>{
 const{readFile}=await import('node:fs/promises');const s=await readFile('scripts/build-place-cards.mjs','utf8');
 for(const token of ['#f6f2ec','#221d18','#1a7a4a','#e7e0d4','#e3f2e8','#14532d','Plus Jakarta Sans','Map Explora','Under 5','Classes here by age','Branch reviews','Terverifikasi'])assert.ok(s.includes(token),token);
 assert.doesNotMatch(s,/CLASS PREVIEW|CUPLIKAN KELAS|DejaVu|#286249/);
 assert.ok(s.includes('slots+nameRows.length>3'));assert.ok(s.includes('f.classes.length-shown.length'));
});

test('branch statements use the same evidence rule as the sheet without becoming named classes',()=>{
 const v=byId('gymnademics-gading-serpong');assert.deepEqual(placeCardFacts(v).classes,[]);assert.deepEqual(placeCardFacts(v).branchAge,{min:3,max:72});
 for(const patch of [{sourceConflict:true},{verification:'unknown'},{providerAgeUrl:undefined},{minMonths:null}])assert.equal(placeCardFacts({...v,branchAge:{...v.branchAge,...patch}}).branchAge,null);
});
