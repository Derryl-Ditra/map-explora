import test from 'node:test';
import assert from 'node:assert/strict';
import {importTs} from './loadTs.mjs';
const {localizeGroup,jobPages,buildLlms,languageLinks}=await importTs('../src/utils/bilingual.ts');
test('Indonesian guide titles describe the same city and activity',()=>{
 assert.equal(localizeGroup({title:'Swimming classes for under 5s in Bekasi',area:'Bekasi',activity:'Swim'},'id'),'Kelas renang anak di bawah 5 tahun di Bekasi');
});
test('job pages include exact age plus honest cost and weather guidance in both languages',()=>{
 const en=jobPages('en'),id=jobPages('id');assert.equal(en.length,3);assert.equal(id.length,3);assert.equal(id.find(j=>j.kind==='age').months,18);assert.equal(id.find(j=>j.kind==='price').title,'Berapa biaya kelas anak di Jakarta?');
});
test('llms output gives actual counts, no booking promise, bilingual guide and data links',()=>{
 const text=buildLlms('id',138);assert.ok(text.includes('138'));assert.ok(text.includes('/id/activities/'));assert.ok(text.includes('/venues.json'));assert.ok(text.includes('bukan layanan pemesanan'));assert.ok(!text.includes('termurah'));
});
test('language alternatives preserve route and locale',()=>{
 assert.deepEqual(languageLinks('/for/18-month-old/'),{en:'https://derryl-ditra.github.io/map-explora/for/18-month-old/',id:'https://derryl-ditra.github.io/map-explora/id/for/18-month-old/','x-default':'https://derryl-ditra.github.io/map-explora/for/18-month-old/'});
});
test('translated activity names never leak undefined and every group has a peer',async()=>{
 const {VENUES}=await importTs('../src/data/venues.ts');const {buildAnswerGroups}=await importTs('../src/utils/discovery.ts');
 for(const g of buildAnswerGroups(VENUES)){assert.ok(!localizeGroup(g,'id').includes('undefined'));assert.notEqual(localizeGroup(g,'id'),g.title);}
});
