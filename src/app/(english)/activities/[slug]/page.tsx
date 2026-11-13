import type {Metadata} from 'next';
import {GuideShell, GroupGuide} from '@/components/GuideContent';
import {localizeGroup, guideMetadata} from '@/utils/bilingual';
import {buildAnswerGroups} from '@/utils/discovery';
import {VENUES} from '@/data/venues';
import {notFound} from 'next/navigation';
const lang='en' as 'en' | 'id';
const groups=buildAnswerGroups(VENUES);
export const dynamicParams=false;
export function generateStaticParams(){return groups.map(g=>({slug:g.slug}));}
export async function generateMetadata({params}:{params:Promise<{slug:string}>}):Promise<Metadata>{const {slug}=await params;const g=groups.find(g=>g.slug===slug);if(!g)return {};const path='/activities/'+slug+'/';return guideMetadata(lang,path,localizeGroup(g,lang),lang==='id'?`${g.venues.length} tempat tercantum di ${g.area}. Cek sumber usia cabang, alamat dan tautan penyedia.`:`${g.venues.length} listed places in ${g.area}. Compare branch age evidence, addresses and provider links.`);}
export default async function Page({params}:{params:Promise<{slug:string}>}){const {slug}=await params;if(!groups.some(g=>g.slug===slug))notFound();return <GuideShell lang={lang} path={'/activities/'+slug+'/'}><GroupGuide slug={slug} lang={lang}/></GuideShell>;}
