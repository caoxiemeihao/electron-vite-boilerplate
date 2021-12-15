process.env.NODE_ENV = 'production';

const path = require('path');
const webpack = require('webpack');
const { build: viteBuildFn } = require('vite');
const utils = require('./utils');

const TAG = '[build.js]';

// build for Main-process and Preload-script
async function webpackBuild() {
  const configs = {
    main: 'webpack.main.js',
    preload: 'webpack.preload.js',
  };

  for (const [name, config] of Object.entries(configs)) {
    const bool = await new Promise(resolve => {
      const compiler = webpack(require(`../configs/${config}`))
      compiler.run(utils.callbackFunction(`${TAG} ${name}:`, bool => {
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
  await webpackBuild();
  await viteBuild();
})();
