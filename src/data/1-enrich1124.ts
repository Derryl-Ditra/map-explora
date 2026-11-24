import type { Venue, VenueProgram } from "@/types/venue";

// 2026-11-24 Rockstar Academy depth batch (owner-approved data-depth upgrade, first batch).
// Sources, all provider-published and re-read 2026-11-24:
// - each branch's live schedule (branch page "Quick Schedule", current Winter term),
//   used for class presence and weekly slots;
// - each branch's Winter Term 2026 schedule PDF (19 Oct 2026 - 17 Jan 2027, updated
//   16 Nov 2026), used for exact age bands from its printed class key;
// - the official free-trial page (every branch listed) and Rules & Policies
//   (term enrollment, registration rules).
// Web age-key labels are rounded; exact month bands come from the branch PDF class
// key where printed, and key-based ages keep that basis in their note. Swim levels
// (Mom & Me pool levels, Stroke Development) carry no usable under-5 age band and
// stay out; Elite teams are tryout-based and stay out. No prices are published by
// the chain; the only listing added is the official free trial.

function venue(venues: Venue[], id: string): Venue {
  const v = venues.find((x) => x.id === id);
  if (!v) throw new Error(`enrich1124: missing venue ${id}`);
  return v;
}

export default function enrich1124(venues: Venue[]) {

  // ---- AEON MALL BSD City ----
  {
  const v = venue(venues, "rockstar-academy-aeon-mall-bsd-city");
  v.lastCheckedAt = "2026-11-24";
  v.operatingStatus = { state: "official-listed", source: "https://www.rockstaracademy.com/schedules-and-locations/aeon-mall-bsd-city", checkedAt: "2026-11-24" };
  v.cardNote = "Term enrollment: 11-week terms (Winter: 19 Oct 2026 to 17 Jan 2027); registration required before class, no same-day signup; baby gymnastics up to 3 classes/week. Free trial class bookable on the official site (rockstaracademy.com/freetrial). Read 24 Nov 2026. / Kelas per term: 11 minggu per term (Winter: 19 Okt 2026 - 17 Jan 2027); wajib daftar sebelum kelas, tidak bisa daftar di hari yang sama; baby gym maksimal 3 kelas per minggu. Kelas trial gratis bisa dipesan di situs resmi. Dibaca 24 Nov 2026.";
  v.categories = ["Dance", "Gym & Movement", "Multi-Sport", "Preschool", "Swim"];
  const add = (p: VenueProgram) => {
    const i = v.programs.findIndex((x) => x.name === p.name || (p.name === "Baby Ballet" && x.name === "Baby (Ballet)"));
    if (i >= 0) v.programs[i] = { ...v.programs[i], ...p, name: v.programs[i].name, age: { ...v.programs[i].age, ...p.age } };
    else v.programs.push(p);
  };
  add({
    name: "Baby Ballet",
    category: "Dance",
    offering: "offered",
    age: {
      minMonths: 24,
      maxMonths: 36,
      level: "branch",
      verification: "provider-confirmed",
      providerAgeUrl: "https://www.rockstaracademy.com/lib/upload/files/club/AB_Schedule_Winter_2026_Week_5.pdf",
      sourceCheckedAt: "2026-11-24",
    },
    term: "19 Oct 2026 until 17 Jan 2027",
    noteUrl: "https://www.rockstaracademy.com/schedules-and-locations/aeon-mall-bsd-city",
    noteLabel: "Age key",
    note: "'2 - 3 Years' via the official web schedule key; year-boundary inclusivity ambiguous. Grid: Tue 12:00; Wed 13:00 (30 min; branch schedule, read 24 Nov 2026). Confirm availability with the branch.",
  });
  add({
    name: "Baby Dance",
    category: "Dance",
    offering: "offered",
    age: {
      minMonths: 12,
      maxMonths: 36,
      level: "branch",
      verification: "provider-confirmed",
      providerAgeUrl: "https://www.rockstaracademy.com/lib/upload/files/club/AB_Schedule_Winter_2026_Week_5.pdf",
      sourceCheckedAt: "2026-11-24",
    },
    term: "19 Oct 2026 until 17 Jan 2027",
    note: "'1-3 yrs' from the branch Winter term PDF class key; year-boundary inclusivity ambiguous. Grid: Mon 11:00, 13:00; Tue 10:00, 11:00; Wed 11:00, 13:00; Thu 10:00, 12:00; Fri 10:00, 11:00; Sat 10:00, 11:00; Sun 12:00 (50 min; branch schedule, read 24 Nov 2026). Confirm availability with the branch.",
  });
  add({
    name: "Baby Jam",
    category: "Gym & Movement",
    offering: "offered",
    age: {
      minMonths: 6,
      maxMonths: 18,
      level: "branch",
      verification: "provider-confirmed",
      providerAgeUrl: "https://www.rockstaracademy.com/lib/upload/files/club/AB_Schedule_Winter_2026_Week_5.pdf",
      sourceCheckedAt: "2026-11-24",
    },
    term: "19 Oct 2026 until 17 Jan 2027",
    note: "6-18 mo from the branch Winter term PDF class key. Grid: Thu 11:00; Sun 11:00 (30 min; branch schedule, read 24 Nov 2026). Confirm availability with the branch.",
  });
  add({
    name: "Crawler",
    category: "Gym & Movement",
    offering: "offered",
    age: {
      minMonths: 6,
      maxMonths: 18,
      level: "branch",
      verification: "provider-confirmed",
      providerAgeUrl: "https://www.rockstaracademy.com/lib/upload/files/club/AB_Schedule_Winter_2026_Week_5.pdf",
      sourceCheckedAt: "2026-11-24",
    },
    term: "19 Oct 2026 until 17 Jan 2027",
    note: "6-18 mo from the branch Winter term PDF class key. Grid: Tue 10:00; Thu 10:00; Sun 10:00 (50 min; branch schedule, read 24 Nov 2026). Confirm availability with the branch.",
  });
  add({
    name: "Jumper",
    category: "Gym & Movement",
    offering: "offered",
    age: {
      minMonths: 24,
      maxMonths: 35,
      level: "branch",
      verification: "provider-confirmed",
      providerAgeUrl: "https://www.rockstaracademy.com/lib/upload/files/club/AB_Schedule_Winter_2026_Week_5.pdf",
      sourceCheckedAt: "2026-11-24",
    },
    term: "19 Oct 2026 until 17 Jan 2027",
    note: "24-35 mo from the branch Winter term PDF class key. Grid: Mon 10:00, 14:00; Tue 11:00, 13:00; Wed 14:00; Thu 11:00, 13:00; Fri 10:00, 13:00; Sat 12:00; Sun 13:00 (50/55 min; branch schedule, read 24 Nov 2026). Confirm availability with the branch.",
  });
  add({
    name: "Learn & Play 1",
    category: "Preschool",
    offering: "offered",
    age: {
      minMonths: 6,
      maxMonths: 18,
      level: "branch",
      verification: "provider-confirmed",
      providerAgeUrl: "https://www.rockstaracademy.com/lib/upload/files/club/AB_Schedule_Winter_2026_Week_5.pdf",
      sourceCheckedAt: "2026-11-24",
    },
    term: "19 Oct 2026 until 17 Jan 2027",
    note: "6-18 mo from the branch Winter term PDF class key; Preschool & Kindergarten classes carry an additional fee per the PDF footer. Grid: Tue 09:00; Thu 09:00 (50/55 min; branch schedule, read 24 Nov 2026). Confirm availability with the branch.",
  });
  add({
    name: "Learn & Play 2",
    category: "Preschool",
    offering: "offered",
    age: {
      minMonths: 19,
      maxMonths: 35,
      level: "branch",
      verification: "provider-confirmed",
      providerAgeUrl: "https://www.rockstaracademy.com/lib/upload/files/club/AB_Schedule_Winter_2026_Week_5.pdf",
      sourceCheckedAt: "2026-11-24",
    },
    term: "19 Oct 2026 until 17 Jan 2027",
    note: "19-35 mo from the branch Winter term PDF class key; Preschool & Kindergarten classes carry an additional fee per the PDF footer. Grid: Tue 10:00, 12:00; Wed 10:00, 12:00; Thu 10:00, 12:00 (50 min; branch schedule, read 24 Nov 2026). Confirm availability with the branch.",
  });
  add({
    name: "Move & Groove",
    category: "Dance",
    offering: "offered",
    age: {
      minMonths: 36,
      maxMonths: 60,
      level: "branch",
      verification: "provider-confirmed",
      providerAgeUrl: "https://www.rockstaracademy.com/lib/upload/files/club/AB_Schedule_Winter_2026_Week_5.pdf",
      sourceCheckedAt: "2026-11-24",
    },
    term: "19 Oct 2026 until 17 Jan 2027",
    noteUrl: "https://www.rockstaracademy.com/schedules-and-locations/aeon-mall-bsd-city",
    noteLabel: "Age key",
    note: "'3 - 5 Years' via the official web schedule key; upper boundary ambiguous. Grid: Mon 14:00; Tue 15:00; Wed 16:00; Thu 14:00; Fri 12:00, 15:00; Sat 14:00 (50 min; branch schedule, read 24 Nov 2026). Confirm availability with the branch.",
  });
  add({
    name: "Pre-Ballet 3-5",
    category: "Dance",
    offering: "offered",
    age: {
      minMonths: 36,
      maxMonths: 60,
      level: "branch",
      verification: "provider-confirmed",
      providerAgeUrl: "https://www.rockstaracademy.com/lib/upload/files/club/AB_Schedule_Winter_2026_Week_5.pdf",
      sourceCheckedAt: "2026-11-24",
    },
    term: "19 Oct 2026 until 17 Jan 2027",
    noteUrl: "https://www.rockstaracademy.com/schedules-and-locations/aeon-mall-bsd-city",
    noteLabel: "Age key",
    note: "'3 - 5 Years' via the official web schedule key ('Pre-Ballet 1/2'); upper boundary ambiguous. Grid: Tue 13:00; Wed 15:00; Sat 12:00 (50 min; branch schedule, read 24 Nov 2026). Confirm availability with the branch.",
  });
  add({
    name: "Smartology 3",
    category: "Preschool",
    offering: "offered",
    age: {
      minMonths: 36,
      maxMonths: 48,
      level: "branch",
      verification: "provider-confirmed",
      providerAgeUrl: "https://www.rockstaracademy.com/lib/upload/files/club/AB_Schedule_Winter_2026_Week_5.pdf",
      sourceCheckedAt: "2026-11-24",
    },
    term: "19 Oct 2026 until 17 Jan 2027",
    note: "'3-4 yrs' from the branch Winter term PDF class key; upper-bound inclusivity ambiguous; additional fee per the PDF footer. Grid: Mon 11:00, 11:00; Tue 11:00, 11:00; Wed 11:00; Thu 11:00; Fri 11:00, 11:00 (50 min; branch schedule, read 24 Nov 2026). Confirm availability with the branch.",
  });
  add({
    name: "Smartology 4",
    category: "Preschool",
    offering: "offered",
    age: {
      minMonths: 48,
      maxMonths: 59,
      level: "branch",
      verification: "provider-confirmed",
      providerAgeUrl: "https://www.rockstaracademy.com/lib/upload/files/club/AB_Schedule_Winter_2026_Week_5.pdf",
      sourceCheckedAt: "2026-11-24",
    },
    term: "19 Oct 2026 until 17 Jan 2027",
    note: "4-5 yrs from the dated branch PDF class key (updated 16 Nov 2026); the undated web schedule key shows a wider '3 - 6 Years' label, the dated PDF wins. Additional fee per the PDF footer. Grid: Mon 12:00; Tue 12:00; Wed 12:00; Thu 12:00; Fri 12:00 (115 min; branch schedule, read 24 Nov 2026). Confirm availability with the branch.",
  });
  add({
    name: "Sports U3",
    category: "Multi-Sport",
    offering: "offered",
    age: {
      minMonths: 24,
      maxMonths: 36,
      level: "branch",
      verification: "provider-confirmed",
      providerAgeUrl: "https://www.rockstaracademy.com/lib/upload/files/club/AB_Schedule_Winter_2026_Week_5.pdf",
      sourceCheckedAt: "2026-11-24",
    },
    term: "19 Oct 2026 until 17 Jan 2027",
    noteUrl: "https://www.rockstaracademy.com/schedules-and-locations/aeon-mall-bsd-city",
    noteLabel: "Age key",
    note: "'2 - 3 Years' via the official web schedule key. Grid: Mon 12:00; Tue 10:00, 12:00; Wed 12:00; Thu 11:00; Fri 12:00; Sat 13:00; Sun 14:00 (50 min; branch schedule, read 24 Nov 2026). Confirm availability with the branch.",
  });
  add({
    name: "Sports U4/5",
    category: "Multi-Sport",
    offering: "offered",
    age: {
      minMonths: 36,
      maxMonths: 60,
      level: "branch",
      verification: "provider-confirmed",
      providerAgeUrl: "https://www.rockstaracademy.com/lib/upload/files/club/AB_Schedule_Winter_2026_Week_5.pdf",
      sourceCheckedAt: "2026-11-24",
    },
    term: "19 Oct 2026 until 17 Jan 2027",
    noteUrl: "https://www.rockstaracademy.com/schedules-and-locations/aeon-mall-bsd-city",
    noteLabel: "Age key",
    note: "'3 - 5 Years' via the official web schedule key; upper boundary ambiguous. Grid: Mon 13:00; Tue 14:00; Wed 14:00; Thu 13:00; Fri 13:00 (50 min; branch schedule, read 24 Nov 2026). Confirm availability with the branch.",
  });
  add({
    name: "Tots Gym U4",
    category: "Gym & Movement",
    offering: "offered",
    age: {
      minMonths: 36,
      maxMonths: 48,
      level: "branch",
      verification: "provider-confirmed",
      providerAgeUrl: "https://www.rockstaracademy.com/lib/upload/files/club/AB_Schedule_Winter_2026_Week_5.pdf",
      sourceCheckedAt: "2026-11-24",
    },
    term: "19 Oct 2026 until 17 Jan 2027",
    noteUrl: "https://www.rockstaracademy.com/schedules-and-locations/aeon-mall-bsd-city",
    noteLabel: "Age key",
    note: "PDF cell label 'Tots Gym U4'; numeric age via the official web schedule key ('3 - 4 Years'). Grid: Mon 11:00, 15:00; Tue 14:00; Wed 11:00, 15:00; Thu 15:00; Fri 14:00; Sat 13:00; Sun 14:00 (50 min; branch schedule, read 24 Nov 2026). Confirm availability with the branch.",
  });
  add({
    name: "TouchTennis 3-6 yrs",
    category: "Multi-Sport",
    offering: "offered",
    age: {
      minMonths: 36,
      maxMonths: 71,
      level: "branch",
      verification: "provider-confirmed",
      providerAgeUrl: "https://www.rockstaracademy.com/lib/upload/files/club/AB_Schedule_Winter_2026_Week_5.pdf",
      sourceCheckedAt: "2026-11-24",
    },
    term: "19 Oct 2026 until 17 Jan 2027",
    noteUrl: "https://www.rockstaracademy.com/schedules-and-locations/aeon-mall-bsd-city",
    noteLabel: "Age key",
    note: "'3 - 7 Years' via the official web schedule key; the class name says '3-6 yrs', the difference sits above the under-5 range. Confirm with the branch. Grid: Mon 13:00; Tue 13:00, 15:00; Wed 15:00; Thu 14:00; Fri 14:00; Sat 13:00; Sun 13:00 (55 min; branch schedule, read 24 Nov 2026). Confirm availability with the branch.",
  });
  add({
    name: "Walker",
    category: "Gym & Movement",
    offering: "offered",
    age: {
      minMonths: 12,
      maxMonths: 23,
      level: "branch",
      verification: "provider-confirmed",
      providerAgeUrl: "https://www.rockstaracademy.com/lib/upload/files/club/AB_Schedule_Winter_2026_Week_5.pdf",
      sourceCheckedAt: "2026-11-24",
    },
    term: "19 Oct 2026 until 17 Jan 2027",
    note: "12-23 mo from the branch Winter term PDF class key. Grid: Mon 13:00; Tue 12:00; Wed 10:00, 13:00; Thu 12:00; Fri 11:00; Sat 11:00; Sun 11:00 (50/55 min; branch schedule, read 24 Nov 2026). Confirm availability with the branch.",
  });
  }

  // ---- AEON MALL Sentul City ----
  {
  const v = venue(venues, "rockstar-academy-aeon-mall-sentul-city");
  v.lastCheckedAt = "2026-11-24";
  v.operatingStatus = { state: "official-listed", source: "https://www.rockstaracademy.com/schedules-and-locations/aeon-mall-sentul-city", checkedAt: "2026-11-24" };
  v.cardNote = "Term enrollment: 11-week terms (Winter: 19 Oct 2026 to 17 Jan 2027); registration required before class, no same-day signup; baby gymnastics up to 3 classes/week. Free trial class bookable on the official site (rockstaracademy.com/freetrial). Read 24 Nov 2026. / Kelas per term: 11 minggu per term (Winter: 19 Okt 2026 - 17 Jan 2027); wajib daftar sebelum kelas, tidak bisa daftar di hari yang sama; baby gym maksimal 3 kelas per minggu. Kelas trial gratis bisa dipesan di situs resmi. Dibaca 24 Nov 2026.";
  v.categories = ["Dance", "Gym & Movement", "Multi-Sport", "Preschool", "Swim"];
  const add = (p: VenueProgram) => {
    const i = v.programs.findIndex((x) => x.name === p.name || (p.name === "Baby Ballet" && x.name === "Baby (Ballet)"));
    if (i >= 0) v.programs[i] = { ...v.programs[i], ...p, name: v.programs[i].name, age: { ...v.programs[i].age, ...p.age } };
    else v.programs.push(p);
  };
  add({
    name: "Baby Ballet",
    category: "Dance",
    offering: "offered",
    age: {
      minMonths: 24,
      maxMonths: 36,
      level: "branch",
      verification: "provider-confirmed",
      providerAgeUrl: "https://www.rockstaracademy.com/lib/upload/files/club/AS_Schedule_Winter_2026_W5.pdf",
      sourceCheckedAt: "2026-11-24",
    },
    term: "19 Oct 2026 until 17 Jan 2027",
    noteUrl: "https://www.rockstaracademy.com/schedules-and-locations/aeon-mall-sentul-city",
    noteLabel: "Age key",
    note: "'2 - 3 Years' via the official web schedule key; year-boundary inclusivity ambiguous. Grid: Tue 13:00; Thu 12:00; Fri 12:00 (30/50 min; branch schedule, read 24 Nov 2026). Confirm availability with the branch.",
  });
  add({
    name: "Baby Dance",
    category: "Dance",
    offering: "offered",
    age: {
      minMonths: 12,
      maxMonths: 36,
      level: "branch",
      verification: "provider-confirmed",
      providerAgeUrl: "https://www.rockstaracademy.com/lib/upload/files/club/AS_Schedule_Winter_2026_W5.pdf",
      sourceCheckedAt: "2026-11-24",
    },
    term: "19 Oct 2026 until 17 Jan 2027",
    note: "'1-3 yrs' from the branch Winter term PDF class key; year-boundary inclusivity ambiguous. Grid: Mon 14:00; Tue 11:00, 12:00; Wed 11:00, 12:00; Thu 12:00; Fri 11:00; Sat 11:00; Sun 13:00 (50 min; branch schedule, read 24 Nov 2026). Confirm availability with the branch.",
  });
  add({
    name: "Baby Jam",
    category: "Gym & Movement",
    offering: "offered",
    age: {
      minMonths: 6,
      maxMonths: 18,
      level: "branch",
      verification: "provider-confirmed",
      providerAgeUrl: "https://www.rockstaracademy.com/lib/upload/files/club/AS_Schedule_Winter_2026_W5.pdf",
      sourceCheckedAt: "2026-11-24",
    },
    term: "19 Oct 2026 until 17 Jan 2027",
    note: "6-18 mo from the branch Winter term PDF class key. Grid: Thu 11:00 (30 min; branch schedule, read 24 Nov 2026). Confirm availability with the branch.",
  });
  add({
    name: "Crawler",
    category: "Gym & Movement",
    offering: "offered",
    age: {
      minMonths: 6,
      maxMonths: 18,
      level: "branch",
      verification: "provider-confirmed",
      providerAgeUrl: "https://www.rockstaracademy.com/lib/upload/files/club/AS_Schedule_Winter_2026_W5.pdf",
      sourceCheckedAt: "2026-11-24",
    },
    term: "19 Oct 2026 until 17 Jan 2027",
    note: "6-18 mo from the branch Winter term PDF class key. Grid: Tue 10:00; Thu 10:00; Sat 11:00 (50 min; branch schedule, read 24 Nov 2026). Confirm availability with the branch.",
  });
  add({
    name: "Jumper",
    category: "Gym & Movement",
    offering: "offered",
    age: {
      minMonths: 24,
      maxMonths: 35,
      level: "branch",
      verification: "provider-confirmed",
      providerAgeUrl: "https://www.rockstaracademy.com/lib/upload/files/club/AS_Schedule_Winter_2026_W5.pdf",
      sourceCheckedAt: "2026-11-24",
    },
    term: "19 Oct 2026 until 17 Jan 2027",
    note: "24-35 mo from the branch Winter term PDF class key. Grid: Mon 14:00; Tue 12:00; Wed 11:00, 13:00; Thu 11:00; Fri 11:00; Sat 10:00; Sun 12:00 (50 min; branch schedule, read 24 Nov 2026). Confirm availability with the branch.",
  });
  add({
    name: "Learn & Play 1",
    category: "Preschool",
    offering: "offered",
    age: {
      minMonths: 6,
      maxMonths: 18,
      level: "branch",
      verification: "provider-confirmed",
      providerAgeUrl: "https://www.rockstaracademy.com/lib/upload/files/club/AS_Schedule_Winter_2026_W5.pdf",
      sourceCheckedAt: "2026-11-24",
    },
    term: "19 Oct 2026 until 17 Jan 2027",
    note: "6-18 mo from the branch Winter term PDF class key; Preschool & Kindergarten classes carry an additional fee per the PDF footer. Grid: Tue 09:00; Thu 09:00 (50 min; branch schedule, read 24 Nov 2026). Confirm availability with the branch.",
  });
  add({
    name: "Learn & Play 2",
    category: "Preschool",
    offering: "offered",
    age: {
      minMonths: 19,
      maxMonths: 35,
      level: "branch",
      verification: "provider-confirmed",
      providerAgeUrl: "https://www.rockstaracademy.com/lib/upload/files/club/AS_Schedule_Winter_2026_W5.pdf",
      sourceCheckedAt: "2026-11-24",
    },
    term: "19 Oct 2026 until 17 Jan 2027",
    note: "19-35 mo from the branch Winter term PDF class key; Preschool & Kindergarten classes carry an additional fee per the PDF footer. Grid: Tue 10:00, 11:00; Wed 09:00, 10:00; Thu 10:00; Fri 09:00 (50 min; branch schedule, read 24 Nov 2026). Confirm availability with the branch.",
  });
  add({
    name: "Move & Groove",
    category: "Dance",
    offering: "offered",
    age: {
      minMonths: 36,
      maxMonths: 60,
      level: "branch",
      verification: "provider-confirmed",
      providerAgeUrl: "https://www.rockstaracademy.com/lib/upload/files/club/AS_Schedule_Winter_2026_W5.pdf",
      sourceCheckedAt: "2026-11-24",
    },
    term: "19 Oct 2026 until 17 Jan 2027",
    noteUrl: "https://www.rockstaracademy.com/schedules-and-locations/aeon-mall-sentul-city",
    noteLabel: "Age key",
    note: "'3 - 5 Years' via the official web schedule key; upper boundary ambiguous. Grid: Mon 15:00; Tue 14:00; Wed 13:00; Thu 14:00; Sat 12:00 (50 min; branch schedule, read 24 Nov 2026). Confirm availability with the branch.",
  });
  add({
    name: "Pre-Ballet 3-5",
    category: "Dance",
    offering: "offered",
    age: {
      minMonths: 36,
      maxMonths: 60,
      level: "branch",
      verification: "provider-confirmed",
      providerAgeUrl: "https://www.rockstaracademy.com/lib/upload/files/club/AS_Schedule_Winter_2026_W5.pdf",
      sourceCheckedAt: "2026-11-24",
    },
    term: "19 Oct 2026 until 17 Jan 2027",
    noteUrl: "https://www.rockstaracademy.com/schedules-and-locations/aeon-mall-sentul-city",
    noteLabel: "Age key",
    note: "'3 - 5 Years' via the official web schedule key ('Pre-Ballet 1/2'); upper boundary ambiguous. Grid: Tue 14:00; Thu 13:00; Fri 14:00 (50 min; branch schedule, read 24 Nov 2026). Confirm availability with the branch.",
  });
  add({
    name: "Smartology 3",
    category: "Preschool",
    offering: "offered",
    age: {
      minMonths: 36,
      maxMonths: 48,
      level: "branch",
      verification: "provider-confirmed",
      providerAgeUrl: "https://www.rockstaracademy.com/lib/upload/files/club/AS_Schedule_Winter_2026_W5.pdf",
      sourceCheckedAt: "2026-11-24",
    },
    term: "19 Oct 2026 until 17 Jan 2027",
    note: "'3-4 yrs' from the branch Winter term PDF class key; upper-bound inclusivity ambiguous; additional fee per the PDF footer. Grid: Mon 11:00; Tue 11:00; Wed 11:00; Fri 11:00 (50 min; branch schedule, read 24 Nov 2026). Confirm availability with the branch.",
  });
  add({
    name: "Smartology 4",
    category: "Preschool",
    offering: "offered",
    age: {
      minMonths: 48,
      maxMonths: 59,
      level: "branch",
      verification: "provider-confirmed",
      providerAgeUrl: "https://www.rockstaracademy.com/lib/upload/files/club/AS_Schedule_Winter_2026_W5.pdf",
      sourceCheckedAt: "2026-11-24",
    },
    term: "19 Oct 2026 until 17 Jan 2027",
    note: "4-5 yrs from the dated branch PDF class key (updated 16 Nov 2026); the undated web schedule key shows a wider '3 - 6 Years' label, the dated PDF wins. Additional fee per the PDF footer. Grid: Mon 12:00; Tue 12:00; Wed 12:00; Thu 12:00; Fri 12:00 (115 min; branch schedule, read 24 Nov 2026). Confirm availability with the branch.",
  });
  add({
    name: "Sports U3",
    category: "Multi-Sport",
    offering: "offered",
    age: {
      minMonths: 24,
      maxMonths: 36,
      level: "branch",
      verification: "provider-confirmed",
      providerAgeUrl: "https://www.rockstaracademy.com/lib/upload/files/club/AS_Schedule_Winter_2026_W5.pdf",
      sourceCheckedAt: "2026-11-24",
    },
    term: "19 Oct 2026 until 17 Jan 2027",
    noteUrl: "https://www.rockstaracademy.com/schedules-and-locations/aeon-mall-sentul-city",
    noteLabel: "Age key",
    note: "'2 - 3 Years' via the official web schedule key. Grid: Mon 15:00; Tue 14:00; Wed 12:00; Thu 13:00; Fri 10:00; Sat 12:00 (50 min; branch schedule, read 24 Nov 2026). Confirm availability with the branch.",
  });
  add({
    name: "Sports U4/5",
    category: "Multi-Sport",
    offering: "offered",
    age: {
      minMonths: 36,
      maxMonths: 60,
      level: "branch",
      verification: "provider-confirmed",
      providerAgeUrl: "https://www.rockstaracademy.com/lib/upload/files/club/AS_Schedule_Winter_2026_W5.pdf",
      sourceCheckedAt: "2026-11-24",
    },
    term: "19 Oct 2026 until 17 Jan 2027",
    noteUrl: "https://www.rockstaracademy.com/schedules-and-locations/aeon-mall-sentul-city",
    noteLabel: "Age key",
    note: "'3 - 5 Years' via the official web schedule key; upper boundary ambiguous. Grid: Tue 12:00; Wed 14:00; Thu 11:00; Fri 11:00; Sat 14:00 (50/55 min; branch schedule, read 24 Nov 2026). Confirm availability with the branch.",
  });
  add({
    name: "Tots Gym U4",
    category: "Gym & Movement",
    offering: "offered",
    age: {
      minMonths: 36,
      maxMonths: 48,
      level: "branch",
      verification: "provider-confirmed",
      providerAgeUrl: "https://www.rockstaracademy.com/lib/upload/files/club/AS_Schedule_Winter_2026_W5.pdf",
      sourceCheckedAt: "2026-11-24",
    },
    term: "19 Oct 2026 until 17 Jan 2027",
    noteUrl: "https://www.rockstaracademy.com/schedules-and-locations/aeon-mall-sentul-city",
    noteLabel: "Age key",
    note: "PDF cell label 'Tots Gym U4'; numeric age via the official web schedule key ('3 - 4 Years'). Grid: Mon 12:00, 16:00; Tue 15:00; Wed 12:00; Thu 15:00; Fri 13:00; Sat 13:00 (50/55 min; branch schedule, read 24 Nov 2026). Confirm availability with the branch.",
  });
  add({
    name: "Walker",
    category: "Gym & Movement",
    offering: "offered",
    age: {
      minMonths: 12,
      maxMonths: 23,
      level: "branch",
      verification: "provider-confirmed",
      providerAgeUrl: "https://www.rockstaracademy.com/lib/upload/files/club/AS_Schedule_Winter_2026_W5.pdf",
      sourceCheckedAt: "2026-11-24",
    },
    term: "19 Oct 2026 until 17 Jan 2027",
    note: "12-23 mo from the branch Winter term PDF class key. Grid: Mon 13:00; Tue 11:00; Wed 10:00; Thu 13:00; Fri 10:00; Sat 12:00; Sun 11:00 (50 min; branch schedule, read 24 Nov 2026). Confirm availability with the branch.",
  });
  }

  // ---- AEON Mall Deltamas ----
  {
  const v = venue(venues, "rockstar-academy-aeon-mall-deltamas");
  v.lastCheckedAt = "2026-11-24";
  v.operatingStatus = { state: "official-listed", source: "https://www.rockstaracademy.com/schedules-and-locations/aeon-mall-deltamas", checkedAt: "2026-11-24" };
  v.cardNote = "Term enrollment: 11-week terms (Winter: 19 Oct 2026 to 17 Jan 2027); registration required before class, no same-day signup; baby gymnastics up to 3 classes/week. Free trial class bookable on the official site (rockstaracademy.com/freetrial). Read 24 Nov 2026. / Kelas per term: 11 minggu per term (Winter: 19 Okt 2026 - 17 Jan 2027); wajib daftar sebelum kelas, tidak bisa daftar di hari yang sama; baby gym maksimal 3 kelas per minggu. Kelas trial gratis bisa dipesan di situs resmi. Dibaca 24 Nov 2026.";
  v.categories = ["Dance", "Gym & Movement", "Multi-Sport", "Preschool", "Swim"];
  const add = (p: VenueProgram) => {
    const i = v.programs.findIndex((x) => x.name === p.name || (p.name === "Baby Ballet" && x.name === "Baby (Ballet)"));
    if (i >= 0) v.programs[i] = { ...v.programs[i], ...p, name: v.programs[i].name, age: { ...v.programs[i].age, ...p.age } };
    else v.programs.push(p);
  };
  add({
    name: "Baby Ballet",
    category: "Dance",
    offering: "offered",
    age: {
      minMonths: 24,
      maxMonths: 36,
      level: "branch",
      verification: "provider-confirmed",
      providerAgeUrl: "https://www.rockstaracademy.com/lib/upload/files/club/AD_Schedule_Winter_2026_W5.pdf",
      sourceCheckedAt: "2026-11-24",
    },
    term: "19 Oct 2026 until 17 Jan 2027",
    noteUrl: "https://www.rockstaracademy.com/schedules-and-locations/aeon-mall-deltamas",
    noteLabel: "Age key",
    note: "'2 - 3 Years' via the official web schedule key; year-boundary inclusivity ambiguous. Grid: Wed 13:00; Thu 13:00 (30 min; branch schedule, read 24 Nov 2026). Confirm availability with the branch.",
  });
  add({
    name: "Baby Dance",
    category: "Dance",
    offering: "offered",
    age: {
      minMonths: 12,
      maxMonths: 36,
      level: "branch",
      verification: "provider-confirmed",
      providerAgeUrl: "https://www.rockstaracademy.com/lib/upload/files/club/AD_Schedule_Winter_2026_W5.pdf",
      sourceCheckedAt: "2026-11-24",
    },
    term: "19 Oct 2026 until 17 Jan 2027",
    note: "'1-3 yrs' from the branch Winter term PDF class key; year-boundary inclusivity ambiguous. Grid: Mon 13:00; Tue 10:00, 11:00; Wed 11:00; Thu 10:00, 11:00; Fri 11:00; Sat 11:00; Sun 12:00 (50 min; branch schedule, read 24 Nov 2026). Confirm availability with the branch.",
  });
  add({
    name: "Baby Jam",
    category: "Gym & Movement",
    offering: "offered",
    age: {
      minMonths: 6,
      maxMonths: 18,
      level: "branch",
      verification: "provider-confirmed",
      providerAgeUrl: "https://www.rockstaracademy.com/lib/upload/files/club/AD_Schedule_Winter_2026_W5.pdf",
      sourceCheckedAt: "2026-11-24",
    },
    term: "19 Oct 2026 until 17 Jan 2027",
    note: "6-18 mo from the branch Winter term PDF class key. Grid: Tue 11:00 (30 min; branch schedule, read 24 Nov 2026). Confirm availability with the branch.",
  });
  add({
    name: "Crawler",
    category: "Gym & Movement",
    offering: "offered",
    age: {
      minMonths: 6,
      maxMonths: 18,
      level: "branch",
      verification: "provider-confirmed",
      providerAgeUrl: "https://www.rockstaracademy.com/lib/upload/files/club/AD_Schedule_Winter_2026_W5.pdf",
      sourceCheckedAt: "2026-11-24",
    },
    term: "19 Oct 2026 until 17 Jan 2027",
    note: "6-18 mo from the branch Winter term PDF class key. Grid: Tue 10:00; Thu 10:00 (50 min; branch schedule, read 24 Nov 2026). Confirm availability with the branch.",
  });
  add({
    name: "Jumper",
    category: "Gym & Movement",
    offering: "offered",
    age: {
      minMonths: 24,
      maxMonths: 35,
      level: "branch",
      verification: "provider-confirmed",
      providerAgeUrl: "https://www.rockstaracademy.com/lib/upload/files/club/AD_Schedule_Winter_2026_W5.pdf",
      sourceCheckedAt: "2026-11-24",
    },
    term: "19 Oct 2026 until 17 Jan 2027",
    note: "24-35 mo from the branch Winter term PDF class key. Grid: Mon 14:00; Tue 12:00; Wed 12:00; Thu 11:00; Fri 11:00; Sat 11:00; Sun 13:00 (50 min; branch schedule, read 24 Nov 2026). Confirm availability with the branch.",
  });
  add({
    name: "Learn & Play 1",
    category: "Preschool",
    offering: "offered",
    age: {
      minMonths: 6,
      maxMonths: 18,
      level: "branch",
      verification: "provider-confirmed",
      providerAgeUrl: "https://www.rockstaracademy.com/lib/upload/files/club/AD_Schedule_Winter_2026_W5.pdf",
      sourceCheckedAt: "2026-11-24",
    },
    term: "19 Oct 2026 until 17 Jan 2027",
    note: "6-18 mo from the branch Winter term PDF class key; Preschool & Kindergarten classes carry an additional fee per the PDF footer. Grid: Tue 09:00; Thu 09:00 (50 min; branch schedule, read 24 Nov 2026). Confirm availability with the branch.",
  });
  add({
    name: "Learn & Play 2",
    category: "Preschool",
    offering: "offered",
    age: {
      minMonths: 19,
      maxMonths: 35,
      level: "branch",
      verification: "provider-confirmed",
      providerAgeUrl: "https://www.rockstaracademy.com/lib/upload/files/club/AD_Schedule_Winter_2026_W5.pdf",
      sourceCheckedAt: "2026-11-24",
    },
    term: "19 Oct 2026 until 17 Jan 2027",
    note: "19-35 mo from the branch Winter term PDF class key; Preschool & Kindergarten classes carry an additional fee per the PDF footer. Grid: Tue 10:00; Wed 10:00; Thu 10:00 (50 min; branch schedule, read 24 Nov 2026). Confirm availability with the branch.",
  });
  add({
    name: "Move & Groove",
    category: "Dance",
    offering: "offered",
    age: {
      minMonths: 36,
      maxMonths: 60,
      level: "branch",
      verification: "provider-confirmed",
      providerAgeUrl: "https://www.rockstaracademy.com/lib/upload/files/club/AD_Schedule_Winter_2026_W5.pdf",
      sourceCheckedAt: "2026-11-24",
    },
    term: "19 Oct 2026 until 17 Jan 2027",
    noteUrl: "https://www.rockstaracademy.com/schedules-and-locations/aeon-mall-deltamas",
    noteLabel: "Age key",
    note: "'3 - 5 Years' via the official web schedule key; upper boundary ambiguous. Grid: Mon 14:00; Tue 15:00; Wed 15:00; Thu 14:00; Fri 15:00; Sat 13:00; Sun 15:00 (50 min; branch schedule, read 24 Nov 2026). Confirm availability with the branch.",
  });
  add({
    name: "Pre-Ballet 3-5",
    category: "Dance",
    offering: "offered",
    age: {
      minMonths: 36,
      maxMonths: 60,
      level: "branch",
      verification: "provider-confirmed",
      providerAgeUrl: "https://www.rockstaracademy.com/lib/upload/files/club/AD_Schedule_Winter_2026_W5.pdf",
      sourceCheckedAt: "2026-11-24",
    },
    term: "19 Oct 2026 until 17 Jan 2027",
    noteUrl: "https://www.rockstaracademy.com/schedules-and-locations/aeon-mall-deltamas",
    noteLabel: "Age key",
    note: "'3 - 5 Years' via the official web schedule key ('Pre-Ballet 1/2'); upper boundary ambiguous. Grid: Wed 15:00; Thu 15:00 (50 min; branch schedule, read 24 Nov 2026). Confirm availability with the branch.",
  });
  add({
    name: "Smartology 3",
    category: "Preschool",
    offering: "offered",
    age: {
      minMonths: 36,
      maxMonths: 48,
      level: "branch",
      verification: "provider-confirmed",
      providerAgeUrl: "https://www.rockstaracademy.com/lib/upload/files/club/AD_Schedule_Winter_2026_W5.pdf",
      sourceCheckedAt: "2026-11-24",
    },
    term: "19 Oct 2026 until 17 Jan 2027",
    note: "'3-4 yrs' from the branch Winter term PDF class key; upper-bound inclusivity ambiguous; additional fee per the PDF footer. Grid: Mon 11:00; Tue 11:00; Wed 11:00; Fri 11:00 (50 min; branch schedule, read 24 Nov 2026). Confirm availability with the branch.",
  });
  add({
    name: "Smartology 4",
    category: "Preschool",
    offering: "offered",
    age: {
      minMonths: 48,
      maxMonths: 59,
      level: "branch",
      verification: "provider-confirmed",
      providerAgeUrl: "https://www.rockstaracademy.com/lib/upload/files/club/AD_Schedule_Winter_2026_W5.pdf",
      sourceCheckedAt: "2026-11-24",
    },
    term: "19 Oct 2026 until 17 Jan 2027",
    note: "4-5 yrs from the dated branch PDF class key (updated 16 Nov 2026); the undated web schedule key shows a wider '3 - 6 Years' label, the dated PDF wins. Additional fee per the PDF footer. Grid: Mon 12:00; Tue 12:00; Wed 12:00; Thu 12:00; Fri 12:00 (115 min; branch schedule, read 24 Nov 2026). Confirm availability with the branch.",
  });
  add({
    name: "Sports U3",
    category: "Multi-Sport",
    offering: "offered",
    age: {
      minMonths: 24,
      maxMonths: 36,
      level: "branch",
      verification: "provider-confirmed",
      providerAgeUrl: "https://www.rockstaracademy.com/lib/upload/files/club/AD_Schedule_Winter_2026_W5.pdf",
      sourceCheckedAt: "2026-11-24",
    },
    term: "19 Oct 2026 until 17 Jan 2027",
    noteUrl: "https://www.rockstaracademy.com/schedules-and-locations/aeon-mall-deltamas",
    noteLabel: "Age key",
    note: "'2 - 3 Years' via the official web schedule key. Grid: Mon 15:00; Tue 13:00; Thu 12:00; Fri 10:00; Sat 12:00 (50 min; branch schedule, read 24 Nov 2026). Confirm availability with the branch.",
  });
  add({
    name: "Sports U4/5",
    category: "Multi-Sport",
    offering: "offered",
    age: {
      minMonths: 36,
      maxMonths: 60,
      level: "branch",
      verification: "provider-confirmed",
      providerAgeUrl: "https://www.rockstaracademy.com/lib/upload/files/club/AD_Schedule_Winter_2026_W5.pdf",
      sourceCheckedAt: "2026-11-24",
    },
    term: "19 Oct 2026 until 17 Jan 2027",
    noteUrl: "https://www.rockstaracademy.com/schedules-and-locations/aeon-mall-deltamas",
    noteLabel: "Age key",
    note: "'3 - 5 Years' via the official web schedule key; upper boundary ambiguous. Grid: Mon 16:00; Tue 14:00; Wed 14:00; Fri 14:00; Sat 14:00; Sun 13:00 (50 min; branch schedule, read 24 Nov 2026). Confirm availability with the branch.",
  });
  add({
    name: "Tots Gym U4",
    category: "Gym & Movement",
    offering: "offered",
    age: {
      minMonths: 36,
      maxMonths: 48,
      level: "branch",
      verification: "provider-confirmed",
      providerAgeUrl: "https://www.rockstaracademy.com/lib/upload/files/club/AD_Schedule_Winter_2026_W5.pdf",
      sourceCheckedAt: "2026-11-24",
    },
    term: "19 Oct 2026 until 17 Jan 2027",
    noteUrl: "https://www.rockstaracademy.com/schedules-and-locations/aeon-mall-deltamas",
    noteLabel: "Age key",
    note: "PDF cell label 'Tots Gym U4'; numeric age via the official web schedule key ('3 - 4 Years'). Grid: Mon 15:00; Tue 13:00; Wed 13:00; Thu 13:00; Fri 13:00; Sat 12:00; Sun 14:00 (50 min; branch schedule, read 24 Nov 2026). Confirm availability with the branch.",
  });
  add({
    name: "TouchTennis 3-6 yrs",
    category: "Multi-Sport",
    offering: "offered",
    age: {
      minMonths: 36,
      maxMonths: 71,
      level: "branch",
      verification: "provider-confirmed",
      providerAgeUrl: "https://www.rockstaracademy.com/lib/upload/files/club/AD_Schedule_Winter_2026_W5.pdf",
      sourceCheckedAt: "2026-11-24",
    },
    term: "19 Oct 2026 until 17 Jan 2027",
    noteUrl: "https://www.rockstaracademy.com/schedules-and-locations/aeon-mall-deltamas",
    noteLabel: "Age key",
    note: "'3 - 7 Years' via the official web schedule key; the class name says '3-6 yrs', the difference sits above the under-5 range. Confirm with the branch. Grid: Mon 13:00, 15:00; Wed 14:00, 16:00; Thu 16:00; Fri 14:00; Sat 13:00; Sun 14:00 (55 min; branch schedule, read 24 Nov 2026). Confirm availability with the branch.",
  });
  add({
    name: "Walker",
    category: "Gym & Movement",
    offering: "offered",
    age: {
      minMonths: 12,
      maxMonths: 23,
      level: "branch",
      verification: "provider-confirmed",
      providerAgeUrl: "https://www.rockstaracademy.com/lib/upload/files/club/AD_Schedule_Winter_2026_W5.pdf",
      sourceCheckedAt: "2026-11-24",
    },
    term: "19 Oct 2026 until 17 Jan 2027",
    note: "12-23 mo from the branch Winter term PDF class key. Grid: Mon 12:00; Tue 11:00; Wed 10:00; Thu 12:00; Fri 10:00; Sat 10:00; Sun 11:00 (50 min; branch schedule, read 24 Nov 2026). Confirm availability with the branch.",
  });
  }

  // ---- Central Park 2 (Neo Soho) ----
  {
  const v = venue(venues, "rockstar-academy-central-park-2");
  v.lastCheckedAt = "2026-11-24";
  v.operatingStatus = { state: "official-listed", source: "https://www.rockstaracademy.com/schedules-and-locations/central-park-2", checkedAt: "2026-11-24" };
  v.cardNote = "Term enrollment: 11-week terms (Winter: 19 Oct 2026 to 17 Jan 2027); registration required before class, no same-day signup; baby gymnastics up to 3 classes/week. Free trial class bookable on the official site (rockstaracademy.com/freetrial). Read 24 Nov 2026. / Kelas per term: 11 minggu per term (Winter: 19 Okt 2026 - 17 Jan 2027); wajib daftar sebelum kelas, tidak bisa daftar di hari yang sama; baby gym maksimal 3 kelas per minggu. Kelas trial gratis bisa dipesan di situs resmi. Dibaca 24 Nov 2026.";
  v.categories = ["Dance", "Gym & Movement", "Multi-Sport", "Preschool", "Swim"];
  const add = (p: VenueProgram) => {
    const i = v.programs.findIndex((x) => x.name === p.name || (p.name === "Baby Ballet" && x.name === "Baby (Ballet)"));
    if (i >= 0) v.programs[i] = { ...v.programs[i], ...p, name: v.programs[i].name, age: { ...v.programs[i].age, ...p.age } };
    else v.programs.push(p);
  };
  add({
    name: "Baby Ballet",
    category: "Dance",
    offering: "offered",
    age: {
      minMonths: 24,
      maxMonths: 36,
      level: "branch",
      verification: "provider-confirmed",
      providerAgeUrl: "https://www.rockstaracademy.com/lib/upload/files/club/CP_Schedule_Winter_2026_W5.pdf",
      sourceCheckedAt: "2026-11-24",
    },
    term: "19 Oct 2026 until 17 Jan 2027",
    noteUrl: "https://www.rockstaracademy.com/schedules-and-locations/central-park-2",
    noteLabel: "Age key",
    note: "'2 - 3 Years' via the official web schedule key; year-boundary inclusivity ambiguous. Grid: Wed 14:00 (30 min; branch schedule, read 24 Nov 2026). Confirm availability with the branch.",
  });
  add({
    name: "Baby Dance",
    category: "Dance",
    offering: "offered",
    age: {
      minMonths: 12,
      maxMonths: 36,
      level: "branch",
      verification: "provider-confirmed",
      providerAgeUrl: "https://www.rockstaracademy.com/lib/upload/files/club/CP_Schedule_Winter_2026_W5.pdf",
      sourceCheckedAt: "2026-11-24",
    },
    term: "19 Oct 2026 until 17 Jan 2027",
    note: "'1-3 yrs' from the branch Winter term PDF class key; year-boundary inclusivity ambiguous. Grid: Mon 14:00; Tue 11:00, 13:00; Wed 11:00, 13:00; Thu 11:00, 13:00; Fri 12:00; Sat 11:00; Sun 11:00 (50 min; branch schedule, read 24 Nov 2026). Confirm availability with the branch.",
  });
  add({
    name: "Crawler",
    category: "Gym & Movement",
    offering: "offered",
    age: {
      minMonths: 6,
      maxMonths: 18,
      level: "branch",
      verification: "provider-confirmed",
      providerAgeUrl: "https://www.rockstaracademy.com/lib/upload/files/club/CP_Schedule_Winter_2026_W5.pdf",
      sourceCheckedAt: "2026-11-24",
    },
    term: "19 Oct 2026 until 17 Jan 2027",
    note: "6-18 mo from the branch Winter term PDF class key. Grid: Thu 10:00; Sat 11:00 (50 min; branch schedule, read 24 Nov 2026). Confirm availability with the branch.",
  });
  add({
    name: "Jumper",
    category: "Gym & Movement",
    offering: "offered",
    age: {
      minMonths: 24,
      maxMonths: 35,
      level: "branch",
      verification: "provider-confirmed",
      providerAgeUrl: "https://www.rockstaracademy.com/lib/upload/files/club/CP_Schedule_Winter_2026_W5.pdf",
      sourceCheckedAt: "2026-11-24",
    },
    term: "19 Oct 2026 until 17 Jan 2027",
    note: "24-35 mo from the branch Winter term PDF class key. Grid: Mon 15:00; Tue 10:00, 11:00; Wed 10:00; Thu 11:00; Fri 10:00; Sat 12:00; Sun 13:00 (50 min; branch schedule, read 24 Nov 2026). Confirm availability with the branch.",
  });
  add({
    name: "Learn & Play 1",
    category: "Preschool",
    offering: "offered",
    age: {
      minMonths: 6,
      maxMonths: 18,
      level: "branch",
      verification: "provider-confirmed",
      providerAgeUrl: "https://www.rockstaracademy.com/lib/upload/files/club/CP_Schedule_Winter_2026_W5.pdf",
      sourceCheckedAt: "2026-11-24",
    },
    term: "19 Oct 2026 until 17 Jan 2027",
    note: "6-18 mo from the branch Winter term PDF class key; Preschool & Kindergarten classes carry an additional fee per the PDF footer. Grid: Tue 09:00; Wed 09:00; Thu 09:00; Fri 09:00 (50 min; branch schedule, read 24 Nov 2026). Confirm availability with the branch.",
  });
  add({
    name: "Learn & Play 2",
    category: "Preschool",
    offering: "offered",
    age: {
      minMonths: 19,
      maxMonths: 35,
      level: "branch",
      verification: "provider-confirmed",
      providerAgeUrl: "https://www.rockstaracademy.com/lib/upload/files/club/CP_Schedule_Winter_2026_W5.pdf",
      sourceCheckedAt: "2026-11-24",
    },
    term: "19 Oct 2026 until 17 Jan 2027",
    note: "19-35 mo from the branch Winter term PDF class key; Preschool & Kindergarten classes carry an additional fee per the PDF footer. Grid: Tue 10:00, 12:00; Wed 10:00, 12:00; Thu 10:00, 11:00 (50 min; branch schedule, read 24 Nov 2026). Confirm availability with the branch.",
  });
  add({
    name: "Move & Groove",
    category: "Dance",
    offering: "offered",
    age: {
      minMonths: 36,
      maxMonths: 60,
      level: "branch",
      verification: "provider-confirmed",
      providerAgeUrl: "https://www.rockstaracademy.com/lib/upload/files/club/CP_Schedule_Winter_2026_W5.pdf",
      sourceCheckedAt: "2026-11-24",
    },
    term: "19 Oct 2026 until 17 Jan 2027",
    noteUrl: "https://www.rockstaracademy.com/schedules-and-locations/central-park-2",
    noteLabel: "Age key",
    note: "'3 - 5 Years' via the official web schedule key; upper boundary ambiguous. Grid: Mon 13:00, 15:00; Tue 14:00; Wed 15:00; Thu 15:00; Fri 11:00, 15:00; Sat 12:00; Sun 13:00 (50 min; branch schedule, read 24 Nov 2026). Confirm availability with the branch.",
  });
  add({
    name: "Pre-Ballet 3-5",
    category: "Dance",
    offering: "offered",
    age: {
      minMonths: 36,
      maxMonths: 60,
      level: "branch",
      verification: "provider-confirmed",
      providerAgeUrl: "https://www.rockstaracademy.com/lib/upload/files/club/CP_Schedule_Winter_2026_W5.pdf",
      sourceCheckedAt: "2026-11-24",
    },
    term: "19 Oct 2026 until 17 Jan 2027",
    noteUrl: "https://www.rockstaracademy.com/schedules-and-locations/central-park-2",
    noteLabel: "Age key",
    note: "'3 - 5 Years' via the official web schedule key ('Pre-Ballet 1/2'); upper boundary ambiguous. Grid: Wed 15:00; Sun 12:00 (50 min; branch schedule, read 24 Nov 2026). Confirm availability with the branch.",
  });
  add({
    name: "Smartology 3",
    category: "Preschool",
    offering: "offered",
    age: {
      minMonths: 36,
      maxMonths: 48,
      level: "branch",
      verification: "provider-confirmed",
      providerAgeUrl: "https://www.rockstaracademy.com/lib/upload/files/club/CP_Schedule_Winter_2026_W5.pdf",
      sourceCheckedAt: "2026-11-24",
    },
    term: "19 Oct 2026 until 17 Jan 2027",
    note: "'3-4 yrs' from the branch Winter term PDF class key; upper-bound inclusivity ambiguous; additional fee per the PDF footer. Grid: Mon 11:00; Tue 11:00; Wed 11:00; Fri 11:00 (50 min; branch schedule, read 24 Nov 2026). Confirm availability with the branch.",
  });
  add({
    name: "Smartology 4",
    category: "Preschool",
    offering: "offered",
    age: {
      minMonths: 48,
      maxMonths: 59,
      level: "branch",
      verification: "provider-confirmed",
      providerAgeUrl: "https://www.rockstaracademy.com/lib/upload/files/club/CP_Schedule_Winter_2026_W5.pdf",
      sourceCheckedAt: "2026-11-24",
    },
    term: "19 Oct 2026 until 17 Jan 2027",
    note: "4-5 yrs from the dated branch PDF class key (updated 16 Nov 2026); the undated web schedule key shows a wider '3 - 6 Years' label, the dated PDF wins. Additional fee per the PDF footer. Grid: Mon 12:00; Tue 12:00; Wed 12:00; Thu 12:00; Fri 12:00 (110/115 min; branch schedule, read 24 Nov 2026). Confirm availability with the branch.",
  });
  add({
    name: "Sports U3",
    category: "Multi-Sport",
    offering: "offered",
    age: {
      minMonths: 24,
      maxMonths: 36,
      level: "branch",
      verification: "provider-confirmed",
      providerAgeUrl: "https://www.rockstaracademy.com/lib/upload/files/club/CP_Schedule_Winter_2026_W5.pdf",
      sourceCheckedAt: "2026-11-24",
    },
    term: "19 Oct 2026 until 17 Jan 2027",
    noteUrl: "https://www.rockstaracademy.com/schedules-and-locations/central-park-2",
    noteLabel: "Age key",
    note: "'2 - 3 Years' via the official web schedule key. Grid: Tue 10:00; Wed 11:00; Thu 12:00; Fri 11:00; Sat 10:00 (50 min; branch schedule, read 24 Nov 2026). Confirm availability with the branch.",
  });
  add({
    name: "Sports U4/5",
    category: "Multi-Sport",
    offering: "offered",
    age: {
      minMonths: 36,
      maxMonths: 60,
      level: "branch",
      verification: "provider-confirmed",
      providerAgeUrl: "https://www.rockstaracademy.com/lib/upload/files/club/CP_Schedule_Winter_2026_W5.pdf",
      sourceCheckedAt: "2026-11-24",
    },
    term: "19 Oct 2026 until 17 Jan 2027",
    noteUrl: "https://www.rockstaracademy.com/schedules-and-locations/central-park-2",
    noteLabel: "Age key",
    note: "'3 - 5 Years' via the official web schedule key; upper boundary ambiguous. Grid: Mon 11:00; Tue 11:00, 14:00; Wed 13:00; Thu 14:00; Fri 14:00; Sat 11:00; Sun 11:00 (50 min; branch schedule, read 24 Nov 2026). Confirm availability with the branch.",
  });
  add({
    name: "Tots Gym U4",
    category: "Gym & Movement",
    offering: "offered",
    age: {
      minMonths: 36,
      maxMonths: 48,
      level: "branch",
      verification: "provider-confirmed",
      providerAgeUrl: "https://www.rockstaracademy.com/lib/upload/files/club/CP_Schedule_Winter_2026_W5.pdf",
      sourceCheckedAt: "2026-11-24",
    },
    term: "19 Oct 2026 until 17 Jan 2027",
    noteUrl: "https://www.rockstaracademy.com/schedules-and-locations/central-park-2",
    noteLabel: "Age key",
    note: "PDF cell label 'Tots Gym U4'; numeric age via the official web schedule key ('3 - 4 Years'). Grid: Mon 10:00, 14:00; Tue 13:00; Wed 11:00, 14:00; Thu 13:00; Fri 13:00; Sat 13:00; Sun 12:00 (50 min; branch schedule, read 24 Nov 2026). Confirm availability with the branch.",
  });
  add({
    name: "TouchTennis 3-6 yrs",
    category: "Multi-Sport",
    offering: "offered",
    age: {
      minMonths: 36,
      maxMonths: 71,
      level: "branch",
      verification: "provider-confirmed",
      providerAgeUrl: "https://www.rockstaracademy.com/lib/upload/files/club/CP_Schedule_Winter_2026_W5.pdf",
      sourceCheckedAt: "2026-11-24",
    },
    term: "19 Oct 2026 until 17 Jan 2027",
    noteUrl: "https://www.rockstaracademy.com/schedules-and-locations/central-park-2",
    noteLabel: "Age key",
    note: "'3 - 7 Years' via the official web schedule key; the class name says '3-6 yrs', the difference sits above the under-5 range. Confirm with the branch. Grid: Mon 14:00; Tue 15:00; Wed 14:00; Thu 15:00; Fri 16:00; Sat 13:00; Sun 14:00 (55 min; branch schedule, read 24 Nov 2026). Confirm availability with the branch.",
  });
  add({
    name: "Walker",
    category: "Gym & Movement",
    offering: "offered",
    age: {
      minMonths: 12,
      maxMonths: 23,
      level: "branch",
      verification: "provider-confirmed",
      providerAgeUrl: "https://www.rockstaracademy.com/lib/upload/files/club/CP_Schedule_Winter_2026_W5.pdf",
      sourceCheckedAt: "2026-11-24",
    },
    term: "19 Oct 2026 until 17 Jan 2027",
    note: "12-23 mo from the branch Winter term PDF class key. Grid: Mon 13:00; Tue 12:00; Wed 12:00; Thu 12:00; Fri 11:00; Sat 10:00; Sun 10:00 (50 min; branch schedule, read 24 Nov 2026). Confirm availability with the branch.",
  });
  }

  // ---- Gajah Mada Plaza ----
  {
  const v = venue(venues, "rockstar-academy-gajah-mada-plaza");
  v.lastCheckedAt = "2026-11-24";
  v.operatingStatus = { state: "official-listed", source: "https://www.rockstaracademy.com/schedules-and-locations/lippo-icon-gajah-mada-gajah-mada-plaza", checkedAt: "2026-11-24" };
  v.cardNote = "Term enrollment: 11-week terms (Winter: 19 Oct 2026 to 17 Jan 2027); registration required before class, no same-day signup; baby gymnastics up to 3 classes/week. Free trial class bookable on the official site (rockstaracademy.com/freetrial). Read 24 Nov 2026. / Kelas per term: 11 minggu per term (Winter: 19 Okt 2026 - 17 Jan 2027); wajib daftar sebelum kelas, tidak bisa daftar di hari yang sama; baby gym maksimal 3 kelas per minggu. Kelas trial gratis bisa dipesan di situs resmi. Dibaca 24 Nov 2026.";
  v.categories = ["Dance", "Gym & Movement", "Multi-Sport", "Preschool", "Swim"];
  const add = (p: VenueProgram) => {
    const i = v.programs.findIndex((x) => x.name === p.name || (p.name === "Baby Ballet" && x.name === "Baby (Ballet)"));
    if (i >= 0) v.programs[i] = { ...v.programs[i], ...p, name: v.programs[i].name, age: { ...v.programs[i].age, ...p.age } };
    else v.programs.push(p);
  };
  add({
    name: "Baby Ballet",
    category: "Dance",
    offering: "offered",
    age: {
      minMonths: 24,
      maxMonths: 36,
      level: "branch",
      verification: "provider-confirmed",
      providerAgeUrl: "https://www.rockstaracademy.com/lib/upload/files/club/GM_Schedule_Winter_2026_W5.pdf",
      sourceCheckedAt: "2026-11-24",
    },
    term: "19 Oct 2026 until 17 Jan 2027",
    noteUrl: "https://www.rockstaracademy.com/schedules-and-locations/lippo-icon-gajah-mada-gajah-mada-plaza",
    noteLabel: "Age key",
    note: "'2 - 3 Years' via the official web schedule key; year-boundary inclusivity ambiguous. Grid: Wed 13:00 (30 min; branch schedule, read 24 Nov 2026). Confirm availability with the branch.",
  });
  add({
    name: "Baby Dance",
    category: "Dance",
    offering: "offered",
    age: {
      minMonths: 12,
      maxMonths: 36,
      level: "branch",
      verification: "provider-confirmed",
      providerAgeUrl: "https://www.rockstaracademy.com/lib/upload/files/club/GM_Schedule_Winter_2026_W5.pdf",
      sourceCheckedAt: "2026-11-24",
    },
    term: "19 Oct 2026 until 17 Jan 2027",
    note: "'1-3 yrs' from the branch Winter term PDF class key; year-boundary inclusivity ambiguous. Grid: Mon 14:00; Tue 10:00, 11:00; Wed 11:00; Thu 10:00, 11:00; Fri 10:00, 11:00; Sat 10:00 (50 min; branch schedule, read 24 Nov 2026). Confirm availability with the branch.",
  });
  add({
    name: "Crawler",
    category: "Gym & Movement",
    offering: "offered",
    age: {
      minMonths: 6,
      maxMonths: 18,
      level: "branch",
      verification: "provider-confirmed",
      providerAgeUrl: "https://www.rockstaracademy.com/lib/upload/files/club/GM_Schedule_Winter_2026_W5.pdf",
      sourceCheckedAt: "2026-11-24",
    },
    term: "19 Oct 2026 until 17 Jan 2027",
    note: "6-18 mo from the branch Winter term PDF class key. Grid: Tue 10:00; Thu 10:00 (50 min; branch schedule, read 24 Nov 2026). Confirm availability with the branch.",
  });
  add({
    name: "Jumper",
    category: "Gym & Movement",
    offering: "offered",
    age: {
      minMonths: 24,
      maxMonths: 35,
      level: "branch",
      verification: "provider-confirmed",
      providerAgeUrl: "https://www.rockstaracademy.com/lib/upload/files/club/GM_Schedule_Winter_2026_W5.pdf",
      sourceCheckedAt: "2026-11-24",
    },
    term: "19 Oct 2026 until 17 Jan 2027",
    note: "24-35 mo from the branch Winter term PDF class key. Grid: Mon 15:00; Tue 11:00; Wed 11:00, 12:00; Thu 11:00; Fri 10:00; Sat 11:00 (50/55 min; branch schedule, read 24 Nov 2026). Confirm availability with the branch.",
  });
  add({
    name: "Learn & Play 1",
    category: "Preschool",
    offering: "offered",
    age: {
      minMonths: 6,
      maxMonths: 18,
      level: "branch",
      verification: "provider-confirmed",
      providerAgeUrl: "https://www.rockstaracademy.com/lib/upload/files/club/GM_Schedule_Winter_2026_W5.pdf",
      sourceCheckedAt: "2026-11-24",
    },
    term: "19 Oct 2026 until 17 Jan 2027",
    note: "6-18 mo from the branch Winter term PDF class key; Preschool & Kindergarten classes carry an additional fee per the PDF footer. Grid: Tue 09:00; Thu 09:00 (50 min; branch schedule, read 24 Nov 2026). Confirm availability with the branch.",
  });
  add({
    name: "Learn & Play 2",
    category: "Preschool",
    offering: "offered",
    age: {
      minMonths: 19,
      maxMonths: 35,
      level: "branch",
      verification: "provider-confirmed",
      providerAgeUrl: "https://www.rockstaracademy.com/lib/upload/files/club/GM_Schedule_Winter_2026_W5.pdf",
      sourceCheckedAt: "2026-11-24",
    },
    term: "19 Oct 2026 until 17 Jan 2027",
    note: "19-35 mo from the branch Winter term PDF class key; Preschool & Kindergarten classes carry an additional fee per the PDF footer. Grid: Mon 10:00; Tue 10:00; Wed 09:00, 10:00; Thu 10:00; Fri 11:00 (50 min; branch schedule, read 24 Nov 2026). Confirm availability with the branch.",
  });
  add({
    name: "Move & Groove",
    category: "Dance",
    offering: "offered",
    age: {
      minMonths: 36,
      maxMonths: 60,
      level: "branch",
      verification: "provider-confirmed",
      providerAgeUrl: "https://www.rockstaracademy.com/lib/upload/files/club/GM_Schedule_Winter_2026_W5.pdf",
      sourceCheckedAt: "2026-11-24",
    },
    term: "19 Oct 2026 until 17 Jan 2027",
    noteUrl: "https://www.rockstaracademy.com/schedules-and-locations/lippo-icon-gajah-mada-gajah-mada-plaza",
    noteLabel: "Age key",
    note: "'3 - 5 Years' via the official web schedule key; upper boundary ambiguous. Grid: Mon 15:00; Tue 14:00; Wed 13:00; Thu 13:00; Fri 15:00; Sat 14:00; Sun 15:00 (50 min; branch schedule, read 24 Nov 2026). Confirm availability with the branch.",
  });
  add({
    name: "Pre-Ballet 3-5",
    category: "Dance",
    offering: "offered",
    age: {
      minMonths: 36,
      maxMonths: 60,
      level: "branch",
      verification: "provider-confirmed",
      providerAgeUrl: "https://www.rockstaracademy.com/lib/upload/files/club/GM_Schedule_Winter_2026_W5.pdf",
      sourceCheckedAt: "2026-11-24",
    },
    term: "19 Oct 2026 until 17 Jan 2027",
    noteUrl: "https://www.rockstaracademy.com/schedules-and-locations/lippo-icon-gajah-mada-gajah-mada-plaza",
    noteLabel: "Age key",
    note: "'3 - 5 Years' via the official web schedule key ('Pre-Ballet 1/2'); upper boundary ambiguous. Grid: Wed 14:00; Sat 12:00 (50 min; branch schedule, read 24 Nov 2026). Confirm availability with the branch.",
  });
  add({
    name: "Smartology 3",
    category: "Preschool",
    offering: "offered",
    age: {
      minMonths: 36,
      maxMonths: 48,
      level: "branch",
      verification: "provider-confirmed",
      providerAgeUrl: "https://www.rockstaracademy.com/lib/upload/files/club/GM_Schedule_Winter_2026_W5.pdf",
      sourceCheckedAt: "2026-11-24",
    },
    term: "19 Oct 2026 until 17 Jan 2027",
    note: "'3-4 yrs' from the branch Winter term PDF class key; upper-bound inclusivity ambiguous; additional fee per the PDF footer. Grid: Mon 11:00; Tue 11:00; Wed 11:00; Fri 11:00 (50 min; branch schedule, read 24 Nov 2026). Confirm availability with the branch.",
  });
  add({
    name: "Smartology 4",
    category: "Preschool",
    offering: "offered",
    age: {
      minMonths: 48,
      maxMonths: 59,
      level: "branch",
      verification: "provider-confirmed",
      providerAgeUrl: "https://www.rockstaracademy.com/lib/upload/files/club/GM_Schedule_Winter_2026_W5.pdf",
      sourceCheckedAt: "2026-11-24",
    },
    term: "19 Oct 2026 until 17 Jan 2027",
    note: "4-5 yrs from the dated branch PDF class key (updated 16 Nov 2026); the undated web schedule key shows a wider '3 - 6 Years' label, the dated PDF wins. Additional fee per the PDF footer. Grid: Mon 12:00; Tue 12:00; Wed 12:00; Thu 12:00; Fri 12:00 (115 min; branch schedule, read 24 Nov 2026). Confirm availability with the branch.",
  });
  add({
    name: "Sports U3",
    category: "Multi-Sport",
    offering: "offered",
    age: {
      minMonths: 24,
      maxMonths: 36,
      level: "branch",
      verification: "provider-confirmed",
      providerAgeUrl: "https://www.rockstaracademy.com/lib/upload/files/club/GM_Schedule_Winter_2026_W5.pdf",
      sourceCheckedAt: "2026-11-24",
    },
    term: "19 Oct 2026 until 17 Jan 2027",
    noteUrl: "https://www.rockstaracademy.com/schedules-and-locations/lippo-icon-gajah-mada-gajah-mada-plaza",
    noteLabel: "Age key",
    note: "'2 - 3 Years' via the official web schedule key. Grid: Mon 13:00; Tue 12:00; Wed 10:00; Thu 12:00; Fri 12:00; Sat 12:00 (50 min; branch schedule, read 24 Nov 2026). Confirm availability with the branch.",
  });
  add({
    name: "Sports U4/5",
    category: "Multi-Sport",
    offering: "offered",
    age: {
      minMonths: 36,
      maxMonths: 60,
      level: "branch",
      verification: "provider-confirmed",
      providerAgeUrl: "https://www.rockstaracademy.com/lib/upload/files/club/GM_Schedule_Winter_2026_W5.pdf",
      sourceCheckedAt: "2026-11-24",
    },
    term: "19 Oct 2026 until 17 Jan 2027",
    noteUrl: "https://www.rockstaracademy.com/schedules-and-locations/lippo-icon-gajah-mada-gajah-mada-plaza",
    noteLabel: "Age key",
    note: "'3 - 5 Years' via the official web schedule key; upper boundary ambiguous. Grid: Tue 15:00; Wed 12:00; Thu 14:00; Fri 13:00 (50 min; branch schedule, read 24 Nov 2026). Confirm availability with the branch.",
  });
  add({
    name: "Tots Gym U4",
    category: "Gym & Movement",
    offering: "offered",
    age: {
      minMonths: 36,
      maxMonths: 48,
      level: "branch",
      verification: "provider-confirmed",
      providerAgeUrl: "https://www.rockstaracademy.com/lib/upload/files/club/GM_Schedule_Winter_2026_W5.pdf",
      sourceCheckedAt: "2026-11-24",
    },
    term: "19 Oct 2026 until 17 Jan 2027",
    noteUrl: "https://www.rockstaracademy.com/schedules-and-locations/lippo-icon-gajah-mada-gajah-mada-plaza",
    noteLabel: "Age key",
    note: "PDF cell label 'Tots Gym U4'; numeric age via the official web schedule key ('3 - 4 Years'). Grid: Mon 14:00; Tue 13:00; Wed 15:00; Thu 15:00; Fri 14:00; Sat 13:00; Sun 14:00 (50 min; branch schedule, read 24 Nov 2026). Confirm availability with the branch.",
  });
  add({
    name: "TouchTennis 3-6 yrs",
    category: "Multi-Sport",
    offering: "offered",
    age: {
      minMonths: 36,
      maxMonths: 71,
      level: "branch",
      verification: "provider-confirmed",
      providerAgeUrl: "https://www.rockstaracademy.com/lib/upload/files/club/GM_Schedule_Winter_2026_W5.pdf",
      sourceCheckedAt: "2026-11-24",
    },
    term: "19 Oct 2026 until 17 Jan 2027",
    noteUrl: "https://www.rockstaracademy.com/schedules-and-locations/lippo-icon-gajah-mada-gajah-mada-plaza",
    noteLabel: "Age key",
    note: "'3 - 7 Years' via the official web schedule key; the class name says '3-6 yrs', the difference sits above the under-5 range. Confirm with the branch. Grid: Mon 13:00; Tue 13:00, 15:00; Wed 14:00; Thu 14:00; Fri 14:00; Sat 13:00; Sun 13:00 (55 min; branch schedule, read 24 Nov 2026). Confirm availability with the branch.",
  });
  add({
    name: "Walker",
    category: "Gym & Movement",
    offering: "offered",
    age: {
      minMonths: 12,
      maxMonths: 23,
      level: "branch",
      verification: "provider-confirmed",
      providerAgeUrl: "https://www.rockstaracademy.com/lib/upload/files/club/GM_Schedule_Winter_2026_W5.pdf",
      sourceCheckedAt: "2026-11-24",
    },
    term: "19 Oct 2026 until 17 Jan 2027",
    note: "12-23 mo from the branch Winter term PDF class key. Grid: Mon 13:00; Tue 12:00; Wed 10:00; Thu 12:00; Fri 11:00; Sat 12:00 (50 min; branch schedule, read 24 Nov 2026). Confirm availability with the branch.",
  });
  }

  // ---- Gandaria City ----
  {
  const v = venue(venues, "rockstar-academy-gandaria-city");
  v.lastCheckedAt = "2026-11-24";
  v.operatingStatus = { state: "official-listed", source: "https://www.rockstaracademy.com/schedules-and-locations/gandaria-city", checkedAt: "2026-11-24" };
  v.cardNote = "Term enrollment: 11-week terms (Winter: 19 Oct 2026 to 17 Jan 2027); registration required before class, no same-day signup; baby gymnastics up to 3 classes/week. Free trial class bookable on the official site (rockstaracademy.com/freetrial). Read 24 Nov 2026. / Kelas per term: 11 minggu per term (Winter: 19 Okt 2026 - 17 Jan 2027); wajib daftar sebelum kelas, tidak bisa daftar di hari yang sama; baby gym maksimal 3 kelas per minggu. Kelas trial gratis bisa dipesan di situs resmi. Dibaca 24 Nov 2026.";
  v.categories = ["Dance", "Gym & Movement", "Multi-Sport", "Preschool", "Swim"];
  const add = (p: VenueProgram) => {
    const i = v.programs.findIndex((x) => x.name === p.name || (p.name === "Baby Ballet" && x.name === "Baby (Ballet)"));
    if (i >= 0) v.programs[i] = { ...v.programs[i], ...p, name: v.programs[i].name, age: { ...v.programs[i].age, ...p.age } };
    else v.programs.push(p);
  };
  add({
    name: "Baby Ballet",
    category: "Dance",
    offering: "offered",
    age: {
      minMonths: 24,
      maxMonths: 36,
      level: "branch",
      verification: "provider-confirmed",
      providerAgeUrl: "https://www.rockstaracademy.com/lib/upload/files/club/GC_Schedule_Winter_2026_W5.pdf",
      sourceCheckedAt: "2026-11-24",
    },
    term: "19 Oct 2026 until 17 Jan 2027",
    noteUrl: "https://www.rockstaracademy.com/schedules-and-locations/gandaria-city",
    noteLabel: "Age key",
    note: "'2 - 3 Years' via the official web schedule key; year-boundary inclusivity ambiguous. Grid: Tue 13:00; Thu 12:00; Sat 12:00 (30 min; branch schedule, read 24 Nov 2026). Confirm availability with the branch.",
  });
  add({
    name: "Baby Dance",
    category: "Dance",
    offering: "offered",
    age: {
      minMonths: 12,
      maxMonths: 36,
      level: "branch",
      verification: "provider-confirmed",
      providerAgeUrl: "https://www.rockstaracademy.com/lib/upload/files/club/GC_Schedule_Winter_2026_W5.pdf",
      sourceCheckedAt: "2026-11-24",
    },
    term: "19 Oct 2026 until 17 Jan 2027",
    note: "'1-3 yrs' from the branch Winter term PDF class key; year-boundary inclusivity ambiguous. Grid: Mon 13:00; Tue 11:00, 12:00; Wed 11:00, 12:00; Thu 11:00; Fri 10:00, 11:00; Sat 11:00; Sun 11:00 (50 min; branch schedule, read 24 Nov 2026). Confirm availability with the branch.",
  });
  add({
    name: "Baby Jam",
    category: "Gym & Movement",
    offering: "offered",
    age: {
      minMonths: 6,
      maxMonths: 18,
      level: "branch",
      verification: "provider-confirmed",
      providerAgeUrl: "https://www.rockstaracademy.com/lib/upload/files/club/GC_Schedule_Winter_2026_W5.pdf",
      sourceCheckedAt: "2026-11-24",
    },
    term: "19 Oct 2026 until 17 Jan 2027",
    note: "6-18 mo from the branch Winter term PDF class key. Grid: Sun 10:30 (25 min; branch schedule, read 24 Nov 2026). Confirm availability with the branch.",
  });
  add({
    name: "Crawler",
    category: "Gym & Movement",
    offering: "offered",
    age: {
      minMonths: 6,
      maxMonths: 18,
      level: "branch",
      verification: "provider-confirmed",
      providerAgeUrl: "https://www.rockstaracademy.com/lib/upload/files/club/GC_Schedule_Winter_2026_W5.pdf",
      sourceCheckedAt: "2026-11-24",
    },
    term: "19 Oct 2026 until 17 Jan 2027",
    note: "6-18 mo from the branch Winter term PDF class key. Grid: Thu 10:00; Fri 10:00; Sun 11:00 (50 min; branch schedule, read 24 Nov 2026). Confirm availability with the branch.",
  });
  add({
    name: "Jumper",
    category: "Gym & Movement",
    offering: "offered",
    age: {
      minMonths: 24,
      maxMonths: 35,
      level: "branch",
      verification: "provider-confirmed",
      providerAgeUrl: "https://www.rockstaracademy.com/lib/upload/files/club/GC_Schedule_Winter_2026_W5.pdf",
      sourceCheckedAt: "2026-11-24",
    },
    term: "19 Oct 2026 until 17 Jan 2027",
    note: "24-35 mo from the branch Winter term PDF class key. Grid: Mon 14:00; Tue 11:00; Wed 10:00, 11:00; Thu 11:00, 14:00; Fri 11:00; Sat 10:00; Sun 12:00 (50 min; branch schedule, read 24 Nov 2026). Confirm availability with the branch.",
  });
  add({
    name: "Learn & Play 1",
    category: "Preschool",
    offering: "offered",
    age: {
      minMonths: 6,
      maxMonths: 18,
      level: "branch",
      verification: "provider-confirmed",
      providerAgeUrl: "https://www.rockstaracademy.com/lib/upload/files/club/GC_Schedule_Winter_2026_W5.pdf",
      sourceCheckedAt: "2026-11-24",
    },
    term: "19 Oct 2026 until 17 Jan 2027",
    note: "6-18 mo from the branch Winter term PDF class key; Preschool & Kindergarten classes carry an additional fee per the PDF footer. Grid: Tue 09:00; Thu 09:00 (50 min; branch schedule, read 24 Nov 2026). Confirm availability with the branch.",
  });
  add({
    name: "Learn & Play 2",
    category: "Preschool",
    offering: "offered",
    age: {
      minMonths: 19,
      maxMonths: 35,
      level: "branch",
      verification: "provider-confirmed",
      providerAgeUrl: "https://www.rockstaracademy.com/lib/upload/files/club/GC_Schedule_Winter_2026_W5.pdf",
      sourceCheckedAt: "2026-11-24",
    },
    term: "19 Oct 2026 until 17 Jan 2027",
    note: "19-35 mo from the branch Winter term PDF class key; Preschool & Kindergarten classes carry an additional fee per the PDF footer. Grid: Mon 09:00; Tue 10:00; Wed 09:00, 10:00; Thu 10:00; Fri 09:00 (50 min; branch schedule, read 24 Nov 2026). Confirm availability with the branch.",
  });
  add({
    name: "Move & Groove",
    category: "Dance",
    offering: "offered",
    age: {
      minMonths: 36,
      maxMonths: 60,
      level: "branch",
      verification: "provider-confirmed",
      providerAgeUrl: "https://www.rockstaracademy.com/lib/upload/files/club/GC_Schedule_Winter_2026_W5.pdf",
      sourceCheckedAt: "2026-11-24",
    },
    term: "19 Oct 2026 until 17 Jan 2027",
    noteUrl: "https://www.rockstaracademy.com/schedules-and-locations/gandaria-city",
    noteLabel: "Age key",
    note: "'3 - 5 Years' via the official web schedule key; upper boundary ambiguous. Grid: Mon 14:00; Tue 13:00; Wed 14:00; Thu 14:00; Fri 15:00; Sat 12:00; Sun 15:00 (50 min; branch schedule, read 24 Nov 2026). Confirm availability with the branch.",
  });
  add({
    name: "Pre-Ballet 3-5",
    category: "Dance",
    offering: "offered",
    age: {
      minMonths: 36,
      maxMonths: 60,
      level: "branch",
      verification: "provider-confirmed",
      providerAgeUrl: "https://www.rockstaracademy.com/lib/upload/files/club/GC_Schedule_Winter_2026_W5.pdf",
      sourceCheckedAt: "2026-11-24",
    },
    term: "19 Oct 2026 until 17 Jan 2027",
    noteUrl: "https://www.rockstaracademy.com/schedules-and-locations/gandaria-city",
    noteLabel: "Age key",
    note: "'3 - 5 Years' via the official web schedule key ('Pre-Ballet 1/2'); upper boundary ambiguous. Grid: Mon 15:00; Tue 14:00; Wed 15:00; Fri 14:00 (50 min; branch schedule, read 24 Nov 2026). Confirm availability with the branch.",
  });
  add({
    name: "Smartology 3",
    category: "Preschool",
    offering: "offered",
    age: {
      minMonths: 36,
      maxMonths: 48,
      level: "branch",
      verification: "provider-confirmed",
      providerAgeUrl: "https://www.rockstaracademy.com/lib/upload/files/club/GC_Schedule_Winter_2026_W5.pdf",
      sourceCheckedAt: "2026-11-24",
    },
    term: "19 Oct 2026 until 17 Jan 2027",
    note: "'3-4 yrs' from the branch Winter term PDF class key; upper-bound inclusivity ambiguous; additional fee per the PDF footer. Grid: Mon 10:00, 11:00; Tue 10:00, 11:00; Wed 11:00; Thu 10:00; Fri 10:00, 11:00 (50 min; branch schedule, read 24 Nov 2026). Confirm availability with the branch.",
  });
  add({
    name: "Smartology 4",
    category: "Preschool",
    offering: "offered",
    age: {
      minMonths: 48,
      maxMonths: 59,
      level: "branch",
      verification: "provider-confirmed",
      providerAgeUrl: "https://www.rockstaracademy.com/lib/upload/files/club/GC_Schedule_Winter_2026_W5.pdf",
      sourceCheckedAt: "2026-11-24",
    },
    term: "19 Oct 2026 until 17 Jan 2027",
    note: "4-5 yrs from the dated branch PDF class key (updated 16 Nov 2026); the undated web schedule key shows a wider '3 - 6 Years' label, the dated PDF wins. Additional fee per the PDF footer. Grid: Mon 12:00; Tue 12:00; Wed 12:00; Thu 12:00; Fri 12:00 (115 min; branch schedule, read 24 Nov 2026). Confirm availability with the branch.",
  });
  add({
    name: "Sports U3",
    category: "Multi-Sport",
    offering: "offered",
    age: {
      minMonths: 24,
      maxMonths: 36,
      level: "branch",
      verification: "provider-confirmed",
      providerAgeUrl: "https://www.rockstaracademy.com/lib/upload/files/club/GC_Schedule_Winter_2026_W5.pdf",
      sourceCheckedAt: "2026-11-24",
    },
    term: "19 Oct 2026 until 17 Jan 2027",
    noteUrl: "https://www.rockstaracademy.com/schedules-and-locations/gandaria-city",
    noteLabel: "Age key",
    note: "'2 - 3 Years' via the official web schedule key. Grid: Mon 10:00; Tue 12:00; Wed 11:00; Thu 13:00; Fri 12:00; Sat 11:00 (50 min; branch schedule, read 24 Nov 2026). Confirm availability with the branch.",
  });
  add({
    name: "Sports U4/5",
    category: "Multi-Sport",
    offering: "offered",
    age: {
      minMonths: 36,
      maxMonths: 60,
      level: "branch",
      verification: "provider-confirmed",
      providerAgeUrl: "https://www.rockstaracademy.com/lib/upload/files/club/GC_Schedule_Winter_2026_W5.pdf",
      sourceCheckedAt: "2026-11-24",
    },
    term: "19 Oct 2026 until 17 Jan 2027",
    noteUrl: "https://www.rockstaracademy.com/schedules-and-locations/gandaria-city",
    noteLabel: "Age key",
    note: "'3 - 5 Years' via the official web schedule key; upper boundary ambiguous. Grid: Mon 11:00, 12:00, 13:00; Tue 11:00, 15:00; Wed 12:00, 13:00; Thu 11:00, 13:00; Fri 11:00, 14:00; Sat 13:00 (50 min; branch schedule, read 24 Nov 2026). Confirm availability with the branch.",
  });
  add({
    name: "Tots Gym U4",
    category: "Gym & Movement",
    offering: "offered",
    age: {
      minMonths: 36,
      maxMonths: 48,
      level: "branch",
      verification: "provider-confirmed",
      providerAgeUrl: "https://www.rockstaracademy.com/lib/upload/files/club/GC_Schedule_Winter_2026_W5.pdf",
      sourceCheckedAt: "2026-11-24",
    },
    term: "19 Oct 2026 until 17 Jan 2027",
    noteUrl: "https://www.rockstaracademy.com/schedules-and-locations/gandaria-city",
    noteLabel: "Age key",
    note: "PDF cell label 'Tots Gym U4'; numeric age via the official web schedule key ('3 - 4 Years'). Grid: Mon 12:00, 15:00; Tue 12:00; Wed 15:00; Thu 15:00; Fri 13:00; Sat 11:00; Sun 14:00 (50 min; branch schedule, read 24 Nov 2026). Confirm availability with the branch.",
  });
  add({
    name: "Walker",
    category: "Gym & Movement",
    offering: "offered",
    age: {
      minMonths: 12,
      maxMonths: 23,
      level: "branch",
      verification: "provider-confirmed",
      providerAgeUrl: "https://www.rockstaracademy.com/lib/upload/files/club/GC_Schedule_Winter_2026_W5.pdf",
      sourceCheckedAt: "2026-11-24",
    },
    term: "19 Oct 2026 until 17 Jan 2027",
    note: "12-23 mo from the branch Winter term PDF class key. Grid: Mon 13:00; Tue 10:00; Wed 12:00; Thu 12:00; Fri 12:00; Sat 12:00; Sun 10:00 (50 min; branch schedule, read 24 Nov 2026). Confirm availability with the branch.",
  });
  }

  // ---- Grand Metropolitan Bekasi ----
  {
  const v = venue(venues, "rockstar-academy-grand-metropolitan-bekasi");
  v.lastCheckedAt = "2026-11-24";
  v.operatingStatus = { state: "official-listed", source: "https://www.rockstaracademy.com/schedules-and-locations/grand-metropolitan-mall", checkedAt: "2026-11-24" };
  v.cardNote = "Term enrollment: 11-week terms (Winter: 19 Oct 2026 to 17 Jan 2027); registration required before class, no same-day signup; baby gymnastics up to 3 classes/week. Free trial class bookable on the official site (rockstaracademy.com/freetrial). Read 24 Nov 2026. / Kelas per term: 11 minggu per term (Winter: 19 Okt 2026 - 17 Jan 2027); wajib daftar sebelum kelas, tidak bisa daftar di hari yang sama; baby gym maksimal 3 kelas per minggu. Kelas trial gratis bisa dipesan di situs resmi. Dibaca 24 Nov 2026.";
  v.categories = ["Dance", "Gym & Movement", "Multi-Sport", "Preschool", "Swim"];
  const add = (p: VenueProgram) => {
    const i = v.programs.findIndex((x) => x.name === p.name || (p.name === "Baby Ballet" && x.name === "Baby (Ballet)"));
    if (i >= 0) v.programs[i] = { ...v.programs[i], ...p, name: v.programs[i].name, age: { ...v.programs[i].age, ...p.age } };
    else v.programs.push(p);
  };
  add({
    name: "Baby Ballet",
    category: "Dance",
    offering: "offered",
    age: {
      minMonths: 24,
      maxMonths: 36,
      level: "branch",
      verification: "provider-confirmed",
      providerAgeUrl: "https://www.rockstaracademy.com/lib/upload/files/club/GB_Schedule_Winter_2026_W5.pdf",
      sourceCheckedAt: "2026-11-24",
    },
    term: "19 Oct 2026 until 17 Jan 2027",
    noteUrl: "https://www.rockstaracademy.com/schedules-and-locations/grand-metropolitan-mall",
    noteLabel: "Age key",
    note: "'2 - 3 Years' via the official web schedule key; year-boundary inclusivity ambiguous. Grid: Thu 12:00; Sat 12:00 (30 min; branch schedule, read 24 Nov 2026). Confirm availability with the branch.",
  });
  add({
    name: "Baby Dance",
    category: "Dance",
    offering: "offered",
    age: {
      minMonths: 12,
      maxMonths: 36,
      level: "branch",
      verification: "provider-confirmed",
      providerAgeUrl: "https://www.rockstaracademy.com/lib/upload/files/club/GB_Schedule_Winter_2026_W5.pdf",
      sourceCheckedAt: "2026-11-24",
    },
    term: "19 Oct 2026 until 17 Jan 2027",
    note: "'1-3 yrs' from the branch Winter term PDF class key; year-boundary inclusivity ambiguous. Grid: Mon 12:00; Tue 11:00; Wed 11:00, 12:00; Thu 12:00; Fri 11:00; Sat 11:00; Sun 11:00 (50 min; branch schedule, read 24 Nov 2026). Confirm availability with the branch.",
  });
  add({
    name: "Crawler",
    category: "Gym & Movement",
    offering: "offered",
    age: {
      minMonths: 6,
      maxMonths: 18,
      level: "branch",
      verification: "provider-confirmed",
      providerAgeUrl: "https://www.rockstaracademy.com/lib/upload/files/club/GB_Schedule_Winter_2026_W5.pdf",
      sourceCheckedAt: "2026-11-24",
    },
    term: "19 Oct 2026 until 17 Jan 2027",
    note: "6-18 mo from the branch Winter term PDF class key. Grid: Tue 10:00; Thu 11:00; Sun 11:00 (50 min; branch schedule, read 24 Nov 2026). Confirm availability with the branch.",
  });
  add({
    name: "Jumper",
    category: "Gym & Movement",
    offering: "offered",
    age: {
      minMonths: 24,
      maxMonths: 35,
      level: "branch",
      verification: "provider-confirmed",
      providerAgeUrl: "https://www.rockstaracademy.com/lib/upload/files/club/GB_Schedule_Winter_2026_W5.pdf",
      sourceCheckedAt: "2026-11-24",
    },
    term: "19 Oct 2026 until 17 Jan 2027",
    note: "24-35 mo from the branch Winter term PDF class key. Grid: Mon 13:00; Tue 12:00, 13:00; Wed 11:00; Thu 12:00, 13:00; Fri 11:00; Sat 11:00, 12:00; Sun 13:00 (50 min; branch schedule, read 24 Nov 2026). Confirm availability with the branch.",
  });
  add({
    name: "Learn & Play 1",
    category: "Preschool",
    offering: "offered",
    age: {
      minMonths: 6,
      maxMonths: 18,
      level: "branch",
      verification: "provider-confirmed",
      providerAgeUrl: "https://www.rockstaracademy.com/lib/upload/files/club/GB_Schedule_Winter_2026_W5.pdf",
      sourceCheckedAt: "2026-11-24",
    },
    term: "19 Oct 2026 until 17 Jan 2027",
    note: "6-18 mo from the branch Winter term PDF class key; Preschool & Kindergarten classes carry an additional fee per the PDF footer. Grid: Tue 09:00; Wed 09:00; Thu 09:00; Fri 09:00 (50 min; branch schedule, read 24 Nov 2026). Confirm availability with the branch.",
  });
  add({
    name: "Learn & Play 2",
    category: "Preschool",
    offering: "offered",
    age: {
      minMonths: 19,
      maxMonths: 35,
      level: "branch",
      verification: "provider-confirmed",
      providerAgeUrl: "https://www.rockstaracademy.com/lib/upload/files/club/GB_Schedule_Winter_2026_W5.pdf",
      sourceCheckedAt: "2026-11-24",
    },
    term: "19 Oct 2026 until 17 Jan 2027",
    note: "19-35 mo from the branch Winter term PDF class key; Preschool & Kindergarten classes carry an additional fee per the PDF footer. Grid: Tue 10:00, 12:00; Wed 10:00, 12:00; Thu 10:00, 11:00 (50 min; branch schedule, read 24 Nov 2026). Confirm availability with the branch.",
  });
  add({
    name: "Move & Groove",
    category: "Dance",
    offering: "offered",
    age: {
      minMonths: 36,
      maxMonths: 60,
      level: "branch",
      verification: "provider-confirmed",
      providerAgeUrl: "https://www.rockstaracademy.com/lib/upload/files/club/GB_Schedule_Winter_2026_W5.pdf",
      sourceCheckedAt: "2026-11-24",
    },
    term: "19 Oct 2026 until 17 Jan 2027",
    noteUrl: "https://www.rockstaracademy.com/schedules-and-locations/grand-metropolitan-mall",
    noteLabel: "Age key",
    note: "'3 - 5 Years' via the official web schedule key; upper boundary ambiguous. Grid: Mon 13:00; Tue 15:00; Wed 15:00; Thu 13:00, 15:00; Fri 10:00, 15:00; Sat 12:00; Sun 13:00 (50 min; branch schedule, read 24 Nov 2026). Confirm availability with the branch.",
  });
  add({
    name: "Pre-Ballet 3-5",
    category: "Dance",
    offering: "offered",
    age: {
      minMonths: 36,
      maxMonths: 60,
      level: "branch",
      verification: "provider-confirmed",
      providerAgeUrl: "https://www.rockstaracademy.com/lib/upload/files/club/GB_Schedule_Winter_2026_W5.pdf",
      sourceCheckedAt: "2026-11-24",
    },
    term: "19 Oct 2026 until 17 Jan 2027",
    noteUrl: "https://www.rockstaracademy.com/schedules-and-locations/grand-metropolitan-mall",
    noteLabel: "Age key",
    note: "'3 - 5 Years' via the official web schedule key ('Pre-Ballet 1/2'); upper boundary ambiguous. Grid: Mon 14:00; Tue 14:00; Thu 14:00 (50 min; branch schedule, read 24 Nov 2026). Confirm availability with the branch.",
  });
  add({
    name: "Smartology 3",
    category: "Preschool",
    offering: "offered",
    age: {
      minMonths: 36,
      maxMonths: 48,
      level: "branch",
      verification: "provider-confirmed",
      providerAgeUrl: "https://www.rockstaracademy.com/lib/upload/files/club/GB_Schedule_Winter_2026_W5.pdf",
      sourceCheckedAt: "2026-11-24",
    },
    term: "19 Oct 2026 until 17 Jan 2027",
    note: "'3-4 yrs' from the branch Winter term PDF class key; upper-bound inclusivity ambiguous; additional fee per the PDF footer. Grid: Mon 11:00, 14:00; Tue 11:00, 14:00; Wed 11:00, 14:00; Fri 11:00, 14:00 (50 min; branch schedule, read 24 Nov 2026). Confirm availability with the branch.",
  });
  add({
    name: "Smartology 4",
    category: "Preschool",
    offering: "offered",
    age: {
      minMonths: 48,
      maxMonths: 59,
      level: "branch",
      verification: "provider-confirmed",
      providerAgeUrl: "https://www.rockstaracademy.com/lib/upload/files/club/GB_Schedule_Winter_2026_W5.pdf",
      sourceCheckedAt: "2026-11-24",
    },
    term: "19 Oct 2026 until 17 Jan 2027",
    note: "4-5 yrs from the dated branch PDF class key (updated 16 Nov 2026); the undated web schedule key shows a wider '3 - 6 Years' label, the dated PDF wins. Additional fee per the PDF footer. Grid: Mon 12:00; Tue 12:00; Wed 12:00; Thu 12:00; Fri 12:00 (115 min; branch schedule, read 24 Nov 2026). Confirm availability with the branch.",
  });
  add({
    name: "Sports U3",
    category: "Multi-Sport",
    offering: "offered",
    age: {
      minMonths: 24,
      maxMonths: 36,
      level: "branch",
      verification: "provider-confirmed",
      providerAgeUrl: "https://www.rockstaracademy.com/lib/upload/files/club/GB_Schedule_Winter_2026_W5.pdf",
      sourceCheckedAt: "2026-11-24",
    },
    term: "19 Oct 2026 until 17 Jan 2027",
    noteUrl: "https://www.rockstaracademy.com/schedules-and-locations/grand-metropolitan-mall",
    noteLabel: "Age key",
    note: "'2 - 3 Years' via the official web schedule key. Grid: Mon 12:00; Tue 11:00, 13:00; Wed 13:00; Thu 13:00; Fri 10:00; Sat 10:00; Sun 12:00 (50 min; branch schedule, read 24 Nov 2026). Confirm availability with the branch.",
  });
  add({
    name: "Sports U4/5",
    category: "Multi-Sport",
    offering: "offered",
    age: {
      minMonths: 36,
      maxMonths: 60,
      level: "branch",
      verification: "provider-confirmed",
      providerAgeUrl: "https://www.rockstaracademy.com/lib/upload/files/club/GB_Schedule_Winter_2026_W5.pdf",
      sourceCheckedAt: "2026-11-24",
    },
    term: "19 Oct 2026 until 17 Jan 2027",
    noteUrl: "https://www.rockstaracademy.com/schedules-and-locations/grand-metropolitan-mall",
    noteLabel: "Age key",
    note: "'3 - 5 Years' via the official web schedule key; upper boundary ambiguous. Grid: Mon 10:00, 16:00; Tue 10:00, 14:00; Wed 10:00, 14:00; Thu 14:00; Fri 13:00; Sat 11:00 (50 min; branch schedule, read 24 Nov 2026). Confirm availability with the branch.",
  });
  add({
    name: "Tots Gym U4",
    category: "Gym & Movement",
    offering: "offered",
    age: {
      minMonths: 36,
      maxMonths: 48,
      level: "branch",
      verification: "provider-confirmed",
      providerAgeUrl: "https://www.rockstaracademy.com/lib/upload/files/club/GB_Schedule_Winter_2026_W5.pdf",
      sourceCheckedAt: "2026-11-24",
    },
    term: "19 Oct 2026 until 17 Jan 2027",
    noteUrl: "https://www.rockstaracademy.com/schedules-and-locations/grand-metropolitan-mall",
    noteLabel: "Age key",
    note: "PDF cell label 'Tots Gym U4'; numeric age via the official web schedule key ('3 - 4 Years'). Grid: Mon 11:00, 15:00; Tue 14:00; Wed 14:00; Thu 15:00; Fri 13:00; Sat 13:00; Sun 12:00 (50 min; branch schedule, read 24 Nov 2026). Confirm availability with the branch.",
  });
  add({
    name: "Walker",
    category: "Gym & Movement",
    offering: "offered",
    age: {
      minMonths: 12,
      maxMonths: 23,
      level: "branch",
      verification: "provider-confirmed",
      providerAgeUrl: "https://www.rockstaracademy.com/lib/upload/files/club/GB_Schedule_Winter_2026_W5.pdf",
      sourceCheckedAt: "2026-11-24",
    },
    term: "19 Oct 2026 until 17 Jan 2027",
    note: "12-23 mo from the branch Winter term PDF class key. Grid: Mon 14:00; Tue 11:00; Wed 10:00; Thu 10:00; Fri 10:00; Sat 10:00; Sun 10:00 (50 min; branch schedule, read 24 Nov 2026). Confirm availability with the branch.",
  });
  }

  // ---- Hampton Square ----
  {
  const v = venue(venues, "rockstar-academy-hampton-square");
  v.lastCheckedAt = "2026-11-24";
  v.operatingStatus = { state: "official-listed", source: "https://www.rockstaracademy.com/schedules-and-locations/hampton-square", checkedAt: "2026-11-24" };
  v.cardNote = "Term enrollment: 11-week terms (Winter: 19 Oct 2026 to 17 Jan 2027); registration required before class, no same-day signup; baby gymnastics up to 3 classes/week. Free trial class bookable on the official site (rockstaracademy.com/freetrial). Read 24 Nov 2026. / Kelas per term: 11 minggu per term (Winter: 19 Okt 2026 - 17 Jan 2027); wajib daftar sebelum kelas, tidak bisa daftar di hari yang sama; baby gym maksimal 3 kelas per minggu. Kelas trial gratis bisa dipesan di situs resmi. Dibaca 24 Nov 2026.";
  v.categories = ["Dance", "Gym & Movement", "Multi-Sport", "Preschool", "Swim"];
  const add = (p: VenueProgram) => {
    const i = v.programs.findIndex((x) => x.name === p.name || (p.name === "Baby Ballet" && x.name === "Baby (Ballet)"));
    if (i >= 0) v.programs[i] = { ...v.programs[i], ...p, name: v.programs[i].name, age: { ...v.programs[i].age, ...p.age } };
    else v.programs.push(p);
  };
  add({
    name: "Baby Ballet",
    category: "Dance",
    offering: "offered",
    age: {
      minMonths: 24,
      maxMonths: 36,
      level: "branch",
      verification: "provider-confirmed",
      providerAgeUrl: "https://www.rockstaracademy.com/lib/upload/files/club/HS_Schedule_Winter_2026%C2%A0W5.pdf",
      sourceCheckedAt: "2026-11-24",
    },
    term: "19 Oct 2026 until 17 Jan 2027",
    noteUrl: "https://www.rockstaracademy.com/schedules-and-locations/hampton-square",
    noteLabel: "Age key",
    note: "'2 - 3 Years' via the official web schedule key; year-boundary inclusivity ambiguous. Grid: Thu 13:00; Sun 13:00 (30 min; branch schedule, read 24 Nov 2026). Confirm availability with the branch.",
  });
  add({
    name: "Baby Dance",
    category: "Dance",
    offering: "offered",
    age: {
      minMonths: 12,
      maxMonths: 36,
      level: "branch",
      verification: "provider-confirmed",
      providerAgeUrl: "https://www.rockstaracademy.com/lib/upload/files/club/HS_Schedule_Winter_2026%C2%A0W5.pdf",
      sourceCheckedAt: "2026-11-24",
    },
    term: "19 Oct 2026 until 17 Jan 2027",
    note: "'1-3 yrs' from the branch Winter term PDF class key; year-boundary inclusivity ambiguous. Grid: Mon 12:00, 14:00; Tue 10:00; Wed 10:00, 11:00; Thu 11:00, 12:00; Fri 12:00; Sat 11:00; Sun 11:00 (50 min; branch schedule, read 24 Nov 2026). Confirm availability with the branch.",
  });
  add({
    name: "Baby Jam",
    category: "Gym & Movement",
    offering: "offered",
    age: {
      minMonths: 6,
      maxMonths: 18,
      level: "branch",
      verification: "provider-confirmed",
      providerAgeUrl: "https://www.rockstaracademy.com/lib/upload/files/club/HS_Schedule_Winter_2026%C2%A0W5.pdf",
      sourceCheckedAt: "2026-11-24",
    },
    term: "19 Oct 2026 until 17 Jan 2027",
    note: "6-18 mo from the branch Winter term PDF class key. Grid: Tue 11:00; Thu 11:00; Fri 11:00 (30 min; branch schedule, read 24 Nov 2026). Confirm availability with the branch.",
  });
  add({
    name: "Crawler",
    category: "Gym & Movement",
    offering: "offered",
    age: {
      minMonths: 6,
      maxMonths: 18,
      level: "branch",
      verification: "provider-confirmed",
      providerAgeUrl: "https://www.rockstaracademy.com/lib/upload/files/club/HS_Schedule_Winter_2026%C2%A0W5.pdf",
      sourceCheckedAt: "2026-11-24",
    },
    term: "19 Oct 2026 until 17 Jan 2027",
    note: "6-18 mo from the branch Winter term PDF class key. Grid: Tue 10:00; Thu 10:00; Fri 10:00 (50 min; branch schedule, read 24 Nov 2026). Confirm availability with the branch.",
  });
  add({
    name: "Jumper",
    category: "Gym & Movement",
    offering: "offered",
    age: {
      minMonths: 24,
      maxMonths: 35,
      level: "branch",
      verification: "provider-confirmed",
      providerAgeUrl: "https://www.rockstaracademy.com/lib/upload/files/club/HS_Schedule_Winter_2026%C2%A0W5.pdf",
      sourceCheckedAt: "2026-11-24",
    },
    term: "19 Oct 2026 until 17 Jan 2027",
    note: "24-35 mo from the branch Winter term PDF class key. Grid: Mon 12:00; Tue 12:00; Wed 11:00, 12:00; Thu 12:00; Fri 11:00; Sat 13:00; Sun 12:00 (50 min; branch schedule, read 24 Nov 2026). Confirm availability with the branch.",
  });
  add({
    name: "Learn & Play 1",
    category: "Preschool",
    offering: "offered",
    age: {
      minMonths: 6,
      maxMonths: 18,
      level: "branch",
      verification: "provider-confirmed",
      providerAgeUrl: "https://www.rockstaracademy.com/lib/upload/files/club/HS_Schedule_Winter_2026%C2%A0W5.pdf",
      sourceCheckedAt: "2026-11-24",
    },
    term: "19 Oct 2026 until 17 Jan 2027",
    note: "6-18 mo from the branch Winter term PDF class key; Preschool & Kindergarten classes carry an additional fee per the PDF footer. Grid: Tue 09:00; Thu 09:00 (50 min; branch schedule, read 24 Nov 2026). Confirm availability with the branch.",
  });
  add({
    name: "Learn & Play 2",
    category: "Preschool",
    offering: "offered",
    age: {
      minMonths: 19,
      maxMonths: 35,
      level: "branch",
      verification: "provider-confirmed",
      providerAgeUrl: "https://www.rockstaracademy.com/lib/upload/files/club/HS_Schedule_Winter_2026%C2%A0W5.pdf",
      sourceCheckedAt: "2026-11-24",
    },
    term: "19 Oct 2026 until 17 Jan 2027",
    note: "19-35 mo from the branch Winter term PDF class key; Preschool & Kindergarten classes carry an additional fee per the PDF footer. Grid: Tue 10:00, 11:00; Wed 10:00, 11:00; Thu 10:00, 11:00 (50 min; branch schedule, read 24 Nov 2026). Confirm availability with the branch.",
  });
  add({
    name: "Move & Groove",
    category: "Dance",
    offering: "offered",
    age: {
      minMonths: 36,
      maxMonths: 60,
      level: "branch",
      verification: "provider-confirmed",
      providerAgeUrl: "https://www.rockstaracademy.com/lib/upload/files/club/HS_Schedule_Winter_2026%C2%A0W5.pdf",
      sourceCheckedAt: "2026-11-24",
    },
    term: "19 Oct 2026 until 17 Jan 2027",
    noteUrl: "https://www.rockstaracademy.com/schedules-and-locations/hampton-square",
    noteLabel: "Age key",
    note: "'3 - 5 Years' via the official web schedule key; upper boundary ambiguous. Grid: Mon 15:00; Tue 15:00; Wed 15:00; Thu 15:00; Fri 15:00; Sat 13:00 (50 min; branch schedule, read 24 Nov 2026). Confirm availability with the branch.",
  });
  add({
    name: "Pre-Ballet 3-5",
    category: "Dance",
    offering: "offered",
    age: {
      minMonths: 36,
      maxMonths: 60,
      level: "branch",
      verification: "provider-confirmed",
      providerAgeUrl: "https://www.rockstaracademy.com/lib/upload/files/club/HS_Schedule_Winter_2026%C2%A0W5.pdf",
      sourceCheckedAt: "2026-11-24",
    },
    term: "19 Oct 2026 until 17 Jan 2027",
    noteUrl: "https://www.rockstaracademy.com/schedules-and-locations/hampton-square",
    noteLabel: "Age key",
    note: "'3 - 5 Years' via the official web schedule key ('Pre-Ballet 1/2'); upper boundary ambiguous. Grid: Thu 14:00; Sun 12:00 (50 min; branch schedule, read 24 Nov 2026). Confirm availability with the branch.",
  });
  add({
    name: "Smartology 3",
    category: "Preschool",
    offering: "offered",
    age: {
      minMonths: 36,
      maxMonths: 48,
      level: "branch",
      verification: "provider-confirmed",
      providerAgeUrl: "https://www.rockstaracademy.com/lib/upload/files/club/HS_Schedule_Winter_2026%C2%A0W5.pdf",
      sourceCheckedAt: "2026-11-24",
    },
    term: "19 Oct 2026 until 17 Jan 2027",
    note: "'3-4 yrs' from the branch Winter term PDF class key; upper-bound inclusivity ambiguous; additional fee per the PDF footer. Grid: Mon 11:00; Tue 11:00; Wed 11:00; Fri 11:00 (50 min; branch schedule, read 24 Nov 2026). Confirm availability with the branch.",
  });
  add({
    name: "Smartology 4",
    category: "Preschool",
    offering: "offered",
    age: {
      minMonths: 48,
      maxMonths: 59,
      level: "branch",
      verification: "provider-confirmed",
      providerAgeUrl: "https://www.rockstaracademy.com/lib/upload/files/club/HS_Schedule_Winter_2026%C2%A0W5.pdf",
      sourceCheckedAt: "2026-11-24",
    },
    term: "19 Oct 2026 until 17 Jan 2027",
    note: "4-5 yrs from the dated branch PDF class key (updated 16 Nov 2026); the undated web schedule key shows a wider '3 - 6 Years' label, the dated PDF wins. Additional fee per the PDF footer. Grid: Mon 12:00; Tue 12:00; Wed 12:00; Thu 12:00; Fri 12:00 (115 min; branch schedule, read 24 Nov 2026). Confirm availability with the branch.",
  });
  add({
    name: "Sports U3",
    category: "Multi-Sport",
    offering: "offered",
    age: {
      minMonths: 24,
      maxMonths: 36,
      level: "branch",
      verification: "provider-confirmed",
      providerAgeUrl: "https://www.rockstaracademy.com/lib/upload/files/club/HS_Schedule_Winter_2026%C2%A0W5.pdf",
      sourceCheckedAt: "2026-11-24",
    },
    term: "19 Oct 2026 until 17 Jan 2027",
    noteUrl: "https://www.rockstaracademy.com/schedules-and-locations/hampton-square",
    noteLabel: "Age key",
    note: "'2 - 3 Years' via the official web schedule key. Grid: Mon 13:00; Tue 11:00; Wed 12:00; Thu 13:00; Fri 12:00; Sat 12:00 (50 min; branch schedule, read 24 Nov 2026). Confirm availability with the branch.",
  });
  add({
    name: "Sports U4/5",
    category: "Multi-Sport",
    offering: "offered",
    age: {
      minMonths: 36,
      maxMonths: 60,
      level: "branch",
      verification: "provider-confirmed",
      providerAgeUrl: "https://www.rockstaracademy.com/lib/upload/files/club/HS_Schedule_Winter_2026%C2%A0W5.pdf",
      sourceCheckedAt: "2026-11-24",
    },
    term: "19 Oct 2026 until 17 Jan 2027",
    noteUrl: "https://www.rockstaracademy.com/schedules-and-locations/hampton-square",
    noteLabel: "Age key",
    note: "'3 - 5 Years' via the official web schedule key; upper boundary ambiguous. Grid: Mon 16:00; Tue 12:00; Wed 14:00; Thu 14:00; Fri 13:00; Sat 13:00 (50 min; branch schedule, read 24 Nov 2026). Confirm availability with the branch.",
  });
  add({
    name: "Tots Gym U4",
    category: "Gym & Movement",
    offering: "offered",
    age: {
      minMonths: 36,
      maxMonths: 48,
      level: "branch",
      verification: "provider-confirmed",
      providerAgeUrl: "https://www.rockstaracademy.com/lib/upload/files/club/HS_Schedule_Winter_2026%C2%A0W5.pdf",
      sourceCheckedAt: "2026-11-24",
    },
    term: "19 Oct 2026 until 17 Jan 2027",
    noteUrl: "https://www.rockstaracademy.com/schedules-and-locations/hampton-square",
    noteLabel: "Age key",
    note: "PDF cell label 'Tots Gym U4'; numeric age via the official web schedule key ('3 - 4 Years'). Grid: Mon 11:00, 14:00; Tue 13:00; Wed 13:00, 14:00; Thu 13:00; Fri 14:00; Sat 12:00; Sun 13:00 (50 min; branch schedule, read 24 Nov 2026). Confirm availability with the branch.",
  });
  add({
    name: "TouchTennis 3-6 yrs",
    category: "Multi-Sport",
    offering: "offered",
    age: {
      minMonths: 36,
      maxMonths: 71,
      level: "branch",
      verification: "provider-confirmed",
      providerAgeUrl: "https://www.rockstaracademy.com/lib/upload/files/club/HS_Schedule_Winter_2026%C2%A0W5.pdf",
      sourceCheckedAt: "2026-11-24",
    },
    term: "19 Oct 2026 until 17 Jan 2027",
    noteUrl: "https://www.rockstaracademy.com/schedules-and-locations/hampton-square",
    noteLabel: "Age key",
    note: "'3 - 7 Years' via the official web schedule key; the class name says '3-6 yrs', the difference sits above the under-5 range. Confirm with the branch. Grid: Mon 13:00, 15:00; Tue 13:00, 16:00; Wed 15:00, 16:00; Thu 13:00, 16:00; Fri 15:00, 17:00; Sat 13:00; Sun 14:00 (50/55 min; branch schedule, read 24 Nov 2026). Confirm availability with the branch.",
  });
  add({
    name: "Walker",
    category: "Gym & Movement",
    offering: "offered",
    age: {
      minMonths: 12,
      maxMonths: 23,
      level: "branch",
      verification: "provider-confirmed",
      providerAgeUrl: "https://www.rockstaracademy.com/lib/upload/files/club/HS_Schedule_Winter_2026%C2%A0W5.pdf",
      sourceCheckedAt: "2026-11-24",
    },
    term: "19 Oct 2026 until 17 Jan 2027",
    note: "12-23 mo from the branch Winter term PDF class key. Grid: Mon 13:00; Tue 11:00; Wed 10:00; Thu 11:00; Fri 13:00; Sat 10:00; Sun 10:00 (50 min; branch schedule, read 24 Nov 2026). Confirm availability with the branch.",
  });
  }

  // ---- Kota Kasablanka ----
  {
  const v = venue(venues, "rockstar-academy-kota-kasablanka");
  v.lastCheckedAt = "2026-11-24";
  v.operatingStatus = { state: "official-listed", source: "https://www.rockstaracademy.com/schedules-and-locations/kota-kasablanka", checkedAt: "2026-11-24" };
  v.cardNote = "Term enrollment: 11-week terms (Winter: 19 Oct 2026 to 17 Jan 2027); registration required before class, no same-day signup; baby gymnastics up to 3 classes/week. Free trial class bookable on the official site (rockstaracademy.com/freetrial). Read 24 Nov 2026. / Kelas per term: 11 minggu per term (Winter: 19 Okt 2026 - 17 Jan 2027); wajib daftar sebelum kelas, tidak bisa daftar di hari yang sama; baby gym maksimal 3 kelas per minggu. Kelas trial gratis bisa dipesan di situs resmi. Dibaca 24 Nov 2026.";
  v.categories = ["Dance", "Gym & Movement", "Multi-Sport", "Preschool", "Swim"];
  const add = (p: VenueProgram) => {
    const i = v.programs.findIndex((x) => x.name === p.name || (p.name === "Baby Ballet" && x.name === "Baby (Ballet)"));
    if (i >= 0) v.programs[i] = { ...v.programs[i], ...p, name: v.programs[i].name, age: { ...v.programs[i].age, ...p.age } };
    else v.programs.push(p);
  };
  add({
    name: "Baby Ballet",
    category: "Dance",
    offering: "offered",
    age: {
      minMonths: 24,
      maxMonths: 36,
      level: "branch",
      verification: "provider-confirmed",
      providerAgeUrl: "https://www.rockstaracademy.com/lib/upload/files/club/KK_Schedule_Winter_2026_W51.pdf",
      sourceCheckedAt: "2026-11-24",
    },
    term: "19 Oct 2026 until 17 Jan 2027",
    noteUrl: "https://www.rockstaracademy.com/schedules-and-locations/kota-kasablanka",
    noteLabel: "Age key",
    note: "'2 - 3 Years' via the official web schedule key; year-boundary inclusivity ambiguous. Grid: Mon 12:00; Thu 12:00 (25/30 min; branch schedule, read 24 Nov 2026). Confirm availability with the branch.",
  });
  add({
    name: "Baby Dance",
    category: "Dance",
    offering: "offered",
    age: {
      minMonths: 12,
      maxMonths: 36,
      level: "branch",
      verification: "provider-confirmed",
      providerAgeUrl: "https://www.rockstaracademy.com/lib/upload/files/club/KK_Schedule_Winter_2026_W51.pdf",
      sourceCheckedAt: "2026-11-24",
    },
    term: "19 Oct 2026 until 17 Jan 2027",
    note: "'1-3 yrs' from the branch Winter term PDF class key; year-boundary inclusivity ambiguous. Grid: Mon 13:00; Tue 11:00, 12:00; Wed 11:00, 13:00; Thu 11:00; Fri 12:00, 13:00; Sat 11:00; Sun 14:00 (50 min; branch schedule, read 24 Nov 2026). Confirm availability with the branch.",
  });
  add({
    name: "Baby Jam",
    category: "Gym & Movement",
    offering: "offered",
    age: {
      minMonths: 6,
      maxMonths: 18,
      level: "branch",
      verification: "provider-confirmed",
      providerAgeUrl: "https://www.rockstaracademy.com/lib/upload/files/club/KK_Schedule_Winter_2026_W51.pdf",
      sourceCheckedAt: "2026-11-24",
    },
    term: "19 Oct 2026 until 17 Jan 2027",
    note: "6-18 mo from the branch Winter term PDF class key. Grid: Fri 11:00 (30 min; branch schedule, read 24 Nov 2026). Confirm availability with the branch.",
  });
  add({
    name: "Crawler",
    category: "Gym & Movement",
    offering: "offered",
    age: {
      minMonths: 6,
      maxMonths: 18,
      level: "branch",
      verification: "provider-confirmed",
      providerAgeUrl: "https://www.rockstaracademy.com/lib/upload/files/club/KK_Schedule_Winter_2026_W51.pdf",
      sourceCheckedAt: "2026-11-24",
    },
    term: "19 Oct 2026 until 17 Jan 2027",
    note: "6-18 mo from the branch Winter term PDF class key. Grid: Tue 10:00; Thu 10:00; Fri 10:00; Sun 13:00 (50 min; branch schedule, read 24 Nov 2026). Confirm availability with the branch.",
  });
  add({
    name: "Jumper",
    category: "Gym & Movement",
    offering: "offered",
    age: {
      minMonths: 24,
      maxMonths: 35,
      level: "branch",
      verification: "provider-confirmed",
      providerAgeUrl: "https://www.rockstaracademy.com/lib/upload/files/club/KK_Schedule_Winter_2026_W51.pdf",
      sourceCheckedAt: "2026-11-24",
    },
    term: "19 Oct 2026 until 17 Jan 2027",
    note: "24-35 mo from the branch Winter term PDF class key. Grid: Mon 10:00, 14:00; Tue 09:00, 11:00; Wed 11:00, 12:00; Thu 11:00, 13:00; Fri 12:00, 14:00; Sat 10:00; Sun 15:00 (50 min; branch schedule, read 24 Nov 2026). Confirm availability with the branch.",
  });
  add({
    name: "Learn & Play 1",
    category: "Preschool",
    offering: "offered",
    age: {
      minMonths: 6,
      maxMonths: 18,
      level: "branch",
      verification: "provider-confirmed",
      providerAgeUrl: "https://www.rockstaracademy.com/lib/upload/files/club/KK_Schedule_Winter_2026_W51.pdf",
      sourceCheckedAt: "2026-11-24",
    },
    term: "19 Oct 2026 until 17 Jan 2027",
    note: "6-18 mo from the branch Winter term PDF class key; Preschool & Kindergarten classes carry an additional fee per the PDF footer. Grid: Tue 09:00; Thu 09:00 (50 min; branch schedule, read 24 Nov 2026). Confirm availability with the branch.",
  });
  add({
    name: "Learn & Play 2",
    category: "Preschool",
    offering: "offered",
    age: {
      minMonths: 19,
      maxMonths: 35,
      level: "branch",
      verification: "provider-confirmed",
      providerAgeUrl: "https://www.rockstaracademy.com/lib/upload/files/club/KK_Schedule_Winter_2026_W51.pdf",
      sourceCheckedAt: "2026-11-24",
    },
    term: "19 Oct 2026 until 17 Jan 2027",
    note: "19-35 mo from the branch Winter term PDF class key; Preschool & Kindergarten classes carry an additional fee per the PDF footer. Grid: Mon 09:00; Tue 10:00; Wed 09:00, 10:00, 11:00; Thu 10:00, 11:00; Fri 09:00, 11:00 (50 min; branch schedule, read 24 Nov 2026). Confirm availability with the branch.",
  });
  add({
    name: "Move & Groove",
    category: "Dance",
    offering: "offered",
    age: {
      minMonths: 36,
      maxMonths: 60,
      level: "branch",
      verification: "provider-confirmed",
      providerAgeUrl: "https://www.rockstaracademy.com/lib/upload/files/club/KK_Schedule_Winter_2026_W51.pdf",
      sourceCheckedAt: "2026-11-24",
    },
    term: "19 Oct 2026 until 17 Jan 2027",
    noteUrl: "https://www.rockstaracademy.com/schedules-and-locations/kota-kasablanka",
    noteLabel: "Age key",
    note: "'3 - 5 Years' via the official web schedule key; upper boundary ambiguous. Grid: Mon 14:00; Tue 15:00; Wed 15:00; Thu 13:00; Fri 14:00; Sat 12:00; Sun 15:00 (50 min; branch schedule, read 24 Nov 2026). Confirm availability with the branch.",
  });
  add({
    name: "Pre-Ballet 3-5",
    category: "Dance",
    offering: "offered",
    age: {
      minMonths: 36,
      maxMonths: 60,
      level: "branch",
      verification: "provider-confirmed",
      providerAgeUrl: "https://www.rockstaracademy.com/lib/upload/files/club/KK_Schedule_Winter_2026_W51.pdf",
      sourceCheckedAt: "2026-11-24",
    },
    term: "19 Oct 2026 until 17 Jan 2027",
    noteUrl: "https://www.rockstaracademy.com/schedules-and-locations/kota-kasablanka",
    noteLabel: "Age key",
    note: "'3 - 5 Years' via the official web schedule key ('Pre-Ballet 1/2'); upper boundary ambiguous. Grid: Wed 14:00; Thu 14:00; Fri 12:00; Sat 13:00 (50 min; branch schedule, read 24 Nov 2026). Confirm availability with the branch.",
  });
  add({
    name: "Smartology 3",
    category: "Preschool",
    offering: "offered",
    age: {
      minMonths: 36,
      maxMonths: 48,
      level: "branch",
      verification: "provider-confirmed",
      providerAgeUrl: "https://www.rockstaracademy.com/lib/upload/files/club/KK_Schedule_Winter_2026_W51.pdf",
      sourceCheckedAt: "2026-11-24",
    },
    term: "19 Oct 2026 until 17 Jan 2027",
    note: "'3-4 yrs' from the branch Winter term PDF class key; upper-bound inclusivity ambiguous; additional fee per the PDF footer. Grid: Mon 11:00, 12:00; Tue 11:00, 13:00; Wed 11:00, 12:00; Thu 11:00; Fri 11:00 (50 min; branch schedule, read 24 Nov 2026). Confirm availability with the branch.",
  });
  add({
    name: "Smartology 4",
    category: "Preschool",
    offering: "offered",
    age: {
      minMonths: 48,
      maxMonths: 59,
      level: "branch",
      verification: "provider-confirmed",
      providerAgeUrl: "https://www.rockstaracademy.com/lib/upload/files/club/KK_Schedule_Winter_2026_W51.pdf",
      sourceCheckedAt: "2026-11-24",
    },
    term: "19 Oct 2026 until 17 Jan 2027",
    note: "4-5 yrs from the dated branch PDF class key (updated 16 Nov 2026); the undated web schedule key shows a wider '3 - 6 Years' label, the dated PDF wins. Additional fee per the PDF footer. Grid: Mon 12:00; Tue 12:00; Wed 12:00; Thu 12:00; Fri 12:00 (115/120 min; branch schedule, read 24 Nov 2026). Confirm availability with the branch.",
  });
  add({
    name: "Sports U3",
    category: "Multi-Sport",
    offering: "offered",
    age: {
      minMonths: 24,
      maxMonths: 36,
      level: "branch",
      verification: "provider-confirmed",
      providerAgeUrl: "https://www.rockstaracademy.com/lib/upload/files/club/KK_Schedule_Winter_2026_W51.pdf",
      sourceCheckedAt: "2026-11-24",
    },
    term: "19 Oct 2026 until 17 Jan 2027",
    noteUrl: "https://www.rockstaracademy.com/schedules-and-locations/kota-kasablanka",
    noteLabel: "Age key",
    note: "'2 - 3 Years' via the official web schedule key. Grid: Mon 12:00; Tue 10:00, 11:00; Wed 11:00, 12:00; Thu 11:00, 12:00; Sun 11:00 (50 min; branch schedule, read 24 Nov 2026). Confirm availability with the branch.",
  });
  add({
    name: "Sports U4/5",
    category: "Multi-Sport",
    offering: "offered",
    age: {
      minMonths: 36,
      maxMonths: 60,
      level: "branch",
      verification: "provider-confirmed",
      providerAgeUrl: "https://www.rockstaracademy.com/lib/upload/files/club/KK_Schedule_Winter_2026_W51.pdf",
      sourceCheckedAt: "2026-11-24",
    },
    term: "19 Oct 2026 until 17 Jan 2027",
    noteUrl: "https://www.rockstaracademy.com/schedules-and-locations/kota-kasablanka",
    noteLabel: "Age key",
    note: "'3 - 5 Years' via the official web schedule key; upper boundary ambiguous. Grid: Mon 13:00; Tue 13:00; Wed 13:00; Thu 14:00; Sun 13:00 (50 min; branch schedule, read 24 Nov 2026). Confirm availability with the branch.",
  });
  add({
    name: "Tots Gym U4",
    category: "Gym & Movement",
    offering: "offered",
    age: {
      minMonths: 36,
      maxMonths: 48,
      level: "branch",
      verification: "provider-confirmed",
      providerAgeUrl: "https://www.rockstaracademy.com/lib/upload/files/club/KK_Schedule_Winter_2026_W51.pdf",
      sourceCheckedAt: "2026-11-24",
    },
    term: "19 Oct 2026 until 17 Jan 2027",
    noteUrl: "https://www.rockstaracademy.com/schedules-and-locations/kota-kasablanka",
    noteLabel: "Age key",
    note: "PDF cell label 'Tots Gym U4'; numeric age via the official web schedule key ('3 - 4 Years'). Grid: Mon 13:00, 15:00; Tue 14:00; Wed 13:00, 14:00; Thu 15:00; Fri 13:00; Sat 11:00; Sun 12:00 (50 min; branch schedule, read 24 Nov 2026). Confirm availability with the branch.",
  });
  add({
    name: "TouchTennis 3-6 yrs",
    category: "Multi-Sport",
    offering: "offered",
    age: {
      minMonths: 36,
      maxMonths: 71,
      level: "branch",
      verification: "provider-confirmed",
      providerAgeUrl: "https://www.rockstaracademy.com/lib/upload/files/club/KK_Schedule_Winter_2026_W51.pdf",
      sourceCheckedAt: "2026-11-24",
    },
    term: "19 Oct 2026 until 17 Jan 2027",
    noteUrl: "https://www.rockstaracademy.com/schedules-and-locations/kota-kasablanka",
    noteLabel: "Age key",
    note: "'3 - 7 Years' via the official web schedule key; the class name says '3-6 yrs', the difference sits above the under-5 range. Confirm with the branch. Grid: Mon 14:00; Tue 14:00, 16:00; Wed 14:00; Thu 14:00; Fri 14:00; Sat 13:00, 15:00; Sun 10:00, 15:00 (55 min; branch schedule, read 24 Nov 2026). Confirm availability with the branch.",
  });
  add({
    name: "Walker",
    category: "Gym & Movement",
    offering: "offered",
    age: {
      minMonths: 12,
      maxMonths: 23,
      level: "branch",
      verification: "provider-confirmed",
      providerAgeUrl: "https://www.rockstaracademy.com/lib/upload/files/club/KK_Schedule_Winter_2026_W51.pdf",
      sourceCheckedAt: "2026-11-24",
    },
    term: "19 Oct 2026 until 17 Jan 2027",
    note: "12-23 mo from the branch Winter term PDF class key. Grid: Tue 12:00; Wed 10:00; Thu 12:00; Fri 11:00; Sat 09:00 (50 min; branch schedule, read 24 Nov 2026). Confirm availability with the branch.",
  });
  }

  // ---- Lippo Mall Kemang ----
  {
  const v = venue(venues, "rockstar-academy-lippo-mall-kemang");
  v.lastCheckedAt = "2026-11-24";
  v.operatingStatus = { state: "official-listed", source: "https://www.rockstaracademy.com/schedules-and-locations/lippo-mall-kemang-village", checkedAt: "2026-11-24" };
  v.cardNote = "Term enrollment: 11-week terms (Winter: 19 Oct 2026 to 17 Jan 2027); registration required before class, no same-day signup; baby gymnastics up to 3 classes/week. Free trial class bookable on the official site (rockstaracademy.com/freetrial). Read 24 Nov 2026. / Kelas per term: 11 minggu per term (Winter: 19 Okt 2026 - 17 Jan 2027); wajib daftar sebelum kelas, tidak bisa daftar di hari yang sama; baby gym maksimal 3 kelas per minggu. Kelas trial gratis bisa dipesan di situs resmi. Dibaca 24 Nov 2026.";
  v.categories = ["Dance", "Gym & Movement", "Multi-Sport", "Preschool", "Swim"];
  const add = (p: VenueProgram) => {
    const i = v.programs.findIndex((x) => x.name === p.name || (p.name === "Baby Ballet" && x.name === "Baby (Ballet)"));
    if (i >= 0) v.programs[i] = { ...v.programs[i], ...p, name: v.programs[i].name, age: { ...v.programs[i].age, ...p.age } };
    else v.programs.push(p);
  };
  add({
    name: "Baby Ballet",
    category: "Dance",
    offering: "offered",
    age: {
      minMonths: 24,
      maxMonths: 36,
      level: "branch",
      verification: "provider-confirmed",
      providerAgeUrl: "https://www.rockstaracademy.com/lib/upload/files/club/KV_Schedule_Winter_2026_W5.pdf",
      sourceCheckedAt: "2026-11-24",
    },
    term: "19 Oct 2026 until 17 Jan 2027",
    noteUrl: "https://www.rockstaracademy.com/schedules-and-locations/lippo-mall-kemang-village",
    noteLabel: "Age key",
    note: "'2 - 3 Years' via the official web schedule key; year-boundary inclusivity ambiguous. Grid: Tue 13:00; Fri 13:00; Sat 10:00 (30 min; branch schedule, read 24 Nov 2026). Confirm availability with the branch.",
  });
  add({
    name: "Baby Dance",
    category: "Dance",
    offering: "offered",
    age: {
      minMonths: 12,
      maxMonths: 36,
      level: "branch",
      verification: "provider-confirmed",
      providerAgeUrl: "https://www.rockstaracademy.com/lib/upload/files/club/KV_Schedule_Winter_2026_W5.pdf",
      sourceCheckedAt: "2026-11-24",
    },
    term: "19 Oct 2026 until 17 Jan 2027",
    note: "'1-3 yrs' from the branch Winter term PDF class key; year-boundary inclusivity ambiguous. Grid: Mon 14:00; Tue 11:00, 12:00; Wed 12:00; Thu 10:00, 12:00; Fri 12:00; Sat 11:00; Sun 11:00 (50 min; branch schedule, read 24 Nov 2026). Confirm availability with the branch.",
  });
  add({
    name: "Baby Jam",
    category: "Gym & Movement",
    offering: "offered",
    age: {
      minMonths: 6,
      maxMonths: 18,
      level: "branch",
      verification: "provider-confirmed",
      providerAgeUrl: "https://www.rockstaracademy.com/lib/upload/files/club/KV_Schedule_Winter_2026_W5.pdf",
      sourceCheckedAt: "2026-11-24",
    },
    term: "19 Oct 2026 until 17 Jan 2027",
    note: "6-18 mo from the branch Winter term PDF class key. Grid: Tue 13:00; Thu 11:00; Sun 12:00 (30 min; branch schedule, read 24 Nov 2026). Confirm availability with the branch.",
  });
  add({
    name: "Crawler",
    category: "Gym & Movement",
    offering: "offered",
    age: {
      minMonths: 6,
      maxMonths: 18,
      level: "branch",
      verification: "provider-confirmed",
      providerAgeUrl: "https://www.rockstaracademy.com/lib/upload/files/club/KV_Schedule_Winter_2026_W5.pdf",
      sourceCheckedAt: "2026-11-24",
    },
    term: "19 Oct 2026 until 17 Jan 2027",
    note: "6-18 mo from the branch Winter term PDF class key. Grid: Tue 12:00; Thu 10:00; Sun 11:00 (50 min; branch schedule, read 24 Nov 2026). Confirm availability with the branch.",
  });
  add({
    name: "Jumper",
    category: "Gym & Movement",
    offering: "offered",
    age: {
      minMonths: 24,
      maxMonths: 35,
      level: "branch",
      verification: "provider-confirmed",
      providerAgeUrl: "https://www.rockstaracademy.com/lib/upload/files/club/KV_Schedule_Winter_2026_W5.pdf",
      sourceCheckedAt: "2026-11-24",
    },
    term: "19 Oct 2026 until 17 Jan 2027",
    note: "24-35 mo from the branch Winter term PDF class key. Grid: Mon 15:00; Tue 11:00; Wed 11:00, 13:00; Thu 13:00; Fri 11:00; Sat 12:00; Sun 12:00 (50 min; branch schedule, read 24 Nov 2026). Confirm availability with the branch.",
  });
  add({
    name: "Learn & Play 1",
    category: "Preschool",
    offering: "offered",
    age: {
      minMonths: 6,
      maxMonths: 18,
      level: "branch",
      verification: "provider-confirmed",
      providerAgeUrl: "https://www.rockstaracademy.com/lib/upload/files/club/KV_Schedule_Winter_2026_W5.pdf",
      sourceCheckedAt: "2026-11-24",
    },
    term: "19 Oct 2026 until 17 Jan 2027",
    note: "6-18 mo from the branch Winter term PDF class key; Preschool & Kindergarten classes carry an additional fee per the PDF footer. Grid: Tue 09:00; Thu 09:00 (50 min; branch schedule, read 24 Nov 2026). Confirm availability with the branch.",
  });
  add({
    name: "Learn & Play 2",
    category: "Preschool",
    offering: "offered",
    age: {
      minMonths: 19,
      maxMonths: 35,
      level: "branch",
      verification: "provider-confirmed",
      providerAgeUrl: "https://www.rockstaracademy.com/lib/upload/files/club/KV_Schedule_Winter_2026_W5.pdf",
      sourceCheckedAt: "2026-11-24",
    },
    term: "19 Oct 2026 until 17 Jan 2027",
    note: "19-35 mo from the branch Winter term PDF class key; Preschool & Kindergarten classes carry an additional fee per the PDF footer. Grid: Tue 10:00, 11:00; Wed 10:00, 11:00; Thu 10:00, 11:00 (50 min; branch schedule, read 24 Nov 2026). Confirm availability with the branch.",
  });
  add({
    name: "Move & Groove",
    category: "Dance",
    offering: "offered",
    age: {
      minMonths: 36,
      maxMonths: 60,
      level: "branch",
      verification: "provider-confirmed",
      providerAgeUrl: "https://www.rockstaracademy.com/lib/upload/files/club/KV_Schedule_Winter_2026_W5.pdf",
      sourceCheckedAt: "2026-11-24",
    },
    term: "19 Oct 2026 until 17 Jan 2027",
    noteUrl: "https://www.rockstaracademy.com/schedules-and-locations/lippo-mall-kemang-village",
    noteLabel: "Age key",
    note: "'3 - 5 Years' via the official web schedule key; upper boundary ambiguous. Grid: Mon 15:00; Tue 14:00; Wed 15:00; Thu 14:00; Fri 13:00; Sat 13:00 (50 min; branch schedule, read 24 Nov 2026). Confirm availability with the branch.",
  });
  add({
    name: "Pre-Ballet 3-5",
    category: "Dance",
    offering: "offered",
    age: {
      minMonths: 36,
      maxMonths: 60,
      level: "branch",
      verification: "provider-confirmed",
      providerAgeUrl: "https://www.rockstaracademy.com/lib/upload/files/club/KV_Schedule_Winter_2026_W5.pdf",
      sourceCheckedAt: "2026-11-24",
    },
    term: "19 Oct 2026 until 17 Jan 2027",
    noteUrl: "https://www.rockstaracademy.com/schedules-and-locations/lippo-mall-kemang-village",
    noteLabel: "Age key",
    note: "'3 - 5 Years' via the official web schedule key ('Pre-Ballet 1/2'); upper boundary ambiguous. Grid: Tue 14:00; Fri 14:00; Sat 14:30 (50 min; branch schedule, read 24 Nov 2026). Confirm availability with the branch.",
  });
  add({
    name: "Smartology 3",
    category: "Preschool",
    offering: "offered",
    age: {
      minMonths: 36,
      maxMonths: 48,
      level: "branch",
      verification: "provider-confirmed",
      providerAgeUrl: "https://www.rockstaracademy.com/lib/upload/files/club/KV_Schedule_Winter_2026_W5.pdf",
      sourceCheckedAt: "2026-11-24",
    },
    term: "19 Oct 2026 until 17 Jan 2027",
    note: "'3-4 yrs' from the branch Winter term PDF class key; upper-bound inclusivity ambiguous; additional fee per the PDF footer. Grid: Mon 11:00; Tue 11:00; Wed 11:00; Fri 11:00 (50 min; branch schedule, read 24 Nov 2026). Confirm availability with the branch.",
  });
  add({
    name: "Smartology 4",
    category: "Preschool",
    offering: "offered",
    age: {
      minMonths: 48,
      maxMonths: 59,
      level: "branch",
      verification: "provider-confirmed",
      providerAgeUrl: "https://www.rockstaracademy.com/lib/upload/files/club/KV_Schedule_Winter_2026_W5.pdf",
      sourceCheckedAt: "2026-11-24",
    },
    term: "19 Oct 2026 until 17 Jan 2027",
    note: "4-5 yrs from the dated branch PDF class key (updated 16 Nov 2026); the undated web schedule key shows a wider '3 - 6 Years' label, the dated PDF wins. Additional fee per the PDF footer. Grid: Mon 12:00; Tue 12:00; Wed 12:00; Thu 12:00; Fri 12:00 (110 min; branch schedule, read 24 Nov 2026). Confirm availability with the branch.",
  });
  add({
    name: "Sports U3",
    category: "Multi-Sport",
    offering: "offered",
    age: {
      minMonths: 24,
      maxMonths: 36,
      level: "branch",
      verification: "provider-confirmed",
      providerAgeUrl: "https://www.rockstaracademy.com/lib/upload/files/club/KV_Schedule_Winter_2026_W5.pdf",
      sourceCheckedAt: "2026-11-24",
    },
    term: "19 Oct 2026 until 17 Jan 2027",
    noteUrl: "https://www.rockstaracademy.com/schedules-and-locations/lippo-mall-kemang-village",
    noteLabel: "Age key",
    note: "'2 - 3 Years' via the official web schedule key. Grid: Mon 13:00; Tue 12:00; Wed 12:00; Thu 12:00; Fri 10:00 (50 min; branch schedule, read 24 Nov 2026). Confirm availability with the branch.",
  });
  add({
    name: "Sports U4/5",
    category: "Multi-Sport",
    offering: "offered",
    age: {
      minMonths: 36,
      maxMonths: 60,
      level: "branch",
      verification: "provider-confirmed",
      providerAgeUrl: "https://www.rockstaracademy.com/lib/upload/files/club/KV_Schedule_Winter_2026_W5.pdf",
      sourceCheckedAt: "2026-11-24",
    },
    term: "19 Oct 2026 until 17 Jan 2027",
    noteUrl: "https://www.rockstaracademy.com/schedules-and-locations/lippo-mall-kemang-village",
    noteLabel: "Age key",
    note: "'3 - 5 Years' via the official web schedule key; upper boundary ambiguous. Grid: Tue 11:00; Wed 13:00; Thu 13:00; Sat 12:00; Sun 13:00 (50 min; branch schedule, read 24 Nov 2026). Confirm availability with the branch.",
  });
  add({
    name: "Tots Gym U4",
    category: "Gym & Movement",
    offering: "offered",
    age: {
      minMonths: 36,
      maxMonths: 48,
      level: "branch",
      verification: "provider-confirmed",
      providerAgeUrl: "https://www.rockstaracademy.com/lib/upload/files/club/KV_Schedule_Winter_2026_W5.pdf",
      sourceCheckedAt: "2026-11-24",
    },
    term: "19 Oct 2026 until 17 Jan 2027",
    noteUrl: "https://www.rockstaracademy.com/schedules-and-locations/lippo-mall-kemang-village",
    noteLabel: "Age key",
    note: "PDF cell label 'Tots Gym U4'; numeric age via the official web schedule key ('3 - 4 Years'). Grid: Mon 11:00, 14:00; Tue 13:00; Wed 14:00; Thu 15:00; Fri 15:00; Sat 11:00; Sun 14:00 (50 min; branch schedule, read 24 Nov 2026). Confirm availability with the branch.",
  });
  add({
    name: "TouchTennis 3-6 yrs",
    category: "Multi-Sport",
    offering: "offered",
    age: {
      minMonths: 36,
      maxMonths: 71,
      level: "branch",
      verification: "provider-confirmed",
      providerAgeUrl: "https://www.rockstaracademy.com/lib/upload/files/club/KV_Schedule_Winter_2026_W5.pdf",
      sourceCheckedAt: "2026-11-24",
    },
    term: "19 Oct 2026 until 17 Jan 2027",
    noteUrl: "https://www.rockstaracademy.com/schedules-and-locations/lippo-mall-kemang-village",
    noteLabel: "Age key",
    note: "'3 - 7 Years' via the official web schedule key; the class name says '3-6 yrs', the difference sits above the under-5 range. Confirm with the branch. Grid: Mon 15:00; Tue 16:00; Wed 14:00; Thu 15:00; Fri 13:00; Sat 14:00; Sun 15:00 (55 min; branch schedule, read 24 Nov 2026). Confirm availability with the branch.",
  });
  add({
    name: "Walker",
    category: "Gym & Movement",
    offering: "offered",
    age: {
      minMonths: 12,
      maxMonths: 23,
      level: "branch",
      verification: "provider-confirmed",
      providerAgeUrl: "https://www.rockstaracademy.com/lib/upload/files/club/KV_Schedule_Winter_2026_W5.pdf",
      sourceCheckedAt: "2026-11-24",
    },
    term: "19 Oct 2026 until 17 Jan 2027",
    note: "12-23 mo from the branch Winter term PDF class key. Grid: Mon 13:00; Tue 10:00; Wed 10:00; Thu 11:00; Fri 13:00; Sat 10:00; Sun 10:00 (50 min; branch schedule, read 24 Nov 2026). Confirm availability with the branch.",
  });
  }

  // ---- Lippo Mall Puri ----
  {
  const v = venue(venues, "rockstar-academy-lippo-mall-puri");
  v.lastCheckedAt = "2026-11-24";
  v.operatingStatus = { state: "official-listed", source: "https://www.rockstaracademy.com/schedules-and-locations/lippo-mall-puri", checkedAt: "2026-11-24" };
  v.cardNote = "Term enrollment: 11-week terms (Winter: 19 Oct 2026 to 17 Jan 2027); registration required before class, no same-day signup; baby gymnastics up to 3 classes/week. Free trial class bookable on the official site (rockstaracademy.com/freetrial). Read 24 Nov 2026. / Kelas per term: 11 minggu per term (Winter: 19 Okt 2026 - 17 Jan 2027); wajib daftar sebelum kelas, tidak bisa daftar di hari yang sama; baby gym maksimal 3 kelas per minggu. Kelas trial gratis bisa dipesan di situs resmi. Dibaca 24 Nov 2026.";
  v.categories = ["Dance", "Gym & Movement", "Multi-Sport", "Preschool", "Swim"];
  const add = (p: VenueProgram) => {
    const i = v.programs.findIndex((x) => x.name === p.name || (p.name === "Baby Ballet" && x.name === "Baby (Ballet)"));
    if (i >= 0) v.programs[i] = { ...v.programs[i], ...p, name: v.programs[i].name, age: { ...v.programs[i].age, ...p.age } };
    else v.programs.push(p);
  };
  add({
    name: "Baby Ballet",
    category: "Dance",
    offering: "offered",
    age: {
      minMonths: 24,
      maxMonths: 36,
      level: "branch",
      verification: "provider-confirmed",
      providerAgeUrl: "https://www.rockstaracademy.com/lib/upload/files/club/LP_Schedule_Winter_2026_W5.pdf",
      sourceCheckedAt: "2026-11-24",
    },
    term: "19 Oct 2026 until 17 Jan 2027",
    noteUrl: "https://www.rockstaracademy.com/schedules-and-locations/lippo-mall-puri",
    noteLabel: "Age key",
    note: "'2 - 3 Years' via the official web schedule key; year-boundary inclusivity ambiguous. Grid: Fri 13:00; Sat 13:00 (30 min; branch schedule, read 24 Nov 2026). Confirm availability with the branch.",
  });
  add({
    name: "Baby Dance",
    category: "Dance",
    offering: "offered",
    age: {
      minMonths: 12,
      maxMonths: 36,
      level: "branch",
      verification: "provider-confirmed",
      providerAgeUrl: "https://www.rockstaracademy.com/lib/upload/files/club/LP_Schedule_Winter_2026_W5.pdf",
      sourceCheckedAt: "2026-11-24",
    },
    term: "19 Oct 2026 until 17 Jan 2027",
    note: "'1-3 yrs' from the branch Winter term PDF class key; year-boundary inclusivity ambiguous. Grid: Mon 13:00; Tue 11:00, 11:00; Wed 11:00, 11:00; Thu 11:00, 11:00; Fri 11:00; Sat 11:00, 12:00; Sun 12:00 (50 min; branch schedule, read 24 Nov 2026). Confirm availability with the branch.",
  });
  add({
    name: "Crawler",
    category: "Gym & Movement",
    offering: "offered",
    age: {
      minMonths: 6,
      maxMonths: 18,
      level: "branch",
      verification: "provider-confirmed",
      providerAgeUrl: "https://www.rockstaracademy.com/lib/upload/files/club/LP_Schedule_Winter_2026_W5.pdf",
      sourceCheckedAt: "2026-11-24",
    },
    term: "19 Oct 2026 until 17 Jan 2027",
    note: "6-18 mo from the branch Winter term PDF class key. Grid: Tue 11:00; Fri 13:00 (50 min; branch schedule, read 24 Nov 2026). Confirm availability with the branch.",
  });
  add({
    name: "Jumper",
    category: "Gym & Movement",
    offering: "offered",
    age: {
      minMonths: 24,
      maxMonths: 35,
      level: "branch",
      verification: "provider-confirmed",
      providerAgeUrl: "https://www.rockstaracademy.com/lib/upload/files/club/LP_Schedule_Winter_2026_W5.pdf",
      sourceCheckedAt: "2026-11-24",
    },
    term: "19 Oct 2026 until 17 Jan 2027",
    note: "24-35 mo from the branch Winter term PDF class key. Grid: Mon 14:00; Tue 12:00; Wed 11:00, 12:00; Thu 12:00; Fri 11:00, 12:00; Sat 11:00; Sun 11:00 (50 min; branch schedule, read 24 Nov 2026). Confirm availability with the branch.",
  });
  add({
    name: "Learn & Play 1",
    category: "Preschool",
    offering: "offered",
    age: {
      minMonths: 6,
      maxMonths: 18,
      level: "branch",
      verification: "provider-confirmed",
      providerAgeUrl: "https://www.rockstaracademy.com/lib/upload/files/club/LP_Schedule_Winter_2026_W5.pdf",
      sourceCheckedAt: "2026-11-24",
    },
    term: "19 Oct 2026 until 17 Jan 2027",
    note: "6-18 mo from the branch Winter term PDF class key; Preschool & Kindergarten classes carry an additional fee per the PDF footer. Grid: Tue 09:00; Thu 09:00 (50 min; branch schedule, read 24 Nov 2026). Confirm availability with the branch.",
  });
  add({
    name: "Learn & Play 2",
    category: "Preschool",
    offering: "offered",
    age: {
      minMonths: 19,
      maxMonths: 35,
      level: "branch",
      verification: "provider-confirmed",
      providerAgeUrl: "https://www.rockstaracademy.com/lib/upload/files/club/LP_Schedule_Winter_2026_W5.pdf",
      sourceCheckedAt: "2026-11-24",
    },
    term: "19 Oct 2026 until 17 Jan 2027",
    note: "19-35 mo from the branch Winter term PDF class key; Preschool & Kindergarten classes carry an additional fee per the PDF footer. Grid: Tue 10:00, 12:00; Wed 10:00, 12:00; Thu 10:00, 12:00 (50 min; branch schedule, read 24 Nov 2026). Confirm availability with the branch.",
  });
  add({
    name: "Move & Groove",
    category: "Dance",
    offering: "offered",
    age: {
      minMonths: 36,
      maxMonths: 60,
      level: "branch",
      verification: "provider-confirmed",
      providerAgeUrl: "https://www.rockstaracademy.com/lib/upload/files/club/LP_Schedule_Winter_2026_W5.pdf",
      sourceCheckedAt: "2026-11-24",
    },
    term: "19 Oct 2026 until 17 Jan 2027",
    noteUrl: "https://www.rockstaracademy.com/schedules-and-locations/lippo-mall-puri",
    noteLabel: "Age key",
    note: "'3 - 5 Years' via the official web schedule key; upper boundary ambiguous. Grid: Mon 14:00; Tue 14:00; Wed 14:00; Thu 14:00; Fri 13:00; Sat 13:00; Sun 15:00 (50 min; branch schedule, read 24 Nov 2026). Confirm availability with the branch.",
  });
  add({
    name: "Pre-Ballet 3-5",
    category: "Dance",
    offering: "offered",
    age: {
      minMonths: 36,
      maxMonths: 60,
      level: "branch",
      verification: "provider-confirmed",
      providerAgeUrl: "https://www.rockstaracademy.com/lib/upload/files/club/LP_Schedule_Winter_2026_W5.pdf",
      sourceCheckedAt: "2026-11-24",
    },
    term: "19 Oct 2026 until 17 Jan 2027",
    noteUrl: "https://www.rockstaracademy.com/schedules-and-locations/lippo-mall-puri",
    noteLabel: "Age key",
    note: "'3 - 5 Years' via the official web schedule key ('Pre-Ballet 1/2'); upper boundary ambiguous. Grid: Wed 13:00; Fri 14:00 (50 min; branch schedule, read 24 Nov 2026). Confirm availability with the branch.",
  });
  add({
    name: "Smartology 3",
    category: "Preschool",
    offering: "offered",
    age: {
      minMonths: 36,
      maxMonths: 48,
      level: "branch",
      verification: "provider-confirmed",
      providerAgeUrl: "https://www.rockstaracademy.com/lib/upload/files/club/LP_Schedule_Winter_2026_W5.pdf",
      sourceCheckedAt: "2026-11-24",
    },
    term: "19 Oct 2026 until 17 Jan 2027",
    note: "'3-4 yrs' from the branch Winter term PDF class key; upper-bound inclusivity ambiguous; additional fee per the PDF footer. Grid: Mon 11:00; Tue 11:00; Wed 11:00; Fri 11:00 (50 min; branch schedule, read 24 Nov 2026). Confirm availability with the branch.",
  });
  add({
    name: "Smartology 4",
    category: "Preschool",
    offering: "offered",
    age: {
      minMonths: 48,
      maxMonths: 59,
      level: "branch",
      verification: "provider-confirmed",
      providerAgeUrl: "https://www.rockstaracademy.com/lib/upload/files/club/LP_Schedule_Winter_2026_W5.pdf",
      sourceCheckedAt: "2026-11-24",
    },
    term: "19 Oct 2026 until 17 Jan 2027",
    note: "4-5 yrs from the dated branch PDF class key (updated 16 Nov 2026); the undated web schedule key shows a wider '3 - 6 Years' label, the dated PDF wins. Additional fee per the PDF footer. Grid: Mon 12:00; Tue 12:00; Wed 12:00; Thu 12:00; Fri 12:00 (110 min; branch schedule, read 24 Nov 2026). Confirm availability with the branch.",
  });
  add({
    name: "Sports U3",
    category: "Multi-Sport",
    offering: "offered",
    age: {
      minMonths: 24,
      maxMonths: 36,
      level: "branch",
      verification: "provider-confirmed",
      providerAgeUrl: "https://www.rockstaracademy.com/lib/upload/files/club/LP_Schedule_Winter_2026_W5.pdf",
      sourceCheckedAt: "2026-11-24",
    },
    term: "19 Oct 2026 until 17 Jan 2027",
    noteUrl: "https://www.rockstaracademy.com/schedules-and-locations/lippo-mall-puri",
    noteLabel: "Age key",
    note: "'2 - 3 Years' via the official web schedule key. Grid: Tue 10:00, 11:00; Wed 10:00; Thu 10:00; Fri 10:00, 11:00 (50 min; branch schedule, read 24 Nov 2026). Confirm availability with the branch.",
  });
  add({
    name: "Sports U4/5",
    category: "Multi-Sport",
    offering: "offered",
    age: {
      minMonths: 36,
      maxMonths: 60,
      level: "branch",
      verification: "provider-confirmed",
      providerAgeUrl: "https://www.rockstaracademy.com/lib/upload/files/club/LP_Schedule_Winter_2026_W5.pdf",
      sourceCheckedAt: "2026-11-24",
    },
    term: "19 Oct 2026 until 17 Jan 2027",
    noteUrl: "https://www.rockstaracademy.com/schedules-and-locations/lippo-mall-puri",
    noteLabel: "Age key",
    note: "'3 - 5 Years' via the official web schedule key; upper boundary ambiguous. Grid: Mon 13:00; Tue 15:00; Wed 11:00, 13:00; Thu 15:00; Fri 14:00; Sun 14:00 (50 min; branch schedule, read 24 Nov 2026). Confirm availability with the branch.",
  });
  add({
    name: "Tots Gym U4",
    category: "Gym & Movement",
    offering: "offered",
    age: {
      minMonths: 36,
      maxMonths: 48,
      level: "branch",
      verification: "provider-confirmed",
      providerAgeUrl: "https://www.rockstaracademy.com/lib/upload/files/club/LP_Schedule_Winter_2026_W5.pdf",
      sourceCheckedAt: "2026-11-24",
    },
    term: "19 Oct 2026 until 17 Jan 2027",
    noteUrl: "https://www.rockstaracademy.com/schedules-and-locations/lippo-mall-puri",
    noteLabel: "Age key",
    note: "PDF cell label 'Tots Gym U4'; numeric age via the official web schedule key ('3 - 4 Years'). Grid: Mon 11:00, 15:00; Tue 13:00; Wed 15:00; Thu 11:00, 13:00; Fri 15:00; Sat 12:00; Sun 13:00 (50 min; branch schedule, read 24 Nov 2026). Confirm availability with the branch.",
  });
  add({
    name: "Walker",
    category: "Gym & Movement",
    offering: "offered",
    age: {
      minMonths: 12,
      maxMonths: 23,
      level: "branch",
      verification: "provider-confirmed",
      providerAgeUrl: "https://www.rockstaracademy.com/lib/upload/files/club/LP_Schedule_Winter_2026_W5.pdf",
      sourceCheckedAt: "2026-11-24",
    },
    term: "19 Oct 2026 until 17 Jan 2027",
    note: "12-23 mo from the branch Winter term PDF class key. Grid: Mon 13:00; Tue 10:00; Wed 10:00; Thu 10:00; Fri 10:00; Sat 10:00 (50 min; branch schedule, read 24 Nov 2026). Confirm availability with the branch.",
  });
  }

  // ---- Lippo Plaza Ekalokasari ----
  {
  const v = venue(venues, "rockstar-academy-lippo-plaza-ekalokasari");
  v.lastCheckedAt = "2026-11-24";
  v.operatingStatus = { state: "official-listed", source: "https://www.rockstaracademy.com/schedules-and-locations/lippo-plaza-ekalokasari", checkedAt: "2026-11-24" };
  v.cardNote = "Term enrollment: 11-week terms (Winter: 19 Oct 2026 to 17 Jan 2027); registration required before class, no same-day signup; baby gymnastics up to 3 classes/week. Free trial class bookable on the official site (rockstaracademy.com/freetrial). Read 24 Nov 2026. / Kelas per term: 11 minggu per term (Winter: 19 Okt 2026 - 17 Jan 2027); wajib daftar sebelum kelas, tidak bisa daftar di hari yang sama; baby gym maksimal 3 kelas per minggu. Kelas trial gratis bisa dipesan di situs resmi. Dibaca 24 Nov 2026.";
  v.categories = ["Dance", "Gym & Movement", "Multi-Sport", "Preschool", "Swim"];
  const add = (p: VenueProgram) => {
    const i = v.programs.findIndex((x) => x.name === p.name || (p.name === "Baby Ballet" && x.name === "Baby (Ballet)"));
    if (i >= 0) v.programs[i] = { ...v.programs[i], ...p, name: v.programs[i].name, age: { ...v.programs[i].age, ...p.age } };
    else v.programs.push(p);
  };
  add({
    name: "Baby Ballet",
    category: "Dance",
    offering: "offered",
    age: {
      minMonths: 24,
      maxMonths: 36,
      level: "branch",
      verification: "provider-confirmed",
      providerAgeUrl: "https://www.rockstaracademy.com/lib/upload/files/club/LE_Schedule_Winter_2026_W5.pdf",
      sourceCheckedAt: "2026-11-24",
    },
    term: "19 Oct 2026 until 17 Jan 2027",
    noteUrl: "https://www.rockstaracademy.com/schedules-and-locations/lippo-plaza-ekalokasari",
    noteLabel: "Age key",
    note: "'2 - 3 Years' via the official web schedule key; year-boundary inclusivity ambiguous. Grid: Wed 10:30 (20 min; branch schedule, read 24 Nov 2026). Confirm availability with the branch.",
  });
  add({
    name: "Baby Dance",
    category: "Dance",
    offering: "offered",
    age: {
      minMonths: 12,
      maxMonths: 36,
      level: "branch",
      verification: "provider-confirmed",
      providerAgeUrl: "https://www.rockstaracademy.com/lib/upload/files/club/LE_Schedule_Winter_2026_W5.pdf",
      sourceCheckedAt: "2026-11-24",
    },
    term: "19 Oct 2026 until 17 Jan 2027",
    note: "'1-3 yrs' from the branch Winter term PDF class key; year-boundary inclusivity ambiguous. Grid: Mon 13:00; Tue 10:00, 11:00; Wed 11:00, 12:00; Thu 10:00; Fri 11:00; Sat 11:00 (50 min; branch schedule, read 24 Nov 2026). Confirm availability with the branch.",
  });
  add({
    name: "Baby Jam",
    category: "Gym & Movement",
    offering: "offered",
    age: {
      minMonths: 6,
      maxMonths: 18,
      level: "branch",
      verification: "provider-confirmed",
      providerAgeUrl: "https://www.rockstaracademy.com/lib/upload/files/club/LE_Schedule_Winter_2026_W5.pdf",
      sourceCheckedAt: "2026-11-24",
    },
    term: "19 Oct 2026 until 17 Jan 2027",
    note: "6-18 mo from the branch Winter term PDF class key. Grid: Sun 11:00 (30 min; branch schedule, read 24 Nov 2026). Confirm availability with the branch.",
  });
  add({
    name: "Crawler",
    category: "Gym & Movement",
    offering: "offered",
    age: {
      minMonths: 6,
      maxMonths: 18,
      level: "branch",
      verification: "provider-confirmed",
      providerAgeUrl: "https://www.rockstaracademy.com/lib/upload/files/club/LE_Schedule_Winter_2026_W5.pdf",
      sourceCheckedAt: "2026-11-24",
    },
    term: "19 Oct 2026 until 17 Jan 2027",
    note: "6-18 mo from the branch Winter term PDF class key. Grid: Tue 10:00; Thu 10:00; Sun 10:00 (50 min; branch schedule, read 24 Nov 2026). Confirm availability with the branch.",
  });
  add({
    name: "Jumper",
    category: "Gym & Movement",
    offering: "offered",
    age: {
      minMonths: 24,
      maxMonths: 35,
      level: "branch",
      verification: "provider-confirmed",
      providerAgeUrl: "https://www.rockstaracademy.com/lib/upload/files/club/LE_Schedule_Winter_2026_W5.pdf",
      sourceCheckedAt: "2026-11-24",
    },
    term: "19 Oct 2026 until 17 Jan 2027",
    note: "24-35 mo from the branch Winter term PDF class key. Grid: Mon 14:00; Tue 11:00; Wed 11:00; Thu 11:00; Fri 11:00; Sat 11:00 (50 min; branch schedule, read 24 Nov 2026). Confirm availability with the branch.",
  });
  add({
    name: "Learn & Play 1",
    category: "Preschool",
    offering: "offered",
    age: {
      minMonths: 6,
      maxMonths: 18,
      level: "branch",
      verification: "provider-confirmed",
      providerAgeUrl: "https://www.rockstaracademy.com/lib/upload/files/club/LE_Schedule_Winter_2026_W5.pdf",
      sourceCheckedAt: "2026-11-24",
    },
    term: "19 Oct 2026 until 17 Jan 2027",
    note: "6-18 mo from the branch Winter term PDF class key; Preschool & Kindergarten classes carry an additional fee per the PDF footer. Grid: Tue 09:00; Thu 09:00 (50 min; branch schedule, read 24 Nov 2026). Confirm availability with the branch.",
  });
  add({
    name: "Learn & Play 2",
    category: "Preschool",
    offering: "offered",
    age: {
      minMonths: 19,
      maxMonths: 35,
      level: "branch",
      verification: "provider-confirmed",
      providerAgeUrl: "https://www.rockstaracademy.com/lib/upload/files/club/LE_Schedule_Winter_2026_W5.pdf",
      sourceCheckedAt: "2026-11-24",
    },
    term: "19 Oct 2026 until 17 Jan 2027",
    note: "19-35 mo from the branch Winter term PDF class key; Preschool & Kindergarten classes carry an additional fee per the PDF footer. Grid: Tue 10:00; Wed 10:00; Thu 10:00 (50 min; branch schedule, read 24 Nov 2026). Confirm availability with the branch.",
  });
  add({
    name: "Move & Groove",
    category: "Dance",
    offering: "offered",
    age: {
      minMonths: 36,
      maxMonths: 60,
      level: "branch",
      verification: "provider-confirmed",
      providerAgeUrl: "https://www.rockstaracademy.com/lib/upload/files/club/LE_Schedule_Winter_2026_W5.pdf",
      sourceCheckedAt: "2026-11-24",
    },
    term: "19 Oct 2026 until 17 Jan 2027",
    noteUrl: "https://www.rockstaracademy.com/schedules-and-locations/lippo-plaza-ekalokasari",
    noteLabel: "Age key",
    note: "'3 - 5 Years' via the official web schedule key; upper boundary ambiguous. Grid: Mon 14:00; Tue 15:00; Wed 14:00; Thu 14:00; Fri 15:00; Sat 14:00; Sun 13:00 (50 min; branch schedule, read 24 Nov 2026). Confirm availability with the branch.",
  });
  add({
    name: "Pre-Ballet 3-5",
    category: "Dance",
    offering: "offered",
    age: {
      minMonths: 36,
      maxMonths: 60,
      level: "branch",
      verification: "provider-confirmed",
      providerAgeUrl: "https://www.rockstaracademy.com/lib/upload/files/club/LE_Schedule_Winter_2026_W5.pdf",
      sourceCheckedAt: "2026-11-24",
    },
    term: "19 Oct 2026 until 17 Jan 2027",
    noteUrl: "https://www.rockstaracademy.com/schedules-and-locations/lippo-plaza-ekalokasari",
    noteLabel: "Age key",
    note: "'3 - 5 Years' via the official web schedule key ('Pre-Ballet 1/2'); upper boundary ambiguous. Grid: Wed 15:00 (50 min; branch schedule, read 24 Nov 2026). Confirm availability with the branch.",
  });
  add({
    name: "Smartology 3",
    category: "Preschool",
    offering: "offered",
    age: {
      minMonths: 36,
      maxMonths: 48,
      level: "branch",
      verification: "provider-confirmed",
      providerAgeUrl: "https://www.rockstaracademy.com/lib/upload/files/club/LE_Schedule_Winter_2026_W5.pdf",
      sourceCheckedAt: "2026-11-24",
    },
    term: "19 Oct 2026 until 17 Jan 2027",
    note: "'3-4 yrs' from the branch Winter term PDF class key; upper-bound inclusivity ambiguous; additional fee per the PDF footer. Grid: Mon 11:00; Tue 11:00; Wed 11:00; Fri 11:00 (50 min; branch schedule, read 24 Nov 2026). Confirm availability with the branch.",
  });
  add({
    name: "Smartology 4",
    category: "Preschool",
    offering: "offered",
    age: {
      minMonths: 48,
      maxMonths: 59,
      level: "branch",
      verification: "provider-confirmed",
      providerAgeUrl: "https://www.rockstaracademy.com/lib/upload/files/club/LE_Schedule_Winter_2026_W5.pdf",
      sourceCheckedAt: "2026-11-24",
    },
    term: "19 Oct 2026 until 17 Jan 2027",
    note: "4-5 yrs from the dated branch PDF class key (updated 16 Nov 2026); the undated web schedule key shows a wider '3 - 6 Years' label, the dated PDF wins. Additional fee per the PDF footer. Grid: Mon 12:00; Tue 12:00; Wed 12:00; Thu 12:00; Fri 12:00 (110/115 min; branch schedule, read 24 Nov 2026). Confirm availability with the branch.",
  });
  add({
    name: "Sports U3",
    category: "Multi-Sport",
    offering: "offered",
    age: {
      minMonths: 24,
      maxMonths: 36,
      level: "branch",
      verification: "provider-confirmed",
      providerAgeUrl: "https://www.rockstaracademy.com/lib/upload/files/club/LE_Schedule_Winter_2026_W5.pdf",
      sourceCheckedAt: "2026-11-24",
    },
    term: "19 Oct 2026 until 17 Jan 2027",
    noteUrl: "https://www.rockstaracademy.com/schedules-and-locations/lippo-plaza-ekalokasari",
    noteLabel: "Age key",
    note: "'2 - 3 Years' via the official web schedule key. Grid: Tue 12:00; Wed 12:00; Thu 12:00; Fri 12:00; Sat 12:00 (50 min; branch schedule, read 24 Nov 2026). Confirm availability with the branch.",
  });
  add({
    name: "Sports U4/5",
    category: "Multi-Sport",
    offering: "offered",
    age: {
      minMonths: 36,
      maxMonths: 60,
      level: "branch",
      verification: "provider-confirmed",
      providerAgeUrl: "https://www.rockstaracademy.com/lib/upload/files/club/LE_Schedule_Winter_2026_W5.pdf",
      sourceCheckedAt: "2026-11-24",
    },
    term: "19 Oct 2026 until 17 Jan 2027",
    noteUrl: "https://www.rockstaracademy.com/schedules-and-locations/lippo-plaza-ekalokasari",
    noteLabel: "Age key",
    note: "'3 - 5 Years' via the official web schedule key; upper boundary ambiguous. Grid: Tue 13:00; Wed 13:00; Thu 13:00; Fri 14:00 (50 min; branch schedule, read 24 Nov 2026). Confirm availability with the branch.",
  });
  add({
    name: "Tots Gym U4",
    category: "Gym & Movement",
    offering: "offered",
    age: {
      minMonths: 36,
      maxMonths: 48,
      level: "branch",
      verification: "provider-confirmed",
      providerAgeUrl: "https://www.rockstaracademy.com/lib/upload/files/club/LE_Schedule_Winter_2026_W5.pdf",
      sourceCheckedAt: "2026-11-24",
    },
    term: "19 Oct 2026 until 17 Jan 2027",
    noteUrl: "https://www.rockstaracademy.com/schedules-and-locations/lippo-plaza-ekalokasari",
    noteLabel: "Age key",
    note: "PDF cell label 'Tots Gym U4'; numeric age via the official web schedule key ('3 - 4 Years'). Grid: Mon 15:00; Tue 14:00; Wed 13:00; Thu 13:00; Fri 13:00; Sat 13:00; Sun 14:00 (50 min; branch schedule, read 24 Nov 2026). Confirm availability with the branch.",
  });
  add({
    name: "TouchTennis 3-6 yrs",
    category: "Multi-Sport",
    offering: "offered",
    age: {
      minMonths: 36,
      maxMonths: 71,
      level: "branch",
      verification: "provider-confirmed",
      providerAgeUrl: "https://www.rockstaracademy.com/lib/upload/files/club/LE_Schedule_Winter_2026_W5.pdf",
      sourceCheckedAt: "2026-11-24",
    },
    term: "19 Oct 2026 until 17 Jan 2027",
    noteUrl: "https://www.rockstaracademy.com/schedules-and-locations/lippo-plaza-ekalokasari",
    noteLabel: "Age key",
    note: "'3 - 7 Years' via the official web schedule key; the class name says '3-6 yrs', the difference sits above the under-5 range. Confirm with the branch. Grid: Mon 15:00; Tue 16:00; Wed 14:00, 16:00; Thu 14:00; Fri 17:00; Sat 14:00; Sun 14:00 (55 min; branch schedule, read 24 Nov 2026). Confirm availability with the branch.",
  });
  add({
    name: "Walker",
    category: "Gym & Movement",
    offering: "offered",
    age: {
      minMonths: 12,
      maxMonths: 23,
      level: "branch",
      verification: "provider-confirmed",
      providerAgeUrl: "https://www.rockstaracademy.com/lib/upload/files/club/LE_Schedule_Winter_2026_W5.pdf",
      sourceCheckedAt: "2026-11-24",
    },
    term: "19 Oct 2026 until 17 Jan 2027",
    note: "12-23 mo from the branch Winter term PDF class key. Grid: Mon 12:00; Tue 12:00; Wed 10:00; Thu 12:00; Fri 10:00; Sat 10:00 (50 min; branch schedule, read 24 Nov 2026). Confirm availability with the branch.",
  });
  }

  // ---- Living World Alam Sutera ----
  {
  const v = venue(venues, "rockstar-academy-living-world-alam-sutera");
  v.lastCheckedAt = "2026-11-24";
  v.operatingStatus = { state: "official-listed", source: "https://www.rockstaracademy.com/schedules-and-locations/living-world", checkedAt: "2026-11-24" };
  v.cardNote = "Term enrollment: 11-week terms (Winter: 19 Oct 2026 to 17 Jan 2027); registration required before class, no same-day signup; baby gymnastics up to 3 classes/week. Free trial class bookable on the official site (rockstaracademy.com/freetrial). Read 24 Nov 2026. / Kelas per term: 11 minggu per term (Winter: 19 Okt 2026 - 17 Jan 2027); wajib daftar sebelum kelas, tidak bisa daftar di hari yang sama; baby gym maksimal 3 kelas per minggu. Kelas trial gratis bisa dipesan di situs resmi. Dibaca 24 Nov 2026.";
  v.categories = ["Dance", "Gym & Movement", "Multi-Sport", "Preschool", "Swim"];
  const add = (p: VenueProgram) => {
    const i = v.programs.findIndex((x) => x.name === p.name || (p.name === "Baby Ballet" && x.name === "Baby (Ballet)"));
    if (i >= 0) v.programs[i] = { ...v.programs[i], ...p, name: v.programs[i].name, age: { ...v.programs[i].age, ...p.age } };
    else v.programs.push(p);
  };
  add({
    name: "Baby Ballet",
    category: "Dance",
    offering: "offered",
    age: {
      minMonths: 24,
      maxMonths: 36,
      level: "branch",
      verification: "provider-confirmed",
      providerAgeUrl: "https://www.rockstaracademy.com/lib/upload/files/club/LW_Schedule_Winter_2026_W5.pdf",
      sourceCheckedAt: "2026-11-24",
    },
    term: "19 Oct 2026 until 17 Jan 2027",
    noteUrl: "https://www.rockstaracademy.com/schedules-and-locations/living-world",
    noteLabel: "Age key",
    note: "'2 - 3 Years' via the official web schedule key; year-boundary inclusivity ambiguous. Grid: Thu 13:00; Sat 12:00 (30 min; branch schedule, read 24 Nov 2026). Confirm availability with the branch.",
  });
  add({
    name: "Baby Dance",
    category: "Dance",
    offering: "offered",
    age: {
      minMonths: 12,
      maxMonths: 36,
      level: "branch",
      verification: "provider-confirmed",
      providerAgeUrl: "https://www.rockstaracademy.com/lib/upload/files/club/LW_Schedule_Winter_2026_W5.pdf",
      sourceCheckedAt: "2026-11-24",
    },
    term: "19 Oct 2026 until 17 Jan 2027",
    note: "'1-3 yrs' from the branch Winter term PDF class key; year-boundary inclusivity ambiguous. Grid: Mon 13:00; Tue 12:00, 12:00; Wed 10:00, 11:00; Thu 10:00; Fri 12:00; Sat 12:00; Sun 11:00 (50 min; branch schedule, read 24 Nov 2026). Confirm availability with the branch.",
  });
  add({
    name: "Baby Jam",
    category: "Gym & Movement",
    offering: "offered",
    age: {
      minMonths: 6,
      maxMonths: 18,
      level: "branch",
      verification: "provider-confirmed",
      providerAgeUrl: "https://www.rockstaracademy.com/lib/upload/files/club/LW_Schedule_Winter_2026_W5.pdf",
      sourceCheckedAt: "2026-11-24",
    },
    term: "19 Oct 2026 until 17 Jan 2027",
    note: "6-18 mo from the branch Winter term PDF class key. Grid: Tue 10:00 (30 min; branch schedule, read 24 Nov 2026). Confirm availability with the branch.",
  });
  add({
    name: "Crawler",
    category: "Gym & Movement",
    offering: "offered",
    age: {
      minMonths: 6,
      maxMonths: 18,
      level: "branch",
      verification: "provider-confirmed",
      providerAgeUrl: "https://www.rockstaracademy.com/lib/upload/files/club/LW_Schedule_Winter_2026_W5.pdf",
      sourceCheckedAt: "2026-11-24",
    },
    term: "19 Oct 2026 until 17 Jan 2027",
    note: "6-18 mo from the branch Winter term PDF class key. Grid: Thu 10:00; Sun 11:00 (50 min; branch schedule, read 24 Nov 2026). Confirm availability with the branch.",
  });
  add({
    name: "Jumper",
    category: "Gym & Movement",
    offering: "offered",
    age: {
      minMonths: 24,
      maxMonths: 35,
      level: "branch",
      verification: "provider-confirmed",
      providerAgeUrl: "https://www.rockstaracademy.com/lib/upload/files/club/LW_Schedule_Winter_2026_W5.pdf",
      sourceCheckedAt: "2026-11-24",
    },
    term: "19 Oct 2026 until 17 Jan 2027",
    note: "24-35 mo from the branch Winter term PDF class key. Grid: Mon 14:00; Tue 10:00, 11:00; Wed 10:00, 12:00; Thu 12:00; Fri 10:00; Sat 10:00 (50 min; branch schedule, read 24 Nov 2026). Confirm availability with the branch.",
  });
  add({
    name: "Learn & Play 1",
    category: "Preschool",
    offering: "offered",
    age: {
      minMonths: 6,
      maxMonths: 18,
      level: "branch",
      verification: "provider-confirmed",
      providerAgeUrl: "https://www.rockstaracademy.com/lib/upload/files/club/LW_Schedule_Winter_2026_W5.pdf",
      sourceCheckedAt: "2026-11-24",
    },
    term: "19 Oct 2026 until 17 Jan 2027",
    note: "6-18 mo from the branch Winter term PDF class key; Preschool & Kindergarten classes carry an additional fee per the PDF footer. Grid: Tue 09:00; Thu 09:00 (50 min; branch schedule, read 24 Nov 2026). Confirm availability with the branch.",
  });
  add({
    name: "Learn & Play 2",
    category: "Preschool",
    offering: "offered",
    age: {
      minMonths: 19,
      maxMonths: 35,
      level: "branch",
      verification: "provider-confirmed",
      providerAgeUrl: "https://www.rockstaracademy.com/lib/upload/files/club/LW_Schedule_Winter_2026_W5.pdf",
      sourceCheckedAt: "2026-11-24",
    },
    term: "19 Oct 2026 until 17 Jan 2027",
    note: "19-35 mo from the branch Winter term PDF class key; Preschool & Kindergarten classes carry an additional fee per the PDF footer. Grid: Tue 10:00, 11:00; Wed 10:00, 11:00; Thu 10:00, 11:00 (50 min; branch schedule, read 24 Nov 2026). Confirm availability with the branch.",
  });
  add({
    name: "Move & Groove",
    category: "Dance",
    offering: "offered",
    age: {
      minMonths: 36,
      maxMonths: 60,
      level: "branch",
      verification: "provider-confirmed",
      providerAgeUrl: "https://www.rockstaracademy.com/lib/upload/files/club/LW_Schedule_Winter_2026_W5.pdf",
      sourceCheckedAt: "2026-11-24",
    },
    term: "19 Oct 2026 until 17 Jan 2027",
    noteUrl: "https://www.rockstaracademy.com/schedules-and-locations/living-world",
    noteLabel: "Age key",
    note: "'3 - 5 Years' via the official web schedule key; upper boundary ambiguous. Grid: Mon 14:00; Tue 13:00; Wed 15:00; Thu 13:00; Fri 10:00, 11:00, 15:00; Sat 12:00; Sun 13:00 (50 min; branch schedule, read 24 Nov 2026). Confirm availability with the branch.",
  });
  add({
    name: "Pre-Ballet 3-5",
    category: "Dance",
    offering: "offered",
    age: {
      minMonths: 36,
      maxMonths: 60,
      level: "branch",
      verification: "provider-confirmed",
      providerAgeUrl: "https://www.rockstaracademy.com/lib/upload/files/club/LW_Schedule_Winter_2026_W5.pdf",
      sourceCheckedAt: "2026-11-24",
    },
    term: "19 Oct 2026 until 17 Jan 2027",
    noteUrl: "https://www.rockstaracademy.com/schedules-and-locations/living-world",
    noteLabel: "Age key",
    note: "'3 - 5 Years' via the official web schedule key ('Pre-Ballet 1/2'); upper boundary ambiguous. Grid: Tue 11:00; Wed 14:00; Thu 14:00; Sat 13:00 (50 min; branch schedule, read 24 Nov 2026). Confirm availability with the branch.",
  });
  add({
    name: "Smartology 3",
    category: "Preschool",
    offering: "offered",
    age: {
      minMonths: 36,
      maxMonths: 48,
      level: "branch",
      verification: "provider-confirmed",
      providerAgeUrl: "https://www.rockstaracademy.com/lib/upload/files/club/LW_Schedule_Winter_2026_W5.pdf",
      sourceCheckedAt: "2026-11-24",
    },
    term: "19 Oct 2026 until 17 Jan 2027",
    note: "'3-4 yrs' from the branch Winter term PDF class key; upper-bound inclusivity ambiguous; additional fee per the PDF footer. Grid: Mon 09:00, 11:00; Tue 09:00, 11:00; Wed 09:00, 11:00; Fri 09:00, 11:00 (50 min; branch schedule, read 24 Nov 2026). Confirm availability with the branch.",
  });
  add({
    name: "Smartology 4",
    category: "Preschool",
    offering: "offered",
    age: {
      minMonths: 48,
      maxMonths: 59,
      level: "branch",
      verification: "provider-confirmed",
      providerAgeUrl: "https://www.rockstaracademy.com/lib/upload/files/club/LW_Schedule_Winter_2026_W5.pdf",
      sourceCheckedAt: "2026-11-24",
    },
    term: "19 Oct 2026 until 17 Jan 2027",
    note: "4-5 yrs from the dated branch PDF class key (updated 16 Nov 2026); the undated web schedule key shows a wider '3 - 6 Years' label, the dated PDF wins. Additional fee per the PDF footer. Grid: Mon 12:00; Tue 12:00; Wed 12:00; Thu 12:00; Fri 12:00 (110 min; branch schedule, read 24 Nov 2026). Confirm availability with the branch.",
  });
  add({
    name: "Sports U3",
    category: "Multi-Sport",
    offering: "offered",
    age: {
      minMonths: 24,
      maxMonths: 36,
      level: "branch",
      verification: "provider-confirmed",
      providerAgeUrl: "https://www.rockstaracademy.com/lib/upload/files/club/LW_Schedule_Winter_2026_W5.pdf",
      sourceCheckedAt: "2026-11-24",
    },
    term: "19 Oct 2026 until 17 Jan 2027",
    noteUrl: "https://www.rockstaracademy.com/schedules-and-locations/living-world",
    noteLabel: "Age key",
    note: "'2 - 3 Years' via the official web schedule key. Grid: Mon 12:00; Tue 10:00, 11:00; Wed 13:00; Thu 10:00, 11:00; Sat 11:00 (50 min; branch schedule, read 24 Nov 2026). Confirm availability with the branch.",
  });
  add({
    name: "Sports U4/5",
    category: "Multi-Sport",
    offering: "offered",
    age: {
      minMonths: 36,
      maxMonths: 60,
      level: "branch",
      verification: "provider-confirmed",
      providerAgeUrl: "https://www.rockstaracademy.com/lib/upload/files/club/LW_Schedule_Winter_2026_W5.pdf",
      sourceCheckedAt: "2026-11-24",
    },
    term: "19 Oct 2026 until 17 Jan 2027",
    noteUrl: "https://www.rockstaracademy.com/schedules-and-locations/living-world",
    noteLabel: "Age key",
    note: "'3 - 5 Years' via the official web schedule key; upper boundary ambiguous. Grid: Mon 13:00; Tue 14:00, 14:00; Wed 10:00, 11:00; Thu 14:00; Sat 14:00 (50 min; branch schedule, read 24 Nov 2026). Confirm availability with the branch.",
  });
  add({
    name: "Tots Gym U4",
    category: "Gym & Movement",
    offering: "offered",
    age: {
      minMonths: 36,
      maxMonths: 48,
      level: "branch",
      verification: "provider-confirmed",
      providerAgeUrl: "https://www.rockstaracademy.com/lib/upload/files/club/LW_Schedule_Winter_2026_W5.pdf",
      sourceCheckedAt: "2026-11-24",
    },
    term: "19 Oct 2026 until 17 Jan 2027",
    noteUrl: "https://www.rockstaracademy.com/schedules-and-locations/living-world",
    noteLabel: "Age key",
    note: "PDF cell label 'Tots Gym U4'; numeric age via the official web schedule key ('3 - 4 Years'). Grid: Mon 10:00, 11:00, 15:00; Tue 12:00, 15:00; Wed 14:00; Thu 15:00; Fri 14:00; Sat 13:00; Sun 12:00 (50/55 min; branch schedule, read 24 Nov 2026). Confirm availability with the branch.",
  });
  add({
    name: "Walker",
    category: "Gym & Movement",
    offering: "offered",
    age: {
      minMonths: 12,
      maxMonths: 23,
      level: "branch",
      verification: "provider-confirmed",
      providerAgeUrl: "https://www.rockstaracademy.com/lib/upload/files/club/LW_Schedule_Winter_2026_W5.pdf",
      sourceCheckedAt: "2026-11-24",
    },
    term: "19 Oct 2026 until 17 Jan 2027",
    note: "12-23 mo from the branch Winter term PDF class key. Grid: Mon 13:00; Tue 13:00; Wed 11:00; Thu 11:00; Fri 11:00; Sat 11:00; Sun 10:00 (50 min; branch schedule, read 24 Nov 2026). Confirm availability with the branch.",
  });
  }

  // ---- Lotte Mart Bintaro ----
  {
  const v = venue(venues, "rockstar-academy-lotte-mart-bintaro");
  v.lastCheckedAt = "2026-11-24";
  v.operatingStatus = { state: "official-listed", source: "https://www.rockstaracademy.com/schedules-and-locations/lotte-mart-bintaro", checkedAt: "2026-11-24" };
  v.cardNote = "Term enrollment: 11-week terms (Winter: 19 Oct 2026 to 17 Jan 2027); registration required before class, no same-day signup; baby gymnastics up to 3 classes/week. Free trial class bookable on the official site (rockstaracademy.com/freetrial). Read 24 Nov 2026. / Kelas per term: 11 minggu per term (Winter: 19 Okt 2026 - 17 Jan 2027); wajib daftar sebelum kelas, tidak bisa daftar di hari yang sama; baby gym maksimal 3 kelas per minggu. Kelas trial gratis bisa dipesan di situs resmi. Dibaca 24 Nov 2026.";
  v.categories = ["Dance", "Gym & Movement", "Multi-Sport", "Preschool", "Swim"];
  const add = (p: VenueProgram) => {
    const i = v.programs.findIndex((x) => x.name === p.name || (p.name === "Baby Ballet" && x.name === "Baby (Ballet)"));
    if (i >= 0) v.programs[i] = { ...v.programs[i], ...p, name: v.programs[i].name, age: { ...v.programs[i].age, ...p.age } };
    else v.programs.push(p);
  };
  add({
    name: "Baby Ballet",
    category: "Dance",
    offering: "offered",
    age: {
      minMonths: 24,
      maxMonths: 36,
      level: "branch",
      verification: "provider-confirmed",
      providerAgeUrl: "https://www.rockstaracademy.com/lib/upload/files/club/LB_Schedule_Winter_2026_W5.pdf",
      sourceCheckedAt: "2026-11-24",
    },
    term: "19 Oct 2026 until 17 Jan 2027",
    noteUrl: "https://www.rockstaracademy.com/schedules-and-locations/lotte-mart-bintaro",
    noteLabel: "Age key",
    note: "'2 - 3 Years' via the official web schedule key; year-boundary inclusivity ambiguous. Grid: Tue 13:00; Wed 12:00; Fri 12:00; Sun 14:00 (30 min; branch schedule, read 24 Nov 2026). Confirm availability with the branch.",
  });
  add({
    name: "Baby Dance",
    category: "Dance",
    offering: "offered",
    age: {
      minMonths: 12,
      maxMonths: 36,
      level: "branch",
      verification: "provider-confirmed",
      providerAgeUrl: "https://www.rockstaracademy.com/lib/upload/files/club/LB_Schedule_Winter_2026_W5.pdf",
      sourceCheckedAt: "2026-11-24",
    },
    term: "19 Oct 2026 until 17 Jan 2027",
    note: "'1-3 yrs' from the branch Winter term PDF class key; year-boundary inclusivity ambiguous. Grid: Mon 13:00; Tue 11:00, 12:00; Wed 10:00, 11:00; Thu 11:00, 12:00; Fri 11:00; Sat 11:00, 11:00; Sun 12:00, 16:00 (50 min; branch schedule, read 24 Nov 2026). Confirm availability with the branch.",
  });
  add({
    name: "Baby Jam",
    category: "Gym & Movement",
    offering: "offered",
    age: {
      minMonths: 6,
      maxMonths: 18,
      level: "branch",
      verification: "provider-confirmed",
      providerAgeUrl: "https://www.rockstaracademy.com/lib/upload/files/club/LB_Schedule_Winter_2026_W5.pdf",
      sourceCheckedAt: "2026-11-24",
    },
    term: "19 Oct 2026 until 17 Jan 2027",
    note: "6-18 mo from the branch Winter term PDF class key. Grid: Tue 11:00; Sun 11:00 (30 min; branch schedule, read 24 Nov 2026). Confirm availability with the branch.",
  });
  add({
    name: "Crawler",
    category: "Gym & Movement",
    offering: "offered",
    age: {
      minMonths: 6,
      maxMonths: 18,
      level: "branch",
      verification: "provider-confirmed",
      providerAgeUrl: "https://www.rockstaracademy.com/lib/upload/files/club/LB_Schedule_Winter_2026_W5.pdf",
      sourceCheckedAt: "2026-11-24",
    },
    term: "19 Oct 2026 until 17 Jan 2027",
    note: "6-18 mo from the branch Winter term PDF class key. Grid: Tue 10:00; Fri 11:00; Sun 10:00 (50 min; branch schedule, read 24 Nov 2026). Confirm availability with the branch.",
  });
  add({
    name: "Jumper",
    category: "Gym & Movement",
    offering: "offered",
    age: {
      minMonths: 24,
      maxMonths: 35,
      level: "branch",
      verification: "provider-confirmed",
      providerAgeUrl: "https://www.rockstaracademy.com/lib/upload/files/club/LB_Schedule_Winter_2026_W5.pdf",
      sourceCheckedAt: "2026-11-24",
    },
    term: "19 Oct 2026 until 17 Jan 2027",
    note: "24-35 mo from the branch Winter term PDF class key. Grid: Mon 14:00; Tue 11:00, 12:00; Wed 11:00; Thu 11:00, 13:00; Fri 10:00, 14:00; Sat 10:00; Sun 15:00 (50 min; branch schedule, read 24 Nov 2026). Confirm availability with the branch.",
  });
  add({
    name: "Learn & Play 1",
    category: "Preschool",
    offering: "offered",
    age: {
      minMonths: 6,
      maxMonths: 18,
      level: "branch",
      verification: "provider-confirmed",
      providerAgeUrl: "https://www.rockstaracademy.com/lib/upload/files/club/LB_Schedule_Winter_2026_W5.pdf",
      sourceCheckedAt: "2026-11-24",
    },
    term: "19 Oct 2026 until 17 Jan 2027",
    note: "6-18 mo from the branch Winter term PDF class key; Preschool & Kindergarten classes carry an additional fee per the PDF footer. Grid: Tue 09:00; Thu 09:00 (50 min; branch schedule, read 24 Nov 2026). Confirm availability with the branch.",
  });
  add({
    name: "Learn & Play 2",
    category: "Preschool",
    offering: "offered",
    age: {
      minMonths: 19,
      maxMonths: 35,
      level: "branch",
      verification: "provider-confirmed",
      providerAgeUrl: "https://www.rockstaracademy.com/lib/upload/files/club/LB_Schedule_Winter_2026_W5.pdf",
      sourceCheckedAt: "2026-11-24",
    },
    term: "19 Oct 2026 until 17 Jan 2027",
    note: "19-35 mo from the branch Winter term PDF class key; Preschool & Kindergarten classes carry an additional fee per the PDF footer. Grid: Mon 11:00; Tue 10:00; Wed 10:00, 11:00; Thu 10:00; Fri 11:00 (50 min; branch schedule, read 24 Nov 2026). Confirm availability with the branch.",
  });
  add({
    name: "Move & Groove",
    category: "Dance",
    offering: "offered",
    age: {
      minMonths: 36,
      maxMonths: 60,
      level: "branch",
      verification: "provider-confirmed",
      providerAgeUrl: "https://www.rockstaracademy.com/lib/upload/files/club/LB_Schedule_Winter_2026_W5.pdf",
      sourceCheckedAt: "2026-11-24",
    },
    term: "19 Oct 2026 until 17 Jan 2027",
    noteUrl: "https://www.rockstaracademy.com/schedules-and-locations/lotte-mart-bintaro",
    noteLabel: "Age key",
    note: "'3 - 5 Years' via the official web schedule key; upper boundary ambiguous. Grid: Mon 15:00; Tue 14:00; Wed 13:00; Thu 13:00; Fri 14:00; Sat 12:00; Sun 13:00 (50 min; branch schedule, read 24 Nov 2026). Confirm availability with the branch.",
  });
  add({
    name: "Pre-Ballet 3-5",
    category: "Dance",
    offering: "offered",
    age: {
      minMonths: 36,
      maxMonths: 60,
      level: "branch",
      verification: "provider-confirmed",
      providerAgeUrl: "https://www.rockstaracademy.com/lib/upload/files/club/LB_Schedule_Winter_2026_W5.pdf",
      sourceCheckedAt: "2026-11-24",
    },
    term: "19 Oct 2026 until 17 Jan 2027",
    noteUrl: "https://www.rockstaracademy.com/schedules-and-locations/lotte-mart-bintaro",
    noteLabel: "Age key",
    note: "'3 - 5 Years' via the official web schedule key ('Pre-Ballet 1/2'); upper boundary ambiguous. Grid: Mon 14:00; Tue 14:00; Wed 14:00, 15:00; Fri 13:00, 14:00; Sun 12:00 (50 min; branch schedule, read 24 Nov 2026). Confirm availability with the branch.",
  });
  add({
    name: "Smartology 3",
    category: "Preschool",
    offering: "offered",
    age: {
      minMonths: 36,
      maxMonths: 48,
      level: "branch",
      verification: "provider-confirmed",
      providerAgeUrl: "https://www.rockstaracademy.com/lib/upload/files/club/LB_Schedule_Winter_2026_W5.pdf",
      sourceCheckedAt: "2026-11-24",
    },
    term: "19 Oct 2026 until 17 Jan 2027",
    note: "'3-4 yrs' from the branch Winter term PDF class key; upper-bound inclusivity ambiguous; additional fee per the PDF footer. Grid: Mon 09:00, 11:00; Tue 11:00; Wed 09:00, 11:00; Thu 09:00; Fri 09:00, 11:00 (50 min; branch schedule, read 24 Nov 2026). Confirm availability with the branch.",
  });
  add({
    name: "Smartology 4",
    category: "Preschool",
    offering: "offered",
    age: {
      minMonths: 48,
      maxMonths: 59,
      level: "branch",
      verification: "provider-confirmed",
      providerAgeUrl: "https://www.rockstaracademy.com/lib/upload/files/club/LB_Schedule_Winter_2026_W5.pdf",
      sourceCheckedAt: "2026-11-24",
    },
    term: "19 Oct 2026 until 17 Jan 2027",
    note: "4-5 yrs from the dated branch PDF class key (updated 16 Nov 2026); the undated web schedule key shows a wider '3 - 6 Years' label, the dated PDF wins. Additional fee per the PDF footer. Grid: Mon 12:00; Tue 12:00; Wed 12:00; Thu 12:00; Fri 12:00 (115 min; branch schedule, read 24 Nov 2026). Confirm availability with the branch.",
  });
  add({
    name: "Sports U3",
    category: "Multi-Sport",
    offering: "offered",
    age: {
      minMonths: 24,
      maxMonths: 36,
      level: "branch",
      verification: "provider-confirmed",
      providerAgeUrl: "https://www.rockstaracademy.com/lib/upload/files/club/LB_Schedule_Winter_2026_W5.pdf",
      sourceCheckedAt: "2026-11-24",
    },
    term: "19 Oct 2026 until 17 Jan 2027",
    noteUrl: "https://www.rockstaracademy.com/schedules-and-locations/lotte-mart-bintaro",
    noteLabel: "Age key",
    note: "'2 - 3 Years' via the official web schedule key. Grid: Tue 11:00, 12:00; Wed 11:00, 12:00; Thu 12:00; Fri 11:00; Sat 12:00 (50 min; branch schedule, read 24 Nov 2026). Confirm availability with the branch.",
  });
  add({
    name: "Sports U4/5",
    category: "Multi-Sport",
    offering: "offered",
    age: {
      minMonths: 36,
      maxMonths: 60,
      level: "branch",
      verification: "provider-confirmed",
      providerAgeUrl: "https://www.rockstaracademy.com/lib/upload/files/club/LB_Schedule_Winter_2026_W5.pdf",
      sourceCheckedAt: "2026-11-24",
    },
    term: "19 Oct 2026 until 17 Jan 2027",
    noteUrl: "https://www.rockstaracademy.com/schedules-and-locations/lotte-mart-bintaro",
    noteLabel: "Age key",
    note: "'3 - 5 Years' via the official web schedule key; upper boundary ambiguous. Grid: Mon 10:00, 14:00; Tue 13:00, 14:00; Wed 13:00; Thu 14:00; Fri 15:00; Sat 10:00 (50 min; branch schedule, read 24 Nov 2026). Confirm availability with the branch.",
  });
  add({
    name: "Tots Gym U4",
    category: "Gym & Movement",
    offering: "offered",
    age: {
      minMonths: 36,
      maxMonths: 48,
      level: "branch",
      verification: "provider-confirmed",
      providerAgeUrl: "https://www.rockstaracademy.com/lib/upload/files/club/LB_Schedule_Winter_2026_W5.pdf",
      sourceCheckedAt: "2026-11-24",
    },
    term: "19 Oct 2026 until 17 Jan 2027",
    noteUrl: "https://www.rockstaracademy.com/schedules-and-locations/lotte-mart-bintaro",
    noteLabel: "Age key",
    note: "PDF cell label 'Tots Gym U4'; numeric age via the official web schedule key ('3 - 4 Years'). Grid: Mon 11:00, 15:00; Tue 14:00; Wed 14:00; Thu 15:00; Fri 13:00; Sat 11:00; Sun 14:00 (50 min; branch schedule, read 24 Nov 2026). Confirm availability with the branch.",
  });
  add({
    name: "TouchTennis 3-6 yrs",
    category: "Multi-Sport",
    offering: "offered",
    age: {
      minMonths: 36,
      maxMonths: 71,
      level: "branch",
      verification: "provider-confirmed",
      providerAgeUrl: "https://www.rockstaracademy.com/lib/upload/files/club/LB_Schedule_Winter_2026_W5.pdf",
      sourceCheckedAt: "2026-11-24",
    },
    term: "19 Oct 2026 until 17 Jan 2027",
    noteUrl: "https://www.rockstaracademy.com/schedules-and-locations/lotte-mart-bintaro",
    noteLabel: "Age key",
    note: "'3 - 7 Years' via the official web schedule key; the class name says '3-6 yrs', the difference sits above the under-5 range. Confirm with the branch. Grid: Mon 14:00, 15:00; Tue 13:00, 14:00; Wed 13:00, 14:00; Thu 13:00, 15:00; Fri 14:00, 15:00, 16:00; Sat 13:00; Sun 14:00 (55 min; branch schedule, read 24 Nov 2026). Confirm availability with the branch.",
  });
  add({
    name: "Walker",
    category: "Gym & Movement",
    offering: "offered",
    age: {
      minMonths: 12,
      maxMonths: 23,
      level: "branch",
      verification: "provider-confirmed",
      providerAgeUrl: "https://www.rockstaracademy.com/lib/upload/files/club/LB_Schedule_Winter_2026_W5.pdf",
      sourceCheckedAt: "2026-11-24",
    },
    term: "19 Oct 2026 until 17 Jan 2027",
    note: "12-23 mo from the branch Winter term PDF class key. Grid: Tue 13:00; Wed 10:00; Thu 10:00; Fri 12:00; Sun 11:00 (50 min; branch schedule, read 24 Nov 2026). Confirm availability with the branch.",
  });
  }

  // ---- Mall of Indonesia ----
  {
  const v = venue(venues, "rockstar-academy-mall-of-indonesia");
  v.lastCheckedAt = "2026-11-24";
  v.operatingStatus = { state: "official-listed", source: "https://www.rockstaracademy.com/schedules-and-locations/mall-of-indonesia", checkedAt: "2026-11-24" };
  v.cardNote = "Term enrollment: 11-week terms (Winter: 19 Oct 2026 to 17 Jan 2027); registration required before class, no same-day signup; baby gymnastics up to 3 classes/week. Free trial class bookable on the official site (rockstaracademy.com/freetrial). Read 24 Nov 2026. / Kelas per term: 11 minggu per term (Winter: 19 Okt 2026 - 17 Jan 2027); wajib daftar sebelum kelas, tidak bisa daftar di hari yang sama; baby gym maksimal 3 kelas per minggu. Kelas trial gratis bisa dipesan di situs resmi. Dibaca 24 Nov 2026.";
  v.categories = ["Dance", "Gym & Movement", "Multi-Sport", "Preschool", "Swim"];
  const add = (p: VenueProgram) => {
    const i = v.programs.findIndex((x) => x.name === p.name || (p.name === "Baby Ballet" && x.name === "Baby (Ballet)"));
    if (i >= 0) v.programs[i] = { ...v.programs[i], ...p, name: v.programs[i].name, age: { ...v.programs[i].age, ...p.age } };
    else v.programs.push(p);
  };
  add({
    name: "Baby Ballet",
    category: "Dance",
    offering: "offered",
    age: {
      minMonths: 24,
      maxMonths: 36,
      level: "branch",
      verification: "provider-confirmed",
      providerAgeUrl: "https://www.rockstaracademy.com/lib/upload/files/club/MI_Schedule_WInter_2026_Week_5.pdf",
      sourceCheckedAt: "2026-11-24",
    },
    term: "19 Oct 2026 until 17 Jan 2027",
    noteUrl: "https://www.rockstaracademy.com/schedules-and-locations/mall-of-indonesia",
    noteLabel: "Age key",
    note: "'2 - 3 Years' via the official web schedule key; year-boundary inclusivity ambiguous. Grid: Tue 12:00; Sat 11:00 (30 min; branch schedule, read 24 Nov 2026). Confirm availability with the branch.",
  });
  add({
    name: "Baby Dance",
    category: "Dance",
    offering: "offered",
    age: {
      minMonths: 12,
      maxMonths: 36,
      level: "branch",
      verification: "provider-confirmed",
      providerAgeUrl: "https://www.rockstaracademy.com/lib/upload/files/club/MI_Schedule_WInter_2026_Week_5.pdf",
      sourceCheckedAt: "2026-11-24",
    },
    term: "19 Oct 2026 until 17 Jan 2027",
    note: "'1-3 yrs' from the branch Winter term PDF class key; year-boundary inclusivity ambiguous. Grid: Mon 13:00, 14:00; Tue 11:00, 11:00; Wed 11:00, 12:00; Thu 10:00, 11:00, 12:00; Fri 11:00, 12:00; Sat 11:00, 12:00 (50 min; branch schedule, read 24 Nov 2026). Confirm availability with the branch.",
  });
  add({
    name: "Baby Jam",
    category: "Gym & Movement",
    offering: "offered",
    age: {
      minMonths: 6,
      maxMonths: 18,
      level: "branch",
      verification: "provider-confirmed",
      providerAgeUrl: "https://www.rockstaracademy.com/lib/upload/files/club/MI_Schedule_WInter_2026_Week_5.pdf",
      sourceCheckedAt: "2026-11-24",
    },
    term: "19 Oct 2026 until 17 Jan 2027",
    note: "6-18 mo from the branch Winter term PDF class key. Grid: Tue 10:00 (30 min; branch schedule, read 24 Nov 2026). Confirm availability with the branch.",
  });
  add({
    name: "Crawler",
    category: "Gym & Movement",
    offering: "offered",
    age: {
      minMonths: 6,
      maxMonths: 18,
      level: "branch",
      verification: "provider-confirmed",
      providerAgeUrl: "https://www.rockstaracademy.com/lib/upload/files/club/MI_Schedule_WInter_2026_Week_5.pdf",
      sourceCheckedAt: "2026-11-24",
    },
    term: "19 Oct 2026 until 17 Jan 2027",
    note: "6-18 mo from the branch Winter term PDF class key. Grid: Tue 11:00; Wed 10:00; Thu 10:00 (50 min; branch schedule, read 24 Nov 2026). Confirm availability with the branch.",
  });
  add({
    name: "Jumper",
    category: "Gym & Movement",
    offering: "offered",
    age: {
      minMonths: 24,
      maxMonths: 35,
      level: "branch",
      verification: "provider-confirmed",
      providerAgeUrl: "https://www.rockstaracademy.com/lib/upload/files/club/MI_Schedule_WInter_2026_Week_5.pdf",
      sourceCheckedAt: "2026-11-24",
    },
    term: "19 Oct 2026 until 17 Jan 2027",
    note: "24-35 mo from the branch Winter term PDF class key. Grid: Mon 14:00; Tue 09:00, 10:00; Wed 12:00; Thu 09:00, 11:00; Fri 10:00, 12:00; Sat 10:00 (50 min; branch schedule, read 24 Nov 2026). Confirm availability with the branch.",
  });
  add({
    name: "Learn & Play 1",
    category: "Preschool",
    offering: "offered",
    age: {
      minMonths: 6,
      maxMonths: 18,
      level: "branch",
      verification: "provider-confirmed",
      providerAgeUrl: "https://www.rockstaracademy.com/lib/upload/files/club/MI_Schedule_WInter_2026_Week_5.pdf",
      sourceCheckedAt: "2026-11-24",
    },
    term: "19 Oct 2026 until 17 Jan 2027",
    note: "6-18 mo from the branch Winter term PDF class key; Preschool & Kindergarten classes carry an additional fee per the PDF footer. Grid: Tue 09:00; Thu 09:00 (50 min; branch schedule, read 24 Nov 2026). Confirm availability with the branch.",
  });
  add({
    name: "Learn & Play 2",
    category: "Preschool",
    offering: "offered",
    age: {
      minMonths: 19,
      maxMonths: 35,
      level: "branch",
      verification: "provider-confirmed",
      providerAgeUrl: "https://www.rockstaracademy.com/lib/upload/files/club/MI_Schedule_WInter_2026_Week_5.pdf",
      sourceCheckedAt: "2026-11-24",
    },
    term: "19 Oct 2026 until 17 Jan 2027",
    note: "19-35 mo from the branch Winter term PDF class key; Preschool & Kindergarten classes carry an additional fee per the PDF footer. Grid: Tue 09:00, 10:00; Wed 09:00, 10:00; Thu 09:00, 10:00 (50/55 min; branch schedule, read 24 Nov 2026). Confirm availability with the branch.",
  });
  add({
    name: "Move & Groove",
    category: "Dance",
    offering: "offered",
    age: {
      minMonths: 36,
      maxMonths: 60,
      level: "branch",
      verification: "provider-confirmed",
      providerAgeUrl: "https://www.rockstaracademy.com/lib/upload/files/club/MI_Schedule_WInter_2026_Week_5.pdf",
      sourceCheckedAt: "2026-11-24",
    },
    term: "19 Oct 2026 until 17 Jan 2027",
    noteUrl: "https://www.rockstaracademy.com/schedules-and-locations/mall-of-indonesia",
    noteLabel: "Age key",
    note: "'3 - 5 Years' via the official web schedule key; upper boundary ambiguous. Grid: Mon 16:00; Tue 13:00, 13:00; Wed 14:00; Thu 14:00; Fri 14:00; Sat 12:00; Sun 13:00 (50 min; branch schedule, read 24 Nov 2026). Confirm availability with the branch.",
  });
  add({
    name: "Pre-Ballet 3-5",
    category: "Dance",
    offering: "offered",
    age: {
      minMonths: 36,
      maxMonths: 60,
      level: "branch",
      verification: "provider-confirmed",
      providerAgeUrl: "https://www.rockstaracademy.com/lib/upload/files/club/MI_Schedule_WInter_2026_Week_5.pdf",
      sourceCheckedAt: "2026-11-24",
    },
    term: "19 Oct 2026 until 17 Jan 2027",
    noteUrl: "https://www.rockstaracademy.com/schedules-and-locations/mall-of-indonesia",
    noteLabel: "Age key",
    note: "'3 - 5 Years' via the official web schedule key ('Pre-Ballet 1/2'); upper boundary ambiguous. Grid: Tue 14:00; Fri 13:00; Sat 13:00 (50 min; branch schedule, read 24 Nov 2026). Confirm availability with the branch.",
  });
  add({
    name: "Smartology 3",
    category: "Preschool",
    offering: "offered",
    age: {
      minMonths: 36,
      maxMonths: 48,
      level: "branch",
      verification: "provider-confirmed",
      providerAgeUrl: "https://www.rockstaracademy.com/lib/upload/files/club/MI_Schedule_WInter_2026_Week_5.pdf",
      sourceCheckedAt: "2026-11-24",
    },
    term: "19 Oct 2026 until 17 Jan 2027",
    note: "'3-4 yrs' from the branch Winter term PDF class key; upper-bound inclusivity ambiguous; additional fee per the PDF footer. Grid: Mon 10:00, 11:00; Tue 11:00; Wed 11:00, 13:00; Thu 11:00; Fri 10:00, 11:00 (50/55 min; branch schedule, read 24 Nov 2026). Confirm availability with the branch.",
  });
  add({
    name: "Smartology 4",
    category: "Preschool",
    offering: "offered",
    age: {
      minMonths: 48,
      maxMonths: 59,
      level: "branch",
      verification: "provider-confirmed",
      providerAgeUrl: "https://www.rockstaracademy.com/lib/upload/files/club/MI_Schedule_WInter_2026_Week_5.pdf",
      sourceCheckedAt: "2026-11-24",
    },
    term: "19 Oct 2026 until 17 Jan 2027",
    note: "4-5 yrs from the dated branch PDF class key (updated 16 Nov 2026); the undated web schedule key shows a wider '3 - 6 Years' label, the dated PDF wins. Additional fee per the PDF footer. Grid: Mon 12:00; Tue 12:00; Wed 12:00; Thu 12:00; Fri 12:00 (115 min; branch schedule, read 24 Nov 2026). Confirm availability with the branch.",
  });
  add({
    name: "Sports U3",
    category: "Multi-Sport",
    offering: "offered",
    age: {
      minMonths: 24,
      maxMonths: 36,
      level: "branch",
      verification: "provider-confirmed",
      providerAgeUrl: "https://www.rockstaracademy.com/lib/upload/files/club/MI_Schedule_WInter_2026_Week_5.pdf",
      sourceCheckedAt: "2026-11-24",
    },
    term: "19 Oct 2026 until 17 Jan 2027",
    noteUrl: "https://www.rockstaracademy.com/schedules-and-locations/mall-of-indonesia",
    noteLabel: "Age key",
    note: "'2 - 3 Years' via the official web schedule key. Grid: Mon 15:00; Tue 10:00, 11:00; Wed 10:00, 11:00; Thu 11:00, 12:00; Fri 11:00, 13:00; Sat 12:00 (50 min; branch schedule, read 24 Nov 2026). Confirm availability with the branch.",
  });
  add({
    name: "Sports U4/5",
    category: "Multi-Sport",
    offering: "offered",
    age: {
      minMonths: 36,
      maxMonths: 60,
      level: "branch",
      verification: "provider-confirmed",
      providerAgeUrl: "https://www.rockstaracademy.com/lib/upload/files/club/MI_Schedule_WInter_2026_Week_5.pdf",
      sourceCheckedAt: "2026-11-24",
    },
    term: "19 Oct 2026 until 17 Jan 2027",
    noteUrl: "https://www.rockstaracademy.com/schedules-and-locations/mall-of-indonesia",
    noteLabel: "Age key",
    note: "'3 - 5 Years' via the official web schedule key; upper boundary ambiguous. Grid: Mon 13:00, 16:00; Tue 14:00; Wed 13:00; Thu 13:00; Sun 12:00 (50 min; branch schedule, read 24 Nov 2026). Confirm availability with the branch.",
  });
  add({
    name: "Tots Gym U4",
    category: "Gym & Movement",
    offering: "offered",
    age: {
      minMonths: 36,
      maxMonths: 48,
      level: "branch",
      verification: "provider-confirmed",
      providerAgeUrl: "https://www.rockstaracademy.com/lib/upload/files/club/MI_Schedule_WInter_2026_Week_5.pdf",
      sourceCheckedAt: "2026-11-24",
    },
    term: "19 Oct 2026 until 17 Jan 2027",
    noteUrl: "https://www.rockstaracademy.com/schedules-and-locations/mall-of-indonesia",
    noteLabel: "Age key",
    note: "PDF cell label 'Tots Gym U4'; numeric age via the official web schedule key ('3 - 4 Years'). Grid: Mon 11:00, 15:00; Wed 13:00, 15:00; Thu 13:00, 15:00; Fri 13:00; Sat 11:00; Sun 14:00 (50 min; branch schedule, read 24 Nov 2026). Confirm availability with the branch.",
  });
  add({
    name: "Walker",
    category: "Gym & Movement",
    offering: "offered",
    age: {
      minMonths: 12,
      maxMonths: 23,
      level: "branch",
      verification: "provider-confirmed",
      providerAgeUrl: "https://www.rockstaracademy.com/lib/upload/files/club/MI_Schedule_WInter_2026_Week_5.pdf",
      sourceCheckedAt: "2026-11-24",
    },
    term: "19 Oct 2026 until 17 Jan 2027",
    note: "12-23 mo from the branch Winter term PDF class key. Grid: Mon 10:00, 13:00; Tue 12:00; Wed 11:00; Thu 12:00; Fri 11:00; Sat 13:00 (50 min; branch schedule, read 24 Nov 2026). Confirm availability with the branch.",
  });
  }

  // ---- PIK Avenue ----
  {
  const v = venue(venues, "rockstar-academy-pik-avenue");
  v.lastCheckedAt = "2026-11-24";
  v.operatingStatus = { state: "official-listed", source: "https://www.rockstaracademy.com/schedules-and-locations/pik-avenue", checkedAt: "2026-11-24" };
  v.cardNote = "Term enrollment: 11-week terms (Winter: 19 Oct 2026 to 17 Jan 2027); registration required before class, no same-day signup; baby gymnastics up to 3 classes/week. Free trial class bookable on the official site (rockstaracademy.com/freetrial). Read 24 Nov 2026. / Kelas per term: 11 minggu per term (Winter: 19 Okt 2026 - 17 Jan 2027); wajib daftar sebelum kelas, tidak bisa daftar di hari yang sama; baby gym maksimal 3 kelas per minggu. Kelas trial gratis bisa dipesan di situs resmi. Dibaca 24 Nov 2026.";
  v.categories = ["Dance", "Gym & Movement", "Multi-Sport", "Preschool", "Swim"];
  const add = (p: VenueProgram) => {
    const i = v.programs.findIndex((x) => x.name === p.name || (p.name === "Baby Ballet" && x.name === "Baby (Ballet)"));
    if (i >= 0) v.programs[i] = { ...v.programs[i], ...p, name: v.programs[i].name, age: { ...v.programs[i].age, ...p.age } };
    else v.programs.push(p);
  };
  add({
    name: "Baby Ballet",
    category: "Dance",
    offering: "offered",
    age: {
      minMonths: 24,
      maxMonths: 36,
      level: "branch",
      verification: "provider-confirmed",
      providerAgeUrl: "https://www.rockstaracademy.com/lib/upload/files/club/PA_Schedule_Winter_2026_W5.pdf",
      sourceCheckedAt: "2026-11-24",
    },
    term: "19 Oct 2026 until 17 Jan 2027",
    noteUrl: "https://www.rockstaracademy.com/schedules-and-locations/pik-avenue",
    noteLabel: "Age key",
    note: "'2 - 3 Years' via the official web schedule key; year-boundary inclusivity ambiguous. Grid: Tue 12:00; Fri 12:00 (30 min; branch schedule, read 24 Nov 2026). Confirm availability with the branch.",
  });
  add({
    name: "Baby Dance",
    category: "Dance",
    offering: "offered",
    age: {
      minMonths: 12,
      maxMonths: 36,
      level: "branch",
      verification: "provider-confirmed",
      providerAgeUrl: "https://www.rockstaracademy.com/lib/upload/files/club/PA_Schedule_Winter_2026_W5.pdf",
      sourceCheckedAt: "2026-11-24",
    },
    term: "19 Oct 2026 until 17 Jan 2027",
    note: "'1-3 yrs' from the branch Winter term PDF class key; year-boundary inclusivity ambiguous. Grid: Mon 13:00; Tue 13:00; Wed 11:00, 12:00; Thu 11:00, 12:00; Fri 10:00, 11:00; Sat 11:00 (50 min; branch schedule, read 24 Nov 2026). Confirm availability with the branch.",
  });
  add({
    name: "Crawler",
    category: "Gym & Movement",
    offering: "offered",
    age: {
      minMonths: 6,
      maxMonths: 18,
      level: "branch",
      verification: "provider-confirmed",
      providerAgeUrl: "https://www.rockstaracademy.com/lib/upload/files/club/PA_Schedule_Winter_2026_W5.pdf",
      sourceCheckedAt: "2026-11-24",
    },
    term: "19 Oct 2026 until 17 Jan 2027",
    note: "6-18 mo from the branch Winter term PDF class key. Grid: Tue 10:00; Thu 10:00 (50 min; branch schedule, read 24 Nov 2026). Confirm availability with the branch.",
  });
  add({
    name: "Jumper",
    category: "Gym & Movement",
    offering: "offered",
    age: {
      minMonths: 24,
      maxMonths: 35,
      level: "branch",
      verification: "provider-confirmed",
      providerAgeUrl: "https://www.rockstaracademy.com/lib/upload/files/club/PA_Schedule_Winter_2026_W5.pdf",
      sourceCheckedAt: "2026-11-24",
    },
    term: "19 Oct 2026 until 17 Jan 2027",
    note: "24-35 mo from the branch Winter term PDF class key. Grid: Mon 14:00; Tue 11:00, 11:00; Wed 11:00, 11:00; Thu 13:00; Fri 11:00, 11:00; Sat 12:00 (50 min; branch schedule, read 24 Nov 2026). Confirm availability with the branch.",
  });
  add({
    name: "Learn & Play 1",
    category: "Preschool",
    offering: "offered",
    age: {
      minMonths: 6,
      maxMonths: 18,
      level: "branch",
      verification: "provider-confirmed",
      providerAgeUrl: "https://www.rockstaracademy.com/lib/upload/files/club/PA_Schedule_Winter_2026_W5.pdf",
      sourceCheckedAt: "2026-11-24",
    },
    term: "19 Oct 2026 until 17 Jan 2027",
    note: "6-18 mo from the branch Winter term PDF class key; Preschool & Kindergarten classes carry an additional fee per the PDF footer. Grid: Tue 09:00; Wed 09:00; Thu 09:00; Fri 09:00 (50 min; branch schedule, read 24 Nov 2026). Confirm availability with the branch.",
  });
  add({
    name: "Learn & Play 2",
    category: "Preschool",
    offering: "offered",
    age: {
      minMonths: 19,
      maxMonths: 35,
      level: "branch",
      verification: "provider-confirmed",
      providerAgeUrl: "https://www.rockstaracademy.com/lib/upload/files/club/PA_Schedule_Winter_2026_W5.pdf",
      sourceCheckedAt: "2026-11-24",
    },
    term: "19 Oct 2026 until 17 Jan 2027",
    note: "19-35 mo from the branch Winter term PDF class key; Preschool & Kindergarten classes carry an additional fee per the PDF footer. Grid: Mon 11:00; Tue 10:00, 11:00; Wed 10:00; Thu 10:00, 11:00 (50 min; branch schedule, read 24 Nov 2026). Confirm availability with the branch.",
  });
  add({
    name: "Move & Groove",
    category: "Dance",
    offering: "offered",
    age: {
      minMonths: 36,
      maxMonths: 60,
      level: "branch",
      verification: "provider-confirmed",
      providerAgeUrl: "https://www.rockstaracademy.com/lib/upload/files/club/PA_Schedule_Winter_2026_W5.pdf",
      sourceCheckedAt: "2026-11-24",
    },
    term: "19 Oct 2026 until 17 Jan 2027",
    noteUrl: "https://www.rockstaracademy.com/schedules-and-locations/pik-avenue",
    noteLabel: "Age key",
    note: "'3 - 5 Years' via the official web schedule key; upper boundary ambiguous. Grid: Mon 14:00; Tue 14:00; Wed 15:00; Thu 15:00; Fri 13:00; Sat 13:00 (50 min; branch schedule, read 24 Nov 2026). Confirm availability with the branch.",
  });
  add({
    name: "Pre-Ballet 3-5",
    category: "Dance",
    offering: "offered",
    age: {
      minMonths: 36,
      maxMonths: 60,
      level: "branch",
      verification: "provider-confirmed",
      providerAgeUrl: "https://www.rockstaracademy.com/lib/upload/files/club/PA_Schedule_Winter_2026_W5.pdf",
      sourceCheckedAt: "2026-11-24",
    },
    term: "19 Oct 2026 until 17 Jan 2027",
    noteUrl: "https://www.rockstaracademy.com/schedules-and-locations/pik-avenue",
    noteLabel: "Age key",
    note: "'3 - 5 Years' via the official web schedule key ('Pre-Ballet 1/2'); upper boundary ambiguous. Grid: Tue 15:00; Fri 15:00 (50 min; branch schedule, read 24 Nov 2026). Confirm availability with the branch.",
  });
  add({
    name: "Smartology 3",
    category: "Preschool",
    offering: "offered",
    age: {
      minMonths: 36,
      maxMonths: 48,
      level: "branch",
      verification: "provider-confirmed",
      providerAgeUrl: "https://www.rockstaracademy.com/lib/upload/files/club/PA_Schedule_Winter_2026_W5.pdf",
      sourceCheckedAt: "2026-11-24",
    },
    term: "19 Oct 2026 until 17 Jan 2027",
    note: "'3-4 yrs' from the branch Winter term PDF class key; upper-bound inclusivity ambiguous; additional fee per the PDF footer. Grid: Mon 11:00; Tue 11:00; Wed 11:00; Fri 11:00 (50 min; branch schedule, read 24 Nov 2026). Confirm availability with the branch.",
  });
  add({
    name: "Smartology 4",
    category: "Preschool",
    offering: "offered",
    age: {
      minMonths: 48,
      maxMonths: 59,
      level: "branch",
      verification: "provider-confirmed",
      providerAgeUrl: "https://www.rockstaracademy.com/lib/upload/files/club/PA_Schedule_Winter_2026_W5.pdf",
      sourceCheckedAt: "2026-11-24",
    },
    term: "19 Oct 2026 until 17 Jan 2027",
    note: "4-5 yrs from the dated branch PDF class key (updated 16 Nov 2026); the undated web schedule key shows a wider '3 - 6 Years' label, the dated PDF wins. Additional fee per the PDF footer. Grid: Mon 12:00; Tue 12:00; Wed 12:00; Thu 12:00; Fri 12:00 (115 min; branch schedule, read 24 Nov 2026). Confirm availability with the branch.",
  });
  add({
    name: "Sports U3",
    category: "Multi-Sport",
    offering: "offered",
    age: {
      minMonths: 24,
      maxMonths: 36,
      level: "branch",
      verification: "provider-confirmed",
      providerAgeUrl: "https://www.rockstaracademy.com/lib/upload/files/club/PA_Schedule_Winter_2026_W5.pdf",
      sourceCheckedAt: "2026-11-24",
    },
    term: "19 Oct 2026 until 17 Jan 2027",
    noteUrl: "https://www.rockstaracademy.com/schedules-and-locations/pik-avenue",
    noteLabel: "Age key",
    note: "'2 - 3 Years' via the official web schedule key. Grid: Wed 13:00; Thu 14:00; Fri 12:00 (50 min; branch schedule, read 24 Nov 2026). Confirm availability with the branch.",
  });
  add({
    name: "Sports U4/5",
    category: "Multi-Sport",
    offering: "offered",
    age: {
      minMonths: 36,
      maxMonths: 60,
      level: "branch",
      verification: "provider-confirmed",
      providerAgeUrl: "https://www.rockstaracademy.com/lib/upload/files/club/PA_Schedule_Winter_2026_W5.pdf",
      sourceCheckedAt: "2026-11-24",
    },
    term: "19 Oct 2026 until 17 Jan 2027",
    noteUrl: "https://www.rockstaracademy.com/schedules-and-locations/pik-avenue",
    noteLabel: "Age key",
    note: "'3 - 5 Years' via the official web schedule key; upper boundary ambiguous. Grid: Wed 12:00; Thu 13:00; Fri 14:00 (50 min; branch schedule, read 24 Nov 2026). Confirm availability with the branch.",
  });
  add({
    name: "Tots Gym U4",
    category: "Gym & Movement",
    offering: "offered",
    age: {
      minMonths: 36,
      maxMonths: 48,
      level: "branch",
      verification: "provider-confirmed",
      providerAgeUrl: "https://www.rockstaracademy.com/lib/upload/files/club/PA_Schedule_Winter_2026_W5.pdf",
      sourceCheckedAt: "2026-11-24",
    },
    term: "19 Oct 2026 until 17 Jan 2027",
    noteUrl: "https://www.rockstaracademy.com/schedules-and-locations/pik-avenue",
    noteLabel: "Age key",
    note: "PDF cell label 'Tots Gym U4'; numeric age via the official web schedule key ('3 - 4 Years'). Grid: Mon 15:00; Tue 13:00; Wed 14:00; Thu 14:00; Fri 14:00; Sat 12:00 (50 min; branch schedule, read 24 Nov 2026). Confirm availability with the branch.",
  });
  add({
    name: "Walker",
    category: "Gym & Movement",
    offering: "offered",
    age: {
      minMonths: 12,
      maxMonths: 23,
      level: "branch",
      verification: "provider-confirmed",
      providerAgeUrl: "https://www.rockstaracademy.com/lib/upload/files/club/PA_Schedule_Winter_2026_W5.pdf",
      sourceCheckedAt: "2026-11-24",
    },
    term: "19 Oct 2026 until 17 Jan 2027",
    note: "12-23 mo from the branch Winter term PDF class key. Grid: Mon 13:00; Tue 12:00; Wed 10:00, 10:00; Thu 11:00, 12:00; Fri 10:00; Sat 10:00; Sun 13:00 (50 min; branch schedule, read 24 Nov 2026). Confirm availability with the branch.",
  });
  }

  // ---- Pesona Square ----
  {
  const v = venue(venues, "rockstar-academy-pesona-square");
  v.lastCheckedAt = "2026-11-24";
  v.operatingStatus = { state: "official-listed", source: "https://www.rockstaracademy.com/schedules-and-locations/pesona-square", checkedAt: "2026-11-24" };
  v.cardNote = "Term enrollment: 11-week terms (Winter: 19 Oct 2026 to 17 Jan 2027); registration required before class, no same-day signup; baby gymnastics up to 3 classes/week. Free trial class bookable on the official site (rockstaracademy.com/freetrial). Read 24 Nov 2026. / Kelas per term: 11 minggu per term (Winter: 19 Okt 2026 - 17 Jan 2027); wajib daftar sebelum kelas, tidak bisa daftar di hari yang sama; baby gym maksimal 3 kelas per minggu. Kelas trial gratis bisa dipesan di situs resmi. Dibaca 24 Nov 2026.";
  v.categories = ["Dance", "Gym & Movement", "Multi-Sport", "Preschool", "Swim"];
  const add = (p: VenueProgram) => {
    const i = v.programs.findIndex((x) => x.name === p.name || (p.name === "Baby Ballet" && x.name === "Baby (Ballet)"));
    if (i >= 0) v.programs[i] = { ...v.programs[i], ...p, name: v.programs[i].name, age: { ...v.programs[i].age, ...p.age } };
    else v.programs.push(p);
  };
  add({
    name: "Baby Ballet",
    category: "Dance",
    offering: "offered",
    age: {
      minMonths: 24,
      maxMonths: 36,
      level: "branch",
      verification: "provider-confirmed",
      providerAgeUrl: "https://www.rockstaracademy.com/lib/upload/files/club/PS_Schedule_Winter_2026_W5.pdf",
      sourceCheckedAt: "2026-11-24",
    },
    term: "19 Oct 2026 until 17 Jan 2027",
    noteUrl: "https://www.rockstaracademy.com/schedules-and-locations/pesona-square",
    noteLabel: "Age key",
    note: "'2 - 3 Years' via the official web schedule key; year-boundary inclusivity ambiguous. Grid: Tue 13:00; Sun 14:00 (30 min; branch schedule, read 24 Nov 2026). Confirm availability with the branch.",
  });
  add({
    name: "Baby Dance",
    category: "Dance",
    offering: "offered",
    age: {
      minMonths: 12,
      maxMonths: 36,
      level: "branch",
      verification: "provider-confirmed",
      providerAgeUrl: "https://www.rockstaracademy.com/lib/upload/files/club/PS_Schedule_Winter_2026_W5.pdf",
      sourceCheckedAt: "2026-11-24",
    },
    term: "19 Oct 2026 until 17 Jan 2027",
    note: "'1-3 yrs' from the branch Winter term PDF class key; year-boundary inclusivity ambiguous. Grid: Mon 13:00, 14:00; Tue 10:00, 13:00; Wed 11:00, 12:00; Thu 10:00, 13:00; Fri 11:00; Sat 11:00; Sun 12:00 (50 min; branch schedule, read 24 Nov 2026). Confirm availability with the branch.",
  });
  add({
    name: "Baby Jam",
    category: "Gym & Movement",
    offering: "offered",
    age: {
      minMonths: 6,
      maxMonths: 18,
      level: "branch",
      verification: "provider-confirmed",
      providerAgeUrl: "https://www.rockstaracademy.com/lib/upload/files/club/PS_Schedule_Winter_2026_W5.pdf",
      sourceCheckedAt: "2026-11-24",
    },
    term: "19 Oct 2026 until 17 Jan 2027",
    note: "6-18 mo from the branch Winter term PDF class key. Grid: Tue 11:00; Thu 11:00 (30 min; branch schedule, read 24 Nov 2026). Confirm availability with the branch.",
  });
  add({
    name: "Crawler",
    category: "Gym & Movement",
    offering: "offered",
    age: {
      minMonths: 6,
      maxMonths: 18,
      level: "branch",
      verification: "provider-confirmed",
      providerAgeUrl: "https://www.rockstaracademy.com/lib/upload/files/club/PS_Schedule_Winter_2026_W5.pdf",
      sourceCheckedAt: "2026-11-24",
    },
    term: "19 Oct 2026 until 17 Jan 2027",
    note: "6-18 mo from the branch Winter term PDF class key. Grid: Tue 10:00; Thu 10:00; Sun 10:00 (50 min; branch schedule, read 24 Nov 2026). Confirm availability with the branch.",
  });
  add({
    name: "Jumper",
    category: "Gym & Movement",
    offering: "offered",
    age: {
      minMonths: 24,
      maxMonths: 35,
      level: "branch",
      verification: "provider-confirmed",
      providerAgeUrl: "https://www.rockstaracademy.com/lib/upload/files/club/PS_Schedule_Winter_2026_W5.pdf",
      sourceCheckedAt: "2026-11-24",
    },
    term: "19 Oct 2026 until 17 Jan 2027",
    note: "24-35 mo from the branch Winter term PDF class key. Grid: Mon 14:00; Tue 11:00; Wed 11:00, 13:00; Thu 11:00; Fri 12:00; Sat 10:00, 11:00; Sun 13:00 (50/55 min; branch schedule, read 24 Nov 2026). Confirm availability with the branch.",
  });
  add({
    name: "Learn & Play 1",
    category: "Preschool",
    offering: "offered",
    age: {
      minMonths: 6,
      maxMonths: 18,
      level: "branch",
      verification: "provider-confirmed",
      providerAgeUrl: "https://www.rockstaracademy.com/lib/upload/files/club/PS_Schedule_Winter_2026_W5.pdf",
      sourceCheckedAt: "2026-11-24",
    },
    term: "19 Oct 2026 until 17 Jan 2027",
    note: "6-18 mo from the branch Winter term PDF class key; Preschool & Kindergarten classes carry an additional fee per the PDF footer. Grid: Tue 09:00; Thu 09:00 (50 min; branch schedule, read 24 Nov 2026). Confirm availability with the branch.",
  });
  add({
    name: "Learn & Play 2",
    category: "Preschool",
    offering: "offered",
    age: {
      minMonths: 19,
      maxMonths: 35,
      level: "branch",
      verification: "provider-confirmed",
      providerAgeUrl: "https://www.rockstaracademy.com/lib/upload/files/club/PS_Schedule_Winter_2026_W5.pdf",
      sourceCheckedAt: "2026-11-24",
    },
    term: "19 Oct 2026 until 17 Jan 2027",
    note: "19-35 mo from the branch Winter term PDF class key; Preschool & Kindergarten classes carry an additional fee per the PDF footer. Grid: Tue 10:00; Wed 10:00; Thu 10:00 (50 min; branch schedule, read 24 Nov 2026). Confirm availability with the branch.",
  });
  add({
    name: "Move & Groove",
    category: "Dance",
    offering: "offered",
    age: {
      minMonths: 36,
      maxMonths: 60,
      level: "branch",
      verification: "provider-confirmed",
      providerAgeUrl: "https://www.rockstaracademy.com/lib/upload/files/club/PS_Schedule_Winter_2026_W5.pdf",
      sourceCheckedAt: "2026-11-24",
    },
    term: "19 Oct 2026 until 17 Jan 2027",
    noteUrl: "https://www.rockstaracademy.com/schedules-and-locations/pesona-square",
    noteLabel: "Age key",
    note: "'3 - 5 Years' via the official web schedule key; upper boundary ambiguous. Grid: Mon 15:00; Tue 15:00; Wed 15:00; Thu 14:00; Fri 15:00; Sat 14:00; Sun 13:00 (50 min; branch schedule, read 24 Nov 2026). Confirm availability with the branch.",
  });
  add({
    name: "Pre-Ballet 3-5",
    category: "Dance",
    offering: "offered",
    age: {
      minMonths: 36,
      maxMonths: 60,
      level: "branch",
      verification: "provider-confirmed",
      providerAgeUrl: "https://www.rockstaracademy.com/lib/upload/files/club/PS_Schedule_Winter_2026_W5.pdf",
      sourceCheckedAt: "2026-11-24",
    },
    term: "19 Oct 2026 until 17 Jan 2027",
    noteUrl: "https://www.rockstaracademy.com/schedules-and-locations/pesona-square",
    noteLabel: "Age key",
    note: "'3 - 5 Years' via the official web schedule key ('Pre-Ballet 1/2'); upper boundary ambiguous. Grid: Tue 14:00; Sun 12:00 (50 min; branch schedule, read 24 Nov 2026). Confirm availability with the branch.",
  });
  add({
    name: "Smartology 3",
    category: "Preschool",
    offering: "offered",
    age: {
      minMonths: 36,
      maxMonths: 48,
      level: "branch",
      verification: "provider-confirmed",
      providerAgeUrl: "https://www.rockstaracademy.com/lib/upload/files/club/PS_Schedule_Winter_2026_W5.pdf",
      sourceCheckedAt: "2026-11-24",
    },
    term: "19 Oct 2026 until 17 Jan 2027",
    note: "'3-4 yrs' from the branch Winter term PDF class key; upper-bound inclusivity ambiguous; additional fee per the PDF footer. Grid: Mon 11:00; Tue 11:00; Wed 11:00; Fri 11:00 (50 min; branch schedule, read 24 Nov 2026). Confirm availability with the branch.",
  });
  add({
    name: "Smartology 4",
    category: "Preschool",
    offering: "offered",
    age: {
      minMonths: 48,
      maxMonths: 59,
      level: "branch",
      verification: "provider-confirmed",
      providerAgeUrl: "https://www.rockstaracademy.com/lib/upload/files/club/PS_Schedule_Winter_2026_W5.pdf",
      sourceCheckedAt: "2026-11-24",
    },
    term: "19 Oct 2026 until 17 Jan 2027",
    note: "4-5 yrs from the dated branch PDF class key (updated 16 Nov 2026); the undated web schedule key shows a wider '3 - 6 Years' label, the dated PDF wins. Additional fee per the PDF footer. Grid: Mon 12:00; Tue 12:00; Wed 12:00; Thu 12:00; Fri 12:00 (115 min; branch schedule, read 24 Nov 2026). Confirm availability with the branch.",
  });
  add({
    name: "Sports U3",
    category: "Multi-Sport",
    offering: "offered",
    age: {
      minMonths: 24,
      maxMonths: 36,
      level: "branch",
      verification: "provider-confirmed",
      providerAgeUrl: "https://www.rockstaracademy.com/lib/upload/files/club/PS_Schedule_Winter_2026_W5.pdf",
      sourceCheckedAt: "2026-11-24",
    },
    term: "19 Oct 2026 until 17 Jan 2027",
    noteUrl: "https://www.rockstaracademy.com/schedules-and-locations/pesona-square",
    noteLabel: "Age key",
    note: "'2 - 3 Years' via the official web schedule key. Grid: Mon 15:00; Tue 12:00; Wed 12:00; Thu 12:00; Fri 13:00; Sat 12:00; Sun 14:00 (50 min; branch schedule, read 24 Nov 2026). Confirm availability with the branch.",
  });
  add({
    name: "Sports U4/5",
    category: "Multi-Sport",
    offering: "offered",
    age: {
      minMonths: 36,
      maxMonths: 60,
      level: "branch",
      verification: "provider-confirmed",
      providerAgeUrl: "https://www.rockstaracademy.com/lib/upload/files/club/PS_Schedule_Winter_2026_W5.pdf",
      sourceCheckedAt: "2026-11-24",
    },
    term: "19 Oct 2026 until 17 Jan 2027",
    noteUrl: "https://www.rockstaracademy.com/schedules-and-locations/pesona-square",
    noteLabel: "Age key",
    note: "'3 - 5 Years' via the official web schedule key; upper boundary ambiguous. Grid: Mon 14:00; Tue 14:00; Wed 16:00; Thu 13:00; Fri 16:00; Sun 15:00 (50 min; branch schedule, read 24 Nov 2026). Confirm availability with the branch.",
  });
  add({
    name: "Tots Gym U4",
    category: "Gym & Movement",
    offering: "offered",
    age: {
      minMonths: 36,
      maxMonths: 48,
      level: "branch",
      verification: "provider-confirmed",
      providerAgeUrl: "https://www.rockstaracademy.com/lib/upload/files/club/PS_Schedule_Winter_2026_W5.pdf",
      sourceCheckedAt: "2026-11-24",
    },
    term: "19 Oct 2026 until 17 Jan 2027",
    noteUrl: "https://www.rockstaracademy.com/schedules-and-locations/pesona-square",
    noteLabel: "Age key",
    note: "PDF cell label 'Tots Gym U4'; numeric age via the official web schedule key ('3 - 4 Years'). Grid: Mon 11:00; Tue 13:00; Wed 14:00; Thu 14:00, 15:00; Fri 14:00; Sat 13:00; Sun 14:00 (50 min; branch schedule, read 24 Nov 2026). Confirm availability with the branch.",
  });
  add({
    name: "TouchTennis 3-6 yrs",
    category: "Multi-Sport",
    offering: "offered",
    age: {
      minMonths: 36,
      maxMonths: 71,
      level: "branch",
      verification: "provider-confirmed",
      providerAgeUrl: "https://www.rockstaracademy.com/lib/upload/files/club/PS_Schedule_Winter_2026_W5.pdf",
      sourceCheckedAt: "2026-11-24",
    },
    term: "19 Oct 2026 until 17 Jan 2027",
    noteUrl: "https://www.rockstaracademy.com/schedules-and-locations/pesona-square",
    noteLabel: "Age key",
    note: "'3 - 7 Years' via the official web schedule key; the class name says '3-6 yrs', the difference sits above the under-5 range. Confirm with the branch. Grid: Mon 13:00, 14:00; Tue 13:00, 15:00; Wed 14:00; Thu 14:00, 16:00; Fri 13:00, 14:00; Sat 13:00; Sun 13:00 (55 min; branch schedule, read 24 Nov 2026). Confirm availability with the branch.",
  });
  add({
    name: "Walker",
    category: "Gym & Movement",
    offering: "offered",
    age: {
      minMonths: 12,
      maxMonths: 23,
      level: "branch",
      verification: "provider-confirmed",
      providerAgeUrl: "https://www.rockstaracademy.com/lib/upload/files/club/PS_Schedule_Winter_2026_W5.pdf",
      sourceCheckedAt: "2026-11-24",
    },
    term: "19 Oct 2026 until 17 Jan 2027",
    note: "12-23 mo from the branch Winter term PDF class key. Grid: Mon 13:00; Tue 12:00; Wed 10:00; Thu 12:00; Fri 10:00; Sat 12:00; Sun 11:00 (50 min; branch schedule, read 24 Nov 2026). Confirm availability with the branch.",
  });
  }

  // ---- Pluit Village ----
  {
  const v = venue(venues, "rockstar-academy-pluit-village");
  v.lastCheckedAt = "2026-11-24";
  v.operatingStatus = { state: "official-listed", source: "https://www.rockstaracademy.com/schedules-and-locations/pluit-village", checkedAt: "2026-11-24" };
  v.cardNote = "Term enrollment: 11-week terms (Winter: 19 Oct 2026 to 17 Jan 2027); registration required before class, no same-day signup; baby gymnastics up to 3 classes/week. Free trial class bookable on the official site (rockstaracademy.com/freetrial). Read 24 Nov 2026. / Kelas per term: 11 minggu per term (Winter: 19 Okt 2026 - 17 Jan 2027); wajib daftar sebelum kelas, tidak bisa daftar di hari yang sama; baby gym maksimal 3 kelas per minggu. Kelas trial gratis bisa dipesan di situs resmi. Dibaca 24 Nov 2026.";
  v.categories = ["Dance", "Gym & Movement", "Multi-Sport", "Preschool", "Swim"];
  const add = (p: VenueProgram) => {
    const i = v.programs.findIndex((x) => x.name === p.name || (p.name === "Baby Ballet" && x.name === "Baby (Ballet)"));
    if (i >= 0) v.programs[i] = { ...v.programs[i], ...p, name: v.programs[i].name, age: { ...v.programs[i].age, ...p.age } };
    else v.programs.push(p);
  };
  add({
    name: "Baby Ballet",
    category: "Dance",
    offering: "offered",
    age: {
      minMonths: 24,
      maxMonths: 36,
      level: "branch",
      verification: "provider-confirmed",
      providerAgeUrl: "https://www.rockstaracademy.com/lib/upload/files/club/PV_Schedule_Winter_2026_W5.pdf",
      sourceCheckedAt: "2026-11-24",
    },
    term: "19 Oct 2026 until 17 Jan 2027",
    noteUrl: "https://www.rockstaracademy.com/schedules-and-locations/pluit-village",
    noteLabel: "Age key",
    note: "'2 - 3 Years' via the official web schedule key; year-boundary inclusivity ambiguous. Grid: Wed 13:00 (30 min; branch schedule, read 24 Nov 2026). Confirm availability with the branch.",
  });
  add({
    name: "Baby Dance",
    category: "Dance",
    offering: "offered",
    age: {
      minMonths: 12,
      maxMonths: 36,
      level: "branch",
      verification: "provider-confirmed",
      providerAgeUrl: "https://www.rockstaracademy.com/lib/upload/files/club/PV_Schedule_Winter_2026_W5.pdf",
      sourceCheckedAt: "2026-11-24",
    },
    term: "19 Oct 2026 until 17 Jan 2027",
    note: "'1-3 yrs' from the branch Winter term PDF class key; year-boundary inclusivity ambiguous. Grid: Mon 14:00; Tue 12:00; Wed 11:00; Sat 11:00 (50 min; branch schedule, read 24 Nov 2026). Confirm availability with the branch.",
  });
  add({
    name: "Crawler",
    category: "Gym & Movement",
    offering: "offered",
    age: {
      minMonths: 6,
      maxMonths: 18,
      level: "branch",
      verification: "provider-confirmed",
      providerAgeUrl: "https://www.rockstaracademy.com/lib/upload/files/club/PV_Schedule_Winter_2026_W5.pdf",
      sourceCheckedAt: "2026-11-24",
    },
    term: "19 Oct 2026 until 17 Jan 2027",
    note: "6-18 mo from the branch Winter term PDF class key. Grid: Thu 10:00; Sat 11:00 (50 min; branch schedule, read 24 Nov 2026). Confirm availability with the branch.",
  });
  add({
    name: "Jumper",
    category: "Gym & Movement",
    offering: "offered",
    age: {
      minMonths: 24,
      maxMonths: 35,
      level: "branch",
      verification: "provider-confirmed",
      providerAgeUrl: "https://www.rockstaracademy.com/lib/upload/files/club/PV_Schedule_Winter_2026_W5.pdf",
      sourceCheckedAt: "2026-11-24",
    },
    term: "19 Oct 2026 until 17 Jan 2027",
    note: "24-35 mo from the branch Winter term PDF class key. Grid: Tue 11:00; Wed 12:00; Thu 11:00; Fri 11:00; Sat 10:00 (50 min; branch schedule, read 24 Nov 2026). Confirm availability with the branch.",
  });
  add({
    name: "Learn & Play 1",
    category: "Preschool",
    offering: "offered",
    age: {
      minMonths: 6,
      maxMonths: 18,
      level: "branch",
      verification: "provider-confirmed",
      providerAgeUrl: "https://www.rockstaracademy.com/lib/upload/files/club/PV_Schedule_Winter_2026_W5.pdf",
      sourceCheckedAt: "2026-11-24",
    },
    term: "19 Oct 2026 until 17 Jan 2027",
    note: "6-18 mo from the branch Winter term PDF class key; Preschool & Kindergarten classes carry an additional fee per the PDF footer. Grid: Tue 09:00; Thu 09:00 (50 min; branch schedule, read 24 Nov 2026). Confirm availability with the branch.",
  });
  add({
    name: "Learn & Play 2",
    category: "Preschool",
    offering: "offered",
    age: {
      minMonths: 19,
      maxMonths: 35,
      level: "branch",
      verification: "provider-confirmed",
      providerAgeUrl: "https://www.rockstaracademy.com/lib/upload/files/club/PV_Schedule_Winter_2026_W5.pdf",
      sourceCheckedAt: "2026-11-24",
    },
    term: "19 Oct 2026 until 17 Jan 2027",
    note: "19-35 mo from the branch Winter term PDF class key; Preschool & Kindergarten classes carry an additional fee per the PDF footer. Grid: Tue 10:00; Wed 10:00; Thu 10:00 (50 min; branch schedule, read 24 Nov 2026). Confirm availability with the branch.",
  });
  add({
    name: "Move & Groove",
    category: "Dance",
    offering: "offered",
    age: {
      minMonths: 36,
      maxMonths: 60,
      level: "branch",
      verification: "provider-confirmed",
      providerAgeUrl: "https://www.rockstaracademy.com/lib/upload/files/club/PV_Schedule_Winter_2026_W5.pdf",
      sourceCheckedAt: "2026-11-24",
    },
    term: "19 Oct 2026 until 17 Jan 2027",
    noteUrl: "https://www.rockstaracademy.com/schedules-and-locations/pluit-village",
    noteLabel: "Age key",
    note: "'3 - 5 Years' via the official web schedule key; upper boundary ambiguous. Grid: Mon 16:00; Tue 14:00; Wed 14:00; Thu 15:00; Fri 14:00; Sat 13:00 (50 min; branch schedule, read 24 Nov 2026). Confirm availability with the branch.",
  });
  add({
    name: "Pre-Ballet 3-5",
    category: "Dance",
    offering: "offered",
    age: {
      minMonths: 36,
      maxMonths: 60,
      level: "branch",
      verification: "provider-confirmed",
      providerAgeUrl: "https://www.rockstaracademy.com/lib/upload/files/club/PV_Schedule_Winter_2026_W5.pdf",
      sourceCheckedAt: "2026-11-24",
    },
    term: "19 Oct 2026 until 17 Jan 2027",
    noteUrl: "https://www.rockstaracademy.com/schedules-and-locations/pluit-village",
    noteLabel: "Age key",
    note: "'3 - 5 Years' via the official web schedule key ('Pre-Ballet 1/2'); upper boundary ambiguous. Grid: Mon 14:00 (50 min; branch schedule, read 24 Nov 2026). Confirm availability with the branch.",
  });
  add({
    name: "Smartology 3",
    category: "Preschool",
    offering: "offered",
    age: {
      minMonths: 36,
      maxMonths: 48,
      level: "branch",
      verification: "provider-confirmed",
      providerAgeUrl: "https://www.rockstaracademy.com/lib/upload/files/club/PV_Schedule_Winter_2026_W5.pdf",
      sourceCheckedAt: "2026-11-24",
    },
    term: "19 Oct 2026 until 17 Jan 2027",
    note: "'3-4 yrs' from the branch Winter term PDF class key; upper-bound inclusivity ambiguous; additional fee per the PDF footer. Grid: Mon 11:00; Tue 11:00; Wed 11:00; Fri 11:00 (50 min; branch schedule, read 24 Nov 2026). Confirm availability with the branch.",
  });
  add({
    name: "Smartology 4",
    category: "Preschool",
    offering: "offered",
    age: {
      minMonths: 48,
      maxMonths: 59,
      level: "branch",
      verification: "provider-confirmed",
      providerAgeUrl: "https://www.rockstaracademy.com/lib/upload/files/club/PV_Schedule_Winter_2026_W5.pdf",
      sourceCheckedAt: "2026-11-24",
    },
    term: "19 Oct 2026 until 17 Jan 2027",
    note: "4-5 yrs from the dated branch PDF class key (updated 16 Nov 2026); the undated web schedule key shows a wider '3 - 6 Years' label, the dated PDF wins. Additional fee per the PDF footer. Grid: Mon 12:00; Tue 12:00; Wed 12:00; Thu 12:00; Fri 12:00 (115 min; branch schedule, read 24 Nov 2026). Confirm availability with the branch.",
  });
  add({
    name: "Sports U3",
    category: "Multi-Sport",
    offering: "offered",
    age: {
      minMonths: 24,
      maxMonths: 36,
      level: "branch",
      verification: "provider-confirmed",
      providerAgeUrl: "https://www.rockstaracademy.com/lib/upload/files/club/PV_Schedule_Winter_2026_W5.pdf",
      sourceCheckedAt: "2026-11-24",
    },
    term: "19 Oct 2026 until 17 Jan 2027",
    noteUrl: "https://www.rockstaracademy.com/schedules-and-locations/pluit-village",
    noteLabel: "Age key",
    note: "'2 - 3 Years' via the official web schedule key. Grid: Thu 12:00; Fri 12:00 (50 min; branch schedule, read 24 Nov 2026). Confirm availability with the branch.",
  });
  add({
    name: "Sports U4/5",
    category: "Multi-Sport",
    offering: "offered",
    age: {
      minMonths: 36,
      maxMonths: 60,
      level: "branch",
      verification: "provider-confirmed",
      providerAgeUrl: "https://www.rockstaracademy.com/lib/upload/files/club/PV_Schedule_Winter_2026_W5.pdf",
      sourceCheckedAt: "2026-11-24",
    },
    term: "19 Oct 2026 until 17 Jan 2027",
    noteUrl: "https://www.rockstaracademy.com/schedules-and-locations/pluit-village",
    noteLabel: "Age key",
    note: "'3 - 5 Years' via the official web schedule key; upper boundary ambiguous. Grid: Tue 15:00; Wed 15:00; Thu 14:00; Fri 15:00; Sun 15:00 (50 min; branch schedule, read 24 Nov 2026). Confirm availability with the branch.",
  });
  add({
    name: "Tots Gym U4",
    category: "Gym & Movement",
    offering: "offered",
    age: {
      minMonths: 36,
      maxMonths: 48,
      level: "branch",
      verification: "provider-confirmed",
      providerAgeUrl: "https://www.rockstaracademy.com/lib/upload/files/club/PV_Schedule_Winter_2026_W5.pdf",
      sourceCheckedAt: "2026-11-24",
    },
    term: "19 Oct 2026 until 17 Jan 2027",
    noteUrl: "https://www.rockstaracademy.com/schedules-and-locations/pluit-village",
    noteLabel: "Age key",
    note: "PDF cell label 'Tots Gym U4'; numeric age via the official web schedule key ('3 - 4 Years'). Grid: Mon 15:00; Tue 13:00; Wed 13:00; Thu 13:00; Fri 13:00; Sat 14:00 (50/55 min; branch schedule, read 24 Nov 2026). Confirm availability with the branch.",
  });
  add({
    name: "Walker",
    category: "Gym & Movement",
    offering: "offered",
    age: {
      minMonths: 12,
      maxMonths: 23,
      level: "branch",
      verification: "provider-confirmed",
      providerAgeUrl: "https://www.rockstaracademy.com/lib/upload/files/club/PV_Schedule_Winter_2026_W5.pdf",
      sourceCheckedAt: "2026-11-24",
    },
    term: "19 Oct 2026 until 17 Jan 2027",
    note: "12-23 mo from the branch Winter term PDF class key. Grid: Mon 13:00; Tue 10:00; Wed 10:00; Fri 10:00 (50 min; branch schedule, read 24 Nov 2026). Confirm availability with the branch.",
  });
  }

  // ---- TSM Cibubur ----
  {
  const v = venue(venues, "rockstar-academy-tsm-cibubur");
  v.lastCheckedAt = "2026-11-24";
  v.operatingStatus = { state: "official-listed", source: "https://www.rockstaracademy.com/schedules-and-locations/trans-studio-cibubur", checkedAt: "2026-11-24" };
  v.cardNote = "Term enrollment: 11-week terms (Winter: 19 Oct 2026 to 17 Jan 2027); registration required before class, no same-day signup; baby gymnastics up to 3 classes/week. Free trial class bookable on the official site (rockstaracademy.com/freetrial). Read 24 Nov 2026. / Kelas per term: 11 minggu per term (Winter: 19 Okt 2026 - 17 Jan 2027); wajib daftar sebelum kelas, tidak bisa daftar di hari yang sama; baby gym maksimal 3 kelas per minggu. Kelas trial gratis bisa dipesan di situs resmi. Dibaca 24 Nov 2026.";
  v.categories = ["Dance", "Gym & Movement", "Multi-Sport", "Preschool", "Swim"];
  const add = (p: VenueProgram) => {
    const i = v.programs.findIndex((x) => x.name === p.name || (p.name === "Baby Ballet" && x.name === "Baby (Ballet)"));
    if (i >= 0) v.programs[i] = { ...v.programs[i], ...p, name: v.programs[i].name, age: { ...v.programs[i].age, ...p.age } };
    else v.programs.push(p);
  };
  add({
    name: "Baby Ballet",
    category: "Dance",
    offering: "offered",
    age: {
      minMonths: 24,
      maxMonths: 36,
      level: "branch",
      verification: "provider-confirmed",
      providerAgeUrl: "https://www.rockstaracademy.com/lib/upload/files/club/TC_Schedule_Winter_2026_Week_5.pdf",
      sourceCheckedAt: "2026-11-24",
    },
    term: "19 Oct 2026 until 17 Jan 2027",
    noteUrl: "https://www.rockstaracademy.com/schedules-and-locations/trans-studio-cibubur",
    noteLabel: "Age key",
    note: "'2 - 3 Years' via the official web schedule key; year-boundary inclusivity ambiguous. Grid: Wed 12:00; Sat 12:00 (30 min; branch schedule, read 24 Nov 2026). Confirm availability with the branch.",
  });
  add({
    name: "Baby Dance",
    category: "Dance",
    offering: "offered",
    age: {
      minMonths: 12,
      maxMonths: 36,
      level: "branch",
      verification: "provider-confirmed",
      providerAgeUrl: "https://www.rockstaracademy.com/lib/upload/files/club/TC_Schedule_Winter_2026_Week_5.pdf",
      sourceCheckedAt: "2026-11-24",
    },
    term: "19 Oct 2026 until 17 Jan 2027",
    note: "'1-3 yrs' from the branch Winter term PDF class key; year-boundary inclusivity ambiguous. Grid: Mon 12:00; Tue 11:00, 13:00; Wed 10:00, 11:00; Thu 11:00, 11:00; Fri 10:00; Sat 10:00; Sun 11:00 (50 min; branch schedule, read 24 Nov 2026). Confirm availability with the branch.",
  });
  add({
    name: "Baby Jam",
    category: "Gym & Movement",
    offering: "offered",
    age: {
      minMonths: 6,
      maxMonths: 18,
      level: "branch",
      verification: "provider-confirmed",
      providerAgeUrl: "https://www.rockstaracademy.com/lib/upload/files/club/TC_Schedule_Winter_2026_Week_5.pdf",
      sourceCheckedAt: "2026-11-24",
    },
    term: "19 Oct 2026 until 17 Jan 2027",
    note: "6-18 mo from the branch Winter term PDF class key. Grid: Tue 11:00; Thu 10:00; Sat 11:00 (30 min; branch schedule, read 24 Nov 2026). Confirm availability with the branch.",
  });
  add({
    name: "Crawler",
    category: "Gym & Movement",
    offering: "offered",
    age: {
      minMonths: 6,
      maxMonths: 18,
      level: "branch",
      verification: "provider-confirmed",
      providerAgeUrl: "https://www.rockstaracademy.com/lib/upload/files/club/TC_Schedule_Winter_2026_Week_5.pdf",
      sourceCheckedAt: "2026-11-24",
    },
    term: "19 Oct 2026 until 17 Jan 2027",
    note: "6-18 mo from the branch Winter term PDF class key. Grid: Tue 10:00; Thu 11:00; Sat 10:00 (50 min; branch schedule, read 24 Nov 2026). Confirm availability with the branch.",
  });
  add({
    name: "Jumper",
    category: "Gym & Movement",
    offering: "offered",
    age: {
      minMonths: 24,
      maxMonths: 35,
      level: "branch",
      verification: "provider-confirmed",
      providerAgeUrl: "https://www.rockstaracademy.com/lib/upload/files/club/TC_Schedule_Winter_2026_Week_5.pdf",
      sourceCheckedAt: "2026-11-24",
    },
    term: "19 Oct 2026 until 17 Jan 2027",
    note: "24-35 mo from the branch Winter term PDF class key. Grid: Mon 14:00; Tue 09:00, 11:00; Wed 11:00; Thu 09:00, 12:00; Fri 09:00, 10:00; Sat 11:00; Sun 12:00 (50 min; branch schedule, read 24 Nov 2026). Confirm availability with the branch.",
  });
  add({
    name: "Learn & Play 1",
    category: "Preschool",
    offering: "offered",
    age: {
      minMonths: 6,
      maxMonths: 18,
      level: "branch",
      verification: "provider-confirmed",
      providerAgeUrl: "https://www.rockstaracademy.com/lib/upload/files/club/TC_Schedule_Winter_2026_Week_5.pdf",
      sourceCheckedAt: "2026-11-24",
    },
    term: "19 Oct 2026 until 17 Jan 2027",
    note: "6-18 mo from the branch Winter term PDF class key; Preschool & Kindergarten classes carry an additional fee per the PDF footer. Grid: Tue 09:00; Thu 09:00 (50 min; branch schedule, read 24 Nov 2026). Confirm availability with the branch.",
  });
  add({
    name: "Learn & Play 2",
    category: "Preschool",
    offering: "offered",
    age: {
      minMonths: 19,
      maxMonths: 35,
      level: "branch",
      verification: "provider-confirmed",
      providerAgeUrl: "https://www.rockstaracademy.com/lib/upload/files/club/TC_Schedule_Winter_2026_Week_5.pdf",
      sourceCheckedAt: "2026-11-24",
    },
    term: "19 Oct 2026 until 17 Jan 2027",
    note: "19-35 mo from the branch Winter term PDF class key; Preschool & Kindergarten classes carry an additional fee per the PDF footer. Grid: Tue 09:00, 10:00; Wed 09:00, 10:00; Thu 09:00, 10:00 (50 min; branch schedule, read 24 Nov 2026). Confirm availability with the branch.",
  });
  add({
    name: "Move & Groove",
    category: "Dance",
    offering: "offered",
    age: {
      minMonths: 36,
      maxMonths: 60,
      level: "branch",
      verification: "provider-confirmed",
      providerAgeUrl: "https://www.rockstaracademy.com/lib/upload/files/club/TC_Schedule_Winter_2026_Week_5.pdf",
      sourceCheckedAt: "2026-11-24",
    },
    term: "19 Oct 2026 until 17 Jan 2027",
    noteUrl: "https://www.rockstaracademy.com/schedules-and-locations/trans-studio-cibubur",
    noteLabel: "Age key",
    note: "'3 - 5 Years' via the official web schedule key; upper boundary ambiguous. Grid: Mon 14:00; Tue 12:00; Wed 12:00, 15:00; Thu 14:00; Fri 15:00; Sat 12:00; Sun 14:00 (50 min; branch schedule, read 24 Nov 2026). Confirm availability with the branch.",
  });
  add({
    name: "Pre-Ballet 3-5",
    category: "Dance",
    offering: "offered",
    age: {
      minMonths: 36,
      maxMonths: 60,
      level: "branch",
      verification: "provider-confirmed",
      providerAgeUrl: "https://www.rockstaracademy.com/lib/upload/files/club/TC_Schedule_Winter_2026_Week_5.pdf",
      sourceCheckedAt: "2026-11-24",
    },
    term: "19 Oct 2026 until 17 Jan 2027",
    noteUrl: "https://www.rockstaracademy.com/schedules-and-locations/trans-studio-cibubur",
    noteLabel: "Age key",
    note: "'3 - 5 Years' via the official web schedule key ('Pre-Ballet 1/2'); upper boundary ambiguous. Grid: Wed 13:00; Sat 13:00 (50 min; branch schedule, read 24 Nov 2026). Confirm availability with the branch.",
  });
  add({
    name: "Smartology 3",
    category: "Preschool",
    offering: "offered",
    age: {
      minMonths: 36,
      maxMonths: 48,
      level: "branch",
      verification: "provider-confirmed",
      providerAgeUrl: "https://www.rockstaracademy.com/lib/upload/files/club/TC_Schedule_Winter_2026_Week_5.pdf",
      sourceCheckedAt: "2026-11-24",
    },
    term: "19 Oct 2026 until 17 Jan 2027",
    note: "'3-4 yrs' from the branch Winter term PDF class key; upper-bound inclusivity ambiguous; additional fee per the PDF footer. Grid: Mon 11:00, 11:00; Tue 11:00; Wed 11:00, 11:00; Thu 11:00; Fri 11:00, 11:00 (50 min; branch schedule, read 24 Nov 2026). Confirm availability with the branch.",
  });
  add({
    name: "Smartology 4",
    category: "Preschool",
    offering: "offered",
    age: {
      minMonths: 48,
      maxMonths: 59,
      level: "branch",
      verification: "provider-confirmed",
      providerAgeUrl: "https://www.rockstaracademy.com/lib/upload/files/club/TC_Schedule_Winter_2026_Week_5.pdf",
      sourceCheckedAt: "2026-11-24",
    },
    term: "19 Oct 2026 until 17 Jan 2027",
    note: "4-5 yrs from the dated branch PDF class key (updated 16 Nov 2026); the undated web schedule key shows a wider '3 - 6 Years' label, the dated PDF wins. Additional fee per the PDF footer. Grid: Mon 12:00; Tue 12:00; Wed 12:00; Thu 12:00; Fri 12:00 (115 min; branch schedule, read 24 Nov 2026). Confirm availability with the branch.",
  });
  add({
    name: "Sports U3",
    category: "Multi-Sport",
    offering: "offered",
    age: {
      minMonths: 24,
      maxMonths: 36,
      level: "branch",
      verification: "provider-confirmed",
      providerAgeUrl: "https://www.rockstaracademy.com/lib/upload/files/club/TC_Schedule_Winter_2026_Week_5.pdf",
      sourceCheckedAt: "2026-11-24",
    },
    term: "19 Oct 2026 until 17 Jan 2027",
    noteUrl: "https://www.rockstaracademy.com/schedules-and-locations/trans-studio-cibubur",
    noteLabel: "Age key",
    note: "'2 - 3 Years' via the official web schedule key. Grid: Mon 13:00; Tue 10:00, 12:00; Thu 10:00, 13:00; Fri 11:00; Sat 12:00 (50 min; branch schedule, read 24 Nov 2026). Confirm availability with the branch.",
  });
  add({
    name: "Sports U4/5",
    category: "Multi-Sport",
    offering: "offered",
    age: {
      minMonths: 36,
      maxMonths: 60,
      level: "branch",
      verification: "provider-confirmed",
      providerAgeUrl: "https://www.rockstaracademy.com/lib/upload/files/club/TC_Schedule_Winter_2026_Week_5.pdf",
      sourceCheckedAt: "2026-11-24",
    },
    term: "19 Oct 2026 until 17 Jan 2027",
    noteUrl: "https://www.rockstaracademy.com/schedules-and-locations/trans-studio-cibubur",
    noteLabel: "Age key",
    note: "'3 - 5 Years' via the official web schedule key; upper boundary ambiguous. Grid: Mon 16:00; Tue 13:00; Wed 11:00, 13:00; Thu 12:00; Sat 11:00; Sun 12:00 (50 min; branch schedule, read 24 Nov 2026). Confirm availability with the branch.",
  });
  add({
    name: "Tots Gym U4",
    category: "Gym & Movement",
    offering: "offered",
    age: {
      minMonths: 36,
      maxMonths: 48,
      level: "branch",
      verification: "provider-confirmed",
      providerAgeUrl: "https://www.rockstaracademy.com/lib/upload/files/club/TC_Schedule_Winter_2026_Week_5.pdf",
      sourceCheckedAt: "2026-11-24",
    },
    term: "19 Oct 2026 until 17 Jan 2027",
    noteUrl: "https://www.rockstaracademy.com/schedules-and-locations/trans-studio-cibubur",
    noteLabel: "Age key",
    note: "PDF cell label 'Tots Gym U4'; numeric age via the official web schedule key ('3 - 4 Years'). Grid: Mon 12:00, 15:00; Tue 14:00; Wed 14:00; Thu 13:00; Fri 14:00; Sat 14:00; Sun 13:00 (50 min; branch schedule, read 24 Nov 2026). Confirm availability with the branch.",
  });
  add({
    name: "Walker",
    category: "Gym & Movement",
    offering: "offered",
    age: {
      minMonths: 12,
      maxMonths: 23,
      level: "branch",
      verification: "provider-confirmed",
      providerAgeUrl: "https://www.rockstaracademy.com/lib/upload/files/club/TC_Schedule_Winter_2026_Week_5.pdf",
      sourceCheckedAt: "2026-11-24",
    },
    term: "19 Oct 2026 until 17 Jan 2027",
    note: "12-23 mo from the branch Winter term PDF class key. Grid: Mon 13:00; Tue 12:00; Wed 10:00; Thu 10:00; Fri 11:00; Sat 12:00; Sun 10:00 (50 min; branch schedule, read 24 Nov 2026). Confirm availability with the branch.",
  });
  }

  // ---- The Park Pejaten ----
  {
  const v = venue(venues, "rockstar-academy-the-park-pejaten");
  v.lastCheckedAt = "2026-11-24";
  v.operatingStatus = { state: "official-listed", source: "https://www.rockstaracademy.com/schedules-and-locations/the-park-pejaten", checkedAt: "2026-11-24" };
  v.cardNote = "Term enrollment: 11-week terms (Winter: 19 Oct 2026 to 17 Jan 2027); registration required before class, no same-day signup; baby gymnastics up to 3 classes/week. Free trial class bookable on the official site (rockstaracademy.com/freetrial). Read 24 Nov 2026. / Kelas per term: 11 minggu per term (Winter: 19 Okt 2026 - 17 Jan 2027); wajib daftar sebelum kelas, tidak bisa daftar di hari yang sama; baby gym maksimal 3 kelas per minggu. Kelas trial gratis bisa dipesan di situs resmi. Dibaca 24 Nov 2026.";
  v.categories = ["Dance", "Gym & Movement", "Multi-Sport", "Preschool", "Swim"];
  const add = (p: VenueProgram) => {
    const i = v.programs.findIndex((x) => x.name === p.name || (p.name === "Baby Ballet" && x.name === "Baby (Ballet)"));
    if (i >= 0) v.programs[i] = { ...v.programs[i], ...p, name: v.programs[i].name, age: { ...v.programs[i].age, ...p.age } };
    else v.programs.push(p);
  };
  add({
    name: "Baby Ballet",
    category: "Dance",
    offering: "offered",
    age: {
      minMonths: 24,
      maxMonths: 36,
      level: "branch",
      verification: "provider-confirmed",
      providerAgeUrl: "https://www.rockstaracademy.com/lib/upload/files/club/PP_Schedule_Winter_2026%C2%A0W3.pdf",
      sourceCheckedAt: "2026-11-24",
    },
    term: "19 Oct 2026 until 17 Jan 2027",
    noteUrl: "https://www.rockstaracademy.com/schedules-and-locations/the-park-pejaten",
    noteLabel: "Age key",
    note: "'2 - 3 Years' via the official web schedule key; year-boundary inclusivity ambiguous. Grid: Wed 13:00; Sun 14:00 (30 min; branch schedule, read 24 Nov 2026). Confirm availability with the branch.",
  });
  add({
    name: "Baby Dance",
    category: "Dance",
    offering: "offered",
    age: {
      minMonths: 12,
      maxMonths: 36,
      level: "branch",
      verification: "provider-confirmed",
      providerAgeUrl: "https://www.rockstaracademy.com/lib/upload/files/club/PP_Schedule_Winter_2026%C2%A0W3.pdf",
      sourceCheckedAt: "2026-11-24",
    },
    term: "19 Oct 2026 until 17 Jan 2027",
    note: "'1-3 yrs' from the branch Winter term PDF class key; year-boundary inclusivity ambiguous. Grid: Mon 14:00; Tue 10:00, 13:00; Wed 11:00; Thu 10:00, 13:00; Fri 11:00; Sat 11:00; Sun 12:00 (50 min; branch schedule, read 24 Nov 2026). Confirm availability with the branch.",
  });
  add({
    name: "Baby Jam",
    category: "Gym & Movement",
    offering: "offered",
    age: {
      minMonths: 6,
      maxMonths: 18,
      level: "branch",
      verification: "provider-confirmed",
      providerAgeUrl: "https://www.rockstaracademy.com/lib/upload/files/club/PP_Schedule_Winter_2026%C2%A0W3.pdf",
      sourceCheckedAt: "2026-11-24",
    },
    term: "19 Oct 2026 until 17 Jan 2027",
    note: "6-18 mo from the branch Winter term PDF class key. Grid: Tue 11:00; Thu 11:00 (30 min; branch schedule, read 24 Nov 2026). Confirm availability with the branch.",
  });
  add({
    name: "Crawler",
    category: "Gym & Movement",
    offering: "offered",
    age: {
      minMonths: 6,
      maxMonths: 18,
      level: "branch",
      verification: "provider-confirmed",
      providerAgeUrl: "https://www.rockstaracademy.com/lib/upload/files/club/PP_Schedule_Winter_2026%C2%A0W3.pdf",
      sourceCheckedAt: "2026-11-24",
    },
    term: "19 Oct 2026 until 17 Jan 2027",
    note: "6-18 mo from the branch Winter term PDF class key. Grid: Tue 10:00; Thu 10:00 (50 min; branch schedule, read 24 Nov 2026). Confirm availability with the branch.",
  });
  add({
    name: "Jumper",
    category: "Gym & Movement",
    offering: "offered",
    age: {
      minMonths: 24,
      maxMonths: 35,
      level: "branch",
      verification: "provider-confirmed",
      providerAgeUrl: "https://www.rockstaracademy.com/lib/upload/files/club/PP_Schedule_Winter_2026%C2%A0W3.pdf",
      sourceCheckedAt: "2026-11-24",
    },
    term: "19 Oct 2026 until 17 Jan 2027",
    note: "24-35 mo from the branch Winter term PDF class key. Grid: Mon 15:00; Tue 11:00; Wed 12:00; Thu 11:00; Fri 12:00; Sat 10:00; Sun 13:00 (50 min; branch schedule, read 24 Nov 2026). Confirm availability with the branch.",
  });
  add({
    name: "Learn & Play 1",
    category: "Preschool",
    offering: "offered",
    age: {
      minMonths: 6,
      maxMonths: 18,
      level: "branch",
      verification: "provider-confirmed",
      providerAgeUrl: "https://www.rockstaracademy.com/lib/upload/files/club/PP_Schedule_Winter_2026%C2%A0W3.pdf",
      sourceCheckedAt: "2026-11-24",
    },
    term: "19 Oct 2026 until 17 Jan 2027",
    note: "6-18 mo from the branch Winter term PDF class key; Preschool & Kindergarten classes carry an additional fee per the PDF footer. Grid: Tue 09:00; Thu 09:00 (50 min; branch schedule, read 24 Nov 2026). Confirm availability with the branch.",
  });
  add({
    name: "Learn & Play 2",
    category: "Preschool",
    offering: "offered",
    age: {
      minMonths: 19,
      maxMonths: 35,
      level: "branch",
      verification: "provider-confirmed",
      providerAgeUrl: "https://www.rockstaracademy.com/lib/upload/files/club/PP_Schedule_Winter_2026%C2%A0W3.pdf",
      sourceCheckedAt: "2026-11-24",
    },
    term: "19 Oct 2026 until 17 Jan 2027",
    note: "19-35 mo from the branch Winter term PDF class key; Preschool & Kindergarten classes carry an additional fee per the PDF footer. Grid: Tue 10:00; Wed 10:00; Thu 10:00 (50 min; branch schedule, read 24 Nov 2026). Confirm availability with the branch.",
  });
  add({
    name: "Move & Groove",
    category: "Dance",
    offering: "offered",
    age: {
      minMonths: 36,
      maxMonths: 60,
      level: "branch",
      verification: "provider-confirmed",
      providerAgeUrl: "https://www.rockstaracademy.com/lib/upload/files/club/PP_Schedule_Winter_2026%C2%A0W3.pdf",
      sourceCheckedAt: "2026-11-24",
    },
    term: "19 Oct 2026 until 17 Jan 2027",
    noteUrl: "https://www.rockstaracademy.com/schedules-and-locations/the-park-pejaten",
    noteLabel: "Age key",
    note: "'3 - 5 Years' via the official web schedule key; upper boundary ambiguous. Grid: Mon 13:00; Tue 14:00; Wed 15:00; Thu 15:00; Fri 15:00; Sat 14:00; Sun 13:00 (50 min; branch schedule, read 24 Nov 2026). Confirm availability with the branch.",
  });
  add({
    name: "Pre-Ballet 3-5",
    category: "Dance",
    offering: "offered",
    age: {
      minMonths: 36,
      maxMonths: 60,
      level: "branch",
      verification: "provider-confirmed",
      providerAgeUrl: "https://www.rockstaracademy.com/lib/upload/files/club/PP_Schedule_Winter_2026%C2%A0W3.pdf",
      sourceCheckedAt: "2026-11-24",
    },
    term: "19 Oct 2026 until 17 Jan 2027",
    noteUrl: "https://www.rockstaracademy.com/schedules-and-locations/the-park-pejaten",
    noteLabel: "Age key",
    note: "'3 - 5 Years' via the official web schedule key ('Pre-Ballet 1/2'); upper boundary ambiguous. Grid: Wed 15:00; Sun 12:00 (50 min; branch schedule, read 24 Nov 2026). Confirm availability with the branch.",
  });
  add({
    name: "Smartology 3",
    category: "Preschool",
    offering: "offered",
    age: {
      minMonths: 36,
      maxMonths: 48,
      level: "branch",
      verification: "provider-confirmed",
      providerAgeUrl: "https://www.rockstaracademy.com/lib/upload/files/club/PP_Schedule_Winter_2026%C2%A0W3.pdf",
      sourceCheckedAt: "2026-11-24",
    },
    term: "19 Oct 2026 until 17 Jan 2027",
    note: "'3-4 yrs' from the branch Winter term PDF class key; upper-bound inclusivity ambiguous; additional fee per the PDF footer. Grid: Mon 11:00; Tue 11:00; Wed 11:00; Fri 11:00 (50/55 min; branch schedule, read 24 Nov 2026). Confirm availability with the branch.",
  });
  add({
    name: "Smartology 4",
    category: "Preschool",
    offering: "offered",
    age: {
      minMonths: 48,
      maxMonths: 59,
      level: "branch",
      verification: "provider-confirmed",
      providerAgeUrl: "https://www.rockstaracademy.com/lib/upload/files/club/PP_Schedule_Winter_2026%C2%A0W3.pdf",
      sourceCheckedAt: "2026-11-24",
    },
    term: "19 Oct 2026 until 17 Jan 2027",
    note: "4-5 yrs from the dated branch PDF class key (updated 16 Nov 2026); the undated web schedule key shows a wider '3 - 6 Years' label, the dated PDF wins. Additional fee per the PDF footer. Grid: Mon 12:00; Tue 12:00; Wed 12:00; Thu 12:00; Fri 12:00 (115 min; branch schedule, read 24 Nov 2026). Confirm availability with the branch.",
  });
  add({
    name: "Sports U3",
    category: "Multi-Sport",
    offering: "offered",
    age: {
      minMonths: 24,
      maxMonths: 36,
      level: "branch",
      verification: "provider-confirmed",
      providerAgeUrl: "https://www.rockstaracademy.com/lib/upload/files/club/PP_Schedule_Winter_2026%C2%A0W3.pdf",
      sourceCheckedAt: "2026-11-24",
    },
    term: "19 Oct 2026 until 17 Jan 2027",
    noteUrl: "https://www.rockstaracademy.com/schedules-and-locations/the-park-pejaten",
    noteLabel: "Age key",
    note: "'2 - 3 Years' via the official web schedule key. Grid: Tue 12:00; Wed 10:00; Thu 10:00; Fri 13:00; Sat 12:00; Sun 11:00 (50 min; branch schedule, read 24 Nov 2026). Confirm availability with the branch.",
  });
  add({
    name: "Sports U4/5",
    category: "Multi-Sport",
    offering: "offered",
    age: {
      minMonths: 36,
      maxMonths: 60,
      level: "branch",
      verification: "provider-confirmed",
      providerAgeUrl: "https://www.rockstaracademy.com/lib/upload/files/club/PP_Schedule_Winter_2026%C2%A0W3.pdf",
      sourceCheckedAt: "2026-11-24",
    },
    term: "19 Oct 2026 until 17 Jan 2027",
    noteUrl: "https://www.rockstaracademy.com/schedules-and-locations/the-park-pejaten",
    noteLabel: "Age key",
    note: "'3 - 5 Years' via the official web schedule key; upper boundary ambiguous. Grid: Mon 13:00; Tue 14:00; Wed 13:00; Thu 13:00; Sat 12:00; Sun 12:00 (50 min; branch schedule, read 24 Nov 2026). Confirm availability with the branch.",
  });
  add({
    name: "Tots Gym U4",
    category: "Gym & Movement",
    offering: "offered",
    age: {
      minMonths: 36,
      maxMonths: 48,
      level: "branch",
      verification: "provider-confirmed",
      providerAgeUrl: "https://www.rockstaracademy.com/lib/upload/files/club/PP_Schedule_Winter_2026%C2%A0W3.pdf",
      sourceCheckedAt: "2026-11-24",
    },
    term: "19 Oct 2026 until 17 Jan 2027",
    noteUrl: "https://www.rockstaracademy.com/schedules-and-locations/the-park-pejaten",
    noteLabel: "Age key",
    note: "PDF cell label 'Tots Gym U4'; numeric age via the official web schedule key ('3 - 4 Years'). Grid: Mon 12:00; Tue 13:00; Wed 14:00; Thu 14:00; Fri 14:00; Sat 13:00; Sun 14:00 (50 min; branch schedule, read 24 Nov 2026). Confirm availability with the branch.",
  });
  add({
    name: "Walker",
    category: "Gym & Movement",
    offering: "offered",
    age: {
      minMonths: 12,
      maxMonths: 23,
      level: "branch",
      verification: "provider-confirmed",
      providerAgeUrl: "https://www.rockstaracademy.com/lib/upload/files/club/PP_Schedule_Winter_2026%C2%A0W3.pdf",
      sourceCheckedAt: "2026-11-24",
    },
    term: "19 Oct 2026 until 17 Jan 2027",
    note: "12-23 mo from the branch Winter term PDF class key. Grid: Mon 13:00; Tue 12:00; Wed 10:00; Thu 12:00; Fri 10:00; Sat 12:00; Sun 11:00 (50 min; branch schedule, read 24 Nov 2026). Confirm availability with the branch.",
  });
  }
}
