import MapHUD from '@/components/MapHUD';
import {guideMetadata} from '@/utils/bilingual';
export const metadata=guideMetadata('id','/compare/', 'Bandingkan tempat', 'Bandingkan usia kelas, biaya yang tercatat, ulasan dan lokasi dua cabang di Jabodetabek.');
export default function Page(){return <MapHUD initialCompare compareLang="id"/>;}
