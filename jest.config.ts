import type { Config } from 'jest';

const config: Config = {
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.tsx'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',

    // ✅ Mock out Next.js built-ins to stop the compat/router issue
    '^next/link$': '<rootDir>/__mocks__/nextLinkMock.tsx',
    '^next/navigation$': '<rootDir>/__mocks__/nextNavigationMock.tsx',
  },
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
  },
  testPathIgnorePatterns: ['<rootDir>/.next/', '<rootDir>/node_modules/'],
};

export default config;
