import { build } from 'esbuild';
import { mkdir, rm, writeFile, copyFile, readFile } from 'node:fs/promises';
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
const packagePath = require.resolve('maplibre-gl/package.json');
const root = packagePath.slice(0, -'package.json'.length);
const outdir = 'public/vendor/maplibre';
await rm(outdir, { recursive: true, force: true });
await mkdir(outdir, { recursive: true });
const result = await build({
  entryPoints: { maplibre: `${root}src/index.ts`, worker: `${root}src/source/worker.ts` },
  outdir, bundle: true, splitting: true, format: 'esm', platform: 'browser',
  minify: true, target: 'es2020', metafile: true,
  entryNames: '[name]-[hash]', chunkNames: 'shared-[hash]',
  define: { 'process.env.NODE_ENV': '"production"' },
  // Generated StructArray subclasses need TS assignment semantics, not fields
  // that shadow backing buffers initialized by their base constructor.
  tsconfigRaw: { compilerOptions: { useDefineForClassFields: false } },
});
const outputs = Object.entries(result.metafile.outputs);
const file = (name) => {
  const output = outputs.find(([path, info]) => info.entryPoint && path.split('/').at(-1).startsWith(`${name}-`));
  if (!output) throw new Error(`Missing ${name} vendor entry`);
  return output[0].replace(/^public/, '');
};
const entry = file('maplibre'), worker = file('worker');
const shared = outputs.filter(([, info]) => !info.entryPoint).map(([path]) => path.replace(/^public/, ''));
if (!shared.length) throw new Error('Expected a shared main/worker chunk');
await writeFile('src/data/map-vendor.json', JSON.stringify({ entry, worker, shared }) + '\n');
await copyFile(`${root}LICENSE.txt`, `${outdir}/LICENSE.txt`);
const pkg = JSON.parse(await readFile(packagePath, 'utf8'));
await writeFile(`${outdir}/NOTICE.txt`, `MapLibre GL JS ${pkg.version}, built from its npm source package.\nBSD-3-Clause; see LICENSE.txt. Dependencies retain their bundled license comments.\n`);
console.log(`Built same-origin MapLibre ${pkg.version}: ${outputs.length} content-hashed modules`);
