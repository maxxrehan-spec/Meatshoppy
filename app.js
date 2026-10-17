/* ============ CONFIG — edit here ============ */
const WHATSAPP_NUMBER = "966596684625"; // international format, no + or spaces
const CONFIG = {
  shopName: "Tariq Meat Center",
  whatsapp: WHATSAPP_NUMBER,
  phone: "+966 59 668 4625",
  orderEndpoint: "https://script.google.com/macros/s/AKfycbysyn-7FP122iRQA3cTW17B48pinTiyGs6Y7DnN08zjmlWYnCyRmrsz752Zqk6h2CnsFg/exec",   // paste your Google Apps Script web app URL here (see setup steps)
  productsSheetUrl: "https://docs.google.com/spreadsheets/d/e/2PACX-1vSxjuKqaYpz1Is_yfx2ItbtNmE4byA9eN3-iUWnPg6G6nh1HyfBTUTyac_COY5QEcs3voFoAsbcz5Ua/pub?gid=379728535&single=true&output=csv",   // optional: published Google Sheet CSV link with your products (leave "" to use the list below)
  banners: ["images/optimized/hero.jpg.webp"],   // top slider pictures (images that do not exist are skipped)
  orderSecret: "iamrehan",   // must match SETTINGS.SECRET in the Apps Script
  // Local/review copies cannot submit live orders. Deploy with the matching Apps Script update.
  previewOnly: location.protocol !== "https:" || location.hostname !== "maxxrehan-spec.github.io",
  turnstileSiteKey: "", // Public site key; never put the secret key here.
  // Owner-confirmed rules supersede the original strict thresholds.
  deliveryTiers: [{ upToKm: 5, freeOver: 50, fee: 10 }, { upToKm: 10, freeOver: 200, fee: 15 }],
  farBaseFee: 15,
  farPerKm: 2,
  shopLocation: { lat: 21.5590012, lng: 39.2087398 },
  shopAddress: "Al Udaba Street, Al Aziziyah, Jeddah 23342",
  shopAddressAr: "الأدباء، العزيزية، جدة 23342",
  shopMapsUrl: "https://maps.app.goo.gl/Y3mNmNyiFn54K2gt9",
  currency: { en: "SAR", ar: "ر.س" },
  areas: [],
  deliveryTimes: []
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

PRODUCTS = withVegetables(PRODUCTS);

const CATS = [
  ["chicken","🍗","Chicken","دجاج"],["mutton","🐑","Mutton","غنم"],["beef","🥩","Beef","لحم بقري"],["eggs","🥚","Eggs","بيض"],["vegetables","🥬","Vegetables","خضروات"]
];

const T = {
  en:{nHome:"Home",nShop:"Shop",nAbout:"About Us",nContact:"Contact",heroT:"Fresh Meat Delivered to Your Door",heroS:"Fresh chicken, beef, mutton and vegetables, delivered to your home.",shopNow:"Shop Now",cats:"Categories",searchPh:"Search products…",noRes:"No products found.",pc:"pc",pcs:"pcs",best:"Best sellers",offers:"Special offers",why:"Why choose us",
   w1t:"Choose your cut",w1d:"Select from the available cuts and weights before adding to your cart.",w2t:"For your kitchen",w2d:"Browse chicken, mutton, beef, eggs and vegetables in one place.",w3t:"Clear pricing",w3d:"Every price shows its weight. No surprises.",w4t:"Home delivery",w4d:"Delivery charges are shown in your cart and calculated from your location.",
   how:"How it works",h1:"Choose your products",h2:"Select the weight",h3:"Place your order",h4:"We confirm on WhatsApp and deliver",waT:"Prefer to order by chat?",waB:"Chat on WhatsApp",
   aboutP:"Shop chicken, mutton, beef, eggs and vegetables from Tariq Meat Center. Choose your products and available cuts, review your total, and place your order. We confirm orders on WhatsApp.",phone:"Phone",hours:"Orders are confirmed on WhatsApp.",
   all:"All",add:"Add to Cart",added:"Added ✓",cart:"Your cart",empty:"Your cart is empty. Add something fresh.",remove:"Remove",sub:"Subtotal",del:"Delivery fee",free:"Free",tot:"Total",goCheckout:"Checkout",back:"← Back to shop",checkout:"Checkout",
   fName:"Full name",fMobile:"Mobile number",fArea:"Area",fAddr:"Full address (optional)",fBldg:"Building / Villa number (optional)",fTime:"Preferred delivery time",fNotes:"Delivery notes (optional)",pay:"Payment method",cod:"Cash on Delivery (COD)",online:"Pay by Card upon Delivery",payNote:"You pay the delivery driver in cash or by card when your order arrives. No card details are collected on this site.",place:"Place order",pinT:"Delivery location",pinHelp:"Tap the map or drag the pin to your exact location.",useMe:"Use my current location",dist:"Distance from shop",inZone:"Inside our free-delivery area",outZone:"Outside the {km} km free-delivery area",mapFail:"The map could not load. Please type your full address.",freeNote:"Free delivery on orders over {amt} within {km} km of our shop.",errLoc:"Please pin your delivery location on the map.",locDenied:"Could not get your location. Tap the map instead.",kmU:"km",related:"You may also like",cut:"Cut",from:"From",reqName:"Please enter your full name.",reqMobile:"Please enter your mobile number.",reqArea:"Please enter your area.",nTier:"{a}–{b} km: free from {amt}, otherwise {fee}",nFar:"Over {b} km: {base} + {pk} per extra km",lMap:"Location pin",sending:"Sending your order…",doneOk:"Order placed ✓",doneOkP:"Thank you, {n}! Your order {no} has been received. We will confirm it on WhatsApp shortly.",doneStep:"One last step",doneStepP:"Tap the button below to send your order {no} to us on WhatsApp so we can confirm it.",doneWa:"Send order on WhatsApp",doneWa2:"Message us on WhatsApp",
   errFill:"Please complete all required fields.",errMobile:"Enter a valid Saudi mobile number (e.g. 05XXXXXXXX).",errCart:"Your cart is empty.",kg:"kg",g:"g",selArea:"Select area",newOrder:"New Order",lOrder:"Order Number",lName:"Customer Name",lMob:"Mobile Number",lArea:"Area",lAddr:"Address",lTime:"Delivery Time",lProd:"Products",lW:"Weight",lQ:"Qty",lP:"Price",lPay:"Payment Method",lNotes:"Customer Notes",none:"None",onlinePending:"Online Payment (to be arranged)"},
  ar:{nHome:"الرئيسية",nShop:"المتجر",nAbout:"من نحن",nContact:"تواصل معنا",heroT:"لحوم طازجة تصل إلى بابك",heroS:"دجاج ولحوم وخضروات طازجة تصل إلى منزلك.",shopNow:"تسوق الآن",cats:"الأقسام",searchPh:"ابحث عن منتج…",noRes:"لا توجد منتجات مطابقة.",pc:"قطعة",pcs:"قطع",best:"الأكثر مبيعاً",offers:"عروض خاصة",why:"لماذا تختارنا",
   w1t:"اختر التقطيع",w1d:"اختر من الأوزان والتقطيعات المتاحة قبل الإضافة إلى السلة.",w2t:"لمطبخك",w2d:"تسوق الدجاج والغنم واللحم البقري والبيض والخضروات من مكان واحد.",w3t:"أسعار واضحة",w3d:"كل سعر مرتبط بوزنه. بلا مفاجآت.",w4t:"توصيل للمنزل",w4d:"تظهر رسوم التوصيل في السلة وتُحسب حسب موقعك.",
   how:"كيف نعمل",h1:"اختر منتجاتك",h2:"حدد الوزن",h3:"أرسل طلبك",h4:"نؤكد عبر واتساب ونوصّل",waT:"تفضّل الطلب بالمحادثة؟",waB:"تواصل عبر واتساب",
   aboutP:"تسوق الدجاج والغنم واللحم البقري والبيض والخضروات من ميت ماركت. اختر منتجاتك والتقطيعات المتاحة، وراجع الإجمالي، ثم أرسل طلبك. نؤكد الطلبات عبر واتساب.",phone:"الهاتف",hours:"يتم تأكيد الطلبات عبر واتساب.",
   all:"الكل",add:"أضف إلى السلة",added:"تمت الإضافة ✓",cart:"سلتك",empty:"سلتك فارغة. أضف شيئاً طازجاً.",remove:"حذف",sub:"المجموع الفرعي",del:"رسوم التوصيل",free:"مجاني",tot:"الإجمالي",goCheckout:"إتمام الطلب",back:"→ العودة للمتجر",checkout:"إتمام الطلب",
   fName:"الاسم الكامل",fMobile:"رقم الجوال",fArea:"الحي",fAddr:"العنوان الكامل (اختياري)",fBldg:"رقم المبنى / الفيلا (اختياري)",fTime:"وقت التوصيل المفضل",fNotes:"ملاحظات التوصيل (اختياري)",pay:"طريقة الدفع",cod:"الدفع نقداً عند الاستلام",online:"الدفع بالبطاقة عند الاستلام",payNote:"تدفع للمندوب نقداً أو بالبطاقة عند وصول طلبك. لا يتم جمع بيانات بطاقات في هذا الموقع.",place:"تأكيد الطلب",pinT:"موقع التوصيل",pinHelp:"اضغط على الخريطة أو اسحب الدبوس إلى موقعك بدقة.",useMe:"استخدم موقعي الحالي",dist:"المسافة من المتجر",inZone:"داخل نطاق التوصيل المجاني",outZone:"خارج نطاق التوصيل المجاني ({km} كم)",mapFail:"تعذر تحميل الخريطة. يرجى كتابة العنوان الكامل.",freeNote:"توصيل مجاني للطلبات فوق {amt} ضمن {km} كم من المتجر.",errLoc:"يرجى تحديد موقع التوصيل على الخريطة.",locDenied:"تعذر تحديد موقعك. اضغط على الخريطة بدلاً من ذلك.",kmU:"كم",related:"قد يعجبك أيضاً",cut:"التقطيع",from:"من",reqName:"يرجى إدخال الاسم الكامل.",reqMobile:"يرجى إدخال رقم الجوال.",reqArea:"يرجى إدخال الحي.",nTier:"{a}–{b} كم: مجاني للطلبات بقيمة {amt} فأكثر، وإلا {fee}",nFar:"أكثر من {b} كم: {base} + {pk} لكل كم إضافي",sending:"جارٍ إرسال طلبك…",doneOk:"تم استلام الطلب ✓",doneOkP:"شكراً {n}! تم استلام طلبك رقم {no}. سنؤكده معك عبر واتساب قريباً.",doneStep:"خطوة أخيرة",doneStepP:"اضغط الزر أدناه لإرسال طلبك رقم {no} إلينا عبر واتساب حتى نؤكده.",doneWa:"أرسل الطلب عبر واتساب",doneWa2:"راسلنا عبر واتساب",
   errFill:"يرجى تعبئة جميع الحقول المطلوبة.",errMobile:"أدخل رقم جوال سعودي صحيح (مثال: 05XXXXXXXX).",errCart:"سلتك فارغة.",kg:"كجم",g:"جم",selArea:"اختر الحي",newOrder:"طلب جديد",lOrder:"رقم الطلب",lName:"اسم العميل",lMob:"رقم الجوال",lArea:"الحي",lAddr:"العنوان",lTime:"وقت التوصيل",lProd:"المنتجات",lW:"الوزن",lQ:"الكمية",lP:"السعر",lPay:"طريقة الدفع",lNotes:"ملاحظات العميل",none:"لا يوجد",onlinePending:"دفع إلكتروني (يُرتَّب لاحقاً)"}
};


Object.assign(T.en, {
  skip:"Skip to content", announcement:"Fresh meat, chicken and everyday essentials.", brandSub:"YOUR EVERYDAY BUTCHER",
  heroEyebrow:"THE GOOD FOOD STARTS HERE", heroT:"Fresh meat. Premium quality. Convenient delivery.", heroNote:"Cut your way. Prepared for your table.",
  categoryEyebrow:"FROM OUR COUNTER", cats:"What’s on your menu?", categoryIntro:"Everyday favourites. Something for every recipe.",
  bestEyebrow:"CUSTOMER FAVOURITES", viewAll:"Shop all products", storyCaption:"GOOD FOOD. SHARED TOGETHER.", storyEyebrow:"YOUR LOCAL MEAT MARKET",
  storyTitle:"Good meals begin with good ingredients.", shopEyebrow:"FIND YOUR NEXT FAVOURITE", shopTitle:"Fresh for your table",
  promiseEyebrow:"A LITTLE CARE IN EVERY CUT", howEyebrow:"FROM OUR COUNTER TO YOUR KITCHEN", waEyebrow:"LET’S TALK GOOD FOOD",
  footerLine:"Fresh ingredients for the meals that matter.", footerExplore:"Explore", footerLocation:"Made for your everyday table.",
  productsCount:"{n} products", productCount:"1 product", clearSearch:"Clear filters", menu:"Menu", close:"Close", decrease:"Decrease quantity", increase:"Increase quantity",
  cartAdded:"{name} added to your cart", bestTag:"Best seller"
});
Object.assign(T.ar, {
  skip:"انتقل إلى المحتوى", announcement:"لحوم ودجاج ومستلزمات يومية طازجة.", brandSub:"لحوم طازجة لمائدتك كل يوم",
  heroEyebrow:"هنا تبدأ الوجبات الشهية", heroT:"لحوم طازجة. جودة مميزة. توصيل مريح.", heroNote:"تقطيع على ذوقك. جاهز لمائدتك.",
  categoryEyebrow:"من أقسام متجرنا", cats:"ماذا ستطبخ اليوم؟", categoryIntro:"خياراتك اليومية المفضلة. لكل وصفة اختيار.",
  bestEyebrow:"اختيارات عملائنا", viewAll:"تصفح جميع المنتجات", storyCaption:"طعام شهي يجمعنا", storyEyebrow:"متجر اللحوم القريب منك",
  storyTitle:"الوجبات الشهية تبدأ بمكونات جيدة.", shopEyebrow:"اختر ما يناسب مائدتك", shopTitle:"منتجات طازجة لمائدتك",
  promiseEyebrow:"عناية في كل قطعة", howEyebrow:"من متجرنا إلى مطبخك", waEyebrow:"نتحدث عن الطعام الشهي",
  footerLine:"مكونات طازجة للوجبات التي تجمعكم.", footerExplore:"تصفح", footerLocation:"لمائدتك كل يوم.",
  productsCount:"{n} منتج", productCount:"منتج واحد", clearSearch:"مسح الفلاتر", menu:"القائمة", close:"إغلاق", decrease:"تقليل الكمية", increase:"زيادة الكمية",
  cartAdded:"تمت إضافة {name} إلى سلتك", bestTag:"الأكثر مبيعاً"
});


Object.assign(T.en, {best:"Featured",bestTag:"Featured",pendingFee:"Needs confirmation",privacy:"Privacy policy",refunds:"Refunds & cancellations",coverage:"Up to 1 km: free above SAR 50; SAR 50 or less needs fee confirmation. Over 1 km to 2 km: free above SAR 200, otherwise SAR 15. Beyond 2 km: coverage and fee need confirmation. Based on merchandise subtotal after discounts, excluding delivery. Distances are straight-line, not driving routes.",deliveryUnconfirmed:"Delivery cannot be priced yet. The shop location or applicable fee needs confirmation. Please contact the shop.",previewMessage:"Review preview: live order submission is disabled.",catalogUnavailable:"Product availability is being verified. Ordering is disabled until the live catalogue loads. Please refresh or contact us if this continues.",submitFailed:"Receipt could not be confirmed. Your cart and details are kept. Please contact the shop before retrying if the connection was interrupted.",noRes:"No matching products. Try an English or Arabic product name, or clear your search.",locationPending:"Shop address and Google Maps link awaiting verification.",fArea:"Area (optional)",fAddr:"Delivery address, building / villa & directions",fNotes:"Delivery or preparation instructions (optional)"});
Object.assign(T.ar, {best:"منتجات مختارة",bestTag:"مختار",pendingFee:"بانتظار التأكيد",privacy:"سياسة الخصوصية",refunds:"الاسترجاع والإلغاء",coverage:"حتى 1 كم: توصيل مجاني للطلبات الأعلى من 50 ر.س؛ رسوم الطلبات بقيمة 50 ر.س أو أقل تحتاج تأكيداً. أكثر من 1 وحتى 2 كم: مجاني للطلبات الأعلى من 200 ر.س وإلا فالرسوم 15 ر.س. أبعد من 2 كم: التغطية والرسوم تحتاج تأكيداً. يعتمد الحساب على قيمة المنتجات بعد الخصم دون التوصيل، والمسافة بخط مستقيم وليست مسافة الطريق.",deliveryUnconfirmed:"لا يمكن حساب التوصيل بعد. موقع المتجر أو الرسوم يحتاج تأكيداً. يرجى التواصل مع المتجر.",previewMessage:"نسخة للمراجعة: إرسال الطلبات الفعلية معطل.",catalogUnavailable:"جارٍ التحقق من توفر المنتجات. الطلب معطل حتى تحميل القائمة المباشرة. يرجى تحديث الصفحة أو التواصل معنا إذا استمرت المشكلة.",submitFailed:"تعذر تأكيد استلام الطلب. تم الاحتفاظ بالسلة والبيانات. يرجى التواصل مع المتجر قبل إعادة المحاولة إذا انقطع الاتصال.",noRes:"لا توجد منتجات مطابقة. جرّب اسم المنتج بالعربية أو الإنجليزية أو امسح البحث.",locationPending:"عنوان المتجر ورابط خرائط Google بانتظار التحقق.",fArea:"الحي (اختياري)",fAddr:"عنوان التوصيل ورقم المبنى / الفيلا وإرشادات الوصول",fNotes:"تعليمات التوصيل أو التحضير (اختياري)"});


Object.assign(T.en, {
  coverage:"Within 2 km: SAR 15 delivery, free on merchandise subtotals of SAR 50 or more. Beyond 2 km: SAR 15 + SAR 2 for each additional kilometer, rounding up only the distance beyond 2 km; free on subtotals of SAR 200 or more. Calculated after discounts, excluding delivery. Distance is straight-line, not driving distance. Delivery availability is confirmed with your order on WhatsApp.",
  serviceHours:"Delivery hours: 12 noon–12 midnight. Expected delivery: within one hour.",
  hours:"Delivery hours: 12 noon–12 midnight. Expected delivery within one hour.",
  aboutP:"Order online directly from Tariq Meat Center, our physical shop in Al Aziziyah, Jeddah. Choose meat, poultry, eggs and vegetables, select your weights and cuts, and place your order here. We confirm your order and delivery availability on WhatsApp.",
  storyTitle:"Your Tariq Meat Center, online.",
  weightNotice:"Fresh meat and chicken may vary slightly in final weight after preparation. Your displayed total uses the selected weight. The final price is based on the actual weight supplied; any additional charge requires your approval. Price differences will be adjusted accordingly.",
  reviewsLink:"View our Google listing & reviews"
});
Object.assign(T.ar, {
  coverage:"حتى 2 كم: رسوم التوصيل 15 ر.س، ومجاني عند وصول قيمة المنتجات إلى 50 ر.س أو أكثر. أبعد من 2 كم: 15 ر.س + 2 ر.س لكل كيلومتر إضافي، مع تقريب المسافة الزائدة عن أول 2 كم فقط إلى الكيلومتر التالي؛ ومجاني للطلبات بقيمة 200 ر.س أو أكثر. الحساب بعد الخصم ودون رسوم التوصيل. المسافة بخط مستقيم وليست مسافة الطريق. نؤكد توفر التوصيل مع طلبك عبر واتساب.",
  serviceHours:"ساعات التوصيل: من 12 ظهراً إلى 12 منتصف الليل. التوصيل المتوقع خلال ساعة.",
  hours:"ساعات التوصيل: من 12 ظهراً إلى 12 منتصف الليل. التوصيل المتوقع خلال ساعة.",
  aboutP:"اطلب مباشرة عبر الإنترنت من مركز طارق للحوم، متجرنا في العزيزية بجدة. اختر اللحوم والدواجن والبيض والخضروات والأوزان والتقطيع، ثم أرسل طلبك هنا. نؤكد الطلب وتوفر التوصيل عبر واتساب.",
  storyTitle:"مركز طارق للحوم، الآن عبر الإنترنت.",
  weightNotice:"قد يختلف الوزن النهائي للحوم والدجاج قليلاً بعد التقطيع والتحضير. المجموع المعروض يعتمد على الوزن المختار، والسعر النهائي حسب الوزن الفعلي المسلم. تتطلب أي زيادة في السعر موافقتك، ويتم تسوية فرق السعر وفقاً لذلك.",
  reviewsLink:"المتجر والتقييمات على خرائط Google"
});

Object.assign(T.en,{deliveryPolicy:"Delivery policy",chooseLocation:"Select your delivery location at checkout to see your delivery fee."});
Object.assign(T.ar,{deliveryPolicy:"سياسة التوصيل",chooseLocation:"اختر موقع التوصيل عند إتمام الطلب لعرض رسوم التوصيل."});
/* ============ App ============ */
const $ = (s, r=document) => r.querySelector(s);
const $$ = (s, r=document) => [...r.querySelectorAll(s)];
const store = {
  get(k, d){ try{ return JSON.parse(localStorage.getItem(k)) ?? d; }catch(e){ return d; } },
  set(k, v){ try{ localStorage.setItem(k, JSON.stringify(v)); }catch(e){} }
};
let lang = store.get("mm_lang", "en");
if(!["en", "ar"].includes(lang)) lang = "en";
let cart = store.get("mm_cart", []);       // [{id, w, q}]
let filter = "all", query = "";
let catalogReady = !CONFIG.productsSheetUrl;
let map = null, pin = null, userLoc = store.get("mm_loc", null);   // {lat,lng} chosen on the map
const sel = {};                             // per-product selection {w,q}

const t = k => T[lang][k] ?? k;
const cur = () => CONFIG.currency[lang];
const roundMoney = n => Math.round((n + Number.EPSILON) * 100) / 100;
const num = n => roundMoney(n).toFixed(2);
const wl = (w,p) => p.unit==="kg" ? (w >= 1000 ? `${w/1000} ${t("kg")}` : `${w} ${t("g")}`) : p.unit==="pc" ? `${w} ${t("pcs")}` : (lang==="ar" ? p.pka : p.pk);
const money = n => n === null ? t("pendingFee") : `${num(n)} ${cur()}`;
const pName = p => lang==="ar" ? p.ar : p.en;
const pDesc = p => lang==="ar" ? p.da : p.d;
const price = (p, w) => roundMoney(p.prices ? p.prices[Math.max(0, p.opts.indexOf(w))] : p.unit==="kg" ? p.price*w/1000 : p.unit==="pc" ? p.price*w : p.price);
const oldPrice = (p,w) => {
  // Legacy multi-size price lists are fixed size totals, not per-kg rates.
  if(!Number.isFinite(p.old_price) || p.old_price <= p.price) return null;
  const previous = roundMoney(p.old_price * (p.unit === "kg" ? w/1000 : p.unit === "pc" ? w : 1));
  return previous > price(p,w) ? previous : null;
};
const weightControl = (p,s) => p.opts.length === 1 ? '<span class="pack-size">'+wl(s.w,p)+'</span>' : '<select class="wSel" aria-label="'+t("lW")+'">'+p.opts.map(w=>'<option value="'+w+'" '+(w===s.w?'selected':'')+'>'+wl(w,p)+'</option>').join('')+'</select>';
const selectedPrice = (p,s) => (oldPrice(p,s.w) !== null ? '<del>'+money(roundMoney(oldPrice(p,s.w)*s.q))+'</del> ' : '') + money(roundMoney(price(p,s.w)*s.q)) + ' · '+wl(s.w,p)+(s.q > 1 ? ' × '+s.q : '');
const escapeHtml = s => String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const unitLine = p => p.unit === "pack" ? wl(1,p) : p.prices ? "" : `${oldPrice(p, p.unit === "kg" ? 1000 : 1) !== null ? `<del>${money(p.old_price)}</del> ` : ""}${money(p.price)} / ${p.unit==="kg" ? t("kg") : p.unit==="pc" ? t("pc") : wl(1,p)}`;
const cutName = (p, c, l) => { c = c || 0; return l==="ar" ? ((p.cutsAr && p.cutsAr[c]) || p.cuts[c]) : p.cuts[c]; };
const cutLbl = (p, c) => p.cuts && p.cuts.length ? " · " + cutName(p, c, lang) : "";
const cutEn = (p, c) => p.cuts && p.cuts.length ? ` (${cutName(p, c, "en")})` : "";
const cutAr = (p, c) => p.cuts && p.cuts.length ? ` (${cutName(p, c, "ar")})` : "";
const cutSel = (p, s) => p.cuts && p.cuts.length ? `<select class="cSel" aria-label="${t("cut")}">${p.cuts.map((c, i) => `<option value="${i}" ${i===s.c?"selected":""}>${t("cut")}: ${cutName(p, i, lang)}</option>`).join("")}</select>` : "";
const prod = id => PRODUCTS.find(p => p.id === id);
const ph = p => {
  const label = lang === "ar" ? "الصورة قريباً" : "Photo coming soon";
  return "data:image/svg+xml;utf8," + encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" width="400" height="350" viewBox="0 0 400 350"><rect width="400" height="350" fill="#f5efe5"/><circle cx="200" cy="145" r="42" fill="none" stroke="#bb9153"/><text x="200" y="158" text-anchor="middle" font-family="Georgia,serif" font-size="38" fill="#681c2b">T</text><text x="200" y="225" text-anchor="middle" font-family="Arial,sans-serif" font-size="15" fill="#746e63">${label}</text></svg>`);
};
// Resolve known catalog filename mismatches for both backup and live Sheet products.
const imageAliases = {
  "images/chicken-boneless-strips.jpg":"images/chicken-boneless-striploin.jpg",
  "images/beef-with-bone-nehari.jpg":"images/beef-with-bone-nehari.jpg.jpg",
  "images/egg-crate-30-eggs.jpg":"images/egg-crate-30-eggs.jpg.jpg"
};
const imageDimensions = {"images/beef-boneless-nehari.jpg": [1000, 1000], "images/beef-boneless.jpg": [600, 600], "images/beef-manchurian.jpg": [600, 600], "images/beef-minced.jpg": [612, 408], "images/beef-paya.jpg": [1000, 1000], "images/beef-simple-bone.jpg": [600, 600], "images/beef-steaks.jpg": [600, 600], "images/beef-striploin.jpg": [600, 600], "images/beef-t-bone-steak.jpg": [447, 447], "images/beef-undercut.jpg": [1000, 1000], "images/beef-with-bone-nehari.jpg.jpg": [1000, 1000], "images/beef-with-bone.jpg": [1000, 1000], "images/chicken-boneless-cubes.jpg": [600, 600], "images/chicken-boneless-manchurian.jpg": [600, 600], "images/chicken-boneless-steak.jpg": [1000, 1000], "images/chicken-boneless-striploin.jpg": [600, 600], "images/chicken-boneless.jpg": [600, 600], "images/chicken-drumsticks.jpg": [1000, 1000], "images/chicken-full-legs.jpg": [1024, 1024], "images/chicken-gizzard.jpg": [800, 800], "images/chicken-heart.jpg": [600, 600], "images/chicken-liver.jpg": [2500, 2500], "images/chopped-chicken.jpg": [600, 600], "images/desi-egg-crate-30-eggs.jpg": [500, 351], "images/egg-crate-30-eggs.jpg.jpg": [500, 500], "images/fakieh-chicken.jpg": [351, 437], "images/hero.jpg": [612, 408], "images/mutton-boneless.jpg": [600, 600], "images/mutton-brain.jpg": [1000, 1000], "images/mutton-chops-champ.jpg": [447, 447], "images/mutton-fish-joints.jpg": [1000, 1000], "images/mutton-fry-chops.jpg": [600, 600], "images/mutton-kidney.jpg": [1000, 1000], "images/mutton-kunna-cut.jpg": [1000, 1000], "images/mutton-leg.jpg": [1000, 1000], "images/mutton-liver.jpg": [600, 600], "images/mutton-minced.jpg": [1000, 1000], "images/mutton-paya.jpg": [1000, 1000], "images/mutton-shoulder.jpg": [1000, 1000], "images/pakistani-mutton-whole.jpg": [1080, 1080], "images/veg-beetroot.jpg": [280, 220], "images/veg-bitter-gourd.jpg": [170, 105], "images/veg-bottle-gourd.jpg": [245, 205], "images/veg-carrot.jpg": [140, 75], "images/veg-cauliflower.jpg": [205, 205], "images/veg-coriander.jpg": [125, 120], "images/veg-cucumber.jpg": [240, 250], "images/veg-garlic.jpg": [230, 190], "images/veg-ginger.jpg": [150, 140], "images/veg-green-beans.jpg": [165, 140], "images/veg-green-cabbage.jpg": [215, 230], "images/veg-green-chilli.jpg": [150, 95], "images/veg-green-eggplant.jpg": [258, 140], "images/veg-green-pepper.jpg": [165, 110], "images/veg-lemon.jpg": [135, 140], "images/veg-mint.jpg": [235, 205], "images/veg-okra.jpg": [280, 290], "images/veg-onion.jpg": [380, 400], "images/veg-parwal.jpg": [170, 115], "images/veg-potato.jpg": [340, 180], "images/veg-purple-eggplant.jpg": [283, 240], "images/veg-red-cabbage.jpg": [250, 130], "images/veg-red-pepper.jpg": [50, 90], "images/veg-sweet-potato.jpg": [178, 100], "images/veg-taro.jpg": [230, 150], "images/veg-tinda.jpg": [295, 190], "images/veg-tomato.jpg": [210, 85], "images/veg-turnip.jpg": [343, 275], "images/veg-yellow-pepper.jpg": [75, 60], "images/vegetables-category.jpg": [478, 660], "images/whole-chicken.jpg": [600, 600]};
const imageSize = u => { const [w,h] = imageDimensions[imageAliases[u] || u] || [600,600]; return `width="${w}" height="${h}" decoding="async"`; };
const optimizedImages = {"images/beef-boneless-nehari.jpg":"images/optimized/beef-boneless-nehari.jpg.webp","images/beef-boneless.jpg":"images/optimized/beef-boneless.jpg.webp","images/beef-manchurian.jpg":"images/optimized/beef-manchurian.jpg.webp","images/beef-minced.jpg":"images/optimized/beef-minced.jpg.webp","images/beef-paya.jpg":"images/optimized/beef-paya.jpg.webp","images/beef-simple-bone.jpg":"images/optimized/beef-simple-bone.jpg.webp","images/beef-steaks.jpg":"images/optimized/beef-steaks.jpg.webp","images/beef-striploin.jpg":"images/optimized/beef-striploin.jpg.webp","images/beef-t-bone-steak.jpg":"images/optimized/beef-t-bone-steak.jpg.webp","images/beef-undercut.jpg":"images/optimized/beef-undercut.jpg.webp","images/beef-with-bone-nehari.jpg.jpg":"images/optimized/beef-with-bone-nehari.jpg.jpg.webp","images/beef-with-bone.jpg":"images/optimized/beef-with-bone.jpg.webp","images/chicken-boneless-cubes.jpg":"images/optimized/chicken-boneless-cubes.jpg.webp","images/chicken-boneless-manchurian.jpg":"images/optimized/chicken-boneless-manchurian.jpg.webp","images/chicken-boneless-steak.jpg":"images/optimized/chicken-boneless-steak.jpg.webp","images/chicken-boneless-striploin.jpg":"images/optimized/chicken-boneless-striploin.jpg.webp","images/chicken-boneless.jpg":"images/optimized/chicken-boneless.jpg.webp","images/chicken-drumsticks.jpg":"images/optimized/chicken-drumsticks.jpg.webp","images/chicken-full-legs.jpg":"images/optimized/chicken-full-legs.jpg.webp","images/chicken-gizzard.jpg":"images/optimized/chicken-gizzard.jpg.webp","images/chicken-heart.jpg":"images/optimized/chicken-heart.jpg.webp","images/chicken-liver.jpg":"images/optimized/chicken-liver.jpg.webp","images/chopped-chicken.jpg":"images/optimized/chopped-chicken.jpg.webp","images/desi-egg-crate-30-eggs.jpg":"images/optimized/desi-egg-crate-30-eggs.jpg.webp","images/egg-crate-30-eggs.jpg.jpg":"images/optimized/egg-crate-30-eggs.jpg.jpg.webp","images/Eggplant.jpg":"images/optimized/Eggplant.jpg.webp","images/fakieh-chicken.jpg":"images/optimized/fakieh-chicken.jpg.webp","images/hero.jpg":"images/optimized/hero.jpg.webp","images/mutton-boneless.jpg":"images/optimized/mutton-boneless.jpg.webp","images/mutton-brain.jpg":"images/optimized/mutton-brain.jpg.webp","images/mutton-chops-champ.jpg":"images/optimized/mutton-chops-champ.jpg.webp","images/mutton-fish-joints.jpg":"images/optimized/mutton-fish-joints.jpg.webp","images/mutton-fry-chops.jpg":"images/optimized/mutton-fry-chops.jpg.webp","images/mutton-kidney.jpg":"images/optimized/mutton-kidney.jpg.webp","images/mutton-kunna-cut.jpg":"images/optimized/mutton-kunna-cut.jpg.webp","images/mutton-leg.jpg":"images/optimized/mutton-leg.jpg.webp","images/mutton-liver.jpg":"images/optimized/mutton-liver.jpg.webp","images/mutton-minced.jpg":"images/optimized/mutton-minced.jpg.webp","images/mutton-paya.jpg":"images/optimized/mutton-paya.jpg.webp","images/mutton-shoulder.jpg":"images/optimized/mutton-shoulder.jpg.webp","images/pakistani-mutton-whole.jpg":"images/optimized/pakistani-mutton-whole.jpg.webp","images/veg-beetroot.jpg":"images/optimized/veg-beetroot.jpg.webp","images/veg-bitter-gourd.jpg":"images/optimized/veg-bitter-gourd.jpg.webp","images/veg-bottle-gourd.jpg":"images/optimized/veg-bottle-gourd.jpg.webp","images/veg-carrot.jpg":"images/optimized/veg-carrot.jpg.webp","images/veg-cauliflower.jpg":"images/optimized/veg-cauliflower.jpg.webp","images/veg-coriander.jpg":"images/optimized/veg-coriander.jpg.webp","images/veg-cucumber.jpg":"images/optimized/veg-cucumber.jpg.webp","images/veg-garlic.jpg":"images/optimized/veg-garlic.jpg.webp","images/veg-ginger.jpg":"images/optimized/veg-ginger.jpg.webp","images/veg-green-beans.jpg":"images/optimized/veg-green-beans.jpg.webp","images/veg-green-cabbage.jpg":"images/optimized/veg-green-cabbage.jpg.webp","images/veg-green-chilli.jpg":"images/optimized/veg-green-chilli.jpg.webp","images/veg-green-eggplant.jpg":"images/optimized/veg-green-eggplant.jpg.webp","images/veg-green-pepper.jpg":"images/optimized/veg-green-pepper.jpg.webp","images/veg-lemon.jpg":"images/optimized/veg-lemon.jpg.webp","images/veg-mint.jpg":"images/optimized/veg-mint.jpg.webp","images/veg-okra.jpg":"images/optimized/veg-okra.jpg.webp","images/veg-onion.jpg":"images/optimized/veg-onion.jpg.webp","images/veg-parwal.jpg":"images/optimized/veg-parwal.jpg.webp","images/veg-potato.jpg":"images/optimized/veg-potato.jpg.webp","images/veg-purple-eggplant.jpg":"images/optimized/veg-purple-eggplant.jpg.webp","images/veg-red-cabbage.jpg":"images/optimized/veg-red-cabbage.jpg.webp","images/veg-red-pepper.jpg":"images/optimized/veg-red-pepper.jpg.webp","images/veg-sweet-potato.jpg":"images/optimized/veg-sweet-potato.jpg.webp","images/veg-taro.jpg":"images/optimized/veg-taro.jpg.webp","images/veg-tinda.jpg":"images/optimized/veg-tinda.jpg.webp","images/veg-tomato.jpg":"images/optimized/veg-tomato.jpg.webp","images/veg-turnip.jpg":"images/optimized/veg-turnip.jpg.webp","images/veg-yellow-pepper.jpg":"images/optimized/veg-yellow-pepper.jpg.webp","images/vegetables-category.jpg":"images/optimized/vegetables-category.jpg.webp","images/whole-chicken.jpg":"images/optimized/whole-chicken.jpg.webp"};
const imageUrl = u => optimizedImages[imageAliases[u] || u] || imageAliases[u] || u;
const productTag = p => p.tag === "Best Seller" ? t("bestTag") : p.tag;
const img = p => `<img src="${imageUrl(p.img)}" alt="${pName(p)}" ${imageSize(p.img)} loading="lazy" onerror="this.onerror=null;this.src=ph(prod('${p.id}'))">`;
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
  $("#q").setAttribute("aria-label", t("searchPh"));
  $("#cartBtn").setAttribute("aria-label", t("cart"));
  $("#menuBtn").setAttribute("aria-label", t("menu"));
  $("#closeCart").setAttribute("aria-label", t("close"));
  $("#nav").setAttribute("aria-label", t("menu"));
  $("#serviceHours").textContent=t("serviceHours");

  $("#shopLocation").textContent=(lang==="ar" ? CONFIG.shopAddressAr : CONFIG.shopAddress) || t("locationPending");
  if(CONFIG.shopMapsUrl && CONFIG.shopAddress){ const link=document.createElement("a"); link.href=CONFIG.shopMapsUrl; link.textContent=lang==="ar" ? CONFIG.shopAddressAr : CONFIG.shopAddress; link.target="_blank"; link.rel="noopener"; $("#shopLocation").replaceChildren(link); }
  const currentTime = $("#timeSel").value;
  const timeAr = {"As soon as possible":"في أقرب وقت ممكن", "9:00 AM – 12:00 PM":"٩ صباحاً – ١٢ ظهراً", "12:00 PM – 3:00 PM":"١٢ ظهراً – ٣ عصراً", "3:00 PM – 6:00 PM":"٣ عصراً – ٦ مساءً", "6:00 PM – 9:00 PM":"٦ مساءً – ٩ مساءً", "9:00 PM – 12:00 AM":"٩ مساءً – ١٢ منتصف الليل"};
  $("#timeSel").innerHTML = CONFIG.deliveryTimes.map(a=>`<option value="${a}">${lang === "ar" ? (timeAr[a] || a) : a}</option>`).join("");
  if(CONFIG.deliveryTimes.includes(currentTime)) $("#timeSel").value = currentTime;
  $("#bestGrid").innerHTML = ""; renderTiles(); renderChips(); renderGrids(); renderCart(); renderSummary(); updLocInfo();
  if(!$("#productView").hidden) route();
}

