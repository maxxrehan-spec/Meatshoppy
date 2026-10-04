/* ============ CONFIG — edit here ============ */
const WHATSAPP_NUMBER = "966500000000"; // international format, no + or spaces
const CONFIG = {
  shopName: "Meat Market",
  whatsapp: WHATSAPP_NUMBER,
  phone: "+966 50 000 0000",
  deliveryFee: 15,
  freeDeliveryOver: 200,            // set to 0 to disable free delivery
  currency: { en: "SAR", ar: "ر.س" },
  areas: ["Al Rawdah", "Al Hamra", "Al Salamah", "Al Safa", "Al Nahda", "Obhur"],
  deliveryTimes: ["As soon as possible", "9:00 AM – 12:00 PM", "12:00 PM – 3:00 PM", "3:00 PM – 6:00 PM", "6:00 PM – 9:00 PM"]
};

/* ============ PRODUCTS — edit here ============
   price = SAR per 1 kg (shown per selected weight automatically)
   was   = optional old price per kg (shows a strike-through)
   cat   = chicken | beef | mutton | liver | paya | minced | kebab | marinated  (tag "offer" also lists it under Offers)
   img   = file in /images (replace with your own photos)  */
const PRODUCTS = [
  { id:"c1", cat:"chicken", en:"Whole Fresh Chicken", ar:"دجاج طازج كامل", d:"Farm-fresh whole chicken, cleaned and ready to cook.", da:"دجاج كامل طازج، منظف وجاهز للطبخ.", img:"images/chicken-whole.jpg", tag:"Best Seller", price:22, weights:[1000,2000] },
  { id:"c2", cat:"chicken", en:"Chicken Breast", ar:"صدر دجاج", d:"Boneless skinless breast fillets.", da:"فيليه صدر دجاج بدون عظم وجلد.", img:"images/chicken-breast.jpg", tag:"Best Seller", price:34, weights:[500,1000,2000] },
  { id:"c3", cat:"chicken", en:"Chicken Drumsticks", ar:"أوراك دجاج", d:"Juicy drumsticks, perfect for grilling.", da:"أوراك دجاج عصيرية مناسبة للشوي.", img:"images/chicken-legs.jpg", tag:"", price:26, weights:[500,1000,2000] },
  { id:"b1", cat:"beef", en:"Beef Steak (Ribeye)", ar:"ستيك لحم بقري (ريب آي)", d:"Tender marbled ribeye, cut fresh daily.", da:"ريب آي طري ومتعرق، يُقطع طازجاً يومياً.", img:"images/beef-steak.jpg", tag:"Best Seller", price:109, weights:[250,500,1000] },
  { id:"b2", cat:"beef", en:"Beef Cubes", ar:"مكعبات لحم بقري", d:"Lean beef cubes for stews and curries.", da:"مكعبات لحم بقري قليلة الدهن للطبخ.", img:"images/beef-cubes.jpg", tag:"", price:72, weights:[500,1000,2000] },
  { id:"m1", cat:"mutton", en:"Mutton Shoulder", ar:"كتف غنم", d:"Fresh local mutton shoulder, bone-in.", da:"كتف غنم محلي طازج بالعظم.", img:"images/mutton.jpg", tag:"Best Seller", price:78, weights:[500,1000,2000] },
  { id:"m2", cat:"mutton", en:"Mutton Ribs", ar:"ريش غنم", d:"Rich, tender ribs for roasting.", da:"ريش غنم طرية ومناسبة للتحميص.", img:"images/mutton-ribs.jpg", tag:"Offer", price:85, was:95, weights:[500,1000,2000] },
  { id:"l1", cat:"liver", en:"Chicken Liver", ar:"كبدة دجاج", d:"Fresh cleaned chicken liver.", da:"كبدة دجاج طازجة ومنظفة.", img:"images/liver.jpg", tag:"", price:24, weights:[250,500,1000] },
  { id:"p1", cat:"paya", en:"Lamb Paya", ar:"باية غنم", d:"Cleaned lamb trotters for slow-cooked paya.", da:"أكارع غنم منظفة للباية المطهوة ببطء.", img:"images/paya.jpg", tag:"", price:30, weights:[500,1000,2000] },
  { id:"mi1", cat:"minced", en:"Minced Beef", ar:"لحم بقري مفروم", d:"Freshly ground lean beef.", da:"لحم بقري قليل الدهن مفروم طازج.", img:"images/minced.jpg", tag:"Offer", price:58, was:66, weights:[250,500,1000,2000] },
  { id:"k1", cat:"kebab", en:"Beef Kebab Skewers", ar:"أسياخ كباب لحم", d:"Hand-seasoned minced kebab, ready to grill.", da:"كباب لحم متبل يدوياً جاهز للشوي.", img:"images/kebab.jpg", tag:"Best Seller", price:70, weights:[500,1000] },
  { id:"mr1", cat:"marinated", en:"Marinated Chicken Shish", ar:"شيش طاووق متبل", d:"Chicken cubes in our house yogurt-spice marinade.", da:"مكعبات دجاج متبلة بخلطة اللبن والبهارات.", img:"images/shish.jpg", tag:"Offer", price:38, was:44, weights:[500,1000,2000] },
  { id:"mr2", cat:"marinated", en:"Marinated Lamb Chops", ar:"ريش غنم متبلة", d:"Lamb chops marinated with garlic and herbs.", da:"ريش غنم متبلة بالثوم والأعشاب.", img:"images/lamb-chops.jpg", tag:"", price:98, weights:[500,1000] }
];

