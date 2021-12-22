const esbuild = require('esbuild');
const vite = require('vite');
const { mainOptions, preloadOptions } = require('./esbuild');

const TAG = '[build.js]';

// bootstrap
(async () => {
  const resultMain = await esbuild.build(mainOptions());
  console.log(TAG, 'Build Main-process', resultMain);
  
  const resultPreload = await esbuild.build(preloadOptions());
  console.log(TAG, 'Build Preload-process', resultPreload);
  
  await vite.build({ configFile: 'src/renderer/vite.config.ts' });
})();
