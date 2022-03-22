import renderNodejsApi from './samples/nodejs-api'
import renderSerialport from './samples/serialport'
import renderSqlite3 from './samples/sqlite3'
import './style.css'

const app = document.querySelector<HTMLDivElement>('#app')!

app.innerHTML = renderHTML()

window.removeLoading()

function renderHTML() {
  return `
  <div class="logo-box">
    <img height="124" src="/logo.svg" />
    ${renderNodejsApi()}
    ${renderSerialport()}
    ${renderSqlite3()}
  </div>
`
}
