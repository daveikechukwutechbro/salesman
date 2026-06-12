'use client';

import { useEffect, useState } from 'react';
import { CartItem as CartItemType } from '@/app/types';
import CartItemRow from './CartItemRow';

interface CartScreenProps {
  userId: string;
  onCheckout: () => void;
  refreshKey: number;
}

export default function CartScreen({ userId, onCheckout, refreshKey }: CartScreenProps) {
  const [items, setItems] = useState<CartItemType[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);

  const fetchCart = async () => {
    if (!userId) return;
    setLoading(true);
    try {
      const res = await fetch(`/api/cart?userId=${userId}`);
      const data = await res.json();
      setItems(data.items || []);
      setTotal(data.total || 0);
    } catch (e) {
      console.error('Error fetching cart:', e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, [userId, refreshKey]);

  const handleUpdateQuantity = async (productId: string, quantity: number) => {
    await fetch('/api/cart', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId, productId, quantity }),
    });
    fetchCart();
  };

  const handleRemove = async (productId: string) => {
    await fetch('/api/cart', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId, productId }),
    });
    fetchCart();
  };

  if (loading) {
    return (
      <div className="flex justify-center py-12">
        <div className="spinner" />
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-5xl mb-4">🛒</div>
        <h2 className="text-lg font-semibold mb-2">Your cart is empty</h2>
        <p className="text-sm tg-hint">Browse products and add items to your cart</p>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-4">
        {items.map((item) => (
          <CartItemRow
            key={item.id}
            item={item}
            onUpdateQuantity={handleUpdateQuantity}
            onRemove={handleRemove}
          />
        ))}
      </div>

      <div className="border-t border-gray-200 dark:border-gray-700 pt-4 mt-4">
        <div className="flex justify-between items-center mb-4">
          <span className="font-semibold">Total</span>
          <span className="text-xl font-bold">{total} ⭐</span>
        </div>
        <button
          onClick={onCheckout}
          className="w-full py-3 rounded-xl tg-button text-base font-semibold cursor-pointer"
        >
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
}
