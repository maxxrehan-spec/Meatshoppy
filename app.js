/* ============ CONFIG — edit here ============ */
const WHATSAPP_NUMBER = "966568411627"; // international format, no + or spaces
const CONFIG = {
  shopName: "Meat Market",
  whatsapp: WHATSAPP_NUMBER,
  phone: "+966 56 841 1627",
  orderEndpoint: "https://script.google.com/macros/s/AKfycbzId9yYh9_7WCU6r7Hmm5Pci6H6cD57hZC60su0aYBO1cGYc3g2IsJTq7ZOYQtg0frEog/exec",   // paste your Google Apps Script web app URL here (see setup steps)
  productsSheetUrl: "https://docs.google.com/spreadsheets/d/e/2PACX-1vSxjuKqaYpz1Is_yfx2ItbtNmE4byA9eN3-iUWnPg6G6nh1HyfBTUTyac_COY5QEcs3voFoAsbcz5Ua/pub?gid=379728535&single=true&output=csv",   // optional: published Google Sheet CSV link with your products (leave "" to use the list below)
  banners: ["images/hero.jpg", "images/banner2.jpg", "images/banner3.jpg"],   // top slider pictures (images that do not exist are skipped)
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
  areas: ["Al Rawdah", "Al Hamra", "Al Salamah", "Al Safa", "Al Nahda", "Obhur"],
  deliveryTimes: ["As soon as possible", "9:00 AM – 12:00 PM", "12:00 PM – 3:00 PM", "3:00 PM – 6:00 PM", "6:00 PM – 9:00 PM"]
};

/* ============ PRODUCTS (backup list) — edit here ============
   Your live list comes from the Google Sheet (productsSheetUrl above); this list is the backup.
   cat    = chicken | mutton | beef | eggs
   unit   = "kg"   -> price = SAR per 1 kg, opts = weights in grams
            "pack" -> price = SAR per pack, pk / pka = pack label EN / AR, opts = [1]
   prices = optional fixed price per size, same order as opts (e.g. opts [1000,1200], prices [18,20])
   cuts   = optional choices (e.g. ["4 pcs","8 pcs"]), cutsAr = their Arabic labels */
