import type { MetadataRoute } from 'next';
import { VENUES } from '@/data/venues';
import { buildAnswerGroups, SITE_URL } from '@/utils/discovery';
import { jobPages, languageLinks } from '@/utils/bilingual';
export const dynamic = 'force-static';
export default function sitemap(): MetadataRoute.Sitemap {
 const paths=['/contact/','/activities/',...buildAnswerGroups(VENUES).map(g=>`/activities/${g.slug}/`),...jobPages('en').map(j=>`/for/${j.slug}/`),'/vs/rookie-id/'];
 return [{url:SITE_URL+'/'},...paths.flatMap(path=>['','/id'].map(p=>({url:SITE_URL+p+path,alternates:{languages:languageLinks(path)}})))];
}
