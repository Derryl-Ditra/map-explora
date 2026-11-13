// Local build audit. This is not a real-client cache or rendering check.
import{readFile,readdir}from'node:fs/promises';import assert from'node:assert/strict';
const registry=await readFile('src/data/placeShortCodes.ts','utf8');const pairs=[...registry.matchAll(/"([a-z0-9-]+)": "([A-Za-z0-9]{3})"/g)];assert.equal(pairs.length,141);
const tags=s=>[...s.matchAll(/<meta (?:property|name)="((?:og|twitter):[^"]+)" content="([^"]*)"/g)].map(m=>[m[1],m[2]]).sort();
for(const[,id,code]of pairs){const short=await readFile(`out/id/places/${code}/index.html`,'utf8'),long=await readFile(`out/id/places/${id}/index.html`,'utf8');assert.deepEqual(tags(short),tags(long));assert.ok(short.includes(`/id/places/${id}/`));assert.ok(short.includes('rel="canonical"'));assert.ok(short.includes('og:image:alt'));assert.ok(short.includes('twitter:image:alt'));}
console.log('141 short pages: static OG/Twitter parity, canonical, alt and no-JS link pass.');
const count=(await readdir('out/id/places')).length;assert.equal(count,282);
