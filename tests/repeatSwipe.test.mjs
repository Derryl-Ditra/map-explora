import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
test('quick List reopen uses a guarded touch tap, keeps click and keyboard activation',()=>{
 const s=readFileSync(new URL('../src/components/MapHUD.tsx',import.meta.url),'utf8');
 assert.match(s,/onClick=\{\(\) => handleSetView\("list"\)\}/);
 assert.match(s,/onTouchStart/);assert.match(s,/onTouchCancel/);assert.match(s,/event.touches.length === 1/);
 assert.match(s,/Math.hypot\(end.clientX - start.x, end.clientY - start.y\) < 10/);
 assert.match(s,/listTouch.current = null/);assert.match(s,/event.preventDefault\(\); handleSetView\("list"\)/);
});
