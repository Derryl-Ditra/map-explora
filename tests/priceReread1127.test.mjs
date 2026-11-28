import test from 'node:test';
import assert from 'node:assert/strict';
import {importTs} from './loadTs.mjs';
const {VENUES}=await importTs('../src/data/venues.ts');
test('2026-11-27 price re-read: only confirmed listings re-dated, amounts unchanged', ()=>{
  const get=id=>VENUES.find(v=>v.id===id).priceListings;
  const pin={'anak-air-grand-cibubur':715000,'anak-air-kemang':825000,'anak-air-limo':605000,'anak-air-pondok-indah':825000,'anak-air-kebagusan':715000};
  for(const [id,a] of Object.entries(pin)){ const l=get(id).find(p=>p.sourceUrl.includes('Harga-')); assert.equal(l.amountIdr,a); assert.equal(l.checkedAt,'2026-11-27'); const reg=get(id).find(p=>p.amountIdr===275000); assert.equal(reg.checkedAt,'2026-11-28'); }
  assert.deepEqual(get('deen-haus-alkahf-bintaro').map(p=>[p.amountIdr,p.checkedAt]),[[150000,'2026-11-27'],[590000,'2026-11-27'],[1000000,'2026-11-27']]);
  assert.equal(get('golden-baby-school-jakarta-garden-city')[0].amountIdr,100000);
  assert.equal(get('gymnademics-gading-serpong')[0].checkedAt,'2026-11-27');
  assert.equal(get('membumi-playspace-cibubur')[0].checkedAt,'2026-11-13'); // page now shows a December timetable; not re-confirmed
});
