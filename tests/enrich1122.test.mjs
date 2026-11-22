import test from 'node:test';
import assert from 'node:assert/strict';
import { importTs } from './loadTs.mjs';
const { VENUES } = await importTs('../src/data/venues.ts');
const { verifiedPrograms, hasVerifiedAgeEvidence, bestAvailableGroups } = await importTs('../src/utils/ageMatch.ts');
const { estimatedPrograms } = await importTs('../src/data/age-estimates.ts');
const { placeText } = await importTs('../src/utils/placeLanguage.ts');
const v = (id) => VENUES.find((x) => x.id === id);

test('no age sourceConflict remains anywhere in the dataset', () => {
  const conflicts = VENUES.flatMap((x) => (x.programs || []).filter((p) => p.age?.sourceConflict).map((p) => `${x.id}/${p.name}`));
  assert.deepEqual(conflicts, []);
});

test('Bloom one-month gaps settle with CDC as second opinion and stay verified', () => {
  const b = v('bloom-space-kota-wisata');
  assert.deepEqual(verifiedPrograms(b).map((p) => [p.name, p.age.minMonths, p.age.maxMonths]), [
    ['Seedlings', 6, 11],
    ['Little Sprouts', 12, 19],
    ['Growing Explorer', 19, 36],
  ]);
  const seedlings = b.programs.find((p) => p.name === 'Seedlings');
  assert.equal(seedlings.age.bestAvailable, true);
  assert.match(seedlings.age.bestAvailableNote, /CDC/);
  assert.match(seedlings.age.bestAvailableUrl, /cdc\.gov/);
  assert.ok(placeText(seedlings.note, 'id'));
  assert.ok(placeText(seedlings.age.bestAvailableNote, 'id'));
});

test('Membumi Gym Bayi settles to the dated timetable 8-18 months', () => {
  const m = v('membumi-playspace-cibubur');
  const g = m.programs.find((p) => p.name === 'GYM Bayi');
  assert.equal(g.age.verification, 'provider-confirmed');
  assert.equal(g.age.minMonths, 8);
  assert.equal(g.age.maxMonths, 18);
  assert.equal(g.age.bestAvailable, true);
  assert.ok(placeText(g.note, 'id'));
  assert.ok(placeText(g.age.bestAvailableNote, 'id'));
});

test('Rockstar Gandaria City Learn and Play settles to the dated term PDF', () => {
  const gc = v('rockstar-academy-gandaria-city');
  const lp1 = gc.programs.find((p) => p.name === 'Learn & Play 1');
  const lp2 = gc.programs.find((p) => p.name === 'Learn & Play 2');
  assert.equal(lp1.age.minMonths, 6);
  assert.equal(lp1.age.maxMonths, 18);
  assert.equal(lp2.age.minMonths, 19);
  assert.equal(lp2.age.maxMonths, 35);
  for (const p of [lp1, lp2]) {
    assert.equal(p.age.verification, 'provider-confirmed');
    assert.equal(p.age.bestAvailable, true);
    assert.ok(placeText(p.note, 'id'));
    assert.ok(placeText(p.age.bestAvailableNote, 'id'));
  }
  assert.equal(estimatedPrograms(gc).length, 0);
});

test('Kiddiegym Bogor replaces the vague 6-48 lump with named official classes', () => {
  const kg = v('kiddiegym-bogor-siliwangi');
  assert.equal(kg.programs.some((p) => p.name === 'Kiddiegym: Baby Gym'), false);
  const babes = kg.programs.find((p) => p.name === 'Kiddiegym: Kiddiebabes');
  assert.equal(babes.age.minMonths, 6);
  assert.equal(babes.age.maxMonths, 12);
  assert.match(babes.age.bestAvailableUrl, /who\.int/);
  assert.equal(babes.noteKind, undefined); // 2026-11-22 cuts PR: parent-review prose removed from cards
  for (const p of kg.programs) if (p.note) assert.ok(placeText(p.note, 'id'), `${p.name} note needs translation`); // 2026-11-22 cuts PR: Kiddiebabes note removed, skip note-less programs
});

