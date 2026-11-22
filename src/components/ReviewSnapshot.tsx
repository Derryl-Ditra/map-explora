import type { Venue } from '@/types/venue';
const topics:Record<string,string>={'staff/service':'staf dan layanan','communication':'komunikasi','schedule conflicts':'jadwal bentrok','cleanliness':'kebersihan','coach quality/favoritism':'cara melatih atau perlakuan berbeda','safety':'keamanan','facilities/equipment':'fasilitas dan alat','price/value':'biaya dan manfaat','crowding/space':'kepadatan dan ruang'};
export default function ReviewSnapshot({venue:v,lang}:{venue:Venue;lang:'en'|'id'}) {
 const t=(en:string,id:string)=>lang==='id'?id:en;
 const r=v.reviews;
 if(!r)return <p>{t('Reviews not recorded.','Ulasan belum tercatat.')}</p>;
 return <div className="review-snapshot">
  <strong>{r.rating!==null?`${r.rating.toFixed(1)}/5`:t('No rating','Belum ada nilai')}{r.reviewCount!==null?` (${r.reviewCount} ${t('ratings','penilaian')})`:''}</strong>{r.reviewCount!==null&&r.reviewCount<10&&' ' + t('· few ratings','· sedikit penilaian')}
  {' '}
  {r.complaintThemes.length>0&&<p className="compare-concern">{t('Concerns','Keluhan')}: {r.complaintThemes.map(s=>lang==='id'?(topics[s]||'lihat sumber'):s).join('; ')}</p>}
  {r.sourceUrl&&<a href={r.sourceUrl}>{t('Read original reviews','Baca ulasan asli')}</a>}
 </div>;
}
