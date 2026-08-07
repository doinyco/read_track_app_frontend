import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  preview: {
    allowedHosts: [
      'read-track-app-frontend.onrender.com',
      'localhost',
      '127.0.0.1'
    ]
  },

  test: {
  globals: true,
  environment: 'jsdom',
  setupFiles: './src/setupTests.js',
}
})
