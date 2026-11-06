import type {Metadata} from 'next';
import {GuideShell, GuideIndex} from '@/components/GuideContent';
import {guideMetadata} from '@/utils/bilingual';
const lang='en' as 'en' | 'id';
export const metadata:Metadata=guideMetadata(lang,'/activities/','Which classes can I find for a child under 5 in Jabodetabek?','Find classes by area, activity and branch age evidence. Confirm schedules and prices with the provider.');
export default function Page(){return <GuideShell lang={lang} path="/activities/"><GuideIndex lang={lang}/></GuideShell>;}
