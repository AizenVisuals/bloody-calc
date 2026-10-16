/** Short taps retain the button's click action; a stationary 1.5 s hold clears once. */
export function installHoldClear(root,onClear){
 let active=null,suppress=null;
 const selector='button[data-act="backspace"]';
 function cancel(){if(active)clearTimeout(active.timer);active=null}
 root.addEventListener('pointerdown',e=>{
  if(e.button!==0||e.isPrimary===false)return;
  const button=e.target.closest(selector);if(!button)return;
  cancel();suppress=null;
  const press={button,id:e.pointerId,x:e.clientX,y:e.clientY,timer:null};active=press;
  press.timer=setTimeout(()=>{if(active!==press||!button.isConnected)return;press.fired=true;suppress=button;onClear();},1500);
 });
 root.addEventListener('pointermove',e=>{if(active&&e.pointerId===active.id&&Math.hypot(e.clientX-active.x,e.clientY-active.y)>12)cancel()});
 root.addEventListener('pointerup',e=>{if(active&&e.pointerId===active.id)cancel()});
 root.addEventListener('pointercancel',cancel);
 root.addEventListener('click',e=>{const button=e.target.closest(selector);if(button&&button===suppress){suppress=null;e.preventDefault();e.stopImmediatePropagation()}},true);
 root.addEventListener('contextmenu',e=>{if(e.target.closest(selector))e.preventDefault()});
 root.addEventListener('visibilitychange',()=>{if(root.hidden)cancel()});
 root.defaultView?.addEventListener('blur',cancel);
}
