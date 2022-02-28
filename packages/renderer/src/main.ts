import renderNodejsApi from './samples/nodejs-api'
import renderElectronStore from './samples/electron-store'
import renderSerialport from './samples/serialport'
import './style.css'

const app = document.querySelector<HTMLDivElement>('#app')!

app.innerHTML = renderHTML()

window.removeLoading()

function renderHTML() {
  return `
  <div class="logo-box">
    <img height="124" src="/logo.svg" />
  </div>
  ${renderNodejsApi()}
  ${renderElectronStore()}
  ${renderSerialport()}
`
}
