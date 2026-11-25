import Link from 'next/link';
import ReviewSnapshot from './ReviewSnapshot';
import {comparisonPath} from '@/utils/comparePlaces';
import {buildMapsLink, canRouteVenue} from '@/utils/mapsLink';
import type { Venue, VenueProgram } from '@/types/venue';
import { venueName } from '@/utils/discovery';
import { verifiedPrograms, isVerifiedAgeClaim } from '@/utils/ageMatch';
import { decidedAgeRange, formatUnder5Range } from '@/utils/decideAge';
import { placeMapUrl, placePath, placeSchema, type PlaceLang } from '@/utils/placePages';
import './place-page.css';
import { placeText, placeRegion, publicProgramNote, publicCaution } from '@/utils/placeLanguage';
import { publicLocation } from '@/utils/publicLocation';
import { localizeTerm } from '@/utils/bilingual';
import { isDeadSourceUrl } from '@/data/deadLinks';
const words=(lang:PlaceLang,en:string,id:string)=>lang==='id'?id:en;
// 2026-11-25 copy cut: one age format on place pages too - months to 36,
// years past that, summaries stop at the under-5 ceiling.
const fmtRange=(lang:PlaceLang,min:number,max:number)=>lang==='id'
 ? (max>59?`${min} bulan sampai di bawah 5 tahun`:`${min} sampai ${max} bulan`)
 : formatUnder5Range(min,max);
