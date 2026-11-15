import { defineConfig } from 'vitest/config';
export default defineConfig({
  test: {
    environment: 'node',
    include: ['src/**/*.test.{ts,tsx}'],
    setupFiles: ['src/test-setup.ts'],
    coverage: { provider: 'v8', reporter: ['text-summary', 'html', 'lcov'], include: ['src/**'] },
  },
});