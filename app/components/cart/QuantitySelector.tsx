'use client';

interface QuantitySelectorProps {
  quantity: number;
  onIncrease: () => void;
  onDecrease: () => void;
  max?: number;
}

export default function QuantitySelector({ quantity, onIncrease, onDecrease, max = 99 }: QuantitySelectorProps) {
  return (
    <div className="flex items-center gap-2">
      <button
        onClick={onDecrease}
        disabled={quantity <= 1}
        className="w-7 h-7 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center text-sm font-medium cursor-pointer disabled:opacity-30"
      >
        −
      </button>
      <span className="w-6 text-center text-sm font-medium">{quantity}</span>
      <button
        onClick={onIncrease}
        disabled={quantity >= max}
        className="w-7 h-7 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center text-sm font-medium cursor-pointer disabled:opacity-30"
      >
        +
      </button>
    </div>
  );
}
