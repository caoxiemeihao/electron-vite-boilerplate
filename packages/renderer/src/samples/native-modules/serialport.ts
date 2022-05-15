// https://github.com/serialport/electron-serialport/blob/HEAD/renderer.js
import serialport, { SerialPort, SerialPortMock } from 'serialport'

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

export default function () {
  // Set a timeout that will check for new serialPorts every 2 seconds.
  // This timeout reschedules itself.
  setTimeout(async function listPorts() {
    setTimeout(listPorts, 2000)
    const ports = await listSerialPorts()
    const oDiv = document.getElementById('serialport')

    if (ports.length && oDiv) {
      const keys = Object.keys(ports[0]) as (keyof typeof ports[0])[];
      oDiv.innerHTML = `
      <table border="1">
        <thead>
          ${keys.map(key => `<th>${key}</th>`).join('')}
        <thead>
        ${ports.map(info => `<tr>${keys.map(key => `<td>${info[key] || ''}</td>`).join('')}</tr>`).join('')}
      </table>
      `;
    }
  }, 400)

  return `
  <style>
    .serialport-box table { width:770px; margin:auto; }
  </style>
  <div class="serialport-box">
    <h2>Serialport</h2>
    <div id="serialport"></div>
  </div>
  `;
}
