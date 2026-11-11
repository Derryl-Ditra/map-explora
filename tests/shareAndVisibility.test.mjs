import test from "node:test";
import assert from "node:assert/strict";
import { importTs } from "./loadTs.mjs";

const { buildShareText, SITE_URL } = await importTs("../src/utils/shareText.ts");
const { isShownToUsers } = await importTs("../src/utils/visibility.ts");
const { VENUES } = await importTs("../src/data/venues.ts");

const venue = {
  id: "test-venue",
  chain: "Rockstar Academy",
  branchName: "Lotte Mart Bintaro",
  area: "Tangerang Selatan",
  address: "CBD, Jl. MH Thamrin Jaya Sektor 7 No.06, Pd. Aren",
  programs: [{ name: "Learn & Play 1", offering: "offered", age: { minMonths: 6, maxMonths: 18, level: "branch", verification: "provider-confirmed", providerAgeUrl: "https://provider.example/ages" } }],
  reviews: { rating: 4.0, reviewCount: 52, source: "Google Maps" },
  distance: 2,
};

test("share text carries concise content and a short live app link", () => {
  const t = buildShareText({...venue,id:'test'});
  assert.equal(SITE_URL, "https://derryl-ditra.github.io/map-explora/");
  assert.match(t, /^Rockstar Academy Lotte Mart Bintaro \(Tangerang Selatan\)/);
  assert.ok(t.includes("Classes: Learn & Play 1 6-18mo"));
  assert.ok(t.includes("Google Maps: 4.0 (52 reviews)"));
  assert.ok(t.includes("Via Map Explora"));
  assert.match(t.split("\n").at(-1), /\?v=[a-z0-9]+$/);
  assert.doesNotMatch(t, /Straight-line|Under-5 class spot|Found via/);
});

test("only official-listed or partner-listed places are shown to users", () => {
  assert.equal(isShownToUsers({ operatingStatus: { state: "official-listed", checkedAt: "2026-11-04" } }), true);
  assert.equal(isShownToUsers({ operatingStatus: { state: "partner-listed", checkedAt: "2026-11-11" } }), true);
  assert.equal(isShownToUsers({ operatingStatus: { state: "maps-listed", checkedAt: "2026-11-04" } }), false);
  assert.equal(isShownToUsers({ operatingStatus: { state: "not-confirmed", checkedAt: "2026-11-04" } }), false);
  assert.equal(isShownToUsers({}), false);
});

test("hidden places stay in the dataset, and every venue has an operating status", () => {
  const hidden = VENUES.filter((v) => !isShownToUsers(v));
  assert.ok(VENUES.every((v) => v.operatingStatus), "a venue has no operatingStatus");
  assert.equal(VENUES.length - hidden.length, VENUES.filter((v) => v.operatingStatus.state === "official-listed" || v.operatingStatus.state === "partner-listed").length);
  assert.ok(hidden.length > 0, "rule hides nothing; gate is vacuous");
});

test("share lines use the verified evidence rule",()=>{
 const base=venue.programs[0];
 const t=buildShareText({...venue,programs:[{...base,name:"Hidden conflict",age:{...base.age,sourceConflict:true}},{...base,name:"Hidden ambiguity",note:"boundary ambiguous"},base]});
 assert.ok(t.includes("Learn & Play 1"));assert.ok(!t.includes("Hidden conflict"));assert.ok(!t.includes("Hidden ambiguity"));
});
