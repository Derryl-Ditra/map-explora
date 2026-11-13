import { VENUES } from '@/data/venues';
import { publicInventory } from '@/utils/discovery';
export const dynamic = 'force-static';
export function GET() {
  return Response.json({ description: 'Historical source snapshots, not live validation. Every claim is only as of its own checked date; missing dates or unconfirmed claims need re-verification. Recorded reviews are historical, not current ratings. Provider-listed inventory. Brand age policy does not confirm branch suitability. No live availability. PriceListings preserve source URL, check date, program, unit and conditions. sourceKind official means an official-listed source snapshot; partner or an omitted sourceKind means partner-listed. These are not live quotes or confirmed eligibility.', venues: publicInventory(VENUES) });
}
