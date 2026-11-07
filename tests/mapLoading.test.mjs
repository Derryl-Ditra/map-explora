import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
test('one Bright basemap keeps colors, POIs, transit and rotating TileJSON', () => {
 const s=JSON.parse(readFileSync(new URL('../src/data/map-style-light.json',import.meta.url),'utf8'));
 assert.equal(s.version,8);assert.equal(s.sources.openmaptiles.url,'https://tiles.openfreemap.org/planet');
 assert.ok(s.layers.some(l=>l['source-layer']==='poi' && l.type==='symbol'));
 assert.ok(s.layers.some(l=>l.id==='poi_transit'));
 assert.doesNotMatch(JSON.stringify(s),/planet\/\d{8}_/);
 assert.equal(existsSync(new URL('../src/data/map-style-dark.json',import.meta.url)),false);
 const build=readFileSync(new URL('../scripts/build-map-styles.mjs',import.meta.url),'utf8');
 assert.match(build,/styles\/bright/);assert.doesNotMatch(build,/positron|transformStyle/);
});
test('map waits for idle, reports errors and starts at wider zoom', () => {
 const s=readFileSync(new URL('../src/components/map/VectorMap.tsx',import.meta.url),'utf8');
 assert.match(s,/once\("idle"/);assert.match(s,/map\.on\("error"/);assert.match(s,/zoom: 11/);assert.doesNotMatch(s,/FALLBACK_STYLE_URL|setStyle\(|styleModeRef|mapStyle/);
 assert.match(s,/ctx.fillStyle = "#1c1917"/);assert.match(s,/ctx.fillStyle = "#ffffff"/);
});
test('one map mode has no light/dark switcher or unused toggle state',()=>{
 const s=readFileSync(new URL('../src/components/MapHUD.tsx',import.meta.url),'utf8');
 assert.doesNotMatch(s,/Toggle Map Style|setMapStyle|mapStyle|\bMoon\b|\bSun\b/);
});
