import test from "node:test";
import assert from "node:assert/strict";
import { importTs } from "./loadTs.mjs";
const { venueMatchesSearch } = await importTs("../src/utils/searchMatch.ts");
const { VENUES } = await importTs("../src/data/venues.ts");
const { isShownToUsers } = await importTs("../src/utils/visibility.ts");
const venues = VENUES.filter(isShownToUsers);
const oldMatch = (v, q) => [v.branchName, v.chain ?? "", v.address, v.area, v.city].join(" ").toLowerCase().includes(q.toLowerCase());
test("English 1 Bintaro regression: tokens work across chain and branch", () => {
 assert.equal(venues.filter(v => oldMatch(v, "English 1 Bintaro")).length, 0);
 assert.deepEqual(venues.filter(v => venueMatchesSearch(v, "English 1 Bintaro")).map(v => v.id), ["english-1-bintaro-tangerang"]);
});
test("order, whitespace and case do not matter; every token is required", () => {
 const v=venues.find(v => v.id === "english-1-bintaro-tangerang");
 assert.equal(venueMatchesSearch(v, "  BINTARO   english 1  "), true);
 assert.equal(venueMatchesSearch(v, "Bintaro English imaginary"), false);
 assert.equal(venueMatchesSearch(v, ""), true);
 assert.equal(venueMatchesSearch(v, "   "), true);
});
test("category and area can combine; address search remains supported", () => {
 const matches=venues.filter(v=>venueMatchesSearch(v,"swim jakarta selatan"));
 assert.ok(matches.length>0);assert.ok(matches.every(v=>v.categories.includes("Swim")));
 const v=venues.find(v=>v.id === "aquababies-bintaro");
 assert.equal(venueMatchesSearch(v,"Cempaka 8"), true);
});
