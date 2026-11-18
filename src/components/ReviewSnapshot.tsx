import type { Venue } from '@/types/venue';
import { placeText } from '@/utils/placeLanguage';
const topics:Record<string,string>={'staff/service':'staf dan layanan','communication':'komunikasi','schedule conflicts':'jadwal bentrok','cleanliness':'kebersihan','coach quality/favoritism':'cara melatih atau perlakuan berbeda','safety':'keamanan','facilities/equipment':'fasilitas dan alat','price/value':'biaya dan manfaat','crowding/space':'kepadatan dan ruang'};
export default function ReviewSnapshot({venue:v,lang}:{venue:Venue;lang:'en'|'id'}) {
 const t=(en:string,id:string)=>lang==='id'?id:en;
 const r=v.reviews;
 if(!r)return <p>{t('Reviews not recorded. This is not a quality verdict.','Ulasan belum tercatat. Ini bukan penilaian kualitas.')}</p>;
 return <div className="review-snapshot">
  <strong>{r.rating!==null?`${r.rating.toFixed(1)}/5`:t('No rating','Belum ada nilai')}{r.reviewCount!==null?` (${r.reviewCount} ${t('ratings','penilaian')})`:''}</strong>
  <p>{r.source} · {t('Read','Dibaca')} {r.checkedAt}</p>
  {r.complaintThemes.length>0&&<p className="compare-concern">{t('Customer concerns in the collected sample','Keluhan pengunjung dalam sampel yang dibaca')}: {r.complaintThemes.map(s=>lang==='id'?(topics[s]||'lihat sumber'):s).join('; ')}. {t('Accounts, not verified findings.','Pengalaman pengunjung, bukan temuan terverifikasi.')}</p>}
  {r.sampleNote&&<p>{placeText(r.sampleNote,lang,t('A limited review sample was recorded. Read the branch details and source for its scope.','Sampel ulasan terbatas. Baca rincian cabang dan sumber untuk batas informasinya.'))}</p>}
  {r.reviewCount!==null&&r.reviewCount<10&&<p>{t('Fewer than 10 ratings. Too few for a reliable judgment.','Kurang dari 10 penilaian. Belum cukup untuk kesimpulan yang dapat diandalkan.')}</p>}
  <p>{t('An initial look, not a class-quality or safety score. Ratings can cover the whole venue.','Gambaran awal, bukan nilai kualitas kelas atau keamanan. Penilaian bisa mencakup seluruh tempat.')}</p>
  {r.sourceUrl&&<a href={r.sourceUrl}>{t('Read original reviews','Baca ulasan asli')}</a>}
 </div>;
}
