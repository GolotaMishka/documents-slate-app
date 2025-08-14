import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/documents-slate-app/', // 👈 Replace with your repo name
  resolve: {
    alias: {
      '@pages': path.resolve(__dirname, 'src/app/pages'),
      '@types': path.resolve(__dirname, 'src/app/types.d.ts'),
      '@components': path.resolve(__dirname, 'src/app/components'),
    },
  },
})
