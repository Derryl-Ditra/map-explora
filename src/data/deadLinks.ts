// 2026-11-22 cuts PR: source links confirmed dead when re-checked on
// 2026-11-22. Hidden from every render surface until the provider restores
// them. The venue data itself is unchanged so the links return when the URLs
// recover. Re-check results (two attempts each):
// - Rockstar winter schedule PDFs (AEON BSD, The Park Pejaten): 404.
// - studiorenang.com: whole site 502, root included (was also 502 in QC's
//   earlier run the same day), so every studiorenang.com link is hidden.
//   2026-11-24: the site is back up but outlet pages (e.g. /outlet/003/)
//   serve injected gambling spam; keep hidden until the site is clean again.
// - gymnademics.id: NXDOMAIN, the domain no longer resolves.
// thefuntasticgym.com/schedule/schedules-pondok-indah-mall-2/ returned 200
// with live schedule content on re-check, so it is NOT hidden.
const DEAD_PREFIXES: readonly string[] = [
  "https://www.rockstaracademy.com/lib/upload/files/club/BSD_Schedule_Winter_20261.pdf",
  "https://www.rockstaracademy.com/lib/upload/files/club/PJ_Schedule_Winter_20261.pdf",
  "https://studiorenang.com",
  "https://www.studiorenang.com",
  "https://gymnademics.id",
  "https://www.gymnademics.id",
];

export function isDeadSourceUrl(url?: string | null): boolean {
  return !!url && DEAD_PREFIXES.some((prefix) => url.startsWith(prefix));
}
