import ts from "typescript";
import { readFileSync } from "node:fs";

// Load pure TS modules with their real local dependencies, including functions.
// Alias imports here are type-only and stripped; runtime imports stay relative.
function moduleUrl(relativePath) {
  const url = new URL(relativePath, import.meta.url);
  let src = readFileSync(url, "utf8");
  src = src.replace(/^import\s+[^;]*from\s+["']@\/[^"']*["'];?\s*$/gm, "");
  for (const match of [...src.matchAll(/^import\s+([^;]+?)\s+from\s+["'](\.[^"']+)["'];?/gm)]) {
    const dependency = new URL(match[2] + (match[2].endsWith('.ts') ? '' : '.ts'), url);
    src = src.replace(match[0], `import ${match[1]} from ${JSON.stringify(moduleUrl(dependency.href))};\n`);
  }
  const js = ts.transpileModule(src, {
    compilerOptions: { module: ts.ModuleKind.ES2022, target: ts.ScriptTarget.ES2022 },
  }).outputText;
  return "data:text/javascript;base64," + Buffer.from(js).toString("base64");
}
export async function importTs(relativePath) { return import(moduleUrl(relativePath)); }
