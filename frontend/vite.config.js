import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// base "/" because momacaes9.github.io is a user site served from the domain root.
export default defineConfig({
  plugins: [react()],
  base: '/',
  build: {
    // The 3D star field chunk is three.js (~900 kB, ~245 kB gzipped). It is lazy-loaded
    // after first paint, so warn only if a chunk grows beyond that.
    chunkSizeWarningLimit: 1000,
  },
});
