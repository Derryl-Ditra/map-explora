import test from 'node:test';
import assert from 'node:assert/strict';
import { importTs } from './loadTs.mjs';
const { mergeAgeRanges } = await importTs('../src/utils/ageMatch.ts');
const { ageSummary, buildClassLines, buildShareText } = await importTs('../src/utils/shareText.ts');
const { cardAgeSummary } = await importTs('../src/utils/venueSummary.ts');
const claim = {level:'branch', verification:'provider-confirmed', providerAgeUrl:'https://provider.example/ages'};
const venue = ranges => ({id:'test',address:'Jl. Test',city:'Jakarta',branchName:'Test',area:'Jakarta',programs:ranges.map(([minMonths,maxMonths],i)=>({name:`Class ${i+1}`,offering:'offered',age:{...claim,minMonths,maxMonths}}))});
for (const [name,input,expected] of [
 ['adjacent',[[6,23],[24,35]],[[6,35]]],
 ['overlap',[[6,18],[12,23],[18,35]],[[6,35]]],
 ['nested duplicate unsorted',[[24,35],[6,23],[8,12],[6,23]],[[6,35]]],
 ['one missing month',[[6,23],[25,35]],[[6,23],[25,35]]],
 ['multiple gaps',[[40,50],[6,18],[24,35]],[[6,18],[24,35],[40,50]]],
 ['zero month',[[0,0],[1,3]],[[0,3]]],
 ['empty',[],[]],
]) test(`display union: ${name}`,()=>{
 const snapshot=structuredClone(input); assert.deepEqual(mergeAgeRanges(input),expected); assert.deepEqual(input,snapshot);
});
test('card, English share, Indonesian share and WhatsApp agree on the union',()=>{
 const v=venue([[6,23],[24,35]]), before=structuredClone(v);
 assert.equal(cardAgeSummary(v),'By class: 6-35 mo');
 assert.equal(ageSummary(v),'Ages 6-35 months, by class');
 assert.equal(ageSummary(v,'id'),'Usia 6-35 bulan, tergantung kelas');
 assert.match(buildShareText(v,'id','whatsapp'),/Usia 6-35 bulan, tergantung kelas/);
 assert.equal(buildClassLines(v),'Class 1 6-23mo, Class 2 24-35mo');
 assert.deepEqual(v,before);
});
test('overlapping card example no longer truncates to +1 more',()=>{
 const v=venue([[6,18],[12,23],[24,35]]);
 assert.equal(cardAgeSummary(v),'By class: 6-35 mo');
 assert.equal(ageSummary(v),'Ages 6-35 months, by class');
});
test('count only separate display ranges and preserve real gaps',()=>{
 const v=venue([[6,18],[12,23],[25,35],[40,50]]);
 assert.equal(cardAgeSummary(v),'By class: 6-23 mo, 25-35 mo +1 more');
 assert.equal(ageSummary(v),'Ages 6-23, 25-35, 40-50 months, by class');
});
test('unverified claims cannot bridge a gap',()=>{
 const v=venue([[6,23],[24,24],[25,35]]); v.programs[1].age.verification='unverified';
 assert.equal(cardAgeSummary(v),'By class: 6-23 mo, 25-35 mo');
 assert.equal(ageSummary(v),'Ages 6-23, 25-35 months, by class');
});
test('single class and branch fallback keep their existing scope labels',()=>{
 const v=venue([[6,18]]);
 assert.equal(ageSummary(v),'Class 1 · 6-18 months');
 assert.equal(cardAgeSummary(v),'Verified ages: 6 to 18 months');
 const b={...v,programs:[],branchAge:{...claim,minMonths:6,maxMonths:35}};
 assert.equal(ageSummary(b),'6-35 months, branch statement');
});
