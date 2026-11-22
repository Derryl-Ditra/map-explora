import test from 'node:test';
import assert from 'node:assert/strict';
import { importTs } from './loadTs.mjs';
const { VENUES } = await importTs('../src/data/venues.ts');
const { REVIEW_PULSE_2026_11_22_J } = await importTs('../src/data/enrich1122j.ts');
const { isShownToUsers } = await importTs('../src/utils/visibility.ts');

// Round J (2026-11-22): newest-review pulse for 25 venues, count pins.
test('round J lifts latest-review and trend-evidence coverage', () => {
  const shown = VENUES.filter(isShownToUsers);
  assert.equal(Object.keys(REVIEW_PULSE_2026_11_22_J).length, 25);
  assert.equal(Object.values(REVIEW_PULSE_2026_11_22_J).filter(p => p.trendEvidence).length, 10);
  assert.equal(shown.filter(v => v.reviews?.latestReview).length, 146);
  assert.equal(shown.filter(v => v.reviews?.trendEvidence).length, 54);
});

test('round J per-venue pins: latest-review month and window evidence', () => {
  const v = id => VENUES.find(x => x.id === id);
  assert.deepEqual(v('i-can-read-menteng').reviews.latestReview, { date: '2026-11', approximate: true });
  assert.deepEqual(v('bright-little-stars-kemang').reviews.latestReview, { date: '2026-05', approximate: true });
  assert.deepEqual(v('kiddies88-wijaya-wisma-jaya').reviews.latestReview, { date: '2026-10', approximate: true });
  // Below the trend minimum (empty older half): no evidence stored.
  assert.equal(v('i-can-read-menteng').reviews.trendEvidence, undefined);
  // Trend evidence pinned for the two newly qualifying venues.
  const kimi = v('kimi-friends-montessori-gading-serpong').reviews.trendEvidence;
  assert.equal(kimi.method, 'maps-window-3m-3m');
  assert.equal(kimi.sampled, 20);
  assert.equal(kimi.olderHalf, 14);
  assert.equal(kimi.newerHalf, 6);
  assert.equal(kimi.checkedAt, '2026-11-22');
  const cibubur = v('english-1-cibubur').reviews.trendEvidence;
  assert.equal(cibubur.sampled, 50);
  assert.equal(cibubur.olderHalf + cibubur.newerHalf, 50);
  // Round J never touches complaint themes.
  assert.ok(Array.isArray(v('english-1-cibubur').reviews.complaintThemes));
});
