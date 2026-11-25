import Link from 'next/link';
import {VENUES} from '@/data/venues';
import {comparisonInventory,coverage,comparisonPath,hasRecordedPrice} from '@/utils/comparePlaces';
import {venueName} from '@/utils/discovery';
import {placePath} from '@/utils/placePages';
import RecordedFees from './RecordedFees';
import './recorded-fees.css';

export default function FeeGuide({lang}:{lang:'en'|'id'}) {
 const t=(en:string,id:string)=>lang==='id'?id:en;
 const counts=coverage(VENUES),priced=comparisonInventory(VENUES).filter(hasRecordedPrice);
 return <div className="fee-guide"><p>{t(`${counts.priced} of ${counts.visible} visible branches have recorded prices. These come from official pages or booking partners, not fresh quotes.`,`${counts.priced} dari ${counts.visible} cabang yang tampil punya catatan biaya. Sumbernya halaman resmi atau mitra pemesanan, bukan penawaran terbaru.`)}</p>
 <aside className="fee-guide-limit"><strong>{t('Compare the product, not just the number','Bandingkan produknya, bukan angkanya saja')}</strong><p>{t('Session fees, multi-lesson packages, registration and public-play tickets are different. Some brochures are undated. A play ticket is not class tuition. Missing prices do not mean free.','Biaya per sesi, paket pertemuan, pendaftaran dan tiket bermain berbeda. Sebagian brosur tidak bertanggal. Tiket bermain bukan biaya kelas. Biaya yang belum tercatat bukan berarti gratis.')}</p><p>{t('Confirm the current fee, child age, session length, extra charges, package expiry and refunds before paying. We do not rank places by cost.','Sebelum membayar, pastikan biaya terbaru, usia anak, durasi sesi, biaya tambahan, masa berlaku paket dan aturan pengembalian dana. Kami tidak mengurutkan tempat dari yang termurah.')}</p></aside>
 <Link href={comparisonPath(lang)}>{t('Compare two branches','Bandingkan dua cabang')}</Link>
 <h2>{t('Branches with fee sources','Cabang dengan sumber biaya')}</h2><p>{t('Alphabetical, across Jabodetabek (Jakarta, Bogor, Depok, Tangerang, Bekasi). Fees are per branch, not a market range.','Urut abjad, mencakup Jabodetabek (Jakarta, Bogor, Depok, Tangerang, Bekasi). Biaya per cabang, bukan kisaran pasar.')}</p>
 {(()=>{const cities=[...new Set(priced.map(v=>v.city))].sort((x,y)=>priced.filter(v=>v.city===y).length-priced.filter(v=>v.city===x).length||x.localeCompare(y));return <div className="venue-groups">{cities.map((city,i)=><details key={city} open={i===0}><summary>{city} <span>({priced.filter(v=>v.city===city).length})</span></summary><ul className="fee-guide-list">{priced.filter(v=>v.city===city).map(v=><li key={v.id}><h3>{venueName(v)}</h3><p>{v.area} · {v.city}</p><RecordedFees prices={v.priceListings} lang={lang}/><div className="fee-guide-links"><Link href={placePath(v,lang)}>{t('Classes and branch details','Kelas dan rincian cabang')}</Link></div></li>)}</ul></details>)}</div>;})()}
 </div>;
}
