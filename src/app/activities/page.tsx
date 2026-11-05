import type { Metadata } from 'next';
import Link from 'next/link';
import { VENUES } from '@/data/venues';
import { buildAnswerGroups, SITE_URL } from '@/utils/discovery';
export const metadata: Metadata = { title: 'What can children under 5 do in Jabodetabek?', description: 'Browse provider-listed class options by area and activity, with branch age evidence and official sources to check before visiting.', alternates: { canonical: `${SITE_URL}/activities/` } };
export default function Activities() {
  const groups = buildAnswerGroups(VENUES);
  return <><h1>What can children under 5 do in Jabodetabek?</h1><p>Explore swimming, movement, sensory, dance, language and literacy classes across Jakarta, Bogor, Depok, Tangerang and Bekasi. Start with an area or activity below, compare the source evidence, then ask the provider which class fits your child&apos;s exact age.</p><h2>Choose an area or activity</h2><ul className="guide-index">{groups.map(g => <li key={g.slug}><Link href={`/activities/${g.slug}/`}>{g.title}</Link> <span className="evidence">({g.venues.length} places)</span></li>)}</ul><h2>How to use these guides</h2><p>We group the map&apos;s official-listed records. That means the provider lists the branch, not that a place is open today or a class has space. We preserve brand-level age claims separately from branch-level evidence. Missing ages stay unknown. No schedules, prices or age suitability are inferred.</p><p>Some places offer several activities. A category is a discovery aid, not proof that a particular program is running at that branch. Check the linked evidence and contact the provider before travelling or paying.</p></>;
}
