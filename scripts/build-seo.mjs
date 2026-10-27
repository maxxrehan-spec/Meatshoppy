import fs from 'node:fs/promises';
import path from 'node:path';
import vm from 'node:vm';
import {fileURLToPath} from 'node:url';
export const base='https://tariqmeatshop.com';
const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const json=o=>JSON.stringify(o).replace(/</g,'\\u003c');
export function parser(app){
  const start=app.indexOf('function parseCSV('),end=app.indexOf('function sheetToProducts',start);
  if(start<0||end<0)throw Error('Cannot find existing CSV parser');
  const sandbox={};vm.createContext(sandbox);vm.runInContext(app.slice(start,end),sandbox);return sandbox.parseCSV;
}
export function normalize(csv,parse){
  const rows=parse(csv.replace(/^\uFEFF/,'')),heads=rows.shift()?.map(x=>x.trim().toLowerCase());
  for(const h of ['id','name_en','name_ar','price','options','unit','available','image'])if(!heads?.includes(h))throw Error('Missing column '+h);
  const ids=new Set(),out=[];
  for(const row of rows){
    if(!row.some(x=>x.trim()))continue;
    const r=Object.fromEntries(heads.map((h,i)=>[h,(row[i]||'').trim()]));
    if(/^(no|false|0|n)$/i.test(r.published||''))continue;
    if(!/^[A-Za-z0-9_-]+$/.test(r.id)||ids.has(r.id))throw Error('Missing/invalid/duplicate product ID: '+r.id);
    ids.add(r.id);
    const numbers=s=>s.split(/[,\s]+/).map(Number);
    const prices=numbers(r.price),opts=r.unit==='pack'?[1]:numbers(r.options);
    if(!r.name_en||!['kg','pc','pack'].includes(r.unit)||!prices.every(n=>Number.isFinite(n)&&n>0)||!opts.every(n=>Number.isFinite(n)&&n>0)||prices.length>1&&prices.length!==opts.length)throw Error('Invalid price/options: '+r.id);
    out.push({...r,prices,opts,fixedPrice:r.id==='c3'&&opts.length===1,available:!/^(no|false|0|n)$/i.test(r.available),category:/^[a-z0-9-]+$/.test(r.category)?r.category:'other'});
  }
  if(!out.length)throw Error('Empty catalog: refusing to replace site');return out;
}
export const amount=(p,w,i)=>Math.round(((p.prices.length>1||p.fixedPrice)?p.prices[i]:p.prices[0]*(p.unit==='kg'?w/1000:p.unit==='pc'?w:1))*100)/100;
const weight=(p,w,ar)=>p.unit==='kg'?(w>=1000?`${w/1000} ${ar?'كجم':'kg'}`:`${w} ${ar?'جم':'g'}`):p.unit==='pc'?`${w} ${ar?'قطعة':'pc'}`:(ar?p.pack_ar:p.pack_en)||'1 pack';
const href=(p,ar=false)=>`${ar?'/ar':''}/products/${p.id}/`;
const categoryName=(cat,ar)=>ar?({chicken:'الدجاج',mutton:'لحم الضأن',beef:'لحم البقر',eggs:'البيض',vegetables:'الخضروات',other:'منتجات أخرى'}[cat]||cat):cat[0].toUpperCase()+cat.slice(1);
const style='<link rel="stylesheet" href="/style.css"><link rel="stylesheet" href="/design.css"><link rel="stylesheet" href="/improvements.css"><style>.seo-main{max-width:960px;margin:auto;padding:28px 20px}.seo-product{display:grid;grid-template-columns:1fr 1fr;gap:28px}.seo-product img{width:100%;height:350px;object-fit:contain;background:#fff}table{width:100%;border-collapse:collapse}td,th{padding:12px;text-align:start;border-bottom:1px solid #dfd2c3}.seo-main p{line-height:1.7}.seo-links{position:static!important;display:flex!important;flex-wrap:wrap;gap:16px;margin:24px 0}@media(max-width:640px){.seo-product{grid-template-columns:1fr}.seo-product img{height:240px}}footer{display:block!important;padding:24px!important}footer .seo-links{min-height:0!important;height:auto!important;margin:16px 0 0!important;padding:0!important;background:transparent!important}footer .seo-links a{color:#fff!important}[hidden]{display:none!important}</style>';
export async function build(root,output,csv){
  root=path.resolve(root);output=path.resolve(output);
  if(output===root||root.startsWith(output+path.sep))throw Error('Output must be separate from source');
  const app=await fs.readFile(path.join(root,'app.js'),'utf8'),home=await fs.readFile(path.join(root,'index.html'),'utf8');
  const sheet=app.match(/productsSheetUrl:\s*"([^"]+)"/)?.[1];
  if(!sheet?.startsWith('https://docs.google.com/spreadsheets/'))throw Error('Unexpected Sheet URL');
  if(csv===undefined){const response=await fetch(sheet+'&seo='+Date.now(),{signal:AbortSignal.timeout(30000)});if(!response.ok)throw Error('Sheet HTTP '+response.status);csv=await response.text();}
  const products=normalize(csv,parser(app)),warnings=[],urls=[];
  if(!app.includes('href="#product/${p.id}"'))throw Error('Product link template changed; review integration before publishing');
  // Build into a fresh staging directory; the source checkout is never overwritten.
  await fs.mkdir(output,{recursive:true});
  if((await fs.readdir(output)).length)throw Error('Output directory must be empty');
  for(const item of await fs.readdir(root,{withFileTypes:true})){
    if(item.name==='images'||item.isFile()&&(/\.(html|css|js|png|ico|svg|webp|jpg|txt|xml)$/.test(item.name)||item.name==='CNAME')){
      if(/^(README|UPLOAD)/i.test(item.name))continue;
      await fs.cp(path.join(root,item.name),path.join(output,item.name),{recursive:true});
    }
  }
  await fs.writeFile(path.join(output,'.nojekyll'),'');
  // Reuse the same validation/pricing code for visitors; the HTML remains crawlable without JS.
  const liveScript=`const parse=${parser(app).toString()};const normalize=${normalize.toString()};const amount=${amount.toString()};const weight=${weight.toString()};
const config=JSON.parse(document.getElementById('seo-config').textContent);
async function refresh(){try{const r=await fetch(config.sheet+'&live='+Date.now(),{signal:AbortSignal.timeout(15000)});if(!r.ok)throw Error('download');const p=normalize(await r.text(),parse).find(p=>p.id===config.id);const link=document.getElementById('order-link');const status=document.getElementById('stock-status');if(!p){status.textContent=config.ar?'غير متوفر حالياً':'Currently unavailable';link.hidden=true;document.querySelectorAll('script[type="application/ld+json"]').forEach(el=>el.remove());return;}status.textContent=p.available?(config.ar?'متوفر':'In stock'):(config.ar?'غير متوفر حالياً':'Currently unavailable');link.hidden=!p.available;const tbody=document.querySelector('tbody');tbody.replaceChildren();p.opts.forEach((w,i)=>{const tr=document.createElement('tr');for(const value of [weight(p,w,config.ar),amount(p,w,i).toFixed(2)+' SAR']){const td=document.createElement('td');td.textContent=value;tr.append(td);}tbody.append(tr);});const el=document.getElementById('product-schema');const schema=JSON.parse(el.textContent);schema.offers=p.opts.map((w,i)=>({'@type':'Offer',name:schema.name+' — '+weight(p,w,config.ar),url:config.url,price:amount(p,w,i).toFixed(2),priceCurrency:'SAR',availability:'https://schema.org/'+(p.available?'InStock':'OutOfStock'),seller:{'@type':'Organization',name:'Tariq Meat Shop',url:'https://tariqmeatshop.com/'}}));el.textContent=JSON.stringify(schema);document.getElementById('price-status').textContent=config.ar?'تم تحديث السعر والتوفر من القائمة المباشرة.':'Prices and availability updated from the live catalog.';}catch(e){/* Keep the timestamped build snapshot; checkout independently verifies the live catalog. */}}
refresh();document.addEventListener('visibilitychange',()=>{if(!document.hidden)refresh();});`;
  await fs.writeFile(path.join(output,'seo-live.js'),liveScript);
  const gtm=home.match(/<!-- Google Tag Manager -->[\s\S]*?<!-- End Google Tag Manager -->/)?.[0]||'';
  const shell=(title,desc,url,ar,body,extra='',index=true)=>`<!doctype html><html lang="${ar?'ar':'en'}" dir="${ar?'rtl':'ltr'}"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${esc(title)}</title><meta name="description" content="${esc(desc)}"><link rel="canonical" href="${base+url}">${index?'':'<meta name="robots" content="noindex,follow">'}${style}${gtm}${extra}</head><body><header class="bar"><a class="logo" href="/">${ar?'مركز طارق':'Tariq Meat Shop'}</a><a href="/#shop">${ar?'تسوق':'Shop'}</a></header><main class="seo-main">${body}</main><footer><p>Tariq Meat Shop | مركز طارق</p><p>Al Udaba Street, Al Aziziyah, Jeddah 23342</p><a href="tel:+966596684625">+966 59 668 4625</a><nav class="seo-links"><a href="/about.html">About</a><a href="/delivery.html">Delivery</a><a href="/privacy.html">Privacy</a><a href="/refunds.html">Refunds</a></nav></footer></body></html>`;
  const write=async(url,html)=>{const file=path.join(output,url,'index.html');await fs.mkdir(path.dirname(file),{recursive:true});await fs.writeFile(file,html);};
  const seenDescriptions=new Map();
  for(const p of products){
    const desc=p.long_desc_en||p.desc_en||'';const key=(p.name_en+'|'+desc).toLowerCase();
    if(seenDescriptions.has(key))throw Error('Duplicate product content: '+p.id+' / '+seenDescriptions.get(key));seenDescriptions.set(key,p.id);
    let imageFile=(p.image||'').replace(/[^\w.\- ]/g,'');
    const aliases={'beef-with-bone-nehari.jpg':'beef-with-bone-nehari.jpg.jpg','egg-crate-30-eggs.jpg':'egg-crate-30-eggs.jpg.jpg','chicken-boneless-strips.jpg':'chicken-boneless-striploin.jpg'};
    let imageOK=await fs.stat(path.join(root,'images',imageFile)).then(x=>x.isFile()).catch(()=>false);
    if(!imageOK&&aliases[imageFile]){imageFile=aliases[imageFile];imageOK=await fs.stat(path.join(root,'images',imageFile)).then(x=>x.isFile()).catch(()=>false);}
    const image=imageOK?base+'/images/'+encodeURIComponent(imageFile):null;
    const enQuality=Boolean(desc&&image),arQuality=Boolean(enQuality&&p.name_ar&&(p.long_desc_ar||p.desc_ar));
    for(const ar of [false,true]){
      const name=(ar?p.name_ar:p.name_en)||p.name_en,description=(ar?p.long_desc_ar||p.desc_ar:desc)||desc;
      const index=ar?arQuality:enQuality,url=href(p,ar),title=ar?`${name} في جدة | مركز طارق`:`${name} in Jeddah | Tariq Meat Shop`;
      if(!index)warnings.push(`${url}: noindex until product description, image and language content are supplied`);
      const rows=p.opts.map((w,i)=>`<tr><td>${esc(weight(p,w,ar))}</td><td>${amount(p,w,i).toFixed(2)} SAR</td></tr>`).join('');
      const offers=p.opts.map((w,i)=>({'@type':'Offer',name:`${name} — ${weight(p,w,ar)}`,url:base+url,price:amount(p,w,i).toFixed(2),priceCurrency:'SAR',availability:'https://schema.org/'+(p.available?'InStock':'OutOfStock'),seller:{'@type':'Organization',name:'Tariq Meat Shop',url:base+'/'}}));
      const schema={'@context':'https://schema.org','@type':'Product','@id':base+url+'#product',name,sku:p.id,description,...(image?{image:[image]}:{}),offers};
      const alternate=enQuality&&arQuality?`<link rel="alternate" hreflang="en-SA" href="${base+href(p)}"><link rel="alternate" hreflang="ar-SA" href="${base+href(p,true)}">`:'';
      const cuts=(ar?p.cut_options_ar:p.cut_options)||p.cut_options;
      const body=`<nav class="seo-links"><a href="${ar?'/ar':''}/categories/${p.category}/">${esc(categoryName(p.category,ar))}</a><a href="${href(p,!ar)}" lang="${ar?'en':'ar'}">${ar?'English':'العربية'}</a></nav><h1>${esc(name)}</h1><div class="seo-product"><div>${image?`<img src="/images/${encodeURIComponent(imageFile)}" alt="${esc(name)}" width="600" height="600">`:''}</div><div><p>${esc(description)}</p><p>${ar?'متوفر من متجرنا في العزيزية، جدة.':'From our shop in Al Aziziyah, Jeddah.'}</p><p>${ar?'التوفر':'Availability'}: <strong id="stock-status">${p.available?(ar?'متوفر':'In stock'):(ar?'غير متوفر حالياً':'Currently unavailable')}</strong></p><table><thead><tr><th>${ar?'الوزن / العبوة':'Weight / pack'}</th><th>${ar?'السعر':'Price'}</th></tr></thead><tbody>${rows}</tbody></table>${cuts?`<p>${ar?'خيارات التقطيع':'Cut options'}: ${esc(cuts)}</p>`:''}<p id="price-status">${ar?'السعر والتوفر يتم تأكيدهما من القائمة المباشرة قبل الإضافة للسلة.':'Prices and availability are checked against the live catalog before adding to cart.'}</p><p>${ar?'آخر تحديث':'Snapshot updated'}: ${new Date().toISOString().slice(0,16).replace('T',' ')} UTC</p><a id="order-link" class="btn" ${p.available?'':'hidden'} href="/index.html#product/${p.id}" ${ar?'onclick="try{localStorage.setItem(\'mm_lang\',JSON.stringify(\'ar\'))}catch(e){}"':''}>${ar?'تحقق من التوفر واختر الخيارات':'Check availability & choose options'}</a></div></div><p><a href="/delivery.html">${ar?'رسوم ومناطق التوصيل':'Delivery fees and coverage'}</a></p>`;
      await write(url,shell(title,`${name} — ${description}`.slice(0,170),url,ar,body,alternate+`<script id="product-schema" type="application/ld+json">${json(schema)}</script><script id="seo-config" type="application/json">${json({sheet,id:p.id,ar,url:base+url})}</script><script defer src="/seo-live.js"></script>`,index));
      if(index)urls.push(url);
    }
  }
  const categories=[...new Set(products.map(p=>p.category))];
  for(const ar of [false,true])for(const cat of categories){
    const url=`${ar?'/ar':''}/categories/${cat}/`,items=products.filter(p=>p.category===cat);
    const title=ar?`${categoryName(cat,true)} في جدة | مركز طارق`:`${cat[0].toUpperCase()+cat.slice(1)} in Jeddah | Tariq Meat Shop`;
    const body=`<h1>${esc(title)}</h1><p>${ar?'اختر منتجاً لمشاهدة الأوزان والأسعار وخيارات التقطيع.':'Choose a product to view its sizes, prices and available cuts.'}</p><ul>${items.map(p=>`<li><a href="${href(p,ar)}">${esc((ar?p.name_ar:p.name_en)||p.name_en)}</a> — ${esc((ar?p.desc_ar:p.desc_en)||p.desc_en||'')}</li>`).join('')}</ul>`;
    const ready=items.every(p=>!ar||p.name_ar&&p.desc_ar);await write(url,shell(title,title,url,ar,body,'',ready));if(ready)urls.push(url);
  }
  const catalogLinks=`<nav class="sec seo-links" aria-label="Product categories">${categories.map(c=>`<a href="/categories/${c}/">${esc(c[0].toUpperCase()+c.slice(1))}</a>`).join('')}</nav>`;
  let updated=home.replace('</main>',catalogLinks+'</main>');
  if(!/rel=["']canonical/.test(updated))updated=updated.replace('</head>',`<link rel="canonical" href="${base}/"></head>`);
  await fs.writeFile(path.join(output,'index.html'),updated);
  // Crawlable links; ordinary clicks retain the current modal/cart flow. New tabs open static pages.
  let linked=app.replaceAll('href="#product/${p.id}"','href="/products/${p.id}/" data-product-link="${p.id}"');
  linked+=`\ndocument.addEventListener('click',e=>{const a=e.target.closest('a[data-product-link]');if(a&&!e.ctrlKey&&!e.metaKey&&!e.shiftKey&&!e.altKey&&e.button===0){e.preventDefault();location.hash='product/'+a.dataset.productLink;}});\n`;
  await fs.writeFile(path.join(output,'app.js'),linked);
  const staticUrls=['/','/about.html','/delivery.html','/privacy.html','/refunds.html'];
  await fs.writeFile(path.join(output,'sitemap.xml'),`<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${[...staticUrls,...urls].map(u=>`<url><loc>${base+u}</loc></url>`).join('')}</urlset>`);
  await fs.writeFile(path.join(output,'robots.txt'),`User-agent: *\nAllow: /\nSitemap: ${base}/sitemap.xml\n`);
  await fs.writeFile(path.join(output,'seo-build-report.json'),JSON.stringify({products:products.length,indexableUrls:urls.length,warnings},null,2));
  return {products:products.length,indexableUrls:urls.length,warnings};
}
if(process.argv[1]===fileURLToPath(import.meta.url)){
  const root=process.argv[2]||'.',out=process.argv[3]||'_site',fixture=process.argv[4];
  try{console.log(JSON.stringify(await build(root,out,fixture?await fs.readFile(fixture,'utf8'):undefined),null,2));}catch(e){console.error(e.message);process.exitCode=1;}
}
