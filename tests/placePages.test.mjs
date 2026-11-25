import test from 'node:test';
import assert from 'node:assert/strict';
import { importTs } from './loadTs.mjs';
const {VENUES}=await importTs('../src/data/venues.ts');
const {placePageInventory,governmentRelated,placeMetadata,placeSchema,placePath,placeMapUrl}=await importTs('../src/utils/placePages.ts');
const places=placePageInventory(VENUES);
test('place pages cover 167 public non-government records, not hidden records',()=>{
 assert.equal(places.length,167);assert.equal(new Set(places.map(v=>v.id)).size,167);
 for(const v of places){assert.match(v.id,/^[a-z0-9-]+$/);assert.equal(governmentRelated(v),false);}
 const v=places[0];for(const field of [{chain:'RPTRA'},{branchName:'Taman Pemerintah'},{website:'https://example.go.id/park'}])assert.equal(placePageInventory([{...v,...field}]).length,0);
 assert.equal(placePageInventory([{...v,operatingStatus:{state:'maps-listed',checkedAt:'2026-11-13'}}]).length,0);
});
test('metadata is unique, bilingual and branch-specific for every page',()=>{
 for(const lang of ['en','id']){
  const titles=new Set(),descriptions=new Set(),images=new Set();
  for(const v of places){const m=placeMetadata(v,lang);titles.add(m.title);descriptions.add(m.description);images.add(m.openGraph.images[0].url);assert.equal(m.alternates.canonical,m.openGraph.url);assert.ok(m.alternates.languages.en.endsWith(placePath(v,'en')));assert.ok(m.alternates.languages.id.endsWith(placePath(v,'id')));assert.match(placeMapUrl(v),/\?v=[a-z0-9]+$/);}
  assert.equal(titles.size,167);assert.equal(descriptions.size,167);assert.equal(images.size,167);
 }
});
test('Place schema never infers coordinates, rating, offers or opening hours',()=>{
 for(const v of places){for(const lang of ['en','id']){const s=placeSchema(v,lang);assert.deepEqual(Object.keys(s).sort(),['@context','@type','address','name','url']);assert.equal(s['@type'],'Place');assert.equal(typeof s.address,'string');assert.ok(s.address.length>0);assert.doesNotMatch(s.address,/official location page/i);}}
});

test('Bahasa page copy uses reviewed price translations and deduplicates region',async()=>{
 const {placeText,placeRegion}=await importTs('../src/utils/placeLanguage.ts');
 // 2026-11-22 QC price-note cut: notes translate per "; "-separated row.
 for(const v of places)for(const p of v.priceListings || []){
  for(const key of ['unit','label','note','schedule'])if(p[key])for(const row of key==='note'?p[key].split('; '):[p[key]])assert.ok(placeText(row,'id'),`${v.id}: ${key} needs a reviewed translation: ${row}`);
 }
 assert.equal(placeText('Unreviewed English evidence','id'),'');
 assert.equal(placeText('Source text','en'),'Source text');
 assert.equal(placeRegion('Jakarta Timur','Jakarta Timur'),'Jakarta Timur');
});

test('public source notes omit internal matching and boundary annotations in both languages',async()=>{
 const {publicProgramNote,publicCaution}=await importTs('../src/utils/placeLanguage.ts');
 for(const lang of ['en','id'])for(const v of places){
  for(const p of v.programs)assert.doesNotMatch(publicProgramNote(p.note,lang),/exact[- ]age[- ]match|upper[- ]bound inclusivity|sourceConflict/i);
  if(v.caution)assert.doesNotMatch(publicCaution(v.caution,lang),/not re-fetched|in-app routing/i);
 }
});
