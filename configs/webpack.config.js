const path = require('path');
const argv = require('minimist')(process.argv.slice(2));

/**
 * @type {'swc' | 'babel'}
 * @default swc
 */
const loader = argv.loader === 'babel' ? 'babel' : 'swc';

/**
 * @type {(name: string) => import('webpack').Configuration}
 */
module.exports = function (name) {
  return {
    target: `electron-${name}`,
    entry: {
      index: path.join(__dirname, `../src/${name}/index.ts`),
    },
    output: {
      // The output directory as **absolute path** (required).
      path: path.join(__dirname, `../dist/${name}`),
      chunkFilename: '[name]-[chunkhash:9].js',
    },
    module: {
      rules: [
        loader === 'babel'
          ? {
            // '.tsx' for Preload-script.
            test: /\.(ts|tsx)$/,
            exclude: /node_modules/,
            loader: 'babel-loader',
          }
          : {
            test: /\.(ts|tsx)$/,
            exclude: /node_modules/,
            loader: 'swc-loader',
          },
      ],
    },
    resolve: {
      alias: {
        '@': path.join(__dirname, '../src/renderer'),
        'src': path.join(__dirname, '../src'),
      },
      extensions: ['.ts', '.tsx', '.js', '.json'],
    },
    optimization: {
      minimize: false,
    },
  };
};
