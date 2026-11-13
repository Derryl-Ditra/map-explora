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
const text=(s,x,y,size=24,color='#203e36',weight='normal',anchor='start')=>`<text x="${x}" y="${y}" font-family="DejaVu Sans,sans-serif" font-size="${size}" font-weight="${weight}" text-anchor="${anchor}">${esc(s)}</text>`.replace('<text ',`<text fill="${color}" `);
const audit=[];
for(const lang of ['en','id']){
 await mkdir(`public/place-cards/${lang}`,{recursive:true});
 for(const {v,f} of places){
  const t=(en,id)=>lang==='id'?id:en;
  const name=[v.chain,v.branchName].filter(Boolean).join(' '),rows=lines(name,37);
  if(rows.length>3)throw new Error('Card name needs layout review: '+name);
  let body=`<rect width="1200" height="630" fill="#f6f3ec"/><rect width="1200" height="12" fill="#286249"/><circle cx="65" cy="55" r="15" fill="#286249"/><circle cx="65" cy="52" r="5" fill="#f6f3ec"/><path d="M57 64 L65 77 L73 64" fill="#286249"/>${text('MAP EXPLORA',96,65,25,'#286249','bold')}${text(v.city,1140,65,22,'#4c675c','normal','end')}`;
  body+=rows.map((s,i)=>text(s,54,136+i*48,47,'#193d32','bold')).join('');
  body+=`<rect x="40" y="275" width="762" height="245" rx="22" fill="#fff" stroke="#e0e5dc"/><rect x="824" y="275" width="336" height="245" rx="22" fill="#e7eee3"/>`;
  body+=text(t('CLASSES & AGES','KELAS & USIA'),66,309,19,'#58715c','bold');
  if(f.classes.length){
   const shown=f.classes.slice(0,f.classes.length>4?3:4);
   shown.forEach((p,i)=>{
    const short=lines(p.name||t('Branch age range','Rentang usia cabang'),44);
    if(short.length>1)throw new Error('Class name needs layout review: '+v.id+' / '+p.name);
    body+=text(short[0],66,351+i*44,p.name.length>35?22:26,'#263e33','bold');
    body+=text(`${p.min}-${p.max} ${t('mo','bln')}`,776,351+i*44,29,'#286249','bold','end');
   });
   if(f.classes.length>4)body+=text(t(`+ ${f.classes.length-3} more classes on the page`,`+ ${f.classes.length-3} kelas lain di halaman tempat`),66,483,22,'#58715c');
  }else{
   const empty=lines(t('Class ages not verified for this branch yet.','Usia kelas di cabang ini belum terverifikasi.'),41);
   body+=empty.map((s,i)=>text(s,66,363+i*36,25,'#68736a')).join('');
   body+=text(t('Ask the provider which class fits.','Tanyakan kelas yang sesuai ke penyedia.'),66,459,22,'#48634f');
  }
  if(f.rating){
   body+=text(`${f.rating.rating.toFixed(1)} / 5`,850,354,56,'#234e38','bold');
   body+=text(`${f.rating.count} ${t('reviews','ulasan')}`,850,396,24,'#3c5c47');
   body+=text(f.rating.source,850,444,21,'#48634f');
   body+=text(`${t('Read','Dibaca')} ${f.rating.date}`,850,482,19,'#5d705e');
  }else{
   body+=text(t('No rating','Belum ada'),850,357,31,'#46604c','bold');
   body+=text(t('recorded','catatan rating'),850,397,29,'#46604c','bold');
   body+=text(t('Not a zero score','Bukan nilai nol'),850,471,20,'#5d705e');
  }
  const note=f.conflict?t('Other classes: age sources disagree. Ask the provider.','Kelas lain: sumber usia berbeda. Tanyakan ke penyedia.'):f.uncertain?t('Other class ages still need confirmation.','Usia kelas lainnya masih perlu dikonfirmasi.'):t('Age ranges from provider sources. Confirm exact limits.','Usia dari sumber penyedia. Tanyakan batas usia tepatnya.');
  body+=text(note,54,557,22,f.uncertain?'#88552c':'#536452');
  body+=text(t('Check classes, sources and fees on the place page','Lihat kelas, sumber dan biaya di halaman tempat'),54,599,21,'#687565');
  body+=text(t('Confirm before visiting','Konfirmasi sebelum datang'),1140,599,18,'#687565','normal','end');
  const path=`public/place-cards/${lang}/${v.id}.png`;
  const png=await sharp(Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630">${body}</svg>`)).png({compressionLevel:9}).toBuffer();
  if(png.length>=300000)throw new Error('Card exceeds 300KB: '+path);
  await writeFile(path,png);audit.push({id:v.id,lang,bytes:png.length,...f});
 }
}
await writeFile('.next/place-card-audit.json',JSON.stringify(audit,null,2));
await rm(cache);console.log(`Built ${places.length*2} place share images (1200x630), max ${Math.max(...audit.map(x=>x.bytes))} bytes`);
