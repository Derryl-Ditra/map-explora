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

};

export function estimatedPrograms(venue: Venue): AgeEstimate[] {
  return (AGE_ESTIMATES[venue.id] ?? []).filter(estimate =>
    venue.programs.some(p => p.name === estimate.name && p.offering === "offered")
  );
}
