import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {importTs} from './loadTs.mjs';
const read=p=>readFileSync(new URL('../src/'+p,import.meta.url),'utf8');
const {buildVenueUrl}=await importTs('../src/utils/shareText.ts');
test('place URLs preserve the live base and safely encode the venue id',()=>{
 assert.match(buildVenueUrl({id:'a b&c'}),/^https:\/\/derryl-ditra.github.io\/map-explora\/\?v=[a-z0-9]+$/);
});
test('mobile detail has a 3 percent map reveal and keyboard/touch dismissal',()=>{
 const s=read('components/ui/MobileDrawer.tsx');assert.match(s,/97dvh/);assert.match(s,/Close place and return to map/);assert.match(s,/useSheetGesture/);
 const g=read('hooks/useSheetGesture.ts');assert.match(g,/body.scrollTop <= 0/);assert.match(g,/e.touches.length !== 1/);assert.match(g,/pointercancel/);assert.match(g,/touchcancel/);
});
test('browser history handles surfaces and only known visible venue deeplinks',()=>{
 const s=read('hooks/useAppNavigation.ts');assert.match(s,/popstate/);assert.match(s,/visible.some/);assert.match(s,/resolveVenueId/);assert.match(s,/history.back\(\)/);assert.match(s,/history.go\(-steps\)/);
});
test('share has native dispatch, explicit clipboard errors, focus and cancellation handling',()=>{
 const s=read('components/ui/ShareCard.tsx');assert.match(s,/navigator.share\(/);assert.match(s,/AbortError/);assert.match(s,/Copy was blocked/);assert.match(s,/aria-modal="true"/);assert.match(s,/aria-live="polite"/);assert.match(s,/textBox.current\?\.select/);
});
test('zoom and verified-first list are supported without changing confirmed age rules',()=>{
 assert.match(read('components/RootDocument.tsx'),/userScalable: true/);assert.match(read('components/RootDocument.tsx'),/maximumScale: 5/);
 assert.match(read('hooks/useVenueFilters.ts'),/Number\(hasVerifiedAgeEvidence\(b\)\) - Number\(hasVerifiedAgeEvidence\(a\)\)/);
});
