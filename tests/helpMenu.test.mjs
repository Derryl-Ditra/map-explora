import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
const s=readFileSync(new URL('../src/components/MapHUD.tsx',import.meta.url),'utf8');
test('mobile additional content is in an accessible right-side menu, not the old floating guides pill',()=>{
 assert.match(s,/aria-label="Guides and information"/);assert.match(s,/aria-expanded=\{helpOpen\}/);assert.match(s,/id="map-help-menu"/);
 assert.match(s,/onKeyDown/);assert.match(s,/Escape/);assert.match(s,/Additional information/);
});

test('old guide pill stays desktop-only and Age moves to the left',()=>{const home=readFileSync(new URL('../src/app/(english)/page.tsx',import.meta.url),'utf8');assert.match(home,/hidden md:block absolute top-3 left-3/);assert.ok(!s.includes('left-[8.5rem]'));});
