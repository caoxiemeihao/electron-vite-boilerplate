import path from 'path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import styleImport, { AntdResolve } from 'vite-plugin-style-import'
import pkg from '../package.json'

// https://vitejs.dev/config/
export default defineConfig({
  mode: process.env.NODE_ENV,
  root: path.join(__dirname, '../src/renderer'),
  plugins: [
    react(),
    styleImport({
      resolves: [AntdResolve()],
    }),
  ],
  base: './',
  build: {
    emptyOutDir: true,
    minify: false,
    outDir: '../../dist/renderer',
  },
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true,
      },
    },
  },
  server: {
    host: pkg.env.HOST,
    port: pkg.env.PORT,
  },
});
