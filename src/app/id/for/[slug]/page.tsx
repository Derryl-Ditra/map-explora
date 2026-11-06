import type {Metadata} from 'next';
import {GuideShell, JobGuide} from '@/components/GuideContent';
import {jobPages, guideMetadata} from '@/utils/bilingual';
import {notFound} from 'next/navigation';
const lang='id' as 'en' | 'id';
export const dynamicParams=false;
export function generateStaticParams(){return jobPages(lang).map(j=>({slug:j.slug}));}
export async function generateMetadata({params}:{params:Promise<{slug:string}>}):Promise<Metadata>{const {slug}=await params;const j=jobPages(lang).find(j=>j.slug===slug);if(!j)return {};const path='/for/'+slug+'/';const descriptions=lang==='id'?{age:'Cabang dengan sumber usia resmi untuk anak 18 bulan. Konfirmasi jadwal dan tempat kosong langsung.',price:'Biaya kelas belum terverifikasi. Cek rincian biaya yang perlu diminta langsung ke cabang.',weather:'Kondisi dalam ruangan belum terverifikasi. Gunakan daftar pertanyaan sebelum berangkat saat hujan.'}:{age:'Branches with official age evidence for an 18 month old. Confirm schedules and spaces directly.',price:'Class prices are not verified. Use a checklist to request a full quote from the branch.',weather:'Indoor conditions are not verified. Check these questions before travelling in the rain.'};return guideMetadata(lang,path,j.title,descriptions[j.kind as keyof typeof descriptions]);}
export default async function Page({params}:{params:Promise<{slug:string}>}){const {slug}=await params;if(!jobPages(lang).some(j=>j.slug===slug))notFound();return <GuideShell lang={lang} path={'/for/'+slug+'/'}><JobGuide slug={slug} lang={lang}/></GuideShell>;}
