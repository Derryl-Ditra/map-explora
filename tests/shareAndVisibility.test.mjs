import test from "node:test";
import assert from "node:assert/strict";
import { importTs } from "./loadTs.mjs";

const { buildShareText, SITE_URL } = await importTs("../src/utils/shareText.ts");
const { isShownToUsers } = await importTs("../src/utils/visibility.ts");
const { VENUES } = await importTs("../src/data/venues.ts");

const venue = {
  chain: "Rockstar Academy",
  branchName: "Lotte Mart Bintaro",
  area: "Tangerang Selatan",
  address: "CBD, Jl. MH Thamrin Jaya Sektor 7 No.06, Pd. Aren",
  programs: [{ name: "Learn & Play 1", offering: "offered", age: { minMonths: 6, maxMonths: 18, level: "branch", verification: "provider-confirmed", providerAgeUrl: "https://provider.example/ages" } }],
  reviews: { rating: 4.0, reviewCount: 52, source: "Google Maps" },
  distance: 2,
};

test("share text carries the live app link on its own final line", () => {
  assert.equal(SITE_URL, "https://derryl-ditra.github.io/map-explora/");
  const lines = buildShareText(venue).split("\n");
  assert.equal(lines[lines.length - 1], `${SITE_URL}?venue=${venue.id}`);
  assert.ok(lines.includes("Found via Map Explora (under-5 class map, Jabodetabek)"));
});

test("share text keeps the existing content", () => {
  const t = buildShareText(venue);
  assert.ok(t.startsWith("Under-5 class spot: Rockstar Academy Lotte Mart Bintaro (Tangerang Selatan)"));
  assert.ok(t.includes("Classes: Learn & Play 1 (6 mo to 18 mo)"));
  assert.ok(t.includes("Parent reviews: 4.0 on Google Maps (52 reviews)"));
  assert.ok(t.includes("Straight-line distance: 2 km"));
});

test("only official-listed places are shown to users", () => {
  assert.equal(isShownToUsers({ operatingStatus: { state: "official-listed", checkedAt: "2026-11-04" } }), true);
  assert.equal(isShownToUsers({ operatingStatus: { state: "maps-listed", checkedAt: "2026-11-04" } }), false);
  assert.equal(isShownToUsers({ operatingStatus: { state: "not-confirmed", checkedAt: "2026-11-04" } }), false);
  assert.equal(isShownToUsers({}), false);
});

test("hidden places stay in the dataset, and every venue has an operating status", () => {
  const hidden = VENUES.filter((v) => !isShownToUsers(v));
  assert.ok(VENUES.every((v) => v.operatingStatus), "a venue has no operatingStatus");
  assert.equal(VENUES.length - hidden.length, VENUES.filter((v) => v.operatingStatus.state === "official-listed").length);
  assert.ok(hidden.length > 0, "rule hides nothing; gate is vacuous");
});

test("share lines use the verified evidence rule",()=>{
 const base=venue.programs[0];
 const t=buildShareText({...venue,programs:[{...base,name:"Hidden conflict",age:{...base.age,sourceConflict:true}},{...base,name:"Hidden ambiguity",note:"boundary ambiguous"},base]});
 assert.ok(t.includes("Learn & Play 1"));assert.ok(!t.includes("Hidden conflict"));assert.ok(!t.includes("Hidden ambiguity"));
});

// Unknown location is not the same as a real zero-distance fix.
test("share omits unknown distance but preserves a genuine zero", () => {
  assert.doesNotMatch(buildShareText({ ...venue, distance: undefined }), /Straight-line distance/);
  assert.match(buildShareText({ ...venue, distance: 0 }), /Straight-line distance: 0 km/);
});
