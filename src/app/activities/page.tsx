import type { Metadata } from 'next';
import Link from 'next/link';
import { VENUES } from '@/data/venues';
import { buildAnswerGroups, SITE_URL } from '@/utils/discovery';
export const metadata: Metadata = { title: 'What can children under 5 do in Jabodetabek?', description: 'Browse provider-listed class options by area and activity, with branch age evidence and official sources to check before visiting.', alternates: { canonical: `${SITE_URL}/activities/` } };
export default function Activities() {
  const groups = buildAnswerGroups(VENUES);
  return <><h1>What can children under 5 do in Jabodetabek?</h1><p>Compare swimming, movement, sensory, dance, language and literacy classes across Jakarta, Bogor, Depok, Tangerang and Bekasi. Choose an area or activity, then check the branch&apos;s age evidence before booking.</p><h2>Which area or activity?</h2><ul className="guide-index">{groups.map(g => <li key={g.slug}><Link href={`/activities/${g.slug}/`}>{g.title}</Link> <span className="evidence">({g.venues.length} places)</span></li>)}</ul><h2>What do these listings mean?</h2><p>Each place is on a provider&apos;s branch list. Ages are 0 to 59 months; brand policies do not confirm branch classes. Source snapshots are not live opening hours, prices or availability. Ask the provider before travelling or paying.</p></>;
}
