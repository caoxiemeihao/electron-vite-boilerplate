import path from 'path'
import { ipcRenderer } from 'electron'
import sqlite3 from 'sqlite3'

function createSqlite3(userDataPath: string): Promise<sqlite3.Database> {
  return new Promise((resolve, reject) => {
    const dbpath = path.join(userDataPath, 'sqlite3.db')
    const db = new sqlite3.Database(
      dbpath,
      (error) => {
        if (error) {
          reject(error)
          return
        }
        resolve(db)
      }
    )
  })
}

export default function () {
  ipcRenderer.on('app.getPath', async (_ev, userDataPath) => {
    const oDiv = document.getElementById('sqlite3')!
    try {
      const db = await createSqlite3(userDataPath)
      oDiv.innerHTML = `<code>
        [sqlite3] connect success.
        <br/>
        ${db.filename}
      </code>`
    } catch (error) {
      oDiv.innerHTML = error as string
    }
  })
  ipcRenderer.send('app.getPath', 'userData')

  return `
  <style>
    .sqlite3-box code { display:inline-block; padding:4px 11px; margin:4px 0px; width:770px; text-align:left; border-radius:4px; background:rgb(38 42 55); color:aliceblue; word-wrap:break-word; hyphens:auto; }
  </style>
  <div class="sqlite3-box">
    <h2>SQLite3</h2>
    <div id="sqlite3"></div>
  </div>
  `;
}
