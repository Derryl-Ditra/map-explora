import ComparePlaces from '@/components/ComparePlaces';
import {VENUES} from '@/data/venues';
import {comparisonInventory} from '@/utils/comparePlaces';
import {guideMetadata} from '@/utils/bilingual';
export const metadata=guideMetadata('en','/compare/', 'Compare places', 'Compare class ages, recorded fees, reviews and locations for two Jabodetabek branches.');
export default function Page(){return <ComparePlaces venues={comparisonInventory(VENUES)} lang="en"/>;}
