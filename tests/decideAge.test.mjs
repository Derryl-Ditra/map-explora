import test from 'node:test';
import assert from 'node:assert/strict';
import { importTs } from './loadTs.mjs';
const { VENUES } = await importTs('../src/data/venues.ts');
const { decidedAgeRange, decidedAgeSummary, isTrueBrandProgram, ageSourceLabel } = await importTs('../src/utils/decideAge.ts');
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
    assert.match(decidedAgeSummary(v), /Confirm by phone first\./, `${v.id} summary`);
    assert.doesNotMatch(decidedAgeSummary(v), / - /, `${v.id} summary has no spaced hyphen`);
  }
  assert.equal(decidedAgeSummary(VENUES.find((x) => x.id === 'sparks-swim-bintaro-utown')), 'Brand ages: 6 mo to 5 yr. Confirm by phone first.');
  assert.equal(decidedAgeSummary(VENUES.find((x) => x.id === 'gymnademics-bintaro')), 'Ages not published. Confirm by phone first.');
});

test('brand card section admits only true brand-level provider-confirmed claims', () => {
  // QC on PR #106: Rockstar/Outgrow branch classes with boundary-ambiguous
  // notes and partner-listed classes (Happy Kamper, Teman Autis) are not
  // brand data and must not render under the brand heading.
  const rockstar = VENUES.find((x) => x.id === 'rockstar-academy-gandaria-city');
  assert.equal(rockstar.programs.filter((p) => p.offering === 'offered').some(isTrueBrandProgram), false);
  const outgrow = VENUES.find((x) => x.id === 'outgrow-alam-sutera');
  assert.equal(outgrow.programs.filter((p) => p.offering === 'offered').some(isTrueBrandProgram), false);
  for (const id of ['kinderra-play-cakung', 'morning-nest-preschool-bojongsari', 'sociable-inclusive-learning-meruya', 'buumi-playscape-pacific-place']) {
    const v = VENUES.find((x) => x.id === id);
    assert.ok(v, `${id} in dataset`);
    assert.equal(v.programs.filter((p) => p.offering === 'offered').some(isTrueBrandProgram), false, `${id} has no true brand programs`);
  }
  const icr = VENUES.find((x) => x.id === 'i-can-read-modernland');
  assert.ok(icr.programs.some(isTrueBrandProgram), 'I Can Read brand programs stay in the brand section');
  const sparks = VENUES.find((x) => x.id === 'sparks-swim-bintaro-utown');
  assert.ok(sparks.programs.some(isTrueBrandProgram), 'Sparks Swim brand programs stay in the brand section');
});

test('recorded class ages name their source per item', () => {
  const rockstar = VENUES.find((x) => x.id === 'rockstar-academy-gandaria-city');
  const crawler = rockstar.programs.find((p) => p.name === 'Crawler');
  assert.equal(ageSourceLabel(crawler), 'rockstaracademy.com');
  const kinderra = VENUES.find((x) => x.id === 'kinderra-play-cakung');
  assert.equal(ageSourceLabel(kinderra.programs[0]), 'happykamper.io');
});

test('card age summary is never a shrug', () => {
  for (const v of VENUES) {
    assert.doesNotMatch(cardAgeSummary(v), /not verified yet/, `${v.id} card summary`);
  }
});
