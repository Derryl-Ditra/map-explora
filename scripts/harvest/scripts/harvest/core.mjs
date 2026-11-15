import {createHash} from 'node:crypto';
export function assertSourceUrl(raw){
 const u=new URL(raw);
 if(u.protocol!=='https:'||u.hostname!=='happykamper.io'||u.username||u.password||u.port)throw Error('STOP: source host not allowed');
 return u;
}
export function leafUrls(xml){
 return [...new Set([...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m=>m[1]).filter(u=>/^https:\/\/happykamper\.io\/en\/activities\/(?!in$|for$)[^/?#]+$/.test(u)))].sort();
}
const text=v=>typeof v==='string'?v.replace(/<[^>]*>/g,' ').replace(/\s+/g,' ').trim():'';
const number=v=>!['string','number'].includes(typeof v)||(typeof v==='string'&&!v.trim())?null:Number.isFinite(Number(v))?Number(v):null;
const hasType=(n,type)=>[n?.['@type']].flat().includes(type);
function flatten(n){return Array.isArray(n)?n.flatMap(flatten):n&&typeof n==='object'?[n,...flatten(n['@graph']??[])]:[];}
export function parseActivity(html,sourceUrl,retrievedAt){
 assertSourceUrl(sourceUrl);
 const nodes=[...html.matchAll(/<script\b[^>]*type\s*=\s*["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)].flatMap(m=>flatten(JSON.parse(m[1])));
 const service=nodes.find(n=>hasType(n,'Service')),business=nodes.find(n=>hasType(n,'LocalBusiness'));
 if(!service||!business)throw Error('Missing Service or LocalBusiness JSON-LD');
 const lat=number(business.geo?.latitude),lng=number(business.geo?.longitude);
 const geo=lat!==null&&lng!==null&&Math.abs(lat)<=90&&Math.abs(lng)<=180?{lat,lng}:null;
 const offer=service.offers;const low=number(offer?.lowPrice??offer?.price),high=number(offer?.highPrice??offer?.price);
 const price=offer?.priceCurrency==='IDR'&&low!==null&&low>=0&&(high===null||high>=low)?{low,high,currency:'IDR',scope:'partner-listed activity offer; inclusions need review'}:null;
 const faq=nodes.find(n=>hasType(n,'FAQPage'))?.mainEntity?.find(q=>/\bages?\b|usia/i.test(q.name??''));
 const category=nodes.find(n=>hasType(n,'BreadcrumbList'))?.itemListElement?.filter(x=>x.position===3).map(x=>text(x.name))??[];
 return {sourceUrl,retrievedAt,sourceDate:null,evidenceTier:'partner-listed-unverified',publishable:false,
  activity:text(service.name),provider:text(business.name||service.provider?.name),address:text(business.address?.streetAddress),locality:text(business.address?.addressLocality),geo,
  regionCandidate:!!geo&&lat>=-6.95&&lat<=-5.85&&lng>=106.3&&lng<=107.35,category,
  terms:text(service.description),price,ageClaim:faq?{text:text(faq.acceptedAnswer?.text),verification:'unverified-template',scope:'activity template; not provider confirmation'}:null,
  requiredChecks:['branch identity and Maps pin','operating and closure evidence','non-formal category','age and offering scope','red flags','price inclusions and freshness']};
}
export function contentHash(record){
 const semantic=Object.fromEntries(Object.entries(record).filter(([k])=>!['retrievedAt','sourceDate','hash'].includes(k)));
 return createHash('sha256').update(JSON.stringify(semantic)).digest('hex');
}
export function clusterActivities(records){
 const groups=new Map();
 for(const r of records){
  const key=r.geo&&r.provider?`${r.provider.toLowerCase().replace(/\s+/g,' ').trim()}|${r.geo.lat.toFixed(4)},${r.geo.lng.toFixed(4)}`:r.sourceUrl;
  if(!groups.has(key))groups.set(key,{key,provider:r.provider,address:r.address,geo:r.geo,evidenceTier:r.evidenceTier,publishable:false,activities:[]});
  groups.get(key).activities.push(r.sourceUrl);
 }
 return [...groups.values()].sort((a,b)=>a.key.localeCompare(b.key));
}
export function diffSnapshots(before,after){
 const old=new Map(before.map(r=>[r.sourceUrl,contentHash(r)])),fresh=new Map(after.map(r=>[r.sourceUrl,contentHash(r)]));
 return {added:[...fresh.keys()].filter(k=>!old.has(k)).sort(),changed:[...fresh.keys()].filter(k=>old.has(k)&&old.get(k)!==fresh.get(k)).sort(),notObserved:[...old.keys()].filter(k=>!fresh.has(k)).sort()};
}
export async function fetchPublic(url,fetcher=fetch){
 assertSourceUrl(url);
 const response=await fetcher(url,{redirect:'manual',signal:AbortSignal.timeout(30000),headers:{'User-Agent':'MapExploraResearch/0.1 (public listing review; no booking)'}});
 if(!response.ok)throw Error(`STOP: HTTP ${response.status} ${url}`);
 if(Number(response.headers.get('content-length'))>8_000_000)throw Error('STOP: response too large');
 const reader=response.body.getReader();let bytes=0;const chunks=[];
 try{for(;;){const {done,value}=await reader.read();if(done)break;bytes+=value.length;if(bytes>8_000_000)throw Error('STOP: response too large');chunks.push(value);}}finally{await reader.cancel();}
 const body=Buffer.concat(chunks).toString('utf8');
 if(/verify you are human|access denied|datadome|<title>just a moment|captcha challenge/i.test(body))throw Error('STOP: site challenge');
 return body;
}
export function selectBatch(urls,records,limit,refresh){
 if(!Number.isInteger(limit)||limit<1||limit>2500)throw Error('limit must be 1..2500');
 const seen=new Set(records.map(r=>r.sourceUrl));
 return urls.filter(u=>refresh||!seen.has(u)).sort((a,b)=>createHash('sha256').update(a).digest('hex').localeCompare(createHash('sha256').update(b).digest('hex'))).slice(0,limit);
}
export function checkRobots(body){
 // Deliberately conservative: any non-empty restriction needs human review.
 if(!/user-agent:\s*\*/i.test(body)||/^\s*disallow:\s*[^\s#]/im.test(body))throw Error('STOP: robots restrictions need manual review');
}
export function triage(r){
 const s=[r.activity,r.provider,r.address,...(r.category??[])].join(' '),reasons=[];
 if(!r.regionCandidate||/\bkarawang|bandung|purwakarta|sukabumi|cianjur\b/i.test(s))reasons.push('outside target region');
 if(/free activit|rptra|government|pemerintah/i.test(s))reasons.push('government/free-space scope requires exclusion');
 if(/physiotherap|\btherapy\b|\bterapi\b|body massage|baby spa/i.test(s))reasons.push('care or therapy, not a non-formal class');
 if(/daycare|day care|full daycare|fullday|full day care/i.test(r.activity??''))reasons.push('daycare-only package, not a class');
 return {status:reasons.length?'excluded':'needs-review',reasons:reasons.length?reasons:['verify under-5 age, category, branch identity, government link and closure before promotion']};
}
