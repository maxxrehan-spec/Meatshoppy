/* Temporary prices: SAR 5/kg; leafy herbs SAR 5/bunch. */
const VEGETABLE_PRODUCTS = [
  {
    "id": "veg-tomato",
    "cat": "vegetables",
    "unit": "kg",
    "en": "Tomatoes",
    "ar": "طماطم",
    "d": "Juicy tomatoes with a bright, tangy flavour. Ideal for salads, curries, sauces and everyday cooking.",
    "da": "طماطم غنية بالعصارة بطعم حامض خفيف، مناسبة للسلطات والكاري والصلصات والطبخ اليومي.",
    "img": "images/veg-tomato.jpg",
    "tag": "",
    "price": 5,
    "opts": [
      500,
      1000,
      2000
    ]
  },
  {
    "id": "veg-potato",
    "cat": "vegetables",
    "unit": "kg",
    "en": "Potatoes",
    "ar": "بطاطس",
    "d": "A versatile kitchen staple for curries, crispy fries, roasting and creamy mash. Add to your favourite meat or vegetable dishes.",
    "da": "بطاطس متعددة الاستخدامات للكاري والقلي والتحمير والبطاطس المهروسة، وإضافة مناسبة لأطباق اللحوم والخضروات.",
    "img": "images/veg-potato.jpg",
    "tag": "",
    "price": 5,
    "opts": [
      500,
      1000,
      2000
    ]
  },
  {
    "id": "veg-sweet-potato",
    "cat": "vegetables",
    "unit": "kg",
    "en": "Sweet potatoes",
    "ar": "بطاطا حلوة",
    "d": "Naturally sweet potatoes that turn soft when cooked. Delicious baked, roasted or mashed as a side dish.",
    "da": "بطاطا حلوة بطعم حلو طبيعي وقوام طري بعد الطهي، لذيذة مشوية في الفرن أو مهروسة كطبق جانبي.",
    "img": "images/veg-sweet-potato.jpg",
    "tag": "",
    "price": 5,
    "opts": [
      500,
      1000,
      2000
    ]
  },
  {
    "id": "veg-carrot",
    "cat": "vegetables",
    "unit": "kg",
    "en": "Carrots",
    "ar": "جزر",
    "d": "Crunchy carrots with a naturally sweet flavour. Enjoy in salads, soups, stews or homemade carrot halwa.",
    "da": "جزر مقرمش بطعم حلو طبيعي، مناسب للسلطات والشوربات واليخنات وحلوى الجزر المنزلية.",
    "img": "images/veg-carrot.jpg",
    "tag": "",
    "price": 5,
    "opts": [
      500,
      1000,
      2000
    ]
  },
  {
    "id": "veg-cucumber",
    "cat": "vegetables",
    "unit": "kg",
    "en": "Cucumbers",
    "ar": "خيار",
    "d": "Crisp cucumbers with a mild, refreshing taste. Perfect for salads, raita, sandwiches and simple side dishes.",
    "da": "خيار مقرمش بطعم خفيف ومنعش، مناسب للسلطات والرايتا والسندويتشات والأطباق الجانبية.",
    "img": "images/veg-cucumber.jpg",
    "tag": "",
    "price": 5,
    "opts": [
      500,
      1000,
      2000
    ]
  },
  {
    "id": "veg-bottle-gourd",
    "cat": "vegetables",
    "unit": "kg",
    "en": "Bottle gourd",
    "ar": "قرع طويل (لوكي)",
    "d": "Also known as lauki or ghiya, this mild gourd cooks to a soft texture. Ideal for curries, dal and traditional lauki halwa.",
    "da": "قرع طويل يعرف باللوكي أو الغيا، بطعم خفيف وقوام طري بعد الطهي. مناسب للكاري والعدس وحلوى اللوكي التقليدية.",
    "img": "images/veg-bottle-gourd.jpg",
    "tag": "",
    "price": 5,
    "opts": [
      500,
      1000,
      2000
    ]
  },
  {
    "id": "veg-okra",
    "cat": "vegetables",
    "unit": "kg",
    "en": "Okra",
    "ar": "بامية",
    "d": "Also known as bhindi, okra is a favourite for stir-fries, curries and tomato-based stews. Enjoy with roti or rice.",
    "da": "بامية تعرف أيضاً بالبهندي، مناسبة للتشويح والكاري واليخنات بصلصة الطماطم. تقدم مع الخبز أو الأرز.",
    "img": "images/veg-okra.jpg",
    "tag": "",
    "price": 5,
    "opts": [
      500,
      1000,
      2000
    ]
  },
  {
    "id": "veg-green-beans",
    "cat": "vegetables",
    "unit": "kg",
    "en": "Green beans",
    "ar": "فاصوليا خضراء",
    "d": "Green beans with a mild flavour and a pleasant bite when lightly cooked. Ideal for stir-fries, stews and mixed vegetable dishes.",
    "da": "فاصوليا خضراء بطعم خفيف وقوام متماسك عند طهيها قليلاً، مناسبة للتشويح واليخنات وأطباق الخضروات المشكلة.",
    "img": "images/veg-green-beans.jpg",
    "tag": "",
    "price": 5,
    "opts": [
      500,
      1000,
      2000
    ]
  },
  {
    "id": "veg-beetroot",
    "cat": "vegetables",
    "unit": "kg",
    "en": "Beetroot",
    "ar": "شمندر",
    "d": "Deep-coloured beetroot with an earthy, naturally sweet flavour. Enjoy roasted, boiled, pickled or grated into salads.",
    "da": "شمندر بلون غني وطعم ترابي وحلاوة طبيعية، مناسب للشوي والسلق والتخليل أو البشر وإضافته للسلطات.",
    "img": "images/veg-beetroot.jpg",
    "tag": "",
    "price": 5,
    "opts": [
      500,
      1000,
      2000
    ]
  },
  {
    "id": "veg-turnip",
    "cat": "vegetables",
    "unit": "kg",
    "en": "Turnips",
    "ar": "لفت",
    "d": "Also known as shaljam, turnips have a mild peppery taste that softens with cooking. Great for curries, stews and pickles.",
    "da": "لفت بطعم لاذع خفيف يصبح ألطف بعد الطهي، مناسب للكاري واليخنات والمخللات.",
    "img": "images/veg-turnip.jpg",
    "tag": "",
    "price": 5,
    "opts": [
      500,
      1000,
      2000
    ]
  },
  {
    "id": "veg-purple-eggplant",
    "cat": "vegetables",
    "unit": "kg",
    "en": "Purple eggplant",
    "ar": "باذنجان بنفسجي",
    "d": "Purple eggplant with flesh that becomes soft and creamy when cooked. Ideal for roasting, frying, curries and baingan bharta.",
    "da": "باذنجان بنفسجي يصبح لبه طرياً وكريمياً بعد الطهي، مناسب للشوي والقلي والكاري وأطباق الباذنجان المهروس.",
    "img": "images/veg-purple-eggplant.jpg",
    "tag": "",
    "price": 5,
    "opts": [
      500,
      1000,
      2000
    ]
  },
  {
    "id": "veg-green-pepper",
    "cat": "vegetables",
    "unit": "kg",
    "en": "Green bell peppers",
    "ar": "فلفل رومي أخضر",
    "d": "Crunchy green bell peppers with a mild, slightly grassy flavour. Add to stir-fries, curries, salads or stuffed pepper dishes.",
    "da": "فلفل رومي أخضر مقرمش بنكهة نباتية خفيفة، مناسب للتشويح والكاري والسلطات والمحاشي.",
    "img": "images/veg-green-pepper.jpg",
    "tag": "",
    "price": 5,
    "opts": [
      500,
      1000,
      2000
    ]
  },
  {
    "id": "veg-red-pepper",
    "cat": "vegetables",
    "unit": "kg",
    "en": "Red bell peppers",
    "ar": "فلفل رومي أحمر",
    "d": "Red bell peppers with a naturally sweet flavour and vibrant colour. Delicious in salads, roasted dishes, sauces and stir-fries.",
    "da": "فلفل رومي أحمر بطعم حلو طبيعي ولون زاهٍ، لذيذ في السلطات والأطباق المشوية والصلصات والتشويح.",
    "img": "images/veg-red-pepper.jpg",
    "tag": "",
    "price": 5,
    "opts": [
      500,
      1000,
      2000
    ]
  },
  {
    "id": "veg-yellow-pepper",
    "cat": "vegetables",
    "unit": "kg",
    "en": "Yellow bell peppers",
    "ar": "فلفل رومي أصفر",
    "d": "Bright yellow bell peppers with a sweet, mild taste. Add colour and crunch to salads, kebab skewers and stir-fries.",
    "da": "فلفل رومي أصفر بطعم حلو وخفيف، يضيف اللون والقرمشة للسلطات وأسياخ المشويات وأطباق التشويح.",
    "img": "images/veg-yellow-pepper.jpg",
    "tag": "",
    "price": 5,
    "opts": [
      500,
      1000,
      2000
    ]
  },
  {
    "id": "veg-green-cabbage",
    "cat": "vegetables",
    "unit": "kg",
    "en": "Green cabbage",
    "ar": "ملفوف أخضر",
    "d": "Layers of crisp green cabbage leaves with a mild flavour. Ideal for coleslaw, stir-fries, cabbage rolls and vegetable curries.",
    "da": "ملفوف أخضر بأوراق مقرمشة وطعم خفيف، مناسب للكولسلو والتشويح ومحشي الملفوف وكاري الخضروات.",
    "img": "images/veg-green-cabbage.jpg",
    "tag": "",
    "price": 5,
    "opts": [
      500,
      1000,
      2000
    ]
  },
  {
    "id": "veg-red-cabbage",
    "cat": "vegetables",
    "unit": "kg",
    "en": "Red cabbage",
    "ar": "ملفوف أحمر",
    "d": "Crunchy red cabbage with a rich purple colour. Enjoy shredded in salads and slaw, pickled or gently cooked as a side dish.",
    "da": "ملفوف أحمر مقرمش بلون بنفسجي غني، مناسب للتقطيع في السلطات والكولسلو والتخليل أو الطهي كطبق جانبي.",
    "img": "images/veg-red-cabbage.jpg",
    "tag": "",
    "price": 5,
    "opts": [
      500,
      1000,
      2000
    ]
  },
  {
    "id": "veg-cauliflower",
    "cat": "vegetables",
    "unit": "kg",
    "en": "Cauliflower",
    "ar": "قرنبيط",
    "d": "Mild cauliflower florets that take on spices beautifully. Ideal for aloo gobi, roasting, soups and crispy vegetable pakoras.",
    "da": "قرنبيط بطعم خفيف يتشرب نكهات التوابل، مناسب للألو غوبي والتحمير والشوربات وباكورا الخضروات المقرمشة.",
    "img": "images/veg-cauliflower.jpg",
    "tag": "",
    "price": 5,
    "opts": [
      500,
      1000,
      2000
    ]
  },
  {
    "id": "veg-bitter-gourd",
    "cat": "vegetables",
    "unit": "kg",
    "en": "Bitter gourd",
    "ar": "قرع مر (كاريلا)",
    "d": "Also known as karela, this gourd has a distinctive bitter flavour. Ideal for traditional stuffed karela, stir-fries and onion-based curries.",
    "da": "قرع مر يعرف بالكاريلا وله مذاق مر مميز، مناسب للحشو والتشويح والكاري المطهو بالبصل.",
    "img": "images/veg-bitter-gourd.jpg",
    "tag": "",
    "price": 5,
    "opts": [
      500,
      1000,
      2000
    ]
  },
  {
    "id": "veg-onion",
    "cat": "vegetables",
    "unit": "kg",
    "en": "Red onions",
    "ar": "بصل أحمر",
    "d": "Red onions with a bold flavour that becomes sweeter when cooked. A useful base for curries, biryani, marinades and salads.",
    "da": "بصل أحمر بنكهة قوية تصبح أحلى بعد الطهي، أساس مناسب للكاري والبرياني والتتبيلات والسلطات.",
    "img": "images/veg-onion.jpg",
    "tag": "",
    "price": 5,
    "opts": [
      500,
      1000,
      2000
    ]
  },
  {
    "id": "veg-garlic",
    "cat": "vegetables",
    "unit": "kg",
    "en": "Garlic",
    "ar": "ثوم",
    "d": "Aromatic garlic for adding rich flavour to curries, sauces, soups and meat marinades. Use chopped, crushed or roasted.",
    "da": "ثوم عطري يضيف نكهة غنية للكاري والصلصات والشوربات وتتبيلات اللحوم. يستخدم مفرومًا أو مهروسًا أو مشويًا.",
    "img": "images/veg-garlic.jpg",
    "tag": "",
    "price": 5,
    "opts": [
      500,
      1000,
      2000
    ]
  },
  {
    "id": "veg-ginger",
    "cat": "vegetables",
    "unit": "kg",
    "en": "Ginger",
    "ar": "زنجبيل",
    "d": "Ginger with a warm, spicy aroma. Ideal for ginger-garlic paste, curries, marinades and a comforting cup of ginger tea.",
    "da": "زنجبيل برائحة دافئة ونكهة حارة، مناسب لمعجون الزنجبيل والثوم والكاري والتتبيلات وشاي الزنجبيل.",
    "img": "images/veg-ginger.jpg",
    "tag": "",
    "price": 5,
    "opts": [
      500,
      1000,
      2000
    ]
  },
  {
    "id": "veg-green-chilli",
    "cat": "vegetables",
    "unit": "kg",
    "en": "Green chilies",
    "ar": "فلفل أخضر حار",
    "d": "Green chilies to add heat and flavour to curries, chutneys, marinades and garnishes. Adjust the amount to your taste.",
    "da": "فلفل أخضر حار يضيف الحرارة والنكهة للكاري والصلصات والتتبيلات والتزيين. أضف الكمية حسب ذوقك.",
    "img": "images/veg-green-chilli.jpg",
    "tag": "",
    "price": 5,
    "opts": [
      500,
      1000,
      2000
    ]
  },
  {
    "id": "veg-lemon",
    "cat": "vegetables",
    "unit": "kg",
    "en": "Lemons",
    "ar": "ليمون",
    "d": "Tangy lemons for a bright citrus finish. Squeeze over grilled meat, mix into dressings or use in marinades and drinks.",
    "da": "ليمون حامض يضيف نكهة حمضية منعشة. يعصر على اللحوم المشوية أو يستخدم في صلصات السلطات والتتبيلات والمشروبات.",
    "img": "images/veg-lemon.jpg",
    "tag": "",
    "price": 5,
    "opts": [
      500,
      1000,
      2000
    ]
  },
  {
    "id": "veg-mint",
    "cat": "vegetables",
    "unit": "pack",
    "en": "Mint",
    "ar": "نعناع",
    "d": "Fragrant mint leaves for refreshing chutneys, raita, tea and drinks. A lovely finishing touch for biryani. Sold by the bunch.",
    "da": "أوراق نعناع عطرية للصلصات والرايتا والشاي والمشروبات، وإضافة مميزة للبرياني. تباع بالحزمة.",
    "img": "images/veg-mint.jpg",
    "tag": "",
    "price": 5,
    "opts": [
      1
    ],
    "pk": "1 bunch",
    "pka": "حزمة واحدة"
  },
  {
    "id": "veg-coriander",
    "cat": "vegetables",
    "unit": "pack",
    "en": "Coriander",
    "ar": "كزبرة",
    "d": "Aromatic coriander leaves to finish curries, soups and grilled dishes. Also ideal for chutneys and marinades. Sold by the bunch.",
    "da": "أوراق كزبرة عطرية لإضافتها إلى الكاري والشوربات والمشويات، ومناسبة أيضاً للصلصات والتتبيلات. تباع بالحزمة.",
    "img": "images/veg-coriander.jpg",
    "tag": "",
    "price": 5,
    "opts": [
      1
    ],
    "pk": "1 bunch",
    "pka": "حزمة واحدة"
  },
  {
    "id": "veg-tinda",
    "cat": "vegetables",
    "unit": "kg",
    "en": "Tinda",
    "ar": "قرع تندا",
    "d": "Small round gourds with a mild flavour and a soft texture when cooked. Enjoy in homestyle curries or stuffed with your favourite spices.",
    "da": "قرع تندا صغير ومستدير بطعم خفيف وقوام طري بعد الطهي، مناسب للكاري المنزلي أو للحشو بالتوابل المفضلة.",
    "img": "images/veg-tinda.jpg",
    "tag": "",
    "price": 5,
    "opts": [
      500,
      1000,
      2000
    ]
  },
  {
    "id": "veg-parwal",
    "cat": "vegetables",
    "unit": "kg",
    "en": "Parwal",
    "ar": "قرع باروال",
    "d": "Sold by weight.",
    "da": "يباع بالوزن.",
    "img": "images/veg-parwal.jpg",
    "tag": "",
    "price": 5,
    "opts": [
      500,
      1000,
      2000
    ]
  },
  {
    "id": "veg-taro",
    "cat": "vegetables",
    "unit": "kg",
    "en": "Taro / Arbi",
    "ar": "قلقاس (أربي)",
    "d": "Taro, also known as arbi, from China. This root vegetable develops a soft, starchy texture when cooked, making it ideal for curries and roasting. Peel and cook thoroughly before eating.",
    "da": "قلقاس يعرف أيضاً بالأربي، من الصين. يصبح طرياً ونشوياً بعد الطهي، ومناسب للكاري والتحمير. يقشر ويطهى جيداً قبل الأكل.",
    "img": "images/veg-taro.jpg",
    "tag": "",
    "price": 5,
    "opts": [
      500,
      1000,
      2000
    ]
  },
  {
    "id": "veg-green-eggplant",
    "cat": "vegetables",
    "unit": "kg",
    "en": "Green eggplant",
    "ar": "باذنجان أخضر",
    "d": "Sold by weight.",
    "da": "يباع بالوزن.",
    "img": "images/veg-green-eggplant.jpg",
    "tag": "",
    "price": 5,
    "opts": [
      500,
      1000,
      2000
    ]
  }
];

