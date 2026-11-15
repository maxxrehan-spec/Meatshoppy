/* Apply shared vegetable copy to live Sheet responses and the cached catalog. */
(() => {
  const parseProducts = sheetToProducts;
  sheetToProducts = text => applyVegetableDescriptions(parseProducts(text));
  PRODUCTS = applyVegetableDescriptions(PRODUCTS);
  renderGrids();
  const current = PRODUCTS.find(p => p.id === curProduct);
  if(current) renderProduct(current);
})();
