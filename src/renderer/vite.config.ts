import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import electron from 'vitejs-plugin-electron'
import pkg from '../../package.json'

// https://vitejs.dev/config/
export default defineConfig({
  root: __dirname,
  mode: process.env.NODE_ENV,
  plugins: [
    react(),
    electron(),
  ],
  base: './',
  build: {
    assetsDir: '',
    emptyOutDir: true,
    minify: false,
    outDir: '../../dist/renderer',
    rollupOptions: {
      external: [...electron.externals],
      output: {
        format: 'cjs',
      },
    },
  },
  optimizeDeps: {
    exclude: ['electron'],
  },
  server: {
    host: pkg.env.HOST,
    port: pkg.env.PORT,
  },
});
