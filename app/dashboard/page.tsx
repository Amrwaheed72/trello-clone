import CreateBoardComponent from '@/components/CreateBoardComponent';
import DashboardStats from '@/components/DashboardStats';
import { Spinner } from '@/components/ui/spinner';
import { currentUser } from '@clerk/nextjs/server';
import { Suspense } from 'react';

const Page = async () => {
  const user = await currentUser();
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:bg-gradient-to-br dark:from-blue-950 dark:via-black dark:to-purple-950">
      <main className="container mx-auto px-4 py-6 sm:py-8">
        <div className="mb-6 flex flex-col gap-4 sm:mb-8">
          <h1 className="mb-2 text-2xl font-bold sm:text-3xl">
            Welcome back,{' '}
            {user?.firstName ?? user?.emailAddresses[0].emailAddress}! 👋
          </h1>
          <p>Here is what&lsquo;s happening with your boards today.</p>
          <CreateBoardComponent />
        </div>
        {/* stats */}
        <Suspense
          fallback={
            <div className="flex h-[50vh] items-center justify-center">
              <Spinner size="xl" variant="ring" />
            </div>
          }
        >
          <DashboardStats />
        </Suspense>
      </main>
    </div>
  );
};

export default Page;
