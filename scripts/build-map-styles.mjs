import { writeFile, readFile } from 'node:fs/promises';
const output = 'src/data/map-style-light.json';
function validate(style) {
  if (style.version !== 8 || style.sources?.openmaptiles?.url !== 'https://tiles.openfreemap.org/planet' || !style.layers?.some(layer => layer['source-layer'] === 'poi')) throw new Error('Expected Bright style with POIs and rotating OpenFreeMap TileJSON');
}
try {
  const response = await fetch('https://tiles.openfreemap.org/styles/bright', { signal: AbortSignal.timeout(15000) });
  if (!response.ok) throw new Error(`style fetch ${response.status}`);
  const style = await response.json();
  validate(style);
  await writeFile(output, JSON.stringify(style) + '\n');
} catch (error) {
  // Offline builds may use only a previously validated, checked-in Bright style.
  validate(JSON.parse(await readFile(output, 'utf8')));
  console.warn('Using checked-in Bright map style:', error.message);
}
