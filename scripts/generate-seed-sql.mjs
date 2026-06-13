import { SEED_CATEGORIES, SEED_PRODUCTS } from '../data/seed.ts';

let sql = '';

for (const cat of SEED_CATEGORIES) {
  const name = cat.name.replace(/'/g, "''");
  const desc = (cat.description || '').replace(/'/g, "''");
  const icon = (cat.icon || '').replace(/'/g, "''");
  sql += `INSERT INTO "Category" (id, name, description, icon, "sortOrder")
VALUES (gen_random_uuid(), '${name}', '${desc}', '${icon}', ${cat.sortOrder})
ON CONFLICT ("name") DO NOTHING;\n`;
}

for (const prod of SEED_PRODUCTS) {
  const cat = SEED_CATEGORIES.find(c => c.name === prod.category);
  if (!cat) continue;
  const slug = prod.slug.replace(/'/g, "''");
  const name = prod.name.replace(/'/g, "''");
  const desc = prod.description.replace(/'/g, "''");
  const image = (prod.image || '').replace(/'/g, "''");
  const catName = prod.category.replace(/'/g, "''");
  const cp = prod.comparePrice ?? 'NULL';
  sql += `INSERT INTO "Product" (id, slug, name, description, price, "comparePrice", image, images, stock, "categoryId", featured, rating, "reviewCount")
SELECT gen_random_uuid(), '${slug}', '${name}', '${desc}', ${prod.price}, ${cp}, '${image}', ARRAY[]::TEXT[], ${prod.stock}, id, ${prod.featured ? 'true' : 'false'}, ${prod.rating ?? 0}, ${prod.reviewCount ?? 0}
FROM "Category" WHERE name = '${catName}'
ON CONFLICT (slug) DO NOTHING;\n`;
}

console.log(sql);
