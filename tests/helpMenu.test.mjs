import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
const s=readFileSync(new URL('../src/components/MapHUD.tsx',import.meta.url),'utf8');
test('mobile additional content is in an accessible right-side menu, not the old floating guides pill',()=>{
 assert.match(s,/aria-label="Guides and information"/);assert.match(s,/aria-expanded=\{helpOpen\}/);assert.match(s,/id="map-help-menu"/);
 assert.match(s,/onKeyDown/);assert.match(s,/Escape/);assert.match(s,/Additional information/);
});

test('Class guides lives only in the information menu, not behind the sidebar',()=>{const home=readFileSync(new URL('../src/app/(english)/page.tsx',import.meta.url),'utf8');assert.doesNotMatch(home,/Class guides|import Link/);assert.match(s,/href="\/activities\/"/);assert.ok(!s.includes('left-[8.5rem]'));});

test('contact is in the help menu at every viewport, without a plain email label',()=>{
 const s=readFileSync(new URL('../src/components/MapHUD.tsx',import.meta.url),'utf8');
 assert.match(s,/ref=\{helpMenu\} className="relative"/);
 assert.match(s,/<a href="mailto:derrylditramaneti@gmail.com"[^>]*>Email<\/a>/);
 assert.equal((s.match(/derrylditramaneti@gmail.com/g)??[]).length,1);
});

test('contact pages are bilingual, discoverable and use subject-only mail links',()=>{
 const read=p=>readFileSync(new URL('../src/'+p,import.meta.url),'utf8');
 assert.match(s,/href="\/contact\/"/);
 for(const [p,lang] of [['app/(english)/contact/page.tsx','en'],['app/id/contact/page.tsx','id']]){
  assert.match(read(p),new RegExp('GuideShell lang="'+lang+'" path="/contact/"'));
  assert.match(read(p),/guideMetadata/);
 }
 const c=read('components/ContactContent.tsx');
 assert.equal((c.match(/subject:'Map Explora:/g)??[]).length,5);
 assert.match(c,/encodeURIComponent\(topic.subject\)/);
 assert.doesNotMatch(c,/<form|<input|<textarea|response within|reply within|24 hours|\u2013|\u2014/i);
 assert.match(c,/href="\/venues.json"/);
 assert.match(read('app/sitemap.ts'),/'\/contact\/'/);
 assert.match(read('utils/bilingual.ts'),/\/id\/contact\//);
 assert.match(read('components/GuideContent.tsx'),/\$\{p\}\/contact\//);
});
