import path from 'path';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import eslintPlugin from 'vite-plugin-eslint';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    eslintPlugin(),
    vue({
      reactivityTransform: true,
    }),
  ],
  server: {
    port: 8100,
    host: '0.0.0.0',
  },
  resolve: {
    alias: {
      '@src': path.resolve(__dirname, './src'),
    }
  }
})
