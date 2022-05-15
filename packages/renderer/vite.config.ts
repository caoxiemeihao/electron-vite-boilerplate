import { join } from 'path'
import { defineConfig } from 'vite'
import resolve from 'vite-plugin-resolve'
import { lib2esm } from 'vite-plugin-resolve/presets'
import electronRenderer from 'vite-plugin-electron/renderer'
import polyfillExports from 'vite-plugin-electron/polyfill-exports'
import pkg from '../../package.json'

// https://vitejs.dev/config/
export default defineConfig({
  root: __dirname,
  mode: process.env.NODE_ENV,
  plugins: [
    electronRenderer(),
    polyfillExports(),
    resolve({
      // ESM format code snippets
      sqlite3: 'export default require("sqlite3");',
      // Use lib2esm() to easy to convert ESM
      serialport: lib2esm(
        // CJS lib name
        'serialport',
        // export memebers
        [
          'SerialPort',
          'SerialPortMock',
        ],
        { format: 'cjs' },
      ),
    }),
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
  resolve: {
    alias: {
      '@': join(__dirname, 'src'),
    },
    conditions: ['node'],
  },
})
