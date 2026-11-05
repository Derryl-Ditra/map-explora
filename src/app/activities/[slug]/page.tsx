import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { VENUES } from '@/data/venues';
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
  return <span>{age.minMonths ?? 'Unknown minimum'} to {age.maxMonths ?? 'unknown maximum'} months. {age.level === 'brand' ? 'Brand policy only, not branch confirmation.' : 'Branch-level evidence.'} {age.verification}. {age.sourceConflict && 'Conflicting source ages. Confirm with the provider.'} {age.providerAgeUrl && <a href={age.providerAgeUrl}>Age source</a>} {age.sourceCheckedAt && `Checked ${age.sourceCheckedAt}.`}</span>;
}
export default async function ActivityPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params; const g = groups.find(g => g.slug === slug); if (!g) notFound();
  const related = groups.filter(r => r.slug !== slug && (r.area === g.area || (g.activity && r.activity === g.activity)));
  return <><h1>{g.title}</h1><p>{answerSummary(g)}</p><p className="evidence">Under 5 means 0 to 59 months. The list is not ranked. Source snapshots are historical and need rechecking. Undated or unconfirmed claims are not current facts. Provider-listed status does not confirm today&apos;s opening hours, availability or suitability.</p><h2>Compare places and age evidence</h2><ul className="venue-list">{g.venues.map(v => <li key={v.id} id={v.id}><h3>{venueName(v)}</h3><p>{v.address}</p><p className="evidence">Activities listed: {v.categories.join(', ')}. {v.caution}</p>{v.branchAge && <p><AgeEvidence age={v.branchAge}/></p>}{v.programs.length ? <ul>{v.programs.map((p,i) => <li key={i}><strong>{p.name}</strong>: {p.offering === 'offered' ? 'Listed at this branch.' : p.offering === 'not-offered' ? 'Not offered at this branch.' : 'Branch offering unknown.'} <AgeEvidence age={p.age}/>{p.note && <p className="evidence">{p.note}</p>}</li>)}</ul> : <p>Branch-specific program ages are not recorded. Ask the provider before choosing a class.</p>}<p className="evidence">Provider listing checked {v.operatingStatus?.checkedAt ?? 'date unknown'}. This is the source check date, not a live opening status.</p><div className="links"><a href={v.operatingStatus?.source ?? v.sourceUrl}>Provider listing</a>{v.website && <a href={v.website}>Official website</a>}{v.instagram && <a href={v.instagram}>Instagram</a>}</div></li>)}</ul><h2>Before you choose</h2><p>Ask whether the specific branch has a class for your child&apos;s age in months, whether an adult joins, and what the current trial fee and cancellation rules are. Our inventory does not confirm these details.</p><h2>Related guides</h2><ul>{related.map(r => <li key={r.slug}><Link href={`/activities/${r.slug}/`}>{r.title}</Link></li>)}</ul><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema(g)).replace(/</g, '\\u003c') }}/></>;
}
