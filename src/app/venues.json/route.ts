import { VENUES } from '@/data/venues';
import { publicInventory } from '@/utils/discovery';
export const dynamic = 'force-static';
export function GET() {
  return Response.json({ description: 'Historical source snapshots, not live validation. Every claim is only as of its own checked date; missing dates or unconfirmed claims need re-verification. Recorded reviews are historical, not current ratings. Provider-listed inventory. Brand age policy does not confirm branch suitability. No live availability, prices or schedules.', venues: publicInventory(VENUES) });
}
