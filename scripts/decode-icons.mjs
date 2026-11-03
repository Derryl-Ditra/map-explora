// Writes the app icon PNGs and favicon.ico into public/ from the base64 data
// in icons-data.json. The artwork is the Tabler Icons "horse-toy" outline
// (MIT, see public/ICON-LICENSE.txt); public/icon.svg is the vector source.
import { readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const data = JSON.parse(readFileSync(join(here, "icons-data.json"), "utf8"));
for (const [name, b64] of Object.entries(data)) {
  writeFileSync(join(here, "..", "public", name), Buffer.from(b64, "base64"));
}
console.log(`Wrote ${Object.keys(data).length} icon files to public/`);
