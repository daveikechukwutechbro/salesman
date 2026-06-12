'use client';

import { CartItem } from '@/app/types';
import QuantitySelector from './QuantitySelector';

interface CartItemRowProps {
  item: CartItem;
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemove: (productId: string) => void;
}

export default function CartItemRow({ item, onUpdateQuantity, onRemove }: CartItemRowProps) {
  return (
    <div className="flex gap-3 py-3 border-b border-gray-100 dark:border-gray-700">
      <div className="w-20 h-20 rounded-lg bg-gray-100 dark:bg-gray-700 overflow-hidden flex-shrink-0">
        {item.product.image ? (
          <img src={item.product.image} alt={item.product.name} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-2xl">
            {item.product.category?.icon || '📦'}
          </div>
        )}
      </div>
      <div className="flex-1 min-w-0">
        <h4 className="text-sm font-medium truncate">{item.product.name}</h4>
        <p className="text-xs tg-hint mt-0.5">{item.product.price} ⭐ each</p>
        <div className="flex items-center justify-between mt-2">
          <QuantitySelector
            quantity={item.quantity}
            onIncrease={() => onUpdateQuantity(item.productId, item.quantity + 1)}
            onDecrease={() => {
              if (item.quantity <= 1) onRemove(item.productId);
              else onUpdateQuantity(item.productId, item.quantity - 1);
            }}
            max={item.product.stock}
          />
          <div className="text-right">
            <p className="text-sm font-bold">{item.product.price * item.quantity} ⭐</p>
            <button
              onClick={() => onRemove(item.productId)}
              className="text-xs text-red-500 cursor-pointer"
            >
              Remove
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
