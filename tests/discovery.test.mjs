import test from 'node:test';
import assert from 'node:assert/strict';
import { importTs } from './loadTs.mjs';
let api={};try{api=await importTs('../src/utils/discovery.ts')}catch{}
const {VENUES}=await importTs('../src/data/venues.ts');
test('public inventory excludes hidden records and never invents branch eligibility',()=>{
 assert.equal(typeof api.publicInventory,'function');
 const list=api.publicInventory(VENUES);assert.equal(list.length,VENUES.filter(v=>v.operatingStatus?.state==='official-listed').length);
 assert.ok(list.every(v=>v.operatingStatus.state==='official-listed'));
 for(const v of list) assert.deepEqual(v.programs,VENUES.find(source=>source.id===v.id).programs);
});
test('answer groups are substantial, distinct and made only from public inventory',()=>{
 assert.equal(typeof api.buildAnswerGroups,'function');
 const groups=api.buildAnswerGroups(VENUES);assert.ok(groups.length>=20&&groups.length<=40);
 assert.equal(new Set(groups.map(g=>g.slug)).size,groups.length);
 const sets=groups.map(g=>g.venues.map(v=>v.id).sort().join('|'));assert.equal(new Set(sets).size,sets.length);
 for(const g of groups){assert.ok(g.venues.length>=4);assert.ok(g.venues.every(v=>v.operatingStatus.state==='official-listed'));assert.match(g.slug,/^[a-z0-9-]+$/);}
});
test('schema describes the visible list without fake offers or ratings',()=>{
 assert.equal(typeof api.itemListSchema,'function');
 const g=api.buildAnswerGroups(VENUES)[0];const s=api.itemListSchema(g);
 assert.equal(s['@type'],'ItemList');assert.equal(s.numberOfItems,g.venues.length);
 assert.equal(s.itemListElement.length,g.venues.length);
 assert.equal(s.itemListElement[0].item.name,api.venueName(g.venues[0]));
 assert.ok(!JSON.stringify(s).includes('AggregateRating'));assert.ok(!JSON.stringify(s).includes('Offer'));
});
test('map has a homepage ItemList and guide age labels are human readable',async()=>{
 const {readFileSync}=await import('node:fs');
 const home=readFileSync(new URL('../src/app/page.tsx',import.meta.url),'utf8');assert.match(home,/itemListSchema/);assert.match(home,/application\/ld\+json/);
 const page=readFileSync(new URL('../src/app/activities/[slug]/page.tsx',import.meta.url),'utf8');assert.ok(!page.includes('{age.verification}.'));assert.ok(page.includes('age not confirmed'));
});
