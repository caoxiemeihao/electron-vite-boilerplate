const isdev = window.APP_ENV === 'development'

import { createApp } from 'vue'
import App from './App'
import router from './router'

import os from 'os'
import fs from 'fs'

import {
  ipcRenderer,
  remote,
} from 'electron'
import Store from 'electron-store'
// 开发期 electron、electron-store 会被 script/plugins/index.ts -> esm2cjs 编译成 commonjs
// const { ipcRenderer } = require('electron')
// const Store = require('electron-store')

// 开发期全部引入 antd.css 打包期用 babel-plugin-import 按需引入样式
// isdev && require('ant-design-vue/dist/antd.css')
import 'ant-design-vue/dist/antd.css'

import '@/assets/style/boot4-part.less'
import './index.less'

console.log('os:', os)
console.log('fs:', fs)
console.log('ipcRenderer:', ipcRenderer)
console.log('remote:', remote)
console.log('electron-store:', new Store())

createApp(App)
  .use(router)
  .mount('#app')
  .$nextTick(window.ClosePreloadLoading)
