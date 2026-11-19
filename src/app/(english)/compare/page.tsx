import MapHUD from '@/components/MapHUD';
import {guideMetadata} from '@/utils/bilingual';
export const metadata=guideMetadata('en','/compare/', 'Compare places', 'Compare class ages, recorded fees, reviews and locations for two Jabodetabek branches.');
export default function Page(){return <MapHUD initialCompare compareLang="en"/>;}
