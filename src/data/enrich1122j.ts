import type { ReviewSummary, Venue } from "@/types/venue";

// Round J (2026-11-22): Google Maps newest-review pulse for 25 venues,
// collected 22 Nov 2026 via sort-by-newest (signed-in secondary account,
// read-only). Relative date labels are stored at month precision only
// (approximate: true), never invented days: days/1-3 weeks = 2026-11,
// "4 weeks"/"a month" = 2026-10, "N months ago" = 2026-11 minus N.
// Trend evidence follows the 2026-11-08 method: current 3 months
// (2026-09..11) vs prior 3 months (2026-06..08) inside the 6-month window;
// stored only when the minimum is met (10+ dated reviews in the window AND
// 3+ in each half). The trend label is derived in code (reviewPulse.ts);
// complaint themes are untouched. Venues below the minimum get only the
// latest-review month, which refreshes the card's liveness line.

type ReviewPulseJ = {
  latestReview: { date: string; approximate: true };
  trendEvidence?: NonNullable<ReviewSummary["trendEvidence"]> & {
    method: "maps-window-3m-3m";
    checkedAt: string;
  };
};

export const REVIEW_PULSE_2026_11_22_J: Record<string, ReviewPulseJ> = {
  "anak-air-pondok-indah": {
    latestReview: { date: "2026-11", approximate: true },
  },
  "aquababies-bintaro": {
    latestReview: { date: "2026-03", approximate: true },
  },
  "bright-little-stars-kemang": {
    latestReview: { date: "2026-05", approximate: true },
  },
  "deen-haus-alkahf-bintaro": {
    latestReview: { date: "2026-08", approximate: true },
  },
  "english-1-aeon-sentul": {
    latestReview: { date: "2026-11", approximate: true },
  },
  "english-1-cibubur": {
    latestReview: { date: "2026-11", approximate: true },
    trendEvidence: {
      method: "maps-window-3m-3m",
      sampled: 50,
      from: "2026-06",
      to: "2026-11",
      approximate: true,
      olderHalf: 39,
      newerHalf: 11,
      olderAvg: 4.92,
      newerAvg: 4.91,
      olderPositive: 39,
      olderNegative: 0,
      newerPositive: 11,
      newerNegative: 0,
      checkedAt: "2026-11-22",
    },
  },
  "english-1-cipete": {
    latestReview: { date: "2026-11", approximate: true },
    trendEvidence: {
      method: "maps-window-3m-3m",
      sampled: 16,
      from: "2026-06",
      to: "2026-11",
      approximate: true,
      olderHalf: 9,
      newerHalf: 7,
      olderAvg: 5.0,
      newerAvg: 4.71,
      olderPositive: 9,
      olderNegative: 0,
      newerPositive: 6,
      newerNegative: 1,
      checkedAt: "2026-11-22",
    },
  },
  "english-1-grand-wisata": {
    latestReview: { date: "2026-08", approximate: true },
  },
  "english-1-kemang-pratama": {
    latestReview: { date: "2026-11", approximate: true },
    trendEvidence: {
      method: "maps-window-3m-3m",
      sampled: 10,
      from: "2026-06",
      to: "2026-11",
      approximate: true,
      olderHalf: 4,
      newerHalf: 6,
      olderAvg: 5.0,
      newerAvg: 5.0,
      olderPositive: 4,
      olderNegative: 0,
      newerPositive: 6,
      newerNegative: 0,
      checkedAt: "2026-11-22",
    },
  },
  "english-1-sunter": {
    latestReview: { date: "2026-10", approximate: true },
    trendEvidence: {
      method: "maps-window-3m-3m",
      sampled: 30,
      from: "2026-06",
      to: "2026-11",
      approximate: true,
      olderHalf: 27,
      newerHalf: 3,
      olderAvg: 5.0,
      newerAvg: 5.0,
      olderPositive: 27,
      olderNegative: 0,
      newerPositive: 3,
      newerNegative: 0,
      checkedAt: "2026-11-22",
    },
  },
  "english-1-tamini-square": {
    latestReview: { date: "2026-11", approximate: true },
    trendEvidence: {
      method: "maps-window-3m-3m",
      sampled: 31,
      from: "2026-06",
      to: "2026-11",
      approximate: true,
      olderHalf: 12,
      newerHalf: 19,
      olderAvg: 5.0,
      newerAvg: 5.0,
      olderPositive: 12,
      olderNegative: 0,
      newerPositive: 19,
      newerNegative: 0,
      checkedAt: "2026-11-22",
    },
  },
  "gavrila-gymnastics-serpong": {
    latestReview: { date: "2026-11", approximate: true },
    trendEvidence: {
      method: "maps-window-3m-3m",
      sampled: 29,
      from: "2026-06",
      to: "2026-11",
      approximate: true,
      olderHalf: 14,
      newerHalf: 15,
      olderAvg: 4.93,
      newerAvg: 4.73,
      olderPositive: 14,
      olderNegative: 0,
      newerPositive: 14,
      newerNegative: 1,
      checkedAt: "2026-11-22",
    },
  },
  "gavrila-gymnastics-kelapa-gading": {
    latestReview: { date: "2026-11", approximate: true },
  },
  "i-can-read-gajah-mada": {
    latestReview: { date: "2026-02", approximate: true },
  },
  "i-can-read-kemang": {
    latestReview: { date: "2026-11", approximate: true },
  },
  "i-can-read-menteng": {
    latestReview: { date: "2026-11", approximate: true },
  },
  "kiddiegym-bogor-siliwangi": {
    latestReview: { date: "2026-11", approximate: true },
    trendEvidence: {
      method: "maps-window-3m-3m",
      sampled: 59,
      from: "2026-06",
      to: "2026-11",
      approximate: true,
      olderHalf: 37,
      newerHalf: 22,
      olderAvg: 4.95,
      newerAvg: 4.95,
      olderPositive: 36,
      olderNegative: 1,
      newerPositive: 22,
      newerNegative: 0,
      checkedAt: "2026-11-22",
    },
  },
  "kiddies88-havana-setiamekar": {
    latestReview: { date: "2026-11", approximate: true },
  },
  "kiddies88-maspen-cimuning": {
    latestReview: { date: "2026-11", approximate: true },
    trendEvidence: {
      method: "maps-window-3m-3m",
      sampled: 14,
      from: "2026-06",
      to: "2026-11",
      approximate: true,
      olderHalf: 8,
      newerHalf: 6,
      olderAvg: 4.5,
      newerAvg: 4.83,
      olderPositive: 7,
      olderNegative: 1,
      newerPositive: 6,
      newerNegative: 0,
      checkedAt: "2026-11-22",
    },
  },
  "kiddies88-waterland-transyogi": {
    latestReview: { date: "2026-11", approximate: true },
    trendEvidence: {
      method: "maps-window-3m-3m",
      sampled: 22,
      from: "2026-06",
      to: "2026-11",
      approximate: true,
      olderHalf: 8,
      newerHalf: 14,
      olderAvg: 3.88,
      newerAvg: 4.71,
      olderPositive: 5,
      olderNegative: 3,
      newerPositive: 13,
      newerNegative: 1,
      checkedAt: "2026-11-22",
    },
  },
  "kiddies88-wijaya-wisma-jaya": {
    latestReview: { date: "2026-10", approximate: true },
  },
  "kimi-friends-montessori-gading-serpong": {
    latestReview: { date: "2026-10", approximate: true },
    trendEvidence: {
      method: "maps-window-3m-3m",
      sampled: 20,
      from: "2026-06",
      to: "2026-11",
      approximate: true,
      olderHalf: 14,
      newerHalf: 6,
      olderAvg: 5.0,
      newerAvg: 5.0,
      olderPositive: 14,
      olderNegative: 0,
      newerPositive: 6,
      newerNegative: 0,
      checkedAt: "2026-11-22",
    },
  },
  "kinderra-play-cakung": {
    latestReview: { date: "2026-09", approximate: true },
  },
  "membumi-playspace-cibubur": {
    latestReview: { date: "2026-04", approximate: true },
  },
  "rockstar-academy-aeon-mall-deltamas": {
    latestReview: { date: "2026-11", approximate: true },
  },
};

export default function enrich1122j(venues: Venue[]) {
  for (const [id, pulse] of Object.entries(REVIEW_PULSE_2026_11_22_J)) {
    const v = venues.find((x) => x.id === id);
    if (!v) throw new Error(`enrich1122j: missing venue ${id}`);
    if (!v.reviews) continue;
    v.reviews = {
      ...v.reviews,
      latestReview: pulse.latestReview,
      trendEvidence: pulse.trendEvidence ?? v.reviews.trendEvidence,
    };
  }
}
