import test from 'node:test';
import assert from 'node:assert/strict';
import { importTs } from './loadTs.mjs';
const { buildMapsLink } = await importTs('../src/utils/mapsLink.ts');
const place = {chain:'A & B',branchName:'BSD',address:'Street 1',area:'Tangerang',lat:-6.2,lng:106.8,coordinateSource:'maps-pin'};
test('directions use verified destination and leave current origin to Google Maps',()=>{
 assert.equal(typeof buildMapsLink,'function');
 const u=new URL(buildMapsLink(place));
 assert.equal(u.pathname,'/maps/dir/');assert.equal(u.searchParams.get('api'),'1');
 assert.equal(u.searchParams.get('destination'),'-6.2,106.8');
 for(const p of ['origin','avoid','dir_action','travelmode']) assert.equal(u.searchParams.has(p),false);
});
test('uncertain pins open a named search, never coordinate directions',()=>{
 assert.equal(typeof buildMapsLink,'function');
 for(const v of [{...place,coordinateSource:'area-approximate'},{...place,caution:'identity conflict'}]){
 const u=new URL(buildMapsLink(v));assert.equal(u.pathname,'/maps/search/');assert.ok(u.searchParams.get('query').includes('A & B'));assert.equal(u.searchParams.has('destination'),false);
 }
});
