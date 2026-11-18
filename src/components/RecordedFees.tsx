import './recorded-fees.css';
import type { PriceListing } from '@/types/venue';
import { placeText } from '@/utils/placeLanguage';

export default function RecordedFees({prices,lang}:{prices?:PriceListing[];lang:'en'|'id'}) {
 const t=(en:string,id:string)=>lang==='id'?id:en;
 return <div className="recorded-fees">
  {!prices?.length?<p className="fee-missing">{t('No price recorded. Ask the branch; this does not mean free.','Biaya belum tercatat. Tanyakan ke cabang; bukan berarti gratis.')}</p>:prices.map((p,i)=><article className="fee-item" key={i}>
   <strong className="fee-amount">Rp {p.amountIdr.toLocaleString('id-ID')}</strong>
   <p>{placeText(p.unit,lang,t('See source unit','Lihat satuan di sumber'))}</p>
   <span className="place-tag">{p.sourceKind==='official'?t('Official source','Sumber resmi'):t('Partner listing','Daftar mitra')}</span>
   <p>{placeText(p.label,lang,t('See source for the product','Lihat rincian produk di sumber'))}</p>
   {p.note&&<p>{placeText(p.note,lang,t('Read the conditions at the source before paying.','Baca syarat di sumber sebelum membayar.'))}</p>}
   {p.schedule&&<p>{placeText(p.schedule,lang,t('Confirm the schedule with the branch.','Tanyakan jadwal ke cabang.'))}</p>}
   <a href={p.sourceUrl}>{t('Price source','Sumber biaya')}</a>
   <small>{t('Read','Dibaca')}: {p.checkedAt}</small>
  </article>)}
 </div>;
}
