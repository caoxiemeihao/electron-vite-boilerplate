const NODE_ENV = process.env.NODE_ENV = 'production'

import { webpack } from 'webpack'
import ora from 'ora'
import { green } from 'chalk'
import { config, compileHandle } from './webpack.config'

const TAG = '[build-render]'
const compiler = webpack(config(NODE_ENV, 'render'))
const spinner = ora(`${TAG} Vue build...`)

compiler.hooks.beforeRun.tap('编译前提示', compParam => spinner.start())

compiler.hooks.afterCompile.tap('编译后提示', compParam => spinner.stop())

compiler.run(compileHandle(TAG, bool => {
  bool && console.log(green('---- build success. ----'))
}))
