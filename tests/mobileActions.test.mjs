import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
const read=p=>readFileSync(new URL('../src/components/'+p,import.meta.url),'utf8');
test('mobile has Map and List modes, no pin preview or split sheet',()=>{
 const hud=read('MapHUD.tsx'),drawer=read('ui/MobileDrawer.tsx');
 assert.doesNotMatch(hud,/SelectionCard|detailOpen/);assert.match(hud,/const showDetails = !!activeVenue/);
 assert.doesNotMatch(drawer,/snapTo|dragH|Place list size/);assert.match(drawer,/mobileView === "map" && !showDetails/);
});
test('detail Map action closes to map, Directions stays outside scroll',()=>{
 const s=read('ui/MobileDrawer.tsx');assert.match(s,/aria-label="Place actions"/);assert.match(s,/onClick=\{onDismissToMap\}/);assert.match(s,/aria-label="Back to map"/);assert.match(s,/safe-area-inset-bottom/);assert.match(s,/buildMapsLink\(activeVenue\)/);
 assert.ok(s.indexOf('aria-label="Place actions"')>s.indexOf('{/* Coverage honesty'));
 assert.doesNotMatch(read('ui/VenueDetails.tsx'),/onClick=\{onBack\}|buildMapsLink/);
 assert.doesNotMatch(s,/aria-label="Place actions" className="md:hidden/);
});
test('list scroll is captured before selection and restored after details',()=>{
 const s=read('ui/MobileDrawer.tsx');assert.match(s,/listScrollRef.current = detailsScrollRef.current\?\.scrollTop/);assert.match(s,/scrollTo\(\{ top: listScrollRef.current \}\)/);assert.match(s,/scrollTo\(\{ top: 0 \}\)/);
});
test('Share stays in the fixed action row, not in venue content',()=>{const d=read('ui/MobileDrawer.tsx');assert.ok(d.indexOf('onClick={onOpenShare}')>d.indexOf('aria-label="Place actions"'));assert.doesNotMatch(read('ui/VenueDetails.tsx'),/onOpenShare|Share2/);});

test('list count uses singular for exactly one match',()=>{
 assert.match(read('MapHUD.tsx'), /=== 1 \? "place" : "places"/);
});
test('unknown location leaves distance and eta unknown',()=>{
 const hook=readFileSync(new URL('../src/hooks/useVenueFilters.ts',import.meta.url),'utf8');
 assert.match(hook, /: undefined;/);
 assert.match(hook, /const eta = distance !== undefined \? calculateETA/);
 assert.match(hook, /distance: distance !== undefined \? Number\(distance.toFixed\(1\)\) : undefined/);
});

 test('browse Map action stays solid green outside scroll and preserves detail actions',()=>{const s=read('ui/MobileDrawer.tsx');assert.match(s,/aria-label="Browse views"/);assert.match(s,/w-full min-h-12 rounded-full bg-\[#1a7a4a\] text-white font-bold/);assert.ok(s.indexOf('aria-label="Browse views"')>s.indexOf('{/* Coverage honesty'));});
 test('map age entry, capped cluster zoom and saved view restoration stay wired',()=>{assert.match(read('MapHUD.tsx'),/Set your child's age/);const s=read('map/VectorMap.tsx');assert.match(s,/maxZoom: 15/);assert.match(s,/center: saved.center, zoom: saved.zoom/);});
