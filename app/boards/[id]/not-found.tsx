import { Button } from '@/components/ui/button';
import Link from 'next/link';

const NotFound = () => {
  return (
    <div className="container mx-auto h-[50vh] px-4">
      <div className="flex h-full flex-col items-center justify-center gap-4">
        <h1 className="text-center text-2xl font-semibold text-gray-400 sm:text-4xl">
          Sorry We could&apos;t find the Board you are looking for 😓
        </h1>
        <div>
          <Link href={'/dashboard'}>
            <Button size={'sm'} variant={'outline'}>
              Back to Dashboard
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
