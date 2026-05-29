import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    target: 'es2015',
    chunkSizeWarningLimit: 1000,
  },
  esbuild: {
    target: 'es2015'
  }
})
