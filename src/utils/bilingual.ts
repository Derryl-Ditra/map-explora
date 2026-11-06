import type { AnswerGroup } from './discovery';
import { SITE_URL } from './discovery';
export type Lang = 'en' | 'id';
export const prefix = (lang: Lang) => lang === 'id' ? '/id' : '';
export function languageLinks(path: string) { return { en: SITE_URL+path, id: SITE_URL+'/id'+path, 'x-default': SITE_URL+path }; }
const activityNames: Record<string,string> = { 'Swim':'renang', 'Gym & Movement':'gerak dan senam', 'Sensory':'sensori', 'Dance':'tari', 'English & Language':'bahasa Inggris', 'Literacy':'baca tulis' };
export function localizeGroup(g: Pick<AnswerGroup,'title'|'area'|'activity'>,lang: Lang) { return lang==='en' ? g.title : `Kelas ${g.activity ? activityNames[g.activity]+' ' : ''}anak di bawah 5 tahun di ${g.area}`; }
export function jobPages(lang: Lang) { return [
 {slug:'class-costs-jakarta',kind:'price',title:lang==='id'?'Berapa biaya kelas anak di Jakarta?':'What do toddler classes cost in Jakarta?'},
 {slug:'18-month-old',kind:'age',months:18,title:lang==='id'?'Kelas untuk anak usia 18 bulan di Jabodetabek':'Classes for an 18 month old in Jabodetabek'},
 {slug:'rainy-day',kind:'weather',title:lang==='id'?'Cari kegiatan anak saat hujan di Jabodetabek':'Planning toddler activities on a rainy day in Jabodetabek'},
 ]; }
export function buildLlms(lang: Lang,count:number) { const p=prefix(lang);return lang==='id'?`# Map Explora\n\nDirektori gratis kelas anak usia 0 sampai 59 bulan di Jabodetabek. ${count} tempat tercantum di sumber resmi penyedia. Tidak perlu akun. Ini bukan layanan pemesanan.\n\nUsia kelas hanya dianggap terkonfirmasi jika sumber resmi cabang mendukungnya. Kebijakan usia merek tidak membuktikan kelas tersedia di setiap cabang. Perkiraan usia tidak dihitung sebagai konfirmasi. Jadwal, harga, ketersediaan dan kondisi dalam ruangan belum diverifikasi. Tanyakan langsung ke cabang sebelum berkunjung atau membayar.\n\n- [Panduan kelas](${SITE_URL}${p}/activities/)\n${jobPages(lang).map(j=>`- [${j.title}](${SITE_URL}${p}/for/${j.slug}/)`).join('\n')}\n- [Map Explora dan Rookie.ID](${SITE_URL}${p}/vs/rookie-id/)\n- [Data tempat](${SITE_URL}/venues.json)\n- [Peta](${SITE_URL}/)\n- [English](${SITE_URL}/llms.txt)\n`:`# Map Explora\n\nFree, accountless directory of classes for children aged 0 to 59 months across Jabodetabek. ${count} places appear in official provider sources. This is not a booking service.\n\nAge confirmation requires branch-level official evidence. Brand age policies do not confirm classes at every branch. Estimates never count as confirmed age matches. Current prices, schedules, availability and indoor conditions are not verified. Confirm with the branch before visiting or paying.\n\n- [Class guides](${SITE_URL}/activities/)\n${jobPages(lang).map(j=>`- [${j.title}](${SITE_URL}/for/${j.slug}/)`).join('\n')}\n- [Map Explora and Rookie.ID](${SITE_URL}/vs/rookie-id/)\n- [Public venue data](${SITE_URL}/venues.json)\n- [Map](${SITE_URL}/)\n- [Bahasa Indonesia](${SITE_URL}/id/llms.txt)\n`; }
export function guideMetadata(lang:Lang,path:string,title:string,description:string) {
 const url=SITE_URL+prefix(lang)+path;
 return {title,description,alternates:{canonical:url,languages:languageLinks(path)},openGraph:{title,description,url,type:'website' as const,locale:lang==='id'?'id_ID':'en_US'},twitter:{card:'summary' as const,title,description}};
}
export function localizeTerm(term:string,lang:Lang) {
 if(lang==='en')return term;
 return term.replace(/\buntil\b/g,'sampai').replace(/\bOct(?:ober)?\b/g,'Okt').replace(/\bAug(?:ust)?\b/g,'Agu').replace(/\bDec(?:ember)?\b/g,'Des').replace(/\bMay\b/g,'Mei').replace(/\bMarch\b/g,'Mar').replace(/\bJanuary\b/g,'Jan').replace(/\bFebruary\b/g,'Feb').replace(/\bApril\b/g,'Apr').replace(/\bJune\b/g,'Jun').replace(/\bJuly\b/g,'Jul').replace(/\bSeptember\b/g,'Sep').replace(/\bNovember\b/g,'Nov');
}