function withVegetables(list, managed = false){
  if(managed || list.some(p => p.cat === "vegetables")) return applyVegetableDescriptions(list);
  const ids = new Set(list.map(p => p.id));
  return applyVegetableDescriptions([...list, ...VEGETABLE_PRODUCTS.filter(p => !ids.has(p.id))]);
}
function sheetManagesVegetables(text){
  const rows = parseCSV(text.replace(/^\uFEFF/, ""));
  const header = rows.findIndex(r => r.some(c => c.trim()));
  if(header < 0) return false;
  const col = rows[header].findIndex(h => h.trim().toLowerCase() === "category");
  return col >= 0 && rows.slice(header + 1).some(r => String(r[col] || "").trim().toLowerCase() === "vegetables");
}

// Fill empty or legacy descriptions; custom Sheet copy always takes priority.
function applyVegetableDescriptions(list){
  const defaults = new Map(VEGETABLE_PRODUCTS.map(p => [p.id, p]));
  const placeholder = value => !String(value || "").trim() || ["Sold by weight.", "Sold by the bunch.", "يباع بالوزن.", "تباع بالحزمة."].includes(String(value).trim());
  return list.map(p => {
    const copy = defaults.get(p.id);
    if(p.cat !== "vegetables" || !copy) return p;
    return {...p, d:placeholder(p.d) ? copy.d : p.d, da:placeholder(p.da) ? copy.da : p.da};
  });
}
