import test from "node:test";
import assert from "node:assert/strict";
import { importTs } from "./loadTs.mjs";

const { VENUES } = await importTs("../src/data/venues.ts");

// Source evidence gate: every branch record traces to a source, and every
// provider-confirmed age claim carries the evidence behind that claim.

test("every venue record carries a source URL", () => {
  assert.ok(VENUES.length > 0, "dataset is empty");
  for (const v of VENUES) {
    assert.ok(typeof v.sourceUrl === "string" && v.sourceUrl.startsWith("http"), `${v.id} has no source URL`);
  }
});

test("every provider-confirmed age claim carries its evidence", () => {
  let checked = 0;
  const claims = [];
  for (const v of VENUES) {
    if (v.branchAge) claims.push([v.id, "branchAge", v.branchAge]);
    for (const p of v.programs) claims.push([v.id, p.name, p.age]);
  }
  for (const [venueId, label, age] of claims) {
    if (age.verification !== "provider-confirmed") continue;
    checked += 1;
    assert.ok(typeof age.providerAgeUrl === "string" && age.providerAgeUrl.startsWith("http"), `${venueId} ${label}: provider-confirmed claim without providerAgeUrl`);
    assert.ok(typeof age.sourceCheckedAt === "string" && age.sourceCheckedAt.length > 0, `${venueId} ${label}: provider-confirmed claim without sourceCheckedAt`);
  }
  assert.ok(checked > 0, "no provider-confirmed claims found; gate is vacuous");
});
