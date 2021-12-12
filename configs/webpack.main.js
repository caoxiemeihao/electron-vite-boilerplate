const path = require('path');
const { webpack } = require('webpack');
const webapck = require('webpack');

/**
 * @type {import('webpack').Configuration}
 */
const config = {
  entry: {
    input: path.join(__dirname, '../src/main/index.ts'),
  },
  output: {
    // The output directory as **absolute path** (required).
    path: path.join(__dirname, '../dist'),
    chunkFilename: '[name].js',
  },
};

const compiler = webpack(config);


