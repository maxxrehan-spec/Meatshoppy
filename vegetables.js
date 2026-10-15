/* Temporary prices: SAR 5/kg; leafy herbs SAR 5/bunch. */
const VEGETABLE_PRODUCTS = [
  {
    "id": "veg-tomato",
    "cat": "vegetables",
    "unit": "kg",
    "en": "Tomatoes",
    "ar": "طماطم",
    "d": "Sold by weight.",
    "da": "يباع بالوزن.",
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
    "d": "Sold by weight.",
    "da": "يباع بالوزن.",
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
    "d": "Sold by weight.",
    "da": "يباع بالوزن.",
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
    "d": "Sold by weight.",
    "da": "يباع بالوزن.",
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
    "d": "Sold by weight.",
    "da": "يباع بالوزن.",
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
    "d": "Sold by weight.",
    "da": "يباع بالوزن.",
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
    "d": "Sold by weight.",
    "da": "يباع بالوزن.",
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
    "d": "Sold by weight.",
    "da": "يباع بالوزن.",
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
    "d": "Sold by weight.",
    "da": "يباع بالوزن.",
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
    "d": "Sold by weight.",
    "da": "يباع بالوزن.",
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
    "d": "Sold by weight.",
    "da": "يباع بالوزن.",
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
    "d": "Sold by weight.",
    "da": "يباع بالوزن.",
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
    "d": "Sold by weight.",
    "da": "يباع بالوزن.",
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
    "d": "Sold by weight.",
    "da": "يباع بالوزن.",
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
    "d": "Sold by weight.",
    "da": "يباع بالوزن.",
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
    "d": "Sold by weight.",
    "da": "يباع بالوزن.",
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
    "d": "Sold by weight.",
    "da": "يباع بالوزن.",
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
    "d": "Sold by weight.",
    "da": "يباع بالوزن.",
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
    "d": "Sold by weight.",
    "da": "يباع بالوزن.",
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
    "d": "Sold by weight.",
    "da": "يباع بالوزن.",
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
    "d": "Sold by weight.",
    "da": "يباع بالوزن.",
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
    "d": "Sold by weight.",
    "da": "يباع بالوزن.",
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
    "d": "Sold by weight.",
    "da": "يباع بالوزن.",
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
    "d": "Sold by the bunch.",
    "da": "تباع بالحزمة.",
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
    "d": "Sold by the bunch.",
    "da": "تباع بالحزمة.",
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
    "d": "Sold by weight.",
    "da": "يباع بالوزن.",
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
    "d": "Sold by weight.",
    "da": "يباع بالوزن.",
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
  if(managed || list.some(p => p.cat === "vegetables")) return list;
  const ids = new Set(list.map(p => p.id));
  return [...list, ...VEGETABLE_PRODUCTS.filter(p => !ids.has(p.id))];
}
function sheetManagesVegetables(text){
  const rows = parseCSV(text.replace(/^\uFEFF/, ""));
  const header = rows.findIndex(r => r.some(c => c.trim()));
  if(header < 0) return false;
  const col = rows[header].findIndex(h => h.trim().toLowerCase() === "category");
  return col >= 0 && rows.slice(header + 1).some(r => String(r[col] || "").trim().toLowerCase() === "vegetables");
}
