import type { Venue } from "@/types/venue";

// Source-backed Nov 13 enrichment. Details and before/after: docs/daily-refresh-2026-11-13.md.
const UPDATES: Record<string, Partial<Venue>> = {
  "anak-air-grand-cibubur": {
    "priceListings": [
      {
        "sourceKind": "official",
        "checkedAt": "2026-11-13",
        "amountIdr": 715000,
        "unit": "per package",
        "label": "One child, 4 lessons x 30 minutes",
        "source": "Anak Air official rate card",
        "sourceUrl": "https://www.anakair.co.id/wp-content/uploads/2026/08/Harga-Cibubur-1024x793.png",
        "note": "Registration is separate below. No validity period or baby-class allocation is stated; confirm the applicable program and current fee."
      },
      {
        "sourceKind": "official",
        "checkedAt": "2026-11-13",
        "amountIdr": 275000,
        "unit": "registration fee",
        "label": "Separate registration charge",
        "source": "Anak Air official branch page",
        "sourceUrl": "https://www.anakair.co.id/cabang-cibubur/",
        "note": "Confirm whether this charge applies to your enrolment. Not included in the package price above."
      }
    ]
  },
  "anak-air-kebagusan": {
    "priceListings": [
      {
        "sourceKind": "official",
        "checkedAt": "2026-11-13",
        "amountIdr": 715000,
        "unit": "per package",
        "label": "One child, 4 lessons x 30 minutes",
        "source": "Anak Air official rate card",
        "sourceUrl": "https://www.anakair.co.id/wp-content/uploads/2026/08/Harga-TB-Simatupang-1024x793.png",
        "note": "Registration is separate below. No validity period or baby-class allocation is stated; confirm the applicable program and current fee."
      },
      {
        "sourceKind": "official",
        "checkedAt": "2026-11-13",
        "amountIdr": 275000,
        "unit": "registration fee",
        "label": "Separate registration charge",
        "source": "Anak Air official branch page",
        "sourceUrl": "https://www.anakair.co.id/cabang-tb-simatupang/",
        "note": "Confirm whether this charge applies to your enrolment. Not included in the package price above."
      }
    ]
  },
  "anak-air-kemang": {
    "priceListings": [
      {
        "sourceKind": "official",
        "checkedAt": "2026-11-13",
        "amountIdr": 825000,
        "unit": "per package",
        "label": "One child, 4 lessons x 30 minutes",
        "source": "Anak Air official rate card",
        "sourceUrl": "https://www.anakair.co.id/wp-content/uploads/2026/08/Harga-Kemang-1024x793.png",
        "note": "Registration is separate below. No validity period or baby-class allocation is stated; confirm the applicable program and current fee."
      },
      {
        "sourceKind": "official",
        "checkedAt": "2026-11-13",
        "amountIdr": 275000,
        "unit": "registration fee",
        "label": "Separate registration charge",
        "source": "Anak Air official branch page",
        "sourceUrl": "https://www.anakair.co.id/cabang-kemang/",
        "note": "Confirm whether this charge applies to your enrolment. Not included in the package price above."
      }
    ]
  },
  "anak-air-limo": {
    "priceListings": [
      {
        "sourceKind": "official",
        "checkedAt": "2026-11-13",
        "amountIdr": 605000,
        "unit": "per package",
        "label": "One child, 4 lessons x 30 minutes",
        "source": "Anak Air official rate card",
        "sourceUrl": "https://www.anakair.co.id/wp-content/uploads/2026/08/Harga-Limo-1024x793.png",
        "note": "Registration is separate below. No validity period or baby-class allocation is stated; confirm the applicable program and current fee."
      },
      {
        "sourceKind": "official",
        "checkedAt": "2026-11-13",
        "amountIdr": 275000,
        "unit": "registration fee",
        "label": "Separate registration charge",
        "source": "Anak Air official branch page",
        "sourceUrl": "https://www.anakair.co.id/cabang-limo/",
        "note": "Confirm whether this charge applies to your enrolment. Not included in the package price above."
      }
    ]
  },
  "anak-air-pondok-indah": {
    "priceListings": [
      {
        "sourceKind": "official",
        "checkedAt": "2026-11-13",
        "amountIdr": 825000,
        "unit": "per package",
        "label": "One child, 4 lessons x 30 minutes",
        "source": "Anak Air official rate card",
        "sourceUrl": "https://www.anakair.co.id/wp-content/uploads/2026/08/Harga-Pondok-Indah-1024x793.png",
        "note": "Registration is separate below. No validity period or baby-class allocation is stated; confirm the applicable program and current fee."
      },
      {
        "sourceKind": "official",
        "checkedAt": "2026-11-13",
        "amountIdr": 275000,
        "unit": "registration fee",
        "label": "Separate registration charge",
        "source": "Anak Air official branch page",
        "sourceUrl": "https://www.anakair.co.id/cabang-pondok-indah/",
        "note": "Confirm whether this charge applies to your enrolment. Not included in the package price above."
      }
    ]
  },
  "bloom-space-kota-wisata": {
    "programs": [
      {
        "name": "Seedlings",
        "offering": "offered",
        "age": {
          "minMonths": 6,
          "maxMonths": 11,
          "level": "branch",
          "verification": "listed-unconfirmed",
          "sourceCheckedAt": "2026-11-13",
          "providerAgeUrl": "https://bloomspace.id/baby-gym",
          "sourceConflict": true
        },
        "note": "Age conflict: official baby-gym page says 6-11 months; official homepage says 6-12 months. Confirm eligibility with Bloom, especially at 12 months.",
        "noteUrl": "https://bloomspace.id/",
        "noteLabel": "Conflicting official homepage"
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
          "verification": "listed-unconfirmed",
          "sourceCheckedAt": "2026-11-13",
          "providerAgeUrl": "https://bloomspace.id/baby-gym",
          "sourceConflict": true
        },
        "note": "Age conflict: Bloom pages start at 19 months; the ABC Kids / Brighton school listing starts at 20 months. Confirm the 19-month boundary with Bloom.",
        "noteUrl": "https://abckids-brighton.sch.id/baby-gym",
        "noteLabel": "School listing: starts at 20 months"
      }
    ],
    "lastCheckedAt": "2026-11-13",
    "notes": "Official contact page lists the address and WhatsApp. Official Instagram has a Seedlings activity post dated 10 Nov 2026, but it gives no age range. Exact Seedlings and Growing Explorer boundaries remain unresolved, so those ages are not treated as confirmed. Maps pin and reviews are unchanged; the contact page map embeds Selera Klasik, not a verified Bloom entrance.",
    "phone": "+62 813-3339-7070"
  },
  "golden-baby-school-jakarta-garden-city": {
    "programs": [
      {
        "name": "Baby Crawler",
        "offering": "offered",
        "age": {
          "minMonths": 5,
          "maxMonths": 13,
          "providerAgeUrl": "https://goldenschool.id/the-baby-crawler-class-at-golden-baby-school/",
          "sourceCheckedAt": "2026-11-13",
          "level": "branch",
          "verification": "provider-confirmed"
        },
        "note": "Official page: Baby Crawler, 5-13 months; Saturday 09:00-10:00 WIB. Page undated; confirm the next class."
      }
    ],
    "priceListings": [
      {
        "sourceKind": "official",
        "checkedAt": "2026-11-13",
        "amountIdr": 100000,
        "unit": "per session",
        "label": "Baby Crawler class (5-13 months)",
        "source": "Golden Baby School",
        "sourceUrl": "https://goldenschool.id/the-baby-crawler-class-at-golden-baby-school/",
        "note": "No end date is stated. This is Baby Crawler, not preschool or daycare tuition. Confirm the next class and any registration fee.",
        "schedule": "Saturday 09:00-10:00 WIB"
      }
    ]
  },
  "gymnademics-gading-serpong": {
    "priceListings": [
      {
        "sourceKind": "official",
        "checkedAt": "2026-11-13",
        "amountIdr": 1000000,
        "unit": "per trial package",
        "label": "5 trial sessions, not regular tuition",
        "source": "GymnAdemics Gading Serpong",
        "sourceUrl": "https://gymnademics.id/id/admission/gading-serpong/",
        "note": "All 5 sessions must be used within 2 weeks; unused sessions are non-refundable. No end date or separate registration fee is stated.",
        "schedule": "Tuesday-Saturday, subject to the available schedule"
      }
    ]
  },
  "membumi-playspace-cibubur": {
    "priceListings": [
      {
        "sourceKind": "official",
        "checkedAt": "2026-11-13",
        "amountIdr": 734000,
        "unit": "per 2-week membership",
        "label": "Basic membership, November 2026 (listing marked estimated)",
        "source": "Membumi official storefront",
        "sourceUrl": "https://take.app/membumiplayspace/p/cmubbm6oo001k0agmftt3piki",
        "note": "Rp185,000 registration is separate. Advance booking and admin confirmation required; no walk-ins; subject to class availability. Full T&C are supplied after registration. Confirm eligibility, dates and refund terms before paying."
      },
      {
        "sourceKind": "official",
        "checkedAt": "2026-11-13",
        "amountIdr": 1174000,
        "unit": "per 1-month membership",
        "label": "Basic membership, November 2026 (listing marked estimated)",
        "source": "Membumi official storefront",
        "sourceUrl": "https://take.app/membumiplayspace/p/cmubbm6oo001k0agmftt3piki",
        "note": "Rp185,000 registration is separate. Not a class-specific price. Advance booking/admin confirmation required; no walk-ins. Full T&C, dates, eligibility and refund terms need confirmation."
      }
    ]
  },
  "the-funtastic-gym-pondok-indah": {
    "address": "Ground Floor, Outdoor Area, Pondok Indah Mall 1, Jakarta Selatan (official location page; confirm entrance before visiting)",
    "programs": [
      {
        "name": "Bugs",
        "offering": "offered",
        "age": {
          "minMonths": 4,
          "maxMonths": 10,
          "providerAgeUrl": "https://thefuntasticgym.com/schedule/schedules-pondok-indah-mall-1/",
          "sourceCheckedAt": "2026-11-13",
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
          "providerAgeUrl": "https://thefuntasticgym.com/schedule/schedules-pondok-indah-mall-1/",
          "sourceCheckedAt": "2026-11-13",
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
          "providerAgeUrl": "https://thefuntasticgym.com/schedule/schedules-pondok-indah-mall-1/",
          "sourceCheckedAt": "2026-11-13",
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
          "providerAgeUrl": "https://thefuntasticgym.com/schedule/schedules-pondok-indah-mall-1/",
          "sourceCheckedAt": "2026-11-13",
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
          "providerAgeUrl": "https://thefuntasticgym.com/schedule/schedules-pondok-indah-mall-1/",
          "sourceCheckedAt": "2026-11-13",
          "level": "branch",
          "verification": "provider-confirmed"
        },
        "note": "4mths-3yrs"
      }
    ],
    "sourceUrl": "https://thefuntasticgym.com/our-locations/",
    "lastCheckedAt": "2026-11-13",
    "notes": "Official location page names PIM1 Ground Floor / Outdoor Area and links a dedicated PIM1 schedule. Its Maps embed identifies the same branch place. The old PIM2 schedule is still live; Maps address still says PIM3. No relocation date is established. Coordinates and reviews are unchanged. Schedule is undated.",
    "caution": "Official location: PIM1 Ground Floor / Outdoor Area. Maps address still says PIM3 and an old PIM2 schedule remains live. Confirm the entrance with the branch before visiting; in-app routing remains off.",
    "operatingStatus": {
      "state": "official-listed",
      "source": "https://thefuntasticgym.com/our-locations/",
      "checkedAt": "2026-11-13"
    },
    "website": "https://thefuntasticgym.com/"
  }
};

export default function applyDailyEnrichment20261113(venues: Venue[]) {
  for (const venue of venues) {
    const update = UPDATES[venue.id];
    if (update) Object.assign(venue, update);
  }
}
