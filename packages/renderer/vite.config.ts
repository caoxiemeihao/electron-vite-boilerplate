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
    renderer({
      nodeIntegration: true,
    }),
  ],
  build: {
    outDir: '../../dist/renderer',
    emptyOutDir: true,
    sourcemap: true,
  },
  server: process.env.VSCODE_DEBUG ? (() => {
    const url = new URL(pkg.debug.env.VITE_DEV_SERVER_URL)
    return {
      host: url.hostname,
      port: +url.port,
    }
  })() : undefined,
})
