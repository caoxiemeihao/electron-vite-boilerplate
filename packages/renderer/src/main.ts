import renderNodejsApi from './samples/nodejs-api'
import renderSqlite3 from './samples/sqlite3'
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
  ${renderSqlite3()}
  ${renderSerialport()}
`
}
