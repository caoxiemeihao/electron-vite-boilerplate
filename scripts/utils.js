const chalk = require('chalk');
const argv = require('minimist')(process.argv.slice(2));

/**
 * @type {(tag: string, cb?: (bool: boolean) => void) => Parameters<import('webpack').Compiler['run']>[0]}
 */
exports.callbackFunction = function (tag, cb = (bool) => { }) {
  const now = new Date().toLocaleString();

  return function (error, stats) {
    if (error) {
      console.log(chalk.red(tag), 'webpack 配置报错', now);
      console.log(error, '\n');
      cb(false);
    } else if (stats?.hasErrors()) {
      console.log(chalk.red(tag), 'webpack 编译报错', now);
      console.log(stats?.toJson()?.errors?.map(e => e.message)?.join('\n'), '\n');
      cb(false);
    } else {
      console.log(chalk.green(tag), 'webpack 编译成功', now);
      cb(true);
    }
  }
};

/**
 * @type {(tag: string) => { loader: 'swc' | 'babel', TAG: string }}
 */
exports.getLoader = function () {
  const loader = argv.loader === 'babel' ? 'babel' : 'swc';
  const dict = {
    swc: chalk.hex('#dea584')('swc-loader'),
    babel: chalk.hex('#f5da55')('babel-loader'),
  };

  return {
    loader,
    TAG: dict[loader],
  };
}
