import vm from 'node:vm';
export const escapeHTML=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
export function translations(app,presentation){
 const sandbox={};vm.createContext(sandbox);
 vm.runInContext(app.slice(app.indexOf('const T ='),app.indexOf('const $ ='))+';globalThis.dictionary=T;',sandbox);
 for(const m of (app.slice(app.indexOf('const $ ='))+'\n'+presentation).matchAll(/Object\.assign\(T\.(en|ar),\{[^\n]*?\}\);/g))vm.runInContext(m[0],sandbox);
 return sandbox.dictionary;
}
export function homePage(source,ar,dict,categories,base){
 const lang=ar?'ar':'en',url=ar?'/ar/':'/';
 let html=source.replace('<html lang="en" dir="ltr">',`<html lang="${lang}" dir="${ar?'rtl':'ltr'}">`);
 // Use the same dictionary as the live storefront, without requiring JavaScript for the initial text.
 html=html.replace(/<([\w]+)([^>]*\bdata-i="([^"]+)"[^>]*)>[\s\S]*?<\/\1>/g,(whole,tag,attrs,key)=>dict[lang][key]===undefined?whole:`<${tag}${attrs}>${escapeHTML(dict[lang][key])}</${tag}>`);
 html=html.replace(/\b(href|src)="(?![a-z]+:|\/|#)([^\"]+)"/g,'$1="/$2"');
 const title=ar?'توصيل لحوم ودجاج في جدة | مركز طارق العزيزية':'Meat Shop in Al Aziziyah, Jeddah | Tariq Meat Shop';
 const description=ar?'اطلب لحوم الغنم والبقر والدجاج والبيض والخضروات من مركز طارق في العزيزية، جدة. اختر الوزن والتقطيع واطلب التوصيل إلى منزلك.':'Shop fresh meat, chicken, eggs and vegetables from Tariq Meat Shop in Al Aziziyah, Jeddah. Choose your cuts and weights and order online.';
 html=html.replace(/<title>.*?<\/title>/,`<title>${title}</title>`).replace(/(<meta name="description" content=")[^"]*/,`$1${description}`).replace(/(<meta property="og:title" content=")[^"]*/,`$1${title}`).replace(/(<meta property="og:description" content=")[^"]*/,`$1${description}`).replace(/<link rel="canonical"[^>]+>/,`<link rel="canonical" href="${base+url}">`);
 html=html.replace('</head>',`<link rel="alternate" hreflang="en-SA" href="${base}/"><link rel="alternate" hreflang="ar-SA" href="${base}/ar/"><meta property="og:url" content="${base+url}"><meta property="og:image" content="${base}/images/hero-steak-tray.jpg"><style>.lang{display:inline-flex;align-items:center;justify-content:center;min-width:44px;min-height:44px;text-decoration:none}</style></head>`);
 html=html.replace(/<a class="lang"[^>]*>.*?<\/a>/,`<a class="lang" id="langBtn" href="${ar?'/':'/ar/'}" lang="${ar?'en':'ar'}" aria-label="${ar?'English':'العربية'}">${ar?'English':'العربية'}</a>`);
 if(ar)html=html.replaceAll('<span>Tariq Meat Shop</span>','<span>مركز طارق</span>').replace('translate="no">Tariq Meat Shop</a>','translate="no">مركز طارق</a>');
 // The storefront already has category tiles and filters. A second nav inherits
 // mobile header positioning and overlays those tiles.
 return html;
}
export function categoryCopy(cat,ar){
 const copy={
 chicken:['Choose whole chicken, chopped chicken, boneless cuts or chicken mince from our Al Aziziyah shop in Jeddah. Open a product to compare its available weights, prices and preparation options.','اختر الدجاج الكامل أو المقطع أو القطع بدون عظم أو الدجاج المفروم من متجرنا في العزيزية بجدة. افتح صفحة المنتج لمقارنة الأوزان والأسعار وخيارات التحضير المتاحة.'],
 mutton:['Browse mutton legs, shoulders, chops, mince and other available cuts from Tariq Meat Shop in Al Aziziyah, Jeddah. Check each product for its origin, bone-in or boneless description, weights and cutting options.','تسوق فخذ وكتف وريش ولحم غنم مفروم وغيرها من القطع المتاحة من مركز طارق في العزيزية بجدة. راجع وصف كل منتج لمعرفة المنشأ ووجود العظم والأوزان وخيارات التقطيع.'],
 beef:['Compare beef with bone, boneless beef, mince and steak cuts for delivery from our Al Aziziyah shop in Jeddah. Each product page lists its available weights and prices so you can choose the cut for your recipe.','قارن اللحم البقري بالعظم وبدون عظم والمفروم وقطع الستيك للتوصيل من متجرنا في العزيزية بجدة. تعرض صفحة كل منتج الأوزان والأسعار المتاحة لتختار القطعة المناسبة لوصفتك.'],
 eggs:['Shop available egg packs from Tariq Meat Shop in Al Aziziyah, Jeddah. Check the pack description and quantity on each product page before adding it to your meat or grocery order.','تسوق عبوات البيض المتاحة من مركز طارق في العزيزية بجدة. راجع وصف العبوة والعدد في صفحة المنتج قبل إضافتها إلى طلب اللحوم أو المقاضي.'],
 vegetables:['Browse vegetables and herbs to add to your order from Tariq Meat Shop in Al Aziziyah, Jeddah. Compare the available weights and prices on each product page. Availability is checked against our live product list.','تصفح الخضروات والأعشاب لإضافتها إلى طلبك من مركز طارق في العزيزية بجدة. قارن الأوزان والأسعار في صفحة كل منتج. يتم التحقق من التوفر من قائمة المنتجات المباشرة.']};
 return (copy[cat]||['Browse available products, weights and prices from our shop in Al Aziziyah, Jeddah.','تصفح المنتجات والأوزان والأسعار المتاحة من متجرنا في العزيزية بجدة.'])[ar?1:0];
}
export function productDetails(p,ar,weights){
 const name=(ar?p.name_ar:p.name_en)||p.name_en;
 const cuts=ar?p.cut_options_ar:p.cut_options;
 return `<section class="product-details"><h2>${ar?'اختيار الوزن والتجهيز':'Choosing your pack and preparation'}</h2><p>${escapeHTML(ar?`${name}: الأوزان أو العبوات المتاحة هي ${weights.join('، ')}. اختر العبوة المناسبة قبل الإضافة إلى السلة.`:`${name} is offered in ${weights.join(', ')}. Select your preferred pack before adding it to your cart.`)}</p>${cuts?`<p>${escapeHTML(ar?`خيارات التقطيع المتاحة: ${cuts}. يمكنك إضافة تعليمات التحضير عند إتمام الطلب؛ نؤكد إمكانية تنفيذها عبر واتساب.`:`Available cuts: ${cuts}. You can add preparation instructions at checkout; we confirm whether we can fulfil them on WhatsApp.`)}</p>`:''}<h2>${ar?'الطلب والتوصيل':'Ordering and delivery'}</h2><p>${ar?'حدد موقعك عند إتمام الطلب لمعرفة رسوم التوصيل قبل الإرسال. نؤكد الطلب وتوفر التوصيل عبر واتساب.':'Select your delivery location at checkout to see the delivery fee before placing your order. We confirm your order and delivery availability on WhatsApp.'}</p></section>`;
}
