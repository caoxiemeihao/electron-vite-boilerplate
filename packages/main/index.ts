// The built directory structure
//
// ├─┬ dist
// │ ├─┬ main
// │ │ └── index.cjs
// │ ├─┬ preload
// │ │ └── index.cjs
// │ ├─┬ renderer
// │ │ └── index.html
process.env.DIST = join(__dirname, '..')
process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true'

import os from 'os'
import { join } from 'path'
import { app, BrowserWindow } from 'electron'

const isWin7 = os.release().startsWith('6.1')
if (isWin7) app.disableHardwareAcceleration()

if (!app.requestSingleInstanceLock()) {
  app.quit()
  process.exit(0)
}

let win: BrowserWindow | null = null

async function createWindow() {
  win = new BrowserWindow({
    title: 'Main window',
    width: 900,
    height: 700,
    webPreferences: {
      preload: join(process.env.DIST, 'preload/index.cjs'),
      contextIsolation: false,
      nodeIntegration: true,
    },
    frame: false,
    resizable: false,
    transparent: true,
    // https://github.com/electron/electron/issues/20357
    backgroundColor: '#00000001',
  })

  // Test actively push message to the Electron-Renderer
  win.webContents.on('did-finish-load', () => {
    win?.webContents.send('main-process-message', (new Date).toLocaleString())
  })

  if (app.isPackaged) {
    win.loadFile(join(process.env.DIST, 'renderer/index.html'))
  } else {
    win.loadURL(process.env.VITE_DEV_SERVER_URL)
    // win.webContents.openDevTools({ mode: 'undocked' })
  }
}

app.whenReady().then(createWindow)

app.on('window-all-closed', () => {
  win = null
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('second-instance', () => {
  if (win) {
    // Focus on the main window if the user tried to open another
    if (win.isMinimized()) win.restore()
    win.focus()
  }
})

app.on('activate', () => {
  const allWindows = BrowserWindow.getAllWindows()
  if (allWindows.length) {
    allWindows[0].focus()
  } else {
    createWindow()
  }
})
