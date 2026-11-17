#!/usr/bin/env node
// Capture a SMALL priority review batch. No application data writes, no auto-promotion.
import{readFile,writeFile,mkdir,rename}from'node:fs/promises';import{resolve}from'node:path';
import{parseActivity,fetchWithQuarantine,checkRobots,assertSourceUrl}from'./core.mjs';import{activityAgeExcerpts}from'./branch-queue.mjs';
const args=process.argv.slice(2),allowed=['--queue','--out','--seed','--limit','--delay-ms','--replay','--decisions','--quarantine'];
for(let i=0;i<args.length;i+=2)if(!allowed.includes(args[i])||!args[i+1])throw Error('Invalid argument '+args[i]);
const val=(f,d)=>{const i=args.indexOf(f);return i<0?d:args[i+1]};const limit=Number(val('--limit',12)),delay=Number(val('--delay-ms',3000));
if(!Number.isInteger(limit)||limit<1||limit>20||!Number.isFinite(delay)||delay<3000)throw Error('limit1..20; delay at least3000ms');
const out=resolve(val('--out','.harvest/review'));if(!out.includes('/.harvest/'))throw Error('--out must be inside .harvest');
const load=async(path,fallback)=>{try{return JSON.parse(await readFile(resolve(path),'utf8'));}catch(e){if(e.code==='ENOENT')return fallback;throw e;}};
const input=await load(val('--queue','.harvest/review/queue.json'),null);if(!Array.isArray(input?.queue))throw Error('Missing reviewed queue');
for(const r of input.queue){assertSourceUrl(r.sourceUrl);if(!/^https:\/\/happykamper.io\/en\/activities\/[^/?#]+$/.test(r.sourceUrl))throw Error('Not a canonical leaf');}
const decisions=await load(val('--decisions','docs/research/capture-decisions.json'),[]);if(!Array.isArray(decisions))throw Error('Invalid decisions');
const held=new Set(decisions.filter(d=>['hold','reviewed'].includes(d.state)).map(d=>d.sourceUrl));
const seed=await load(val('--seed','docs/research/capture-snapshot.json'),{records:[]});const local=await load(resolve(out,'snapshot.json'),{records:[]});
if(!Array.isArray(seed.records)||!Array.isArray(local.records))throw Error('Invalid snapshot');
const records=new Map([...seed.records,...local.records].map(r=>[r.sourceUrl,r]));const durableQuarantine=await load(val('--quarantine','docs/research/capture-quarantine.json'),[]);const localQuarantine=await load(resolve(out,'quarantine.json'),[]);if(!Array.isArray(durableQuarantine)||!Array.isArray(localQuarantine))throw Error('Invalid quarantine');const quarantine=[...durableQuarantine,...localQuarantine];
if(quarantine.some(q=>q.siteStop))throw Error('STOP: source paused, manual resolution required');
const blocked=new Set(quarantine.map(q=>q.sourceUrl));const target=input.queue.filter(r=>!held.has(r.sourceUrl)).slice(0,limit);const selected=target.filter(r=>!records.has(r.sourceUrl)&&!blocked.has(r.sourceUrl));
await mkdir(out,{recursive:true});const atomic=async(name,value)=>{const path=resolve(out,name);await writeFile(path+'.tmp',JSON.stringify(value,null,2)+'\n');await rename(path+'.tmp',path);};
const replay=val('--replay',null)?await load(val('--replay'),[]):null;let requests=0,fetched=0;const errors=[];
const request=async(url)=>{requests++;return fetchWithQuarantine(url,quarantine,()=>atomic('quarantine.json',quarantine));};
if(selected.length&&!replay){checkRobots(await request('https://happykamper.io/robots.txt'));}
for(const entry of selected){
 try{
  let html;if(replay){html=replay.find(r=>r.sourceUrl===entry.sourceUrl)?.html;if(!html)throw Error('Missing replay source');}
  else{await new Promise(r=>setTimeout(r,delay));html=await request(entry.sourceUrl);}
  const r=parseActivity(html,entry.sourceUrl,new Date().toISOString());r.activityAgeExcerpts=activityAgeExcerpts(r.terms);records.set(r.sourceUrl,r);fetched++;await atomic('snapshot.json',{schemaVersion:1,records:[...records.values()]});
 }catch(e){const reason=String(e.message);errors.push({sourceUrl:entry.sourceUrl,reason});if(/STOP|403|429|verification|challenge/.test(reason))break;}
}
// Packets are partner leads. Maps, closure, identity, non-formal scope and age review remain MANUAL.
const packets=target.filter(r=>records.has(r.sourceUrl)).map(r=>({...records.get(r.sourceUrl),publishable:false,evidenceStatus:'historical-source-capture-not-current-verification',captureAgeHours:Math.max(0,Math.round((Date.now()-Date.parse(records.get(r.sourceUrl).retrievedAt))/3600000)),requiresFreshOperationCheck:true,requiredChecks:['exact physical branch and Maps pin','current operation and closure','non-formal activity and government exclusion','activity age conflicts, source dates and session validity','red-flag review','price scope and inclusions']}));
const summary={requested:limit,selected:selected.length,fetched,networkRequests:requests,cached:records.size,packets:packets.length,needsCapture:input.queue.filter(r=>!records.has(r.sourceUrl)&&!blocked.has(r.sourceUrl)).length,errors,publishedBranches:0};
await atomic('packets.json',{summary,packets});await atomic('snapshot.json',{schemaVersion:1,records:[...records.values()]});console.log(JSON.stringify(summary,null,2));if(errors.length)process.exitCode=1;
