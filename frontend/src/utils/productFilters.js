const MENS_TITLE_REGEX = /\bmen(?:'|’)?s\b/i;

export const isMensTitledProduct = (product) => {
  const title = (product?.title || product?.name || '').trim();
  return MENS_TITLE_REGEX.test(title);
};

export const filterOutMensTitleProducts = (products = []) => {
  if (!Array.isArray(products)) return [];
  return products.filter((product) => !isMensTitledProduct(product));
};
