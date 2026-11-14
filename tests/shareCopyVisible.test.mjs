import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
const s=readFileSync('src/components/ui/ShareCard.tsx','utf8');
test('copy actions are visible without a dropdown',()=>{
 const [visible,secondary]=s.split('More share options');
 assert.match(visible,/onClick=\{\(\)=>copy\('plain'\)\}/);
 assert.match(visible,/'Salin teks':'Copy text'/);
 assert.doesNotMatch(secondary,/copy\('plain'\)/);
 assert.doesNotMatch(s,/<details>|<summary>/);
 assert.match(secondary,/copy\('link'\)/);
 assert.match(secondary,/copy\('whatsapp'\)/);
});
test('native share is optional but direct copy is unconditional',()=>{
 assert.match(s,/nativeShareAvailable && <button[^\n]*onClick=\{share\}/);
 assert.match(s,/<\/button>\}\s*<button type="button" onClick=\{\(\)=>copy\('plain'\)\}/);
});
