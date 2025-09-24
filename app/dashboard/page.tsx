import { Button } from '@/components/ui/button';
import { currentUser } from '@clerk/nextjs/server';
import { Plus } from 'lucide-react';

const Page = async () => {
  const user = await currentUser();
  return (
    <div className="min-h-screen bg-gray-50">
      <main className="container mx-auto px-4 py-6 sm:py-8">
        <div className="mb-6 sm:mb-8">
          <h1 className="mb-2 text-2xl font-bold text-gray-900 sm:text-3xl">
            Welcome back,{' '}
            {user?.firstName ?? user?.emailAddresses[0].emailAddress}! 👋
          </h1>
          <p className="text-gray-600">
            Here is what&lsquo;s happening with your boards today.{' '}
          </p>
          <Button className='w-full sm:w-auto'>
              <Plus className='h-4 w-4 mr-2' />
              Create Board
          </Button>
        </div>
      </main>
    </div>
  );
};

export default Page;
