import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {JSDOM} from 'jsdom';

const dom=new JSDOM(readFileSync(new URL('../web/index.html',import.meta.url),'utf8'),{url:'https://example.test/bloody-calc/'});
for(const key of ['window','document','localStorage','FormData','HTMLElement'])globalThis[key]=dom.window[key];
Object.defineProperty(globalThis,'navigator',{value:dom.window.navigator,configurable:true});
globalThis.confirm=()=>true;
globalThis.window.scrollTo=()=>{};
dom.window.HTMLDialogElement.prototype.showModal=function(){this.open=true};
dom.window.HTMLDialogElement.prototype.close=function(){this.open=false};
const interval=globalThis.setInterval;globalThis.setInterval=(...args)=>{const h=interval(...args);h.unref();return h};
await import('../web/app.js');
const $=s=>document.querySelector(s);
const click=s=>{assert.ok($(s),s);$(s).click()};
const input=(s,v)=>{$(s).value=v;$(s).dispatchEvent(new dom.window.Event('input',{bubbles:true}))};
const change=(s,v)=>{$(s).value=v;$(s).dispatchEvent(new dom.window.Event('change',{bubbles:true}))};
const saved=()=>JSON.parse(localStorage.getItem('bloody-calc-v1'));

test('fluxos de interface: conta, histórico, taxas, orçamento, tema e fórmulas',async()=>{
 input('#expression','150*3');assert.equal($('#result').textContent,'450');click('[data-key="="]');assert.equal(saved().history.length,1);
 click('[data-act="history"]');assert.match($('#history-list').textContent,/450/);click('[data-use-history]');assert.equal($('#expression').value,'150*3');
 click('[data-act="tools"]');click('[data-tool="fees"]');assert.match($('#tool-output').textContent,/R\$ 95,00/);change('[name="mode"]','gross');assert.match($('#tool-output').textContent,/R\$ 105,27/);
 click('[data-act="tools"]');click('[data-tool="budget"]');assert.match($('#budget-result').textContent,/R\$ 50,00/);input('[name="item-qty-0"]','3');assert.match($('#budget-result').textContent,/R\$ 150,00/);click('[data-act="save-budget"]');assert.equal(saved().budgets.length,1);
 click('[data-act="services"]');input('#service-form [name="name"]','Capa');input('#service-form [name="price"]','80');click('#service-form [type="submit"]');assert.ok(saved().services.some(s=>s.name==='Capa'));click('[data-act="close-modal"]');
 click('[data-act="themes"]');click('[data-theme="1"]');assert.equal(document.documentElement.style.getPropertyValue('--accent'),'#f7f7f7');input('#theme-name','Meu Mono');click('[data-act="save-theme"]');assert.equal(saved().themes.at(-1).name,'Meu Mono');
 click('[data-act="tools"]');click('[data-tool="ratio"]');assert.match($('#tool-output').textContent,/1080 × 1350/);
 click('[data-act="tools"]');click('[data-tool="time"]');assert.match($('#time-output').textContent,/02:00:00/);assert.match($('#time-output').textContent,/R\$ 100,00/);click('[data-act="time-budget"]');assert.equal(saved().draft.items.at(-1).price,'100');
 click('[data-act="tools"]');click('[data-tool="formula"]');input('#formula-expr','valor*quantidade-desconto');input('[data-var="valor"]','50');input('[data-var="quantidade"]','3');input('[data-var="desconto"]','10');assert.match($('#formula-output').textContent,/140/);input('#formula-name','Pacote');click('[data-act="save-formula"]');assert.equal(saved().formulas.length,1);
});

test('backup exportado e importado restaura os dados',async()=>{
 let exported='';window.Android={saveJson:(name,data)=>{exported=data}};globalThis.Android=window.Android;
 click('[data-act="tools"]');click('[data-tool="backup"]');click('[data-act="export"]');assert.equal(JSON.parse(exported).version,1);
 const data=JSON.parse(exported);data.expr='222+1';const file={size:exported.length,text:async()=>JSON.stringify(data)};Object.defineProperty($('#import-file'),'files',{value:[file],configurable:true});$('#import-file').dispatchEvent(new dom.window.Event('change',{bubbles:true}));await new Promise(resolve=>setTimeout(resolve,20));assert.equal(saved().expr,'222+1');
 click('[data-act="calc"]');assert.equal($('#result').textContent,'223');
});

test('cinco ícones, seleção persistente e manifesto do PWA',()=>{
 click('[data-act="themes"]');assert.equal(document.querySelectorAll('[data-app-icon]').length,5);click('[data-app-icon="seal"]');assert.equal(saved().icon,'seal');assert.match(document.querySelector('link[rel="manifest"]').href,/manifest-seal.webmanifest$/);click('[data-act="calc"]');click('[data-act="themes"]');assert.equal(document.querySelector('[data-app-icon="seal"]').getAttribute('aria-pressed'),'true');
 let changed='';window.Android.setLauncherIcon=k=>{changed=k;return true};click('[data-app-icon="mono"]');assert.equal(changed,'mono');assert.equal(saved().icon,'mono');
});
