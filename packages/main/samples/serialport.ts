import { BrowserWindow } from 'electron'
import serialport from 'serialport'

// https://github.com/serialport/electron-serialport/blob/HEAD/renderer.js
// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.

async function listSerialPorts() {
  try {
    const ports = await serialport.SerialPort.list()
    if (ports.length === 0) {
      console.log('No ports discovered')
    }
    return ports
  } catch (error) {
    console.error(error)
    return []
  }
}

// Set a timeout that will check for new serialPorts every 2 seconds.
// This timeout reschedules itself.
setTimeout(async function listPorts() {
  setTimeout(listPorts, 400)
  const ports = await listSerialPorts()

  BrowserWindow.getFocusedWindow()?.webContents.send('serialport', JSON.stringify(ports))
}, 99)
