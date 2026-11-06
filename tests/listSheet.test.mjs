import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
const drawer=fs.readFileSync(new URL('../src/components/ui/MobileDrawer.tsx',import.meta.url),'utf8');
test('list and details both leave a map strip and expose a dismissal handle',()=>{
 assert.match(drawer,/height: "97dvh"/);
 assert.match(drawer,/useSheetGesture\(!isDesktop && !mobileHidden/);
 assert.ok(!drawer.includes('{showDetails && <button ref={handle}'));
});
