'use client';

import { Product } from '@/app/types';

interface ProductCardProps {
  product: Product;
  onPress: (product: Product) => void;
}

export default function ProductCard({ product, onPress }: ProductCardProps) {
  const hasDiscount = product.comparePrice && product.comparePrice > product.price;

  return (
    <div
      onClick={() => onPress(product)}
      className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-sm cursor-pointer active:opacity-80 transition-all"
    >
      <div className="aspect-square bg-gray-100 dark:bg-gray-700 relative overflow-hidden">
        {product.image ? (
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-4xl">
            {product.category?.icon || '📦'}
          </div>
        )}
        {hasDiscount && (
          <div className="absolute top-1 left-1 bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded">
            -{Math.round((1 - product.price / product.comparePrice!) * 100)}%
          </div>
        )}
      </div>
      <div className="p-2.5">
        <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
          {product.category?.name || ''}
        </p>
        <h3 className="text-sm font-medium leading-tight mt-0.5 line-clamp-2">
          {product.name}
        </h3>
        <div className="flex items-center gap-1 mt-1">
          <span className="text-xs">{'⭐'.repeat(Math.round(product.rating))}</span>
          <span className="text-[10px] text-gray-400">({product.reviewCount})</span>
        </div>
        <div className="flex items-center gap-1.5 mt-1.5">
          <span className="font-bold text-sm">{product.price} ⭐</span>
          {hasDiscount && (
            <span className="text-xs text-gray-400 line-through">
              {product.comparePrice} ⭐
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
