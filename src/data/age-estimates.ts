import type { Venue } from "../types/venue";

export interface AgeEstimate {
  name: string;
  minMonths: number;
  maxMonths: number;
  rule: "latest-dated-official" | "conservative-overlap";
  reason: string;
  sources: string[];
  sourceDate: string | null;
  checkedAt: string;
}

// Planning estimates are separate from provider claims. Never merge into ageMatch.
const AGE_ESTIMATES: Record<string, AgeEstimate[]> = {
  "rockstar-academy-gandaria-city": [
    {
      "name": "Learn & Play 1",
      "minMonths": 6,
      "maxMonths": 18,
      "rule": "latest-dated-official",
      "reason": "Current Winter term PDF selected over the undated web grid. The grid still disagrees; this is a planning estimate, not confirmed eligibility.",
      "sources": [
        "https://www.rockstaracademy.com/lib/upload/files/club/GC_Schedule_Winter_20261.pdf",
        "https://www.rockstaracademy.com/id/jadwal-dan-lokasi/gandaria-city"
      ],
      "sourceDate": "2026-10-19",
      "checkedAt": "2026-11-05"
    },
    {
      "name": "Learn & Play 2",
      "minMonths": 19,
      "maxMonths": 35,
      "rule": "latest-dated-official",
      "reason": "Current Winter term PDF selected over the undated web grid. The grid still disagrees; this is a planning estimate, not confirmed eligibility.",
      "sources": [
        "https://www.rockstaracademy.com/lib/upload/files/club/GC_Schedule_Winter_20261.pdf",
        "https://www.rockstaracademy.com/id/jadwal-dan-lokasi/gandaria-city"
      ],
      "sourceDate": "2026-10-19",
      "checkedAt": "2026-11-05"
    }
  ],
  "aquatic-baby-bintaro": [
    {
      "name": "Baby Class",
      "minMonths": 6,
      "maxMonths": 24,
      "rule": "conservative-overlap",
      "reason": "No reliable source date. Use the overlap of the provider summary (6 months to 2 years) and detail (3 months to 2 years). This is not a safety assessment; exact branch eligibility remains unverified.",
      "sources": [
        "https://aquatic-baby.com/program-1",
        "https://aquatic-baby.com/faq"
      ],
      "sourceDate": null,
      "checkedAt": "2026-11-05"
    }
  ],
  "the-funtastic-gym-pondok-indah": [
    {
      "name": "Funny Bugs",
      "minMonths": 36,
      "maxMonths": 47,
      "rule": "conservative-overlap",
      "reason": "Undated branch timetable says 3 years; class page says 3 to 4 years. Estimate only the completed third year (36 to 47 months), excluding the disputed fourth year. Venue location conflict remains.",
      "sources": [
        "https://thefuntasticgym.com/schedule/schedules-pondok-indah-mall-2/",
        "https://thefuntasticgym.com/funnybugs/"
      ],
      "sourceDate": null,
      "checkedAt": "2026-11-05"
    }
  ],
  "membumi-playspace-cibubur": [
    {
      "name": "GYM Bayi",
      "minMonths": 8,
      "maxMonths": 18,
      "rule": "latest-dated-official",
      "reason": "November 2026 branch timetable selected over product text (8 to 19 months). Product page still shows 30 October. Conflicting upper bounds remain unverified.",
      "sources": [
        "https://cdn3.take.app/media/cmvnxk8dp000309l24yqmhues.jpg?width=3840",
        "https://take.app/membumiplayspace/p/cmubzi8r500000agm1cqjrjxi"
      ],
      "sourceDate": "2026-11",
      "checkedAt": "2026-11-05"
    }
  ]
};

export function estimatedPrograms(venue: Venue): AgeEstimate[] {
  return (AGE_ESTIMATES[venue.id] ?? []).filter(estimate =>
    venue.programs.some(p => p.name === estimate.name && p.offering === "offered")
  );
}
