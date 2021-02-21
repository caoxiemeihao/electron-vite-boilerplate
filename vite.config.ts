require('dotenv').config({ path: join(__dirname, '.env') })

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { join } from 'path'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  plugins: [vue()],
  root: join(__dirname, 'src/render'),
  base: './', // index.html 中静态资源加载位置
  server: {
    port: +process.env.PORT,
  },
  resolve: {
    alias: {
      '@': join(__dirname, 'src/render'),
      '@src': join(__dirname, 'src'),
      '@root': __dirname,
    },
  },
  define: { APP_ENV: mode },
}))
