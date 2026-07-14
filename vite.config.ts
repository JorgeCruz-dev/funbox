import { defineConfig } from 'vite';

export default defineConfig({
  base: '/funbox/', // Base path for GitHub Pages deployment
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
