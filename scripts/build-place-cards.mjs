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
const text=(s,x,y,size=40,color='#203e36',weight='normal',anchor='start')=>`<text fill="${color}" x="${x}" y="${y}" font-family="DejaVu Sans,sans-serif" font-size="${size}" font-weight="${weight}" text-anchor="${anchor}">${esc(s)}</text>`;
const dates=(date,lang)=>new Intl.DateTimeFormat(lang==='id'?'id-ID':'en-GB',{day:'numeric',month:'short',year:'numeric',timeZone:'UTC'}).format(new Date(date+'T00:00:00Z'));
const audit=[];
for(const lang of ['en','id']){
 await mkdir(`public/place-cards/${lang}`,{recursive:true});
 for(const {v,f} of places){
  const t=(en,id)=>lang==='id'?id:en;
  const name=[v.chain,v.branchName].filter(Boolean).join(' '),rows=lines(name,37);
  if(rows.length>3)throw new Error('Card name needs layout review: '+name);
  const region=/unclassified/i.test(v.city)?'':v.city;
  let body=`<rect width="1200" height="630" fill="#f6f3ec"/><rect width="1200" height="12" fill="#286249"/><circle cx="65" cy="55" r="15" fill="#286249"/><circle cx="65" cy="52" r="5" fill="#f6f3ec"/><path d="M57 64 L65 77 L73 64" fill="#286249"/>${text('MAP EXPLORA',96,65,25,'#286249','bold')}${text(region,1140,65,28,'#4c675c','normal','end')}`;
  body+=rows.map((s,i)=>text(s,54,136+i*48,47,'#193d32','bold')).join('');
  body+=`<rect x="40" y="260" width="758" height="285" rx="22" fill="#fff" stroke="#e0e5dc"/><rect x="820" y="260" width="340" height="285" rx="22" fill="#e7eee3"/>`;
  if(f.classes.length){
   body+=text(t('CLASS PREVIEW','CUPLIKAN KELAS'),66,302,29,'#58715c','bold');
   const first=f.classes[0],classRows=lines(first.name,29);
   if(classRows.length>2)throw new Error('Class name needs layout review: '+v.id);
   body+=classRows.map((s,i)=>text(s,66,354+i*44,40,'#263e33','bold')).join('');
   body+=text(t(`${first.min} to ${first.max} months`,`${first.min} sampai ${first.max} bulan`),66,461,52,'#286249','bold');
   body+=text(f.classes.length>1?t(`+ ${f.classes.length-1} other classes on the page`,`+ ${f.classes.length-1} kelas lain di halaman`):t('Class details on the page','Rincian kelas di halaman'),66,516,36,'#58715c');
  }else{
   body+=text(t('CLASS AGES','USIA KELAS'),66,302,29,'#58715c','bold');
   const unknown=lines(t('Class ages not verified','Usia kelas belum terverifikasi'),25);
   body+=unknown.map((s,i)=>text(s,66,369+i*50,44,'#536652','bold')).join('');
   body+=text(t('Ask the provider','Tanyakan ke penyedia'),66,516,40,'#48634f');
  }
  if(f.rating){
   body+=text(`${f.rating.rating.toFixed(1)} / 5`,846,351,61,'#234e38','bold');
   body+=text(`${f.rating.count} ${t('reviews','ulasan')}`,846,408,40,'#3c5c47');
   body+=text('Google Maps',846,452,40,'#48634f');
   body+=text(t('Read','Dibaca'),846,484,27,'#5d705e');
   body+=text(dates(f.rating.date,lang),846,526,36,'#5d705e');
  }else{
   body+=text(t('No rating','Belum ada'),846,362,43,'#46604c','bold');
   body+=text(t('recorded','catatan rating'),846,413,38,'#46604c','bold');
   body+=text(t('Not zero','Bukan nilai nol'),846,510,35,'#5d705e');
  }
  const note=f.notice==='unknown'?t('Class ages unverified. Confirm before visiting.','Usia kelas belum terverifikasi. Konfirmasi sebelum datang.'):f.notice==='conflict'?t('Other class age sources disagree. Ask the provider.','Sumber usia kelas lain berbeda. Tanyakan ke penyedia.'):f.notice==='uncertain'?t('Other class ages need confirmation.','Usia kelas lain masih perlu konfirmasi.'):t('Ages from provider sources. Confirm before visiting.','Usia sesuai sumber. Konfirmasi sebelum datang.');
  body+=text(note,54,600,36,f.uncertain?'#88552c':'#536452');
  const path=`public/place-cards/${lang}/${v.id}.png`;
  const png=await sharp(Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630">${body}</svg>`)).png({compressionLevel:9}).toBuffer();
  if(png.length>=300000)throw new Error('Card exceeds 300KB: '+path);
  await writeFile(path,png);audit.push({id:v.id,lang,bytes:png.length,...f});
 }
}
await writeFile('.next/place-card-audit.json',JSON.stringify(audit,null,2));
await rm(cache);console.log(`Built ${places.length*2} place share images (1200x630), max ${Math.max(...audit.map(x=>x.bytes))} bytes`);
