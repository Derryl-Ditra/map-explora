import test from'node:test';import assert from'node:assert/strict';import{reviewQueue,activityAgeExcerpts}from'../scripts/harvest/branch-queue.mjs';import{readFileSync,mkdtempSync,writeFileSync,rmSync}from'node:fs';import{tmpdir}from'node:os';import{join}from'node:path';import{spawnSync}from'node:child_process';
const row=(activity,provider='Small Provider',sourceUrl='https://happykamper.io/en/activities/a')=>({activity,provider,sourceUrl});
test('branch queue prioritizes class age leads, retains everything, does not assert eligibility',()=>{
 const input=[row('Retail craft'),row('Baby class','Other','https://happykamper.io/en/activities/b'),row('SMA coding','Codes','https://happykamper.io/en/activities/c')];const q=reviewQueue(input);assert.equal(q.queue[0].activity,'Baby class');assert.equal(q.allRecordsRetained,3);assert.equal(Object.values(q.lanes).flat().length,3);assert.ok(q.queue.every(r=>r.publishable===false));
});
test('one provider is a first-pass scheduling bucket, not a branch-identity merge',()=>{
 const a=row('Toddler A'),b=row('Toddler B','Small Provider','https://happykamper.io/en/activities/b');const q=reviewQueue([a,b]);assert.equal(q.lanes.priority.length,2);assert.equal(q.queue.length,1);assert.notEqual(q.lanes.priority[0].sourceUrl,q.lanes.priority[1].sourceUrl);
});
test('existing brand goes to expansion lane, and held source is not silently retried',()=>{
 const a=row('Toddler class'),b=row('Sensory','Held','https://happykamper.io/en/activities/b');const q=reviewQueue([a,b],{venues:[{chain:'Small Provider',lat:-6.2,lng:106.8}],decisions:[{sourceUrl:b.sourceUrl,state:'hold'}]});assert.equal(q.lanes.existingBrand.length,1);assert.equal(q.lanes.held.length,1);assert.equal(q.queue.length,1);assert.equal(q.queue[0].provider,'Small Provider');
});
test('activity age extraction rejects package months/session minutes and keeps raw conflicting age text',()=>{
 for(const s of ['24 Sesi selama 3 Bulan','30 menit / pertemuan, 1 bulan 4x pertemuan','Price 125000','60 minutes per class'])assert.deepEqual(activityAgeExcerpts(s),[]);
 assert.equal(activityAgeExcerpts('Untuk anak usia 6 bulan – 7 tahun')[0].verification,'partner-listed-unconfirmed');assert.equal(activityAgeExcerpts('Anak usia 2-4 tahun')[0].scope,'activity-description');
});
test('persisted218 URL ledger is unique and templates never become provider confirmations',()=>{
 const x=JSON.parse(readFileSync('docs/research/capture-index.json'));assert.equal(x.records.length,218);assert.equal(new Set(x.records.map(r=>r.sourceUrl)).size,218);for(const r of JSON.parse(readFileSync('docs/research/capture-snapshot.json')).records){assert.equal(r.publishable,false);assert.equal(r.ageClaim?.verification,'unverified-template');assert.equal(r.sourceDate,null);assert.ok(!('reviews'in r));}
});
test('capture queue warm restart fetches nothing and writes no application files',()=>{
 const temp=mkdtempSync(join(tmpdir(),'branch-restart-'));try{const cache=JSON.parse(readFileSync('docs/research/capture-snapshot.json'));const queue={queue:cache.records.slice(0,2)};const path=join(temp,'queue.json'),out=join(temp,'.harvest','run');writeFileSync(path,JSON.stringify(queue));let result=spawnSync(process.execPath,['scripts/harvest/capture-review.mjs','--queue',path,'--out',out,'--limit','2'],{encoding:'utf8'});assert.equal(result.status,0,result.stderr);const s=JSON.parse(result.stdout);assert.equal(s.networkRequests,0);assert.equal(s.fetched,0);assert.equal(s.packets,2);assert.equal(s.publishedBranches,0);result=spawnSync(process.execPath,['scripts/harvest/capture-review.mjs','--queue',path,'--out',join(temp,'src')],{encoding:'utf8'});assert.notEqual(result.status,0);}finally{rmSync(temp,{recursive:true,force:true});}
});
test('reviewed decisions advance first-pass provider to next activity instead of looping forever',()=>{
 const a=row('Toddler A'),b=row('Toddler B','Small Provider','https://happykamper.io/en/activities/b');const q=reviewQueue([a,b],{decisions:[{sourceUrl:a.sourceUrl,state:'reviewed'}]});assert.equal(q.queue[0].sourceUrl,b.sourceUrl);assert.equal(q.lanes.reviewed.length,1);assert.equal(q.allRecordsRetained,2);
});
test('durable site stop prevents a new output directory from bypassing quarantine',()=>{
 const temp=mkdtempSync(join(tmpdir(),'branch-stop-'));try{const q=join(temp,'queue.json'),stop=join(temp,'stop.json');writeFileSync(q,JSON.stringify({queue:[]}));writeFileSync(stop,JSON.stringify([{siteStop:true,reason:'403'}]));const result=spawnSync(process.execPath,['scripts/harvest/capture-review.mjs','--queue',q,'--quarantine',stop,'--out',join(temp,'.harvest','new')],{encoding:'utf8'});assert.notEqual(result.status,0);assert.match(result.stderr,/source paused/);}finally{rmSync(temp,{recursive:true,force:true});}
});
test('source-grounded long provider alias enters expansion lane without merging branch records',()=>{
 const r=row('Weekend Class 3-5 tahun','Kinderra Play Early Learning Center');const q=reviewQueue([r],{venues:[{chain:'Kinderra Play'}],bindings:[{provider:r.provider,chain:'Kinderra Play'}]});assert.equal(q.lanes.existingBrand.length,1);assert.equal(q.lanes.priority.length,0);assert.equal(q.allRecordsRetained,1);
});
test('all documented branch blockers persist and advance the actual review queue',()=>{
 const records=JSON.parse(readFileSync('docs/research/capture-index.json')).records,decisions=JSON.parse(readFileSync('docs/research/capture-decisions.json'));
 const providers=['Majiku kids','Precious Montessori School','Kidzero Play','ABC PLAYPALS'];const q=reviewQueue(records,{decisions});for(const provider of providers){const d=decisions.find(d=>records.find(r=>r.sourceUrl===d.sourceUrl)?.provider===provider);assert.equal(d?.state,'hold',provider);assert.ok(!q.queue.some(r=>r.sourceUrl===d.sourceUrl));assert.ok(q.lanes.held.some(r=>r.sourceUrl===d.sourceUrl));}
});
test('frozen benchmark remains reproducible after live reviewed/hold dispositions advance queue',()=>{
 const labels=JSON.parse(readFileSync('docs/research/capture-benchmark-labels.json'));for(const key of['beforeOrder','afterOrder'])assert.deepEqual(labels.filter(r=>Number.isInteger(r[key])).map(r=>r[key]).sort((a,b)=>a-b),Array.from({length:12},(_,i)=>i));const r=spawnSync(process.execPath,['scripts/harvest/benchmark-review.mjs'],{encoding:'utf8'});assert.equal(r.status,0,r.stderr);const x=JSON.parse(r.stdout);assert.equal(x.before.under5ClassDescriptionPackets,0);assert.equal(x.after.under5ClassDescriptionPackets,3);
});
