// 2026-11-26 data QC: locality labels match the administrative unit in the address.
// Convention: city is the official regency/city name (Kabupaten Bogor, Kota Bogor,
// Kota Tangerang, Tangerang Selatan, Kabupaten Tangerang); area may be a short label.
import test from 'node:test';
import assert from 'node:assert/strict';
import { importTs } from './loadTs.mjs';
const { VENUES } = await importTs('../src/data/venues.ts');

test('address regency/city matches the city label', () => {
  for (const v of VENUES) {
    const a = v.address || '';
    if (/Kabupaten Bogor|Bogor Regency/.test(a)) assert.equal(v.city, 'Kabupaten Bogor', v.id);
    if (/Kota Bogor/.test(a)) assert.equal(v.city, 'Bogor', `${v.id} (Kota Bogor convention: short label "Bogor")`);
    if (/Kota Tangerang,/.test(a)) assert.equal(v.city, 'Kota Tangerang', v.id);
    if (/Kota Tangerang Selatan/.test(a)) assert.equal(v.city, 'Tangerang Selatan', v.id);
    if (/Pagedangan|Kabupaten Tangerang|Tangerang Regency/.test(a)) assert.equal(v.city, 'Kabupaten Tangerang', v.id);
    if (/Kabupaten Bekasi|Bekasi Regency/.test(a)) assert.equal(v.city, 'Kabupaten Bekasi', v.id);
  }
});

test('no verbose or bare Tangerang labels remain', () => {
  assert.equal(VENUES.filter((v) => v.city === 'Kota Tangerang Selatan').length, 0);
  assert.equal(VENUES.filter((v) => v.city === 'Tangerang').length, 0);
});
