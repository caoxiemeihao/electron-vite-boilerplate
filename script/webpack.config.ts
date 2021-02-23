import { readFileSync } from 'fs'
import { Configuration, Stats } from 'webpack'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import { red, green } from 'chalk'
import { resolveRoot } from './utils'

export const config = (env: typeof process.env.NODE_ENV, proc: 'main' | 'render') => {
  const isdev = env === 'development'
  const isprod = env === 'production'
  const ismain = proc === 'main'
  const isrender = proc === 'render'

  const conf: Configuration = {
    mode: isdev ? 'development' : 'production',
    devtool: isdev ? 'eval-cheap-module-source-map' : 'cheap-module-source-map',
    target: ismain ? 'electron-main' : 'electron-renderer',
    entry: resolveRoot(ismain ? 'src/main/index.ts' : 'src/render/main.ts'),
    output: {
      path: resolveRoot('dist', proc),
      filename: ismain ? '_.js' : '[name].[contenthash:9].js',
    },
    module: {
      rules: [
        {
          test: /\.(ts|tsx|vue)$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ["@babel/preset-typescript"],
              plugins: [
                ["@babel/plugin-proposal-class-properties", { "loose": true }],
                ...(isrender
                  ? [
                    '@vue/babel-plugin-jsx',
                    ["import", { "libraryName": "ant-design-vue", "libraryDirectory": "es", "style": "css" }],
                  ]
                  : [

                  ]),
              ],
            },
          },
        },
        {
          test: /\.(png|jpg|gif|svg)$/i,
          use: 'file-loader',
        },
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader'],
        },
        {
          test: /\.less$/i,
          use: ['style-loader', 'css-loader', {
            loader: 'less-loader',
            options: {
              lessOptions: {
                javascriptEnabled: true,
              },
            },
          }],
        },
      ],
    },
    resolve: {
      extensions: ['.ts', '.tsx', '.json', '.js'],
      alias: {
        '@': resolveRoot('src/render'), // 给 render -> vue 用
        '@src': resolveRoot('src'),
        '@root': resolveRoot(),
      },
      fallback: {
        path: false,
      },
    },
    plugins: [
      ...(isrender
        ? [
          new HtmlWebpackPlugin({
            templateContent: () => {
              const html = readFileSync(resolveRoot('src/render/index.html'), 'utf8')
              return html
                .split('\n')
                .filter(line => !line.includes('/main.ts')) // 去掉 vite 开发期 script
                .join('\n')
            }
          }),
        ] : [

        ]),
    ],
  }
  return conf
}


const now = () => new Date().toLocaleString();
export function compileHandle(tag = '', cb = (bool: boolean) => { }) {
  return function (err?: Error, stats?: Stats) {
    if (err) {
      console.log(red(tag), 'webpack 配置报错', now());
      console.log(err, '\n');
      cb(false);
    } else if (stats?.hasErrors()) {
      console.log(red(tag), 'webpack 编译报错', now());
      console.log(stats?.toJson()?.errors?.map(e => e.message)?.join('\n'), '\n');
      cb(false);
    } else {
      console.log(green(tag), 'webpack 编译成功', now());
      cb(true);
    }
  }
}
