import type { ReviewSummary } from "@/types/venue";

// Review pulse display rules (Derryl, 2026-11-05; window method 2026-11-08):
// - a venue WITHOUT collected trend fields still shows the fallback line
// - a trend label shows ONLY when the stored evidence independently backs it.
//   Data that fails the guard renders the fallback, whatever it claims.
// - the latest-review date comes only from a sort=newest listing; relative
//   wording stays approximate (month precision) and is marked as such.
//
// Accepted evidence methods:
// - "maps-sort-newest": bounded sample of 20, 10+ dated reviews, present in
//   BOTH halves of the ISO-day period [from, to].
// - "maps-window-3m-3m": current 3 months vs prior 3 months inside a 6-month
//   window, 10+ dated reviews AND 3+ in each half; from/to are ISO months
//   (relative labels never become invented days) and approximate must be true.

export const REVIEW_TREND_FALLBACK = "Not enough recent reviews to judge a trend.";

function validIsoDay(value: string | undefined): boolean {
  if (typeof value !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const parsed = new Date(`${value}T00:00:00.000Z`);
  return !Number.isNaN(parsed.getTime()) && parsed.toISOString().slice(0, 10) === value;
}

function validIsoMonth(value: string | undefined): boolean {
  if (typeof value !== "string" || !/^\d{4}-(0[1-9]|1[0-2])$/.test(value)) return false;
  return true;
}

type TrendLabel = "improving" | "mixed" | "steady" | "worsening";

function evidenceBacked(reviews: ReviewSummary): boolean {
  const ev = reviews.trendEvidence;
  if (!reviews.trend || reviews.trend === "insufficient" || !ev) return false;
  if (!Number.isInteger(ev.sampled) || ev.sampled < 10) return false;
  if (!Number.isInteger(ev.olderHalf) || !Number.isInteger(ev.newerHalf)) return false;
  if (ev.olderHalf + ev.newerHalf !== ev.sampled) return false;
  if (ev.method === "maps-sort-newest") {
    return (
      ev.sampled <= 20 &&
      ev.olderHalf > 0 &&
      ev.newerHalf > 0 &&
      validIsoDay(ev.from) &&
      validIsoDay(ev.to) &&
      ev.from < ev.to
    );
  }
  if (ev.method === "maps-window-3m-3m") {
    return (
      ev.approximate === true &&
      ev.olderHalf >= 3 &&
      ev.newerHalf >= 3 &&
      validIsoMonth(ev.from) &&
      validIsoMonth(ev.to) &&
      ev.from < ev.to
    );
  }
  return false;
}

export function trendVerdict(reviews: ReviewSummary): {
  trend: TrendLabel | null;
  evidenceText: string | null;
} {
  if (!evidenceBacked(reviews)) {
    return { trend: null, evidenceText: null };
  }
  const ev = reviews.trendEvidence!;
  const trend = reviews.trend as TrendLabel;
  const halves =
    ev.method === "maps-window-3m-3m"
      ? ` (${ev.newerHalf} recent 3 mo vs ${ev.olderHalf} prior 3 mo, months approx.)`
      : "";
  return {
    trend,
    evidenceText: `${ev.sampled} dated reviews, ${ev.from} to ${ev.to}${halves}, ${reviews.source}, checked ${reviews.checkedAt}`,
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
