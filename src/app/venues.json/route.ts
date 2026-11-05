import { VENUES } from '@/data/venues';
import { publicInventory } from '@/utils/discovery';
export const dynamic = 'force-static';
export function GET() {
  return Response.json({ description: 'Provider-listed inventory. Brand age policy does not confirm branch suitability. No live availability, prices or schedules.', venues: publicInventory(VENUES) });
}
