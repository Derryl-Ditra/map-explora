import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const details = readFileSync(new URL('../src/components/ui/VenueDetails.tsx', import.meta.url), 'utf8');
const venueType = readFileSync(new URL('../src/types/venue.ts', import.meta.url), 'utf8');
const indie = readFileSync(new URL('../src/data/enrich1120-indie.ts', import.meta.url), 'utf8');

// cardNote is a plain muted line on the card: after reviews and location
// notes, before the Price card, never styled like a warning.
test('cardNote renders once, after reviews and before the Price card', () => {
  const iReviews = details.indexOf('Branch reviews');
  const iNote = details.indexOf('{venue.cardNote && (');
  const iPrice = details.indexOf('data-testid="price-listings"');
  for (const [name, i] of Object.entries({ iReviews, iNote, iPrice })) assert.ok(i > -1, `${name} missing`);
  assert.ok(iNote > iReviews, 'card note renders after the reviews block');
  assert.ok(iNote < iPrice, 'card note renders before the Price card');
  assert.equal((details.match(/venue\.cardNote/g) || []).length, 2, 'one conditional plus one render');
  const block = details.slice(iNote, details.indexOf(')}', iNote));
  assert.ok(!block.includes('#fef3c7') && !block.includes('TriangleAlert'), 'card note is not styled as a warning');
});

test('cardNote is an optional reviewed field on the venue type', () => {
  assert.match(venueType, /cardNote\?: string;/);
});

test('only Highfive carries a card note, with the three approved claims', () => {
  const notes = indie.match(/cardNote: "[^"]+"/g) || [];
  assert.equal(notes.length, 1, 'exactly one card note in the indie enrich set');
  const hfBlock = indie.slice(indie.indexOf('id: "highfive-preschool-graha-raya"'), indie.indexOf('id: "highfive-preschool-graha-raya"') + 400);
  assert.ok(hfBlock.includes('cardNote: "Inclusion-friendly, therapy center on site, fees via WhatsApp."'), 'Highfive keeps the approved note text');
});
