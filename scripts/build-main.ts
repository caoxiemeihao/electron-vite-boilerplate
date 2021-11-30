import { join } from 'path'
import { spawn, ChildProcess } from 'child_process'
import { webpack } from 'webpack'
import ora from 'ora'
import { yellow, gray, green } from 'chalk'
import minimist from 'minimist'
import electron from 'electron'
import { config, compileHandle } from './webpack.config'
import { waitOn } from './utils'
import { main } from '../package.json'

require('dotenv').config({ path: join(__dirname, '../.env') })

const TAG = '[build-main]'
const argv = minimist(process.argv.slice(2))
const NODE_ENV = process.env.NODE_ENV = argv.env
const compiler = webpack(config(NODE_ENV, 'main'))
const spinner = ora(`${TAG} Electron build...`)

compiler.hooks.beforeRun.tap('编译前提示', compParam => {
  if (argv.watch) console.log(yellow(TAG), 'compiling...')
  else spinner.start()
})

compiler.hooks.afterCompile.tap('编译后提示', compParam => {
  if (argv.watch) {
    const files = Array.from(compiler.modifiedFiles || [])
    console.log(gray(files.map(f => `change: ${f}`).join('\n')))
  } else spinner.stop()
})

if (argv.watch) {
  waitOn({ port: process.env.PORT as string }).then(msg => {
    let child: ChildProcess
    compiler.watch({}, compileHandle(TAG, bool => {
      if (bool) {
        if (child) child.kill()
        child = spawn(electron as any, [join(__dirname, `../${main}`)], { stdio: 'inherit' })
      }
    }))
  })
} else {
  compiler.run(compileHandle(TAG, bool => {
    bool && console.log(green('---- build success. ----'))
  }))
}