const hasRange=(p:VenueProgram)=>p.age.minMonths!==null&&p.age.maxMonths!==null;
// Real conflicts keep their note; provenance boilerplate does not render.
const keepsNote=(p:VenueProgram)=>!!(p.noteKind||p.age.sourceConflict);
export default function PlacePage({venue:v,lang}:{venue:Venue;lang:PlaceLang}) {
 const t=(en:string,id:string)=>words(lang,en,id);
 const routable=canRouteVenue(v),mapsAction=buildMapsLink(v),dirLabel=routable?t('Directions','Rute'):t('Search Maps','Cari di Maps'),dirAria=routable?t('Directions in Google Maps','Rute di Google Maps'):t('Search in Google Maps','Cari di Google Maps');
 const confirmed=verifiedPrograms(v);
 const decided=decidedAgeRange(v);
 const location=publicLocation(v,lang);
 const pending=!!v.pendingReverification;
 const uncertain=v.programs.filter(p=>p.offering!=='not-offered'&&!confirmed.includes(p));
 // Identical note paragraphs render once per page.
 const seenNotes=new Set<string>();
 const noteOnce=(note?:string)=>{const t=publicProgramNote(note,lang);if(!t||seenNotes.has(t))return null;seenNotes.add(t);return <p>{t}</p>;};
 const isRestatedBrandNote=(note?:string)=>!!note&&note.startsWith("General brand data from the official ");
 // One check date per page: the most recent read behind the ages on it.
 const ageDates=[...confirmed.map(p=>p.age.sourceCheckedAt),...(v.branchAge?[v.branchAge.sourceCheckedAt]:[])].filter((d):d is string=>!!d).sort();
 const agesCheckedAt=ageDates.at(-1)||null;
 const sources=Array.from(new Map([
  {url:v.operatingStatus?.source || v.sourceUrl,date:v.operatingStatus?.checkedAt || v.lastCheckedAt,label:t('Branch listing','Daftar cabang')},
  ...v.programs.filter(p=>p.offering!=='not-offered').flatMap(p=>[{url:p.age.providerAgeUrl,date:p.age.sourceCheckedAt,label:p.name},...(p.noteUrl?[{url:p.noteUrl,date:p.age.sourceCheckedAt,label:lang==='id'?'Sumber pembanding':p.noteLabel || p.name}]:[])]),
  ...(v.priceListings || []).map(p=>({url:p.sourceUrl,date:p.checkedAt,label:lang==='id'?'Sumber harga':p.source}))
 ].filter(s=>!!s.url&&!isDeadSourceUrl(s.url)).map(s=>[s.url,s])).values());
 return <div className="place-page" lang={lang}>
 <nav className="place-nav" aria-label={t('Page navigation','Navigasi halaman')}><Link href={`/?shareLang=${lang}`}>Map Explora</Link><Link href={placePath(v,lang==='id'?'en':'id')} hrefLang={lang==='id'?'en':'id'}>{lang==='id'?'English':'Bahasa Indonesia'}</Link><a href="#place-content">{t('Skip to content','Langsung ke isi')}</a></nav>
 <main id="place-content">
 <header className="place-header"><p className="place-eyebrow">{placeRegion(v.city,v.area)}</p><h1>{venueName(v)}</h1><div className="place-actions"><a className="place-primary" href={mapsAction} aria-label={dirAria}>{dirLabel}</a><Link className="place-secondary" href={comparisonPath(lang,v.id)}>{t('Compare this place','Bandingkan tempat ini')}</Link><a className="place-secondary" href={placeMapUrl(v,lang)}>{t('View on the map','Lihat di peta')}</a>{v.website&&!isDeadSourceUrl(v.website)&&<a className="place-secondary" href={v.website}>{t('Provider website','Situs penyedia')}</a>}</div></header>
 {v.caution&&<section className="place-warning"><h2>{t('Check before travelling','Sebelum berangkat')}</h2><p>{publicCaution(v.caution,lang)}</p></section>}
 <div className="place-columns"><div>
 <section className="place-section"><h2>{t('Classes and ages','Kelas dan usia')}</h2>
 {pending?<p>{t('Class ages and fees are being re-checked against the provider.','Usia kelas dan biaya sedang dicek ulang ke penyedia.')}</p>
 :confirmed.length?<>{confirmed.map((p,i)=><article className="place-class" key={i}><div className="place-row"><h3>{p.name}</h3>{p.age.bestAvailable&&<span className="place-tag">{t('Best available data','Data terbaik yang tersedia')}</span>}</div><p>{fmtRange(lang,p.age.minMonths!,p.age.maxMonths!)}</p>{p.term&&<p>{localizeTerm(p.term,lang)}</p>}{noteOnce(p.note)}{p.age.bestAvailable&&!isRestatedBrandNote(p.age.bestAvailableNote)&&noteOnce(p.age.bestAvailableNote)}{!isDeadSourceUrl(p.age.providerAgeUrl)&&<a href={p.age.providerAgeUrl}>{t('Class source','Sumber kelas')}</a>}</article>)}</>:v.branchAge&&isVerifiedAgeClaim(v.branchAge)?<article className="place-class"><h3>{t('Branch age range','Rentang usia cabang')}</h3><p>{fmtRange(lang,v.branchAge.minMonths!,v.branchAge.maxMonths!)}</p>{!isDeadSourceUrl(v.branchAge.providerAgeUrl)&&<a href={v.branchAge.providerAgeUrl}>{t('Class source','Sumber kelas')}</a>}</article>:<p>{decided.confidence==='general'?t('Ages not published. Confirm by phone first.','Usia belum dipublikasikan. Konfirmasi lewat telepon dulu.'):t(`Class ages are not confirmed for this branch. ${decided.confidence==='brand'?'Brand':'Listed'} data suggests ${formatUnder5Range(decided.minMonths,decided.maxMonths)}. Confirm by phone first.`,`Usia kelas di cabang ini belum terkonfirmasi. Data ${decided.confidence==='brand'?'brand':'tercatat'} menunjukkan ${decided.minMonths} sampai ${decided.maxMonths>59?'di bawah 5 tahun':`${decided.maxMonths} bulan`}. Konfirmasi lewat telepon dulu.`)}</p>}
 {!pending&&(confirmed.length>0||(v.branchAge&&isVerifiedAgeClaim(v.branchAge)))&&<p className="place-caption">{agesCheckedAt?t(`Checked ${agesCheckedAt}. Confirm class and fee with the branch before going.`,`Dibaca ${agesCheckedAt}. Konfirmasi kelas dan biaya ke cabang sebelum berangkat.`):t('Confirm class and fee with the branch before going.','Konfirmasi kelas dan biaya ke cabang sebelum berangkat.')}</p>}
 {!pending&&uncertain.length>0&&<div className="place-warning"><h3>{t('Needs confirmation','Perlu konfirmasi')}</h3><p>{t('Listed, but not confirmed for this branch.','Tercatat, tetapi belum terkonfirmasi untuk cabang ini.')}</p><ul>{uncertain.map((p,i)=><li key={i}>{p.name}{hasRange(p)?` · ${fmtRange(lang,p.age.minMonths!,p.age.maxMonths!)}`:''}{p.term?` · ${localizeTerm(p.term,lang)}`:''}{p.age.providerAgeUrl&&!isDeadSourceUrl(p.age.providerAgeUrl)&&<> · <a href={p.age.providerAgeUrl}>{t('Program source','Sumber program')}</a></>}{p.noteUrl&&!isDeadSourceUrl(p.noteUrl)&&<> · <a href={p.noteUrl}>{lang==='id'?'Sumber pembanding':p.noteLabel || 'Additional source'}</a></>}</li>)}</ul>{uncertain.filter(keepsNote).map((p,i)=><article key={i}><h4>{p.name}</h4>{noteOnce(p.note)}{p.age.bestAvailable&&!isRestatedBrandNote(p.age.bestAvailableNote)&&noteOnce(p.age.bestAvailableNote)}</article>)}</div>}
</section>
 <section className="place-section"><h2>{t('Recorded prices','Biaya yang ditemukan')}</h2>{pending?<p>{t('Fees are being re-checked against the provider.','Biaya sedang dicek ulang ke penyedia.')}</p>:v.priceListings?.length?v.priceListings.map((p,i)=><article className="place-price" key={i}><h3>Rp {p.amountIdr.toLocaleString('id-ID')}{p.amountIdrMax?'\u2013'+p.amountIdrMax.toLocaleString('id-ID'):''}</h3><p>{placeText(p.unit,lang,'per rincian sumber')}</p><span className="place-tag">{p.sourceKind==='official'?t('Official-listed','Dari sumber resmi'):t('Partner-listed','Dari mitra')}</span><p>{placeText(p.label,lang,'Lihat rincian produk di sumber')}</p>{p.note&&p.note.split('; ').map((row,ri)=>placeText(row,lang)&&<p key={ri}>{placeText(row,lang)}</p>)}{placeText(p.schedule,lang)&&<p>{placeText(p.schedule,lang)}</p>}{!isDeadSourceUrl(p.sourceUrl)&&<a href={p.sourceUrl}>{lang==='id'?'Lihat sumber harga':p.source}</a>}<p className="place-caption">{t('Read','Dibaca')}: {p.checkedAt}</p></article>):<p>{t('No prices published. Confirm fees by phone first.','Harga belum dipublikasikan. Konfirmasi biaya lewat telepon dulu.')}</p>}</section>
 </div><aside>
 <section className="place-section"><h2>{t('Plan a visit','Rencana kunjungan')}</h2><dl><dt>{location.areaOnly?t('Area / venue (not a street address)','Area / tempat (bukan alamat jalan)'):t('Address','Alamat')}</dt><dd>{location.address}{location.notice&&<p>{location.notice}</p>}{location.source&&<p><a href={location.source}>{t('Location source','Sumber lokasi')}</a> · {t('Read','Dibaca')} {location.checkedAt}</p>}</dd><dt>{v.phoneScope==='shared-enquiry'?t('Shared enquiry number','Nomor informasi bersama'):t('Branch phone','Telepon cabang')}</dt><dd>{v.phone?<a href={'tel:'+v.phone.replace(/[^+0-9]/g,'')}>{v.phone}</a>:t('Not recorded','Belum tersedia')}</dd><dt>{t('Listing evidence','Status bukti')}</dt><dd>{v.operatingStatus?.state==='partner-listed'?t('Partner listing plus Maps evidence','Listing mitra dan bukti Maps'):t('Listed in an official source','Masih tercantum di sumber resmi')}</dd></dl></section>
 <section className="place-section"><h2>{t('Online reviews','Ulasan daring')}</h2><ReviewSnapshot venue={v} lang={lang}/></section>
 {sources.length>0&&<section className="place-section"><h2>{t('Sources and dates','Sumber dan tanggal')}</h2><ul className="place-sources">{sources.map(s=><li key={s.url}><a href={s.url}>{s.label}</a><span className="place-caption">{s.date || t('Date not recorded','Tanggal belum tercatat')}</span></li>)}</ul></section>}
 </aside></div>
 {!routable&&<p className="place-caption">{t('Approximate location. Confirm the venue before travelling.','Lokasi perkiraan. Pastikan tempatnya sebelum berangkat.')}</p>}
 <footer className="place-footer"><div className="place-actions"><a className="place-primary" href={mapsAction} aria-label={dirAria}>{dirLabel}</a><a className="place-secondary" href={placeMapUrl(v,lang)}>{t('View on the map','Lihat di peta')}</a></div></footer>
 </main><script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(placeSchema(v,lang)).replace(/</g,'\\u003c')}}/>
 </div>;
}
