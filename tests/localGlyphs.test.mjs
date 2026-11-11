import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { buildSync } from 'esbuild';
const bright=JSON.parse(readFileSync('src/data/map-style-light.json','utf8'));
const region=JSON.parse(readFileSync('src/data/map-region.json','utf8'));
const code=buildSync({entryPoints:['src/components/map/vectorStyle.ts'],bundle:true,write:false,format:'esm',platform:'node'}).outputFiles[0].text;
const {getMapStyle}=await import('data:text/javascript;base64,'+Buffer.from(code).toString('base64'));
test('local glyph rendering removes remote fonts and preserves layers with regional source bounds',async()=>{
 const style=await getMapStyle();
 assert.equal(style.glyphs,undefined);
 const expected=structuredClone(bright);delete expected.glyphs;
 for(const s of Object.values(expected.sources)) if(['raster','vector'].includes(s.type)) s.bounds=[...region.bounds];
 assert.deepEqual(style,expected);
 assert.ok(bright.glyphs,'do not mutate checked-in provider style');
 assert.notEqual(style,await getMapStyle(),'each map owns its style');
});
