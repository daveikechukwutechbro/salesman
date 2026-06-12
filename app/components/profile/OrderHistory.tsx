'use client';

import { useState, useEffect } from 'react';
import { Order } from '@/app/types';
import OrderCard from '../orders/OrderCard';

interface OrderHistoryProps {
  userId: string;
  onOrderPress: (order: Order) => void;
}

export default function OrderHistory({ userId, onOrderPress }: OrderHistoryProps) {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    fetchOrders();
  }, [userId]);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/orders?userId=${userId}`);
      const data = await res.json();
      setOrders(data.orders || []);
    } catch (e) {
      console.error('Error fetching orders:', e);
    } finally {
      setLoading(false);
    }
  };

  const filtered = filter
    ? orders.filter((o) => o.status === filter)
    : orders;

  if (loading) {
    return (
      <div className="flex justify-center py-12">
        <div className="spinner" />
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-5xl mb-4">📦</div>
        <h2 className="text-lg font-semibold mb-2">No orders yet</h2>
        <p className="text-sm tg-hint">Your order history will appear here</p>
      </div>
    );
  }

  return (
    <div>
      <div className="flex gap-2 overflow-x-auto pb-3 -mx-4 px-4 mb-4">
        {['', 'confirmed', 'processing', 'shipped', 'delivered'].map((s) => (
          <button
            key={s}
            onClick={() => setFilter(s)}
            className={`flex-shrink-0 px-3 py-1.5 rounded-full text-xs font-medium cursor-pointer transition-colors ${
              filter === s
                ? 'bg-[var(--tg-theme-button-color)] text-[var(--tg-theme-button-text-color)]'
                : 'bg-gray-100 dark:bg-gray-700'
            }`}
          >
            {s ? s.charAt(0).toUpperCase() + s.slice(1) : 'All'}
          </button>
        ))}
      </div>

      <div className="space-y-3">
        {filtered.map((order) => (
          <OrderCard key={order.id} order={order} onPress={onOrderPress} />
        ))}
      </div>
    </div>
  );
}
