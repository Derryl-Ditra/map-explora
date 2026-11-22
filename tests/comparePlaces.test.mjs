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
 assert.equal(visible.length,152);assert.equal(JSON.stringify(VENUES),before);
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
 assert.deepEqual(coverage(VENUES),{visible:152,priced:20,reviewed:146});
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
 const reviews=readFileSync(new URL('../src/components/ReviewSnapshot.tsx',import.meta.url),'utf8');// Owner ask 2026-11-22: cards carry data only, no disclaimer paragraphs.
 assert.match(reviews,/r\.sourceUrl/);assert.match(reviews,/complaintThemes/);assert.doesNotMatch(reviews,/r\.checkedAt/); // read dates live in the Sources and dates section nowassert.doesNotMatch(reviews,/not verified findings/);assert.doesNotMatch(reviews,/whole venue/);assert.doesNotMatch(reviews,/Fewer than 10/);
});

// 2026-11-22 owner ask: the sample paragraphs, their translations and the
// disclaimer lines were cut from ReviewSnapshot; concerns themes (with
// translations) remain and are covered above.

test('lone second selection is promoted and duplicate options cannot form a pair',()=>{
 const a=visible[0].id;
 assert.deepEqual(comparisonSelection(VENUES,'invalid',a),[a,'']);
 assert.deepEqual(comparisonSelection(VENUES,null,a),[a,'']);
});

test('v3 entry remains place-first, in-app and non-destructive',()=>{
 const detail=readFileSync(new URL('../src/components/ui/VenueDetails.tsx',import.meta.url),'utf8');
 const drawer=readFileSync(new URL('../src/components/ui/MobileDrawer.tsx',import.meta.url),'utf8');
 const hud=readFileSync(new URL('../src/components/MapHUD.tsx',import.meta.url),'utf8');
 const ui=readFileSync(new URL('../src/components/ComparePlaces.tsx',import.meta.url),'utf8');
 assert.equal((detail.match(/map-explora-compare/g)||[]).length,1);
 assert.doesNotMatch(drawer,/href="\/compare\//);
 for(const s of ['inert={comparisonOpen}','comparisonOrigin','history.back()','recordCompareOpen'])assert.ok(hud.includes(s));
 for(const s of ['Cancel replacement','Remove first place','Remove right place','Remove this place','previousScroll','v.id!==retained?.id','aria-expanded','Keeping','setExpanded({})','const [expanded,setExpanded]=useState<Record<string,boolean>>({})'])assert.ok(ui.includes(s),s);
 assert.doesNotMatch(ui,/<select/);
});

test('counter remains disabled rather than leak query or location into the existing SDK',async()=>{
 const {COMPARE_COUNTER_ENABLED,COMPARE_OPEN_EVENT,recordCompareOpen}=await importTs('../src/utils/compareCounter.ts');
 assert.equal(COMPARE_COUNTER_ENABLED,false);
 assert.deepEqual(COMPARE_OPEN_EVENT,{event:'compare-open',count:1});
 assert.equal(recordCompareOpen().enabled,false);
 const code=readFileSync(new URL('../src/utils/compareCounter.ts',import.meta.url),'utf8');
 assert.doesNotMatch(code,/fetch\(|sendBeacon\(|localStorage\.|goatcounter\.count|XMLHttpRequest/);
});
