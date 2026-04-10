import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vitest/config'
import { fileURLToPath } from 'node:url'

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./', import.meta.url)),
      '~': fileURLToPath(new URL('./', import.meta.url)),
    },
  },
  test: {
    environment: 'happy-dom',
    globals: true,
    include: [
      'app/__tests__/**/*.spec.ts',
      'tests/**/*.spec.ts',
      'components/**/__tests__/**/*.spec.ts',
      'layouts/**/__tests__/**/*.spec.ts',
    ],
    setupFiles: ['./tests/setup/vitest.setup.ts'],
  },
})
