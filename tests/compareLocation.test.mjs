import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {importTs} from './loadTs.mjs';
const {VENUES}=await importTs('../src/data/venues.ts');
const {comparisonInventory,comparisonFromParams,compactComparisonPath,nearbyComparisonVenues,freshCompareFix}=await importTs('../src/utils/comparePlaces.ts');
const venues=comparisonInventory(VENUES);const ids=venues.slice(0,2).map(v=>v.id);
test('compact comparison round trips every public venue, both languages, preserving order',()=>{
 for(const v of venues)for(const lang of ['en','id']){const path=compactComparisonPath(lang,[v.id,ids.find(id=>id!==v.id)]);const q=new URL(path,'https://example.test').searchParams;assert.deepEqual(comparisonFromParams(VENUES,q),[v.id,ids.find(id=>id!==v.id)]);assert.equal(q.get('shareLang'),lang==='id'?'id':null);assert.deepEqual([...q.keys()].sort(),lang==='id'?['c','shareLang']:['c']);}
});
test('legacy comparison links and lone second selection still work',()=>{
 assert.deepEqual(comparisonFromParams(VENUES,new URLSearchParams({a:ids[0],b:ids[1],v:'junk',compare:'1'})),ids);
 assert.deepEqual(comparisonFromParams(VENUES,new URLSearchParams({b:ids[1]})),[ids[1],'']);
});
test('malformed compact links cannot silently choose another pair',()=>{
 for(const c of ['', 'x.y.z','bad-code','notaplace','..'])assert.deepEqual(comparisonFromParams(VENUES,new URLSearchParams({c})),['','']);
 const code=new URL(compactComparisonPath('en',[ids[0],'']),'https://test').searchParams.get('c');
 for(const c of [code+'.'+code,code+'.unknown'])assert.deepEqual(comparisonFromParams(VENUES,new URLSearchParams({c})),['','']);
});
test('freshness gate rejects stale, future, invalid and default coordinates',()=>{
 const now=Date.now();const fix={lat:-6.2,lng:106.8,at:now,accuracy:100};
 assert.deepEqual(freshCompareFix(fix,now),fix);assert.equal(freshCompareFix(null,now),null);
 for(const change of [{at:now-900000},{at:now+1},{lat:91},{lng:Infinity},{lat:NaN}])assert.equal(freshCompareFix({...fix,...change},now),null);
});
test('nearest order uses actual unrounded distance, does not mutate or rank by reviews',()=>{
 const before=JSON.stringify(venues);const sorted=nearbyComparisonVenues(venues,{lat:-6.293,lng:106.787,at:Date.now(),accuracy:20});
 for(let i=1;i<sorted.length;i++)assert.ok((sorted[i-1].distance??Infinity)<=(sorted[i].distance??Infinity));
 assert.equal(JSON.stringify(venues),before);
 const unknown=sorted.filter(v=>v.caution||v.coordinateSource==='area-approximate');assert.ok(unknown.every(v=>v.distance===undefined));
 assert.ok(nearbyComparisonVenues(venues,null).every(v=>v.distance===undefined));
});
test('compare location and copy are memory-only, user-triggered and no network collection',()=>{
 const ui=readFileSync(new URL('../src/components/ComparePlaces.tsx',import.meta.url),'utf8');
 assert.doesNotMatch(ui,/localStorage|sessionStorage|sendBeacon|fetch\(|XMLHttpRequest|watchPosition|\.permissions\.query/);
 for(const value of ['onClick={requestLocation}','maximumAge:0','freshCompareFix','navigator.clipboard.writeText','Location is off or unavailable','initialFix','Find nearby alternatives'])assert.ok(ui.includes(value));
 const helper=readFileSync(new URL('../src/utils/comparePlaces.ts',import.meta.url),'utf8');assert.doesNotMatch(helper,/localStorage|sessionStorage|fetch\(|sendBeacon/);
});

test('empty selection reopens the picker without an invalid compact link',()=>{
 const q=new URL(compactComparisonPath('en',['','']),'https://example.test').searchParams;assert.equal(q.get('compare'),'1');assert.equal(q.has('c'),false);assert.deepEqual(comparisonFromParams(VENUES,q),['','']);
});
