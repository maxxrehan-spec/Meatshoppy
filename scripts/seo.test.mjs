import {test} from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import {normalize,parser,amount,build} from './build-seo.mjs';
const root=process.env.SEO_SOURCE||'.';
const app=await fs.readFile(path.join(root,'app.js'),'utf8');
const parse=parser(app);
const header='id,name_en,name_ar,desc_en,desc_ar,category,unit,price,options,available,image\n';
const row='stable-1,Chicken,دجاج,Fresh whole chicken,دجاج كامل طازج,chicken,kg,"18,20","1000,1200",yes,whole-chicken.jpg';
test('variant prices match existing shop; scalar prices use weight',()=>{
 const p=normalize(header+row,parse)[0];assert.equal(amount(p,1200,1),20);
 assert.equal(amount({...p,prices:[18]},500,0),9);
});
test('invalid/duplicate IDs, corrupt prices and empty feeds fail safely',()=>{
 for(const csv of [header,header+row+'\n'+row,header+row.replace('stable-1','../bad'),header+row.replace('"18,20"','broken')])assert.throws(()=>normalize(csv,parse));
});
test('out-of-stock rows keep stable pages; explicit unpublished rows are excluded',()=>{
 assert.equal(normalize(header+row.replace(',yes,',',no,'),parse)[0].available,false);
 const h=header.trim()+',published\n';assert.throws(()=>normalize(h+row+',no',parse));
});
test('static bilingual pages, escaping, stable URL, noindex fallback, original app retained',async()=>{
 const temp=await fs.mkdtemp(path.join(os.tmpdir(),'tariq-seo-'));
 try{
  const result=await build(root,path.join(temp,'site'),header+row.replace('Chicken','Chicken & <special>'));
  assert.equal(result.products,1);
  const en=await fs.readFile(path.join(temp,'site/products/stable-1/index.html'),'utf8');
  const ar=await fs.readFile(path.join(temp,'site/ar/products/stable-1/index.html'),'utf8');
  assert(en.includes('Chicken &amp; &lt;special&gt;'));assert(ar.includes('dir="rtl"'));
  assert(en.includes('/products/stable-1/'));assert(!en.includes('/products/Chicken'));
  const built=await fs.readFile(path.join(temp,'site/app.js'),'utf8');
  assert(built.startsWith(app.replaceAll('href="#product/${p.id}"','href="/products/${p.id}/" data-product-link="${p.id}"')));
  assert.equal(await fs.readFile(path.join(root,'app.js'),'utf8'),app);
  await assert.rejects(build(root,path.join(temp,'site'),header+row),/empty/);
  const incomplete=await build(root,path.join(temp,'incomplete'),header+row.replace('whole-chicken.jpg','missing.jpg'));
  assert.equal(incomplete.warnings.length,2);
  assert((await fs.readFile(path.join(temp,'incomplete/products/stable-1/index.html'),'utf8')).includes('noindex,follow'));
 }finally{await fs.rm(temp,{recursive:true,force:true});}
});

test('Fakieh single-size pack is SAR 20, while ordinary per-kg chicken is SAR 22',()=>{
 const csv=header+'c3,Fakieh Chicken,دجاج فقيه,Chicken,,chicken,kg,20,1100,yes,fakieh-chicken.jpg';
 const p=normalize(csv,parse)[0];assert.equal(amount(p,1100,0),20);
 const regular=normalize(csv.replace('c3,','c4,'),parse)[0];assert.equal(amount(regular,1100,0),22);
});
