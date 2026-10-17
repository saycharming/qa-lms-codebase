import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import { fileURLToPath } from 'node:url';
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: { '@web': fileURLToPath(new URL('../web/src', import.meta.url)) },
  },
  test: {
    environment: 'node',
    environmentMatchGlobs: [['tests/component/**', 'jsdom']],
    setupFiles: ['./tests/setup.js'],
    include: ['tests/**/*.test.js', 'tests/**/*.test.jsx'],
    reporters: ['default'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html', 'json-summary'],
      reportsDirectory: 'reports/coverage',
      include: [
        'examples/{money,validators}.js',
        '../web/src/lib/{money,validators,cart,promo,checkout,notifications,analytics}.js',
      ],
      thresholds: { lines: 0, statements: 0, functions: 0, branches: 0 },
    },
  },
});
