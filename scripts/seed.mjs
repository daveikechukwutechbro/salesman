import { PrismaClient } from '@prisma/client';
import { SEED_CATEGORIES, SEED_PRODUCTS } from '../data/seed';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database...');

  const categoryMap = new Map<string, string>();

  for (const cat of SEED_CATEGORIES) {
    const existing = await prisma.category.findUnique({ where: { name: cat.name } });
    if (existing) {
      categoryMap.set(cat.name, existing.id);
      console.log(`  Category exists: ${cat.name}`);
    } else {
      const created = await prisma.category.create({
        data: {
          name: cat.name,
          description: cat.description,
          icon: cat.icon,
          sortOrder: cat.sortOrder,
        },
      });
      categoryMap.set(cat.name, created.id);
      console.log(`  Created category: ${cat.name}`);
    }
  }

  for (const prod of SEED_PRODUCTS) {
    const categoryId = categoryMap.get(prod.category);
    if (!categoryId) {
      console.log(`  SKIP ${prod.slug}: category ${prod.category} not found`);
      continue;
    }

    const existing = await prisma.product.findUnique({ where: { slug: prod.slug } });
    if (existing) {
      console.log(`  Product exists: ${prod.name}`);
      continue;
    }

    await prisma.product.create({
      data: {
        slug: prod.slug,
        name: prod.name,
        description: prod.description,
        price: prod.price,
        comparePrice: prod.comparePrice,
        image: prod.image,
        images: prod.images,
        stock: prod.stock,
        categoryId,
        featured: prod.featured,
        rating: prod.rating,
        reviewCount: prod.reviewCount,
      },
    });
    console.log(`  Created product: ${prod.name}`);
  }

  console.log('\nSeeding complete!');
}

main()
  .catch((e) => {
    console.error('Seeding error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
