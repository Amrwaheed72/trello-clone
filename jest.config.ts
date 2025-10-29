import nextJest from 'next/jest.js';

const createJestConfig = nextJest({
  dir: './',
});

const config = {
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.tsx'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  transformIgnorePatterns: [
    // 👇 tell Jest NOT to ignore Clerk (transpile its ESM)
    'node_modules/(?!(.*\\.mjs$)|(@clerk)/)',
  ],
};

export default createJestConfig(config);
