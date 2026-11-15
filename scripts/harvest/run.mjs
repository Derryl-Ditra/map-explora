#!/usr/bin/env node
import {readFile,writeFile,mkdir,rename} from 'node:fs/promises';
import {resolve} from 'node:path';
import {parseActivity,leafUrls,clusterActivities,diffSnapshots,fetchPublic,selectBatch,checkRobots,triage} from './core.mjs';
const args=process.argv.slice(2);
const value=(flag,fallback)=>{const i=args.indexOf(flag);return i<0?fallback:args[i+1];};
const allowed=new Set(['--out','--limit','--delay-ms','--refresh','--replay']);
for(let i=0;i<args.length;i++){if(!allowed.has(args[i]))throw Error(`Unknown option: ${args[i]}`);if(args[i]!=='--refresh')i++;}
const out=resolve(value('--out','.harvest/happykamper'));
// Candidate snapshots must never write into application data or checked-in source.
if(!out.includes('/.harvest/'))throw Error('--out must be within a .harvest directory');
const delay=Number(value('--delay-ms','1000')),limit=Number(value('--limit','60'));
if(!Number.isFinite(delay)||delay<1000)throw Error('minimum delay is 1000ms');
selectBatch([],[],limit,false);
await mkdir(out,{recursive:true});
const snapshotPath=resolve(out,'snapshot.json');
let before=[];
try{before=JSON.parse(await readFile(snapshotPath,'utf8')).records;}catch(e){if(e.code!=='ENOENT')throw e;}
if(!Array.isArray(before))throw Error('Invalid snapshot: records must be an array');
const startedAt=new Date().toISOString(),updated=new Map(before.map(r=>[r.sourceUrl,r])),errors=[];
const sleep=()=>new Promise(r=>setTimeout(r,delay));
const replayFile=value('--replay',null);
const replay=replayFile?JSON.parse(await readFile(resolve(replayFile),'utf8')):null;
let urls;
if(replay){urls=replay.map(p=>p.sourceUrl);}else{
 const robots=await fetchPublic('https://happykamper.io/robots.txt');checkRobots(robots);await sleep();
 urls=leafUrls(await fetchPublic('https://happykamper.io/sitemap.xml'));
}
if(!urls.length)throw Error('STOP: sitemap has no leaf activities');
const batch=selectBatch(urls,before,limit,args.includes('--refresh'));
let fetched=0;
for(const url of batch){
 if(!replay)await sleep();
 try{const body=replay?replay.find(p=>p.sourceUrl===url).html:await fetchPublic(url);const record=parseActivity(body,url,new Date().toISOString());updated.set(url,record);fetched++;}
 catch(e){errors.push({url,error:e.message});console.error(e.message);break;}
 // Checkpoint each completed public page. No raw HTML or reviewers are stored.
 const temp=snapshotPath+'.tmp';await writeFile(temp,JSON.stringify({schemaVersion:1,records:[...updated.values()]},null,2)+'\n');await rename(temp,snapshotPath);
}
const records=[...updated.values()].sort((a,b)=>a.sourceUrl.localeCompare(b.sourceUrl));
const triaged=records.map(r=>({...r,triage:triage(r)}));
const groups=clusterActivities(triaged.filter(r=>r.triage.status==='needs-review'));
const observed=new Set(urls);
const summary={mode:replay?'offline-replay':'live-public',startedAt,finishedAt:new Date().toISOString(),sitemapLeafActivities:urls.length,selected:batch.length,fetched,totalCachedActivities:records.length,regionActivityCandidates:records.filter(r=>r.regionCandidate).length,reviewLocationGroups:groups.length,excludedActivities:triaged.filter(r=>r.triage.status==='excluded').length,reviewGroupsWithPrices:groups.filter(g=>g.activities.some(u=>updated.get(u).price)).length,strongBranchesAdded:0,publishedBranchesAdded:0,remainingUnharvested:urls.filter(u=>!updated.has(u)).length,errors};
const diff=diffSnapshots(before,records);
// A missing sitemap URL is NOT a closure or deletion. Keep it for manual review.
const report={summary,diff,missingFromSitemap:before.filter(r=>!observed.has(r.sourceUrl)).map(r=>r.sourceUrl),candidates:groups,triage:triaged.map(r=>({sourceUrl:r.sourceUrl,...r.triage}))};
await writeFile(resolve(out,'report.json'),JSON.stringify(report,null,2)+'\n');
console.log(JSON.stringify(summary,null,2));
if(errors.length)process.exitCode=1;
