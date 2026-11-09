import test from 'node:test';
import assert from 'node:assert/strict';
import ts from 'typescript';
import vm from 'node:vm';
import {readFileSync} from 'node:fs';
// Exercise the real hook with only React scheduling and browser geolocation replaced.
function mount({unsupported=false,cache=null}={}) {
 const slots=[],effects=[];let index=0,calls=[];let cleanup=[];
 const react={useState:(initial)=>{const i=index++;if(!(i in slots))slots[i]=initial;return [slots[i],v=>{slots[i]=typeof v==='function'?v(slots[i]):v}];},useEffect:(f)=>{effects.push(f)},useCallback:f=>f,useRef:initial=>{const i=index++;if(!(i in slots))slots[i]={current:initial};return slots[i]}};
 const source=ts.transpileModule(readFileSync(new URL('../src/hooks/useGeolocation.ts',import.meta.url),'utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS}}).outputText;
 const ctx={exports:{},require:()=>react,navigator:unsupported?{}:{geolocation:{getCurrentPosition:(ok,fail,options)=>calls.push({ok,fail,options})}},localStorage:{getItem:()=>cache,setItem:()=>{}},requestAnimationFrame:f=>{effects.push(f);return 1},cancelAnimationFrame:()=>{},Date};
 vm.runInNewContext(source,ctx);const render=()=>{index=0;return ctx.exports.useGeolocation()};let value=render();while(effects.length){const c=effects.shift()();if(c)cleanup.push(c)};return {read:render,calls,unmount:()=>cleanup.forEach(c=>c()),value};
}
test('opens Jakarta without requesting location, ignoring old cached fixes',()=>{
 const h=mount({cache:JSON.stringify({lat:1,lng:2,at:Date.now()})});const v=h.read();assert.equal(h.calls.length,0);assert.deepEqual([...v.userPos],[-6.2088,106.8456]);assert.equal(v.hasActualLocation,false);assert.equal(v.isLocating,false);
});
test('explicit tap gets one fix, updates state and recenter without navigating',()=>{
 const h=mount();h.read().refresh();assert.equal(h.calls.length,1);assert.equal(h.read().isLocating,true);h.calls[0].ok({coords:{latitude:-6.3,longitude:106.8,accuracy:80}});const v=h.read();assert.equal(v.hasActualLocation,true);assert.equal(v.isLocating,false);assert.deepEqual([...v.userPos],[-6.3,106.8]);assert.equal(v.accuracy,80);assert.equal(v.recenterTick,1);assert.equal(v.error,null);
});
test('repeated taps while locating do not duplicate requests',()=>{const h=mount();h.read().refresh();h.read().refresh();assert.equal(h.calls.length,1)});
test('denial keeps Jakarta usable and explains how to continue',()=>{const h=mount();h.read().refresh();h.calls[0].fail({code:1});assert.equal(h.read().isLocating,false);assert.equal(h.read().hasActualLocation,false);assert.match(h.read().error,/denied/i);assert.equal(h.read().recenterTick,0)});
test('timeout after an earlier fix preserves the map without recentering',()=>{const h=mount();h.read().refresh();h.calls[0].ok({coords:{latitude:-6.3,longitude:106.8,accuracy:100}});h.read().refresh();h.calls[1].fail({code:3});assert.match(h.read().error,/timed out/i);assert.equal(h.read().hasActualLocation,false);assert.equal(h.read().accuracy,null);assert.equal(h.read().recenterTick,1);assert.deepEqual([...h.read().userPos],[-6.3,106.8]);});
test('unsupported browsers report a tap error, not a load-time popup',()=>{const h=mount({unsupported:true});assert.equal(h.read().error,null);h.read().refresh();assert.match(h.read().error,/not supported/i)});
test('late callbacks after unmount do nothing',()=>{const h=mount();h.read().refresh();h.unmount();h.calls[0].ok({coords:{latitude:1,longitude:2,accuracy:10}});assert.equal(h.read().hasActualLocation,false)});
