import { join } from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import electronRenderer from 'vite-plugin-electron-renderer'
import pkg from '../../package.json'

// https://vitejs.dev/config/
export default defineConfig({
  root: __dirname,
  mode: process.env.NODE_ENV,
  plugins: [
    vue(),
    electronRenderer({
      resolve: {
        'electron-store': 'export default require("electron-store");',
        serialport: 'export default require("serialport");',
      },
    }),
  ],
  build: {
    emptyOutDir: true,
    outDir: '../../dist/renderer',
  },
  server: {
    port: pkg.env.PORT,
  },
  resolve: {
    alias: {
      '@': join(__dirname, 'src'),
    },
  },
});
