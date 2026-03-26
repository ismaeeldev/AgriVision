import { PRODUCTS } from "@/data/products";

import fs from 'fs';

// Simulating async fetch for future readiness (e.g., later replace with API / DB)
export async function getProductById(id: string) {
  const decodedId = decodeURIComponent(id);

  try {
    fs.appendFileSync('./debug-log.txt', `Time: ${new Date().toISOString()} | Requested ID: "${id}" | Decoded: "${decodedId}" | PRODUCTS length: ${PRODUCTS ? PRODUCTS.length : 'undefined'}\n`);
  } catch (e) { }

  return PRODUCTS.find(p => p.id === decodedId) || null;
}

export async function getRelatedProducts(product: any) {
  const related = PRODUCTS.filter(p => p.category === product.category && p.id !== product.id);
  // Shuffle slightly and slice up to 4 items
  return related.sort(() => 0.5 - Math.random()).slice(0, 4);
}
