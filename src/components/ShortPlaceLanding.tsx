import type { Venue } from '@/types/venue';
import { placePath } from '@/utils/placePages';
import { venueName } from '@/utils/discovery';
import ShortPlaceRedirect from './ShortPlaceRedirect';
export default function ShortPlaceLanding({venue}:{venue:Venue}) {
 const path=placePath(venue,'id');
 return <main className="m-auto p-8 max-w-xl"><h1 className="text-2xl font-bold">{venueName(venue)}</h1><p className="mt-4">Membuka halaman tempat...</p><a className="block mt-4 text-[#1a7a4a] underline" href={(process.env.NODE_ENV==='production'?'/map-explora':'')+path}>Buka halaman tempat</a><ShortPlaceRedirect path={path}/></main>;
}
