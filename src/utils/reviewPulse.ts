import type { ReviewSummary } from "@/types/venue";

// Review pulse display rules (Derryl, 2026-11-05):
// - a venue WITHOUT collected trend fields still shows the fallback line
// - a trend label shows ONLY when the stored evidence independently backs it:
//   10+ dated reviews, present in BOTH halves of the sample period, with valid
//   ISO bounds. Data that fails the guard renders the fallback, whatever it claims.
// - the latest-review date comes only from a sort=newest listing; relative
//   wording stays approximate (month precision) and is marked as such.

export const REVIEW_TREND_FALLBACK = "Not enough recent reviews to judge a trend.";

function validIsoDay(value: string | undefined): boolean {
  return !!value && !Number.isNaN(Date.parse(value));
}

export function trendVerdict(reviews: ReviewSummary): {
  trend: "improving" | "mixed" | "worsening" | null;
  evidenceText: string | null;
} {
  const ev = reviews.trendEvidence;
  const backed =
    reviews.trend !== undefined &&
    reviews.trend !== "insufficient" &&
    !!ev &&
    ev.method === "maps-sort-newest" &&
    ev.sampled >= 10 &&
    ev.olderHalf > 0 &&
    ev.newerHalf > 0 &&
    validIsoDay(ev.from) &&
    validIsoDay(ev.to);
  const trend = reviews.trend;
  if (!backed || !ev || !trend || trend === "insufficient") {
    return { trend: null, evidenceText: null };
  }
  return {
    trend,
    evidenceText: `${ev.sampled} dated reviews, ${ev.from} to ${ev.to}`,
  };
}

export function reviewPulseLine(reviews: ReviewSummary): string {
  const parts: string[] = [];
  const latest = reviews.latestReview;
  if (latest && latest.date) {
    parts.push(
      `Latest review: ${latest.date}${latest.approximate ? " (approx.)" : ""}.`,
    );
  }
  const verdict = trendVerdict(reviews);
  parts.push(
    verdict.trend
      ? `Trend: ${verdict.trend} (${verdict.evidenceText}).`
      : REVIEW_TREND_FALLBACK,
  );
  return parts.join(" ");
}
