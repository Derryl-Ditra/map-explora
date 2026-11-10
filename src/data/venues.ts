import { UPDATES } from "./review-aggregate-refresh";
import { UPDATES_2026_11_07 } from "./review-aggregate-2026-11-07";
import { REVIEW_PULSE_2026_11_08 } from "./review-pulse-2026-11-08";
import { BATCH3_VENUES } from "./venues-batch3";

// GENERATED from the reviewed research dataset under4-places-jabodetabek v15-2026-11-03-golden-baby.
// Do not hand-edit; keep in sync with the reviewed source dataset (maintained outside this repo). Every
// record carries its verification status (fitStatus) and per-program evidence
// level. Extraction artifacts (unvalidated text matches) are excluded at import
// time. Offerings confirmed at branch level but without branch-exact ages keep
// their ages at brand/catalog level so exact-age matching cannot claim them.
// Chain-level program_age is never emitted as a branch statement.
import { Venue } from "@/types/venue";

export const VENUES: Venue[] = [
 
 ...BATCH3_VENUES,

 {
  "id": "aquababies-bintaro",
  "chain": "Aquababies",
  "branchName": "Bintaro",
  "categories": [
   "Swim"
  ],
  "address": "Jl. Cempaka Raya No.8, RT.5/RW.11, Bintaro, Kec. Pesanggrahan, Kota Jakarta Selatan, Daerah Khusus Ibukota Jakarta 12330, Indonesia",
  "area": "Jakarta Selatan",
  "city": "Jakarta Selatan",
  "lat": -6.274863,
  "lng": 106.761257,
  "coordinateSource": "maps-pin",
  "programs": [],
  "website": "https://aquababiesindonesia.id/",
  "sourceUrl": "https://aquababiesindonesia.id/",
  "lastCheckedAt": "2026-11-03",
  "fitStatus": "official-chain-program",
  "notes": "Official site: babies 0 months to 3 years.",
  "operatingStatus": {
   "state": "official-listed",
   "source": "https://aquababiesindonesia.id/locations/",
   "checkedAt": "2026-11-04"
  },
  "reviews": {
   "rating": 5.0,
   "reviewCount": 4,
   "source": "Google Maps",
   "sourceUrl": "https://www.google.com/maps/place/Aquababies+Bintaro/@-6.2748631,106.761257,17z/data=!3m1!4b1!4m6!3m5!1s0x2e69f10044acba23:0x1a2ee4c4861a2886!8m2!3d-6.2748631!4d106.761257!16s%2Fg%2F11lc_z51nt",
   "checkedAt": "2026-11-03",
   "praiseThemes": [],
   "complaintThemes": [],
   "sampleNote": "Only 4 Google Maps ratings. Too few to judge."
  }
 },
 {
  "id": "aquababies-menteng",
  "chain": "Aquababies",
  "branchName": "Menteng",
  "categories": [
   "Swim"
  ],
  "address": "Jl. Sawo No.29, RT.10/RW.2, Gondangdia, Kec. Menteng, Kota Jakarta Pusat, Daerah Khusus Ibukota Jakarta 10350, Indonesia",
  "area": "Jakarta Pusat",
  "city": "Jakarta Pusat",
  "lat": -6.194998,
  "lng": 106.835603,
  "coordinateSource": "maps-pin",
  "programs": [],
  "website": "https://aquababiesindonesia.id/",
  "sourceUrl": "https://aquababiesindonesia.id/",
  "lastCheckedAt": "2026-11-03",
  "fitStatus": "official-chain-program",
  "notes": "Official site: babies 0 months to 3 years.",
  "operatingStatus": {
   "state": "official-listed",
   "source": "https://aquababiesindonesia.id/locations/",
   "checkedAt": "2026-11-04"
  },
  "reviews": {
   "rating": 4.2,
   "reviewCount": 48,
   "source": "Google Maps",
   "sourceUrl": "https://www.google.com/maps/place/Aquababies+Indonesia/@-6.1949984,106.8356026,17z/data=!3m1!4b1!4m6!3m5!1s0x2e69f57379a4e225:0x48328ab55ff185f8!8m2!3d-6.1949984!4d106.8356026!16s%2Fg%2F11k0q_0g24",
   "checkedAt": "2026-11-03",
   "praiseThemes": [],
   "complaintThemes": []
  }
 },
 {
  "id": "baby-jumper-gym-gading-serpong",
  "chain": "Baby Jumper Gym",
  "branchName": "Gading Serpong",
  "categories": [
   "Gym & Movement",
   "Enrichment"
  ],
  "address": "Ruko Paramount Center II, Jl. Gading Serpong Boulevard No.2 Blok B1, Pakulonan Barat, Kecamatan Kelapa Dua, Kabupaten Tangerang, Banten 15810, Indonesia",
  "area": "Kabupaten Tangerang",
  "city": "Kabupaten Tangerang",
  "lat": -6.237311,
  "lng": 106.631561,
  "coordinateSource": "maps-pin",
  "programs": [],
  "sourceUrl": "https://www.google.com/maps/search/?api=1&query=Baby+Jumper+Gym+International&query_place_id=ChIJoflVQ_b7aS4RAqPaYzCNkpM",
  "lastCheckedAt": "2026-11-03",
  "fitStatus": "media-claimed",
  "notes": "Media only: Crawler 5-14 months up to Jumper 3.5-5.5 years. No official source found.",
  "operatingStatus": {
   "state": "not-confirmed",
   "checkedAt": "2026-11-03"
  }
 },
 {
  "id": "baby-jumper-gym-pluit",
  "chain": "Baby Jumper Gym",
  "branchName": "Pluit",
  "categories": [
   "Gym & Movement",
   "Enrichment"
  ],
  "address": "JL. Pluit Karang Utara, Blok J1S No. 18M-18N, Pluit, RT.20/RW.2, Pluit, Kecamatan Penjaringan, Jkt Utara, Daerah Khusus Ibukota Jakarta 14450, Indonesia",
  "area": "Jakarta Utara",
  "city": "Jakarta Utara",
  "lat": -6.109251,
  "lng": 106.777606,
  "coordinateSource": "maps-pin",
  "programs": [],
  "sourceUrl": "https://www.google.com/maps/search/?api=1&query=Baby+Jumper+Gym+International&query_place_id=ChIJ_dKPM6Qdai4R0dFLlVanRIw",
  "lastCheckedAt": "2026-11-03",
  "fitStatus": "media-claimed",
  "notes": "Media only: Crawler 5-14 months up to Jumper 3.5-5.5 years. No official source found.",
  "operatingStatus": {
   "state": "not-confirmed",
   "source": "https://www.google.com/maps/place/Baby+Jumper+Gym+International/@-6.1092509,106.7776064,17z/data=!3m1!4b1!4m6!3m5!1s0x2e6a1da4338fd2fd:0x8c44a756954bd1d1!8m2!3d-6.1092509!4d106.7776064!16s%2Fg%2F1pzr5",
   "checkedAt": "2026-11-03"
  },
  "reviews": {
   "rating": 3.5,
   "reviewCount": 2,
   "source": "Google Maps",
   "sourceUrl": "https://www.google.com/maps/place/Baby+Jumper+Gym+International/@-6.1092509,106.7776064,17z/data=!3m1!4b1!4m6!3m5!1s0x2e6a1da4338fd2fd:0x8c44a756954bd1d1!8m2!3d-6.1092509!4d106.7776064!16s%2Fg%2F1pzr5",
   "checkedAt": "2026-11-03",
   "praiseThemes": [],
   "complaintThemes": [],
   "sampleNote": "Only 2 Google Maps ratings. Too few to judge."
  },
  "phone": "+62 21 66606297"
 },
 {
  "id": "english-1-bintaro-tangerang",
  "chain": "English 1",
  "branchName": "Bintaro Tangerang",
  "categories": [
   "English & Language"
  ],
  "address": "Ruko Multi Guna Komplek Blok 8XY Jl. Bintaro Utama Sektor 3A, Jurang Manggu Tim., Kec. Pd. Aren, Kota Tangerang Selatan, Banten 15222, Indonesia",
  "area": "Tangerang Selatan",
  "city": "Tangerang Selatan",
  "lat": -6.268311,
  "lng": 106.737694,
  "coordinateSource": "maps-pin",
  "programs": [],
  "website": "https://english1.co.id/",
  "sourceUrl": "https://english1.co.id/",
  "lastCheckedAt": "2026-11-03",
  "fitStatus": "official-chain-program",
  "notes": "Official FAQ: ages 3 to 18; Small Stars program ages 3-6.",
  "operatingStatus": {
   "state": "official-listed",
   "source": "https://english1.co.id/school/tangerang/",
   "checkedAt": "2026-11-04"
  },
  "reviews": {
   "rating": 4.6,
   "reviewCount": 85,
   "source": "Google Maps",
   "sourceUrl": "https://www.google.com/maps/place/English+1+Bintaro+Tangerang/@-6.2683113,106.7376941,17z/data=!3m1!4b1!4m6!3m5!1s0x2e69f068a5c93f47:0xd8a1708972e52e55!8m2!3d-6.2683113!4d106.7376941!16s%2Fg%2F1typqrl",
   "checkedAt": "2026-11-03",
   "praiseThemes": [],
   "complaintThemes": []
  }
 },
 {
  "id": "english-1-cempaka-putih",
  "chain": "English 1",
  "branchName": "Cempaka Putih",
  "categories": [
   "English & Language"
  ],
  "address": "Arandra Residence Tower Victory, Jl. Cempaka Putih Raya No.1 Lantai UG 01-UG 02, RT.1/RW.6, Cemp. Putih Tim., Kec. Cemp. Putih, Kota Jakarta Pusat, Daerah Khusus Ibukota Jakarta 10510, Indonesia",
  "area": "Jakarta Pusat",
  "city": "Jakarta Pusat",
  "lat": -6.176798,
  "lng": 106.86505,
  "coordinateSource": "maps-pin",
  "programs": [],
  "website": "https://english1.co.id/",
  "sourceUrl": "https://english1.co.id/",
  "lastCheckedAt": "2026-11-03",
  "fitStatus": "official-chain-program",
  "notes": "Official FAQ: ages 3 to 18; Small Stars program ages 3-6.",
  "operatingStatus": {
   "state": "official-listed",
   "source": "https://english1.co.id/school/jakarta/",
   "checkedAt": "2026-11-04"
  },
  "reviews": {
   "rating": 4.9,
   "reviewCount": 117,
   "source": "Google Maps",
   "sourceUrl": "https://www.google.com/maps/place/English+1+Cempaka+Putih/@-6.176798,106.8650502,17z/data=!3m1!4b1!4m6!3m5!1s0x2e69f5de7b29f121:0xb8425e30a02eb605!8m2!3d-6.176798!4d106.8650502!16s%2Fg%2F11vq384bqp",
   "checkedAt": "2026-11-03",
   "praiseThemes": [],
   "complaintThemes": []
  }
 },
 {
  "id": "english-1-cikupa-tangerang",
  "chain": "English 1",
  "branchName": "Cikupa Tangerang",
  "categories": [
   "English & Language"
  ],
  "address": "Ruko Little Ginza, Jl. Citra Raya Boulevard Jl. Ecopolis Citra Raya No.390 Bl. R02/388, Area Ecopolis, Mekar Bakti, Kec. Panongan, Kabupaten Tangerang, Banten 15710, Indonesia",
  "area": "Kabupaten Tangerang",
  "city": "Kabupaten Tangerang",
  "lat": -6.25662,
  "lng": 106.526361,
  "coordinateSource": "maps-pin",
  "programs": [],
  "website": "https://english1.co.id/",
  "sourceUrl": "https://english1.co.id/",
  "lastCheckedAt": "2026-11-03",
  "fitStatus": "official-chain-program",
  "notes": "Official FAQ: ages 3 to 18; Small Stars program ages 3-6.",
  "operatingStatus": {
   "state": "official-listed",
   "source": "https://english1.co.id/school/tangerang/",
   "checkedAt": "2026-11-04"
  },
  "reviews": {
   "rating": 4.6,
   "reviewCount": 64,
   "source": "Google Maps",
   "sourceUrl": "https://www.google.com/maps/place/English+1+Cikupa+Tangerang/@-6.2566203,106.5263614,17z/data=!3m1!4b1!4m6!3m5!1s0x2e420790d737c44f:0xaee30870bba29a47!8m2!3d-6.2566203!4d106.5263614!16s%2Fg%2F11f5ps1_",
   "checkedAt": "2026-11-03",
   "praiseThemes": [],
   "complaintThemes": []
  }
 },
 {
  "id": "english-1-ciledug-tangerang",
  "chain": "English 1",
  "branchName": "Ciledug Tangerang",
  "categories": [
   "English & Language"
  ],
  "address": "Hypermart Ciledug, Jl. HOS Cokroaminoto No.53-55 Lt 2, RT.001/RW.006, Kreo Selatan, Kec. Larangan, Kota Tangerang, Banten 15155, Indonesia",
  "area": "Kota Tangerang",
  "city": "Kota Tangerang",
  "lat": -6.235691,
  "lng": 106.739551,
  "coordinateSource": "maps-pin",
  "programs": [],
  "website": "https://english1.co.id/",
  "sourceUrl": "https://english1.co.id/",
  "lastCheckedAt": "2026-11-03",
  "fitStatus": "official-chain-program",
  "notes": "Official FAQ: ages 3 to 18; Small Stars program ages 3-6.",
  "operatingStatus": {
   "state": "official-listed",
   "source": "https://english1.co.id/school/tangerang/",
   "checkedAt": "2026-11-04"
  },
  "reviews": {
   "rating": 5.0,
   "reviewCount": 762,
   "source": "Google Maps",
   "sourceUrl": "https://www.google.com/maps/place/English+1+Ciledug+Tangerang/@-6.2356906,106.7395511,17z/data=!3m1!4b1!4m6!3m5!1s0x2e69f146978cade9:0x10ceda633d22a1db!8m2!3d-6.2356906!4d106.7395511!16s%2Fg%2F11vr6k5",
   "checkedAt": "2026-11-03",
   "praiseThemes": [],
   "complaintThemes": []
  }
 },
 {
  "id": "english-1-cinere-depok",
  "chain": "English 1",
  "branchName": "Cinere Depok",
  "categories": [
   "English & Language"
  ],
  "address": "Jl. Cinere Raya No.28-30, Blok A, Cinere, Kec. Cinere, Kota Depok, Jawa Barat 16514, Indonesia",
  "area": "Depok",
  "city": "Depok",
  "lat": -6.324735,
  "lng": 106.784752,
  "coordinateSource": "maps-pin",
  "programs": [],
  "website": "https://english1.co.id/",
  "sourceUrl": "https://english1.co.id/",
  "lastCheckedAt": "2026-11-03",
  "fitStatus": "official-chain-program",
  "notes": "Official FAQ: ages 3 to 18; Small Stars program ages 3-6.",
  "operatingStatus": {
   "state": "official-listed",
   "source": "https://english1.co.id/school/depok/",
   "checkedAt": "2026-11-04"
  },
  "reviews": {
   "rating": 4.8,
   "reviewCount": 357,
   "source": "Google Maps",
   "sourceUrl": "https://www.google.com/maps/place/English+1+Cinere+Depok/@-6.3247346,106.7847522,17z/data=!3m1!4b1!4m6!3m5!1s0x2e69ee464e926e53:0xd88f17e8a7edfd5c!8m2!3d-6.3247346!4d106.7847522!16s%2Fg%2F1tcynz8j",
   "checkedAt": "2026-11-03",
   "praiseThemes": [],
   "complaintThemes": []
  }
 },
 {
  "id": "english-1-cipete",
  "chain": "English 1",
  "branchName": "Cipete",
  "categories": [
   "English & Language"
  ],
  "address": "Jl. Cipete Raya No.8C, RT.12/RW.6, Cipete Sel., Kec. Cilandak, Kota Jakarta Selatan, Daerah Khusus Ibukota Jakarta 12410, Indonesia",
  "area": "Jakarta Selatan",
  "city": "Jakarta Selatan",
  "lat": -6.277768,
  "lng": 106.804075,
  "coordinateSource": "maps-pin",
  "programs": [],
  "website": "https://english1.co.id/",
  "sourceUrl": "https://english1.co.id/",
  "lastCheckedAt": "2026-11-03",
  "fitStatus": "official-chain-program",
  "notes": "Official FAQ: ages 3 to 18; Small Stars program ages 3-6.",
  "operatingStatus": {
   "state": "official-listed",
   "source": "https://english1.co.id/school/jakarta/",
   "checkedAt": "2026-11-04"
  },
  "reviews": {
   "rating": 4.9,
   "reviewCount": 42,
   "source": "Google Maps",
   "sourceUrl": "https://www.google.com/maps/place/English+1+Cipete/@-6.2777679,106.8040747,17z/data=!3m1!4b1!4m6!3m5!1s0x2e69f1f79d93d2af:0xfe348cb72e728145!8m2!3d-6.2777679!4d106.8040747!16s%2Fg%2F11vzdkb4n1",
   "checkedAt": "2026-11-03",
   "praiseThemes": [],
   "complaintThemes": []
  }
 },
 {
  "id": "english-1-jagakarsa-tanjung-barat",
  "chain": "English 1",
  "branchName": "Jagakarsa Tanjung Barat",
  "categories": [
   "English & Language"
  ],
  "address": "AEON Mall, Jl. Raya Tj. Barat No.163 5th Floor, RT.12/RW.4, Tj. Bar., Kec. Jagakarsa, Kota Jakarta Selatan, Daerah Khusus Ibukota Jakarta 12530, Indonesia",
  "area": "Jakarta Selatan",
  "city": "Jakarta Selatan",
  "lat": -6.30561,
  "lng": 106.839957,
  "coordinateSource": "maps-pin",
  "programs": [],
  "website": "https://english1.co.id/",
  "sourceUrl": "https://english1.co.id/",
  "lastCheckedAt": "2026-11-03",
  "fitStatus": "official-chain-program",
  "notes": "Official FAQ: ages 3 to 18; Small Stars program ages 3-6.",
  "operatingStatus": {
   "state": "official-listed",
   "source": "https://english1.co.id/school/jakarta/",
   "checkedAt": "2026-11-04"
  },
  "reviews": {
   "rating": 5.0,
   "reviewCount": 960,
   "source": "Google Maps",
   "sourceUrl": "https://www.google.com/maps/place/English+1+Jagakarsa+Tanjung+Barat/@-6.3056095,106.8399574,17z/data=!3m1!4b1!4m6!3m5!1s0x2e69ed367e432663:0x6129fb97cc615eab!8m2!3d-6.3056095!4d106.8399574!16s%2Fg%2F1",
   "checkedAt": "2026-11-03",
   "praiseThemes": [],
   "complaintThemes": []
  }
 },
 {
  "id": "english-1-pamulang-tangerang",
  "chain": "English 1",
  "branchName": "Pamulang Tangerang",
  "categories": [
   "English & Language"
  ],
  "address": "Jl. Pamulang Permai No.15 Kav 2, West Pamulang, Pamulang, South Tangerang City, Banten 15417, Indonesia",
  "area": "Tangerang Selatan",
  "city": "Tangerang Selatan",
  "lat": -6.342915,
  "lng": 106.731063,
  "coordinateSource": "maps-pin",
  "programs": [],
  "website": "https://english1.co.id/",
  "sourceUrl": "https://english1.co.id/",
  "lastCheckedAt": "2026-11-03",
  "fitStatus": "official-chain-program",
  "notes": "Official FAQ: ages 3 to 18; Small Stars program ages 3-6.",
  "operatingStatus": {
   "state": "official-listed",
   "source": "https://english1.co.id/school/tangerang/pamulang/",
   "checkedAt": "2026-11-04"
  }
 },
 {
  "id": "english-1-pejaten",
  "chain": "English 1",
  "branchName": "Pejaten",
  "categories": [
   "English & Language"
  ],
  "address": "The Park Pejaten, Jl. Warung Jati Barat No.39 Lantai-UG, RT.1/RW.5, Jati Padang, Ps. Minggu, Kota Jakarta Selatan, Daerah Khusus Ibukota Jakarta 12540, Indonesia",
  "area": "Jakarta Selatan",
  "city": "Jakarta Selatan",
  "lat": -6.280801,
  "lng": 106.82862,
  "coordinateSource": "maps-pin",
  "programs": [],
  "website": "https://english1.co.id/",
  "sourceUrl": "https://english1.co.id/",
  "lastCheckedAt": "2026-11-03",
  "fitStatus": "official-chain-program",
  "notes": "Official FAQ: ages 3 to 18; Small Stars program ages 3-6.",
  "operatingStatus": {
   "state": "official-listed",
   "source": "https://english1.co.id/school/jakarta/",
   "checkedAt": "2026-11-04"
  },
  "reviews": {
   "rating": 4.9,
   "reviewCount": 193,
   "source": "Google Maps",
   "sourceUrl": "https://www.google.com/maps/place/English+1+Pejaten/@-6.2808009,106.8286199,17z/data=!3m1!4b1!4m6!3m5!1s0x2e69f218251bb44f:0x36ecd56ecdeb565b!8m2!3d-6.2808009!4d106.8286199!16s%2Fg%2F1tg_12w2",
   "checkedAt": "2026-11-03",
   "praiseThemes": [],
   "complaintThemes": []
  }
 },
 {
  "id": "english-1-permata-hijau",
  "chain": "English 1",
  "branchName": "Permata Hijau",
  "categories": [
   "English & Language"
  ],
  "address": "Grand ITC Permata Hijau, Ruko Blok Diamond, Jl. Arteri Permata Hijau No.16 15-16, RT.7/RW.10, Grogol Utara, Kec. Kebayoran Lama, Jakarta, Daerah Khusus Ibukota Jakarta 12210, Indonesia",
  "area": "Jabodetabek (unclassified)",
  "city": "Jabodetabek (unclassified)",
  "lat": -6.220262,
  "lng": 106.7823,
  "coordinateSource": "maps-pin",
  "programs": [],
  "website": "https://english1.co.id/",
  "sourceUrl": "https://english1.co.id/",
  "lastCheckedAt": "2026-11-03",
  "fitStatus": "official-chain-program",
  "notes": "Official FAQ: ages 3 to 18; Small Stars program ages 3-6.",
  "operatingStatus": {
   "state": "official-listed",
   "source": "https://english1.co.id/school/jakarta/",
   "checkedAt": "2026-11-04"
  },
  "reviews": {
   "rating": 4.8,
   "reviewCount": 124,
   "source": "Google Maps",
   "sourceUrl": "https://www.google.com/maps/place/English+1+Permata+Hijau/@-6.2202621,106.7823003,17z/data=!3m1!4b1!4m6!3m5!1s0x2e69f139a4b3573b:0xcf5bbdb72f5b3326!8m2!3d-6.2202621!4d106.7823003!16s%2Fg%2F1tg2yrrk",
   "checkedAt": "2026-11-03",
   "praiseThemes": [],
   "complaintThemes": []
  }
 },
 {
  "id": "english-1-pluit-village",
  "chain": "English 1",
  "branchName": "Pluit Village",
  "categories": [
   "English & Language"
  ],
  "address": "Ruko Pluit Village Mall, Jl. Pluit Permai No.27-29, RT.1/RW.4, Pluit, Kecamatan Penjaringan, Jkt Utara, Daerah Khusus Ibukota Jakarta 14450, Indonesia",
  "area": "Jakarta Utara",
  "city": "Jakarta Utara",
  "lat": -6.115722,
  "lng": 106.789857,
  "coordinateSource": "maps-pin",
  "programs": [],
  "website": "https://english1.co.id/",
  "sourceUrl": "https://english1.co.id/",
  "lastCheckedAt": "2026-11-03",
  "fitStatus": "official-chain-program",
  "notes": "Official FAQ: ages 3 to 18; Small Stars program ages 3-6.",
  "operatingStatus": {
   "state": "official-listed",
   "source": "https://english1.co.id/school/jakarta/",
   "checkedAt": "2026-11-04"
  },
  "reviews": {
   "rating": 4.9,
   "reviewCount": 437,
   "source": "Google Maps",
   "sourceUrl": "https://www.google.com/maps/place/English+1+Pluit+Village/@-6.1157222,106.7898568,17z/data=!3m1!4b1!4m6!3m5!1s0x2e6a1d95f575197f:0x200267828bd47395!8m2!3d-6.1157222!4d106.7898568!16s%2Fg%2F1thzx2hf",
   "checkedAt": "2026-11-03",
   "praiseThemes": [],
   "complaintThemes": []
  }
 },
 {
  "id": "english-1-pondok-indah",
  "chain": "English 1",
  "branchName": "Pondok Indah",
  "categories": [
   "English & Language"
  ],
  "address": "Ruko Plaza Pondok Indah I Jalan Metro Pondok Indah Blok UA No.53 Kebayoran Lama Pondok Indah, RT.4/RW.14, Pondok Pinang, Kebayoran Lama, South Jakarta City, Jakarta 12310, Indonesia",
  "area": "Jakarta Selatan",
  "city": "Jakarta Selatan",
  "lat": -6.284231,
  "lng": 106.780953,
  "coordinateSource": "maps-pin",
  "programs": [],
  "website": "https://english1.co.id/",
  "sourceUrl": "https://english1.co.id/",
  "lastCheckedAt": "2026-11-03",
  "fitStatus": "official-chain-program",
  "notes": "Official FAQ: ages 3 to 18; Small Stars program ages 3-6.",
  "operatingStatus": {
   "state": "official-listed",
   "source": "https://english1.co.id/school/jakarta/",
   "checkedAt": "2026-11-04"
  },
  "reviews": {
   "rating": 4.9,
   "reviewCount": 129,
   "source": "Google Maps",
   "sourceUrl": "https://www.google.com/maps/place/English+1+Pondok+Indah/@-6.2842313,106.7809526,17z/data=!3m1!4b1!4m6!3m5!1s0x2e69f1c8c63c4c39:0xbfab8abc85ecd9dd!8m2!3d-6.2842313!4d106.7809526!16s%2Fg%2F1thh4vv1",
   "checkedAt": "2026-11-03",
   "praiseThemes": [],
   "complaintThemes": []
  }
 },
 {
  "id": "english-1-puri-indah",
  "chain": "English 1",
  "branchName": "Puri Indah",
  "categories": [
   "English & Language"
  ],
  "address": "M 8-1, Ruko Puri Niaga, Jl. Puri Kencana Blk J1, RT.5/RW.2, Kembangan Sel., Kec. Kembangan, Kota Jakarta Barat, Daerah Khusus Ibukota Jakarta 11610, Indonesia",
  "area": "Jakarta Barat",
  "city": "Jakarta Barat",
  "lat": -6.190657,
  "lng": 106.745476,
  "coordinateSource": "maps-pin",
  "programs": [],
  "website": "https://english1.co.id/",
  "sourceUrl": "https://english1.co.id/",
  "lastCheckedAt": "2026-11-03",
  "fitStatus": "official-chain-program",
  "notes": "Official FAQ: ages 3 to 18; Small Stars program ages 3-6.",
  "operatingStatus": {
   "state": "official-listed",
   "source": "https://english1.co.id/school/jakarta/",
   "checkedAt": "2026-11-04"
  },
  "reviews": {
   "rating": 4.9,
   "reviewCount": 519,
   "source": "Google Maps",
   "sourceUrl": "https://www.google.com/maps/place/English+1+Puri+Indah/@-6.1906575,106.7454761,17z/data=!3m1!4b1!4m6!3m5!1s0x2e69f712c19ef0cf:0xc78042438414cee2!8m2!3d-6.1906575!4d106.7454761!16s%2Fg%2F1td0jts2",
   "checkedAt": "2026-11-03",
   "praiseThemes": [],
   "complaintThemes": []
  }
 },
 {
  "id": "english-1-rawamangun",
  "chain": "English 1",
  "branchName": "Rawamangun",
  "categories": [
   "English & Language"
  ],
  "address": "Jl. Pemuda No.66, RT.1/RW.14, Rawamangun, Kec. Pulo Gadung, Kota Jakarta Timur, Daerah Khusus Ibukota Jakarta 13220, Indonesia",
  "area": "Jakarta Timur",
  "city": "Jakarta Timur",
  "lat": -6.193258,
  "lng": 106.881993,
  "coordinateSource": "maps-pin",
  "programs": [],
  "website": "https://english1.co.id/",
  "sourceUrl": "https://english1.co.id/",
  "lastCheckedAt": "2026-11-03",
  "fitStatus": "official-chain-program",
  "notes": "Official FAQ: ages 3 to 18; Small Stars program ages 3-6.",
  "operatingStatus": {
   "state": "official-listed",
   "source": "https://english1.co.id/school/jakarta/",
   "checkedAt": "2026-11-04"
  },
  "reviews": {
   "rating": 4.7,
   "reviewCount": 103,
   "source": "Google Maps",
   "sourceUrl": "https://www.google.com/maps/place/English+1+Rawamangun/@-6.193258,106.881993,17z/data=!3m1!4b1!4m6!3m5!1s0x2e69f4ece858e957:0xa40da769611780ec!8m2!3d-6.193258!4d106.881993!16s%2Fg%2F1tqks3_v",
   "checkedAt": "2026-11-03",
   "praiseThemes": [],
   "complaintThemes": []
  }
 },
 {
  "id": "english-1-sawangan-depok",
  "chain": "English 1",
  "branchName": "Sawangan Depok",
  "categories": [
   "English & Language"
  ],
  "address": "Ruko CitraLake Sawangan Blok B08 No.01-02, Kedaung, Kec. Sawangan, Kota Depok, Jawa Barat 16516, Indonesia",
  "area": "Depok",
  "city": "Depok",
  "lat": -6.381932,
  "lng": 106.748496,
  "coordinateSource": "maps-pin",
  "programs": [],
  "website": "https://english1.co.id/",
  "sourceUrl": "https://english1.co.id/",
  "lastCheckedAt": "2026-11-03",
  "fitStatus": "official-chain-program",
  "notes": "Official FAQ: ages 3 to 18; Small Stars program ages 3-6.",
  "operatingStatus": {
   "state": "official-listed",
   "source": "https://english1.co.id/school/depok/",
   "checkedAt": "2026-11-04"
  },
  "reviews": {
   "rating": 4.9,
   "reviewCount": 180,
   "source": "Google Maps",
   "sourceUrl": "https://www.google.com/maps/place/English+1+Sawangan+Depok/@-6.3819321,106.7484958,17z/data=!3m1!4b1!4m6!3m5!1s0x2e69ef53ddf87061:0xcb567a851808fbc5!8m2!3d-6.3819321!4d106.7484958!16s%2Fg%2F11rt_w7p9c",
   "checkedAt": "2026-11-03",
   "praiseThemes": [],
   "complaintThemes": []
  }
 },
 {
  "id": "english-1-sunter",
  "chain": "English 1",
  "branchName": "Sunter",
  "categories": [
   "English & Language"
  ],
  "address": "The Linq Central Kemayoran, Jl. Griya Utama No.839 Blk G2, Flamboyan, Pademangan Tim., Kec. Pademangan, DKI, Daerah Khusus Ibukota Jakarta 14410, Indonesia",
  "area": "Jabodetabek (unclassified)",
  "city": "Jabodetabek (unclassified)",
  "lat": -6.141394,
  "lng": 106.852368,
  "coordinateSource": "maps-pin",
  "programs": [],
  "website": "https://english1.co.id/",
  "sourceUrl": "https://english1.co.id/",
  "lastCheckedAt": "2026-11-03",
  "fitStatus": "official-chain-program",
  "notes": "Official FAQ: ages 3 to 18; Small Stars program ages 3-6.",
  "operatingStatus": {
   "state": "official-listed",
   "source": "https://english1.co.id/school/jakarta/",
   "checkedAt": "2026-11-04"
  },
  "reviews": {
   "rating": 5.0,
   "reviewCount": 237,
   "source": "Google Maps",
   "sourceUrl": "https://www.google.com/maps/place/English+1+Sunter/@-6.141394,106.8523676,17z/data=!3m1!4b1!4m6!3m5!1s0x2e69f594d459e4d1:0x7b414ae1a30eef48!8m2!3d-6.141394!4d106.8523676!16s%2Fg%2F11kqstv4js",
   "checkedAt": "2026-11-03",
   "praiseThemes": [],
   "complaintThemes": []
  }
 },
 {
  "id": "english-1-tamini-square",
  "chain": "English 1",
  "branchName": "Tamini Square",
  "categories": [
   "English & Language"
  ],
  "address": "Tamini Square, Jl. Taman Mini I No.Raya Upper Ground US-08, RT.3/RW.2, Pinang Ranti, Makasar, East Jakarta City, Jakarta 13560, Indonesia",
  "area": "Jakarta Timur",
  "city": "Jakarta Timur",
  "lat": -6.29169,
  "lng": 106.881482,
  "coordinateSource": "maps-pin",
  "programs": [],
  "website": "https://english1.co.id/",
  "sourceUrl": "https://english1.co.id/",
  "lastCheckedAt": "2026-11-03",
  "fitStatus": "official-chain-program",
  "notes": "Official FAQ: ages 3 to 18; Small Stars program ages 3-6.",
  "operatingStatus": {
   "state": "official-listed",
   "source": "https://english1.co.id/school/jakarta/",
   "checkedAt": "2026-11-04"
  },
  "reviews": {
   "rating": 4.9,
   "reviewCount": 57,
   "source": "Google Maps",
   "sourceUrl": "https://www.google.com/maps/place/English+1+Tamini+Square/@-6.2916896,106.8814824,17z/data=!3m1!4b1!4m6!3m5!1s0x2e69f29bbf105b03:0x98f8b38d72cbfd4e!8m2!3d-6.2916896!4d106.8814824!16s%2Fg%2F1tzfvjzv",
   "checkedAt": "2026-11-03",
   "praiseThemes": [],
   "complaintThemes": []
  }
 },
 {
  "id": "english-1-tangcity-tangerang",
  "chain": "English 1",
  "branchName": "Tangcity Tangerang",
  "categories": [
   "English & Language"
  ],
  "address": "Tangerang City Business Park, Ruko Blok F. 19, Jl. Jenderal Sudirman No.1, RT.005/RW.005, Babakan, Tangerang, Tangerang City, Banten 15117, Indonesia",
  "area": "Kota Tangerang",
  "city": "Kota Tangerang",
  "lat": -6.193401,
  "lng": 106.634782,
  "coordinateSource": "maps-pin",
  "programs": [],
  "website": "https://english1.co.id/",
  "sourceUrl": "https://english1.co.id/",
  "lastCheckedAt": "2026-11-03",
  "fitStatus": "official-chain-program",
  "notes": "Official FAQ: ages 3 to 18; Small Stars program ages 3-6.",
  "operatingStatus": {
   "state": "official-listed",
   "source": "https://english1.co.id/school/tangerang/",
   "checkedAt": "2026-11-04"
  },
  "reviews": {
   "rating": 5.0,
   "reviewCount": 816,
   "source": "Google Maps",
   "sourceUrl": "https://www.google.com/maps/place/English+1+Tangcity+Tangerang/@-6.1934014,106.6347815,17z/data=!3m1!4b1!4m6!3m5!1s0x2e69f931ee1d344d:0xc87ce696ee1c4a78!8m2!3d-6.1934014!4d106.6347815!16s%2Fg%2F1tk1wg",
   "checkedAt": "2026-11-03",
   "praiseThemes": [],
   "complaintThemes": []
  }
 },
 {
  "id": "english-1-tanjung-duren",
  "chain": "English 1",
  "branchName": "Tanjung Duren",
  "categories": [
   "English & Language"
  ],
  "address": "Ruko Tomang Tol, Jl. Arjuna Utara No.1, RT.1/RW.1, South Tanjung Duren, Grogol petamburan, West Jakarta City, Jakarta 11470, Indonesia",
  "area": "Jakarta Barat",
  "city": "Jakarta Barat",
  "lat": -6.184724,
  "lng": 106.78771,
  "coordinateSource": "maps-pin",
  "programs": [],
  "website": "https://english1.co.id/",
  "sourceUrl": "https://english1.co.id/",
  "lastCheckedAt": "2026-11-03",
  "fitStatus": "official-chain-program",
  "notes": "Official FAQ: ages 3 to 18; Small Stars program ages 3-6.",
  "operatingStatus": {
   "state": "official-listed",
   "source": "https://english1.co.id/school/jakarta/",
   "checkedAt": "2026-11-04"
  },
  "reviews": {
   "rating": 4.8,
   "reviewCount": 665,
   "source": "Google Maps",
   "sourceUrl": "https://www.google.com/maps/place/English+1+Tanjung+Duren/@-6.1847245,106.78771,17z/data=!3m1!4b1!4m6!3m5!1s0x2e69f6f3a2498883:0x5f6d0c35c0f37c54!8m2!3d-6.1847245!4d106.78771!16s%2Fg%2F1td0_s90",
   "checkedAt": "2026-11-03",
   "praiseThemes": [],
   "complaintThemes": []
  }
 },
 {
  "id": "english-1-tebet",
  "chain": "English 1",
  "branchName": "Tebet",
  "categories": [
   "English & Language"
  ],
  "address": "Gedung Sentra Pancoran Lantai 2 Jl. MT Haryono Kav. 1 Pancoran, RT.1/RW.6, West Tebet, Tebet, South Jakarta City, Jakarta 12180, Indonesia",
  "area": "Jakarta Selatan",
  "city": "Jakarta Selatan",
  "lat": -6.242604,
  "lng": 106.844688,
  "coordinateSource": "maps-pin",
  "programs": [],
  "website": "https://english1.co.id/",
  "sourceUrl": "https://english1.co.id/",
  "lastCheckedAt": "2026-11-03",
  "fitStatus": "official-chain-program",
  "notes": "Official FAQ: ages 3 to 18; Small Stars program ages 3-6.",
  "operatingStatus": {
   "state": "official-listed",
   "source": "https://english1.co.id/school/jakarta/",
   "checkedAt": "2026-11-04"
  },
  "reviews": {
   "rating": 4.9,
   "reviewCount": 448,
   "source": "Google Maps",
   "sourceUrl": "https://www.google.com/maps/place/English+1+Tebet/@-6.2426037,106.8446877,17z/data=!3m1!4b1!4m6!3m5!1s0x2e69f3a6a224e4d3:0xcce1f90e4c336ba9!8m2!3d-6.2426037!4d106.8446877!16s%2Fg%2F1vyd3plx",
   "checkedAt": "2026-11-03",
   "praiseThemes": [],
   "complaintThemes": []
  }
 },
 {
  "id": "golden-baby-school-jakarta-garden-city",
  "chain": "Golden Baby School",
  "branchName": "Jakarta Garden City",
  "categories": [
   "Gym & Movement",
   "Sensory"
  ],
  "address": "Perumahan Jakarta Garden City, Jl. Cassia Utama, Cakung Timur, Kec. Cakung, Jakarta Timur 13910",
  "area": "Jakarta Timur",
  "city": "Jakarta Timur",
  "lat": -6.1785493,
  "lng": 106.9570159,
  "coordinateSource": "maps-pin",
  "programs": [
   {
    "name": "Baby Crawler",
    "offering": "offered",
    "age": {
     "minMonths": 5,
     "maxMonths": 13,
     "providerAgeUrl": "https://goldenschool.id/the-baby-crawler-class-at-golden-baby-school/",
     "sourceCheckedAt": "2026-11-03",
     "level": "branch",
     "verification": "provider-confirmed"
    },
    "note": "Baby Crawler Class, babies 5-13 months. Provider page is undated; read 2026-11-03. Schedule and price not carried here."
   }
  ],
  "website": "https://goldenschool.id/",
  "sourceUrl": "https://goldenschool.id/the-baby-crawler-class-at-golden-baby-school/",
  "lastCheckedAt": "2026-11-03",
  "fitStatus": "branch-confirmed-live-undated",
  "notes": "Independent provider. Address matched to Google Places listing by name and area. Provider page undated; read 2026-11-03.",
  "operatingStatus": {
   "state": "official-listed",
   "source": "https://goldenschool.id/",
   "checkedAt": "2026-11-04"
  },
  "reviews": {
   "rating": 4.9,
   "reviewCount": 108,
   "source": "Google Maps",
   "sourceUrl": "https://www.google.com/maps/place/Golden+Baby+School/@-6.1785493,106.9570159,17z/data=!3m1!4b1!4m6!3m5!1s0x2e698b0723f6d27b:0x8aff3ed5a820dc88!8m2!3d-6.1785493!4d106.9570159!16s%2Fg%2F11b6dg1gnp",
   "checkedAt": "2026-11-03",
   "praiseThemes": [],
   "complaintThemes": []
  },
  "phone": "+62 812-9897-3858"
 },
 {
  "id": "gymboree-play-music-gymboree-play-indonesia-music",
  "chain": "Gymboree Play & Music",
  "branchName": "Gymboree Play & Indonesia Music",
  "categories": [
   "Gym & Movement",
   "Play",
   "Music"
  ],
  "address": "Supermal Karawaci, Jl. Boulevard Diponegoro No.105 2nd Floor/10, Bencongan, Kecamatan Kelapa Dua, Kabupaten Tangerang, Banten 15811, Indonesia",
  "area": "Kabupaten Tangerang",
  "city": "Kabupaten Tangerang",
  "lat": -6.226825,
  "lng": 106.606904,
  "coordinateSource": "maps-pin",
  "programs": [],
  "website": "https://www.gymboreeclasses.com/",
  "sourceUrl": "https://www.gymboreeclasses.com/",
  "lastCheckedAt": "2026-11-03",
  "fitStatus": "official-global-unverified-local",
  "notes": "Global official site states ages 0-5, but this does not confirm the Indonesian branches offer them or still operate; the Indonesia branches are Google Maps listings only, provider-side currentness unverified.",
  "operatingStatus": {
   "state": "not-confirmed",
   "source": "https://www.google.com/maps/place/Gymboree+Play+%26+Indonesia+Music/@-6.226825,106.606904,15z/data=!3m1!4b1!4m6!3m5!1s0x2e69fc1f9fc4f6f1:0x40050750b12fbc83!8m2!3d-6.226825!4d106.606904!16s%2Fg%2F1pzsf",
   "checkedAt": "2026-11-03"
  },
  "reviews": {
   "rating": 4.5,
   "reviewCount": 2,
   "source": "Google Maps",
   "sourceUrl": "https://www.google.com/maps/place/Gymboree+Play+%26+Indonesia+Music/@-6.226825,106.606904,15z/data=!3m1!4b1!4m6!3m5!1s0x2e69fc1f9fc4f6f1:0x40050750b12fbc83!8m2!3d-6.226825!4d106.606904!16s%2Fg%2F1pzsf",
   "checkedAt": "2026-11-03",
   "praiseThemes": [],
   "complaintThemes": [],
   "sampleNote": "Only 2 Google Maps ratings. Too few to judge."
  },
  "phone": "+62 21 5473525"
 },
 {
  "id": "gymboree-play-music-gymboree-play-music",
  "chain": "Gymboree Play & Music",
  "branchName": "Gymboree Play & Music",
  "categories": [
   "Gym & Movement",
   "Play",
   "Music"
  ],
  "address": "Jl. Kemang Raya No.8, RT.12/RW.5, Bangka, Kec. Mampang Prpt., Kota Jakarta Selatan, Daerah Khusus Ibukota Jakarta 12730, Indonesia",
  "area": "Jakarta Selatan",
  "city": "Jakarta Selatan",
  "lat": -6.261718,
  "lng": 106.81478,
  "coordinateSource": "maps-pin",
  "programs": [],
  "website": "https://www.gymboreeclasses.com/",
  "sourceUrl": "https://www.gymboreeclasses.com/",
  "lastCheckedAt": "2026-11-03",
  "fitStatus": "official-global-unverified-local",
  "notes": "Global official site states ages 0-5, but this does not confirm the Indonesian branches offer them or still operate; the Indonesia branches are Google Maps listings only, provider-side currentness unverified.",
  "operatingStatus": {
   "state": "not-confirmed",
   "source": "https://www.google.com/maps/place/Gymboree+Play+%26+Music/@-6.261718,106.81478,17z/data=!3m1!4b1!4m6!3m5!1s0x2e69f1811d39c403:0x2f01036b4b5a7255!8m2!3d-6.261718!4d106.81478!16s%2Fg%2F1pzycly6z",
   "checkedAt": "2026-11-03"
  },
  "reviews": {
   "rating": 3.0,
   "reviewCount": 2,
   "source": "Google Maps",
   "sourceUrl": "https://www.google.com/maps/place/Gymboree+Play+%26+Music/@-6.261718,106.81478,17z/data=!3m1!4b1!4m6!3m5!1s0x2e69f1811d39c403:0x2f01036b4b5a7255!8m2!3d-6.261718!4d106.81478!16s%2Fg%2F1pzycly6z",
   "checkedAt": "2026-11-03",
   "praiseThemes": [],
   "complaintThemes": [],
   "sampleNote": "Only 2 Google Maps ratings. Too few to judge."
  },
  "phone": "+62 21 2302401"
 },
 {
  "id": "gymboree-play-music-kelapa-gading",
  "chain": "Gymboree Play & Music",
  "branchName": "Kelapa Gading",
  "categories": [
   "Gym & Movement",
   "Play",
   "Music"
  ],
  "address": "JL. Boulevard Kelapa Gading, Blok D No. 25-27, Kelapa Gading, Jakarta, RT.11/RW.12, West Kelapa Gading, Kelapa Gading, North Jakarta City, Jakarta 14240, Indonesia",
  "area": "Jakarta Utara",
  "city": "Jakarta Utara",
  "lat": -6.149251,
  "lng": 106.908977,
  "coordinateSource": "maps-pin",
  "programs": [],
  "website": "https://www.gymboreeclasses.com/",
  "sourceUrl": "https://www.gymboreeclasses.com/",
  "lastCheckedAt": "2026-11-03",
  "fitStatus": "official-global-unverified-local",
  "notes": "Global official site states ages 0-5, but this does not confirm the Indonesian branches offer them or still operate; the Indonesia branches are Google Maps listings only, provider-side currentness unverified.",
  "operatingStatus": {
   "state": "not-confirmed",
   "source": "https://www.google.com/maps/place/Gymboree+Play+%26+Music+-+Kelapa+Gading/@-6.1492508,106.9089773,17z/data=!3m1!4b1!4m6!3m5!1s0x2e69f525fde747c3:0x8b39decd3992d445!8m2!3d-6.1492508!4d106.9089773!16s%2",
   "checkedAt": "2026-11-03"
  },
  "phone": "+62 21 45850703"
 },
 {
  "id": "gymboree-play-music-pondok-indah-mall-1",
  "chain": "Gymboree Play & Music",
  "branchName": "Pondok Indah Mall 1",
  "categories": [
   "Gym & Movement",
   "Play",
   "Music"
  ],
  "address": "Pondok Pinang, Kebayoran Lama, South Jakarta City, Jakarta, Indonesia",
  "area": "Jakarta Selatan",
  "city": "Jakarta Selatan",
  "lat": -6.265582,
  "lng": 106.78426,
  "coordinateSource": "maps-pin",
  "programs": [],
  "website": "https://www.gymboreeclasses.com/",
  "sourceUrl": "https://www.gymboreeclasses.com/",
  "lastCheckedAt": "2026-11-03",
  "fitStatus": "official-global-unverified-local",
  "notes": "Global official site states ages 0-5, but this does not confirm the Indonesian branches offer them or still operate; the Indonesia branches are Google Maps listings only, provider-side currentness unverified. Maps listing carries no street address detail; coordinates point at the mall area.",
  "operatingStatus": {
   "state": "not-confirmed",
   "source": "https://www.google.com/maps/place/Gymboree+Pondok+Indah+Mall+1/@-6.2655825,106.7842598,17z/data=!3m1!4b1!4m6!3m5!1s0x2e69f1a5c0402fd3:0x27bc5daa39fcff2e!8m2!3d-6.2655825!4d106.7842598!16s%2Fg%2F1hf1lv",
   "checkedAt": "2026-11-03"
  },
  "reviews": {
   "rating": 5.0,
   "reviewCount": 2,
   "source": "Google Maps",
   "sourceUrl": "https://www.google.com/maps/place/Gymboree+Pondok+Indah+Mall+1/@-6.2655825,106.7842598,17z/data=!3m1!4b1!4m6!3m5!1s0x2e69f1a5c0402fd3:0x27bc5daa39fcff2e!8m2!3d-6.2655825!4d106.7842598!16s%2Fg%2F1hf1lv",
   "checkedAt": "2026-11-03",
   "praiseThemes": [],
   "complaintThemes": [],
   "sampleNote": "Only 2 Google Maps ratings. Too few to judge."
  },
  "phone": "+62 21 75911876"
 },
 {
  "id": "i-can-read-alam-sutera",
  "chain": "I Can Read",
  "branchName": "Alam Sutera",
  "categories": [
   "English & Language",
   "Literacy"
  ],
  "address": "Perumahan Alam Sutera, Town Center, Blk. 10B No.36, Pakulonan, Kec. Serpong Utara, Kota Tangerang Selatan, Banten 15325, Indonesia",
  "area": "Tangerang Selatan",
  "city": "Tangerang Selatan",
  "lat": -6.242644,
  "lng": 106.653544,
  "coordinateSource": "maps-pin",
  "programs": [],
  "website": "https://icanread.co.id/",
  "sourceUrl": "https://icanread.co.id/",
  "lastCheckedAt": "2026-11-03",
  "fitStatus": "official-chain-program",
  "notes": "Official program page: 2.5 to 7 years.",
  "operatingStatus": {
   "state": "official-listed",
   "source": "http://www.icanread.asia/home/ajax_centre/18/4",
   "checkedAt": "2026-11-04"
  },
  "reviews": {
   "rating": 5.0,
   "reviewCount": 141,
   "source": "Google Maps",
   "sourceUrl": "https://www.google.com/maps/place/I+CAN+READ+Alam+Sutera/@-6.2426441,106.6535436,17z/data=!3m1!4b1!4m6!3m5!1s0x2e69fb224f0a30cd:0x590c7090362d1f9d!8m2!3d-6.2426441!4d106.6535436!16s%2Fg%2F11gtgdpnpf",
   "checkedAt": "2026-11-03",
   "praiseThemes": [],
   "complaintThemes": []
  },
  "phone": "+62 877-7666-2707"
 },
 {
  "id": "i-can-read-bsd",
  "chain": "I Can Read",
  "branchName": "BSD",
  "categories": [
   "English & Language",
   "Literacy"
  ],
  "address": "Jl. Letjen Sutopo Buaran Serpong Tangerang Selatan Banten, Rw. Mekar Jaya, Kec. Serpong, Kota Tangerang Selatan, Banten 15310, Indonesia",
  "area": "Tangerang Selatan",
  "city": "Tangerang Selatan",
  "lat": -6.304682,
  "lng": 106.686506,
  "coordinateSource": "maps-pin",
  "programs": [],
  "website": "https://icanread.co.id/",
  "sourceUrl": "https://icanread.co.id/",
  "lastCheckedAt": "2026-11-03",
  "fitStatus": "official-chain-program",
  "notes": "Official program page: 2.5 to 7 years. Address wording differs: Maps shows Jl. Letjen Sutopo Buaran; the brand lists BSD City 1 at Ruko Golden Madrid 2 Blok F No.18-19. The Maps phone (021 5316 4789) matches the official BSD City 1 phone.",
  "operatingStatus": {
   "state": "official-listed",
   "source": "http://www.icanread.asia/home/ajax_centre/18/4",
   "checkedAt": "2026-11-04"
  }
 },
 {
  "id": "i-can-read-bintaro",
  "chain": "I Can Read",
  "branchName": "Bintaro",
  "categories": [
   "English & Language",
   "Literacy"
  ],
  "address": "Bintaro Sektor 9 Jalan Kasuari HB2/13, Pd. Pucung, Kec. Pd. Aren, Kota Tangerang Selatan, Banten 15229, Indonesia",
  "area": "Tangerang Selatan",
  "city": "Tangerang Selatan",
  "lat": -6.279423,
  "lng": 106.710814,
  "coordinateSource": "maps-pin",
  "programs": [],
  "website": "https://icanread.co.id/",
  "sourceUrl": "https://icanread.co.id/",
  "lastCheckedAt": "2026-11-03",
  "fitStatus": "official-chain-program",
  "notes": "Official program page: 2.5 to 7 years.",
  "operatingStatus": {
   "state": "official-listed",
   "source": "http://www.icanread.asia/home/ajax_centre/18/4",
   "checkedAt": "2026-11-04"
  },
  "reviews": {
   "rating": 5.0,
   "reviewCount": 724,
   "source": "Google Maps",
   "sourceUrl": "https://www.google.com/maps/place/I+Can+Read+Bintaro+%7C+Kursus+Bahasa+Inggris+anak+%26+remaja/@-6.2794226,106.7108143,17z/data=!3m1!4b1!4m6!3m5!1s0x2e69fa906edfcde5:0xa64f315e87f32792!8m2!3d-6.279422",
   "checkedAt": "2026-11-03",
   "praiseThemes": [],
   "complaintThemes": []
  },
  "phone": "+62 21 22214122"
 },
 {
  "id": "i-can-read-ciledug",
  "chain": "I Can Read",
  "branchName": "Ciledug",
  "categories": [
   "English & Language",
   "Literacy"
  ],
  "address": "JL HOS Cokroaminoto, rukan CBD ciledug, blok D2 no 10 RT.001/RW.001 Kec. Ciledug, RT.001/RW.001, Karang Tengah, Kec. Karang Tengah, Kota Tangerang, Banten 15157, Indonesia",
  "area": "Kota Tangerang",
  "city": "Kota Tangerang",
  "lat": -6.223157,
  "lng": 106.709337,
  "coordinateSource": "maps-pin",
  "programs": [],
  "website": "https://icanread.co.id/",
  "sourceUrl": "https://icanread.co.id/",
  "lastCheckedAt": "2026-11-03",
  "fitStatus": "official-chain-program",
  "notes": "Official program page: 2.5 to 7 years. Not on the brand's published centre lists checked 2026-11-04 (icanread.asia, icanread.co.id); the Google Maps listing is open with hours.",
  "operatingStatus": {
   "state": "maps-listed",
   "source": "https://www.google.com/maps/place/I+Can+Read+Ciledug/@-6.223157,106.709337,17z/data=!3m1!4b1!4m6!3m5!1s0x2e69fbf9b74499b5:0x13087f4a3f46b3fe!8m2!3d-6.223157!4d106.709337!16s%2Fg%2F11z603zr_z",
   "checkedAt": "2026-11-03"
  },
  "reviews": {
   "rating": 5.0,
   "reviewCount": 26,
   "source": "Google Maps",
   "sourceUrl": "https://www.google.com/maps/place/I+Can+Read+Ciledug/@-6.223157,106.709337,17z/data=!3m1!4b1!4m6!3m5!1s0x2e69fbf9b74499b5:0x13087f4a3f46b3fe!8m2!3d-6.223157!4d106.709337!16s%2Fg%2F11z603zr_z",
   "checkedAt": "2026-11-03",
   "praiseThemes": [],
   "complaintThemes": []
  },
  "phone": "+62 858-8855-6555"
 },
 {
  "id": "i-can-read-cinere",
  "chain": "I Can Read",
  "branchName": "Cinere",
  "categories": [
   "English & Language",
   "Literacy"
  ],
  "address": "Komplek Pertokoan Blok A. No. 7, Jl. Cinere Raya, Cinere, Depok City, West Java 16513, Indonesia",
  "area": "Depok",
  "city": "Depok",
  "lat": -6.323868,
  "lng": 106.784497,
  "coordinateSource": "maps-pin",
  "programs": [],
  "website": "https://icanread.co.id/",
  "sourceUrl": "https://icanread.co.id/",
  "lastCheckedAt": "2026-11-03",
  "fitStatus": "official-chain-program",
  "notes": "Official program page: 2.5 to 7 years.",
  "operatingStatus": {
   "state": "official-listed",
   "source": "http://www.icanread.asia/home/ajax_centre/18/4",
   "checkedAt": "2026-11-04"
  },
  "reviews": {
   "rating": 4.9,
   "reviewCount": 23,
   "source": "Google Maps",
   "sourceUrl": "https://www.google.com/maps/place/I+Can+Read+Cinere/@-6.3238678,106.784497,17z/data=!3m1!4b1!4m6!3m5!1s0x2e69efb0fe63e8c3:0xe5fb14bc9bf935d5!8m2!3d-6.3238678!4d106.784497!16s%2Fg%2F11j1mfm9qj",
   "checkedAt": "2026-11-03",
   "praiseThemes": [],
   "complaintThemes": []
  },
  "phone": "+62 812-1777-7920"
 },
 {
  "id": "i-can-read-ciputat",
  "chain": "I Can Read",
  "branchName": "Ciputat",
  "categories": [
   "English & Language",
   "Literacy"
  ],
  "address": "CIPUTAT LOT, Jl. Dewi Sartika No.21, Cipayung, Kec. Ciputat, Kota Tangerang Selatan, Banten 15411, Indonesia",
  "area": "Tangerang Selatan",
  "city": "Tangerang Selatan",
  "lat": -6.318583,
  "lng": 106.745807,
  "coordinateSource": "maps-pin",
  "programs": [],
  "website": "https://icanread.co.id/",
  "sourceUrl": "https://icanread.co.id/",
  "lastCheckedAt": "2026-11-03",
  "fitStatus": "official-chain-program",
  "notes": "Official program page: 2.5 to 7 years.",
  "operatingStatus": {
   "state": "official-listed",
   "source": "http://www.icanread.asia/home/ajax_centre/18/4",
   "checkedAt": "2026-11-04"
  },
  "reviews": {
   "rating": 5.0,
   "reviewCount": 154,
   "source": "Google Maps",
   "sourceUrl": "https://www.google.com/maps/place/I+Can+Read+Ciputat/@-6.3185828,106.7458075,17z/data=!3m1!4b1!4m6!3m5!1s0x2e69ef49c5af1077:0x290ba9da080bb2b6!8m2!3d-6.3185828!4d106.7458075!16s%2Fg%2F11t5y5j1kn",
   "checkedAt": "2026-11-03",
   "praiseThemes": [],
   "complaintThemes": []
  },
  "phone": "+62 819-7788-9901"
 },
 {
  "id": "i-can-read-gading-serpong",
  "chain": "I Can Read",
  "branchName": "Gading Serpong",
  "categories": [
   "English & Language",
   "Literacy"
  ],
  "address": "Ruko Diamond 3, Jl. Gading Golf Boulevard No.82, Pakulonan Barat, Kecamatan Kelapa Dua, Kabupaten Tangerang, Banten 15321, Indonesia",
  "area": "Kabupaten Tangerang",
  "city": "Kabupaten Tangerang",
  "lat": -6.244291,
  "lng": 106.633394,
  "coordinateSource": "maps-pin",
  "programs": [],
  "website": "https://icanread.co.id/",
  "sourceUrl": "https://icanread.co.id/",
  "lastCheckedAt": "2026-11-03",
  "fitStatus": "official-chain-program",
  "notes": "Official program page: 2.5 to 7 years.",
  "operatingStatus": {
   "state": "official-listed",
   "source": "http://www.icanread.asia/home/ajax_centre/18/4",
   "checkedAt": "2026-11-04"
  },
  "reviews": {
   "rating": 5.0,
   "reviewCount": 114,
   "source": "Google Maps",
   "sourceUrl": "https://www.google.com/maps/place/I+Can+Read+Gading+Serpong/@-6.2442913,106.6333943,17z/data=!3m1!4b1!4m6!3m5!1s0x2e69fbf7b184a49f:0x343aae5ac355a0a!8m2!3d-6.2442913!4d106.6333943!16s%2Fg%2F11b5s2dv7g",
   "checkedAt": "2026-11-03",
   "praiseThemes": [],
   "complaintThemes": []
  },
  "phone": "+62 821-1435-2109"
 },
 {
  "id": "i-can-read-gajah-mada",
  "chain": "I Can Read",
  "branchName": "Gajah Mada",
  "categories": [
   "English & Language",
   "Literacy"
  ],
  "address": "Jl. Kyai Haji Zainul Arifin No.16 Blok A, RT.8/RW.7, Krukut, Taman Sari, West Jakarta City, Jakarta 11140, Indonesia",
  "area": "Jakarta Barat",
  "city": "Jakarta Barat",
  "lat": -6.160313,
  "lng": 106.81355,
  "coordinateSource": "maps-pin",
  "programs": [],
  "website": "https://icanread.co.id/",
  "sourceUrl": "https://icanread.co.id/",
  "lastCheckedAt": "2026-11-03",
  "fitStatus": "official-chain-program",
  "notes": "Official program page: 2.5 to 7 years.",
  "operatingStatus": {
   "state": "official-listed",
   "source": "http://www.icanread.asia/home/ajax_centre/18/4",
   "checkedAt": "2026-11-04"
  },
  "reviews": {
   "rating": 5.0,
   "reviewCount": 33,
   "source": "Google Maps",
   "sourceUrl": "https://www.google.com/maps/place/I+Can+Read+Gajah+Mada/@-6.1603129,106.8135499,17z/data=!3m1!4b1!4m6!3m5!1s0x2e69f74f95b336b1:0x32545ddb9f413da4!8m2!3d-6.1603129!4d106.8135499!16s%2Fg%2F11h4zgjr7z",
   "checkedAt": "2026-11-03",
   "praiseThemes": [],
   "complaintThemes": []
  },
  "phone": "+62 812-1800-8090"
 },
 {
  "id": "i-can-read-green-lake-city",
  "chain": "I Can Read",
  "branchName": "Green Lake City",
  "categories": [
   "English & Language",
   "Literacy"
  ],
  "address": "Rukan Great Wall, Jl. Green Lake City Boulevard No.68 Blk B, RT.002/RW.008, Petir, Kec. Cipondoh, Kota Tangerang, Banten 15146, Indonesia",
  "area": "Kota Tangerang",
  "city": "Kota Tangerang",
  "lat": -6.191004,
  "lng": 106.700711,
  "coordinateSource": "maps-pin",
  "programs": [],
  "website": "https://icanread.co.id/",
  "sourceUrl": "https://icanread.co.id/",
  "lastCheckedAt": "2026-11-03",
  "fitStatus": "official-chain-program",
  "notes": "Official program page: 2.5 to 7 years.",
  "operatingStatus": {
   "state": "official-listed",
   "source": "http://www.icanread.asia/home/ajax_centre/18/4",
   "checkedAt": "2026-11-04"
  },
  "reviews": {
   "rating": 5.0,
   "reviewCount": 108,
   "source": "Google Maps",
   "sourceUrl": "https://www.google.com/maps/place/I+CAN+READ+Green+Lake+City/@-6.1910037,106.7007109,17z/data=!3m1!4b1!4m6!3m5!1s0x2e69f98b5a70798d:0x5f8d8d69dda7e0af!8m2!3d-6.1910037!4d106.7007109!16s%2Fg%2F11lg0qb0",
   "checkedAt": "2026-11-03",
   "praiseThemes": [],
   "complaintThemes": []
  },
  "phone": "+62 812-1299-4112"
 },
 {
  "id": "i-can-read-i-can-read",
  "chain": "I Can Read",
  "branchName": "I Can Read",
  "categories": [
   "English & Language",
   "Literacy"
  ],
  "address": "Jl. Mangga Raya No.18 B Blk Y, RT.4/RW.3, Duri Kepa, Kec. Kb. Jeruk, Kota Jakarta Barat, Daerah Khusus Ibukota Jakarta 11510, Indonesia",
  "area": "Jakarta Barat",
  "city": "Jakarta Barat",
  "lat": -6.172761,
  "lng": 106.776889,
  "coordinateSource": "maps-pin",
  "programs": [],
  "website": "https://icanread.co.id/",
  "sourceUrl": "https://icanread.co.id/",
  "lastCheckedAt": "2026-11-03",
  "fitStatus": "official-chain-program",
  "notes": "Official program page: 2.5 to 7 years. Not on the brand's published centre lists checked 2026-11-04 (icanread.asia, icanread.co.id); the Google Maps listing is open with hours.",
  "operatingStatus": {
   "state": "maps-listed",
   "source": "https://www.google.com/maps/place/I+Can+Read/@-6.1727606,106.7768893,17z/data=!3m1!4b1!4m6!3m5!1s0x2e69f7ad388290f5:0x7a5d4dfde1238048!8m2!3d-6.1727606!4d106.7768893!16s%2Fg%2F11bc7rwvzm",
   "checkedAt": "2026-11-03"
  },
  "reviews": {
   "rating": 4.9,
   "reviewCount": 62,
   "source": "Google Maps",
   "sourceUrl": "https://www.google.com/maps/place/I+Can+Read/@-6.1727606,106.7768893,17z/data=!3m1!4b1!4m6!3m5!1s0x2e69f7ad388290f5:0x7a5d4dfde1238048!8m2!3d-6.1727606!4d106.7768893!16s%2Fg%2F11bc7rwvzm",
   "checkedAt": "2026-11-03",
   "praiseThemes": [],
   "complaintThemes": []
  },
  "phone": "+62 21 50860766"
 },
 {
  "id": "i-can-read-kalimalang",
  "chain": "I Can Read",
  "branchName": "Kalimalang",
  "categories": [
   "English & Language",
   "Literacy"
  ],
  "address": "Jl. Pahlawan Revolusi.11B, RT.9/RW.7, Pd. Bambu, RT.9/RW.7, Kota, Kec. Duren Sawit, Kota Jakarta Timur, Daerah Khusus Ibukota Jakarta 13430, Indonesia",
  "area": "Jakarta Timur",
  "city": "Jakarta Timur",
  "lat": -6.245883,
  "lng": 106.906845,
  "coordinateSource": "maps-pin",
  "programs": [],
  "website": "https://icanread.co.id/",
  "sourceUrl": "https://icanread.co.id/",
  "lastCheckedAt": "2026-11-03",
  "fitStatus": "official-chain-program",
  "notes": "Official program page: 2.5 to 7 years. Not on the brand's published centre lists checked 2026-11-04 (icanread.asia, icanread.co.id); the Google Maps listing is open with hours.",
  "operatingStatus": {
   "state": "maps-listed",
   "source": "https://www.google.com/maps/place/I+Can+Read+Kalimalang/@-6.2458828,106.9068453,17z/data=!3m1!4b1!4m6!3m5!1s0x2e69f3fadf52eda5:0x2fbbf839ec46b7d8!8m2!3d-6.2458828!4d106.9068453!16s%2Fg%2F11yvtvg_y_",
   "checkedAt": "2026-11-03"
  },
  "reviews": {
   "rating": 4.8,
   "reviewCount": 42,
   "source": "Google Maps",
   "sourceUrl": "https://www.google.com/maps/place/I+Can+Read+Kalimalang/@-6.2458828,106.9068453,17z/data=!3m1!4b1!4m6!3m5!1s0x2e69f3fadf52eda5:0x2fbbf839ec46b7d8!8m2!3d-6.2458828!4d106.9068453!16s%2Fg%2F11yvtvg_y_",
   "checkedAt": "2026-11-03",
   "praiseThemes": [],
   "complaintThemes": []
  },
  "phone": "+62 819-0891-1101"
 },
 {
  "id": "i-can-read-kelapa-gading",
  "chain": "I Can Read",
  "branchName": "Kelapa Gading",
  "categories": [
   "English & Language",
   "Literacy"
  ],
  "address": "Rukan Artha Gading Niaga, Jln. Boulevard Blk. C No.9 18, RT.18/RW.8, Klp. Gading Bar., Kec. Klp. Gading, Jkt Utara, Daerah Khusus Ibukota Jakarta 14240, Indonesia",
  "area": "Jakarta Utara",
  "city": "Jakarta Utara",
  "lat": -6.14613,
  "lng": 106.895647,
  "coordinateSource": "maps-pin",
  "programs": [],
  "website": "https://icanread.co.id/",
  "sourceUrl": "https://icanread.co.id/",
  "lastCheckedAt": "2026-11-03",
  "fitStatus": "official-chain-program",
  "notes": "Official program page: 2.5 to 7 years.",
  "operatingStatus": {
   "state": "official-listed",
   "source": "http://www.icanread.asia/home/ajax_centre/18/4",
   "checkedAt": "2026-11-04"
  },
  "reviews": {
   "rating": 4.8,
   "reviewCount": 58,
   "source": "Google Maps",
   "sourceUrl": "https://www.google.com/maps/place/I+Can+Read+Kelapa+Gading/@-6.14613,106.895647,17z/data=!3m1!4b1!4m6!3m5!1s0x2e69f53bffffffc3:0x51c9153fa528a6b8!8m2!3d-6.14613!4d106.895647!16s%2Fg%2F11bwhb2ymz",
   "checkedAt": "2026-11-03",
   "praiseThemes": [],
   "complaintThemes": []
  },
  "phone": "+62 895-0540-0760"
 },
 {
  "id": "i-can-read-kemang",
  "chain": "I Can Read",
  "branchName": "Kemang",
  "categories": [
   "English & Language",
   "Literacy"
  ],
  "address": "Jl. Kemang Raya No.17 6, RT.6/RW.1, Bangka, Kec. Mampang Prpt., Kota Jakarta Selatan, Daerah Khusus Ibukota Jakarta 12730, Indonesia",
  "area": "Jakarta Selatan",
  "city": "Jakarta Selatan",
  "lat": -6.258585,
  "lng": 106.815378,
  "coordinateSource": "maps-pin",
  "programs": [],
  "website": "https://icanread.co.id/",
  "sourceUrl": "https://icanread.co.id/",
  "lastCheckedAt": "2026-11-03",
  "fitStatus": "official-chain-program",
  "notes": "Official program page: 2.5 to 7 years.",
  "operatingStatus": {
   "state": "official-listed",
   "source": "http://www.icanread.asia/home/ajax_centre/18/4",
   "checkedAt": "2026-11-04"
  },
  "reviews": {
   "rating": 5.0,
   "reviewCount": 43,
   "source": "Google Maps",
   "sourceUrl": "https://www.google.com/maps/place/I+Can+Read+Kemang/@-6.2585849,106.8153776,17z/data=!3m1!4b1!4m6!3m5!1s0x2e69f11b4d2d4e7d:0x1485aab21bc0abe9!8m2!3d-6.2585849!4d106.8153776!16s%2Fg%2F11gjw0wsyq",
   "checkedAt": "2026-11-03",
   "praiseThemes": [],
   "complaintThemes": []
  },
  "phone": "+62 877-8922-7623"
 },
 {
  "id": "i-can-read-menteng",
  "chain": "I Can Read",
  "branchName": "Menteng",
  "categories": [
   "English & Language",
   "Literacy"
  ],
  "address": "Menteng Central Lantai 3.301B, Jl. HOS. Cokroaminoto No.78-80, RT.2/RW.5, Menteng, Kec. Menteng, Kota Jakarta Pusat, Daerah Khusus Ibukota Jakarta 10310, Indonesia",
  "area": "Jakarta Pusat",
  "city": "Jakarta Pusat",
  "lat": -6.196811,
  "lng": 106.828446,
  "coordinateSource": "maps-pin",
  "programs": [],
  "website": "https://icanread.co.id/",
  "sourceUrl": "https://icanread.co.id/",
  "lastCheckedAt": "2026-11-03",
  "fitStatus": "official-chain-program",
  "notes": "Official program page: 2.5 to 7 years.",
  "operatingStatus": {
   "state": "official-listed",
   "source": "http://www.icanread.asia/home/ajax_centre/18/4",
   "checkedAt": "2026-11-04"
  },
  "reviews": {
   "rating": 4.9,
   "reviewCount": 19,
   "source": "Google Maps",
   "sourceUrl": "https://www.google.com/maps/place/I+Can+Read+Menteng/@-6.1968106,106.8284464,17z/data=!3m1!4b1!4m6!3m5!1s0x2e69f422a3ec598f:0x8a935e87f6800738!8m2!3d-6.1968106!4d106.8284464!16s%2Fg%2F1hm3wxvmk",
   "checkedAt": "2026-11-03",
   "praiseThemes": [],
   "complaintThemes": []
  },
  "phone": "+62 821-2238-2323"
 },
 {
  "id": "i-can-read-permata-hijau",
  "chain": "I Can Read",
  "branchName": "Permata Hijau",
  "categories": [
   "English & Language",
   "Literacy"
  ],
  "address": "Grand ITC Permata Hijau, Ruko Blok Saphire No.11, RT.11/RW.10, Grogol Utara, Kec. Kebayoran Lama, DKI Jakarta, Daerah Khusus Ibukota Jakarta 12210, Indonesia",
  "area": "Jabodetabek (unclassified)",
  "city": "Jabodetabek (unclassified)",
  "lat": -6.220998,
  "lng": 106.783733,
  "coordinateSource": "maps-pin",
  "programs": [],
  "website": "https://icanread.co.id/",
  "sourceUrl": "https://icanread.co.id/",
  "lastCheckedAt": "2026-11-03",
  "fitStatus": "official-chain-program",
  "notes": "Official program page: 2.5 to 7 years.",
  "operatingStatus": {
   "state": "official-listed",
   "source": "http://www.icanread.asia/home/ajax_centre/18/4",
   "checkedAt": "2026-11-04"
  },
  "reviews": {
   "rating": 5.0,
   "reviewCount": 103,
   "source": "Google Maps",
   "sourceUrl": "https://www.google.com/maps/place/I+Can+Read+Permata+Hijau/@-6.2209985,106.7837332,17z/data=!3m1!4b1!4m6!3m5!1s0x2e69f1328f49edd9:0xe79daa8de7ceb21f!8m2!3d-6.2209985!4d106.7837332!16s%2Fg%2F1pzr6x33n",
   "checkedAt": "2026-11-03",
   "praiseThemes": [],
   "complaintThemes": []
  },
  "phone": "+62 852-8000-1449"
 },
 {
  "id": "i-can-read-pluit",
  "chain": "I Can Read",
  "branchName": "Pluit",
  "categories": [
   "English & Language",
   "Literacy"
  ],
  "address": "Jl. Pluit Permai Raya Ruko Pluit Village Mall. 63-64, RT.1/RW.4, Pluit, Penjaringan, North Jakarta City, Jakarta 14450, Indonesia",
  "area": "Jakarta Utara",
  "city": "Jakarta Utara",
  "lat": -6.116052,
  "lng": 106.788715,
  "coordinateSource": "maps-pin",
  "programs": [],
  "website": "https://icanread.co.id/",
  "sourceUrl": "https://icanread.co.id/",
  "lastCheckedAt": "2026-11-03",
  "fitStatus": "official-chain-program",
  "notes": "Official program page: 2.5 to 7 years.",
  "operatingStatus": {
   "state": "official-listed",
   "source": "http://www.icanread.asia/home/ajax_centre/18/4",
   "checkedAt": "2026-11-04"
  },
  "reviews": {
   "rating": 5.0,
   "reviewCount": 105,
   "source": "Google Maps",
   "sourceUrl": "https://www.google.com/maps/place/I+Can+Read+Pluit/@-6.1160523,106.7887151,17z/data=!3m1!4b1!4m6!3m5!1s0x2e6a1dbe0365b51b:0x5355fe4731acb917!8m2!3d-6.1160523!4d106.7887151!16s%2Fg%2F11f5d5zk9m",
   "checkedAt": "2026-11-03",
   "praiseThemes": [],
   "complaintThemes": []
  },
  "phone": "+62 818-0787-0088"
 },
 {
  "id": "i-can-read-puri",
  "chain": "I Can Read",
  "branchName": "Puri",
  "categories": [
   "English & Language",
   "Literacy"
  ],
  "address": "Sentra Niaga Puri Indah, Jl. Puri Indah Raya No.22 Blk T1, RT.1/RW.2, Kembangan Sel., Kec. Kembangan, Kota Jakarta Barat, Daerah Khusus Ibukota Jakarta 11610, Indonesia",
  "area": "Jakarta Barat",
  "city": "Jakarta Barat",
  "lat": -6.187886,
  "lng": 106.736364,
  "coordinateSource": "maps-pin",
  "programs": [],
  "website": "https://icanread.co.id/",
  "sourceUrl": "https://icanread.co.id/",
  "lastCheckedAt": "2026-11-03",
  "fitStatus": "official-chain-program",
  "notes": "Official program page: 2.5 to 7 years.",
  "operatingStatus": {
   "state": "official-listed",
   "source": "http://www.icanread.asia/home/ajax_centre/18/4",
   "checkedAt": "2026-11-04"
  },
  "reviews": {
   "rating": 4.6,
   "reviewCount": 25,
   "source": "Google Maps",
   "sourceUrl": "https://www.google.com/maps/place/I+Can+Read+Puri/@-6.1878857,106.7363642,17z/data=!3m1!4b1!4m6!3m5!1s0x2e69f7707f2ca545:0xef1aeae2fb59afe4!8m2!3d-6.1878857!4d106.7363642!16s%2Fg%2F1tplsmj1",
   "checkedAt": "2026-11-03",
   "praiseThemes": [],
   "complaintThemes": []
  },
  "phone": "+62 811-1011-6936"
 },
 {
  "id": "i-can-read-summarecon-bekasi",
  "chain": "I Can Read",
  "branchName": "Summarecon Bekasi",
  "categories": [
   "English & Language",
   "Literacy"
  ],
  "address": "Summarecon Bekasi, Rukan Emerald Blok UA No.10, Jl. Bulevar Selatan, RT.004/RW.011, Marga Mulya, Kec. Bekasi Utara, Kota Bks, Jawa Barat 17142, Indonesia",
  "area": "Bekasi",
  "city": "Bekasi",
  "lat": -6.227717,
  "lng": 107.003414,
  "coordinateSource": "maps-pin",
  "programs": [],
  "website": "https://icanread.co.id/",
  "sourceUrl": "https://icanread.co.id/",
  "lastCheckedAt": "2026-11-03",
  "fitStatus": "official-chain-program",
  "notes": "Official program page: 2.5 to 7 years.",
  "operatingStatus": {
   "state": "official-listed",
   "source": "http://www.icanread.asia/home/ajax_centre/18/4",
   "checkedAt": "2026-11-04"
  },
  "reviews": {
   "rating": 5.0,
   "reviewCount": 254,
   "source": "Google Maps",
   "sourceUrl": "https://www.google.com/maps/place/I+Can+Read+Summarecon+Bekasi/@-6.2277174,107.0034143,17z/data=!3m1!4b1!4m6!3m5!1s0x2e698ddbe9ad5a31:0x761a4ca27b51817c!8m2!3d-6.2277174!4d107.0034143!16s%2Fg%2F11gvxj",
   "checkedAt": "2026-11-03",
   "praiseThemes": [],
   "complaintThemes": []
  },
  "phone": "+62 878-8046-9515"
 },
 {
  "id": "i-can-read-sunter",
  "chain": "I Can Read",
  "branchName": "Sunter",
  "categories": [
   "English & Language",
   "Literacy"
  ],
  "address": "Jl. Sunter Permai Raya, RT.2/RW.12, Papanggo, Kec. Tj. Priok, Jkt Utara, Daerah Khusus Ibukota Jakarta 14350, Indonesia",
  "area": "Jakarta Utara",
  "city": "Jakarta Utara",
  "lat": -6.132356,
  "lng": 106.864909,
  "coordinateSource": "maps-pin",
  "programs": [],
  "website": "https://icanread.co.id/",
  "sourceUrl": "https://icanread.co.id/",
  "lastCheckedAt": "2026-11-03",
  "fitStatus": "official-chain-program",
  "notes": "Official program page: 2.5 to 7 years.",
  "operatingStatus": {
   "state": "official-listed",
   "source": "http://www.icanread.asia/home/ajax_centre/18/4",
   "checkedAt": "2026-11-04"
  },
  "reviews": {
   "rating": 5.0,
   "reviewCount": 125,
   "source": "Google Maps",
   "sourceUrl": "https://www.google.com/maps/place/I+Can+Read+Sunter/@-6.1323558,106.8649088,17z/data=!3m1!4b1!4m6!3m5!1s0x2e6a1e2acab1e1e1:0xdf7ce76095bad665!8m2!3d-6.1323558!4d106.8649088!16s%2Fg%2F11bwf6hw3t",
   "checkedAt": "2026-11-03",
   "praiseThemes": [],
   "complaintThemes": []
  },
  "phone": "+62 21 65300205"
 },
 {
  "id": "i-can-read-tebet",
  "chain": "I Can Read",
  "branchName": "Tebet",
  "categories": [
   "English & Language",
   "Literacy"
  ],
  "address": "Sarana Square Tebet, Jl. Tebet Barat IV No.20 8 Lt 3E, RT.8/RW.2, Tebet Bar., Kec. Tebet, Kota Jakarta Selatan, Daerah Khusus Ibukota Jakarta 12810, Indonesia",
  "area": "Jakarta Selatan",
  "city": "Jakarta Selatan",
  "lat": -6.23378,
  "lng": 106.847952,
  "coordinateSource": "maps-pin",
  "programs": [],
  "website": "https://icanread.co.id/",
  "sourceUrl": "https://icanread.co.id/",
  "lastCheckedAt": "2026-11-03",
  "fitStatus": "official-chain-program",
  "notes": "Official program page: 2.5 to 7 years.",
  "operatingStatus": {
   "state": "official-listed",
   "source": "https://icanread.co.id/location/",
   "checkedAt": "2026-11-04"
  },
  "reviews": {
   "rating": 4.9,
   "reviewCount": 30,
   "source": "Google Maps",
   "sourceUrl": "https://www.google.com/maps/place/I+Can+Read+Tebet/@-6.2337803,106.8479516,17z/data=!3m1!4b1!4m6!3m5!1s0x2e69f39949a4516f:0xa08742b71a93985d!8m2!3d-6.2337803!4d106.8479516!16s%2Fg%2F11nb99zmr0",
   "checkedAt": "2026-11-03",
   "praiseThemes": [],
   "complaintThemes": []
  },
  "phone": "+62 818-704-760"
 },
 {
  "id": "kindyroo-kemang",
  "chain": "KindyROO",
  "branchName": "Kemang",
  "categories": [
   "Gym & Movement",
   "Sensory"
  ],
  "address": "Kemang Square, Jl. Kemang Raya No.5 Lt. 3 Unit 9-11, RT.3/RW.2, Bangka, Kec. Mampang Prpt., Kota Jakarta Selatan, Daerah Khusus Ibukota Jakarta 12730, Indonesia",
  "area": "Jakarta Selatan",
  "city": "Jakarta Selatan",
  "lat": -6.271935,
  "lng": 106.813868,
  "coordinateSource": "maps-pin",
  "programs": [],
  "sourceUrl": "https://www.google.com/maps/search/?api=1&query=KindyROO+Kemang&query_place_id=ChIJHQjBGnnxaS4R-rikIAO6EdU",
  "lastCheckedAt": "2026-11-03",
  "fitStatus": "unknown",
  "notes": "Age eligibility not verified from a provider source.",
  "operatingStatus": {
   "state": "maps-listed",
   "source": "https://www.google.com/maps/place/KindyROO+Kemang/@-6.2719354,106.8138682,17z/data=!3m1!4b1!4m6!3m5!1s0x2e69f1791ac1081d:0xd511ba0320a4b8fa!8m2!3d-6.2719354!4d106.8138682!16s%2Fg%2F1tlngr3p",
   "checkedAt": "2026-11-03"
  },
  "reviews": {
   "rating": 3.4,
   "reviewCount": 8,
   "source": "Google Maps",
   "sourceUrl": "https://www.google.com/maps/place/KindyROO+Kemang/@-6.2719354,106.8138682,17z/data=!3m1!4b1!4m6!3m5!1s0x2e69f1791ac1081d:0xd511ba0320a4b8fa!8m2!3d-6.2719354!4d106.8138682!16s%2Fg%2F1tlngr3p",
   "checkedAt": "2026-11-03",
   "praiseThemes": [],
   "complaintThemes": [],
   "sampleNote": "Only 8 Google Maps ratings. Too few to judge."
  },
  "phone": "+62 897-2662-688"
 },
 {
  "id": "rockstar-academy-aeon-mall-bsd-city",
  "chain": "Rockstar Academy",
  "branchName": "AEON MALL BSD City",
  "categories": [
   "Gym & Movement",
   "Dance",
   "Swim"
  ],
  "address": "AEON Mall BSD City, BSD City, Jl. BSD Raya Utama 3rd Floor, Unit #3-01, Pagedangan, Kec. Pagedangan, Kabupaten Tangerang, Banten 15345, Indonesia",
  "area": "Kabupaten Tangerang",
  "city": "Kabupaten Tangerang",
  "lat": -6.305277,
  "lng": 106.642525,
  "coordinateSource": "maps-pin",
  "programs": [
   {
    "name": "Learn & Play 1",
    "offering": "offered",
    "age": {
     "minMonths": 6,
     "maxMonths": 18,
     "providerAgeUrl": "https://www.rockstaracademy.com/lib/upload/files/club/BSD_Schedule_Winter_20261.pdf",
     "sourceCheckedAt": "2026-11-03",
     "level": "branch",
     "verification": "provider-confirmed"
    },
    "term": "19 Oct 2026 until 17 Jan 2027",
    "note": "Preschool & Kindergarten classes carry an additional fee per PDF footer"
   },
   {
    "name": "Learn & Play 2",
    "offering": "offered",
    "age": {
     "minMonths": 19,
     "maxMonths": 35,
     "providerAgeUrl": "https://www.rockstaracademy.com/lib/upload/files/club/BSD_Schedule_Winter_20261.pdf",
     "sourceCheckedAt": "2026-11-03",
     "level": "branch",
     "verification": "provider-confirmed"
    },
    "term": "19 Oct 2026 until 17 Jan 2027",
    "note": "Preschool & Kindergarten classes carry an additional fee per PDF footer"
   },
   {
    "name": "Smartology 3",
    "offering": "offered",
    "age": {
     "minMonths": 36,
     "maxMonths": 48,
     "providerAgeUrl": "https://www.rockstaracademy.com/lib/upload/files/club/BSD_Schedule_Winter_20261.pdf",
     "sourceCheckedAt": "2026-11-03",
     "level": "branch",
     "verification": "provider-confirmed"
    },
    "term": "19 Oct 2026 until 17 Jan 2027",
    "note": "upper-bound inclusivity ambiguous; additional fee per PDF footer"
   },
   {
    "name": "Crawler",
    "offering": "offered",
    "age": {
     "minMonths": 6,
     "maxMonths": 18,
     "providerAgeUrl": "https://www.rockstaracademy.com/lib/upload/files/club/BSD_Schedule_Winter_20261.pdf",
     "sourceCheckedAt": "2026-11-03",
     "level": "branch",
     "verification": "provider-confirmed"
    },
    "term": "19 Oct 2026 until 17 Jan 2027",
    "note": "6-18 mo"
   },
   {
    "name": "Walker",
    "offering": "offered",
    "age": {
     "minMonths": 12,
     "maxMonths": 23,
     "providerAgeUrl": "https://www.rockstaracademy.com/lib/upload/files/club/BSD_Schedule_Winter_20261.pdf",
     "sourceCheckedAt": "2026-11-03",
     "level": "branch",
     "verification": "provider-confirmed"
    },
    "term": "19 Oct 2026 until 17 Jan 2027",
    "note": "12-23 mo"
   },
   {
    "name": "Jumper",
    "offering": "offered",
    "age": {
     "minMonths": 24,
     "maxMonths": 35,
     "providerAgeUrl": "https://www.rockstaracademy.com/lib/upload/files/club/BSD_Schedule_Winter_20261.pdf",
     "sourceCheckedAt": "2026-11-03",
     "level": "branch",
     "verification": "provider-confirmed"
    },
    "term": "19 Oct 2026 until 17 Jan 2027",
    "note": "24-35 mo"
   },
   {
    "name": "Baby Jam",
    "offering": "offered",
    "age": {
     "minMonths": 6,
     "maxMonths": 18,
     "providerAgeUrl": "https://www.rockstaracademy.com/lib/upload/files/club/BSD_Schedule_Winter_20261.pdf",
     "sourceCheckedAt": "2026-11-03",
     "level": "branch",
     "verification": "provider-confirmed"
    },
    "term": "19 Oct 2026 until 17 Jan 2027",
    "note": "6-18 mo"
   },
   {
    "name": "Baby Dance",
    "offering": "offered",
    "age": {
     "minMonths": 12,
     "maxMonths": 36,
     "providerAgeUrl": "https://www.rockstaracademy.com/lib/upload/files/club/BSD_Schedule_Winter_20261.pdf",
     "sourceCheckedAt": "2026-11-03",
     "level": "branch",
     "verification": "provider-confirmed"
    },
    "term": "19 Oct 2026 until 17 Jan 2027",
    "note": "year-boundary inclusivity ambiguous"
   },
   {
    "name": "Baby (Ballet)",
    "offering": "offered",
    "age": {
     "minMonths": 24,
     "maxMonths": 36,
     "providerAgeUrl": "https://www.rockstaracademy.com/lib/upload/files/club/BSD_Schedule_Winter_20261.pdf",
     "sourceCheckedAt": "2026-11-03",
     "level": "branch",
     "verification": "provider-confirmed"
    },
    "term": "19 Oct 2026 until 17 Jan 2027",
    "note": "year-boundary inclusivity ambiguous"
   },
   {
    "name": "Move & Groove",
    "offering": "offered",
    "age": {
     "minMonths": 36,
     "maxMonths": 60,
     "providerAgeUrl": "https://www.rockstaracademy.com/lib/upload/files/club/BSD_Schedule_Winter_20261.pdf",
     "sourceCheckedAt": "2026-11-03",
     "level": "branch",
     "verification": "provider-confirmed"
    },
    "term": "19 Oct 2026 until 17 Jan 2027",
    "note": "overlaps under-4; boundary ambiguous"
   },
   {
    "name": "Pre-Ballet 3-5",
    "offering": "offered",
    "age": {
     "minMonths": 36,
     "maxMonths": 60,
     "providerAgeUrl": "https://www.rockstaracademy.com/lib/upload/files/club/BSD_Schedule_Winter_20261.pdf",
     "sourceCheckedAt": "2026-11-03",
     "level": "branch",
     "verification": "provider-confirmed"
    },
    "term": "19 Oct 2026 until 17 Jan 2027",
    "note": "overlaps under-4; boundary ambiguous"
   },
   {
    "name": "Sports U3",
    "offering": "offered",
    "age": {
     "minMonths": 24,
     "maxMonths": 36,
     "providerAgeUrl": "https://www.rockstaracademy.com/lib/upload/files/club/BSD_Schedule_Winter_20261.pdf",
     "sourceCheckedAt": "2026-11-03",
     "level": "branch",
     "verification": "provider-confirmed"
    },
    "term": "19 Oct 2026 until 17 Jan 2027",
    "noteUrl": "https://www.rockstaracademy.com/schedules-and-locations/pesona-square",
    "noteLabel": "Age key",
    "note": "PDF cell label is 'Sports U3' with no numeric age; numeric age mapped via official Rockstar web schedule tables ('Sports U3 2 - 3 Years')"
   },
   {
    "name": "Tots Gym U4",
    "offering": "offered",
    "age": {
     "minMonths": 36,
     "maxMonths": 48,
     "providerAgeUrl": "https://www.rockstaracademy.com/lib/upload/files/club/BSD_Schedule_Winter_20261.pdf",
     "sourceCheckedAt": "2026-11-03",
     "level": "branch",
     "verification": "provider-confirmed"
    },
    "term": "19 Oct 2026 until 17 Jan 2027",
    "noteUrl": "https://www.rockstaracademy.com/schedules-and-locations/pesona-square",
    "noteLabel": "Age key",
    "note": "PDF cell label is 'Tots Gym U4' with no numeric age; numeric age mapped via official Rockstar web schedule tables ('Tots Gym U4 3 - 4 Years')"
   }
  ],
  "website": "https://www.rockstaracademy.com/schedules-and-locations",
  "sourceUrl": "https://www.rockstaracademy.com/schedules-and-locations",
  "lastCheckedAt": "2026-11-03",
  "fitStatus": "branch-confirmed-dated-term",
  "notes": "Chain states programs from 6 months to 18 years; under-4 programs seen: Mom & Me Beginner 6-35 months, Baby Dance 1-3 yrs (club schedule PDF). Programs vary per branch.",
  "reviews": {
   "rating": 4.6,
   "reviewCount": 192,
   "source": "Google Maps",
   "checkedAt": "2026-11-03",
   "praiseThemes": [],
   "complaintThemes": [],
   "sourceUrl": "https://www.google.com/maps/search/?api=1&query=Rockstar+Academy+-+AEON+MALL+BSD+City&query_place_id=ChIJm0YvvQflaS4RLOpIYhjmmpc"
  },
  "operatingStatus": {
   "state": "official-listed",
   "source": "https://www.rockstaracademy.com/schedules-and-locations",
   "checkedAt": "2026-11-04"
  },
  "phone": "+62 21 39713777"
 },
 {
  "id": "rockstar-academy-aeon-mall-sentul-city",
  "chain": "Rockstar Academy",
  "branchName": "AEON MALL Sentul City",
  "categories": [
   "Gym & Movement",
   "Dance",
   "Swim"
  ],
  "address": "Aeon Mall Sentul City, Jl. MH. Thamrin, Cipambuan, Babakan Madang, Bogor Regency, West Java 16810, Indonesia",
  "area": "Bogor",
  "city": "Bogor",
  "lat": -6.566859,
  "lng": 106.859207,
  "coordinateSource": "maps-pin",
  "programs": [
   {
    "name": "Crawler",
    "category": "Gym & Movement",
    "offering": "offered",
    "age": {
     "minMonths": 6,
     "maxMonths": 18,
     "level": "branch",
     "verification": "provider-confirmed",
     "providerAgeUrl": "https://www.rockstaracademy.com/lib/upload/files/club/AS_Schedule_Winter_20261.pdf",
     "sourceCheckedAt": "2026-11-07"
    },
    "note": "Winter term schedule, 19 Oct 2026 to 17 Jan 2027. Exact month band from the current branch PDF; rounded HTML labels are not used. Confirm session availability before visiting."
   },
   {
    "name": "Walker",
    "category": "Gym & Movement",
    "offering": "offered",
    "age": {
     "minMonths": 12,
     "maxMonths": 23,
     "level": "branch",
     "verification": "provider-confirmed",
     "providerAgeUrl": "https://www.rockstaracademy.com/lib/upload/files/club/AS_Schedule_Winter_20261.pdf",
     "sourceCheckedAt": "2026-11-07"
    },
    "note": "Winter term schedule, 19 Oct 2026 to 17 Jan 2027. Exact month band from the current branch PDF; rounded HTML labels are not used. Confirm session availability before visiting."
   },
   {
    "name": "Jumper",
    "category": "Gym & Movement",
    "offering": "offered",
    "age": {
     "minMonths": 24,
     "maxMonths": 35,
     "level": "branch",
     "verification": "provider-confirmed",
     "providerAgeUrl": "https://www.rockstaracademy.com/lib/upload/files/club/AS_Schedule_Winter_20261.pdf",
     "sourceCheckedAt": "2026-11-07"
    },
    "note": "Winter term schedule, 19 Oct 2026 to 17 Jan 2027. Exact month band from the current branch PDF; rounded HTML labels are not used. Confirm session availability before visiting."
   }
  ],
  "website": "https://www.rockstaracademy.com/schedules-and-locations",
  "sourceUrl": "https://www.rockstaracademy.com/schedules-and-locations",
  "lastCheckedAt": "2026-11-07",
  "fitStatus": "branch-confirmed",
  "notes": "Current branch Winter Term PDF (19 Oct 2026 to 17 Jan 2027) confirms Crawler 6-18 months, Walker 12-23 months, and Jumper 24-35 months. Other programs not exhaustively transcribed. Outer-ring location (Sentul, Kab. Bogor), beyond core Jabodetabek.",
  "reviews": {
   "rating": 4.8,
   "reviewCount": 121,
   "source": "Google Maps",
   "checkedAt": "2026-11-03",
   "praiseThemes": [],
   "complaintThemes": [],
   "sourceUrl": "https://www.google.com/maps/search/?api=1&query=Rockstar+Academy+-+AEON+MALL+Sentul+City&query_place_id=ChIJd2bwdtHHaS4RC7hGNcdYV68"
  },
  "operatingStatus": {
   "state": "official-listed",
   "source": "https://www.rockstaracademy.com/lib/upload/files/club/AS_Schedule_Winter_20261.pdf",
   "checkedAt": "2026-11-07"
  },
  "phone": "+62 21 39713970"
 },
 {
  "id": "rockstar-academy-aeon-mall-deltamas",
  "chain": "Rockstar Academy",
  "branchName": "AEON Mall Deltamas",
  "categories": [
   "Gym & Movement",
   "Dance",
   "Swim"
  ],
  "address": "Hegarmukti, Central Cikarang, Bekasi Regency, West Java 17530, Indonesia",
  "area": "Bekasi",
  "city": "Bekasi",
  "lat": -6.350594,
  "lng": 107.195336,
  "coordinateSource": "maps-pin",
  "programs": [
   {
    "name": "Crawler",
    "category": "Gym & Movement",
    "offering": "offered",
    "age": {
     "minMonths": 6,
     "maxMonths": 18,
     "level": "branch",
     "verification": "provider-confirmed",
     "providerAgeUrl": "https://www.rockstaracademy.com/lib/upload/files/club/AD_Schedule_Winter_20261.pdf",
     "sourceCheckedAt": "2026-11-07"
    },
    "note": "Winter term schedule, 19 Oct 2026 to 17 Jan 2027. Exact month band from the current branch PDF; rounded HTML labels are not used. Confirm session availability before visiting."
   },
   {
    "name": "Walker",
    "category": "Gym & Movement",
    "offering": "offered",
    "age": {
     "minMonths": 12,
     "maxMonths": 23,
     "level": "branch",
     "verification": "provider-confirmed",
     "providerAgeUrl": "https://www.rockstaracademy.com/lib/upload/files/club/AD_Schedule_Winter_20261.pdf",
     "sourceCheckedAt": "2026-11-07"
    },
    "note": "Winter term schedule, 19 Oct 2026 to 17 Jan 2027. Exact month band from the current branch PDF; rounded HTML labels are not used. Confirm session availability before visiting."
   },
   {
    "name": "Jumper",
    "category": "Gym & Movement",
    "offering": "offered",
    "age": {
     "minMonths": 24,
     "maxMonths": 35,
     "level": "branch",
     "verification": "provider-confirmed",
     "providerAgeUrl": "https://www.rockstaracademy.com/lib/upload/files/club/AD_Schedule_Winter_20261.pdf",
     "sourceCheckedAt": "2026-11-07"
    },
    "note": "Winter term schedule, 19 Oct 2026 to 17 Jan 2027. Exact month band from the current branch PDF; rounded HTML labels are not used. Confirm session availability before visiting."
   }
  ],
  "website": "https://www.rockstaracademy.com/schedules-and-locations",
  "sourceUrl": "https://www.rockstaracademy.com/schedules-and-locations",
  "lastCheckedAt": "2026-11-07",
  "fitStatus": "branch-confirmed",
  "notes": "Current branch Winter Term PDF (19 Oct 2026 to 17 Jan 2027) confirms Crawler 6-18 months, Walker 12-23 months, and Jumper 24-35 months. Other programs not exhaustively transcribed. Outer-ring location (Cikarang), beyond core Jabodetabek.",
  "reviews": {
   "rating": 4.7,
   "reviewCount": 37,
   "source": "Google Maps",
   "checkedAt": "2026-11-03",
   "praiseThemes": [],
   "complaintThemes": [],
   "sourceUrl": "https://www.google.com/maps/search/?api=1&query=Rockstar+Academy+AEON+Mall+Deltamas&query_place_id=ChIJ91SSRgCbaS4RD10mF8UDJ1M"
  },
  "operatingStatus": {
   "state": "official-listed",
   "source": "https://www.rockstaracademy.com/lib/upload/files/club/AD_Schedule_Winter_20261.pdf",
   "checkedAt": "2026-11-07"
  },
  "phone": "+62 21 39724242"
 },
 {
  "id": "rockstar-academy-central-park-2",
  "chain": "Rockstar Academy",
  "branchName": "Central Park 2",
  "categories": [
   "Gym & Movement",
   "Dance",
   "Swim"
  ],
  "address": "Central Park Mall 2, Jl. Letjen S. Parman No.Kav. 28 3rd floor, RT.3/RW.5, Tj. Duren Sel., Kec. Grogol petamburan, Kota Jakarta Barat, Daerah Khusus Ibukota Jakarta 11470, Indonesia",
  "area": "Jakarta Barat",
  "city": "Jakarta Barat",
  "lat": -6.175134,
  "lng": 106.790086,
  "coordinateSource": "maps-pin",
  "programs": [
   {
    "name": "Crawler",
    "category": "Gym & Movement",
    "offering": "offered",
    "age": {
     "minMonths": 6,
     "maxMonths": 18,
     "level": "branch",
     "verification": "provider-confirmed",
     "providerAgeUrl": "https://www.rockstaracademy.com/lib/upload/files/club/CP_Schedule_Winter_Term_2026.pdf",
     "sourceCheckedAt": "2026-11-07"
    },
    "note": "Winter term schedule, 19 Oct 2026 to 17 Jan 2027. Exact month band from the current branch PDF; rounded HTML labels are not used. Confirm session availability before visiting."
   },
   {
    "name": "Walker",
    "category": "Gym & Movement",
    "offering": "offered",
    "age": {
     "minMonths": 12,
     "maxMonths": 23,
     "level": "branch",
     "verification": "provider-confirmed",
     "providerAgeUrl": "https://www.rockstaracademy.com/lib/upload/files/club/CP_Schedule_Winter_Term_2026.pdf",
     "sourceCheckedAt": "2026-11-07"
    },
    "note": "Winter term schedule, 19 Oct 2026 to 17 Jan 2027. Exact month band from the current branch PDF; rounded HTML labels are not used. Confirm session availability before visiting."
   },
   {
    "name": "Jumper",
    "category": "Gym & Movement",
    "offering": "offered",
    "age": {
     "minMonths": 24,
     "maxMonths": 35,
     "level": "branch",
     "verification": "provider-confirmed",
     "providerAgeUrl": "https://www.rockstaracademy.com/lib/upload/files/club/CP_Schedule_Winter_Term_2026.pdf",
     "sourceCheckedAt": "2026-11-07"
    },
    "note": "Winter term schedule, 19 Oct 2026 to 17 Jan 2027. Exact month band from the current branch PDF; rounded HTML labels are not used. Confirm session availability before visiting."
   }
  ],
  "website": "https://www.rockstaracademy.com/schedules-and-locations",
  "sourceUrl": "https://www.rockstaracademy.com/schedules-and-locations",
  "lastCheckedAt": "2026-11-07",
  "fitStatus": "branch-confirmed",
  "notes": "Current branch Winter Term PDF (19 Oct 2026 to 17 Jan 2027) confirms Crawler 6-18 months, Walker 12-23 months, and Jumper 24-35 months. Other programs not exhaustively transcribed. Chain states programs from 6 months to 18 years; under-4 programs seen: Mom & Me Beginner 6-35 months, Baby Dance 1-3 yrs (club schedule PDF). Programs vary per branch.",
  "reviews": {
   "rating": 4.9,
   "reviewCount": 438,
   "source": "Google Maps",
   "checkedAt": "2026-11-03",
   "praiseThemes": [],
   "complaintThemes": [],
   "sourceUrl": "https://www.google.com/maps/search/?api=1&query=RockStar+Academy+-+Central+Park+2&query_place_id=ChIJ92MKt0r3aS4R7Btkt865WAk"
  },
  "operatingStatus": {
   "state": "official-listed",
   "source": "https://www.rockstaracademy.com/lib/upload/files/club/CP_Schedule_Winter_Term_2026.pdf",
   "checkedAt": "2026-11-07"
  },
  "phone": "+62 21 50860730"
 },
 {
  "id": "rockstar-academy-gajah-mada-plaza",
  "chain": "Rockstar Academy",
  "branchName": "Gajah Mada Plaza",
  "categories": [
   "Gym & Movement",
   "Dance",
   "Swim"
  ],
  "address": "Jl. Gajah Mada No.19-26 5th Floor, Unit #01-03, RT.2/RW.1, Petojo Utara, Kecamatan Gambir, Kota Jakarta Pusat, Daerah Khusus Ibukota Jakarta 10130, Indonesia",
  "area": "Jakarta Pusat",
  "city": "Jakarta Pusat",
  "lat": -6.16084,
  "lng": 106.818022,
  "coordinateSource": "maps-pin",
  "programs": [
   {
    "name": "Crawler",
    "category": "Gym & Movement",
    "offering": "offered",
    "age": {
     "minMonths": 6,
     "maxMonths": 18,
     "level": "branch",
     "verification": "provider-confirmed",
     "providerAgeUrl": "https://www.rockstaracademy.com/lib/upload/files/club/GM_Schedule_Winter_20261.pdf",
     "sourceCheckedAt": "2026-11-07"
    },
    "note": "Winter term schedule, 19 Oct 2026 to 17 Jan 2027. Exact month band from the current branch PDF; rounded HTML labels are not used. Confirm session availability before visiting."
   },
   {
    "name": "Walker",
    "category": "Gym & Movement",
    "offering": "offered",
    "age": {
     "minMonths": 12,
     "maxMonths": 23,
     "level": "branch",
     "verification": "provider-confirmed",
     "providerAgeUrl": "https://www.rockstaracademy.com/lib/upload/files/club/GM_Schedule_Winter_20261.pdf",
     "sourceCheckedAt": "2026-11-07"
    },
    "note": "Winter term schedule, 19 Oct 2026 to 17 Jan 2027. Exact month band from the current branch PDF; rounded HTML labels are not used. Confirm session availability before visiting."
   },
   {
    "name": "Jumper",
    "category": "Gym & Movement",
    "offering": "offered",
    "age": {
     "minMonths": 24,
     "maxMonths": 35,
     "level": "branch",
     "verification": "provider-confirmed",
     "providerAgeUrl": "https://www.rockstaracademy.com/lib/upload/files/club/GM_Schedule_Winter_20261.pdf",
     "sourceCheckedAt": "2026-11-07"
    },
    "note": "Winter term schedule, 19 Oct 2026 to 17 Jan 2027. Exact month band from the current branch PDF; rounded HTML labels are not used. Confirm session availability before visiting."
   }
  ],
  "website": "https://www.rockstaracademy.com/schedules-and-locations",
  "sourceUrl": "https://www.rockstaracademy.com/schedules-and-locations",
  "lastCheckedAt": "2026-11-07",
  "fitStatus": "branch-confirmed",
  "notes": "Current branch Winter Term PDF (19 Oct 2026 to 17 Jan 2027) confirms Crawler 6-18 months, Walker 12-23 months, and Jumper 24-35 months. Other programs not exhaustively transcribed. Chain states programs from 6 months to 18 years; under-4 programs seen: Mom & Me Beginner 6-35 months, Baby Dance 1-3 yrs (club schedule PDF). Programs vary per branch.",
  "reviews": {
   "rating": 4.7,
   "reviewCount": 291,
   "source": "Google Maps",
   "checkedAt": "2026-11-03",
   "praiseThemes": [],
   "complaintThemes": [],
   "sourceUrl": "https://www.google.com/maps/search/?api=1&query=Rockstar+Academy+-+Gajah+Mada+Plaza&query_place_id=ChIJZYiQZAD1aS4RwGCWo75MBzU"
  },
  "operatingStatus": {
   "state": "official-listed",
   "source": "https://www.rockstaracademy.com/lib/upload/files/club/GM_Schedule_Winter_20261.pdf",
   "checkedAt": "2026-11-07"
  },
  "phone": "+62 21 39729888"
 },
 {
  "id": "rockstar-academy-gandaria-city",
  "chain": "Rockstar Academy",
  "branchName": "Gandaria City",
  "categories": [
   "Gym & Movement",
   "Dance",
   "Swim"
  ],
  "address": "Gandaria City, Jl. Sultan Iskandar Muda LG Floor Unit #01, RT.10/RW.6, Kby. Lama Utara, Kec. Kebayoran Lama, Kota Jakarta Selatan, Daerah Khusus Ibukota Jakarta 12240, Indonesia",
  "area": "Jakarta Selatan",
  "city": "Jakarta Selatan",
  "lat": -6.243591,
  "lng": 106.7835,
  "coordinateSource": "maps-pin",
  "programs": [
   {
    "name": "Learn & Play 1",
    "offering": "offered",
    "age": {
     "minMonths": null,
     "maxMonths": null,
     "level": "branch",
     "verification": "unknown",
     "sourceConflict": true,
     "providerAgeUrl": "https://www.rockstaracademy.com/lib/upload/files/club/GC_Schedule_Winter_20261.pdf",
     "sourceCheckedAt": "2026-11-03"
    },
    "term": "19 Oct 2026 until 17 Jan 2027",
    "note": "6-18 mo (PDF grid cell); live web grid showed 0-2 yrs"
   },
   {
    "name": "Learn & Play 2",
    "offering": "offered",
    "age": {
     "minMonths": null,
     "maxMonths": null,
     "level": "branch",
     "verification": "unknown",
     "sourceConflict": true,
     "providerAgeUrl": "https://www.rockstaracademy.com/lib/upload/files/club/GC_Schedule_Winter_20261.pdf",
     "sourceCheckedAt": "2026-11-03"
    },
    "term": "19 Oct 2026 until 17 Jan 2027",
    "note": "19-35 mo (PDF grid cell); live web grid showed 1-3 yrs"
   },
   {
    "name": "Smartology 3",
    "offering": "offered",
    "age": {
     "minMonths": 36,
     "maxMonths": 48,
     "providerAgeUrl": "https://www.rockstaracademy.com/lib/upload/files/club/GC_Schedule_Winter_20261.pdf",
     "sourceCheckedAt": "2026-11-03",
     "level": "branch",
     "verification": "provider-confirmed"
    },
    "term": "19 Oct 2026 until 17 Jan 2027",
    "note": "upper-bound inclusivity at 48 months ambiguous"
   },
   {
    "name": "Walker",
    "offering": "offered",
    "age": {
     "minMonths": 12,
     "maxMonths": 23,
     "providerAgeUrl": "https://www.rockstaracademy.com/lib/upload/files/club/GC_Schedule_Winter_20261.pdf",
     "sourceCheckedAt": "2026-11-03",
     "level": "branch",
     "verification": "provider-confirmed"
    },
    "term": "19 Oct 2026 until 17 Jan 2027",
    "note": "12-23 mo"
   },
   {
    "name": "Jumper",
    "offering": "offered",
    "age": {
     "minMonths": 24,
     "maxMonths": 35,
     "providerAgeUrl": "https://www.rockstaracademy.com/lib/upload/files/club/GC_Schedule_Winter_20261.pdf",
     "sourceCheckedAt": "2026-11-03",
     "level": "branch",
     "verification": "provider-confirmed"
    },
    "term": "19 Oct 2026 until 17 Jan 2027",
    "note": "24-35 mo"
   },
   {
    "name": "Crawler",
    "offering": "offered",
    "age": {
     "minMonths": 6,
     "maxMonths": 18,
     "providerAgeUrl": "https://www.rockstaracademy.com/lib/upload/files/club/GC_Schedule_Winter_20261.pdf",
     "sourceCheckedAt": "2026-11-03",
     "level": "branch",
     "verification": "provider-confirmed"
    },
    "term": "19 Oct 2026 until 17 Jan 2027",
    "note": "6-18 mo"
   },
   {
    "name": "Baby Jam",
    "offering": "offered",
    "age": {
     "minMonths": 6,
     "maxMonths": 18,
     "providerAgeUrl": "https://www.rockstaracademy.com/lib/upload/files/club/GC_Schedule_Winter_20261.pdf",
     "sourceCheckedAt": "2026-11-03",
     "level": "branch",
     "verification": "provider-confirmed"
    },
    "term": "19 Oct 2026 until 17 Jan 2027",
    "note": "6-18 mo"
   },
   {
    "name": "Tots Gym U4",
    "offering": "offered",
    "age": {
     "minMonths": 36,
     "maxMonths": 48,
     "providerAgeUrl": "https://www.rockstaracademy.com/lib/upload/files/club/GC_Schedule_Winter_20261.pdf",
     "sourceCheckedAt": "2026-11-03",
     "level": "branch",
     "verification": "provider-confirmed"
    },
    "term": "19 Oct 2026 until 17 Jan 2027",
    "noteUrl": "https://www.rockstaracademy.com/schedules-and-locations/pesona-square",
    "noteLabel": "Age key",
    "note": "PDF cell label 'Tots Gym U4'; numeric age via official web schedule key ('Tots Gym U4 3 - 4 Years')"
   },
   {
    "name": "Baby Dance",
    "offering": "offered",
    "age": {
     "minMonths": 12,
     "maxMonths": 36,
     "providerAgeUrl": "https://www.rockstaracademy.com/lib/upload/files/club/GC_Schedule_Winter_20261.pdf",
     "sourceCheckedAt": "2026-11-03",
     "level": "branch",
     "verification": "provider-confirmed"
    },
    "term": "19 Oct 2026 until 17 Jan 2027",
    "note": "year-boundary inclusivity ambiguous"
   },
   {
    "name": "Move & Groove",
    "offering": "offered",
    "age": {
     "minMonths": 36,
     "maxMonths": 60,
     "providerAgeUrl": "https://www.rockstaracademy.com/lib/upload/files/club/GC_Schedule_Winter_20261.pdf",
     "sourceCheckedAt": "2026-11-03",
     "level": "branch",
     "verification": "provider-confirmed"
    },
    "term": "19 Oct 2026 until 17 Jan 2027",
    "note": "overlaps under-4; boundary ambiguous"
   },
   {
    "name": "Pre-Ballet 3-5",
    "offering": "offered",
    "age": {
     "minMonths": 36,
     "maxMonths": 60,
     "providerAgeUrl": "https://www.rockstaracademy.com/lib/upload/files/club/GC_Schedule_Winter_20261.pdf",
     "sourceCheckedAt": "2026-11-03",
     "level": "branch",
     "verification": "provider-confirmed"
    },
    "term": "19 Oct 2026 until 17 Jan 2027",
    "note": "overlaps under-4; boundary ambiguous"
   },
   {
    "name": "Sports U3",
    "offering": "offered",
    "age": {
     "minMonths": 24,
     "maxMonths": 36,
     "providerAgeUrl": "https://www.rockstaracademy.com/lib/upload/files/club/GC_Schedule_Winter_20261.pdf",
     "sourceCheckedAt": "2026-11-03",
     "level": "branch",
     "verification": "provider-confirmed"
    },
    "term": "19 Oct 2026 until 17 Jan 2027",
    "noteUrl": "https://www.rockstaracademy.com/schedules-and-locations/pesona-square",
    "noteLabel": "Age key",
    "note": "PDF cell label 'Sports U3'; numeric age via official web schedule key ('Sports U3 2 - 3 Years')"
   },
   {
    "name": "Sports U4/5",
    "offering": "offered",
    "age": {
     "minMonths": 36,
     "maxMonths": 60,
     "providerAgeUrl": "https://www.rockstaracademy.com/lib/upload/files/club/GC_Schedule_Winter_20261.pdf",
     "sourceCheckedAt": "2026-11-03",
     "level": "branch",
     "verification": "provider-confirmed"
    },
    "term": "19 Oct 2026 until 17 Jan 2027",
    "noteUrl": "https://www.rockstaracademy.com/schedules-and-locations/pesona-square",
    "noteLabel": "Age key",
    "note": "overlaps under-4; boundary ambiguous Label key via official web schedule ('Sports U4/5 3 - 5 Years')"
   }
  ],
  "website": "https://www.rockstaracademy.com/schedules-and-locations",
  "sourceUrl": "https://www.rockstaracademy.com/schedules-and-locations",
  "lastCheckedAt": "2026-11-03",
  "fitStatus": "branch-confirmed-dated-term",
  "notes": "Chain states programs from 6 months to 18 years; under-4 programs seen: Mom & Me Beginner 6-35 months, Baby Dance 1-3 yrs (club schedule PDF). Programs vary per branch. | 2026-11-03 re-validation: offerings pixel-verified against Winter Term PDF page 1 (Mon AM crop + full page). Learn & Play 1/2 and Smartology 3/4 confirmed as real grid slots (previously missed by text extraction due to stacked/hyphenated cell text). Tots Gym / gym-class names embedded in icon graphics.",
  "reviews": {
   "rating": 4.8,
   "reviewCount": 374,
   "source": "Google Maps",
   "checkedAt": "2026-11-03",
   "praiseThemes": [
    "clean, safe environment; complete program range; professional, cheerful coaches"
   ],
   "complaintThemes": [
    "one member asked for renovation, bigger classes and more facilities"
   ],
   "sampleNote": "Small sample: 3 visible reviews plus Google's own review summary, checked 2026-11-03. Not a representative read of all 374 reviews.",
   "sourceUrl": "https://www.google.com/maps/search/?api=1&query=Rockstar+Academy+-+Gandaria+City&query_place_id=ChIJcSkwRxfxaS4RYKB1otONwLM"
  },
  "operatingStatus": {
   "state": "official-listed",
   "source": "https://www.rockstaracademy.com/schedules-and-locations",
   "checkedAt": "2026-11-04"
  },
  "phone": "+62 21 29008081"
 },
 {
  "id": "rockstar-academy-grand-metropolitan-bekasi",
  "chain": "Rockstar Academy",
  "branchName": "Grand Metropolitan Bekasi",
  "categories": [
   "Gym & Movement",
   "Dance",
   "Swim"
  ],
  "address": "Grand Metropolitan Mall, Jl. KH. Noer Ali, RT.007/RW.003, Pekayon Jaya, Kec. Bekasi Sel., Kota Bks, Jawa Barat 17148, Indonesia",
  "area": "Bekasi",
  "city": "Bekasi",
  "lat": -6.249313,
  "lng": 106.984708,
  "coordinateSource": "maps-pin",
  "programs": [
   {
    "name": "Crawler",
    "category": "Gym & Movement",
    "offering": "offered",
    "age": {
     "minMonths": 6,
     "maxMonths": 18,
     "level": "branch",
     "verification": "provider-confirmed",
     "providerAgeUrl": "https://www.rockstaracademy.com/lib/upload/files/club/GB_Schedule_Winter_20261.pdf",
     "sourceCheckedAt": "2026-11-07"
    },
    "note": "Winter term schedule, 19 Oct 2026 to 17 Jan 2027. Exact month band from the current branch PDF; rounded HTML labels are not used. Confirm session availability before visiting."
   },
   {
    "name": "Walker",
    "category": "Gym & Movement",
    "offering": "offered",
    "age": {
     "minMonths": 12,
     "maxMonths": 23,
     "level": "branch",
     "verification": "provider-confirmed",
     "providerAgeUrl": "https://www.rockstaracademy.com/lib/upload/files/club/GB_Schedule_Winter_20261.pdf",
     "sourceCheckedAt": "2026-11-07"
    },
    "note": "Winter term schedule, 19 Oct 2026 to 17 Jan 2027. Exact month band from the current branch PDF; rounded HTML labels are not used. Confirm session availability before visiting."
   },
   {
    "name": "Jumper",
    "category": "Gym & Movement",
    "offering": "offered",
    "age": {
     "minMonths": 24,
     "maxMonths": 35,
     "level": "branch",
     "verification": "provider-confirmed",
     "providerAgeUrl": "https://www.rockstaracademy.com/lib/upload/files/club/GB_Schedule_Winter_20261.pdf",
     "sourceCheckedAt": "2026-11-07"
    },
    "note": "Winter term schedule, 19 Oct 2026 to 17 Jan 2027. Exact month band from the current branch PDF; rounded HTML labels are not used. Confirm session availability before visiting."
   }
  ],
  "website": "https://www.rockstaracademy.com/schedules-and-locations",
  "sourceUrl": "https://www.rockstaracademy.com/schedules-and-locations",
  "lastCheckedAt": "2026-11-07",
  "fitStatus": "branch-confirmed",
  "notes": "Current branch Winter Term PDF (19 Oct 2026 to 17 Jan 2027) confirms Crawler 6-18 months, Walker 12-23 months, and Jumper 24-35 months. Other programs not exhaustively transcribed. Chain states programs from 6 months to 18 years; under-4 programs seen: Mom & Me Beginner 6-35 months, Baby Dance 1-3 yrs (club schedule PDF). Programs vary per branch.",
  "reviews": {
   "rating": 4.9,
   "reviewCount": 718,
   "source": "Google Maps",
   "checkedAt": "2026-11-03",
   "praiseThemes": [],
   "complaintThemes": [],
   "sourceUrl": "https://www.google.com/maps/search/?api=1&query=Rockstar+Academy+-+Grand+Metropolitan+Bekasi&query_place_id=ChIJYePEXl6NaS4RSy2GXCsnVz4"
  },
  "operatingStatus": {
   "state": "official-listed",
   "source": "https://www.rockstaracademy.com/lib/upload/files/club/GB_Schedule_Winter_20261.pdf",
   "checkedAt": "2026-11-07"
  },
  "phone": "+62 21 29579878"
 },
 {
  "id": "rockstar-academy-hampton-square",
  "chain": "Rockstar Academy",
  "branchName": "Hampton Square",
  "categories": [
   "Gym & Movement",
   "Dance",
   "Swim"
  ],
  "address": "Hampton Square Serpong, Jl. Gading Serpong Boulevard 1st Floor Unit #12B, Medang, Kec. Pagedangan, Kabupaten Tangerang, Banten 15810, Indonesia",
  "area": "Kabupaten Tangerang",
  "city": "Kabupaten Tangerang",
  "lat": -6.26654,
  "lng": 106.618264,
  "coordinateSource": "maps-pin",
  "programs": [
   {
    "name": "Crawler",
    "category": "Gym & Movement",
    "offering": "offered",
    "age": {
     "minMonths": 6,
     "maxMonths": 18,
     "level": "branch",
     "verification": "provider-confirmed",
     "providerAgeUrl": "https://www.rockstaracademy.com/lib/upload/files/club/HS_Schedule_Winter_2026%C2%A0W3.pdf",
     "sourceCheckedAt": "2026-11-07"
    },
    "note": "Winter term schedule, 19 Oct 2026 to 17 Jan 2027. Exact month band from the current branch PDF; rounded HTML labels are not used. Confirm session availability before visiting."
   },
   {
    "name": "Walker",
    "category": "Gym & Movement",
    "offering": "offered",
    "age": {
     "minMonths": 12,
     "maxMonths": 23,
     "level": "branch",
     "verification": "provider-confirmed",
     "providerAgeUrl": "https://www.rockstaracademy.com/lib/upload/files/club/HS_Schedule_Winter_2026%C2%A0W3.pdf",
     "sourceCheckedAt": "2026-11-07"
    },
    "note": "Winter term schedule, 19 Oct 2026 to 17 Jan 2027. Exact month band from the current branch PDF; rounded HTML labels are not used. Confirm session availability before visiting."
   },
   {
    "name": "Jumper",
    "category": "Gym & Movement",
    "offering": "offered",
    "age": {
     "minMonths": 24,
     "maxMonths": 35,
     "level": "branch",
     "verification": "provider-confirmed",
     "providerAgeUrl": "https://www.rockstaracademy.com/lib/upload/files/club/HS_Schedule_Winter_2026%C2%A0W3.pdf",
     "sourceCheckedAt": "2026-11-07"
    },
    "note": "Winter term schedule, 19 Oct 2026 to 17 Jan 2027. Exact month band from the current branch PDF; rounded HTML labels are not used. Confirm session availability before visiting."
   }
  ],
  "website": "https://www.rockstaracademy.com/schedules-and-locations",
  "sourceUrl": "https://www.rockstaracademy.com/schedules-and-locations",
  "lastCheckedAt": "2026-11-07",
  "fitStatus": "branch-confirmed",
  "notes": "Current branch Winter Term PDF (19 Oct 2026 to 17 Jan 2027) confirms Crawler 6-18 months, Walker 12-23 months, and Jumper 24-35 months. Other programs not exhaustively transcribed. Chain states programs from 6 months to 18 years; under-4 programs seen: Mom & Me Beginner 6-35 months, Baby Dance 1-3 yrs (club schedule PDF). Programs vary per branch.",
  "reviews": {
   "rating": 4.3,
   "reviewCount": 56,
   "source": "Google Maps",
   "checkedAt": "2026-11-03",
   "praiseThemes": [],
   "complaintThemes": [],
   "sourceUrl": "https://www.google.com/maps/search/?api=1&query=Rockstar+Academy+-+Hampton+Square&query_place_id=ChIJ32CLaTP9aS4R4rtSilMOZcQ"
  },
  "operatingStatus": {
   "state": "official-listed",
   "source": "https://www.rockstaracademy.com/lib/upload/files/club/HS_Schedule_Winter_2026%C2%A0W3.pdf",
   "checkedAt": "2026-11-07"
  },
  "phone": "+62 21 39713400"
 },
 {
  "id": "rockstar-academy-kota-kasablanka",
  "chain": "Rockstar Academy",
  "branchName": "Kota Kasablanka",
  "categories": [
   "Gym & Movement",
   "Dance",
   "Swim"
  ],
  "address": "Kota Kasablanka, Mall Jl. Raya Casablanca No.88 3rd Floor, Unit #303, RT.16/RW.5, Menteng Dalam, Tebet, South Jakarta City, Jakarta 12870, Indonesia",
  "area": "Jakarta Selatan",
  "city": "Jakarta Selatan",
  "lat": -6.223726,
  "lng": 106.842514,
  "coordinateSource": "maps-pin",
  "programs": [
   {
    "name": "Learn & Play 1",
    "offering": "offered",
    "age": {
     "minMonths": 6,
     "maxMonths": 18,
     "providerAgeUrl": "https://www.rockstaracademy.com/lib/upload/files/club/KK_Schedule_Winter_20261.pdf",
     "sourceCheckedAt": "2026-11-03",
     "level": "branch",
     "verification": "provider-confirmed"
    },
    "term": "19 Oct 2026 until 17 Jan 2027",
    "note": "Preschool & Kindergarten classes carry an additional fee per PDF footer"
   },
   {
    "name": "Learn & Play 2",
    "offering": "offered",
    "age": {
     "minMonths": 19,
     "maxMonths": 35,
     "providerAgeUrl": "https://www.rockstaracademy.com/lib/upload/files/club/KK_Schedule_Winter_20261.pdf",
     "sourceCheckedAt": "2026-11-03",
     "level": "branch",
     "verification": "provider-confirmed"
    },
    "term": "19 Oct 2026 until 17 Jan 2027",
    "note": "Preschool & Kindergarten classes carry an additional fee per PDF footer"
   },
   {
    "name": "Smartology 3",
    "offering": "offered",
    "age": {
     "minMonths": 36,
     "maxMonths": 48,
     "providerAgeUrl": "https://www.rockstaracademy.com/lib/upload/files/club/KK_Schedule_Winter_20261.pdf",
     "sourceCheckedAt": "2026-11-03",
     "level": "branch",
     "verification": "provider-confirmed"
    },
    "term": "19 Oct 2026 until 17 Jan 2027",
    "note": "upper-bound inclusivity ambiguous; additional fee per PDF footer"
   },
   {
    "name": "Crawler",
    "offering": "offered",
    "age": {
     "minMonths": 6,
     "maxMonths": 18,
     "providerAgeUrl": "https://www.rockstaracademy.com/lib/upload/files/club/KK_Schedule_Winter_20261.pdf",
     "sourceCheckedAt": "2026-11-03",
     "level": "branch",
     "verification": "provider-confirmed"
    },
    "term": "19 Oct 2026 until 17 Jan 2027",
    "note": "6-18 mo"
   },
   {
    "name": "Walker",
    "offering": "offered",
    "age": {
     "minMonths": 12,
     "maxMonths": 23,
     "providerAgeUrl": "https://www.rockstaracademy.com/lib/upload/files/club/KK_Schedule_Winter_20261.pdf",
     "sourceCheckedAt": "2026-11-03",
     "level": "branch",
     "verification": "provider-confirmed"
    },
    "term": "19 Oct 2026 until 17 Jan 2027",
    "note": "12-23 mo"
   },
   {
    "name": "Jumper",
    "offering": "offered",
    "age": {
     "minMonths": 24,
     "maxMonths": 35,
     "providerAgeUrl": "https://www.rockstaracademy.com/lib/upload/files/club/KK_Schedule_Winter_20261.pdf",
     "sourceCheckedAt": "2026-11-03",
     "level": "branch",
     "verification": "provider-confirmed"
    },
    "term": "19 Oct 2026 until 17 Jan 2027",
    "note": "24-35 mo"
   },
   {
    "name": "Baby Jam",
    "offering": "offered",
    "age": {
     "minMonths": 6,
     "maxMonths": 18,
     "providerAgeUrl": "https://www.rockstaracademy.com/lib/upload/files/club/KK_Schedule_Winter_20261.pdf",
     "sourceCheckedAt": "2026-11-03",
     "level": "branch",
     "verification": "provider-confirmed"
    },
    "term": "19 Oct 2026 until 17 Jan 2027",
    "note": "NEW badge on PDF (Friday slot)"
   },
   {
    "name": "Baby Dance",
    "offering": "offered",
    "age": {
     "minMonths": 12,
     "maxMonths": 36,
     "providerAgeUrl": "https://www.rockstaracademy.com/lib/upload/files/club/KK_Schedule_Winter_20261.pdf",
     "sourceCheckedAt": "2026-11-03",
     "level": "branch",
     "verification": "provider-confirmed"
    },
    "term": "19 Oct 2026 until 17 Jan 2027",
    "note": "year-boundary inclusivity ambiguous"
   },
   {
    "name": "Baby (Ballet)",
    "offering": "offered",
    "age": {
     "minMonths": 24,
     "maxMonths": 36,
     "providerAgeUrl": "https://www.rockstaracademy.com/lib/upload/files/club/KK_Schedule_Winter_20261.pdf",
     "sourceCheckedAt": "2026-11-03",
     "level": "branch",
     "verification": "provider-confirmed"
    },
    "term": "19 Oct 2026 until 17 Jan 2027",
    "note": "year-boundary inclusivity ambiguous"
   },
   {
    "name": "Move & Groove",
    "offering": "offered",
    "age": {
     "minMonths": 36,
     "maxMonths": 60,
     "providerAgeUrl": "https://www.rockstaracademy.com/lib/upload/files/club/KK_Schedule_Winter_20261.pdf",
     "sourceCheckedAt": "2026-11-03",
     "level": "branch",
     "verification": "provider-confirmed"
    },
    "term": "19 Oct 2026 until 17 Jan 2027",
    "note": "overlaps under-4; boundary ambiguous"
   },
   {
    "name": "Pre-Ballet 3-5",
    "offering": "offered",
    "age": {
     "minMonths": 36,
     "maxMonths": 60,
     "providerAgeUrl": "https://www.rockstaracademy.com/lib/upload/files/club/KK_Schedule_Winter_20261.pdf",
     "sourceCheckedAt": "2026-11-03",
     "level": "branch",
     "verification": "provider-confirmed"
    },
    "term": "19 Oct 2026 until 17 Jan 2027",
    "note": "overlaps under-4; boundary ambiguous"
   },
   {
    "name": "Sports U3",
    "offering": "offered",
    "age": {
     "minMonths": 24,
     "maxMonths": 36,
     "providerAgeUrl": "https://www.rockstaracademy.com/lib/upload/files/club/KK_Schedule_Winter_20261.pdf",
     "sourceCheckedAt": "2026-11-03",
     "level": "branch",
     "verification": "provider-confirmed"
    },
    "term": "19 Oct 2026 until 17 Jan 2027",
    "noteUrl": "https://www.rockstaracademy.com/schedules-and-locations/pesona-square",
    "noteLabel": "Age key",
    "note": "PDF cell label is 'Sports U3' with no numeric age; numeric age mapped via official Rockstar web schedule tables ('Sports U3 2 - 3 Years')"
   },
   {
    "name": "Tots Gym U4",
    "offering": "offered",
    "age": {
     "minMonths": 36,
     "maxMonths": 48,
     "providerAgeUrl": "https://www.rockstaracademy.com/lib/upload/files/club/KK_Schedule_Winter_20261.pdf",
     "sourceCheckedAt": "2026-11-03",
     "level": "branch",
     "verification": "provider-confirmed"
    },
    "term": "19 Oct 2026 until 17 Jan 2027",
    "noteUrl": "https://www.rockstaracademy.com/schedules-and-locations/pesona-square",
    "noteLabel": "Age key",
    "note": "PDF cell label is 'Tots Gym U4' with no numeric age; numeric age mapped via official Rockstar web schedule tables ('Tots Gym U4 3 - 4 Years')"
   }
  ],
  "website": "https://www.rockstaracademy.com/schedules-and-locations",
  "sourceUrl": "https://www.rockstaracademy.com/schedules-and-locations",
  "lastCheckedAt": "2026-11-03",
  "fitStatus": "branch-confirmed-dated-term",
  "notes": "Chain states programs from 6 months to 18 years; under-4 programs seen: Mom & Me Beginner 6-35 months, Baby Dance 1-3 yrs (club schedule PDF). Programs vary per branch.",
  "reviews": {
   "rating": 4.2,
   "reviewCount": 223,
   "source": "Google Maps",
   "checkedAt": "2026-11-03",
   "praiseThemes": [],
   "complaintThemes": [],
   "sourceUrl": "https://www.google.com/maps/search/?api=1&query=Rockstar+Academy+-+Kota+Kasablanka&query_place_id=ChIJb-pmwozzaS4RYAm_4EKmfG4"
  },
  "operatingStatus": {
   "state": "official-listed",
   "source": "https://www.rockstaracademy.com/schedules-and-locations",
   "checkedAt": "2026-11-04"
  },
  "phone": "+62 21 29612708"
 },
 {
  "id": "rockstar-academy-lippo-mall-kemang",
  "chain": "Rockstar Academy",
  "branchName": "Lippo Mall Kemang",
  "categories": [
   "Gym & Movement",
   "Dance",
   "Swim"
  ],
  "address": "Lippo Mall, Kemang Village Jl. Pangeran Antasari No.3, RT.12/RW.Unit01A, Cipete Utara, Kec. Mampang Prpt., Kota Jakarta Selatan, Daerah Khusus Ibukota Jakarta 12150, Indonesia",
  "area": "Jakarta Selatan",
  "city": "Jakarta Selatan",
  "lat": -6.262007,
  "lng": 106.812842,
  "coordinateSource": "maps-pin",
  "programs": [
   {
    "name": "Crawler",
    "category": "Gym & Movement",
    "offering": "offered",
    "age": {
     "minMonths": 6,
     "maxMonths": 18,
     "level": "branch",
     "verification": "provider-confirmed",
     "providerAgeUrl": "https://www.rockstaracademy.com/lib/upload/files/club/KV_Schedule_Winter_20261.pdf",
     "sourceCheckedAt": "2026-11-07"
    },
    "note": "Winter term schedule, 19 Oct 2026 to 17 Jan 2027. Exact month band from the current branch PDF; rounded HTML labels are not used. Confirm session availability before visiting."
   },
   {
    "name": "Walker",
    "category": "Gym & Movement",
    "offering": "offered",
    "age": {
     "minMonths": 12,
     "maxMonths": 23,
     "level": "branch",
     "verification": "provider-confirmed",
     "providerAgeUrl": "https://www.rockstaracademy.com/lib/upload/files/club/KV_Schedule_Winter_20261.pdf",
     "sourceCheckedAt": "2026-11-07"
    },
    "note": "Winter term schedule, 19 Oct 2026 to 17 Jan 2027. Exact month band from the current branch PDF; rounded HTML labels are not used. Confirm session availability before visiting."
   },
   {
    "name": "Jumper",
    "category": "Gym & Movement",
    "offering": "offered",
    "age": {
     "minMonths": 24,
     "maxMonths": 35,
     "level": "branch",
     "verification": "provider-confirmed",
     "providerAgeUrl": "https://www.rockstaracademy.com/lib/upload/files/club/KV_Schedule_Winter_20261.pdf",
     "sourceCheckedAt": "2026-11-07"
    },
    "note": "Winter term schedule, 19 Oct 2026 to 17 Jan 2027. Exact month band from the current branch PDF; rounded HTML labels are not used. Confirm session availability before visiting."
   }
  ],
  "website": "https://www.rockstaracademy.com/schedules-and-locations",
  "sourceUrl": "https://www.rockstaracademy.com/schedules-and-locations",
  "lastCheckedAt": "2026-11-07",
  "fitStatus": "branch-confirmed",
  "notes": "Current branch Winter Term PDF (19 Oct 2026 to 17 Jan 2027) confirms Crawler 6-18 months, Walker 12-23 months, and Jumper 24-35 months. Other programs not exhaustively transcribed. Chain states programs from 6 months to 18 years; under-4 programs seen: Mom & Me Beginner 6-35 months, Baby Dance 1-3 yrs (club schedule PDF). Programs vary per branch.",
  "reviews": {
   "rating": 4.9,
   "reviewCount": 683,
   "source": "Google Maps",
   "checkedAt": "2026-11-03",
   "praiseThemes": [],
   "complaintThemes": [],
   "sourceUrl": "https://www.google.com/maps/search/?api=1&query=Rockstar+Academy+-+Lippo+Mall+Kemang&query_place_id=ChIJBUQQZXjxaS4RcYd3wRO0fR0"
  },
  "operatingStatus": {
   "state": "official-listed",
   "source": "https://www.rockstaracademy.com/lib/upload/files/club/KV_Schedule_Winter_20261.pdf",
   "checkedAt": "2026-11-07"
  },
  "phone": "+62 21 29056776"
 },
 {
  "id": "rockstar-academy-lippo-mall-puri",
  "chain": "Rockstar Academy",
  "branchName": "Lippo Mall Puri",
  "categories": [
   "Gym & Movement",
   "Dance",
   "Swim"
  ],
  "address": "Jl. Puri Indah Raya B-01, RT.3/RW.2, Kembangan Sel., Kec. Kembangan, Kota Jakarta Barat, Daerah Khusus Ibukota Jakarta 11610, Indonesia",
  "area": "Jakarta Barat",
  "city": "Jakarta Barat",
  "lat": -6.188113,
  "lng": 106.739756,
  "coordinateSource": "maps-pin",
  "programs": [
   {
    "name": "Crawler",
    "category": "Gym & Movement",
    "offering": "offered",
    "age": {
     "minMonths": 6,
     "maxMonths": 18,
     "level": "branch",
     "verification": "provider-confirmed",
     "providerAgeUrl": "https://www.rockstaracademy.com/lib/upload/files/club/LP_Schedule_Winter_20261.pdf",
     "sourceCheckedAt": "2026-11-07"
    },
    "note": "Winter term schedule, 19 Oct 2026 to 17 Jan 2027. Exact month band from the current branch PDF; rounded HTML labels are not used. Confirm session availability before visiting."
   },
   {
    "name": "Walker",
    "category": "Gym & Movement",
    "offering": "offered",
    "age": {
     "minMonths": 12,
     "maxMonths": 23,
     "level": "branch",
     "verification": "provider-confirmed",
     "providerAgeUrl": "https://www.rockstaracademy.com/lib/upload/files/club/LP_Schedule_Winter_20261.pdf",
     "sourceCheckedAt": "2026-11-07"
    },
    "note": "Winter term schedule, 19 Oct 2026 to 17 Jan 2027. Exact month band from the current branch PDF; rounded HTML labels are not used. Confirm session availability before visiting."
   },
   {
    "name": "Jumper",
    "category": "Gym & Movement",
    "offering": "offered",
    "age": {
     "minMonths": 24,
     "maxMonths": 35,
     "level": "branch",
     "verification": "provider-confirmed",
     "providerAgeUrl": "https://www.rockstaracademy.com/lib/upload/files/club/LP_Schedule_Winter_20261.pdf",
     "sourceCheckedAt": "2026-11-07"
    },
    "note": "Winter term schedule, 19 Oct 2026 to 17 Jan 2027. Exact month band from the current branch PDF; rounded HTML labels are not used. Confirm session availability before visiting."
   }
  ],
  "website": "https://www.rockstaracademy.com/schedules-and-locations",
  "sourceUrl": "https://www.rockstaracademy.com/schedules-and-locations",
  "lastCheckedAt": "2026-11-07",
  "fitStatus": "branch-confirmed",
  "notes": "Current branch Winter Term PDF (19 Oct 2026 to 17 Jan 2027) confirms Crawler 6-18 months, Walker 12-23 months, and Jumper 24-35 months. Other programs not exhaustively transcribed. Chain states programs from 6 months to 18 years; under-4 programs seen: Mom & Me Beginner 6-35 months, Baby Dance 1-3 yrs (club schedule PDF). Programs vary per branch.",
  "reviews": {
   "rating": 4.5,
   "reviewCount": 139,
   "source": "Google Maps",
   "checkedAt": "2026-11-03",
   "praiseThemes": [],
   "complaintThemes": [],
   "sourceUrl": "https://www.google.com/maps/search/?api=1&query=Rockstar+Academy+-+Lippo+Mall+Puri&query_place_id=ChIJdVVRlXH3aS4RfSgMHgm4DlY"
  },
  "operatingStatus": {
   "state": "official-listed",
   "source": "https://www.rockstaracademy.com/lib/upload/files/club/LP_Schedule_Winter_20261.pdf",
   "checkedAt": "2026-11-07"
  },
  "phone": "+62 21 22582777"
 },
 {
  "id": "rockstar-academy-lippo-plaza-ekalokasari",
  "chain": "Rockstar Academy",
  "branchName": "Lippo Plaza Ekalokasari",
  "categories": [
   "Gym & Movement",
   "Dance",
   "Swim"
  ],
  "address": "Lippo Plaza Ekalokasari, Jl. Siliwangi No.123, RT.01/RW.01, Sukasari, Kec. Bogor Tim., Kota Bogor, Jawa Barat 16142, Indonesia",
  "area": "Bogor",
  "city": "Bogor",
  "lat": -6.62182,
  "lng": 106.818407,
  "coordinateSource": "maps-pin",
  "programs": [
   {
    "name": "Crawler",
    "category": "Gym & Movement",
    "offering": "offered",
    "age": {
     "minMonths": 6,
     "maxMonths": 18,
     "level": "branch",
     "verification": "provider-confirmed",
     "providerAgeUrl": "https://www.rockstaracademy.com/lib/upload/files/club/LE_Schedule_Winter_20261.pdf",
     "sourceCheckedAt": "2026-11-07"
    },
    "note": "Winter term schedule, 19 Oct 2026 to 17 Jan 2027. Exact month band from the current branch PDF; rounded HTML labels are not used. Confirm session availability before visiting."
   },
   {
    "name": "Walker",
    "category": "Gym & Movement",
    "offering": "offered",
    "age": {
     "minMonths": 12,
     "maxMonths": 23,
     "level": "branch",
     "verification": "provider-confirmed",
     "providerAgeUrl": "https://www.rockstaracademy.com/lib/upload/files/club/LE_Schedule_Winter_20261.pdf",
     "sourceCheckedAt": "2026-11-07"
    },
    "note": "Winter term schedule, 19 Oct 2026 to 17 Jan 2027. Exact month band from the current branch PDF; rounded HTML labels are not used. Confirm session availability before visiting."
   },
   {
    "name": "Jumper",
    "category": "Gym & Movement",
    "offering": "offered",
    "age": {
     "minMonths": 24,
     "maxMonths": 35,
     "level": "branch",
     "verification": "provider-confirmed",
     "providerAgeUrl": "https://www.rockstaracademy.com/lib/upload/files/club/LE_Schedule_Winter_20261.pdf",
     "sourceCheckedAt": "2026-11-07"
    },
    "note": "Winter term schedule, 19 Oct 2026 to 17 Jan 2027. Exact month band from the current branch PDF; rounded HTML labels are not used. Confirm session availability before visiting."
   }
  ],
  "website": "https://www.rockstaracademy.com/schedules-and-locations",
  "sourceUrl": "https://www.rockstaracademy.com/schedules-and-locations",
  "lastCheckedAt": "2026-11-07",
  "fitStatus": "branch-confirmed",
  "notes": "Current branch Winter Term PDF (19 Oct 2026 to 17 Jan 2027) confirms Crawler 6-18 months, Walker 12-23 months, and Jumper 24-35 months. Other programs not exhaustively transcribed. Chain states programs from 6 months to 18 years; under-4 programs seen: Mom & Me Beginner 6-35 months, Baby Dance 1-3 yrs (club schedule PDF). Programs vary per branch.",
  "reviews": {
   "rating": 5,
   "reviewCount": 47,
   "source": "Google Maps",
   "checkedAt": "2026-11-03",
   "praiseThemes": [],
   "complaintThemes": [],
   "sourceUrl": "https://www.google.com/maps/search/?api=1&query=Rockstar+Academy+-+Lippo+Plaza+Ekalokasari&query_place_id=ChIJ8cWnOzDFaS4RAiYmF1PvSck"
  },
  "operatingStatus": {
   "state": "official-listed",
   "source": "https://www.rockstaracademy.com/lib/upload/files/club/LE_Schedule_Winter_20261.pdf",
   "checkedAt": "2026-11-07"
  },
  "phone": "+62 251 3101100"
 },
 {
  "id": "rockstar-academy-living-world-alam-sutera",
  "chain": "Rockstar Academy",
  "branchName": "Living World Alam Sutera",
  "categories": [
   "Gym & Movement",
   "Dance",
   "Swim"
  ],
  "address": "Jl. Nn No.42, RT.1/RW.4, Pakulonan, Kec. Serpong Utara, Kota Tangerang Selatan, Banten 15325, Indonesia",
  "area": "Tangerang Selatan",
  "city": "Tangerang Selatan",
  "lat": -6.244283,
  "lng": 106.654139,
  "coordinateSource": "maps-pin",
  "programs": [
   {
    "name": "Crawler",
    "category": "Gym & Movement",
    "offering": "offered",
    "age": {
     "minMonths": 6,
     "maxMonths": 18,
     "level": "branch",
     "verification": "provider-confirmed",
     "providerAgeUrl": "https://www.rockstaracademy.com/lib/upload/files/club/LW_Schedule_Winter_2026%C2%A0W3.pdf",
     "sourceCheckedAt": "2026-11-07"
    },
    "note": "Winter term schedule, 19 Oct 2026 to 17 Jan 2027. Exact month band from the current branch PDF; rounded HTML labels are not used. Confirm session availability before visiting."
   },
   {
    "name": "Walker",
    "category": "Gym & Movement",
    "offering": "offered",
    "age": {
     "minMonths": 12,
     "maxMonths": 23,
     "level": "branch",
     "verification": "provider-confirmed",
     "providerAgeUrl": "https://www.rockstaracademy.com/lib/upload/files/club/LW_Schedule_Winter_2026%C2%A0W3.pdf",
     "sourceCheckedAt": "2026-11-07"
    },
    "note": "Winter term schedule, 19 Oct 2026 to 17 Jan 2027. Exact month band from the current branch PDF; rounded HTML labels are not used. Confirm session availability before visiting."
   },
   {
    "name": "Jumper",
    "category": "Gym & Movement",
    "offering": "offered",
    "age": {
     "minMonths": 24,
     "maxMonths": 35,
     "level": "branch",
     "verification": "provider-confirmed",
     "providerAgeUrl": "https://www.rockstaracademy.com/lib/upload/files/club/LW_Schedule_Winter_2026%C2%A0W3.pdf",
     "sourceCheckedAt": "2026-11-07"
    },
    "note": "Winter term schedule, 19 Oct 2026 to 17 Jan 2027. Exact month band from the current branch PDF; rounded HTML labels are not used. Confirm session availability before visiting."
   }
  ],
  "website": "https://www.rockstaracademy.com/schedules-and-locations",
  "sourceUrl": "https://www.rockstaracademy.com/schedules-and-locations",
  "lastCheckedAt": "2026-11-07",
  "fitStatus": "branch-confirmed",
  "notes": "Current branch Winter Term PDF (19 Oct 2026 to 17 Jan 2027) confirms Crawler 6-18 months, Walker 12-23 months, and Jumper 24-35 months. Other programs not exhaustively transcribed. Chain states programs from 6 months to 18 years; under-4 programs seen: Mom & Me Beginner 6-35 months, Baby Dance 1-3 yrs (club schedule PDF). Programs vary per branch.",
  "reviews": {
   "rating": 4.7,
   "reviewCount": 199,
   "source": "Google Maps",
   "checkedAt": "2026-11-03",
   "praiseThemes": [],
   "complaintThemes": [],
   "sourceUrl": "https://www.google.com/maps/search/?api=1&query=Rockstar+Academy+-+Living+World+Alam+Sutera&query_place_id=ChIJD2NXTAb7aS4RmChEUP5dr7c"
  },
  "operatingStatus": {
   "state": "official-listed",
   "source": "https://www.rockstaracademy.com/lib/upload/files/club/LW_Schedule_Winter_2026%C2%A0W3.pdf",
   "checkedAt": "2026-11-07"
  },
  "phone": "+62 21 29239500"
 },
 {
  "id": "rockstar-academy-lotte-mart-bintaro",
  "chain": "Rockstar Academy",
  "branchName": "Lotte Mart Bintaro",
  "categories": [
   "Gym & Movement",
   "Dance",
   "Swim"
  ],
  "address": "CBD, Jl. MH Thamrin Jaya Sektor 7 No.06 Blk B7 01, Pd. Jaya, Kec. Pd. Aren, Kota Tangerang Selatan, Banten 15224, Indonesia",
  "area": "Tangerang Selatan",
  "city": "Tangerang Selatan",
  "lat": -6.274813,
  "lng": 106.723668,
  "coordinateSource": "maps-pin",
  "programs": [
   {
    "name": "Learn & Play 1",
    "offering": "offered",
    "age": {
     "minMonths": 6,
     "maxMonths": 18,
     "providerAgeUrl": "https://www.rockstaracademy.com/lib/upload/files/club/LB_Schedule_Winter_20261.pdf",
     "sourceCheckedAt": "2026-11-03",
     "level": "branch",
     "verification": "provider-confirmed"
    },
    "term": "19 Oct 2026 until 17 Jan 2027",
    "note": "6-18 mo"
   },
   {
    "name": "Learn & Play 2",
    "offering": "offered",
    "age": {
     "minMonths": 19,
     "maxMonths": 35,
     "providerAgeUrl": "https://www.rockstaracademy.com/lib/upload/files/club/LB_Schedule_Winter_20261.pdf",
     "sourceCheckedAt": "2026-11-03",
     "level": "branch",
     "verification": "provider-confirmed"
    },
    "term": "19 Oct 2026 until 17 Jan 2027",
    "note": "19-35 mo"
   },
   {
    "name": "Smartology 3",
    "offering": "offered",
    "age": {
     "minMonths": 36,
     "maxMonths": 48,
     "providerAgeUrl": "https://www.rockstaracademy.com/lib/upload/files/club/LB_Schedule_Winter_20261.pdf",
     "sourceCheckedAt": "2026-11-03",
     "level": "branch",
     "verification": "provider-confirmed"
    },
    "term": "19 Oct 2026 until 17 Jan 2027",
    "note": "upper-bound inclusivity at 48 months ambiguous"
   },
   {
    "name": "Crawler",
    "offering": "offered",
    "age": {
     "minMonths": 6,
     "maxMonths": 18,
     "providerAgeUrl": "https://www.rockstaracademy.com/lib/upload/files/club/LB_Schedule_Winter_20261.pdf",
     "sourceCheckedAt": "2026-11-03",
     "level": "branch",
     "verification": "provider-confirmed"
    },
    "term": "19 Oct 2026 until 17 Jan 2027",
    "note": "6-18 mo"
   },
   {
    "name": "Walker",
    "offering": "offered",
    "age": {
     "minMonths": 12,
     "maxMonths": 23,
     "providerAgeUrl": "https://www.rockstaracademy.com/lib/upload/files/club/LB_Schedule_Winter_20261.pdf",
     "sourceCheckedAt": "2026-11-03",
     "level": "branch",
     "verification": "provider-confirmed"
    },
    "term": "19 Oct 2026 until 17 Jan 2027",
    "note": "12-23 mo"
   },
   {
    "name": "Jumper",
    "offering": "offered",
    "age": {
     "minMonths": 24,
     "maxMonths": 35,
     "providerAgeUrl": "https://www.rockstaracademy.com/lib/upload/files/club/LB_Schedule_Winter_20261.pdf",
     "sourceCheckedAt": "2026-11-03",
     "level": "branch",
     "verification": "provider-confirmed"
    },
    "term": "19 Oct 2026 until 17 Jan 2027",
    "note": "24-35 mo"
   },
   {
    "name": "Baby Jam",
    "offering": "offered",
    "age": {
     "minMonths": 6,
     "maxMonths": 18,
     "providerAgeUrl": "https://www.rockstaracademy.com/lib/upload/files/club/LB_Schedule_Winter_20261.pdf",
     "sourceCheckedAt": "2026-11-03",
     "level": "branch",
     "verification": "provider-confirmed"
    },
    "term": "19 Oct 2026 until 17 Jan 2027",
    "note": "6-18 mo"
   },
   {
    "name": "Baby Dance",
    "offering": "offered",
    "age": {
     "minMonths": 12,
     "maxMonths": 36,
     "providerAgeUrl": "https://www.rockstaracademy.com/lib/upload/files/club/LB_Schedule_Winter_20261.pdf",
     "sourceCheckedAt": "2026-11-03",
     "level": "branch",
     "verification": "provider-confirmed"
    },
    "term": "19 Oct 2026 until 17 Jan 2027",
    "note": "year-boundary inclusivity ambiguous"
   },
   {
    "name": "Baby Ballet",
    "offering": "offered",
    "age": {
     "minMonths": 24,
     "maxMonths": 36,
     "providerAgeUrl": "https://www.rockstaracademy.com/lib/upload/files/club/LB_Schedule_Winter_20261.pdf",
     "sourceCheckedAt": "2026-11-03",
     "level": "branch",
     "verification": "provider-confirmed"
    },
    "term": "19 Oct 2026 until 17 Jan 2027",
    "note": "year-boundary inclusivity ambiguous"
   },
   {
    "name": "Move & Groove",
    "offering": "offered",
    "age": {
     "minMonths": 36,
     "maxMonths": 60,
     "providerAgeUrl": "https://www.rockstaracademy.com/lib/upload/files/club/LB_Schedule_Winter_20261.pdf",
     "sourceCheckedAt": "2026-11-03",
     "level": "branch",
     "verification": "provider-confirmed"
    },
    "term": "19 Oct 2026 until 17 Jan 2027",
    "note": "overlaps under-4; boundary ambiguous"
   },
   {
    "name": "Pre-Ballet 3-5",
    "offering": "offered",
    "age": {
     "minMonths": 36,
     "maxMonths": 60,
     "providerAgeUrl": "https://www.rockstaracademy.com/lib/upload/files/club/LB_Schedule_Winter_20261.pdf",
     "sourceCheckedAt": "2026-11-03",
     "level": "branch",
     "verification": "provider-confirmed"
    },
    "term": "19 Oct 2026 until 17 Jan 2027",
    "note": "overlaps under-4; boundary ambiguous"
   },
   {
    "name": "Sports U3",
    "offering": "offered",
    "age": {
     "minMonths": 24,
     "maxMonths": 36,
     "providerAgeUrl": "https://www.rockstaracademy.com/lib/upload/files/club/LB_Schedule_Winter_20261.pdf",
     "sourceCheckedAt": "2026-11-03",
     "level": "branch",
     "verification": "provider-confirmed"
    },
    "term": "19 Oct 2026 until 17 Jan 2027",
    "noteUrl": "https://www.rockstaracademy.com/schedules-and-locations/pesona-square",
    "noteLabel": "Age key",
    "note": "PDF cell label is 'Sports U3' with no numeric age; numeric age mapped via official Rockstar web schedule tables ('Sports U3 2 - 3 Years')"
   },
   {
    "name": "Tots Gym U4",
    "offering": "offered",
    "age": {
     "minMonths": 36,
     "maxMonths": 48,
     "providerAgeUrl": "https://www.rockstaracademy.com/lib/upload/files/club/LB_Schedule_Winter_20261.pdf",
     "sourceCheckedAt": "2026-11-03",
     "level": "branch",
     "verification": "provider-confirmed"
    },
    "term": "19 Oct 2026 until 17 Jan 2027",
    "noteUrl": "https://www.rockstaracademy.com/schedules-and-locations/pesona-square",
    "noteLabel": "Age key",
    "note": "PDF cell label is 'Tots Gym U4' with no numeric age; numeric age mapped via official Rockstar web schedule tables ('Tots Gym U4 3 - 4 Years')"
   }
  ],
  "website": "https://www.rockstaracademy.com/schedules-and-locations",
  "sourceUrl": "https://www.rockstaracademy.com/schedules-and-locations",
  "lastCheckedAt": "2026-11-03",
  "fitStatus": "branch-confirmed-dated-term",
  "notes": "Chain states programs from 6 months to 18 years; under-4 programs seen: Mom & Me Beginner 6-35 months, Baby Dance 1-3 yrs (club schedule PDF). Programs vary per branch.",
  "reviews": {
   "rating": 4.0,
   "reviewCount": 52,
   "source": "Google Maps",
   "checkedAt": "2026-11-03",
   "praiseThemes": [
    "caring, patient teachers; friendly staff; spacious venue"
   ],
   "complaintThemes": [
    "one 1-star review reports management repeatedly sent incorrect schedules; not independently corroborated"
   ],
   "sampleNote": "Small sample: 5 visible reviews, checked 2026-11-03. Not a representative read of all 52 reviews.",
   "sourceUrl": "https://www.google.com/maps/search/?api=1&query=Rockstar+Academy+-+Lotte+Mart+Bintaro&query_place_id=ChIJk3De_LLxaS4RTh_uIZPAoU8"
  },
  "operatingStatus": {
   "state": "official-listed",
   "source": "https://www.rockstaracademy.com/schedules-and-locations",
   "checkedAt": "2026-11-04"
  },
  "phone": "+62 21 39714200"
 },
 {
  "id": "rockstar-academy-mall-of-indonesia",
  "chain": "Rockstar Academy",
  "branchName": "Mall of Indonesia",
  "categories": [
   "Gym & Movement",
   "Dance",
   "Swim"
  ],
  "address": "Mall of Indonesia LT. 2 Unit C11-15, Jl. Boulevard Barat Raya, Kelapa Gading Barat, Kelapa Gading, RT.18/RW.8, Klp. Gading Bar., Kec. Klp. Gading, Jkt Utara, Daerah Khusus Ibukota Jakarta 14240, Indonesia",
  "area": "Jakarta Utara",
  "city": "Jakarta Utara",
  "lat": -6.151084,
  "lng": 106.892627,
  "coordinateSource": "maps-pin",
  "programs": [
   {
    "name": "Crawler",
    "category": "Gym & Movement",
    "offering": "offered",
    "age": {
     "minMonths": 6,
     "maxMonths": 18,
     "level": "branch",
     "verification": "provider-confirmed",
     "providerAgeUrl": "https://www.rockstaracademy.com/lib/upload/files/club/MI_Schedule_WInter_20262.pdf",
     "sourceCheckedAt": "2026-11-07"
    },
    "note": "Winter term schedule, 19 Oct 2026 to 17 Jan 2027. Exact month band from the current branch PDF; rounded HTML labels are not used. Confirm session availability before visiting."
   },
   {
    "name": "Walker",
    "category": "Gym & Movement",
    "offering": "offered",
    "age": {
     "minMonths": 12,
     "maxMonths": 23,
     "level": "branch",
     "verification": "provider-confirmed",
     "providerAgeUrl": "https://www.rockstaracademy.com/lib/upload/files/club/MI_Schedule_WInter_20262.pdf",
     "sourceCheckedAt": "2026-11-07"
    },
    "note": "Winter term schedule, 19 Oct 2026 to 17 Jan 2027. Exact month band from the current branch PDF; rounded HTML labels are not used. Confirm session availability before visiting."
   },
   {
    "name": "Jumper",
    "category": "Gym & Movement",
    "offering": "offered",
    "age": {
     "minMonths": 24,
     "maxMonths": 35,
     "level": "branch",
     "verification": "provider-confirmed",
     "providerAgeUrl": "https://www.rockstaracademy.com/lib/upload/files/club/MI_Schedule_WInter_20262.pdf",
     "sourceCheckedAt": "2026-11-07"
    },
    "note": "Winter term schedule, 19 Oct 2026 to 17 Jan 2027. Exact month band from the current branch PDF; rounded HTML labels are not used. Confirm session availability before visiting."
   }
  ],
  "website": "https://www.rockstaracademy.com/schedules-and-locations",
  "sourceUrl": "https://www.rockstaracademy.com/schedules-and-locations",
  "lastCheckedAt": "2026-11-07",
  "fitStatus": "branch-confirmed",
  "notes": "Current branch Winter Term PDF (19 Oct 2026 to 17 Jan 2027) confirms Crawler 6-18 months, Walker 12-23 months, and Jumper 24-35 months. Other programs not exhaustively transcribed. Chain states programs from 6 months to 18 years; under-4 programs seen: Mom & Me Beginner 6-35 months, Baby Dance 1-3 yrs (club schedule PDF). Programs vary per branch.",
  "reviews": {
   "rating": 4.5,
   "reviewCount": 197,
   "source": "Google Maps",
   "checkedAt": "2026-11-03",
   "praiseThemes": [],
   "complaintThemes": [],
   "sourceUrl": "https://www.google.com/maps/search/?api=1&query=Rockstar+Academy+-+Mall+of+Indonesia&query_place_id=ChIJsWYfC0H1aS4RsZ44hovSQRs"
  },
  "operatingStatus": {
   "state": "official-listed",
   "source": "https://www.rockstaracademy.com/lib/upload/files/club/MI_Schedule_WInter_20262.pdf",
   "checkedAt": "2026-11-07"
  },
  "phone": "+62 21 29365155"
 },
 {
  "id": "rockstar-academy-pik-avenue",
  "chain": "Rockstar Academy",
  "branchName": "PIK Avenue",
  "categories": [
   "Gym & Movement",
   "Dance",
   "Swim"
  ],
  "address": "PIK Avenue Mall 2nd Floor Unit # 2-A1, RT.6/RW.2, Kamal Muara, Penjaringan, North Jakarta City, Jakarta 14470, Indonesia",
  "area": "Jakarta Utara",
  "city": "Jakarta Utara",
  "lat": -6.109989,
  "lng": 106.740433,
  "coordinateSource": "maps-pin",
  "programs": [
   {
    "name": "Crawler",
    "category": "Gym & Movement",
    "offering": "offered",
    "age": {
     "minMonths": 6,
     "maxMonths": 18,
     "level": "branch",
     "verification": "provider-confirmed",
     "providerAgeUrl": "https://www.rockstaracademy.com/lib/upload/files/club/PA_Schedule_Winter_20261.pdf",
     "sourceCheckedAt": "2026-11-07"
    },
    "note": "Winter term schedule, 19 Oct 2026 to 17 Jan 2027. Exact month band from the current branch PDF; rounded HTML labels are not used. Confirm session availability before visiting."
   },
   {
    "name": "Walker",
    "category": "Gym & Movement",
    "offering": "offered",
    "age": {
     "minMonths": 12,
     "maxMonths": 23,
     "level": "branch",
     "verification": "provider-confirmed",
     "providerAgeUrl": "https://www.rockstaracademy.com/lib/upload/files/club/PA_Schedule_Winter_20261.pdf",
     "sourceCheckedAt": "2026-11-07"
    },
    "note": "Winter term schedule, 19 Oct 2026 to 17 Jan 2027. Exact month band from the current branch PDF; rounded HTML labels are not used. Confirm session availability before visiting."
   },
   {
    "name": "Jumper",
    "category": "Gym & Movement",
    "offering": "offered",
    "age": {
     "minMonths": 24,
     "maxMonths": 35,
     "level": "branch",
     "verification": "provider-confirmed",
     "providerAgeUrl": "https://www.rockstaracademy.com/lib/upload/files/club/PA_Schedule_Winter_20261.pdf",
     "sourceCheckedAt": "2026-11-07"
    },
    "note": "Winter term schedule, 19 Oct 2026 to 17 Jan 2027. Exact month band from the current branch PDF; rounded HTML labels are not used. Confirm session availability before visiting."
   }
  ],
  "website": "https://www.rockstaracademy.com/schedules-and-locations",
  "sourceUrl": "https://www.rockstaracademy.com/schedules-and-locations",
  "lastCheckedAt": "2026-11-07",
  "fitStatus": "branch-confirmed",
  "notes": "Current branch Winter Term PDF (19 Oct 2026 to 17 Jan 2027) confirms Crawler 6-18 months, Walker 12-23 months, and Jumper 24-35 months. Other programs not exhaustively transcribed. Chain states programs from 6 months to 18 years; under-4 programs seen: Mom & Me Beginner 6-35 months, Baby Dance 1-3 yrs (club schedule PDF). Programs vary per branch.",
  "reviews": {
   "rating": 4.9,
   "reviewCount": 230,
   "source": "Google Maps",
   "checkedAt": "2026-11-03",
   "praiseThemes": [],
   "complaintThemes": [],
   "sourceUrl": "https://www.google.com/maps/search/?api=1&query=Rockstar+Academy+-+PIK+Avenue&query_place_id=ChIJPVVd8MEdai4RTPxwUNzaOss"
  },
  "operatingStatus": {
   "state": "official-listed",
   "source": "https://www.rockstaracademy.com/lib/upload/files/club/PA_Schedule_Winter_20261.pdf",
   "checkedAt": "2026-11-07"
  },
  "phone": "+62 21 22570990"
 },
 {
  "id": "rockstar-academy-pesona-square",
  "chain": "Rockstar Academy",
  "branchName": "Pesona Square",
  "categories": [
   "Gym & Movement",
   "Dance",
   "Swim"
  ],
  "address": "Pesona Square Mall, Jl. Ir. H. Juanda 2nd Floor, Unit #L2-A1, Bakti Jaya, Kec. Sukmajaya, Kota Depok, Jawa Barat 16418, Indonesia",
  "area": "Depok",
  "city": "Depok",
  "lat": -6.380109,
  "lng": 106.8448,
  "coordinateSource": "maps-pin",
  "programs": [
   {
    "name": "Crawler",
    "category": "Gym & Movement",
    "offering": "offered",
    "age": {
     "minMonths": 6,
     "maxMonths": 18,
     "level": "branch",
     "verification": "provider-confirmed",
     "providerAgeUrl": "https://www.rockstaracademy.com/lib/upload/files/club/PS_Schedule_Winter_20261.pdf",
     "sourceCheckedAt": "2026-11-07"
    },
    "note": "Winter term schedule, 19 Oct 2026 to 17 Jan 2027. Exact month band from the current branch PDF; rounded HTML labels are not used. Confirm session availability before visiting."
   },
   {
    "name": "Walker",
    "category": "Gym & Movement",
    "offering": "offered",
    "age": {
     "minMonths": 12,
     "maxMonths": 23,
     "level": "branch",
     "verification": "provider-confirmed",
     "providerAgeUrl": "https://www.rockstaracademy.com/lib/upload/files/club/PS_Schedule_Winter_20261.pdf",
     "sourceCheckedAt": "2026-11-07"
    },
    "note": "Winter term schedule, 19 Oct 2026 to 17 Jan 2027. Exact month band from the current branch PDF; rounded HTML labels are not used. Confirm session availability before visiting."
   },
   {
    "name": "Jumper",
    "category": "Gym & Movement",
    "offering": "offered",
    "age": {
     "minMonths": 24,
     "maxMonths": 35,
     "level": "branch",
     "verification": "provider-confirmed",
     "providerAgeUrl": "https://www.rockstaracademy.com/lib/upload/files/club/PS_Schedule_Winter_20261.pdf",
     "sourceCheckedAt": "2026-11-07"
    },
    "note": "Winter term schedule, 19 Oct 2026 to 17 Jan 2027. Exact month band from the current branch PDF; rounded HTML labels are not used. Confirm session availability before visiting."
   }
  ],
  "website": "https://www.rockstaracademy.com/schedules-and-locations",
  "sourceUrl": "https://www.rockstaracademy.com/schedules-and-locations",
  "lastCheckedAt": "2026-11-07",
  "fitStatus": "branch-confirmed",
  "notes": "Current branch Winter Term PDF (19 Oct 2026 to 17 Jan 2027) confirms Crawler 6-18 months, Walker 12-23 months, and Jumper 24-35 months. Other programs not exhaustively transcribed. Chain states programs from 6 months to 18 years; under-4 programs seen: Mom & Me Beginner 6-35 months, Baby Dance 1-3 yrs (club schedule PDF). Programs vary per branch.",
  "reviews": {
   "rating": 4.7,
   "reviewCount": 180,
   "source": "Google Maps",
   "checkedAt": "2026-11-03",
   "praiseThemes": [],
   "complaintThemes": [],
   "sourceUrl": "https://www.google.com/maps/search/?api=1&query=Rockstar+Academy+-+Pesona+Square&query_place_id=ChIJk2_0XzrtaS4RKyz_8Z6y-xU"
  },
  "operatingStatus": {
   "state": "official-listed",
   "source": "https://www.rockstaracademy.com/lib/upload/files/club/PS_Schedule_Winter_20261.pdf",
   "checkedAt": "2026-11-07"
  },
  "phone": "+62 21 39703939"
 },
 {
  "id": "rockstar-academy-pluit-village",
  "chain": "Rockstar Academy",
  "branchName": "Pluit Village",
  "categories": [
   "Gym & Movement",
   "Dance",
   "Swim"
  ],
  "address": "Jl. Pluit Indah No.14, RT.1/RW.4, Pluit, Kecamatan Penjaringan, Jkt Utara, Daerah Khusus Ibukota Jakarta 14450, Indonesia",
  "area": "Jakarta Utara",
  "city": "Jakarta Utara",
  "lat": -6.116706,
  "lng": 106.790852,
  "coordinateSource": "maps-pin",
  "programs": [
   {
    "name": "Crawler",
    "category": "Gym & Movement",
    "offering": "offered",
    "age": {
     "minMonths": 6,
     "maxMonths": 18,
     "level": "branch",
     "verification": "provider-confirmed",
     "providerAgeUrl": "https://www.rockstaracademy.com/lib/upload/files/club/PV_Schedule_Winter_20261.pdf",
     "sourceCheckedAt": "2026-11-07"
    },
    "note": "Winter term schedule, 19 Oct 2026 to 17 Jan 2027. Exact month band from the current branch PDF; rounded HTML labels are not used. Confirm session availability before visiting."
   },
   {
    "name": "Walker",
    "category": "Gym & Movement",
    "offering": "offered",
    "age": {
     "minMonths": 12,
     "maxMonths": 23,
     "level": "branch",
     "verification": "provider-confirmed",
     "providerAgeUrl": "https://www.rockstaracademy.com/lib/upload/files/club/PV_Schedule_Winter_20261.pdf",
     "sourceCheckedAt": "2026-11-07"
    },
    "note": "Winter term schedule, 19 Oct 2026 to 17 Jan 2027. Exact month band from the current branch PDF; rounded HTML labels are not used. Confirm session availability before visiting."
   },
   {
    "name": "Jumper",
    "category": "Gym & Movement",
    "offering": "offered",
    "age": {
     "minMonths": 24,
     "maxMonths": 35,
     "level": "branch",
     "verification": "provider-confirmed",
     "providerAgeUrl": "https://www.rockstaracademy.com/lib/upload/files/club/PV_Schedule_Winter_20261.pdf",
     "sourceCheckedAt": "2026-11-07"
    },
    "note": "Winter term schedule, 19 Oct 2026 to 17 Jan 2027. Exact month band from the current branch PDF; rounded HTML labels are not used. Confirm session availability before visiting."
   }
  ],
  "website": "https://www.rockstaracademy.com/schedules-and-locations",
  "sourceUrl": "https://www.rockstaracademy.com/schedules-and-locations",
  "lastCheckedAt": "2026-11-07",
  "fitStatus": "branch-confirmed",
  "notes": "Current branch Winter Term PDF (19 Oct 2026 to 17 Jan 2027) confirms Crawler 6-18 months, Walker 12-23 months, and Jumper 24-35 months. Other programs not exhaustively transcribed. Chain states programs from 6 months to 18 years; under-4 programs seen: Mom & Me Beginner 6-35 months, Baby Dance 1-3 yrs (club schedule PDF). Programs vary per branch.",
  "reviews": {
   "rating": 4.9,
   "reviewCount": 385,
   "source": "Google Maps",
   "checkedAt": "2026-11-03",
   "praiseThemes": [],
   "complaintThemes": [],
   "sourceUrl": "https://www.google.com/maps/search/?api=1&query=Rockstar+Academy+-+Pluit+Village&query_place_id=ChIJ_QRdhJUdai4R3qnOjlCjS-g"
  },
  "operatingStatus": {
   "state": "official-listed",
   "source": "https://www.rockstaracademy.com/lib/upload/files/club/PV_Schedule_Winter_20261.pdf",
   "checkedAt": "2026-11-07"
  },
  "phone": "+62 21 6683690"
 },
 {
  "id": "rockstar-academy-tsm-cibubur",
  "chain": "Rockstar Academy",
  "branchName": "TSM Cibubur",
  "categories": [
   "Gym & Movement",
   "Dance",
   "Swim"
  ],
  "address": "Jl. Alternatif Cibubur, Harjamukti, Kec. Cimanggis, Kota Depok, Jawa Barat 16454, Indonesia",
  "area": "Depok",
  "city": "Depok",
  "lat": -6.375417,
  "lng": 106.902185,
  "coordinateSource": "maps-pin",
  "programs": [
   {
    "name": "Crawler",
    "category": "Gym & Movement",
    "offering": "offered",
    "age": {
     "minMonths": 6,
     "maxMonths": 18,
     "level": "branch",
     "verification": "provider-confirmed",
     "providerAgeUrl": "https://www.rockstaracademy.com/lib/upload/files/club/TC_Schedule_Winter_20261.pdf",
     "sourceCheckedAt": "2026-11-07"
    },
    "note": "Winter term schedule, 19 Oct 2026 to 17 Jan 2027. Exact month band from the current branch PDF; rounded HTML labels are not used. Confirm session availability before visiting."
   },
   {
    "name": "Walker",
    "category": "Gym & Movement",
    "offering": "offered",
    "age": {
     "minMonths": 12,
     "maxMonths": 23,
     "level": "branch",
     "verification": "provider-confirmed",
     "providerAgeUrl": "https://www.rockstaracademy.com/lib/upload/files/club/TC_Schedule_Winter_20261.pdf",
     "sourceCheckedAt": "2026-11-07"
    },
    "note": "Winter term schedule, 19 Oct 2026 to 17 Jan 2027. Exact month band from the current branch PDF; rounded HTML labels are not used. Confirm session availability before visiting."
   },
   {
    "name": "Jumper",
    "category": "Gym & Movement",
    "offering": "offered",
    "age": {
     "minMonths": 24,
     "maxMonths": 35,
     "level": "branch",
     "verification": "provider-confirmed",
     "providerAgeUrl": "https://www.rockstaracademy.com/lib/upload/files/club/TC_Schedule_Winter_20261.pdf",
     "sourceCheckedAt": "2026-11-07"
    },
    "note": "Winter term schedule, 19 Oct 2026 to 17 Jan 2027. Exact month band from the current branch PDF; rounded HTML labels are not used. Confirm session availability before visiting."
   }
  ],
  "website": "https://www.rockstaracademy.com/schedules-and-locations",
  "sourceUrl": "https://www.rockstaracademy.com/schedules-and-locations",
  "lastCheckedAt": "2026-11-07",
  "fitStatus": "branch-confirmed",
  "notes": "Current branch Winter Term PDF (19 Oct 2026 to 17 Jan 2027) confirms Crawler 6-18 months, Walker 12-23 months, and Jumper 24-35 months. Other programs not exhaustively transcribed. Chain states programs from 6 months to 18 years; under-4 programs seen: Mom & Me Beginner 6-35 months, Baby Dance 1-3 yrs (club schedule PDF). Programs vary per branch.",
  "reviews": {
   "rating": 4.7,
   "reviewCount": 220,
   "source": "Google Maps",
   "checkedAt": "2026-11-03",
   "praiseThemes": [],
   "complaintThemes": [],
   "sourceUrl": "https://www.google.com/maps/search/?api=1&query=Rockstar+Academy+-+TSM+Cibubur&query_place_id=ChIJbQ2Vc2DtaS4RlyT5geHOX9g"
  },
  "operatingStatus": {
   "state": "official-listed",
   "source": "https://www.rockstaracademy.com/lib/upload/files/club/TC_Schedule_Winter_20261.pdf",
   "checkedAt": "2026-11-07"
  },
  "phone": "+62 21 39715588"
 },
 {
  "id": "rockstar-academy-the-park-pejaten",
  "chain": "Rockstar Academy",
  "branchName": "The Park Pejaten",
  "categories": [
   "Gym & Movement",
   "Dance",
   "Swim"
  ],
  "address": "The Park Pejaten, Jl. Warung Jati Barat No.39 1st Floor, RT.1/RW.5, Jati Padang, Ps. Minggu, Kota Jakarta Selatan, Daerah Khusus Ibukota Jakarta 12540, Indonesia",
  "area": "Jakarta Selatan",
  "city": "Jakarta Selatan",
  "lat": -6.280539,
  "lng": 106.829084,
  "coordinateSource": "maps-pin",
  "programs": [
   {
    "name": "Learn & Play 1",
    "offering": "offered",
    "age": {
     "minMonths": 6,
     "maxMonths": 18,
     "providerAgeUrl": "https://www.rockstaracademy.com/lib/upload/files/club/PJ_Schedule_Winter_20261.pdf",
     "sourceCheckedAt": "2026-11-03",
     "level": "branch",
     "verification": "provider-confirmed"
    },
    "term": "19 Oct 2026 until 17 Jan 2027",
    "note": "Preschool & Kindergarten classes carry an additional fee per PDF footer"
   },
   {
    "name": "Learn & Play 2",
    "offering": "offered",
    "age": {
     "minMonths": 19,
     "maxMonths": 35,
     "providerAgeUrl": "https://www.rockstaracademy.com/lib/upload/files/club/PJ_Schedule_Winter_20261.pdf",
     "sourceCheckedAt": "2026-11-03",
     "level": "branch",
     "verification": "provider-confirmed"
    },
    "term": "19 Oct 2026 until 17 Jan 2027",
    "note": "Preschool & Kindergarten classes carry an additional fee per PDF footer"
   },
   {
    "name": "Smartology 3",
    "offering": "offered",
    "age": {
     "minMonths": 36,
     "maxMonths": 48,
     "providerAgeUrl": "https://www.rockstaracademy.com/lib/upload/files/club/PJ_Schedule_Winter_20261.pdf",
     "sourceCheckedAt": "2026-11-03",
     "level": "branch",
     "verification": "provider-confirmed"
    },
    "term": "19 Oct 2026 until 17 Jan 2027",
    "note": "upper-bound inclusivity ambiguous; additional fee per PDF footer"
   },
   {
    "name": "Crawler",
    "offering": "offered",
    "age": {
     "minMonths": 6,
     "maxMonths": 18,
     "providerAgeUrl": "https://www.rockstaracademy.com/lib/upload/files/club/PJ_Schedule_Winter_20261.pdf",
     "sourceCheckedAt": "2026-11-03",
     "level": "branch",
     "verification": "provider-confirmed"
    },
    "term": "19 Oct 2026 until 17 Jan 2027",
    "note": "6-18 mo"
   },
   {
    "name": "Walker",
    "offering": "offered",
    "age": {
     "minMonths": 12,
     "maxMonths": 23,
     "providerAgeUrl": "https://www.rockstaracademy.com/lib/upload/files/club/PJ_Schedule_Winter_20261.pdf",
     "sourceCheckedAt": "2026-11-03",
     "level": "branch",
     "verification": "provider-confirmed"
    },
    "term": "19 Oct 2026 until 17 Jan 2027",
    "note": "12-23 mo"
   },
   {
    "name": "Jumper",
    "offering": "offered",
    "age": {
     "minMonths": 24,
     "maxMonths": 35,
     "providerAgeUrl": "https://www.rockstaracademy.com/lib/upload/files/club/PJ_Schedule_Winter_20261.pdf",
     "sourceCheckedAt": "2026-11-03",
     "level": "branch",
     "verification": "provider-confirmed"
    },
    "term": "19 Oct 2026 until 17 Jan 2027",
    "note": "24-35 mo"
   },
   {
    "name": "Baby Jam",
    "offering": "offered",
    "age": {
     "minMonths": 6,
     "maxMonths": 18,
     "providerAgeUrl": "https://www.rockstaracademy.com/lib/upload/files/club/PJ_Schedule_Winter_20261.pdf",
     "sourceCheckedAt": "2026-11-03",
     "level": "branch",
     "verification": "provider-confirmed"
    },
    "term": "19 Oct 2026 until 17 Jan 2027",
    "note": "6-18 mo"
   },
   {
    "name": "Baby Dance",
    "offering": "offered",
    "age": {
     "minMonths": 12,
     "maxMonths": 36,
     "providerAgeUrl": "https://www.rockstaracademy.com/lib/upload/files/club/PJ_Schedule_Winter_20261.pdf",
     "sourceCheckedAt": "2026-11-03",
     "level": "branch",
     "verification": "provider-confirmed"
    },
    "term": "19 Oct 2026 until 17 Jan 2027",
    "note": "year-boundary inclusivity ambiguous"
   },
   {
    "name": "Baby (Ballet)",
    "offering": "offered",
    "age": {
     "minMonths": 24,
     "maxMonths": 36,
     "providerAgeUrl": "https://www.rockstaracademy.com/lib/upload/files/club/PJ_Schedule_Winter_20261.pdf",
     "sourceCheckedAt": "2026-11-03",
     "level": "branch",
     "verification": "provider-confirmed"
    },
    "term": "19 Oct 2026 until 17 Jan 2027",
    "note": "year-boundary inclusivity ambiguous"
   },
   {
    "name": "Move & Groove",
    "offering": "offered",
    "age": {
     "minMonths": 36,
     "maxMonths": 60,
     "providerAgeUrl": "https://www.rockstaracademy.com/lib/upload/files/club/PJ_Schedule_Winter_20261.pdf",
     "sourceCheckedAt": "2026-11-03",
     "level": "branch",
     "verification": "provider-confirmed"
    },
    "term": "19 Oct 2026 until 17 Jan 2027",
    "note": "overlaps under-4; boundary ambiguous"
   },
   {
    "name": "Pre-Ballet 3-5",
    "offering": "offered",
    "age": {
     "minMonths": 36,
     "maxMonths": 60,
     "providerAgeUrl": "https://www.rockstaracademy.com/lib/upload/files/club/PJ_Schedule_Winter_20261.pdf",
     "sourceCheckedAt": "2026-11-03",
     "level": "branch",
     "verification": "provider-confirmed"
    },
    "term": "19 Oct 2026 until 17 Jan 2027",
    "note": "overlaps under-4; boundary ambiguous"
   },
   {
    "name": "Sports U3",
    "offering": "offered",
    "age": {
     "minMonths": 24,
     "maxMonths": 36,
     "providerAgeUrl": "https://www.rockstaracademy.com/lib/upload/files/club/PJ_Schedule_Winter_20261.pdf",
     "sourceCheckedAt": "2026-11-03",
     "level": "branch",
     "verification": "provider-confirmed"
    },
    "term": "19 Oct 2026 until 17 Jan 2027",
    "noteUrl": "https://www.rockstaracademy.com/schedules-and-locations/pesona-square",
    "noteLabel": "Age key",
    "note": "PDF cell label is 'Sports U3' with no numeric age; numeric age mapped via official Rockstar web schedule tables ('Sports U3 2 - 3 Years')"
   },
   {
    "name": "Tots Gym U4",
    "offering": "offered",
    "age": {
     "minMonths": 36,
     "maxMonths": 48,
     "providerAgeUrl": "https://www.rockstaracademy.com/lib/upload/files/club/PJ_Schedule_Winter_20261.pdf",
     "sourceCheckedAt": "2026-11-03",
     "level": "branch",
     "verification": "provider-confirmed"
    },
    "term": "19 Oct 2026 until 17 Jan 2027",
    "noteUrl": "https://www.rockstaracademy.com/schedules-and-locations/pesona-square",
    "noteLabel": "Age key",
    "note": "PDF cell label is 'Tots Gym U4' with no numeric age; numeric age mapped via official Rockstar web schedule tables ('Tots Gym U4 3 - 4 Years')"
   }
  ],
  "website": "https://www.rockstaracademy.com/schedules-and-locations",
  "sourceUrl": "https://www.rockstaracademy.com/schedules-and-locations",
  "lastCheckedAt": "2026-11-03",
  "fitStatus": "branch-confirmed-dated-term",
  "notes": "Chain states programs from 6 months to 18 years; under-4 programs seen: Mom & Me Beginner 6-35 months, Baby Dance 1-3 yrs (club schedule PDF). Programs vary per branch.",
  "reviews": {
   "rating": 5.0,
   "reviewCount": 1,
   "source": "Google Maps",
   "checkedAt": "2026-11-03",
   "praiseThemes": [],
   "complaintThemes": [],
   "sourceUrl": "https://www.google.com/maps/search/?api=1&query=RockStar+Academy+-+The+Park+Pejaten&query_place_id=ChIJA6lpMQjzaS4RTB6SBk1n0Kk"
  },
  "operatingStatus": {
   "state": "official-listed",
   "source": "https://www.rockstaracademy.com/schedules-and-locations",
   "checkedAt": "2026-11-04"
  },
  "phone": "+62 21 39707040"
 },
 {
  "id": "sparks-sports-academy-bsd-tangerang",
  "chain": "Sparks Sports Academy",
  "branchName": "BSD Tangerang",
  "categories": [
   "Gym & Movement",
   "Sensory"
  ],
  "address": "Ruko Pasar Modern Timur, Jl. Letnan Sutopo No.10A No.7A, Rw. Mekar Jaya, Kec. Serpong, Kota Tangerang Selatan, Banten 15310, Indonesia",
  "area": "Tangerang Selatan",
  "city": "Tangerang Selatan",
  "lat": -6.305966,
  "lng": 106.686005,
  "coordinateSource": "maps-pin",
  "programs": [
   {
    "name": "Baby Sensory (Sensory & Phonics)",
    "offering": "offered",
    "age": {
     "minMonths": 6,
     "maxMonths": 35,
     "providerAgeUrl": "https://academy.sparks-edu.com/kelas-sensori-bayi/tangerang/",
     "sourceCheckedAt": "2026-11-03",
     "level": "brand",
     "verification": "provider-confirmed"
    },
    "note": "DO NOT exact-age-match: branch evidence confirms only the class CATEGORY. Sub-levels (Crawler 6-11mo 'Limited Locations', Baby 12-23mo, Tiny 24-35mo) not published per branch."
   },
   {
    "name": "Gymnastics",
    "offering": "unknown",
    "age": {
     "minMonths": 12,
     "maxMonths": 84,
     "providerAgeUrl": "https://academy.sparks-edu.com/tangerang/",
     "sourceCheckedAt": "2026-11-03",
     "level": "brand",
     "verification": "listed-unconfirmed"
    },
    "note": "12 Bulan - 7 Tahun"
   },
   {
    "name": "Multi Sports",
    "offering": "unknown",
    "age": {
     "minMonths": 24,
     "maxMonths": 48,
     "providerAgeUrl": "https://academy.sparks-edu.com/tangerang/",
     "sourceCheckedAt": "2026-11-03",
     "level": "brand",
     "verification": "listed-unconfirmed"
    },
    "note": "upper-bound inclusivity at 48 months ambiguous"
   },
   {
    "name": "Dance",
    "offering": "unknown",
    "age": {
     "minMonths": 12,
     "maxMonths": 84,
     "providerAgeUrl": "https://academy.sparks-edu.com/tangerang/",
     "sourceCheckedAt": "2026-11-03",
     "level": "brand",
     "verification": "listed-unconfirmed"
    },
    "note": "12 Bulan - 7 Tahun"
   }
  ],
  "website": "https://academy.sparks-edu.com/tangerang/",
  "sourceUrl": "https://academy.sparks-edu.com/tangerang/",
  "lastCheckedAt": "2026-11-03",
  "fitStatus": "branch-category-confirmed-live-undated",
  "notes": "Official city page: 'Kelas olahraga & sensori untuk anak usia 6 bulan-7 tahun'. Booking routes: WhatsApp +62 813-9000-6606 (all schedule CTAs) and a Loket organizer page https://loket.com/o/lkt-dWhw (no current events listed). No per-branch time schedule published online (checked 2026-11-03).",
  "reviews": {
   "rating": 4.5,
   "reviewCount": 74,
   "source": "Google Maps",
   "checkedAt": "2026-11-03",
   "praiseThemes": [],
   "complaintThemes": [],
   "sourceUrl": "https://www.google.com/maps/search/?api=1&query=Sparks+Sports+Academy+-+BSD+Tangerang&query_place_id=ChIJ77CVPDLlaS4RmfTNGw_f1Mo"
  },
  "operatingStatus": {
   "state": "official-listed",
   "source": "https://academy.sparks-edu.com/tangerang/",
   "checkedAt": "2026-11-04"
  }
 },
 {
  "id": "sparks-sports-academy-bintaro-utown",
  "chain": "Sparks Sports Academy",
  "branchName": "Bintaro Utown",
  "categories": [
   "Gym & Movement",
   "Sensory"
  ],
  "address": "PP4G+MF5, Sawah Lama, Ciputat, South Tangerang City, Banten 15413",
  "area": "Tangerang Selatan",
  "city": "Tangerang Selatan",
  "lat": -6.293312,
  "lng": 106.726187,
  "coordinateSource": "maps-pin",
  "programs": [
   {
    "name": "Gymnastics",
    "offering": "unknown",
    "age": {
     "minMonths": 12,
     "maxMonths": 84,
     "providerAgeUrl": "https://academy.sparks-edu.com/tangerang/",
     "sourceCheckedAt": "2026-11-03",
     "level": "brand",
     "verification": "listed-unconfirmed"
    },
    "note": "12 Bulan - 7 Tahun"
   },
   {
    "name": "Multi Sports",
    "offering": "unknown",
    "age": {
     "minMonths": 24,
     "maxMonths": 48,
     "providerAgeUrl": "https://academy.sparks-edu.com/tangerang/",
     "sourceCheckedAt": "2026-11-03",
     "level": "brand",
     "verification": "listed-unconfirmed"
    },
    "note": "upper-bound inclusivity at 48 months ambiguous"
   },
   {
    "name": "Dance",
    "offering": "unknown",
    "age": {
     "minMonths": 12,
     "maxMonths": 84,
     "providerAgeUrl": "https://academy.sparks-edu.com/tangerang/",
     "sourceCheckedAt": "2026-11-03",
     "level": "brand",
     "verification": "listed-unconfirmed"
    },
    "note": "12 Bulan - 7 Tahun"
   },
   {
    "name": "Sensory Crawler",
    "category": "Sensory",
    "offering": "offered",
    "age": {
     "minMonths": 6,
     "maxMonths": 11,
     "level": "branch",
     "verification": "provider-confirmed",
     "providerAgeUrl": "https://www.instagram.com/sparks_sportsacademy/p/DbMzKUxDARb/",
     "sourceCheckedAt": "2026-11-07"
    },
    "note": "Provider announcement dated 24 Jul 2026. Slide 1 gives the exact month band; slide 2 and caption name this branch. Dated class evidence, not a current timetable. Confirm current class and session availability before visiting."
   }
  ],
  "website": "https://academy.sparks-edu.com/tangerang/",
  "sourceUrl": "https://academy.sparks-edu.com/tangerang/",
  "lastCheckedAt": "2026-11-03",
  "fitStatus": "official-chain-program",
  "notes": "Official city page: 'Kelas olahraga & sensori untuk anak usia 6 bulan-7 tahun'. Booking routes: WhatsApp +62 813-9000-6606 (all schedule CTAs) and a Loket organizer page https://loket.com/o/lkt-dWhw (no current events listed). No per-branch time schedule published online (checked 2026-11-03). | Unresolved: NOT listed on official city baby-sensory page (checked rendered page 2026-11-03) - sensory availability UNKNOWN, not disproven; city page claims classes 6mo-7y across city locations",
  "reviews": {
   "rating": 4.9,
   "reviewCount": 8,
   "source": "Google Maps",
   "checkedAt": "2026-11-03",
   "praiseThemes": [
    "positive trial-class experience; facilities and staff service praised"
   ],
   "complaintThemes": [],
   "sampleNote": "Small sample: 3 of 8 reviews visible, checked 2026-11-03. 8 ratings are too few to judge.",
   "sourceUrl": "https://www.google.com/maps/place/Sparks+Sports+Academy+-+Bintaro+Utown/@-6.2933125,106.7261875,17z/data=!3m1!4b1!4m6!3m5!1s0x2e69f1b313275491:0x375c61f1e2528173!8m2!3d-6.2933125!4d106.7261875!16s%2Fg"
  },
  "operatingStatus": {
   "state": "official-listed",
   "source": "https://academy.sparks-edu.com/tangerang/",
   "checkedAt": "2026-11-04"
  }
 },
 {
  "id": "sparks-sports-academy-cibinong",
  "chain": "Sparks Sports Academy",
  "branchName": "Cibinong",
  "categories": [
   "Gym & Movement",
   "Sensory"
  ],
  "address": "Jl. Tegar Beriman (GR9H+956), Tengah, Cibinong, Kabupaten Bogor 16914",
  "area": "Bogor",
  "city": "Bogor",
  "lat": -6.481596,
  "lng": 106.827931,
  "coordinateSource": "area-approximate",
  "programs": [
   {
    "name": "Gymnastics",
    "offering": "unknown",
    "age": {
     "minMonths": 12,
     "maxMonths": 84,
     "providerAgeUrl": "https://academy.sparks-edu.com/bogor/",
     "sourceCheckedAt": "2026-11-03",
     "level": "brand",
     "verification": "listed-unconfirmed"
    },
    "note": "12 Bulan - 7 Tahun"
   },
   {
    "name": "Multi Sports",
    "offering": "unknown",
    "age": {
     "minMonths": 24,
     "maxMonths": 48,
     "providerAgeUrl": "https://academy.sparks-edu.com/bogor/",
     "sourceCheckedAt": "2026-11-03",
     "level": "brand",
     "verification": "listed-unconfirmed"
    },
    "note": "upper-bound inclusivity at 48 months ambiguous"
   },
   {
    "name": "Dance",
    "offering": "unknown",
    "age": {
     "minMonths": 12,
     "maxMonths": 84,
     "providerAgeUrl": "https://academy.sparks-edu.com/bogor/",
     "sourceCheckedAt": "2026-11-03",
     "level": "brand",
     "verification": "listed-unconfirmed"
    },
    "note": "12 Bulan - 7 Tahun"
   }
  ],
  "website": "https://academy.sparks-edu.com/bogor/",
  "sourceUrl": "https://academy.sparks-edu.com/bogor/",
  "lastCheckedAt": "2026-11-03",
  "fitStatus": "official-chain-program",
  "notes": "Official city page: 'Kelas olahraga & sensori untuk anak usia 6 bulan-7 tahun'. Booking routes: WhatsApp +62 813-9000-6606 (all schedule CTAs) and a Loket organizer page https://loket.com/o/lkt-dWhw (no current events listed). No per-branch time schedule published online (checked 2026-11-03). | Unresolved: NOT listed on official city baby-sensory page (checked rendered page 2026-11-03) - sensory availability UNKNOWN, not disproven; city page claims classes 6mo-7y across city locations",
  "reviews": {
   "rating": 5.0,
   "reviewCount": 113,
   "source": "Google Maps",
   "checkedAt": "2026-11-03",
   "praiseThemes": [],
   "complaintThemes": [],
   "sourceUrl": "https://www.google.com/maps/place/Sparks+Sports+Academy+-+Cibinong/@-6.4815961,106.8279311,17z/data=!3m1!4b1!4m6!3m5!1s0x2e69c1f56e65b84d:0x369657ec803bdba3!8m2!3d-6.4815961!4d106.8279311!16s%2Fg%2F11"
  },
  "operatingStatus": {
   "state": "official-listed",
   "source": "https://academy.sparks-edu.com/bogor/",
   "checkedAt": "2026-11-04"
  }
 },
 {
  "id": "sparks-sports-academy-cibubur",
  "chain": "Sparks Sports Academy",
  "branchName": "Cibubur",
  "categories": [
   "Gym & Movement",
   "Sensory"
  ],
  "address": "Jl. Raya Kota Wisata Cluster Virginia No.L6/5, Ciangsana, Gunung Putri, Kabupaten Bogor 16968",
  "area": "Bogor",
  "city": "Bogor",
  "lat": -6.365337,
  "lng": 106.961847,
  "coordinateSource": "area-approximate",
  "programs": [
   {
    "name": "Gymnastics",
    "offering": "unknown",
    "age": {
     "minMonths": 12,
     "maxMonths": 84,
     "providerAgeUrl": "https://academy.sparks-edu.com/bogor/",
     "sourceCheckedAt": "2026-11-03",
     "level": "brand",
     "verification": "listed-unconfirmed"
    },
    "note": "12 Bulan - 7 Tahun"
   },
   {
    "name": "Multi Sports",
    "offering": "unknown",
    "age": {
     "minMonths": 24,
     "maxMonths": 48,
     "providerAgeUrl": "https://academy.sparks-edu.com/bogor/",
     "sourceCheckedAt": "2026-11-03",
     "level": "brand",
     "verification": "listed-unconfirmed"
    },
    "note": "upper-bound inclusivity at 48 months ambiguous"
   },
   {
    "name": "Dance",
    "offering": "unknown",
    "age": {
     "minMonths": 12,
     "maxMonths": 84,
     "providerAgeUrl": "https://academy.sparks-edu.com/bogor/",
     "sourceCheckedAt": "2026-11-03",
     "level": "brand",
     "verification": "listed-unconfirmed"
    },
    "note": "12 Bulan - 7 Tahun"
   }
  ],
  "website": "https://academy.sparks-edu.com/bogor/",
  "sourceUrl": "https://academy.sparks-edu.com/bogor/",
  "lastCheckedAt": "2026-11-03",
  "fitStatus": "official-chain-program",
  "notes": "Official city page: 'Kelas olahraga & sensori untuk anak usia 6 bulan-7 tahun'. Booking routes: WhatsApp +62 813-9000-6606 (all schedule CTAs) and a Loket organizer page https://loket.com/o/lkt-dWhw (no current events listed). No per-branch time schedule published online (checked 2026-11-03). | Unresolved: NOT listed on official city baby-sensory page (checked rendered page 2026-11-03) - sensory availability UNKNOWN, not disproven; city page claims classes 6mo-7y across city locations",
  "operatingStatus": {
   "state": "official-listed",
   "source": "https://academy.sparks-edu.com/bogor/",
   "checkedAt": "2026-11-04"
  }
 },
 {
  "id": "sparks-sports-academy-harapan-indah-bekasi",
  "chain": "Sparks Sports Academy",
  "branchName": "Harapan Indah Bekasi",
  "categories": [
   "Gym & Movement",
   "Sensory"
  ],
  "address": "Mega Office Park, No.9 Blok OP 3, Jl. Harapan Indah Boulevard, Medan Satria, Kecamatan Medan Satria, Kota Bks, Jawa Barat 17132, Indonesia",
  "area": "Jabodetabek (unclassified)",
  "city": "Jabodetabek (unclassified)",
  "lat": -6.179935,
  "lng": 106.97419,
  "coordinateSource": "maps-pin",
  "programs": [
   {
    "name": "Baby Sensory (Sensory & Phonics)",
    "offering": "offered",
    "age": {
     "minMonths": 6,
     "maxMonths": 35,
     "providerAgeUrl": "https://academy.sparks-edu.com/kelas-sensori-bayi/bekasi/",
     "sourceCheckedAt": "2026-11-03",
     "level": "brand",
     "verification": "provider-confirmed"
    },
    "note": "DO NOT exact-age-match: branch evidence confirms only the class CATEGORY. Sub-levels (Crawler 6-11mo 'Limited Locations', Baby 12-23mo, Tiny 24-35mo) not published per branch."
   },
   {
    "name": "Gymnastics",
    "offering": "unknown",
    "age": {
     "minMonths": 12,
     "maxMonths": 84,
     "providerAgeUrl": "https://academy.sparks-edu.com/bekasi/",
     "sourceCheckedAt": "2026-11-03",
     "level": "brand",
     "verification": "listed-unconfirmed"
    },
    "note": "12 Bulan - 7 Tahun"
   },
   {
    "name": "Multi Sports",
    "offering": "unknown",
    "age": {
     "minMonths": 24,
     "maxMonths": 48,
     "providerAgeUrl": "https://academy.sparks-edu.com/bekasi/",
     "sourceCheckedAt": "2026-11-03",
     "level": "brand",
     "verification": "listed-unconfirmed"
    },
    "note": "upper-bound inclusivity at 48 months ambiguous"
   },
   {
    "name": "Dance",
    "offering": "unknown",
    "age": {
     "minMonths": 12,
     "maxMonths": 84,
     "providerAgeUrl": "https://academy.sparks-edu.com/bekasi/",
     "sourceCheckedAt": "2026-11-03",
     "level": "brand",
     "verification": "listed-unconfirmed"
    },
    "note": "12 Bulan - 7 Tahun"
   },
   {
    "name": "Sensory Crawler",
    "category": "Sensory",
    "offering": "offered",
    "age": {
     "minMonths": 6,
     "maxMonths": 11,
     "level": "branch",
     "verification": "provider-confirmed",
     "providerAgeUrl": "https://www.instagram.com/sparks_sportsacademy/p/DbMzKUxDARb/",
     "sourceCheckedAt": "2026-11-07"
    },
    "note": "Provider announcement dated 24 Jul 2026. Slide 1 gives the exact month band; slide 2 and caption name this branch. Dated class evidence, not a current timetable. Confirm current class and session availability before visiting."
   }
  ],
  "website": "https://academy.sparks-edu.com/bekasi/",
  "sourceUrl": "https://academy.sparks-edu.com/bekasi/",
  "lastCheckedAt": "2026-11-03",
  "fitStatus": "branch-category-confirmed-live-undated",
  "notes": "Official city page: 'Kelas olahraga & sensori untuk anak usia 6 bulan-7 tahun'. Booking routes: WhatsApp +62 813-9000-6606 (all schedule CTAs) and a Loket organizer page https://loket.com/o/lkt-dWhw (no current events listed). No per-branch time schedule published online (checked 2026-11-03).",
  "reviews": {
   "rating": 4.4,
   "reviewCount": 151,
   "source": "Google Maps",
   "checkedAt": "2026-11-03",
   "praiseThemes": [],
   "complaintThemes": [],
   "sourceUrl": "https://www.google.com/maps/search/?api=1&query=Sparks+Sports+Academy+-+Harapan+Indah+Bekasi&query_place_id=ChIJI-AlvaGLaS4RipyrwRi-q6o"
  },
  "operatingStatus": {
   "state": "official-listed",
   "source": "https://academy.sparks-edu.com/bekasi/",
   "checkedAt": "2026-11-04"
  }
 },
 {
  "id": "sparks-sports-academy-kalimalang",
  "chain": "Sparks Sports Academy",
  "branchName": "Kalimalang",
  "categories": [
   "Gym & Movement",
   "Sensory"
  ],
  "address": "Jl. Pahlawan Revolusi No.11, RT.3/RW.4, Pd. Bambu, Kec. Duren Sawit, Kota Jakarta Timur, Daerah Khusus Ibukota Jakarta 13430, Indonesia",
  "area": "Jakarta Timur",
  "city": "Jakarta Timur",
  "lat": -6.239405,
  "lng": 106.899812,
  "coordinateSource": "maps-pin",
  "programs": [
   {
    "name": "Baby Sensory (Sensory & Phonics)",
    "offering": "offered",
    "age": {
     "minMonths": 6,
     "maxMonths": 35,
     "providerAgeUrl": "https://academy.sparks-edu.com/kelas-sensori-bayi/jakarta/",
     "sourceCheckedAt": "2026-11-03",
     "level": "brand",
     "verification": "provider-confirmed"
    },
    "note": "DO NOT exact-age-match: branch evidence confirms only the class CATEGORY. Sub-levels (Crawler 6-11mo 'Limited Locations', Baby 12-23mo, Tiny 24-35mo) not published per branch."
   },
   {
    "name": "Gymnastics",
    "offering": "unknown",
    "age": {
     "minMonths": 12,
     "maxMonths": 84,
     "providerAgeUrl": "https://academy.sparks-edu.com/jakarta/",
     "sourceCheckedAt": "2026-11-03",
     "level": "brand",
     "verification": "listed-unconfirmed"
    },
    "note": "12 Bulan - 7 Tahun"
   },
   {
    "name": "Multi Sports",
    "offering": "unknown",
    "age": {
     "minMonths": 24,
     "maxMonths": 48,
     "providerAgeUrl": "https://academy.sparks-edu.com/jakarta/",
     "sourceCheckedAt": "2026-11-03",
     "level": "brand",
     "verification": "listed-unconfirmed"
    },
    "note": "upper-bound inclusivity at 48 months ambiguous"
   },
   {
    "name": "Dance",
    "offering": "unknown",
    "age": {
     "minMonths": 12,
     "maxMonths": 84,
     "providerAgeUrl": "https://academy.sparks-edu.com/jakarta/",
     "sourceCheckedAt": "2026-11-03",
     "level": "brand",
     "verification": "listed-unconfirmed"
    },
    "note": "12 Bulan - 7 Tahun"
   }
  ],
  "website": "https://academy.sparks-edu.com/jakarta/",
  "sourceUrl": "https://academy.sparks-edu.com/jakarta/",
  "lastCheckedAt": "2026-11-03",
  "fitStatus": "branch-category-confirmed-live-undated",
  "notes": "Official city page: 'Kelas olahraga & sensori untuk anak usia 6 bulan-7 tahun'. Booking routes: WhatsApp +62 813-9000-6606 (all schedule CTAs) and a Loket organizer page https://loket.com/o/lkt-dWhw (no current events listed). No per-branch time schedule published online (checked 2026-11-03).",
  "reviews": {
   "rating": 4.4,
   "reviewCount": 137,
   "source": "Google Maps",
   "checkedAt": "2026-11-03",
   "praiseThemes": [],
   "complaintThemes": [],
   "sourceUrl": "https://www.google.com/maps/search/?api=1&query=Sparks+Sports+Academy+-+Kalimalang&query_place_id=ChIJcySIfDDzaS4R_phVJfWHiAA"
  },
  "operatingStatus": {
   "state": "official-listed",
   "source": "https://academy.sparks-edu.com/jakarta/",
   "checkedAt": "2026-11-04"
  }
 },
 {
  "id": "sparks-sports-academy-karawaci",
  "chain": "Sparks Sports Academy",
  "branchName": "Karawaci",
  "categories": [
   "Gym & Movement",
   "Sensory"
  ],
  "address": "Foodmosphere, Jl. Palem Semi Blok C1 No.18, RT.003/RW.004, Panunggangan Bar., Kec. Cibodas, Kota Tangerang, Banten 15318, Indonesia",
  "area": "Kota Tangerang",
  "city": "Kota Tangerang",
  "lat": -6.219704,
  "lng": 106.616058,
  "coordinateSource": "maps-pin",
  "programs": [
   {
    "name": "Baby Sensory (Sensory & Phonics)",
    "offering": "offered",
    "age": {
     "minMonths": 6,
     "maxMonths": 35,
     "providerAgeUrl": "https://academy.sparks-edu.com/kelas-sensori-bayi/tangerang/",
     "sourceCheckedAt": "2026-11-03",
     "level": "brand",
     "verification": "provider-confirmed"
    },
    "note": "DO NOT exact-age-match: branch evidence confirms only the class CATEGORY. Sub-levels (Crawler 6-11mo 'Limited Locations', Baby 12-23mo, Tiny 24-35mo) not published per branch."
   },
   {
    "name": "Gymnastics",
    "offering": "unknown",
    "age": {
     "minMonths": 12,
     "maxMonths": 84,
     "providerAgeUrl": "https://academy.sparks-edu.com/tangerang/",
     "sourceCheckedAt": "2026-11-03",
     "level": "brand",
     "verification": "listed-unconfirmed"
    },
    "note": "12 Bulan - 7 Tahun"
   },
   {
    "name": "Multi Sports",
    "offering": "unknown",
    "age": {
     "minMonths": 24,
     "maxMonths": 48,
     "providerAgeUrl": "https://academy.sparks-edu.com/tangerang/",
     "sourceCheckedAt": "2026-11-03",
     "level": "brand",
     "verification": "listed-unconfirmed"
    },
    "note": "upper-bound inclusivity at 48 months ambiguous"
   },
   {
    "name": "Dance",
    "offering": "unknown",
    "age": {
     "minMonths": 12,
     "maxMonths": 84,
     "providerAgeUrl": "https://academy.sparks-edu.com/tangerang/",
     "sourceCheckedAt": "2026-11-03",
     "level": "brand",
     "verification": "listed-unconfirmed"
    },
    "note": "12 Bulan - 7 Tahun"
   }
  ],
  "website": "https://academy.sparks-edu.com/tangerang/",
  "sourceUrl": "https://academy.sparks-edu.com/tangerang/",
  "lastCheckedAt": "2026-11-03",
  "fitStatus": "branch-category-confirmed-live-undated",
  "notes": "Official city page: 'Kelas olahraga & sensori untuk anak usia 6 bulan-7 tahun'. Booking routes: WhatsApp +62 813-9000-6606 (all schedule CTAs) and a Loket organizer page https://loket.com/o/lkt-dWhw (no current events listed). No per-branch time schedule published online (checked 2026-11-03).",
  "reviews": {
   "rating": 4.7,
   "reviewCount": 72,
   "source": "Google Maps",
   "checkedAt": "2026-11-03",
   "praiseThemes": [],
   "complaintThemes": [],
   "sourceUrl": "https://www.google.com/maps/search/?api=1&query=Sparks+Sports+Academy+-+Karawaci&query_place_id=ChIJu2XkBiP_aS4R4gNH1iRtikU"
  },
  "operatingStatus": {
   "state": "official-listed",
   "source": "https://academy.sparks-edu.com/tangerang/",
   "checkedAt": "2026-11-04"
  }
 },
 {
  "id": "sparks-sports-academy-kelapa-gading-2",
  "chain": "Sparks Sports Academy",
  "branchName": "Kelapa Gading 2",
  "categories": [
   "Gym & Movement",
   "Sensory"
  ],
  "address": "Jl. Boulevard Raya No.2 Blk CN, RW.12, Klp. Gading Tim., Kec. Klp. Gading, Jkt Utara, Daerah Khusus Ibukota Jakarta 14240, Indonesia",
  "area": "Jakarta Utara",
  "city": "Jakarta Utara",
  "lat": -6.167044,
  "lng": 106.9016,
  "coordinateSource": "maps-pin",
  "programs": [
   {
    "name": "Baby Sensory (Sensory & Phonics)",
    "offering": "unknown",
    "age": {
     "minMonths": null,
     "maxMonths": null,
     "providerAgeUrl": "https://academy.sparks-edu.com/kelas-sensori-bayi/jakarta/",
     "sourceCheckedAt": "2026-11-03",
     "level": "brand",
     "verification": "unknown"
    },
    "note": "DO NOT exact-age-match: branch evidence confirms only the class CATEGORY. Sub-levels (Crawler 6-11mo 'Limited Locations', Baby 12-23mo, Tiny 24-35mo) not published per branch."
   },
   {
    "name": "Gymnastics",
    "offering": "unknown",
    "age": {
     "minMonths": 12,
     "maxMonths": 84,
     "providerAgeUrl": "https://academy.sparks-edu.com/jakarta/",
     "sourceCheckedAt": "2026-11-03",
     "level": "brand",
     "verification": "listed-unconfirmed"
    },
    "note": "12 Bulan - 7 Tahun"
   },
   {
    "name": "Multi Sports",
    "offering": "unknown",
    "age": {
     "minMonths": 24,
     "maxMonths": 48,
     "providerAgeUrl": "https://academy.sparks-edu.com/jakarta/",
     "sourceCheckedAt": "2026-11-03",
     "level": "brand",
     "verification": "listed-unconfirmed"
    },
    "note": "upper-bound inclusivity at 48 months ambiguous"
   },
   {
    "name": "Dance",
    "offering": "unknown",
    "age": {
     "minMonths": 12,
     "maxMonths": 84,
     "providerAgeUrl": "https://academy.sparks-edu.com/jakarta/",
     "sourceCheckedAt": "2026-11-03",
     "level": "brand",
     "verification": "listed-unconfirmed"
    },
    "note": "12 Bulan - 7 Tahun"
   }
  ],
  "website": "https://academy.sparks-edu.com/jakarta/",
  "sourceUrl": "https://academy.sparks-edu.com/jakarta/",
  "lastCheckedAt": "2026-11-03",
  "fitStatus": "branch-candidate-live-undated",
  "notes": "Official city page: 'Kelas olahraga & sensori untuk anak usia 6 bulan-7 tahun'. Booking routes: WhatsApp +62 813-9000-6606 (all schedule CTAs) and a Loket organizer page https://loket.com/o/lkt-dWhw (no current events listed). No per-branch time schedule published online (checked 2026-11-03). | Unresolved: listed in sensory-page address block but not among trial buttons; sub-level availability unknown",
  "reviews": {
   "rating": 4.8,
   "reviewCount": 45,
   "source": "Google Maps",
   "checkedAt": "2026-11-03",
   "praiseThemes": [],
   "complaintThemes": [],
   "sourceUrl": "https://www.google.com/maps/search/?api=1&query=Sparks+Sports+Academy+-+Kelapa+Gading+2&query_place_id=ChIJ-6zgLz71aS4RBdcYBRbWsAw"
  },
  "operatingStatus": {
   "state": "official-listed",
   "source": "https://academy.sparks-edu.com/jakarta/",
   "checkedAt": "2026-11-04"
  }
 },
 {
  "id": "sparks-sports-academy-kelapa-gading-jakarta",
  "chain": "Sparks Sports Academy",
  "branchName": "Kelapa Gading Jakarta",
  "categories": [
   "Gym & Movement",
   "Sensory"
  ],
  "address": "Jl. Boulevard Timur, RT.1/RW.12, Pegangsaan Dua, Kec. Klp. Gading, Jkt Utara, Daerah Khusus Ibukota Jakarta 14250, Indonesia",
  "area": "Jakarta Utara",
  "city": "Jakarta Utara",
  "lat": -6.1625,
  "lng": 106.909167,
  "coordinateSource": "maps-pin",
  "programs": [
   {
    "name": "Baby Sensory (Sensory & Phonics)",
    "offering": "offered",
    "age": {
     "minMonths": 6,
     "maxMonths": 35,
     "providerAgeUrl": "https://academy.sparks-edu.com/kelas-sensori-bayi/jakarta/",
     "sourceCheckedAt": "2026-11-03",
     "level": "brand",
     "verification": "provider-confirmed"
    },
    "note": "DO NOT exact-age-match: branch evidence confirms only the class CATEGORY. Sub-levels (Crawler 6-11mo 'Limited Locations', Baby 12-23mo, Tiny 24-35mo) not published per branch."
   },
   {
    "name": "Gymnastics",
    "offering": "unknown",
    "age": {
     "minMonths": 12,
     "maxMonths": 84,
     "providerAgeUrl": "https://academy.sparks-edu.com/jakarta/",
     "sourceCheckedAt": "2026-11-03",
     "level": "brand",
     "verification": "listed-unconfirmed"
    },
    "note": "12 Bulan - 7 Tahun"
   },
   {
    "name": "Multi Sports",
    "offering": "unknown",
    "age": {
     "minMonths": 24,
     "maxMonths": 48,
     "providerAgeUrl": "https://academy.sparks-edu.com/jakarta/",
     "sourceCheckedAt": "2026-11-03",
     "level": "brand",
     "verification": "listed-unconfirmed"
    },
    "note": "upper-bound inclusivity at 48 months ambiguous"
   },
   {
    "name": "Dance",
    "offering": "unknown",
    "age": {
     "minMonths": 12,
     "maxMonths": 84,
     "providerAgeUrl": "https://academy.sparks-edu.com/jakarta/",
     "sourceCheckedAt": "2026-11-03",
     "level": "brand",
     "verification": "listed-unconfirmed"
    },
    "note": "12 Bulan - 7 Tahun"
   }
  ],
  "website": "https://academy.sparks-edu.com/jakarta/",
  "sourceUrl": "https://academy.sparks-edu.com/jakarta/",
  "lastCheckedAt": "2026-11-03",
  "fitStatus": "branch-category-confirmed-live-undated",
  "notes": "Official city page: 'Kelas olahraga & sensori untuk anak usia 6 bulan-7 tahun'. Booking routes: WhatsApp +62 813-9000-6606 (all schedule CTAs) and a Loket organizer page https://loket.com/o/lkt-dWhw (no current events listed). No per-branch time schedule published online (checked 2026-11-03).",
  "reviews": {
   "rating": 4.6,
   "reviewCount": 72,
   "source": "Google Maps",
   "checkedAt": "2026-11-03",
   "praiseThemes": [],
   "complaintThemes": [],
   "sourceUrl": "https://www.google.com/maps/search/?api=1&query=Sparks+Sports+Academy+-+Kelapa+Gading+Jakarta&query_place_id=ChIJa7lqCST1aS4R3rl52wNy4mo"
  },
  "operatingStatus": {
   "state": "official-listed",
   "source": "https://academy.sparks-edu.com/jakarta/",
   "checkedAt": "2026-11-04"
  }
 },
 {
  "id": "sparks-sports-academy-kemang-ampera",
  "chain": "Sparks Sports Academy",
  "branchName": "Kemang Ampera",
  "categories": [
   "Gym & Movement",
   "Sensory"
  ],
  "address": "Jl. Ampera Raya No.12 8, RT.8/RW.2, Cilandak Tim., Ps. Minggu, Kota Jakarta Selatan, Daerah Khusus Ibukota Jakarta 12560, Indonesia",
  "area": "Jakarta Selatan",
  "city": "Jakarta Selatan",
  "lat": -6.285555,
  "lng": 106.818504,
  "coordinateSource": "maps-pin",
  "programs": [
   {
    "name": "Baby Sensory (Sensory & Phonics)",
    "offering": "offered",
    "age": {
     "minMonths": 6,
     "maxMonths": 35,
     "providerAgeUrl": "https://academy.sparks-edu.com/kelas-sensori-bayi/jakarta/",
     "sourceCheckedAt": "2026-11-03",
     "level": "brand",
     "verification": "provider-confirmed"
    },
    "note": "DO NOT exact-age-match: branch evidence confirms only the class CATEGORY. Sub-levels (Crawler 6-11mo 'Limited Locations', Baby 12-23mo, Tiny 24-35mo) not published per branch."
   },
   {
    "name": "Gymnastics",
    "offering": "unknown",
    "age": {
     "minMonths": 12,
     "maxMonths": 84,
     "providerAgeUrl": "https://academy.sparks-edu.com/jakarta/",
     "sourceCheckedAt": "2026-11-03",
     "level": "brand",
     "verification": "listed-unconfirmed"
    },
    "note": "12 Bulan - 7 Tahun"
   },
   {
    "name": "Multi Sports",
    "offering": "unknown",
    "age": {
     "minMonths": 24,
     "maxMonths": 48,
     "providerAgeUrl": "https://academy.sparks-edu.com/jakarta/",
     "sourceCheckedAt": "2026-11-03",
     "level": "brand",
     "verification": "listed-unconfirmed"
    },
    "note": "upper-bound inclusivity at 48 months ambiguous"
   },
   {
    "name": "Dance",
    "offering": "unknown",
    "age": {
     "minMonths": 12,
     "maxMonths": 84,
     "providerAgeUrl": "https://academy.sparks-edu.com/jakarta/",
     "sourceCheckedAt": "2026-11-03",
     "level": "brand",
     "verification": "listed-unconfirmed"
    },
    "note": "12 Bulan - 7 Tahun"
   },
   {
    "name": "Sensory Crawler",
    "category": "Sensory",
    "offering": "offered",
    "age": {
     "minMonths": 6,
     "maxMonths": 11,
     "level": "branch",
     "verification": "provider-confirmed",
     "providerAgeUrl": "https://www.instagram.com/sparks_sportsacademy/p/DbMzKUxDARb/",
     "sourceCheckedAt": "2026-11-07"
    },
    "note": "Provider announcement dated 24 Jul 2026. Slide 1 gives the exact month band; slide 2 and caption name this branch. Dated class evidence, not a current timetable. Confirm current class and session availability before visiting."
   }
  ],
  "website": "https://academy.sparks-edu.com/jakarta/",
  "sourceUrl": "https://academy.sparks-edu.com/jakarta/",
  "lastCheckedAt": "2026-11-03",
  "fitStatus": "branch-category-confirmed-live-undated",
  "notes": "Official city page: 'Kelas olahraga & sensori untuk anak usia 6 bulan-7 tahun'. Booking routes: WhatsApp +62 813-9000-6606 (all schedule CTAs) and a Loket organizer page https://loket.com/o/lkt-dWhw (no current events listed). No per-branch time schedule published online (checked 2026-11-03).",
  "reviews": {
   "rating": 5.0,
   "reviewCount": 4,
   "source": "Google Maps",
   "checkedAt": "2026-11-03",
   "praiseThemes": [],
   "complaintThemes": [],
   "sourceUrl": "https://www.google.com/maps/search/?api=1&query=Sparks+Sports+Academy+-+Kemang+Ampera&query_place_id=ChIJM7yHtwLzaS4RUwWy9DqFXR8"
  },
  "operatingStatus": {
   "state": "official-listed",
   "source": "https://academy.sparks-edu.com/jakarta/",
   "checkedAt": "2026-11-04"
  }
 },
 {
  "id": "sparks-sports-academy-kemang-pratama-bekasi",
  "chain": "Sparks Sports Academy",
  "branchName": "Kemang Pratama Bekasi",
  "categories": [
   "Gym & Movement",
   "Sensory"
  ],
  "address": "Kec, Jl. Kemang Pratama Raya No.B9, RT.001/RW.020, Bojong Rawalumbu, Kec. Rawalumbu, Kota Bks, Jawa Barat 17116, Indonesia",
  "area": "Jabodetabek (unclassified)",
  "city": "Jabodetabek (unclassified)",
  "lat": -6.27335,
  "lng": 106.987205,
  "coordinateSource": "maps-pin",
  "programs": [
   {
    "name": "Baby Sensory (Sensory & Phonics)",
    "offering": "offered",
    "age": {
     "minMonths": 6,
     "maxMonths": 35,
     "providerAgeUrl": "https://academy.sparks-edu.com/kelas-sensori-bayi/bekasi/",
     "sourceCheckedAt": "2026-11-03",
     "level": "brand",
     "verification": "provider-confirmed"
    },
    "note": "DO NOT exact-age-match: branch evidence confirms only the class CATEGORY. Sub-levels (Crawler 6-11mo 'Limited Locations', Baby 12-23mo, Tiny 24-35mo) not published per branch."
   },
   {
    "name": "Gymnastics",
    "offering": "unknown",
    "age": {
     "minMonths": 12,
     "maxMonths": 84,
     "providerAgeUrl": "https://academy.sparks-edu.com/bekasi/",
     "sourceCheckedAt": "2026-11-03",
     "level": "brand",
     "verification": "listed-unconfirmed"
    },
    "note": "12 Bulan - 7 Tahun"
   },
   {
    "name": "Multi Sports",
    "offering": "unknown",
    "age": {
     "minMonths": 24,
     "maxMonths": 48,
     "providerAgeUrl": "https://academy.sparks-edu.com/bekasi/",
     "sourceCheckedAt": "2026-11-03",
     "level": "brand",
     "verification": "listed-unconfirmed"
    },
    "note": "upper-bound inclusivity at 48 months ambiguous"
   },
   {
    "name": "Dance",
    "offering": "unknown",
    "age": {
     "minMonths": 12,
     "maxMonths": 84,
     "providerAgeUrl": "https://academy.sparks-edu.com/bekasi/",
     "sourceCheckedAt": "2026-11-03",
     "level": "brand",
     "verification": "listed-unconfirmed"
    },
    "note": "12 Bulan - 7 Tahun"
   }
  ],
  "website": "https://academy.sparks-edu.com/bekasi/",
  "sourceUrl": "https://academy.sparks-edu.com/bekasi/",
  "lastCheckedAt": "2026-11-03",
  "fitStatus": "branch-category-confirmed-live-undated",
  "notes": "Official city page: 'Kelas olahraga & sensori untuk anak usia 6 bulan-7 tahun'. Booking routes: WhatsApp +62 813-9000-6606 (all schedule CTAs) and a Loket organizer page https://loket.com/o/lkt-dWhw (no current events listed). No per-branch time schedule published online (checked 2026-11-03).",
  "reviews": {
   "rating": 4.4,
   "reviewCount": 112,
   "source": "Google Maps",
   "checkedAt": "2026-11-03",
   "praiseThemes": [],
   "complaintThemes": [],
   "sourceUrl": "https://www.google.com/maps/search/?api=1&query=Sparks+Sports+Academy+-+Kemang+Pratama+Bekasi&query_place_id=ChIJJacEMyGNaS4RINLkx5bw5NI"
  },
  "operatingStatus": {
   "state": "official-listed",
   "source": "https://academy.sparks-edu.com/bekasi/",
   "checkedAt": "2026-11-04"
  }
 },
 {
  "id": "sparks-sports-academy-mrg",
  "chain": "Sparks Sports Academy",
  "branchName": "Margonda Depok",
  "categories": [
   "Gym & Movement",
   "Sensory"
  ],
  "address": "Jl. Margonda No.283, RT.1/RW.2, Kemiri Muka, Kecamatan Beji, Kota Depok, Jawa Barat 16423, Indonesia",
  "area": "Depok",
  "city": "Depok",
  "lat": -6.378772,
  "lng": 106.831143,
  "coordinateSource": "maps-pin",
  "programs": [
   {
    "name": "Baby Sensory (Sensory & Phonics)",
    "offering": "unknown",
    "age": {
     "minMonths": null,
     "maxMonths": null,
     "providerAgeUrl": "https://academy.sparks-edu.com/kelas-sensori-bayi/depok/",
     "sourceCheckedAt": "2026-11-03",
     "level": "brand",
     "verification": "unknown"
    },
    "note": "DO NOT exact-age-match: branch evidence confirms only the class CATEGORY. Sub-levels (Crawler 6-11mo 'Limited Locations', Baby 12-23mo, Tiny 24-35mo) not published per branch."
   },
   {
    "name": "Gymnastics",
    "offering": "unknown",
    "age": {
     "minMonths": 12,
     "maxMonths": 84,
     "providerAgeUrl": "https://academy.sparks-edu.com/depok/",
     "sourceCheckedAt": "2026-11-03",
     "level": "brand",
     "verification": "listed-unconfirmed"
    },
    "note": "12 Bulan - 7 Tahun"
   },
   {
    "name": "Multi Sports",
    "offering": "unknown",
    "age": {
     "minMonths": 24,
     "maxMonths": 48,
     "providerAgeUrl": "https://academy.sparks-edu.com/depok/",
     "sourceCheckedAt": "2026-11-03",
     "level": "brand",
     "verification": "listed-unconfirmed"
    },
    "note": "upper-bound inclusivity at 48 months ambiguous"
   },
   {
    "name": "Dance",
    "offering": "unknown",
    "age": {
     "minMonths": 12,
     "maxMonths": 84,
     "providerAgeUrl": "https://academy.sparks-edu.com/depok/",
     "sourceCheckedAt": "2026-11-03",
     "level": "brand",
     "verification": "listed-unconfirmed"
    },
    "note": "12 Bulan - 7 Tahun"
   }
  ],
  "website": "https://academy.sparks-edu.com/depok/",
  "sourceUrl": "https://academy.sparks-edu.com/depok/",
  "lastCheckedAt": "2026-11-03",
  "fitStatus": "branch-candidate-live-undated",
  "notes": "Official city page: 'Kelas olahraga & sensori untuk anak usia 6 bulan-7 tahun'. Booking routes: WhatsApp +62 813-9000-6606 (all schedule CTAs) and a Loket organizer page https://loket.com/o/lkt-dWhw (no current events listed). No per-branch time schedule published online (checked 2026-11-03). | Unresolved: listed in sensory-page address block but not among trial buttons; sub-level availability unknown Official site lists this branch as \"Margonda Depok\" (formerly shown here as MRG).",
  "reviews": {
   "rating": 4.1,
   "reviewCount": 98,
   "source": "Google Maps",
   "checkedAt": "2026-11-03",
   "praiseThemes": [],
   "complaintThemes": [],
   "sourceUrl": "https://www.google.com/maps/search/?api=1&query=Sparks+Sports+Academy+-+MRG&query_place_id=ChIJT-6NXwDtaS4RUKk1vL2DFV4"
  },
  "operatingStatus": {
   "state": "official-listed",
   "source": "https://academy.sparks-edu.com/depok/",
   "checkedAt": "2026-11-04"
  }
 },
 {
  "id": "sparks-sports-academy-pajajaran-bogor",
  "chain": "Sparks Sports Academy",
  "branchName": "Pajajaran Bogor",
  "categories": [
   "Gym & Movement",
   "Sensory"
  ],
  "address": "Jl. Raya Pajajaran, RT.02/RW.04, Babakan, Kecamatan Bogor Tengah, Kota Bogor, Jawa Barat 16128, Indonesia",
  "area": "Bogor",
  "city": "Bogor",
  "lat": -6.590537,
  "lng": 106.804468,
  "coordinateSource": "maps-pin",
  "programs": [
   {
    "name": "Baby Sensory (Sensory & Phonics)",
    "offering": "unknown",
    "age": {
     "minMonths": null,
     "maxMonths": null,
     "providerAgeUrl": "https://academy.sparks-edu.com/kelas-sensori-bayi/bogor/",
     "sourceCheckedAt": "2026-11-03",
     "level": "brand",
     "verification": "unknown"
    },
    "note": "DO NOT exact-age-match: branch evidence confirms only the class CATEGORY. Sub-levels (Crawler 6-11mo 'Limited Locations', Baby 12-23mo, Tiny 24-35mo) not published per branch."
   },
   {
    "name": "Gymnastics",
    "offering": "unknown",
    "age": {
     "minMonths": 12,
     "maxMonths": 84,
     "providerAgeUrl": "https://academy.sparks-edu.com/bogor/",
     "sourceCheckedAt": "2026-11-03",
     "level": "brand",
     "verification": "listed-unconfirmed"
    },
    "note": "12 Bulan - 7 Tahun"
   },
   {
    "name": "Multi Sports",
    "offering": "unknown",
    "age": {
     "minMonths": 24,
     "maxMonths": 48,
     "providerAgeUrl": "https://academy.sparks-edu.com/bogor/",
     "sourceCheckedAt": "2026-11-03",
     "level": "brand",
     "verification": "listed-unconfirmed"
    },
    "note": "upper-bound inclusivity at 48 months ambiguous"
   },
   {
    "name": "Dance",
    "offering": "unknown",
    "age": {
     "minMonths": 12,
     "maxMonths": 84,
     "providerAgeUrl": "https://academy.sparks-edu.com/bogor/",
     "sourceCheckedAt": "2026-11-03",
     "level": "brand",
     "verification": "listed-unconfirmed"
    },
    "note": "12 Bulan - 7 Tahun"
   },
   {
    "name": "Sensory Crawler",
    "category": "Sensory",
    "offering": "offered",
    "age": {
     "minMonths": 6,
     "maxMonths": 11,
     "level": "branch",
     "verification": "provider-confirmed",
     "providerAgeUrl": "https://www.instagram.com/sparks_sportsacademy/p/DbMzKUxDARb/",
     "sourceCheckedAt": "2026-11-07"
    },
    "note": "Provider announcement dated 24 Jul 2026. Slide 1 gives the exact month band; slide 2 and caption name this branch. Dated class evidence, not a current timetable. Confirm current class and session availability before visiting."
   }
  ],
  "website": "https://academy.sparks-edu.com/bogor/",
  "sourceUrl": "https://academy.sparks-edu.com/bogor/",
  "lastCheckedAt": "2026-11-07",
  "fitStatus": "branch-candidate-live-undated",
  "notes": "Official city page: 'Kelas olahraga & sensori untuk anak usia 6 bulan-7 tahun'. Booking routes: WhatsApp +62 813-9000-6606 (all schedule CTAs) and a Loket organizer page https://loket.com/o/lkt-dWhw (no current events listed). No per-branch time schedule published online (checked 2026-11-03). | Sensory Crawler 6-11 months confirmed by dated official 24 July 2026 branch announcement; not a current timetable or seat guarantee. Street number omitted under owner address-discrepancy rule; Google Maps place ID and coordinates rechecked 2026-11-07, pin unchanged.",
  "reviews": {
   "rating": 4.5,
   "reviewCount": 138,
   "source": "Google Maps",
   "checkedAt": "2026-11-03",
   "praiseThemes": [],
   "complaintThemes": [],
   "sourceUrl": "https://www.google.com/maps/search/?api=1&query=Sparks+Sports+Academy+-+Pajajaran+Bogor&query_place_id=ChIJJRXv5zPFaS4RXxnF-MPcI80"
  },
  "operatingStatus": {
   "state": "official-listed",
   "source": "https://academy.sparks-edu.com/bogor/",
   "checkedAt": "2026-11-04"
  }
 },
 {
  "id": "sparks-sports-academy-pamulang",
  "chain": "Sparks Sports Academy",
  "branchName": "Pamulang",
  "categories": [
   "Gym & Movement",
   "Sensory"
  ],
  "address": "Jl. Raya Puspitek, RT.01/RW.03, Babakan, Kec. Setu, Kota Tangerang Selatan, Banten 15315, Indonesia",
  "area": "Tangerang Selatan",
  "city": "Tangerang Selatan",
  "lat": -6.346967,
  "lng": 106.696355,
  "coordinateSource": "maps-pin",
  "programs": [
   {
    "name": "Baby Sensory (Sensory & Phonics)",
    "offering": "unknown",
    "age": {
     "minMonths": null,
     "maxMonths": null,
     "providerAgeUrl": "https://academy.sparks-edu.com/kelas-sensori-bayi/tangerang/",
     "sourceCheckedAt": "2026-11-03",
     "level": "brand",
     "verification": "unknown"
    },
    "note": "DO NOT exact-age-match: branch evidence confirms only the class CATEGORY. Sub-levels (Crawler 6-11mo 'Limited Locations', Baby 12-23mo, Tiny 24-35mo) not published per branch."
   },
   {
    "name": "Gymnastics",
    "offering": "unknown",
    "age": {
     "minMonths": 12,
     "maxMonths": 84,
     "providerAgeUrl": "https://academy.sparks-edu.com/tangerang/",
     "sourceCheckedAt": "2026-11-03",
     "level": "brand",
     "verification": "listed-unconfirmed"
    },
    "note": "12 Bulan - 7 Tahun"
   },
   {
    "name": "Multi Sports",
    "offering": "unknown",
    "age": {
     "minMonths": 24,
     "maxMonths": 48,
     "providerAgeUrl": "https://academy.sparks-edu.com/tangerang/",
     "sourceCheckedAt": "2026-11-03",
     "level": "brand",
     "verification": "listed-unconfirmed"
    },
    "note": "upper-bound inclusivity at 48 months ambiguous"
   },
   {
    "name": "Dance",
    "offering": "unknown",
    "age": {
     "minMonths": 12,
     "maxMonths": 84,
     "providerAgeUrl": "https://academy.sparks-edu.com/tangerang/",
     "sourceCheckedAt": "2026-11-03",
     "level": "brand",
     "verification": "listed-unconfirmed"
    },
    "note": "12 Bulan - 7 Tahun"
   }
  ],
  "website": "https://academy.sparks-edu.com/tangerang/",
  "sourceUrl": "https://academy.sparks-edu.com/tangerang/",
  "lastCheckedAt": "2026-11-03",
  "fitStatus": "branch-candidate-live-undated",
  "notes": "Official city page: 'Kelas olahraga & sensori untuk anak usia 6 bulan-7 tahun'. Booking routes: WhatsApp +62 813-9000-6606 (all schedule CTAs) and a Loket organizer page https://loket.com/o/lkt-dWhw (no current events listed). No per-branch time schedule published online (checked 2026-11-03). | Unresolved: listed in sensory-page address block but not among trial buttons; sub-level availability unknown",
  "reviews": {
   "rating": 4.6,
   "reviewCount": 122,
   "source": "Google Maps",
   "checkedAt": "2026-11-03",
   "praiseThemes": [],
   "complaintThemes": [],
   "sourceUrl": "https://www.google.com/maps/search/?api=1&query=Sparks+Sports+Academy+-+Pamulang&query_place_id=ChIJ24np8iTlaS4RuKRm3SUQPO0"
  },
  "operatingStatus": {
   "state": "official-listed",
   "source": "https://academy.sparks-edu.com/tangerang/",
   "checkedAt": "2026-11-04"
  }
 },
 {
  "id": "sparks-sports-academy-pejaten",
  "chain": "Sparks Sports Academy",
  "branchName": "Pejaten",
  "categories": [
   "Gym & Movement",
   "Sensory"
  ],
  "address": "Jl. Pejaten Raya No.33, RT.5/RW.10, Jati Padang, Ps. Minggu, Kota Jakarta Selatan, Daerah Khusus Ibukota Jakarta 12540, Indonesia",
  "area": "Jakarta Selatan",
  "city": "Jakarta Selatan",
  "lat": -6.279513,
  "lng": 106.838331,
  "coordinateSource": "maps-pin",
  "programs": [
   {
    "name": "Baby Sensory (Sensory & Phonics)",
    "offering": "offered",
    "age": {
     "minMonths": 6,
     "maxMonths": 35,
     "providerAgeUrl": "https://academy.sparks-edu.com/kelas-sensori-bayi/jakarta/",
     "sourceCheckedAt": "2026-11-03",
     "level": "brand",
     "verification": "provider-confirmed"
    },
    "note": "DO NOT exact-age-match: branch evidence confirms only the class CATEGORY. Sub-levels (Crawler 6-11mo 'Limited Locations', Baby 12-23mo, Tiny 24-35mo) not published per branch."
   },
   {
    "name": "Gymnastics",
    "offering": "unknown",
    "age": {
     "minMonths": 12,
     "maxMonths": 84,
     "providerAgeUrl": "https://academy.sparks-edu.com/jakarta/",
     "sourceCheckedAt": "2026-11-03",
     "level": "brand",
     "verification": "listed-unconfirmed"
    },
    "note": "12 Bulan - 7 Tahun"
   },
   {
    "name": "Multi Sports",
    "offering": "unknown",
    "age": {
     "minMonths": 24,
     "maxMonths": 48,
     "providerAgeUrl": "https://academy.sparks-edu.com/jakarta/",
     "sourceCheckedAt": "2026-11-03",
     "level": "brand",
     "verification": "listed-unconfirmed"
    },
    "note": "upper-bound inclusivity at 48 months ambiguous"
   },
   {
    "name": "Dance",
    "offering": "unknown",
    "age": {
     "minMonths": 12,
     "maxMonths": 84,
     "providerAgeUrl": "https://academy.sparks-edu.com/jakarta/",
     "sourceCheckedAt": "2026-11-03",
     "level": "brand",
     "verification": "listed-unconfirmed"
    },
    "note": "12 Bulan - 7 Tahun"
   }
  ],
  "website": "https://academy.sparks-edu.com/jakarta/",
  "sourceUrl": "https://academy.sparks-edu.com/jakarta/",
  "lastCheckedAt": "2026-11-03",
  "fitStatus": "branch-category-confirmed-live-undated",
  "notes": "Official city page: 'Kelas olahraga & sensori untuk anak usia 6 bulan-7 tahun'. Booking routes: WhatsApp +62 813-9000-6606 (all schedule CTAs) and a Loket organizer page https://loket.com/o/lkt-dWhw (no current events listed). No per-branch time schedule published online (checked 2026-11-03).",
  "reviews": {
   "rating": 4.1,
   "reviewCount": 96,
   "source": "Google Maps",
   "checkedAt": "2026-11-03",
   "praiseThemes": [],
   "complaintThemes": [],
   "sourceUrl": "https://www.google.com/maps/search/?api=1&query=Sparks+Sports+Academy+-+Pejaten&query_place_id=ChIJj0oC-ZPzaS4R27vIoJlywyE"
  },
  "operatingStatus": {
   "state": "official-listed",
   "source": "https://academy.sparks-edu.com/jakarta/",
   "checkedAt": "2026-11-04"
  }
 },
 {
  "id": "sparks-sports-academy-sawangan",
  "chain": "Sparks Sports Academy",
  "branchName": "Sawangan",
  "categories": [
   "Gym & Movement",
   "Sensory"
  ],
  "address": "Jl. Raya Muchtar No.18A, Sawangan, Kota Depok, Jawa Barat 16517",
  "area": "Depok",
  "city": "Depok",
  "lat": -6.408867,
  "lng": 106.753049,
  "coordinateSource": "maps-pin",
  "programs": [
   {
    "name": "Baby Sensory (Sensory & Phonics)",
    "offering": "unknown",
    "age": {
     "minMonths": null,
     "maxMonths": null,
     "providerAgeUrl": "https://academy.sparks-edu.com/kelas-sensori-bayi/depok/",
     "sourceCheckedAt": "2026-11-03",
     "level": "brand",
     "verification": "unknown"
    },
    "note": "DO NOT exact-age-match: branch evidence confirms only the class CATEGORY. Sub-levels (Crawler 6-11mo 'Limited Locations', Baby 12-23mo, Tiny 24-35mo) not published per branch."
   },
   {
    "name": "Gymnastics",
    "offering": "unknown",
    "age": {
     "minMonths": 12,
     "maxMonths": 84,
     "providerAgeUrl": "https://academy.sparks-edu.com/depok/",
     "sourceCheckedAt": "2026-11-03",
     "level": "brand",
     "verification": "listed-unconfirmed"
    },
    "note": "12 Bulan - 7 Tahun"
   },
   {
    "name": "Multi Sports",
    "offering": "unknown",
    "age": {
     "minMonths": 24,
     "maxMonths": 48,
     "providerAgeUrl": "https://academy.sparks-edu.com/depok/",
     "sourceCheckedAt": "2026-11-03",
     "level": "brand",
     "verification": "listed-unconfirmed"
    },
    "note": "upper-bound inclusivity at 48 months ambiguous"
   },
   {
    "name": "Dance",
    "offering": "unknown",
    "age": {
     "minMonths": 12,
     "maxMonths": 84,
     "providerAgeUrl": "https://academy.sparks-edu.com/depok/",
     "sourceCheckedAt": "2026-11-03",
     "level": "brand",
     "verification": "listed-unconfirmed"
    },
    "note": "12 Bulan - 7 Tahun"
   }
  ],
  "website": "https://academy.sparks-edu.com/depok/",
  "sourceUrl": "https://academy.sparks-edu.com/depok/",
  "lastCheckedAt": "2026-11-03",
  "fitStatus": "branch-candidate-live-undated",
  "notes": "Official city page: 'Kelas olahraga & sensori untuk anak usia 6 bulan-7 tahun'. Booking routes: WhatsApp +62 813-9000-6606 (all schedule CTAs) and a Loket organizer page https://loket.com/o/lkt-dWhw (no current events listed). No per-branch time schedule published online (checked 2026-11-03). | Unresolved: listed in sensory-page address block but not among trial buttons; sub-level availability unknown",
  "operatingStatus": {
   "state": "official-listed",
   "source": "https://academy.sparks-edu.com/depok/",
   "checkedAt": "2026-11-04"
  }
 },
 {
  "id": "sparks-sports-academy-siliwangi",
  "chain": "Sparks Sports Academy",
  "branchName": "Siliwangi",
  "categories": [
   "Gym & Movement",
   "Sensory"
  ],
  "address": "Graha Semesta, Jl. Sersan Anning No.74A, RT.004/RW.007, Depok, Kec. Pancoran Mas, Kota Depok, Jawa Barat 16431, Indonesia",
  "area": "Depok",
  "city": "Depok",
  "lat": -6.400875,
  "lng": 106.830305,
  "coordinateSource": "maps-pin",
  "programs": [
   {
    "name": "Baby Sensory (Sensory & Phonics)",
    "offering": "unknown",
    "age": {
     "minMonths": null,
     "maxMonths": null,
     "providerAgeUrl": "https://academy.sparks-edu.com/kelas-sensori-bayi/depok/",
     "sourceCheckedAt": "2026-11-03",
     "level": "brand",
     "verification": "unknown"
    },
    "note": "DO NOT exact-age-match: branch evidence confirms only the class CATEGORY. Sub-levels (Crawler 6-11mo 'Limited Locations', Baby 12-23mo, Tiny 24-35mo) not published per branch."
   },
   {
    "name": "Gymnastics",
    "offering": "unknown",
    "age": {
     "minMonths": 12,
     "maxMonths": 84,
     "providerAgeUrl": "https://academy.sparks-edu.com/depok/",
     "sourceCheckedAt": "2026-11-03",
     "level": "brand",
     "verification": "listed-unconfirmed"
    },
    "note": "12 Bulan - 7 Tahun"
   },
   {
    "name": "Multi Sports",
    "offering": "unknown",
    "age": {
     "minMonths": 24,
     "maxMonths": 48,
     "providerAgeUrl": "https://academy.sparks-edu.com/depok/",
     "sourceCheckedAt": "2026-11-03",
     "level": "brand",
     "verification": "listed-unconfirmed"
    },
    "note": "upper-bound inclusivity at 48 months ambiguous"
   },
   {
    "name": "Dance",
    "offering": "unknown",
    "age": {
     "minMonths": 12,
     "maxMonths": 84,
     "providerAgeUrl": "https://academy.sparks-edu.com/depok/",
     "sourceCheckedAt": "2026-11-03",
     "level": "brand",
     "verification": "listed-unconfirmed"
    },
    "note": "12 Bulan - 7 Tahun"
   },
   {
    "name": "Sensory Crawler",
    "category": "Sensory",
    "offering": "offered",
    "age": {
     "minMonths": 6,
     "maxMonths": 11,
     "level": "branch",
     "verification": "provider-confirmed",
     "providerAgeUrl": "https://www.instagram.com/sparks_sportsacademy/p/DbMzKUxDARb/",
     "sourceCheckedAt": "2026-11-07"
    },
    "note": "Provider announcement dated 24 Jul 2026. Slide 1 gives the exact month band; slide 2 and caption name this branch. Dated class evidence, not a current timetable. Confirm current class and session availability before visiting."
   }
  ],
  "website": "https://academy.sparks-edu.com/depok/",
  "sourceUrl": "https://academy.sparks-edu.com/depok/",
  "lastCheckedAt": "2026-11-03",
  "fitStatus": "branch-candidate-live-undated",
  "notes": "Official city page: 'Kelas olahraga & sensori untuk anak usia 6 bulan-7 tahun'. Booking routes: WhatsApp +62 813-9000-6606 (all schedule CTAs) and a Loket organizer page https://loket.com/o/lkt-dWhw (no current events listed). No per-branch time schedule published online (checked 2026-11-03). | Unresolved: listed in sensory-page address block but not among trial buttons; sub-level availability unknown",
  "reviews": {
   "rating": 4.3,
   "reviewCount": 159,
   "source": "Google Maps",
   "checkedAt": "2026-11-03",
   "praiseThemes": [],
   "complaintThemes": [],
   "sourceUrl": "https://www.google.com/maps/search/?api=1&query=Sparks+Sports+Academy+-+Siliwangi&query_place_id=ChIJie3RyFLraS4RmDqyQZjfpeI"
  },
  "operatingStatus": {
   "state": "official-listed",
   "source": "https://academy.sparks-edu.com/depok/",
   "checkedAt": "2026-11-04"
  }
 },
 {
  "id": "sparks-sports-academy-sunter",
  "chain": "Sparks Sports Academy",
  "branchName": "Sunter",
  "categories": [
   "Gym & Movement",
   "Sensory"
  ],
  "address": "Jl. Danau Sunter Utara No.11, RT.11/RW.12, Sunter Agung, Kec. Tj. Priok, Jkt Utara, Daerah Khusus Ibukota Jakarta 14350, Indonesia",
  "area": "Jakarta Utara",
  "city": "Jakarta Utara",
  "lat": -6.138655,
  "lng": 106.866796,
  "coordinateSource": "maps-pin",
  "programs": [
   {
    "name": "Baby Sensory (Sensory & Phonics)",
    "offering": "offered",
    "age": {
     "minMonths": 6,
     "maxMonths": 35,
     "providerAgeUrl": "https://academy.sparks-edu.com/kelas-sensori-bayi/jakarta/",
     "sourceCheckedAt": "2026-11-03",
     "level": "brand",
     "verification": "provider-confirmed"
    },
    "note": "DO NOT exact-age-match: branch evidence confirms only the class CATEGORY. Sub-levels (Crawler 6-11mo 'Limited Locations', Baby 12-23mo, Tiny 24-35mo) not published per branch."
   },
   {
    "name": "Gymnastics",
    "offering": "unknown",
    "age": {
     "minMonths": 12,
     "maxMonths": 84,
     "providerAgeUrl": "https://academy.sparks-edu.com/jakarta/",
     "sourceCheckedAt": "2026-11-03",
     "level": "brand",
     "verification": "listed-unconfirmed"
    },
    "note": "12 Bulan - 7 Tahun"
   },
   {
    "name": "Multi Sports",
    "offering": "unknown",
    "age": {
     "minMonths": 24,
     "maxMonths": 48,
     "providerAgeUrl": "https://academy.sparks-edu.com/jakarta/",
     "sourceCheckedAt": "2026-11-03",
     "level": "brand",
     "verification": "listed-unconfirmed"
    },
    "note": "upper-bound inclusivity at 48 months ambiguous"
   },
   {
    "name": "Dance",
    "offering": "unknown",
    "age": {
     "minMonths": 12,
     "maxMonths": 84,
     "providerAgeUrl": "https://academy.sparks-edu.com/jakarta/",
     "sourceCheckedAt": "2026-11-03",
     "level": "brand",
     "verification": "listed-unconfirmed"
    },
    "note": "12 Bulan - 7 Tahun"
   },
   {
    "name": "Sensory Crawler",
    "category": "Sensory",
    "offering": "offered",
    "age": {
     "minMonths": 6,
     "maxMonths": 11,
     "level": "branch",
     "verification": "provider-confirmed",
     "providerAgeUrl": "https://www.instagram.com/sparks_sportsacademy/p/DbMzKUxDARb/",
     "sourceCheckedAt": "2026-11-07"
    },
    "note": "Provider announcement dated 24 Jul 2026. Slide 1 gives the exact month band; slide 2 and caption name this branch. Dated class evidence, not a current timetable. Confirm current class and session availability before visiting."
   }
  ],
  "website": "https://academy.sparks-edu.com/jakarta/",
  "sourceUrl": "https://academy.sparks-edu.com/jakarta/",
  "lastCheckedAt": "2026-11-03",
  "fitStatus": "branch-category-confirmed-live-undated",
  "notes": "Official city page: 'Kelas olahraga & sensori untuk anak usia 6 bulan-7 tahun'. Booking routes: WhatsApp +62 813-9000-6606 (all schedule CTAs) and a Loket organizer page https://loket.com/o/lkt-dWhw (no current events listed). No per-branch time schedule published online (checked 2026-11-03).",
  "reviews": {
   "rating": 4.1,
   "reviewCount": 32,
   "source": "Google Maps",
   "checkedAt": "2026-11-03",
   "praiseThemes": [],
   "complaintThemes": [],
   "sourceUrl": "https://www.google.com/maps/search/?api=1&query=Sparks+Sports+Academy+-+Sunter&query_place_id=ChIJMQq6q2b1aS4Rzf8wLWS7k7g"
  },
  "operatingStatus": {
   "state": "official-listed",
   "source": "https://academy.sparks-edu.com/jakarta/",
   "checkedAt": "2026-11-04"
  }
 },
 {
  "id": "sparks-sports-academy-taman-mini-square",
  "chain": "Sparks Sports Academy",
  "branchName": "Taman Mini Square",
  "categories": [
   "Gym & Movement",
   "Sensory"
  ],
  "address": "Mall Taman Mini Square, Jl. Taman Mini I No.1 Lt 1, RT.3/RW.2, Pinang Ranti, Kec. Makasar, Kota Jakarta Timur, Daerah Khusus Ibukota Jakarta 13560, Indonesia",
  "area": "Jakarta Timur",
  "city": "Jakarta Timur",
  "lat": -6.290686,
  "lng": 106.881171,
  "coordinateSource": "maps-pin",
  "programs": [
   {
    "name": "Baby Sensory (Sensory & Phonics)",
    "offering": "offered",
    "age": {
     "minMonths": 6,
     "maxMonths": 35,
     "providerAgeUrl": "https://academy.sparks-edu.com/kelas-sensori-bayi/jakarta/",
     "sourceCheckedAt": "2026-11-03",
     "level": "brand",
     "verification": "provider-confirmed"
    },
    "note": "DO NOT exact-age-match: branch evidence confirms only the class CATEGORY. Sub-levels (Crawler 6-11mo 'Limited Locations', Baby 12-23mo, Tiny 24-35mo) not published per branch."
   },
   {
    "name": "Gymnastics",
    "offering": "unknown",
    "age": {
     "minMonths": 12,
     "maxMonths": 84,
     "providerAgeUrl": "https://academy.sparks-edu.com/jakarta/",
     "sourceCheckedAt": "2026-11-03",
     "level": "brand",
     "verification": "listed-unconfirmed"
    },
    "note": "12 Bulan - 7 Tahun"
   },
   {
    "name": "Multi Sports",
    "offering": "unknown",
    "age": {
     "minMonths": 24,
     "maxMonths": 48,
     "providerAgeUrl": "https://academy.sparks-edu.com/jakarta/",
     "sourceCheckedAt": "2026-11-03",
     "level": "brand",
     "verification": "listed-unconfirmed"
    },
    "note": "upper-bound inclusivity at 48 months ambiguous"
   },
   {
    "name": "Dance",
    "offering": "unknown",
    "age": {
     "minMonths": 12,
     "maxMonths": 84,
     "providerAgeUrl": "https://academy.sparks-edu.com/jakarta/",
     "sourceCheckedAt": "2026-11-03",
     "level": "brand",
     "verification": "listed-unconfirmed"
    },
    "note": "12 Bulan - 7 Tahun"
   }
  ],
  "website": "https://academy.sparks-edu.com/jakarta/",
  "sourceUrl": "https://academy.sparks-edu.com/jakarta/",
  "lastCheckedAt": "2026-11-03",
  "fitStatus": "branch-category-confirmed-live-undated",
  "notes": "Official city page: 'Kelas olahraga & sensori untuk anak usia 6 bulan-7 tahun'. Booking routes: WhatsApp +62 813-9000-6606 (all schedule CTAs) and a Loket organizer page https://loket.com/o/lkt-dWhw (no current events listed). No per-branch time schedule published online (checked 2026-11-03).",
  "reviews": {
   "rating": 5.0,
   "reviewCount": 19,
   "source": "Google Maps",
   "checkedAt": "2026-11-03",
   "praiseThemes": [],
   "complaintThemes": [],
   "sourceUrl": "https://www.google.com/maps/search/?api=1&query=Sparks+Sports+Academy+-+Taman+Mini+Square&query_place_id=ChIJ80h08nDzaS4Rfukp2M0Hje4"
  },
  "operatingStatus": {
   "state": "official-listed",
   "source": "https://academy.sparks-edu.com/jakarta/",
   "checkedAt": "2026-11-04"
  }
 },
 {
  "id": "sparks-sports-academy-taman-palem",
  "chain": "Sparks Sports Academy",
  "branchName": "Taman Palem",
  "categories": [
   "Gym & Movement",
   "Sensory"
  ],
  "address": "Jl. Palem Raja Barat No.10, RT.5/RW.13, Pegadungan, Kec. Kalideres, Kota Jakarta Barat, Daerah Khusus Ibukota Jakarta 11830, Indonesia",
  "area": "Jakarta Barat",
  "city": "Jakarta Barat",
  "lat": -6.124946,
  "lng": 106.706138,
  "coordinateSource": "maps-pin",
  "programs": [
   {
    "name": "Baby Sensory (Sensory & Phonics)",
    "offering": "offered",
    "age": {
     "minMonths": 6,
     "maxMonths": 35,
     "providerAgeUrl": "https://academy.sparks-edu.com/kelas-sensori-bayi/jakarta/",
     "sourceCheckedAt": "2026-11-03",
     "level": "brand",
     "verification": "provider-confirmed"
    },
    "note": "DO NOT exact-age-match: branch evidence confirms only the class CATEGORY. Sub-levels (Crawler 6-11mo 'Limited Locations', Baby 12-23mo, Tiny 24-35mo) not published per branch."
   },
   {
    "name": "Gymnastics",
    "offering": "unknown",
    "age": {
     "minMonths": 12,
     "maxMonths": 84,
     "providerAgeUrl": "https://academy.sparks-edu.com/jakarta/",
     "sourceCheckedAt": "2026-11-03",
     "level": "brand",
     "verification": "listed-unconfirmed"
    },
    "note": "12 Bulan - 7 Tahun"
   },
   {
    "name": "Multi Sports",
    "offering": "unknown",
    "age": {
     "minMonths": 24,
     "maxMonths": 48,
     "providerAgeUrl": "https://academy.sparks-edu.com/jakarta/",
     "sourceCheckedAt": "2026-11-03",
     "level": "brand",
     "verification": "listed-unconfirmed"
    },
    "note": "upper-bound inclusivity at 48 months ambiguous"
   },
   {
    "name": "Dance",
    "offering": "unknown",
    "age": {
     "minMonths": 12,
     "maxMonths": 84,
     "providerAgeUrl": "https://academy.sparks-edu.com/jakarta/",
     "sourceCheckedAt": "2026-11-03",
     "level": "brand",
     "verification": "listed-unconfirmed"
    },
    "note": "12 Bulan - 7 Tahun"
   },
   {
    "name": "Sensory Crawler",
    "category": "Sensory",
    "offering": "offered",
    "age": {
     "minMonths": 6,
     "maxMonths": 11,
     "level": "branch",
     "verification": "provider-confirmed",
     "providerAgeUrl": "https://www.instagram.com/sparks_sportsacademy/p/DbMzKUxDARb/",
     "sourceCheckedAt": "2026-11-07"
    },
    "note": "Provider announcement dated 24 Jul 2026. Slide 1 gives the exact month band; slide 2 and caption name this branch. Dated class evidence, not a current timetable. Confirm current class and session availability before visiting."
   }
  ],
  "website": "https://academy.sparks-edu.com/jakarta/",
  "sourceUrl": "https://academy.sparks-edu.com/jakarta/",
  "lastCheckedAt": "2026-11-03",
  "fitStatus": "branch-category-confirmed-live-undated",
  "notes": "Official city page: 'Kelas olahraga & sensori untuk anak usia 6 bulan-7 tahun'. Booking routes: WhatsApp +62 813-9000-6606 (all schedule CTAs) and a Loket organizer page https://loket.com/o/lkt-dWhw (no current events listed). No per-branch time schedule published online (checked 2026-11-03).",
  "reviews": {
   "rating": 5.0,
   "reviewCount": 40,
   "source": "Google Maps",
   "checkedAt": "2026-11-03",
   "praiseThemes": [],
   "complaintThemes": [],
   "sourceUrl": "https://www.google.com/maps/search/?api=1&query=Sparks+Sports+Academy+-+Taman+Palem&query_place_id=ChIJHwACyfYDai4R9_00bipc3nQ"
  },
  "operatingStatus": {
   "state": "official-listed",
   "source": "https://academy.sparks-edu.com/jakarta/",
   "checkedAt": "2026-11-04"
  }
 },
 {
  "id": "sparks-sports-academy-tangerang-city",
  "chain": "Sparks Sports Academy",
  "branchName": "Tangerang City",
  "categories": [
   "Gym & Movement",
   "Sensory"
  ],
  "address": "Ruko Citypark Jl. Perintis Kemerdekaan No.17 Blk G, RT.001/RW.005, Babakan, Kec. Tangerang, Kota Tangerang, Banten 15118, Indonesia",
  "area": "Kota Tangerang",
  "city": "Kota Tangerang",
  "lat": -6.194582,
  "lng": 106.632452,
  "coordinateSource": "maps-pin",
  "programs": [
   {
    "name": "Baby Sensory (Sensory & Phonics)",
    "offering": "offered",
    "age": {
     "minMonths": 6,
     "maxMonths": 35,
     "providerAgeUrl": "https://academy.sparks-edu.com/kelas-sensori-bayi/tangerang/",
     "sourceCheckedAt": "2026-11-03",
     "level": "brand",
     "verification": "provider-confirmed"
    },
    "note": "DO NOT exact-age-match: branch evidence confirms only the class CATEGORY. Sub-levels (Crawler 6-11mo 'Limited Locations', Baby 12-23mo, Tiny 24-35mo) not published per branch."
   },
   {
    "name": "Gymnastics",
    "offering": "unknown",
    "age": {
     "minMonths": 12,
     "maxMonths": 84,
     "providerAgeUrl": "https://academy.sparks-edu.com/tangerang/",
     "sourceCheckedAt": "2026-11-03",
     "level": "brand",
     "verification": "listed-unconfirmed"
    },
    "note": "12 Bulan - 7 Tahun"
   },
   {
    "name": "Multi Sports",
    "offering": "unknown",
    "age": {
     "minMonths": 24,
     "maxMonths": 48,
     "providerAgeUrl": "https://academy.sparks-edu.com/tangerang/",
     "sourceCheckedAt": "2026-11-03",
     "level": "brand",
     "verification": "listed-unconfirmed"
    },
    "note": "upper-bound inclusivity at 48 months ambiguous"
   },
   {
    "name": "Dance",
    "offering": "unknown",
    "age": {
     "minMonths": 12,
     "maxMonths": 84,
     "providerAgeUrl": "https://academy.sparks-edu.com/tangerang/",
     "sourceCheckedAt": "2026-11-03",
     "level": "brand",
     "verification": "listed-unconfirmed"
    },
    "note": "12 Bulan - 7 Tahun"
   }
  ],
  "website": "https://academy.sparks-edu.com/tangerang/",
  "sourceUrl": "https://academy.sparks-edu.com/tangerang/",
  "lastCheckedAt": "2026-11-03",
  "fitStatus": "branch-category-confirmed-live-undated",
  "notes": "Official city page: 'Kelas olahraga & sensori untuk anak usia 6 bulan-7 tahun'. Booking routes: WhatsApp +62 813-9000-6606 (all schedule CTAs) and a Loket organizer page https://loket.com/o/lkt-dWhw (no current events listed). No per-branch time schedule published online (checked 2026-11-03).",
  "reviews": {
   "rating": 4.6,
   "reviewCount": 171,
   "source": "Google Maps",
   "checkedAt": "2026-11-03",
   "praiseThemes": [],
   "complaintThemes": [],
   "sourceUrl": "https://www.google.com/maps/search/?api=1&query=Sparks+Sports+Academy+-+Tangerang+City&query_place_id=ChIJdZ62Bp75aS4RiKVaNk8M0P4"
  },
  "operatingStatus": {
   "state": "official-listed",
   "source": "https://academy.sparks-edu.com/tangerang/",
   "checkedAt": "2026-11-04"
  }
 },
 {
  "id": "sparks-sports-academy-tanjung-duren",
  "chain": "Sparks Sports Academy",
  "branchName": "Tanjung Duren",
  "categories": [
   "Gym & Movement",
   "Sensory"
  ],
  "address": "Jl. Tanjung Duren Raya No.356 357, RT.7/RW.3, Tj. Duren Utara, Kec. Grogol petamburan, Kota Jakarta Barat, Daerah Khusus Ibukota Jakarta 11470, Indonesia",
  "area": "Jakarta Barat",
  "city": "Jakarta Barat",
  "lat": -6.173588,
  "lng": 106.783675,
  "coordinateSource": "maps-pin",
  "programs": [
   {
    "name": "Baby Sensory (Sensory & Phonics)",
    "offering": "offered",
    "age": {
     "minMonths": 6,
     "maxMonths": 35,
     "providerAgeUrl": "https://academy.sparks-edu.com/kelas-sensori-bayi/jakarta/",
     "sourceCheckedAt": "2026-11-03",
     "level": "brand",
     "verification": "provider-confirmed"
    },
    "note": "DO NOT exact-age-match: branch evidence confirms only the class CATEGORY. Sub-levels (Crawler 6-11mo 'Limited Locations', Baby 12-23mo, Tiny 24-35mo) not published per branch."
   },
   {
    "name": "Gymnastics",
    "offering": "unknown",
    "age": {
     "minMonths": 12,
     "maxMonths": 84,
     "providerAgeUrl": "https://academy.sparks-edu.com/jakarta/",
     "sourceCheckedAt": "2026-11-03",
     "level": "brand",
     "verification": "listed-unconfirmed"
    },
    "note": "12 Bulan - 7 Tahun"
   },
   {
    "name": "Multi Sports",
    "offering": "unknown",
    "age": {
     "minMonths": 24,
     "maxMonths": 48,
     "providerAgeUrl": "https://academy.sparks-edu.com/jakarta/",
     "sourceCheckedAt": "2026-11-03",
     "level": "brand",
     "verification": "listed-unconfirmed"
    },
    "note": "upper-bound inclusivity at 48 months ambiguous"
   },
   {
    "name": "Dance",
    "offering": "unknown",
    "age": {
     "minMonths": 12,
     "maxMonths": 84,
     "providerAgeUrl": "https://academy.sparks-edu.com/jakarta/",
     "sourceCheckedAt": "2026-11-03",
     "level": "brand",
     "verification": "listed-unconfirmed"
    },
    "note": "12 Bulan - 7 Tahun"
   }
  ],
  "website": "https://academy.sparks-edu.com/jakarta/",
  "sourceUrl": "https://academy.sparks-edu.com/jakarta/",
  "lastCheckedAt": "2026-11-03",
  "fitStatus": "branch-category-confirmed-live-undated",
  "notes": "Official city page: 'Kelas olahraga & sensori untuk anak usia 6 bulan-7 tahun'. Booking routes: WhatsApp +62 813-9000-6606 (all schedule CTAs) and a Loket organizer page https://loket.com/o/lkt-dWhw (no current events listed). No per-branch time schedule published online (checked 2026-11-03).",
  "reviews": {
   "rating": 4.4,
   "reviewCount": 150,
   "source": "Google Maps",
   "checkedAt": "2026-11-03",
   "praiseThemes": [],
   "complaintThemes": [],
   "sourceUrl": "https://www.google.com/maps/search/?api=1&query=Sparks+Sports+Academy+-+Tanjung+Duren&query_place_id=ChIJDc8Zi0_3aS4R5cJ4VAT8DiE"
  },
  "operatingStatus": {
   "state": "official-listed",
   "source": "https://academy.sparks-edu.com/jakarta/",
   "checkedAt": "2026-11-04"
  }
 },
 {
  "id": "the-funtastic-gym-pondok-indah",
  "chain": "The Funtastic Gym",
  "branchName": "Pondok Indah",
  "categories": [
   "Gym & Movement",
   "Play"
  ],
  "address": "Outdoor Area, Pd. Indah Mall 3, Jl. Metro Pondok Indah No.Kav. 4, Jakarta Selatan (Google Maps listing); brand site says Pondok Indah Mall 2 - venue identity conflict, see note",
  "area": "Jakarta Selatan",
  "city": "Jakarta Selatan",
  "lat": -6.2663218,
  "lng": 106.7850783,
  "coordinateSource": "maps-pin",
  "programs": [
   {
    "name": "Bugs",
    "offering": "offered",
    "age": {
     "minMonths": 4,
     "maxMonths": 10,
     "providerAgeUrl": "https://thefuntasticgym.com/schedule/schedules-pondok-indah-mall-2/",
     "sourceCheckedAt": "2026-11-03",
     "level": "branch",
     "verification": "provider-confirmed"
    },
    "note": "4-10mths"
   },
   {
    "name": "Birds",
    "offering": "offered",
    "age": {
     "minMonths": 10,
     "maxMonths": 19,
     "providerAgeUrl": "https://thefuntasticgym.com/schedule/schedules-pondok-indah-mall-2/",
     "sourceCheckedAt": "2026-11-03",
     "level": "branch",
     "verification": "provider-confirmed"
    },
    "note": "10-19mths"
   },
   {
    "name": "Beasts/Super Beasts",
    "offering": "offered",
    "age": {
     "minMonths": 19,
     "maxMonths": 36,
     "providerAgeUrl": "https://thefuntasticgym.com/schedule/schedules-pondok-indah-mall-2/",
     "sourceCheckedAt": "2026-11-03",
     "level": "branch",
     "verification": "provider-confirmed"
    },
    "note": "19mths-3yrs"
   },
   {
    "name": "Funny Bugs",
    "offering": "offered",
    "age": {
     "minMonths": 36,
     "maxMonths": null,
     "providerAgeUrl": "https://thefuntasticgym.com/schedule/schedules-pondok-indah-mall-2/",
     "sourceCheckedAt": "2026-11-03",
     "level": "branch",
     "verification": "provider-confirmed"
    },
    "note": "\"3 yrs\" upper bound ambiguous. Source states a single age; exact upper eligibility not stated."
   },
   {
    "name": "Parent & Child Practice Time",
    "offering": "offered",
    "age": {
     "minMonths": 4,
     "maxMonths": 36,
     "providerAgeUrl": "https://thefuntasticgym.com/schedule/schedules-pondok-indah-mall-2/",
     "sourceCheckedAt": "2026-11-03",
     "level": "branch",
     "verification": "provider-confirmed"
    },
    "note": "4mths-3yrs"
   }
  ],
  "sourceUrl": "https://www.google.com/maps/search/?api=1&query=The+Funtastic+Gym+of+Pondok+Indah",
  "lastCheckedAt": null,
  "fitStatus": "branch-confirmed-live-undated",
  "notes": "VENUE CONFLICT: official site and schedule page name the branch \"Pondok Indah Mall 2\"; the Google Maps listing places \"The Funtastic Gym of Pondok Indah\" at PIM 3 Outdoor Area. Coordinates are the Maps listing pin; confirm the mall before routing. Schedule page has no term dates: live-undated confirmation, recheck before publishing.",
  "caution": "Venue conflict: official site says Pondok Indah Mall 2 (official schedule page URL and text); Google Maps listing says PIM 3 Outdoor Area (Google Maps listing). Confirm the mall before navigating; in-app routing is off for this pin.",
  "reviews": {
   "rating": 4.9,
   "reviewCount": 44,
   "source": "Google Maps",
   "checkedAt": "2026-11-03",
   "praiseThemes": [],
   "complaintThemes": [],
   "sourceUrl": "https://www.google.com/maps/search/?api=1&query=The+Funtastic+Gym+of+Pondok+Indah"
  },
  "operatingStatus": {
   "state": "official-listed",
   "source": "https://thefuntasticgym.com/our-locations/",
   "checkedAt": "2026-11-04"
  },
  "phone": "+62 811-9775-375"
 },
 {
  "id": "bright-little-stars-kemang",
  "chain": "Bright Little Stars",
  "branchName": "Kemang",
  "categories": [
   "Enrichment",
   "Preschool"
  ],
  "address": "Jl. Kemang Dalam III J No.11, Bangka, Mampang Prapatan, Jakarta Selatan",
  "area": "Jakarta Selatan",
  "city": "Jakarta Selatan",
  "lat": -6.2706229,
  "lng": 106.8196063,
  "coordinateSource": "maps-pin",
  "programs": [
   {
    "name": "Baby Blossoms",
    "category": "Sensory & Play",
    "offering": "offered",
    "age": {
     "minMonths": 6,
     "maxMonths": 12,
     "level": "branch",
     "verification": "provider-confirmed",
     "providerAgeUrl": "https://www.brightlittlestarsedu.com/programs/little-sparkles",
     "sourceCheckedAt": "2026-11-05"
    },
    "note": "Provider class image states 6-12 months; page explicitly places Little Sparkles at Kemang."
   },
   {
    "name": "Giggles and Glows",
    "category": "Sensory & Play",
    "offering": "offered",
    "age": {
     "minMonths": 12,
     "maxMonths": 18,
     "level": "branch",
     "verification": "provider-confirmed",
     "providerAgeUrl": "https://www.brightlittlestarsedu.com/programs/little-sparkles",
     "sourceCheckedAt": "2026-11-05"
    },
    "note": "Provider prose and class image both state 12-18 months; Little Sparkles at Kemang."
   },
   {
    "name": "Cuddle Bugs",
    "category": "Sensory & Play",
    "offering": "offered",
    "age": {
     "minMonths": 18,
     "maxMonths": 24,
     "level": "branch",
     "verification": "provider-confirmed",
     "providerAgeUrl": "https://www.brightlittlestarsedu.com/programs/little-sparkles",
     "sourceCheckedAt": "2026-11-05"
    },
    "note": "Provider class paragraph states 18-24 months; Little Sparkles at Kemang."
   }
  ],
  "sourceUrl": "https://www.google.com/maps/search/?api=1&query=Bright+Little+Stars+Kemang",
  "lastCheckedAt": null,
  "fitStatus": "official-chain-program",
  "notes": "Brand-verified 3mo-6y; per-branch programs/schedules not yet verified. Two distinct BSD listings found on Maps.",
  "reviews": {
   "rating": 4.8,
   "reviewCount": 90,
   "source": "Google Maps",
   "checkedAt": "2026-11-03",
   "praiseThemes": [],
   "complaintThemes": [],
   "sourceUrl": "https://www.google.com/maps/search/?api=1&query=Bright+Little+Stars+Kemang"
  },
  "operatingStatus": {
   "state": "official-listed",
   "source": "https://www.brightlittlestarsedu.com/",
   "checkedAt": "2026-11-04"
  },
  "phone": "+62 815-8855-257"
 },
 {
  "id": "bright-little-stars-bintaro",
  "chain": "Bright Little Stars",
  "branchName": "Bintaro",
  "categories": [
   "Enrichment",
   "Preschool"
  ],
  "address": "Ruko Emerald Avenue, Jl. Boulevard Bintaro Jaya No.A-32, Bintaro, Tangerang Selatan",
  "area": "Tangerang Selatan",
  "city": "Tangerang Selatan",
  "lat": -6.2743367,
  "lng": 106.7041113,
  "coordinateSource": "maps-pin",
  "programs": [
   {
    "name": "Incredible Infant",
    "category": "Sensory & Play",
    "offering": "offered",
    "age": {
     "minMonths": 3,
     "maxMonths": 6,
     "level": "branch",
     "verification": "provider-confirmed",
     "providerAgeUrl": "https://www.brightlittlestarsedu.com/programs/sensory-immersion",
     "sourceCheckedAt": "2026-11-05"
    },
    "note": "Provider class image states exact month bounds; page explicitly offers Sensory Immersion at Bintaro and BSD."
   },
   {
    "name": "Brilliant Baby",
    "category": "Sensory & Play",
    "offering": "offered",
    "age": {
     "minMonths": 6,
     "maxMonths": 12,
     "level": "branch",
     "verification": "provider-confirmed",
     "providerAgeUrl": "https://www.brightlittlestarsedu.com/programs/sensory-immersion",
     "sourceCheckedAt": "2026-11-05"
    },
    "note": "Provider class image states exact month bounds; page explicitly offers Sensory Immersion at Bintaro and BSD."
   },
   {
    "name": "Thriving Toddler",
    "category": "Sensory & Play",
    "offering": "offered",
    "age": {
     "minMonths": 12,
     "maxMonths": 18,
     "level": "branch",
     "verification": "provider-confirmed",
     "providerAgeUrl": "https://www.brightlittlestarsedu.com/programs/sensory-immersion",
     "sourceCheckedAt": "2026-11-05"
    },
    "note": "Provider class image states exact month bounds; page explicitly offers Sensory Immersion at Bintaro and BSD."
   },
   {
    "name": "Talented Toddler",
    "category": "Sensory & Play",
    "offering": "offered",
    "age": {
     "minMonths": 18,
     "maxMonths": 24,
     "level": "branch",
     "verification": "provider-confirmed",
     "providerAgeUrl": "https://www.brightlittlestarsedu.com/programs/sensory-immersion",
     "sourceCheckedAt": "2026-11-05"
    },
    "note": "Provider class image states exact month bounds; page explicitly offers Sensory Immersion at Bintaro and BSD."
   }
  ],
  "sourceUrl": "https://www.google.com/maps/search/?api=1&query=Bright+Little+Stars+Bintaro",
  "lastCheckedAt": null,
  "fitStatus": "official-chain-program",
  "notes": "Brand-verified 3mo-6y; per-branch programs/schedules not yet verified. Two distinct BSD listings found on Maps.",
  "reviews": {
   "rating": 4.9,
   "reviewCount": 72,
   "source": "Google Maps",
   "checkedAt": "2026-11-03",
   "praiseThemes": [],
   "complaintThemes": [],
   "sourceUrl": "https://www.google.com/maps/search/?api=1&query=Bright+Little+Stars+Bintaro"
  },
  "operatingStatus": {
   "state": "official-listed",
   "source": "https://www.brightlittlestarsedu.com/",
   "checkedAt": "2026-11-04"
  },
  "phone": "+62 815-1433-1690"
 },
 {
  "id": "bright-little-stars-bsd-learning-center",
  "chain": "Bright Little Stars",
  "branchName": "BSD Learning Center",
  "categories": [
   "Enrichment",
   "Preschool"
  ],
  "address": "Piazza the Mozia Blok E9 No.23, Jl. Bumi Botanika BSD City, Tangerang Selatan",
  "area": "Tangerang Selatan",
  "city": "Tangerang Selatan",
  "lat": -6.2912389,
  "lng": 106.6271964,
  "coordinateSource": "maps-pin",
  "programs": [
   {
    "name": "Incredible Infant",
    "category": "Sensory & Play",
    "offering": "offered",
    "age": {
     "minMonths": 3,
     "maxMonths": 6,
     "level": "branch",
     "verification": "provider-confirmed",
     "providerAgeUrl": "https://www.brightlittlestarsedu.com/programs/sensory-immersion",
     "sourceCheckedAt": "2026-11-05"
    },
    "note": "Provider class image states exact month bounds; page explicitly offers Sensory Immersion at Bintaro and BSD."
   },
   {
    "name": "Brilliant Baby",
    "category": "Sensory & Play",
    "offering": "offered",
    "age": {
     "minMonths": 6,
     "maxMonths": 12,
     "level": "branch",
     "verification": "provider-confirmed",
     "providerAgeUrl": "https://www.brightlittlestarsedu.com/programs/sensory-immersion",
     "sourceCheckedAt": "2026-11-05"
    },
    "note": "Provider class image states exact month bounds; page explicitly offers Sensory Immersion at Bintaro and BSD."
   },
   {
    "name": "Thriving Toddler",
    "category": "Sensory & Play",
    "offering": "offered",
    "age": {
     "minMonths": 12,
     "maxMonths": 18,
     "level": "branch",
     "verification": "provider-confirmed",
     "providerAgeUrl": "https://www.brightlittlestarsedu.com/programs/sensory-immersion",
     "sourceCheckedAt": "2026-11-05"
    },
    "note": "Provider class image states exact month bounds; page explicitly offers Sensory Immersion at Bintaro and BSD."
   },
   {
    "name": "Talented Toddler",
    "category": "Sensory & Play",
    "offering": "offered",
    "age": {
     "minMonths": 18,
     "maxMonths": 24,
     "level": "branch",
     "verification": "provider-confirmed",
     "providerAgeUrl": "https://www.brightlittlestarsedu.com/programs/sensory-immersion",
     "sourceCheckedAt": "2026-11-05"
    },
    "note": "Provider class image states exact month bounds; page explicitly offers Sensory Immersion at Bintaro and BSD."
   }
  ],
  "sourceUrl": "https://www.google.com/maps/search/?api=1&query=Bright+Little+Stars+Learning+Center+BSD",
  "lastCheckedAt": null,
  "fitStatus": "official-chain-program",
  "notes": "Brand-verified 3mo-6y; per-branch programs/schedules not yet verified. Two distinct BSD listings found on Maps.",
  "operatingStatus": {
   "state": "official-listed",
   "source": "https://www.brightlittlestarsedu.com/",
   "checkedAt": "2026-11-04"
  },
  "reviews": {
   "rating": 5.0,
   "reviewCount": 110,
   "source": "Google Maps",
   "sourceUrl": "https://www.google.com/maps/place/Bright+Little+Stars+Learning+Center+BSD/@-6.2912389,106.6271964,17z/data=!3m1!4b1!4m6!3m5!1s0x2e69fdf242583c35:0x24c475a154a43453!8m2!3d-6.2912389!4d106.6271964!16s%2",
   "checkedAt": "2026-11-03",
   "praiseThemes": [],
   "complaintThemes": []
  },
  "phone": "+62 877-8877-2938"
 },
 {
  "id": "bright-little-stars-bsd-preschool",
  "chain": "Bright Little Stars",
  "branchName": "BSD Preschool",
  "categories": [
   "Enrichment",
   "Preschool"
  ],
  "address": "Daikanyama at The Zora, BSD, Tangerang Selatan",
  "area": "Tangerang Selatan",
  "city": "Tangerang Selatan",
  "lat": -6.284093,
  "lng": 106.6315161,
  "coordinateSource": "maps-pin",
  "programs": [],
  "sourceUrl": "https://www.google.com/maps/search/?api=1&query=Bright+Little+Stars+Preschool+BSD",
  "lastCheckedAt": null,
  "fitStatus": "official-chain-program",
  "notes": "Brand-verified 3mo-6y; per-branch programs/schedules not yet verified. Two distinct BSD listings found on Maps.",
  "reviews": {
   "rating": 5.0,
   "reviewCount": 1,
   "source": "Google Maps",
   "checkedAt": "2026-11-03",
   "praiseThemes": [],
   "complaintThemes": [],
   "sourceUrl": "https://www.google.com/maps/search/?api=1&query=Bright+Little+Stars+Preschool+BSD"
  },
  "operatingStatus": {
   "state": "official-listed",
   "source": "https://www.brightlittlestarsedu.com/",
   "checkedAt": "2026-11-04"
  },
  "phone": "+62 821-9199-7048"
 },
 {
  "id": "sparks-sports-academy-cikarang",
  "chain": "Sparks Sports Academy",
  "branchName": "Cikarang",
  "categories": [
   "Gym & Movement",
   "Sensory",
   "Dance",
   "Multi-Sport"
  ],
  "address": "Jl. Sriwijaya No.16, Cibatu, Cikarang Sel., Kabupaten Bekasi, Jawa Barat 17530, Indonesia",
  "area": "Kabupaten Bekasi",
  "city": "Kabupaten Bekasi",
  "lat": -6.337356799999999,
  "lng": 107.1534288,
  "coordinateSource": "maps-pin",
  "programs": [
   {
    "name": "Baby Sensory (Sensory & Phonics)",
    "offering": "offered",
    "age": {
     "minMonths": 6,
     "maxMonths": 35,
     "providerAgeUrl": "https://academy.sparks-edu.com/kelas-sensori-bayi/bekasi/",
     "sourceCheckedAt": "2026-11-03",
     "level": "brand",
     "verification": "provider-confirmed"
    },
    "note": "DO NOT exact-age-match: branch evidence confirms only the class CATEGORY. Sub-levels (Crawler 6-11mo 'Limited Locations', Baby 12-23mo, Tiny 24-35mo) not published per branch."
   },
   {
    "name": "Gymnastics",
    "offering": "unknown",
    "age": {
     "minMonths": 12,
     "maxMonths": 84,
     "providerAgeUrl": "https://academy.sparks-edu.com/bekasi/",
     "sourceCheckedAt": "2026-11-03",
     "level": "brand",
     "verification": "listed-unconfirmed"
    },
    "note": "12 Bulan - 7 Tahun"
   },
   {
    "name": "Multi Sports",
    "offering": "unknown",
    "age": {
     "minMonths": 24,
     "maxMonths": 48,
     "providerAgeUrl": "https://academy.sparks-edu.com/bekasi/",
     "sourceCheckedAt": "2026-11-03",
     "level": "brand",
     "verification": "listed-unconfirmed"
    },
    "note": "upper-bound inclusivity at 48 months ambiguous"
   },
   {
    "name": "Dance",
    "offering": "unknown",
    "age": {
     "minMonths": 12,
     "maxMonths": 84,
     "providerAgeUrl": "https://academy.sparks-edu.com/bekasi/",
     "sourceCheckedAt": "2026-11-03",
     "level": "brand",
     "verification": "listed-unconfirmed"
    },
    "note": "12 Bulan - 7 Tahun"
   }
  ],
  "website": "https://academy.sparks-edu.com/bekasi/",
  "sourceUrl": "https://academy.sparks-edu.com/bekasi/",
  "lastCheckedAt": "2026-11-03",
  "fitStatus": "branch-category-confirmed-live-undated",
  "notes": "Official city page: 'Kelas olahraga & sensori untuk anak usia 6 bulan-7 tahun'. Booking routes: WhatsApp +62 813-9000-6606 (all schedule CTAs) and a Loket organizer page https://loket.com/o/lkt-dWhw (no current events listed). No per-branch time schedule published online (checked 2026-11-03).",
  "reviews": {
   "rating": 4.9,
   "reviewCount": 319,
   "source": "Google Maps",
   "checkedAt": "2026-11-03",
   "praiseThemes": [],
   "complaintThemes": [],
   "sourceUrl": "https://www.google.com/maps/search/?api=1&query=Sparks+Sports+Academy+-+Cikarang&query_place_id=ChIJwVuoKO2baS4RrnEh0hJv2HY"
  },
  "operatingStatus": {
   "state": "official-listed",
   "source": "https://academy.sparks-edu.com/bekasi/",
   "checkedAt": "2026-11-04"
  }
 },
 {
  "id": "sparks-sports-academy-teras-kota-bsd",
  "chain": "Sparks Sports Academy",
  "branchName": "Teras Kota",
  "categories": [
   "Gym & Movement",
   "Sensory",
   "Dance",
   "Multi-Sport"
  ],
  "address": "Kec, Ruko Bidex BSD, Jl. Pahlawan Seribu No.12 Blok C No. 11, Lengkong Gudang, Kec. Serpong, Kota Tangerang Selatan, Banten 15321, Indonesia",
  "area": "Kota Tangerang Selatan",
  "city": "Kota Tangerang Selatan",
  "lat": -6.294864899999999,
  "lng": 106.6671543,
  "coordinateSource": "maps-pin",
  "programs": [
   {
    "name": "Baby Sensory (Sensory & Phonics)",
    "offering": "offered",
    "age": {
     "minMonths": 6,
     "maxMonths": 35,
     "providerAgeUrl": "https://academy.sparks-edu.com/kelas-sensori-bayi/tangerang/",
     "sourceCheckedAt": "2026-11-03",
     "level": "brand",
     "verification": "provider-confirmed"
    },
    "note": "DO NOT exact-age-match: branch evidence confirms only the class CATEGORY. Sub-levels (Crawler 6-11mo 'Limited Locations', Baby 12-23mo, Tiny 24-35mo) not published per branch."
   },
   {
    "name": "Gymnastics",
    "offering": "unknown",
    "age": {
     "minMonths": 12,
     "maxMonths": 84,
     "providerAgeUrl": "https://academy.sparks-edu.com/tangerang/",
     "sourceCheckedAt": "2026-11-03",
     "level": "brand",
     "verification": "listed-unconfirmed"
    },
    "note": "12 Bulan - 7 Tahun"
   },
   {
    "name": "Multi Sports",
    "offering": "unknown",
    "age": {
     "minMonths": 24,
     "maxMonths": 48,
     "providerAgeUrl": "https://academy.sparks-edu.com/tangerang/",
     "sourceCheckedAt": "2026-11-03",
     "level": "brand",
     "verification": "listed-unconfirmed"
    },
    "note": "upper-bound inclusivity at 48 months ambiguous"
   },
   {
    "name": "Dance",
    "offering": "unknown",
    "age": {
     "minMonths": 12,
     "maxMonths": 84,
     "providerAgeUrl": "https://academy.sparks-edu.com/tangerang/",
     "sourceCheckedAt": "2026-11-03",
     "level": "brand",
     "verification": "listed-unconfirmed"
    },
    "note": "12 Bulan - 7 Tahun"
   },
   {
    "name": "Sensory Crawler",
    "category": "Sensory",
    "offering": "offered",
    "age": {
     "minMonths": 6,
     "maxMonths": 11,
     "level": "branch",
     "verification": "provider-confirmed",
     "providerAgeUrl": "https://www.instagram.com/sparks_sportsacademy/p/DbMzKUxDARb/",
     "sourceCheckedAt": "2026-11-07"
    },
    "note": "Provider announcement dated 24 Jul 2026. Slide 1 gives the exact month band; slide 2 and caption name this branch. Dated class evidence, not a current timetable. Confirm current class and session availability before visiting."
   }
  ],
  "website": "https://academy.sparks-edu.com/tangerang/",
  "sourceUrl": "https://academy.sparks-edu.com/tangerang/",
  "lastCheckedAt": "2026-11-03",
  "fitStatus": "branch-category-confirmed-live-undated",
  "notes": "Official city page: 'Kelas olahraga & sensori untuk anak usia 6 bulan-7 tahun'. Booking routes: WhatsApp +62 813-9000-6606 (all schedule CTAs) and a Loket organizer page https://loket.com/o/lkt-dWhw (no current events listed). No per-branch time schedule published online (checked 2026-11-03).",
  "reviews": {
   "rating": 4.6,
   "reviewCount": 66,
   "source": "Google Maps",
   "checkedAt": "2026-11-03",
   "praiseThemes": [],
   "complaintThemes": [],
   "sourceUrl": "https://www.google.com/maps/search/?api=1&query=Sparks+Sports+Academy+-+Teras+Kota&query_place_id=ChIJZcPs7m_7aS4R4OmBWCOeRaI"
  },
  "operatingStatus": {
   "state": "official-listed",
   "source": "https://academy.sparks-edu.com/tangerang/",
   "checkedAt": "2026-11-04"
  }
 },
 {
  "id": "gogrow-tanjung-duren",
  "chain": "GoGrow Academy & Kids Club",
  "branchName": "Tanjung Duren (Mall Hublife)",
  "categories": [
   "Gym & Movement",
   "Sensory"
  ],
  "address": "Mall Hublife, Jl. Tj. Duren Timur 2 No.06 Lt 2 Unit 2F-03, RT.12/RW.1, Tj. Duren Sel., Kec. Grogol petamburan, Kota Jakarta Barat, DKI Jakarta 11470, Indonesia",
  "area": "Jakarta Barat",
  "city": "Jakarta Barat",
  "lat": -6.1808599,
  "lng": 106.7918411,
  "coordinateSource": "maps-pin",
  "programs": [
   {
    "name": "Baby Gym & Sensory",
    "offering": "offered",
    "age": {
     "minMonths": null,
     "maxMonths": null,
     "level": "brand",
     "verification": "unknown",
     "sourceCheckedAt": "2026-11-04",
     "providerAgeUrl": "https://gogrow.id/"
    },
    "note": "Official site lists Baby Gym & Sensory and Baby Music Class. No numeric age range read on the page (2026-11-04)."
   },
   {
    "name": "Baby Music Class",
    "category": "Music",
    "offering": "offered",
    "age": {
     "minMonths": 8,
     "maxMonths": 23,
     "level": "branch",
     "verification": "provider-confirmed",
     "providerAgeUrl": "https://www.instagram.com/letsgogrow.id/p/Da2InNgiXIk/?img_index=4",
     "sourceCheckedAt": "2026-11-07"
    },
    "note": "Provider announcement dated 16 Jul 2026, tagged HUBlife Jakarta. Slide 4 gives the exact month band. Dated class evidence, not a current timetable. Confirm current class and session availability before visiting."
   }
  ],
  "website": "https://gogrow.id/",
  "sourceUrl": "https://gogrow.id/",
  "lastCheckedAt": "2026-11-04",
  "fitStatus": "branch-candidate-live-undated",
  "notes": "Independent single-site provider. Official address matches the Google Maps listing. Site is undated; read 2026-11-04.",
  "operatingStatus": {
   "state": "official-listed",
   "source": "https://gogrow.id/",
   "checkedAt": "2026-11-04"
  },
  "reviews": {
   "rating": 4.8,
   "reviewCount": 29,
   "source": "Google Maps",
   "sourceUrl": "https://www.google.com/maps/place/Gogrow+-+Academy+%26+Kids+Club/@-6.1808599,106.7918411,17z/data=!3m1!4b1!4m6!3m5!1s0x2e69f7e6385a12c3:0x5e583d7614231f3a!8m2!3d-6.1808599!4d106.7918411!16s%2Fg%2F11xynt_x7d",
   "checkedAt": "2026-11-04",
   "praiseThemes": [],
   "complaintThemes": []
  },
  "phone": "+62 821-9997-7599"
 },
 {
  "id": "genesis-baby-toddler-swim-pejaten",
  "chain": "Genesis Baby & Toddler Swim School",
  "branchName": "Pejaten",
  "categories": [
   "Swim"
  ],
  "address": "Jl. Pejaten Barat Raya No.16a, RT.1/RW.10, Ragunan, Ps. Minggu, Kota Jakarta Selatan, Daerah Khusus Ibukota Jakarta 12540, Indonesia",
  "area": "Jakarta Selatan",
  "city": "Jakarta Selatan",
  "lat": -6.2775474,
  "lng": 106.8239435,
  "coordinateSource": "maps-pin",
  "programs": [
   {
    "name": "Baby Class",
    "offering": "offered",
    "age": {
     "minMonths": 4.5,
     "maxMonths": 18,
     "level": "branch",
     "verification": "provider-confirmed",
     "sourceCheckedAt": "2026-11-05",
     "providerAgeUrl": "https://swimgenesis.com/swim-school"
    },
    "note": "Official swim-school page states Baby Class 4.5-18 Months; homepage binds weekly swim sessions to Pejaten. Baby Whale 1 & 2 is a separate curriculum level (4.5 months-2 years), not a replacement age range for this class.",
    "noteUrl": "https://swimgenesis.com/",
    "noteLabel": "Pejaten branch evidence"
   }
  ],
  "website": "https://swimgenesis.com/",
  "sourceUrl": "https://swimgenesis.com/",
  "lastCheckedAt": "2026-11-05",
  "fitStatus": "branch-confirmed-live-undated",
  "notes": "Official swim-school page states Baby Class 4.5-18 months. Homepage names weekly swim sessions at Pejaten. Toddler Class retains an open/year upper bound and is not imported. Baby Whale curriculum levels remain separate. Site undated; read 2026-11-05. Existing Maps address, coordinates and review snapshot unchanged.",
  "operatingStatus": {
   "state": "official-listed",
   "source": "https://swimgenesis.com/",
   "checkedAt": "2026-11-04"
  },
  "reviews": {
   "rating": 4.9,
   "reviewCount": 115,
   "source": "Google Maps",
   "sourceUrl": "https://www.google.com/maps/place/Genesis+Baby+and+Toddler+Swim+School+-+Jakarta+Selatan+(Heated+Swimming+Pool)/@-6.2775474,106.8239435,17z/data=!3m1!4b1!4m6!3m5!1s0x2f3f89d622bd57b:0xdc1d0cebec168459!8m2!3d-6.2775474!4d106.8239435!16s%2Fg%2F11sjcbtp6_",
   "checkedAt": "2026-11-04",
   "praiseThemes": [],
   "complaintThemes": []
  },
  "phone": "+62 817-0515-051"
 },
 {
  "id": "anak-air-kebagusan",
  "chain": "Anak Air Swim School",
  "branchName": "Kebagusan (TB Simatupang)",
  "categories": [
   "Swim"
  ],
  "address": "The Villas at Kebagusan, Jl. Kebagusan I No.1, RT.9/RW.7, Kebagusan, Ps. Minggu, Kota Jakarta Selatan, Daerah Khusus Ibukota Jakarta 12520, Indonesia",
  "area": "Jakarta Selatan",
  "city": "Jakarta Selatan",
  "lat": -6.3014979,
  "lng": 106.8286337,
  "coordinateSource": "maps-pin",
  "programs": [
   {
    "name": "Swim school",
    "offering": "offered",
    "age": {
     "minMonths": 6,
     "maxMonths": null,
     "level": "brand",
     "verification": "listed-unconfirmed",
     "sourceCheckedAt": "2026-11-04"
    },
    "note": "Third-party article: students from six months up to 12 years. Not on the official page.",
    "noteUrl": "http://www.ciputraentrepreneurship.com/bisnis-mikro/menilik-keuntungan-bisnis-kursus-renang",
    "noteLabel": "Third-party article"
   }
  ],
  "website": "https://www.anakair.co.id/",
  "sourceUrl": "https://www.anakair.co.id/cabang/",
  "lastCheckedAt": "2026-11-04",
  "fitStatus": "branch-candidate-live-undated",
  "notes": "Official branch page lists this branch; read 2026-11-04. 'From 6 months' comes from an older third-party article (ciputraentrepreneurship.com), not the official site, so it is brand level and unconfirmed.",
  "operatingStatus": {
   "state": "official-listed",
   "source": "https://www.anakair.co.id/cabang/",
   "checkedAt": "2026-11-04"
  },
  "reviews": {
   "rating": 4.6,
   "reviewCount": 90,
   "source": "Google Maps",
   "sourceUrl": "https://www.google.com/maps/place/Anak+Air+Swim+School+Kebagusan/@-6.3014979,106.8286337,17z/data=!3m1!4b1!4m6!3m5!1s0x2e69ede51c72c2ed:0x1139b13499485723!8m2!3d-6.3014979!4d106.8286337!16s%2Fg%2F1pzrn4qwh",
   "checkedAt": "2026-11-04",
   "praiseThemes": [],
   "complaintThemes": []
  },
  "phone": "+62 878-0999-7030"
 },
 {
  "id": "anak-air-pondok-indah",
  "chain": "Anak Air Swim School",
  "branchName": "Pondok Indah",
  "categories": [
   "Swim"
  ],
  "address": "Jl. Metro Pondok Indah No.Sb 7, RT.2/RW.15, Pd. Pinang, Kec. Kebayoran Lama, Kota Jakarta Selatan, Daerah Khusus Ibukota Jakarta 12310, Indonesia",
  "area": "Jakarta Selatan",
  "city": "Jakarta Selatan",
  "lat": -6.2762893,
  "lng": 106.7821393,
  "coordinateSource": "maps-pin",
  "programs": [
   {
    "name": "Swim school",
    "offering": "offered",
    "age": {
     "minMonths": 6,
     "maxMonths": null,
     "level": "brand",
     "verification": "listed-unconfirmed",
     "sourceCheckedAt": "2026-11-04"
    },
    "note": "Third-party article: students from six months up to 12 years. Not on the official page.",
    "noteUrl": "http://www.ciputraentrepreneurship.com/bisnis-mikro/menilik-keuntungan-bisnis-kursus-renang",
    "noteLabel": "Third-party article"
   }
  ],
  "website": "https://www.anakair.co.id/",
  "sourceUrl": "https://www.anakair.co.id/cabang/",
  "lastCheckedAt": "2026-11-04",
  "fitStatus": "branch-candidate-live-undated",
  "notes": "Official branch page lists this branch; read 2026-11-04. 'From 6 months' comes from an older third-party article (ciputraentrepreneurship.com), not the official site, so it is brand level and unconfirmed.",
  "operatingStatus": {
   "state": "official-listed",
   "source": "https://www.anakair.co.id/cabang/",
   "checkedAt": "2026-11-04"
  },
  "reviews": {
   "rating": 4.6,
   "reviewCount": 39,
   "source": "Google Maps",
   "sourceUrl": "https://www.google.com/maps/place/Anak+Air+Swim+School+Pondok+Indah/@-6.2762893,106.7821393,17z/data=!3m1!4b1!4m6!3m5!1s0x2e69f1cf2c30d11b:0x142b121015923b17!8m2!3d-6.2762893!4d106.7821393!16s%2Fg%2F11clyt38j2",
   "checkedAt": "2026-11-04",
   "praiseThemes": [],
   "complaintThemes": []
  },
  "phone": "+62 811-1180-2505"
 },
 {
  "id": "anak-air-kemang",
  "chain": "Anak Air Swim School",
  "branchName": "Kemang",
  "categories": [
   "Swim"
  ],
  "address": "Jl. Benda Raya No.90, RT.2/RW.4, Cilandak Tim., Ps. Minggu, Kota Jakarta Selatan, Daerah Khusus Ibukota Jakarta 12560, Indonesia",
  "area": "Jakarta Selatan",
  "city": "Jakarta Selatan",
  "lat": -6.276509,
  "lng": 106.81658,
  "coordinateSource": "maps-pin",
  "programs": [
   {
    "name": "Swim school",
    "offering": "offered",
    "age": {
     "minMonths": 6,
     "maxMonths": null,
     "level": "brand",
     "verification": "listed-unconfirmed",
     "sourceCheckedAt": "2026-11-04"
    },
    "note": "Third-party article: students from six months up to 12 years. Not on the official page.",
    "noteUrl": "http://www.ciputraentrepreneurship.com/bisnis-mikro/menilik-keuntungan-bisnis-kursus-renang",
    "noteLabel": "Third-party article"
   }
  ],
  "website": "https://www.anakair.co.id/",
  "sourceUrl": "https://www.anakair.co.id/cabang/",
  "lastCheckedAt": "2026-11-04",
  "fitStatus": "branch-candidate-live-undated",
  "notes": "Official branch page lists this branch; read 2026-11-04. 'From 6 months' comes from an older third-party article (ciputraentrepreneurship.com), not the official site, so it is brand level and unconfirmed.",
  "operatingStatus": {
   "state": "official-listed",
   "source": "https://www.anakair.co.id/cabang/",
   "checkedAt": "2026-11-04"
  },
  "reviews": {
   "rating": 4.8,
   "reviewCount": 22,
   "source": "Google Maps",
   "sourceUrl": "https://www.google.com/maps/place/Anak+Air+Swim+School+Kemang/@-6.276509,106.81658,17z/data=!3m1!4b1!4m6!3m5!1s0x2e69f1e8763ab677:0xb1e5f4621e9b1cf4!8m2!3d-6.276509!4d106.81658!16s%2Fg%2F11wg23bh_k",
   "checkedAt": "2026-11-04",
   "praiseThemes": [],
   "complaintThemes": []
  },
  "phone": "+62 811-1180-2500"
 },
 {
  "id": "anak-air-grand-cibubur",
  "chain": "Anak Air Swim School",
  "branchName": "Grand Cibubur",
  "categories": [
   "Swim"
  ],
  "address": "Perumahan Grand Cibubur, Jl. Alternatif Cibubur Km. 4, Jatisampurna, RT.002/RW.017, Jatisampurna, Kec. Jatisampurna, Kota Bks, Jawa Barat 17433, Indonesia",
  "area": "Bekasi",
  "city": "Bekasi",
  "lat": -6.3768966,
  "lng": 106.9302525,
  "coordinateSource": "maps-pin",
  "programs": [
   {
    "name": "Swim school",
    "offering": "offered",
    "age": {
     "minMonths": 6,
     "maxMonths": null,
     "level": "brand",
     "verification": "listed-unconfirmed",
     "sourceCheckedAt": "2026-11-04"
    },
    "note": "Third-party article: students from six months up to 12 years. Not on the official page.",
    "noteUrl": "http://www.ciputraentrepreneurship.com/bisnis-mikro/menilik-keuntungan-bisnis-kursus-renang",
    "noteLabel": "Third-party article"
   }
  ],
  "website": "https://www.anakair.co.id/",
  "sourceUrl": "https://www.anakair.co.id/cabang/",
  "lastCheckedAt": "2026-11-04",
  "fitStatus": "branch-candidate-live-undated",
  "notes": "Official branch page lists this branch; read 2026-11-04. 'From 6 months' comes from an older third-party article (ciputraentrepreneurship.com), not the official site, so it is brand level and unconfirmed.",
  "operatingStatus": {
   "state": "official-listed",
   "source": "https://www.anakair.co.id/cabang/",
   "checkedAt": "2026-11-04"
  },
  "reviews": {
   "rating": 4.3,
   "reviewCount": 128,
   "source": "Google Maps",
   "sourceUrl": "https://www.google.com/maps/place/Anak+Air+Swim+School+Grand+Cibubur/@-6.3768966,106.9302525,17z/data=!3m1!4b1!4m6!3m5!1s0x2e69935ec3aa1ee7:0x8a2bbe8e0e10ba82!8m2!3d-6.3768966!4d106.9302525!16s%2Fg%2F11bwh5rg70",
   "checkedAt": "2026-11-04",
   "praiseThemes": [],
   "complaintThemes": []
  },
  "phone": "+62 812-9006-1005"
 },
 {
  "id": "anak-air-limo",
  "chain": "Anak Air Swim School",
  "branchName": "Limo (Meruyung)",
  "categories": [
   "Swim"
  ],
  "address": "Jl. Sawo Griya Kencana II, Meruyung, Kec. Limo, Kota Depok, Jawa Barat 16514, Indonesia",
  "area": "Depok",
  "city": "Depok",
  "lat": -6.372296,
  "lng": 106.7745928,
  "coordinateSource": "maps-pin",
  "programs": [
   {
    "name": "Swim school",
    "offering": "offered",
    "age": {
     "minMonths": 6,
     "maxMonths": null,
     "level": "brand",
     "verification": "listed-unconfirmed",
     "sourceCheckedAt": "2026-11-04"
    },
    "note": "Third-party article: students from six months up to 12 years. Not on the official page.",
    "noteUrl": "http://www.ciputraentrepreneurship.com/bisnis-mikro/menilik-keuntungan-bisnis-kursus-renang",
    "noteLabel": "Third-party article"
   }
  ],
  "website": "https://www.anakair.co.id/",
  "sourceUrl": "https://www.anakair.co.id/cabang/",
  "lastCheckedAt": "2026-11-04",
  "fitStatus": "branch-candidate-live-undated",
  "notes": "Official branch page lists this branch; read 2026-11-04. 'From 6 months' comes from an older third-party article (ciputraentrepreneurship.com), not the official site, so it is brand level and unconfirmed.",
  "operatingStatus": {
   "state": "official-listed",
   "source": "https://www.anakair.co.id/cabang/",
   "checkedAt": "2026-11-04"
  },
  "reviews": {
   "rating": 4.6,
   "reviewCount": 51,
   "source": "Google Maps",
   "sourceUrl": "https://www.google.com/maps/place/Anak+Air+Swim+School+Limo/@-6.372296,106.7745928,17z/data=!3m1!4b1!4m6!3m5!1s0x2e69efb05dd3fa1d:0x4367b237857da293!8m2!3d-6.372296!4d106.7745928!16s%2Fg%2F11g3wy5d1d",
   "checkedAt": "2026-11-04",
   "praiseThemes": [],
   "complaintThemes": []
  },
  "phone": "+62 811-1180-2520"
 },
 {
  "id": "studiorenang-bsd-north-point",
  "chain": "StudioRenang",
  "branchName": "BSD North Point Navapark",
  "categories": [
   "Swim"
  ],
  "address": "North Point Navapark, Blok NB No. 21, BSD City, Jl. BSD Boulevard Utara, Kel. Lengkong Kulon, Kec. Pagedangan, Kab. Tangerang, Banten 15331",
  "area": "Tangerang",
  "city": "Kabupaten Tangerang",
  "lat": -6.2890851,
  "lng": 106.6526254,
  "coordinateSource": "maps-pin",
  "programs": [
   {
    "name": "Baby swim (Bayi 1 & 2)",
    "offering": "offered",
    "age": {
     "minMonths": 6,
     "maxMonths": 36,
     "level": "brand",
     "verification": "provider-confirmed",
     "sourceCheckedAt": "2026-11-04",
     "providerAgeUrl": "https://studiorenang.com/programrenang"
    },
    "note": "Brand program page: babies 6-36 months, max 5 babies. Branch schedule not published."
   },
   {
    "name": "Toddler swim (Aquatikes)",
    "offering": "offered",
    "age": {
     "minMonths": 36,
     "maxMonths": 59,
     "level": "brand",
     "verification": "provider-confirmed",
     "sourceCheckedAt": "2026-11-04",
     "providerAgeUrl": "https://studiorenang.com/programrenang"
    },
    "note": "Brand program page: toddlers 3-4 years."
   }
  ],
  "website": "https://studiorenang.com/",
  "sourceUrl": "https://www.studiorenang.com/lokasikami",
  "lastCheckedAt": "2026-11-04",
  "fitStatus": "branch-candidate-live-undated",
  "notes": "Official outlet page lists this address; read 2026-11-04. Ages are brand level.",
  "operatingStatus": {
   "state": "official-listed",
   "source": "https://www.studiorenang.com/lokasikami",
   "checkedAt": "2026-11-04"
  },
  "reviews": {
   "rating": 5.0,
   "reviewCount": 42,
   "source": "Google Maps",
   "sourceUrl": "https://www.google.com/maps/place/Studiorenang.com+Northpoint+BSD/@-6.2890851,106.6526254,17z/data=!3m1!4b1!4m6!3m5!1s0x2e69fbd448905a67:0x42eee35e52044082!8m2!3d-6.2890851!4d106.6526254!16s%2Fg%2F11whmll5yc",
   "checkedAt": "2026-11-04",
   "praiseThemes": [],
   "complaintThemes": []
  },
  "phone": "+62 811-9762-030"
 },
 {
  "id": "studiorenang-gading-serpong",
  "chain": "StudioRenang",
  "branchName": "Gading Serpong",
  "categories": [
   "Swim"
  ],
  "address": "Jl. Klp. Gading Bar. Blok Cb No.9, Pakulonan Bar., Kec. Klp. Dua, Gading, Kec. Serpong, Kabupaten Tangerang, Banten 15413, Indonesia",
  "area": "Tangerang",
  "city": "Kabupaten Tangerang",
  "lat": -6.2335372,
  "lng": 106.6275612,
  "coordinateSource": "maps-pin",
  "programs": [
   {
    "name": "Baby swim (Bayi 1 & 2)",
    "offering": "offered",
    "age": {
     "minMonths": 6,
     "maxMonths": 36,
     "level": "brand",
     "verification": "provider-confirmed",
     "sourceCheckedAt": "2026-11-04",
     "providerAgeUrl": "https://studiorenang.com/programrenang"
    },
    "note": "Brand program page: babies 6-36 months, max 5 babies. Branch schedule not published."
   },
   {
    "name": "Toddler swim (Aquatikes)",
    "offering": "offered",
    "age": {
     "minMonths": 36,
     "maxMonths": 59,
     "level": "brand",
     "verification": "provider-confirmed",
     "sourceCheckedAt": "2026-11-04",
     "providerAgeUrl": "https://studiorenang.com/programrenang"
    },
    "note": "Brand program page: toddlers 3-4 years."
   }
  ],
  "website": "https://studiorenang.com/",
  "sourceUrl": "https://studiorenang.com/outlet/003/",
  "lastCheckedAt": "2026-11-04",
  "fitStatus": "branch-candidate-live-undated",
  "notes": "Official outlet page lists this address; read 2026-11-04. Ages are brand level.",
  "operatingStatus": {
   "state": "official-listed",
   "source": "https://studiorenang.com/outlet/003/",
   "checkedAt": "2026-11-04"
  },
  "reviews": {
   "rating": 4.9,
   "reviewCount": 535,
   "source": "Google Maps",
   "sourceUrl": "https://www.google.com/maps/place/StudioRenang.com+Gading+Serpong+Tangerang/@-6.2335372,106.6275612,17z/data=!3m1!4b1!4m6!3m5!1s0x2e69fd0d63892d89:0xf5441d0f5f09593f!8m2!3d-6.2335372!4d106.6275612!16s%2Fg%2F11h1hn3sss",
   "checkedAt": "2026-11-04",
   "praiseThemes": [],
   "complaintThemes": []
  },
  "phone": "+62 811-7781-812"
 },
 {
  "id": "studiorenang-kelapa-gading",
  "chain": "StudioRenang",
  "branchName": "Kelapa Gading",
  "categories": [
   "Swim"
  ],
  "address": "Jl. Boulevard Bar. Raya No.68, RT.13/RW.7, Klp. Gading Bar., Jakarta, Jkt Utara, Daerah Khusus Ibukota Jakarta 14240, Indonesia",
  "area": "Jakarta Utara",
  "city": "Jakarta Utara",
  "lat": -6.156936,
  "lng": 106.899863,
  "coordinateSource": "maps-pin",
  "programs": [
   {
    "name": "Baby swim (Bayi 1 & 2)",
    "offering": "offered",
    "age": {
     "minMonths": 6,
     "maxMonths": 36,
     "level": "brand",
     "verification": "provider-confirmed",
     "sourceCheckedAt": "2026-11-04",
     "providerAgeUrl": "https://studiorenang.com/programrenang"
    },
    "note": "Brand program page: babies 6-36 months, max 5 babies. Branch schedule not published."
   },
   {
    "name": "Toddler swim (Aquatikes)",
    "offering": "offered",
    "age": {
     "minMonths": 36,
     "maxMonths": 59,
     "level": "brand",
     "verification": "provider-confirmed",
     "sourceCheckedAt": "2026-11-04",
     "providerAgeUrl": "https://studiorenang.com/programrenang"
    },
    "note": "Brand program page: toddlers 3-4 years."
   }
  ],
  "website": "https://studiorenang.com/",
  "sourceUrl": "https://studiorenang.com/outlet/007/",
  "lastCheckedAt": "2026-11-04",
  "fitStatus": "branch-candidate-live-undated",
  "notes": "Official outlet page lists this address; read 2026-11-04. Ages are brand level.",
  "operatingStatus": {
   "state": "official-listed",
   "source": "https://studiorenang.com/outlet/007/",
   "checkedAt": "2026-11-04"
  },
  "reviews": {
   "rating": 5.0,
   "reviewCount": 463,
   "source": "Google Maps",
   "sourceUrl": "https://www.google.com/maps/place/Studiorenang.com+Kelapa+Gading/@-6.156936,106.899863,17z/data=!3m1!4b1!4m6!3m5!1s0x2e69f5658709b8ff:0x11021c097b0ba92a!8m2!3d-6.156936!4d106.899863!16s%2Fg%2F11sf6q_k0b",
   "checkedAt": "2026-11-04",
   "praiseThemes": [],
   "complaintThemes": []
  },
  "phone": "+62 811-7098-880"
 },
 {
  "id": "studiorenang-meruya",
  "chain": "StudioRenang",
  "branchName": "Meruya",
  "categories": [
   "Swim"
  ],
  "address": "Jl. Meruya Ilir Raya barat No.3, RT.2/RW.3, Meruya Utara, Kec. Kembangan, Kota Jakarta Barat, Daerah Khusus Ibukota Jakarta 11620, Indonesia",
  "area": "Jakarta Barat",
  "city": "Jakarta Barat",
  "lat": -6.197165,
  "lng": 106.7536656,
  "coordinateSource": "maps-pin",
  "programs": [
   {
    "name": "Baby swim (Bayi 1 & 2)",
    "offering": "offered",
    "age": {
     "minMonths": 6,
     "maxMonths": 36,
     "level": "brand",
     "verification": "provider-confirmed",
     "sourceCheckedAt": "2026-11-04",
     "providerAgeUrl": "https://studiorenang.com/programrenang"
    },
    "note": "Brand program page: babies 6-36 months, max 5 babies. Branch schedule not published."
   },
   {
    "name": "Toddler swim (Aquatikes)",
    "offering": "offered",
    "age": {
     "minMonths": 36,
     "maxMonths": 59,
     "level": "brand",
     "verification": "provider-confirmed",
     "sourceCheckedAt": "2026-11-04",
     "providerAgeUrl": "https://studiorenang.com/programrenang"
    },
    "note": "Brand program page: toddlers 3-4 years."
   }
  ],
  "website": "https://studiorenang.com/",
  "sourceUrl": "https://studiorenang.com/outlet/010/",
  "lastCheckedAt": "2026-11-04",
  "fitStatus": "branch-candidate-live-undated",
  "notes": "Official outlet page lists this address; read 2026-11-04. Ages are brand level.",
  "operatingStatus": {
   "state": "official-listed",
   "source": "https://studiorenang.com/outlet/010/",
   "checkedAt": "2026-11-04"
  },
  "reviews": {
   "rating": 5.0,
   "reviewCount": 382,
   "source": "Google Maps",
   "sourceUrl": "https://www.google.com/maps/place/Studiorenang.com+Meruya/@-6.197165,106.7536656,17z/data=!3m1!4b1!4m6!3m5!1s0x2e69f73dbfe60ea5:0x277f5e98c193dfce!8m2!3d-6.197165!4d106.7536656!16s%2Fg%2F11txjclmwp",
   "checkedAt": "2026-11-04",
   "praiseThemes": [],
   "complaintThemes": []
  },
  "phone": "+62 811-2508-010"
 },
 {
  "id": "outgrow-alam-sutera",
  "chain": "Outgrow",
  "branchName": "Alam Sutera",
  "categories": [
   "Sensory"
  ],
  "address": "Ruko, Jl. Jalur Sutera Tim. No.38 Blk 6A, RT.001/RW.005, Kunciran, Kec. Pinang, Kota Tangerang, Banten 15143, Indonesia",
  "area": "Tangerang",
  "city": "Tangerang",
  "lat": -6.2264756,
  "lng": 106.6603045,
  "coordinateSource": "maps-pin",
  "programs": [
   {
    "name": "Baby Class",
    "offering": "offered",
    "age": {
     "minMonths": 6,
     "maxMonths": 12,
     "level": "branch",
     "verification": "provider-confirmed",
     "sourceCheckedAt": "2026-11-04",
     "providerAgeUrl": "https://outgrow.id/service/baby-class-tangerang/"
    },
    "note": "Occupational-therapist facilitated class for babies 6-12 months. By appointment, Tue-Sun. Official page image dated 2026-10; read 2026-11-04."
   },
   {
    "name": "Kelas Tumbuh Tepat",
    "offering": "offered",
    "age": {
     "minMonths": 12,
     "maxMonths": 60,
     "level": "branch",
     "verification": "provider-confirmed",
     "sourceCheckedAt": "2026-11-10",
     "providerAgeUrl": "https://outgrow.id/service/kelas-stimulasi-motorik-anak/"
    },
    "note": "Official page title says 1-5 tahun; year-boundary inclusivity ambiguous, so it is not used for exact-age matching. Small groups led by a licensed therapist, by appointment, Tue-Sun 08:00-20:00. Page footer gives the Alam Sutera address. Read 2026-11-10."
   }
  ],
  "website": "https://outgrow.id/",
  "sourceUrl": "https://outgrow.id/service/baby-class-tangerang/",
  "lastCheckedAt": "2026-11-04",
  "fitStatus": "branch-candidate-live-undated",
  "notes": "Official page gives the Alam Sutera address; matches Google Maps. Read 2026-11-04. Core service is play and speech therapy (Maps category Psychotherapist); the group classes are secondary. WhatsApp booking only, by appointment. Rechecked 2026-11-10.",
  "operatingStatus": {
   "state": "official-listed",
   "source": "https://outgrow.id/service/baby-class-tangerang/",
   "checkedAt": "2026-11-04"
  },
  "reviews": {
   "rating": 5.0,
   "reviewCount": 68,
   "source": "Google Maps",
   "sourceUrl": "https://www.google.com/maps/place/OUTGROW+(Play+Therapy+%26+Tumbuh+Kembang+Anak)/@-6.2264756,106.6603045,17z/data=!3m1!4b1!4m6!3m5!1s0x2e69fbd336c1949f:0x62823beea4bb752a!8m2!3d-6.2264756!4d106.6603045!16s%2Fg%2F11pw8tnjdn",
   "checkedAt": "2026-11-04",
   "praiseThemes": [],
   "complaintThemes": [],
   "sampleNote": "41 newest Google Maps reviews read 2026-11-10: all 5-star, mostly therapy and play-class feedback, no concerns found. Not a safety guarantee."
  },
  "phone": "+62 858-1131-4588"
 },
 {
  "id": "gymnademics-gading-serpong",
  "chain": "GymnAdemics",
  "branchName": "Gading Serpong",
  "categories": [
   "Gym & Movement",
   "Sensory"
  ],
  "address": "Jl. Raya KH. Musa, Pakulonan Barat, Kecamatan Kelapa Dua, Kabupaten Tangerang, Banten 15810, Indonesia",
  "area": "Tangerang",
  "city": "Kabupaten Tangerang",
  "lat": -6.2407277,
  "lng": 106.6345406,
  "coordinateSource": "maps-pin",
  "programs": [
   {
    "name": "Orange Class (Baby)",
    "offering": "offered",
    "age": {
     "minMonths": 3,
     "maxMonths": null,
     "level": "branch",
     "verification": "provider-confirmed",
     "sourceCheckedAt": "2026-11-04",
     "providerAgeUrl": "https://gymnademics.id/id/"
    },
    "note": "Official site: baby class of 75 minutes from 3 months. Program range overall 3 months to 6 years."
   }
  ],
  "website": "https://gymnademics.id/id/",
  "sourceUrl": "https://gymnademics.id/id/",
  "lastCheckedAt": "2026-11-04",
  "fitStatus": "branch-candidate-live-undated",
  "notes": "Official site says it is based in Gading Serpong. Google Maps lists it as 'Gymnademics Gading Serpong (Senyum Anak Indonesia)'; the Maps name differs from the brand name. Read 2026-11-04.",
  "operatingStatus": {
   "state": "official-listed",
   "source": "https://gymnademics.id/id/",
   "checkedAt": "2026-11-04"
  },
  "reviews": {
   "rating": 4.7,
   "reviewCount": 16,
   "source": "Google Maps",
   "sourceUrl": "https://www.google.com/maps/place/Senyum+Anak+Indonesia/@-6.2407277,106.6345406,17z/data=!3m1!4b1!4m6!3m5!1s0x2e69fb99442695f1:0xfce223cae56fd1db!8m2!3d-6.2407277!4d106.6345406!16s%2Fg%2F11s2lls5s8",
   "checkedAt": "2026-11-04",
   "praiseThemes": [],
   "complaintThemes": []
  },
  "branchAge": {
   "minMonths": 3,
   "maxMonths": 72,
   "level": "branch",
   "verification": "provider-confirmed",
   "sourceCheckedAt": "2026-11-04",
   "providerAgeUrl": "https://gymnademics.id/id/"
  },
  "phone": "+62 838-8050-077"
 },
 {
  "id": "membumi-playspace-cibubur",
  "chain": "Membumi Playspace",
  "branchName": "Cibubur",
  "categories": [
   "Sensory"
  ],
  "address": "Jl. Jambore No.91, RT.6/RW.13, Cibubur, Kec. Ciracas, Kota Jakarta Timur, Daerah Khusus Ibukota Jakarta 13720, Indonesia",
  "area": "Jakarta Timur",
  "city": "Jakarta Timur",
  "lat": -6.3620035,
  "lng": 106.8878611,
  "coordinateSource": "maps-pin",
  "programs": [
   {
    "name": "GYM Bayi",
    "offering": "offered",
    "age": {
     "minMonths": 8,
     "maxMonths": 19,
     "level": "branch",
     "verification": "listed-unconfirmed",
     "sourceCheckedAt": "2026-11-05",
     "providerAgeUrl": "https://take.app/membumiplayspace/p/cmubzi8r500000agm1cqjrjxi",
     "sourceConflict": true
    },
    "note": "Product title and description say 8-19 bulan; the current November 2026 Cibubur timetable says Gym Bayi 8-18 bulan. Conflicting upper bounds: not confirmed. Product thumbnail is an older 2-5-year Gym Class poster.",
    "noteUrl": "https://cdn3.take.app/media/cmvnxk8dp000309l24yqmhues.jpg?width=3840",
    "noteLabel": "November timetable"
   },
   {
    "name": "Musik & Cerita Bayi",
    "offering": "offered",
    "age": {
     "minMonths": 6,
     "maxMonths": 18,
     "level": "branch",
     "verification": "provider-confirmed",
     "sourceCheckedAt": "2026-11-05",
     "providerAgeUrl": "https://take.app/membumiplayspace/p/cmubzqw7c000004l1u39w27qy"
    },
    "term": "November 2026",
    "note": "Cibubur storefront product and November timetable both state Musik & Cerita Bayi 6-18 bulan. This is a named class, not a membership age band.",
    "noteUrl": "https://cdn3.take.app/media/cmvnxk8du000208js0nlk8699.jpg?width=3840",
    "noteLabel": "November timetable"
   }
  ],
  "website": "https://membumiplayspace.com/",
  "sourceUrl": "https://membumiplayspace.com/",
  "lastCheckedAt": "2026-11-05",
  "fitStatus": "branch-confirmed-dated-term",
  "notes": "Official Cibubur storefront and November 2026 timetable confirm Musik & Cerita Bayi 6-18 months. GYM Bayi stays unconfirmed because product 8-19 and timetable 8-18 conflict. Other year-based classes and membership age bands are not imported. Existing Maps address, coordinates and review snapshot unchanged.",
  "operatingStatus": {
   "state": "official-listed",
   "source": "https://membumiplayspace.com/",
   "checkedAt": "2026-11-04"
  },
  "reviews": {
   "rating": 4.5,
   "reviewCount": 32,
   "source": "Google Maps",
   "sourceUrl": "https://www.google.com/maps/place/Membumi+Playspace/@-6.3620035,106.8878611,17z/data=!3m1!4b1!4m6!3m5!1s0x2e69ed28f979424b:0x412d9eb486cc6424!8m2!3d-6.3620035!4d106.8878611!16s%2Fg%2F11vb6g2r5n",
   "checkedAt": "2026-11-04",
   "praiseThemes": [],
   "complaintThemes": []
  },
  "phone": "+62 852-1954-2487"
 },
 {
 "id": "buumi-playscape-pacific-place",
 "chain": "Buumi Playscape",
 "branchName": "Pacific Place",
 "categories": [
  "Enrichment",
  "Music",
  "Arts & Crafts"
 ],
 "address": "Pacific Place Mall, SCBD, Jl. Jend. Sudirman kav 52-53 Level 3 Unit 98, RT.5/RW.3, Senayan, Kec. Kby. Baru, Kota Jakarta Selatan, Daerah Khusus Ibukota Jakarta 12190, Indonesia",
 "area": "Jakarta Selatan",
 "city": "Jakarta Selatan",
 "lat": -6.2250832,
 "lng": 106.810005,
 "coordinateSource": "maps-pin",
 "programs": [
  {
   "name": "Playscape",
   "offering": "offered",
   "age": {
    "minMonths": 18,
    "maxMonths": 36,
    "level": "brand",
    "verification": "listed-unconfirmed",
    "sourceCheckedAt": "2026-11-04",
    "providerAgeUrl": "https://temanautis.com/acara/holiday-programs-for-toddlers-18m-3y-and-preschoolers-3y-5y"
   },
   "note": "Third-party event listing: holiday programme for toddlers 18 months to 3 years, with Buumi Playscape Pacific Place as a venue."
  },
  {
   "name": "Baby Maestro",
   "category": "Music",
   "offering": "offered",
   "age": {
    "minMonths": 6,
    "maxMonths": 18,
    "level": "branch",
    "verification": "provider-confirmed",
    "providerAgeUrl": "https://www.instagram.com/buumiplayscape/p/DfRG1cZE96X/",
    "sourceCheckedAt": "2026-11-05"
   },
   "term": "November 2026",
   "note": "Official November 2026 branch carousel, slide 3: 6M - 18M. Routine class, not playground admission. Recheck with branch after this term."
  },
  {
   "name": "Baby Art & Craft",
   "category": "Arts & Crafts",
   "offering": "offered",
   "age": {
    "minMonths": 6,
    "maxMonths": 18,
    "level": "branch",
    "verification": "provider-confirmed",
    "providerAgeUrl": "https://www.instagram.com/buumiplayscape/p/DfRG1cZE96X/",
    "sourceCheckedAt": "2026-11-05"
   },
   "term": "November 2026",
   "note": "Official November 2026 branch carousel, slide 4: 6M - 18M. Routine class, not playground admission. Recheck with branch after this term."
  }
 ],
 "website": "https://www.buumi.co/",
 "sourceUrl": "https://www.buumi.co/",
 "lastCheckedAt": "2026-11-05",
 "fitStatus": "branch-confirmed-dated-term",
 "notes": "Official November 2026 Pacific Place class carousel confirms Baby Maestro and Baby Art & Craft, each 6-18 months. Older third-party holiday lead is retained unconfirmed.",
 "operatingStatus": {
  "state": "official-listed",
  "source": "https://www.buumi.co/",
  "checkedAt": "2026-11-05"
 },
 "reviews": {
  "rating": 4.4,
  "reviewCount": 448,
  "source": "Google Maps",
  "sourceUrl": "https://www.google.com/maps/place/Buumi+Playscape/@-6.2250832,106.810005,17z/data=!3m1!4b1!4m6!3m5!1s0x2e69f1230ab5d709:0x9ccf3ac2265d1889!8m2!3d-6.2250832!4d106.810005!16s%2Fg%2F11f5v51n9_",
  "checkedAt": "2026-11-04",
  "praiseThemes": [],
  "complaintThemes": []
 },
 "phone": "+62 21 51400557"
},
 {
 "id": "buumi-playscape-plaza-senayan",
 "chain": "Buumi Playscape",
 "branchName": "Plaza Senayan",
 "categories": [
  "Music",
  "Sensory"
 ],
 "address": "Plaza Senayan, Level 3, Plaza Senayan Mall, RT.1/RW.3, Gelora, Tanah Abang, Central Jakarta City, Jakarta 10270, Indonesia",
 "area": "Jakarta Pusat",
 "city": "Jakarta Pusat",
 "lat": -6.2256049,
 "lng": 106.7992178,
 "coordinateSource": "maps-pin",
 "programs": [
  {
   "name": "Baby Musical Storytelling",
   "category": "Music",
   "offering": "offered",
   "age": {
    "minMonths": 6,
    "maxMonths": 18,
    "level": "branch",
    "verification": "provider-confirmed",
    "providerAgeUrl": "https://www.instagram.com/buumiplayscape/p/DfRULlqk2oI/",
    "sourceCheckedAt": "2026-11-05"
   },
   "term": "November 2026",
   "note": "Official November 2026 branch carousel, slide 4: 6M - 18M. Routine class, not playground admission. Recheck with branch after this term."
  },
  {
   "name": "Baby Sensory Class",
   "category": "Sensory",
   "offering": "offered",
   "age": {
    "minMonths": 6,
    "maxMonths": 18,
    "level": "branch",
    "verification": "provider-confirmed",
    "providerAgeUrl": "https://www.instagram.com/buumiplayscape/p/DfRULlqk2oI/",
    "sourceCheckedAt": "2026-11-05"
   },
   "term": "November 2026",
   "note": "Official November 2026 branch carousel, slide 5: 6M - 18M. Routine class, not playground admission. Recheck with branch after this term."
  }
 ],
 "website": "https://www.buumi.co/",
 "instagram": "https://www.instagram.com/buumiplayscape/",
 "sourceUrl": "https://www.instagram.com/buumiplayscape/p/DfRULlqk2oI/",
 "lastCheckedAt": "2026-11-05",
 "fitStatus": "branch-confirmed-dated-term",
 "notes": "Official November 2026 branch carousel and Buumi site list this branch. Only routine baby sessions with exact 6-18-month ages are confirmed. Other age groups and November pop-ups are not imported.",
 "operatingStatus": {
  "state": "official-listed",
  "source": "https://www.buumi.co/",
  "checkedAt": "2026-11-05"
 },
 "reviews": {
  "rating": 4.8,
  "reviewCount": 511,
  "source": "Google Maps",
  "sourceUrl": "https://www.google.com/maps/search/?api=1&query=Buumi+Playscape+Plaza+Senayan&query_place_id=ChIJ4yZe3RjxaS4Rl_RYEj8baBg",
  "checkedAt": "2026-11-05",
  "praiseThemes": [],
  "complaintThemes": [],
    "trend": "insufficient"
 }
},
 {
 "id": "buumi-playscape-urban-forest-cipete",
 "chain": "Playclub by Buumi",
 "branchName": "Urban Forest Cipete",
 "categories": [
  "Sensory"
 ],
 "address": "Urban Forest, Ground & Level 1, Jl. RS. Fatmawati Raya No.45, RT.10/RW.11, Cilandak Bar., Kec. Cilandak, Kota Jakarta Selatan, Daerah Khusus Ibukota Jakarta 12430, Indonesia",
 "area": "Jakarta Selatan",
 "city": "Jakarta Selatan",
 "lat": -6.2800664,
 "lng": 106.7976344,
 "coordinateSource": "maps-pin",
 "programs": [
  {
   "name": "Baby & Toddler Sensory (baby session)",
   "category": "Sensory",
   "offering": "offered",
   "age": {
    "minMonths": 6,
    "maxMonths": 18,
    "level": "branch",
    "verification": "provider-confirmed",
    "providerAgeUrl": "https://www.instagram.com/buumiplayscape/p/DfRUVRaE6t8/",
    "sourceCheckedAt": "2026-11-05"
   },
   "term": "November 2026",
   "note": "Official November 2026 branch carousel, slide 4: 6M - 18M. Routine class, not playground admission. Recheck with branch after this term."
  }
 ],
 "website": "https://www.buumi.co/",
 "instagram": "https://www.instagram.com/buumiplayscape/",
 "sourceUrl": "https://www.instagram.com/buumiplayscape/p/DfRUVRaE6t8/",
 "lastCheckedAt": "2026-11-05",
 "fitStatus": "branch-confirmed-dated-term",
 "notes": "Official November 2026 branch carousel and Buumi site list this branch. Only routine baby sessions with exact 6-18-month ages are confirmed. Other age groups and November pop-ups are not imported.",
 "operatingStatus": {
  "state": "official-listed",
  "source": "https://www.buumi.co/",
  "checkedAt": "2026-11-05"
 },
 "reviews": {
  "rating": 4.5,
  "reviewCount": 289,
  "source": "Google Maps",
  "sourceUrl": "https://www.google.com/maps/search/?api=1&query=Playclub+by+Buumi+Urban+Forest&query_place_id=ChIJOeYqip_xaS4R7aHYvcM8Aq0",
  "checkedAt": "2026-11-05",
  "praiseThemes": [],
  "complaintThemes": [],
    "trend": "insufficient"
 }
},
 {
  "id": "aquatic-baby-bintaro",
  "chain": "Aquatic Baby",
  "branchName": "Bintaro Sektor 5",
  "categories": [
   "Swim"
  ],
  "address": "Jl. Pisok XXII No.17, Pd. Ranji, Kec. Ciputat Tim., Kota Tangerang Selatan, Banten 15412, Indonesia",
  "area": "Tangerang Selatan",
  "city": "Tangerang Selatan",
  "lat": -6.2741447,
  "lng": 106.7311175,
  "coordinateSource": "maps-pin",
  "programs": [
   {
    "name": "Baby Class",
    "offering": "offered",
    "age": {
     "minMonths": 6,
     "maxMonths": 24,
     "level": "brand",
     "verification": "provider-confirmed",
     "sourceCheckedAt": "2026-11-04",
     "providerAgeUrl": "https://aquatic-baby.com/program-1",
     "sourceConflict": true
    },
    "note": "Brand program page summary: 6 bulan - 2 tahun; the class detail text says 3 bulan hingga 2 tahun. The more restrictive summary bounds are used."
   },
   {
    "name": "Toddler Class",
    "offering": "offered",
    "age": {
     "minMonths": 36,
     "maxMonths": 59,
     "level": "brand",
     "verification": "provider-confirmed",
     "sourceCheckedAt": "2026-11-04",
     "providerAgeUrl": "https://aquatic-baby.com/program-1"
    },
    "note": "Brand page: toddlers 3-4 years."
   }
  ],
  "website": "https://aquatic-baby.com/",
  "sourceUrl": "https://aquatic-baby.com/lokasi",
  "lastCheckedAt": "2026-11-04",
  "fitStatus": "branch-candidate-live-undated",
  "notes": "Official location page lists this address (the first and central pool). The site lists about 8 partner pools; they are not added because they were not verified. Read 2026-11-04.",
  "operatingStatus": {
   "state": "official-listed",
   "source": "https://aquatic-baby.com/lokasi",
   "checkedAt": "2026-11-04"
  },
  "reviews": {
   "rating": 4.9,
   "reviewCount": 69,
   "source": "Google Maps",
   "sourceUrl": "https://www.google.com/maps/place/Aquatic+Baby+Bintaro/@-6.2741447,106.7311175,17z/data=!3m1!4b1!4m6!3m5!1s0x2e69f0711e60bffb:0xe4975912492d2418!8m2!3d-6.2741447!4d106.7311175!16s%2Fg%2F11f3z9qp_z",
   "checkedAt": "2026-11-04",
   "praiseThemes": [],
   "complaintThemes": []
  }
 },
 {
  "id": "bloom-space-kota-wisata",
  "chain": "Bloom Space",
  "branchName": "Kota Wisata",
  "categories": [
   "Gym & Movement"
  ],
  "address": "Cluster Virginia 2nd floor, Jl. Boulevard Kota Wisata, Ciangsana, Kec. Gn. Putri, Kabupaten Bogor, Jawa Barat 16968",
  "area": "Bogor",
  "city": "Kabupaten Bogor",
  "lat": -6.3669222,
  "lng": 106.9612675,
  "coordinateSource": "maps-pin",
  "programs": [
   {
    "name": "Seedlings",
    "offering": "offered",
    "age": {
     "minMonths": 6,
     "maxMonths": 11,
     "level": "branch",
     "verification": "provider-confirmed",
     "sourceCheckedAt": "2026-11-04",
     "providerAgeUrl": "https://bloomspace.id/baby-gym"
    },
    "note": "Official baby gym page: 6-11 months."
   },
   {
    "name": "Little Sprouts",
    "offering": "offered",
    "age": {
     "minMonths": 12,
     "maxMonths": 19,
     "level": "branch",
     "verification": "provider-confirmed",
     "sourceCheckedAt": "2026-11-04",
     "providerAgeUrl": "https://bloomspace.id/baby-gym"
    },
    "note": "Official baby gym page: 12-19 months."
   },
   {
    "name": "Growing Explorer",
    "offering": "offered",
    "age": {
     "minMonths": 19,
     "maxMonths": 36,
     "level": "branch",
     "verification": "provider-confirmed",
     "sourceCheckedAt": "2026-11-04",
     "providerAgeUrl": "https://bloomspace.id/baby-gym"
    },
    "note": "Official baby gym page: 19 months to 3 years."
   }
  ],
  "website": "https://bloomspace.id/",
  "sourceUrl": "https://bloomspace.id/baby-gym",
  "lastCheckedAt": "2026-11-04",
  "fitStatus": "branch-candidate-live-undated",
  "notes": "Official contact page gives the Cluster Virginia address; the Maps listing has only 2 reviews and the Maps address line was not captured, so the pin is the Maps place pin only. Site is undated; read 2026-11-04.",
  "operatingStatus": {
   "state": "official-listed",
   "source": "https://bloomspace.id/our-contact",
   "checkedAt": "2026-11-04"
  },
  "reviews": {
   "rating": 5.0,
   "reviewCount": 2,
   "source": "Google Maps",
   "sourceUrl": "https://www.google.com/maps/place/Bloom+Space+Kota+Wisata/@-6.3669222,106.9612675,17z/data=!3m1!4b1!4m6!3m5!1s0x2e699300647d1629:0x79ed14690dded393!8m2!3d-6.3669222!4d106.9612675!16s%2Fg%2F11zb1x46df",
   "checkedAt": "2026-11-04",
   "praiseThemes": [],
   "complaintThemes": []
  }
 },
 {
  "id": "english-1-kemang-pratama",
  "chain": "English 1",
  "branchName": "Kemang Pratama",
  "categories": [
   "English & Language"
  ],
  "address": "Ruko Kemang Pratama, Jl. Kemang Pratama Raya Blok AN-40, RT.004/RW.001, Bojong Rawalumbu, Kec. Rawalumbu, Kota Bekasi, Jawa Barat 17116, Indonesia",
  "area": "Bekasi",
  "city": "Bekasi",
  "lat": -6.2780754,
  "lng": 106.990472,
  "coordinateSource": "maps-pin",
  "programs": [],
  "website": "https://english1.co.id/",
  "sourceUrl": "https://english1.co.id/",
  "lastCheckedAt": "2026-11-05",
  "fitStatus": "official-chain-program",
  "notes": "Official FAQ: ages 3 to 18; Small Stars program ages 3-6.",
  "operatingStatus": {
   "state": "official-listed",
   "source": "https://english1.co.id/school/bekasi/",
   "checkedAt": "2026-11-05"
  },
  "reviews": {
   "rating": 4.8,
   "reviewCount": 60,
   "source": "Google Maps",
   "sourceUrl": "https://www.google.com/maps/place/EF+English+Course/@-6.2780754,106.990472,17z/data=!3m1!4b1!4m6!3m5!1s0x2e698debc5399373:0x3279766bee61e48e!8m2!3d-6.2780754!4d106.990472!16s%2Fg%2F1tftnhq9?entry=ttu&g_ep=EgoyMDI2MTEwMS4wIKXMDSoASAFQAw%3D%3D",
   "checkedAt": "2026-11-05",
   "praiseThemes": [],
   "complaintThemes": []
  }
 },
 {
  "id": "english-1-harapan-indah",
  "chain": "English 1",
  "branchName": "Kota Harapan Indah",
  "categories": [
   "English & Language"
  ],
  "address": "Komplek Sentra Niaga, Jl. Boulevard Hijau Raya No.Kav. 37 - 38, RT.008/RW.030, Pejuang, Kec. Medan Satria, Kota Bekasi, Jawa Barat 17132, Indonesia",
  "area": "Bekasi",
  "city": "Bekasi",
  "lat": -6.1858359,
  "lng": 106.9787145,
  "coordinateSource": "maps-pin",
  "programs": [],
  "website": "https://english1.co.id/",
  "sourceUrl": "https://english1.co.id/",
  "lastCheckedAt": "2026-11-05",
  "fitStatus": "official-chain-program",
  "notes": "Official FAQ: ages 3 to 18; Small Stars program ages 3-6.",
  "operatingStatus": {
   "state": "official-listed",
   "source": "https://english1.co.id/school/bekasi/",
   "checkedAt": "2026-11-05"
  },
  "reviews": {
   "rating": 4.7,
   "reviewCount": 172,
   "source": "Google Maps",
   "sourceUrl": "https://www.google.com/maps/place/English+1+Kota+Harapan+Indah+Bekasi/@-6.1837941,106.9787678,17z/data=!4m10!1m2!2m1!1sEnglish+1+Harapan+Indah+Bekasi!3m6!1s0x2e698b9669f9cdff:0xb7794a6f37ac5c53!8m2!3d-6.1858359!4d106.9787145!15sCh5FbmdsaXNoIDEgSGFyYXBhbiBJbmRhaCBCZWthc2laICIeZW5nbGlzaCAxIGhhcmFwYW4gaW5kYWggYmVrYXNpkgEXZW5nbGlzaF9sYW5ndWFnZV9zY2hvb2yaAURDaTlEUVVsUlFVTnZaRU5vZEhsalJqbHZUMnR3VDFkR09WZFhWRUp2VjJ0S2NVNXJjRVpYVlVweFRXNU9NMlF6WXhBQuABAPoBBAgAEEU!16s%2Fg%2F1q5grpkjv?entry=ttu&g_ep=EgoyMDI2MTEwMS4wIKXMDSoASAFQAw%3D%3D",
   "checkedAt": "2026-11-05",
   "praiseThemes": [],
   "complaintThemes": []
  }
 },
 {
  "id": "english-1-jatiasih",
  "chain": "English 1",
  "branchName": "Jatiasih",
  "categories": [
   "English & Language"
  ],
  "address": "Jl. Raya Jatimekar, RT.001/RW.012, Jatimekar, Kec. Jatiasih, Kota Bekasi, Jawa Barat 17422, Indonesia",
  "area": "Bekasi",
  "city": "Bekasi",
  "lat": -6.2913663,
  "lng": 106.9559182,
  "coordinateSource": "maps-pin",
  "programs": [],
  "website": "https://english1.co.id/",
  "sourceUrl": "https://english1.co.id/",
  "lastCheckedAt": "2026-11-05",
  "fitStatus": "official-chain-program",
  "notes": "Official FAQ: ages 3 to 18; Small Stars program ages 3-6.",
  "operatingStatus": {
   "state": "official-listed",
   "source": "https://english1.co.id/school/bekasi/",
   "checkedAt": "2026-11-05"
  },
  "reviews": {
   "rating": 4.5,
   "reviewCount": 43,
   "source": "Google Maps",
   "sourceUrl": "https://www.google.com/maps/place/English+1+Jatiasih+Bekasi,+Jl.+Raya+Jatimekar,+RT.001%2FRW.012,+Jatimekar,+Jatiasih,+Bekasi,+West+Java+17422,+Indonesia/@-6.2913663,106.9559182,15z/data=!4m6!3m5!1s0x2e698d17fb5757f3:0xc55bd4a73f0e2493!8m2!3d-6.2913663!4d106.9559182!16s%2Fg%2F11x5f1z6yk?g_ep=Eg1tbF8yMDI2MTEwMV8wIJvbDyoASAJQAg%3D%3D",
   "checkedAt": "2026-11-05",
   "praiseThemes": [],
   "complaintThemes": []
  }
 },
 {
  "id": "english-1-cibubur",
  "chain": "English 1",
  "branchName": "Cibubur Citra Gran",
  "categories": [
   "English & Language"
  ],
  "address": "Komplek Ruko Jimbaran Citra Gran, Jl. Alternatif Cibubur No.KM 4 Blok R1 No. 27, RT.005/RW.011, Jatikarya, Kec. Jatisampurna, Kota Bekasi, Jawa Barat 17435, Indonesia",
  "area": "Bekasi",
  "city": "Bekasi",
  "lat": -6.3825136,
  "lng": 106.9276917,
  "coordinateSource": "maps-pin",
  "programs": [],
  "website": "https://english1.co.id/",
  "sourceUrl": "https://english1.co.id/",
  "lastCheckedAt": "2026-11-05",
  "fitStatus": "official-chain-program",
  "notes": "Official FAQ: ages 3 to 18; Small Stars program ages 3-6.",
  "operatingStatus": {
   "state": "official-listed",
   "source": "https://english1.co.id/school/bekasi/",
   "checkedAt": "2026-11-05"
  },
  "reviews": {
   "rating": 4.9,
   "reviewCount": 129,
   "source": "Google Maps",
   "sourceUrl": "https://www.google.com/maps/place/English+1+Cibubur+Bekasi/@-6.3824873,106.9280143,17z/data=!4m10!1m2!2m1!1sEnglish+1+Cibubur+Citra+Gran!3m6!1s0x2e699355c020a497:0x5ee5d3fad63e3f49!8m2!3d-6.3825136!4d106.9276917!15sChxFbmdsaXNoIDEgQ2lidWJ1ciBDaXRyYSBHcmFuWh4iHGVuZ2xpc2ggMSBjaWJ1YnVyIGNpdHJhIGdyYW6SARdlbmdsaXNoX2xhbmd1YWdlX3NjaG9vbJoBRENpOURRVWxSUVVOdlpFTm9kSGxqUmpsdlQyczVhbGxxUWxGVFZsSnhXVmQ0VDJOSFVrSk5lbHAyVm01U1RGSldSUkFC4AEA-gEECAAQMA!16s%2Fg%2F1tp8ftf0?entry=ttu&g_ep=EgoyMDI2MTEwMS4wIKXMDSoASAFQAw%3D%3D",
   "checkedAt": "2026-11-05",
   "praiseThemes": [],
   "complaintThemes": []
  }
 },
 {
  "id": "english-1-grand-wisata",
  "chain": "English 1",
  "branchName": "Grand Wisata",
  "categories": [
   "English & Language"
  ],
  "address": "Ruko Festive Garden, Jl. Festival Avenue, Grand Wisata Blok AA16 No.78-80, Lambang Sari, Kec. Tambun Selatan, Kabupaten Bekasi, Jawa Barat 17510, Indonesia",
  "area": "Kabupaten Bekasi",
  "city": "Kabupaten Bekasi",
  "lat": -6.2800772,
  "lng": 107.0448698,
  "coordinateSource": "maps-pin",
  "programs": [],
  "website": "https://english1.co.id/",
  "sourceUrl": "https://english1.co.id/",
  "lastCheckedAt": "2026-11-05",
  "fitStatus": "official-chain-program",
  "notes": "Official FAQ: ages 3 to 18; Small Stars program ages 3-6.",
  "operatingStatus": {
   "state": "official-listed",
   "source": "https://english1.co.id/school/bekasi/",
   "checkedAt": "2026-11-05"
  },
  "reviews": {
   "rating": 4.8,
   "reviewCount": 60,
   "source": "Google Maps",
   "sourceUrl": "https://www.google.com/maps/place/English+1+Grand+Wisata+Bekasi/@-6.2815704,107.0446781,18z/data=!4m10!1m2!2m1!1sEnglish+1+Grand+Wisata+Bekasi!3m6!1s0x2e698e304a2ab5ad:0xaadc63bedc8a43bb!8m2!3d-6.2800772!4d107.0448698!15sCh1FbmdsaXNoIDEgR3JhbmQgV2lzYXRhIEJla2FzaVofIh1lbmdsaXNoIDEgZ3JhbmQgd2lzYXRhIGJla2FzaZIBF2VuZ2xpc2hfbGFuZ3VhZ2Vfc2Nob29smgEkQ2hkRFNVaE5NRzluUzBWSlEwRm5TVU5pZVRaUVdqaG5SUkFC4AEA-gEECAAQRQ!16s%2Fg%2F11c72nhwm4?entry=ttu&g_ep=EgoyMDI2MTEwMS4wIKXMDSoASAFQAw%3D%3D",
   "checkedAt": "2026-11-05",
   "praiseThemes": [],
   "complaintThemes": []
  }
 },
 {
  "id": "english-1-summarecon",
  "chain": "English 1",
  "branchName": "Summarecon Bekasi",
  "categories": [
   "English & Language"
  ],
  "address": "Komplek Ruko Emerald Commercial, Jl. Bulevar Selatan Blok UE No.03, RT.004/RW.011, Marga Mulya, Kec. Bekasi Utara, Kota Bekasi, Jawa Barat 17142, Indonesia",
  "area": "Bekasi",
  "city": "Bekasi",
  "lat": -6.2280612,
  "lng": 107.0029954,
  "coordinateSource": "maps-pin",
  "programs": [],
  "website": "https://english1.co.id/",
  "sourceUrl": "https://english1.co.id/",
  "lastCheckedAt": "2026-11-05",
  "fitStatus": "official-chain-program",
  "notes": "Official FAQ: ages 3 to 18; Small Stars program ages 3-6.",
  "operatingStatus": {
   "state": "official-listed",
   "source": "https://english1.co.id/school/bekasi/",
   "checkedAt": "2026-11-05"
  },
  "reviews": {
   "rating": 4.8,
   "reviewCount": 146,
   "source": "Google Maps",
   "sourceUrl": "https://www.google.com/maps/place/English+1+Summarecon+Bekasi,+Komplek+Ruko,+Jl.+Bulevar+Selatan+No.03+Blok+UE,+RT.004%2FRW.011,+Marga+Mulya,+Bekasi+Utara,+Bekasi,+West+Java+17142,+Indonesia/@-6.3052874,106.9862808,10z/data=!4m9!1m2!2m1!1sEnglish+1+Bekasi!3m5!1s0x2e698c1e646f692f:0x3e8bdbd9ca9ef2b3!8m2!3d-6.2280612!4d107.0029954!16s%2Fg%2F11bz09r4ll?g_ep=Eg1tbF8yMDI2MTEwMV8wIJvbDyoASAJQAg%3D%3D",
   "checkedAt": "2026-11-05",
   "praiseThemes": [],
   "complaintThemes": []
  }
 },
 {
  "id": "english-1-cikarang",
  "chain": "English 1",
  "branchName": "Cikarang",
  "categories": [
   "English & Language"
  ],
  "address": "Ruko Union, Jl. M.H. Thamrin No.2, Cibatu, Kec. Cikarang Selatan, Kabupaten Bekasi, Jawa Barat 17530, Indonesia",
  "area": "Kabupaten Bekasi",
  "city": "Kabupaten Bekasi",
  "lat": -6.3309449,
  "lng": 107.1323712,
  "coordinateSource": "maps-pin",
  "programs": [],
  "website": "https://english1.co.id/",
  "sourceUrl": "https://english1.co.id/",
  "lastCheckedAt": "2026-11-05",
  "fitStatus": "official-chain-program",
  "notes": "Official FAQ: ages 3 to 18; Small Stars program ages 3-6.",
  "operatingStatus": {
   "state": "official-listed",
   "source": "https://english1.co.id/school/bekasi/",
   "checkedAt": "2026-11-05"
  },
  "reviews": {
   "rating": 4.7,
   "reviewCount": 67,
   "source": "Google Maps",
   "sourceUrl": "https://www.google.com/maps/place/English+1+Cikarang+Bekasi/@-6.3309449,107.0942624,14z/data=!4m10!1m2!2m1!1sEnglish+1+Cikarang+Bekasi!3m6!1s0x2e699b528b359197:0x99b408428f7363fa!8m2!3d-6.3309449!4d107.1323712!15sChlFbmdsaXNoIDEgQ2lrYXJhbmcgQmVrYXNpWhsiGWVuZ2xpc2ggMSBjaWthcmFuZyBiZWthc2mSARdlbmdsaXNoX2xhbmd1YWdlX3NjaG9vbJoBRENpOURRVWxSUVVOdlpFTm9kSGxqUmpsdlQyMWtUbFV4V2sxWU1VcGhXV3BPYmxJd1VrOVphMW93Vm01a1VGcFdSUkFC4AEA-gEFCPYBED0!16s%2Fg%2F1thpz3_5?entry=ttu&g_ep=EgoyMDI2MTEwMS4wIKXMDSoASAFQAw%3D%3D",
   "checkedAt": "2026-11-05",
   "praiseThemes": [],
   "complaintThemes": []
  }
 },
 {
  "id": "english-1-margonda-depok",
  "chain": "English 1",
  "branchName": "Margonda Depok",
  "categories": [
   "English & Language"
  ],
  "address": "Komplek Ruko ITC Depok No. 26-28, Jl. Margonda Raya No.56, Depok, Kec. Pancoran Mas, Kota Depok, Jawa Barat 16431, Indonesia",
  "area": "Depok",
  "city": "Depok",
  "lat": -6.3929336,
  "lng": 106.8225192,
  "coordinateSource": "maps-pin",
  "programs": [],
  "website": "https://english1.co.id/",
  "sourceUrl": "https://english1.co.id/",
  "lastCheckedAt": "2026-11-05",
  "fitStatus": "official-chain-program",
  "notes": "Official FAQ: ages 3 to 18; Small Stars program ages 3-6.",
  "operatingStatus": {
   "state": "official-listed",
   "source": "https://english1.co.id/school/depok/",
   "checkedAt": "2026-11-05"
  },
  "reviews": {
   "rating": 4.5,
   "reviewCount": 136,
   "source": "Google Maps",
   "sourceUrl": "https://www.google.com/maps/place/English+1+Margonda+Depok/@-6.3929336,106.8177556,17z/data=!3m1!5s0x2e69ebe4aea13327:0x9df134ec8f1f2b92!4m10!1m2!2m1!1sEnglish+1+Margonda+Depok!3m6!1s0x2e69ebe37869f565:0xdf2fc642537f807c!8m2!3d-6.3929336!4d106.8225192!15sChhFbmdsaXNoIDEgTWFyZ29uZGEgRGVwb2taGiIYZW5nbGlzaCAxIG1hcmdvbmRhIGRlcG9rkgEXZW5nbGlzaF9sYW5ndWFnZV9zY2hvb2yaAURDaTlEUVVsUlFVTnZaRU5vZEhsalJqbHZUMnc1YlZKclRuVk9hMHBKWW1wTk5GUnJkRWhUVkdoVlVrVkdiRTVHUlJBQuABAPoBBAgAEEI!16s%2Fg%2F1tk04vg_?entry=ttu&g_ep=EgoyMDI2MTEwMS4wIKXMDSoASAFQAw%3D%3D",
   "checkedAt": "2026-11-05",
   "praiseThemes": [],
   "complaintThemes": []
  }
 },
 {
  "id": "english-1-pesona-square-depok",
  "chain": "English 1",
  "branchName": "Pesona Square Depok",
  "categories": [
   "English & Language"
  ],
  "address": "Mall Pesona Square Lantai 1 unit 5A-6, Jl. Ir. H. Juanda No.22A, Bakti Jaya, Kec. Sukmajaya, Kota Depok, Jawa Barat 16418, Indonesia",
  "area": "Depok",
  "city": "Depok",
  "lat": -6.3800649,
  "lng": 106.8446874,
  "coordinateSource": "maps-pin",
  "programs": [],
  "website": "https://english1.co.id/",
  "sourceUrl": "https://english1.co.id/",
  "lastCheckedAt": "2026-11-05",
  "fitStatus": "official-chain-program",
  "notes": "Official FAQ: ages 3 to 18; Small Stars program ages 3-6.",
  "operatingStatus": {
   "state": "official-listed",
   "source": "https://english1.co.id/school/depok/",
   "checkedAt": "2026-11-05"
  },
  "reviews": {
   "rating": 5.0,
   "reviewCount": 36,
   "source": "Google Maps",
   "sourceUrl": "https://www.google.com/maps/place/English+1+Pesona+Square+Depok/@-6.3800649,106.8446874,17z/data=!3m1!4b1!4m6!3m5!1s0x2e69ed0720b2493d:0xa0fce2c6ddaa7603!8m2!3d-6.3800649!4d106.8446874!16s%2Fg%2F11vlf4j_mg?entry=ttu&g_ep=EgoyMDI2MTEwMS4wIKXMDSoASAFQAw%3D%3D",
   "checkedAt": "2026-11-05",
   "praiseThemes": [],
   "complaintThemes": []
  }
 },
 {
  "id": "english-1-aeon-sentul",
  "chain": "English 1",
  "branchName": "AEON MALL Sentul City",
  "categories": [
   "English & Language"
  ],
  "address": "AEON MALL Sentul City, Jl. MH. Thamrin Lt. Basement 2, Unit B2-03A, Citaringgul, Kec. Babakan Madang, Kabupaten Bogor, Jawa Barat 16810, Indonesia",
  "area": "Bogor",
  "city": "Bogor",
  "lat": -6.5668777,
  "lng": 106.8589321,
  "coordinateSource": "maps-pin",
  "programs": [],
  "website": "https://english1.co.id/",
  "sourceUrl": "https://english1.co.id/",
  "lastCheckedAt": "2026-11-05",
  "fitStatus": "official-chain-program",
  "notes": "Official FAQ: ages 3 to 18; Small Stars program ages 3-6.",
  "operatingStatus": {
   "state": "official-listed",
   "source": "https://english1.co.id/school/bogor/",
   "checkedAt": "2026-11-05"
  },
  "reviews": {
   "rating": 5.0,
   "reviewCount": 470,
   "source": "Google Maps",
   "sourceUrl": "https://www.google.com/maps/place/English+1+AEON+MALL+Sentul+City+Bogor/@-6.5668777,106.8589321,17z/data=!3m1!4b1!4m6!3m5!1s0x2e69c7fb0b9d9855:0x5be34a1e77771e88!8m2!3d-6.5668777!4d106.8589321!16s%2Fg%2F11y50cgbxd?entry=ttu&g_ep=EgoyMDI2MTEwMS4wIKXMDSoASAFQAw%3D%3D",
   "checkedAt": "2026-11-05",
   "praiseThemes": [],
   "complaintThemes": []
  }
 },
 {
  "id": "english-1-cibinong",
  "chain": "English 1",
  "branchName": "Cibinong City Mall",
  "categories": [
   "English & Language"
  ],
  "address": "Cibinong City Mall Lantai 2 No. A5, Jl. Tegar Beriman No.1, Pakansari, Kec. Cibinong, Kabupaten Bogor, Jawa Barat 16915, Indonesia",
  "area": "Bogor",
  "city": "Bogor",
  "lat": -6.4842002,
  "lng": 106.8423123,
  "coordinateSource": "maps-pin",
  "programs": [],
  "website": "https://english1.co.id/",
  "sourceUrl": "https://english1.co.id/",
  "lastCheckedAt": "2026-11-05",
  "fitStatus": "official-chain-program",
  "notes": "Official FAQ: ages 3 to 18; Small Stars program ages 3-6.",
  "operatingStatus": {
   "state": "official-listed",
   "source": "https://english1.co.id/school/bogor/",
   "checkedAt": "2026-11-05"
  },
  "reviews": {
   "rating": 4.9,
   "reviewCount": 209,
   "source": "Google Maps",
   "sourceUrl": "https://www.google.com/maps/place/English+1+Cibinong+City+Mall+Bogor/@-6.4842002,106.8423123,17z/data=!3m1!4b1!4m6!3m5!1s0x2e69c1120ba9874d:0xd218b8682a0d570a!8m2!3d-6.4842002!4d106.8423123!16s%2Fg%2F11hz0ggddq?entry=ttu&g_ep=EgoyMDI2MTEwMS4wIKXMDSoASAFQAw%3D%3D",
   "checkedAt": "2026-11-05",
   "praiseThemes": [],
   "complaintThemes": []
  }
 },
 {
  "id": "english-1-cileungsi",
  "chain": "English 1",
  "branchName": "Cileungsi",
  "categories": [
   "English & Language"
  ],
  "address": "Jl. Raya Cileungsi-Jonggol KM. 3 No. 23, Cileungsi Kidul, Kec. Cileungsi, Kabupaten Bogor, Jawa Barat 16820, Indonesia",
  "area": "Bogor",
  "city": "Bogor",
  "lat": -6.4097122,
  "lng": 106.9840293,
  "coordinateSource": "maps-pin",
  "programs": [],
  "website": "https://english1.co.id/",
  "sourceUrl": "https://english1.co.id/",
  "lastCheckedAt": "2026-11-05",
  "fitStatus": "official-chain-program",
  "notes": "Official FAQ: ages 3 to 18; Small Stars program ages 3-6.",
  "operatingStatus": {
   "state": "official-listed",
   "source": "https://english1.co.id/school/bogor/",
   "checkedAt": "2026-11-05"
  },
  "reviews": {
   "rating": 4.9,
   "reviewCount": 64,
   "source": "Google Maps",
   "sourceUrl": "https://www.google.com/maps/place/English+1+Cileungsi+Bogor/@-6.4097122,106.9840293,17z/data=!3m1!4b1!4m6!3m5!1s0x2e6997b31a6cf359:0xaa5941d13b782ce0!8m2!3d-6.4097122!4d106.9840293!16s%2Fg%2F11y9pkw7sz?entry=ttu&g_ep=EgoyMDI2MTEwMS4wIKXMDSoASAFQAw%3D%3D",
   "checkedAt": "2026-11-05",
   "praiseThemes": [],
   "complaintThemes": []
  }
 },
 {
  "id": "english-1-kota-wisata",
  "chain": "English 1",
  "branchName": "Kota Wisata",
  "categories": [
   "English & Language"
  ],
  "address": "Zona Somerset Blok N8/15, Kota Wisata, Ciangsana, Kec. Gunung Putri, Kabupaten Bogor, Jawa Barat 16968, Indonesia",
  "area": "Bogor",
  "city": "Kabupaten Bogor",
  "lat": -6.365822,
  "lng": 106.960225,
  "coordinateSource": "maps-pin",
  "programs": [],
  "website": "https://english1.co.id/",
  "sourceUrl": "https://english1.co.id/",
  "lastCheckedAt": "2026-11-05",
  "fitStatus": "official-chain-program",
  "notes": "Official FAQ: ages 3 to 18; Small Stars program ages 3-6.",
  "operatingStatus": {
   "state": "official-listed",
   "source": "https://english1.co.id/school/bogor/",
   "checkedAt": "2026-11-05"
  },
  "reviews": {
   "rating": 4.6,
   "reviewCount": 75,
   "source": "Google Maps",
   "sourceUrl": "https://www.google.com/maps/place/English+1+Kota+Wisata+Bogor/@-6.365822,106.960225,17z/data=!3m1!4b1!4m6!3m5!1s0x2e6993778359e741:0x3eb27a6e7f06b446!8m2!3d-6.365822!4d106.960225!16s%2Fg%2F1td_7gz9?entry=ttu&g_ep=EgoyMDI2MTEwMS4wIKXMDSoASAFQAw%3D%3D",
   "checkedAt": "2026-11-05",
   "praiseThemes": [],
   "complaintThemes": []
  }
 },
 {
  "id": "english-1-pajajaran",
  "chain": "English 1",
  "branchName": "Pajajaran Bogor",
  "categories": [
   "English & Language"
  ],
  "address": "Lippo Plaza Keboen Raya, Jl. Malabar 2 No.17A Lantai LG Blok 30, Babakan, Kec. Bogor Tengah, Kota Bogor, Jawa Barat 16129, Indonesia",
  "area": "Bogor",
  "city": "Bogor",
  "lat": -6.5955832,
  "lng": 106.8049561,
  "coordinateSource": "maps-pin",
  "programs": [],
  "website": "https://english1.co.id/",
  "sourceUrl": "https://english1.co.id/",
  "lastCheckedAt": "2026-11-05",
  "fitStatus": "official-chain-program",
  "notes": "Official FAQ: ages 3 to 18; Small Stars program ages 3-6.",
  "operatingStatus": {
   "state": "official-listed",
   "source": "https://english1.co.id/school/bogor/",
   "checkedAt": "2026-11-05"
  },
  "reviews": {
   "rating": 5.0,
   "reviewCount": 1390,
   "source": "Google Maps",
   "sourceUrl": "https://www.google.com/maps/place/English+1+Pajajaran+Bogor/@-6.5955832,106.8049561,17z/data=!3m1!4b1!4m6!3m5!1s0x2e69c5db2791a755:0x20b4303107e61e66!8m2!3d-6.5955832!4d106.8049561!16s%2Fg%2F1tg97grz?entry=ttu&g_ep=EgoyMDI2MTEwMS4wIKXMDSoASAFQAw%3D%3D",
   "checkedAt": "2026-11-05",
   "praiseThemes": [],
   "complaintThemes": []
  }
 },
 {
  "id": "english-1-taman-yasmin",
  "chain": "English 1",
  "branchName": "Taman Yasmin",
  "categories": [
   "English & Language"
  ],
  "address": "Taman Yasmin, Jl. KH. R. Abdullah Bin Nuh No.33, RT.10/RW.08, Curugmekar, Kec. Bogor Barat, Kota Bogor, Jawa Barat 16113, Indonesia",
  "area": "Bogor",
  "city": "Bogor",
  "lat": -6.5578538,
  "lng": 106.7726247,
  "coordinateSource": "maps-pin",
  "programs": [],
  "website": "https://english1.co.id/",
  "sourceUrl": "https://english1.co.id/",
  "lastCheckedAt": "2026-11-05",
  "fitStatus": "official-chain-program",
  "notes": "Official FAQ: ages 3 to 18; Small Stars program ages 3-6.",
  "operatingStatus": {
   "state": "official-listed",
   "source": "https://english1.co.id/school/bogor/",
   "checkedAt": "2026-11-05"
  },
  "reviews": {
   "rating": 5.0,
   "reviewCount": 1117,
   "source": "Google Maps",
   "sourceUrl": "https://www.google.com/maps/place/English+1+Taman+Yasmin+Bogor/@-6.5578538,106.7726247,17z/data=!3m1!4b1!4m6!3m5!1s0x2e69c462c8d917f5:0xe80ee930c147d74d!8m2!3d-6.5578538!4d106.7726247!16s%2Fg%2F11h0qxfk_?entry=ttu&g_ep=EgoyMDI2MTEwMS4wIKXMDSoASAFQAw%3D%3D",
   "checkedAt": "2026-11-05",
   "praiseThemes": [],
   "complaintThemes": []
  }

 },
 {
  "id": "sparks-swim-karawaci",
  "chain": "Sparks Swim",
  "branchName": "Karawaci",
  "categories": [
   "Swim"
  ],
  "address": "Jl. Palem Semi, RT.001/RW.009, Panunggangan Bar., Kec. Cibodas, Kota Tangerang, Banten 15318, Indonesia",
  "area": "Kota Tangerang",
  "city": "Kota Tangerang",
  "lat": -6.2194107,
  "lng": 106.6166561,
  "coordinateSource": "maps-pin",
  "programs": [],
  "website": "https://sparks-swim.com/",
  "sourceUrl": "https://sparks-swim.com/",
  "lastCheckedAt": "2026-11-05",
  "fitStatus": "official-chain-program",
  "notes": "Official homepage lists this branch and programs by age: 6-18 months, 18 months-3 years, 3-5 years, 5 years plus. Verified live on Maps 2026-11-05.",
  "operatingStatus": {
   "state": "official-listed",
   "source": "https://sparks-swim.com/",
   "checkedAt": "2026-11-05"
  },
  "reviews": {
   "rating": 4.7,
   "reviewCount": 56,
   "source": "Google Maps",
   "sourceUrl": "https://www.google.com/maps/place/Sparks+Swim+-+Karawaci/@-6.2194107,106.6166561,17z/data=!3m1!4b1!4m6!3m5!1s0x2e69ff4c0ff9bae1:0x94315a9b4a208b6!8m2!3d-6.2194107!4d106.6166561!16s%2Fg%2F11n9ckyctn",
   "checkedAt": "2026-11-05",
   "praiseThemes": [],
   "complaintThemes": []
  }
 },
 {
  "id": "sparks-swim-bintaro-utown",
  "chain": "Sparks Swim",
  "branchName": "Bintaro U-Town",
  "categories": [
   "Swim"
  ],
  "address": "Bintaro U-Town Jaya, Jl. Boulevard UPJ No.1, RW.9, Sawah Baru, Kec. Ciputat, Kota Tangerang Selatan, Banten 15413, Indonesia",
  "area": "Tangerang Selatan",
  "city": "Tangerang Selatan",
  "lat": -6.2937336,
  "lng": 106.7261512,
  "coordinateSource": "maps-pin",
  "programs": [],
  "website": "https://sparks-swim.com/",
  "sourceUrl": "https://sparks-swim.com/",
  "lastCheckedAt": "2026-11-05",
  "fitStatus": "official-chain-program",
  "notes": "Official homepage lists this branch and programs by age: 6-18 months, 18 months-3 years, 3-5 years, 5 years plus. Verified live on Maps 2026-11-05.",
  "operatingStatus": {
   "state": "official-listed",
   "source": "https://sparks-swim.com/",
   "checkedAt": "2026-11-05"
  },
  "reviews": {
   "rating": 3.0,
   "reviewCount": 4,
   "source": "Google Maps",
   "sourceUrl": "https://www.google.com/maps/place/Sparks+Swim+-+Bintaro+Utown/@-6.2937336,106.7261512,17z/data=!3m1!4b1!4m6!3m5!1s0x2e69f12fdf19d9a1:0x8b3f30c41ee65ff2!8m2!3d-6.2937336!4d106.7261512!16s%2Fg%2F11zdrv6zzb",
   "checkedAt": "2026-11-05",
   "praiseThemes": [],
   "complaintThemes": []
  }
 },
 {
  "id": "sparks-swim-pamulang",
  "chain": "Sparks Swim",
  "branchName": "Pamulang",
  "categories": [
   "Swim"
  ],
  "address": "Jl. Raya Puspitek, RT.01/RW.03, Babakan, Kec. Setu, Kota Tangerang Selatan, Banten 15315, Indonesia",
  "area": "Tangerang Selatan",
  "city": "Tangerang Selatan",
  "lat": -6.3469778,
  "lng": 106.6963538,
  "coordinateSource": "maps-pin",
  "programs": [],
  "website": "https://sparks-swim.com/",
  "sourceUrl": "https://sparks-swim.com/",
  "lastCheckedAt": "2026-11-05",
  "fitStatus": "official-chain-program",
  "notes": "Official homepage lists this branch and programs by age: 6-18 months, 18 months-3 years, 3-5 years, 5 years plus. Verified live on Maps 2026-11-05.",
  "operatingStatus": {
   "state": "official-listed",
   "source": "https://sparks-swim.com/",
   "checkedAt": "2026-11-05"
  },
  "reviews": {
   "rating": 4.8,
   "reviewCount": 17,
   "source": "Google Maps",
   "sourceUrl": "https://www.google.com/maps/place/Sparks+Swim+-+Pamulang/@-6.3469778,106.6963538,17z/data=!3m1!4b1!4m6!3m5!1s0x2e69e565829d6095:0x35921adb33a36d77!8m2!3d-6.3469778!4d106.6963538!16s%2Fg%2F11zg1bn3s4",
   "checkedAt": "2026-11-05",
   "praiseThemes": [],
   "complaintThemes": []
  }
 },
 {
  "id": "sparks-swim-kalimalang",
  "chain": "Sparks Swim",
  "branchName": "Kalimalang",
  "categories": [
   "Swim"
  ],
  "address": "Jl. Pahlawan Revolusi No.11, RT.3/RW.4, Pd. Bambu, Kec. Duren Sawit, Kota Jakarta Timur, Daerah Khusus Ibukota Jakarta 13430, Indonesia",
  "area": "Jakarta Timur",
  "city": "Jakarta Timur",
  "lat": -6.2394804,
  "lng": 106.8997995,
  "coordinateSource": "maps-pin",
  "programs": [],
  "website": "https://sparks-swim.com/",
  "sourceUrl": "https://sparks-swim.com/",
  "lastCheckedAt": "2026-11-05",
  "fitStatus": "official-chain-program",
  "notes": "Official homepage lists this branch and programs by age: 6-18 months, 18 months-3 years, 3-5 years, 5 years plus. Verified live on Maps 2026-11-05.",
  "operatingStatus": {
   "state": "official-listed",
   "source": "https://sparks-swim.com/",
   "checkedAt": "2026-11-05"
  },
  "reviews": {
   "rating": 4.8,
   "reviewCount": 71,
   "source": "Google Maps",
   "sourceUrl": "https://www.google.com/maps/place/Sparks+Swim+-+Kalimalang/@-6.2394804,106.8997995,17z/data=!3m1!4b1!4m6!3m5!1s0x2e69f3014d7b0341:0xf8167d0de310342f!8m2!3d-6.2394804!4d106.8997995!16s%2Fg%2F11n58692z8",
   "checkedAt": "2026-11-05",
   "praiseThemes": [],
   "complaintThemes": []
  }
 },
 {
  "id": "sparks-swim-harapan-indah",
  "chain": "Sparks Swim",
  "branchName": "Harapan Indah",
  "categories": [
   "Swim"
  ],
  "address": "Mega Office Park, Jl. Harapan Indah Boulevard, RT.005/RW.010, Medan Satria, Kec. Medan Satria, Kota Bekasi, Jawa Barat 17132, Indonesia",
  "area": "Bekasi",
  "city": "Bekasi",
  "lat": -6.179938,
  "lng": 106.9741878,
  "coordinateSource": "maps-pin",
  "programs": [],
  "website": "https://sparks-swim.com/",
  "sourceUrl": "https://sparks-swim.com/",
  "lastCheckedAt": "2026-11-05",
  "fitStatus": "official-chain-program",
  "notes": "Official homepage lists this branch and programs by age: 6-18 months, 18 months-3 years, 3-5 years, 5 years plus. Verified live on Maps 2026-11-05.",
  "operatingStatus": {
   "state": "official-listed",
   "source": "https://sparks-swim.com/",
   "checkedAt": "2026-11-05"
  },
  "reviews": {
   "rating": 3.0,
   "reviewCount": 1,
   "source": "Google Maps",
   "sourceUrl": "https://www.google.com/maps/place/Sparks+Swim+-+Harapan+Indah/@-6.179938,106.9741878,17z/data=!3m1!4b1!4m6!3m5!1s0x2e698b0986af2ab3:0x832de45b05cf8370!8m2!3d-6.179938!4d106.9741878!16s%2Fg%2F11zwpds233",
   "checkedAt": "2026-11-05",
   "praiseThemes": [],
   "complaintThemes": []
  }
 },
 {
  "id": "sparks-swim-taman-palem",
  "chain": "Sparks Swim",
  "branchName": "Taman Palem",
  "categories": [
   "Swim"
  ],
  "address": "Jl. Palem Raja Barat No.10, RT.5/RW.13, Pegadungan, Kec. Kalideres, Kota Jakarta Barat, Daerah Khusus Ibukota Jakarta 11830, Indonesia",
  "area": "Jakarta Barat",
  "city": "Jakarta Barat",
  "lat": -6.1249256,
  "lng": 106.7061354,
  "coordinateSource": "maps-pin",
  "programs": [],
  "website": "https://sparks-swim.com/",
  "sourceUrl": "https://sparks-swim.com/",
  "lastCheckedAt": "2026-11-05",
  "fitStatus": "official-chain-program",
  "notes": "Official homepage lists this branch and programs by age: 6-18 months, 18 months-3 years, 3-5 years, 5 years plus. Verified live on Maps 2026-11-05.",
  "operatingStatus": {
   "state": "official-listed",
   "source": "https://sparks-swim.com/",
   "checkedAt": "2026-11-05"
  },
  "reviews": {
   "rating": 5.0,
   "reviewCount": 7,
   "source": "Google Maps",
   "sourceUrl": "https://www.google.com/maps/place/Sparks+Swim+-+Taman+Palem/@-6.1249256,106.7061354,17z/data=!3m1!4b1!4m6!3m5!1s0x2e6a038a500e9bbf:0x6e309a7aaa9de9e!8m2!3d-6.1249256!4d106.7061354!16s%2Fg%2F11zwpf3ntz",
   "checkedAt": "2026-11-05",
   "praiseThemes": [],
   "complaintThemes": []
  }
 },
 {
  "id": "aquatic-baby-rumabona-cikini-bintaro",
  "chain": "Aquatic Baby",
  "branchName": "RumaBona Cikini Bintaro",
  "categories": [
   "Swim"
  ],
  "address": "Blok FH2 No 11, Jl. Cikini 3, Jurang Mangu Barat, Kec. Pd. Aren, Kota Tangerang Selatan, Banten 15222, Indonesia",
  "area": "Tangerang Selatan",
  "city": "Tangerang Selatan",
  "lat": -6.2687465,
  "lng": 106.7252377,
  "coordinateSource": "maps-pin",
  "programs": [
   {
    "name": "Baby Class (swim)",
    "offering": "unknown",
    "age": {
     "minMonths": 6,
     "maxMonths": 24,
     "level": "brand",
     "verification": "provider-confirmed",
     "sourceCheckedAt": "2026-11-10",
     "providerAgeUrl": "https://aquatic-baby.com/program-1"
    },
    "note": "Aquatic Baby brand page: baby swim class for 6 months to 2 years. Brand-level age; the location page does not say which classes run at RumaBona. Year-boundary inclusivity ambiguous."
   },
   {
    "name": "Toddler Class (swim)",
    "offering": "unknown",
    "age": {
     "minMonths": 36,
     "maxMonths": 60,
     "level": "brand",
     "verification": "provider-confirmed",
     "sourceCheckedAt": "2026-11-10",
     "providerAgeUrl": "https://aquatic-baby.com/program-1"
    },
    "note": "Aquatic Baby brand page: toddler swim class for ages 3 to 4 years. Brand-level age; branch offering unconfirmed. Year-boundary inclusivity ambiguous. The brand page lists nothing between 2 and 3 years."
   }
  ],
  "website": "https://aquatic-baby.com/",
  "sourceUrl": "https://aquatic-baby.com/lokasi",
  "lastCheckedAt": "2026-11-05",
  "fitStatus": "official-chain-program",
  "notes": "Official location page lists Aquatic Baby classes at RumaBona Cikini Bintaro (Saturdays). Maps listing and rating are for the RumaBona host venue. Aquatic Baby official ages: 6 months to 6 years. Official location page lists RumaBona on Saturdays only (rechecked 2026-11-10). Confirm class and age with the provider before going.",
  "operatingStatus": {
   "state": "official-listed",
   "source": "https://aquatic-baby.com/lokasi",
   "checkedAt": "2026-11-05"
  },
  "reviews": {
   "rating": 5.0,
   "reviewCount": 12,
   "source": "Google Maps",
   "sourceUrl": "https://www.google.com/maps/place/RumaBona/@-6.2687465,106.7252377,17z/data=!3m1!4b1!4m6!3m5!1s0x2e69f18366b08da7:0x447b563d4a35acc1!8m2!3d-6.2687465!4d106.7252377!16s%2Fg%2F11yf5r8x3y",
   "checkedAt": "2026-11-05",
   "praiseThemes": [],
   "complaintThemes": [],
   "sampleNote": "All 12 Google Maps reviews read 2026-11-10 are 5-star. One 8-month-old 5-star review mentions the pool roof leaks a little in rain. The rating is for the RumaBona host venue. Not a safety guarantee."
  }

 },
  {
    "id": "gavrila-gymnastics-kelapa-gading",
    "chain": "Gavrila Gymnastics",
    "branchName": "Kelapa Gading",
    "categories": ["Gym & Movement"],
    "address": "Pergudangan Eks GORO, Jl. Kirana Avenue Jl. Pelepah Raya No.5, Kelapa Gading Barat, Jakarta Utara 14240",
    "area": "Kelapa Gading",
    "city": "Jakarta Utara",
    "lat": -6.17298,
    "lng": 106.8936085,
    "coordinateSource": "provider-address",
    "programs": [
      {
        "name": "Kinder gymnastics class (Recreational Hall)",
        "category": "Gym & Movement",
        "offering": "offered",
        "age": { "minMonths": 42, "maxMonths": null, "level": "branch", "verification": "listed-unconfirmed", "providerAgeUrl": "https://www.traveloka.com/id-id/activities/indonesia/product/gymnastics-training-by-gavrila-kelapa-gading-5200228399300", "sourceCheckedAt": "2026-11-10" },
        "note": "Partner-listed (Traveloka Xperience, checked 2026-11-10): Kinder class from 3.5 years; Kid class 6 years and up. The brand's own site (gavrilagym.online) says the best age to enrol is 6, so this is a partner claim, not a provider-confirmed under-5 age. Confirm the Kinder class with the branch before going."
      }
    ],
    "website": "https://gavrilagym.online/",
    "phone": "081905401140",
    "sourceUrl": "https://www.traveloka.com/id-id/activities/indonesia/product/gymnastics-training-by-gavrila-kelapa-gading-5200228399300",
    "lastCheckedAt": "2026-11-10",
    "fitStatus": "media-claimed",
    "notes": "Partner-listed, not provider-confirmed for under-5s. Official site lists 3 branches (Kelapa Gading, Mampang, Serpong). Traveloka admin phone for slot and Kinder/Kid/Toddler schedule questions: 0819-0540-1140.",
    "operatingStatus": { "state": "official-listed", "source": "https://gavrilagym.online/", "checkedAt": "2026-11-10" },
    "reviews": {
      "rating": 4.7,
      "reviewCount": 51,
      "source": "Google Maps",
      "sourceUrl": "https://www.google.com/maps/place/?q=place_id:ChIJp1tYK1T1aS4RvOWsspZCsOg",
      "checkedAt": "2026-11-10",
      "sampleNote": "30 newest Maps reviews read 2026-11-10: mostly positive; two 3-star reviews (toilet cleanliness about 3 weeks ago, slow admin reply about 4 months ago). Individual customer allegations, not verified facts.",
      "praiseThemes": [],
      "complaintThemes": []
    }
  },
  {
    "id": "gavrila-gymnastics-serpong",
    "chain": "Gavrila Gymnastics",
    "branchName": "Serpong",
    "categories": ["Gym & Movement"],
    "address": "Jl. Kelurahan No.Sektor 12, Rw. Mekar Jaya, Kec. Serpong, Kota Tangerang Selatan, Banten 15310",
    "area": "Serpong",
    "city": "Tangerang Selatan",
    "lat": -6.3139274,
    "lng": 106.6889471,
    "coordinateSource": "provider-address",
    "programs": [
      {
        "name": "Kinder gymnastics class (Recreational Hall)",
        "category": "Gym & Movement",
        "offering": "offered",
        "age": { "minMonths": 42, "maxMonths": null, "level": "branch", "verification": "listed-unconfirmed", "providerAgeUrl": "https://www.traveloka.com/id-id/activities/indonesia/product/gymnastics-training-by-gavrila-serpong-9054937517250", "sourceCheckedAt": "2026-11-10" },
        "note": "Partner-listed (Traveloka Xperience, checked 2026-11-10): Kinder class from 3.5 years, with a companion; Kid class 6 years and up. The brand's own site (gavrilagym.online) says the best age to enrol is 6, so this is a partner claim, not a provider-confirmed under-5 age. Confirm the Kinder class with the branch before going."
      }
    ],
    "website": "https://gavrilagym.online/",
    "phone": "087877844661",
    "sourceUrl": "https://www.traveloka.com/id-id/activities/indonesia/product/gymnastics-training-by-gavrila-serpong-9054937517250",
    "lastCheckedAt": "2026-11-10",
    "fitStatus": "media-claimed",
    "notes": "Partner-listed, not provider-confirmed for under-5s. Official site lists 3 branches (Kelapa Gading, Mampang, Serpong). Maps reviews for this branch were not read in this run.",
    "operatingStatus": { "state": "official-listed", "source": "https://gavrilagym.online/", "checkedAt": "2026-11-10" },
    "reviews": {
      "rating": 4.8,
      "reviewCount": 180,
      "source": "Google Maps",
      "sourceUrl": "https://www.google.com/maps/place/?q=place_id:ChIJLyYyG6X7aS4RQgwHxlJJfQ4",
      "checkedAt": "2026-11-10",
      "sampleNote": "Rating only; individual reviews not read on 2026-11-10.",
      "praiseThemes": [],
      "complaintThemes": []
    }
  }
];

// Aggregate-only checks never reset existing review-theme dates.
for (const venue of VENUES) {
  const aggregate = UPDATES[venue.id];
  if (!aggregate) continue;
  venue.reviews = venue.reviews
    ? { ...venue.reviews, rating: aggregate.rating, reviewCount: aggregate.reviewCount }
    : { ...aggregate, source: "Google Maps", checkedAt: "2026-11-05", praiseThemes: [], complaintThemes: [], sampleNote: "Rating and count only. Review themes not collected." };
}

// Weekly 2026-11-07 refresh: same override rule, only drifted venues are listed.
for (const venue of VENUES) {
  const aggregate = UPDATES_2026_11_07[venue.id];
  if (!aggregate) continue;
  venue.reviews = venue.reviews
    ? { ...venue.reviews, rating: aggregate.rating, reviewCount: aggregate.reviewCount, sourceUrl: aggregate.sourceUrl }
    : { ...aggregate, source: "Google Maps", checkedAt: "2026-11-07", praiseThemes: [], complaintThemes: [], sampleNote: "Rating and count only. Review themes not collected." };
}

// 2026-11-08 review pulse: trend, complaint themes and latest-review month from
// the full-branch Google Maps collection (current 3 months vs prior 3 months).
// Branches absent from the map keep their existing review data untouched.
for (const venue of VENUES) {
  const pulse = REVIEW_PULSE_2026_11_08[venue.id];
  if (!pulse || !venue.reviews) continue;
  venue.reviews = {
    ...venue.reviews,
    checkedAt: "2026-11-08",
    complaintThemes: pulse.complaintThemes.length > 0 ? pulse.complaintThemes : venue.reviews.complaintThemes,
    latestReview: pulse.latestReview ?? venue.reviews.latestReview,
    trend: pulse.trend,
    trendEvidence: pulse.trendEvidence,
  };
}


// QC round 1 fix (2026-11-08): the pulse merge above stamped every venue with
// checkedAt "2026-11-08", which re-dated older kept themes, and it dropped the
// theme evidence. This block re-applies the pulse honestly: newly collected
// themes carry the 2026-11-08 date, kept older themes keep their original
// collection date, and theme reviewer counts are merged.
const REVIEW_PULSE_ORIGINAL_THEME_DATES: Record<string, string> = {"anak-air-grand-cibubur":"2026-11-04","anak-air-kemang":"2026-11-04","anak-air-limo":"2026-11-04","aquababies-bintaro":"2026-11-03","aquababies-menteng":"2026-11-03","aquatic-baby-bintaro":"2026-11-04","aquatic-baby-rumabona-cikini-bintaro":"2026-11-05","baby-jumper-gym-pluit":"2026-11-03","bloom-space-kota-wisata":"2026-11-04","bright-little-stars-bintaro":"2026-11-03","bright-little-stars-bsd-learning-center":"2026-11-03","bright-little-stars-bsd-preschool":"2026-11-03","bright-little-stars-kemang":"2026-11-03","english-1-aeon-sentul":"2026-11-05","english-1-bintaro-tangerang":"2026-11-03","english-1-cempaka-putih":"2026-11-03","english-1-cibubur":"2026-11-05","english-1-cikupa-tangerang":"2026-11-03","english-1-ciledug-tangerang":"2026-11-03","english-1-cileungsi":"2026-11-05","english-1-cinere-depok":"2026-11-03","english-1-cipete":"2026-11-03","english-1-grand-wisata":"2026-11-05","english-1-harapan-indah":"2026-11-05","english-1-jagakarsa-tanjung-barat":"2026-11-03","english-1-jatiasih":"2026-11-05","english-1-kemang-pratama":"2026-11-05","english-1-margonda-depok":"2026-11-05","english-1-pajajaran":"2026-11-05","english-1-pamulang-tangerang":"2026-11-05","english-1-pejaten":"2026-11-03","english-1-pesona-square-depok":"2026-11-05","english-1-pluit-village":"2026-11-03","english-1-pondok-indah":"2026-11-03","english-1-puri-indah":"2026-11-03","english-1-rawamangun":"2026-11-03","english-1-sawangan-depok":"2026-11-03","english-1-summarecon":"2026-11-05","english-1-taman-yasmin":"2026-11-05","english-1-tamini-square":"2026-11-03","english-1-tangcity-tangerang":"2026-11-03","english-1-tanjung-duren":"2026-11-03","genesis-baby-toddler-swim-pejaten":"2026-11-04","golden-baby-school-jakarta-garden-city":"2026-11-03","gymboree-play-music-gymboree-play-indonesia-music":"2026-11-03","gymboree-play-music-gymboree-play-music":"2026-11-03","gymboree-play-music-pondok-indah-mall-1":"2026-11-03","i-can-read-alam-sutera":"2026-11-03","i-can-read-bintaro":"2026-11-03","i-can-read-bsd":"2026-11-05","i-can-read-bsd2":"2026-11-05","i-can-read-cikarang":"2026-11-05","i-can-read-cikupa":"2026-11-05","i-can-read-ciledug":"2026-11-03","i-can-read-cinere":"2026-11-03","i-can-read-ciputat":"2026-11-03","i-can-read-gading-serpong":"2026-11-03","i-can-read-gajah-mada":"2026-11-03","i-can-read-galaxy":"2026-11-05","i-can-read-grandwisata":"2026-11-05","i-can-read-green-lake-city":"2026-11-03","i-can-read-i-can-read":"2026-11-03","i-can-read-kalimalang":"2026-11-03","i-can-read-karawaci":"2026-11-05","i-can-read-kelapa-gading":"2026-11-03","i-can-read-kemang":"2026-11-03","i-can-read-menteng":"2026-11-03","i-can-read-modernland":"2026-11-05","i-can-read-permata-hijau":"2026-11-03","i-can-read-pluit":"2026-11-03","i-can-read-puri":"2026-11-03","i-can-read-summarecon-bekasi":"2026-11-03","music-wonderworld-bsd":"2026-11-05","outgrow-alam-sutera":"2026-11-04","rockstar-academy-aeon-mall-deltamas":"2026-11-03","rockstar-academy-central-park-2":"2026-11-03","rockstar-academy-grand-metropolitan-bekasi":"2026-11-03","rockstar-academy-lippo-mall-kemang":"2026-11-03","rockstar-academy-lippo-plaza-ekalokasari":"2026-11-03","rockstar-academy-living-world-alam-sutera":"2026-11-03","rockstar-academy-pluit-village":"2026-11-03","rockstar-academy-the-park-pejaten":"2026-11-03","sparks-sports-academy-bintaro-utown":"2026-11-03","sparks-sports-academy-bsd-tangerang":"2026-11-03","sparks-sports-academy-cikarang":"2026-11-03","sparks-sports-academy-karawaci":"2026-11-03","sparks-sports-academy-kelapa-gading-2":"2026-11-03","sparks-sports-academy-kelapa-gading-jakarta":"2026-11-03","sparks-sports-academy-kemang-ampera":"2026-11-03","sparks-sports-academy-kemang-pratama-bekasi":"2026-11-03","sparks-sports-academy-pajajaran-bogor":"2026-11-03","sparks-sports-academy-siliwangi":"2026-11-03","sparks-sports-academy-taman-mini-square":"2026-11-03","sparks-sports-academy-taman-palem":"2026-11-03","sparks-sports-academy-tanjung-duren":"2026-11-03","sparks-sports-academy-teras-kota-bsd":"2026-11-03","sparks-swim-harapan-indah":"2026-11-05","sparks-swim-pamulang":"2026-11-05","sparks-swim-taman-palem":"2026-11-05","studiorenang-bsd-north-point":"2026-11-04","studiorenang-gading-serpong":"2026-11-04","studiorenang-kelapa-gading":"2026-11-04","studiorenang-meruya":"2026-11-04","the-funtastic-gym-pondok-indah":"2026-11-03"};
for (const venue of VENUES) {
  const pulse = REVIEW_PULSE_2026_11_08[venue.id];
  if (!pulse || !venue.reviews) continue;
  const newThemes = pulse.complaintThemes.length > 0;
  venue.reviews = {
    ...venue.reviews,
    checkedAt: newThemes ? "2026-11-08" : (REVIEW_PULSE_ORIGINAL_THEME_DATES[venue.id] ?? venue.reviews.checkedAt),
    complaintThemes: newThemes ? pulse.complaintThemes : venue.reviews.complaintThemes,
    complaintThemeReviewers: newThemes ? pulse.complaintThemeReviewers : venue.reviews.complaintThemeReviewers,
    lowRatedCount: newThemes ? pulse.lowRatedCount : venue.reviews.lowRatedCount,
    latestReview: pulse.latestReview ?? venue.reviews.latestReview,
    trend: undefined,
    trendEvidence: pulse.trendEvidence,
  };
}
