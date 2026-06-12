'use client';

interface TrackingTimelineProps {
  status: string;
  estimatedDelivery: string | null;
  deliveredAt: string | null;
}

const STEPS = [
  { key: 'confirmed', label: 'Confirmed', icon: '✅' },
  { key: 'processing', label: 'Processing', icon: '⚙' },
  { key: 'shipped', label: 'Shipped', icon: '🚚' },
  { key: 'delivered', label: 'Delivered', icon: '📦' },
];

const STATUS_ORDER: Record<string, number> = {
  pending: 0,
  confirmed: 1,
  processing: 2,
  shipped: 3,
  delivered: 4,
  cancelled: -1,
  refunded: -1,
};

export default function TrackingTimeline({ status, estimatedDelivery, deliveredAt }: TrackingTimelineProps) {
  const currentStep = STATUS_ORDER[status] ?? 0;
  const isCancelled = status === 'cancelled' || status === 'refunded';

  if (isCancelled) {
    return (
      <div className="my-4 p-4 rounded-xl bg-red-50 dark:bg-red-900/20 text-center">
        <div className="text-3xl mb-2">{status === 'cancelled' ? '❌' : '↩'}</div>
        <p className="font-medium">
          {status === 'cancelled' ? 'Order Cancelled' : 'Order Refunded'}
        </p>
      </div>
    );
  }

  return (
    <div className="my-4">
      <div className="relative">
        {STEPS.map((step, idx) => {
          const isCompleted = currentStep > idx;
          const isCurrent = currentStep === idx;
          return (
            <div key={step.key} className="flex items-start gap-3 pb-6 last:pb-0 relative">
              {idx < STEPS.length - 1 && (
                <div
                  className={`absolute left-[15px] top-7 w-0.5 h-[calc(100%-8px)] ${
                    isCompleted || isCurrent ? 'bg-green-500' : 'bg-gray-200 dark:bg-gray-600'
                  }`}
                />
              )}
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm flex-shrink-0 ${
                  isCompleted
                    ? 'bg-green-500 text-white'
                    : isCurrent
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-200 dark:bg-gray-600 text-gray-400'
                }`}
              >
                {isCompleted ? '✓' : step.icon}
              </div>
              <div className="pt-1">
                <p
                  className={`text-sm font-medium ${
                    isCompleted || isCurrent ? '' : 'text-gray-400'
                  }`}
                >
                  {step.label}
                </p>
                {isCurrent && step.key === 'shipped' && estimatedDelivery && (
                  <p className="text-xs tg-hint mt-0.5">
                    Est. delivery: {new Date(estimatedDelivery).toLocaleDateString()}
                  </p>
                )}
                {step.key === 'delivered' && deliveredAt && (
                  <p className="text-xs tg-hint mt-0.5">
                    {new Date(deliveredAt).toLocaleDateString()}
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
