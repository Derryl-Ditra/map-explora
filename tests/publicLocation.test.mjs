import test from 'node:test';
import assert from 'node:assert/strict';
import { importTs } from './loadTs.mjs';
const {VENUES}=await importTs('../src/data/venues.ts');
const {publicLocation,withoutMapCodes}=await importTs('../src/utils/publicLocation.ts');
const {buildShareText,conciseAddress}=await importTs('../src/utils/shareText.ts');
const {placePageInventory,placeSchema}=await importTs('../src/utils/placePages.ts');
const byId=id=>VENUES.find(v=>v.id===id);
const code=/\b[23456789CFGHJMPQRVWX]{4,8}\+[23456789CFGHJMPQRVWX]{2,3}\b/i;
test('all153 Share outputs and141 bilingual place addresses omit plus codes and unnamed roads',()=>{
 for(const v of VENUES){assert.doesNotMatch(buildShareText(v),code);assert.doesNotMatch(buildShareText(v),/Jl\.\s*Nn\b|\nGround Floor\n/i);}
 for(const v of placePageInventory(VENUES))for(const lang of ['id','en']){
  assert.doesNotMatch(publicLocation(v,lang).address,code);assert.doesNotMatch(placeSchema(v,lang).address,code);assert.doesNotMatch(publicLocation(v,lang).address,/Jl\.\s*Nn\b/i);
 }
});
test('Bintaro uses official current area, labels incomplete address and preserves old pin/raw record',()=>{
 const v=byId('sparks-sports-academy-bintaro-utown');const raw=JSON.stringify(v);const loc=publicLocation(v);
 assert.equal(loc.share,'Area: Sawah Baru, Ciputat');assert.equal(loc.areaOnly,true);assert.equal(loc.conflict,true);assert.equal(loc.checkedAt,'2026-11-13');assert.equal(loc.source,'https://academy.sparks-edu.com/tangerang/');assert.match(buildShareText(v),/\nArea: Sawah Baru, Ciputat\n/);assert.equal(JSON.stringify(v),raw);assert.match(v.address,/Sawah Lama/);assert.equal(v.lat,-6.293312);
});
test('Cibinong retains sourced street; Funtastic keeps venue not floor; Living World never invents a street',()=>{
 assert.equal(conciseAddress(publicLocation(byId('sparks-sports-academy-cibinong')).address),'Jl. Tegar Beriman');
 assert.equal(conciseAddress(publicLocation(byId('the-funtastic-gym-pondok-indah')).address),'Pondok Indah Mall 1');
 const loc=publicLocation(byId('rockstar-academy-living-world-alam-sutera'));assert.equal(loc.share,'Living World Alam Sutera');assert.equal(loc.areaOnly,true);assert.doesNotMatch(loc.address,/No\.42|Jl\./);
 assert.equal(withoutMapCodes('GR9H+956, Jl. Tegar Beriman (GR9H+956), Tengah'),'Jl. Tegar Beriman, Tengah');
 assert.equal(withoutMapCodes('Jl. Example No.10A, Blok B7 01'),'Jl. Example No.10A, Blok B7 01');
});
