import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  root: 'client',
  plugins: [react()],
  base: process.env.NODE_ENV === 'production' ? '/semantic-prompt-rewriter/' : '/',
  server: {
    proxy: {
      '/api': 'http://localhost:3001'
    }
  },
  build: {
    outDir: '../dist',
    emptyOutDir: true
  }
})
