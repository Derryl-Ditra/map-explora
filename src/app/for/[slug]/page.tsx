import type {Metadata} from 'next';
import {GuideShell, JobGuide} from '@/components/GuideContent';
import {jobPages, languageLinks, prefix} from '@/utils/bilingual';
import {SITE_URL} from '@/utils/discovery';
import {notFound} from 'next/navigation';
const lang='en' as const;
export const dynamicParams=false;
export function generateStaticParams(){return jobPages(lang).map(j=>({slug:j.slug}));}
export async function generateMetadata({params}:{params:Promise<{slug:string}>}):Promise<Metadata>{const {slug}=await params;const j=jobPages(lang).find(j=>j.slug===slug);if(!j)return {};const path='/for/'+slug+'/';return {title:j.title,alternates:{canonical:SITE_URL+prefix(lang)+path,languages:languageLinks(path)}};}
export default async function Page({params}:{params:Promise<{slug:string}>}){const {slug}=await params;if(!jobPages(lang).some(j=>j.slug===slug))notFound();return <GuideShell lang={lang} path={'/for/'+slug+'/'}><JobGuide slug={slug} lang={lang}/></GuideShell>;}
