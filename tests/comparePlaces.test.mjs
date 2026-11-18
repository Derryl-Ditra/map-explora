import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {importTs} from './loadTs.mjs';
const {VENUES}=await importTs('../src/data/venues.ts');
const {comparisonInventory,comparisonSelection,comparisonPath,coverage}=await importTs('../src/utils/comparePlaces.ts');
const {placePageInventory}=await importTs('../src/utils/placePages.ts');
const visible=comparisonInventory(VENUES);

test('comparison inventory is exactly the public non-government inventory, without mutation',()=>{
 const before=JSON.stringify(VENUES);
 assert.deepEqual(visible.map(v=>v.id).sort(),placePageInventory(VENUES).map(v=>v.id).sort());
 assert.equal(visible.length,149);assert.equal(JSON.stringify(VENUES),before);
 const v=visible[0];
 for(const change of [{operatingStatus:{state:'maps-listed'}},{chain:'RPTRA'},{website:'https://example.go.id/'}])assert.equal(comparisonInventory([{...v,...change}]).length,0);
});

test('comparison URL parameters never reveal hidden, invalid or duplicate branches',()=>{
 const [a,b]=visible;const hidden=VENUES.find(v=>!visible.some(x=>x.id===v.id));
 assert.deepEqual(comparisonSelection(VENUES,a.id,b.id),[a.id,b.id]);
 assert.deepEqual(comparisonSelection(VENUES,a.id,a.id),[a.id,'']);
 assert.deepEqual(comparisonSelection(VENUES,hidden.id,'not-a-place'),['','']);
 assert.deepEqual(comparisonSelection(VENUES,null,null),['','']);
 for(const lang of ['en','id']){let path=comparisonPath(lang,a.id,b.id);assert.ok(path.startsWith(lang==='id'?'/id/compare/':'/compare/'));const q=new URL(path,'https://example.com').searchParams;assert.equal(q.get('a'),a.id);assert.equal(q.get('b'),b.id);}
 assert.equal(comparisonPath('id'),'/id/compare/');
});

test('coverage uses actual sourced price and rating records, not candidates',()=>{
 assert.deepEqual(coverage(VENUES),{visible:149,priced:19,reviewed:145});
 const noPrice=visible.find(v=>!v.priceListings);assert.ok(noPrice);
 assert.equal(coverage([noPrice]).priced,0);
});

test('fee UI preserves products, units, separate registration, sources, dates and uncertainty in both languages',async()=>{
 const {placeText}=await importTs('../src/utils/placeLanguage.ts');
 for(const v of visible)for(const p of v.priceListings||[])for(const key of ['unit','label','note','schedule'])if(p[key])assert.ok(placeText(p[key],'id'),`${v.id} ${key}`);
 const ui=readFileSync(new URL('../src/components/RecordedFees.tsx',import.meta.url),'utf8');
 for(const field of ['amountIdr','sourceKind','sourceUrl','checkedAt','p.label','p.unit','p.note','p.schedule'])assert.ok(ui.includes(field));
 assert.match(ui,/does not mean free/);assert.match(ui,/bukan berarti gratis/);
 assert.doesNotMatch(ui,/Math\.min|\.sort\(|\/\s*[48]\b/);
 const guide=readFileSync(new URL('../src/components/FeeGuide.tsx',import.meta.url),'utf8');assert.match(guide,/undated/);assert.match(guide,/tidak bertanggal/);assert.match(guide,/not fresh quotes/);
});

test('comparison has explicit uncertainty, review attribution and no winner ranking',()=>{
 const ui=readFileSync(new URL('../src/components/ComparePlaces.tsx',import.meta.url),'utf8');assert.match(ui,/No best-place or cheapest ranking/);assert.match(ui,/verifiedPrograms/);assert.match(ui,/publicProgramNote/);assert.match(ui,/publicCaution/);assert.match(ui,/useState<\[string,string\]>\(\['',''\]\)/);
 const reviews=readFileSync(new URL('../src/components/ReviewSnapshot.tsx',import.meta.url),'utf8');assert.match(reviews,/not verified findings/);assert.match(reviews,/whole venue/);assert.match(reviews,/Fewer than 10/);assert.match(reviews,/r\.checkedAt/);assert.match(reviews,/r\.sourceUrl/);
});

test('review presentation retains translated facility concerns and small-sample limits', () => {
 const source = readFileSync(new URL('../src/components/ReviewSnapshot.tsx', import.meta.url), 'utf8');
 assert.match(source, /privasi kamar mandi/);
 assert.match(source, /kebersihan perosotan, toilet dan kamar mandi/);
 assert.match(source, /komunikasi setelah pembelian/);
 assert.match(source, /Fewer than 10 ratings/);
 assert.match(source, /not a class-quality or safety score/);
});
