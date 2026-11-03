/* Presentation only: reuse the existing catalog, language and contact configuration. */
(() => {
  Object.assign(T.en,{noRes:"Coming soon",serviceHours:"Delivery time: 12 PM to 12 AM",hours:"Delivery time: 12 PM to 12 AM",best:"Best Seller",bestTag:"Best Seller",waT:"Prefer to order on WhatsApp?",waB:"Order on WhatsApp"});
  Object.assign(T.ar,{noRes:"قريباً",serviceHours:"وقت التوصيل: من 12 ظهراً إلى 12 منتصف الليل",hours:"وقت التوصيل: من 12 ظهراً إلى 12 منتصف الليل",best:"الأكثر مبيعاً",bestTag:"الأكثر مبيعاً",waT:"تفضّل الطلب عبر واتساب؟",waB:"اطلب عبر واتساب"});
  applyLang();
  const floating=document.getElementById("whatsappFloat");
  function sync(){
    const ar=document.documentElement.lang==="ar";
    floating.href=document.getElementById("waLink2").href+"?text="+encodeURIComponent(ar?"مرحباً، أود الطلب من متجر طارق.":"Hello, I would like to place an order.");
    floating.querySelector("span").textContent=ar?"اطلب عبر واتساب":"Order on WhatsApp";
  }
  new MutationObserver(sync).observe(document.documentElement,{attributes:true,attributeFilter:["lang"]});
  sync();
})();

(() => {
 const header=document.querySelector(".bar"),logo=header.querySelector(".logo"),menu=document.getElementById("menuBtn"),cart=document.getElementById("cartBtn");
 header.insertBefore(menu,logo);
 const search=document.querySelector(".search-wrap");search.id="headerSearch";
 const toggle=document.createElement("button");toggle.id="searchToggle";toggle.className="search-toggle";toggle.type="button";toggle.setAttribute("aria-label","Search products");toggle.setAttribute("aria-expanded","false");toggle.setAttribute("aria-controls","headerSearch");
 toggle.innerHTML='<svg aria-hidden="true" width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="10.5" cy="10.5" r="6.5"/><path d="m16 16 5 5"/></svg>';
 header.insertBefore(toggle,cart);
 const section=document.querySelector("section.wa"),link=document.getElementById("waLink");
 if(section&&link){link.hidden=true;link.setAttribute("aria-hidden","true");link.tabIndex=-1;section.replaceWith(link);}
})();

(() => {
 const header=document.querySelector(".bar"), toggle=document.getElementById("searchToggle"), input=document.getElementById("q");
 function setSearch(open){header.classList.toggle("search-open",open);toggle.setAttribute("aria-expanded",String(open));if(open)input.focus();}
 toggle.addEventListener("click",()=>setSearch(!header.classList.contains("search-open")));
 input.addEventListener("keydown",e=>{if(e.key==="Escape"){setSearch(false);toggle.focus();}});
 function localizeSearch(){toggle.setAttribute("aria-label",document.documentElement.lang==="ar"?"البحث عن المنتجات":"Search products");}
 new MutationObserver(localizeSearch).observe(document.documentElement,{attributes:true,attributeFilter:["lang"]});localizeSearch();
 // Weights remain in the product's selector or fixed-weight label below its price.
 function tidyPrices(root){
   root.querySelectorAll(".card .tot").forEach(el=>{
     for(const node of el.childNodes){
       if(node.nodeType!==Node.TEXT_NODE)continue;
       const value=node.textContent;
       const clean=value.replace(/\s*·\s*[^×]*(?=×|$)/,"").trimEnd();
       if(value!==clean)node.textContent=clean;
     }
   });
 }
 for(const id of ["bestGrid","shopGrid","productBody"]){
   const root=document.getElementById(id);
   if(!root)continue;
   const observer=new MutationObserver(()=>{observer.disconnect();tidyPrices(root);observer.observe(root,{childList:true,subtree:true,characterData:true});});
   tidyPrices(root);observer.observe(root,{childList:true,subtree:true,characterData:true});
 }
})();

/* Native modal menu: left-hand drawer with focus containment and Escape support. */
(() => {
 const trigger=document.getElementById("menuBtn"),nav=document.getElementById("nav");
 const panel=document.createElement("dialog");panel.id="menuDrawer";panel.setAttribute("aria-labelledby","menuDrawerTitle");
 panel.innerHTML='<div class="menu-drawer-head"><h2 id="menuDrawerTitle"></h2><button type="button" class="menu-close"><span aria-hidden="true">×</span></button></div><nav class="menu-drawer-links"></nav><p class="menu-delivery"></p>';
 document.body.append(panel);
 const links=panel.querySelector("nav"),close=panel.querySelector("button");
 let previousOverflow="";
 function localize(){
  const ar=document.documentElement.lang==="ar";
  panel.dir=ar?"rtl":"ltr";
  panel.querySelector("h2").textContent=ar?"القائمة":"Menu";
  close.setAttribute("aria-label",ar?"إغلاق القائمة":"Close menu");
  links.setAttribute("aria-label",ar?"التنقل الرئيسي":"Main navigation");
  links.replaceChildren(...[...nav.querySelectorAll("a")].map(a=>a.cloneNode(true)));
  panel.querySelector(".menu-delivery").textContent=ar?"وقت التوصيل: من 12 ظهراً إلى 12 منتصف الليل":"Delivery time: 12 PM to 12 AM";
 }
 function dismiss(){if(panel.open)panel.close();}
 trigger.setAttribute("aria-controls","menuDrawer");
 trigger.setAttribute("aria-haspopup","dialog");
 trigger.onclick=()=>{
  nav.classList.remove("open");localize();
  previousOverflow=document.body.style.overflow;document.body.style.overflow="hidden";
  panel.showModal();trigger.setAttribute("aria-expanded","true");close.focus();
 };
 close.onclick=dismiss;
 panel.addEventListener("click",e=>{if(e.target===panel){const r=panel.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)dismiss();}});
 links.addEventListener("click",e=>{const a=e.target.closest("a");if(a){dismiss();if(a.getAttribute("href").startsWith("#"))showMain();}});
 panel.addEventListener("close",()=>{document.body.style.overflow=previousOverflow;trigger.setAttribute("aria-expanded","false");trigger.focus();});
 new MutationObserver(localize).observe(document.documentElement,{attributes:true,attributeFilter:["lang"]});
 localize();
})();
