import { VENUES } from '@/data/venues';
import { publicInventory } from '@/utils/discovery';
export const dynamic = 'force-static';
export function GET() {
  return Response.json({ dataNotice: 'Historical source snapshots, not live validation. Each claim stands as of its own checked date. Confirm ages, fees and availability with the branch.', venues: publicInventory(VENUES) });
}
