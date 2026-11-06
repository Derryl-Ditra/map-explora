import type {Metadata} from 'next';
import {GuideShell, GuideIndex} from '@/components/GuideContent';
import {languageLinks, prefix} from '@/utils/bilingual';
import {SITE_URL} from '@/utils/discovery';
const lang='id' as const;
export const metadata:Metadata={title:lang==='id'?'Panduan kelas anak di Jabodetabek':'Children’s class guides in Jabodetabek',alternates:{canonical:SITE_URL+prefix(lang)+'/activities/',languages:languageLinks('/activities/')}};
export default function Page(){return <GuideShell lang={lang} path="/activities/"><GuideIndex lang={lang}/></GuideShell>;}
