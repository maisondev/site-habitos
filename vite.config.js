import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  // Base para GitHub Pages (ajuste para o nome do repositório)
  base: '/site-habitos/',
})
