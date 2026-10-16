/* Optional presentation layer. Never changes products, prices or checkout. */
(() => {
  'use strict';
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const running = new Set();
  function animate(el,frames,options){
    if(!el || reduced.matches || typeof el.animate !== 'function') return;
    const animation=el.animate(frames,options);
    running.add(animation);
    animation.finished.catch(()=>{}).finally(()=>running.delete(animation));
  }
  reduced.addEventListener('change',()=>{if(reduced.matches){running.forEach(a=>a.cancel());running.clear();}});

  // One entrance sequence. Whole text blocks preserve Arabic letter joining.
  if(!location.hash || location.hash==='#home'){
    const hero=document.querySelector('.hero-in');
    [...hero.children].forEach((el,i)=>animate(el,[{opacity:0,transform:'translateY(18px)'},{opacity:1,transform:'translateY(0)'}],{duration:650,delay:i*100,easing:'cubic-bezier(.2,.7,.2,1)',fill:'backwards'}));
  }
  // Only selected editorial elements reveal, once. The shop grid never waits.
  if('IntersectionObserver' in window){
    const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{
      if(!entry.isIntersecting) return;
      observer.unobserve(entry.target);
      const image=entry.target.classList.contains('story-photo');
      animate(entry.target,image?[{opacity:.5,transform:'scale(.97)'},{opacity:1,transform:'scale(1)'}]:[{opacity:.2,transform:'translateY(20px)'},{opacity:1,transform:'translateY(0)'}],{duration:image?800:600,easing:'cubic-bezier(.2,.7,.2,1)'});
    }),{threshold:.15});
    document.querySelectorAll('.categories-section .section-heading,.best-section .section-heading,.story-photo,.story-copy,.how-section h2').forEach(el=>observer.observe(el));
  }

  const track=document.getElementById('bestGrid');
  if(!track) return;
  track.classList.add('featured-track');
  const controls=document.createElement('div');
  controls.className='featured-controls';
  controls.innerHTML='<button type="button" data-step="-1" aria-controls="bestGrid"><svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="m14 5-7 7 7 7"/></svg></button><span class="featured-position" dir="ltr" aria-hidden="true"></span><button type="button" data-step="1" aria-controls="bestGrid"><svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="m10 5 7 7-7 7"/></svg></button>';
  track.after(controls);
  const previous=controls.querySelector('[data-step="-1"]'),next=controls.querySelector('[data-step="1"]'),position=controls.querySelector('span');
  const rtl=()=>document.documentElement.dir==='rtl';
  function visible(){
    const bounds=track.getBoundingClientRect();
    return [...track.children].map((el,i)=>({el,i,rect:el.getBoundingClientRect()})).filter(x=>x.rect.right>bounds.left+8 && x.rect.left<bounds.right-8);
  }
  function update(){
    const cards=[...track.children],shown=visible();
    const ar=rtl();
    previous.setAttribute('aria-label',ar?'المنتجات السابقة':'Previous featured products');
    next.setAttribute('aria-label',ar?'المنتجات التالية':'Next featured products');
    controls.hidden=cards.length<2 || track.scrollWidth<=track.clientWidth+2;
    if(!shown.length) return;
    const bounds=track.getBoundingClientRect(),first=cards[0].getBoundingClientRect(),last=cards[cards.length-1].getBoundingClientRect();
    previous.disabled=ar?first.right<=bounds.right+5:first.left>=bounds.left-5;
    next.disabled=ar?last.left>=bounds.left-5:last.right<=bounds.right+5;
    position.textContent=`${shown[0].i+1}–${shown[shown.length-1].i+1} / ${cards.length}`;
  }
  controls.addEventListener('click',event=>{
    const button=event.target.closest('button'); if(!button) return;
    const shown=visible(); if(!shown.length) return;
    const cards=[...track.children],step=Number(button.dataset.step);
    // Advance one card, keeping context and all shopping controls accessible.
    const index=Math.max(0,Math.min(cards.length-1,shown[0].i+step));
    const bounds=track.getBoundingClientRect(),target=cards[index].getBoundingClientRect();
    const delta=rtl()?target.right-bounds.right+4:target.left-bounds.left-4;
    track.scrollBy({left:delta,behavior:reduced.matches?'instant':'smooth'});
  });
  let scheduled=false;
  function queue(){if(scheduled)return;scheduled=true;requestAnimationFrame(()=>{scheduled=false;update();});}
  track.addEventListener('scroll',queue,{passive:true});
  window.addEventListener('resize',queue,{passive:true});
  new MutationObserver(queue).observe(track,{childList:true});
  new MutationObserver(queue).observe(document.documentElement,{attributes:true,attributeFilter:['dir']});
  update();

  // A brief acknowledgement when the cart quantity changes, not a looping effect.
  const count=document.getElementById('cartCount');
  let lastCount=count.textContent;
  new MutationObserver(()=>{
    if(count.textContent===lastCount) return;
    lastCount=count.textContent;
    animate(count,[{transform:'scale(1)'},{transform:'scale(1.2)'},{transform:'scale(1)'}],{duration:280,easing:'ease-out'});
  }).observe(count,{childList:true});
})();
