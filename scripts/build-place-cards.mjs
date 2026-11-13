import { build } from 'esbuild';
import sharp from 'sharp';
import { mkdir, rm, writeFile } from 'node:fs/promises';
import { pathToFileURL } from 'node:url';
const cache='.next/place-card-data.mjs';
await mkdir('.next',{recursive:true});
await build({stdin:{contents:"import {VENUES} from './src/data/venues'; import {placePageInventory} from './src/utils/placePages';import{placeCardFacts}from'./src/utils/placeCard';export default placePageInventory(VENUES).map(v=>({v,f:placeCardFacts(v)}));",resolveDir:process.cwd(),loader:'ts'},bundle:true,platform:'node',format:'esm',outfile:cache});
const {default:places}=await import(pathToFileURL(process.cwd()+'/'+cache));
await rm('public/place-cards',{recursive:true,force:true});
const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&apos;'}[c]));
function lines(s,max){const out=[];for(const w of s.split(/\s+/)){if(!out.length||out.at(-1).length+w.length+1>max)out.push(w);else out[out.length-1]+=' '+w;}return out;}
// Same font stack and tokens as globals.css. Plus Jakarta Sans is currently
// unbundled in the app; use its same system sans fallback, not a new face.
const font="'Plus Jakarta Sans',-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Arial,sans-serif";
const text=(s,x,y,size=36,color='#221d18',weight='normal',anchor='start')=>`<text fill="${color}" x="${x}" y="${y}" font-family="${font}" font-size="${size}" font-weight="${weight}" text-anchor="${anchor}">${esc(s)}</text>`;
const dates=(date,lang)=>new Intl.DateTimeFormat(lang==='id'?'id-ID':'en-GB',{day:'numeric',month:'short',year:'numeric',timeZone:'UTC'}).format(new Date(date+'T00:00:00Z'));
const horse=`<g transform="translate(56 37) scale(1.8)" fill="none" stroke="white" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M3.5 17.5c5.667 4.667 11.333 4.667 17 0"/><path d="M19 18.5l-2 -8.5l1 -2l2 1l1.5 -1.5l-2.5 -4.5c-5.052 .218 -5.99 3.133 -7 6h-6a3 3 0 0 0 -3 3"/><path d="M5 18.5l2 -9.5"/><path d="M8 20l2 -5h4l2 5"/></g>`;
const shield=`<g transform="translate(68 280) scale(1.35)" fill="none" stroke="#1a7a4a" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-11V5l-8-3-8 3v6c0 7 8 11 8 11"/><path d="m9 12 2 2 4-4"/></g>`;
const star=`<path d="m12 3 2.8 5.7 6.2.9-4.5 4.4 1.1 6.2-5.6-3-5.6 3 1.1-6.2L3 9.6l6.2-.9z" transform="translate(68 510) scale(1.3)" fill="#f59e0b" stroke="#f59e0b"/>`;
const audit=[];
for(const lang of ['en','id']){
 await mkdir(`public/place-cards/${lang}`,{recursive:true});
 for(const {v,f} of places){
  const t=(en,id)=>lang==='id'?id:en;
  const name=[v.chain,v.branchName].filter(Boolean).join(' '),rows=lines(name,34);
  if(rows.length>3)throw new Error('Card name needs layout review: '+name);
  const region=/unclassified/i.test(v.city)?'':v.city;
  // Reuse the map sheet: rocking-horse header chip, white age rows with
  // green Verified pills, and its compact white Branch reviews block.
  let body=`<rect width="1200" height="630" fill="#f6f2ec"/><rect x="48" y="28" width="60" height="60" rx="20" fill="#1a7a4a"/>${horse}${text('Map Explora',124,69,36,'#221d18','bold')}<rect x="354" y="35" width="146" height="46" rx="23" fill="#e3f2e8"/>${text('Under 5',427,67,30,'#14532d','bold','middle')}${text(region,1152,67,32,'#6d675f','normal','end')}`;
  const dense=f.classes.length>1;
  const titleSize=dense?54:60,titleStep=dense?58:64;
  const top=148+(rows.length-1)*titleStep+26;
  body+=rows.map((s,i)=>text(s,48,148+i*titleStep,titleSize,'#221d18','bold')).join('');
  let slots=0;
  const shown=[];
  const candidates=f.classes.length?f.classes:f.branchAge?[{name:t('Branch statement','Usia menurut cabang'),...f.branchAge,branch:true}]:[];
  for(const c of candidates){const nameRows=lines(c.name,candidates.length===1?46:31);if(slots+nameRows.length>3)break;shown.push({...c,nameRows,slot:slots});slots+=nameRows.length;}
  const spacious=shown.length<=1;
  const height=spacious?196:80+slots*50;
  body+=`<rect x="48" y="${top}" width="1104" height="${height}" rx="24" fill="#fff" stroke="#e7e0d4" stroke-width="2"/><g transform="translate(0 ${top-264})">${shield}</g>${text(t('Classes here by age','Kelas di sini menurut usia'),114,top+43,36,'#221d18','bold')}`;
  if(f.classes.length>shown.length)body+=text(t(`+${f.classes.length-shown.length} on the page`,`+${f.classes.length-shown.length} di halaman`),1124,top+43,28,'#6d675f','normal','end');
  if(shown.length){
   shown.forEach(c=>{
    const y=top+94+c.slot*50;
    if(spacious){
     body+=c.nameRows.map((r,j)=>text(r,72,y+j*46,44)).join('');
     const ageY=top+height-26;
     body+=text(t(`${c.min} to ${c.max} months`,`${c.min} sampai ${c.max} bulan`),72,ageY,44,'#6d675f');
     body+=`<rect x="902" y="${ageY-36}" width="226" height="48" rx="24" fill="#e3f2e8"/>${text(t('Verified','Terverifikasi'),1015,ageY-2,34,'#14532d','bold','middle')}`;
    }else{
     body+=c.nameRows.map((r,j)=>text(r,72,y+j*50,38)).join('');
     body+=text(t(`${c.min} to ${c.max} mo`,`${c.min} s.d. ${c.max} bln`),918,y,38,'#6d675f','normal','end');
     body+=`<rect x="944" y="${y-33}" width="184" height="44" rx="22" fill="#e3f2e8"/>${text(t('Verified','Terverifikasi'),1036,y-2,28,'#14532d','bold','middle')}`;
    }
   });
  }else{
   body+=text(t('Class ages not verified yet','Usia kelas belum terverifikasi'),72,top+105,46,'#6d675f');
   body+=text(t('Ask the provider before visiting','Tanyakan ke penyedia sebelum datang'),72,top+162,40,'#6d675f');
  }
  const reviewTop=top+height+16,reviewHeight=100;
  body+=`<rect x="48" y="${reviewTop}" width="1104" height="${reviewHeight}" rx="24" fill="#fff" stroke="#e7e0d4" stroke-width="2"/><g transform="translate(0 ${reviewTop-496})">${star}</g>${text(t('Branch reviews','Ulasan cabang'),114,reviewTop+42,36,'#221d18','bold')}`;
  if(f.rating){
   body+=text(`${f.rating.rating.toFixed(1)} (${f.rating.count})`,1124,reviewTop+42,40,'#221d18','bold','end');
   body+=text(`Google Maps · ${dates(f.rating.date,lang)}`,114,reviewTop+80,32,'#6d675f');
  }else body+=text(t('No rating recorded','Belum ada catatan rating'),114,reviewTop+80,34,'#6d675f');
  const note=f.notice==='unknown'?t('Confirm class ages with the provider.','Konfirmasi usia kelas ke penyedia.'):f.notice==='conflict'?t('Other class age sources disagree. Ask the provider.','Sumber usia kelas lain berbeda. Tanyakan ke penyedia.'):f.notice==='uncertain'?t('Other class ages need confirmation.','Usia kelas lain masih perlu konfirmasi.'):t('Ages from provider sources. Confirm before visiting.','Usia sesuai sumber. Konfirmasi sebelum datang.');
  const footerY=reviewTop+reviewHeight+38;
  if(footerY>620)throw new Error('Card exceeds height: '+v.id);
  body+=text(note,48,footerY,32,f.uncertain?'#92400e':'#6d675f');
  const path=`public/place-cards/${lang}/${v.id}.png`;
  const png=await sharp(Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630">${body}</svg>`)).png({compressionLevel:9}).toBuffer();
  if(png.length>=300000)throw new Error('Card exceeds 300KB: '+path);
  await writeFile(path,png);audit.push({id:v.id,lang,bytes:png.length,...f});
 }
}
await writeFile('.next/place-card-audit.json',JSON.stringify(audit,null,2));
await rm(cache);console.log(`Built ${places.length*2} place share images (1200x630), max ${Math.max(...audit.map(x=>x.bytes))} bytes`);
