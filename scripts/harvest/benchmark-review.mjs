#!/usr/bin/env node
import{readFileSync}from'node:fs';
const index=JSON.parse(readFileSync('docs/research/capture-index.json')).records;const labels=JSON.parse(readFileSync('docs/research/capture-benchmark-labels.json'));const cache=JSON.parse(readFileSync('docs/research/capture-snapshot.json')).records;
// Frozen measured cohorts, not today's live work queue. Later dispositions must advance that queue.
const cohort=key=>labels.filter(r=>Number.isInteger(r[key])).sort((a,b)=>a[key]-b[key]).map(r=>r.sourceUrl);
const before=cohort('beforeOrder'),after=cohort('afterOrder');if(before.length!==12||after.length!==12)throw Error('Invalid frozen benchmark cohorts');const byUrl=new Map(labels.map(r=>[r.sourceUrl,r]));
for(const url of [...before,...after])if(!byUrl.has(url))throw Error('Unlabelled benchmark row '+url);
const score=urls=>({leaves:urls.length,distinctProviders:new Set(urls.map(u=>index.find(r=>r.sourceUrl===u).provider)).size,under5ClassDescriptionPackets:urls.filter(u=>byUrl.get(u).verdict==='branch-check-ready').length,alreadyCached:urls.filter(u=>cache.some(r=>r.sourceUrl===u)).length});
console.log(JSON.stringify({before:score(before),after:score(after),completedApplicationVenues:0,meaning:'Packets have a partner class description and location, not verified operation or eligibility. Publication gates unchanged.',sample:'Same218-source corpus, fixed first12 per strategy. Human labels, not a general yield guarantee.'},null,2));
