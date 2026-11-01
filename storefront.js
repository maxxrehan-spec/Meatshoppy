/* Presentation only: reuse the existing catalog, language and contact configuration. */
(() => {
  Object.assign(T.en,{best:"Best Seller",bestTag:"Best Seller",waT:"Prefer to order on WhatsApp?",waB:"Order on WhatsApp"});
  Object.assign(T.ar,{best:"الأكثر مبيعاً",bestTag:"الأكثر مبيعاً",waT:"تفضّل الطلب عبر واتساب؟",waB:"اطلب عبر واتساب"});
  applyLang();
  const floating=document.getElementById("whatsappFloat");
  const pause=document.getElementById("announcementPause");
  const banner=document.querySelector(".announcement");
  function sync(){
    const ar=document.documentElement.lang==="ar";
    floating.href=document.getElementById("waLink2").href+"?text="+encodeURIComponent(ar?"مرحباً، أود الطلب من متجر طارق.":"Hello, I would like to place an order.");
    floating.querySelector("span").textContent=ar?"اطلب عبر واتساب":"Order on WhatsApp";
    const paused=banner.classList.contains("is-paused");
    pause.setAttribute("aria-label",ar?(paused?"تشغيل حركة الإعلان":"إيقاف حركة الإعلان"):(paused?"Play delivery announcement":"Pause delivery announcement"));
  }
  pause.addEventListener("click",()=>{
    const paused=banner.classList.toggle("is-paused");
    pause.setAttribute("aria-pressed",String(paused));pause.textContent=paused?"▶":"Ⅱ";sync();
  });
  new MutationObserver(sync).observe(document.documentElement,{attributes:true,attributeFilter:["lang"]});
  sync();
})();