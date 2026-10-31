import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
// base 必须与 GitHub Pages 子路径一致（仓库名 boji-lab），否则线上资源 404
export default defineConfig({
  plugins: [react()],
  base: '/boji-lab/',
})
