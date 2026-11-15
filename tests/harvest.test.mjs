import test from 'node:test';
import assert from 'node:assert/strict';
import {parseActivity,leafUrls,clusterActivities,diffSnapshots,contentHash,assertSourceUrl,fetchPublic} from '../scripts/harvest/core.mjs';
const html = (nodes) => `<script type="application/ld+json">${JSON.stringify(nodes)}</script>`;
const source='https://happykamper.io/en/activities/play-a';
const nodes=[{'@type':'Service',name:'Play A',description:'Tiket 2 jam usia 1-5 tahun',provider:{name:'Small Play'},offers:{lowPrice:0,highPrice:50000,priceCurrency:'IDR'}},{'@type':'LocalBusiness',name:'Small Play',address:{streetAddress:'Jl Melati Jakarta'},geo:{latitude:-6.2,longitude:106.8},review:[{author:{name:'PRIVATE_NAME'},reviewBody:'PRIVATE_BODY'}]},{'@type':'FAQPage',mainEntity:[{name:'What ages?',acceptedAnswer:{text:'1-5 years'}}]}];
test('parses graph/type arrays, preserves zero prices, never upgrades partner evidence or copies review PII',()=>{
 const r=parseActivity(html({'@graph':nodes.map(n=>({...n,'@type':[n['@type']]}))}),source,'2026-11-15');
 assert.equal(r.provider,'Small Play');assert.equal(r.price.low,0);assert.equal(r.evidenceTier,'partner-listed-unverified');assert.equal(r.ageClaim.verification,'unverified-template');assert.equal(r.regionCandidate,true);assert.equal(r.sourceDate,null);assert.equal(JSON.stringify(r).includes('PRIVATE_'),false);
});
test('invalid JSON, missing service, bad geo, unknown and non-IDR prices stay non-publishable',()=>{
 assert.throws(()=>parseActivity('<script type="application/ld+json">{bad}</script>',source,'2026-11-15'));
 const n=structuredClone(nodes);n[1].geo.latitude=0;n[0].offers={lowPrice:'',highPrice:'x',priceCurrency:'USD'};
 const r=parseActivity(html(n),source,'2026-11-15');assert.equal(r.regionCandidate,false);assert.equal(r.price,null);assert.equal(r.publishable,false);
 assert.throws(()=>parseActivity(html(nodes.slice(1)),source,'2026-11-15'));
});
test('leaf sitemap drops area/category/lang duplicates and validates host',()=>{
 assert.deepEqual(leafUrls('<loc>https://happykamper.io/id/activities/a</loc><loc>https://happykamper.io/en/activities/a</loc><loc>https://happykamper.io/en/activities/in</loc><loc>https://happykamper.io/en/activities/in/jakarta</loc><loc>https://evil.test/en/activities/a</loc>'),['https://happykamper.io/en/activities/a']);
 for(const u of ['https://evil.test/a','https://happykamper.io.evil/a','http://happykamper.io/','https://x@happykamper.io/'])assert.throws(()=>assertSourceUrl(u));
});
test('dedupe needs exact provider and rounded location, not provider alone',()=>{
 const a=parseActivity(html(nodes),source,'2026-11-15');const b={...a,sourceUrl:source+'2'};const c={...a,geo:{lat:-6.8,lng:106.8}};
 assert.deepEqual(clusterActivities([a,b,c]).map(g=>g.activities.length).sort(),[1,2]);
 const noGeo={...a,geo:null};assert.equal(clusterActivities([noGeo,{...noGeo,sourceUrl:source+'3'}]).length,2);
});
test('diff ignores render date and retrieval but detects price changes; omissions are not closures',()=>{
 const a=parseActivity(html(nodes),source,'2026-11-15');const b=parseActivity(html(nodes.map(n=>({...n,dateModified:'2099-01-01'}))),source,'2026-11-16');
 assert.equal(contentHash(a),contentHash(b));assert.deepEqual(diffSnapshots([a],[b]),{added:[],changed:[],notObserved:[]});
 assert.deepEqual(diffSnapshots([a],[]),{added:[],changed:[],notObserved:[source]});
 b.price.low=100;assert.deepEqual(diffSnapshots([a],[b]).changed,[source]);
});
test('HTTP 403/429/challenge/redirect failures halt instead of retry or bypass',async()=>{
 for(const response of [new Response('denied',{status:403}),new Response('slow',{status:429}),new Response('verify you are human'),new Response('',{status:302,headers:{location:'https://evil.test'}})]){
 await assert.rejects(()=>fetchPublic(source,async()=>response),/STOP/);
 }
});

