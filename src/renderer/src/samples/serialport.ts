// https://github.com/serialport/electron-serialport/blob/HEAD/renderer.js
import serialport from 'serialport'

// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.

async function listSerialPorts() {
  await serialport.list().then((ports, err) => {
    if (err) {
      console.warn(err.message)
      return
    }
    console.log('ports', ports);

    if (ports.length === 0) {
      console.log('No ports discovered')
    }
  })
}

// Set a timeout that will check for new serialPorts every 2 seconds.
// This timeout reschedules itself.
setTimeout(function listPorts() {
  listSerialPorts();
  setTimeout(listPorts, 2000);
}, 2000);
