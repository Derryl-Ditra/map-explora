import { notFound } from 'next/navigation';
import { VENUES } from '@/data/venues';
import { placePageInventory, placeMetadata } from '@/utils/placePages';
import PlacePage from '@/components/PlacePage';
const places=placePageInventory(VENUES);
export const dynamic='force-static';
export const dynamicParams=false;
export function generateStaticParams() { return places.map(v=>({id:v.id})); }
export async function generateMetadata({params}:{params:Promise<{id:string}>}) { const {id}=await params;const v=places.find(v=>v.id===id);return v?placeMetadata(v,'en'):{}; }
export default async function Page({params}:{params:Promise<{id:string}>}) { const {id}=await params;const v=places.find(v=>v.id===id);if(!v)notFound();return <PlacePage venue={v} lang="en"/>; }
