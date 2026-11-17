import type { Venue } from "@/types/venue";

const checkedAt = "2026-11-18";
const operationSource = "https://www.instagram.com/kiddies_88/p/DfXN1WrH2h_/";
const classNote = "The branch's official brochure lists baby 3-18 months and toddler 18-36 months, with 30-minute lessons. It is undated. A parent must accompany the child in the pool. Confirm age boundaries, the next class and current availability.";
const packageNote = "The undated branch brochure includes pool entry and two companions. A parent must enter the pool with the child. Rp150,000 registration is extra. Confirm the current price, package expiry, class dates and cancellation terms before paying.";
const registrationNote = "Separate registration fee in the undated branch brochure, not included in the lesson packages. Confirm whether it applies to your enrolment.";

// Branch brochures are linked by the provider's own Instagram / Linktree.
// The dated holiday post establishes location activity, not baby-class fees or dates.
const branches = [
  {
    id: "kiddies88-maspen-cimuning", branchName: "Maspen Sport Center (Cimuning)",
    address: "Maspen Sport Center, Jl. Sirih Prada V No.99, Cimuning, Mustika Jaya, Kota Bekasi",
    area: "Cimuning", city: "Bekasi", lat: -6.3241727, lng: 107.0250853,
    pdf: "https://drive.google.com/file/d/1tvM_UY6hiZzIOy7P9isZTONx1QrtYQnT/view?pli=1",
    maps: "https://www.google.com/maps/place/Maspen+Sport+Center/@-6.3241674,107.0225104,17z/data=!3m1!4b1!4m6!3m5!1s0x2e699125ca67a24f:0xcc64bee312bc8fe9!8m2!3d-6.3241727!4d107.0250853!16s%2Fg%2F11p02mb1mj?entry=ttu&g_ep=EgoyMDI2MTExMC4wIKXMDSoASAFQAw%3D%3D",
    warning: "", phone: "+62 851-8310-6880", rating: 4.6, reviewCount: 258,
    sampleNote: "These are pool-wide Maps ratings, not ratings of the baby class. A small newest-sorted sample included recent ratings and one comment about a clean pool. Too few reviews were read to judge a trend or safety."
  },
  {
    id: "kiddies88-waterland-transyogi", branchName: "Waterland Transyogi (Cileungsi)",
    address: "Waterland Metland Transyogi, Jl. Metland Transyogi, Cileungsi, Kabupaten Bogor",
    area: "Cileungsi", city: "Bogor", lat: -6.3977321, lng: 106.9777077,
    pdf: "https://drive.google.com/file/d/1EokIuYD1j6X3sJogdp-OvJDfYsTbeqvq/view?usp=drivesdk",
    maps: "https://www.google.com/maps/place/Waterland+Metland+Transyogi/@-6.3977268,106.9751328,17z/data=!3m1!4b1!4m6!3m5!1s0x2e6995fdca64783f:0xfedb580d6d020f3a!8m2!3d-6.3977321!4d106.9777077!16s%2Fg%2F11h3gpsr5l?entry=ttu&g_ep=EgoyMDI2MTExMC4wIKXMDSoASAFQAw%3D%3D",
    warning: "Pool reviews, not class reviews: one customer about two weeks ago raised maintenance and slide/toilet/shower cleanliness concerns. This is a customer account, not a safety finding. Inspect the facilities before enrolling.", phone: "+62 851-1760-8806", rating: 4.4, reviewCount: 183,
    sampleNote: "These are pool-wide Maps ratings, not ratings of the baby class. In a small newest-sorted sample, a review from about two weeks ago raised maintenance, slide and toilet/shower cleanliness concerns. This is one customer's account, not a safety finding. Inspect the facilities before enrolling. Too few reviews were read to judge a trend."
  },
  {
    id: "kiddies88-havana-setiamekar", branchName: "Havana Sport Club (Setiamekar)",
    address: "Havana Sport Club, Jl. Raya Setiamekar No.1, Setiamekar, Tambun Selatan, Kabupaten Bekasi",
    area: "Setiamekar", city: "Bekasi", lat: -6.2341421, lng: 107.042842,
    pdf: "https://drive.google.com/file/d/1PE75BYM3uzs474VxAlt6xzaYxVImYgDO/view?usp=drivesdk",
    maps: "https://www.google.com/maps/place/Havana+Sport+Club/@-6.2341368,107.0402671,17z/data=!3m1!4b1!4m6!3m5!1s0x2e698ee6043f9fed:0x61082768917e82f6!8m2!3d-6.2341421!4d107.042842!16s%2Fg%2F1hm4mwrhg?entry=ttu&g_ep=EgoyMDI2MTExMC4wIKXMDSoASAFQAw%3D%3D",
    warning: "Pool reviews, not class reviews: recent customers raised cleanliness, service and shower-room privacy concerns. These are customer accounts, not safety findings. Inspect the changing facilities before enrolling.", phone: "+62 851-8310-6880", rating: 4.3, reviewCount: 1758,
    sampleNote: "These are pool-wide Maps ratings, not ratings of the baby class. In a small newest-sorted sample, a review from about four weeks ago questioned cleanliness and service; another from about two months ago raised shower-room privacy concerns. These are customer accounts, not safety findings. Inspect the changing facilities before enrolling. Too few reviews were read to judge a trend."
  }
, {
  "id": "kiddies88-wijaya-wisma-jaya",
  "branchName": "Sport Hall Wijaya (Wisma Jaya)",
  "address": "GOR Wijaya, Jl. Kusuma Utara X, Duren Jaya, Bekasi Timur, Kota Bekasi",
  "area": "Duren Jaya",
  "city": "Bekasi",
  "lat": -6.2312517,
  "lng": 107.0345453,
  "pdf": "https://drive.google.com/file/d/1KJfJ0wDRVMPh7xoPoU0kvxrH8ptVzrSt/view?usp=drivesdk",
  "maps": "https://www.google.com/maps/place/Kiddies+88,+GOR+Wijaya/@-6.2312464,107.0319704,17z/data=!3m1!4b1!4m6!3m5!1s0x2e698fe428546651:0xddf325e671de7625!8m2!3d-6.2312517!4d107.0345453!16s%2Fg%2F11wvb54glv?entry=ttu&g_ep=EgoyMDI2MTExMC4wIKXMDSoASAFQAw%3D%3D",
  "phone": "+62 851-8310-6880",
  "rating": 3.5,
  "reviewCount": 2,
  "warning": "Only two Maps reviews were available for this Kiddies88 listing. One concerns unrelated travel; the other, from about seven months ago, reports poor after-sales communication. These do not establish teaching quality. Ask about booking, missed lessons and admin support before paying.",
  "sampleNote": "Google Maps listing for Kiddies88 at GOR Wijaya, only two reviews. One is unrelated travel content; the other reports poor after-sales communication about seven months ago. Not a reliable measure of teaching quality or safety. No newest-review date or trend is claimed."
}
];

