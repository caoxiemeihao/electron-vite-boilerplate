const { builtinModules } = require('module');
const pkg = require('../package.json');

/**
 * @typedef {import('esbuild').BuildOptions} BuildOptions
 */

/**
 * @type {(options?: BuildOptions, watchCb?: () => void) => BuildOptions}
 */
function optionsFactory(options, watchCb) {
  /**
   * @type {BuildOptions}
   */
  const opts = {
    // https://www.electronjs.org/blog/electron-16-0
    target: 'node16.9.1',
    external: [
      'electron',
      ...builtinModules,
      ...Object.keys(pkg.dependencies || {}),
    ],
    format: 'cjs',
    bundle: true,
  };

  if (watchCb) {
    opts.watch = {
      onRebuild(error, result) {
        if (error) {
          console.log(error);
          process.exit(1);
        }
        result.errors.length && console.log(result.errors);
        result.warnings.length && console.log(result.warnings);
        watchCb();
      },
    };
  }

  return { ...opts, ...options };
}

/**
 * @type {(watchCb?: () => void) => BuildOptions}
 */
exports.mainOptions = function (watchCb) {
  return optionsFactory({
    entryPoints: ['src/main/index.ts'],
    outdir: 'dist/main',
  }, watchCb);
};

/**
 * @type {(watchCb?: () => void) => BuildOptions}
 */
exports.preloadOptions = function (watchCb) {
  return optionsFactory({
    entryPoints: ['src/preload/index.ts'],
    outdir: 'dist/preload',
  }, watchCb);
};
