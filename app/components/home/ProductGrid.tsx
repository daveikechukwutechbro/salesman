'use client';

import { Product } from '@/app/types';
import ProductCard from './ProductCard';

interface ProductGridProps {
  products: Product[];
  onProductPress: (product: Product) => void;
}

export default function ProductGrid({ products, onProductPress }: ProductGridProps) {
  if (products.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-lg mb-2">No products found</p>
        <p className="text-sm tg-hint">Try a different search or category</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-3">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} onPress={onProductPress} />
      ))}
    </div>
  );
}
