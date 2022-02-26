import './samples/nodejs-api'
import './samples/electron-store'
import './samples/serialport'
import electron from './assets/electron.png'
import vite from './assets/vite.svg'
import ts from './assets/ts.svg'
import './style.css'

const app = document.querySelector<HTMLDivElement>('#app')!

app.innerHTML = renderHTML()

window.removeLoading()

function renderHTML() {
  return `
  <div class="logo-box">
    <img src="${electron}" />
    <img src="${vite}" />
    <img src="${ts}" />
  </div>
  <div class="static-public">
    Place static files into the <code>src/renderer/public</code> folder
    <img src="/images/node.png" />
  </div>
`
}
