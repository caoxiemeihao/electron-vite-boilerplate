import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import electron from 'vitejs-plugin-electron'
import pkg from '../../package.json'

// https://vitejs.dev/config/
export default defineConfig({
  root: __dirname,
  mode: process.env.NODE_ENV,
  plugins: [
    vue(),
    electron({
      resolve: {
        'electron-store': `const Store = require('electron-store');\nexport { Store as default }`,
        'serialport': 'export default require("serialport");',
      },
    }) as any,
  ],
  base: './',
  build: {
    assetsDir: '',
    emptyOutDir: true,
    minify: false,
    outDir: '../../dist/renderer',
    rollupOptions: {
      external: [
        ...electron.externals,
        ...Object.keys(pkg.dependencies || {}),
      ],
      output: {
        format: 'cjs',
      },
    },
  },
  optimizeDeps: {
    exclude: [
      // Accelerate build.
      'electron',
      'electron-store',
    ],
  },
  server: {
    host: pkg.env.HOST,
    port: pkg.env.PORT,
  },
});
