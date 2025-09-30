'use client';
import { DashboardStore } from '@/app/store/DashboardStore';
import { ThemeToggle } from '@/components/ThemeToggle';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { UserButton } from '@clerk/nextjs';
import { ArrowLeft, Filter, MoreHorizontal, Trello } from 'lucide-react';
import Link from 'next/link';

interface Props {
  boardTitle?: string;
}
const BoardNavbar = ({ boardTitle }: Props) => {
  const ToggleOpen = DashboardStore((state) => state.toggleOpen);
  const toggleOpenFilter = DashboardStore((state) => state.toggleOpenFilter);
  const filterCount = DashboardStore((state) => state.filterCount);
  return (
    <nav className="sticky top-0 z-50 border-b bg-white/80 backdrop-blur-sm dark:bg-black/80">
      <div className="container mx-auto flex items-center justify-between px-4 py-3 sm:py-4">
        <div className="flex items-center justify-between">
          <div className="flex min-w-0 items-center space-x-2 sm:space-x-4">
            <Link
              href={'/dashboard'}
              className="flex flex-shrink-0 items-center space-x-1 text-gray-600 hover:text-blue-600 sm:space-x-2 dark:text-gray-300 dark:hover:text-blue-400"
            >
              <ArrowLeft className="h-4 w-4 sm:h-5 sm:w-5" />
              <span className="hidden sm:inline">Back To Dashboard</span>
              <span className="sm:hidden">Back</span>
            </Link>
            <div className="hidden h-4 w-px bg-gray-300 sm:block sm:h-6 dark:bg-gray-600" />
            <div className="flex min-w-0 items-center justify-center space-x-1 sm:space-x-2">
              <Trello className="h-5 w-5 text-blue-600 sm:h-7 sm:w-7" />
              <div className="min-w-0 items-center space-x-1 text-lg sm:space-x-2">
                <span className="truncate text-sm font-bold sm:text-lg">
                  {boardTitle}
                </span>

                <Button
                  onClick={ToggleOpen}
                  variant={'ghost'}
                  size={'sm'}
                  className="h-7 w-7 flex-shrink-0 p-0"
                >
                  <MoreHorizontal />
                </Button>
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-center space-x-2 sm:space-x-4">
          <Button
            variant={'outline'}
            size={'sm'}
            onClick={toggleOpenFilter}
            className={`text-xs sm:text-sm`}
          >
            <Filter className="mr-1 h-3 w-3 sm:mr-2 sm:h-4 sm:w-4" />
            <span className='hidden sm:inline'>Filter</span>
            {filterCount > 0 && <Badge variant={'secondary'} className='text-xs ml-1 sm:ml-2'>{filterCount}</Badge>}
          </Button>
          <UserButton />
          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
};

export default BoardNavbar;
