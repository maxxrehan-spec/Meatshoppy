/* ============ CONFIG — edit here ============ */
const WHATSAPP_NUMBER = "966568411627"; // international format, no + or spaces
const CONFIG = {
  shopName: "Meat Market",
  whatsapp: WHATSAPP_NUMBER,
  phone: "+966 56 841 1627",
  orderEndpoint: "https://script.google.com/macros/s/AKfycbzrInRjKvAisOMNkXJFwe78wOcEz3BwwQ06pDSLKMcLr36XN7eRsqjEz37B_rRraj7EvQ/exec",   // paste your Google Apps Script web app URL here (see setup steps)
  orderSecret: "iamrehan",   // must match SETTINGS.SECRET in the Apps Script
  // Delivery fee tiers by straight-line distance from the shop. Free when the order reaches "freeOver", otherwise "fee".
  deliveryTiers: [
    { upToKm: 5,  freeOver: 50,  fee: 10 },   // 0 to 5 km:  free over 50 SAR, else 10 SAR
    { upToKm: 15, freeOver: 200, fee: 20 }    // 5 to 15 km: free over 200 SAR, else 20 SAR
  ],
  farBaseFee: 20,    // beyond the last tier: this base fee ...
  farPerKm: 2,       // ... plus this amount for each extra km (rounded up)
  shopLocation: { lat: 21.559008718707744, lng: 39.208730924752984 },   // your shop/kitchen coordinates
  currency: { en: "SAR", ar: "ر.س" },
  areas: ["Al Aziziah", "Al Rehab", "Al Safa"],
  deliveryTimes: ["As soon as possible", "9:00 AM – 12:00 PM", "12:00 PM – 3:00 PM", "3:00 PM – 6:00 PM", "6:00 PM – 9:00 PM", 9:00 PM - 12:00 AM"]
};

/* ============ PRODUCTS — edit here ============
   cat  = chicken | mutton | beef | eggs
   unit = "kg"  -> price = SAR per 1 kg,  opts = weights in grams (e.g. [500,1000])
          "pc"  -> price = SAR per piece, opts = piece counts (e.g. [12,24])
          "pack"-> price = SAR per pack,  pk / pka = pack label EN / AR (opts stays [1])
   img  = file in /images (replace with your own photos). PRICES BELOW ARE SAMPLES — set your real prices. */
const PRODUCTS = [
  { id:"c1", cat:"chicken", unit:"kg", en:"Whole Chicken", ar:"دجاج كامل", d:"Fresh whole chicken, cleaned and ready to cook.", da:"دجاج كامل طازج، منظف وجاهز للطبخ.", img:"images/chicken-whole.jpg", tag:"Best Seller", price:24, opts:[900,1000,1200] },
  { id:"c2", cat:"chicken", unit:"pack", en:"Chicken, Chopped – 4 pcs", ar:"دجاج مقطع – 4 قطع", d:"Fresh chicken chopped into 4 pieces.", da:"دجاج طازج مقطع إلى 4 قطع.", img:"images/chicken-chopped.jpg", tag:"", price:28, pk:"4 pcs", pka:"4 قطع", opts:[1] },
  { id:"c3", cat:"chicken", unit:"kg", en:"Fresh Chicken Boneless", ar:"دجاج طازج بدون عظم", d:"Boneless, skinless chicken fillets.", da:"فيليه دجاج طازج بدون عظم وجلد.", img:"images/chicken-boneless.jpg", tag:"Best Seller", price:38, opts:[1000,2000] },
  { id:"c4", cat:"chicken", unit:"kg", en:"Chicken Liver", ar:"كبدة دجاج", d:"Fresh cleaned chicken liver.", da:"كبدة دجاج طازجة ومنظفة.", img:"images/chicken-liver.jpg", tag:"", price:25, opts:[500] },
  { id:"m1", cat:"mutton", unit:"kg", en:"T-Bone Mutton Chops", ar:"ريش غنم تي بون", d:"Tender T-bone cut chops.", da:"قطع تي بون طرية من الغنم.", img:"images/mutton-tbone.jpg", tag:"", price:105, opts:[500,1000] },
  { id:"m2", cat:"mutton", unit:"kg", en:"Fresh Mutton", ar:"لحم غنم طازج", d:"Fresh mutton, cut to order.", da:"لحم غنم طازج يُقطع حسب الطلب.", img:"images/mutton-fresh.jpg", tag:"Best Seller", price:85, opts:[500,1000] },
  { id:"m3", cat:"mutton", unit:"pc", en:"Mutton Paya (Goat Trotters)", ar:"باية غنم (أكارع ماعز)", d:"Cleaned goat trotters, sold by the piece.", da:"أكارع ماعز منظفة، تُباع بالقطعة.", img:"images/paya-goat.jpg", tag:"", price:8, opts:[12,24] },
  { id:"m4", cat:"mutton", unit:"kg", en:"Asian Mutton", ar:"لحم غنم آسيوي", d:"Asian mutton, fresh and lean.", da:"لحم غنم آسيوي طازج وقليل الدهن.", img:"images/mutton-asian.jpg", tag:"", price:70, opts:[500,1000] },
  { id:"m5", cat:"mutton", unit:"kg", en:"Mutton Siri (Head Meat)", ar:"سري غنم (لحم الرأس)", d:"Cleaned mutton head meat.", da:"لحم رأس غنم منظف.", img:"images/mutton-siri.jpg", tag:"", price:45, opts:[500,1000] },
  { id:"m6", cat:"mutton", unit:"pack", en:"Goat Brain – 1 pc", ar:"مخ ماعز – قطعة", d:"Fresh goat brain, 1 piece.", da:"مخ ماعز طازج، قطعة واحدة.", img:"images/goat-brain.jpg", tag:"", price:18, pk:"1 pc", pka:"قطعة", opts:[1] },
  { id:"m7", cat:"mutton", unit:"kg", en:"Goat Kidney & Heart", ar:"كلاوي وقلب ماعز", d:"Fresh goat kidney and heart.", da:"كلاوي وقلب ماعز طازجة.", img:"images/goat-kidney-heart.jpg", tag:"", price:40, opts:[500,1000] },
  { id:"m8", cat:"mutton", unit:"kg", en:"Mutton Liver", ar:"كبدة غنم", d:"Fresh mutton liver.", da:"كبدة غنم طازجة.", img:"images/mutton-liver.jpg", tag:"", price:60, opts:[500] },
  { id:"b1", cat:"beef", unit:"kg", en:"Fresh Beef", ar:"لحم بقري طازج", d:"Fresh beef, cut to order.", da:"لحم بقري طازج يُقطع حسب الطلب.", img:"images/beef-fresh.jpg", tag:"Best Seller", price:70, opts:[500,1000] },
  { id:"b2", cat:"beef", unit:"kg", en:"Fresh Minced Beef (Keema)", ar:"لحم بقري مفروم طازج (كيما)", d:"Freshly minced beef.", da:"لحم بقري مفروم طازج.", img:"images/beef-minced-fresh.jpg", tag:"", price:62, opts:[500,1000] },
  { id:"b3", cat:"beef", unit:"kg", en:"Frozen Minced Beef (Keema)", ar:"لحم بقري مفروم مجمد (كيما)", d:"Frozen minced beef.", da:"لحم بقري مفروم مجمد.", img:"images/beef-minced-frozen.jpg", tag:"Frozen", price:48, opts:[500,1000] },
  { id:"b4", cat:"beef", unit:"kg", en:"Frozen Beef", ar:"لحم بقري مجمد", d:"Frozen beef, good value.", da:"لحم بقري مجمد بسعر مناسب.", img:"images/beef-frozen.jpg", tag:"Frozen", price:52, opts:[500,1000] },
  { id:"b5", cat:"beef", unit:"kg", en:"Fresh Beef (Bone-In)", ar:"لحم بقري طازج بالعظم", d:"Fresh bone-in beef for stews and soups.", da:"لحم بقري طازج بالعظم للطبخ والشوربة.", img:"images/beef-bone-in.jpg", tag:"", price:60, opts:[500,1000] },
  { id:"b6", cat:"beef", unit:"pc", en:"Cow Paya (Trotters)", ar:"باية بقر", d:"Cleaned cow trotters, sold by the piece.", da:"أكارع بقر منظفة، تُباع بالقطعة.", img:"images/paya-cow.jpg", tag:"", price:7, opts:[12,24] },
  { id:"b7", cat:"beef", unit:"kg", en:"Beef Liver", ar:"كبدة بقر", d:"Fresh beef liver.", da:"كبدة بقر طازجة.", img:"images/beef-liver.jpg", tag:"", price:38, opts:[500] },
  { id:"e1", cat:"eggs", unit:"pack", en:"Egg Crate – 30 Eggs", ar:"كرتون بيض – 30 بيضة", d:"Fresh eggs, crate of 30.", da:"بيض طازج، كرتون 30 بيضة.", img:"images/eggs.jpg", tag:"", price:28, pk:"30 eggs", pka:"30 بيضة", opts:[1] }
];

const CATS = [
  ["chicken","🍗","Chicken","دجاج"],["mutton","🐑","Mutton","غنم"],["beef","🥩","Beef","لحم بقري"],["eggs","🥚","Eggs","بيض"]
];

const T = {
  en:{nHome:"Home",nShop:"Shop",nAbout:"About Us",nContact:"Contact",heroT:"Fresh Meat Delivered to Your Door",heroS:"Premium chicken, beef and mutton, cut fresh and delivered to your home.",shopNow:"Shop Now",cats:"Categories",searchPh:"Search products…",noRes:"No products found.",pc:"pc",pcs:"pcs",best:"Best sellers",offers:"Special offers",why:"Why choose us",
   w1t:"Cut fresh daily",w1d:"Every order is prepared on the day of delivery.",w2t:"Quality sourced",w2d:"Carefully selected chicken and meat.",w3t:"Clear pricing",w3d:"Every price shows its weight. No surprises.",w4t:"Home delivery",w4d:"Chilled and delivered to your door.",
   how:"How it works",h1:"Choose your meat",h2:"Select the weight",h3:"Place your order",h4:"We confirm on WhatsApp and deliver",waT:"Prefer to order by chat?",waB:"Chat on WhatsApp",
   aboutP:"Meat Market is a fresh chicken and meat delivery service. We focus on quality, clean preparation and fast delivery to your home.",phone:"Phone",hours:"Orders are confirmed on WhatsApp.",
   all:"All",add:"Add to Cart",added:"Added ✓",cart:"Your cart",empty:"Your cart is empty. Add something fresh.",remove:"Remove",sub:"Subtotal",del:"Delivery fee",free:"Free",tot:"Total",goCheckout:"Checkout",back:"← Back to shop",checkout:"Checkout",
   fName:"Full name",fMobile:"Mobile number",fArea:"Area",fAddr:"Full address (optional)",fBldg:"Building / Villa number (optional)",fTime:"Preferred delivery time",fNotes:"Delivery notes (optional)",pay:"Payment method",cod:"Cash on Delivery",online:"Online Payment / Mada (coming soon)",payNote:"Online payment is a placeholder. No card details are collected on this site.",place:"Place order",pinT:"Delivery location",pinHelp:"Tap the map or drag the pin to your exact location.",useMe:"Use my current location",dist:"Distance from shop",inZone:"Inside our free-delivery area",outZone:"Outside the {km} km free-delivery area",mapFail:"The map could not load. Please type your full address.",freeNote:"Free delivery on orders over {amt} within {km} km of our shop.",errLoc:"Please pin your delivery location on the map.",locDenied:"Could not get your location. Tap the map instead.",kmU:"km",nTier:"{a}–{b} km: free over {amt}, otherwise {fee}",nFar:"Over {b} km: {base} + {pk} per extra km",lMap:"Location pin",sending:"Sending your order…",doneOk:"Order placed ✓",doneOkP:"Thank you, {n}! Your order {no} has been received. We will confirm it on WhatsApp shortly.",doneStep:"One last step",doneStepP:"Tap the button below to send your order {no} to us on WhatsApp so we can confirm it.",doneWa:"Send order on WhatsApp",doneWa2:"Message us on WhatsApp",
   errFill:"Please complete all required fields.",errMobile:"Enter a valid Saudi mobile number (e.g. 05XXXXXXXX).",errCart:"Your cart is empty.",kg:"kg",g:"g",selArea:"Select area",newOrder:"New Order",lOrder:"Order Number",lName:"Customer Name",lMob:"Mobile Number",lArea:"Area",lAddr:"Address",lTime:"Delivery Time",lProd:"Products",lW:"Weight",lQ:"Qty",lP:"Price",lPay:"Payment Method",lNotes:"Customer Notes",none:"None",onlinePending:"Online Payment (to be arranged)"},
  ar:{nHome:"الرئيسية",nShop:"المتجر",nAbout:"من نحن",nContact:"تواصل معنا",heroT:"لحوم طازجة تصل إلى بابك",heroS:"دجاج ولحم بقري وغنم فاخر، يُقطع طازجاً ويُوصَّل إلى منزلك.",shopNow:"تسوق الآن",cats:"الأقسام",searchPh:"ابحث عن منتج…",noRes:"لا توجد منتجات مطابقة.",pc:"قطعة",pcs:"قطع",best:"الأكثر مبيعاً",offers:"عروض خاصة",why:"لماذا تختارنا",
   w1t:"طازج كل يوم",w1d:"نجهّز كل طلب في يوم التوصيل.",w2t:"جودة مضمونة",w2d:"دجاج ولحوم مختارة بعناية.",w3t:"أسعار واضحة",w3d:"كل سعر مرتبط بوزنه. بلا مفاجآت.",w4t:"توصيل للمنزل",w4d:"نوصّله لك مبرداً حتى الباب.",
   how:"كيف نعمل",h1:"اختر لحمتك",h2:"حدد الوزن",h3:"أرسل طلبك",h4:"نؤكد عبر واتساب ونوصّل",waT:"تفضّل الطلب بالمحادثة؟",waB:"تواصل عبر واتساب",
   aboutP:"ميت ماركت خدمة توصيل دجاج ولحوم طازجة. نهتم بالجودة والنظافة وسرعة التوصيل إلى منزلك.",phone:"الهاتف",hours:"يتم تأكيد الطلبات عبر واتساب.",
   all:"الكل",add:"أضف إلى السلة",added:"تمت الإضافة ✓",cart:"سلتك",empty:"سلتك فارغة. أضف شيئاً طازجاً.",remove:"حذف",sub:"المجموع الفرعي",del:"رسوم التوصيل",free:"مجاني",tot:"الإجمالي",goCheckout:"إتمام الطلب",back:"→ العودة للمتجر",checkout:"إتمام الطلب",
   fName:"الاسم الكامل",fMobile:"رقم الجوال",fArea:"الحي",fAddr:"العنوان الكامل (اختياري)",fBldg:"رقم المبنى / الفيلا (اختياري)",fTime:"وقت التوصيل المفضل",fNotes:"ملاحظات التوصيل (اختياري)",pay:"طريقة الدفع",cod:"الدفع عند الاستلام",online:"الدفع الإلكتروني / مدى (قريباً)",payNote:"الدفع الإلكتروني للعرض فقط. لا يتم جمع بيانات بطاقات في هذا الموقع.",place:"تأكيد الطلب",pinT:"موقع التوصيل",pinHelp:"اضغط على الخريطة أو اسحب الدبوس إلى موقعك بدقة.",useMe:"استخدم موقعي الحالي",dist:"المسافة من المتجر",inZone:"داخل نطاق التوصيل المجاني",outZone:"خارج نطاق التوصيل المجاني ({km} كم)",mapFail:"تعذر تحميل الخريطة. يرجى كتابة العنوان الكامل.",freeNote:"توصيل مجاني للطلبات فوق {amt} ضمن {km} كم من المتجر.",errLoc:"يرجى تحديد موقع التوصيل على الخريطة.",locDenied:"تعذر تحديد موقعك. اضغط على الخريطة بدلاً من ذلك.",kmU:"كم",nTier:"{a}–{b} كم: مجاني للطلبات فوق {amt}، وإلا {fee}",nFar:"أكثر من {b} كم: {base} + {pk} لكل كم إضافي",sending:"جارٍ إرسال طلبك…",doneOk:"تم استلام الطلب ✓",doneOkP:"شكراً {n}! تم استلام طلبك رقم {no}. سنؤكده معك عبر واتساب قريباً.",doneStep:"خطوة أخيرة",doneStepP:"اضغط الزر أدناه لإرسال طلبك رقم {no} إلينا عبر واتساب حتى نؤكده.",doneWa:"أرسل الطلب عبر واتساب",doneWa2:"راسلنا عبر واتساب",
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
let filter = "all", query = "";
let map = null, pin = null, userLoc = store.get("mm_loc", null);   // {lat,lng} chosen on the map
const sel = {};                             // per-product selection {w,q}

const t = k => T[lang][k] ?? k;
const cur = () => CONFIG.currency[lang];
const num = n => (Math.round(n*100)/100).toString();
const wl = (w,p) => p.unit==="kg" ? (w >= 1000 ? `${w/1000} ${t("kg")}` : `${w} ${t("g")}`) : p.unit==="pc" ? `${w} ${t("pcs")}` : (lang==="ar" ? p.pka : p.pk);
const money = n => `${num(n)} ${cur()}`;
const pName = p => lang==="ar" ? p.ar : p.en;
const pDesc = p => lang==="ar" ? p.da : p.d;
const price = (p, w) => p.unit==="kg" ? p.price*w/1000 : p.unit==="pc" ? p.price*w : p.price;
const prod = id => PRODUCTS.find(p => p.id === id);
const ph = p => { const e = ({chicken:"🍗",beef:"🥩",mutton:"🐑",eggs:"🥚"})[p.cat]||"🥩";
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
  $("#areaList").innerHTML = CONFIG.areas.map(a=>`<option value="${a}">`).join("");
  $("#q").placeholder = t("searchPh");
  $("#timeSel").innerHTML = CONFIG.deliveryTimes.map(a=>`<option>${a}</option>`).join("");
  renderTiles(); renderChips(); renderGrids(); renderCart(); renderSummary(); updLocInfo();
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
  const s = sel[p.id] ||= { w: p.unit==="kg" && p.opts.includes(1000) ? 1000 : p.opts[0], q: 1 };
  const tag = p.tag ? `<span class="tag">${p.tag}</span>` : "";
  return `<article class="card" data-id="${p.id}">
    <div class="imgw">${img(p)}${tag}</div>
    <div class="cb"><h3>${pName(p)}</h3><p>${pDesc(p)}</p>
      <div class="unit">${money(p.price)} / ${p.unit==="kg"?t("kg"):p.unit==="pc"?t("pc"):wl(1,p)}</div>
      <div class="tot">${money(price(p, s.w))} / ${wl(s.w,p)}</div>
      <div class="row">
        <select class="wSel" aria-label="${t("lW")}">${p.opts.map(w=>`<option value="${w}" ${w===s.w?"selected":""}>${wl(w,p)}</option>`).join("")}</select>
        <div class="qty"><button data-act="dec" aria-label="-">−</button><span>${s.q}</span><button data-act="inc" aria-label="+">+</button></div>
      </div>
      <button class="add" data-act="add">${t("add")}</button>
    </div></article>`;
}
function renderGrids(){
  $("#bestGrid").innerHTML = PRODUCTS.filter(p=>p.tag==="Best Seller").slice(0,6).map(card).join("");
  const q = query.trim().toLowerCase();
  const list = PRODUCTS.filter(p => (filter==="all"||p.cat===filter) && (!q || (p.en+" "+p.ar+" "+p.d+" "+p.da).toLowerCase().includes(q)));
  $("#shopGrid").innerHTML = list.length ? list.map(card).join("") : `<p class="empty">${t("noRes")}</p>`;
}
document.addEventListener("click", e => {
  const cat = e.target.closest("[data-cat]");
  if(cat){ filter = cat.dataset.cat; query = ""; $("#q").value = ""; renderChips(); renderGrids(); showMain(); $("#shop").scrollIntoView(); return; }
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
    $(".tot", c).textContent = `${money(price(p, s.w))} / ${wl(s.w,p)}`;
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
const rad = x => x * Math.PI / 180;
function km(a, b){ const h = Math.sin(rad(b.lat-a.lat)/2)**2 + Math.cos(rad(a.lat))*Math.cos(rad(b.lat))*Math.sin(rad(b.lng-a.lng)/2)**2; return 12742 * Math.asin(Math.sqrt(h)); }
const distKm = () => userLoc ? km(CONFIG.shopLocation, userLoc) : null;
function feeFor(sub, d){
  d = d === null ? 0 : d;                       // no pin yet: show the nearest-zone fee until a location is chosen
  for(const z of CONFIG.deliveryTiers) if(d <= z.upToKm) return sub >= z.freeOver ? 0 : z.fee;
  const last = CONFIG.deliveryTiers[CONFIG.deliveryTiers.length-1];
  return CONFIG.farBaseFee + CONFIG.farPerKm * Math.ceil(d - last.upToKm);
}
const deliveryFee = () => cart.length ? feeFor(subtotal(), distKm()) : 0;
const noteHtml = () => {
  let prev = 0;
  const rows = CONFIG.deliveryTiers.map(z => { const r = t("nTier").replace("{a}", prev).replace("{b}", z.upToKm).replace("{amt}", money(z.freeOver)).replace("{fee}", money(z.fee)); prev = z.upToKm; return r; });
  rows.push(t("nFar").replace("{b}", prev).replace("{base}", money(CONFIG.farBaseFee)).replace("{pk}", money(CONFIG.farPerKm)));
  return `<small class="note">${rows.join("<br>")}</small>`;
};
const mapLink = () => userLoc ? `https://www.google.com/maps?q=${userLoc.lat.toFixed(6)},${userLoc.lng.toFixed(6)}` : "";
const totals = () => { const s = subtotal(), d = deliveryFee(); return { s, d, t: s + d }; };

function renderCart(){
  cart = cart.filter(i => prod(i.id));
  $("#cartCount").textContent = cart.reduce((n,i)=>n+i.q,0);
  $("#cartItems").innerHTML = cart.length ? cart.map((i,ix) => { const p = prod(i.id); return `
    <div class="li">${img(p)}<div class="m"><b>${pName(p)}</b><small>${wl(i.w,p)} · ${money(price(p,i.w))}</small>
      <div class="qty"><button data-ci="${ix}" data-d="-1">−</button><span>${i.q}</span><button data-ci="${ix}" data-d="1">+</button></div></div>
      <div><b>${money(price(p,i.w)*i.q)}</b><br><button class="rm" data-rm="${ix}">${t("remove")}</button></div></div>`; }).join("")
    : `<p class="empty">${t("empty")}</p>`;
  const x = totals();
  $("#cartFoot").innerHTML = cart.length ? `
    <div class="sum"><span>${t("sub")}</span><span>${money(x.s)}</span></div>
    <div class="sum"><span>${t("del")}</span><span>${x.d? money(x.d): t("free")}</span></div>
    <div class="sum t"><span>${t("tot")}</span><span>${money(x.t)}</span></div>${noteHtml()}
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
function showCheckout(){ $("#main").hidden = true; $("#doneView").hidden = true; $("#checkoutView").hidden = false; scrollTo(0,0); initMap(); }
function showMain(){ $("#main").hidden = false; $("#checkoutView").hidden = true; $("#doneView").hidden = true; }
$("#backBtn").onclick = () => { showMain(); $("#shop").scrollIntoView(); };
$("#nav").addEventListener("click", showMain);
$(".logo").addEventListener("click", showMain);
function renderSummary(){
  const x = totals();
  $("#coSummary").innerHTML = cart.map(i=>{ const p=prod(i.id); return `<div class="sum"><span>${pName(p)} · ${wl(i.w,p)} × ${i.q}</span><span>${money(price(p,i.w)*i.q)}</span></div>`; }).join("")
   + `<div class="sum"><span>${t("sub")}</span><span>${money(x.s)}</span></div><div class="sum"><span>${t("del")}</span><span>${x.d?money(x.d):t("free")}</span></div><div class="sum t"><span>${t("tot")}</span><span>${money(x.t)}</span></div>${noteHtml()}`;
}

/* Checkout → WhatsApp */
$("#coForm").addEventListener("submit", async e => {
  e.preventDefault();
  const form = e.target, btn = $("button[type=submit]", form);
  const f = Object.fromEntries(new FormData(form)), err = $("#coErr");
  if(!cart.length){ err.textContent = t("errCart"); return; }
  if(!f.name.trim()||!f.mobile.trim()||!f.area.trim()){ err.textContent = t("errFill"); return; }
  if(!/^(\+?966|0)?5\d{8}$/.test(f.mobile.replace(/[\s-]/g,""))){ err.textContent = t("errMobile"); return; }
  if(!userLoc && typeof L !== "undefined"){ err.textContent = t("errLoc"); return; }
  err.textContent = "";
  const order = buildOrder(f);
  store.set("mm_last_order", order);       // latest order, browser only
  btn.disabled = true; btn.textContent = t("sending");
  const ok = await sendOrder(order);       // true = saved, false = failed, null = not configured
  btn.disabled = false; btn.textContent = t("place");
  cart = []; saveCart(); renderCart(); form.reset();
  showDone(order, ok);
});
async function sendOrder(order){
  if(!CONFIG.orderEndpoint) return null;
  const ctl = new AbortController(), tm = setTimeout(() => ctl.abort(), 20000);
  try{
    const r = await fetch(CONFIG.orderEndpoint, { method:"POST", headers:{ "Content-Type":"text/plain;charset=utf-8" },
      body: JSON.stringify({ secret: CONFIG.orderSecret, order }), signal: ctl.signal });
    const d = await r.json();
    if(d.ok && d.orderNumber){ order.message = order.message.split(order.orderNumber).join(d.orderNumber); order.orderNumber = d.orderNumber; store.set("mm_last_order", order); }
    return !!d.ok;
  }catch(e){ return false; }finally{ clearTimeout(tm); }
}
function showDone(order, ok){
  const fill = s => t(s).replace("{n}", order.customer.name).replace("{no}", order.orderNumber);
  $("#doneT").textContent = ok ? t("doneOk") : t("doneStep");
  $("#doneP").textContent = ok ? fill("doneOkP") : fill("doneStepP");
  $("#doneNo").textContent = order.orderNumber;
  const wa = $("#doneWa");
  wa.textContent = ok ? t("doneWa2") : t("doneWa");
  wa.className = ok ? "btn full light" : "btn full";
  wa.style.cssText = ok ? "background:var(--cream);color:var(--red2)" : "";
  wa.href = "https://wa.me/" + CONFIG.whatsapp + "?text=" + encodeURIComponent(order.message);
  $("#main").hidden = true; $("#checkoutView").hidden = true; $("#doneView").hidden = false; scrollTo(0,0);
}
$("#doneBack").onclick = () => { showMain(); scrollTo(0,0); };
function buildOrder(f){
  const L = k => T.en[k];                 // WhatsApp message is always English so the shop can read it
  const x = totals(), d = new Date();
  const no = "MM-" + Math.floor(1000 + Math.random()*9000);   // temporary; the Apps Script replaces it with a running number
  const w = (n,p) => p.unit==="kg" ? (n>=1000 ? `${n/1000} kg` : `${n} g`) : p.unit==="pc" ? `${n} pcs` : p.pk, m = n => `${num(n)} SAR`;
  const items = cart.map((i,ix) => { const p = prod(i.id);
    return `${ix+1}. ${p.en} (${p.ar})\n   ${L("lW")}: ${w(i.w,p)} | ${L("lQ")}: ${i.q} | ${L("lP")}: ${m(price(p,i.w))} each = ${m(price(p,i.w)*i.q)}`; }).join("\n");
  const loc = userLoc ? `${L("lMap")}: ${mapLink()} (${distKm().toFixed(1)} km from shop)\n` : `${L("lMap")}: not pinned - please confirm the delivery fee\n`;
  const pay = f.pay==="cod" ? L("cod") : L("onlinePending");
  const message = `*${CONFIG.shopName} — ${L("newOrder")}*\n\n${L("lOrder")}: ${no}\n${L("lName")}: ${f.name}\n${L("lMob")}: ${f.mobile}\n${L("lArea")}: ${f.area}\n${L("lAddr")}: ${[f.address.trim(), f.building.trim() && "Bldg/Villa " + f.building.trim()].filter(Boolean).join(", ") || "Not provided"}\n${loc}${L("lTime")}: ${f.time}\n\n*${L("lProd")}*\n${items}\n\n${T.en.sub}: ${m(x.s)}\n${T.en.del}: ${x.d? m(x.d): "Free"}\n*${T.en.tot}: ${m(x.t)}*\n\n${L("lPay")}: ${pay}\n${L("lNotes")}: ${f.notes.trim()||L("none")}`;
  return { orderNumber:no, createdAt:d.toISOString(), customer:{name:f.name,mobile:f.mobile,area:f.area,address:f.address,building:f.building, lat:userLoc?userLoc.lat:null, lng:userLoc?userLoc.lng:null, mapLink:mapLink()}, deliveryTime:f.time, itemsText:items, paymentMethod:f.pay, items:cart.map(i=>({...i})), totals:x, notes:f.notes, message };
}

$("#q").addEventListener("input", e => { query = e.target.value; showMain(); renderGrids(); if(query.trim()) $("#shop").scrollIntoView({behavior:"instant"}); });
/* Map pin (Leaflet + OpenStreetMap, free) */
function updLocInfo(){
  const el = $("#locInfo"); if(!el) return;
  const d = distKm();
  el.textContent = d === null ? t("pinHelp") : `${t("dist")}: ${d.toFixed(1)} ${t("kmU")} — ${t("del")}: ${deliveryFee() ? money(deliveryFee()) : t("free")}`;
}
function setLoc(lat, lng, pan){
  userLoc = { lat, lng }; store.set("mm_loc", userLoc);
  if(map){
    if(!pin){ pin = L.marker([lat, lng], { draggable:true }).addTo(map); pin.on("dragend", () => { const p = pin.getLatLng(); setLoc(p.lat, p.lng); }); }
    else pin.setLatLng([lat, lng]);
    if(pan) map.setView([lat, lng], 16);
  }
  updLocInfo(); renderCart();
}
function initMap(){
  if(typeof L === "undefined"){ $("#map").hidden = true; $("#useMe").hidden = true; $("#mapMsg").textContent = t("mapFail"); return; }
  if(!map){
    const c = userLoc || CONFIG.shopLocation;
    map = L.map("map").setView([c.lat, c.lng], userLoc ? 16 : 12);
    L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", { maxZoom:19, attribution:"© OpenStreetMap contributors" }).addTo(map);
    CONFIG.deliveryTiers.forEach((z,i) => L.circle([CONFIG.shopLocation.lat, CONFIG.shopLocation.lng], { radius:z.upToKm*1000, color:"#7a1527", weight:1, dashArray:i?"6 6":null, fillOpacity:i?0:.06 }).addTo(map));
    map.on("click", e => setLoc(e.latlng.lat, e.latlng.lng));
    if(userLoc) setLoc(userLoc.lat, userLoc.lng);
  }
  setTimeout(() => map.invalidateSize(), 80);
}
$("#useMe").onclick = () => {
  $("#mapMsg").textContent = "";
  if(!navigator.geolocation){ $("#mapMsg").textContent = t("locDenied"); return; }
  navigator.geolocation.getCurrentPosition(p => setLoc(p.coords.latitude, p.coords.longitude, true), () => { $("#mapMsg").textContent = t("locDenied"); }, { enableHighAccuracy:true, timeout:15000 });
};
$("#langBtn").onclick = () => { lang = lang==="en" ? "ar" : "en"; store.set("mm_lang", lang); applyLang(); };
$("#yr").textContent = new Date().getFullYear();
applyLang();
