import { currentUser } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';

const UserInfo = async () => {
  const user = await currentUser();
  if (!user) redirect('/');
  return (
    <div className="mb-6 flex flex-col gap-4 sm:mb-8">
      <h1 className="mb-2 text-2xl font-bold sm:text-3xl">
        Welcome back,
        {user?.firstName ?? user?.emailAddresses[0].emailAddress}! 👋
      </h1>
      <p>Here is what&lsquo;s happening with your boards today.</p>
    </div>
  );
};

export default UserInfo;
