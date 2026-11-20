import test from 'node:test';
import assert from 'node:assert/strict';
import { importTs } from './loadTs.mjs';
const {VENUES}=await importTs('../src/data/venues.ts');
const {publicLocation,withoutMapCodes}=await importTs('../src/utils/publicLocation.ts');
const {buildShareText,conciseAddress}=await importTs('../src/utils/shareText.ts');
const {placePageInventory,placeSchema}=await importTs('../src/utils/placePages.ts');
const byId=id=>VENUES.find(v=>v.id===id);
const code=/\b[23456789CFGHJMPQRVWX]{4,8}\+[23456789CFGHJMPQRVWX]{2,3}\b/i;
test('all153 Share outputs and141 bilingual place addresses omit plus codes and unnamed roads',()=>{
 for(const v of VENUES){assert.doesNotMatch(buildShareText(v),code);assert.doesNotMatch(buildShareText(v),/Jl\.\s*Nn\b|\nGround Floor\n/i);}
 for(const v of placePageInventory(VENUES))for(const lang of ['id','en']){
  assert.doesNotMatch(publicLocation(v,lang).address,code);assert.doesNotMatch(placeSchema(v,lang).address,code);assert.doesNotMatch(publicLocation(v,lang).address,/Jl\.\s*Nn\b/i);
 }
});
test('Bintaro Utown pin verified against live Maps listing 2026-11-20; official Sawah Baru kept as losing value',()=>{
 const v=byId('sparks-sports-academy-bintaro-utown');const loc=publicLocation(v);
 assert.equal(loc.areaOnly,false);assert.equal(loc.conflict,undefined);assert.match(v.address,/Sawah Lama/);assert.equal(v.lat,-6.293312);
 assert.match(v.notes,/Sawah Baru/);assert.doesNotMatch(buildShareText(v),code);
});
test('Cibinong retains sourced street; Funtastic shows street not floor; Living World uses the official street',()=>{
 assert.equal(conciseAddress(publicLocation(byId('sparks-sports-academy-cibinong')).address),'Jl. Tegar Beriman');
 assert.equal(conciseAddress(publicLocation(byId('the-funtastic-gym-pondok-indah')).address),'Jl. Metro Pondok Indah No.1');
 const loc=publicLocation(byId('rockstar-academy-living-world-alam-sutera'));assert.equal(loc.areaOnly,false);assert.match(loc.address,/Alam Sutera Boulevard Kav\. 21/);assert.doesNotMatch(loc.address,/Jl\.\s*Nn/);
 assert.equal(withoutMapCodes('GR9H+956, Jl. Tegar Beriman (GR9H+956), Tengah'),'Jl. Tegar Beriman, Tengah');
 assert.equal(withoutMapCodes('Jl. Example No.10A, Blok B7 01'),'Jl. Example No.10A, Blok B7 01');
});

test('all public list JSON-LD uses the same display address without asserting area-only coordinates',async()=>{
 const {itemListSchema}=await importTs('../src/utils/discovery.ts');
 const venues=placePageInventory(VENUES);const schema=itemListSchema({slug:'test',title:'Test',area:'All',venues});
 for(let i=0;i<venues.length;i++){const item=schema.itemListElement[i].item;assert.equal(item.address,publicLocation(venues[i]).address);assert.doesNotMatch(item.address,code);if(publicLocation(venues[i]).areaOnly)assert.equal(item.geo,undefined);}
 // 2026-11-20: no venue remains area-only or stored-name derived; every public place has a full address.
 for(const v of VENUES){const l=publicLocation(v);assert.equal(l.areaOnly,false,v.id);assert.equal(l.storedName,undefined,v.id);}
 assert.equal(publicLocation(byId('rockstar-academy-aeon-mall-sentul-city')).areaOnly,false);
});

test('all 12 former search-only venues route Directions to their verified pins, and all 161 venues route (2026-11-20)',async()=>{
 const {buildMapsLink,canRouteVenue}=await importTs('../src/utils/mapsLink.ts');
 const twelve=['sparks-sports-academy-bintaro-utown','rockstar-academy-living-world-alam-sutera','rockstar-academy-aeon-mall-deltamas','gymboree-play-music-pondok-indah-mall-1','sparks-sports-academy-cibinong','sparks-sports-academy-cibubur','deen-haus-alkahf-bintaro','morning-nest-preschool-bojongsari','english-1-cinere-depok','english-1-puri-indah','sparks-sports-academy-taman-palem','sparks-sports-academy-tangerang-city'];
 for(const id of twelve){const v=byId(id);assert.ok(v,id);assert.equal(canRouteVenue(v),true,id);const u=new URL(buildMapsLink(v));assert.ok(u.searchParams.get('destination'),id);}
 let unroutable=0;for(const v of VENUES){if(!canRouteVenue(v))unroutable++;}
 assert.equal(unroutable,0,'tested '+VENUES.length+'/161 venues, all Directions-capable');
});

test('Share explicitly qualifies every area-only or stored-derived label',()=>{
 for(const v of VENUES){const l=publicLocation(v);const text=buildShareText(v);if(l.storedName)assert.match(text,/\(stored record\)/);else if(l.areaOnly)assert.ok(text.split('\n')[1].length>0);}
 assert.match(buildShareText(byId('rockstar-academy-living-world-alam-sutera')),/Living World Alam Sutera/);
});
