'use client';

import { SignInButton, SignUpButton, useUser } from '@clerk/nextjs';
import { ArrowRight, Trello } from 'lucide-react';
import { Button } from './ui/button';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ThemeToggle } from './ThemeToggle';

const HomeNavbar = () => {
  const { isSignedIn, user } = useUser();
  const pathname = usePathname();
  const isHomePage = pathname === '/';
  const isDashboardPage = pathname === '/dashboard';
  const isBoardPage = pathname.startsWith('/boards/');

  if (isHomePage)
    return (
      <nav className="sticky top-0 z-50 border-b bg-white/80 backdrop-blur-sm dark:bg-black/80">
        <div className="container mx-auto flex items-center justify-between px-4 py-3 sm:py-4">
          <div className="flex items-center space-x-2">
            <Trello className="h-6 w-6 text-blue-600 sm:h-8 sm:w-8" />
            <span className="text-xl font-bold text-gray-900 sm:text-2xl dark:text-gray-50">
              Trello
            </span>
          </div>
          <div className="flex items-center space-x-2 sm:space-x-4">
            {isSignedIn ? (
              <div className="flex flex-col items-end space-y-1 sm:flex-row sm:items-center sm:space-y-0 sm:space-x-4">
                <span className="hidden text-xs text-gray-600 sm:block sm:text-sm dark:text-gray-300">
                  Welcome,{' '}
                  {user.firstName ?? user.emailAddresses[0].emailAddress}
                </span>
                <Link href={'/dashboard'}>
                  <Button
                    size={'sm'}
                    variant={'secondary'}
                    className="cursor-pointer text-xs sm:text-sm"
                  >
                    Go to Dashboard <ArrowRight />
                  </Button>
                </Link>
              </div>
            ) : (
              <div>
                <SignInButton>
                  <Button
                    variant={'secondary'}
                    size={'sm'}
                    className="text-xs sm:text-sm"
                  >
                    Sign in
                  </Button>
                </SignInButton>
                <SignUpButton>
                  <Button
                    variant={'outline'}
                    size={'sm'}
                    className="text-xs sm:text-sm"
                  >
                    Sign up
                  </Button>
                </SignUpButton>
              </div>
            )}
            <ThemeToggle />
          </div>
        </div>
      </nav>
    );
};

export default HomeNavbar;
