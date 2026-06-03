import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  root: 'client',
  plugins: [react()],
  base: process.env.NODE_ENV === 'production' ? '/semantic-prompt-rewriter/' : '/',
  server: {
    port: 5175,
    proxy: {
      '/api': 'http://localhost:3002'
    }
  },
  build: {
    outDir: '../dist',
    emptyOutDir: true
  }
})
