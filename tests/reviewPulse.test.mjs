import test from "node:test";
import assert from "node:assert/strict";
import { importTs } from "./loadTs.mjs";

const { reviewPulseLine, trendVerdict, deriveTrend, REVIEW_TREND_FALLBACK, TREND_THRESHOLD } = await importTs(
  "../src/utils/reviewPulse.ts",
);

const base = { rating: 4.5, reviewCount: 30, source: "Google Maps", checkedAt: "2026-11-05", praiseThemes: [], complaintThemes: [] };
const goodEvidence = { method: "maps-sort-newest", sampled: 14, from: "2026-06-02", to: "2026-10-18", olderHalf: 6, newerHalf: 8 };

test("record without trend fields still shows the fallback line", () => {
  assert.equal(reviewPulseLine(base), REVIEW_TREND_FALLBACK);
});

test("guard: claimed trend with fewer than 10 dated reviews falls back", () => {
  const r = { ...base, trend: "improving", trendEvidence: { ...goodEvidence, sampled: 7, olderHalf: 3, newerHalf: 4 } };
  assert.equal(trendVerdict(r).trend, null);
  assert.equal(reviewPulseLine(r), REVIEW_TREND_FALLBACK);
});

test("guard: 10+ sampled but an empty half falls back", () => {
  const r = { ...base, trend: "improving", trendEvidence: { ...goodEvidence, sampled: 12, olderHalf: 0, newerHalf: 12 } };
  assert.deepEqual(trendVerdict(r), { trend: null, comparisonText: null, evidenceText: null });
});

test("guard: invalid evidence dates fall back", () => {
  const r = { ...base, trend: "worsening", trendEvidence: { ...goodEvidence, from: "not-a-date" } };
  assert.equal(reviewPulseLine(r), REVIEW_TREND_FALLBACK);
});

test("guard: wrong sampling method falls back", () => {
  const r = { ...base, trend: "improving", trendEvidence: { ...goodEvidence, method: "maps-sort-relevant" } };
  assert.equal(reviewPulseLine(r), REVIEW_TREND_FALLBACK);
});

test("backed legacy trend shows label with sample count, date range, source and checked date", () => {
  const r = { ...base, trend: "improving", trendEvidence: goodEvidence };
  assert.equal(
    reviewPulseLine(r),
    "Trend: improving (14 dated reviews, 2026-06-02 to 2026-10-18, Google Maps, checked 2026-11-05).",
  );
});

test("insufficient legacy trend always falls back", () => {
  const r = { ...base, trend: "insufficient", trendEvidence: goodEvidence };
  assert.equal(reviewPulseLine(r), REVIEW_TREND_FALLBACK);
});

test("approximate latest review is shown at month precision in plain words", () => {
  const r = { ...base, latestReview: { date: "2026-10", approximate: true } };
  assert.equal(
    reviewPulseLine(r),
    `Latest review: Oct 2026 (month approx.). ${REVIEW_TREND_FALLBACK}`,
  );
});

test("exact latest review shows the ISO day", () => {
  const r = { ...base, latestReview: { date: "2026-10-18" }, trend: "mixed", trendEvidence: goodEvidence };
  assert.equal(
    reviewPulseLine(r),
    "Latest review: 2026-10-18. Trend: mixed (14 dated reviews, 2026-06-02 to 2026-10-18, Google Maps, checked 2026-11-05).",
  );
});

for (const [name, patch] of [
  ["reversed period", { from: "2026-10-18", to: "2026-01-01" }],
  ["zero-length period", { from: "2026-10-18", to: "2026-10-18" }],
  ["impossible calendar date", { from: "2026-02-30" }],
  ["non-ISO date", { from: "June 2, 2026" }],
  ["month-only date", { from: "2026-06" }],
  ["timestamp instead of day", { from: "2026-06-02T00:00:00Z" }],
  ["sample above newest-20 bound", { sampled: 21, olderHalf: 10, newerHalf: 11 }],
  ["fractional sample", { sampled: 14.5 }],
  ["fractional halves", { olderHalf: 6.5, newerHalf: 7.5 }],
  ["halves do not sum to sample", { olderHalf: 99, newerHalf: 99, sampled: 10 }],
  ["negative half", { olderHalf: -1, newerHalf: 15 }],
  ["non-finite sample", { sampled: Infinity }],
]) {
  test(`guard: ${name} falls back`, () => {
    const reviews = { ...base, trend: "improving", trendEvidence: { ...goodEvidence, ...patch } };
    assert.equal(trendVerdict(reviews).trend, null);
    assert.equal(reviewPulseLine(reviews), REVIEW_TREND_FALLBACK);
  });
}

test("guard accepts exact 10 and 20 sample limits with consistent halves", () => {
  for (const sampled of [10, 20]) {
    const reviews = { ...base, trend: "mixed", trendEvidence: { ...goodEvidence, sampled, olderHalf: sampled / 2, newerHalf: sampled / 2 } };
    assert.equal(trendVerdict(reviews).trend, "mixed");
  }
});

