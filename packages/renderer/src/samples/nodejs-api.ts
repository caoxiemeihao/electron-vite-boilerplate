export { }

import fs from 'fs'
import { ipcRenderer } from 'electron'

console.log('fs:', fs)

// Use ipcRenderer.on
ipcRenderer.on('main-process-message', (_event, ...args) => {
  console.log('[Receive Main-process message]:', ...args)
})
