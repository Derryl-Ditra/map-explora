import test from 'node:test';
import assert from 'node:assert/strict';
import { importTs } from './loadTs.mjs';
const {VENUES}=await importTs('../src/data/venues.ts');
const {placePageInventory,governmentRelated,placeMetadata,placeSchema,placePath,placeMapUrl}=await importTs('../src/utils/placePages.ts');
const places=placePageInventory(VENUES);
test('place pages cover141 public non-government records, not hidden records',()=>{
 assert.equal(places.length,141);assert.equal(new Set(places.map(v=>v.id)).size,141);
 for(const v of places){assert.match(v.id,/^[a-z0-9-]+$/);assert.equal(governmentRelated(v),false);}
 const v=places[0];for(const field of [{chain:'RPTRA'},{branchName:'Taman Pemerintah'},{website:'https://example.go.id/park'}])assert.equal(placePageInventory([{...v,...field}]).length,0);
 assert.equal(placePageInventory([{...v,operatingStatus:{state:'maps-listed',checkedAt:'2026-11-13'}}]).length,0);
});
test('metadata is unique, bilingual and branch-specific for every page',()=>{
 for(const lang of ['en','id']){
  const titles=new Set(),descriptions=new Set(),images=new Set();
  for(const v of places){const m=placeMetadata(v,lang);titles.add(m.title);descriptions.add(m.description);images.add(m.openGraph.images[0].url);assert.equal(m.alternates.canonical,m.openGraph.url);assert.ok(m.alternates.languages.en.endsWith(placePath(v,'en')));assert.ok(m.alternates.languages.id.endsWith(placePath(v,'id')));assert.match(placeMapUrl(v),/\?v=[a-z0-9]+$/);}
  assert.equal(titles.size,141);assert.equal(descriptions.size,141);assert.equal(images.size,141);
 }
});
test('Place schema never infers coordinates, rating, offers or opening hours',()=>{
 for(const v of places){for(const lang of ['en','id']){const s=placeSchema(v,lang);assert.deepEqual(Object.keys(s).sort(),['@context','@type','address','name','url']);assert.equal(s['@type'],'Place');assert.equal(s.address,v.address);}}
});