// 2026-11-08 window method: current 3 months vs prior 3 months, month precision.
// The label is DERIVED from the stored per-half averages (stated rule:
// diff = newerAvg - olderAvg; improving >= +0.3, worsening <= -0.3, else steady).
const windowEvidence = {
  method: "maps-window-3m-3m",
  sampled: 26,
  from: "2026-06",
  to: "2026-11",
  approximate: true,
  olderHalf: 20,
  newerHalf: 6,
  olderAvg: 4.5,
  newerAvg: 4.6,
  olderPositive: 18,
  olderNegative: 2,
  newerPositive: 5,
  newerNegative: 1,
  checkedAt: "2026-11-08",
};

test("deriveTrend implements the stated 0.3-star rule", () => {
  assert.equal(TREND_THRESHOLD, 0.3);
  assert.equal(deriveTrend(4.0, 4.3), "improving");
  assert.equal(deriveTrend(4.0, 4.29), "steady");
  assert.equal(deriveTrend(4.0, 3.7), "worsening");
  assert.equal(deriveTrend(4.0, 3.71), "steady");
  assert.equal(deriveTrend(4.0, 4.0), "steady");
  assert.equal(deriveTrend(undefined, 4.0), null);
  assert.equal(deriveTrend(0, 4.0), null);
  assert.equal(deriveTrend(4.0, 6), null);
});

test("window method: label comes from the averages, not a stored claim", () => {
  // stored claim says improving; averages say worsening -> derived wins
  const r = { ...base, trend: "improving", trendEvidence: { ...windowEvidence, olderAvg: 4.44, newerAvg: 3.67 } };
  assert.equal(trendVerdict(r).trend, "worsening");
  // no stored claim at all -> still derived
  const r2 = { ...base, trendEvidence: { ...windowEvidence, olderAvg: 4.44, newerAvg: 3.67 } };
  assert.equal(trendVerdict(r2).trend, "worsening");
});

test("window method: comparison line shows both averages and both counts", () => {
  const r = { ...base, trendEvidence: { ...windowEvidence, olderHalf: 9, newerHalf: 3, sampled: 12, olderAvg: 4.44, newerAvg: 3.67, olderPositive: 8, olderNegative: 1, newerPositive: 2, newerNegative: 1 } };
  const verdict = trendVerdict(r);
  assert.equal(verdict.trend, "worsening");
  assert.equal(
    verdict.comparisonText,
    "Last 3 months: avg 3.7 (3 reviews) vs prior 3 months: avg 4.4 (9 reviews)",
  );
  assert.equal(
    verdict.evidenceText,
    "12 dated reviews, Jun 2026 to Nov 2026 (months approximate), Google Maps, checked 2026-11-08",
  );
});

test("window method: steady when the averages move less than 0.3", () => {
  const r = { ...base, trendEvidence: windowEvidence };
  assert.equal(trendVerdict(r).trend, "steady");
});

test("window method: halves must each reach 3", () => {
  const thin = { ...base, trendEvidence: { ...windowEvidence, sampled: 10, olderHalf: 8, newerHalf: 2, newerPositive: 1, newerNegative: 1 } };
  assert.equal(trendVerdict(thin).trend, null);
  assert.equal(reviewPulseLine(thin), REVIEW_TREND_FALLBACK);
});

for (const [name, patch] of [
  ["month bounds not marked approximate", { approximate: undefined }],
  ["exact-day bounds on the window method", { from: "2026-06-01", to: "2026-11-08" }],
  ["same-month span", { from: "2026-09", to: "2026-09" }],
  ["reversed months", { from: "2026-11", to: "2026-06" }],
  ["impossible month", { from: "2026-13" }],
  ["halves do not sum", { olderHalf: 5, newerHalf: 5, sampled: 26 }],
  ["fewer than 10 sampled", { sampled: 9, olderHalf: 6, newerHalf: 3, olderPositive: 6, olderNegative: 0, newerPositive: 3, newerNegative: 0 }],
  ["missing older average", { olderAvg: undefined }],
  ["missing newer average", { newerAvg: undefined }],
  ["average above 5", { newerAvg: 5.2 }],
  ["average below 1", { olderAvg: 0.9 }],
  ["older sentiment does not sum to older half", { olderPositive: 10, olderNegative: 5 }],
  ["newer sentiment does not sum to newer half", { newerPositive: 0, newerNegative: 0 }],
  ["fractional sentiment count", { olderPositive: 18.5, olderNegative: -0.5 }],
  ["missing pulse checkedAt", { checkedAt: undefined }],
  ["invalid pulse checkedAt", { checkedAt: "Nov 8, 2026" }],
]) {
  test(`window guard: ${name} falls back`, () => {
    const reviews = { ...base, trendEvidence: { ...windowEvidence, ...patch } };
    assert.equal(trendVerdict(reviews).trend, null);
    assert.equal(reviewPulseLine(reviews), REVIEW_TREND_FALLBACK);
  });
}

test("window method: a stored trend claim alone is not enough", () => {
  const r = { ...base, trend: "improving" };
  assert.equal(trendVerdict(r).trend, null);
  assert.equal(reviewPulseLine(r), REVIEW_TREND_FALLBACK);
});

test("guard accepts a real leap day and rejects a non-leap February 29", () => {
  const reviews = { ...base, trend: "mixed", trendEvidence: { ...goodEvidence, from: "2024-02-29" } };
  assert.equal(trendVerdict(reviews).trend, "mixed");
  assert.equal(trendVerdict({ ...reviews, trendEvidence: { ...reviews.trendEvidence, from: "2025-02-29" } }).trend, null);
});
