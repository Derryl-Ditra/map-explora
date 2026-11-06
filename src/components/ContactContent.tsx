import Link from 'next/link';
import { type Lang } from '@/utils/bilingual';

export const CONTACT_EMAIL = 'derrylditramaneti@gmail.com';
const topics = [
  {en:'Add a class or branch',id:'Tambahkan kelas atau cabang',subject:'Map Explora: add a class or branch',detailEn:'Include the name, branch address and an official link. Add class ages if an official source lists them.',detailId:'Sertakan nama, alamat cabang dan tautan resmi. Tambahkan usia kelas jika ada di sumber resmi.'},
  {en:'Correct a listing',id:'Perbaiki informasi tempat',subject:'Map Explora: listing correction',detailEn:'Send the place link, what needs changing and a source for the correction.',detailId:'Kirim tautan tempat, informasi yang perlu diubah dan sumber koreksinya.'},
  {en:'Report wrong ages or a closed place',id:'Laporkan usia yang salah atau tempat tutup',subject:'Map Explora: age or closure report',detailEn:'Include the branch, class name and a current official source if available.',detailId:'Sertakan cabang, nama kelas dan sumber resmi terbaru jika ada.'},
  {en:'Press or partnership',id:'Media atau kerja sama',subject:'Map Explora: press or partnership',detailEn:'Tell us about your publication or proposal and how to reach you.',detailId:'Ceritakan media atau usulan kerja sama Anda dan cara menghubungi Anda.'},
  {en:'General question',id:'Pertanyaan umum',subject:'Map Explora: general question',detailEn:'For anything else about Map Explora.',detailId:'Untuk hal lain tentang Map Explora.'},
];

export function ContactContent({lang}:{lang:Lang}) {
  const id=lang==='id';
  return <>
    <h1>{id?'Hubungi Map Explora':'Contact Map Explora'}</h1>
    <p>{id?'Ada informasi yang perlu ditambahkan atau diperbaiki? Pilih topik di bawah untuk membuka aplikasi email Anda.':'Have something to add or correct? Choose a topic below to open your email app.'}</p>
    <p><a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a></p>
    <ul className="venue-list">{topics.map(topic=><li key={topic.subject}><h2><a href={`mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(topic.subject)}`}>{id?topic.id:topic.en}</a></h2><p>{id?topic.detailId:topic.detailEn}</p></li>)}</ul>
    <p>{id?'Untuk jadwal, biaya, pemesanan dan kecocokan kelas, hubungi penyedia kelas langsung. Map Explora bukan layanan pemesanan.':'For schedules, prices, bookings and class suitability, contact the class provider directly. Map Explora is not a booking service.'}</p>
    <p><Link href="/venues.json">{id?'Lihat sumber dan data tempat':'View sources and public venue data'}</Link></p>
  </>;
}
