const path = require('path');

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
    },
    module: {
      rules: [
        {
          // '.tsx' for Preload-script.
          test: /\.(ts|tsx)$/,
          exclude: /node_modules/,
          loader: 'babel-loader',
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
  };
};
