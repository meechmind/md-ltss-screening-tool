import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: "/md-ltss-screening-tool/",
  plugins: [react()],
})
