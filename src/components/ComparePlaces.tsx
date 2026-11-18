'use client';
import {useEffect,useState} from 'react';
import Link from 'next/link';
import type {Venue} from '@/types/venue';
import {comparisonPath,comparisonSelection} from '@/utils/comparePlaces';
import {venueName} from '@/utils/discovery';
import {placePath,placeMapUrl} from '@/utils/placePages';
import {publicLocation} from '@/utils/publicLocation';
import {publicCaution,publicProgramNote} from '@/utils/placeLanguage';
import {isVerifiedAgeClaim,verifiedPrograms} from '@/utils/ageMatch';
import RecordedFees from './RecordedFees';
import ReviewSnapshot from './ReviewSnapshot';
import './compare-places.css';

export default function ComparePlaces({venues,lang}:{venues:Venue[];lang:'en'|'id'}) {
 const t=(en:string,id:string)=>lang==='id'?id:en;
 const [selected,setSelected]=useState<[string,string]>(['','']);
 useEffect(()=>{const load=()=>{const q=new URLSearchParams(window.location.search);setSelected(comparisonSelection(venues,q.get('a'),q.get('b')));};const tick=requestAnimationFrame(load);window.addEventListener('popstate',load);return()=>{cancelAnimationFrame(tick);window.removeEventListener('popstate',load);};},[venues]);
 const pick=(index:number,id:string)=>{const next:[string,string]=[...selected];next[index]=id;if(id&&next[1-index]===id)next[1-index]='';setSelected(next);const u=new URL(location.href);u.search='';if(next[0])u.searchParams.set('a',next[0]);if(next[1])u.searchParams.set('b',next[1]);history.replaceState(null,'',u);};
 const pair=selected.map(id=>venues.find(v=>v.id===id));
 const ready=pair.every(Boolean);
 const rows=[
  {key:'ages',title:t('Classes and ages','Kelas dan usia'),render:(v:Venue)=>{const ps=verifiedPrograms(v);return <>{ps.length?ps.map((p,i)=><div className="compare-program" key={i}><strong>{p.name}</strong><p>{p.age.minMonths}-{p.age.maxMonths} {t('months','bulan')}</p>{publicProgramNote(p.note,lang)&&<p>{publicProgramNote(p.note,lang)}</p>}<a href={p.age.providerAgeUrl}>{t('Age source','Sumber usia')}</a><small>{t('Read','Dibaca')} {p.age.sourceCheckedAt}</small></div>):v.branchAge&&isVerifiedAgeClaim(v.branchAge)?<><p>{v.branchAge.minMonths}-{v.branchAge.maxMonths} {t('months (branch range)','bulan (rentang cabang)')}</p><a href={v.branchAge.providerAgeUrl}>{t('Age source','Sumber usia')}</a><small>{t('Read','Dibaca')} {v.branchAge.sourceCheckedAt}</small></>:<p>{t('Class ages not verified. Ask which program fits your child.','Usia kelas belum terverifikasi. Tanyakan program yang sesuai untuk anak Anda.')}</p>}{v.programs.filter(p=>p.offering!=='not-offered'&&!ps.includes(p)).map((p,i)=><div className="compare-program compare-concern" key={'unconfirmed-'+i}><strong>{p.name}</strong><p>{p.age.sourceConflict?t('Age sources disagree. Confirm eligibility.','Sumber usia berbeda. Tanyakan syarat usia.'):t('Program and age need branch confirmation.','Program dan usia perlu dikonfirmasi ke cabang.')}</p>{publicProgramNote(p.note,lang)&&<p>{publicProgramNote(p.note,lang)}</p>}</div>)}<Link href={placePath(v,lang)}>{t('All class details','Semua rincian kelas')}</Link></>;}},
  {key:'fees',title:t('Recorded fees','Biaya yang tercatat'),render:(v:Venue)=><RecordedFees prices={v.priceListings} lang={lang}/>},
  {key:'reviews',title:t('Online reviews','Ulasan daring'),render:(v:Venue)=><ReviewSnapshot venue={v} lang={lang}/>},
  {key:'location',title:t('Location and contact','Lokasi dan kontak'),render:(v:Venue)=>{const l=publicLocation(v,lang);return <><p>{l.address}</p>{l.notice&&<p>{l.notice}</p>}{v.caution&&<p className="compare-concern">{publicCaution(v.caution,lang)}</p>}<p>{v.operatingStatus?.state==='partner-listed'?t('Partner-listed plus Maps evidence.','Tercantum di mitra, dengan bukti Maps.'):t('Listed by the provider.','Tercantum di sumber penyedia.')} {t('Not confirmation it is open today.','Bukan konfirmasi buka hari ini.')}</p><a href={v.operatingStatus?.source||v.sourceUrl}>{t('Branch source','Sumber cabang')}</a><small>{t('Read','Dibaca')} {v.operatingStatus?.checkedAt||v.lastCheckedAt||t('date not recorded','tanggal belum tercatat')}</small><Link href={placePath(v,lang)}>{t('Contact and details','Kontak dan rincian')}</Link><a href={placeMapUrl(v,lang)}>{t('View on map','Lihat di peta')}</a></>;}}
 ];
 return <div className="compare-page" lang={lang}>
  <nav className="compare-nav" aria-label={t('Page navigation','Navigasi halaman')}><Link href={`/?shareLang=${lang}`}>Map Explora</Link><Link href={comparisonPath(lang==='en'?'id':'en',...selected)} hrefLang={lang==='en'?'id':'en'}>{lang==='en'?'Bahasa Indonesia':'English'}</Link></nav>
  <main><header className="compare-intro"><p className="compare-eyebrow">Jabodetabek · {t('Two places, one view','Dua tempat, satu tampilan')}</p><h1>{t('Compare places','Bandingkan tempat')}</h1><p>{t('Choose two branches. Compare their class ages, recorded fees, reviews and location. No best-place or cheapest ranking.','Pilih dua cabang. Bandingkan usia kelas, catatan biaya, ulasan dan lokasinya. Tanpa peringkat terbaik atau termurah.')}</p></header>
  <div className="compare-picker">{selected.map((id,i)=><label key={i} htmlFor={`compare-${i}`}>{t('Place','Tempat')} {i+1}<select id={`compare-${i}`} value={id} onChange={e=>pick(i,e.target.value)}><option value="">{t('Choose a branch','Pilih cabang')}</option>{venues.map(v=><option value={v.id} key={v.id}>{venueName(v)} · {v.area}</option>)}</select></label>)}</div>
  <p className="compare-help" aria-live="polite">{ready?t('Two branches selected. Scroll to compare.','Dua cabang dipilih. Gulir untuk membandingkan.'):t('Choose two different branches to see the comparison.','Pilih dua cabang yang berbeda untuk melihat perbandingan.')}</p>
  <aside className="compare-limit">{t('Source snapshots, not current quotes. Some brochures are undated. Session fees, packages and play tickets are different products. Confirm ages, extra charges, expiry and refund rules before paying.','Ini catatan sumber, bukan penawaran terbaru. Sebagian brosur tidak bertanggal. Biaya sesi, paket dan tiket bermain adalah produk berbeda. Pastikan usia, biaya tambahan, masa berlaku dan aturan pengembalian dana sebelum membayar.')}</aside>
  {ready?<div className="comparison" role="region" aria-label={t('Place comparison','Perbandingan tempat')}><div className="compare-heads">{pair.map(v=><h2 key={v!.id}>{venueName(v!)}<small>{v!.area}</small></h2>)}</div>{rows.map(row=><section className="compare-row" id={row.key} key={row.key}><h2>{row.title}</h2><div className="compare-cells">{pair.map(v=><div className="compare-cell" key={v!.id} aria-label={`${venueName(v!)}: ${row.title}`}>{row.render(v!)}</div>)}</div></section>)}</div>:<div className="compare-empty"><h2>{t('Start with a place you found','Mulai dari tempat pilihan Anda')}</h2><p>{t('Open a place from the map and choose Compare this place, or use the two menus above. A missing price or review stays marked as missing.','Buka tempat dari peta lalu pilih Bandingkan tempat ini, atau gunakan dua pilihan di atas. Biaya atau ulasan yang belum ada tetap ditandai belum tercatat.')}</p></div>}
  <footer><Link href={`/${lang==='id'?'id/':''}for/class-costs-jakarta/`}>{t('Fee guide and sources','Panduan biaya dan sumber')}</Link><p>{t('A directory, not a booking service. Confirm directly with the branch.','Direktori, bukan layanan pemesanan. Konfirmasi langsung ke cabang.')}</p></footer></main>
 </div>;
}
