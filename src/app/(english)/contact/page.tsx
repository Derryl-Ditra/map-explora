import '@/app/guides.css';
import {GuideShell} from '@/components/GuideContent';
import {ContactContent} from '@/components/ContactContent';
import {guideMetadata} from '@/utils/bilingual';
export const metadata=guideMetadata('en','/contact/','Contact Map Explora','Request a class or branch, correct a listing, report wrong ages or a closed place, or ask about Map Explora.');
export default function Page(){return <GuideShell lang="en" path="/contact/"><ContactContent lang="en"/></GuideShell>;}
