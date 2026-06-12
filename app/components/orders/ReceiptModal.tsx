'use client';

import { Order } from '@/app/types';
import TrackingTimeline from './TrackingTimeline';

interface ReceiptModalProps {
  order: Order;
  onClose: () => void;
}

export default function ReceiptModal({ order, onClose }: ReceiptModalProps) {
  const receiptDate = new Date(order.createdAt).toLocaleString();

  return (
    <div className="fixed inset-0 bg-[#808080] bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg max-w-sm w-full max-h-[90vh] overflow-y-auto">
        <div className="text-center mb-4">
          <div className="text-4xl mb-2">🧾</div>
          <h3 className="text-lg font-bold">Receipt</h3>
          <p className="text-xs tg-hint mt-1">{order.orderNumber}</p>
        </div>

        <div className="border-t border-b border-gray-200 dark:border-gray-700 py-3 mb-3 space-y-2">
          {order.items.map((item) => (
            <div key={item.id} className="flex justify-between text-sm">
              <span>
                {item.quantity}x {item.name}
              </span>
              <span>{item.price * item.quantity} ⭐</span>
            </div>
          ))}
        </div>

        <div className="flex justify-between font-bold text-base mb-4">
          <span>Total Paid</span>
          <span>{order.totalAmount} ⭐</span>
        </div>

        <div className="text-xs tg-hint space-y-1 mb-4">
          <p>Date: {receiptDate}</p>
          {order.shippingAddress && <p>Address: {order.shippingAddress}</p>}
          {order.estimatedDelivery && (
            <p>
              Est. Delivery: {new Date(order.estimatedDelivery).toLocaleDateString()}
            </p>
          )}
          {order.transactionId && (
            <p className="truncate">TXID: {order.transactionId}</p>
          )}
        </div>

        <TrackingTimeline
          status={order.status}
          estimatedDelivery={order.estimatedDelivery}
          deliveredAt={order.deliveredAt}
        />

        <button
          onClick={onClose}
          className="mt-4 w-full tg-button cursor-pointer"
        >
          Close
        </button>
      </div>
    </div>
  );
}
