import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {transformSync} from 'esbuild';
const file=readFileSync('src/data/venues-batch3.ts','utf8');
const code=transformSync(file,{loader:'ts',format:'cjs'}).code;
const compiled={exports:{}};new Function('module','exports',code)(compiled,compiled.exports);
const v=compiled.exports.BATCH3_VENUES.find(v=>v.id==='deen-haus-alkahf-bintaro');
test('Deen Haus is one bound official site with four exact provider age bands',()=>{
 assert.ok(v);assert.equal(v.chain,null);assert.equal(v.operatingStatus.state,'official-listed');
 assert.deepEqual(v.programs.map(p=>[p.age.minMonths,p.age.maxMonths]),[[6,12],[12,18],[18,24],[24,36]]);
 for(const p of v.programs){assert.equal(p.age.level,'branch');assert.equal(p.age.verification,'provider-confirmed');assert.equal(p.age.sourceCheckedAt,'2026-11-19');}
});
test('Deen Haus retains location caution, sparse reviews and no guessed fee',()=>{
 assert.match(v.caution,/Tangerang Selatan/);assert.match(v.caution,/Jakarta Selatan/);
 assert.equal(v.priceListings,undefined);assert.equal(v.reviews.reviewCount,1);
 assert.equal(v.reviews.complaintThemes.length,0);assert.match(v.reviews.sampleNote,/Only one/);
 const translations=readFileSync('src/utils/placeLanguage.ts','utf8');assert.ok(translations.includes(v.caution));
});
