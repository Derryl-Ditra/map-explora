import test from 'node:test';import assert from 'node:assert/strict';import{importTs}from'./loadTs.mjs';import{readFileSync}from'node:fs';
const{isInAppBrowser,locationLanguage,chromeIntent}=await importTs('../src/utils/inAppBrowser.ts');
test('in-app detection is scoped to explicit host tokens or Android WebView',()=>{
 for(const s of ['Mozilla Android; wv) Chrome/130','Instagram 390','Threads Android','Barcelona iPhone','FBAN/FBIOS'])assert.equal(isInAppBrowser(s),true);
 for(const s of ['Mozilla Android Chrome/130 Safari/537','Mozilla iPhone Version/18 Safari/605'])assert.equal(isInAppBrowser(s),false);
});
test('recovery language follows source-page hint or document',()=>{assert.equal(locationLanguage(new URLSearchParams('shareLang=id'),'en'),'id');assert.equal(locationLanguage(new URLSearchParams(),'id'),'id');assert.equal(locationLanguage(new URLSearchParams('shareLang=no'),'en'),'en');});
test('Chrome escape keeps current site route/query and has HTTPS fallback',()=>{
 const u='https://derryl-ditra.github.io/map-explora/?v=10zbtz4&shareLang=id';const i=chromeIntent(u);assert.ok(i.startsWith('intent://derryl-ditra.github.io/map-explora/?v=10zbtz4&shareLang=id#Intent;'));assert.ok(i.includes('package=com.android.chrome;'));assert.ok(i.includes('S.browser_fallback_url='+encodeURIComponent(u)));
 assert.equal(chromeIntent('https://evil.invalid/'),null);assert.equal(chromeIntent('http://derryl-ditra.github.io/map-explora/'),null);
});
test('denied notice remains until dismissed; recovery is not an automatic redirect',()=>{
 const h=readFileSync('src/components/MapHUD.tsx','utf8'),n=readFileSync('src/components/ui/LocationNotice.tsx','utf8');assert.match(h,/if \(!locationError \|\| locationErrorCode===1\) return/);assert.match(n,/navigator.clipboard.writeText\(href\)/);assert.doesNotMatch(n,/window.location\.(replace|assign)|getCurrentPosition/);
});
