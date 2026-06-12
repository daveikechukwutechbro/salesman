'use client';

import { useState } from 'react';

interface CheckoutFormProps {
  initialAddress: string;
  initialPhone: string;
  totalAmount: number;
  itemCount: number;
  onSubmit: (data: { shippingAddress: string; phone: string; note: string }) => void;
  onBack: () => void;
  loading: boolean;
}

export default function CheckoutForm({
  initialAddress,
  initialPhone,
  totalAmount,
  itemCount,
  onSubmit,
  onBack,
  loading,
}: CheckoutFormProps) {
  const [address, setAddress] = useState(initialAddress);
  const [phone, setPhone] = useState(initialPhone);
  const [note, setNote] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!address.trim()) return;
    onSubmit({ shippingAddress: address, phone, note });
  };

  return (
    <form onSubmit={handleSubmit}>
      <button
        type="button"
        onClick={onBack}
        className="flex items-center gap-1 text-sm tg-link mb-4 cursor-pointer"
      >
        ← Back to Cart
      </button>

      <h2 className="text-lg font-bold mb-4">Shipping Information</h2>

      <div className="space-y-3 mb-6">
        <div>
          <label className="text-xs tg-hint block mb-1">Shipping Address *</label>
          <textarea
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Street, city, postal code, country"
            required
            rows={3}
            className="w-full px-3 py-2.5 rounded-xl bg-gray-100 dark:bg-gray-700 text-sm outline-none focus:ring-2 focus:ring-[var(--tg-theme-button-color)] resize-none"
          />
        </div>
        <div>
          <label className="text-xs tg-hint block mb-1">Phone Number</label>
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="+1234567890"
            className="w-full px-3 py-2.5 rounded-xl bg-gray-100 dark:bg-gray-700 text-sm outline-none focus:ring-2 focus:ring-[var(--tg-theme-button-color)]"
          />
        </div>
        <div>
          <label className="text-xs tg-hint block mb-1">Order Note (optional)</label>
          <input
            type="text"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="Any special instructions..."
            className="w-full px-3 py-2.5 rounded-xl bg-gray-100 dark:bg-gray-700 text-sm outline-none focus:ring-2 focus:ring-[var(--tg-theme-button-color)]"
          />
        </div>
      </div>

      <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
        <div className="flex justify-between text-sm mb-2">
          <span>Items ({itemCount})</span>
          <span>{totalAmount} ⭐</span>
        </div>
        <div className="flex justify-between text-sm mb-2 tg-hint">
          <span>Delivery</span>
          <span>Free</span>
        </div>
        <div className="flex justify-between font-bold text-lg mt-3 pt-3 border-t border-gray-200 dark:border-gray-700">
          <span>Total</span>
          <span>{totalAmount} ⭐</span>
        </div>
      </div>

      <button
        type="submit"
        disabled={loading || !address.trim()}
        className="w-full py-3 rounded-xl tg-button text-base font-semibold mt-6 cursor-pointer disabled:opacity-50"
      >
        {loading ? (
          <span className="flex items-center justify-center gap-2">
            <span className="spinner inline-block !w-4 !h-4" />
            Processing...
          </span>
        ) : (
          `Pay ${totalAmount} ⭐`
        )}
      </button>
    </form>
  );
}
