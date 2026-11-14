import test from 'node:test';
import assert from 'node:assert/strict';
import {importTs} from './loadTs.mjs';
const {shareLanguage,buildShareText}=await importTs('../src/utils/shareText.ts');
const {placeMapUrl}=await importTs('../src/utils/placePages.ts');
const {VENUES}=await importTs('../src/data/venues.ts');
const buumi=VENUES.find(v=>v.id==='buumi-playscape-pacific-place');
test('place-page language survives its map URL and overrides map document language',()=>{
 for(const lang of ['id','en']) {
  const u=new URL(placeMapUrl(buumi,lang));
  assert.equal(u.searchParams.get('shareLang'),lang);
  assert.equal(shareLanguage(u.searchParams,lang==='id'?'en':'id'),lang);
  assert.match(buildShareText(buumi,lang),lang==='id'?/Usia 6-18 bulan, tergantung kelas/:/Ages 6-18 months, by class/);
 }
});
test('direct map and invalid origin use current document language',()=>{
 assert.equal(shareLanguage(new URLSearchParams(),'en'),'en');
 assert.equal(shareLanguage(new URLSearchParams(),'id'),'id');
 assert.equal(shareLanguage(new URLSearchParams('shareLang=invalid'),'en'),'en');
});