test('batch selection is bounded, spreads alphabetic names, resumes by URL and refreshes explicitly',async()=>{
 const {selectBatch,checkRobots}=await import('../scripts/harvest/core.mjs');
 const urls=[source,source+'2',source+'3'];assert.equal(selectBatch(urls,[{sourceUrl:source}],1,false).length,1);
 assert.equal(selectBatch([source],[{sourceUrl:source}],1,false).length,0);
 assert.deepEqual(selectBatch([source],[{sourceUrl:source}],1,true),[source]);
 assert.throws(()=>selectBatch(urls,[],0,false));
 assert.doesNotThrow(()=>checkRobots('User-agent: *\nAllow: /'));
 assert.throws(()=>checkRobots('User-agent: *\nDisallow: /private'),/STOP/);
});

test('triage excludes government/free parks, therapy, school/daycare-only and out-of-region districts',async()=>{
 const {triage}=await import('../scripts/harvest/core.mjs');
 for(const row of [{provider:'Free Activities',activity:'Taman Lansia',category:['Free Activity']},{activity:'PHYSIOTHERAPY LOCAL'},{activity:'Daycare Fullday'},{address:'Karawang, Jawa Barat'}]){
 assert.equal(triage({regionCandidate:true,category:[],...row}).status,'excluded');
 }
 assert.equal(triage({regionCandidate:true,category:['Sports'],activity:'Toddler swimming'}).status,'needs-review');
});

test('CLI replay creates checkpoint and report, rerun is no-op, invalid out never mutates source',async()=>{
 const {mkdtemp,readFile,rm}=await import('node:fs/promises');const{tmpdir}=await import('node:os');const{join}=await import('node:path');const{spawnSync}=await import('node:child_process');
 const temp=await mkdtemp(join(tmpdir(),'harvest-test-')),out=join(temp,'.harvest','candidate');
 try{
 const args=['scripts/harvest/run.mjs','--out',out,'--replay','tests/fixtures/harvest-buumi.json'];
 let result=spawnSync(process.execPath,args,{encoding:'utf8'});assert.equal(result.status,0,result.stderr);
 let report=JSON.parse(await readFile(join(out,'report.json'),'utf8'));assert.equal(report.summary.fetched,1);assert.equal(report.summary.strongBranchesAdded,0);assert.equal(report.candidates.length,1);
 result=spawnSync(process.execPath,args,{encoding:'utf8'});assert.equal(result.status,0,result.stderr);report=JSON.parse(await readFile(join(out,'report.json'),'utf8'));assert.deepEqual(report.diff,{added:[],changed:[],notObserved:[]});assert.equal(report.summary.fetched,0);
 result=spawnSync(process.execPath,['scripts/harvest/run.mjs','--out',join(temp,'src'),'--replay','tests/fixtures/harvest-buumi.json'],{encoding:'utf8'});assert.notEqual(result.status,0);
 }finally{await rm(temp,{recursive:true,force:true});}
});

test('blank, boolean and nonfinite numeric evidence cannot become zero prices or coordinates',()=>{
 for(const v of ['  ',false,'Infinity','not a number']){const n=structuredClone(nodes);n[0].offers.lowPrice=v;assert.equal(parseActivity(html(n),source,'2026-11-15').price,null);}
});

test('regional discovery accepts only exact leaf links on the approved city pages',async()=>{
 const{regionalUrls}=await import('../scripts/harvest/core.mjs');
 const page='<a href="/en/activities/a">a</a><a href="https://happykamper.io/en/activities/b">b</a><a href="/id/activities/a">id</a><a href="https://evil.test/en/activities/c">bad</a><a href="/en/activities/in/bali">bali</a>';
 assert.deepEqual(regionalUrls(page),['https://happykamper.io/en/activities/a','https://happykamper.io/en/activities/b']);
});