let PRODUCTS = [
  {"id": "c1", "cat": "chicken", "unit": "kg", "en": "Whole Chicken", "ar": "دجاج كامل", "d": "Fresh whole chicken, cleaned and ready to cook.", "da": "دجاج كامل طازج، منظف وجاهز للطبخ.", "img": "images/whole-chicken.jpg", "tag": "Best Seller", "price": 18, "prices": [18, 20], "opts": [1000, 1200]},
  {"id": "c2", "cat": "chicken", "unit": "kg", "en": "Chopped Chicken", "ar": "دجاج مقطع", "d": "Fresh chicken cut into 4 or 8 pieces.", "da": "دجاج طازج مقطع إلى 4 أو 8 قطع.", "img": "images/chopped-chicken.jpg", "tag": "Best Seller", "price": 18, "prices": [18, 20], "opts": [1000, 1200], "cuts": ["4 pcs", "8 pcs"], "cutsAr": ["4 قطع", "8 قطع"]},
  {"id": "c3", "cat": "chicken", "unit": "kg", "en": "Fakieh Chicken", "ar": "دجاج فقيه", "d": "Fakieh chicken, cleaned and cut your way.", "da": "دجاج فقيه منظف ومقطع حسب رغبتك.", "img": "images/fakieh-chicken.jpg", "tag": "Best Seller", "price": 19, "prices": [19, 20, 22], "opts": [1000, 1100, 1200], "cuts": ["4 pcs", "8 pcs"], "cutsAr": ["4 قطع", "8 قطع"]},
  {"id": "c4", "cat": "chicken", "unit": "kg", "en": "Chicken Boneless", "ar": "دجاج بدون عظم", "d": "Boneless, skinless chicken fillets.", "da": "فيليه دجاج طازج بدون عظم وجلد.", "img": "images/chicken-boneless.jpg", "tag": "", "price": 36, "opts": [500, 1000]},
  {"id": "c5", "cat": "chicken", "unit": "kg", "en": "Chicken Boneless Cubes", "ar": "مكعبات دجاج بدون عظم", "d": "Boneless chicken cut into cubes.", "da": "دجاج بدون عظم مقطع مكعبات.", "img": "images/chicken-boneless-cubes.jpg", "tag": "", "price": 36, "opts": [500, 1000]},
  {"id": "c6", "cat": "chicken", "unit": "kg", "en": "Chicken Boneless Steak", "ar": "ستيك دجاج بدون عظم", "d": "Boneless chicken steak, ready to grill.", "da": "ستيك دجاج بدون عظم جاهز للشوي.", "img": "images/chicken-boneless-steak.jpg", "tag": "", "price": 36, "opts": [500, 1000]},
  {"id": "c7", "cat": "chicken", "unit": "kg", "en": "Chicken Boneless Strips", "ar": "شرائح دجاج بدون عظم", "d": "Boneless chicken cut into strips.", "da": "دجاج بدون عظم مقطع شرائح.", "img": "images/chicken-boneless-strips.jpg", "tag": "", "price": 36, "opts": [500, 1000]},
  {"id": "c8", "cat": "chicken", "unit": "kg", "en": "Chicken Boneless Manchurian", "ar": "دجاج منشوريان بدون عظم", "d": "Boneless chicken cut for manchurian.", "da": "دجاج بدون عظم مقطع لطبق المنشوريان.", "img": "images/chicken-boneless-manchurian.jpg", "tag": "", "price": 36, "opts": [500, 1000]},
  {"id": "c9", "cat": "chicken", "unit": "pack", "en": "Chicken Liver", "ar": "كبدة دجاج", "d": "Fresh cleaned chicken liver, 450 g pack.", "da": "كبدة دجاج طازجة ومنظفة، عبوة 450 جم.", "img": "images/chicken-liver.jpg", "tag": "", "price": 5, "opts": [1], "pk": "450 g", "pka": "450 جم"},
  {"id": "c10", "cat": "chicken", "unit": "pack", "en": "Chicken Heart", "ar": "قلب دجاج", "d": "Fresh cleaned chicken hearts, 450 g pack.", "da": "قلب دجاج طازج ومنظف، عبوة 450 جم.", "img": "images/chicken-heart.jpg", "tag": "", "price": 5, "opts": [1], "pk": "450 g", "pka": "450 جم"},
  {"id": "c11", "cat": "chicken", "unit": "pack", "en": "Chicken Gizzard", "ar": "قوانص دجاج", "d": "Fresh cleaned chicken gizzards, 450 g pack.", "da": "قوانص دجاج طازجة ومنظفة، عبوة 450 جم.", "img": "images/chicken-gizzard.jpg", "tag": "", "price": 5, "opts": [1], "pk": "450 g", "pka": "450 جم"},
  {"id": "c12", "cat": "chicken", "unit": "pack", "en": "Chicken Full Legs", "ar": "أرجل دجاج كاملة", "d": "Whole chicken legs, 450 g pack.", "da": "أرجل دجاج كاملة، عبوة 450 جم.", "img": "images/chicken-full-legs.jpg", "tag": "", "price": 5, "opts": [1], "pk": "450 g", "pka": "450 جم"},
  {"id": "c13", "cat": "chicken", "unit": "pack", "en": "Chicken Drumsticks", "ar": "دبابيس دجاج", "d": "Juicy drumsticks, 450 g pack.", "da": "دبابيس دجاج عصيرية، عبوة 450 جم.", "img": "images/chicken-drumsticks.jpg", "tag": "Best Seller", "price": 5, "opts": [1], "pk": "450 g", "pka": "450 جم"},
  {"id": "m1", "cat": "mutton", "unit": "kg", "en": "Pakistani Mutton (Whole)", "ar": "لحم غنم باكستاني (كامل)", "d": "Fresh Pakistani mutton, cut to order.", "da": "لحم غنم باكستاني طازج يقطع حسب الطلب.", "img": "images/pakistani-mutton-whole.jpg", "tag": "Best Seller", "price": 45, "opts": [500, 1000]},
  {"id": "m2", "cat": "mutton", "unit": "kg", "en": "Mutton Leg", "ar": "فخذ غنم", "d": "Fresh mutton leg, bone-in.", "da": "فخذ غنم طازج بالعظم.", "img": "images/mutton-leg.jpg", "tag": "", "price": 45, "opts": [500, 1000]},
  {"id": "m3", "cat": "mutton", "unit": "kg", "en": "Mutton Shoulder", "ar": "كتف غنم", "d": "Fresh mutton shoulder, bone-in.", "da": "كتف غنم طازج بالعظم.", "img": "images/mutton-shoulder.jpg", "tag": "", "price": 45, "opts": [500, 1000]},
  {"id": "m4", "cat": "mutton", "unit": "kg", "en": "Mutton Chops (Champ)", "ar": "ريش غنم (شامب)", "d": "Fresh mutton chops, cut to order.", "da": "ريش غنم طازجة تقطع حسب الطلب.", "img": "images/mutton-chops-champ.jpg", "tag": "", "price": 45, "opts": [500, 1000]},
  {"id": "m5", "cat": "mutton", "unit": "kg", "en": "Mutton Boneless", "ar": "لحم غنم بدون عظم", "d": "Boneless mutton, lean and tender.", "da": "لحم غنم بدون عظم، طري وقليل الدهن.", "img": "images/mutton-boneless.jpg", "tag": "", "price": 45, "opts": [500, 1000]},
  {"id": "m6", "cat": "mutton", "unit": "kg", "en": "Mutton Fry Chops", "ar": "ريش غنم للقلي", "d": "Mutton chops cut for frying.", "da": "ريش غنم مقطعة للقلي.", "img": "images/mutton-fry-chops.jpg", "tag": "", "price": 48, "opts": [500, 1000]},
  {"id": "m7", "cat": "mutton", "unit": "kg", "en": "Mutton Kunna Cut", "ar": "غنم تقطيع كنا", "d": "Mutton cut kunna style for slow cooking.", "da": "لحم غنم بتقطيع كنا للطبخ البطيء.", "img": "images/mutton-kunna-cut.jpg", "tag": "", "price": 48, "opts": [500, 1000]},
  {"id": "m8", "cat": "mutton", "unit": "kg", "en": "Mutton Fish Joints", "ar": "غنم تقطيع فش", "d": "Mutton cut into fish-style joints.", "da": "لحم غنم بتقطيع الفش.", "img": "images/mutton-fish-joints.jpg", "tag": "", "price": 55, "opts": [500, 1000]},
  {"id": "m9", "cat": "mutton", "unit": "pack", "en": "Mutton Paya", "ar": "باية غنم", "d": "Cleaned mutton paya, sold per piece. Choose how many pieces.", "da": "باية غنم منظفة تباع بالقطعة. اختر عدد القطع.", "img": "images/mutton-paya.jpg", "tag": "", "price": 3.5, "opts": [1], "pk": "1 pc", "pka": "قطعة"},
  {"id": "m10", "cat": "mutton", "unit": "kg", "en": "Mutton Liver", "ar": "كبدة غنم", "d": "Fresh mutton liver.", "da": "كبدة غنم طازجة.", "img": "images/mutton-liver.jpg", "tag": "", "price": 40, "opts": [500, 1000]},
  {"id": "m11", "cat": "mutton", "unit": "kg", "en": "Mutton Kidney", "ar": "كلاوي غنم", "d": "Fresh mutton kidney.", "da": "كلاوي غنم طازجة.", "img": "images/mutton-kidney.jpg", "tag": "", "price": 35, "opts": [500, 1000]},
  {"id": "m12", "cat": "mutton", "unit": "pack", "en": "Mutton Brain", "ar": "مخ غنم", "d": "Fresh mutton brain, sold per piece.", "da": "مخ غنم طازج يباع بالقطعة.", "img": "images/mutton-brain.jpg", "tag": "", "price": 10, "opts": [1], "pk": "1 pc", "pka": "قطعة"},
  {"id": "m13", "cat": "mutton", "unit": "kg", "en": "Mutton Minced", "ar": "لحم غنم مفروم", "d": "Freshly minced mutton.", "da": "لحم غنم مفروم طازج.", "img": "images/mutton-minced.jpg", "tag": "", "price": 45, "opts": [500, 1000]},
  {"id": "b1", "cat": "beef", "unit": "kg", "en": "Beef With Bone", "ar": "لحم بقري بالعظم", "d": "Fresh beef with bone.", "da": "لحم بقري طازج بالعظم.", "img": "images/beef-with-bone.jpg", "tag": "", "price": 29.99, "opts": [500, 1000]},
  {"id": "b2", "cat": "beef", "unit": "kg", "en": "Beef Boneless", "ar": "لحم بقري بدون عظم", "d": "Fresh boneless beef.", "da": "لحم بقري طازج بدون عظم.", "img": "images/beef-boneless.jpg", "tag": "", "price": 45, "opts": [500, 1000]},
  {"id": "b3", "cat": "beef", "unit": "kg", "en": "Beef Boneless Nehari", "ar": "نهاري بقري بدون عظم", "d": "Boneless beef cut for nehari.", "da": "لحم بقري بدون عظم مقطع للنهاري.", "img": "images/beef-boneless-nehari.jpg", "tag": "", "price": 45, "opts": [500, 1000]},
  {"id": "b4", "cat": "beef", "unit": "kg", "en": "Beef With Bone Nehari", "ar": "نهاري بقري بالعظم", "d": "Bone-in beef cut for nehari.", "da": "لحم بقري بالعظم مقطع للنهاري.", "img": "images/beef-with-bone-nehari.jpg", "tag": "", "price": 29.99, "opts": [500, 1000]},
  {"id": "b5", "cat": "beef", "unit": "kg", "en": "Beef Steaks", "ar": "ستيك بقري", "d": "Fresh beef steaks, cut to order.", "da": "ستيك بقري طازج يقطع حسب الطلب.", "img": "images/beef-steaks.jpg", "tag": "", "price": 45, "opts": [500, 1000]},
  {"id": "b6", "cat": "beef", "unit": "kg", "en": "Beef Striploin", "ar": "ستريبلوين بقري", "d": "Tender beef striploin.", "da": "ستريبلوين بقري طري.", "img": "images/beef-striploin.jpg", "tag": "", "price": 45, "opts": [500, 1000]},
  {"id": "b7", "cat": "beef", "unit": "kg", "en": "Beef Manchurian", "ar": "بقري منشوريان", "d": "Beef cut for manchurian.", "da": "لحم بقري مقطع لطبق المنشوريان.", "img": "images/beef-manchurian.jpg", "tag": "", "price": 45, "opts": [500, 1000]},
  {"id": "b8", "cat": "beef", "unit": "kg", "en": "Beef Undercut", "ar": "أندركت بقري", "d": "Lean, tender beef undercut.", "da": "أندركت بقري طري وقليل الدهن.", "img": "images/beef-undercut.jpg", "tag": "", "price": 50, "opts": [500, 1000]},
  {"id": "b9", "cat": "beef", "unit": "kg", "en": "Beef Ironed", "ar": "لحم بقري آيرند", "d": "Ironed beef cut, ready to cook.", "da": "لحم بقري بتقطيع آيرند جاهز للطبخ.", "img": "images/beef-ironed.jpg", "tag": "", "price": 50, "opts": [500, 1000]},
  {"id": "b10", "cat": "beef", "unit": "pack", "en": "Beef Paya", "ar": "باية بقر", "d": "Cleaned beef paya, sold per piece. Each piece is about 2 to 2.5 kg.", "da": "باية بقر منظفة تباع بالقطعة. وزن القطعة حوالي 2 إلى 2.5 كجم.", "img": "images/beef-paya.jpg", "tag": "", "price": 22, "opts": [1], "pk": "1 pc (about 2–2.5 kg)", "pka": "قطعة (حوالي 2–2.5 كجم)"},
  {"id": "b11", "cat": "beef", "unit": "kg", "en": "Beef T-Bone Steak", "ar": "ستيك تي بون بقري", "d": "Beef T-bone steak, cut to order.", "da": "ستيك تي بون بقري يقطع حسب الطلب.", "img": "images/beef-t-bone-steak.jpg", "tag": "", "price": 40, "opts": [500, 1000]},
  {"id": "b12", "cat": "beef", "unit": "kg", "en": "Beef Minced", "ar": "لحم بقري مفروم", "d": "Freshly minced beef.", "da": "لحم بقري مفروم طازج.", "img": "images/beef-minced.jpg", "tag": "", "price": 45, "opts": [500, 1000]},
  {"id": "b13", "cat": "beef", "unit": "kg", "en": "Beef Simple Bone", "ar": "لحم بقري بعظم عادي", "d": "Beef with simple bone for everyday cooking.", "da": "لحم بقري بعظم عادي للطبخ اليومي.", "img": "images/beef-simple-bone.jpg", "tag": "", "price": 15, "opts": [500, 1000]},
  {"id": "e1", "cat": "eggs", "unit": "pack", "en": "Egg Crate – 30 Eggs", "ar": "كرتون بيض – 30 بيضة", "d": "Fresh eggs, crate of 30.", "da": "بيض طازج، كرتون 30 بيضة.", "img": "images/egg-crate-30-eggs.jpg", "tag": "", "price": 17, "opts": [1], "pk": "30 eggs", "pka": "30 بيضة"},
  {"id": "e2", "cat": "eggs", "unit": "pack", "en": "Desi Egg Crate – 30 Eggs", "ar": "كرتون بيض بلدي – 30 بيضة", "d": "Desi eggs, crate of 30.", "da": "بيض بلدي، كرتون 30 بيضة.", "img": "images/desi-egg-crate-30-eggs.jpg", "tag": "", "price": 25, "opts": [1], "pk": "30 eggs", "pka": "30 بيضة"}
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
   fName:"Full name",fMobile:"Mobile number",fArea:"Area",fAddr:"Full address (optional)",fBldg:"Building / Villa number (optional)",fTime:"Preferred delivery time",fNotes:"Delivery notes (optional)",pay:"Payment method",cod:"Cash on Delivery (COD)",online:"Pay by Card upon Delivery",payNote:"You pay the delivery driver in cash or by card when your order arrives. No card details are collected on this site.",place:"Place order",pinT:"Delivery location",pinHelp:"Tap the map or drag the pin to your exact location.",useMe:"Use my current location",dist:"Distance from shop",inZone:"Inside our free-delivery area",outZone:"Outside the {km} km free-delivery area",mapFail:"The map could not load. Please type your full address.",freeNote:"Free delivery on orders over {amt} within {km} km of our shop.",errLoc:"Please pin your delivery location on the map.",locDenied:"Could not get your location. Tap the map instead.",kmU:"km",related:"You may also like",cut:"Cut",from:"From",reqName:"Please enter your full name.",reqMobile:"Please enter your mobile number.",reqArea:"Please enter your area.",nTier:"{a}–{b} km: free over {amt}, otherwise {fee}",nFar:"Over {b} km: {base} + {pk} per extra km",lMap:"Location pin",sending:"Sending your order…",doneOk:"Order placed ✓",doneOkP:"Thank you, {n}! Your order {no} has been received. We will confirm it on WhatsApp shortly.",doneStep:"One last step",doneStepP:"Tap the button below to send your order {no} to us on WhatsApp so we can confirm it.",doneWa:"Send order on WhatsApp",doneWa2:"Message us on WhatsApp",
   errFill:"Please complete all required fields.",errMobile:"Enter a valid Saudi mobile number (e.g. 05XXXXXXXX).",errCart:"Your cart is empty.",kg:"kg",g:"g",selArea:"Select area",newOrder:"New Order",lOrder:"Order Number",lName:"Customer Name",lMob:"Mobile Number",lArea:"Area",lAddr:"Address",lTime:"Delivery Time",lProd:"Products",lW:"Weight",lQ:"Qty",lP:"Price",lPay:"Payment Method",lNotes:"Customer Notes",none:"None",onlinePending:"Online Payment (to be arranged)"},
  ar:{nHome:"الرئيسية",nShop:"المتجر",nAbout:"من نحن",nContact:"تواصل معنا",heroT:"لحوم طازجة تصل إلى بابك",heroS:"دجاج ولحم بقري وغنم فاخر، يُقطع طازجاً ويُوصَّل إلى منزلك.",shopNow:"تسوق الآن",cats:"الأقسام",searchPh:"ابحث عن منتج…",noRes:"لا توجد منتجات مطابقة.",pc:"قطعة",pcs:"قطع",best:"الأكثر مبيعاً",offers:"عروض خاصة",why:"لماذا تختارنا",
   w1t:"طازج كل يوم",w1d:"نجهّز كل طلب في يوم التوصيل.",w2t:"جودة مضمونة",w2d:"دجاج ولحوم مختارة بعناية.",w3t:"أسعار واضحة",w3d:"كل سعر مرتبط بوزنه. بلا مفاجآت.",w4t:"توصيل للمنزل",w4d:"نوصّله لك مبرداً حتى الباب.",
   how:"كيف نعمل",h1:"اختر لحمتك",h2:"حدد الوزن",h3:"أرسل طلبك",h4:"نؤكد عبر واتساب ونوصّل",waT:"تفضّل الطلب بالمحادثة؟",waB:"تواصل عبر واتساب",
   aboutP:"ميت ماركت خدمة توصيل دجاج ولحوم طازجة. نهتم بالجودة والنظافة وسرعة التوصيل إلى منزلك.",phone:"الهاتف",hours:"يتم تأكيد الطلبات عبر واتساب.",
   all:"الكل",add:"أضف إلى السلة",added:"تمت الإضافة ✓",cart:"سلتك",empty:"سلتك فارغة. أضف شيئاً طازجاً.",remove:"حذف",sub:"المجموع الفرعي",del:"رسوم التوصيل",free:"مجاني",tot:"الإجمالي",goCheckout:"إتمام الطلب",back:"→ العودة للمتجر",checkout:"إتمام الطلب",
   fName:"الاسم الكامل",fMobile:"رقم الجوال",fArea:"الحي",fAddr:"العنوان الكامل (اختياري)",fBldg:"رقم المبنى / الفيلا (اختياري)",fTime:"وقت التوصيل المفضل",fNotes:"ملاحظات التوصيل (اختياري)",pay:"طريقة الدفع",cod:"الدفع نقداً عند الاستلام",online:"الدفع بالبطاقة عند الاستلام",payNote:"تدفع للمندوب نقداً أو بالبطاقة عند وصول طلبك. لا يتم جمع بيانات بطاقات في هذا الموقع.",place:"تأكيد الطلب",pinT:"موقع التوصيل",pinHelp:"اضغط على الخريطة أو اسحب الدبوس إلى موقعك بدقة.",useMe:"استخدم موقعي الحالي",dist:"المسافة من المتجر",inZone:"داخل نطاق التوصيل المجاني",outZone:"خارج نطاق التوصيل المجاني ({km} كم)",mapFail:"تعذر تحميل الخريطة. يرجى كتابة العنوان الكامل.",freeNote:"توصيل مجاني للطلبات فوق {amt} ضمن {km} كم من المتجر.",errLoc:"يرجى تحديد موقع التوصيل على الخريطة.",locDenied:"تعذر تحديد موقعك. اضغط على الخريطة بدلاً من ذلك.",kmU:"كم",related:"قد يعجبك أيضاً",cut:"التقطيع",from:"من",reqName:"يرجى إدخال الاسم الكامل.",reqMobile:"يرجى إدخال رقم الجوال.",reqArea:"يرجى إدخال الحي.",nTier:"{a}–{b} كم: مجاني للطلبات فوق {amt}، وإلا {fee}",nFar:"أكثر من {b} كم: {base} + {pk} لكل كم إضافي",sending:"جارٍ إرسال طلبك…",doneOk:"تم استلام الطلب ✓",doneOkP:"شكراً {n}! تم استلام طلبك رقم {no}. سنؤكده معك عبر واتساب قريباً.",doneStep:"خطوة أخيرة",doneStepP:"اضغط الزر أدناه لإرسال طلبك رقم {no} إلينا عبر واتساب حتى نؤكده.",doneWa:"أرسل الطلب عبر واتساب",doneWa2:"راسلنا عبر واتساب",
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
const price = (p, w) => p.prices ? p.prices[Math.max(0, p.opts.indexOf(w))] : p.unit==="kg" ? p.price*w/1000 : p.unit==="pc" ? p.price*w : p.price;
const unitLine = p => p.prices ? `${t("from")} ${money(Math.min(...p.prices))}` : `${money(p.price)} / ${p.unit==="kg" ? t("kg") : p.unit==="pc" ? t("pc") : wl(1,p)}`;
const cutName = (p, c, l) => { c = c || 0; return l==="ar" ? ((p.cutsAr && p.cutsAr[c]) || p.cuts[c]) : p.cuts[c]; };
const cutLbl = (p, c) => p.cuts && p.cuts.length ? " · " + cutName(p, c, lang) : "";
const cutEn = (p, c) => p.cuts && p.cuts.length ? ` (${cutName(p, c, "en")})` : "";
const cutAr = (p, c) => p.cuts && p.cuts.length ? ` (${cutName(p, c, "ar")})` : "";
const cutSel = (p, s) => p.cuts && p.cuts.length ? `<select class="cSel" aria-label="${t("cut")}">${p.cuts.map((c, i) => `<option value="${i}" ${i===s.c?"selected":""}>${t("cut")}: ${cutName(p, i, lang)}</option>`).join("")}</select>` : "";
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
  if(!$("#productView").hidden) route();
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
  const s = sel[p.id] ||= { w: p.unit==="kg" && p.opts.includes(1000) ? 1000 : p.opts[0], q: 1, c: 0 };
  const tag = p.tag ? `<span class="tag">${p.tag}</span>` : "";
  return `<article class="card" data-id="${p.id}">
    <div class="imgw"><a href="#product/${p.id}">${img(p)}</a>${tag}</div>
    <div class="cb"><h3><a class="plink" href="#product/${p.id}">${pName(p)}</a></h3><p>${pDesc(p)}</p>
      <div class="unit">${unitLine(p)}</div>
      <div class="tot">${money(price(p, s.w))} / ${wl(s.w,p)}</div>${cutSel(p, s)}
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
  if(b.dataset.act==="add"){ addToCart(p.id, s.w, s.q, s.c || 0); b.textContent = t("added"); setTimeout(()=>b.textContent=t("add"), 900); }
  syncCards(p.id);
});
document.addEventListener("change", e => {
  const el = e.target, cls = el.classList; if(!cls.contains("wSel") && !cls.contains("cSel")) return;
  const id = el.closest(".card").dataset.id;
  if(cls.contains("wSel")) sel[id].w = +el.value; else sel[id].c = +el.value;
  syncCards(id);
});
function syncCards(id){            // keep same product in every grid in sync, without re-rendering
  const p = prod(id), s = sel[id];
  $$(`.card[data-id="${id}"]`).forEach(c => {
    $(".tot", c).textContent = `${money(price(p, s.w))} / ${wl(s.w,p)}`;
    $(".qty span", c).textContent = s.q; $(".wSel", c).value = s.w; const cs = $(".cSel", c); if(cs) cs.value = s.c || 0;
  });
}

/* Cart */
function addToCart(id, w, q, c = 0){
  const it = cart.find(i => i.id===id && i.w===w && (i.c || 0)===c);
  it ? it.q = Math.min(50, it.q+q) : cart.push({id, w, q, c});
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
    <div class="li">${img(p)}<div class="m"><b>${pName(p)}</b><small>${wl(i.w,p)}${cutLbl(p,i.c)} · ${money(price(p,i.w))}</small>
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
function showCheckout(){ view("checkoutView"); scrollTo(0,0); initMap(); }
function view(id){
  ["main","checkoutView","doneView","productView"].forEach(v => $("#" + v).hidden = v !== id);
  if(id !== "productView" && location.hash.indexOf("#product/") === 0) history.replaceState(null, "", location.pathname + location.search);
}
function showMain(){ view("main"); }
$("#backBtn").onclick = () => { showMain(); $("#shop").scrollIntoView(); };
$("#nav").addEventListener("click", showMain);
$(".logo").addEventListener("click", showMain);
function renderSummary(){
  const x = totals();
  $("#coSummary").innerHTML = cart.map(i=>{ const p=prod(i.id); return `<div class="sum"><span>${pName(p)} · ${wl(i.w,p)}${cutLbl(p,i.c)} × ${i.q}</span><span>${money(price(p,i.w)*i.q)}</span></div>`; }).join("")
   + `<div class="sum"><span>${t("sub")}</span><span>${money(x.s)}</span></div><div class="sum"><span>${t("del")}</span><span>${x.d?money(x.d):t("free")}</span></div><div class="sum t"><span>${t("tot")}</span><span>${money(x.t)}</span></div>${noteHtml()}`;
}

/* Checkout → WhatsApp */
$("#coForm").addEventListener("submit", async e => {
  e.preventDefault();
  const form = e.target, btn = $("button[type=submit]", form);
  const f = Object.fromEntries(new FormData(form)), err = $("#coErr");
  $$("#coForm .bad").forEach(unflag);
  let first = null;
  const need = (el, msg) => { const b = flag(el, msg); first = first || b; };
  if(!f.name.trim()) need(form.elements["name"], t("reqName"));
  if(!f.mobile.trim()) need(form.elements["mobile"], t("reqMobile"));
  else if(!/^(\+?966|0)?5\d{8}$/.test(f.mobile.replace(/[\s-]/g,""))) need(form.elements["mobile"], t("errMobile"));
  if(!f.area.trim()) need(form.elements["area"], t("reqArea"));
  if(!userLoc && typeof L !== "undefined") need($("#map"), t("errLoc"));
  if(!cart.length){ err.textContent = t("errCart"); return; }
  if(first){ err.textContent = t("errFill"); first.scrollIntoView({ behavior:"smooth", block:"center" }); return; }
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
  view("doneView"); scrollTo(0,0);
}
$("#doneBack").onclick = () => { showMain(); scrollTo(0,0); };
function buildOrder(f){
  const L = k => T.en[k];                 // WhatsApp message is always English so the shop can read it
  const x = totals(), d = new Date();
  const no = "MM-" + Math.floor(1000 + Math.random()*9000);   // temporary; the Apps Script replaces it with a running number
  const w = (n,p) => p.unit==="kg" ? (n>=1000 ? `${n/1000} kg` : `${n} g`) : p.unit==="pc" ? `${n} pcs` : p.pk, m = n => `${num(n)} SAR`;
  const items = cart.map((i,ix) => { const p = prod(i.id);
    return `${ix+1}. ${p.en}\n   ${L("lW")}: ${w(i.w,p)}${cutEn(p,i.c)} | ${L("lQ")}: ${i.q} | ${L("lP")}: ${m(price(p,i.w))} each = ${m(price(p,i.w)*i.q)}`; }).join("\n");
  const wA = (n,p) => p.unit==="kg" ? (n>=1000 ? `${n/1000} كجم` : `${n} جم`) : p.unit==="pc" ? `${n} قطع` : p.pka;
  const lines = cart.map(i => { const p = prod(i.id); return { en:p.en, ar:p.ar, we:w(i.w,p) + cutEn(p,i.c), wa:wA(i.w,p) + cutAr(p,i.c), q:i.q, sub:Math.round(price(p,i.w)*i.q*100)/100 }; });
  const loc = userLoc ? `${L("lMap")}: ${mapLink()} (${distKm().toFixed(1)} km from shop)\n` : `${L("lMap")}: not pinned - please confirm the delivery fee\n`;
  const pay = f.pay==="cod" ? L("cod") : L("online");
  const message = `*${CONFIG.shopName} — ${L("newOrder")}*\n\n${L("lOrder")}: ${no}\n${L("lName")}: ${f.name}\n${L("lMob")}: ${f.mobile}\n${L("lArea")}: ${f.area}\n${L("lAddr")}: ${[f.address.trim(), f.building.trim() && "Bldg/Villa " + f.building.trim()].filter(Boolean).join(", ") || "Not provided"}\n${loc}${L("lTime")}: ${f.time}\n\n*${L("lProd")}*\n${items}\n\n${T.en.sub}: ${m(x.s)}\n${T.en.del}: ${x.d? m(x.d): "Free"}\n*${T.en.tot}: ${m(x.t)}*\n\n${L("lPay")}: ${pay}\n${L("lNotes")}: ${f.notes.trim()||L("none")}`;
  return { orderNumber:no, createdAt:d.toISOString(), customer:{name:f.name,mobile:f.mobile,area:f.area,address:f.address,building:f.building, lat:userLoc?userLoc.lat:null, lng:userLoc?userLoc.lng:null, mapLink:mapLink()}, deliveryTime:f.time, itemsText:items, lines, lang, paymentMethod:f.pay, items:cart.map(i=>({...i})), totals:x, notes:f.notes, message };
}

$("#q").addEventListener("input", e => { query = e.target.value; showMain(); renderGrids(); if(query.trim()) $("#shop").scrollIntoView({behavior:"instant"}); });
/* Checkout field highlighting */
function flag(el, msg){
  const box = el.closest("label") || el.closest(".pin"); box.classList.add("bad");
  let s = $(".fe", box); if(!s){ s = document.createElement("small"); s.className = "fe"; box.appendChild(s); }
  s.textContent = msg; return box;
}
function unflag(box){ box.classList.remove("bad"); const s = $(".fe", box); if(s) s.remove(); }
$("#coForm").addEventListener("input", e => { const b = e.target.closest("label") || e.target.closest(".pin"); if(b && b.classList.contains("bad")) unflag(b); });

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
  const pb = $(".pin"); if(pb) unflag(pb);
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
/* Product pages: #product/ID */
const baseTitle = document.title; let sheetDone = !CONFIG.productsSheetUrl;
function renderProduct(p){
  const s = sel[p.id] ||= { w: p.unit==="kg" && p.opts.includes(1000) ? 1000 : p.opts[0], q: 1, c: 0 };
  const imgs = [p.img, ...(p.imgs || [])];
  const long = lang==="ar" ? (p.lda || p.da) : (p.ld || p.d);
  const thumbs = imgs.length > 1 ? `<div class="thumbs">${imgs.map(u => `<img src="${u}" alt="" data-thumb="${u}" onerror="this.remove()">`).join("")}</div>` : "";
  const rel = PRODUCTS.filter(x => x.cat === p.cat && x.id !== p.id).slice(0, 4);
  $("#productBody").innerHTML = `
    <button class="link" id="pBack">${t("back")}</button>
    <div class="pdetail">
      <div class="pgal"><div class="imgw"><img id="pMain" src="${p.img}" alt="${pName(p)}" onerror="this.onerror=null;this.src=ph(prod('${p.id}'))">${p.tag ? `<span class="tag">${p.tag}</span>` : ""}</div>${thumbs}</div>
      <div class="pinfo card pcard" data-id="${p.id}">
        <h1>${pName(p)}</h1><p class="long">${long}</p>
        <div class="unit">${unitLine(p)}</div>
        <div class="tot">${money(price(p, s.w))} / ${wl(s.w,p)}</div>${cutSel(p, s)}
        <div class="row">
          <select class="wSel" aria-label="${t("lW")}">${p.opts.map(w => `<option value="${w}" ${w===s.w?"selected":""}>${wl(w,p)}</option>`).join("")}</select>
          <div class="qty"><button data-act="dec" aria-label="-">−</button><span>${s.q}</span><button data-act="inc" aria-label="+">+</button></div>
        </div>
        <button class="add" data-act="add">${t("add")}</button>
      </div>
    </div>
    ${rel.length ? `<h2>${t("related")}</h2><div class="grid">${rel.map(card).join("")}</div>` : ""}`;
  document.title = `${pName(p)} | ${CONFIG.shopName}`;
}
function route(){
  const m = location.hash.match(/^#product\/([\w-]+)$/);
  if(!m){
    if(!$("#productView").hidden){ showMain(); const el = document.getElementById(location.hash.slice(1)); if(el) el.scrollIntoView({ behavior:"instant" }); }
    document.title = baseTitle; return;
  }
  const p = prod(m[1]);
  if(!p){ if(sheetDone){ history.replaceState(null, "", "#shop"); showMain(); } return; }
  view("productView"); renderProduct(p); scrollTo(0,0);
}
window.addEventListener("hashchange", route);
$("#productBody").addEventListener("click", e => {
  if(e.target.id === "pBack") location.hash = "#shop";
  if(e.target.dataset.thumb) $("#pMain").src = e.target.dataset.thumb;
});

/* Top banner slider */
function initSlider(){
  const urls = CONFIG.banners || [], ok = []; let pending = urls.length; if(!pending) return;
  const done = () => { if(--pending === 0) build(urls.filter(u => ok.includes(u))); };
  urls.forEach(u => { const im = new Image(); im.onload = () => { ok.push(u); done(); }; im.onerror = done; im.src = u; });
  function build(list){
    if(!list.length) return;
    $("#slides").innerHTML = list.map((u, i) => `<div class="slide${i ? "" : " on"}" style="background-image:url('${u}')"></div>`).join("");
    if(list.length < 2) return;
    $("#dots").innerHTML = list.map((_, i) => `<button aria-label="${i+1}"${i ? "" : ' class="on"'}></button>`).join("");
    let cur = 0, timer, x0 = null;
    const go = n => { cur = (n + list.length) % list.length; $$("#slides .slide").forEach((s, i) => s.classList.toggle("on", i === cur)); $$("#dots button").forEach((d, i) => d.classList.toggle("on", i === cur)); };
    const play = () => { clearInterval(timer); timer = setInterval(() => go(cur + 1), 5000); };
    $("#dots").onclick = e => { const b = e.target.closest("button"); if(b){ go([...$("#dots").children].indexOf(b)); play(); } };
    const hero = $("#home");
    hero.addEventListener("touchstart", e => { x0 = e.touches[0].clientX; }, { passive:true });
    hero.addEventListener("touchend", e => { if(x0 === null) return; const dx = e.changedTouches[0].clientX - x0; x0 = null; if(Math.abs(dx) > 50){ go(cur + (dx < 0 ? 1 : -1)); play(); } });
    play();
  }
}

/* Products from a published Google Sheet (optional). Falls back to the PRODUCTS list above if the sheet can't be read. */
function parseCSV(text){
  const rows = []; let row = [], cell = "", q = false;
  for(let i = 0; i < text.length; i++){
    const c = text[i];
    if(q){ if(c === '"'){ if(text[i+1] === '"'){ cell += '"'; i++; } else q = false; } else cell += c; }
    else if(c === '"') q = true;
    else if(c === ","){ row.push(cell); cell = ""; }
    else if(c === "\n" || c === "\r"){ if(c === "\r" && text[i+1] === "\n") i++; row.push(cell); rows.push(row); row = []; cell = ""; }
    else cell += c;
  }
  if(cell !== "" || row.length){ row.push(cell); rows.push(row); }
  return rows;
}
function sheetToProducts(text){
  const rows = parseCSV(text.replace(/^\uFEFF/, "")).filter(r => r.some(c => c.trim()));
  if(rows.length < 2) return [];
  const H = rows[0].map(h => h.trim().toLowerCase()), out = [], seen = new Set();
  rows.slice(1).forEach((r, n) => {
    const g = k => { const i = H.indexOf(k); return i < 0 ? "" : String(r[i] || "").replace(/[<>"`]/g, "").trim(); };
    if(/^(no|false|0|n)$/i.test(g("available"))) return;
    const plist = g("price").split(/[,\s]+/).map(Number).filter(x => x > 0), price = plist[0], unit = g("unit").toLowerCase(), en = g("name_en");
    if(!en || !(price > 0) || !["kg","pc","pack"].includes(unit)) return;
    const opts = unit === "pack" ? [1] : g("options").split(/[,\s]+/).map(Number).filter(x => x > 0);
    if(!opts.length) return;
    if(plist.length > 1 && (plist.length !== opts.length || unit === "pack")) return;
    let id = g("id").replace(/[^\w-]/g, "") || "s" + n; if(seen.has(id)) id += "_" + n; seen.add(id);
    const img = g("image").replace(/[^\w.\- ]/g, "");
    out.push({ id, cat:g("category").toLowerCase(), unit, en, ar:g("name_ar") || en, d:g("desc_en"), da:g("desc_ar") || g("desc_en"),
      img:"images/" + (img || "none.jpg"), tag:g("tag"),
      imgs:[g("image2"), g("image3")].map(x => x.replace(/[^\w.\- ]/g, "")).filter(Boolean).map(x => "images/" + x), prices:plist.length > 1 ? plist : null, cuts:g("cut_options").split(/[,;]+/).map(x => x.trim()).filter(Boolean), cutsAr:g("cut_options_ar").split(/[,;]+/).map(x => x.trim()).filter(Boolean), ld:g("long_desc_en"), lda:g("long_desc_ar"), price, pk:g("pack_en") || "1 pack", pka:g("pack_ar") || g("pack_en") || "عبوة", opts });
  });
  return out;
}
async function loadSheet(){ try{ await loadSheet2(); }finally{ sheetDone = true; route(); } }
async function loadSheet2(){
  if(!CONFIG.productsSheetUrl) return;
  try{
    const u = CONFIG.productsSheetUrl + (CONFIG.productsSheetUrl.includes("?") ? "&" : "?") + "t=" + Date.now();
    const r = await fetch(u); if(!r.ok) return;
    const list = sheetToProducts(await r.text());
    if(!list.length) return;                 // unreadable sheet: keep the current list
    PRODUCTS = list; store.set("mm_products", list);
    Object.keys(sel).forEach(k => delete sel[k]);
    renderGrids(); renderCart();
  }catch(e){}
}
$("#langBtn").onclick = () => { lang = lang==="en" ? "ar" : "en"; store.set("mm_lang", lang); applyLang(); };
$("#yr").textContent = new Date().getFullYear();
const cachedProducts = CONFIG.productsSheetUrl ? store.get("mm_products", null) : null;
if(Array.isArray(cachedProducts) && cachedProducts.length) PRODUCTS = cachedProducts;   // last good copy of the sheet
applyLang();
initSlider();
route();
loadSheet();