const CATS = [
  ["chicken","🍗","Chicken","دجاج"],["beef","🥩","Beef","لحم بقري"],["mutton","🐑","Mutton","غنم"],
  ["liver","🫀","Liver","كبدة"],["paya","🍲","Paya","باية"],["minced","🍖","Minced Meat","مفروم"],
  ["kebab","🍢","Kebab","كباب"],["marinated","🧂","Marinated","متبل"],["offers","🏷️","Offers","عروض"]
];

const T = {
  en:{nHome:"Home",nShop:"Shop",nAbout:"About Us",nContact:"Contact",heroT:"Fresh Meat Delivered to Your Door",heroS:"Premium chicken, beef and mutton, cut fresh and delivered to your home.",shopNow:"Shop Now",popCats:"Popular categories",best:"Best sellers",offers:"Special offers",why:"Why choose us",
   w1t:"Cut fresh daily",w1d:"Every order is prepared on the day of delivery.",w2t:"Quality sourced",w2d:"Carefully selected chicken and meat.",w3t:"Clear pricing",w3d:"Every price shows its weight. No surprises.",w4t:"Home delivery",w4d:"Chilled and delivered to your door.",
   how:"How it works",h1:"Choose your meat",h2:"Select the weight",h3:"Place your order",h4:"We confirm on WhatsApp and deliver",waT:"Prefer to order by chat?",waB:"Chat on WhatsApp",
   aboutP:"Meat Market is a fresh chicken and meat delivery service. We focus on quality, clean preparation and fast delivery to your home.",phone:"Phone",hours:"Orders are confirmed on WhatsApp.",
   all:"All",add:"Add to Cart",added:"Added ✓",cart:"Your cart",empty:"Your cart is empty. Add something fresh.",remove:"Remove",sub:"Subtotal",del:"Delivery fee",free:"Free",tot:"Total",goCheckout:"Checkout",back:"← Back to shop",checkout:"Checkout",
   fName:"Full name",fMobile:"Mobile number",fArea:"Area",fAddr:"Full address",fBldg:"Building / Villa number",fTime:"Preferred delivery time",fNotes:"Delivery notes (optional)",pay:"Payment method",cod:"Cash on Delivery",online:"Online Payment / Mada (coming soon)",payNote:"Online payment is a placeholder. No card details are collected on this site.",place:"Place order via WhatsApp",
   errFill:"Please complete all required fields.",errMobile:"Enter a valid Saudi mobile number (e.g. 05XXXXXXXX).",errCart:"Your cart is empty.",kg:"kg",g:"g",selArea:"Select area",newOrder:"New Order",lOrder:"Order Number",lName:"Customer Name",lMob:"Mobile Number",lArea:"Area",lAddr:"Address",lTime:"Delivery Time",lProd:"Products",lW:"Weight",lQ:"Qty",lP:"Price",lPay:"Payment Method",lNotes:"Customer Notes",none:"None",onlinePending:"Online Payment (to be arranged)"},
  ar:{nHome:"الرئيسية",nShop:"المتجر",nAbout:"من نحن",nContact:"تواصل معنا",heroT:"لحوم طازجة تصل إلى بابك",heroS:"دجاج ولحم بقري وغنم فاخر، يُقطع طازجاً ويُوصَّل إلى منزلك.",shopNow:"تسوق الآن",popCats:"الأقسام الشائعة",best:"الأكثر مبيعاً",offers:"عروض خاصة",why:"لماذا تختارنا",
   w1t:"طازج كل يوم",w1d:"نجهّز كل طلب في يوم التوصيل.",w2t:"جودة مضمونة",w2d:"دجاج ولحوم مختارة بعناية.",w3t:"أسعار واضحة",w3d:"كل سعر مرتبط بوزنه. بلا مفاجآت.",w4t:"توصيل للمنزل",w4d:"نوصّله لك مبرداً حتى الباب.",
   how:"كيف نعمل",h1:"اختر لحمتك",h2:"حدد الوزن",h3:"أرسل طلبك",h4:"نؤكد عبر واتساب ونوصّل",waT:"تفضّل الطلب بالمحادثة؟",waB:"تواصل عبر واتساب",
   aboutP:"ميت ماركت خدمة توصيل دجاج ولحوم طازجة. نهتم بالجودة والنظافة وسرعة التوصيل إلى منزلك.",phone:"الهاتف",hours:"يتم تأكيد الطلبات عبر واتساب.",
   all:"الكل",add:"أضف إلى السلة",added:"تمت الإضافة ✓",cart:"سلتك",empty:"سلتك فارغة. أضف شيئاً طازجاً.",remove:"حذف",sub:"المجموع الفرعي",del:"رسوم التوصيل",free:"مجاني",tot:"الإجمالي",goCheckout:"إتمام الطلب",back:"→ العودة للمتجر",checkout:"إتمام الطلب",
   fName:"الاسم الكامل",fMobile:"رقم الجوال",fArea:"الحي",fAddr:"العنوان الكامل",fBldg:"رقم المبنى / الفيلا",fTime:"وقت التوصيل المفضل",fNotes:"ملاحظات التوصيل (اختياري)",pay:"طريقة الدفع",cod:"الدفع عند الاستلام",online:"الدفع الإلكتروني / مدى (قريباً)",payNote:"الدفع الإلكتروني للعرض فقط. لا يتم جمع بيانات بطاقات في هذا الموقع.",place:"إرسال الطلب عبر واتساب",
   errFill:"يرجى تعبئة جميع الحقول المطلوبة.",errMobile:"أدخل رقم جوال سعودي صحيح (مثال: 05XXXXXXXX).",errCart:"سلتك فارغة.",kg:"كجم",g:"جم",selArea:"اختر الحي",newOrder:"طلب جديد",lOrder:"رقم الطلب",lName:"اسم العميل",lMob:"رقم الجوال",lArea:"الحي",lAddr:"العنوان",lTime:"وقت التوصيل",lProd:"المنتجات",lW:"الوزن",lQ:"الكمية",lP:"السعر",lPay:"طريقة الدفع",lNotes:"ملاحظات العميل",none:"لا يوجد",onlinePending:"دفع إلكتروني (يُرتَّب لاحقاً)"}
};

