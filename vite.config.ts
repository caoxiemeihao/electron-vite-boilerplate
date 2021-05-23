require('dotenv').config({ path: join(__dirname, '.env') })

import { join } from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import electron from 'vitejs-plugin-electron'

export default defineConfig(({ /* development | production */mode }) => ({
  plugins: [
    vue(),
    vueJsx(), // Auto inject "import { h } from 'vue'"
    electron(),
  ].filter(Boolean),
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
  define: { APP_ENV: `'${mode}'` },
  esbuild: {
    jsxFactory: 'h',
    jsxFragment: 'Fragment',
  },
}))
