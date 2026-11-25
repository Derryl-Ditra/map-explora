import type { Venue } from "@/types/venue";

// Happy Kamper indie venues (batch 4, 2026-11-24; audited 2026-11-25). Partner-listed:
// class ages and prices come from happykamper.io activity pages (checked 2026-11-24),
// addresses and ratings from active Google Maps listings (checked 2026-11-24).
// Ages stay "listed-unconfirmed" until a provider page confirms them.
// 2026-11-25 audit: the stored price units were wrong on multiple records (monthly
// packages stored as "per session") and several age ranges were platform defaults
// (0-18 yr), so every record now carries pendingReverification and its ages and
// prices stay hidden until re-checked against the provider. Four records were
// dropped as out of scope for an under-5 map or unsupported by their source:
// kodingyuk-depok-town-center (source says Tangerang Selatan home-visit, pin
// unsupported; coding for school ages), intro-education-pamulang (robotics/coding
// centre with booking-site default ages), prelude-karawaci and
// cultura-mandatum-bsd (private instrument schools, 4 yr and up).
export const HK_VENUES: Venue[] = [
  {
    "id": "majiku-larangan",
    "chain": null,
    "branchName": "Majiku kids (Larangan)",
    "categories": [
      "Preschool"
    ],
    "address": "Jems Garden Residence, RT.003, RT.003/RW.004, Gaga, Larangan, Tangerang City, Banten 15154, Indonesia",
    "area": "Larangan",
    "city": "Kota Tangerang",
    "lat": -6.242604399999999,
    "lng": 106.721598,
    "coordinateSource": "maps-pin",
    "programs": [
      {
        "name": "Majiku Pop Up Class",
        "category": "Preschool",
        "offering": "offered",
        "age": {
          "minMonths": 24,
          "maxMonths": 36,
          "level": "branch",
          "verification": "listed-unconfirmed",
          "providerAgeUrl": "https://happykamper.io/id/activities/majiku-pop-up-class",
          "sourceCheckedAt": "2026-11-24"
        },
        "note": "Thematic play class (sensory play, read aloud, group activity, singing) with a shared lunch; 60 minutes, max 8 children. Partner-listed (Happy Kamper, checked 2026-11-24); ages are partner-listed, not provider-confirmed. Confirm with the provider."
      }
    ],
    "sourceUrl": "https://happykamper.io/id/activities/majiku-pop-up-class",
    "lastCheckedAt": "2026-11-24",
    "fitStatus": "media-claimed",
    "pendingReverification": "PR #125 audit 2026-11-25: partner-listed ages and prices failed verification (wrong units, placeholder ranges). Hidden until re-checked against the provider.",
    "notes": "Single site: Happy Kamper lists only the Larangan location and Maps has only Majiku Learning Center in Gaga, Larangan (both 2026-11-24). All class ages and prices are partner-listed (Happy Kamper), not provider-confirmed.",
    "priceListings": [
      {
        "sourceKind": "partner",
        "label": "Majiku Pop Up Class",
        "amountIdr": 125000,
        "unit": "per session",
        "source": "Happy Kamper",
        "sourceUrl": "https://happykamper.io/id/activities/majiku-pop-up-class",
        "checkedAt": "2026-11-24"
      }
    ],
    "operatingStatus": {
      "state": "partner-listed",
      "source": "https://www.google.com/maps/search/?api=1&query=Majiku+Learning+Center&query_place_id=ChIJOcA7WQD7aS4Ruq3DKmjcxbY",
      "checkedAt": "2026-11-24"
    },
    "reviews": {
      "rating": 4.900000095367432,
      "reviewCount": 15,
      "source": "Google Maps",
      "sourceUrl": "https://www.google.com/maps/search/?api=1&query=Majiku+Learning+Center&query_place_id=ChIJOcA7WQD7aS4Ruq3DKmjcxbY",
      "checkedAt": "2026-11-24",
      "sampleNote": "Rating and count only; individual reviews not read (2026-11-24).",
      "praiseThemes": [],
      "complaintThemes": []
    }
  },
  {
    "id": "dposture-jatisampurna",
    "chain": null,
    "branchName": "D'Posture Dance & Fit (Jatisampurna)",
    "categories": [
      "Dance"
    ],
    "address": "Jl. Alternatif Cibubur Ruko Kawasan Niaga Blok R6 No.16, RT.002/RW.008, Jatisampurna, Bekasi, West Java 17435, Indonesia",
    "area": "Jatisampurna",
    "city": "Bekasi",
    "lat": -6.3818101,
    "lng": 106.9260736,
    "coordinateSource": "maps-pin",
    "programs": [
      {
        "name": "Baby Dancing Ballet for Kiddies",
        "category": "Dance",
        "offering": "offered",
        "age": {
          "minMonths": 24,
          "maxMonths": 48,
          "level": "branch",
          "verification": "listed-unconfirmed",
          "providerAgeUrl": "https://happykamper.io/id/activities/baby-dancing-ballet-for-kiddies",
          "sourceCheckedAt": "2026-11-24"
        },
        "note": "Partner-listed (Happy Kamper, checked 2026-11-24); ages are partner-listed, not provider-confirmed. Confirm with the provider."
      },
      {
        "name": "Pre Primary ballet",
        "category": "Dance",
        "offering": "offered",
        "age": {
          "minMonths": 60,
          "maxMonths": 96,
          "level": "branch",
          "verification": "listed-unconfirmed",
          "providerAgeUrl": "https://happykamper.io/id/activities/pre-primary",
          "sourceCheckedAt": "2026-11-24"
        },
        "note": "Partner-listed (Happy Kamper, checked 2026-11-24); ages are partner-listed, not provider-confirmed. Confirm with the provider."
      },
      {
        "name": "Dance Hip Hop",
        "category": "Dance",
        "offering": "offered",
        "age": {
          "minMonths": 60,
          "maxMonths": 144,
          "level": "branch",
          "verification": "listed-unconfirmed",
          "providerAgeUrl": "https://happykamper.io/id/activities/dance-hip-hop",
          "sourceCheckedAt": "2026-11-24"
        },
        "note": "Partner-listed (Happy Kamper, checked 2026-11-24); ages are partner-listed, not provider-confirmed. Confirm with the provider."
      }
    ],
    "sourceUrl": "https://happykamper.io/id/activities/baby-dancing-ballet-for-kiddies",
    "lastCheckedAt": "2026-11-24",
    "fitStatus": "media-claimed",
    "pendingReverification": "PR #125 audit 2026-11-25: partner-listed ages and prices failed verification (wrong units, placeholder ranges). Hidden until re-checked against the provider.",
    "notes": "Single studio on Maps and one studio area (Jatisampurna) on Happy Kamper, both 2026-11-24. All class ages and prices are partner-listed (Happy Kamper), not provider-confirmed.",
    "priceListings": [
      {
        "sourceKind": "partner",
        "label": "Baby Dancing Ballet for Kiddies",
        "amountIdr": 150000,
        "unit": "per session",
        "source": "Happy Kamper",
        "sourceUrl": "https://happykamper.io/id/activities/baby-dancing-ballet-for-kiddies",
        "checkedAt": "2026-11-24"
      },
      {
        "sourceKind": "partner",
        "label": "Pre Primary ballet",
        "amountIdr": 130000,
        "unit": "per session",
        "source": "Happy Kamper",
        "sourceUrl": "https://happykamper.io/id/activities/pre-primary",
        "checkedAt": "2026-11-24"
      },
      {
        "sourceKind": "partner",
        "label": "Dance Hip Hop",
        "amountIdr": 150000,
        "unit": "per session",
        "source": "Happy Kamper",
        "sourceUrl": "https://happykamper.io/id/activities/dance-hip-hop",
        "checkedAt": "2026-11-24"
      }
    ],
    "operatingStatus": {
      "state": "partner-listed",
      "source": "https://www.google.com/maps/search/?api=1&query=D%27+Posture+Dance+%26+Fit+Studio&query_place_id=ChIJs_bdVqnsaS4RsPo6RDrWtCk",
      "checkedAt": "2026-11-24"
    },
    "reviews": {
      "rating": 4.300000190734863,
      "reviewCount": 13,
      "source": "Google Maps",
      "sourceUrl": "https://www.google.com/maps/search/?api=1&query=D%27+Posture+Dance+%26+Fit+Studio&query_place_id=ChIJs_bdVqnsaS4RsPo6RDrWtCk",
      "checkedAt": "2026-11-24",
      "sampleNote": "Rating and count only; individual reviews not read (2026-11-24).",
      "praiseThemes": [],
      "complaintThemes": []
    }
  },
  {
    "id": "smartkidz-kelapa-gading",
    "chain": null,
    "branchName": "SMARTKIDZ (Kelapa Gading)",
    "categories": [
      "Enrichment"
    ],
    "address": "Jl. Raya Kelapa Hybrida PF 18 No.11, RT.10/RW.3, Pegangsaan Dua, Kec. Klp. Gading, Jkt Utara, Daerah Khusus Ibukota Jakarta 14240, Indonesia",
    "area": "Kelapa Gading",
    "city": "Jakarta Utara",
    "lat": -6.148776,
    "lng": 106.9137888,
    "coordinateSource": "maps-pin",
    "programs": [
      {
        "name": "Smart Kidz kids classes",
        "category": "Enrichment",
        "offering": "offered",
        "age": {
          "minMonths": 24,
          "maxMonths": 144,
          "level": "branch",
          "verification": "listed-unconfirmed",
          "providerAgeUrl": "https://happykamper.io/id/activities/biaya-pendaftaran",
          "sourceCheckedAt": "2026-11-24"
        },
        "note": "The Happy Kamper listing sells the registration fee; the page does not break out individual classes. Partner-listed (Happy Kamper, checked 2026-11-24); ages are partner-listed, not provider-confirmed. Confirm with the provider."
      }
    ],
    "sourceUrl": "https://happykamper.io/id/activities/biaya-pendaftaran",
    "lastCheckedAt": "2026-11-24",
    "fitStatus": "media-claimed",
    "pendingReverification": "PR #125 audit 2026-11-25: partner-listed ages and prices failed verification (wrong units, placeholder ranges). Hidden until re-checked against the provider.",
    "notes": "Happy Kamper listing is a registration fee, not a single class; class mix not detailed there. Maps listing \"SMARTKIDZ Cabang Kelapa Gading\" matches the provider name and Kelapa Gading area (2026-11-24). All class ages and prices are partner-listed (Happy Kamper), not provider-confirmed.",
    "priceListings": [
      {
        "sourceKind": "partner",
        "label": "Registration (Biaya pendaftaran)",
        "amountIdr": 400000,
        "unit": "per registration",
        "source": "Happy Kamper",
        "sourceUrl": "https://happykamper.io/id/activities/biaya-pendaftaran",
        "checkedAt": "2026-11-24"
      }
    ],
    "operatingStatus": {
      "state": "partner-listed",
      "source": "https://www.google.com/maps/search/?api=1&query=SMARTKIDZ+Cabang+Kelapa+Gading&query_place_id=ChIJIX9xww6LaS4RSV3r4KEyX2I",
      "checkedAt": "2026-11-24"
    },
    "reviews": {
      "rating": 5,
      "reviewCount": 27,
      "source": "Google Maps",
      "sourceUrl": "https://www.google.com/maps/search/?api=1&query=SMARTKIDZ+Cabang+Kelapa+Gading&query_place_id=ChIJIX9xww6LaS4RSV3r4KEyX2I",
      "checkedAt": "2026-11-24",
      "sampleNote": "Rating and count only; individual reviews not read (2026-11-24).",
      "praiseThemes": [],
      "complaintThemes": []
    }
  },
  {
    "id": "kidztiara-bantar-gebang",
    "chain": null,
    "branchName": "Playground Kidztiara (Bantar Gebang)",
    "categories": [
      "Play"
    ],
    "address": "Jl. Yayasan Nurul Huda No.158, RT.002/RW.001, Bantargebang, Kec. Bantar Gebang, Kota Bks, Jawa Barat 17151, Indonesia",
    "area": "Bantar Gebang",
    "city": "Bekasi",
    "lat": -6.3123958,
    "lng": 106.9821973,
    "coordinateSource": "maps-pin",
    "programs": [
      {
        "name": "Playground entry",
        "category": "Play",
        "offering": "offered",
        "age": {
          "minMonths": 0,
          "maxMonths": 216,
          "level": "branch",
          "verification": "listed-unconfirmed",
          "providerAgeUrl": "https://happykamper.io/id/activities/playground-kidztiara",
          "sourceCheckedAt": "2026-11-24"
        },
        "note": "Indoor playground entry, not a class. The 0-18 range is all-ages boilerplate on the marketplace. Partner-listed (Happy Kamper, checked 2026-11-24); ages are partner-listed, not provider-confirmed. Confirm with the provider."
      }
    ],
    "sourceUrl": "https://happykamper.io/id/activities/playground-kidztiara",
    "lastCheckedAt": "2026-11-24",
    "fitStatus": "media-claimed",
    "pendingReverification": "PR #125 audit 2026-11-25: partner-listed ages and prices failed verification (wrong units, placeholder ranges). Hidden until re-checked against the provider.",
    "notes": "Indoor playground. Strong Maps presence (548 ratings, 2026-11-24). All class ages and prices are partner-listed (Happy Kamper), not provider-confirmed.",
    "priceListings": [
      {
        "sourceKind": "partner",
        "label": "Playground entry",
        "amountIdr": 30000,
        "unit": "per entry",
        "source": "Happy Kamper",
        "sourceUrl": "https://happykamper.io/id/activities/playground-kidztiara",
        "checkedAt": "2026-11-24"
      }
    ],
    "operatingStatus": {
      "state": "partner-listed",
      "source": "https://www.google.com/maps/search/?api=1&query=Playground+Kidztiara&query_place_id=ChIJY1zmMwCTaS4RnJBDBiN9xww",
      "checkedAt": "2026-11-24"
    },
    "reviews": {
      "rating": 4.900000095367432,
      "reviewCount": 548,
      "source": "Google Maps",
      "sourceUrl": "https://www.google.com/maps/search/?api=1&query=Playground+Kidztiara&query_place_id=ChIJY1zmMwCTaS4RnJBDBiN9xww",
      "checkedAt": "2026-11-24",
      "sampleNote": "Rating and count only; individual reviews not read (2026-11-24).",
      "praiseThemes": [],
      "complaintThemes": []
    }
  },
  {
    "id": "bintaro-inline-skate",
    "chain": null,
    "branchName": "Bintaro Inline Skate (Bintaro Xchange)",
    "categories": [
      "Gym & Movement"
    ],
    "address": "Gedung Parkir BXC 2 (Bintaro Jaya Xchange, Pd. Jaya, Kec. Pd. Aren, Kota Tangerang Selatan, Banten 15220, Indonesia",
    "area": "Pondok Aren",
    "city": "Tangerang Selatan",
    "lat": -6.2854481,
    "lng": 106.7285448,
    "coordinateSource": "maps-pin",
    "programs": [
      {
        "name": "Pemula Plus Hockey",
        "category": "Gym & Movement",
        "offering": "offered",
        "age": {
          "minMonths": 0,
          "maxMonths": 216,
          "level": "branch",
          "verification": "listed-unconfirmed",
          "providerAgeUrl": "https://happykamper.io/id/activities/pemula-plus-hockey",
          "sourceCheckedAt": "2026-11-24"
        },
        "note": "The 0-18 range is all-ages boilerplate on the marketplace. Partner-listed (Happy Kamper, checked 2026-11-24); ages are partner-listed, not provider-confirmed. Confirm with the provider."
      },
      {
        "name": "Basic class",
        "category": "Gym & Movement",
        "offering": "offered",
        "age": {
          "minMonths": 0,
          "maxMonths": 216,
          "level": "branch",
          "verification": "listed-unconfirmed",
          "providerAgeUrl": "https://happykamper.io/id/activities/basic",
          "sourceCheckedAt": "2026-11-24"
        },
        "note": "The 0-18 range is all-ages boilerplate on the marketplace. Partner-listed (Happy Kamper, checked 2026-11-24); ages are partner-listed, not provider-confirmed. Confirm with the provider."
      },
      {
        "name": "Pemula 9",
        "category": "Gym & Movement",
        "offering": "offered",
        "age": {
          "minMonths": 36,
          "maxMonths": 216,
          "level": "branch",
          "verification": "listed-unconfirmed",
          "providerAgeUrl": "https://happykamper.io/id/activities/pemula-9",
          "sourceCheckedAt": "2026-11-24"
        },
        "note": "Partner-listed (Happy Kamper, checked 2026-11-24); ages are partner-listed, not provider-confirmed. Confirm with the provider."
      },
      {
        "name": "Pemula",
        "category": "Gym & Movement",
        "offering": "offered",
        "age": {
          "minMonths": 48,
          "maxMonths": 96,
          "level": "branch",
          "verification": "listed-unconfirmed",
          "providerAgeUrl": "https://happykamper.io/id/activities/pemula",
          "sourceCheckedAt": "2026-11-24"
        },
        "note": "Partner-listed (Happy Kamper, checked 2026-11-24); ages are partner-listed, not provider-confirmed. Confirm with the provider."
      }
    ],
    "sourceUrl": "https://happykamper.io/id/activities/pemula-plus-hockey",
    "lastCheckedAt": "2026-11-24",
    "fitStatus": "media-claimed",
    "pendingReverification": "PR #125 audit 2026-11-25: partner-listed ages and prices failed verification (wrong units, placeholder ranges). Hidden until re-checked against the provider.",
    "notes": "Maps pin is the Bintaro Jaya Xchange parking building rink (2026-11-24). All class ages and prices are partner-listed (Happy Kamper), not provider-confirmed.",
    "priceListings": [
      {
        "sourceKind": "partner",
        "label": "Pemula Plus Hockey",
        "amountIdr": 50000,
        "unit": "per session",
        "source": "Happy Kamper",
        "sourceUrl": "https://happykamper.io/id/activities/pemula-plus-hockey",
        "checkedAt": "2026-11-24"
      },
      {
        "sourceKind": "partner",
        "label": "Basic class",
        "amountIdr": 300000,
        "unit": "per session",
        "source": "Happy Kamper",
        "sourceUrl": "https://happykamper.io/id/activities/basic",
        "checkedAt": "2026-11-24"
      },
      {
        "sourceKind": "partner",
        "label": "Pemula 9",
        "amountIdr": 300000,
        "unit": "per session",
        "source": "Happy Kamper",
        "sourceUrl": "https://happykamper.io/id/activities/pemula-9",
        "checkedAt": "2026-11-24"
      },
      {
        "sourceKind": "partner",
        "label": "Pemula",
        "amountIdr": 300000,
        "unit": "per session",
        "source": "Happy Kamper",
        "sourceUrl": "https://happykamper.io/id/activities/pemula",
        "checkedAt": "2026-11-24"
      }
    ],
    "operatingStatus": {
      "state": "partner-listed",
      "source": "https://www.google.com/maps/search/?api=1&query=Bintaro+Inline+Skate&query_place_id=ChIJl6dWwM_7aS4RElmCm48DhAE",
      "checkedAt": "2026-11-24"
    },
    "reviews": {
      "rating": 5,
      "reviewCount": 58,
      "source": "Google Maps",
      "sourceUrl": "https://www.google.com/maps/search/?api=1&query=Bintaro+Inline+Skate&query_place_id=ChIJl6dWwM_7aS4RElmCm48DhAE",
      "checkedAt": "2026-11-24",
      "sampleNote": "Rating and count only; individual reviews not read (2026-11-24).",
      "praiseThemes": [],
      "complaintThemes": []
    }
  },
  {
    "id": "star-station-penjaringan",
    "chain": null,
    "branchName": "Star Station Dance Studio (Penjaringan)",
    "categories": [
      "Dance"
    ],
    "address": "Jl. TPI 2 No.mor 2 blok Y, RT.12/RW.15, Pejagalan, Kecamatan Penjaringan, Jkt Utara, Daerah Khusus Ibukota Jakarta 14450, Indonesia",
    "area": "Penjaringan",
    "city": "Jakarta Utara",
    "lat": -6.1402589,
    "lng": 106.7770234,
    "coordinateSource": "maps-pin",
    "programs": [
      {
        "name": "Kids Dance Class",
        "category": "Dance",
        "offering": "offered",
        "age": {
          "minMonths": 0,
          "maxMonths": 144,
          "level": "branch",
          "verification": "listed-unconfirmed",
          "providerAgeUrl": "https://happykamper.io/id/activities/kids-dance-class",
          "sourceCheckedAt": "2026-11-24"
        },
        "note": "The 0-12 range is broad marketplace wording; lower bound unconfirmed. Partner-listed (Happy Kamper, checked 2026-11-24); ages are partner-listed, not provider-confirmed. Confirm with the provider."
      }
    ],
    "sourceUrl": "https://happykamper.io/id/activities/kids-dance-class",
    "lastCheckedAt": "2026-11-24",
    "fitStatus": "media-claimed",
    "pendingReverification": "PR #125 audit 2026-11-25: partner-listed ages and prices failed verification (wrong units, placeholder ranges). Hidden until re-checked against the provider.",
    "notes": "Maps listing \"Star Station Dance Studio\" in Pejagalan, Penjaringan matches the Jakarta Utara area on Happy Kamper (2026-11-24). All class ages and prices are partner-listed (Happy Kamper), not provider-confirmed.",
    "priceListings": [
      {
        "sourceKind": "partner",
        "label": "Kids Dance Class",
        "amountIdr": 550000,
        "unit": "per session",
        "source": "Happy Kamper",
        "sourceUrl": "https://happykamper.io/id/activities/kids-dance-class",
        "checkedAt": "2026-11-24"
      }
    ],
    "operatingStatus": {
      "state": "partner-listed",
      "source": "https://www.google.com/maps/search/?api=1&query=Star+Station+Dance+Studio&query_place_id=ChIJm5kHCqf3aS4RQAGNxxm7C28",
      "checkedAt": "2026-11-24"
    },
    "reviews": {
      "rating": 4.900000095367432,
      "reviewCount": 51,
      "source": "Google Maps",
      "sourceUrl": "https://www.google.com/maps/search/?api=1&query=Star+Station+Dance+Studio&query_place_id=ChIJm5kHCqf3aS4RQAGNxxm7C28",
      "checkedAt": "2026-11-24",
      "sampleNote": "Rating and count only; individual reviews not read (2026-11-24).",
      "praiseThemes": [],
      "complaintThemes": []
    }
  },
  {
    "id": "foxybright-bendella-bekasi",
    "chain": null,
    "branchName": "Foxybright Basketball (Bendella Bekasi)",
    "categories": [
      "Multi-Sport"
    ],
    "address": "Jl. Raya Perjuangan No.26, RT.001/RW.002, Marga Mulya, Kec. Bekasi Utara, Kota Bks, Jawa Barat 17124, Indonesia",
    "area": "Bekasi Utara",
    "city": "Bekasi",
    "lat": -6.224436000000001,
    "lng": 107.008055,
    "coordinateSource": "maps-pin",
    "programs": [
      {
        "name": "Basketball Class (Bendella Bekasi)",
        "category": "Multi-Sport",
        "offering": "offered",
        "age": {
          "minMonths": 36,
          "maxMonths": 84,
          "level": "branch",
          "verification": "listed-unconfirmed",
          "providerAgeUrl": "https://happykamper.io/id/activities/basketball-class-bendella-bekasi",
          "sourceCheckedAt": "2026-11-24"
        },
        "note": "Class run by Foxybright Indonesia at the Bendella Basket court. Partner-listed (Happy Kamper, checked 2026-11-24); ages are partner-listed, not provider-confirmed. Confirm with the provider."
      }
    ],
    "sourceUrl": "https://happykamper.io/id/activities/basketball-class-bendella-bekasi",
    "lastCheckedAt": "2026-11-24",
    "fitStatus": "media-claimed",
    "pendingReverification": "PR #125 audit 2026-11-25: partner-listed ages and prices failed verification (wrong units, placeholder ranges). Hidden until re-checked against the provider.",
    "notes": "Class venue is the Bendella Basket court (Maps, 2026-11-24); the provider Foxybright Indonesia has no own Maps listing. Foxybright also lists futsal classes at Tibi Futsal (Pasar Minggu) and Rinjani Futsal (Makasar) for 2-7 on Happy Kamper - not added in this batch. All class ages and prices are partner-listed (Happy Kamper), not provider-confirmed.",
    "priceListings": [
      {
        "sourceKind": "partner",
        "label": "Basketball Class (Bendella Bekasi)",
        "amountIdr": 125000,
        "unit": "per session",
        "source": "Happy Kamper",
        "sourceUrl": "https://happykamper.io/id/activities/basketball-class-bendella-bekasi",
        "checkedAt": "2026-11-24"
      }
    ],
    "operatingStatus": {
      "state": "partner-listed",
      "source": "https://www.google.com/maps/search/?api=1&query=Bendella+Basket&query_place_id=ChIJU75s9KqPaS4RJBUJ2KIZ5gc",
      "checkedAt": "2026-11-24"
    },
    "reviews": {
      "rating": 4.199999809265137,
      "reviewCount": 103,
      "source": "Google Maps",
      "sourceUrl": "https://www.google.com/maps/search/?api=1&query=Bendella+Basket&query_place_id=ChIJU75s9KqPaS4RJBUJ2KIZ5gc",
      "checkedAt": "2026-11-24",
      "sampleNote": "Rating and count only; individual reviews not read (2026-11-24).",
      "praiseThemes": [],
      "complaintThemes": []
    }
  },
  {
    "id": "bimba-rainbow-budi-agung",
    "chain": null,
    "branchName": "Bimba Rainbow Kids Budi Agung (Tanah Sareal)",
    "categories": [
      "Literacy"
    ],
    "address": "Jalan cendana blok A 6 Perumahan Budi agung RT 04/04 .Kel Sukadamai, RT.03/RW.10, Kedungbadak, Tanah Sareal, Kota Bogor, Jawa Barat 16165, Indonesia",
    "area": "Tanah Sareal",
    "city": "Bogor",
    "lat": -6.557008499999999,
    "lng": 106.7922368,
    "coordinateSource": "maps-pin",
    "programs": [
      {
        "name": "Kelas Calistung",
        "category": "Literacy",
        "offering": "offered",
        "age": {
          "minMonths": 36,
          "maxMonths": 84,
          "level": "branch",
          "verification": "listed-unconfirmed",
          "providerAgeUrl": "https://happykamper.io/id/activities/kelas-calistung",
          "sourceCheckedAt": "2026-11-24"
        },
        "note": "Partner-listed (Happy Kamper, checked 2026-11-24); ages are partner-listed, not provider-confirmed. Confirm with the provider."
      }
    ],
    "sourceUrl": "https://happykamper.io/id/activities/kelas-calistung",
    "lastCheckedAt": "2026-11-24",
    "fitStatus": "media-claimed",
    "pendingReverification": "PR #125 audit 2026-11-25: partner-listed ages and prices failed verification (wrong units, placeholder ranges). Hidden until re-checked against the provider.",
    "notes": "Happy Kamper provider name \"Rainbow Budi Agung\" matches the Maps listing \"BIMBA RAINBOW KIDS BUDI AGUNG\" in Tanah Sareal (2026-11-24). All class ages and prices are partner-listed (Happy Kamper), not provider-confirmed.",
    "priceListings": [
      {
        "sourceKind": "partner",
        "label": "Kelas Calistung",
        "amountIdr": 150000,
        "unit": "per session",
        "source": "Happy Kamper",
        "sourceUrl": "https://happykamper.io/id/activities/kelas-calistung",
        "checkedAt": "2026-11-24"
      }
    ],
    "operatingStatus": {
      "state": "partner-listed",
      "source": "https://www.google.com/maps/search/?api=1&query=BIMBA+RAINBOW+KIDS+BUDI+AGUNG&query_place_id=ChIJ_8xMvBvFaS4RltQeeuCmkr0",
      "checkedAt": "2026-11-24"
    },
    "reviews": {
      "rating": 5,
      "reviewCount": 33,
      "source": "Google Maps",
      "sourceUrl": "https://www.google.com/maps/search/?api=1&query=BIMBA+RAINBOW+KIDS+BUDI+AGUNG&query_place_id=ChIJ_8xMvBvFaS4RltQeeuCmkr0",
      "checkedAt": "2026-11-24",
      "sampleNote": "Rating and count only; individual reviews not read (2026-11-24).",
      "praiseThemes": [],
      "complaintThemes": []
    }
  },
  {
    "id": "bimba-tahfidz-temanbaik-jatibening-1",
    "chain": null,
    "branchName": "Bimba Tahfidz TemanBaik Jatibening 1 (Pondok Gede)",
    "categories": [
      "Literacy"
    ],
    "address": "Jl. Merbabu.214 B - Jatibening 1, RT.010/RW.005, Jatibening Baru, Kec. Pd. Gede, Kota Bks, Jawa Barat 17411, Indonesia",
    "area": "Pondok Gede",
    "city": "Bekasi",
    "lat": -6.2630031,
    "lng": 106.929197,
    "coordinateSource": "maps-pin",
    "programs": [
      {
        "name": "Kelas Bimba Tahfidz",
        "category": "Literacy",
        "offering": "offered",
        "age": {
          "minMonths": 36,
          "maxMonths": 84,
          "level": "branch",
          "verification": "listed-unconfirmed",
          "providerAgeUrl": "https://happykamper.io/id/activities/kelas-bimba-tahfidz",
          "sourceCheckedAt": "2026-11-24"
        },
        "note": "Partner-listed (Happy Kamper, checked 2026-11-24); ages are partner-listed, not provider-confirmed. Confirm with the provider."
      },
      {
        "name": "Kelas Privat Bimba Tahfidz",
        "category": "Literacy",
        "offering": "offered",
        "age": {
          "minMonths": 36,
          "maxMonths": 84,
          "level": "branch",
          "verification": "listed-unconfirmed",
          "providerAgeUrl": "https://happykamper.io/id/activities/kelas-privat-bimba-tahfidz",
          "sourceCheckedAt": "2026-11-24"
        },
        "note": "Partner-listed (Happy Kamper, checked 2026-11-24); ages are partner-listed, not provider-confirmed. Confirm with the provider."
      },
      {
        "name": "Kelas Mewarnai",
        "category": "Arts & Crafts",
        "offering": "offered",
        "age": {
          "minMonths": 36,
          "maxMonths": 144,
          "level": "branch",
          "verification": "listed-unconfirmed",
          "providerAgeUrl": "https://happykamper.io/id/activities/kelas-mewarnai",
          "sourceCheckedAt": "2026-11-24"
        },
        "note": "Partner-listed (Happy Kamper, checked 2026-11-24); ages are partner-listed, not provider-confirmed. Confirm with the provider."
      }
    ],
    "sourceUrl": "https://happykamper.io/id/activities/kelas-bimba-tahfidz",
    "lastCheckedAt": "2026-11-24",
    "fitStatus": "media-claimed",
    "pendingReverification": "PR #125 audit 2026-11-25: partner-listed ages and prices failed verification (wrong units, placeholder ranges). Hidden until re-checked against the provider.",
    "notes": "Maps listing matches the full provider name and Jatibening 1 address (2026-11-24). All class ages and prices are partner-listed (Happy Kamper), not provider-confirmed.",
    "priceListings": [
      {
        "sourceKind": "partner",
        "label": "Kelas Bimba Tahfidz",
        "amountIdr": 402500,
        "unit": "per session",
        "source": "Happy Kamper",
        "sourceUrl": "https://happykamper.io/id/activities/kelas-bimba-tahfidz",
        "checkedAt": "2026-11-24"
      },
      {
        "sourceKind": "partner",
        "label": "Kelas Privat Bimba Tahfidz",
        "amountIdr": 705000,
        "unit": "per session",
        "source": "Happy Kamper",
        "sourceUrl": "https://happykamper.io/id/activities/kelas-privat-bimba-tahfidz",
        "checkedAt": "2026-11-24"
      },
      {
        "sourceKind": "partner",
        "label": "Kelas Mewarnai",
        "amountIdr": 300000,
        "unit": "per session",
        "source": "Happy Kamper",
        "sourceUrl": "https://happykamper.io/id/activities/kelas-mewarnai",
        "checkedAt": "2026-11-24"
      }
    ],
    "operatingStatus": {
      "state": "partner-listed",
      "source": "https://www.google.com/maps/search/?api=1&query=Bimba+Tahfidz+Temanbaik+Jatibening+1+Bekasi&query_place_id=ChIJde0Qje-NaS4RXVUnJTlB0PU",
      "checkedAt": "2026-11-24"
    },
    "reviews": {
      "rating": 4.800000190734863,
      "reviewCount": 13,
      "source": "Google Maps",
      "sourceUrl": "https://www.google.com/maps/search/?api=1&query=Bimba+Tahfidz+Temanbaik+Jatibening+1+Bekasi&query_place_id=ChIJde0Qje-NaS4RXVUnJTlB0PU",
      "checkedAt": "2026-11-24",
      "sampleNote": "Rating and count only; individual reviews not read (2026-11-24).",
      "praiseThemes": [],
      "complaintThemes": []
    }
  },
  {
    "id": "doki-doki-craft-pluit",
    "chain": null,
    "branchName": "Doki Doki Craft (Pluit)",
    "categories": [
      "Arts & Crafts"
    ],
    "address": "Jl. Pluit Karang Indah Barat No.63 Blok B8, RT.6/RW.12, Pluit, Kecamatan Penjaringan, Jkt Utara, Daerah Khusus Ibukota Jakarta 14450, Indonesia",
    "area": "Pluit",
    "city": "Jakarta Utara",
    "lat": -6.119721500000001,
    "lng": 106.7828631,
    "coordinateSource": "maps-pin",
    "programs": [
      {
        "name": "Air Dry Clay Animal Figures",
        "category": "Arts & Crafts",
        "offering": "offered",
        "age": {
          "minMonths": 36,
          "maxMonths": 216,
          "level": "branch",
          "verification": "listed-unconfirmed",
          "providerAgeUrl": "https://happykamper.io/id/activities/membuat-figur-hewan-dengan-air-dry-clay",
          "sourceCheckedAt": "2026-11-24"
        },
        "note": "Partner-listed (Happy Kamper, checked 2026-11-24); ages are partner-listed, not provider-confirmed. Confirm with the provider."
      }
    ],
    "sourceUrl": "https://happykamper.io/id/activities/membuat-figur-hewan-dengan-air-dry-clay",
    "lastCheckedAt": "2026-11-24",
    "fitStatus": "media-claimed",
    "pendingReverification": "PR #125 audit 2026-11-25: partner-listed ages and prices failed verification (wrong units, placeholder ranges). Hidden until re-checked against the provider.",
    "notes": "Maps listing matches name and Penjaringan area (2026-11-24). All class ages and prices are partner-listed (Happy Kamper), not provider-confirmed.",
    "priceListings": [
      {
        "sourceKind": "partner",
        "label": "Air Dry Clay Animal Figures",
        "amountIdr": 120000,
        "unit": "per session",
        "source": "Happy Kamper",
        "sourceUrl": "https://happykamper.io/id/activities/membuat-figur-hewan-dengan-air-dry-clay",
        "checkedAt": "2026-11-24"
      }
    ],
    "operatingStatus": {
      "state": "partner-listed",
      "source": "https://www.google.com/maps/search/?api=1&query=Doki+Doki+Craft&query_place_id=ChIJSZyl6qIdai4R8hZXkdl5tII",
      "checkedAt": "2026-11-24"
    },
    "reviews": {
      "rating": 4.599999904632568,
      "reviewCount": 47,
      "source": "Google Maps",
      "sourceUrl": "https://www.google.com/maps/search/?api=1&query=Doki+Doki+Craft&query_place_id=ChIJSZyl6qIdai4R8hZXkdl5tII",
      "checkedAt": "2026-11-24",
      "sampleNote": "Rating and count only; individual reviews not read (2026-11-24).",
      "praiseThemes": [],
      "complaintThemes": []
    }
  },
  {
    "id": "bimba-rainstar-ciomas",
    "chain": null,
    "branchName": "Bimba Rainstar (Ciomas)",
    "categories": [
      "Literacy"
    ],
    "address": "Pintu Masuk, Jl. Cikoneng II Jl. Perumahan Nuansa Indah, Pagelaran, Kec. Ciomas, Kabupaten Bogor, Jawa Barat 16610, Indonesia",
    "area": "Ciomas",
    "city": "Kabupaten Bogor",
    "lat": -6.6029163,
    "lng": 106.7632377,
    "coordinateSource": "maps-pin",
    "programs": [
      {
        "name": "Baca Tulis Hitung & English",
        "category": "Literacy",
        "offering": "offered",
        "age": {
          "minMonths": 36,
          "maxMonths": 204,
          "level": "branch",
          "verification": "listed-unconfirmed",
          "providerAgeUrl": "https://happykamper.io/id/activities/baca-tulis-hitung-english",
          "sourceCheckedAt": "2026-11-24"
        },
        "note": "Price on the page is a registration bundle (first month SPP + English module), not a single session. Partner-listed (Happy Kamper, checked 2026-11-24); ages are partner-listed, not provider-confirmed. Confirm with the provider."
      }
    ],
    "sourceUrl": "https://happykamper.io/id/activities/baca-tulis-hitung-english",
    "lastCheckedAt": "2026-11-24",
    "fitStatus": "media-claimed",
    "pendingReverification": "PR #125 audit 2026-11-25: partner-listed ages and prices failed verification (wrong units, placeholder ranges). Hidden until re-checked against the provider.",
    "notes": "Maps listing \"BIMBA RAINSTAR CIOMAS\" matches the Ciomas area on Happy Kamper (2026-11-24). All class ages and prices are partner-listed (Happy Kamper), not provider-confirmed.",
    "priceListings": [
      {
        "sourceKind": "partner",
        "label": "Pendaftaran awal (SPP 1 bulan + modul Bahasa Inggris pra level A)",
        "amountIdr": 725000,
        "unit": "per registration bundle",
        "source": "Happy Kamper",
        "sourceUrl": "https://happykamper.io/id/activities/baca-tulis-hitung-english",
        "checkedAt": "2026-11-24"
      }
    ],
    "operatingStatus": {
      "state": "partner-listed",
      "source": "https://www.google.com/maps/search/?api=1&query=BIMBA+RAINSTAR+CIOMAS&query_place_id=ChIJJxZ-qK_FaS4Rl1jbeyvwePw",
      "checkedAt": "2026-11-24"
    },
    "reviews": {
      "rating": 5,
      "reviewCount": 4,
      "source": "Google Maps",
      "sourceUrl": "https://www.google.com/maps/search/?api=1&query=BIMBA+RAINSTAR+CIOMAS&query_place_id=ChIJJxZ-qK_FaS4Rl1jbeyvwePw",
      "checkedAt": "2026-11-24",
      "sampleNote": "Rating and count only; individual reviews not read (2026-11-24).",
      "praiseThemes": [],
      "complaintThemes": []
    }
  },
  {
    "id": "harahap-jagakarsa",
    "chain": null,
    "branchName": "Harahap Swimming School (Jagakarsa)",
    "categories": [
      "Swim"
    ],
    "address": "Jl. Situ Babakan No.14A, RT.13/RW.8, Srengseng Sawah, Kec. Jagakarsa, Kota Jakarta Selatan, Daerah Khusus Ibukota Jakarta 12640, Indonesia",
    "area": "Jagakarsa",
    "city": "Jakarta Selatan",
    "lat": -6.3398604,
    "lng": 106.8247823,
    "coordinateSource": "maps-pin",
    "programs": [
      {
        "name": "Kelas Renang Reguler Dasar (Jagakarsa)",
        "category": "Swim",
        "offering": "offered",
        "age": {
          "minMonths": 48,
          "maxMonths": 168,
          "level": "branch",
          "verification": "listed-unconfirmed",
          "providerAgeUrl": "https://happykamper.io/id/activities/kelas-renang-reguler-dasar-cabang-jagakarsa",
          "sourceCheckedAt": "2026-11-24"
        },
        "note": "Partner-listed (Happy Kamper, checked 2026-11-24); ages are partner-listed, not provider-confirmed. Confirm with the provider."
      }
    ],
    "sourceUrl": "https://happykamper.io/id/activities/kelas-renang-reguler-dasar-cabang-jagakarsa",
    "lastCheckedAt": "2026-11-24",
    "fitStatus": "media-claimed",
    "pendingReverification": "PR #125 audit 2026-11-25: partner-listed ages and prices failed verification (wrong units, placeholder ranges). Hidden until re-checked against the provider.",
    "notes": "Maps listing \"Harahap Swimming Club\" at Situ Babakan, Jagakarsa is the same brand area as the Happy Kamper Jagakarsa branch class (2026-11-24). Harahap runs further branches (Beji, Bulungan, Ciracas, Condet, Pamulang) - not added in this batch. All class ages and prices are partner-listed (Happy Kamper), not provider-confirmed.",
    "priceListings": [
      {
        "sourceKind": "partner",
        "label": "Kelas Renang Reguler Dasar (Jagakarsa)",
        "amountIdr": 70000,
        "unit": "per session",
        "source": "Happy Kamper",
        "sourceUrl": "https://happykamper.io/id/activities/kelas-renang-reguler-dasar-cabang-jagakarsa",
        "checkedAt": "2026-11-24"
      }
    ],
    "operatingStatus": {
      "state": "partner-listed",
      "source": "https://www.google.com/maps/search/?api=1&query=Harahap+Swimming+Club&query_place_id=ChIJsQL_LkvbGUsRpwWWS9q3SB0",
      "checkedAt": "2026-11-24"
    },
    "reviews": {
      "rating": 4,
      "reviewCount": 4,
      "source": "Google Maps",
      "sourceUrl": "https://www.google.com/maps/search/?api=1&query=Harahap+Swimming+Club&query_place_id=ChIJsQL_LkvbGUsRpwWWS9q3SB0",
      "checkedAt": "2026-11-24",
      "sampleNote": "Rating and count only; individual reviews not read (2026-11-24).",
      "praiseThemes": [],
      "complaintThemes": []
    }
  },
  {
    "id": "swim-starter-kalideres",
    "chain": null,
    "branchName": "The Swim Starter (Kalideres)",
    "categories": [
      "Swim"
    ],
    "address": "Jl. Bukit Permai 11.E1 16 6, RT.6/RW.9, Kalideres, Kec. Kalideres, Kota Jakarta Barat, Daerah Khusus Ibukota Jakarta 11840, Indonesia",
    "area": "Kalideres",
    "city": "Jakarta Barat",
    "lat": -6.147420899999999,
    "lng": 106.6938625,
    "coordinateSource": "maps-pin",
    "programs": [
      {
        "name": "Coba Kelas Renang Anak (trial)",
        "category": "Swim",
        "offering": "offered",
        "age": {
          "minMonths": 48,
          "maxMonths": 168,
          "level": "branch",
          "verification": "listed-unconfirmed",
          "providerAgeUrl": "https://happykamper.io/id/activities/coba-kelas-renang-anak-di-kalideres",
          "sourceCheckedAt": "2026-11-24"
        },
        "note": "Priced trial session for kids. Partner-listed (Happy Kamper, checked 2026-11-24); ages are partner-listed, not provider-confirmed. Confirm with the provider."
      }
    ],
    "sourceUrl": "https://happykamper.io/id/activities/coba-kelas-renang-anak-di-kalideres",
    "lastCheckedAt": "2026-11-24",
    "fitStatus": "media-claimed",
    "pendingReverification": "PR #125 audit 2026-11-25: partner-listed ages and prices failed verification (wrong units, placeholder ranges). Hidden until re-checked against the provider.",
    "notes": "Maps has The Swim Starter branches in Kalideres and Kebayoran Baru (2026-11-24); Happy Kamper lists trial classes in Kalideres, Bekasi, Cengkareng and Jakarta Selatan. Only Kalideres matches a Maps listing, so only that branch is added. All class ages and prices are partner-listed (Happy Kamper), not provider-confirmed.",
    "priceListings": [
      {
        "sourceKind": "partner",
        "label": "Coba Kelas Renang Anak (trial)",
        "amountIdr": 25000,
        "unit": "per session",
        "source": "Happy Kamper",
        "sourceUrl": "https://happykamper.io/id/activities/coba-kelas-renang-anak-di-kalideres",
        "checkedAt": "2026-11-24"
      }
    ],
    "operatingStatus": {
      "state": "partner-listed",
      "source": "https://www.google.com/maps/search/?api=1&query=The+Swim+Starter+Kalideres&query_place_id=ChIJDYY1n_T5aS4Re3JX-VJblks",
      "checkedAt": "2026-11-24"
    },
    "reviews": {
      "rating": 5,
      "reviewCount": 1,
      "source": "Google Maps",
      "sourceUrl": "https://www.google.com/maps/search/?api=1&query=The+Swim+Starter+Kalideres&query_place_id=ChIJDYY1n_T5aS4Re3JX-VJblks",
      "checkedAt": "2026-11-24",
      "sampleNote": "Rating and count only; individual reviews not read (2026-11-24).",
      "praiseThemes": [],
      "complaintThemes": []
    }
  },
  {
    "id": "skola-bsd",
    "chain": null,
    "branchName": "SKOLA Indonesia (EduCenter BSD)",
    "categories": [
      "Enrichment"
    ],
    "address": "BSD, Gedung EduCenter BSD City, Jl. Sekolah Foresta No.8 Office 99, Lengkong Kulon, Kec. Pagedangan, Kabupaten Tangerang, Banten 15331, Indonesia",
    "area": "BSD City",
    "city": "Kabupaten Tangerang",
    "lat": -6.288394299999999,
    "lng": 106.6512595,
    "coordinateSource": "maps-pin",
    "programs": [
      {
        "name": "Act of Life",
        "category": "Enrichment",
        "offering": "offered",
        "age": {
          "minMonths": 48,
          "maxMonths": 84,
          "level": "branch",
          "verification": "listed-unconfirmed",
          "providerAgeUrl": "https://happykamper.io/id/activities/act-of-life",
          "sourceCheckedAt": "2026-11-24"
        },
        "note": "SKOLA is primarily a homeschooling provider; Act of Life is its class for ages 4-7. Partner-listed (Happy Kamper, checked 2026-11-24); ages are partner-listed, not provider-confirmed. Confirm with the provider."
      }
    ],
    "sourceUrl": "https://happykamper.io/id/activities/act-of-life",
    "lastCheckedAt": "2026-11-24",
    "fitStatus": "media-claimed",
    "pendingReverification": "PR #125 audit 2026-11-25: partner-listed ages and prices failed verification (wrong units, placeholder ranges). Hidden until re-checked against the provider.",
    "notes": "Maps listing \"SKOLA\" at EduCenter BSD City matches the provider (2026-11-24). All class ages and prices are partner-listed (Happy Kamper), not provider-confirmed.",
    "priceListings": [
      {
        "sourceKind": "partner",
        "label": "Act of Life",
        "amountIdr": 1650000,
        "unit": "per session",
        "source": "Happy Kamper",
        "sourceUrl": "https://happykamper.io/id/activities/act-of-life",
        "checkedAt": "2026-11-24"
      }
    ],
    "operatingStatus": {
      "state": "partner-listed",
      "source": "https://www.google.com/maps/search/?api=1&query=SKOLA&query_place_id=ChIJR_9ZOuz7aS4R_P2G7YxEFHk",
      "checkedAt": "2026-11-24"
    },
    "reviews": {
      "rating": 5,
      "reviewCount": 9,
      "source": "Google Maps",
      "sourceUrl": "https://www.google.com/maps/search/?api=1&query=SKOLA&query_place_id=ChIJR_9ZOuz7aS4R_P2G7YxEFHk",
      "checkedAt": "2026-11-24",
      "sampleNote": "Rating and count only; individual reviews not read (2026-11-24).",
      "praiseThemes": [],
      "complaintThemes": []
    }
  },
  {
    "id": "cadenza-anima-kebon-jeruk",
    "chain": null,
    "branchName": "Cadenza Anima Music & Art (Kebon Jeruk)",
    "categories": [
      "Dance",
      "Music",
      "Arts & Crafts"
    ],
    "address": "Jl. Raya Kebayoran Lama no.33C. Sukabumi Selatan Kec. Kb. Jeruk, RT.8/RW.1, Sukabumi Sel., Barat, Jakarta, Daerah Khusus Ibukota Jakarta 11560, Indonesia",
    "area": "Kebon Jeruk",
    "city": "Jakarta Barat",
    "lat": -6.2243999,
    "lng": 106.7784015,
    "coordinateSource": "maps-pin",
    "programs": [
      {
        "name": "Ballet Dance Class",
        "category": "Dance",
        "offering": "offered",
        "age": {
          "minMonths": 48,
          "maxMonths": 216,
          "level": "branch",
          "verification": "listed-unconfirmed",
          "providerAgeUrl": "https://happykamper.io/id/activities/ballet-dance-class",
          "sourceCheckedAt": "2026-11-24"
        },
        "note": "Happy Kamper lists a trial option for this class. Partner-listed (Happy Kamper, checked 2026-11-24); ages are partner-listed, not provider-confirmed. Confirm with the provider."
      },
      {
        "name": "Piano Class",
        "category": "Music",
        "offering": "offered",
        "age": {
          "minMonths": 48,
          "maxMonths": 216,
          "level": "branch",
          "verification": "listed-unconfirmed",
          "providerAgeUrl": "https://happykamper.io/id/activities/piano-class",
          "sourceCheckedAt": "2026-11-24"
        },
        "note": "Partner-listed (Happy Kamper, checked 2026-11-24); ages are partner-listed, not provider-confirmed. Confirm with the provider."
      },
      {
        "name": "Fun Art Drawing Class",
        "category": "Arts & Crafts",
        "offering": "offered",
        "age": {
          "minMonths": 48,
          "maxMonths": 216,
          "level": "branch",
          "verification": "listed-unconfirmed",
          "providerAgeUrl": "https://happykamper.io/id/activities/fun-art-drawing-class",
          "sourceCheckedAt": "2026-11-24"
        },
        "note": "Partner-listed (Happy Kamper, checked 2026-11-24); ages are partner-listed, not provider-confirmed. Confirm with the provider."
      }
    ],
    "sourceUrl": "https://happykamper.io/id/activities/ballet-dance-class",
    "lastCheckedAt": "2026-11-24",
    "fitStatus": "media-claimed",
    "pendingReverification": "PR #125 audit 2026-11-25: partner-listed ages and prices failed verification (wrong units, placeholder ranges). Hidden until re-checked against the provider.",
    "notes": "Maps listing \"Cadenza Anima Music School & Art Course\" is in Sukabumi Selatan, Kebon Jeruk (Jakarta Barat); Happy Kamper labels the provider Jakarta Selatan, so the city differs between sources (2026-11-24). A separate Depok preschool listing (Cadenza Anima Preschool GDC, ages 2-5) is not added in this batch. All class ages and prices are partner-listed (Happy Kamper), not provider-confirmed.",
    "priceListings": [
      {
        "sourceKind": "partner",
        "label": "Ballet Dance Class",
        "amountIdr": 295000,
        "unit": "per session",
        "source": "Happy Kamper",
        "sourceUrl": "https://happykamper.io/id/activities/ballet-dance-class",
        "checkedAt": "2026-11-24"
      },
      {
        "sourceKind": "partner",
        "label": "Piano Class",
        "amountIdr": 300000,
        "unit": "per session",
        "source": "Happy Kamper",
        "sourceUrl": "https://happykamper.io/id/activities/piano-class",
        "checkedAt": "2026-11-24"
      },
      {
        "sourceKind": "partner",
        "label": "Fun Art Drawing Class",
        "amountIdr": 850000,
        "unit": "per session",
        "source": "Happy Kamper",
        "sourceUrl": "https://happykamper.io/id/activities/fun-art-drawing-class",
        "checkedAt": "2026-11-24"
      }
    ],
    "operatingStatus": {
      "state": "partner-listed",
      "source": "https://www.google.com/maps/search/?api=1&query=Cadenza+Anima+Music+School+%26+Art+Course&query_place_id=ChIJIw3gSQDxaS4RzDGvDw2aoBM",
      "checkedAt": "2026-11-24"
    },
    "reviews": {
      "rating": 4.900000095367432,
      "reviewCount": 9,
      "source": "Google Maps",
      "sourceUrl": "https://www.google.com/maps/search/?api=1&query=Cadenza+Anima+Music+School+%26+Art+Course&query_place_id=ChIJIw3gSQDxaS4RzDGvDw2aoBM",
      "checkedAt": "2026-11-24",
      "sampleNote": "Rating and count only; individual reviews not read (2026-11-24).",
      "praiseThemes": [],
      "complaintThemes": []
    }
  },
];
