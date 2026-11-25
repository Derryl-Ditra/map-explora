import type { Venue } from "@/types/venue";

// 2026-11-24 depth batch 2 (owner-approved data-depth upgrade): Sparks Sports Academy,
// Sparks Swim, Studio Renang, Aquatic Baby. All sources provider-published and re-read
// 2026-11-24. None of these chains publish per-class fees (checked official sites and
// tiket.com/Traveloka/Fave/Klook 24 Nov 2026: no Indonesian listings for these venues);
// trial and program-format facts live in cardNote because priceListings require a
// published amount. Sparks Sports branch evidence stays at city-page level (classes vary
// by location), so program verification levels are unchanged - this batch re-verifies
// sources and adds depth notes only.

function venue(venues: Venue[], id: string): Venue {
  const v = venues.find((x) => x.id === id);
  if (!v) throw new Error(`enrich1125: missing venue ${id}`);
  return v;
}

export default function enrich1125(venues: Venue[]) {
  {
  const v = venue(venues, "sparks-sports-academy-bsd-tangerang");
  v.lastCheckedAt = "2026-11-24";
  v.cardNote = "Classes vary by branch; book via WhatsApp. No fees published.";
  // re-stamp operatingStatus only where its own source page was re-read today.
  // studiorenang.com outlet pages are excluded: outlet/003 currently serves injected
  // gambling spam (site compromise), so those sources are not re-verified.
  const osSource = v.operatingStatus && v.operatingStatus.source;
  if (osSource && /^(https:\/\/(academy\.sparks-edu\.com\/(jakarta|tangerang|bogor|bekasi|depok)\/|sparks-swim\.com\/|(www\.)?aquatic-baby\.com\/lokasi))/.test(osSource)) v.operatingStatus = { ...(v.operatingStatus as NonNullable<typeof v.operatingStatus>), checkedAt: "2026-11-24" };
  // re-stamp only program ages whose own source page was re-read today; dated social
    // announcements and other sources keep their original checkedAt.
  const REREAD = /^(https:\/\/(academy\.sparks-edu\.com\/(jakarta|tangerang|bogor|bekasi|depok)|sparks-swim\.com|studiorenang\.com\/programrenang|www\.aquatic-baby\.com\/program-1))/;
  for (const p of v.programs) { if (p.age && p.age.sourceCheckedAt && p.age.providerAgeUrl && REREAD.test(p.age.providerAgeUrl)) p.age = { ...p.age, sourceCheckedAt: "2026-11-24" }; }
  }
  {
  const v = venue(venues, "sparks-sports-academy-bintaro-utown");
  v.lastCheckedAt = "2026-11-24";
  v.cardNote = "Classes vary by branch; book via WhatsApp. No fees published.";
  // re-stamp operatingStatus only where its own source page was re-read today.
  // studiorenang.com outlet pages are excluded: outlet/003 currently serves injected
  // gambling spam (site compromise), so those sources are not re-verified.
  const osSource = v.operatingStatus && v.operatingStatus.source;
  if (osSource && /^(https:\/\/(academy\.sparks-edu\.com\/(jakarta|tangerang|bogor|bekasi|depok)\/|sparks-swim\.com\/|(www\.)?aquatic-baby\.com\/lokasi))/.test(osSource)) v.operatingStatus = { ...(v.operatingStatus as NonNullable<typeof v.operatingStatus>), checkedAt: "2026-11-24" };
  // re-stamp only program ages whose own source page was re-read today; dated social
    // announcements and other sources keep their original checkedAt.
  const REREAD = /^(https:\/\/(academy\.sparks-edu\.com\/(jakarta|tangerang|bogor|bekasi|depok)|sparks-swim\.com|studiorenang\.com\/programrenang|www\.aquatic-baby\.com\/program-1))/;
  for (const p of v.programs) { if (p.age && p.age.sourceCheckedAt && p.age.providerAgeUrl && REREAD.test(p.age.providerAgeUrl)) p.age = { ...p.age, sourceCheckedAt: "2026-11-24" }; }
  }
  {
  const v = venue(venues, "sparks-sports-academy-cibinong");
  v.lastCheckedAt = "2026-11-24";
  v.cardNote = "Classes vary by branch; book via WhatsApp. No fees published.";
  // re-stamp operatingStatus only where its own source page was re-read today.
  // studiorenang.com outlet pages are excluded: outlet/003 currently serves injected
  // gambling spam (site compromise), so those sources are not re-verified.
  const osSource = v.operatingStatus && v.operatingStatus.source;
  if (osSource && /^(https:\/\/(academy\.sparks-edu\.com\/(jakarta|tangerang|bogor|bekasi|depok)\/|sparks-swim\.com\/|(www\.)?aquatic-baby\.com\/lokasi))/.test(osSource)) v.operatingStatus = { ...(v.operatingStatus as NonNullable<typeof v.operatingStatus>), checkedAt: "2026-11-24" };
  // re-stamp only program ages whose own source page was re-read today; dated social
    // announcements and other sources keep their original checkedAt.
  const REREAD = /^(https:\/\/(academy\.sparks-edu\.com\/(jakarta|tangerang|bogor|bekasi|depok)|sparks-swim\.com|studiorenang\.com\/programrenang|www\.aquatic-baby\.com\/program-1))/;
  for (const p of v.programs) { if (p.age && p.age.sourceCheckedAt && p.age.providerAgeUrl && REREAD.test(p.age.providerAgeUrl)) p.age = { ...p.age, sourceCheckedAt: "2026-11-24" }; }
  }
  {
  const v = venue(venues, "sparks-sports-academy-cibubur");
  v.lastCheckedAt = "2026-11-24";
  v.cardNote = "Classes vary by branch; book via WhatsApp. No fees published.";
  // re-stamp operatingStatus only where its own source page was re-read today.
  // studiorenang.com outlet pages are excluded: outlet/003 currently serves injected
  // gambling spam (site compromise), so those sources are not re-verified.
  const osSource = v.operatingStatus && v.operatingStatus.source;
  if (osSource && /^(https:\/\/(academy\.sparks-edu\.com\/(jakarta|tangerang|bogor|bekasi|depok)\/|sparks-swim\.com\/|(www\.)?aquatic-baby\.com\/lokasi))/.test(osSource)) v.operatingStatus = { ...(v.operatingStatus as NonNullable<typeof v.operatingStatus>), checkedAt: "2026-11-24" };
  // re-stamp only program ages whose own source page was re-read today; dated social
    // announcements and other sources keep their original checkedAt.
  const REREAD = /^(https:\/\/(academy\.sparks-edu\.com\/(jakarta|tangerang|bogor|bekasi|depok)|sparks-swim\.com|studiorenang\.com\/programrenang|www\.aquatic-baby\.com\/program-1))/;
  for (const p of v.programs) { if (p.age && p.age.sourceCheckedAt && p.age.providerAgeUrl && REREAD.test(p.age.providerAgeUrl)) p.age = { ...p.age, sourceCheckedAt: "2026-11-24" }; }
  }
  {
  const v = venue(venues, "sparks-sports-academy-harapan-indah-bekasi");
  v.lastCheckedAt = "2026-11-24";
  v.cardNote = "Classes vary by branch; book via WhatsApp. No fees published.";
  // re-stamp operatingStatus only where its own source page was re-read today.
  // studiorenang.com outlet pages are excluded: outlet/003 currently serves injected
  // gambling spam (site compromise), so those sources are not re-verified.
  const osSource = v.operatingStatus && v.operatingStatus.source;
  if (osSource && /^(https:\/\/(academy\.sparks-edu\.com\/(jakarta|tangerang|bogor|bekasi|depok)\/|sparks-swim\.com\/|(www\.)?aquatic-baby\.com\/lokasi))/.test(osSource)) v.operatingStatus = { ...(v.operatingStatus as NonNullable<typeof v.operatingStatus>), checkedAt: "2026-11-24" };
  // re-stamp only program ages whose own source page was re-read today; dated social
    // announcements and other sources keep their original checkedAt.
  const REREAD = /^(https:\/\/(academy\.sparks-edu\.com\/(jakarta|tangerang|bogor|bekasi|depok)|sparks-swim\.com|studiorenang\.com\/programrenang|www\.aquatic-baby\.com\/program-1))/;
  for (const p of v.programs) { if (p.age && p.age.sourceCheckedAt && p.age.providerAgeUrl && REREAD.test(p.age.providerAgeUrl)) p.age = { ...p.age, sourceCheckedAt: "2026-11-24" }; }
  }
  {
  const v = venue(venues, "sparks-sports-academy-kalimalang");
  v.lastCheckedAt = "2026-11-24";
  v.cardNote = "Classes vary by branch; book via WhatsApp. No fees published.";
  // re-stamp operatingStatus only where its own source page was re-read today.
  // studiorenang.com outlet pages are excluded: outlet/003 currently serves injected
  // gambling spam (site compromise), so those sources are not re-verified.
  const osSource = v.operatingStatus && v.operatingStatus.source;
  if (osSource && /^(https:\/\/(academy\.sparks-edu\.com\/(jakarta|tangerang|bogor|bekasi|depok)\/|sparks-swim\.com\/|(www\.)?aquatic-baby\.com\/lokasi))/.test(osSource)) v.operatingStatus = { ...(v.operatingStatus as NonNullable<typeof v.operatingStatus>), checkedAt: "2026-11-24" };
  // re-stamp only program ages whose own source page was re-read today; dated social
    // announcements and other sources keep their original checkedAt.
  const REREAD = /^(https:\/\/(academy\.sparks-edu\.com\/(jakarta|tangerang|bogor|bekasi|depok)|sparks-swim\.com|studiorenang\.com\/programrenang|www\.aquatic-baby\.com\/program-1))/;
  for (const p of v.programs) { if (p.age && p.age.sourceCheckedAt && p.age.providerAgeUrl && REREAD.test(p.age.providerAgeUrl)) p.age = { ...p.age, sourceCheckedAt: "2026-11-24" }; }
  }
  {
  const v = venue(venues, "sparks-sports-academy-karawaci");
  v.lastCheckedAt = "2026-11-24";
  v.cardNote = "Classes vary by branch; book via WhatsApp. No fees published.";
  // re-stamp operatingStatus only where its own source page was re-read today.
  // studiorenang.com outlet pages are excluded: outlet/003 currently serves injected
  // gambling spam (site compromise), so those sources are not re-verified.
  const osSource = v.operatingStatus && v.operatingStatus.source;
  if (osSource && /^(https:\/\/(academy\.sparks-edu\.com\/(jakarta|tangerang|bogor|bekasi|depok)\/|sparks-swim\.com\/|(www\.)?aquatic-baby\.com\/lokasi))/.test(osSource)) v.operatingStatus = { ...(v.operatingStatus as NonNullable<typeof v.operatingStatus>), checkedAt: "2026-11-24" };
  // re-stamp only program ages whose own source page was re-read today; dated social
    // announcements and other sources keep their original checkedAt.
  const REREAD = /^(https:\/\/(academy\.sparks-edu\.com\/(jakarta|tangerang|bogor|bekasi|depok)|sparks-swim\.com|studiorenang\.com\/programrenang|www\.aquatic-baby\.com\/program-1))/;
  for (const p of v.programs) { if (p.age && p.age.sourceCheckedAt && p.age.providerAgeUrl && REREAD.test(p.age.providerAgeUrl)) p.age = { ...p.age, sourceCheckedAt: "2026-11-24" }; }
  }
  {
  const v = venue(venues, "sparks-sports-academy-kelapa-gading-2");
  v.lastCheckedAt = "2026-11-24";
  v.cardNote = "Classes vary by branch; book via WhatsApp. No fees published.";
  // re-stamp operatingStatus only where its own source page was re-read today.
  // studiorenang.com outlet pages are excluded: outlet/003 currently serves injected
  // gambling spam (site compromise), so those sources are not re-verified.
  const osSource = v.operatingStatus && v.operatingStatus.source;
  if (osSource && /^(https:\/\/(academy\.sparks-edu\.com\/(jakarta|tangerang|bogor|bekasi|depok)\/|sparks-swim\.com\/|(www\.)?aquatic-baby\.com\/lokasi))/.test(osSource)) v.operatingStatus = { ...(v.operatingStatus as NonNullable<typeof v.operatingStatus>), checkedAt: "2026-11-24" };
  // re-stamp only program ages whose own source page was re-read today; dated social
    // announcements and other sources keep their original checkedAt.
  const REREAD = /^(https:\/\/(academy\.sparks-edu\.com\/(jakarta|tangerang|bogor|bekasi|depok)|sparks-swim\.com|studiorenang\.com\/programrenang|www\.aquatic-baby\.com\/program-1))/;
  for (const p of v.programs) { if (p.age && p.age.sourceCheckedAt && p.age.providerAgeUrl && REREAD.test(p.age.providerAgeUrl)) p.age = { ...p.age, sourceCheckedAt: "2026-11-24" }; }
  }
  {
  const v = venue(venues, "sparks-sports-academy-kelapa-gading-jakarta");
  v.lastCheckedAt = "2026-11-24";
  v.cardNote = "Classes vary by branch; book via WhatsApp. No fees published.";
  // re-stamp operatingStatus only where its own source page was re-read today.
  // studiorenang.com outlet pages are excluded: outlet/003 currently serves injected
  // gambling spam (site compromise), so those sources are not re-verified.
  const osSource = v.operatingStatus && v.operatingStatus.source;
  if (osSource && /^(https:\/\/(academy\.sparks-edu\.com\/(jakarta|tangerang|bogor|bekasi|depok)\/|sparks-swim\.com\/|(www\.)?aquatic-baby\.com\/lokasi))/.test(osSource)) v.operatingStatus = { ...(v.operatingStatus as NonNullable<typeof v.operatingStatus>), checkedAt: "2026-11-24" };
  // re-stamp only program ages whose own source page was re-read today; dated social
    // announcements and other sources keep their original checkedAt.
  const REREAD = /^(https:\/\/(academy\.sparks-edu\.com\/(jakarta|tangerang|bogor|bekasi|depok)|sparks-swim\.com|studiorenang\.com\/programrenang|www\.aquatic-baby\.com\/program-1))/;
  for (const p of v.programs) { if (p.age && p.age.sourceCheckedAt && p.age.providerAgeUrl && REREAD.test(p.age.providerAgeUrl)) p.age = { ...p.age, sourceCheckedAt: "2026-11-24" }; }
  }
  {
  const v = venue(venues, "sparks-sports-academy-kemang-ampera");
  v.lastCheckedAt = "2026-11-24";
  v.cardNote = "Classes vary by branch; book via WhatsApp. No fees published.";
  // re-stamp operatingStatus only where its own source page was re-read today.
  // studiorenang.com outlet pages are excluded: outlet/003 currently serves injected
  // gambling spam (site compromise), so those sources are not re-verified.
  const osSource = v.operatingStatus && v.operatingStatus.source;
  if (osSource && /^(https:\/\/(academy\.sparks-edu\.com\/(jakarta|tangerang|bogor|bekasi|depok)\/|sparks-swim\.com\/|(www\.)?aquatic-baby\.com\/lokasi))/.test(osSource)) v.operatingStatus = { ...(v.operatingStatus as NonNullable<typeof v.operatingStatus>), checkedAt: "2026-11-24" };
  // re-stamp only program ages whose own source page was re-read today; dated social
    // announcements and other sources keep their original checkedAt.
  const REREAD = /^(https:\/\/(academy\.sparks-edu\.com\/(jakarta|tangerang|bogor|bekasi|depok)|sparks-swim\.com|studiorenang\.com\/programrenang|www\.aquatic-baby\.com\/program-1))/;
  for (const p of v.programs) { if (p.age && p.age.sourceCheckedAt && p.age.providerAgeUrl && REREAD.test(p.age.providerAgeUrl)) p.age = { ...p.age, sourceCheckedAt: "2026-11-24" }; }
  }
  {
  const v = venue(venues, "sparks-sports-academy-kemang-pratama-bekasi");
  v.lastCheckedAt = "2026-11-24";
  v.cardNote = "Classes vary by branch; book via WhatsApp. No fees published.";
  // re-stamp operatingStatus only where its own source page was re-read today.
  // studiorenang.com outlet pages are excluded: outlet/003 currently serves injected
  // gambling spam (site compromise), so those sources are not re-verified.
  const osSource = v.operatingStatus && v.operatingStatus.source;
  if (osSource && /^(https:\/\/(academy\.sparks-edu\.com\/(jakarta|tangerang|bogor|bekasi|depok)\/|sparks-swim\.com\/|(www\.)?aquatic-baby\.com\/lokasi))/.test(osSource)) v.operatingStatus = { ...(v.operatingStatus as NonNullable<typeof v.operatingStatus>), checkedAt: "2026-11-24" };
  // re-stamp only program ages whose own source page was re-read today; dated social
    // announcements and other sources keep their original checkedAt.
  const REREAD = /^(https:\/\/(academy\.sparks-edu\.com\/(jakarta|tangerang|bogor|bekasi|depok)|sparks-swim\.com|studiorenang\.com\/programrenang|www\.aquatic-baby\.com\/program-1))/;
  for (const p of v.programs) { if (p.age && p.age.sourceCheckedAt && p.age.providerAgeUrl && REREAD.test(p.age.providerAgeUrl)) p.age = { ...p.age, sourceCheckedAt: "2026-11-24" }; }
  }
  {
  const v = venue(venues, "sparks-sports-academy-mrg");
  v.lastCheckedAt = "2026-11-24";
  v.cardNote = "Classes vary by branch; book via WhatsApp. No fees published.";
  // re-stamp operatingStatus only where its own source page was re-read today.
  // studiorenang.com outlet pages are excluded: outlet/003 currently serves injected
  // gambling spam (site compromise), so those sources are not re-verified.
  const osSource = v.operatingStatus && v.operatingStatus.source;
  if (osSource && /^(https:\/\/(academy\.sparks-edu\.com\/(jakarta|tangerang|bogor|bekasi|depok)\/|sparks-swim\.com\/|(www\.)?aquatic-baby\.com\/lokasi))/.test(osSource)) v.operatingStatus = { ...(v.operatingStatus as NonNullable<typeof v.operatingStatus>), checkedAt: "2026-11-24" };
  // re-stamp only program ages whose own source page was re-read today; dated social
    // announcements and other sources keep their original checkedAt.
  const REREAD = /^(https:\/\/(academy\.sparks-edu\.com\/(jakarta|tangerang|bogor|bekasi|depok)|sparks-swim\.com|studiorenang\.com\/programrenang|www\.aquatic-baby\.com\/program-1))/;
  for (const p of v.programs) { if (p.age && p.age.sourceCheckedAt && p.age.providerAgeUrl && REREAD.test(p.age.providerAgeUrl)) p.age = { ...p.age, sourceCheckedAt: "2026-11-24" }; }
  }
  {
  const v = venue(venues, "sparks-sports-academy-pajajaran-bogor");
  v.lastCheckedAt = "2026-11-24";
  v.cardNote = "Classes vary by branch; book via WhatsApp. No fees published.";
  // re-stamp operatingStatus only where its own source page was re-read today.
  // studiorenang.com outlet pages are excluded: outlet/003 currently serves injected
  // gambling spam (site compromise), so those sources are not re-verified.
  const osSource = v.operatingStatus && v.operatingStatus.source;
  if (osSource && /^(https:\/\/(academy\.sparks-edu\.com\/(jakarta|tangerang|bogor|bekasi|depok)\/|sparks-swim\.com\/|(www\.)?aquatic-baby\.com\/lokasi))/.test(osSource)) v.operatingStatus = { ...(v.operatingStatus as NonNullable<typeof v.operatingStatus>), checkedAt: "2026-11-24" };
  // re-stamp only program ages whose own source page was re-read today; dated social
    // announcements and other sources keep their original checkedAt.
  const REREAD = /^(https:\/\/(academy\.sparks-edu\.com\/(jakarta|tangerang|bogor|bekasi|depok)|sparks-swim\.com|studiorenang\.com\/programrenang|www\.aquatic-baby\.com\/program-1))/;
  for (const p of v.programs) { if (p.age && p.age.sourceCheckedAt && p.age.providerAgeUrl && REREAD.test(p.age.providerAgeUrl)) p.age = { ...p.age, sourceCheckedAt: "2026-11-24" }; }
  }
  {
  const v = venue(venues, "sparks-sports-academy-pamulang");
  v.lastCheckedAt = "2026-11-24";
  v.cardNote = "Classes vary by branch; book via WhatsApp. No fees published.";
  // re-stamp operatingStatus only where its own source page was re-read today.
  // studiorenang.com outlet pages are excluded: outlet/003 currently serves injected
  // gambling spam (site compromise), so those sources are not re-verified.
  const osSource = v.operatingStatus && v.operatingStatus.source;
  if (osSource && /^(https:\/\/(academy\.sparks-edu\.com\/(jakarta|tangerang|bogor|bekasi|depok)\/|sparks-swim\.com\/|(www\.)?aquatic-baby\.com\/lokasi))/.test(osSource)) v.operatingStatus = { ...(v.operatingStatus as NonNullable<typeof v.operatingStatus>), checkedAt: "2026-11-24" };
  // re-stamp only program ages whose own source page was re-read today; dated social
    // announcements and other sources keep their original checkedAt.
  const REREAD = /^(https:\/\/(academy\.sparks-edu\.com\/(jakarta|tangerang|bogor|bekasi|depok)|sparks-swim\.com|studiorenang\.com\/programrenang|www\.aquatic-baby\.com\/program-1))/;
  for (const p of v.programs) { if (p.age && p.age.sourceCheckedAt && p.age.providerAgeUrl && REREAD.test(p.age.providerAgeUrl)) p.age = { ...p.age, sourceCheckedAt: "2026-11-24" }; }
  }
  {
  const v = venue(venues, "sparks-sports-academy-pejaten");
  v.lastCheckedAt = "2026-11-24";
  v.cardNote = "Classes vary by branch; book via WhatsApp. No fees published.";
  // re-stamp operatingStatus only where its own source page was re-read today.
  // studiorenang.com outlet pages are excluded: outlet/003 currently serves injected
  // gambling spam (site compromise), so those sources are not re-verified.
  const osSource = v.operatingStatus && v.operatingStatus.source;
  if (osSource && /^(https:\/\/(academy\.sparks-edu\.com\/(jakarta|tangerang|bogor|bekasi|depok)\/|sparks-swim\.com\/|(www\.)?aquatic-baby\.com\/lokasi))/.test(osSource)) v.operatingStatus = { ...(v.operatingStatus as NonNullable<typeof v.operatingStatus>), checkedAt: "2026-11-24" };
  // re-stamp only program ages whose own source page was re-read today; dated social
    // announcements and other sources keep their original checkedAt.
  const REREAD = /^(https:\/\/(academy\.sparks-edu\.com\/(jakarta|tangerang|bogor|bekasi|depok)|sparks-swim\.com|studiorenang\.com\/programrenang|www\.aquatic-baby\.com\/program-1))/;
  for (const p of v.programs) { if (p.age && p.age.sourceCheckedAt && p.age.providerAgeUrl && REREAD.test(p.age.providerAgeUrl)) p.age = { ...p.age, sourceCheckedAt: "2026-11-24" }; }
  }
  {
  const v = venue(venues, "sparks-sports-academy-sawangan");
  v.lastCheckedAt = "2026-11-24";
  v.cardNote = "Classes vary by branch; book via WhatsApp. No fees published.";
  // re-stamp operatingStatus only where its own source page was re-read today.
  // studiorenang.com outlet pages are excluded: outlet/003 currently serves injected
  // gambling spam (site compromise), so those sources are not re-verified.
  const osSource = v.operatingStatus && v.operatingStatus.source;
  if (osSource && /^(https:\/\/(academy\.sparks-edu\.com\/(jakarta|tangerang|bogor|bekasi|depok)\/|sparks-swim\.com\/|(www\.)?aquatic-baby\.com\/lokasi))/.test(osSource)) v.operatingStatus = { ...(v.operatingStatus as NonNullable<typeof v.operatingStatus>), checkedAt: "2026-11-24" };
  // re-stamp only program ages whose own source page was re-read today; dated social
    // announcements and other sources keep their original checkedAt.
  const REREAD = /^(https:\/\/(academy\.sparks-edu\.com\/(jakarta|tangerang|bogor|bekasi|depok)|sparks-swim\.com|studiorenang\.com\/programrenang|www\.aquatic-baby\.com\/program-1))/;
  for (const p of v.programs) { if (p.age && p.age.sourceCheckedAt && p.age.providerAgeUrl && REREAD.test(p.age.providerAgeUrl)) p.age = { ...p.age, sourceCheckedAt: "2026-11-24" }; }
  }
  {
  const v = venue(venues, "sparks-sports-academy-siliwangi");
  v.lastCheckedAt = "2026-11-24";
  v.cardNote = "Classes vary by branch; book via WhatsApp. No fees published.";
  // re-stamp operatingStatus only where its own source page was re-read today.
  // studiorenang.com outlet pages are excluded: outlet/003 currently serves injected
  // gambling spam (site compromise), so those sources are not re-verified.
  const osSource = v.operatingStatus && v.operatingStatus.source;
  if (osSource && /^(https:\/\/(academy\.sparks-edu\.com\/(jakarta|tangerang|bogor|bekasi|depok)\/|sparks-swim\.com\/|(www\.)?aquatic-baby\.com\/lokasi))/.test(osSource)) v.operatingStatus = { ...(v.operatingStatus as NonNullable<typeof v.operatingStatus>), checkedAt: "2026-11-24" };
  // re-stamp only program ages whose own source page was re-read today; dated social
    // announcements and other sources keep their original checkedAt.
  const REREAD = /^(https:\/\/(academy\.sparks-edu\.com\/(jakarta|tangerang|bogor|bekasi|depok)|sparks-swim\.com|studiorenang\.com\/programrenang|www\.aquatic-baby\.com\/program-1))/;
  for (const p of v.programs) { if (p.age && p.age.sourceCheckedAt && p.age.providerAgeUrl && REREAD.test(p.age.providerAgeUrl)) p.age = { ...p.age, sourceCheckedAt: "2026-11-24" }; }
  }
  {
  const v = venue(venues, "sparks-sports-academy-sunter");
  v.lastCheckedAt = "2026-11-24";
  v.cardNote = "Classes vary by branch; book via WhatsApp. No fees published.";
  // re-stamp operatingStatus only where its own source page was re-read today.
  // studiorenang.com outlet pages are excluded: outlet/003 currently serves injected
  // gambling spam (site compromise), so those sources are not re-verified.
  const osSource = v.operatingStatus && v.operatingStatus.source;
  if (osSource && /^(https:\/\/(academy\.sparks-edu\.com\/(jakarta|tangerang|bogor|bekasi|depok)\/|sparks-swim\.com\/|(www\.)?aquatic-baby\.com\/lokasi))/.test(osSource)) v.operatingStatus = { ...(v.operatingStatus as NonNullable<typeof v.operatingStatus>), checkedAt: "2026-11-24" };
  // re-stamp only program ages whose own source page was re-read today; dated social
    // announcements and other sources keep their original checkedAt.
  const REREAD = /^(https:\/\/(academy\.sparks-edu\.com\/(jakarta|tangerang|bogor|bekasi|depok)|sparks-swim\.com|studiorenang\.com\/programrenang|www\.aquatic-baby\.com\/program-1))/;
  for (const p of v.programs) { if (p.age && p.age.sourceCheckedAt && p.age.providerAgeUrl && REREAD.test(p.age.providerAgeUrl)) p.age = { ...p.age, sourceCheckedAt: "2026-11-24" }; }
  }
  {
  const v = venue(venues, "sparks-sports-academy-taman-mini-square");
  v.lastCheckedAt = "2026-11-24";
  v.cardNote = "Classes vary by branch; book via WhatsApp. No fees published.";
  // re-stamp operatingStatus only where its own source page was re-read today.
  // studiorenang.com outlet pages are excluded: outlet/003 currently serves injected
  // gambling spam (site compromise), so those sources are not re-verified.
  const osSource = v.operatingStatus && v.operatingStatus.source;
  if (osSource && /^(https:\/\/(academy\.sparks-edu\.com\/(jakarta|tangerang|bogor|bekasi|depok)\/|sparks-swim\.com\/|(www\.)?aquatic-baby\.com\/lokasi))/.test(osSource)) v.operatingStatus = { ...(v.operatingStatus as NonNullable<typeof v.operatingStatus>), checkedAt: "2026-11-24" };
  // re-stamp only program ages whose own source page was re-read today; dated social
    // announcements and other sources keep their original checkedAt.
  const REREAD = /^(https:\/\/(academy\.sparks-edu\.com\/(jakarta|tangerang|bogor|bekasi|depok)|sparks-swim\.com|studiorenang\.com\/programrenang|www\.aquatic-baby\.com\/program-1))/;
  for (const p of v.programs) { if (p.age && p.age.sourceCheckedAt && p.age.providerAgeUrl && REREAD.test(p.age.providerAgeUrl)) p.age = { ...p.age, sourceCheckedAt: "2026-11-24" }; }
  }
  {
  const v = venue(venues, "sparks-sports-academy-taman-palem");
  v.lastCheckedAt = "2026-11-24";
  v.cardNote = "Classes vary by branch; book via WhatsApp. No fees published.";
  // re-stamp operatingStatus only where its own source page was re-read today.
  // studiorenang.com outlet pages are excluded: outlet/003 currently serves injected
  // gambling spam (site compromise), so those sources are not re-verified.
  const osSource = v.operatingStatus && v.operatingStatus.source;
  if (osSource && /^(https:\/\/(academy\.sparks-edu\.com\/(jakarta|tangerang|bogor|bekasi|depok)\/|sparks-swim\.com\/|(www\.)?aquatic-baby\.com\/lokasi))/.test(osSource)) v.operatingStatus = { ...(v.operatingStatus as NonNullable<typeof v.operatingStatus>), checkedAt: "2026-11-24" };
  // re-stamp only program ages whose own source page was re-read today; dated social
    // announcements and other sources keep their original checkedAt.
  const REREAD = /^(https:\/\/(academy\.sparks-edu\.com\/(jakarta|tangerang|bogor|bekasi|depok)|sparks-swim\.com|studiorenang\.com\/programrenang|www\.aquatic-baby\.com\/program-1))/;
  for (const p of v.programs) { if (p.age && p.age.sourceCheckedAt && p.age.providerAgeUrl && REREAD.test(p.age.providerAgeUrl)) p.age = { ...p.age, sourceCheckedAt: "2026-11-24" }; }
  }
  {
  const v = venue(venues, "sparks-sports-academy-tangerang-city");
  v.lastCheckedAt = "2026-11-24";
  v.cardNote = "Classes vary by branch; book via WhatsApp. No fees published.";
  // re-stamp operatingStatus only where its own source page was re-read today.
  // studiorenang.com outlet pages are excluded: outlet/003 currently serves injected
  // gambling spam (site compromise), so those sources are not re-verified.
  const osSource = v.operatingStatus && v.operatingStatus.source;
  if (osSource && /^(https:\/\/(academy\.sparks-edu\.com\/(jakarta|tangerang|bogor|bekasi|depok)\/|sparks-swim\.com\/|(www\.)?aquatic-baby\.com\/lokasi))/.test(osSource)) v.operatingStatus = { ...(v.operatingStatus as NonNullable<typeof v.operatingStatus>), checkedAt: "2026-11-24" };
  // re-stamp only program ages whose own source page was re-read today; dated social
    // announcements and other sources keep their original checkedAt.
  const REREAD = /^(https:\/\/(academy\.sparks-edu\.com\/(jakarta|tangerang|bogor|bekasi|depok)|sparks-swim\.com|studiorenang\.com\/programrenang|www\.aquatic-baby\.com\/program-1))/;
  for (const p of v.programs) { if (p.age && p.age.sourceCheckedAt && p.age.providerAgeUrl && REREAD.test(p.age.providerAgeUrl)) p.age = { ...p.age, sourceCheckedAt: "2026-11-24" }; }
  }
  {
  const v = venue(venues, "sparks-sports-academy-tanjung-duren");
  v.lastCheckedAt = "2026-11-24";
  v.cardNote = "Classes vary by branch; book via WhatsApp. No fees published.";
  // re-stamp operatingStatus only where its own source page was re-read today.
  // studiorenang.com outlet pages are excluded: outlet/003 currently serves injected
  // gambling spam (site compromise), so those sources are not re-verified.
  const osSource = v.operatingStatus && v.operatingStatus.source;
  if (osSource && /^(https:\/\/(academy\.sparks-edu\.com\/(jakarta|tangerang|bogor|bekasi|depok)\/|sparks-swim\.com\/|(www\.)?aquatic-baby\.com\/lokasi))/.test(osSource)) v.operatingStatus = { ...(v.operatingStatus as NonNullable<typeof v.operatingStatus>), checkedAt: "2026-11-24" };
  // re-stamp only program ages whose own source page was re-read today; dated social
    // announcements and other sources keep their original checkedAt.
  const REREAD = /^(https:\/\/(academy\.sparks-edu\.com\/(jakarta|tangerang|bogor|bekasi|depok)|sparks-swim\.com|studiorenang\.com\/programrenang|www\.aquatic-baby\.com\/program-1))/;
  for (const p of v.programs) { if (p.age && p.age.sourceCheckedAt && p.age.providerAgeUrl && REREAD.test(p.age.providerAgeUrl)) p.age = { ...p.age, sourceCheckedAt: "2026-11-24" }; }
  }
  {
  const v = venue(venues, "sparks-sports-academy-cikarang");
  v.lastCheckedAt = "2026-11-24";
  v.cardNote = "Classes vary by branch; book via WhatsApp. No fees published.";
  // re-stamp operatingStatus only where its own source page was re-read today.
  // studiorenang.com outlet pages are excluded: outlet/003 currently serves injected
  // gambling spam (site compromise), so those sources are not re-verified.
  const osSource = v.operatingStatus && v.operatingStatus.source;
  if (osSource && /^(https:\/\/(academy\.sparks-edu\.com\/(jakarta|tangerang|bogor|bekasi|depok)\/|sparks-swim\.com\/|(www\.)?aquatic-baby\.com\/lokasi))/.test(osSource)) v.operatingStatus = { ...(v.operatingStatus as NonNullable<typeof v.operatingStatus>), checkedAt: "2026-11-24" };
  // re-stamp only program ages whose own source page was re-read today; dated social
    // announcements and other sources keep their original checkedAt.
  const REREAD = /^(https:\/\/(academy\.sparks-edu\.com\/(jakarta|tangerang|bogor|bekasi|depok)|sparks-swim\.com|studiorenang\.com\/programrenang|www\.aquatic-baby\.com\/program-1))/;
  for (const p of v.programs) { if (p.age && p.age.sourceCheckedAt && p.age.providerAgeUrl && REREAD.test(p.age.providerAgeUrl)) p.age = { ...p.age, sourceCheckedAt: "2026-11-24" }; }
  }
  {
  const v = venue(venues, "sparks-sports-academy-teras-kota-bsd");
  v.lastCheckedAt = "2026-11-24";
  v.cardNote = "Classes vary by branch; book via WhatsApp. No fees published.";
  // re-stamp operatingStatus only where its own source page was re-read today.
  // studiorenang.com outlet pages are excluded: outlet/003 currently serves injected
  // gambling spam (site compromise), so those sources are not re-verified.
  const osSource = v.operatingStatus && v.operatingStatus.source;
  if (osSource && /^(https:\/\/(academy\.sparks-edu\.com\/(jakarta|tangerang|bogor|bekasi|depok)\/|sparks-swim\.com\/|(www\.)?aquatic-baby\.com\/lokasi))/.test(osSource)) v.operatingStatus = { ...(v.operatingStatus as NonNullable<typeof v.operatingStatus>), checkedAt: "2026-11-24" };
  // re-stamp only program ages whose own source page was re-read today; dated social
    // announcements and other sources keep their original checkedAt.
  const REREAD = /^(https:\/\/(academy\.sparks-edu\.com\/(jakarta|tangerang|bogor|bekasi|depok)|sparks-swim\.com|studiorenang\.com\/programrenang|www\.aquatic-baby\.com\/program-1))/;
  for (const p of v.programs) { if (p.age && p.age.sourceCheckedAt && p.age.providerAgeUrl && REREAD.test(p.age.providerAgeUrl)) p.age = { ...p.age, sourceCheckedAt: "2026-11-24" }; }
  }

  {
  const v = venue(venues, "sparks-swim-karawaci");
  v.lastCheckedAt = "2026-11-24";
  v.cardNote = "Free trial class first; semi-private, max 5 children per coach. No fees published.";
  // re-stamp operatingStatus only where its own source page was re-read today.
  // studiorenang.com outlet pages are excluded: outlet/003 currently serves injected
  // gambling spam (site compromise), so those sources are not re-verified.
  const osSource = v.operatingStatus && v.operatingStatus.source;
  if (osSource && /^(https:\/\/(academy\.sparks-edu\.com\/(jakarta|tangerang|bogor|bekasi|depok)\/|sparks-swim\.com\/|(www\.)?aquatic-baby\.com\/lokasi))/.test(osSource)) v.operatingStatus = { ...(v.operatingStatus as NonNullable<typeof v.operatingStatus>), checkedAt: "2026-11-24" };
  // re-stamp only program ages whose own source page was re-read today; dated social
    // announcements and other sources keep their original checkedAt.
  const REREAD = /^(https:\/\/(academy\.sparks-edu\.com\/(jakarta|tangerang|bogor|bekasi|depok)|sparks-swim\.com|studiorenang\.com\/programrenang|www\.aquatic-baby\.com\/program-1))/;
  for (const p of v.programs) { if (p.age && p.age.sourceCheckedAt && p.age.providerAgeUrl && REREAD.test(p.age.providerAgeUrl)) p.age = { ...p.age, sourceCheckedAt: "2026-11-24" }; }
  }
  {
  const v = venue(venues, "sparks-swim-bintaro-utown");
  v.lastCheckedAt = "2026-11-24";
  v.cardNote = "Free trial class first; semi-private, max 5 children per coach. No fees published.";
  // re-stamp operatingStatus only where its own source page was re-read today.
  // studiorenang.com outlet pages are excluded: outlet/003 currently serves injected
  // gambling spam (site compromise), so those sources are not re-verified.
  const osSource = v.operatingStatus && v.operatingStatus.source;
  if (osSource && /^(https:\/\/(academy\.sparks-edu\.com\/(jakarta|tangerang|bogor|bekasi|depok)\/|sparks-swim\.com\/|(www\.)?aquatic-baby\.com\/lokasi))/.test(osSource)) v.operatingStatus = { ...(v.operatingStatus as NonNullable<typeof v.operatingStatus>), checkedAt: "2026-11-24" };
  // re-stamp only program ages whose own source page was re-read today; dated social
    // announcements and other sources keep their original checkedAt.
  const REREAD = /^(https:\/\/(academy\.sparks-edu\.com\/(jakarta|tangerang|bogor|bekasi|depok)|sparks-swim\.com|studiorenang\.com\/programrenang|www\.aquatic-baby\.com\/program-1))/;
  for (const p of v.programs) { if (p.age && p.age.sourceCheckedAt && p.age.providerAgeUrl && REREAD.test(p.age.providerAgeUrl)) p.age = { ...p.age, sourceCheckedAt: "2026-11-24" }; }
  }
  {
  const v = venue(venues, "sparks-swim-pamulang");
  v.lastCheckedAt = "2026-11-24";
  v.cardNote = "Free trial class first; semi-private, max 5 children per coach. No fees published.";
  // re-stamp operatingStatus only where its own source page was re-read today.
  // studiorenang.com outlet pages are excluded: outlet/003 currently serves injected
  // gambling spam (site compromise), so those sources are not re-verified.
  const osSource = v.operatingStatus && v.operatingStatus.source;
  if (osSource && /^(https:\/\/(academy\.sparks-edu\.com\/(jakarta|tangerang|bogor|bekasi|depok)\/|sparks-swim\.com\/|(www\.)?aquatic-baby\.com\/lokasi))/.test(osSource)) v.operatingStatus = { ...(v.operatingStatus as NonNullable<typeof v.operatingStatus>), checkedAt: "2026-11-24" };
  // re-stamp only program ages whose own source page was re-read today; dated social
    // announcements and other sources keep their original checkedAt.
  const REREAD = /^(https:\/\/(academy\.sparks-edu\.com\/(jakarta|tangerang|bogor|bekasi|depok)|sparks-swim\.com|studiorenang\.com\/programrenang|www\.aquatic-baby\.com\/program-1))/;
  for (const p of v.programs) { if (p.age && p.age.sourceCheckedAt && p.age.providerAgeUrl && REREAD.test(p.age.providerAgeUrl)) p.age = { ...p.age, sourceCheckedAt: "2026-11-24" }; }
  }
  {
  const v = venue(venues, "sparks-swim-kalimalang");
  v.lastCheckedAt = "2026-11-24";
  v.cardNote = "Free trial class first; semi-private, max 5 children per coach. No fees published.";
  // re-stamp operatingStatus only where its own source page was re-read today.
  // studiorenang.com outlet pages are excluded: outlet/003 currently serves injected
  // gambling spam (site compromise), so those sources are not re-verified.
  const osSource = v.operatingStatus && v.operatingStatus.source;
  if (osSource && /^(https:\/\/(academy\.sparks-edu\.com\/(jakarta|tangerang|bogor|bekasi|depok)\/|sparks-swim\.com\/|(www\.)?aquatic-baby\.com\/lokasi))/.test(osSource)) v.operatingStatus = { ...(v.operatingStatus as NonNullable<typeof v.operatingStatus>), checkedAt: "2026-11-24" };
  // re-stamp only program ages whose own source page was re-read today; dated social
    // announcements and other sources keep their original checkedAt.
  const REREAD = /^(https:\/\/(academy\.sparks-edu\.com\/(jakarta|tangerang|bogor|bekasi|depok)|sparks-swim\.com|studiorenang\.com\/programrenang|www\.aquatic-baby\.com\/program-1))/;
  for (const p of v.programs) { if (p.age && p.age.sourceCheckedAt && p.age.providerAgeUrl && REREAD.test(p.age.providerAgeUrl)) p.age = { ...p.age, sourceCheckedAt: "2026-11-24" }; }
  }
  {
  const v = venue(venues, "sparks-swim-harapan-indah");
  v.lastCheckedAt = "2026-11-24";
  v.cardNote = "Free trial class first; semi-private, max 5 children per coach. No fees published.";
  // re-stamp operatingStatus only where its own source page was re-read today.
  // studiorenang.com outlet pages are excluded: outlet/003 currently serves injected
  // gambling spam (site compromise), so those sources are not re-verified.
  const osSource = v.operatingStatus && v.operatingStatus.source;
  if (osSource && /^(https:\/\/(academy\.sparks-edu\.com\/(jakarta|tangerang|bogor|bekasi|depok)\/|sparks-swim\.com\/|(www\.)?aquatic-baby\.com\/lokasi))/.test(osSource)) v.operatingStatus = { ...(v.operatingStatus as NonNullable<typeof v.operatingStatus>), checkedAt: "2026-11-24" };
  // re-stamp only program ages whose own source page was re-read today; dated social
    // announcements and other sources keep their original checkedAt.
  const REREAD = /^(https:\/\/(academy\.sparks-edu\.com\/(jakarta|tangerang|bogor|bekasi|depok)|sparks-swim\.com|studiorenang\.com\/programrenang|www\.aquatic-baby\.com\/program-1))/;
  for (const p of v.programs) { if (p.age && p.age.sourceCheckedAt && p.age.providerAgeUrl && REREAD.test(p.age.providerAgeUrl)) p.age = { ...p.age, sourceCheckedAt: "2026-11-24" }; }
  }
  {
  const v = venue(venues, "sparks-swim-taman-palem");
  v.lastCheckedAt = "2026-11-24";
  v.cardNote = "Free trial class first; semi-private, max 5 children per coach. No fees published.";
  // re-stamp operatingStatus only where its own source page was re-read today.
  // studiorenang.com outlet pages are excluded: outlet/003 currently serves injected
  // gambling spam (site compromise), so those sources are not re-verified.
  const osSource = v.operatingStatus && v.operatingStatus.source;
  if (osSource && /^(https:\/\/(academy\.sparks-edu\.com\/(jakarta|tangerang|bogor|bekasi|depok)\/|sparks-swim\.com\/|(www\.)?aquatic-baby\.com\/lokasi))/.test(osSource)) v.operatingStatus = { ...(v.operatingStatus as NonNullable<typeof v.operatingStatus>), checkedAt: "2026-11-24" };
  // re-stamp only program ages whose own source page was re-read today; dated social
    // announcements and other sources keep their original checkedAt.
  const REREAD = /^(https:\/\/(academy\.sparks-edu\.com\/(jakarta|tangerang|bogor|bekasi|depok)|sparks-swim\.com|studiorenang\.com\/programrenang|www\.aquatic-baby\.com\/program-1))/;
  for (const p of v.programs) { if (p.age && p.age.sourceCheckedAt && p.age.providerAgeUrl && REREAD.test(p.age.providerAgeUrl)) p.age = { ...p.age, sourceCheckedAt: "2026-11-24" }; }
  }

  {
  const v = venue(venues, "studiorenang-bsd-north-point");
  v.lastCheckedAt = "2026-11-24";
  v.cardNote = "Baby classes from 6 mo, max 5 per class, 30 min. No fees published.";
  // re-stamp operatingStatus only where its own source page was re-read today.
  // studiorenang.com outlet pages are excluded: outlet/003 currently serves injected
  // gambling spam (site compromise), so those sources are not re-verified.
  const osSource = v.operatingStatus && v.operatingStatus.source;
  if (osSource && /^(https:\/\/(academy\.sparks-edu\.com\/(jakarta|tangerang|bogor|bekasi|depok)\/|sparks-swim\.com\/|(www\.)?aquatic-baby\.com\/lokasi))/.test(osSource)) v.operatingStatus = { ...(v.operatingStatus as NonNullable<typeof v.operatingStatus>), checkedAt: "2026-11-24" };
  // re-stamp only program ages whose own source page was re-read today; dated social
    // announcements and other sources keep their original checkedAt.
  const REREAD = /^(https:\/\/(academy\.sparks-edu\.com\/(jakarta|tangerang|bogor|bekasi|depok)|sparks-swim\.com|studiorenang\.com\/programrenang|www\.aquatic-baby\.com\/program-1))/;
  for (const p of v.programs) { if (p.age && p.age.sourceCheckedAt && p.age.providerAgeUrl && REREAD.test(p.age.providerAgeUrl)) p.age = { ...p.age, sourceCheckedAt: "2026-11-24" }; }
  }
  {
  const v = venue(venues, "studiorenang-gading-serpong");
  v.lastCheckedAt = "2026-11-24";
  v.cardNote = "Baby classes from 6 mo, max 5 per class, 30 min. No fees published.";
  // re-stamp operatingStatus only where its own source page was re-read today.
  // studiorenang.com outlet pages are excluded: outlet/003 currently serves injected
  // gambling spam (site compromise), so those sources are not re-verified.
  const osSource = v.operatingStatus && v.operatingStatus.source;
  if (osSource && /^(https:\/\/(academy\.sparks-edu\.com\/(jakarta|tangerang|bogor|bekasi|depok)\/|sparks-swim\.com\/|(www\.)?aquatic-baby\.com\/lokasi))/.test(osSource)) v.operatingStatus = { ...(v.operatingStatus as NonNullable<typeof v.operatingStatus>), checkedAt: "2026-11-24" };
  // re-stamp only program ages whose own source page was re-read today; dated social
    // announcements and other sources keep their original checkedAt.
  const REREAD = /^(https:\/\/(academy\.sparks-edu\.com\/(jakarta|tangerang|bogor|bekasi|depok)|sparks-swim\.com|studiorenang\.com\/programrenang|www\.aquatic-baby\.com\/program-1))/;
  for (const p of v.programs) { if (p.age && p.age.sourceCheckedAt && p.age.providerAgeUrl && REREAD.test(p.age.providerAgeUrl)) p.age = { ...p.age, sourceCheckedAt: "2026-11-24" }; }
  }
  {
  const v = venue(venues, "studiorenang-kelapa-gading");
  v.lastCheckedAt = "2026-11-24";
  v.cardNote = "Baby classes from 6 mo, max 5 per class, 30 min. No fees published.";
  // re-stamp operatingStatus only where its own source page was re-read today.
  // studiorenang.com outlet pages are excluded: outlet/003 currently serves injected
  // gambling spam (site compromise), so those sources are not re-verified.
  const osSource = v.operatingStatus && v.operatingStatus.source;
  if (osSource && /^(https:\/\/(academy\.sparks-edu\.com\/(jakarta|tangerang|bogor|bekasi|depok)\/|sparks-swim\.com\/|(www\.)?aquatic-baby\.com\/lokasi))/.test(osSource)) v.operatingStatus = { ...(v.operatingStatus as NonNullable<typeof v.operatingStatus>), checkedAt: "2026-11-24" };
  // re-stamp only program ages whose own source page was re-read today; dated social
    // announcements and other sources keep their original checkedAt.
  const REREAD = /^(https:\/\/(academy\.sparks-edu\.com\/(jakarta|tangerang|bogor|bekasi|depok)|sparks-swim\.com|studiorenang\.com\/programrenang|www\.aquatic-baby\.com\/program-1))/;
  for (const p of v.programs) { if (p.age && p.age.sourceCheckedAt && p.age.providerAgeUrl && REREAD.test(p.age.providerAgeUrl)) p.age = { ...p.age, sourceCheckedAt: "2026-11-24" }; }
  }
  {
  const v = venue(venues, "studiorenang-meruya");
  v.lastCheckedAt = "2026-11-24";
  v.cardNote = "Baby classes from 6 mo, max 5 per class, 30 min. No fees published.";
  // re-stamp operatingStatus only where its own source page was re-read today.
  // studiorenang.com outlet pages are excluded: outlet/003 currently serves injected
  // gambling spam (site compromise), so those sources are not re-verified.
  const osSource = v.operatingStatus && v.operatingStatus.source;
  if (osSource && /^(https:\/\/(academy\.sparks-edu\.com\/(jakarta|tangerang|bogor|bekasi|depok)\/|sparks-swim\.com\/|(www\.)?aquatic-baby\.com\/lokasi))/.test(osSource)) v.operatingStatus = { ...(v.operatingStatus as NonNullable<typeof v.operatingStatus>), checkedAt: "2026-11-24" };
  // re-stamp only program ages whose own source page was re-read today; dated social
    // announcements and other sources keep their original checkedAt.
  const REREAD = /^(https:\/\/(academy\.sparks-edu\.com\/(jakarta|tangerang|bogor|bekasi|depok)|sparks-swim\.com|studiorenang\.com\/programrenang|www\.aquatic-baby\.com\/program-1))/;
  for (const p of v.programs) { if (p.age && p.age.sourceCheckedAt && p.age.providerAgeUrl && REREAD.test(p.age.providerAgeUrl)) p.age = { ...p.age, sourceCheckedAt: "2026-11-24" }; }
  }

  {
  const v = venue(venues, "aquatic-baby-bintaro");
  v.lastCheckedAt = "2026-11-24";
  v.cardNote = "Baby class 3 mo to 2 yr with parent, 30 min. Sessions Tue, Thu, Sat, Sun. No fees published.";
  // re-stamp operatingStatus only where its own source page was re-read today.
  // studiorenang.com outlet pages are excluded: outlet/003 currently serves injected
  // gambling spam (site compromise), so those sources are not re-verified.
  const osSource = v.operatingStatus && v.operatingStatus.source;
  if (osSource && /^(https:\/\/(academy\.sparks-edu\.com\/(jakarta|tangerang|bogor|bekasi|depok)\/|sparks-swim\.com\/|(www\.)?aquatic-baby\.com\/lokasi))/.test(osSource)) v.operatingStatus = { ...(v.operatingStatus as NonNullable<typeof v.operatingStatus>), checkedAt: "2026-11-24" };
  // re-stamp only program ages whose own source page was re-read today; dated social
    // announcements and other sources keep their original checkedAt.
  const REREAD = /^(https:\/\/(academy\.sparks-edu\.com\/(jakarta|tangerang|bogor|bekasi|depok)|sparks-swim\.com|studiorenang\.com\/programrenang|www\.aquatic-baby\.com\/program-1))/;
  for (const p of v.programs) { if (p.age && p.age.sourceCheckedAt && p.age.providerAgeUrl && REREAD.test(p.age.providerAgeUrl)) p.age = { ...p.age, sourceCheckedAt: "2026-11-24" }; }
  }
  {
  const v = venue(venues, "aquatic-baby-rumabona-cikini-bintaro");
  v.lastCheckedAt = "2026-11-24";
  v.cardNote = "Baby class 3 mo to 2 yr with parent, 30 min. Sessions Tue, Thu, Sat, Sun. No fees published.";
  // re-stamp operatingStatus only where its own source page was re-read today.
  // studiorenang.com outlet pages are excluded: outlet/003 currently serves injected
  // gambling spam (site compromise), so those sources are not re-verified.
  const osSource = v.operatingStatus && v.operatingStatus.source;
  if (osSource && /^(https:\/\/(academy\.sparks-edu\.com\/(jakarta|tangerang|bogor|bekasi|depok)\/|sparks-swim\.com\/|(www\.)?aquatic-baby\.com\/lokasi))/.test(osSource)) v.operatingStatus = { ...(v.operatingStatus as NonNullable<typeof v.operatingStatus>), checkedAt: "2026-11-24" };
  // re-stamp only program ages whose own source page was re-read today; dated social
    // announcements and other sources keep their original checkedAt.
  const REREAD = /^(https:\/\/(academy\.sparks-edu\.com\/(jakarta|tangerang|bogor|bekasi|depok)|sparks-swim\.com|studiorenang\.com\/programrenang|www\.aquatic-baby\.com\/program-1))/;
  for (const p of v.programs) { if (p.age && p.age.sourceCheckedAt && p.age.providerAgeUrl && REREAD.test(p.age.providerAgeUrl)) p.age = { ...p.age, sourceCheckedAt: "2026-11-24" }; }
  }
}
