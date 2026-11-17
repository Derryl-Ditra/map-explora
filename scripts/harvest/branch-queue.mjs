// Review prioritisation only. Never promotes a venue or trusts template ages.
import {createHash} from 'node:crypto';
const norm=s=>(s??'').normalize('NFKD').toLowerCase().replace(/[^a-z0-9]+/g,' ').trim();
export function titleSignals(record){
 const name=record.activity??'',all=`${record.provider} ${name}`;
 const excluded=/free activit|rptra|government|pemerintah|\btherapy\b|\bterapi\b|physiotherap|\bklinik\b|assessment|asessment|asesmen|massage|\bspa\b|daycare|day care/i.test(all);
 const age=/\b[0-4]\s*[-–]\s*\d+(?:\s*(?:tahun|years?|y\.?o|bulan|months?|m)\b)/i.test(name)||/baby|toddler|bayi|balita/i.test(name);
 const classLead=/sensory|sensori|stimulasi|stimulation|playdate/i.test(name);
 const older=/\b(?:[6-9]|1[0-9])\s*[-–]\s*\d+\s*(?:tahun|years?|y\.?o)\b|level (?:sd|smp|sma)|junior koders|python|website|javascript/i.test(name);
 return {excluded,age,classLead,older,score:excluded||older?-1:age?100:classLead?60:0};
}
export function reviewQueue(records,{venues=[],decisions=[],bindings=[]}={}){
 const history=new Map(decisions.map(d=>[d.sourceUrl,d]));const seen=new Set();const lanes={priority:[],exploration:[],existingBrand:[],held:[],reviewed:[],excluded:[]};
 for(const r of records){
  const decision=history.get(r.sourceUrl),signals=titleSignals(r);let lane;
  if(decision?.state==='hold')lane='held';else if(decision?.state==='reviewed')lane='reviewed';else if(signals.excluded||signals.older)lane='excluded';
  else if(venues.some(v=>v.chain&&(norm(v.chain)===norm(r.provider)||bindings.some(b=>norm(b.provider)===norm(r.provider)&&norm(b.chain)===norm(v.chain)))))lane='existingBrand';
  else lane=signals.score>0?'priority':'exploration';
  lanes[lane].push({...r,priority:signals.score,selectionEvidence:'title lead only; verify class body and branch before publication',decision:decision??null,publishable:false});
 }
 for(const a of Object.values(lanes))a.sort((a,b)=>b.priority-a.priority||a.sourceUrl.localeCompare(b.sourceUrl));
 // Same provider is a scheduling bucket, NOT a deduplicated branch identity.
 // Preserve all locations; first pass chooses one activity/provider to avoid repeated work.
 const queue=[];
 for(const r of [...lanes.priority,...lanes.exploration,...lanes.existingBrand]){
  const key=norm(r.provider)||r.sourceUrl;if(!seen.has(key)){seen.add(key);queue.push(r);}
 }
 return {lanes,queue,allRecordsRetained:records.length};
}
export function activityAgeExcerpts(description){
 const paragraphs=(description??'').split(/[\n.!?]+/).map(s=>s.replace(/<[^>]*>/g,' ').replace(/\s+/g,' ').trim());
 return paragraphs.filter(s=>/(?:usia|umur|aged?|for (?:babies|toddlers|children))[^.!?]{0,100}\d[^.!?]{0,40}(?:bulan|tahun|months?|years?)|\d\s*[-–]\s*\d\s*(?:bulan|tahun|months?|years?)\b/i.test(s)).slice(0,8).map(text=>({text,scope:'activity-description',verification:'partner-listed-unconfirmed'}));
}
export function queueFingerprint(records){return createHash('sha256').update(JSON.stringify(records.map(r=>r.sourceUrl))).digest('hex');}
