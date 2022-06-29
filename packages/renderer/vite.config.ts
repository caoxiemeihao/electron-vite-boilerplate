import { defineConfig } from 'vite'
import renderer from './plugins'
import pkg from '../../package.json'

// https://vitejs.dev/config/
export default defineConfig({
  root: __dirname,
  mode: process.env.NODE_ENV,
  base: './',
  plugins: [
    // Support use Node.js API in Electron-Renderer
    // @see - https://github.com/electron-vite/vite-plugin-electron-renderer
    renderer(),
  ],
  build: {
    outDir: '../../dist/renderer',
    emptyOutDir: true,
    sourcemap: true,
  },
  server: {
    host: pkg.env.VITE_DEV_SERVER_HOST,
    port: pkg.env.VITE_DEV_SERVER_PORT,
  },
})
