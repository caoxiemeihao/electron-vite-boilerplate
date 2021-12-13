const path = require('path');
const { defineConfig } = require('vite');
const react = require('@vitejs/plugin-react');
const styleImport = require('vite-plugin-style-import').default;
const pkg = require('../package.json');

// https://vitejs.dev/config/
module.exports = defineConfig({
  mode: process.env.NODE_ENV,
  root: path.join(__dirname, '../src/renderer'),
  plugins: [
    react(),
    styleImport({
      libs: [{
        libraryName: 'antd',
        esModule: true,
        resolveStyle: (name) => `antd/es/${name}/style/index`,
      },],
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