test('brand-level general data fills no-age branches and never confirms a match', () => {
  const chains = {
    'I Can Read': ['I Can Read Discovery', 30, 83],
    'English 1': ['Small Stars', 36, 71],
    Aquababies: ['Baby Swim', 0, 35],
    'Music Wonderworld': ['Music class (baby and toddler)', 6, 47],
  };
  for (const [chain, [name, min, max]] of Object.entries(chains)) {
    const rows = VENUES.filter((x) => x.chain === chain && x.programs.some((p) => p.name === name));
    assert.ok(rows.length > 0, `${chain} should carry ${name}`);
    for (const x of rows) {
      const p = x.programs.find((q) => q.name === name);
      assert.equal(p.age.level, 'brand');
      assert.equal(p.age.verification, 'provider-confirmed');
      assert.equal(p.age.minMonths, min);
      assert.equal(p.age.maxMonths, max);
      assert.equal(p.age.bestAvailable, true);
      assert.ok(placeText(p.note, 'id'), `${x.id} ${name} note needs translation`);
      // brand-level ages must never produce a verified match on their own
      if (!x.branchAge) assert.equal(hasVerifiedAgeEvidence(x), false, `${x.id} must stay unverified`);
    }
  }
  const swim = VENUES.filter((x) => x.chain === 'Sparks Swim');
  assert.ok(swim.length >= 6);
  for (const x of swim) {
    assert.deepEqual(
      x.programs.map((p) => [p.name, p.age.minMonths, p.age.maxMonths]),
      [
        ['Baby Swim', 6, 18],
        ['Tiny Swim', 18, 36],
        ['Little Swim', 36, 60],
      ]
    );
    for (const p of x.programs) {
      assert.equal(p.age.level, 'brand');
      assert.equal(p.age.bestAvailable, true);
      assert.ok(placeText(p.note, 'id'), `${x.id} ${p.name} note needs translation`);
    }
  }
});

test('every bestAvailable marker carries its basis note', () => {
  for (const x of VENUES)
    for (const p of x.programs || [])
      if (p.age?.bestAvailable) {
        assert.ok(p.age.bestAvailableNote, `${x.id}/${p.name} missing bestAvailableNote`);
        assert.equal(p.age.sourceCheckedAt, '2026-11-22');
      }
});

test('best-available notes dedupe per venue: shared note renders once with grouped names', () => {
  const sparks = VENUES.find((x) => (x.programs || []).some((p) => p.name === 'Baby Swim' && p.age?.bestAvailableUrl?.includes('sparks-swim.com')));
  assert.ok(sparks, 'a Sparks Swim venue with best-available brand claims exists');
  const groups = bestAvailableGroups(sparks);
  assert.equal(groups.length, 1, 'identical shared note must collapse to one group');
  assert.deepEqual(groups[0].names, ['Baby Swim', 'Tiny Swim', 'Little Swim']);
  assert.match(groups[0].note, /Sparks Swim/);
});

test('best-available notes stay per-class when they differ (Bloom)', () => {
  const groups = bestAvailableGroups(v('bloom-space-kota-wisata'));
  assert.equal(groups.length, 2, 'Seedlings and Growing Explorer carry different notes');
  assert.ok(groups.every((g) => g.names.length === 1));
  assert.notEqual(groups[0].note, groups[1].note);
});


// 2026-11-22 round D pins: I Can Read shared enquiry phone.
// Source: official FAQ icanread.co.id/faq/ lists (021) 2258 0629 (checked 2026-11-22).
test('all I Can Read branches carry the shared enquiry line from the official FAQ', () => {
  const icr = VENUES.filter((x) => x.chain === 'I Can Read');
  assert.equal(icr.length, 27);
  for (const x of icr) assert.ok(x.phone, `${x.id} has no phone`);
  const filled = icr.filter((x) => x.phone === '(021) 2258 0629');
  assert.equal(filled.length, 8);
  for (const x of filled) assert.equal(x.phoneScope, 'shared-enquiry');
  // Branch-specific lines collected earlier keep their own numbers and stay unscoped.
  assert.equal(VENUES.find((x) => x.id === 'i-can-read-bintaro').phone, '+62 21 22214122');
  assert.equal(VENUES.find((x) => x.id === 'i-can-read-bintaro').phoneScope, undefined);
});
