import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, statSync } from 'node:fs';
const text=p=>readFileSync(p,'utf8');
test('preview is clearly non-interactive, dated and attributed',()=>{
 const s=text('src/components/map/MapPreview.tsx');
 assert.match(s,/Map preview - Jakarta/);assert.match(s,/not yet interactive/);
 assert.match(s,/Loading map for pan, zoom and place taps/);
 assert.match(s,/pointer-events-none/);assert.match(s,/OpenFreeMap/);assert.match(s,/OpenStreetMap/);assert.match(s,/Nov 12, 2026/);
 assert.doesNotMatch(s,/onClick|onTouch/);
 for(const name of ['mobile','desktop'])assert.ok(statSync(`public/map-preview/${name}.webp`).size<30000);
});
test('preview spans dynamic loading and real map load, never claims ready early',()=>{
 const hud=text('src/components/MapHUD.tsx'),vector=text('src/components/map/VectorMap.tsx'),home=text('src/app/(english)/page.tsx');
 assert.match(hud,/loading: \(\) => <MapPreview \/>/);
 assert.match(vector,/mapStatus === "loading" && <MapPreview \/>/);
 assert.match(vector,/data-map-status=\{mapStatus\}/);
 assert.match(vector,/mapStatus === "error"/);assert.match(vector,/Map could not load/);
 assert.match(home,/as="image".*mobile\.webp.*max-width: 767px/);
 assert.match(home,/as="image".*desktop\.webp.*min-width: 768px/);
 assert.match(home,/vendor\.shared/);
});
