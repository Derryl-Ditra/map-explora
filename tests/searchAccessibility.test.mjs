import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
const drawer=readFileSync(new URL('../src/components/ui/MobileDrawer.tsx',import.meta.url),'utf8');
test('sidebar search has an accessible name independent of its placeholder',()=>{
 const input=drawer.match(/<input[\s\S]*?\/>/)[0];
 assert.match(input,/aria-label="Search class, brand, area, or street"/);
});
test('venue card titles follow the page h1 with h2 without changing their classes',()=>{
 assert.match(drawer,/<h2 className="text-\[1\.0625rem\] font-bold text-\[#221d18\] leading-snug">/);
 assert.doesNotMatch(drawer,/<\/?h[3-6]\b/);
});
