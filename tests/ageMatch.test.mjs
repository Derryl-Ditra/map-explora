import test from "node:test";
import assert from "node:assert/strict";
import { importTs } from "./loadTs.mjs";

const { claimCovers, claimCoversWithNote, venueConfirmedForAge } = await importTs("../src/utils/ageMatch.ts");

// Regression coverage for the two age filter paths that share claimCovers:
// the branchAge statement path and the per program claim path. Both must be
// exercised after any change to the shared helper.

const branchClaim = { minMonths: 6, maxMonths: 18, level: "branch", verification: "provider-confirmed", sourceCheckedAt: "2026-11-03" };

test("branchAge path: branch level confirmed claim covering the exact month confirms", () => {
  const v = { branchAge: branchClaim, programs: [] };
  assert.equal(venueConfirmedForAge(v, 14), true);
});

test("program path: offered program with branch level confirmed claim confirms", () => {
  const v = { programs: [{ name: "Baby Gym", offering: "offered", age: branchClaim }] };
  assert.equal(venueConfirmedForAge(v, 14), true);
});

test("shared helper: an unresolved bound never covers, on both paths", () => {
  const open = { ...branchClaim, maxMonths: null };
  assert.equal(claimCovers(open, 14), null);
  assert.equal(venueConfirmedForAge({ branchAge: open, programs: [] }, 14), false);
  assert.equal(venueConfirmedForAge({ programs: [{ name: "Baby Gym", offering: "offered", age: open }] }, 14), false);
});

test("ambiguity note: a flagged upper bound does not confirm the exact boundary month", () => {
  const p = { name: "Baby Gym", offering: "offered", age: branchClaim, note: "upper-bound 18 months ambiguous in source" };
  assert.equal(claimCoversWithNote(branchClaim, 18, p.note), null);
  assert.equal(venueConfirmedForAge({ programs: [p] }, 18), false);
  assert.equal(venueConfirmedForAge({ programs: [p] }, 17), true);
});

test("brand level ages never confirm, even for an offered program", () => {
  const brand = { ...branchClaim, level: "brand" };
  const v = { programs: [{ name: "Baby Gym", offering: "offered", age: brand }] };
  assert.equal(venueConfirmedForAge(v, 14), false);
});

test("listed-unconfirmed and unknown claims never confirm", () => {
  assert.equal(claimCovers({ ...branchClaim, verification: "listed-unconfirmed" }, 14), null);
  assert.equal(claimCovers({ ...branchClaim, verification: "unknown" }, 14), null);
});

test("a program that is not offered cannot confirm", () => {
  const v = { programs: [{ name: "Baby Gym", offering: "unknown", age: branchClaim }] };
  assert.equal(venueConfirmedForAge(v, 14), false);
});
