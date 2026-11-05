import test from "node:test";
import assert from "node:assert/strict";
import { importTs } from "./loadTs.mjs";

const { reviewPulseLine, trendVerdict, REVIEW_TREND_FALLBACK } = await importTs(
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
  assert.equal(reviewPulseLine(r), REVIEW_TREND_FALLBACK);
});

test("guard: invalid evidence dates fall back", () => {
  const r = { ...base, trend: "worsening", trendEvidence: { ...goodEvidence, from: "not-a-date" } };
  assert.equal(reviewPulseLine(r), REVIEW_TREND_FALLBACK);
});

test("guard: wrong sampling method falls back", () => {
  const r = { ...base, trend: "improving", trendEvidence: { ...goodEvidence, method: "maps-sort-relevant" } };
  assert.equal(reviewPulseLine(r), REVIEW_TREND_FALLBACK);
});

test("backed trend shows label with sample count and date range", () => {
  const r = { ...base, trend: "improving", trendEvidence: goodEvidence };
  assert.equal(
    reviewPulseLine(r),
    "Trend: improving (14 dated reviews, 2026-06-02 to 2026-10-18).",
  );
});

test("insufficient trend always falls back", () => {
  const r = { ...base, trend: "insufficient", trendEvidence: goodEvidence };
  assert.equal(reviewPulseLine(r), REVIEW_TREND_FALLBACK);
});

test("approximate latest review is marked, never presented as exact", () => {
  const r = { ...base, latestReview: { date: "2026-10", approximate: true } };
  assert.equal(
    reviewPulseLine(r),
    `Latest review: 2026-10 (approx.). ${REVIEW_TREND_FALLBACK}`,
  );
});

test("exact latest review shows the ISO day", () => {
  const r = { ...base, latestReview: { date: "2026-10-18" }, trend: "mixed", trendEvidence: goodEvidence };
  assert.equal(
    reviewPulseLine(r),
    "Latest review: 2026-10-18. Trend: mixed (14 dated reviews, 2026-06-02 to 2026-10-18).",
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

test("guard accepts a real leap day and rejects a non-leap February 29", () => {
  const reviews = { ...base, trend: "mixed", trendEvidence: { ...goodEvidence, from: "2024-02-29" } };
  assert.equal(trendVerdict(reviews).trend, "mixed");
  assert.equal(trendVerdict({ ...reviews, trendEvidence: { ...reviews.trendEvidence, from: "2025-02-29" } }).trend, null);
});
