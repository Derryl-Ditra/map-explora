// 2026-11-25 PR #125 audit follow-up. Two data cleanups that belong with the
// audit fixes:
// 1. Eleven branches sat under "Jabodetabek (unclassified)" or the wrong
//    area/city; the audit re-placed them (Permata Hijau, Sunter, Harapan
//    Indah, Kemang Pratama, Serpong, BSD City, Gading Serpong, Alam Sutera).
// 2. 48 venues carried a redundant "N Bulan - N Tahun" note that only
//    restated the stored age range; the range already renders, so the note
//    is dropped.
import type { Venue } from "../types/venue";

const AREA_FIXES: Record<string, { area: string; city: string }> = {
  "baby-jumper-gym-gading-serpong": { area: "Gading Serpong", city: "Kabupaten Tangerang" },
  "english-1-permata-hijau": { area: "Permata Hijau", city: "Jakarta Selatan" },
  "english-1-sunter": { area: "Sunter", city: "Jakarta Utara" },
  "i-can-read-permata-hijau": { area: "Permata Hijau", city: "Jakarta Selatan" },
  "sparks-sports-academy-harapan-indah-bekasi": { area: "Harapan Indah", city: "Bekasi" },
  "sparks-sports-academy-kemang-pratama-bekasi": { area: "Kemang Pratama", city: "Bekasi" },
  "sparks-sports-academy-teras-kota-bsd": { area: "Serpong", city: "Tangerang Selatan" },
  "studiorenang-bsd-north-point": { area: "BSD City", city: "Kabupaten Tangerang" },
  "studiorenang-gading-serpong": { area: "Gading Serpong", city: "Kabupaten Tangerang" },
  "outgrow-alam-sutera": { area: "Alam Sutera", city: "Kota Tangerang" },
  "gymnademics-gading-serpong": { area: "Gading Serpong", city: "Kabupaten Tangerang" },
};

const REDUNDANT_AGE_NOTE = /^\d+ Bulan - \d+ Tahun$/;

export default function enrich1127(venues: Venue[]) {
  for (const v of venues) {
    const fix = AREA_FIXES[v.id];
    if (fix) {
      v.area = fix.area;
      v.city = fix.city;
    }
    for (const prog of v.programs ?? []) {
      const note = (prog as { note?: string }).note;
      if (note && REDUNDANT_AGE_NOTE.test(note)) {
        delete (prog as { note?: string }).note;
      }
    }
    const note = (v as { note?: string }).note;
    if (note && REDUNDANT_AGE_NOTE.test(note)) {
      delete (v as { note?: string }).note;
    }
  }
}
