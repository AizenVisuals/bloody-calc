import test from 'node:test';
import assert from 'node:assert/strict';
import {JSDOM} from 'jsdom';
import {installHoldClear} from '../web/hold-clear.js';
test('toque curto apaga um; 1,5 s limpa uma vez e suprime clique; movimento cancela',async()=>{
 const dom=new JSDOM('<button data-act="backspace">Apagar</button>'),d=dom.window.document,b=d.querySelector('button');let cleared=0,taps=0;
 installHoldClear(d,()=>cleared++);d.addEventListener('click',()=>taps++);
 function pointer(type,x=0){const e=new dom.window.Event(type,{bubbles:true});Object.assign(e,{button:0,isPrimary:true,pointerId:1,clientX:x,clientY:0});b.dispatchEvent(e)}
 pointer('pointerdown');pointer('pointerup');b.click();assert.equal(taps,1);assert.equal(cleared,0);
 pointer('pointerdown');await new Promise(r=>setTimeout(r,1550));assert.equal(cleared,1);pointer('pointerup');b.click();assert.equal(taps,1);
 pointer('pointerdown');pointer('pointermove',30);await new Promise(r=>setTimeout(r,1550));assert.equal(cleared,1);pointer('pointerup');
 pointer('pointerdown');pointer('pointercancel');await new Promise(r=>setTimeout(r,1550));assert.equal(cleared,1);
});
