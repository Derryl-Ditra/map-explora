import ts from "typescript";
import { readFileSync } from "node:fs";

// Minimal loader so the built-in node:test runner can exercise pure
// TypeScript modules without adding a test framework dependency.
// Alias imports ("@/...") in the loaded files are type-only and are
// stripped before transpiling; modules loaded here must stay free of
// runtime imports (React included).
export async function importTs(relativePath) {
  const url = new URL(relativePath, import.meta.url);
  let src = readFileSync(url, "utf8");
  src = src.replace(/^import\s+[^;]*from\s+["']@\/[^"']*["'];?\s*$/gm, "");
  // Inline local data modules so source-split inventory uses the same test path.
  for (const match of [...src.matchAll(/^import\s+\{([^}]+)\}\s+from\s+["'](\.[^"']+)["'];?\s*$/gm)]) {
    const moduleUrl = new URL(match[2] + (match[2].endsWith('.ts') ? '' : '.ts'), url);
    const loaded = await importTs(moduleUrl.href);
    const declarations = match[1].split(',').map(name => `const ${name.trim()} = ${JSON.stringify(loaded[name.trim()])};`).join('\n');
    src = src.replace(match[0], declarations);
  }
  const js = ts.transpileModule(src, {
    compilerOptions: { module: ts.ModuleKind.ES2022, target: ts.ScriptTarget.ES2022 },
  }).outputText;
  return import("data:text/javascript;base64," + Buffer.from(js).toString("base64"));
}
