import { currentUser } from '@clerk/nextjs/server';
import {
  Bubbles,
  ChartNoAxesColumnDecreasing,
  Rocket,
  Trello,
} from 'lucide-react';
import ReusableCardComponent from '@/components/ReusableCardComponent';
import { redirect } from 'next/navigation';
import { getUserBoards } from '@/app/services/actions/boardActions';

const DashboardStats = async () => {
  const user = await currentUser();
  if (!user) redirect('/');
  const data = await getUserBoards(user.id);

  const recentActivityCount = data.filter((board) => {
    const updatedAt = new Date(board.updated_at);
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
    return updatedAt > oneWeekAgo;
  }).length;

  return (
    <div className="mb-6 grid grid-cols-2 gap-4 sm:mb-8 sm:gap-6 lg:grid-cols-4">
      <ReusableCardComponent
        content={data.length}
        cardLabel="Total Boards"
        icon={<Trello className="h-5 w-5 text-blue-600 sm:h-6 sm:w-6" />}
        contentClasses="bg-blue-200"
      />
      <ReusableCardComponent
        content={data.length}
        cardLabel="Active Projects"
        icon={<Rocket className="h-5 w-5 text-green-600 sm:h-6 sm:w-6" />}
        contentClasses="bg-green-200"
      />
      <ReusableCardComponent
        cardLabel="Recent Activity"
        content={recentActivityCount}
        icon={
          <ChartNoAxesColumnDecreasing className="h-5 w-5 text-purple-600 sm:h-6 sm:w-6" />
        }
        contentClasses="bg-purple-200"
      />
      <ReusableCardComponent
        content={data.length}
        cardLabel="Related Tasks"
        icon={<Bubbles className="h-5 w-5 text-yellow-600 sm:h-6 sm:w-6" />}
        contentClasses="bg-yellow-200"
      />
    </div>
  );
};

export default DashboardStats;
