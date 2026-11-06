import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
const read=p=>readFileSync(new URL('../src/components/'+p,import.meta.url),'utf8');
test('desktop location stays a circular icon with an accessible label and existing action',()=>{
 const h=read('MapHUD.tsx');assert.match(h,/onClick=\{handleLocate\}/);assert.match(h,/aria-label=\{isDesktop \? "Use my location" : "Locate My Position"\} title="Use my location"/);assert.doesNotMatch(h,/md:w-auto md:px-4|hidden md:inline font-semibold/);assert.match(h,/className="w-12 h-12 rounded-full/);
});
test('desktop sidebar collapse is independent from mobile map and detail history',()=>{
 const h=read('MapHUD.tsx'),d=read('ui/MobileDrawer.tsx');assert.match(h,/useState\(false\)/);assert.match(h,/Show sidebar/);assert.match(h,/setDesktopCollapsed\(false\);\s*handleSelectVenue/);assert.match(h,/isDesktop && desktopCollapsed/);assert.match(h,/setAgeOpenTick/);assert.match(d,/desktopCollapsed \? "md:hidden" : "md:flex"/);assert.match(d,/id="places-sidebar"/);assert.match(d,/Hide sidebar/);
});
test('native share is capability gated, copy always remains available',()=>{
 const s=read('ui/ShareCard.tsx');assert.match(s,/typeof navigator.share === "function"/);assert.match(s,/nativeShareAvailable && <button/);assert.match(s,/onClick=\{copy\}/);assert.doesNotMatch(s,/Share using phone/);
});
test('Age opening from collapsed details replaces the detail entry with list without an async back race',()=>{
 const h=read('MapHUD.tsx');assert.doesNotMatch(h,/if \(isDesktop\) \{ handleClearActiveVenue/);
 const nav=readFileSync(new URL('../src/hooks/useAppNavigation.ts',import.meta.url),'utf8');assert.match(nav,/current.current.mode !== "list" \|\| current.current.venueId/);assert.match(nav,/write\(\{ mode, venueId: null, share: false \}, Boolean\(current.current.venueId\)\)/);
});
