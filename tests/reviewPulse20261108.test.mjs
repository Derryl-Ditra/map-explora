import test from 'node:test';
import assert from 'node:assert/strict';
import { importTs } from './loadTs.mjs';

const { VENUES } = await importTs('../src/data/venues.ts');
const { REVIEW_PULSE_2026_11_08 } = await importTs('../src/data/review-pulse-2026-11-08.ts');
const { trendVerdict, reviewPulseLine, REVIEW_TREND_FALLBACK } = await importTs('../src/utils/reviewPulse.ts');

test('every stored 2026-11-08 trend label passes the evidence guard after merge', () => {
  let labeled = 0;
  let insufficient = 0;
  for (const venue of VENUES) {
    const pulse = REVIEW_PULSE_2026_11_08[venue.id];
    if (!pulse) continue;
    const reviews = venue.reviews;
    assert.ok(reviews, `${venue.id} keeps its review summary`);
    assert.equal(reviews.checkedAt, '2026-11-08');
    if (pulse.trend === 'insufficient') {
      insufficient++;
      assert.equal(reviewPulseLine(reviews).includes(REVIEW_TREND_FALLBACK), true, `${venue.id} falls back`);
      continue;
    }
    const verdict = trendVerdict(reviews);
    assert.equal(verdict.trend, pulse.trend, `${venue.id} label is backed by its stored evidence`);
    labeled++;
  }
  assert.equal(labeled + insufficient, Object.keys(REVIEW_PULSE_2026_11_08).length);
  assert.ok(labeled > 0);
});

test('window evidence uses month precision and the stated minimum', () => {
  for (const [id, pulse] of Object.entries(REVIEW_PULSE_2026_11_08)) {
    if (!pulse.trendEvidence) {
      assert.equal(pulse.trend, 'insufficient', `${id} without evidence is insufficient`);
      continue;
    }
    const ev = pulse.trendEvidence;
    assert.equal(ev.method, 'maps-window-3m-3m');
    assert.equal(ev.approximate, true, `${id} relative dates stay approximate`);
    assert.match(ev.from, /^\d{4}-\d{2}$/);
    assert.match(ev.to, /^\d{4}-\d{2}$/);
    assert.ok(ev.sampled >= 10, `${id} meets the 10-review minimum`);
    assert.ok(ev.olderHalf >= 3 && ev.newerHalf >= 3, `${id} meets the 3-per-half minimum`);
    assert.equal(ev.olderHalf + ev.newerHalf, ev.sampled);
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

test('declining rockstar branch carries its real counts', () => {
  const pulse = REVIEW_PULSE_2026_11_08['rockstar-academy-kota-kasablanka'];
  assert.equal(pulse.trend, 'worsening');
  assert.equal(pulse.trendEvidence.newerHalf, 3);
  assert.equal(pulse.trendEvidence.olderHalf, 9);
});
