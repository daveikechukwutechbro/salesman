'use client';

import { useState } from 'react';
import { Product } from '@/app/types';

interface ProductDetailProps {
  product: Product;
  onAddToCart: (product: Product) => void;
  onBack: () => void;
}

export default function ProductDetail({ product, onAddToCart, onBack }: ProductDetailProps) {
  const [selectedImage, setSelectedImage] = useState(0);
  const allImages = product.images.length > 0 ? [product.image, ...product.images].filter(Boolean) : [product.image];
  const hasDiscount = product.comparePrice && product.comparePrice > product.price;

  return (
    <div className="pb-8">
      <button
        onClick={onBack}
        className="flex items-center gap-1 text-sm tg-link mb-3 cursor-pointer"
      >
        ← Back
      </button>

      <div className="aspect-square bg-gray-100 dark:bg-gray-700 rounded-xl overflow-hidden mb-3">
        {allImages[selectedImage] ? (
          <img
            src={allImages[selectedImage]!}
            alt={product.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-6xl">
            {product.category?.icon || '📦'}
          </div>
        )}
      </div>

      {allImages.length > 1 && (
        <div className="flex gap-2 mb-4 overflow-x-auto pb-2">
          {allImages.map((img, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedImage(idx)}
              className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-colors cursor-pointer ${
                idx === selectedImage
                  ? 'border-[var(--tg-theme-button-color)]'
                  : 'border-transparent'
              }`}
            >
              <img src={img!} alt="" className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      )}

      <div className="mb-2 text-xs tg-hint">{product.category?.name || ''}</div>
      <h1 className="text-xl font-bold mb-2">{product.name}</h1>

      <div className="flex items-center gap-2 mb-3">
        <span className="text-sm">{'⭐'.repeat(Math.round(product.rating))}</span>
        <span className="text-sm tg-hint">({product.reviewCount} reviews)</span>
      </div>

      <div className="flex items-center gap-2 mb-4">
        <span className="text-2xl font-bold">{product.price} ⭐</span>
        {hasDiscount && (
          <>
            <span className="text-base text-gray-400 line-through">{product.comparePrice} ⭐</span>
            <span className="text-xs bg-red-100 dark:bg-red-900 text-red-600 dark:text-red-300 px-1.5 py-0.5 rounded">
              -{Math.round((1 - product.price / product.comparePrice!) * 100)}%
            </span>
          </>
        )}
      </div>

      <p className="text-sm leading-relaxed mb-4">{product.description}</p>

      <div className="text-xs tg-hint mb-4">
        {product.stock > 0 ? (
          <span>{product.stock} in stock</span>
        ) : (
          <span className="text-red-500">Out of stock</span>
        )}
      </div>

      <button
        onClick={() => onAddToCart(product)}
        disabled={product.stock <= 0}
        className="w-full py-3 rounded-xl tg-button text-base font-semibold cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {product.stock > 0 ? 'Add to Cart' : 'Out of Stock'}
      </button>
    </div>
  );
}
