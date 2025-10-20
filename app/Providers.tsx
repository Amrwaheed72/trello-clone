'use client';

import { ClerkProvider } from '@clerk/nextjs';
import { dark } from '@clerk/themes';
import { ThemeProvider } from 'next-themes';

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <ClerkProvider
        appearance={{
          baseTheme: dark,
          variables: {
            colorPrimary: '#fe5933',
          },
        }}
      >
        {children}
      </ClerkProvider>
    </ThemeProvider>
  );
}
