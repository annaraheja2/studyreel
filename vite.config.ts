import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// base: './' makes the built site work from any host path (Vercel, Netlify, GitHub Pages).
export default defineConfig({
  plugins: [react()],
  base: './',
  server: { port: 5173 },
})