/* ============ App ============ */
const $ = (s, r=document) => r.querySelector(s);
const $$ = (s, r=document) => [...r.querySelectorAll(s)];
const store = {
  get(k, d){ try{ return JSON.parse(localStorage.getItem(k)) ?? d; }catch(e){ return d; } },
  set(k, v){ try{ localStorage.setItem(k, JSON.stringify(v)); }catch(e){} }
};
let lang = store.get("mm_lang", "en");
let cart = store.get("mm_cart", []);       // [{id, w, q}]
let filter = "all";
const sel = {};                             // per-product selection {w,q}

const t = k => T[lang][k] ?? k;
const cur = () => CONFIG.currency[lang];
const num = n => (Math.round(n*100)/100).toString();
const wl = w => w >= 1000 ? `${w/1000} ${t("kg")}` : `${w} ${t("g")}`;
const money = n => `${num(n)} ${cur()}`;
const pName = p => lang==="ar" ? p.ar : p.en;
const pDesc = p => lang==="ar" ? p.da : p.d;
const price = (p, w) => p.price * w / 1000;
const prod = id => PRODUCTS.find(p => p.id === id);
const ph = p => { const e = ({chicken:"🍗",beef:"🥩",mutton:"🐑",liver:"🫀",paya:"🍲",minced:"🍖",kebab:"🍢",marinated:"🧂"})[p.cat]||"🥩";
  return "data:image/svg+xml;utf8," + encodeURIComponent(`<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 300'><rect width='400' height='300' fill='#7a1527'/><text x='200' y='180' font-size='110' text-anchor='middle'>${e}</text></svg>`); };
