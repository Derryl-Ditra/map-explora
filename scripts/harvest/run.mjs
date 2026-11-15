#!/usr/bin/env node
import {readFile,writeFile,mkdir,rename} from 'node:fs/promises';
import {resolve} from 'node:path';
import {parseActivity,clusterActivities,diffSnapshots,fetchWithQuarantine,selectBatch,checkRobots,triage,regionalUrls} from './core.mjs';
const args=process.argv.slice(2);
const value=(flag,fallback)=>{const i=args.indexOf(flag);return i<0?fallback:args[i+1];};
const allowed=new Set(['--out','--limit','--delay-ms','--refresh','--replay']);
for(let i=0;i<args.length;i++){if(!allowed.has(args[i]))throw Error(`Unknown option: ${args[i]}`);if(args[i]!=='--refresh')i++;}
const out=resolve(value('--out','.harvest/happykamper'));
// Candidate snapshots must never write into application data or checked-in source.
if(!out.includes('/.harvest/'))throw Error('--out must be within a .harvest directory');
const delay=Number(value('--delay-ms','3000')),limit=Number(value('--limit','40'));
if(!Number.isFinite(delay)||delay<3000)throw Error('minimum delay is 3000ms');
if(limit>100)throw Error('maximum live batch is 100 pages');
selectBatch([],[],limit,false);
await mkdir(out,{recursive:true});
const snapshotPath=resolve(out,'snapshot.json');
let before=[];
try{before=JSON.parse(await readFile(snapshotPath,'utf8')).records;}catch(e){if(e.code!=='ENOENT')throw e;}
if(!Array.isArray(before))throw Error('Invalid snapshot: records must be an array');
const quarantinePath=resolve(out,'quarantine.json');
let quarantine=[];
try{quarantine=JSON.parse(await readFile(quarantinePath,'utf8'));}catch(e){if(e.code!=='ENOENT')throw e;}
if(!Array.isArray(quarantine))throw Error('Invalid quarantine file');
if(quarantine.some(r=>r.siteStop))throw Error('STOP: site is paused, manual resolution required before another run');
const saveQuarantine=()=>writeFile(quarantinePath,JSON.stringify(quarantine,null,2)+'\n');
const request=url=>fetchWithQuarantine(url,quarantine,saveQuarantine);
const blocked=new Set(quarantine.map(r=>r.sourceUrl));
const startedAt=new Date().toISOString(),updated=new Map(before.map(r=>[r.sourceUrl,r])),errors=[];
const sleep=()=>new Promise(r=>setTimeout(r,delay));
const replayFile=value('--replay',null);
const replay=replayFile?JSON.parse(await readFile(resolve(replayFile),'utf8')):null;
let urls;
if(replay){urls=replay.map(p=>p.sourceUrl);}else{
 const robots=await request('https://happykamper.io/robots.txt');checkRobots(robots);await sleep();
 const regionSlugs=['jakarta','tangerang','tangerang-selatan','bekasi','depok','bogor'];
 const found=new Set();
 for(const city of regionSlugs){await sleep();for(const u of regionalUrls(await request(`https://happykamper.io/en/activities/in/${city}`)))found.add(u);}
 urls=[...found].sort();
}
if(!urls.length)throw Error('STOP: regional pages have no leaf activities');
const batch=selectBatch(urls.filter(u=>!blocked.has(u)),before,limit,args.includes('--refresh'));
let fetched=0;
for(const url of batch){
 if(!replay)await sleep();
 try{const body=replay?replay.find(p=>p.sourceUrl===url).html:await request(url);const record=parseActivity(body,url,new Date().toISOString());updated.set(url,record);fetched++;}
 catch(e){
  const reason=String(e.message).slice(0,500);
  const siteStop=/HTTP (403|429)\b|site challenge/i.test(reason);
  errors.push({url,error:reason});if(!quarantine.some(q=>q.sourceUrl===url))quarantine.push({sourceUrl:url,reason,siteStop,at:new Date().toISOString()});
  await writeFile(quarantinePath,JSON.stringify(quarantine,null,2)+'\n');console.error(reason);
  if(siteStop)break;
  continue;
 }
 // Checkpoint each completed public page. No raw HTML or reviewers are stored.
 const temp=snapshotPath+'.tmp';await writeFile(temp,JSON.stringify({schemaVersion:1,records:[...updated.values()]},null,2)+'\n');await rename(temp,snapshotPath);
}
const records=[...updated.values()].sort((a,b)=>a.sourceUrl.localeCompare(b.sourceUrl));
const inDiscovery=new Set(urls);
const triaged=records.filter(r=>inDiscovery.has(r.sourceUrl)).map(r=>({...r,triage:triage(r)}));
const groups=clusterActivities(triaged.filter(r=>r.triage.status==='needs-review'));
const observed=new Set(urls);
const summary={mode:replay?'offline-replay':'live-public',startedAt,finishedAt:new Date().toISOString(),discoveredRegionActivityUrls:urls.length,selected:batch.length,fetched,totalCachedActivities:records.length,regionActivityCandidates:triaged.filter(r=>r.regionCandidate).length,reviewLocationGroups:groups.length,excludedActivities:triaged.filter(r=>r.triage.status==='excluded').length,reviewGroupsWithPrices:groups.filter(g=>g.activities.some(u=>updated.get(u).price)).length,strongBranchesAdded:0,publishedBranchesAdded:0,remainingUnharvested:urls.filter(u=>!updated.has(u)&&!blocked.has(u)&&!quarantine.some(q=>q.sourceUrl===u)).length,quarantinedUrls:quarantine.length,errors};
const diff=diffSnapshots(before,records);
// A missing regional URL is NOT a closure or deletion. Keep it for manual review.
const report={summary,diff,missingFromDiscovery:before.filter(r=>!observed.has(r.sourceUrl)).map(r=>r.sourceUrl),candidates:groups,triage:triaged.map(r=>({sourceUrl:r.sourceUrl,...r.triage}))};
await writeFile(resolve(out,'report.json'),JSON.stringify(report,null,2)+'\n');
console.log(JSON.stringify(summary,null,2));
if(errors.length)process.exitCode=1;
