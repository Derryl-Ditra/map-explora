import ComparePlaces from '@/components/ComparePlaces';
import {VENUES} from '@/data/venues';
import {comparisonInventory} from '@/utils/comparePlaces';
import {guideMetadata} from '@/utils/bilingual';
export const metadata=guideMetadata('id','/compare/', 'Bandingkan tempat', 'Bandingkan usia kelas, biaya yang tercatat, ulasan dan lokasi dua cabang di Jabodetabek.');
export default function Page(){return <ComparePlaces venues={comparisonInventory(VENUES)} lang="id"/>;}
