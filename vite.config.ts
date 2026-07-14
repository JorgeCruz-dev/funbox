import { defineConfig } from 'vite';

export default defineConfig({
  base: './', // Base path for deployment (relative to support subdirectories and Live Server)
  server: {
    // Required headers to enable SharedArrayBuffer in the browser for high performance cores
    headers: {
      'Cross-Origin-Opener-Policy': 'same-origin',
      'Cross-Origin-Embedder-Policy': 'require-corp',
    },
  },
  preview: {
    // Required headers to enable SharedArrayBuffer during local previews
    headers: {
      'Cross-Origin-Opener-Policy': 'same-origin',
      'Cross-Origin-Embedder-Policy': 'require-corp',
    },
  },
});
