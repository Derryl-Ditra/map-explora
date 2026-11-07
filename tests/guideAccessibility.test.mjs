import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
const guide=readFileSync(new URL('../src/components/GuideContent.tsx',import.meta.url),'utf8');
const css=readFileSync(new URL('../src/app/guides.css',import.meta.url),'utf8');
test('answer venue titles follow the page h1 without skipped levels',()=>{
 assert.match(guide,/<h2>\{venueName\(v\)\}<\/h2>/);assert.doesNotMatch(guide,/<h3>\{venueName/);
});
test('venue headings retain their old typography and card actions are 44px touch targets',()=>{
 assert.match(css,/\.guides \.venue-list>li>h2\{font-size:1\.15rem;font-weight:700;line-height:inherit;margin:0\}/);
 assert.match(css,/\.guides \.venue-list \.links a\{display:inline-flex;align-items:center;min-height:44px\}/);
});
