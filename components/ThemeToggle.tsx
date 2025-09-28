'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { Button } from './ui/button';
import { Moon, Sun } from 'lucide-react';

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Avoid hydration mismatch
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  const isDark = theme === 'dark';

  return (
    <Button
      variant="outline"
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      className={`relative h-6 w-12 rounded-full p-1 transition-colors ${
        isDark ? 'bg-gray-800' : 'bg-gray-200'
      }`}
    >
      {/* Sun */}
      <Sun
        className={`absolute top-0.5 left-0.5 h-5 w-5 rounded-full shadow-md transition-all duration-300 ${
          isDark
            ? 'scale-75 rotate-90 opacity-0'
            : 'scale-100 rotate-0 opacity-100'
        }`}
      />
      {/* Moon */}
      <Moon
        className={`absolute top-0.5 right-0.5 h-5 w-5 rounded-full shadow-md transition-all duration-300 ${
          isDark
            ? 'scale-100 rotate-0 opacity-100'
            : 'scale-75 -rotate-90 opacity-0'
        }`}
      />
    </Button>
  );
}