const img = p => `<img src="${p.img}" alt="${pName(p)}" loading="lazy" onerror="this.onerror=null;this.src=ph(prod('${p.id}'))">`;
const saveCart = () => store.set("mm_cart", cart);

/* i18n */
function applyLang(){
  document.documentElement.lang = lang;
  document.documentElement.dir = lang==="ar" ? "rtl" : "ltr";
  $("#langBtn").textContent = lang==="ar" ? "English" : "العربية";
  $$("[data-i]").forEach(el => el.textContent = t(el.dataset.i));
  $("#phoneLink").textContent = CONFIG.phone; $("#phoneLink").href = "tel:" + CONFIG.phone.replace(/\s/g,"");
  $("#waLink").href = $("#waLink2").href = "https://wa.me/" + CONFIG.whatsapp;
  $("#areaSel").innerHTML = `<option value="">${t("selArea")}</option>` + CONFIG.areas.map(a=>`<option>${a}</option>`).join("");
  $("#timeSel").innerHTML = CONFIG.deliveryTimes.map(a=>`<option>${a}</option>`).join("");
  renderTiles(); renderChips(); renderGrids(); renderCart(); renderSummary();
}

/* Catalogue */
function renderTiles(){
  $("#catTiles").innerHTML = CATS.map(c => `<button class="cat" data-cat="${c[0]}"><span>${c[1]}</span>${lang==="ar"?c[3]:c[2]}</button>`).join("");
}
function renderChips(){
  $("#chips").innerHTML = [["all",t("all")], ...CATS.map(c=>[c[0], lang==="ar"?c[3]:c[2]])]
    .map(([k,l]) => `<button class="chip ${k===filter?"on":""}" data-cat="${k}">${l}</button>`).join("");
}
function card(p){
  const s = sel[p.id] ||= { w: p.weights.includes(1000) ? 1000 : p.weights[0], q: 1 };
  const tag = p.tag ? `<span class="tag">${p.tag}</span>` : "";
  return `<article class="card" data-id="${p.id}">
    <div class="imgw">${img(p)}${tag}</div>
    <div class="cb"><h3>${pName(p)}</h3><p>${pDesc(p)}</p>
      <div class="unit">${money(p.price)} / ${t("kg")}${p.was?`<s>${money(p.was)}</s>`:""}</div>
      <div class="tot">${money(price(p, s.w))} / ${wl(s.w)}</div>
      <div class="row">
        <select class="wSel" aria-label="${t("lW")}">${p.weights.map(w=>`<option value="${w}" ${w===s.w?"selected":""}>${wl(w)}</option>`).join("")}</select>
        <div class="qty"><button data-act="dec" aria-label="-">−</button><span>${s.q}</span><button data-act="inc" aria-label="+">+</button></div>
      </div>
      <button class="add" data-act="add">${t("add")}</button>
    </div></article>`;
}
function renderGrids(){
  $("#bestGrid").innerHTML = PRODUCTS.filter(p=>p.tag==="Best Seller").slice(0,6).map(card).join("");
  $("#offerGrid").innerHTML = PRODUCTS.filter(p=>p.was||p.tag==="Offer").map(card).join("");
  const list = filter==="all" ? PRODUCTS : filter==="offers" ? PRODUCTS.filter(p=>p.was||p.tag==="Offer") : PRODUCTS.filter(p=>p.cat===filter);
  $("#shopGrid").innerHTML = list.map(card).join("");
}
document.addEventListener("click", e => {
  const cat = e.target.closest("[data-cat]");
  if(cat){ filter = cat.dataset.cat; renderChips(); renderGrids(); showMain(); $("#shop").scrollIntoView(); return; }
  const c = e.target.closest(".card"); const b = e.target.closest("[data-act]");
  if(!c || !b) return;
  const p = prod(c.dataset.id), s = sel[p.id];
  if(b.dataset.act==="inc") s.q = Math.min(20, s.q+1);
  if(b.dataset.act==="dec") s.q = Math.max(1, s.q-1);
  if(b.dataset.act==="add"){ addToCart(p.id, s.w, s.q); b.textContent = t("added"); setTimeout(()=>b.textContent=t("add"), 900); }
  syncCards(p.id);
});
document.addEventListener("change", e => {
  if(!e.target.classList.contains("wSel")) return;
  const id = e.target.closest(".card").dataset.id; sel[id].w = +e.target.value; syncCards(id);
});
function syncCards(id){            // keep same product in every grid in sync, without re-rendering
  const p = prod(id), s = sel[id];
  $$(`.card[data-id="${id}"]`).forEach(c => {
    $(".tot", c).textContent = `${money(price(p, s.w))} / ${wl(s.w)}`;
    $(".qty span", c).textContent = s.q; $(".wSel", c).value = s.w;
  });
}

