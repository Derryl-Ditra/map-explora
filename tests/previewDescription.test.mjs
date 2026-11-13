import test from 'node:test';
import assert from 'node:assert/strict';
import{readFile}from'node:fs/promises';
import{importTs}from'./loadTs.mjs';
const{VENUES}=await importTs('../src/data/venues.ts');
const{placePageInventory,placeMetadata}=await importTs('../src/utils/placePages.ts');
test('all place preview descriptions fit80chars and match across metadata',()=>{
 for(const v of placePageInventory(VENUES))for(const lang of ['en','id']){const m=placeMetadata(v,lang);assert.ok(m.description.length<=80,v.id);assert.ok(m.description.endsWith('.'));assert.equal(m.openGraph.description,m.twitter.description);assert.equal(m.openGraph.locale,'en_US');assert.match(m.openGraph.description,/location/);}
});
test('home meta OG and Twitter descriptions fit80chars and keep confirmation caution',async()=>{
 const s=await readFile('src/components/RootDocument.tsx','utf8');const d=[...s.matchAll(/description: "([^"]+)"/g)].map(m=>m[1]);assert.equal(d.length,3);assert.equal(new Set(d).size,1);for(const v of d){assert.ok(v.length<=80);}
});
