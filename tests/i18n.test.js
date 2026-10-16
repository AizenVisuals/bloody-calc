import test from 'node:test';
import assert from 'node:assert/strict';
import {resolveLanguage,setLanguage,locale,decimal,formatNumber,canonicalExpression,displayExpression,t,dictionary} from '../web/i18n.js';
import {defaults,validate} from '../web/store.js';
import {evaluate} from '../web/engine.js';

test('device detection, manual override, unsupported fallback and backup migration',()=>{
 for(const [device,expected] of [['pt-PT','pt'],['en-GB','en'],['es-MX','es'],['ja-JP','pt']])assert.equal(resolveLanguage('auto',device),expected);
 assert.equal(resolveLanguage('es','en-US'),'es');
 assert.equal(validate(defaults()).language,'auto');
 assert.equal(validate({...defaults(),language:'en'}).language,'en');
 assert.equal(validate({...defaults(),language:'unexpected'}).language,'auto');
 const old=defaults();delete old.language;assert.equal(validate(old).language,'auto');
});
test('locale input, grouping and exact large-number output preserve mathematical values',()=>{
 for(const lang of ['pt','en','es']){
  setLanguage(lang);const en=lang==='en';
  const expr=canonicalExpression(en?'1,234.56+0.44':'1.234,56+0,44');
  assert.equal(evaluate(expr).text,'1235');
  assert.equal(formatNumber(evaluate(expr).text),en?'1,235':'1.235');
  assert.equal(formatNumber('123456789012345678901234567890,123456789012'),en?'123,456,789,012,345,678,901,234,567,890.123456789012':'123.456.789.012.345.678.901.234.567.890,123456789012');
  assert.equal(displayExpression('1,5+2,5'),en?'1.5+2.5':'1,5+2,5');
  assert.equal(decimal(),en?'.':',');
  assert.equal(evaluate(canonicalExpression(formatNumber('1234567,89'))).text,'1234567,89');
 }
 setLanguage('en');assert.throws(()=>canonicalExpression('1,2'));assert.equal(canonicalExpression('.5+1.25'),',5+1,25');
 setLanguage('es');assert.throws(()=>canonicalExpression('1.2,3'));
});
test('all UI messages have English and Spanish translations, including dynamic messages',()=>{
 for(const lang of ['en','es']){setLanguage(lang);for(const [source,pair] of Object.entries(dictionary)){assert.equal(pair.length,2);assert.ok(t(source).length>0)}assert.notEqual(t('Preencha a variável x.'),'Preencha a variável x.');assert.notEqual(t('Volta 01'),'Volta 01')}
 setLanguage('en');assert.equal(t('Prévia do tema Crimson'),'Theme preview: Crimson');assert.equal(locale(),'en-US');
});
