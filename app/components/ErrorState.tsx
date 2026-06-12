'use client';

interface ErrorStateProps {
  error: string;
  onRetry: () => void;
}

export default function ErrorState({ error, onRetry }: ErrorStateProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 text-center">
      <div className="text-red-500 text-4xl mb-4">⚠</div>
      <h1 className="text-xl font-bold mb-2">Something went wrong</h1>
      <p className="mb-4">{error}</p>
      <button
        onClick={onRetry}
        className="px-4 py-2 rounded-lg tg-button cursor-pointer"
      >
        Retry
      </button>
    </div>
  );
}
