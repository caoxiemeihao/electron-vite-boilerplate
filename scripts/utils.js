const chalk = require('chalk');

/**
 * @type {import('./utils').CallbackFunction}
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
