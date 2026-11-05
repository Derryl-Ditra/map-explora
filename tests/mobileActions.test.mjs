import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
test('persistent mobile action footer is outside scroll content with safe-area space',()=>{
 const s=readFileSync(new URL('../src/components/ui/MobileDrawer.tsx',import.meta.url),'utf8');
 assert.match(s,/min-h-0 overflow-y-auto/);assert.match(s,/aria-label="Place actions"/);assert.match(s,/safe-area-inset-bottom/);assert.match(s,/onSetMobileView\("map"\)/);assert.match(s,/buildMapsLink\(activeVenue\)/);
 assert.ok(s.indexOf('aria-label="Place actions"')>s.indexOf('{/* Coverage honesty'));
});

test('opening details resets the shared scroll container for each venue',()=>{
 const s=readFileSync(new URL('../src/components/ui/MobileDrawer.tsx',import.meta.url),'utf8');
 assert.match(s,/ref={detailsScrollRef}/);
 assert.match(s,/if \(activeVenue && showDetails\) {\s*detailsScrollRef.current\?\.scrollTo\(\{ top: 0 \}\)/);
 assert.match(s,/\[activeVenue\?\.id, showDetails\]/);
});
