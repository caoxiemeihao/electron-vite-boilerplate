import { join } from 'path'
import { defineConfig } from 'vite'
import resolve from 'vite-plugin-resolve'
import electronRenderer from 'vite-plugin-electron-renderer'
import pkg from '../../package.json'

// https://vitejs.dev/config/
export default defineConfig({
  root: __dirname,
  mode: process.env.NODE_ENV,
  plugins: [
    electronRenderer(),
    resolve({
      sqlite3: 'export default require("sqlite3");',
      serialport: 'export default require("serialport");',
    }),
  ],
  build: {
    outDir: '../../dist/renderer',
  },
  server: {
    host: pkg.env.VITE_DEV_SERVER_HOST,
    port: pkg.env.VITE_DEV_SERVER_PORT,
  },
  resolve: {
    alias: {
      '@': join(__dirname, 'src'),
    },
  },
})
