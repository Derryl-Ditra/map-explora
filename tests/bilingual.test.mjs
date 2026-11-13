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
test('localized metadata carries page descriptions, social tags and language URLs',async()=>{
 const {guideMetadata,localizeTerm}=await importTs('../src/utils/bilingual.ts');
 const m=guideMetadata('id','/for/18-month-old/','Kelas 18 bulan','Cabang dengan usia resmi.');
 assert.equal(m.description,'Cabang dengan usia resmi.');assert.equal(m.openGraph.description,m.description);assert.equal(m.twitter.description,m.description);assert.equal(m.openGraph.locale,'id_ID');
 assert.equal(localizeTerm('19 Oct 2026 until 17 Jan 2027','id'),'19 Okt 2026 sampai 17 Jan 2027');
});
test('provider and Website links with the same destination appear once',async()=>{
 const {venueLinks}=await importTs('../src/utils/bilingual.ts');
 const v={sourceUrl:'https://example.org',website:'https://example.org',instagram:'https://instagram.com/example'};
 assert.deepEqual(venueLinks(v).map(x=>x.url),['https://example.org','https://instagram.com/example']);
 assert.equal(venueLinks({...v,website:'https://example.org/classes'}).length,3);
});

test('discovery text preserves mixed listing provenance and limited price coverage',async()=>{
 const {VENUES}=await importTs('../src/data/venues.ts');
 const {publicInventory}=await importTs('../src/utils/discovery.ts');
 const count=publicInventory(VENUES).length;
 for(const lang of ['en','id']){
  const text=buildLlms(lang,count);
  assert.ok(text.includes(String(count)));
  assert.match(text,lang==='en'?/official sources or partner listings/:/sumber resmi atau listing mitra/);
  assert.match(text,lang==='en'?/prices with sources and check dates/:/harga tercatat/);
  assert.doesNotMatch(text,/places appear in official provider sources|Jadwal, harga, ketersediaan/);
 }
});
