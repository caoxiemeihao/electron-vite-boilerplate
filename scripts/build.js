process.env.NODE_ENV = 'production';

const path = require('path');
const webpack = require('webpack');
const { build: viteBuildFn } = require('vite');
const { callbackFunction, getLoader } = require('./utils');

const TAG = '[build.js]';
const { TAG: loaderTAG } = getLoader();

// build for Main-process and Preload-script
async function webpackBuild() {
  const configs = {
    main: 'webpack.main.js',
    preload: 'webpack.preload.js',
  };

  for (const [name, config] of Object.entries(configs)) {
    const bool = await new Promise(resolve => {
      const compiler = webpack(require(`../configs/${config}`))
      compiler.run(callbackFunction(`${TAG} ${name}:`, bool => {
        resolve(bool);
      }))
    });

    if (!bool) return false;
  }
}

// build for Renderer-process
async function viteBuild() {
  return viteBuildFn({
    configFile: 'configs/vite.config.ts',
  })
}

// bootstrap
(async () => {
  console.log(TAG, 'transpile .ts use', loaderTAG);

  await webpackBuild();
  await viteBuild();
})();
