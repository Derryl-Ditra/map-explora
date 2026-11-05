import type { MetadataRoute } from 'next';
import { VENUES } from '@/data/venues';
import { buildAnswerGroups, SITE_URL } from '@/utils/discovery';
export const dynamic = 'force-static';
export default function sitemap(): MetadataRoute.Sitemap {
  // No fabricated lastmod: source-check dates are not page modification dates.
  return [{ url: `${SITE_URL}/` }, { url: `${SITE_URL}/activities/` }, ...buildAnswerGroups(VENUES).map(g => ({ url: `${SITE_URL}/activities/${g.slug}/` }))];
}
