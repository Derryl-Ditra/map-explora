// 2026-11-26 data hunt (owner request): links taken from each provider's own pages.
import type { Venue } from "../types/venue";

const LINKS: Record<string, { website?: string; instagram?: string }> = {
  // Club website. Its /kontak page lists BXC 2 as one of seven training venues; hours and the PR phone are club-wide, so neither is recorded.
  "bintaro-inline-skate": { website: "https://www.bintaroinlineskate.com/" },
  // https://smartkidz.co.id/cabang/kelapa-gading links "Instagram cabang" for this branch
  "smartkidz-kelapa-gading": { website: "https://smartkidz.co.id/cabang/kelapa-gading", instagram: "https://www.instagram.com/smartkidz.kelapagading/" },
  // https://harahapswimming.com/lokasi-jadwal-latihan-cabang-jagakarsa/ is the branch page. Its Instagram is school-wide, so it is not recorded.
  "harahap-jagakarsa": { website: "https://harahapswimming.com/lokasi-jadwal-latihan-cabang-jagakarsa/" },
};

export default function enrich1130(venues: Venue[]) {
  for (const v of venues) {
    const l = LINKS[v.id];
    if (l?.website && !v.website) v.website = l.website;
    if (l?.instagram && !v.instagram) v.instagram = l.instagram;
  }
}