export const KIDDIES88_20261118: Venue[] = branches.map(b => ({
  id: b.id, chain: "Kiddies88", branchName: b.branchName, categories: ["Swim"],
  address: b.address, area: b.area, city: b.city, lat: b.lat, lng: b.lng,
  coordinateSource: "maps-pin",
  programs: [
    { name: "Baby Swim", category: "Swim", offering: "offered", age: {minMonths: 3, maxMonths: 18, level: "branch", verification: "provider-confirmed", providerAgeUrl: b.pdf, sourceCheckedAt: checkedAt}, note: [classNote, b.warning].filter(Boolean).join(" "), noteUrl: b.maps, noteLabel: "Maps reviews" },
    { name: "Toddler Swim", category: "Swim", offering: "offered", age: {minMonths: 18, maxMonths: 36, level: "branch", verification: "provider-confirmed", providerAgeUrl: b.pdf, sourceCheckedAt: checkedAt}, note: [classNote, b.warning].filter(Boolean).join(" "), noteUrl: b.maps, noteLabel: "Maps reviews" }
  ],
  website: "https://linktr.ee/Kiddies88", instagram: "https://www.instagram.com/kiddies_88/",
  phone: b.phone, phoneScope: "shared-enquiry", sourceUrl: b.pdf,
  lastCheckedAt: checkedAt, fitStatus: "branch-confirmed-live-undated",
  operatingStatus: { state: "official-listed", source: operationSource, checkedAt },
  notes: "Official branch-specific brochure, reached from the provider's Instagram-linked Linktree, supplies the class ages and prices. Brochure publication date and price validity are not stated. The official 5 November 2026 holiday post names this pool, but its holiday timetable and Rp250,000 offer are not baby-class evidence. Maps pin and closure status checked 18 November 2026. Partner template 0-3 years loses to the explicit official 3-18 / 18-36 month bands. Havana is called Hafana in its brochure and partner listing; the dated official post uses Havana, Setiamekar. Maps reviews do not establish Kiddies88 teaching quality. Confirm availability with the class admin, not the pool reception.",
  priceListings: [
    {sourceKind: "official", label: "Baby/toddler group: 4 lessons, 30 minutes each", amountIdr: 800000, unit: "per package", source: "Kiddies88", sourceUrl: b.pdf, checkedAt, note: packageNote},
    {sourceKind: "official", label: "Baby/toddler private: 4 lessons, 30 minutes each", amountIdr: 1200000, unit: "per package", source: "Kiddies88", sourceUrl: b.pdf, checkedAt, note: packageNote},
    {sourceKind: "official", label: "Baby/toddler private: 8 lessons, 30 minutes each", amountIdr: 2100000, unit: "per package", source: "Kiddies88", sourceUrl: b.pdf, checkedAt, note: packageNote},
    {sourceKind: "official", label: "Separate registration charge", amountIdr: 150000, unit: "registration fee", source: "Kiddies88", sourceUrl: b.pdf, checkedAt, note: registrationNote}
  ],
  reviews: {rating: b.rating, reviewCount: b.reviewCount, source: "Google Maps", sourceUrl: b.maps, checkedAt, sampleNote: b.sampleNote, praiseThemes: [], complaintThemes: []}
}));

export default function enrich1118(venues: Venue[]) {
  for (const branch of KIDDIES88_20261118) {
    if (venues.some(v => v.id === branch.id)) throw new Error(`Duplicate branch ${branch.id}`);
    venues.push(branch);
  }
}
