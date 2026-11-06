import type {Metadata} from 'next';
import {GuideShell, GroupGuide} from '@/components/GuideContent';
import {localizeGroup, languageLinks, prefix} from '@/utils/bilingual';
import {buildAnswerGroups, SITE_URL} from '@/utils/discovery';
import {VENUES} from '@/data/venues';
import {notFound} from 'next/navigation';
const lang='id' as const;
const groups=buildAnswerGroups(VENUES);
export const dynamicParams=false;
export function generateStaticParams(){return groups.map(g=>({slug:g.slug}));}
export async function generateMetadata({params}:{params:Promise<{slug:string}>}):Promise<Metadata>{const {slug}=await params;const g=groups.find(g=>g.slug===slug);if(!g)return {};const path='/activities/'+slug+'/';return {title:localizeGroup(g,lang),alternates:{canonical:SITE_URL+prefix(lang)+path,languages:languageLinks(path)}};}
export default async function Page({params}:{params:Promise<{slug:string}>}){const {slug}=await params;if(!groups.some(g=>g.slug===slug))notFound();return <GuideShell lang={lang} path={'/activities/'+slug+'/'}><GroupGuide slug={slug} lang={lang}/></GuideShell>;}
