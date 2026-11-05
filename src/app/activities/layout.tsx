import Link from 'next/link';
import './guides.css';
export default function GuidesLayout({ children }: { children: React.ReactNode }) {
  return <div className="guides"><header><Link href="/">Open the map</Link><Link href="/activities/">Browse class guides</Link></header><main>{children}</main><footer><p>Built from the same provider-listed inventory as the map. No paid placement or booking availability.</p><Link href="/venues.json">Download the public venue data</Link> · <Link href="/sitemap.xml">Sitemap</Link></footer></div>;
}