/* Catalogue */
function renderTiles(){
  const photos = {chicken:"images/whole-chicken.jpg", mutton:"images/mutton-chops-champ.jpg", beef:"images/beef-t-bone-steak.jpg", eggs:"images/desi-egg-crate-30-eggs.jpg", vegetables:"images/vegetables-category.jpg"};
  $("#catTiles").innerHTML = CATS.map(c => `<button class="cat" data-cat="${c[0]}"><img src="${photos[c[0]]}" alt="" ${imageSize(photos[c[0]])} loading="lazy"><span class="cat-label">${lang==="ar"?c[3]:c[2]}</span></button>`).join("");
}
function renderChips(){
  $("#chips").innerHTML = [["all",t("all")], ...CATS.map(c=>[c[0], lang==="ar"?c[3]:c[2]])]
    .map(([k,l]) => `<button class="chip ${k===filter?"on":""}" aria-pressed="${k===filter}" data-cat="${k}">${l}</button>`).join("");
}
function card(p){
  const s = sel[p.id] ||= { w: p.unit==="kg" && p.opts.includes(1000) ? 1000 : p.opts[0], q: 1, c: 0 };
  const tag = p.tag ? `<span class="tag">${productTag(p)}</span>` : "";
  return `<article class="card" data-id="${p.id}">
    <div class="imgw"><a href="#product/${p.id}">${img(p)}</a>${tag}</div>
    <div class="cb"><h3><a class="plink" href="#product/${p.id}">${pName(p)}</a></h3><p>${pDesc(p)}</p>

      <div class="tot">${selectedPrice(p,s)}</div>${cutSel(p, s)}
      <div class="row">
        ${weightControl(p,s)}
        <div class="qty"><button data-act="dec" aria-label="${t("decrease")}">−</button><span>${s.q}</span><button data-act="inc" aria-label="${t("increase")}">+</button></div>
      </div>
      <button class="add" data-act="add" ${!catalogReady ? "disabled" : ""}>${t("add")}</button>
    </div></article>`;
}
function renderGrids(){
  $("#bestGrid").innerHTML = PRODUCTS.filter(p=>p.tag==="Best Seller").slice(0,5).map(card).join("");
  const q = query.trim().toLowerCase();
  const list = PRODUCTS.filter(p => (filter==="all"||p.cat===filter) && (!q || (p.en+" "+p.ar+" "+p.d+" "+p.da).toLowerCase().includes(q)));
  $("#shopGrid").innerHTML = list.length ? list.map(card).join("") : `<div class="empty"><p>${t("noRes")}</p><button class="link text-link" data-cat="all">${t("clearSearch")}</button></div>`;
  $("#resultCount").textContent = list.length === 1 ? t("productCount") : t("productsCount").replace("{n}", list.length);
  $("#catalogStatus").textContent = catalogReady ? "" : t("catalogUnavailable");
  revealContent();
}
document.addEventListener("click", e => {
  const cat = e.target.closest("[data-cat]");
  if(cat){ filter = cat.dataset.cat; query = ""; $("#q").value = ""; renderChips(); renderGrids(); showMain(); $("#shop").scrollIntoView(); return; }
  const c = e.target.closest(".card"); const b = e.target.closest("[data-act]");
  if(!c || !b) return;
  const p = prod(c.dataset.id), s = sel[p.id];
  if(b.dataset.act==="inc") s.q = Math.min(20, s.q+1);
  if(b.dataset.act==="dec") s.q = Math.max(1, s.q-1);
  if(b.dataset.act==="add"){ addToCart(p.id, s.w, s.q, s.c || 0); b.textContent = t("added"); b.classList.add("added"); setTimeout(()=>{b.textContent=t("add");b.classList.remove("added");}, 1200); }
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
  if(!$("#productView").hidden) updateProductMetadata(p, s.w);
  $$(`.card[data-id="${id}"]`).forEach(c => {
    $(".tot", c).innerHTML = selectedPrice(p,s);
    $(".qty span", c).textContent = s.q; if($(".wSel", c)) $(".wSel", c).value = s.w; const cs = $(".cSel", c); if(cs) cs.value = s.c || 0;
  });
}

/* Cart */
function addToCart(id, w, q, c = 0){
  if(!prod(id) || !catalogReady || !prod(id).opts.includes(w)) return;
  const it = cart.find(i => i.id===id && i.w===w && (i.c || 0)===c);
  it ? it.q = Math.min(50, it.q+q) : cart.push({id, w, q, c});
  saveCart(); renderCart();
  showToast(t("cartAdded").replace("{name}", pName(prod(id))));
  const badge = $("#cartBtn"); badge.classList.remove("pulse"); void badge.offsetWidth; badge.classList.add("pulse");
}
const subtotal = () => roundMoney(cart.reduce((s,i)=> s + price(prod(i.id), i.w) * i.q, 0));
const rad = x => x * Math.PI / 180;
function km(a, b){ const h = Math.sin(rad(b.lat-a.lat)/2)**2 + Math.cos(rad(a.lat))*Math.cos(rad(b.lat))*Math.sin(rad(b.lng-a.lng)/2)**2; return 12742 * Math.asin(Math.sqrt(h)); }
const validLoc = p => p && Number.isFinite(p.lat) && Number.isFinite(p.lng) && Math.abs(p.lat)<=90 && Math.abs(p.lng)<=180;
const distKm = () => validLoc(userLoc) && validLoc(CONFIG.shopLocation) ? km(CONFIG.shopLocation, userLoc) : null;
function feeFor(sub, d){
  if(!Number.isFinite(d) || d < 0 || !Number.isFinite(sub) || sub < 0) return null;
  if(d <= 5) return sub > 50 ? 0 : 10;
  if(d <= 10) return sub > 200 ? 0 : 15;
  return roundMoney(CONFIG.farBaseFee + CONFIG.farPerKm * Math.ceil(d - 10));
}
const deliveryFee = () => feeFor(subtotal(), distKm());
const noteHtml = () => '<small class="note"><a href="delivery.html">'+t("deliveryPolicy")+'</a></small>';

const mapLink = () => userLoc ? `https://www.google.com/maps?q=${userLoc.lat.toFixed(6)},${userLoc.lng.toFixed(6)}` : "";
const totals = () => { const s = subtotal(), d = deliveryFee(); return { s, d, t: d === null ? null : roundMoney(s + d) }; };

function renderCart(){
  cart = cart.filter(i => prod(i.id) && prod(i.id).opts.includes(i.w) && Number.isInteger(i.q) && i.q > 0 && i.q <= 50); saveCart();
  $("#cartCount").textContent = cart.reduce((n,i)=>n+i.q,0);
  $("#cartItems").innerHTML = cart.length ? cart.map((i,ix) => { const p = prod(i.id); return `
    <div class="li">${img(p)}<div class="m"><b>${pName(p)}</b><small>${wl(i.w,p)}${cutLbl(p,i.c)} · ${money(price(p,i.w))}</small>
      <div class="qty"><button data-ci="${ix}" data-d="-1" aria-label="${t("decrease")}">−</button><span>${i.q}</span><button data-ci="${ix}" data-d="1" aria-label="${t("increase")}">+</button></div></div>
      <div><b>${money(price(p,i.w)*i.q)}</b><br><button class="rm" data-rm="${ix}">${t("remove")}</button></div></div>`; }).join("")
    : `<p class="empty">${t("empty")}</p>`;
  const x = totals();
  $("#cartFoot").innerHTML = cart.length ? `
    <div class="sum"><span>${t("sub")}</span><span>${money(x.s)}</span></div>
    <div class="sum"><span>${t("del")}</span><span>${x.d === 0 ? t("free") : money(x.d)}</span></div>
    <div class="sum t"><span>${t("tot")}</span><span>${money(x.t)}</span></div>${noteHtml()}
    <button class="btn full" id="goCo">${t("goCheckout")}</button>` : "";
  renderSummary(); updLocInfo();
}
$("#cartItems").addEventListener("click", e => {
  const b = e.target;
  if(b.dataset.ci!==undefined){ const i = cart[+b.dataset.ci]; i.q = Math.min(50, i.q + +b.dataset.d); if(i.q<1) cart.splice(+b.dataset.ci,1); }
  else if(b.dataset.rm!==undefined) cart.splice(+b.dataset.rm,1);
  else return;
  saveCart(); renderCart();
});
let cartReturnFocus = null;
const openCart = o => {
  const drawer = $("#drawer");
  if(o) cartReturnFocus = document.activeElement;
  drawer.classList.toggle("open", o); drawer.inert = !o;
  $("#scrim").classList.toggle("on", o); drawer.setAttribute("aria-hidden", String(!o));
  $("#cartBtn").setAttribute("aria-expanded", String(o));
  document.body.classList.toggle("cart-open", o);
  [".bar", "#main", "#checkoutView", "#doneView", "#productView", "footer"].forEach(s => $(s).inert = o);
  if(!o && !$("#productView").hidden) $("#main").inert=true;
  if(o) $("#closeCart").focus(); else if(cartReturnFocus?.isConnected) cartReturnFocus.focus();
};
document.addEventListener("keydown", e => {
  if(!$("#drawer").classList.contains("open")) return;
  if(e.key === "Escape"){ e.preventDefault(); openCart(false); return; }
  if(e.key !== "Tab") return;
  const els = $$("button, a[href], input, select, textarea, [tabindex='0']", $("#drawer")).filter(el => !el.disabled && el.getClientRects().length);
  const first = els[0], last = els[els.length-1];
  if(e.shiftKey && document.activeElement === first){ e.preventDefault(); last.focus(); }
  else if(!e.shiftKey && document.activeElement === last){ e.preventDefault(); first.focus(); }
});
$("#cartBtn").onclick = () => openCart(true);
$("#closeCart").onclick = $("#scrim").onclick = () => openCart(false);
$("#cartFoot").addEventListener("click", e => { if(e.target.id==="goCo"){ openCart(false); showCheckout(); } });

/* Views */
function showCheckout(){ view("checkoutView"); scrollTo(0,0); initMap(); initVerification(); }
function view(id){
  $(".search-wrap").hidden = id === "checkoutView" || id === "doneView";
  if(id !== "productView") closeProduct();
  ["main","checkoutView","doneView","productView"].forEach(v => $("#" + v).hidden = v !== id);
  document.body.classList.remove("lock");
  if(id !== "productView" && location.hash.indexOf("#product/") === 0) history.replaceState(null, "", location.pathname + location.search);
}
function showMain(){ view("main"); }
$("#backBtn").onclick = () => { showMain(); $("#shop").scrollIntoView(); };
$("#nav").addEventListener("click", () => { showMain(); closeMenu(); });
$("footer").addEventListener("click", e => { if(e.target.closest('a[href^="#"]')) showMain(); });
$(".logo").addEventListener("click", showMain);
function renderSummary(){
  const x = totals();
  $("#coSummary").innerHTML = cart.map(i=>{ const p=prod(i.id); return `<div class="sum"><span>${pName(p)} · ${wl(i.w,p)}${cutLbl(p,i.c)} × ${i.q}</span><span>${money(price(p,i.w)*i.q)}</span></div>`; }).join("")
   + `<div class="sum"><span>${t("sub")}</span><span>${money(x.s)}</span></div><div class="sum"><span>${t("del")}</span><span>${x.d === 0 ? t("free") : money(x.d)}</span></div><div class="sum t"><span>${t("tot")}</span><span>${money(x.t)}</span></div>${noteHtml()}`;
}

/* Website checkout: backend acknowledgment required. */
let submitting = false, pendingOrder = null, pendingFingerprint = "";
$("#coForm").addEventListener("submit", async e => {
  e.preventDefault();
  if(submitting) return;
  const form = e.target, btn = $("button[type=submit]", form);
  const f = Object.fromEntries(new FormData(form)); f.time="12 noon–12 midnight; expected within one hour"; const err = $("#coErr");
  $$("#coForm .bad").forEach(unflag);
  let first = null;
  const need = (el, msg) => { const b = flag(el, msg); first = first || b; };
  if(!f.name.trim()) need(form.elements["name"], t("reqName"));
  if(!f.mobile.trim()) need(form.elements["mobile"], t("reqMobile"));
  else if(!/^(\+?966|0)?5\d{8}$/.test(f.mobile.replace(/[\s-]/g,""))) need(form.elements["mobile"], t("errMobile"));
  if(!userLoc && !f.address.trim()) need(form.elements["address"], t("errLoc"));
  if(!validLoc(userLoc)) need($("#map"), t("errLoc"));
  if(!cart.length){ err.textContent = t("errCart"); return; }
  if(first){ err.textContent = t("errFill"); first.scrollIntoView({ behavior:matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth", block:"center" }); (first.querySelector("input,select,textarea,button") || first).focus({preventScroll:true}); return; }
  if(!catalogReady){ err.textContent=t("catalogUnavailable"); return; }
  if(deliveryFee() === null){ err.textContent=t("deliveryUnconfirmed"); return; }
  if(CONFIG.previewOnly){ err.textContent=t("previewMessage"); return; }
  if(CONFIG.turnstileSiteKey && !verificationToken){ err.textContent=lang==='ar'?'يرجى إكمال التحقق الأمني قبل إرسال الطلب.':'Please complete the security verification before placing your order.'; initVerification(); return; }
  delete f['cf-turnstile-response'];
  err.textContent = "";
  const fingerprint=JSON.stringify({f,cart,userLoc,totals:totals()});
  if(fingerprint!==pendingFingerprint){ pendingOrder=buildOrder(f); pendingFingerprint=fingerprint; }
  const order = pendingOrder;
  submitting=true;
  store.set("mm_last_order", order);       // latest order, browser only
  btn.disabled = true; btn.textContent = t("sending");
  const ok = await sendOrder(order);       // true = saved, false = failed, null = not configured
  submitting=false; btn.disabled = false; btn.textContent = t("place");
  if(!ok){ err.textContent=t("submitFailed"); return; }
  pendingOrder=null; pendingFingerprint="";
  cart = []; saveCart(); renderCart(); form.reset();
  showDone(order, ok);
});
async function sendOrder(order){
  if(!CONFIG.orderEndpoint) return null;
  const ctl = new AbortController(), tm = setTimeout(() => ctl.abort(), 20000);
  try{
    const r = await fetch(CONFIG.orderEndpoint, { method:"POST", headers:{ "Content-Type":"text/plain;charset=utf-8" },
      body: JSON.stringify({ turnstileToken: verificationToken, order }), signal: ctl.signal });
    if(!r.ok) return false;
    const d = await r.json();
    if(d.ok && d.orderNumber){ order.message = order.message.split(order.orderNumber).join(d.orderNumber); order.orderNumber = d.orderNumber; store.set("mm_last_order", order); }
    return d.ok === true && typeof d.orderNumber === "string" && d.orderNumber.length > 0;
  }catch(e){ return false; }finally{ clearTimeout(tm); verificationToken=""; if(verificationWidget !== null && window.turnstile) window.turnstile.reset(verificationWidget); }
}
function showDone(order, ok){
  const fill = s => t(s).replace("{n}", order.customer.name).replace("{no}", order.orderNumber);
  $("#doneT").textContent = ok ? t("doneOk") : t("doneStep");
  $("#doneP").textContent = ok ? fill("doneOkP") : fill("doneStepP");
  const x=order.totals;
  $("#doneNo").innerHTML='<strong>'+escapeHtml(order.orderNumber)+'</strong>'+order.lines.map(l=>'<div class="sum"><span>'+escapeHtml(lang==='ar'?l.ar:l.en)+' · '+escapeHtml(lang==='ar'?l.wa:l.we)+' × '+l.q+'</span><span>'+money(l.sub)+'</span></div>').join('')+'<div class="sum"><span>'+t('sub')+'</span><span>'+money(x.s)+'</span></div><div class="sum"><span>'+t('del')+'</span><span>'+money(x.d)+'</span></div><div class="sum t"><span>'+t('tot')+'</span><span>'+money(x.t)+'</span></div>';
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
  const no = "MM-" + crypto.randomUUID();   // temporary; the Apps Script replaces it with a running number
  const w = (n,p) => p.unit==="kg" ? (n>=1000 ? `${n/1000} kg` : `${n} g`) : p.unit==="pc" ? `${n} pcs` : p.pk, m = n => `${num(n)} SAR`;
  const items = cart.map((i,ix) => { const p = prod(i.id);
    return `${ix+1}. ${p.en}\n   ${L("lW")}: ${w(i.w,p)}${cutEn(p,i.c)} | ${L("lQ")}: ${i.q} | ${L("lP")}: ${m(price(p,i.w))} each = ${m(price(p,i.w)*i.q)}`; }).join("\n");
  const wA = (n,p) => p.unit==="kg" ? (n>=1000 ? `${n/1000} كجم` : `${n} جم`) : p.unit==="pc" ? `${n} قطع` : p.pka;
  const lines = cart.map(i => { const p = prod(i.id); return { en:p.en, ar:p.ar, we:w(i.w,p) + cutEn(p,i.c), wa:wA(i.w,p) + cutAr(p,i.c), q:i.q, sub:Math.round(price(p,i.w)*i.q*100)/100 }; });
  const loc = userLoc ? `${L("lMap")}: ${mapLink()} (${distKm().toFixed(1)} km from shop)\n` : `${L("lMap")}: not pinned - please confirm the delivery fee\n`;
  const pay = f.pay==="cod" ? L("cod") : L("online");
  const message = `*${CONFIG.shopName} — ${L("newOrder")}*\n\n${L("lOrder")}: ${no}\n${L("lName")}: ${f.name}\n${L("lMob")}: ${f.mobile}\n${L("lArea")}: ${f.area}\n${L("lAddr")}: ${[f.address.trim(), f.building.trim() && "Bldg/Villa " + f.building.trim()].filter(Boolean).join(", ") || "Not provided"}\n${loc}${L("lTime")}: ${f.time}\n\n*${L("lProd")}*\n${items}\n\n${T.en.sub}: ${m(x.s)}\n${T.en.del}: ${x.d? m(x.d): "Free"}\n*${T.en.tot}: ${m(x.t)}*\n\n${L("lPay")}: ${pay}\n${L("lNotes")}: ${f.notes.trim()||L("none")}`;
  return { requestId:crypto.randomUUID(), orderNumber:no, createdAt:d.toISOString(), customer:{name:f.name,mobile:f.mobile,area:f.area,address:f.address,building:f.building, lat:userLoc?userLoc.lat:null, lng:userLoc?userLoc.lng:null, mapLink:mapLink()}, deliveryTime:f.time, itemsText:items, lines, lang, paymentMethod:f.pay, items:cart.map(i=>({...i})), totals:x, notes:f.notes, message };
}

$("#q").addEventListener("input", e => { query = e.target.value; filter="all"; showMain(); renderChips(); renderGrids(); $("#shop").scrollIntoView({block:"start",behavior:"instant"}); });
/* Checkout field highlighting */
function flag(el, msg){
  const box = el.closest("label") || el.closest(".pin"); box.classList.add("bad");
  let s = $(".fe", box); if(!s){ s = document.createElement("small"); s.className = "fe"; box.appendChild(s); }
  s.textContent = msg; s.id ||= "error-" + (el.name || el.id); el.setAttribute("aria-invalid", "true"); el.setAttribute("aria-describedby", s.id); return box;
}
function unflag(box){ box.classList.remove("bad"); box.querySelectorAll("[aria-invalid]").forEach(el => {el.removeAttribute("aria-invalid");el.removeAttribute("aria-describedby");}); const s = $(".fe", box); if(s) s.remove(); }
$("#coForm").addEventListener("input", e => { const b = e.target.closest("label") || e.target.closest(".pin"); if(b && b.classList.contains("bad")) unflag(b); });

/* Map pin (Leaflet + OpenStreetMap, free) */
function updLocInfo(){
  const el = $("#locInfo"); if(!el) return;
  const d = distKm();
  el.textContent = d === null ? t("pinHelp") : `${t("del")}: ${deliveryFee() === 0 ? t("free") : money(deliveryFee())}`;
}
function setLoc(lat, lng, pan){
  if(!validLoc({lat,lng})) return;
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
  if(!validLoc(CONFIG.shopLocation)){ $("#map").hidden=true; $("#mapMsg").textContent=t("deliveryUnconfirmed"); return; }
  if(typeof L === "undefined"){ $("#map").hidden = true; $("#useMe").hidden = true; $("#mapMsg").textContent = t("mapFail"); return; }
  if(!map){
    $("#map").hidden=false;
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

/* Product metadata follows the visible selected pack; no invented ratings or stock claims. */
function updateProductMetadata(p, weight){
  let el = document.getElementById("product-schema");
  if(!el){ el=document.createElement("script"); el.id="product-schema"; el.type="application/ld+json"; document.head.appendChild(el); }
  document.querySelector('meta[name="description"]').content = pDesc(p) || pName(p);
  const url = new URL(location.href); url.hash = "product/" + p.id;
  el.textContent = JSON.stringify({"@context":"https://schema.org","@type":"Product",name:pName(p),sku:p.id,description:pDesc(p),image:new URL(imageUrl(p.img),location.href).href,
    offers:{"@type":"Offer",url:url.href,priceCurrency:"SAR",price:price(p,weight),description:wl(weight,p)}});
}

/* Product pages: #product/ID */
const baseDescription = document.querySelector('meta[name="description"]').content;
const baseTitle = document.title; let sheetDone = !CONFIG.productsSheetUrl;
function renderProduct(p){
  const s = sel[p.id] ||= { w: p.unit==="kg" && p.opts.includes(1000) ? 1000 : p.opts[0], q: 1, c: 0 };
  const imgs = [p.img, ...(p.imgs || [])].map(imageUrl);
  const long = lang==="ar" ? (p.lda || p.da) : (p.ld || p.d);
  const thumbs = imgs.length > 1 ? `<div class="thumbs">${imgs.map(u => `<button type="button" class="thumb" aria-pressed="${imgs.indexOf(u) === 0}" data-thumb="${u}" aria-label="${pName(p)} — ${imgs.indexOf(u)+1}"><img src="${u}" alt="" ${imageSize(u)} loading="lazy" onerror="this.closest('button').remove()"></button>`).join("")}</div>` : "";
  const rel = PRODUCTS.filter(x => x.cat === p.cat && x.id !== p.id).slice(0, 4);
  $("#productBody").innerHTML = `
    <button class="link" id="pBack">${t("back")}</button>
    <div class="pdetail">
      <div class="pgal"><div class="imgw"><img id="pMain" src="${imageUrl(p.img)}" alt="${pName(p)}" ${imageSize(p.img)} fetchpriority="high" onerror="this.onerror=null;this.src=ph(prod('${p.id}'))">${p.tag ? `<span class="tag">${productTag(p)}</span>` : ""}</div>${thumbs}</div>
      <div class="pinfo card pcard" data-id="${p.id}">
        <h1>${pName(p)}</h1><p class="long">${long}</p>
  
        <div class="tot">${selectedPrice(p,s)}</div>${cutSel(p, s)}
        <div class="row">
          ${weightControl(p,s)}
          <div class="qty"><button data-act="dec" aria-label="${t("decrease")}">−</button><span>${s.q}</span><button data-act="inc" aria-label="${t("increase")}">+</button></div>
        </div>
        <button class="add" data-act="add" ${!catalogReady ? "disabled" : ""}>${t("add")}</button>
      </div>
    </div>
    ${rel.length ? `<h2>${t("related")}</h2><div class="grid">${rel.map(card).join("")}</div>` : ""}`;
  document.title = `${pName(p)} | ${CONFIG.shopName}`;
  updateProductMetadata(p, s.w);
}
let curProduct = null, deepLink = /^#product\//.test(location.hash);
function closeProduct(){ $("#main").inert=false; $("#main").removeAttribute("aria-hidden"); document.getElementById("product-schema")?.remove(); document.querySelector('meta[name="description"]').content = baseDescription; $("#productView").hidden = true; document.body.classList.remove("lock"); document.title = baseTitle; curProduct = null; }
function route(){
  $(".search-wrap").hidden = !$("#checkoutView").hidden || !$("#doneView").hidden;                         // the product page opens as a layer on top, so the page underneath keeps its scroll position
  const m = location.hash.match(/^#product\/([\w-]+)$/);
  if(!m){ if(!$("#productView").hidden) closeProduct(); return; }
  const p = prod(m[1]);
  if(!p){ if(sheetDone){ history.replaceState(null, "", location.pathname + location.search); closeProduct(); } return; }
  const pv = $("#productView"), fresh = pv.hidden || curProduct !== p.id;
  $("#main").hidden = false; $("#checkoutView").hidden = true; $("#doneView").hidden = true;
  updateHeaderOffset(); pv.hidden = false; $("#main").inert=true; $("#main").setAttribute("aria-hidden","true"); document.body.classList.add("lock");
  $(".search-wrap").hidden=false;
  renderProduct(p); curProduct = p.id; if(fresh){ pv.scrollTop = 0; $("#pBack").focus({preventScroll:true}); }
}
window.addEventListener("hashchange", route);
$("#productBody").addEventListener("click", e => {
  if(e.target.id === "pBack"){ if(deepLink){ deepLink = false; history.replaceState(null, "", location.pathname + location.search); closeProduct(); } else history.back(); }
  const thumb = e.target.closest("[data-thumb]"); if(thumb){ $("#pMain").src = thumb.dataset.thumb; $$(".thumb", $("#productBody")).forEach(b => b.setAttribute("aria-pressed", String(b === thumb))); }
});

document.addEventListener("keydown", e => { if(!e.defaultPrevented && e.key === "Escape" && !$("#productView").hidden){ const b = $("#pBack"); if(b) b.click(); } });

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
    // Manual-only slides keep the headline still and respect reduced motion.
    const play = () => { clearInterval(timer); };
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
      imgs:[g("image2"), g("image3")].map(x => x.replace(/[^\w.\- ]/g, "")).filter(Boolean).map(x => "images/" + x), prices:plist.length > 1 ? plist : null, cuts:g("cut_options").split(/[,;]+/).map(x => x.trim()).filter(Boolean), cutsAr:g("cut_options_ar").split(/[,;]+/).map(x => x.trim()).filter(Boolean), ld:g("long_desc_en"), lda:g("long_desc_ar"), price, old_price: Number(g("old_price")) || null, pk:g("pack_en") || "1 pack", pka:g("pack_ar") || g("pack_en") || "عبوة", opts });
  });
  return out;
}
async function loadSheet(){ try{ await loadSheet2(); }finally{ sheetDone = true; renderGrids(); route(); } }
async function loadSheet2(){
  if(!CONFIG.productsSheetUrl) return;
  try{
    const u = CONFIG.productsSheetUrl + (CONFIG.productsSheetUrl.includes("?") ? "&" : "?") + "t=" + Date.now();
    const r = await fetch(u); if(!r.ok) return;
    const text = await r.text();
    const list = sheetToProducts(text);
    const managed = sheetManagesVegetables(text);
    if(!parseCSV(text)[0]?.some(h => h.trim().toLowerCase()==="name_en")) return;
    catalogReady=true; PRODUCTS = list; store.set("mm_products", list);
    store.set("mm_vegetables_managed", managed);
    Object.keys(sel).forEach(k => {
      const p = prod(k), choice = sel[k];
      if(!p){ delete sel[k]; return; }
      if(!p.opts.includes(choice.w)) choice.w = p.unit === "kg" && p.opts.includes(1000) ? 1000 : p.opts[0];
      if(!p.cuts || choice.c >= p.cuts.length) choice.c = 0;
    });
    renderGrids(); renderCart();
  }catch(e){}
}

/* Progressive enhancement: content remains visible if motion APIs are unavailable. */
let toastTimer;
function showToast(message){
  const el = $("#toast"); clearTimeout(toastTimer); el.textContent = message; el.classList.add("on");
  toastTimer = setTimeout(() => el.classList.remove("on"), 2600);
}
// Content stays immediately visible; motion is reserved for user feedback.
function revealContent(){}
function closeMenu(){ $("#nav").classList.remove("open"); $("#menuBtn").setAttribute("aria-expanded", "false"); }
$("#menuBtn").onclick = () => { const open = $("#nav").classList.toggle("open"); $("#menuBtn").setAttribute("aria-expanded", String(open)); };
document.addEventListener("keydown", e => { if(e.key === "Escape" && $("#nav").classList.contains("open")){closeMenu();$("#menuBtn").focus();} });
document.addEventListener("click", e => { if(!e.target.closest(".bar")) closeMenu(); });

$("#langBtn").onclick = () => { lang = lang==="en" ? "ar" : "en"; store.set("mm_lang", lang); applyLang(); };
$("#yr").textContent = new Date().getFullYear();
const cachedProducts = CONFIG.productsSheetUrl ? store.get("mm_products", null) : null;
if(Array.isArray(cachedProducts) && cachedProducts.length) PRODUCTS = withVegetables(cachedProducts, store.get("mm_vegetables_managed", false));   // last good copy of the sheet
applyLang();
initSlider();
route();
loadSheet();


function updateHeaderOffset(){ document.documentElement.style.setProperty('--header-bottom', Math.max(0,document.querySelector('.bar').getBoundingClientRect().bottom)+'px'); }
new ResizeObserver(updateHeaderOffset).observe(document.querySelector('.bar'));
window.addEventListener('resize',updateHeaderOffset);
window.addEventListener('scroll',updateHeaderOffset,{passive:true});



let verificationToken="", verificationWidget=null, verificationLoading=false;
function initVerification(){
  if(CONFIG.previewOnly || !CONFIG.turnstileSiteKey) return;
  const box=document.getElementById('verification');
  if(window.turnstile){
    if(verificationWidget===null) verificationWidget=window.turnstile.render(box,{sitekey:CONFIG.turnstileSiteKey,action:'checkout',size:'flexible',language:lang,'response-field':false,callback:token=>{verificationToken=token;},'expired-callback':()=>{verificationToken='';},'error-callback':()=>{verificationToken='';document.getElementById('coErr').textContent=lang==='ar'?'تعذر التحقق الأمني. يرجى إعادة المحاولة.':'Security verification could not load. Please try again.';}});
    return;
  }
  if(verificationLoading)return;
  verificationLoading=true;
  const script=document.createElement('script');script.src='https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit';script.async=true;
  script.onload=()=>{verificationLoading=false;initVerification();};
  script.onerror=()=>{verificationLoading=false;script.remove();document.getElementById('coErr').textContent=lang==='ar'?'تعذر تحميل التحقق الأمني. يرجى إعادة المحاولة.':'Security verification could not load. Please try again.';};
  document.head.appendChild(script);
}
