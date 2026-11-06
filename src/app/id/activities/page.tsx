import type {Metadata} from 'next';
import {GuideShell, GuideIndex} from '@/components/GuideContent';
import {guideMetadata} from '@/utils/bilingual';
const lang='id' as 'en' | 'id';
export const metadata:Metadata=guideMetadata(lang,'/activities/','Kelas apa saja untuk anak di bawah 5 tahun di Jabodetabek?','Cari kelas berdasarkan daerah, kegiatan dan sumber usia cabang. Konfirmasi jadwal dan biaya langsung ke penyedia.');
export default function Page(){return <GuideShell lang={lang} path="/activities/"><GuideIndex lang={lang}/></GuideShell>;}
