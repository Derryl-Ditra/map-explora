#!/usr/bin/env node
import{readFile,writeFile,mkdir}from'node:fs/promises';import{resolve}from'node:path';import{reviewQueue,queueFingerprint}from'./branch-queue.mjs';
const args=process.argv.slice(2),value=(f,d)=>{const i=args.indexOf(f);return i<0?d:args[i+1]};
for(let i=0;i<args.length;i+=2)if(!['--index','--venues','--decisions','--bindings','--out'].includes(args[i])||!args[i+1])throw Error('Unknown option '+args[i]);
const load=async(p,f)=>p?JSON.parse(await readFile(resolve(p),'utf8')):f;
const index=await load(value('--index','docs/research/capture-index.json'));const venues=value('--venues',null)?await load(value('--venues')):(await (await import('../../tests/loadTs.mjs')).importTs('../src/data/venues.ts')).VENUES;const decisions=await load(value('--decisions','docs/research/capture-decisions.json'),[]);
if(!Array.isArray(index?.records)||!Array.isArray(venues)||!Array.isArray(decisions))throw Error('Invalid index/venues/decisions schema');
const bindings=await load(value('--bindings','docs/research/capture-provider-bindings.json'),[]);if(!Array.isArray(bindings))throw Error('Invalid bindings');
const out=resolve(value('--out','.harvest/review'));if(!out.includes('/.harvest/'))throw Error('--out must be within .harvest');
const result=reviewQueue(index.records,{venues,decisions,bindings});await mkdir(out,{recursive:true});await writeFile(resolve(out,'queue.json'),JSON.stringify(result,null,2)+'\n');
console.log(JSON.stringify({mode:'offline-review-queue',records:result.allRecordsRetained,lanes:Object.fromEntries(Object.entries(result.lanes).map(([k,v])=>[k,v.length])),first12:result.queue.slice(0,12).map(r=>({provider:r.provider,activity:r.activity,url:r.sourceUrl})),fingerprint:queueFingerprint(index.records),networkRequests:0,published:0},null,2));
