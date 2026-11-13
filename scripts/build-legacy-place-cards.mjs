import { build } from 'esbuild';
import sharp from 'sharp';
import { mkdir, rm } from 'node:fs/promises';
import { pathToFileURL } from 'node:url';
const cache='.next/place-card-data.mjs';
await mkdir('.next',{recursive:true});
await build({stdin:{contents:"import {VENUES} from './src/data/venues'; import {placePageInventory} from './src/utils/placePages'; export default placePageInventory(VENUES);",resolveDir:process.cwd(),loader:'ts'},bundle:true,platform:'node',format:'esm',outfile:cache});
const {default:places}=await import(pathToFileURL(process.cwd()+'/'+cache));
await rm('public/place-cards',{recursive:true,force:true});
const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&apos;'}[c]));
function lines(s,max){const out=[];for(const w of s.split(/\s+/)){if(!out.length||out.at(-1).length+w.length+1>max)out.push(w);else out[out.length-1]+=' '+w;}return out;}
for(const lang of ['en','id']){
 await mkdir(`public/place-cards/${lang}`,{recursive:true});
 for(const v of places){
  const name=[v.chain,v.branchName].filter(Boolean).join(' '),rows=lines(name,34);
  if(rows.length>4)throw new Error('Card name needs layout review: '+name);
  const svg=`<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630"><rect width="1200" height="630" fill="#f6f2ec"/><rect x="40" y="40" width="1120" height="550" rx="26" fill="#edf5ee" stroke="#d7e1d6"/><text x="90" y="110" font-family="DejaVu Sans,sans-serif" font-size="23" fill="#176b42">MAP EXPLORA · ${esc(v.city)}</text>${rows.map((s,i)=>`<text x="90" y="${190+i*60}" font-family="DejaVu Sans,sans-serif" font-size="48" font-weight="bold" fill="#221d18">${esc(s)}</text>`).join('')}<text x="90" y="495" font-family="DejaVu Sans,sans-serif" font-size="25" fill="#4d5a4d">${lang==='id'?'Kelas, usia, biaya dan sumber cabang':'Class ages, recorded prices and branch sources'}</text><text x="90" y="545" font-family="DejaVu Sans,sans-serif" font-size="20" fill="#5f6d5f">${lang==='id'?'Konfirmasi langsung sebelum datang':'Confirm with the provider before visiting'}</text></svg>`;
  await sharp(Buffer.from(svg)).png().toFile(`public/place-cards/${lang}/${v.id}.png`);
 }
}
await rm(cache);console.log(`Built ${places.length*2} place share images (1200x630)`);
