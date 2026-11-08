import type { ReviewSummary } from "@/types/venue";

// Review pulse display rules (Derryl, 2026-11-05; window method 2026-11-08):
// - a venue WITHOUT collected trend evidence still shows the fallback line
// - a trend label is DERIVED IN CODE from the stored per-half averages; a
//   stored trend claim alone is never trusted. Data that fails the guard
//   renders the fallback, whatever it claims.
// - the latest-review date comes only from a sort=newest listing; relative
//   wording stays approximate (month precision) and is marked as such.
//
// Accepted evidence methods:
// - "maps-sort-newest": bounded sample of 20, 10+ dated reviews, present in
//   BOTH halves of the ISO-day period [from, to].
// - "maps-window-3m-3m": current 3 months vs prior 3 months inside a 6-month
//   window, 10+ dated reviews AND 3+ in each half; from/to are ISO months
//   (relative labels never become invented days) and approximate must be true.
//
// Stated trend rule (window method): diff = newerAvg - olderAvg.
//   diff >= +0.3  -> improving
//   diff <= -0.3  -> worsening
//   otherwise     -> steady

export const TREND_THRESHOLD = 0.3;

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

function validAvg(value: number | undefined): value is number {
  return typeof value === "number" && value >= 1 && value <= 5;
}

function validSentiment(
  positive: number | undefined,
  negative: number | undefined,
  half: number,
): boolean {
  return (
    Number.isInteger(positive) &&
    Number.isInteger(negative) &&
    positive! >= 0 &&
    negative! >= 0 &&
    positive! + negative! === half
  );
}

export type DerivedTrend = "improving" | "steady" | "worsening";

// Derives the label from the stored per-half averages (the stated rule).
// Returns null when the averages are absent or invalid.
export function deriveTrend(
  olderAvg: number | undefined,
  newerAvg: number | undefined,
): DerivedTrend | null {
  if (!validAvg(olderAvg) || !validAvg(newerAvg)) return null;
  // round to 2 decimals first: 4.3 - 4.0 is 0.2999999999999998 in float and
  // would wrongly read as below the 0.3 threshold
  const diff = Math.round((newerAvg - olderAvg) * 100) / 100;
  if (diff >= TREND_THRESHOLD) return "improving";
  if (diff <= -TREND_THRESHOLD) return "worsening";
  return "steady";
}

type TrendLabel = "improving" | "mixed" | "steady" | "worsening";

function evidenceBacked(reviews: ReviewSummary): boolean {
  const ev = reviews.trendEvidence;
  if (!ev) return false;
  if (!Number.isInteger(ev.sampled) || ev.sampled < 10) return false;
  if (!Number.isInteger(ev.olderHalf) || !Number.isInteger(ev.newerHalf)) return false;
  if (ev.olderHalf + ev.newerHalf !== ev.sampled) return false;
  if (ev.method === "maps-sort-newest") {
    // Legacy method: no per-half averages stored, so only an explicit stored
    // label can back it (kept for old entries; no new data uses this).
    if (!reviews.trend || reviews.trend === "insufficient") return false;
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
      ev.from < ev.to &&
      validAvg(ev.olderAvg) &&
      validAvg(ev.newerAvg) &&
      validSentiment(ev.olderPositive, ev.olderNegative, ev.olderHalf) &&
      validSentiment(ev.newerPositive, ev.newerNegative, ev.newerHalf) &&
      validIsoDay(ev.checkedAt)
    );
  }
  return false;
}

const MONTH_NAMES = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];

export function formatIsoMonth(value: string): string {
  if (!validIsoMonth(value)) return value;
  const [year, month] = value.split("-");
  return `${MONTH_NAMES[Number(month) - 1]} ${year}`;
}

export function trendVerdict(reviews: ReviewSummary): {
  trend: TrendLabel | null;
  comparisonText: string | null;
  evidenceText: string | null;
} {
  if (!evidenceBacked(reviews)) {
    return { trend: null, comparisonText: null, evidenceText: null };
  }
  const ev = reviews.trendEvidence!;
  if (ev.method === "maps-window-3m-3m") {
    const trend = deriveTrend(ev.olderAvg, ev.newerAvg)!;
    return {
      trend,
      comparisonText:
        `Last 3 months: avg ${ev.newerAvg!.toFixed(1)} (${ev.newerHalf} reviews) ` +
        `vs prior 3 months: avg ${ev.olderAvg!.toFixed(1)} (${ev.olderHalf} reviews)`,
      evidenceText:
        `${ev.sampled} dated reviews, ${formatIsoMonth(ev.from)} to ${formatIsoMonth(ev.to)} ` +
        `(months approximate), ${reviews.source}, checked ${ev.checkedAt}`,
    };
  }
  const trend = reviews.trend as TrendLabel;
  return {
    trend,
    comparisonText: null,
    evidenceText: `${ev.sampled} dated reviews, ${ev.from} to ${ev.to}, ${reviews.source}, checked ${reviews.checkedAt}`,
  };
}

export function reviewPulseLine(reviews: ReviewSummary): string {
  const parts: string[] = [];
  const latest = reviews.latestReview;
  if (latest && latest.date) {
    parts.push(
      `Latest review: ${latest.approximate ? formatIsoMonth(latest.date) : latest.date}${latest.approximate ? " (month approx.)" : ""}.`,
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
