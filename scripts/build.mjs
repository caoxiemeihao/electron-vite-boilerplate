import { build } from 'vite';
import { main, preload } from './vite.config.mjs';

const TAG = '[build]';

// bootstrap
(async () => {
  await build(main);
  await build(preload);
  await build({ configFile: 'src/renderer/vite.config.ts' });
})();
