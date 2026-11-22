import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { importTs } from './loadTs.mjs';

const details = readFileSync(new URL('../src/components/ui/VenueDetails.tsx', import.meta.url), 'utf8');
const placePage = readFileSync(new URL('../src/components/PlacePage.tsx', import.meta.url), 'utf8');

// Location notices move directly after the Branch reviews
// block on every card variant; on priced cards reviews sit above the Price card.
test('classes and reviews come first; location notes follow reviews; price after reviews', () => {
  const iClasses = details.indexOf('Classes by age');
  const iReviews = details.indexOf('Branch reviews');
  const iNotice = details.indexOf('publicLocation(venue).notice &&');
  const iCaution = details.indexOf('{venue.caution && <p>');
  const iPrice = details.indexOf('data-testid="price-listings"');
  for (const [name, i] of Object.entries({ iClasses, iReviews, iNotice, iCaution, iPrice })) assert.ok(i > -1, `${name} missing`);
  assert.ok(iReviews > iClasses, 'reviews render after classes');
  assert.ok(iPrice > iReviews, 'reviews render above the Price card');
  // 2026-11-22: the approximate-pin disclaimer sentence was cut per owner; notice and caution remain.
  assert.ok(iNotice > iReviews && iCaution > iReviews, 'all location notes render after the reviews block');
  assert.ok(iNotice < iPrice && iCaution < iPrice, 'location notes sit directly after reviews, before price');
});

test('area/venue name note renders once, never inside the title block', () => {
  const occurrences = details.match(/publicLocation\(venue\)\.notice/g) || [];
  assert.equal(occurrences.length, 3, 'one panel guard, one paragraph guard, one paragraph render');
  assert.equal((details.match(/<p>\{publicLocation\(venue\)\.notice\}<\/p>/g) || []).length, 1, 'notice text renders in one paragraph only');
  const beforeClasses = details.split('Classes by age')[0];
  assert.ok(!beforeClasses.includes('.notice'), 'title block no longer carries the notice');
});

// Static /places/ pages get a Directions action;
// pins that cannot route safely keep the Search Maps variant.
test('static place pages carry a route action that respects the safe-routing rule', () => {
  assert.match(placePage, /canRouteVenue/);
  assert.match(placePage, /buildMapsLink/);
  assert.equal((placePage.match(/href=\{mapsAction\}/g) || []).length, 2, 'header and footer both carry the route action');
  assert.match(placePage, /'Directions','Rute'/);
  assert.match(placePage, /'Search Maps','Cari di Maps'/);
});

test('every visible place resolves to exactly the link variant its routing status allows', async () => {
  const { VENUES } = await importTs('../src/data/venues.ts');
  const { placePageInventory } = await importTs('../src/utils/placePages.ts');
  const { buildMapsLink, canRouteVenue } = await importTs('../src/utils/mapsLink.ts');
  const places = placePageInventory(VENUES);
  assert.ok(places.length >= 149);
  for (const v of places) {
    const u = new URL(buildMapsLink(v));
    if (canRouteVenue(v)) {
      assert.equal(u.pathname, '/maps/dir/', v.id);
      assert.ok(u.searchParams.get('destination'), v.id);
    } else {
      assert.equal(u.pathname, '/maps/search/', v.id);
      assert.ok(u.searchParams.get('query'), v.id);
      assert.equal(u.searchParams.has('destination'), false, v.id);
    }
  }
});
