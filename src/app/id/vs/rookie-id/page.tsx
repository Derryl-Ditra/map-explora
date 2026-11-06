import type {Metadata} from 'next';
import {GuideShell, Comparison} from '@/components/GuideContent';
import {guideMetadata} from '@/utils/bilingual';
const lang='id' as 'en' | 'id';
export const metadata:Metadata=guideMetadata(lang,'/vs/rookie-id/','Map Explora dan Rookie.ID','Bandingkan cakupan usia, cara menghubungi penyedia dan informasi biaya berdasarkan sumber resmi. Bukan peringkat kualitas.');
export default function Page(){return <GuideShell lang={lang} path="/vs/rookie-id/"><Comparison lang={lang}/></GuideShell>;}
