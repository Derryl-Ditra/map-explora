import type {Metadata} from 'next';
import {GuideShell, Comparison} from '@/components/GuideContent';
import {languageLinks, prefix} from '@/utils/bilingual';
import {SITE_URL} from '@/utils/discovery';
const lang='id' as const;
export const metadata:Metadata={title:lang==='id'?'Map Explora dan Rookie.ID':'Map Explora and Rookie.ID',alternates:{canonical:SITE_URL+prefix(lang)+'/vs/rookie-id/',languages:languageLinks('/vs/rookie-id/')}};
export default function Page(){return <GuideShell lang={lang} path="/vs/rookie-id/"><Comparison lang={lang}/></GuideShell>;}
