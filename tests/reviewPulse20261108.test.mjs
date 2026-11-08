import test from 'node:test';
import assert from 'node:assert/strict';
import { importTs } from './loadTs.mjs';

const { VENUES } = await importTs('../src/data/venues.ts');
const { REVIEW_PULSE_2026_11_08 } = await importTs('../src/data/review-pulse-2026-11-08.ts');
const { trendVerdict, deriveTrend, reviewPulseLine, REVIEW_TREND_FALLBACK } = await importTs('../src/utils/reviewPulse.ts');

test('every pulse key is a venue in this repo (no orphaned data)', () => {
  const ids = new Set(VENUES.map(v => v.id));
  for (const id of Object.keys(REVIEW_PULSE_2026_11_08)) {
    assert.ok(ids.has(id), `${id} has no matching venue`);
  }
});

test('every stored 2026-11-08 trend is derived from stored evidence after merge', () => {
  let labeled = 0;
  let unlabeled = 0;
  for (const venue of VENUES) {
    const pulse = REVIEW_PULSE_2026_11_08[venue.id];
    if (!pulse) continue;
    const reviews = venue.reviews;
    assert.ok(reviews, `${venue.id} keeps its review summary`);
    const verdict = trendVerdict(reviews);
    if (!pulse.trendEvidence) {
      unlabeled++;
      assert.equal(verdict.trend, null, `${venue.id} without evidence shows no label`);
      assert.equal(reviewPulseLine(reviews).includes(REVIEW_TREND_FALLBACK), true, `${venue.id} falls back`);
      continue;
    }
    labeled++;
    // the label the card shows is recomputed from the stored averages
    assert.equal(verdict.trend, deriveTrend(pulse.trendEvidence.olderAvg, pulse.trendEvidence.newerAvg), `${venue.id} label matches the stated rule`);
    assert.ok(verdict.comparisonText.includes(`(${pulse.trendEvidence.newerHalf} reviews)`), `${venue.id} shows newer-half count`);
    assert.ok(verdict.comparisonText.includes(`(${pulse.trendEvidence.olderHalf} reviews)`), `${venue.id} shows older-half count`);
  }
  assert.equal(labeled + unlabeled, Object.keys(REVIEW_PULSE_2026_11_08).length);
  assert.ok(labeled > 0);
});

test('window evidence uses month precision, the stated minimum and full per-half evidence', () => {
  for (const [id, pulse] of Object.entries(REVIEW_PULSE_2026_11_08)) {
    if (!pulse.trendEvidence) continue;
    const ev = pulse.trendEvidence;
    assert.equal(ev.method, 'maps-window-3m-3m');
    assert.equal(ev.approximate, true, `${id} relative dates stay approximate`);
    assert.match(ev.from, /^\d{4}-\d{2}$/);
    assert.match(ev.to, /^\d{4}-\d{2}$/);
    assert.equal(ev.checkedAt, '2026-11-08', `${id} pulse collection day`);
    assert.ok(ev.sampled >= 10, `${id} meets the 10-review minimum`);
    assert.ok(ev.olderHalf >= 3 && ev.newerHalf >= 3, `${id} meets the 3-per-half minimum`);
    assert.equal(ev.olderHalf + ev.newerHalf, ev.sampled);
    assert.ok(ev.olderAvg >= 1 && ev.olderAvg <= 5, `${id} older average in range`);
    assert.ok(ev.newerAvg >= 1 && ev.newerAvg <= 5, `${id} newer average in range`);
    assert.equal(ev.olderPositive + ev.olderNegative, ev.olderHalf, `${id} older sentiment sums`);
    assert.equal(ev.newerPositive + ev.newerNegative, ev.newerHalf, `${id} newer sentiment sums`);
  }
});

test('complaint themes carry their reviewer counts', () => {
  for (const [id, pulse] of Object.entries(REVIEW_PULSE_2026_11_08)) {
    assert.equal(pulse.complaintThemes.length, pulse.complaintThemeReviewers.length, `${id} parallel counts`);
    for (const n of pulse.complaintThemeReviewers) {
      assert.ok(Number.isInteger(n) && n >= 1, `${id} reviewer count is a positive integer`);
      assert.ok(n <= pulse.lowRatedCount, `${id} theme support cannot exceed low-rated total`);
    }
    assert.ok(pulse.complaintThemes.length <= 3, `${id} at most top 3 themes`);
  }
});

test('branches with no review list stay out of the pulse', () => {
  for (const id of [
    'baby-jumper-gym-gading-serpong',
    'gymboree-play-music-kelapa-gading',
    'sparks-sports-academy-cibubur',
    'sparks-sports-academy-sawangan',
  ]) {
    assert.equal(REVIEW_PULSE_2026_11_08[id], undefined, `${id} was flagged, not collected`);
  }
});

test('old themes keep their original checked date when the pulse adds none', () => {
  // i-can-read-bintaro: pulse collected no complaint themes, so the 2026-11-03
  // theme collection date must NOT move forward to 2026-11-08.
  const venue = VENUES.find(v => v.id === 'i-can-read-bintaro');
  assert.equal(venue.reviews.complaintThemes.length, 0);
  assert.equal(venue.reviews.checkedAt, '2026-11-03');
  // but the pulse evidence itself carries its own collection day
  assert.equal(venue.reviews.trendEvidence.checkedAt, '2026-11-08');
});

test('worsening rockstar branch carries its real evidence', () => {
  const pulse = REVIEW_PULSE_2026_11_08['rockstar-academy-kota-kasablanka'];
  assert.equal(pulse.trendEvidence.newerHalf, 3);
  assert.equal(pulse.trendEvidence.olderHalf, 9);
  assert.equal(pulse.trendEvidence.newerAvg, 3.67);
  assert.equal(pulse.trendEvidence.olderAvg, 4.44);
  const venue = VENUES.find(v => v.id === 'rockstar-academy-kota-kasablanka');
  const verdict = trendVerdict(venue.reviews);
  assert.equal(verdict.trend, 'worsening');
  assert.equal(
    verdict.comparisonText,
    'Last 3 months: avg 3.7 (3 reviews) vs prior 3 months: avg 4.4 (9 reviews)',
  );
});
