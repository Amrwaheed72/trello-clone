// jest.setup.ts
import { SignUpButton } from '@clerk/nextjs';
import '@testing-library/jest-dom';

// Mock Next.js modules
jest.mock('next/link', () => {
  return ({ children }: any) => children;
});

jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
    prefetch: jest.fn(),
  }),
}));

// Mock Clerk (client + server)
jest.mock('@clerk/nextjs', () => ({
  SignInButton: ({ children }: any) => <div>{children}</div>,
  SignUpButton: ({ children }: any) => <div>{children}</div>,
  useUser: () => ({ isSignedIn: false }),
}));

jest.mock('@clerk/nextjs/server', () => ({
  auth: async () => ({ userId: null }),
}));
