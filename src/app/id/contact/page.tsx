import '@/app/guides.css';
import {GuideShell} from '@/components/GuideContent';
import {ContactContent} from '@/components/ContactContent';
import {guideMetadata} from '@/utils/bilingual';
export const metadata=guideMetadata('id','/contact/','Hubungi Map Explora','Usulkan kelas atau cabang, perbaiki informasi tempat, laporkan usia yang salah atau tempat tutup, atau tanyakan tentang Map Explora.');
export default function Page(){return <GuideShell lang="id" path="/contact/"><ContactContent lang="id"/></GuideShell>;}
