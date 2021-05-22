require('dotenv').config({ path: join(__dirname, '.env') })

import { join } from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { esm2cjs } from './script/plugins'
import pkg from './package.json'

export default defineConfig(({ /* development | production */mode, command }) => ({
  plugins: [
    vue(),
    vueJsx(), // Auto inject "import { h } from 'vue'"
    command === 'serve' && esm2cjs(Object.keys(pkg.devDependencies)),
  ].filter(Boolean),
  root: join(__dirname, 'src/render'),
  base: './', // index.html 中静态资源加载位置
  server: {
    port: +process.env.PORT,
  },
  optimizeDeps: {
    exclude: [...Object.keys(pkg.devDependencies)],
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
