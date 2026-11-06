import {buildLlms} from '@/utils/bilingual';
import {VENUES} from '@/data/venues';
import {publicInventory} from '@/utils/discovery';
export const dynamic='force-static';
export function GET(){return new Response(buildLlms('id',publicInventory(VENUES).length),{headers:{'Content-Type':'text/plain; charset=utf-8'}});}
