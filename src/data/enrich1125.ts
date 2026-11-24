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
  v.cardNote = "Official city page (re-read 24 Nov 2026): age-group curriculum Crawler 6-11 mo, Baby 12-23 mo, Tiny 24-35 mo, Little 3-4 yrs, Kids 5-7 yrs; class bands Gymnastics 12 mo-7 yrs, Sensory & Phonics 6-35 mo, Multi Sports 24 mo-4 yrs, Dance 12 mo-7 yrs, Ballet 24 mo-7 yrs, Taekwondo 4-7 yrs, Basketball 5-7 yrs, Futsal 5-7 yrs; classes vary by location, booking via WhatsApp, no per-branch timetable published online, no fees published. / Halaman kota resmi (dibaca ulang 24 Nov 2026): kurikulum per kelompok usia Crawler 6-11 bln, Baby 12-23 bln, Tiny 24-35 bln, Little 3-4 th, Kids 5-7 th; kelas Gymnastics 12 bln-7 th, Sensory & Phonics 6-35 bln, Multi Sports 24 bln-4 th, Dance 12 bln-7 th, Balet 24 bln-7 th, Taekwondo 4-7 th, Basket 5-7 th, Futsal 5-7 th; kelas bervariasi per lokasi, pendaftaran via WhatsApp, jadwal per cabang tidak dipublikasikan online, biaya tidak dipublikasikan.";
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
  v.cardNote = "Official city page (re-read 24 Nov 2026): age-group curriculum Crawler 6-11 mo, Baby 12-23 mo, Tiny 24-35 mo, Little 3-4 yrs, Kids 5-7 yrs; class bands Gymnastics 12 mo-7 yrs, Sensory & Phonics 6-35 mo, Multi Sports 24 mo-4 yrs, Dance 12 mo-7 yrs, Ballet 24 mo-7 yrs, Taekwondo 4-7 yrs, Basketball 5-7 yrs, Futsal 5-7 yrs; classes vary by location, booking via WhatsApp, no per-branch timetable published online, no fees published. / Halaman kota resmi (dibaca ulang 24 Nov 2026): kurikulum per kelompok usia Crawler 6-11 bln, Baby 12-23 bln, Tiny 24-35 bln, Little 3-4 th, Kids 5-7 th; kelas Gymnastics 12 bln-7 th, Sensory & Phonics 6-35 bln, Multi Sports 24 bln-4 th, Dance 12 bln-7 th, Balet 24 bln-7 th, Taekwondo 4-7 th, Basket 5-7 th, Futsal 5-7 th; kelas bervariasi per lokasi, pendaftaran via WhatsApp, jadwal per cabang tidak dipublikasikan online, biaya tidak dipublikasikan.";
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
  v.cardNote = "Official city page (re-read 24 Nov 2026): age-group curriculum Crawler 6-11 mo, Baby 12-23 mo, Tiny 24-35 mo, Little 3-4 yrs, Kids 5-7 yrs; class bands Gymnastics 12 mo-7 yrs, Sensory & Phonics 6-35 mo, Multi Sports 24 mo-4 yrs, Dance 12 mo-7 yrs, Ballet 24 mo-7 yrs, Taekwondo 4-7 yrs, Basketball 5-7 yrs, Futsal 5-7 yrs; classes vary by location, booking via WhatsApp, no per-branch timetable published online, no fees published. / Halaman kota resmi (dibaca ulang 24 Nov 2026): kurikulum per kelompok usia Crawler 6-11 bln, Baby 12-23 bln, Tiny 24-35 bln, Little 3-4 th, Kids 5-7 th; kelas Gymnastics 12 bln-7 th, Sensory & Phonics 6-35 bln, Multi Sports 24 bln-4 th, Dance 12 bln-7 th, Balet 24 bln-7 th, Taekwondo 4-7 th, Basket 5-7 th, Futsal 5-7 th; kelas bervariasi per lokasi, pendaftaran via WhatsApp, jadwal per cabang tidak dipublikasikan online, biaya tidak dipublikasikan.";
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
  v.cardNote = "Official city page (re-read 24 Nov 2026): age-group curriculum Crawler 6-11 mo, Baby 12-23 mo, Tiny 24-35 mo, Little 3-4 yrs, Kids 5-7 yrs; class bands Gymnastics 12 mo-7 yrs, Sensory & Phonics 6-35 mo, Multi Sports 24 mo-4 yrs, Dance 12 mo-7 yrs, Ballet 24 mo-7 yrs, Taekwondo 4-7 yrs, Basketball 5-7 yrs, Futsal 5-7 yrs; classes vary by location, booking via WhatsApp, no per-branch timetable published online, no fees published. / Halaman kota resmi (dibaca ulang 24 Nov 2026): kurikulum per kelompok usia Crawler 6-11 bln, Baby 12-23 bln, Tiny 24-35 bln, Little 3-4 th, Kids 5-7 th; kelas Gymnastics 12 bln-7 th, Sensory & Phonics 6-35 bln, Multi Sports 24 bln-4 th, Dance 12 bln-7 th, Balet 24 bln-7 th, Taekwondo 4-7 th, Basket 5-7 th, Futsal 5-7 th; kelas bervariasi per lokasi, pendaftaran via WhatsApp, jadwal per cabang tidak dipublikasikan online, biaya tidak dipublikasikan.";
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
  v.cardNote = "Official city page (re-read 24 Nov 2026): age-group curriculum Crawler 6-11 mo, Baby 12-23 mo, Tiny 24-35 mo, Little 3-4 yrs, Kids 5-7 yrs; class bands Gymnastics 12 mo-7 yrs, Sensory & Phonics 6-35 mo, Multi Sports 24 mo-4 yrs, Dance 12 mo-7 yrs, Ballet 24 mo-7 yrs, Taekwondo 4-7 yrs, Basketball 5-7 yrs, Futsal 5-7 yrs; classes vary by location, booking via WhatsApp, no per-branch timetable published online, no fees published. / Halaman kota resmi (dibaca ulang 24 Nov 2026): kurikulum per kelompok usia Crawler 6-11 bln, Baby 12-23 bln, Tiny 24-35 bln, Little 3-4 th, Kids 5-7 th; kelas Gymnastics 12 bln-7 th, Sensory & Phonics 6-35 bln, Multi Sports 24 bln-4 th, Dance 12 bln-7 th, Balet 24 bln-7 th, Taekwondo 4-7 th, Basket 5-7 th, Futsal 5-7 th; kelas bervariasi per lokasi, pendaftaran via WhatsApp, jadwal per cabang tidak dipublikasikan online, biaya tidak dipublikasikan.";
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
  v.cardNote = "Official city page (re-read 24 Nov 2026): age-group curriculum Crawler 6-11 mo, Baby 12-23 mo, Tiny 24-35 mo, Little 3-4 yrs, Kids 5-7 yrs; class bands Gymnastics 12 mo-7 yrs, Sensory & Phonics 6-35 mo, Multi Sports 24 mo-4 yrs, Dance 12 mo-7 yrs, Ballet 24 mo-7 yrs, Taekwondo 4-7 yrs, Basketball 5-7 yrs, Futsal 5-7 yrs; classes vary by location, booking via WhatsApp, no per-branch timetable published online, no fees published. / Halaman kota resmi (dibaca ulang 24 Nov 2026): kurikulum per kelompok usia Crawler 6-11 bln, Baby 12-23 bln, Tiny 24-35 bln, Little 3-4 th, Kids 5-7 th; kelas Gymnastics 12 bln-7 th, Sensory & Phonics 6-35 bln, Multi Sports 24 bln-4 th, Dance 12 bln-7 th, Balet 24 bln-7 th, Taekwondo 4-7 th, Basket 5-7 th, Futsal 5-7 th; kelas bervariasi per lokasi, pendaftaran via WhatsApp, jadwal per cabang tidak dipublikasikan online, biaya tidak dipublikasikan.";
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
  v.cardNote = "Official city page (re-read 24 Nov 2026): age-group curriculum Crawler 6-11 mo, Baby 12-23 mo, Tiny 24-35 mo, Little 3-4 yrs, Kids 5-7 yrs; class bands Gymnastics 12 mo-7 yrs, Sensory & Phonics 6-35 mo, Multi Sports 24 mo-4 yrs, Dance 12 mo-7 yrs, Ballet 24 mo-7 yrs, Taekwondo 4-7 yrs, Basketball 5-7 yrs, Futsal 5-7 yrs; classes vary by location, booking via WhatsApp, no per-branch timetable published online, no fees published. / Halaman kota resmi (dibaca ulang 24 Nov 2026): kurikulum per kelompok usia Crawler 6-11 bln, Baby 12-23 bln, Tiny 24-35 bln, Little 3-4 th, Kids 5-7 th; kelas Gymnastics 12 bln-7 th, Sensory & Phonics 6-35 bln, Multi Sports 24 bln-4 th, Dance 12 bln-7 th, Balet 24 bln-7 th, Taekwondo 4-7 th, Basket 5-7 th, Futsal 5-7 th; kelas bervariasi per lokasi, pendaftaran via WhatsApp, jadwal per cabang tidak dipublikasikan online, biaya tidak dipublikasikan.";
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
  v.cardNote = "Official city page (re-read 24 Nov 2026): age-group curriculum Crawler 6-11 mo, Baby 12-23 mo, Tiny 24-35 mo, Little 3-4 yrs, Kids 5-7 yrs; class bands Gymnastics 12 mo-7 yrs, Sensory & Phonics 6-35 mo, Multi Sports 24 mo-4 yrs, Dance 12 mo-7 yrs, Ballet 24 mo-7 yrs, Taekwondo 4-7 yrs, Basketball 5-7 yrs, Futsal 5-7 yrs; classes vary by location, booking via WhatsApp, no per-branch timetable published online, no fees published. / Halaman kota resmi (dibaca ulang 24 Nov 2026): kurikulum per kelompok usia Crawler 6-11 bln, Baby 12-23 bln, Tiny 24-35 bln, Little 3-4 th, Kids 5-7 th; kelas Gymnastics 12 bln-7 th, Sensory & Phonics 6-35 bln, Multi Sports 24 bln-4 th, Dance 12 bln-7 th, Balet 24 bln-7 th, Taekwondo 4-7 th, Basket 5-7 th, Futsal 5-7 th; kelas bervariasi per lokasi, pendaftaran via WhatsApp, jadwal per cabang tidak dipublikasikan online, biaya tidak dipublikasikan.";
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
  v.cardNote = "Official city page (re-read 24 Nov 2026): age-group curriculum Crawler 6-11 mo, Baby 12-23 mo, Tiny 24-35 mo, Little 3-4 yrs, Kids 5-7 yrs; class bands Gymnastics 12 mo-7 yrs, Sensory & Phonics 6-35 mo, Multi Sports 24 mo-4 yrs, Dance 12 mo-7 yrs, Ballet 24 mo-7 yrs, Taekwondo 4-7 yrs, Basketball 5-7 yrs, Futsal 5-7 yrs; classes vary by location, booking via WhatsApp, no per-branch timetable published online, no fees published. / Halaman kota resmi (dibaca ulang 24 Nov 2026): kurikulum per kelompok usia Crawler 6-11 bln, Baby 12-23 bln, Tiny 24-35 bln, Little 3-4 th, Kids 5-7 th; kelas Gymnastics 12 bln-7 th, Sensory & Phonics 6-35 bln, Multi Sports 24 bln-4 th, Dance 12 bln-7 th, Balet 24 bln-7 th, Taekwondo 4-7 th, Basket 5-7 th, Futsal 5-7 th; kelas bervariasi per lokasi, pendaftaran via WhatsApp, jadwal per cabang tidak dipublikasikan online, biaya tidak dipublikasikan.";
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
  v.cardNote = "Official city page (re-read 24 Nov 2026): age-group curriculum Crawler 6-11 mo, Baby 12-23 mo, Tiny 24-35 mo, Little 3-4 yrs, Kids 5-7 yrs; class bands Gymnastics 12 mo-7 yrs, Sensory & Phonics 6-35 mo, Multi Sports 24 mo-4 yrs, Dance 12 mo-7 yrs, Ballet 24 mo-7 yrs, Taekwondo 4-7 yrs, Basketball 5-7 yrs, Futsal 5-7 yrs; classes vary by location, booking via WhatsApp, no per-branch timetable published online, no fees published. / Halaman kota resmi (dibaca ulang 24 Nov 2026): kurikulum per kelompok usia Crawler 6-11 bln, Baby 12-23 bln, Tiny 24-35 bln, Little 3-4 th, Kids 5-7 th; kelas Gymnastics 12 bln-7 th, Sensory & Phonics 6-35 bln, Multi Sports 24 bln-4 th, Dance 12 bln-7 th, Balet 24 bln-7 th, Taekwondo 4-7 th, Basket 5-7 th, Futsal 5-7 th; kelas bervariasi per lokasi, pendaftaran via WhatsApp, jadwal per cabang tidak dipublikasikan online, biaya tidak dipublikasikan.";
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
  v.cardNote = "Official city page (re-read 24 Nov 2026): age-group curriculum Crawler 6-11 mo, Baby 12-23 mo, Tiny 24-35 mo, Little 3-4 yrs, Kids 5-7 yrs; class bands Gymnastics 12 mo-7 yrs, Sensory & Phonics 6-35 mo, Multi Sports 24 mo-4 yrs, Dance 12 mo-7 yrs, Ballet 24 mo-7 yrs, Taekwondo 4-7 yrs, Basketball 5-7 yrs, Futsal 5-7 yrs; classes vary by location, booking via WhatsApp, no per-branch timetable published online, no fees published. / Halaman kota resmi (dibaca ulang 24 Nov 2026): kurikulum per kelompok usia Crawler 6-11 bln, Baby 12-23 bln, Tiny 24-35 bln, Little 3-4 th, Kids 5-7 th; kelas Gymnastics 12 bln-7 th, Sensory & Phonics 6-35 bln, Multi Sports 24 bln-4 th, Dance 12 bln-7 th, Balet 24 bln-7 th, Taekwondo 4-7 th, Basket 5-7 th, Futsal 5-7 th; kelas bervariasi per lokasi, pendaftaran via WhatsApp, jadwal per cabang tidak dipublikasikan online, biaya tidak dipublikasikan.";
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
  v.cardNote = "Official city page (re-read 24 Nov 2026): age-group curriculum Crawler 6-11 mo, Baby 12-23 mo, Tiny 24-35 mo, Little 3-4 yrs, Kids 5-7 yrs; class bands Gymnastics 12 mo-7 yrs, Sensory & Phonics 6-35 mo, Multi Sports 24 mo-4 yrs, Dance 12 mo-7 yrs, Ballet 24 mo-7 yrs, Taekwondo 4-7 yrs, Basketball 5-7 yrs, Futsal 5-7 yrs; classes vary by location, booking via WhatsApp, no per-branch timetable published online, no fees published. / Halaman kota resmi (dibaca ulang 24 Nov 2026): kurikulum per kelompok usia Crawler 6-11 bln, Baby 12-23 bln, Tiny 24-35 bln, Little 3-4 th, Kids 5-7 th; kelas Gymnastics 12 bln-7 th, Sensory & Phonics 6-35 bln, Multi Sports 24 bln-4 th, Dance 12 bln-7 th, Balet 24 bln-7 th, Taekwondo 4-7 th, Basket 5-7 th, Futsal 5-7 th; kelas bervariasi per lokasi, pendaftaran via WhatsApp, jadwal per cabang tidak dipublikasikan online, biaya tidak dipublikasikan.";
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
  v.cardNote = "Official city page (re-read 24 Nov 2026): age-group curriculum Crawler 6-11 mo, Baby 12-23 mo, Tiny 24-35 mo, Little 3-4 yrs, Kids 5-7 yrs; class bands Gymnastics 12 mo-7 yrs, Sensory & Phonics 6-35 mo, Multi Sports 24 mo-4 yrs, Dance 12 mo-7 yrs, Ballet 24 mo-7 yrs, Taekwondo 4-7 yrs, Basketball 5-7 yrs, Futsal 5-7 yrs; classes vary by location, booking via WhatsApp, no per-branch timetable published online, no fees published. / Halaman kota resmi (dibaca ulang 24 Nov 2026): kurikulum per kelompok usia Crawler 6-11 bln, Baby 12-23 bln, Tiny 24-35 bln, Little 3-4 th, Kids 5-7 th; kelas Gymnastics 12 bln-7 th, Sensory & Phonics 6-35 bln, Multi Sports 24 bln-4 th, Dance 12 bln-7 th, Balet 24 bln-7 th, Taekwondo 4-7 th, Basket 5-7 th, Futsal 5-7 th; kelas bervariasi per lokasi, pendaftaran via WhatsApp, jadwal per cabang tidak dipublikasikan online, biaya tidak dipublikasikan.";
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
  v.cardNote = "Official city page (re-read 24 Nov 2026): age-group curriculum Crawler 6-11 mo, Baby 12-23 mo, Tiny 24-35 mo, Little 3-4 yrs, Kids 5-7 yrs; class bands Gymnastics 12 mo-7 yrs, Sensory & Phonics 6-35 mo, Multi Sports 24 mo-4 yrs, Dance 12 mo-7 yrs, Ballet 24 mo-7 yrs, Taekwondo 4-7 yrs, Basketball 5-7 yrs, Futsal 5-7 yrs; classes vary by location, booking via WhatsApp, no per-branch timetable published online, no fees published. / Halaman kota resmi (dibaca ulang 24 Nov 2026): kurikulum per kelompok usia Crawler 6-11 bln, Baby 12-23 bln, Tiny 24-35 bln, Little 3-4 th, Kids 5-7 th; kelas Gymnastics 12 bln-7 th, Sensory & Phonics 6-35 bln, Multi Sports 24 bln-4 th, Dance 12 bln-7 th, Balet 24 bln-7 th, Taekwondo 4-7 th, Basket 5-7 th, Futsal 5-7 th; kelas bervariasi per lokasi, pendaftaran via WhatsApp, jadwal per cabang tidak dipublikasikan online, biaya tidak dipublikasikan.";
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
  v.cardNote = "Official city page (re-read 24 Nov 2026): age-group curriculum Crawler 6-11 mo, Baby 12-23 mo, Tiny 24-35 mo, Little 3-4 yrs, Kids 5-7 yrs; class bands Gymnastics 12 mo-7 yrs, Sensory & Phonics 6-35 mo, Multi Sports 24 mo-4 yrs, Dance 12 mo-7 yrs, Ballet 24 mo-7 yrs, Taekwondo 4-7 yrs, Basketball 5-7 yrs, Futsal 5-7 yrs; classes vary by location, booking via WhatsApp, no per-branch timetable published online, no fees published. / Halaman kota resmi (dibaca ulang 24 Nov 2026): kurikulum per kelompok usia Crawler 6-11 bln, Baby 12-23 bln, Tiny 24-35 bln, Little 3-4 th, Kids 5-7 th; kelas Gymnastics 12 bln-7 th, Sensory & Phonics 6-35 bln, Multi Sports 24 bln-4 th, Dance 12 bln-7 th, Balet 24 bln-7 th, Taekwondo 4-7 th, Basket 5-7 th, Futsal 5-7 th; kelas bervariasi per lokasi, pendaftaran via WhatsApp, jadwal per cabang tidak dipublikasikan online, biaya tidak dipublikasikan.";
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
  v.cardNote = "Official city page (re-read 24 Nov 2026): age-group curriculum Crawler 6-11 mo, Baby 12-23 mo, Tiny 24-35 mo, Little 3-4 yrs, Kids 5-7 yrs; class bands Gymnastics 12 mo-7 yrs, Sensory & Phonics 6-35 mo, Multi Sports 24 mo-4 yrs, Dance 12 mo-7 yrs, Ballet 24 mo-7 yrs, Taekwondo 4-7 yrs, Basketball 5-7 yrs, Futsal 5-7 yrs; classes vary by location, booking via WhatsApp, no per-branch timetable published online, no fees published. / Halaman kota resmi (dibaca ulang 24 Nov 2026): kurikulum per kelompok usia Crawler 6-11 bln, Baby 12-23 bln, Tiny 24-35 bln, Little 3-4 th, Kids 5-7 th; kelas Gymnastics 12 bln-7 th, Sensory & Phonics 6-35 bln, Multi Sports 24 bln-4 th, Dance 12 bln-7 th, Balet 24 bln-7 th, Taekwondo 4-7 th, Basket 5-7 th, Futsal 5-7 th; kelas bervariasi per lokasi, pendaftaran via WhatsApp, jadwal per cabang tidak dipublikasikan online, biaya tidak dipublikasikan.";
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
  v.cardNote = "Official city page (re-read 24 Nov 2026): age-group curriculum Crawler 6-11 mo, Baby 12-23 mo, Tiny 24-35 mo, Little 3-4 yrs, Kids 5-7 yrs; class bands Gymnastics 12 mo-7 yrs, Sensory & Phonics 6-35 mo, Multi Sports 24 mo-4 yrs, Dance 12 mo-7 yrs, Ballet 24 mo-7 yrs, Taekwondo 4-7 yrs, Basketball 5-7 yrs, Futsal 5-7 yrs; classes vary by location, booking via WhatsApp, no per-branch timetable published online, no fees published. / Halaman kota resmi (dibaca ulang 24 Nov 2026): kurikulum per kelompok usia Crawler 6-11 bln, Baby 12-23 bln, Tiny 24-35 bln, Little 3-4 th, Kids 5-7 th; kelas Gymnastics 12 bln-7 th, Sensory & Phonics 6-35 bln, Multi Sports 24 bln-4 th, Dance 12 bln-7 th, Balet 24 bln-7 th, Taekwondo 4-7 th, Basket 5-7 th, Futsal 5-7 th; kelas bervariasi per lokasi, pendaftaran via WhatsApp, jadwal per cabang tidak dipublikasikan online, biaya tidak dipublikasikan.";
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
  v.cardNote = "Official city page (re-read 24 Nov 2026): age-group curriculum Crawler 6-11 mo, Baby 12-23 mo, Tiny 24-35 mo, Little 3-4 yrs, Kids 5-7 yrs; class bands Gymnastics 12 mo-7 yrs, Sensory & Phonics 6-35 mo, Multi Sports 24 mo-4 yrs, Dance 12 mo-7 yrs, Ballet 24 mo-7 yrs, Taekwondo 4-7 yrs, Basketball 5-7 yrs, Futsal 5-7 yrs; classes vary by location, booking via WhatsApp, no per-branch timetable published online, no fees published. / Halaman kota resmi (dibaca ulang 24 Nov 2026): kurikulum per kelompok usia Crawler 6-11 bln, Baby 12-23 bln, Tiny 24-35 bln, Little 3-4 th, Kids 5-7 th; kelas Gymnastics 12 bln-7 th, Sensory & Phonics 6-35 bln, Multi Sports 24 bln-4 th, Dance 12 bln-7 th, Balet 24 bln-7 th, Taekwondo 4-7 th, Basket 5-7 th, Futsal 5-7 th; kelas bervariasi per lokasi, pendaftaran via WhatsApp, jadwal per cabang tidak dipublikasikan online, biaya tidak dipublikasikan.";
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
  v.cardNote = "Official city page (re-read 24 Nov 2026): age-group curriculum Crawler 6-11 mo, Baby 12-23 mo, Tiny 24-35 mo, Little 3-4 yrs, Kids 5-7 yrs; class bands Gymnastics 12 mo-7 yrs, Sensory & Phonics 6-35 mo, Multi Sports 24 mo-4 yrs, Dance 12 mo-7 yrs, Ballet 24 mo-7 yrs, Taekwondo 4-7 yrs, Basketball 5-7 yrs, Futsal 5-7 yrs; classes vary by location, booking via WhatsApp, no per-branch timetable published online, no fees published. / Halaman kota resmi (dibaca ulang 24 Nov 2026): kurikulum per kelompok usia Crawler 6-11 bln, Baby 12-23 bln, Tiny 24-35 bln, Little 3-4 th, Kids 5-7 th; kelas Gymnastics 12 bln-7 th, Sensory & Phonics 6-35 bln, Multi Sports 24 bln-4 th, Dance 12 bln-7 th, Balet 24 bln-7 th, Taekwondo 4-7 th, Basket 5-7 th, Futsal 5-7 th; kelas bervariasi per lokasi, pendaftaran via WhatsApp, jadwal per cabang tidak dipublikasikan online, biaya tidak dipublikasikan.";
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
  v.cardNote = "Official city page (re-read 24 Nov 2026): age-group curriculum Crawler 6-11 mo, Baby 12-23 mo, Tiny 24-35 mo, Little 3-4 yrs, Kids 5-7 yrs; class bands Gymnastics 12 mo-7 yrs, Sensory & Phonics 6-35 mo, Multi Sports 24 mo-4 yrs, Dance 12 mo-7 yrs, Ballet 24 mo-7 yrs, Taekwondo 4-7 yrs, Basketball 5-7 yrs, Futsal 5-7 yrs; classes vary by location, booking via WhatsApp, no per-branch timetable published online, no fees published. / Halaman kota resmi (dibaca ulang 24 Nov 2026): kurikulum per kelompok usia Crawler 6-11 bln, Baby 12-23 bln, Tiny 24-35 bln, Little 3-4 th, Kids 5-7 th; kelas Gymnastics 12 bln-7 th, Sensory & Phonics 6-35 bln, Multi Sports 24 bln-4 th, Dance 12 bln-7 th, Balet 24 bln-7 th, Taekwondo 4-7 th, Basket 5-7 th, Futsal 5-7 th; kelas bervariasi per lokasi, pendaftaran via WhatsApp, jadwal per cabang tidak dipublikasikan online, biaya tidak dipublikasikan.";
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
  v.cardNote = "Official city page (re-read 24 Nov 2026): age-group curriculum Crawler 6-11 mo, Baby 12-23 mo, Tiny 24-35 mo, Little 3-4 yrs, Kids 5-7 yrs; class bands Gymnastics 12 mo-7 yrs, Sensory & Phonics 6-35 mo, Multi Sports 24 mo-4 yrs, Dance 12 mo-7 yrs, Ballet 24 mo-7 yrs, Taekwondo 4-7 yrs, Basketball 5-7 yrs, Futsal 5-7 yrs; classes vary by location, booking via WhatsApp, no per-branch timetable published online, no fees published. / Halaman kota resmi (dibaca ulang 24 Nov 2026): kurikulum per kelompok usia Crawler 6-11 bln, Baby 12-23 bln, Tiny 24-35 bln, Little 3-4 th, Kids 5-7 th; kelas Gymnastics 12 bln-7 th, Sensory & Phonics 6-35 bln, Multi Sports 24 bln-4 th, Dance 12 bln-7 th, Balet 24 bln-7 th, Taekwondo 4-7 th, Basket 5-7 th, Futsal 5-7 th; kelas bervariasi per lokasi, pendaftaran via WhatsApp, jadwal per cabang tidak dipublikasikan online, biaya tidak dipublikasikan.";
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
  v.cardNote = "Official city page (re-read 24 Nov 2026): age-group curriculum Crawler 6-11 mo, Baby 12-23 mo, Tiny 24-35 mo, Little 3-4 yrs, Kids 5-7 yrs; class bands Gymnastics 12 mo-7 yrs, Sensory & Phonics 6-35 mo, Multi Sports 24 mo-4 yrs, Dance 12 mo-7 yrs, Ballet 24 mo-7 yrs, Taekwondo 4-7 yrs, Basketball 5-7 yrs, Futsal 5-7 yrs; classes vary by location, booking via WhatsApp, no per-branch timetable published online, no fees published. / Halaman kota resmi (dibaca ulang 24 Nov 2026): kurikulum per kelompok usia Crawler 6-11 bln, Baby 12-23 bln, Tiny 24-35 bln, Little 3-4 th, Kids 5-7 th; kelas Gymnastics 12 bln-7 th, Sensory & Phonics 6-35 bln, Multi Sports 24 bln-4 th, Dance 12 bln-7 th, Balet 24 bln-7 th, Taekwondo 4-7 th, Basket 5-7 th, Futsal 5-7 th; kelas bervariasi per lokasi, pendaftaran via WhatsApp, jadwal per cabang tidak dipublikasikan online, biaya tidak dipublikasikan.";
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
  v.cardNote = "Official city page (re-read 24 Nov 2026): age-group curriculum Crawler 6-11 mo, Baby 12-23 mo, Tiny 24-35 mo, Little 3-4 yrs, Kids 5-7 yrs; class bands Gymnastics 12 mo-7 yrs, Sensory & Phonics 6-35 mo, Multi Sports 24 mo-4 yrs, Dance 12 mo-7 yrs, Ballet 24 mo-7 yrs, Taekwondo 4-7 yrs, Basketball 5-7 yrs, Futsal 5-7 yrs; classes vary by location, booking via WhatsApp, no per-branch timetable published online, no fees published. / Halaman kota resmi (dibaca ulang 24 Nov 2026): kurikulum per kelompok usia Crawler 6-11 bln, Baby 12-23 bln, Tiny 24-35 bln, Little 3-4 th, Kids 5-7 th; kelas Gymnastics 12 bln-7 th, Sensory & Phonics 6-35 bln, Multi Sports 24 bln-4 th, Dance 12 bln-7 th, Balet 24 bln-7 th, Taekwondo 4-7 th, Basket 5-7 th, Futsal 5-7 th; kelas bervariasi per lokasi, pendaftaran via WhatsApp, jadwal per cabang tidak dipublikasikan online, biaya tidak dipublikasikan.";
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
  v.cardNote = "Official city page (re-read 24 Nov 2026): age-group curriculum Crawler 6-11 mo, Baby 12-23 mo, Tiny 24-35 mo, Little 3-4 yrs, Kids 5-7 yrs; class bands Gymnastics 12 mo-7 yrs, Sensory & Phonics 6-35 mo, Multi Sports 24 mo-4 yrs, Dance 12 mo-7 yrs, Ballet 24 mo-7 yrs, Taekwondo 4-7 yrs, Basketball 5-7 yrs, Futsal 5-7 yrs; classes vary by location, booking via WhatsApp, no per-branch timetable published online, no fees published. / Halaman kota resmi (dibaca ulang 24 Nov 2026): kurikulum per kelompok usia Crawler 6-11 bln, Baby 12-23 bln, Tiny 24-35 bln, Little 3-4 th, Kids 5-7 th; kelas Gymnastics 12 bln-7 th, Sensory & Phonics 6-35 bln, Multi Sports 24 bln-4 th, Dance 12 bln-7 th, Balet 24 bln-7 th, Taekwondo 4-7 th, Basket 5-7 th, Futsal 5-7 th; kelas bervariasi per lokasi, pendaftaran via WhatsApp, jadwal per cabang tidak dipublikasikan online, biaya tidak dipublikasikan.";
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
  v.cardNote = "Official site (re-read 24 Nov 2026): free trial class first, then the team helps choose the program level, package and fees; semi-private classes max 5 children per coach; warm 32-33C low-chlorine pools; SSI international curriculum; progress via parent-coach meetings and appraisal cards. Age bands: Baby Swim 6-18 mo (with parent), Tiny Swim 1.5-3 yrs, Little Swim 3-5 yrs; also Kids Swim 5-8 and Star Swim 9-12. No fees published. / Situs resmi (dibaca ulang 24 Nov 2026): kelas trial gratis dulu, lalu tim membantu memilih level program, paket, dan biaya; kelas semi-privat maks 5 anak per coach; kolam air hangat 32-33C rendah kaporit; kurikulum SSI internasional; perkembangan lewat parent-coach meeting dan appraisal card. Kelompok usia: Baby Swim 6-18 bln (bersama orang tua), Tiny Swim 1,5-3 th, Little Swim 3-5 th; ada juga Kids Swim 5-8 th dan Star Swim 9-12 th. Biaya tidak dipublikasikan.";
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
  v.cardNote = "Official site (re-read 24 Nov 2026): free trial class first, then the team helps choose the program level, package and fees; semi-private classes max 5 children per coach; warm 32-33C low-chlorine pools; SSI international curriculum; progress via parent-coach meetings and appraisal cards. Age bands: Baby Swim 6-18 mo (with parent), Tiny Swim 1.5-3 yrs, Little Swim 3-5 yrs; also Kids Swim 5-8 and Star Swim 9-12. No fees published. / Situs resmi (dibaca ulang 24 Nov 2026): kelas trial gratis dulu, lalu tim membantu memilih level program, paket, dan biaya; kelas semi-privat maks 5 anak per coach; kolam air hangat 32-33C rendah kaporit; kurikulum SSI internasional; perkembangan lewat parent-coach meeting dan appraisal card. Kelompok usia: Baby Swim 6-18 bln (bersama orang tua), Tiny Swim 1,5-3 th, Little Swim 3-5 th; ada juga Kids Swim 5-8 th dan Star Swim 9-12 th. Biaya tidak dipublikasikan.";
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
  v.cardNote = "Official site (re-read 24 Nov 2026): free trial class first, then the team helps choose the program level, package and fees; semi-private classes max 5 children per coach; warm 32-33C low-chlorine pools; SSI international curriculum; progress via parent-coach meetings and appraisal cards. Age bands: Baby Swim 6-18 mo (with parent), Tiny Swim 1.5-3 yrs, Little Swim 3-5 yrs; also Kids Swim 5-8 and Star Swim 9-12. No fees published. / Situs resmi (dibaca ulang 24 Nov 2026): kelas trial gratis dulu, lalu tim membantu memilih level program, paket, dan biaya; kelas semi-privat maks 5 anak per coach; kolam air hangat 32-33C rendah kaporit; kurikulum SSI internasional; perkembangan lewat parent-coach meeting dan appraisal card. Kelompok usia: Baby Swim 6-18 bln (bersama orang tua), Tiny Swim 1,5-3 th, Little Swim 3-5 th; ada juga Kids Swim 5-8 th dan Star Swim 9-12 th. Biaya tidak dipublikasikan.";
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
  v.cardNote = "Official site (re-read 24 Nov 2026): free trial class first, then the team helps choose the program level, package and fees; semi-private classes max 5 children per coach; warm 32-33C low-chlorine pools; SSI international curriculum; progress via parent-coach meetings and appraisal cards. Age bands: Baby Swim 6-18 mo (with parent), Tiny Swim 1.5-3 yrs, Little Swim 3-5 yrs; also Kids Swim 5-8 and Star Swim 9-12. No fees published. / Situs resmi (dibaca ulang 24 Nov 2026): kelas trial gratis dulu, lalu tim membantu memilih level program, paket, dan biaya; kelas semi-privat maks 5 anak per coach; kolam air hangat 32-33C rendah kaporit; kurikulum SSI internasional; perkembangan lewat parent-coach meeting dan appraisal card. Kelompok usia: Baby Swim 6-18 bln (bersama orang tua), Tiny Swim 1,5-3 th, Little Swim 3-5 th; ada juga Kids Swim 5-8 th dan Star Swim 9-12 th. Biaya tidak dipublikasikan.";
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
  v.cardNote = "Official site (re-read 24 Nov 2026): free trial class first, then the team helps choose the program level, package and fees; semi-private classes max 5 children per coach; warm 32-33C low-chlorine pools; SSI international curriculum; progress via parent-coach meetings and appraisal cards. Age bands: Baby Swim 6-18 mo (with parent), Tiny Swim 1.5-3 yrs, Little Swim 3-5 yrs; also Kids Swim 5-8 and Star Swim 9-12. No fees published. / Situs resmi (dibaca ulang 24 Nov 2026): kelas trial gratis dulu, lalu tim membantu memilih level program, paket, dan biaya; kelas semi-privat maks 5 anak per coach; kolam air hangat 32-33C rendah kaporit; kurikulum SSI internasional; perkembangan lewat parent-coach meeting dan appraisal card. Kelompok usia: Baby Swim 6-18 bln (bersama orang tua), Tiny Swim 1,5-3 th, Little Swim 3-5 th; ada juga Kids Swim 5-8 th dan Star Swim 9-12 th. Biaya tidak dipublikasikan.";
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
  v.cardNote = "Official site (re-read 24 Nov 2026): free trial class first, then the team helps choose the program level, package and fees; semi-private classes max 5 children per coach; warm 32-33C low-chlorine pools; SSI international curriculum; progress via parent-coach meetings and appraisal cards. Age bands: Baby Swim 6-18 mo (with parent), Tiny Swim 1.5-3 yrs, Little Swim 3-5 yrs; also Kids Swim 5-8 and Star Swim 9-12. No fees published. / Situs resmi (dibaca ulang 24 Nov 2026): kelas trial gratis dulu, lalu tim membantu memilih level program, paket, dan biaya; kelas semi-privat maks 5 anak per coach; kolam air hangat 32-33C rendah kaporit; kurikulum SSI internasional; perkembangan lewat parent-coach meeting dan appraisal card. Kelompok usia: Baby Swim 6-18 bln (bersama orang tua), Tiny Swim 1,5-3 th, Little Swim 3-5 th; ada juga Kids Swim 5-8 th dan Star Swim 9-12 th. Biaya tidak dipublikasikan.";
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
  v.cardNote = "Official program page (re-read 24 Nov 2026): Hold Me while I Swim (Bayi 1&2) 6-36 mo, max 5 babies, 30 min; Watch Me while I Swim (Aquatike 1-3) 3-4 yrs, max 5, 30 min; Preschool 1&2 age 4-5; Guide Me while I Swim (Beginner 1-3, Intermediate 1-2) over 5 yrs, max 6, 45 min; Catch Me If You Can competitive track 6-17 yrs, 6-10 swimmers, 90 min. No fees published. / Halaman program resmi (dibaca ulang 24 Nov 2026): Hold Me while I Swim (Bayi 1&2) 6-36 bln, maks 5 bayi, 30 menit; Watch Me while I Swim (Aquatike 1-3) 3-4 th, maks 5, 30 menit; Preschool 1&2 usia 4-5 th; Guide Me while I Swim (Beginner 1-3, Intermediate 1-2) di atas 5 th, maks 6, 45 menit; jalur kompetisi Catch Me If You Can 6-17 th, 6-10 perenang, 90 menit. Biaya tidak dipublikasikan.";
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
  v.cardNote = "Official program page (re-read 24 Nov 2026): Hold Me while I Swim (Bayi 1&2) 6-36 mo, max 5 babies, 30 min; Watch Me while I Swim (Aquatike 1-3) 3-4 yrs, max 5, 30 min; Preschool 1&2 age 4-5; Guide Me while I Swim (Beginner 1-3, Intermediate 1-2) over 5 yrs, max 6, 45 min; Catch Me If You Can competitive track 6-17 yrs, 6-10 swimmers, 90 min. No fees published. / Halaman program resmi (dibaca ulang 24 Nov 2026): Hold Me while I Swim (Bayi 1&2) 6-36 bln, maks 5 bayi, 30 menit; Watch Me while I Swim (Aquatike 1-3) 3-4 th, maks 5, 30 menit; Preschool 1&2 usia 4-5 th; Guide Me while I Swim (Beginner 1-3, Intermediate 1-2) di atas 5 th, maks 6, 45 menit; jalur kompetisi Catch Me If You Can 6-17 th, 6-10 perenang, 90 menit. Biaya tidak dipublikasikan.";
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
  v.cardNote = "Official program page (re-read 24 Nov 2026): Hold Me while I Swim (Bayi 1&2) 6-36 mo, max 5 babies, 30 min; Watch Me while I Swim (Aquatike 1-3) 3-4 yrs, max 5, 30 min; Preschool 1&2 age 4-5; Guide Me while I Swim (Beginner 1-3, Intermediate 1-2) over 5 yrs, max 6, 45 min; Catch Me If You Can competitive track 6-17 yrs, 6-10 swimmers, 90 min. No fees published. / Halaman program resmi (dibaca ulang 24 Nov 2026): Hold Me while I Swim (Bayi 1&2) 6-36 bln, maks 5 bayi, 30 menit; Watch Me while I Swim (Aquatike 1-3) 3-4 th, maks 5, 30 menit; Preschool 1&2 usia 4-5 th; Guide Me while I Swim (Beginner 1-3, Intermediate 1-2) di atas 5 th, maks 6, 45 menit; jalur kompetisi Catch Me If You Can 6-17 th, 6-10 perenang, 90 menit. Biaya tidak dipublikasikan.";
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
  v.cardNote = "Official program page (re-read 24 Nov 2026): Hold Me while I Swim (Bayi 1&2) 6-36 mo, max 5 babies, 30 min; Watch Me while I Swim (Aquatike 1-3) 3-4 yrs, max 5, 30 min; Preschool 1&2 age 4-5; Guide Me while I Swim (Beginner 1-3, Intermediate 1-2) over 5 yrs, max 6, 45 min; Catch Me If You Can competitive track 6-17 yrs, 6-10 swimmers, 90 min. No fees published. / Halaman program resmi (dibaca ulang 24 Nov 2026): Hold Me while I Swim (Bayi 1&2) 6-36 bln, maks 5 bayi, 30 menit; Watch Me while I Swim (Aquatike 1-3) 3-4 th, maks 5, 30 menit; Preschool 1&2 usia 4-5 th; Guide Me while I Swim (Beginner 1-3, Intermediate 1-2) di atas 5 th, maks 6, 45 menit; jalur kompetisi Catch Me If You Can 6-17 th, 6-10 perenang, 90 menit. Biaya tidak dipublikasikan.";
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
  v.cardNote = "Official program page (re-read 24 Nov 2026): Baby Class 3 mo-2 yrs, baby swims with parent, max 6 baby-parent pairs, 30 min, 1x per week, 7-session package, levels Newborn and 1-7; Toddler Class 3-4 yrs with parent, 7-session package, levels 1-5; kids class 5-6 yrs; Waterplay school program for playgroup/kindergarten. Focus: water safety skills and water confidence. Sessions Tue, Thu, Sat, Sun at the Bintaro Sektor 5 (Pisok) pool; Sat at Cikini. No fees published. / Halaman program resmi (dibaca ulang 24 Nov 2026): Baby Class 3 bln-2 th, bayi berenang bersama orang tua, maks 6 pasangan, 30 menit, 1x per minggu, paket 7 sesi, level Newborn dan 1-7; Toddler Class 3-4 th bersama orang tua, paket 7 sesi, level 1-5; kelas anak 5-6 th; program Waterplay untuk sekolah kelompok bermain/TK. Fokus: water safety skills dan kepercayaan diri di air. Sesi Selasa, Kamis, Sabtu, Minggu di kolam Bintaro Sektor 5 (Pisok); Sabtu di Cikini. Biaya tidak dipublikasikan.";
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
  v.cardNote = "Official program page (re-read 24 Nov 2026): Baby Class 3 mo-2 yrs, baby swims with parent, max 6 baby-parent pairs, 30 min, 1x per week, 7-session package, levels Newborn and 1-7; Toddler Class 3-4 yrs with parent, 7-session package, levels 1-5; kids class 5-6 yrs; Waterplay school program for playgroup/kindergarten. Focus: water safety skills and water confidence. Sessions Tue, Thu, Sat, Sun at the Bintaro Sektor 5 (Pisok) pool; Sat at Cikini. No fees published. / Halaman program resmi (dibaca ulang 24 Nov 2026): Baby Class 3 bln-2 th, bayi berenang bersama orang tua, maks 6 pasangan, 30 menit, 1x per minggu, paket 7 sesi, level Newborn dan 1-7; Toddler Class 3-4 th bersama orang tua, paket 7 sesi, level 1-5; kelas anak 5-6 th; program Waterplay untuk sekolah kelompok bermain/TK. Fokus: water safety skills dan kepercayaan diri di air. Sesi Selasa, Kamis, Sabtu, Minggu di kolam Bintaro Sektor 5 (Pisok); Sabtu di Cikini. Biaya tidak dipublikasikan.";
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
