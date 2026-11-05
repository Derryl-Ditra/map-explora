import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/utils/discovery';
export const dynamic = 'force-static';
// GitHub Pages serves this under /map-explora. Only a domain-root robots.txt
// is authoritative. See docs/discovery-qa.md before claiming crawl controls.
export default function robots(): MetadataRoute.Robots {
  return { rules: [{ userAgent: '*', allow: '/' }, { userAgent: ['OAI-SearchBot', 'Claude-SearchBot', 'PerplexityBot', 'Googlebot', 'bingbot'], allow: '/' }], sitemap: `${SITE_URL}/sitemap.xml` };
}
