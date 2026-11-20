import type { Venue } from "@/types/venue";

const checkedAt = "2026-11-20";
const bumiAge = "https://buminusantaramontessori.sch.id/classes/";
const bumiMentari = "https://buminusantaramontessori.sch.id/classes/kelompok-bermain-mentari-10-12-bulan/";
const kimiAge = "https://www.kimiandfriends.id/montessori-toddler-gading-serpong/";
const bumiNote = "Official class page lists this group. It gives no dated term, fee or schedule. Confirm age boundaries, the next intake and availability with the school.";
const hfProgram = "https://highfivepreschool.com/program";
const hfAdmission = "https://highfivepreschool.com/admission";
const hfNote = "Official program page lists this class. It gives no dated term or fee. Confirm age boundaries, the next intake and availability with the school.";
const kimiNote = "Official page lists Montessori enrichment for ages 1-3 years, small groups of up to 8, Monday to Saturday. It gives no dated term or fee. Confirm age boundaries, the next class and availability with the studio.";
const prog = (name: string, minMonths: number, maxMonths: number, url: string, note: string, category = "Montessori") => ({
  name, category, offering: "offered" as const,
  age: { minMonths, maxMonths, level: "branch" as const, verification: "provider-confirmed" as const, providerAgeUrl: url, sourceCheckedAt: checkedAt },
  note,
});

export const INDIE_20261120: Venue[] = [
  {
    id: "bumi-nusantara-montessori-bsd", chain: null, branchName: "Bumi Nusantara Montessori",
    categories: ["Montessori"],
    address: "Jl. Suplir I3 No. 6, Griya Loka, BSD Sektor 1, Serpong, Tangerang Selatan",
    area: "Griya Loka BSD", city: "Tangerang Selatan", lat: -6.2977524, lng: 106.6793784,
    coordinateSource: "maps-pin",
    programs: [
      prog("Kelompok Bermain Mentari", 10, 24, bumiMentari, bumiNote),
      prog("Kelompok Bermain Bumi", 24, 36, bumiAge, bumiNote),
      prog("Kelompok Bermain Angkasa", 36, 48, bumiAge, bumiNote),
    ],
    website: "https://buminusantaramontessori.sch.id/",
    phone: "+62 878-0543-8440", sourceUrl: bumiMentari,
    lastCheckedAt: checkedAt, fitStatus: "branch-confirmed-live-undated",
    operatingStatus: { state: "official-listed", source: "https://buminusantaramontessori.sch.id/hubungi-kami/", checkedAt },
    notes: "Independent Montessori school, single site. Ages come from the school's own class pages (Mentari 10-24 months, Bumi 2-3 years, Angkasa 3-4 years). The 4-6 year Samudra class is left out because it is over 5. The Maps pin sits on the same road with a slightly different house-number format than the official address; check the entrance on arrival. No Google reviews were found for this listing, so no rating is shown. No prices published.",
  },
  {
    id: "kimi-friends-montessori-gading-serpong", chain: null, branchName: "Kimi & Friends Montessori Studio",
    categories: ["Montessori"],
    address: "Ruko Hampton Avenue, Jl. Gading Serpong Boulevard No. A16, Medang, Pagedangan, Kabupaten Tangerang",
    area: "Gading Serpong", city: "Tangerang", lat: -6.2669192, lng: 106.619364,
    coordinateSource: "maps-pin",
    programs: [prog("Montessori Enrichment Class", 12, 36, kimiAge, kimiNote)],
    website: "https://www.kimiandfriends.id/",
    phone: "+62 816-1570-0008", phoneScope: "shared-enquiry", sourceUrl: kimiAge,
    lastCheckedAt: checkedAt, fitStatus: "branch-confirmed-live-undated",
    operatingStatus: { state: "official-listed", source: "https://www.kimiandfriends.id/kontak/", checkedAt },
    notes: "Independent studio, single site, run alongside a kids' salon at the same address. Ages come from the studio's own toddler page (1-3 years). The WhatsApp number is the studio's enquiry line. No prices published. Maps shows 5.0 from 20 ratings; no review text was read, so no trend is claimed.",
    reviews: { rating: 5, reviewCount: 20, source: "Google Maps", sourceUrl: "https://www.google.com/maps/search/?api=1&query=Kimi+%26+Friends+Montessori+Studio&query_place_id=ChIJQSTrhrL9aS4RIeYyuyd-7Jw", checkedAt, sampleNote: "Rating and count only. No review text was read, so no theme or trend is claimed.", praiseThemes: [], complaintThemes: [] },
  },
  {
    id: "highfive-preschool-graha-raya", chain: null, branchName: "Highfive Preschool Graha Raya",
    categories: ["Preschool"],
    address: "Jl. Cendana Loka Raya No. P1/11, Paku Jaya, Serpong Utara, Tangerang Selatan",
    area: "Graha Raya", city: "Tangerang Selatan", lat: -6.2448765, lng: 106.6739842,
    coordinateSource: "maps-pin",
    programs: [
      prog("Sensory Baby", 9, 24, hfProgram, hfNote, "Preschool"),
      prog("Toddler", 24, 36, hfProgram, hfNote, "Preschool"),
      prog("Nursery", 36, 48, hfProgram, hfNote, "Preschool"),
      prog("Kindergarten (4-5 years)", 48, 60, hfProgram, hfNote, "Preschool"),
    ],
    website: "https://highfivepreschool.com/",
    phone: "+62 821-7777-9887", sourceUrl: hfProgram,
    lastCheckedAt: checkedAt, fitStatus: "branch-confirmed-live-undated",
    operatingStatus: { state: "official-listed", source: hfAdmission, checkedAt },
    notes: "Independent preschool, single site. Ages come from the school's own program page (Sensory Baby 9 months to 2 years, Toddler 2-3, Nursery 3-4, Kindergarten 4-5). The 5-6 year Kindergarten is left out. The official address is P1/11, and the Maps pin is the listing at that number. A second Maps listing at No. 16 is about 23 m away and is not used. No prices published, and Maps shows no ratings for the P1/11 listing.",
  },
];

export default function enrich1120Indie(venues: Venue[]) {
  for (const v of INDIE_20261120) {
    if (venues.some(x => x.id === v.id)) throw new Error(`Duplicate ${v.id}`);
    venues.push(v);
  }
}
