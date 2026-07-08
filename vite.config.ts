import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    // Required headers to enable SharedArrayBuffer in the browser for high performance cores
    headers: {
      'Cross-Origin-Opener-Policy': 'same-origin',
      'Cross-Origin-Embedder-Policy': 'require-corp',
    },
    // Proxy API requests to the Express backend server during local development
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
      },
    },
  },
});
