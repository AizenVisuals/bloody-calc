// Exact rational arithmetic for everyday and financial operations; no eval.
const gcd=(a,b)=>{a=a<0n?-a:a;while(b){[a,b]=[b,a%b]}return a||1n};
export class Q {
 constructor(n,d=1n){n=BigInt(n);d=BigInt(d);if(!d)throw Error('Não é possível dividir por zero.');if(d<0n){n=-n;d=-d}const g=gcd(n,d);this.n=n/g;this.d=d/g}
 static of(v){if(v instanceof Q)return v;let s=String(v).trim().replace(',','.');if(!/^[+-]?\d+(\.\d*)?$/.test(s))throw Error('Informe um número válido.');let neg=s.startsWith('-');s=s.replace(/^[+-]/,'');const [a,b='']=s.split('.');return new Q(BigInt(a+b)*(neg?-1n:1n),10n**BigInt(b.length))}
 add(v){v=Q.of(v);return new Q(this.n*v.d+v.n*this.d,this.d*v.d)}
 sub(v){return this.add(Q.of(v).neg())} neg(){return new Q(-this.n,this.d)}
 mul(v){v=Q.of(v);return new Q(this.n*v.n,this.d*v.d)}
 div(v){v=Q.of(v);return new Q(this.n*v.d,this.d*v.n)}
 pow(v){v=Q.of(v);if(v.d!==1n){const r=Math.pow(this.number(),v.number());return fromFloat(r)}if(v.n>100n||v.n< -100n)throw Error('Use expoente entre −100 e 100.');return v.n<0n?new Q(this.d**(-v.n),this.n**(-v.n)):new Q(this.n**v.n,this.d**v.n)}
 number(){return Number(this.n)/Number(this.d)}
 round(scale=2){const f=10n**BigInt(scale),n=this.n*f,sign=n<0n?-1n:1n,a=n<0n?-n:n;return sign*(a/this.d+(a%this.d*2n>=this.d?1n:0n))}
 text(scale=12){const v=this.round(scale),neg=v<0n,a=neg?-v:v,f=10n**BigInt(scale);let s=(a/f).toString();if(scale){const frac=(a%f).toString().padStart(scale,'0').replace(/0+$/,'');if(frac)s+=','+frac}return (neg?'-':'')+s}
}
function fromFloat(v){if(!Number.isFinite(v))throw Error('Resultado fora do domínio ou muito grande.');return Q.of(v.toFixed(12))}
const functions=new Set(['sqrt','sin','cos','tan','ln','log','abs','inv']);
export function variables(expr){return [...new Set((expr.match(/[a-zA-Z_][a-zA-Z_0-9]*/g)||[]).filter(v=>!functions.has(v)&&!['pi','e'].includes(v)))]}
export function evaluate(input,vars={},angle='DEG'){
 if(input.length>500)throw Error('Expressão muito longa.');
 const src=input.replace(/\b\d{1,3}(?:\.\d{3})+,\d+\b/g,s=>s.replace(/\./g,'')).replace(/×/g,'*').replace(/[÷]/g,'/').replace(/−/g,'-').replace(/π/g,'pi');let tokens=[],i=0;
 while(i<src.length){if(/\s/.test(src[i])){i++;continue}const rest=src.slice(i),num=rest.match(/^(?:\d+(?:[.,]\d*)?|[.,]\d+)/),id=rest.match(/^[a-zA-Z_][a-zA-Z_0-9]*/);if(num){tokens.push({t:'num',v:num[0].replace(/^[.,]/,'0$&')});i+=num[0].length}else if(id){tokens.push({t:'id',v:id[0]});i+=id[0].length}else if('+-*/^()%'.includes(src[i])){tokens.push({t:src[i++]})}else throw Error('Caractere não permitido.');}
 if(!tokens.length)throw Error('Digite uma conta.');let pos=0,depth=0;const peek=t=>tokens[pos]?.t===t;
 function primary(){if(++depth>80)throw Error('Expressão muito complexa.');let node;const tok=tokens[pos++];if(!tok)throw Error('Complete a expressão.');if(tok.t==='num')node={type:'num',v:Q.of(tok.v)};else if(tok.t==='('){node=add();if(!peek(')'))throw Error('Feche os parênteses.');pos++}else if(tok.t==='id'){if(functions.has(tok.v)){if(!peek('('))throw Error('Use parênteses na função.');pos++;const arg=add();if(!peek(')'))throw Error('Feche os parênteses.');pos++;node={type:'fn',name:tok.v,arg}}else if(tok.v==='pi'||tok.v==='e')node={type:'num',v:fromFloat(tok.v==='pi'?Math.PI:Math.E)};else {if(!Object.hasOwn(vars,tok.v))throw Error('Preencha a variável '+tok.v+'.');node={type:'num',v:Q.of(vars[tok.v])}}}else throw Error('Expressão inválida.');depth--;return node}
 function postfix(){let node=primary();while(peek('%')){pos++;node={type:'percent',arg:node}}return node}
 function power(){let a=postfix();if(peek('^')){pos++;a={type:'bin',op:'^',a,b:unary()}}return a}
 function unary(){if(peek('+')||peek('-')){const op=tokens[pos++].t;return {type:'unary',op,arg:unary()}}return power()}
 function mul(){let a=unary();while(peek('*')||peek('/')){const op=tokens[pos++].t;a={type:'bin',op,a,b:unary()}}return a}
 function add(){let a=mul();while(peek('+')||peek('-')){const op=tokens[pos++].t;a={type:'bin',op,a,b:mul()}}return a}
 const ast=add();if(pos!==tokens.length)throw Error('Confira os operadores.');let approximate=false;
 function calc(n){if(n.type==='num')return n.v;if(n.type==='percent')return calc(n.arg).div(100);if(n.type==='unary')return n.op==='-'?calc(n.arg).neg():calc(n.arg);if(n.type==='fn'){const q=calc(n.arg),x=q.number(),rad=angle==='DEG'?x*Math.PI/180:x;if(n.name==='abs')return q.n<0n?q.neg():q;if(n.name==='inv')return Q.of(1).div(q);approximate=true;let v;if(n.name==='sqrt')v=Math.sqrt(x);if(n.name==='sin')v=Math.sin(rad);if(n.name==='cos')v=Math.cos(rad);if(n.name==='tan'){if(Math.abs(Math.cos(rad))<1e-12)throw Error('Tangente indefinida nesse ângulo.');v=Math.tan(rad)}if(n.name==='ln')v=Math.log(x);if(n.name==='log')v=Math.log10(x);return fromFloat(v)}const a=calc(n.a);let b=calc(n.b);if((n.op==='+'||n.op==='-')&&n.b.type==='percent')b=a.mul(b);if(n.op==='+')return a.add(b);if(n.op==='-')return a.sub(b);if(n.op==='*')return a.mul(b);if(n.op==='/')return a.div(b);if(b.d!==1n)approximate=true;return a.pow(b)}
 const q=calc(ast);if(!Number.isFinite(q.number())||q.n.toString().length>300)throw Error('Resultado muito grande.');const text=q.text();return {q,text,approximate:approximate||Q.of(text).n*q.d!==q.n*Q.of(text).d};
}
export const amount=s=>{if(s instanceof Q)return s;let v=String(s??'').trim().replace(/R\$\s*/g,'').replace(/\s/g,'');if(v.includes(',')&&v.includes('.'))v=v.replace(/\./g,'');return Q.of(v||'0')};
export const money=q=>{const cents=Q.of(q).round(2),neg=cents<0n,a=neg?-cents:cents;return (neg?'-':'')+'R$ '+(a/100n).toString().replace(/\B(?=(\d{3})+(?!\d))/g,'.')+','+(a%100n).toString().padStart(2,'0')};
export const nonnegative=(v,label='Valor')=>{const q=amount(v);if(q.n<0n)throw Error(label+' não pode ser negativo.');return q};
export function net(gross,rate,fee){const r=nonnegative(rate);if(r.number()>=100)throw Error('A taxa deve ser menor que 100%.');return nonnegative(gross).mul(Q.of(1).sub(r.div(100))).sub(nonnegative(fee))}
export function grossFor(desired,rate,fee){const r=nonnegative(rate);if(r.number()>=100)throw Error('A taxa deve ser menor que 100%.');const value=nonnegative(desired).add(nonnegative(fee)).div(Q.of(1).sub(r.div(100)));const cents=value.n*100n/value.d+(value.n*100n%value.d?1n:0n);return new Q(cents,100n)}
export function price(cost,percent,mode){const c=nonnegative(cost),p=nonnegative(percent);if(mode==='margin'){if(p.number()>=100)throw Error('A margem deve ser menor que 100%.');return c.div(Q.of(1).sub(p.div(100)))}return c.mul(Q.of(1).add(p.div(100)))}
export function split(total,count){const cents=nonnegative(total).round(2);if(!Number.isInteger(count)||count<1||count>1000)throw Error('Use de 1 a 1.000 partes.');const n=BigInt(count),base=cents/n,rest=cents%n;return Array.from({length:count},(_,i)=>new Q(base+(BigInt(i)<rest?1n:0n),100n))}
export function installment(total,count,rate,mode){const p=nonnegative(total),r=nonnegative(rate).div(100);if(!Number.isInteger(count)||count<1||count>1000)throw Error('Número de parcelas inválido.');let final=p;if(mode==='simple')final=p.mul(Q.of(1).add(r.mul(count)));if(mode==='compound')final=p.mul(Q.of(1).add(r).pow(count));return {total:final,parts:split(final,count)}}
export function budget(b){let subtotal=Q.of(0);for(const row of b.items){const q=nonnegative(row.qty,'Quantidade'),v=nonnegative(row.price);subtotal=subtotal.add(q.mul(v))}const discount=b.discountMode==='percent'?subtotal.mul(nonnegative(b.discount).div(100)):nonnegative(b.discount);if(discount.number()>subtotal.number())throw Error('Desconto maior que o subtotal.');const total=new Q(subtotal.sub(discount).add(nonnegative(b.extra)).add(nonnegative(b.cost)).round(2),100n);let entry=b.entryMode==='percent'?total.mul(nonnegative(b.entry).div(100)):nonnegative(b.entry);entry=new Q(entry.round(2),100n);if(entry.n*total.d>total.n*entry.d)throw Error('A entrada ultrapassa o total.');return {subtotal,discount,total,entry,balance:total.sub(entry)}}
export function duration(text){const m=String(text).trim().match(/^(\d{1,6}):(\d{2})(?::(\d{2}))?$/);if(!m||Number(m[2])>59||Number(m[3]||0)>59)throw Error('Use horas:minutos ou horas:minutos:segundos.');return Number(m[1])*3600+Number(m[2])*60+Number(m[3]||0)}
export function hms(seconds){const neg=seconds<0,a=Math.abs(Math.round(seconds));return (neg?'-':'')+String(Math.floor(a/3600)).padStart(2,'0')+':'+String(Math.floor(a/60)%60).padStart(2,'0')+':'+String(a%60).padStart(2,'0')}
export function resize(width,rw,rh){const w=nonnegative(width),a=nonnegative(rw),b=nonnegative(rh);if(a.n===0n||b.n===0n)throw Error('A proporção deve ser maior que zero.');return w.mul(b).div(a)}
