import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { VENUES } from '@/data/venues';
import { isVerifiedAgeClaim, verifiedPrograms, hasVerifiedAgeEvidence } from '@/utils/ageMatch';
import type { AgeClaim } from '@/types/venue';
import { answerSummary, buildAnswerGroups, itemListSchema, SITE_URL, venueName } from '@/utils/discovery';
const groups = buildAnswerGroups(VENUES);
export const dynamicParams = false;
export function generateStaticParams() { return groups.map(g => ({ slug: g.slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params; const g = groups.find(g => g.slug === slug); if (!g) return {};
  const description = `${g.venues.length} provider-listed ${g.activity ? g.activity.toLowerCase() + " " : "class "}options in ${g.area}, with addresses, class age evidence and official links. Confirm branch suitability before booking.`;
  return { title: g.title, description, alternates: { canonical: `${SITE_URL}/activities/${slug}/` }, openGraph: { title: g.title, description, url: `${SITE_URL}/activities/${slug}/`, type: 'website' }, twitter: { title: g.title, description } };
}
function AgeEvidence({ age }: { age: AgeClaim }) {
  return <span>{age.minMonths ?? '?'} to {age.maxMonths ?? '?'} months ({age.level === 'brand' ? 'brand policy, confirm branch' : 'branch source'}{age.verification !== 'provider-confirmed' ? ', age not confirmed' : ''}{age.sourceConflict ? ', conflicting sources' : ''}). {age.providerAgeUrl && <a href={age.providerAgeUrl}>Age source</a>}</span>;
}
export default async function ActivityPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params; const g = groups.find(g => g.slug === slug); if (!g) notFound();
  const related = groups.filter(r => r.slug !== slug && (r.area === g.area || (g.activity && r.activity === g.activity)));
  return <><h1>{g.title}</h1><p>{answerSummary(g)}</p><p className="evidence">Ages 0 to 59 months. Source snapshots, not live availability. Brand ages do not confirm a branch.</p><h2>Which places can I compare?</h2><ul className="venue-list">{g.venues.map(v => <li key={v.id} id={v.id}><h3>{venueName(v)}</h3><p>{v.address}</p>{v.caution && <p>{v.caution}</p>}{v.branchAge && isVerifiedAgeClaim(v.branchAge) && <p><AgeEvidence age={v.branchAge}/></p>}{verifiedPrograms(v).length ? <ul>{verifiedPrograms(v).filter(p => p.age.minMonths! <= 59).slice(0, 1).map((p,i) => <li key={i}><strong>{p.name}</strong>: <AgeEvidence age={p.age}/></li>)}</ul> : !hasVerifiedAgeEvidence(v) ? <p>Class ages not verified yet</p> : null}<div className="links"><a href={v.operatingStatus?.source ?? v.sourceUrl}>Provider listing</a>{v.website && <a href={v.website}>Website</a>}{v.instagram && <a href={v.instagram}>Instagram</a>}</div></li>)}</ul><h2>What should I confirm?</h2><p>Your child&apos;s age in months, the class schedule, price and cancellation rules. We do not verify current availability.</p><h2>Which other guides can help?</h2><ul>{related.map(r => <li key={r.slug}><Link href={`/activities/${r.slug}/`}>{r.title}</Link></li>)}</ul><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema(g)).replace(/</g, '\\u003c') }}/></>;
}
