'use client';

import { Order } from '@/app/types';

interface OrderCardProps {
  order: Order;
  onPress: (order: Order) => void;
}

const STATUS_LABELS: Record<string, string> = {
  pending: 'Pending',
  confirmed: 'Confirmed',
  processing: 'Processing',
  shipped: 'Shipped',
  delivered: 'Delivered',
  cancelled: 'Cancelled',
  refunded: 'Refunded',
};

const STATUS_COLORS: Record<string, string> = {
  pending: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300',
  confirmed: 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300',
  processing: 'bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300',
  shipped: 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900 dark:text-indigo-300',
  delivered: 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300',
  cancelled: 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300',
  refunded: 'bg-gray-100 text-gray-700 dark:bg-gray-900 dark:text-gray-300',
};

export default function OrderCard({ order, onPress }: OrderCardProps) {
  const itemCount = order.items.reduce((s, i) => s + i.quantity, 0);

  return (
    <div
      onClick={() => onPress(order)}
      className="tg-card cursor-pointer active:opacity-80 transition-opacity"
    >
      <div className="flex justify-between items-start mb-2">
        <div>
          <p className="text-xs tg-hint">{order.orderNumber}</p>
          <p className="text-xs tg-hint">
            {new Date(order.createdAt).toLocaleDateString()}
          </p>
        </div>
        <span
          className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${STATUS_COLORS[order.status] || ''}`}
        >
          {STATUS_LABELS[order.status] || order.status}
        </span>
      </div>

      <div className="text-sm mb-2">
        {order.items.slice(0, 3).map((item) => (
          <span key={item.id} className="block truncate">
            {item.quantity}x {item.name}
          </span>
        ))}
        {order.items.length > 3 && (
          <span className="text-xs tg-hint">+{order.items.length - 3} more items</span>
        )}
      </div>

      <div className="flex justify-between items-center text-sm pt-2 border-t border-gray-100 dark:border-gray-700">
        <span>{itemCount} item(s)</span>
        <span className="font-bold">{order.totalAmount} ⭐</span>
      </div>

      {order.estimatedDelivery && (
        <div className="text-xs tg-hint mt-2">
          Est. delivery: {new Date(order.estimatedDelivery).toLocaleDateString()}
        </div>
      )}
    </div>
  );
}