/* Cart */
function addToCart(id, w, q){
  const it = cart.find(i => i.id===id && i.w===w);
  it ? it.q = Math.min(50, it.q+q) : cart.push({id, w, q});
  saveCart(); renderCart();
}
const subtotal = () => cart.reduce((s,i)=> s + price(prod(i.id), i.w) * i.q, 0);
const deliveryFee = () => (!cart.length || (CONFIG.freeDeliveryOver && subtotal() >= CONFIG.freeDeliveryOver)) ? 0 : CONFIG.deliveryFee;
const totals = () => { const s = subtotal(), d = deliveryFee(); return { s, d, t: s + d }; };

function renderCart(){
  cart = cart.filter(i => prod(i.id));
  $("#cartCount").textContent = cart.reduce((n,i)=>n+i.q,0);
  $("#cartItems").innerHTML = cart.length ? cart.map((i,ix) => { const p = prod(i.id); return `
    <div class="li">${img(p)}<div class="m"><b>${pName(p)}</b><small>${wl(i.w)} · ${money(price(p,i.w))}</small>
      <div class="qty"><button data-ci="${ix}" data-d="-1">−</button><span>${i.q}</span><button data-ci="${ix}" data-d="1">+</button></div></div>
      <div><b>${money(price(p,i.w)*i.q)}</b><br><button class="rm" data-rm="${ix}">${t("remove")}</button></div></div>`; }).join("")
    : `<p class="empty">${t("empty")}</p>`;
  const x = totals();
  $("#cartFoot").innerHTML = cart.length ? `
    <div class="sum"><span>${t("sub")}</span><span>${money(x.s)}</span></div>
    <div class="sum"><span>${t("del")}</span><span>${x.d? money(x.d): t("free")}</span></div>
    <div class="sum t"><span>${t("tot")}</span><span>${money(x.t)}</span></div>
    <button class="btn full" id="goCo">${t("goCheckout")}</button>` : "";
  renderSummary();
}
$("#cartItems").addEventListener("click", e => {
  const b = e.target;
  if(b.dataset.ci!==undefined){ const i = cart[+b.dataset.ci]; i.q += +b.dataset.d; if(i.q<1) cart.splice(+b.dataset.ci,1); }
  else if(b.dataset.rm!==undefined) cart.splice(+b.dataset.rm,1);
  else return;
  saveCart(); renderCart();
});
const openCart = o => { $("#drawer").classList.toggle("open", o); $("#scrim").classList.toggle("on", o); $("#drawer").setAttribute("aria-hidden", !o); };
$("#cartBtn").onclick = () => openCart(true);
$("#closeCart").onclick = $("#scrim").onclick = () => openCart(false);
$("#cartFoot").addEventListener("click", e => { if(e.target.id==="goCo"){ openCart(false); showCheckout(); } });

