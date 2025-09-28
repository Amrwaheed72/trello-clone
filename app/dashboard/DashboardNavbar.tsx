import { ThemeToggle } from '@/components/ThemeToggle';
import { UserButton } from '@clerk/nextjs';
import { Trello } from 'lucide-react';
import Link from 'next/link';

const DashboardNavbar = () => {
  return (
    <nav className="sticky top-0 z-50 border-b bg-white/80 backdrop-blur-sm dark:bg-black/80">
      <div className="container mx-auto flex items-center justify-between px-4 py-3 sm:py-4">
        <Link href={'/'}>
          <div className="flex items-center space-x-2">
            <Trello className="h-6 w-6 text-blue-600 sm:h-8 sm:w-8" />
            <span className="text-xl font-bold sm:text-2xl">Trello</span>
          </div>
        </Link>
        <div className="flex items-center space-x-2 sm:space-x-4">
          <UserButton />
          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
};

export default DashboardNavbar;
