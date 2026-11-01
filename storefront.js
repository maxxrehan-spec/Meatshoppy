/* Presentation only: reuse the existing catalog, language and contact configuration. */
(() => {
  Object.assign(T.en,{serviceHours:"12 PM to 12 AM",hours:"12 PM to 12 AM",best:"Best Seller",bestTag:"Best Seller",waT:"Prefer to order on WhatsApp?",waB:"Order on WhatsApp"});
  Object.assign(T.ar,{serviceHours:"من 12 ظهراً إلى 12 منتصف الليل",hours:"من 12 ظهراً إلى 12 منتصف الليل",best:"الأكثر مبيعاً",bestTag:"الأكثر مبيعاً",waT:"تفضّل الطلب عبر واتساب؟",waB:"اطلب عبر واتساب"});
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
