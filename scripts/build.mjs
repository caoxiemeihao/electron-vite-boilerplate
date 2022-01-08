import esbuild from 'esbuild';
import vite from 'vite';
import { mainOptions, preloadOptions } from './esbuild.mjs';

const TAG = '[build.js]';

// bootstrap
(async () => {
  const resultMain = await esbuild.build(mainOptions());
  console.log(TAG, 'Build Main-process', resultMain);
  
  const resultPreload = await esbuild.build(preloadOptions());
  console.log(TAG, 'Build Preload-process', resultPreload);
  
  await vite.build({ configFile: 'src/renderer/vite.config.ts' });
})();
