// 2026-11-26 data hunt (owner request): links and hours taken from each provider's own pages.
import type { Venue } from "../types/venue";

const LINKS: Record<string, { website?: string; instagram?: string }> = {
  // https://www.bintaroinlineskate.com/kontak lists this branch's address (Gedung Parkir BXC 2)
  "bintaro-inline-skate": { website: "https://www.bintaroinlineskate.com/" },
  // https://smartkidz.co.id/cabang/kelapa-gading links "Instagram cabang" for this branch
  "smartkidz-kelapa-gading": { website: "https://smartkidz.co.id/cabang/kelapa-gading", instagram: "https://www.instagram.com/smartkidz.kelapagading/" },
  // https://harahapswimming.com/lokasi-jadwal-latihan-cabang-jagakarsa/ (school-wide Instagram in its header)
  "harahap-jagakarsa": { website: "https://harahapswimming.com/lokasi-jadwal-latihan-cabang-jagakarsa/", instagram: "https://www.instagram.com/harahap_sc/" },
};

const HOURS: Record<string, { text: string; sourceUrl: string }> = {
  "bintaro-inline-skate": { text: "Mon-Fri 14:30-18:00, Sat-Sun 07:00-17:00", sourceUrl: "https://www.bintaroinlineskate.com/kontak" },
};

export default function enrich1130(venues: Venue[]) {
  for (const v of venues) {
    const l = LINKS[v.id];
    if (l?.website && !v.website) v.website = l.website;
    if (l?.instagram && !v.instagram) v.instagram = l.instagram;
    const h = HOURS[v.id];
    if (h && !v.openingHours) v.openingHours = { ...h, checkedAt: "2026-11-26" };
  }
}
