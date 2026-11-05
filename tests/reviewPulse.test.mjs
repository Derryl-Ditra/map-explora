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