/* Views */
function showCheckout(){ $("#main").hidden = true; $("#checkoutView").hidden = false; scrollTo(0,0); }
function showMain(){ $("#main").hidden = false; $("#checkoutView").hidden = true; }
$("#backBtn").onclick = () => { showMain(); $("#shop").scrollIntoView(); };
$("#nav").addEventListener("click", showMain);
$(".logo").addEventListener("click", showMain);
function renderSummary(){
  const x = totals();
  $("#coSummary").innerHTML = cart.map(i=>{ const p=prod(i.id); return `<div class="sum"><span>${pName(p)} · ${wl(i.w)} × ${i.q}</span><span>${money(price(p,i.w)*i.q)}</span></div>`; }).join("")
   + `<div class="sum"><span>${t("sub")}</span><span>${money(x.s)}</span></div><div class="sum"><span>${t("del")}</span><span>${x.d?money(x.d):t("free")}</span></div><div class="sum t"><span>${t("tot")}</span><span>${money(x.t)}</span></div>`;
}

/* Checkout → WhatsApp */
$("#coForm").addEventListener("submit", e => {
  e.preventDefault();
  const f = Object.fromEntries(new FormData(e.target)), err = $("#coErr");
  if(!cart.length){ err.textContent = t("errCart"); return; }
  if(!f.name.trim()||!f.mobile.trim()||!f.area||!f.address.trim()||!f.building.trim()){ err.textContent = t("errFill"); return; }
  if(!/^(\+?966|0)?5\d{8}$/.test(f.mobile.replace(/[\s-]/g,""))){ err.textContent = t("errMobile"); return; }
  err.textContent = "";
  const order = buildOrder(f);
  store.set("mm_last_order", order);       // Backend hook: send `order` to your API here (see README)
  const url = "https://wa.me/" + CONFIG.whatsapp + "?text=" + encodeURIComponent(order.message);
  cart = []; saveCart(); renderCart(); e.target.reset(); showMain();
  window.open(url, "_blank") || (location.href = url);
});
function buildOrder(f){
  const L = k => T.en[k];                 // WhatsApp message is always English so the shop can read it
  const x = totals(), d = new Date();
  const no = "MM-" + d.getFullYear().toString().slice(2) + String(d.getMonth()+1).padStart(2,"0") + String(d.getDate()).padStart(2,"0") + "-" + Math.floor(1000+Math.random()*9000);
  const w = n => n>=1000 ? `${n/1000} kg` : `${n} g`, m = n => `${num(n)} SAR`;
  const items = cart.map((i,ix) => { const p = prod(i.id);
    return `${ix+1}. ${p.en} (${p.ar})\n   ${L("lW")}: ${w(i.w)} | ${L("lQ")}: ${i.q} | ${L("lP")}: ${m(price(p,i.w))} each = ${m(price(p,i.w)*i.q)}`; }).join("\n");
  const pay = f.pay==="cod" ? L("cod") : L("onlinePending");
  const message = `*${CONFIG.shopName} — ${L("newOrder")}*\n\n${L("lOrder")}: ${no}\n${L("lName")}: ${f.name}\n${L("lMob")}: ${f.mobile}\n${L("lArea")}: ${f.area}\n${L("lAddr")}: ${f.address}, Bldg/Villa ${f.building}\n${L("lTime")}: ${f.time}\n\n*${L("lProd")}*\n${items}\n\n${T.en.sub}: ${m(x.s)}\n${T.en.del}: ${x.d? m(x.d): "Free"}\n*${T.en.tot}: ${m(x.t)}*\n\n${L("lPay")}: ${pay}\n${L("lNotes")}: ${f.notes.trim()||L("none")}`;
  return { orderNumber:no, createdAt:d.toISOString(), customer:{name:f.name,mobile:f.mobile,area:f.area,address:f.address,building:f.building}, deliveryTime:f.time, paymentMethod:f.pay, items:cart.map(i=>({...i})), totals:x, notes:f.notes, message };
}

$("#langBtn").onclick = () => { lang = lang==="en" ? "ar" : "en"; store.set("mm_lang", lang); applyLang(); };
$("#yr").textContent = new Date().getFullYear();
applyLang();