test('CLI quarantines bad pages, continues valid pages, and skips quarantined URLs on resume',async()=>{
 const{mkdtemp,writeFile,readFile,rm}=await import('node:fs/promises');const{tmpdir}=await import('node:os');const{join}=await import('node:path');const{spawnSync}=await import('node:child_process');
 const temp=await mkdtemp(join(tmpdir(),'harvest-quarantine-')),out=join(temp,'.harvest','candidate'),fixture=join(temp,'pages.json');
 try{const good=JSON.parse(await readFile('tests/fixtures/harvest-buumi.json','utf8'));await writeFile(fixture,JSON.stringify([{sourceUrl:source,html:'<html>broken schema</html>'},...good]));
 const args=['scripts/harvest/run.mjs','--out',out,'--replay',fixture];spawnSync(process.execPath,args,{encoding:'utf8'});
 const report=JSON.parse(await readFile(join(out,'report.json'),'utf8'));assert.equal(report.summary.fetched,1);assert.equal(report.summary.quarantinedUrls,1);
 const quarantine=JSON.parse(await readFile(join(out,'quarantine.json'),'utf8'));assert.equal(quarantine[0].sourceUrl,source);assert.ok(quarantine[0].at);assert.match(quarantine[0].reason,/Missing/);
 const rerun=spawnSync(process.execPath,args,{encoding:'utf8'});assert.equal(rerun.status,0,rerun.stderr);assert.equal(JSON.parse(await readFile(join(out,'report.json'),'utf8')).summary.selected,0);
 }finally{await rm(temp,{recursive:true,force:true});}
});

test('persisted site challenge blocks future automatic runs until manual resolution',async()=>{
 const{mkdtemp,mkdir,writeFile,rm}=await import('node:fs/promises');const{tmpdir}=await import('node:os');const{join}=await import('node:path');const{spawnSync}=await import('node:child_process');
 const temp=await mkdtemp(join(tmpdir(),'harvest-stop-')),out=join(temp,'.harvest','candidate');
 try{await mkdir(out,{recursive:true});await writeFile(join(out,'quarantine.json'),JSON.stringify([{sourceUrl:source,reason:'site challenge',siteStop:true,at:'2026-11-15'}]));
 const result=spawnSync(process.execPath,['scripts/harvest/run.mjs','--out',out,'--replay','tests/fixtures/harvest-buumi.json'],{encoding:'utf8'});assert.notEqual(result.status,0);assert.match(result.stderr,/manual resolution/);
 }finally{await rm(temp,{recursive:true,force:true});}
});

test('a robots or discovery request challenge is persisted too, not retried next night',async()=>{
 const{fetchWithQuarantine}=await import('../scripts/harvest/core.mjs');const q=[];let saved=false;
 await assert.rejects(()=>fetchWithQuarantine('https://happykamper.io/robots.txt',q,async()=>{saved=true;},async()=>new Response('slow',{status:429})),/STOP/);
 assert.equal(saved,true);assert.equal(q[0].siteStop,true);assert.equal(q[0].sourceUrl,'https://happykamper.io/robots.txt');
});

test('English and Indonesian robot/AI verification pages are quarantined and skipped without bypass',async()=>{
 const{fetchWithQuarantine}=await import('../scripts/harvest/core.mjs');
 for(const body of ['Are you a robot?','Checking your browser before accessing','Verify that you are not a robot','AI verification required','Please complete the CAPTCHA','Verifikasi bahwa Anda bukan robot','Memeriksa browser Anda','Buktikan Anda manusia','Pemeriksaan AI diperlukan','Silakan selesaikan verifikasi keamanan']){
  const q=[];await assert.rejects(()=>fetchWithQuarantine(source,q,async()=>{},async()=>new Response(body)),/STOP: verification page/);
  assert.equal(q.length,1);assert.equal(q[0].siteStop,false);assert.ok(q[0].at);
 }
 const good=await fetchPublic(source,async()=>new Response('Kelas robotika untuk anak, belajar membuat robot.'));assert.match(good,/robotika/);
});

test('HTTP403 and HTTP429 remain hard site stops even with verification wording',async()=>{
 const{fetchWithQuarantine}=await import('../scripts/harvest/core.mjs');
 for(const status of [403,429]){const q=[];await assert.rejects(()=>fetchWithQuarantine(source,q,async()=>{},async()=>new Response('Are you a robot?',{status})),/STOP: HTTP/);assert.equal(q[0].siteStop,true);}
});
