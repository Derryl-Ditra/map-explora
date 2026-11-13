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

test('Nov13 official prices preserve source kind, branch and exclusions',()=>{
 const expected={'anak-air-grand-cibubur':715000,'anak-air-kebagusan':715000,'anak-air-kemang':825000,'anak-air-limo':605000,'anak-air-pondok-indah':825000,'golden-baby-school-jakarta-garden-city':100000,'gymnademics-gading-serpong':1000000,'membumi-playspace-cibubur':734000};
 for(const [id,amount] of Object.entries(expected)){
  const ps=VENUES.find(v=>v.id===id).priceListings;
  assert.equal(ps[0].amountIdr,amount,id);
  for(const p of ps){assert.equal(p.sourceKind,'official',id);assert.equal(p.checkedAt,'2026-11-13');assert.ok(p.note);}
 }
 for(const v of VENUES.filter(v=>v.id.startsWith('anak-air'))){assert.equal(v.priceListings[1].amountIdr,275000);assert.match(v.priceListings[1].unit,/registration/);}
 const m=VENUES.find(v=>v.id==='membumi-playspace-cibubur');assert.match(m.priceListings[0].label,/estimated/);assert.match(m.priceListings[0].note,/185,000/);assert.match(m.priceListings[0].note,/Full T&C/);
 const g=VENUES.find(v=>v.id==='gymnademics-gading-serpong');assert.match(g.priceListings[0].note,/non-refundable/);
});
test('price card distinguishes official listings and legacy partners per row',()=>{
 const s=readFileSync(new URL('../src/components/ui/VenueDetails.tsx',import.meta.url),'utf8');
 assert.match(s,/pl.sourceKind === "official" \? "Official-listed" : "Partner-listed"/);
 assert.match(s,/pl.note/);assert.match(s,/pl.sourceKind !== "official"/);
});
test('conflict fixes do not invent an entrance or precise age eligibility',()=>{
 const f=VENUES.find(v=>v.id==='the-funtastic-gym-pondok-indah');assert.match(f.address,/Mall 1/);assert.ok(f.caution);assert.equal(f.lat,-6.2663218);assert.equal(f.lng,106.7850783);
 for(const p of f.programs)assert.match(p.age.providerAgeUrl,/mall-1/);
 const b=VENUES.find(v=>v.id==='bloom-space-kota-wisata');assert.equal(b.phone,'+62 813-3339-7070');
 for(const name of ['Seedlings','Growing Explorer']){const p=b.programs.find(p=>p.name===name);assert.equal(p.age.sourceConflict,true);assert.equal(p.age.verification,'listed-unconfirmed');assert.ok(p.noteUrl);}
});
