import test from 'node:test';
import assert from 'node:assert/strict';
import { importTs } from './loadTs.mjs';
const { VENUES } = await importTs('../src/data/venues.ts');
const { decidedAgeRange, decidedAgeSummary } = await importTs('../src/utils/decideAge.ts');
const { cardAgeSummary } = await importTs('../src/utils/venueSummary.ts');

test('every venue gets a decided age range - no undecided cases', () => {
  for (const v of VENUES) {
    const d = decidedAgeRange(v);
    assert.ok(Number.isFinite(d.minMonths) && Number.isFinite(d.maxMonths), `${v.id} has finite bounds`);
    assert.ok(d.minMonths >= 0 && d.minMonths <= d.maxMonths, `${v.id} range is ordered`);
    assert.ok(['verified', 'brand', 'listed', 'general'].includes(d.confidence), `${v.id} confidence`);
    assert.ok(d.basis.length > 0, `${v.id} has a basis`);
  }
});

test('branch evidence wins over brand and listed data', () => {
  const bloom = VENUES.find((x) => x.id === 'bloom-space-kota-wisata');
  const d = decidedAgeRange(bloom);
  assert.equal(d.confidence, 'verified');
  assert.equal(d.minMonths, 6);
  assert.equal(d.maxMonths, 36);
});

test('brand-level official data outranks listed and general tiers', () => {
  const sparks = VENUES.find((x) => x.id === 'sparks-swim-bintaro-utown');
  const d = decidedAgeRange(sparks);
  assert.equal(d.confidence, 'brand');
  assert.equal(d.minMonths, 6);
  assert.equal(d.maxMonths, 60);
  assert.match(d.basis, /not confirmed for this branch/);
});

test('venues with no numeric evidence fall back to the under-5 span', () => {
  const g = VENUES.find((x) => x.id === 'gymnademics-bintaro');
  const d = decidedAgeRange(g);
  assert.deepEqual([d.minMonths, d.maxMonths, d.confidence], [0, 60, 'general']);
});

test('summaries below verified confidence always ask to confirm by phone first', () => {
  for (const v of VENUES) {
    const d = decidedAgeRange(v);
    if (d.confidence === 'verified') continue;
    assert.match(decidedAgeSummary(v), /confirm by phone first/, `${v.id} summary`);
  }
  assert.equal(decidedAgeSummary(VENUES.find((x) => x.id === 'sparks-swim-bintaro-utown')), 'Brand ages: 6 to 60 months - confirm by phone first');
  assert.equal(decidedAgeSummary(VENUES.find((x) => x.id === 'gymnademics-bintaro')), 'Ages not published - confirm by phone first');
});

test('card age summary is never a shrug', () => {
  for (const v of VENUES) {
    assert.doesNotMatch(cardAgeSummary(v), /not verified yet/, `${v.id} card summary`);
  }
});
