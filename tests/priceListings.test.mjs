import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {importTs} from './loadTs.mjs';
const {VENUES}=await importTs('../src/data/venues.ts');
test('every price listing carries source, exact URL and check date',()=>{
 const withPrice=VENUES.filter(v=>v.priceListings?.length);
 assert.ok(withPrice.length>=2);
 for(const v of withPrice)for(const p of v.priceListings){
  assert.ok(Number.isInteger(p.amountIdr)&&p.amountIdr>0,v.id);
  assert.ok(p.source&&/^https:\/\//.test(p.sourceUrl),v.id);
  assert.match(p.checkedAt,/^\d{4}-\d{2}-\d{2}$/,v.id);
  assert.ok(p.unit&&p.label,v.id);
 }
});
test('price card shows partner-listed label, source link and read date',()=>{
 const s=readFileSync(new URL('../src/components/ui/VenueDetails.tsx',import.meta.url),'utf8');
 assert.match(s,/Partner-listed/);assert.match(s,/pl\.sourceUrl/);assert.match(s,/formatCheckedDate\(pl\.checkedAt\)/);assert.match(s,/not confirmed by the provider/);
});
