import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { hoursTextId, hoursLabel, hoursCaption } from '../src/utils/openingHours.ts';
test('map card hours block can switch to Bahasa', () => {
  const src = fs.readFileSync(new URL('../src/components/ui/VenueDetails.tsx', import.meta.url), 'utf8');
  assert.match(src, /hoursTextId\(venue\.openingHours\.text\)/);
  assert.match(src, /hoursCaption\(venue\.openingHours\.source, hoursLang\)/);
  assert.match(src, /map-explora-hours-lang/);
  assert.equal(hoursTextId('Mon-Fri 09:00-21:00, Sun closed'), 'Sen-Jum 09:00-21:00, Min tutup');
  assert.equal(hoursLabel(undefined, 'id', 'google-maps'), 'Jam buka tempat');
  assert.equal(hoursCaption('google-maps', 'id'), 'Jadwal kelas bisa beda. Konfirmasi lewat telepon.');
});
