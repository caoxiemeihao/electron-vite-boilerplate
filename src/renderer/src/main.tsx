import path from 'path'
import fs from 'fs'
import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
// import './samples/electron-store'
// import Store from 'electron-store'
import electron, { ipcRenderer } from 'electron'
import 'antd/dist/antd.css'
import './index.css'

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root'),
  () => {
    window.removeLoading()
  },
)

// -----------------------------------------------------------

console.log('electron', electron)
console.log('ipcRenderer', ipcRenderer)
console.log('path', path)
console.log('fs', fs)

// Use ipcRenderer.on
ipcRenderer.on('main-process-message', (_event, ...args) => {
  console.log('[Receive Main-process message]:', ...args)
})

// Use electron-store
// const store = new Store()
// console.log('electron-store:path', store.path)
