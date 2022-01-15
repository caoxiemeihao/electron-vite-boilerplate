import path from 'path';
import { builtinModules, createRequire } from 'module';
import { fileURLToPath } from 'url';
import { defineConfig } from 'vite';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const pkg = createRequire(import.meta.url)('../package.json');

export const main = defineConfig({
  root: path.join(__dirname, '../src/main'),
  build: {
    lib: {
      entry: 'index.ts',
      formats: ['cjs'],
      fileName: () => '[name].js',
    },
    minify: false,
    emptyOutDir: true,
    outDir: '../../dist/main',
    rollupOptions: {
      external: [
        'electron',
        ...builtinModules,
        ...Object.keys(pkg.dependencies || {}),
      ],
    },
  },
});

export const preload = defineConfig({
  root: path.join(__dirname, '../src/preload'),
  build: {
    lib: {
      entry: 'index.ts',
      formats: ['cjs'],
      fileName: () => '[name].js',
    },
    minify: false,
    emptyOutDir: true,
    outDir: '../../dist/preload',
    rollupOptions: {
      external: [
        'electron',
        ...builtinModules,
        ...Object.keys(pkg.dependencies || {}),
      ],
    },
  },
});
