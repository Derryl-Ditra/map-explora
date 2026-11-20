import test from 'node:test';
import assert from 'node:assert/strict';
import {importTs} from './loadTs.mjs';
const {VENUES}=await importTs('../src/data/venues.ts');
const {canRouteVenue}=await importTs('../src/utils/mapsLink.ts');
const {placeText}=await importTs('../src/utils/placeLanguage.ts');
test('English1 address discrepancies resolved 2026-11-20: pins match live Maps listings, losing units kept in notes',()=>{
 for(const id of ['english-1-puri-indah','english-1-cinere-depok']){
  const v=VENUES.find(v=>v.id===id);assert.equal(v.caution,undefined);assert.equal(canRouteVenue(v),true);
 }
 assert.match(VENUES.find(v=>v.id==='english-1-cinere-depok').notes,/No\.28-29/);
 assert.match(VENUES.find(v=>v.id==='english-1-puri-indah').notes,/No\.3 T-U/);
});
test('Deen fee products keep their official form selection, units and all three promo conditions',()=>{
 const v=VENUES.find(v=>v.id==='deen-haus-alkahf-bintaro');
 assert.equal(v.priceListings.length,3);assert.deepEqual(v.priceListings.map(p=>p.amountIdr),[150000,590000,1000000]);
 for(const p of v.priceListings){assert.equal(p.sourceKind,'official');assert.equal(p.sourceUrl,'https://deenhaus.com/baby-class/#reg-form');assert.match(p.note,/Toddler 6-36 months/);for(const k of ['label','unit','note','schedule'])if(p[k])assert.ok(placeText(p[k],'id'));}
 assert.match(v.priceListings[1].schedule,/valid for 2 months/);assert.match(v.priceListings[2].schedule,/valid for 3 months/);
});
