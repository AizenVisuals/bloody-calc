import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {JSDOM} from 'jsdom';
const dom=new JSDOM(readFileSync(new URL('../web/index.html',import.meta.url),'utf8'),{url:'https://example.test/halo/'});
for(const key of ['window','document','localStorage','FormData','HTMLElement'])globalThis[key]=dom.window[key];
Object.defineProperty(globalThis,'navigator',{value:dom.window.navigator,configurable:true});
Object.defineProperty(navigator,'languages',{value:['en-US'],configurable:true});
globalThis.confirm=()=>true;window.scrollTo=()=>{};
dom.window.HTMLDialogElement.prototype.showModal=function(){this.open=true};dom.window.HTMLDialogElement.prototype.close=function(){this.open=false};
const interval=globalThis.setInterval;globalThis.setInterval=(...args)=>{const h=interval(...args);h.unref();return h};
await import('../web/app.js');
const $=s=>document.querySelector(s),click=s=>{assert.ok($(s),s);$(s).click()},saved=()=>JSON.parse(localStorage.getItem('bloody-calc-v1'));
const language=lang=>{click('[data-act=themes]');$('#language').value=lang;$('#language').dispatchEvent(new dom.window.Event('change',{bubbles:true}))};
const input=text=>{click('[data-act=calc]');$('#expression').value=text;$('#expression').dispatchEvent(new dom.window.Event('input',{bubbles:true}))};
test('automatic English, decimal keypad, localized history, manual Spanish and Portuguese preserve data',()=>{
 assert.equal(document.documentElement.lang,'en-US');assert.ok($('[data-key="."]'));assert.equal($('[data-act=timer]').textContent,'Stopwatch');
 input('1,234.56+0.44');assert.equal($('#result').textContent,'1,235');click('[data-key="="]');
 const original=saved();assert.equal(original.history[0].result,'1235');
 language('es');assert.equal(document.documentElement.lang,'es-ES');assert.equal($('h1').textContent,'Ajustes');
 click('[data-act=history]');assert.match($('#history-list').textContent,/1\.235/);assert.equal($('h1').textContent,'Historial');
 click('[data-use-history]');assert.equal($('#result').textContent,'1.235');
 click('[data-act=scientific]');assert.match($('#modal').textContent,/Ángulos/);click('[data-act=close-modal]');
 language('pt');assert.equal(saved().language,'pt');assert.equal(saved().theme.name,original.theme.name);assert.equal(saved().icon,original.icon);assert.equal(saved().history.length,1);
 click('[data-act=calc]');assert.ok($('[data-key=","]'));assert.equal($('#result').textContent,'1.235');
 language('en');input('1/0');click('[data-key="="]');assert.equal($('#result').textContent,'Cannot divide by zero.');
 input('');$('#expression').focus();click('[data-key="1"]');click('[data-key="."]');click('[data-key="5"]');assert.equal($('#result').textContent,'1.5');
 language('auto');Object.defineProperty(navigator,'languages',{value:['es-MX'],configurable:true});window.dispatchEvent(new dom.window.Event('languagechange'));assert.equal(document.documentElement.lang,'es-ES');assert.equal(saved().language,'auto');
});

test('privacy is available offline in all languages and Back returns to settings',()=>{
 for(const [lang,title] of [['pt','Privacidade'],['en','Privacy'],['es','Privacidad']]){
  language(lang);click('[data-act=privacy]');assert.match($('#app').textContent,/aizenvisuals\.apps@gmail\.com/);
  assert.equal($('h1').textContent,lang==='pt'?'Privacidade':title);
  assert.equal(window.bloodyBack(),true);assert.ok($('#language'));assert.equal(saved().language,lang);
 }
});
