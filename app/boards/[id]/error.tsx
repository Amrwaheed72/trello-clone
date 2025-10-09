'use client';

import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { useTransition } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const [isPending, startTransition] = useTransition();

  const handleReset = () => {
    startTransition(() => {
      reset();
    });
  };
  const router = useRouter();
  return (
    <div className="flex h-screen flex-col items-center justify-center p-6 text-center">
      <h1 className="mb-3 text-3xl font-bold text-red-600">
        Something went wrong
      </h1>
      <p className="mb-6 text-gray-500">
        We couldn&apos;t load this board. Please try again.
      </p>
      <p className="mb-6 text-gray-600">error code: {error.message}</p>
      <div className="flex items-center justify-center gap-2">
        <Button onClick={() => router.push('/dashboard')} variant={'outline'}>
          Back To dashboard
        </Button>

        <Button onClick={handleReset} disabled={isPending}>
          {isPending ? 'Retrying...' : 'Try again'}
        </Button>
      </div>
    </div>
  );
}
