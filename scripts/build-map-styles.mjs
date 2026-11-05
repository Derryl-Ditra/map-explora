import { writeFile, access } from 'node:fs/promises';
import { transformStyle } from './map-style-transform.mjs';
const outputs = ['src/data/map-style-light.json', 'src/data/map-style-dark.json'];
try {
  const response = await fetch('https://tiles.openfreemap.org/styles/positron', { signal: AbortSignal.timeout(15000) });
  if (!response.ok) throw new Error(`style fetch ${response.status}`);
  const style = await response.json();
  // Keep TileJSON indirection: OpenFreeMap rotates the dated tile templates.
  if (style.sources?.openmaptiles?.url !== 'https://tiles.openfreemap.org/planet') throw new Error('Unexpected tile source');
  for (const [i, file] of outputs.entries()) await writeFile(file, JSON.stringify(transformStyle(style, i === 1)) + '\n');
} catch (error) {
  // A network outage must not silently change the map or break an offline build.
  for (const file of outputs) await access(file);
  console.warn('Using checked-in monochrome map styles:', error.message);
}
