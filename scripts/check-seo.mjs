import fs from 'node:fs/promises';
import path from 'node:path';
import assert from 'node:assert/strict';
const root=process.argv[2]||'_site';
const report=JSON.parse(await fs.readFile(path.join(root,'seo-build-report.json')));
const sitemap=await fs.readFile(path.join(root,'sitemap.xml'),'utf8');
const urls=[...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map(m=>m[1]);
assert.equal(new Set(urls).size,urls.length,'Duplicate sitemap URLs');
const titles=new Set();let checked=0;
for(const url of urls){
  const pathname=new URL(url).pathname;
  const file=path.join(root,pathname,pathname.endsWith('/')?'index.html':'');
  const html=await fs.readFile(file,'utf8');
  if(!pathname.includes('/products/')&&!pathname.includes('/categories/'))continue;
  assert(html.includes(`href="${url}"`),'Missing canonical '+url);
  assert(!html.includes('noindex'),'Noindex URL in sitemap '+url);
  const title=html.match(/<title>(.*?)<\/title>/)?.[1];assert(title&&!titles.has(title),'Duplicate/missing title '+url);titles.add(title);
  for(const match of html.matchAll(/(?:href|src)="(\/[^"#]*)/g)){
    const target=match[1].split('#')[0].split('?')[0];
    await fs.access(path.join(root,decodeURIComponent(target),target.endsWith('/')?'index.html':''));
  }
  if(pathname.includes('/products/')){
    const schema=JSON.parse(html.match(/id="product-schema" type="application\/ld\+json">(.*?)<\/script>/s)[1]);
    assert.equal(schema['@type'],'Product');assert(schema.image?.length);
    assert(schema.offers.every(o=>Number(o.price)>0&&o.priceCurrency==='SAR'));
    assert(html.includes('GTM-5DJWSVZT'),'Missing existing analytics');
  }
  checked++;
}
console.log(`Validated ${checked} generated indexable pages; ${report.products} products; ${report.warnings.length} content warnings.`);
