import { notFound } from 'next/navigation';
import { VENUES } from '@/data/venues';
import { placePageInventory, placeMetadata } from '@/utils/placePages';
import { placeCode, placeIdFromCode } from '@/utils/placeShortLink';
import ShortPlaceLanding from '@/components/ShortPlaceLanding';
import PlacePage from '@/components/PlacePage';
const places=placePageInventory(VENUES);
export const dynamic='force-static';
export const dynamicParams=false;
export function generateStaticParams() { return places.flatMap(v=>[{id:v.id},...(placeCode(v.id)?[{id:placeCode(v.id)!}]:[])]); }
export async function generateMetadata({params}:{params:Promise<{id:string}>}) { const {id}=await params;const v=places.find(v=>v.id===(placeIdFromCode(id)??id));return v?placeMetadata(v,'id'):{}; }
export default async function Page({params}:{params:Promise<{id:string}>}) { const {id}=await params;const v=places.find(v=>v.id===(placeIdFromCode(id)??id));if(!v)notFound();return placeIdFromCode(id)?<ShortPlaceLanding venue={v}/>:<PlacePage venue={v} lang="id"/>; }
