import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
const read=p=>readFileSync(new URL('../src/components/'+p,import.meta.url),'utf8');
test('mobile has Map and List modes, no pin preview or split sheet',()=>{
 const hud=read('MapHUD.tsx'),drawer=read('ui/MobileDrawer.tsx');
 assert.doesNotMatch(hud,/SelectionCard|detailOpen/);assert.match(hud,/const showDetails = !!activeVenue/);
 assert.doesNotMatch(drawer,/snapTo|dragH|Place list size/);assert.match(drawer,/mobileView === "map" && !showDetails/);
});
test('one mobile Back returns to origin, Directions stays outside scroll',()=>{
 const s=read('ui/MobileDrawer.tsx');assert.match(s,/aria-label="Place actions"/);assert.match(s,/onClick=\{onClearActiveVenue\}/);assert.match(s,/\{backLabel\}/);assert.match(s,/safe-area-inset-bottom/);assert.match(s,/buildMapsLink\(activeVenue\)/);
 assert.ok(s.indexOf('aria-label="Place actions"')>s.indexOf('{/* Coverage honesty'));
 assert.match(read('ui/VenueDetails.tsx'),/hidden md:flex items-center/);
});
test('list scroll is captured before selection and restored after details',()=>{
 const s=read('ui/MobileDrawer.tsx');assert.match(s,/listScrollRef.current = detailsScrollRef.current\?\.scrollTop/);assert.match(s,/scrollTo\(\{ top: listScrollRef.current \}\)/);assert.match(s,/scrollTo\(\{ top: 0 \}\)/);
});
test('Share is a visible bordered 48px button',()=>assert.match(read('ui/VenueDetails.tsx'),/min-h-12 rounded-xl border-2 border/));

test('list count uses singular for exactly one match',()=>{
 assert.match(read('MapHUD.tsx'), /=== 1 \? "place" : "places"/);
});
test('unknown location leaves distance and eta unknown',()=>{
 const hook=readFileSync(new URL('../src/hooks/useVenueFilters.ts',import.meta.url),'utf8');
 assert.match(hook, /: undefined;/);
 assert.match(hook, /const eta = distance !== undefined \? calculateETA/);
 assert.match(hook, /distance: distance !== undefined \? Number\(distance.toFixed\(1\)\) : undefined/);
});
