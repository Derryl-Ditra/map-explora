import type {Metadata} from 'next';
import {GuideShell, Comparison} from '@/components/GuideContent';
import {guideMetadata} from '@/utils/bilingual';
const lang='en' as 'en' | 'id';
export const metadata:Metadata=guideMetadata(lang,'/vs/rookie-id/','Map Explora and Rookie.ID','Compare age coverage, provider contact flow and price information using official sources. Not a quality ranking.');
export default function Page(){return <GuideShell lang={lang} path="/vs/rookie-id/"><Comparison lang={lang}/></GuideShell>;}
