const { merge } = require('webpack-merge');
const configFactory = require('./webpack.config');

/**
 * @type {import('webpack').Configuration}
 */
module.exports = merge(configFactory('preload'), {});
