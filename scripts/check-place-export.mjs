// Build first. Inspect the raw HTML, never client hydration, for every place.
import { readFile, readdir } from 'node:fs/promises';
import assert from 'node:assert/strict';
const root='out',ids=await readdir(root+'/places');
assert.equal(ids.length,141);
const sitemap=await readFile(root+'/sitemap.xml','utf8');
for(const lang of ['en','id']){
 for(const id of ids){
  const path=`${lang==='id'?'/id':''}/places/${id}/`;
  const html=await readFile(root+path+'index.html','utf8');
  assert.ok(html.includes('<h1>'));
  const publicText=html.replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi,'').replace(/<[^>]*>/g,' ');
  assert.doesNotMatch(publicText,/exact[- ]age[- ]match|upper[- ]bound inclusivity|sourceConflict|not re-fetched|in-app routing/i);
  if(lang==='id')assert.doesNotMatch(publicText,/Official page:|Page undated|per session|\b[0-9]+-[0-9]+mths\b|official rate card|Product title and description/i);assert.ok(html.includes('application/ld+json'));
  const schema=JSON.parse(html.match(/<script type="application\/ld\+json">(.*?)<\/script>/s)[1]);
  assert.deepEqual(Object.keys(schema).sort(),['@context','@type','address','name','url']);
  assert.equal(schema['@type'],'Place');assert.ok(schema.url.endsWith(path));
  const image=html.match(/<meta property="og:image" content="([^"]+)"/)[1];
  assert.ok(image.endsWith(`/place-cards/${lang}/${id}.png`));
  const png=await readFile(`${root}/place-cards/${lang}/${id}.png`);
  assert.equal(png.readUInt32BE(16),1200);assert.equal(png.readUInt32BE(20),630);
  assert.ok(sitemap.includes(`<loc>https://derryl-ditra.github.io/map-explora${path}</loc>`));
  assert.ok(html.includes('rel="canonical"'));assert.ok(html.includes('hrefLang="en"')||html.includes('hrefLang="en"'.toLowerCase()));
 }
}
console.log('282 static place pages, canonical/language tags, minimal Place schema, sitemap entries and PNG dimensions passed.');
