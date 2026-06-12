'use client';

import { useState, useEffect, useRef } from 'react';
import { Product } from '@/app/types';

interface FeaturedCarouselProps {
  products: Product[];
  onProductPress: (product: Product) => void;
}

export default function FeaturedCarousel({ products, onProductPress }: FeaturedCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const featured = products.filter((p) => p.featured).slice(0, 8);

  const startAutoPlay = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % featured.length);
    }, 4000);
  };

  useEffect(() => {
    if (featured.length > 1) startAutoPlay();
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [featured.length]);

  if (featured.length === 0) return null;

  const current = featured[currentIndex];
  const hasDiscount = current.comparePrice && current.comparePrice > current.price;

  return (
    <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-blue-500/10 to-purple-500/10">
      <div
        onClick={() => onProductPress(current)}
        className="flex cursor-pointer active:opacity-80 transition-opacity"
      >
        <div className="w-32 h-32 flex-shrink-0 bg-gray-100 dark:bg-gray-700">
          {current.image ? (
            <img src={current.image} alt={current.name} className="w-full h-full object-cover" loading="lazy" />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-3xl">{current.category?.icon || '📦'}</div>
          )}
        </div>
        <div className="flex-1 p-3 flex flex-col justify-center">
          <div className="text-[10px] tg-hint mb-1">Featured Product</div>
          <h3 className="font-bold text-sm leading-tight mb-1">{current.name}</h3>
          <div className="flex items-center gap-0.5 mb-1">
            <span className="text-[10px]">{'⭐'.repeat(Math.round(current.rating))}</span>
            <span className="text-[10px] tg-hint">({current.reviewCount})</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="font-bold text-sm">{current.price} ⭐</span>
            {hasDiscount && (
              <span className="text-[10px] text-gray-400 line-through">{current.comparePrice} ⭐</span>
            )}
          </div>
        </div>
      </div>
      {featured.length > 1 && (
        <div className="absolute bottom-1 left-0 right-0 flex justify-center gap-1">
          {featured.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`w-1.5 h-1.5 rounded-full transition-colors cursor-pointer ${
                idx === currentIndex ? 'bg-[var(--tg-theme-button-color)]' : 'bg-gray-300 dark:bg-gray-600'
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
