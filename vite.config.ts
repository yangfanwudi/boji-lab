import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
// base 用相对路径：兼容 github.io/boji-lab/ 子路径和 boji.vocabfan.online 根域名
export default defineConfig({
  plugins: [react()],
  base: './',
})
