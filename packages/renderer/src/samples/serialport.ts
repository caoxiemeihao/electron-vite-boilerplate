import type { PortInfo } from '@serialport/bindings-cpp'

const { ipcRenderer } = window

export default function () {
  ipcRenderer.on('serialport', (_ev, args) => {
    const ports: PortInfo[] = JSON.parse(args)
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
  })

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
