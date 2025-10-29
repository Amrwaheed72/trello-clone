import '@testing-library/jest-dom';

// 👇 mock Clerk hooks so Jest doesn't import real ESM files
jest.mock('@clerk/nextjs', () => ({
  ClerkProvider: ({ children }: any) => <>{children}</>,
  useUser: () => ({
    isLoaded: true,
    isSignedIn: true,
    user: {
      id: 'test_user',
      fullName: 'Test User',
      emailAddress: 'test@example.com',
    },
  }),
  useAuth: () => ({
    isSignedIn: true,
    getToken: async () => 'fake-token',
  }),
}));
