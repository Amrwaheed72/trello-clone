'use client';

import { useTransition } from 'react';
import Link from 'next/link';
import { Spinner } from '@/components/ui/spinner';
import { Button } from '@/components/ui/button';

interface Props {
  error: Error;
  reset: () => void;
}

export default function Error({ error, reset }: Props) {
  const [isPending, startTransition] = useTransition();

  const handleReset = () => {
    startTransition(() => {
      reset();
    });
  };
  return (
    <main className="mt-16 flex flex-col items-center justify-center gap-6">
      <h1 className="text-3xl font-semibold">Something went wrong!</h1>
      <p className="text-lg">{error.message}</p>

      <div className="flex items-center justify-center gap-4">
        <Link href="/">
          <Button className="cursor-pointer">back to Home</Button>
        </Link>
        {isPending && <Spinner size="lg" variant="ring" />}

        <p>OR</p>
        <Button
          onClick={handleReset}
          className="cursor-pointer"
          disabled={isPending}
        >
          {isPending ? 'Retrying...' : 'Try again'}
        </Button>
      </div>
    </main>
  );
}
