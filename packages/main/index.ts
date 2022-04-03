import os from 'os'
import { join } from 'path'
import { app, BrowserWindow } from 'electron'
import './samples/serialport'
import './samples/sqlite3'
import './samples/esmodules'

const isWin7 = os.release().startsWith('6.1')
if (isWin7) app.disableHardwareAcceleration()

process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true'

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
      preload: join(__dirname, '../preload/index.cjs'),
    },
    frame:false,
    resizable: false,
    transparent: true,
    // https://github.com/electron/electron/issues/20357
    backgroundColor: '#00000001',
  })

  // Communicate with the Renderer-process.
  win.webContents.on('ipc-message', (_, channel, ...args) => {
    switch (channel) {
      case 'app.getPath':
        win?.webContents.send('app.getPath', app.getPath(args[0]));
        break;
      default:
        break;
    }
  })

  // Test active push message to Renderer-process.
  win.webContents.on('did-finish-load', () => {
    win?.webContents.send('main-process-message', (new Date).toLocaleString())
  })

  if (app.isPackaged) {
    win.loadFile(join(__dirname, '../renderer/index.html'))
  } else {
    // 🚧 Use ['ENV_NAME'] avoid vite:define plugin
    const url = `http://${process.env['VITE_DEV_SERVER_HOST']}:${process.env['VITE_DEV_SERVER_PORT']}`

    win.loadURL(url)
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