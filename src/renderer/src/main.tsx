import path from 'path'
import fs from 'fs'
import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
// import './samples/electron-store'
import electron, { ipcRenderer } from 'electron'
import 'antd/dist/antd.css'
import './index.css'

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root'),
  () => {
    window.bridge.removeLoading()
  },
)

// -----------------------------------------------------------

console.log('contextBridge ->', window.bridge)

// Use ipcRenderer.on
ipcRenderer.on('main-process-message', (_event, ...args) => {
  console.log('[Receive Main-process message]:', ...args)
})

console.log(electron, ipcRenderer, path, fs)
