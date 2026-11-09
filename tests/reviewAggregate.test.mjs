import test from 'node:test';
import assert from 'node:assert/strict';
import { importTs } from './loadTs.mjs';
const { VENUES } = await importTs('../src/data/venues.ts');
test('aggregate refresh keeps source dates and unknown ratings honest', () => {
 const v = id => VENUES.find(v => v.id === id);
 assert.equal(v('sparks-sports-academy-kemang-ampera').reviews.rating, 4.6);
 assert.equal(v('i-can-read-bintaro').reviews.reviewCount, 726);
 assert.equal(v('english-1-pamulang-tangerang').reviews.rating, 4.8);
 assert.equal(v('sparks-sports-academy-cibubur').reviews?.rating ?? null, null);
 assert.equal(v('sparks-sports-academy-sawangan').reviews?.rating ?? null, null);
 // 2026-11-08 pulse: latest-review month is approximate; bintaro collected no
 // new complaint themes, so its theme collection date stays at 2026-11-03
 assert.deepEqual(v('i-can-read-bintaro').reviews.latestReview, { date: '2026-11', approximate: true });
 assert.equal(v('i-can-read-bintaro').reviews.checkedAt, '2026-11-03');
});
