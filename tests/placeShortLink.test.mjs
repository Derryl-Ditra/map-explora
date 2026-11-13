import test from'node:test';import assert from'node:assert/strict';import{importTs}from'./loadTs.mjs';
const{VENUES}=await importTs('../src/data/venues.ts');
const{placePageInventory,placeMetadata}=await importTs('../src/utils/placePages.ts');
const{PLACE_CODE_LENGTH,PLACE_SHORT_CODES,PLACE_CODE_ALPHABET}=await importTs('../src/data/placeShortCodes.ts');
const{placeCode,placeIdFromCode}=await importTs('../src/utils/placeShortLink.ts');
const{buildVenueUrl,buildShareText}=await importTs('../src/utils/shareText.ts');
test('issued codes are mixed case3chars with digit, collision-free and not slugs',()=>{
 assert.equal(PLACE_CODE_LENGTH,3);const codes=Object.values(PLACE_SHORT_CODES);assert.equal(new Set(codes).size,codes.length);
 for(const v of placePageInventory(VENUES)){const c=placeCode(v.id);assert.equal(c.length,PLACE_CODE_LENGTH);for(const k of c)assert.ok(PLACE_CODE_ALPHABET.includes(k));assert.match(c,/[A-Z]/);assert.match(c,/[a-z]/);assert.match(c,/\d/);assert.ok(!VENUES.some(x=>x.id===c));assert.equal(placeIdFromCode(c),v.id);assert.ok(buildVenueUrl(v).endsWith(`/id/places/${c}/`));}
 assert.equal(placeIdFromCode('???'),null);
 // Previously issued fixtures must not change when inventory order changes.
 assert.equal(placeCode('golden-baby-school-jakarta-garden-city'),'G7v');assert.equal(placeCode('rockstar-academy-aeon-mall-deltamas'),'B4c');
});
test('short Share has only name area one age line and standalone URL',()=>{
 for(const v of VENUES)for(const lang of ['id','en']){const s=buildShareText(v,lang),lines=s.split('\n');assert.ok(lines[0].length>0);assert.doesNotMatch(s,/\*/);assert.equal(lines[3],'');assert.equal(lines.length,5);assert.ok(lines.at(-1).startsWith('https://'));assert.ok(s.length<=320);assert.doesNotMatch(s,/Google Maps:|Via Map Explora|reviews/);assert.equal(buildShareText(v,lang,'whatsapp').split('\n')[0],`*${lines[0]}*`);}
});
test('short page metadata remains page-specific with canonical long slug',()=>{
 const v=VENUES.find(v=>v.id==='golden-baby-school-jakarta-garden-city');const m=placeMetadata(v,'id');assert.ok(m.alternates.canonical.endsWith(`/id/places/${v.id}/`));assert.equal(m.openGraph.title,'Golden Baby School Jakarta Garden City');assert.ok(m.openGraph.description.length<=80);
});
