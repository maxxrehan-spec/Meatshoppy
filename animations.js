(() => {
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const hero = document.querySelector('#home');
  let timer, hovering=false, focusing=false, slideReady=false;
  const resetSlides = () => {
    clearInterval(timer);
    if(!slideReady || reduced.matches || document.hidden || hovering || focusing) return;
    timer=setInterval(()=>{
      const buttons=[...document.querySelectorAll('#dots button')];
      if(buttons.length>1) buttons[(buttons.findIndex(b=>b.classList.contains('on'))+1)%buttons.length].click();
    },2000);
  };
  const installSlides = () => {
    const pause=hero?.querySelector('.slider-pause');
    if(!pause || slideReady) return;
    // Stop the original interval before taking over, avoiding duplicate timers.
    pause.click();
    pause.remove();
    slideReady=true;
    resetSlides();
  };
  hero?.addEventListener('mouseenter',()=>{hovering=true;resetSlides();});
  hero?.addEventListener('mouseleave',()=>{hovering=false;resetSlides();});
  hero?.addEventListener('focusin',()=>{focusing=true;resetSlides();});
  hero?.addEventListener('focusout',()=>setTimeout(()=>{focusing=hero.contains(document.activeElement);resetSlides();},0));
  document.addEventListener('visibilitychange',resetSlides);
  reduced.addEventListener('change',resetSlides);
  const seen=new Set();
  const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{
    if(!entry.isIntersecting) return;
    const el=entry.target,key=el.dataset.id || el.id || el.dataset.motionKey;
    if(!reduced.matches && !seen.has(key)) el.animate([{opacity:.3,transform:'translateY(10px)'},{opacity:1,transform:'translateY(0)'}],{duration:350,easing:'ease-out'});
    seen.add(key);observer.unobserve(el);
  }),{threshold:.08});
  const progressValues=new Map();
  const refresh=()=>{
    installSlides();
    document.querySelectorAll('#catTiles .cat,#shopGrid .card,#bestGrid .card').forEach((el,i)=>{
      if(el.dataset.motionObserved)return;
      el.dataset.motionObserved='1';el.dataset.motionKey='category-'+i;observer.observe(el);
    });
    document.querySelectorAll('.delivery-progress progress').forEach(el=>{
      const key=el.closest('#coSummary')?'checkout':'cart',value=el.value,max=el.max,prev=progressValues.get(key);
      progressValues.set(key,{value,max});
      if(el.dataset.motionObserved)return;
      el.dataset.motionObserved='1';
      if(reduced.matches || !prev || prev.max!==max || prev.value===value)return;
      const start=performance.now(),from=prev.value;
      const tick=now=>{
        if(!el.isConnected)return;
        const t=Math.min(1,(now-start)/350);
        el.value=from+(value-from)*(1-(1-t)**3);
        if(t<1)requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    });
  };
  let queued=false;
  new MutationObserver(()=>{if(!queued){queued=true;requestAnimationFrame(()=>{queued=false;refresh();});}}).observe(document.body,{childList:true,subtree:true});
  refresh();
})();
